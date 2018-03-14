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
  const balancer = parse(url).balancer;
  const targetServerId = consistentHash.getNode(balancer);
  const targetServerUrl = SERVERS[targetServerId];

  console.log(`Balancer - ${balancer} | Proxying to ${targetServerId}`);
  proxy.web(req, res, { target: targetServerUrl });
});

proxyServer.on('upgrade', function (req, socket, head) {
  const url = req.url.split('?')[1];
  const balancer = parse(url).balancer;
  const targetServerId = consistentHash.getNode(balancer);
  const targetServerUrl = SERVERS[targetServerId];

  console.log(`Balancer - ${balancer} | Proxying WS to ${targetServerId}`);
  proxy.ws(req, socket, head, { target: targetServerUrl.replace('https', 'http') });
});

proxyServer.listen(PORT);
