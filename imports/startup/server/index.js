import { AccountsTemplates } from 'meteor/useraccounts:core';
import { Skills } from '../../api/skills/skills.js';
import { Mining } from '../../api/mining/mining.js';
import { MINING } from '../../../server/constants.js';

AccountsTemplates.configure({
  postSignUpHook: function (userId, info) {
    Skills.insert({
      type: 'mining',
      createdAt: new Date(),
      owner: userId
    });

    const initOreMatrix = [{
      empty: false,
      oreId: MINING.ores.stone.id,
      health: MINING.ores.stone.maxHealth 
    }];

    for (let i = 0; i < 15; i++) {
      initOreMatrix.push({
        empty: true
      })
    }

    console.log(initOreMatrix);

    Mining.insert({
      oreMatrix: initOreMatrix,
      owner: userId
    });
  }
});
