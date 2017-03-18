import { Meteor } from 'meteor/meteor';
import { Skills } from '/imports/api/skills/skills';
import { Items } from '/imports/api/items/items';
import { Combat } from '/imports/api/combat/combat';

import { ITEMS } from '/server/constants/items.js';
import { SKILLS } from '/server/constants/skills.js';
import { BATTLES } from '/server/constants/battles.js';

export const updateCombatStats = function () {
  // Build up our object of skills
  const playerStats = {
    attack: 0,
    attackMax: 0,
    attackSpeed: 0,
    accuracy: 0,
    health: 0,
    maxHealth: 0,
    defense: 0,
    armor: 0,
    xpDistribution: {}
  };

  // Fetch all equipped combat items
  const combatItems = Items.find({
    owner: Meteor.userId(),
    category: 'combat',
    equipped: true
  }).fetch();

  // Apply combat items
  combatItems.forEach((combatItem) => {
    combatItem.constants = ITEMS[combatItem.itemId];
    if (combatItem.constants.stats) {
      const itemStats = JSON.parse(JSON.stringify(combatItem.constants.stats));
      if (combatItem.extraStats) {
        Object.keys(combatItem.extraStats).forEach((extraStatName) => {
          console.log(extraStatName);
          console.log(combatItem.extraStats[extraStatName]);
          if (itemStats[extraStatName]) {
            itemStats[extraStatName] += combatItem.extraStats[extraStatName];
          }
        });
      }
      Object.keys(itemStats).forEach((statKey) => {
        if (playerStats[statKey] !== undefined) {
          playerStats[statKey] += itemStats[statKey];
        }
      });

      if (combatItem.constants.slot === 'mainHand') {
        playerStats.xpDistribution = BATTLES.xpDistribution(combatItem.constants.weaponType);
      }
    }
  });

  // Fetch all users skill levels
  const combatSkills = Skills.find({
    owner: Meteor.userId(),
    type: {
      $in: ['attack', 'health', 'defense']
    }
  }).fetch();

  // Apply user skills
  combatSkills.forEach((combatSkill) => {
    const skillLevel = combatSkill.level;
    combatSkill.constants = SKILLS[combatSkill.type];
    if (combatSkill.constants.statsPerLevel) {
      const skillStatsPerLevel = JSON.parse(JSON.stringify(combatSkill.constants.statsPerLevel));
      Object.keys(skillStatsPerLevel).forEach((statKey) => {
        if (playerStats[statKey] !== undefined) {
          playerStats[statKey] += (skillStatsPerLevel[statKey] * skillLevel);
        }
      });
    }
  });

  // If no weapon default to 0.5 attackspeed
  if (playerStats.attackSpeed === 0) {
    playerStats.attackSpeed = 0.5;
  }

  console.log(playerStats);

  // Set player stats
  Combat.update({
    owner: Meteor.userId()
  }, {
    $set: playerStats
  });
};

Meteor.publish('combat', function() {
  return Combat.find({
    owner: this.userId
  });
});
