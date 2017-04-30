import { Meteor } from 'meteor/meteor';
import '/imports/startup/both';
import '/imports/startup/server';

import { resumeBattle } from '/server/api/battles/battles';

import { Battles, BattlesList } from '/imports/api/battles/battles';
import { Crafting } from '/imports/api/crafting/crafting';
import { BattleActions } from '/imports/api/battles/battleActions';
import { Items } from '/imports/api/items/items';
import { Mining, MiningSpace } from '/imports/api/mining/mining';
import { Skills } from '/imports/api/skills/skills';

Meteor.startup(() => {

  // Start processing abandoned battles
  BattlesList.find({}).fetch().forEach((existingBattle, battleIndex) => {
    Meteor.setTimeout(() => {
      resumeBattle(existingBattle._id);
    }, Math.random() * 1000);
  });

  // Ensure indexes on key databases
  Crafting._ensureIndex({ owner: 1 });
  Skills._ensureIndex({ owner: 1 });
  Items._ensureIndex({ owner: 1 });
  Mining._ensureIndex({ owner: 1 });
  MiningSpace._ensureIndex({ owner: 1 });
  Battles._ensureIndex({ owners: 1 });
  BattleActions._ensureIndex({ battleId: 1 });

});
