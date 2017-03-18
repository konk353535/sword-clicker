import { AccountsTemplates } from 'meteor/useraccounts:core';
import { Skills } from '../../api/skills/skills.js';
import { Mining, MiningSpace } from '../../api/mining/mining.js';
import { Combat } from '../../api/combat/combat.js';

import { MINING } from '/server/constants/mining/index.js';

import '/imports/api/users/users.js';
import '/server/api/users/users.js';

AccountsTemplates.configure({
  postSignUpHook: function (userId, info) {
    Skills.insert({
      type: 'mining',
      createdAt: new Date(),
      owner: userId
    });

    Mining.insert({
      owner: userId,
      lastGameUpdated: new Date()
    });

    Combat.insert({
      owner: userId
    });

    MiningSpace.insert({
      owner: userId,
      oreId: MINING.ores.stone.id,
      health: MINING.ores.stone.maxHealth,
      index: 0
    });

    for (let i = 1; i < 16; i++) {
      MiningSpace.insert({
        owner: userId,
        oreId: null,
        index: i
      });
    }
  }
});
