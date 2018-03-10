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
});

app.use(bodyParser.urlencoded({ extended: true }) );
app.use(bodyParser.json());

app.post('/battle', (req, res) => {
  const { battle, passphrase } = req.body;
  if (passphrase !== 'dqv$dYT65YrU%s') {
    return res.send(battle._id);
  }

  battles[battle._id] = new Battle(battle, battle._id, io, (id, intervalId) => {
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

const testBattle = {
  "createdAt": "2018-03-05T10:27:56.708Z",
  "updatedAt": "2018-03-05T10:27:56.708Z",
  "owners": [
    "zhqcsgKKaEzPZ6AyY"
  ],
  "wave": 1,
  "level": 1,
  "historyStats": {
    "zhqcsgKKaEzPZ6AyY": {
      "damageDone": 0,
      "damageTaken": 0,
      "healingDone": 0,
      "name": "guest_580994136"
    }
  },
  "tickEvents": [],
  "units": [
    {
      "id": "zhqcsgKKaEzPZ6AyY",
      "owner": "zhqcsgKKaEzPZ6AyY",
      "towerContributionsToday": 0,
      "isTowerContribution": false,
      "abilities": [
        {
          "id": "slash",
          "level": 1,
          "currentCooldown": 0,
          "totalCasts": 0
        }
      ],
      "name": "guest_580994136",
      "buffs": [],
      "stats": {
        "attack": 0,
        "attackMax": 0.5,
        "attackSpeed": 0.5,
        "criticalChance": 0,
        "healingPower": 0,
        "criticalDamage": 2,
        "accuracy": 1,
        "defense": 1,
        "health": 50,
        "healthMax": 50,
        "damageTaken": 1,
        "magicPower": 0,
        "armor": 1,
        "magicArmor": 0,
        "attackSpeedTicks": 8
      },
      "xpDistribution": {
        "attack": 0.5,
        "health": 0.5
      },
      "tickOffset": 6,
      "icon": "character.svg",
      "target": "6GTHuDpTGqi2Aj4NK"
    }
  ],
  "useStreamy": false,
  "enemies": [
    {
      "id": "a8B2q2H5epE9xeuha",
      "stats": {
        "health": 4.76,
        "healthMax": 4.76,
        "attack": 0.24,
        "magicPower": 1,
        "attackMax": 0.324,
        "attackSpeed": 0.5,
        "accuracy": 2,
        "armor": 3.25,
        "defense": 1.67,
        "magicArmor": 2.8,
        "criticalChance": 0,
        "criticalDamage": 2,
        "damageTaken": 1,
        "attackSpeedTicks": 8
      },
      "icon": "worm.svg",
      "buffs": [],
      "target": "zhqcsgKKaEzPZ6AyY",
      "enemyId": "pjwQpDCutXBfN9bgM",
      "name": "worm",
      "tickOffset": 5
    },
    {
      "id": "WJLMqGqaTDXr6YGZE",
      "stats": {
        "health": 4.76,
        "healthMax": 4.76,
        "attack": 0.24,
        "magicPower": 1,
        "attackMax": 0.324,
        "attackSpeed": 0.5,
        "accuracy": 2,
        "armor": 3.25,
        "defense": 1.67,
        "magicArmor": 2.8,
        "criticalChance": 0,
        "criticalDamage": 2,
        "damageTaken": 1,
        "attackSpeedTicks": 8
      },
      "icon": "worm.svg",
      "buffs": [],
      "target": "zhqcsgKKaEzPZ6AyY",
      "enemyId": "FCcf6M2pM42QP4WHj",
      "name": "worm",
      "tickOffset": 4
    },
    {
      "id": "v5nw8MjiL3XMnLNnf",
      "stats": {
        "health": 4.76,
        "healthMax": 4.76,
        "attack": 0.24,
        "magicPower": 1,
        "attackMax": 0.324,
        "attackSpeed": 0.5,
        "accuracy": 2,
        "armor": 3.25,
        "defense": 1.67,
        "magicArmor": 2.8,
        "criticalChance": 0,
        "criticalDamage": 2,
        "damageTaken": 1,
        "attackSpeedTicks": 8
      },
      "icon": "worm.svg",
      "buffs": [],
      "target": "zhqcsgKKaEzPZ6AyY",
      "enemyId": "XMQsJ9L9Aycuep7fe",
      "name": "worm",
      "tickOffset": 5
    },
    {
      "id": "6GTHuDpTGqi2Aj4NK",
      "stats": {
        "health": 4.76,
        "healthMax": 4.76,
        "attack": 0.24,
        "magicPower": 1,
        "attackMax": 0.324,
        "attackSpeed": 0.5,
        "accuracy": 2,
        "armor": 3.25,
        "defense": 1.67,
        "magicArmor": 2.8,
        "criticalChance": 0,
        "criticalDamage": 2,
        "damageTaken": 1,
        "attackSpeedTicks": 8
      },
      "icon": "worm.svg",
      "buffs": [],
      "target": "zhqcsgKKaEzPZ6AyY",
      "enemyId": "jMxqzey6SdxsFFuFh",
      "name": "worm",
      "tickOffset": 6
    },
    {
      "id": "5bJQRe395KCwkeH9n",
      "stats": {
        "health": 4.76,
        "healthMax": 4.76,
        "attack": 0.24,
        "magicPower": 1,
        "attackMax": 0.324,
        "attackSpeed": 0.5,
        "accuracy": 2,
        "armor": 3.25,
        "defense": 1.67,
        "magicArmor": 2.8,
        "criticalChance": 0,
        "criticalDamage": 2,
        "damageTaken": 1,
        "attackSpeedTicks": 8
      },
      "icon": "worm.svg",
      "buffs": [],
      "target": "zhqcsgKKaEzPZ6AyY",
      "enemyId": "u7eJGZPB4ZncHJgSF",
      "name": "worm",
      "tickOffset": 5
    }
  ],
  "totalXpGain": 20,
  "deadUnits": [],
  "deadEnemies": [],
  "tick": 0,
  "_id": "NpZ6eqBKMxhwT687Q"
}
/*
battles[testBattle.id] = new Battle(testBattle, 'balancer_abc', io, (id, clearId) => {
  clearInterval(clearId);
});*/

server.listen(port);
