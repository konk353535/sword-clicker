import { Meteor } from 'meteor/meteor';
import { MINING } from '/server/constants/mining/index.js';
import { ITEMS } from '/server/constants/items/index.js';
import { DONATORS_BENEFITS } from '/imports/constants/shop/index.js';
import { STATE_BUFFS } from '/imports/constants/state/index';

import { flattenObjectForMongo } from '/server/utils';

import moment from 'moment';
import _ from 'underscore';

import { Skills } from '/imports/api/skills/skills';
import { State } from '/imports/api/state/state';
import { Items } from '/imports/api/items/items';
import { Users } from '/imports/api/users/users';
import { Mining } from '/imports/api/mining/mining';
import { MiningSpace } from '/imports/api/mining/mining';

import { requirementsUtility } from '/server/api/crafting/crafting';
import { addItem, addFakeGems } from '/server/api/items/items';
import { addXp } from '/server/api/skills/skills';

export const updateMiningStats = function (userId, isNewUser = false) {
  let owner;
  if (userId) {
    owner = userId;
  } else {
    owner = Meteor.userId();
  }

  // Fetch equipped pick axe
  let pickaxe = Items.findOne({
    owner,
    slot: 'pickaxe',
    equipped: true
  });

  const offhand = Items.findOne({
    owner,
    slot: 'mining_offhand',
    equipped: true
  })

  let miningStats = {
  };

  if (pickaxe && ITEMS[pickaxe.itemId].slot === 'mining_offhand') {
    Items.update(pickaxe._id, {
      $set: {
        equipped: false
      }
    });
    pickaxe = undefined;
  }

  [pickaxe, offhand].forEach((equipment) => {
    if (equipment) {
      // Apply equipment stats
      equipment.constants = ITEMS[equipment.itemId];
      if (equipment.constants && equipment.constants.stats) {
        Object.keys(equipment.constants.stats).forEach((stat) => {
          if (miningStats[stat]) {
            miningStats[stat] += equipment.constants.stats[stat];
          } else {
            miningStats[stat] = equipment.constants.stats[stat] + 0;
          }
        });
        if (equipment.extraStats) {
          Object.keys(equipment.extraStats).forEach((extraStatName) => {
            if (miningStats[extraStatName]) {
              miningStats[extraStatName] += equipment.extraStats[extraStatName];
            }
          });
        }
      }
    }
  });

  if (!miningStats.miner) {
    miningStats.miner = 0;
  }

  if (!miningStats.attack) { miningStats.attack = 1; }
  if (!miningStats.energyStorage) { miningStats.energyStorage = 10; }
  if (!miningStats.energyRegen) { miningStats.energyRegen = 10; }
  if (!miningStats.energyPerHit) { miningStats.energyPerHit = 1; }

  miningStats.energy = 0;

  // New users get full energy on there pick instantly.
  if (isNewUser) {
    miningStats.energy = miningStats.energyStorage;
  }

  // Set player stats
  Mining.update({
    owner
  }, {
    $set: {
      stats: miningStats
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
      $set: { oreId: null, isCluster: false }
    });

    // Check if we own this miner, add xp to that miner
    const minerName = oreConstants.id !== 'stone' ? `${oreConstants.id}_miner` : 'primitive_miner';
    const targetMiner = _.findWhere(mining.miners, { id: minerName });
    if (targetMiner) {
      let xpToAdd = mineSpace.isCluster ? 10 : 1;
      if (targetMiner.xp + xpToAdd >= MINING.miners.xpToLevel(targetMiner.level) && targetMiner.level < 20) {
        Mining.update({
          owner: Meteor.userId(),
          miners: {
            $elemMatch: {
              id: minerName
            }
          }
        }, {
          $inc: {
            'miners.$.level': 1
          },
          $set: {
            'miners.$.xp': 0
          }
        });
      } else {
        Mining.update({
          owner: Meteor.userId(),
          miners: {
            $elemMatch: {
              id: minerName
            }
          }
        }, {
          $inc: {
            'miners.$.xp': mineSpace.isCluster ? 10 : 1
          }
        });
      }
    }

    let amount = 1;
    if (mineSpace.isCluster) {
      amount = 8 + Math.round(Math.random() * 4);
    }

    addXp('mining', oreConstants.xp * amount);

    if (oreConstants.itemId === 'gem') {
      addFakeGems(1, Meteor.userId());
    } else {
      addItem(oreConstants.itemId, 1 * amount);
    }

  } else {
    MiningSpace.update(mineSpace._id, {
      $inc: { health: (-1 * damage) },
    });    
  }
}

Meteor.methods({
  'mining.collect'() {
    const mining = Mining.findOne({ owner: Meteor.userId() });

    let xpGained = 0;
    Object.keys(mining.collector).forEach((key) => {
      const amount = mining.collector[key];
      addItem(`ore_${key}`, amount);
      xpGained += (MINING.ores[key].xp * amount);
    });

    const miningUpdated = Mining.update({
      _id: mining._id,
      lastGameUpdated: mining.lastGameUpdated
    }, {
      $set: {
        collector: {}
      }
    });

    if (miningUpdated === 1) {
      addXp('mining', xpGained);
    }
  },

  'mining.setProspector'(index, ore) {
    // Can we target that ore?
    const miningSkill = Skills.findOne({
      owner: Meteor.userId(),
      type: 'mining'
    });

    if (!MINING.ores[ore]) {
      throw new Meteor.Error("invalid-ore", "invalid ore");
    } else if (miningSkill.level < MINING.ores[ore].requiredLevel) {
      throw new Meteor.Error("too-low-level", "too low mining level to prospect that");
    }

    if (index !== 'new' && !_.isFinite(index)) {
      throw new Meteor.Error("invalid idnex", "invalid index");      
    } else if (index > 5) {
      throw new Meteor.Error("invalid idnex", "invalid index");      
    }

    const mining = Mining.findOne({
      owner: Meteor.userId()
    });

    if (index === 'new') {
      let cap = MINING.prospecting.base;
      MINING.prospecting.levelsGained.forEach((level) => {
        if (miningSkill.level >= level) {
          cap += 1;
        }
      });

      if (mining.prospecting.length < cap) {
        mining.prospecting.push(ore);
      }
    } else {
      mining.prospecting[index] = ore;
    }

    Mining.update({
      _id: mining._id,
      owner: Meteor.userId()
    }, {
      $set: {
        prospecting: mining.prospecting
      }
    });
  },

  'mining.clickedMineSpace'(mineSpaceId, multiplier = 1) {
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
        amount: 1,
        level: 1,
        xp: 0
      });
    }

    Mining.update(mining._id, {
      $set: {
        miners: mining.miners,
        lastGameUpdated: new Date()
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

    if (existingTargetProspector.amount < 0) {
      throw new Meteor.Error("too-few-prospectors", "You cannot have negative prospectors");
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
    const newLastGameUpdated = new Date();
    Mining.update(mining._id, {
      $set: {
        lastGameUpdated: newLastGameUpdated,
        'stats.energy': mining.stats.energy
      }
    });

    const userDoc = Meteor.user();

    this.unblock();

    const miningSkill = Skills.findOne({ owner: this.userId, type: 'mining' });
    let miningSpaces = _.shuffle(MiningSpace.find({ owner: this.userId }).map((doc) => doc));
    let emptyMiningSpaces = miningSpaces.filter((miningSpace) => !miningSpace.oreId);
    let fakeGemsSpawned = 0;
    let existingFakeGems = miningSpaces.filter((miningSpace) => {
      return miningSpace.oreId === 'gem';
    }).length;

    const hasCraftingGlobalBuff = !_.isUndefined(State.findOne({name: STATE_BUFFS.crafting, 'value.activeTo': {$gte: moment().toDate()}}));

    // Takes a list of possible ores, and returns one based off there chances to spawn
    const spawnOre = function (sortedChanceOres) {
      let newOre;
      for (let i = 0; i < sortedChanceOres.length; i++) {
        const rollDice = Math.random();
        const targetOre = sortedChanceOres[i];
        let extraChance = 1;
        if (targetOre.isGem && hasCraftingGlobalBuff) {
          extraChance = 2;
        }
        if (rollDice <= targetOre.chance * extraChance) {
          if (targetOre.id === 'gem') {
            if (userDoc.fakeGemsToday >= 15 || userDoc.fakeGemsToday == null || existingFakeGems > 3) {
              continue;
            }

            existingFakeGems += 1;
            userDoc.fakeGemsToday += 1;
            Users.update({
              _id: Meteor.userId()
            }, {
              $inc: {
                fakeGemsToday: 1
              }
            });
          }

          newOre = targetOre;
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

        if (!miningSpace.oreId || miningSpace.oreId === 'gem') {
          continue;
        }

        const oreConstants = MINING.ores[miningSpace.oreId];
        miningSpace.isDirty = true;

        if (miningSpace.health <= damage) {
          damage -= miningSpace.health;

          let newAmount = 1;
          if (miningSpace.isCluster) {
            newAmount = 8 + Math.round(Math.random() * 4);
          }

          if (gainedItems[miningSpace.oreId]) {
            gainedItems[miningSpace.oreId].amount += newAmount;
          } else {
            gainedItems[miningSpace.oreId] = { amount: newAmount };
          }

          miningSpace.oreId = null;
          gainedXp += (oreConstants.xp * newAmount);
        } else {
          miningSpace.health -= damage;
          damage = 0;
          break;
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
      mining.prospecting.forEach((key) => {
        if (prospectorsMap[key]) {
          prospectorsMap[key] += 1;
        } else {
          prospectorsMap[key] = 1;
        }
      });

      // Prepare easy arrays for which ore is about to spawn
      const availableOres = rawOresArray.filter((ore) => {
        return ore.requiredLevel <= miningSkill.level;
      });

      // Increase or decrease chance of finding ore based on owned prospectors
      // Clone so we don't mutatet the constants
      const computedOres = JSON.parse(JSON.stringify(availableOres)).filter((ore) => {
        return ore.isGem || prospectorsMap[ore.id];
      }).map((ore) => {
        // Jewel prospectors cover all available jewel types in one prospector
        if(ore.isGem && prospectorsMap['jewel']) {
          ore.chance *= prospectorsMap['jewel'];
        } else if (prospectorsMap[ore.id]) {
          ore.chance *= (prospectorsMap[ore.id] * 4);
        } else {
          ore.chance = 0;
        }

        if (ore.canCluster && (ore.requiredLevel + 20) <= miningSkill.level) {
          ore.chance /= 9;
          ore.healthMax *= 10;
          ore.isCluster = true;
        } else {
          ore.isCluster = false;
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

      // Migrate miners if required!
      let migrateMiners = false;

      // Determine how much damage your miners do
      let damagePerTick = 0;
      mining.miners.forEach((miner) => {
        if (!miner.level) {
          migrateMiners = true;
          miner.level = 1;
          miner.xp = 0;
        }
        const baseDPS = MINING.miners[miner.id].damagePerSecond;
        const groupDPS = (baseDPS * miner.amount * tickStrength);
        const levelAdjustedDPS = groupDPS * (1 + (miner.level * 0.025));
        damagePerTick += levelAdjustedDPS;
      });

      if (migrateMiners) {
        Mining.update({
          owner: Meteor.userId()
        }, {
          $set: {
            miners: mining.miners
          }
        }); 
      }

      if (mining.stats.miner) {
        damagePerTick *=  (1 + (mining.stats.miner / 100));
      }

      // Apply membership benefits
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
              miningSpace.isCluster = newOre.isCluster;
              miningSpace.isDirty = true; // So we know to save this later
            }
          }
        });

        gainedXp += damageMiningSpaces({
          miningSpaces,
          damage: totalRemainingDamage,
          gainedItems
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
              emptySpace.isCluster = newOre.isCluster;
              emptySpace.isDirty = true; // So we know to save this later
            }
          }

          if (tick % 20) {
            miningSpaces = _.shuffle(miningSpaces);
          }

          // Deal damage to ore
          gainedXp += damageMiningSpaces({
            damage: damagePerTick,
            miningSpaces,
            gainedItems
          });
        }
      }

      let mutateMiners = false;

      Object.keys(gainedItems).forEach((key) => {
        mutateMiners = true;
        if (key === 'gem') {
          addFakeGems(gainedItems[key].amount, Meteor.userId());
        } else {
          if (mining.collector[key]) {
            mining.collector[key] += gainedItems[key].amount;
            if (mining.collector[key] > 100) {
              mining.collector[key] = 100;
            }
          } else {
            mining.collector[key] = gainedItems[key].amount;
          }
        }
      });

      mining.miners.forEach((miner) => {
        const minerName = miner.id === 'primitive_miner' ? 'stone' : miner.id.replace('_miner', '');
        const targetItem = gainedItems[minerName];
        if (targetItem) {
          mutateMiners = true;
          miner.xp += (targetItem.amount / 10);
          if (miner.xp >= MINING.miners.xpToLevel(miner.level) && miner.level < 20) {
            miner.level += 1;
            miner.xp = 0;
          }
        }
      });

      if (mutateMiners) {
        Mining.update({
          owner: Meteor.userId(),
          lastGameUpdated: newLastGameUpdated
        }, {
          $set: {
            miners: mining.miners,
            collector: flattenObjectForMongo(mining.collector)
          }
        });
      }

      // Save modified miningSpaces
      miningSpaces.forEach((miningSpace) => {
        if (miningSpace.isDirty) {
          MiningSpace.update(miningSpace._id, {
            $set: {
              oreId: miningSpace.oreId,
              health: miningSpace.health,
              isCluster: miningSpace.isCluster
            }
          }, function (err, res) {
            // Intentionally blank
          });
        }
      });

    }

    // Less then 5 minutes, use second based ticks
    simulateMining(secondsElapsed, 1);
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

  'mining.fetchOres'() {
    const miningSkill = Skills.findOne({
      owner: Meteor.userId(),
      type: 'mining'
    });

    const oresArray = Object.keys(MINING.ores).map((key) => {
      const constants = MINING.ores[key]
      return {
        icon: constants.icon,
        name: constants.name,
        requiredLevel: constants.requiredLevel,
        itemId: constants.itemId,
        isGem: constants.isGem
      };
    }).filter((recipe) => {
      return miningSkill.level >= recipe.requiredLevel;
    }).sort((a, b) => {
      return b.requiredLevel - a.requiredLevel;
    });

    return oresArray;
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
      if (doc.isCluster) {
        doc.healthMax *= 10;
        doc.icon = currentOreConstants.clusterIcon;
      } else {
        doc.icon = currentOreConstants.icon;
      }
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

Meteor.publish('mining', function () {
  return Mining.find({
    owner: this.userId
  });
});
