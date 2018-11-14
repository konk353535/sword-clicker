import express from 'express';
import bodyParser from 'body-parser';
import Battle from './core';
import cors from 'cors';
import { isDev, serverUrl, port } from './config';
import { ENEMIES } from '../constants/enemies';
import { balancers, Balancer } from './core';

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

io.on('connection', (socket) => {
  //console.log(socket);
  
  try {
    allConnections.push(socket);
    
    console.log(`-->  connected to ${socket.conn.remoteAddress}, connections = ${allConnections.length}`);    
  } catch (err) {
    console.log('-->  connected');
  }
  
  socket.on('disconnect', function() {
    try {
      allConnections.pop(socket);
      
      console.log(`<--  disconnected from ${socket.conn.remoteAddress}, connections = ${allConnections.length}`);
    } catch (err) {
      console.log('<--  disconnected');
    }
  });
});

app.use(bodyParser.urlencoded({ extended: true }) );
app.use(bodyParser.json());

app.post('/battle', (req, res) => {
  const { battle, passphrase, balancer } = req.body;
  if (passphrase !== 'dqv$dYT65YrU%s') {
    return res.send(battle._id);
  }

  battles[battle._id] = new Battle(battle, balancer, io, (id, intervalId) => {
    clearInterval(intervalId);
    delete battles[id];
  });

  // Creates a battle
  res.send(battle._id);
});

app.get('/balancer/:balancerId', (req, res) => {
  const balancerId = req.params.balancerId;

  if (balancers[balancerId]) {
    return res.sendStatus(200);
  }

  balancers[balancerId] = new Balancer(balancerId, io);
  res.sendStatus(200);
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

  res.sendStatus(201);
});

server.listen(port);
