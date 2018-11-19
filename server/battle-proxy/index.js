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
  const balancer = queryData.balancer;
  if (!balancer) {
    return false;
  }
  const targetServerId = consistentHash.getNode(balancer);
  const targetServerUrl = SERVERS[targetServerId];

  console.log(`Balancer - ${balancer} | Proxying to ${targetServerId}`);
  
  let ipAddr = 'unknown';
  
  try {
    ipAddr = req.headers['x-forwarded-for'];
    if (ipAddr === undefined || ipAddr.length === 0) {
      ipAddr = req.headers['cf-connecting-ip'];
    }
    if (ipAddr === undefined || ipAddr.length === 0) {
      ipAddr = 'unknown';
    }
    let cloudflareRay = req.headers['cf-ray'] ? req.headers['cf-ray'] : 'unknown';
    let cloudflareCountry = req.headers['cf-ipcountry'] ? req.headers['cf-ipcountry'] : 'unknown';
    
    console.log(`    ${ipAddr} IP via @ ${cloudflareCountry}@${cloudflareRay} (${queryData.userName}/${queryData.userId})`);
  }
  catch (err) {
  }
  
  if (!queryData.userName || queryData.userName === 'undefined' || queryData.userName === '' || queryData.userName === 'unknown') {
    console.log(`    !!  DENIED: no user !!`);
    return false;
  }
  
  // slip the non-proxied original IP address of the player into the request URL so the battle node understands what IPs belong to what users
  req.url = `${req.url}&ipAddr=${ipAddr}`;

  proxy.web(req, res, { target: targetServerUrl });
});

proxyServer.on('upgrade', function (req, socket, head) {
  const url = req.url.split('?')[1];
  const queryData = parse(url);
  const balancer = queryData.balancer;
  if (!balancer) {
    return false;
  }
  const targetServerId = consistentHash.getNode(balancer);
  const targetServerUrl = SERVERS[targetServerId];

  console.log(`Balancer - ${balancer} | Proxying WS to ${targetServerId}`);

  let ipAddr = 'unknown';
  
  try {
    ipAddr = req.headers['x-forwarded-for'];
    if (ipAddr === undefined || ipAddr.length === 0) {
      ipAddr = req.headers['cf-connecting-ip'];
    }
    if (ipAddr === undefined || ipAddr.length === 0) {
      ipAddr = 'unknown';
    }
    let cloudflareRay = req.headers['cf-ray'] ? req.headers['cf-ray'] : 'unknown';
    let cloudflareCountry = req.headers['cf-ipcountry'] ? req.headers['cf-ipcountry'] : 'unknown';
    
    console.log(`    ${ipAddr} IP via @ ${cloudflareCountry}@${cloudflareRay} (${queryData.userName}/${queryData.userId})`);
  }
  catch (err) {
  }

  if (!queryData.userName || queryData.userName === 'undefined' || queryData.userName === '' || queryData.userName === 'unknown') {
    console.log(`    !!  DENIED: no user !!`);
    return false;
  }
  
  // slip the non-proxied original IP address of the player into the request URL so the battle node understands what IPs belong to what users
  req.url = `${req.url}&ipAddr=${ipAddr}`;
  
  proxy.ws(req, socket, head, { target: targetServerUrl.replace('https','http') });
});

proxyServer.listen(PORT);
