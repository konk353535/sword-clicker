import http from 'http';
import httpProxy from 'http-proxy';
import ConsistentHashing from 'consistent-hashing';
import { parse } from 'query-string';
import { SERVERS, PORT } from './config';

const displayBlockedConnections = false;

const consistentHash = new ConsistentHashing(Object.keys(SERVERS));

function validObject (data) {
  try {
    if ((data) && (data !== undefined) && (data !== null)) {
      return true;
    }
  } catch (err) {
  }  
  return false;
}

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

function getConnectionValues (req) {
  const url = req.url.split('?')[1];
  const queryData = parse(url);
  const targetServerId = ((validData(queryData.balancer)) ? consistentHash.getNode(queryData.balancer) : undefined);
  const targetServerUrl = ((validData(targetServerId)) ? SERVERS[targetServerId] : undefined);
  const denyConnection = ((!validData(queryData.balancer)) || (!validData(queryData.userId)));
  const connectionText = ((denyConnection) ? 'BLOCKED: no user' : `ACCEPTED ${queryData.userName} (#${queryData.userId})`) + ' :: ';
  const wantLog = !denyConnection || displayBlockedConnections;
  
  return [ queryData, targetServerId, targetServerUrl, denyConnection, connectionText, wantLog ];
}

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
    
    if (!denyConnection) {
      const ipAddr = getIPandLog(req, wantLog, connectionText);

      // slip the non-proxied original IP address of the player into the request URL so the battle node understands what IPs belong to which user
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


function dropWebsocketConnection (oSocket) {
    try {
      oSocket.close();
    } catch (err) {
    }
    return;
}

proxyServer.on('upgrade', function (req, socket, head) {
  try {
    const [ queryData, targetServerId, targetServerUrl, denyConnection, connectionText, wantLog ] = getConnectionValues(req);
    
    if (wantLog) {
      console.log(`Balancer - ${queryData.balancer} | Proxying WebS to ${targetServerId}`);
    }

    if (!denyConnection) {
      const ipAddr = getIPandLog(req, wantLog, connectionText);
    
      // slip the non-proxied original IP address of the player into the request URL so the battle node understands what IPs belong to which user
      req.url = `${req.url}&ipAddr=${ipAddr}`;
      
      proxy.ws(req, socket, head, { target: targetServerUrl.replace('https','http') });
      return;
    }
  } catch (err) {
    console.log(err);
  }
  
  dropWebsocketConnection(socket);
  return false;
});

proxyServer.listen(PORT);
