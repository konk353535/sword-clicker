import { Meteor } from 'meteor/meteor';
import { MINING } from '/server/constants/mining/index.js';
import { ITEMS } from '/server/constants/items/index.js';
import { DONATORS_BENEFITS } from '/imports/constants/shop/index.js';

import moment from 'moment';
import _ from 'underscore';

import { Skills } from '/imports/api/skills/skills';
import { Items } from '/imports/api/items/items';
import { Users } from '/imports/api/users/users';
import { Mining } from '/imports/api/mining/mining';
import { MiningSpace } from '/imports/api/mining/mining';
import { requirementsUtility } from '/server/api/crafting/crafting';
import { addItem } from '/server/api/items/items';
import { addXp } from '/server/api/skills/skills';

export const updateMiningStats = function (userId, isNewUser = false) {

  let owner;
  if (userId) {
    owner = userId;
  } else {
    owner = Meteor.userId();
  }

  // Fetch equipped pick axe
  const pickaxe = Items.findOne({
    owner,
    slot: 'pickaxe',
    equipped: true
  });

  let pickaxeStats = {};
  if (pickaxe) {
    // Apply pickaxe stats
    pickaxe.constants = ITEMS[pickaxe.itemId];
    if (pickaxe.constants && pickaxe.constants.stats) {
      pickaxeStats = JSON.parse(JSON.stringify(pickaxe.constants.stats));
      if (pickaxe.extraStats) {
        Object.keys(pickaxe.extraStats).forEach((extraStatName) => {
          if (pickaxeStats[extraStatName]) {
            pickaxeStats[extraStatName] += pickaxe.extraStats[extraStatName];
          }
        });
      }
    }
  }


  pickaxeStats.energy = 0;

  // New users get full energy on there pick instantly.
  if (isNewUser) {
    pickaxeStats.energy = pickaxeStats.energyStorage;
  }

  // Set player stats
  Mining.update({
    owner
  }, {
    $set: {
      stats: pickaxeStats
    }
  });
};

// Store array of sorted ores
const rawOresArray = Object.keys(MINING.ores).map((oreKey) => {
  return MINING.ores[oreKey];
});

const attackMineSpace = function (id, mining, multiplier = 1) {
  let damage = mining.stats.attack * multiplier;
  const mineSpace = MiningSpace.findOne({ _id: id });
  if (mineSpace.owner !== Meteor.userId()) {
    return;
  }

  const oreConstants = MINING.ores[mineSpace.oreId];

  if (!oreConstants) {
    return;
  }

  Mining.update(mining._id, {
    $inc: {
      'stats.energy': (mining.stats.energyPerHit * -1 * multiplier)
    }
  });

  const userDoc = Meteor.user();
  if (userDoc.miningUpgradeTo && moment().isBefore(userDoc.miningUpgradeTo)) {
    damage *= (1 + (DONATORS_BENEFITS.miningBonus / 100));
  }  

  if (mineSpace.health - damage <= 0) {
    // Mine space has been destroyed
    MiningSpace.update(mineSpace._id, {
      $set: { oreId: null }
    });

    addXp('mining', oreConstants.xp);
    addItem(oreConstants.itemId, 1);
  } else {
    MiningSpace.update(mineSpace._id, {
      $inc: { health: (-1 * damage) },
    });    
  }
}

Meteor.methods({
  'mining.clickedMineSpace'(mineSpaceId, multiplier = 1) {
    console.log('here');
    if (multiplier < 1 || multiplier > 10) {
      return;
    }

    const mining = Mining.findOne({ owner: this.userId });
    if (mining.stats.energy < (mining.stats.energyPerHit * multiplier)) {
      return;
    }

    attackMineSpace(mineSpaceId, mining, multiplier);
  },

  'mining.buyMiner'(minerId) {
    const mining = Mining.findOne({ owner: Meteor.userId() });
    const targetMinerConstants = MINING.miners[minerId];

    if (!targetMinerConstants) {
      return;
    }

    // Maximum # of miners?
    const existingTargetMiner = _.findWhere(mining.miners, { id: minerId });
    if (existingTargetMiner && existingTargetMiner.amount + 1 > targetMinerConstants.max) {
      return;
    }

    // Do we have the requirements for this craft (items / levels / gold)
    if (!requirementsUtility(targetMinerConstants.required, 1)) {
      return;
    }

    // Inject new miner / update existing
    if (existingTargetMiner) {
      existingTargetMiner.amount += 1;
    } else {
      mining.miners.push({
        id: minerId,
        amount: 1
      });
    }

    Mining.update(mining._id, {
      $set: {
        miners: mining.miners
      }
    });
  },

  'mining.buyProspector'(prospectorId) {
    const mining = Mining.findOne({ owner: Meteor.userId() });
    const targetProspectorConstants = MINING.prospectors[prospectorId];

    if (!targetProspectorConstants) {
      return;
    }

    // Maximum # of prospectors?
    const existingTargetProspector = _.findWhere(mining.prospectors, { id: prospectorId });
    if (existingTargetProspector && existingTargetProspector.amount + 1 > targetProspectorConstants.max) {
      return;
    }

    // Do we have the requirements for this craft (items / levels / gold)
    if (!requirementsUtility(targetProspectorConstants.required, 1)) {
      return;
    }

    // Inject new miner / update existing
    if (existingTargetProspector) {
      existingTargetProspector.amount += 1;
    } else {
      mining.prospectors.push({
        id: prospectorId,
        amount: 2
      });
    }

    Mining.update(mining._id, {
      $set: {
        prospectors: mining.prospectors
      }
    });
  },

  'mining.fireProspector'(prospectorId) {
    const mining = Mining.findOne({ owner: Meteor.userId() });

    // Does user own specified prospector?
    const existingTargetProspector = _.findWhere(mining.prospectors, { id: prospectorId });
    if (!existingTargetProspector || existingTargetProspector.amount <= 0) {
      throw new Meteor.Error("too-few-prospectors", "You cannot fire your last prospector");
    }

    existingTargetProspector.amount -= 1;

    if (existingTargetProspector.amount < 1) {
      throw new Meteor.Error("too-few-prospectors", "You cannot fire your last prospector");
    }

    Mining.update(mining._id, {
      $set: {
        prospectors: mining.prospectors
      }
    });
  },

  'mining.gameUpdate'() {
    // Fetch all db data we need
    const mining = Mining.findOne({ owner: this.userId });

    // Determine time since last update
    const now = moment();
    let secondsElapsed = moment.duration(now.diff(mining.lastGameUpdated)).asSeconds();

    // Cap offline gains to 8 hours
    if (secondsElapsed > (60 * 60 * 8)) {
      secondsElapsed = 60 * 60 * 8;
    }

    const minutesElapsed = secondsElapsed / 60;

    if (mining.stats.energy < mining.stats.energyStorage) {
      mining.stats.energy += (minutesElapsed * mining.stats.energyRegen);
      if (mining.stats.energy > mining.stats.energyStorage) {
        mining.stats.energy = mining.stats.energyStorage;
      }
    }

    // Update last updated immeditely
    // incase an error occurs further on in the code, the users updated will not get set
    // Giving them a lot of extra XP!
    Mining.update(mining._id, {
      $set: {
        lastGameUpdated: new Date(),
        'stats.energy': mining.stats.energy
      }
    });

    this.unblock();

    const miningSkill = Skills.findOne({ owner: this.userId, type: 'mining' });
    let miningSpaces = _.shuffle(MiningSpace.find({ owner: this.userId }).map((doc) => doc));
    let emptyMiningSpaces = miningSpaces.filter((miningSpace) => !miningSpace.oreId);

    // Takes a list of possible ores, and returns one based off there chances to spawn
    const spawnOre = function (sortedChanceOres) {
      let newOre;
      for (let i = 0; i < sortedChanceOres.length; i++) {
        const rollDice = Math.random();
        if (rollDice <= sortedChanceOres[i].chance) {
          newOre = sortedChanceOres[i];
          break;
        }
      }

      return newOre;
    }

    // Modifies the miningSpaces array
    // gainedItems is added to if a mine space is cleared of an ore
    // Returns the exp gained
    const damageMiningSpaces = function ({ miningSpaces, damage, gainedItems }) {
      let gainedXp = 0;
      // Do damage
      for (let i = 0; i < miningSpaces.length; i++) {
        const miningSpace = miningSpaces[i];
        if (!miningSpace.oreId) {
          continue;
        }
        const oreConstants = MINING.ores[miningSpace.oreId];
        miningSpace.isDirty = true;

        if (miningSpace.health < -1) {
          console.log('Damage mining spaces 1')
        }

        if (miningSpace.health <= damage) {
          damage -= miningSpace.health;
          miningSpace.oreId = null;

          if (gainedItems[oreConstants.itemId]) {
            gainedItems[oreConstants.itemId].amount += 1
          } else {
            gainedItems[oreConstants.itemId] = { amount: 1 };
          }

          gainedXp += oreConstants.xp;
        } else {
          miningSpace.health -= damage;
          damage = 0;
          break;
        }

        if (miningSpace.health < -1) {
          console.log('Damage mining spaces 2')
        }
      }

      return gainedXp;
    }

    // Tick count = How many ticks to step through
    // Tick strength = How strong to make each tick, 1 = seconds
    const simulateMining = function (tickCount, tickStrength) {
      // Store gained exp and items, so we can save mongo db queries
      let gainedXp = 0;
      let gainedItems = {};

      // Build prospectors map
      const prospectorsMap = {};
      mining.prospectors.forEach((prospector) => {
        prospectorsMap[prospector.id] = prospector.amount;
      });

      // Prepare easy arrays for which ore is about to spawn
      const availableOres = rawOresArray.filter((ore) => {
        if (ore.requiredLevel > miningSkill.level) {
          return false;
        }
        return true;
      });

      // Increase or decrease chance of finding ore based on owned prospectors
      // Clone so we don't mutatet the constants
      const computedOres = JSON.parse(JSON.stringify(availableOres)).map((ore) => {
        if (prospectorsMap[ore.id]) {
          ore.chance *= prospectorsMap[ore.id];
        }
        return ore;
      });
      const sortedChanceOres = _.sortBy(computedOres, 'chance');

      // Determine how many new ores to spawn
      let totalChance = MINING.prospecting.chance;
      let newOresCount = tickCount * tickStrength * totalChance;

      if ((newOresCount % 1) > Math.random()) {
        newOresCount = Math.ceil(newOresCount);
      } else {
        newOresCount = Math.floor(newOresCount);
      }

      // Determine how much damage your miners do
      let damagePerTick = 0;
      mining.miners.forEach((miner) => {
        const minerTypeDPS = MINING.miners[miner.id].damagePerSecond;
        damagePerTick += (minerTypeDPS * miner.amount * tickStrength);
      });

      if (mining.stats.miner) {
        damagePerTick *=  (1 + (mining.stats.miner / 100));
      }

      // Apply membership benefits
      const userDoc = Meteor.user();
      if (userDoc.miningUpgradeTo && moment().isBefore(userDoc.miningUpgradeTo)) {
        damagePerTick *= (1 + (DONATORS_BENEFITS.miningBonus / 100));
      }

      let totalRemainingDamage = damagePerTick * tickCount;

      if (emptyMiningSpaces.length >= newOresCount || (tickCount * tickStrength < 60)) {
        // Add Ores
        miningSpaces.forEach((miningSpace, index) => {
          // Make sure this is an empty mining space
          if (newOresCount > 0 && !miningSpace.oreId) {
            newOresCount--;
            // Spawn ore
            const newOre = spawnOre(sortedChanceOres);
            if (newOre) {
              miningSpace.health = JSON.parse(JSON.stringify(newOre.healthMax));
              miningSpace.oreId = newOre.id;
              miningSpace.isDirty = true; // So we know to save this later
            }

            if (miningSpace.health < -1) {
              console.log('simulation 1')
            }
          }
        });

        gainedXp += damageMiningSpaces({
          miningSpaces,
          damage: totalRemainingDamage,
          gainedItems
        });

        // Save modified miningSpaces
        miningSpaces.forEach((miningSpace) => {
          if (miningSpace.isDirty) {
            MiningSpace.update(miningSpace._id, {
              $set: { oreId: miningSpace.oreId, health: miningSpace.health },
            }, function (err, res) {
              // Intentionally blank
            });
          }
        });

        if (gainedXp > 0) {
          addXp('mining', gainedXp);
        }
        Object.keys(gainedItems).forEach((key) => {
          addItem(key, gainedItems[key].amount);
        });
      } else {
        // Evenly distribute when ores spawn
        let genOreEvery = Math.ceil(tickCount / newOresCount);

        let oresGenerated = 0;

        // Step through
        for (let tick = 0; tick < tickCount; tick++) {
          emptyMiningSpaces = miningSpaces.filter((space) => !space.oreId);
          if (tick % genOreEvery === 0 && emptyMiningSpaces.length > 0) {
            oresGenerated++;
            // Generate ore
            const emptySpace = emptyMiningSpaces[0];
            // Spawn ore
            const newOre = spawnOre(sortedChanceOres);
            if (newOre) {
              emptySpace.health = JSON.parse(JSON.stringify(newOre.healthMax));
              emptySpace.oreId = newOre.id;
              emptySpace.isDirty = true; // So we know to save this later
            }
          }

          if (tick % 10) {
            miningSpaces =_.shuffle(miningSpaces);
          }

          // Deal damage to ore
          gainedXp += damageMiningSpaces({
            damage: damagePerTick,
            miningSpaces,
            gainedItems
          });
        }

        if (gainedXp > 0) {
          addXp('mining', gainedXp);
        }
        Object.keys(gainedItems).forEach((key) => {
          addItem(key, gainedItems[key].amount);
        });

        // Save modified miningSpaces
        miningSpaces.forEach((miningSpace) => {
          if (miningSpace.isDirty) {
            MiningSpace.update(miningSpace._id, {
              $set: { oreId: miningSpace.oreId, health: miningSpace.health },
            }, function (err, res) {
              // Intentionally blank
            });
          }
        });
      }
    }

    if (secondsElapsed > 300) {
      // To save CPU, use slightly longer ticks
      simulateMining(secondsElapsed / 5, 5);
    } else {
      // Less then 5 minutes, use second based ticks
      simulateMining(secondsElapsed, 1);
    }
  },

  'mining.fetchMiners'() {
    const miningSkill = Skills.findOne({
      owner: Meteor.userId(),
      type: 'mining'
    });

    const minersArray = Object.keys(MINING.miners).map((key) => {
      return MINING.miners[key];
    }).filter((recipe) => {
      // Only show woodcutters we can hire, or close to ( 1 level away )
      if (miningSkill.level + 1 >= recipe.requiredMiningLevel) {
        return true;
      }

      return false;
    });

    return minersArray;
  },

  'mining.fetchProspectors'() {
    const miningSkill = Skills.findOne({
      owner: Meteor.userId(),
      type: 'mining'
    });

    const prospectorsArray = Object.keys(MINING.prospectors).map((key) => {
      return MINING.prospectors[key];
    }).filter((recipe) => {
      // Only show woodcutters we can hire
      return miningSkill.level >= recipe.requiredMiningLevel;
    });

    return prospectorsArray;
  },
});

const MINUTE = 60 * 1000;
const userId = function userId(userId) {
  return userId;
}

DDPRateLimiter.addRule({ type: 'method', name: 'mining.clickedMineSpace', userId }, 100, 0.5 * MINUTE);
DDPRateLimiter.addRule({ type: 'method', name: 'mining.buyProspector', userId }, 15, 0.5 * MINUTE);
DDPRateLimiter.addRule({ type: 'method', name: 'mining.fireProspector', userId }, 15, 0.5 * MINUTE);
DDPRateLimiter.addRule({ type: 'method', name: 'mining.buyMiner', userId }, 15, 0.5 * MINUTE);
DDPRateLimiter.addRule({ type: 'method', name: 'mining.gameUpdate', userId }, 3, 10000);
DDPRateLimiter.addRule({ type: 'method', name: 'mining.fetchMiners', userId }, 15, 0.5 * MINUTE);
// DDPRateLimiter.addRule({ type: 'subscription', name: 'miningSpace', userId }, 600, 2 * MINUTE);
// DDPRateLimiter.addRule({ type: 'subscription', name: 'mining', userId }, 100, 1 * MINUTE);

Meteor.publish('miningSpace', function() {

  //Transform function
  var transform = function(doc) {
    if (doc.oreId) {
      const currentOreConstants = MINING.ores[doc.oreId];
      doc.requiredLevel = currentOreConstants.requiredLevel;
      doc.healthMax = currentOreConstants.healthMax;
      doc.name = currentOreConstants.name;
      doc.xp = currentOreConstants.xp;
      doc.icon = currentOreConstants.icon;
    }
    return doc;
  }

  var self = this;

  var observer = MiningSpace.find({
    owner: this.userId
  }).observe({
    added: function (document) {
      self.added('miningSpace', document._id, transform(document));
    },
    changed: function (newDocument, oldDocument) {
      self.changed('miningSpace', oldDocument._id, transform(newDocument));
    },
    removed: function (oldDocument) {
      self.removed('miningSpace', oldDocument._id);
    }
  });

  self.onStop(function () {
    observer.stop();
  });

  self.ready();

});

Meteor.publish('mining', function() {

  //Transform function
  var transform = function(doc) {
    return doc;
  }

  var self = this;

  var observer = Mining.find({
    owner: this.userId
  }).observe({
      added: function (document) {
      self.added('mining', document._id, transform(document));
    },
    changed: function (newDocument, oldDocument) {
      self.changed('mining', oldDocument._id, transform(newDocument));
    },
    removed: function (oldDocument) {
      self.removed('mining', oldDocument._id);
    }
  });

  self.onStop(function () {
    observer.stop();
  });

  self.ready();

});
