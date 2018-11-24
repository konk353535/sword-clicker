import express from 'express';
import bodyParser from 'body-parser';
import Battle from './core';
import cors from 'cors';
import { isDev, serverUrl, port } from './config';
import { ENEMIES } from '../constants/enemies';
import { balancers, Balancer } from './core';

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

const app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

const battles = {};

if (isDev) {
  var corsOptions = {
    origin: serverUrl,
    credentials: true
  };  
}

app.use(cors(corsOptions));

let allConnections = [];

function getUniqueId (socket) {
  try {
    return `${socket.handshake.query.userId}#${socket.handshake.query.conSeed}`;
  } catch (err) {
  }
  return "?";
}

io.on('error', (x, y, z) => {
  console.log('x');
  console.log(x);
  console.log('y');
  console.log(y);
  console.log('z');
  console.log(z);
});

function getInfoFromSocket (socket) {
  let userName = 'unknown';
  try {
    userName = socket.handshake.query.userName;
  } catch (err) {
  }
  
  let userId = 'unknown';
  try {
    userId = socket.handshake.query.userId;
  } catch (err) {
  }    
   
  let ipAddr = 'unknown';
  try {
    ipAddr = socket.handshake.query.ipAddr; // trust the remote connection (our balancer/proxy) to report the correct (and probably forwarded from Cloudflare) IP
  } catch (err) {
  }
  if (!ipAddr || ipAddr === '' || ipAddr === 'undefined' || ipAddr === 'unknown') {
    ipAddr = socket.conn.remoteAddress; // use Cloudflare's or whatever other raw IP we have as a backup
  }
  
  return { userName, userId, ipAddr };
};

io.on('connection', (socket) => {

  let { userName, userId, ipAddr } = getInfoFromSocket(socket);

  socket.on('disconnect', function() {
    allConnections.pop(socket);
    
    let { userName, userId, ipAddr } = getInfoFromSocket(socket);
    
    console.log(`<--  disconnected from ${ipAddr} (${userName}/${userId}), connections = ${allConnections.length}`);
  });
  
  try {    
    const thisId = getUniqueId(socket);

    for (let i = 0; i < allConnections.length; i++) {
      if (i < allConnections.length) {
        if (getUniqueId(allConnections[i]) === thisId) {
          dropWebsocketConnection(allConnections[i]);
          allConnections.splice(i, 1);
          console.log(`<--  disconnected from ${ipAddr} (${userName}/${userId}) [DUPLICATE], connections = ${allConnections.length}`);
          i--;
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
  
  allConnections.push(socket);
  
  
  console.log(`-->  connected to ${ipAddr} (${userName}/${userId}), connections = ${allConnections.length}`);    
  
  if (!userId || userId === '' || userId === 'undefined' || userId === 'unknown') {
    console.log(`    !!  DENIED: no user !!`);
    try {
      dropWebsocketConnection(socket);
    } catch (err) {
    }
  }
});

app.use(bodyParser.urlencoded({ extended: true }) );
app.use(bodyParser.json());

app.post('/battle', (req, res) => {
  const { battle, passphrase, balancer } = req.body;

  if (passphrase === 'dqv$dYT65YrU%s') {
    battles[battle._id] = new Battle(battle, balancer, io, (id, intervalId) => {
      clearInterval(intervalId);
      delete battles[id];
    });
  }

  // Creates a battle
  return res.send(battle._id);
});

app.get('/balancer/:balancerId', (req, res) => {
  const balancerId = req.params.balancerId;

  if (balancers[balancerId]) {
    return res.sendStatus(200);
  }

  balancers[balancerId] = new Balancer(balancerId, io);
  return res.sendStatus(200);
});

app.delete('/battle/:battleId', (req, res) => {
  const battleId = req.params.battleId;

  const targetBattle = battles[battleId];
  if (!targetBattle) {
    return res.sendStatus(404);
  }

  targetBattle.removeBattle(targetBattle.id, targetBattle.intervalId);

  if (battles[battleId]) {
    return res.sendStatus(500);
  }

  return res.sendStatus(201);
});

// `httpServer` inherits `net` emitted events
// https://nodejs.org/api/net.html#net_event_timeout
server.on('timeout', function (socket) {
  // Emitted if the socket times out from inactivity. This is only to notify that the
  // socket has been idle. The user must manually close the connection.

  dropWebsocketConnection(socket)
});

// `httpServer` inherits `net` emitted events
// https://nodejs.org/api/net.html#net_event_error_1
server.on('error', function (err) {
  // Emitted when an error occurs. The 'close' event will be called directly following this event.

  console.log('Battle server error emitted:');
  console.log(err);
  
  // Note: since the socket is automatically closed, no further logic here.
});

// `httpServer` event
// https://nodejs.org/api/http.html#http_event_clienterror
server.on('clientError', function (err, socket) {
  // If a client connection emits an 'error' event, it will be forwarded here.  Listener of this
  // event is responsible for closing/destroying the underlying socket.
  
  console.log('Battle server clientError emitted:');
  console.log(err);
  
  dropWebsocketConnection(socket)
});

server.listen(port);
