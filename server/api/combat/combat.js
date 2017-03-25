import { Meteor } from 'meteor/meteor';
import { Skills } from '/imports/api/skills/skills';
import { Items } from '/imports/api/items/items';
import { Combat } from '/imports/api/combat/combat';
import { Groups } from '/imports/api/groups/groups';

import moment from 'moment';

import { ITEMS } from '/server/constants/items/index.js';
import { SKILLS } from '/server/constants/skills/index.js';
import { BATTLES } from '/server/constants/battles/index.js';
import { COMBAT } from '/server/constants/combat/index.js';

export const updateCombatStats = function () {
  // Build up our object of skills
  const playerStats = {
    attack: 0,
    attackMax: 0,
    attackSpeed: 0,
    accuracy: 0,
    maxHealth: 0,
    maxEnergy: COMBAT.baseMaxEnergy,
    defense: 0,
    armor: 0,
    xpDistribution: {},
    username: Meteor.user().username
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


  // Set player stats
  Combat.update({
    owner: Meteor.userId()
  }, {
    $set: playerStats
  });
};

Meteor.methods({
  'combat.gameUpdate'() {
    // Update health and energy
    const currentCombat = Combat.findOne({
      owner: Meteor.userId()
    });

    // Time since last update
    const now = moment();
    const minutesElapsed = moment.duration(now.diff(currentCombat.lastGameUpdated)).asMinutes();

    let isDirty = false;
    if (currentCombat.energy <= currentCombat.maxEnergy) {
      currentCombat.energy += (COMBAT.baseEnergyRegenPerMinute * minutesElapsed);
      if (currentCombat.energy > currentCombat.maxEnergy) {
        currentCombat.energy = currentCombat.maxEnergy;
      }
    }

    if (currentCombat.health <= currentCombat.maxHealth) {
      currentCombat.health += (COMBAT.baseHealthRegenPerMinute * minutesElapsed);
      if (currentCombat.health > currentCombat.maxHealth) {
        currentCombat.health = currentCombat.maxHealth;
      }
    }

    Combat.update(currentCombat._id, {
      $set: {
        lastGameUpdated: new Date(),
        health: currentCombat.health,
        energy: currentCombat.energy
      }
    });
  }
})

Meteor.publish('combat', function() {
  const currentGroup = Groups.findOne({
    members: this.userId
  });

  if (!currentGroup) {
    return Combat.find({
      owner: this.userId
    });
  }

  return Combat.find({
    owner: {
      $in: currentGroup.members
    }
  });

});
