import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random'

import { Battles } from '/imports/api/battles/battles';
import { Combat } from '/imports/api/combat/combat';

import { BATTLES } from '/server/constants/battles'; // List of encounters
import { ENEMIES } from '/server/constants/enemies'; // List of enemies
import { COMBAT } from '/server/constants/combat'; // List of available combat stats

const startBattle = function (battleId) {
  // Ensure user isn't already in a battle
  const currentBattle = Battles.findOne({ owners: Meteor.userId() });
  if (currentBattle) {
    return;
  }

  // Find specified battleId
  const battleConstants = BATTLES[battleId];

  // Ensure valid battle id
  if (!battleConstants) {
    return;
  }

  const newBattle = {
    createdAt: new Date(),
    updatedAt: new Date(),
    owners: [Meteor.userId()],
    tickEvents: [],
    units: [],
    enemies: []
  }

  // Current users combat stats
  const userCombat = Combat.findOne({ owner: Meteor.userId() });
  
  // Inject user into fights units
  const userCombatStats = {};
  COMBAT.statsArr.forEach((statName) => {
    if (userCombat[statName]) {
      userCombatStats[statName] = userCombat[statName];
    }
  });
  newBattle.units.push({
    id: Meteor.userId(),
    owner: Meteor.userId(),
    stats: userCombatStats
  });

  // Inject enemies into the fight
  battleConstants.enemies.forEach((enemy) => {
    const enemyStats = ENEMIES[enemy.id];
    for (let i = 0; i < enemy.amount; i++) {
      newBattle.enemies.push({
        id: Random.id(),
        stats: enemyStats
      });
    }
  });

  // Save battle
  Battles.insert(newBattle);
}

Meteor.methods({
  'battles.randomBattle'() {
    // Eventually select a random battle appropriate to users level
    startBattle('rat');
  }
});

Meteor.publish('battles', function() {
  return Combat.find({
    owners: this.userId
  });
});
