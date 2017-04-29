import { Meteor } from 'meteor/meteor';
import '/imports/startup/both';
import '/imports/startup/server';

import { resumeBattle } from '/server/api/battles/battles';

import { Battles } from '/imports/api/battles/battles';
import { Crafting } from '/imports/api/crafting/crafting';
import { Items } from '/imports/api/items/items';
import { Mining, MiningSpace } from '/imports/api/mining/mining';
import { Skills } from '/imports/api/skills/skills';

Meteor.startup(() => {

  // Start processing abandoned battles
  Battles.find({
    finished: false
  }).fetch().forEach((existingBattle, battleIndex) => {
    Meteor.setTimeout(() => {
      resumeBattle(existingBattle);
    }, Math.random() * 50 * battleIndex);
  });

  // Ensure indexes on key databases
  Crafting._ensureIndex({ owner: 1 });
  Skills._ensureIndex({ owner: 1 });
  Items._ensureIndex({ owner: 1 });
  Mining._ensureIndex({ owner: 1 });
  MiningSpace._ensureIndex({ owner: 1 });
  Battles._ensureIndex({ owners: 1 });

});
