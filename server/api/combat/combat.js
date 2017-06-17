import { Meteor } from 'meteor/meteor';
import { Skills } from '/imports/api/skills/skills';
import { Items } from '/imports/api/items/items';
import { Combat } from '/imports/api/combat/combat';
import { Groups } from '/imports/api/groups/groups';

import { flattenObjectForMongo } from '/server/utils';
import moment from 'moment';
import _ from 'underscore';

import { addXp } from '/server/api/skills/skills';
import { attackSpeedTicks } from '/server/api/battles/battles';
import { DONATORS_BENEFITS } from '/imports/constants/shop/index.js';
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
      magicPower: 0,
      energyMax: COMBAT.baseEnergyMax,
      defense: 0,
      armor: 0,
      magicArmor: 0
    },
    mainHandType: '',
    offHandType: '',
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
  for (let i = 0; i < combatItems.length; i++) {
    const combatItem = combatItems[i];
    combatItem.constants = ITEMS[combatItem.itemId];

    if (combatItem.constants.slot === 'mainHand') {
      playerData.mainHandType = combatItem.constants.weaponType;
    } else if (combatItem.constants.slot === 'offHand') {
      playerData.offHandType = combatItem.constants.weaponType;
    }

    if (combatItem.constants.isAttackAmulet) {
      // Fetch existing energy
      playerData.amulet = JSON.parse(JSON.stringify(combatItem.constants.stats));
      if (playerData.amulet.energy == null) {
        playerData.amulet.energy = 0;
      } 
      continue;
    }

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
  };

  // Fetch all users skill levels
  const combatSkills = Skills.find({
    owner: userId,
    type: {
      $in: ['attack', 'health', 'defense', 'magic']
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

  // If health is above healthMax, reset health
  if (playerData.stats.health > playerData.stats.healthMax) {
    playerData.stats.health = playerData.stats.healthMax;
  }

  // Set player stats
  Combat.update({
    owner: userId
  }, {
    $set: flattenObjectForMongo(playerData)
  });
};

Meteor.methods({

  'combat.startMeditation'() {
    Combat.update({
      owner: Meteor.userId()
    }, {
      $set: {
        meditatingStartDate: moment().toDate()
      }
    });
  },

  'combat.updateIsTowerContribution'(newValue) {
    Combat.update({
      owner: Meteor.userId()
    }, {
      $set: {
        isTowerContribution: newValue
      }
    });
  },

  'combat.stopMeditation'() {
    // Time since meditation
    const combat = Combat.findOne({
      owner: Meteor.userId()
    });

    if (!combat.meditatingStartDate) {
      throw new Meteor.Error("no-meditation", "you're not meditating");
    }

    const now = moment();
    let hoursElapsed = moment.duration(now.diff(combat.meditatingStartDate)).asHours();

    if (hoursElapsed > 24) {
      hoursElapsed = 24; 
    }

    // Skills level x 10xp / hour
    const combatSkills = Skills.find({
      owner: Meteor.userId(),
      type: {
        $in: ['attack', 'defense', 'health']
      }
    }).fetch();

    combatSkills.forEach((skill) => {
      addXp(skill.type, hoursElapsed * 15 * skill.level)
    });

    Combat.update({
      owner: Meteor.userId()
    }, {
      $set: {
        meditatingStartDate: null
      }
    });
  },

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
      let baseEnergyRegen = COMBAT.baseEnergyRegenPerMinute * minutesElapsed;

      // Apply membership benefits
      const userDoc = Meteor.user()
      if (userDoc.combatUpgradeTo && moment().isBefore(userDoc.combatUpgradeTo)) {
        baseEnergyRegen *= (1 + (DONATORS_BENEFITS.energyBonus / 100));
      }

      currentCombat.stats.energy += baseEnergyRegen;

      if (currentCombat.stats.energy > currentCombat.stats.energyMax) {
        currentCombat.stats.energy = currentCombat.stats.energyMax;
      }
    }

    // Amulet energy regen
    if (currentCombat.amulet && currentCombat.amulet.energy < currentCombat.amulet.energyStorage) {
      currentCombat.amulet.energy += minutesElapsed * currentCombat.amulet.energyRegen;
      if (currentCombat.amulet.energy >= currentCombat.amulet.energyStorage) {
        currentCombat.amulet.energy = currentCombat.amulet.energyStorage;
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
        amulet: currentCombat.amulet,
        lastGameUpdated: new Date()
      })
    });
  }
})

const MINUTE = 60 * 1000;

// DDPRateLimiter.addRule({ type: 'method', name: 'combat.gameUpdate' }, 30, 1 * MINUTE);
// DDPRateLimiter.addRule({ type: 'subscription', name: 'combat' }, 30, 1 * MINUTE);

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
