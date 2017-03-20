import { Meteor } from 'meteor/meteor';
import '/imports/startup/both';
import '/imports/startup/server';

import { resumeBattle } from '/server/api/battles/battles';
import { Battles } from '/imports/api/battles/battles';

Meteor.startup(() => {
  // Start processing abandoned battles
  Battles.find({
    finished: false
  }).fetch().forEach((existingBattle, battleIndex) => {
    Meteor.setTimeout(() => {
      resumeBattle(existingBattle);
    }, Math.random() * 1000 * battleIndex);
  });
});
