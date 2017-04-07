import { Meteor } from 'meteor/meteor';
import { Skills } from '/imports/api/skills/skills';
import { Items } from '/imports/api/items/items';
import { Combat } from '/imports/api/combat/combat';
import { Groups } from '/imports/api/groups/groups';

import { flattenObjectForMongo } from '/server/utils';
import moment from 'moment';

import { attackSpeedTicks } from '/server/api/battles/battles';
import { ITEMS } from '/server/constants/items/index.js';
import { SKILLS } from '/server/constants/skills/index.js';
import { BATTLES } from '/server/constants/battles/index.js';
import { COMBAT, BUFFS } from '/server/constants/combat/index.js';

export const updateCombatStats = function (userId, username) {

  // Build up our object of skills
  const playerData = {
    stats: {
      attack: 0,
      attackMax: 0,
      attackSpeed: 0,
      accuracy: 0,
      healthMax: 0,
      damageTaken: 1,
      energyMax: COMBAT.baseEnergyMax,
      defense: 0,
      armor: 0
    },
    xpDistribution: {}
  };

  if (username) {
    playerData.username = username;
  }

  // Fetch all equipped combat items
  const combatItems = Items.find({
    owner: userId,
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
        if (playerData.stats[statKey] !== undefined) {
          playerData.stats[statKey] += itemStats[statKey];
        }
      });

      if (combatItem.constants.slot === 'mainHand') {
        playerData.xpDistribution = BATTLES.xpDistribution(combatItem.constants.weaponType);
      }
    }
  });

  // Fetch all users skill levels
  const combatSkills = Skills.find({
    owner: userId,
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
        if (playerData.stats[statKey] !== undefined) {
          playerData.stats[statKey] += (skillStatsPerLevel[statKey] * skillLevel);
        }
      });
    }
  });

  // If no weapon default to 0.5 attackspeed
  if (playerData.stats.attackSpeed === 0) {
    playerData.stats.attackSpeed = 0.5;
  }

  // Set player stats
  Combat.update({
    owner: userId
  }, {
    $set: flattenObjectForMongo(playerData)
  });
};

Meteor.methods({
  'combat.gameUpdate'() {
    this.unblock();

    const currentCombat = Combat.findOne({
      owner: Meteor.userId()
    });

    // Time since last update
    const now = moment();
    const secondsElapsed = moment.duration(now.diff(currentCombat.lastGameUpdated)).asSeconds();
    const minutesElapsed = moment.duration(now.diff(currentCombat.lastGameUpdated)).asMinutes();

    // Energy Regen
    if (currentCombat.stats.energy <= currentCombat.stats.energyMax) {
      currentCombat.stats.energy += (COMBAT.baseEnergyRegenPerMinute * minutesElapsed);
      if (currentCombat.stats.energy > currentCombat.stats.energyMax) {
        currentCombat.stats.energy = currentCombat.stats.energyMax;
      }
    }

    // Health Regen
    if (currentCombat.stats.health <= currentCombat.stats.healthMax) {
      currentCombat.stats.health += (COMBAT.baseHealthRegenPerMinute * minutesElapsed);
      if (currentCombat.stats.health > currentCombat.stats.healthMax) {
        currentCombat.stats.health = currentCombat.stats.healthMax;
      }
    }

    // Process buffs
    currentCombat.buffs.forEach((buff) => {
      buff.constants = BUFFS[buff.id];
      if (buff.constants.events.onTick) {
        const buffTarget = currentCombat;
        const buffCaster = currentCombat;
        buff.constants.events.onTick({
          secondsElapsed,
          buff,
          target: buffTarget,
          caster: buffCaster
        });
      }
    });

    // To Do: Optimize this to only save changes (isDirty on buffs?)
    Combat.update(currentCombat._id, {
      $set: Object.assign(flattenObjectForMongo({ stats: currentCombat.stats }), {
        buffs: currentCombat.buffs,
        lastGameUpdated: new Date()
      })
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
