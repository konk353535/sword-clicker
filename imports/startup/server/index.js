import { AccountsTemplates } from 'meteor/useraccounts:core';
import { Skills } from '../../api/skills/skills.js';
import { Floors } from '../../api/floors/floors.js';
import { Mining, MiningSpace } from '../../api/mining/mining.js';
import { Combat } from '../../api/combat/combat.js';
import { addItem } from '/server/api/items/items.js';

import { MINING } from '/server/constants/mining/index.js';
import { ITEMS } from '/server/constants/items/index.js';
import { FLOORS } from '/server/constants/floors/index.js';

import '/imports/api/users/users.js';
import '/server/api/users/users.js';

AccountsTemplates.configure({
  postSignUpHook: function (userId, info) {
    Skills.insert({
      type: 'mining',
      createdAt: new Date(),
      owner: userId,
      username: info.username
    });

    Skills.insert({
      type: 'total',
      createdAt: new Date(),
      owner: userId,
      username: info.username
    });

    Mining.insert({
      owner: userId,
      lastGameUpdated: new Date()
    });

    Combat.insert({
      owner: userId,
      stats: {
        health: 50,
        energy: 25
      }
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
  }
});

const currentFloor = Floors.findOne();

if (!currentFloor) {
  const floorCounts = FLOORS.getWaveCounts();

  // Create our first floor
  Floors.insert({
    floor: 1,
    createdAt: new Date(),
    easyWaves: floorCounts.easy,
    easyWavesTotal: floorCounts.easy,
    hardWaves: floorCounts.hard,
    hardWavesTotal: floorCounts.hard,
    veryHardWaves: floorCounts.veryHard,
    veryHardWavesTotal: floorCounts.veryHard,
  });
}
