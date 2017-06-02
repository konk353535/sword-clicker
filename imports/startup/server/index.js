import { AccountsTemplates } from 'meteor/useraccounts:core';
import { Random } from 'meteor/random';

import { Skills } from '../../api/skills/skills.js';
import { Floors } from '../../api/floors/floors.js';
import { Mining, MiningSpace } from '../../api/mining/mining.js';
import { Crafting } from '../../api/crafting/crafting.js';
import { Combat } from '../../api/combat/combat.js';
import { Abilities } from '../../api/abilities/abilities.js';
import { addItem } from '/server/api/items/items.js';
import { Items } from '/imports/api/items/items.js';
import { updateMiningStats } from '/server/api/mining/mining.js';
import { updateCombatStats } from '/server/api/combat/combat.js';

import { MINING } from '/server/constants/mining/index.js';
import { ITEMS } from '/server/constants/items/index.js';
import { SKILLS } from '/server/constants/skills/index.js';
import { FLOORS } from '/server/constants/floors/index.js';

import '/imports/api/users/users.js';
import '/server/api/users/users.js';
import './crons.js';

Accounts.onCreateUser((options, user) => {
  user._id = Random.id();
  const userId = user._id;
  user.uiState = {
    showChat: true
  }
  if (options.isGuest) {
    user.isGuest = options.isGuest;
  }

  Skills.insert({
    type: 'mining',
    createdAt: new Date(),
    owner: userId,
    username: user.username
  });

  Skills.insert({
    type: 'defense',
    createdAt: new Date(),
    owner: userId,
    username: user.username
  });

  Skills.insert({
    type: 'attack',
    createdAt: new Date(),
    owner: userId,
    username: user.username
  });

  Skills.insert({
    type: 'health',
    createdAt: new Date(),
    owner: userId,
    level: SKILLS.health.baseLevel,
    username: user.username
  });

  Skills.insert({
    type: 'crafting',
    createdAt: new Date(),
    owner: userId,
    username: user.username
  });

  Skills.insert({
    type: 'total',
    createdAt: new Date(),
    owner: userId,
    username: user.username
  });

  Crafting.insert({
    owner: userId,
    currentlyCrafting: []
  });

  Mining.insert({
    owner: userId,
    lastGameUpdated: new Date(),
    miners: [{
      id: MINING.miners.primitive_miner.id,
      amount: 1
    }],
    prospectors: [{
      id: MINING.prospectors.stone.id,
      amount: 1
    }]
  });

  Combat.insert({
    owner: userId,
    stats: {
      health: 50,
      healthMax: 50,
      energy: 40
    }
  });

  Abilities.insert({
    owner: userId,
    learntAbilities: [{
      "abilityId": "execute",
      "level": 1,
      "equipped": true,
      "slot": "mainHand",
      "currentCooldown": 0
    }]
  });

  MiningSpace.insert({
    owner: userId,
    oreId: MINING.ores.stone.id,
    health: MINING.ores.stone.healthMax,
    index: 0
  });

  for (let i = 1; i < 16; i++) {
    MiningSpace.insert({
      owner: userId,
      oreId: MINING.ores.stone.id,
      health: MINING.ores.stone.healthMax,
      index: i
    });
  }

  addItem(ITEMS['primitive_pickaxe'].id, 1, userId);
  addItem(ITEMS['copper_dagger'].id, 1, userId);
  addItem(ITEMS['lettice'].id, 5, userId);

  // Equip the pick axe
  Items.update({
    owner: userId,
    itemId: ITEMS['primitive_pickaxe'].id
  }, {
    $set: {
      equipped: true,
      slot: ITEMS['primitive_pickaxe'].slot
    }
  });

  // Equip dagger
  Items.update({
    owner: userId,
    itemId: ITEMS['copper_dagger'].id
  }, {
    $set: {
      equipped: true,
      slot: ITEMS['copper_dagger'].slot
    }
  });

  // Update mining stats
  updateMiningStats(userId, true);
  // Update combat stats
  updateCombatStats(userId, user.username);

  return user;
});

const currentFloor = Floors.findOne();

if (!currentFloor) {
  const pointsMax = FLOORS.getNewPointCount(1, 10);

  // Create our first floor
  Floors.insert({
    floor: 1,
    createdAt: new Date(),
    points: 0,
    pointsMax
  });
}

const MINUTE = 60 * 1000;
DDPRateLimiter.addRule({ type: 'method', name: 'SimpleChat.newMessage' }, 15, 1 * MINUTE);
