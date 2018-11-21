import http from 'http';
import httpProxy from 'http-proxy';
import ConsistentHashing from 'consistent-hashing';
import { parse } from 'query-string';
import { SERVERS, PORT } from './config';

const consistentHash = new ConsistentHashing(Object.keys(SERVERS));

// Create a proxy server with custom application logic
//
const proxy = httpProxy.createProxyServer({
  ws: true
});

//
// Create your custom server and just call `proxy.web()` to proxy
// a web request to the target passed in the options
// also you can use `proxy.ws()` to proxy a websockets request
//
const proxyServer = http.createServer(function(req, res) {
  const url = req.url.split('?')[1];
  const queryData = parse(url);
  const targetServerId = ((queryData.balancer) ? consistentHash.getNode(queryData.balancer) : undefined);
  const targetServerUrl = ((targetServerId) ? SERVERS[targetServerId] : undefined);
  const denyConnection = (!queryData.balancer || !queryData.userId || queryData.userId === 'undefined' || queryData.userId === '' || queryData.userId === 'unknown');
  const connectionText = ((denyConnection) ? 'BLOCKED: no user' : `ACCEPTED ${queryData.userName} (#${queryData.userId})`) + ' :: ';
  const wantLog = !denyConnection; // change this to just 'true' if we want to display blocked connections
  
  if (wantLog) {
    console.log(`Balancer - ${queryData.balancer} | Proxying HTTP to ${targetServerId}`);
  }
  
  let ipAddr = 'unknown';
  
  if (!denyConnection && wantLog) {
    try {
      ipAddr = req.connection.remoteAddress;
      let proxiedAddr = req.headers['x-forwarded-for'];
      if (proxiedAddr === undefined || proxiedAddr.length === 0) {
        proxiedAddr = req.headers['cf-connecting-ip'];
      }
      if (proxiedAddr === undefined || proxiedAddr.length === 0) {
        proxiedAddr = 'unknown';
      }
      if (proxiedAddr !== 'unknown') {
        ipAddr = `${proxiedAddr} via ${ipAddr}`;
      }
      let cloudflareRay = req.headers['cf-ray'] ? req.headers['cf-ray'] : 'unknown';
      let cloudflareCountry = req.headers['cf-ipcountry'] ? req.headers['cf-ipcountry'] : 'unknown';
      
      if (cloudflareRay === 'unknown') {
        console.log(`    ${connectionText}${ipAddr}`);
      } else {
        console.log(`    ${connectionText}${ipAddr} routed @ ${cloudflareCountry}@${cloudflareRay}`);
      }
    }
    catch (err) {
      console.log(`    ${connectionText}${ipAddr}`);
    }
  }
  
  if (denyConnection) {
    try {
      res.writeHead(403, {'Content-Type': 'text/plain'});
      res.write("Unauthorized.");
      res.end();
    } catch (err) {
    }
    return false;
  }
  
  // slip the non-proxied original IP address of the player into the request URL so the battle node understands what IPs belong to which user
  req.url = `${req.url}&ipAddr=${ipAddr}`;

  proxy.web(req, res, { target: targetServerUrl });
});

proxyServer.on('upgrade', function (req, socket, head) {
  const url = req.url.split('?')[1];
  const queryData = parse(url);
  const targetServerId = ((queryData.balancer) ? consistentHash.getNode(queryData.balancer) : undefined);
  const targetServerUrl = ((targetServerId) ? SERVERS[targetServerId] : undefined);
  const denyConnection = (!queryData.balancer || !queryData.userId || queryData.userId === 'undefined' || queryData.userId === '' || queryData.userId === 'unknown');
  const connectionText = ((denyConnection) ? 'BLOCKED: no user' : `ACCEPTED ${queryData.userName} (#${queryData.userId})`) + ' :: ';
  const wantLog = !denyConnection; // change this to just 'true' if we want to display blocked connections
  
  if (wantLog) {
    console.log(`Balancer - ${queryData.balancer} | Proxying WebS to ${targetServerId}`);
  }

  let ipAddr = 'unknown';

  if (!denyConnection && wantLog) {
    try {
      ipAddr = req.connection.remoteAddress;
      let proxiedAddr = req.headers['x-forwarded-for'];
      if (proxiedAddr === undefined || proxiedAddr.length === 0) {
        proxiedAddr = req.headers['cf-connecting-ip'];
      }
      if (proxiedAddr === undefined || proxiedAddr.length === 0) {
        proxiedAddr = 'unknown';
      }
      if (proxiedAddr !== 'unknown') {
        ipAddr = `${proxiedAddr} via ${ipAddr}`;
      }
      let cloudflareRay = req.headers['cf-ray'] ? req.headers['cf-ray'] : 'unknown';
      let cloudflareCountry = req.headers['cf-ipcountry'] ? req.headers['cf-ipcountry'] : 'unknown';
      
      if (cloudflareRay === 'unknown') {
        console.log(`    ${connectionText}${ipAddr}`);
      } else {
        console.log(`    ${connectionText}${ipAddr} routed @ ${cloudflareCountry}@${cloudflareRay}`);
      }
    }
    catch (err) {
        console.log(`    ${connectionText}${ipAddr}`);
    }
  }

  if (denyConnection) {
    try {
      socket.close()
    } catch (err) {
    }
    return false;
  }
  
  // slip the non-proxied original IP address of the player into the request URL so the battle node understands what IPs belong to which user
  req.url = `${req.url}&ipAddr=${ipAddr}`;
  
  proxy.ws(req, socket, head, { target: targetServerUrl.replace('https','http') });
});

proxyServer.listen(PORT);
