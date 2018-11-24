import http from 'http';
import httpProxy from 'http-proxy';
import ConsistentHashing from 'consistent-hashing';
import { parse } from 'query-string';
import { SERVERS, PORT } from './config';

const displayBlockedConnections = false;
const consistentHash = new ConsistentHashing(Object.keys(SERVERS));

// Utility for determining if an object exists and is set
function validObject (data) {
  try {
    if ((data) && (data !== undefined) && (data !== null)) {
      return true;
    }
  } catch (err) {
  }  
  return false;
}

// Utility for determining if an object exists and is set with data that can be described as non-empty text
function validData (data) {
  try {
    if (validObject(data)) {
      let sData = data.toString();
      
      if ((sData.length > 0) && (sData !== 'undefined') && (sData !== 'unknown')) {
        return true;
      }
    }
  } catch (err) {
  }  
  return false;
}

// Utility for getting operational values (shared between both httpServer and httpProxyServer)
function getConnectionValues (req) {
  const url = req.url.split('?')[1];
  const queryData = parse(url);
  const targetServerId = ((validData(queryData.balancer)) ? consistentHash.getNode(queryData.balancer) : 1);
  const targetServerUrl = ((validData(targetServerId)) ? SERVERS[targetServerId] : SERVERS[1]);
  const denyConnection = ((!validData(targetServerUrl)) || (!validData(queryData.userId)));
  const connectionText = ((denyConnection) ? 'BLOCKED: no user' : `ACCEPTED ${queryData.userName} (#${queryData.userId})`) + ' :: ';
  const wantLog = !denyConnection || displayBlockedConnections;
  
  return [ queryData, targetServerId, targetServerUrl, denyConnection, connectionText, wantLog ];
}

function getUniqueId (req) {
  const url = req.url.split('?')[1];
  const queryData = parse(url);

  return `${queryData.userId}#${queryData.conSeed}`;
}

// Utility for getting some IP information and optional logging to screen
function getIPandLog (req, wantLog, connectionText ) {
  let ipAddr = 'unknown';
    
  try {
    let ipAddrText = ipAddr;
    
    ipAddr = req.connection.remoteAddress;
    
    let proxiedAddr = req.headers['x-forwarded-for'];
    if (proxiedAddr === undefined || proxiedAddr.length === 0) {
      proxiedAddr = req.headers['cf-connecting-ip'];
    }
    if (proxiedAddr === undefined || proxiedAddr.length === 0) {
      proxiedAddr = 'unknown';
    }
    if (validData(proxiedAddr)) {
      ipAddrText = `${proxiedAddr} via ${ipAddr}`;
      ipAddr = proxiedAddr;
    } else {
      ipAddrText = ipAddr;
    }
    
    if (wantLog) {
      
      let cloudflareRay = req.headers['cf-ray'] ? req.headers['cf-ray'] : 'unknown';
      let cloudflareCountry = req.headers['cf-ipcountry'] ? req.headers['cf-ipcountry'] : 'unknown';
    
      if (cloudflareRay === 'unknown') {
        console.log(`    ${connectionText}${ipAddrText}`);
      } else {
        console.log(`    ${connectionText}${ipAddrText} routed @ ${cloudflareCountry}@${cloudflareRay}`);
      }
    }
  }
  catch (err) {
    if (wantLog) {
      console.log(`    ${connectionText}${ipAddrText}`);
    }
  }
  
  return ipAddr;
}

// Create a proxy server with custom application logic
//
const proxy = httpProxy.createProxyServer({
  ws: true
});

// Utility for disconnecting a web request
function dropHttpConnection (oResponse, iStatus = 403, sStatusReason = "Unauthorized") {
    try {
      oResponse.writeHead(iStatus, {'Content-Type': 'text/plain'});
      oResponse.write(sStatusReason);
      oResponse.end();
    } catch (err) {
    }
    return;
}

//
// Create your custom server and just call `proxy.web()` to proxy
// a web request to the target passed in the options
// also you can use `proxy.ws()` to proxy a websockets request
//

const proxyServer = http.createServer(function(req, res) {
  try {
    const [ queryData, targetServerId, targetServerUrl, denyConnection, connectionText, wantLog ] = getConnectionValues(req);
    
    if (wantLog) {
      console.log(`Balancer - ${queryData.balancer} | Proxying HTTP to ${targetServerId}`);
    }

    const ipAddr = getIPandLog(req, wantLog, connectionText);
    
    if (!denyConnection) {
      // Note: slip the non-proxied original IP address of the player into the request
      // URL so the battle node understands what IPs belong to which user.
      req.url = `${req.url}&ipAddr=${ipAddr}`;

      proxy.web(req, res, { target: targetServerUrl });
      return;
    }
  } catch (err) {
    console.log(err);
  }
  
  dropHttpConnection(res);
  return false;
});

// Utility for disconnecting a Socket
function dropWebsocketConnection (oSocket) {
    try {
      if (validObject(oSocket) && validObject(oSocket._handle)) {
        if (validObject(oSocket.destroy)) {
          oSocket.destroy();
        } else if (validObject(oSocket.close)) {
          oSocket.close();
        }
      }
    } catch (err) {
    }
    return;
}

var allConnections = [];

// Listen for the web request event to upgrade a socket to a webSocket
proxyServer.on('upgrade', function (req, socket, head) {
  try {
    const [ queryData, targetServerId, targetServerUrl, denyConnection, connectionText, wantLog ] = getConnectionValues(req);
    
    if (wantLog) {
      console.log(`Balancer - ${queryData.balancer} | Proxying WebS to ${targetServerId}`);
    }

    const ipAddr = getIPandLog(req, wantLog, connectionText);
    
    if (!denyConnection) {    
      // Note: slip the non-proxied original IP address of the player into the request
      // URL so the battle node understands what IPs belong to which user.
      req.url = `${req.url}&ipAddr=${ipAddr}`;
      
      proxy.ws(req, socket, head, { target: targetServerUrl.replace('https','http') });

      const thisId = getUniqueId(req);
      
      for (let i = 0; i < allConnections.length; i++) {
        if (i < allConnections.length) {
          if (getUniqueId(allConnections[i].req) === thisId) {
            if (validObject(allConnections[i].socket)) {
              dropWebsocketConnection(allConnections[i].socket);
            }
            if (validObject(allConnections[i].req) && validObject(allConnections[i].req.connection)) {
              dropWebsocketConnection(allConnections[i].req.connection);
            }
            if (validObject(allConnections[i].req) && validObject(allConnections[i].req.client)) {
              dropWebsocketConnection(allConnections[i].req.client);
            }
            allConnections.splice(i, 1);
            i--;
          }
        }
      }
      
      allConnections.push({ req, socket });
      
      //todo: remove connection when closed
      return;
    }
  } catch (err) {
    console.log(err);
  }
  
  dropWebsocketConnection(socket);
  return false;
});

// `httpServer` inherits `net` emitted events
// https://nodejs.org/api/net.html#net_event_timeout
proxyServer.on('timeout', function (socket) {
  // Emitted if the socket times out from inactivity. This is only to notify that the
  // socket has been idle. The user must manually close the connection.

  // Note: can occur from timeout attempting to connect to battle-node or just the
  // client timing out.
  
  dropWebsocketConnection(socket)
});

// `httpServer` inherits `net` emitted events
// https://nodejs.org/api/net.html#net_event_error_1
proxyServer.on('error', function (err) {
  // Emitted when an error occurs. The 'close' event will be called directly following this event.

  console.log('Proxy server error emitted:');
  console.log(err);
  
  // Note: since the socket is automatically closed, no further logic here.
});

// `httpServer` event
// https://nodejs.org/api/http.html#http_event_clienterror
proxyServer.on('clientError', function (err, socket) {
  // If a client connection emits an 'error' event, it will be forwarded here.  Listener of this
  // event is responsible for closing/destroying the underlying socket.
  console.log('Proxy server clientError emitted:');
  console.log(err);
  
  dropWebsocketConnection(socket)
});

// `httpProxy` event
// https://github.com/nodejitsu/node-http-proxy
proxy.on('error', function (err, req, res) {
  // The error event is emitted if the request to the target fail.  We do not do any error handling
  // of messages passed between client and proxy, and messages passed between proxy and target,
  // so it is recommended that you listen on errors and handle them.
  
  try {
    if (err.code === 'ECONNREFUSED') {

      // this means battle-node is offline
      dropHttpConnection(res, 502, 'Combat server is offline.');

    } else {
      
      // unhandled, so log it
      console.log(err);
      console.log(`Unknown proxy error code: ${err.code}:`);
      
      dropHttpConnection(res, 500, 'Unknown error occurred.');
      
    }
  } catch (e) {
    dropHttpConnection(res, 500, 'Unknown error occurred.');
  }  
});

// Begin listening for basic web requests to upgrade to webSockets
proxyServer.listen(PORT);
