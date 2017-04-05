import { Meteor } from 'meteor/meteor';
import '/imports/startup/both';
import '/imports/startup/server';

import { resumeBattle } from '/server/api/battles/battles';
import { Battles } from '/imports/api/battles/battles';
import { Crafting } from '/imports/api/crafting/crafting';

Meteor.startup(() => {
  // Start processing abandoned battles
  Battles.find({
    finished: false
  }).fetch().forEach((existingBattle, battleIndex) => {
    Meteor.setTimeout(() => {
      resumeBattle(existingBattle);
    }, Math.random() * 1000 * battleIndex);
  });

  // Ensure indexes on key databases
  Crafting._ensureIndex({ owner: 1 });
});
