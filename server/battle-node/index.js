import express from 'express';
import bodyParser from 'body-parser';
import Battle from './core';
import cors from 'cors';
import { isDev, serverUrl, port } from './config';
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

io.on('connection', (socket) => {
  console.log('connected');
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
