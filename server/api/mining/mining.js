import { Meteor } from 'meteor/meteor';
import { MINING } from '/imports/constants/mining/index.js';
import { ITEMS } from '/imports/constants/items/index.js';
import { DONATORS_BENEFITS } from '/imports/constants/shop/index.js';
import { STATE_BUFFS } from '/imports/constants/state/index';

import moment from 'moment';
import _ from 'underscore';
import lodash from 'lodash';

import { Skills } from '/imports/api/skills/skills';
import { State } from '/imports/api/state/state';
import { Items } from '/imports/api/items/items';
import { Users } from '/imports/api/users/users';
import { Mining } from '/imports/api/mining/mining';
import { MiningSpace } from '/imports/api/mining/mining';
import { requirementsUtility } from '/server/api/crafting/crafting';
import { addItem, addFakeGems } from '/server/api/items/items';
import { addXp } from '/server/api/skills/skills';
import { CDbl } from '/imports/utils.js';
import { updateUserActivity } from '/imports/api/users/users.js';
import { getBuffLevel, getActiveGlobalBuff } from '/imports/api/globalbuffs/globalbuffs.js';

export const updateMiningStats = function (userId, slot='pickaxe', isNewUser = false) {
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
  });

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
            if (!miningStats[extraStatName]) {
              miningStats[extraStatName] = 0;
            }
            miningStats[extraStatName] += equipment.extraStats[extraStatName];
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

  const miningSkill = Skills.findOne({ owner, type: 'mining' });
  
  if (miningSkill && miningSkill.level) {
    miningStats.energyRegen += miningSkill.level * 0.125;
  }
  
  // New users get full energy on their pick instantly.
  if (isNewUser) {
    miningStats.energy = miningStats.energyStorage;
  } else if(slot === 'mining_offhand') {
    let m = Mining.findOne({ owner: owner });
    miningStats.energy = m.stats.energy;
  } else {
    miningStats.energy = 0;
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
    
    addXp('mining', oreConstants.xp * amount * 2.25); // making mining faster since it lags

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
};

Meteor.methods({
  'mining.clickedMineSpace'(mineSpaceId, multiplier = 1) {
    if (multiplier < 1 || multiplier > 10) {
      return;
    }

    const mining = Mining.findOne({ owner: this.userId });
    if (mining.stats.energy < (mining.stats.energyPerHit * multiplier)) {
      return;
    }

    attackMineSpace(mineSpaceId, mining, multiplier);

    updateUserActivity({userId: Meteor.userId()});
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

    updateUserActivity({userId: Meteor.userId()});
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

    updateUserActivity({userId: Meteor.userId()});
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

    updateUserActivity({userId: Meteor.userId()});
  },

  'mining.gameUpdate'() {
    // Fetch all db data we need
    const mining = Mining.findOne({ owner: this.userId });
    if (!mining) {
      throw new Meteor.Error("no-user", "Log in first.");
    }

    // Determine time since last update
    const now = moment();
    let secondsElapsed = moment.duration(now.diff(mining.lastGameUpdated)).asSeconds();

    // Cap offline gains to 8 hours
    if (secondsElapsed > (60 * 60 * 8)) {
      secondsElapsed = 60 * 60 * 8;
    }

    const minutesElapsed = secondsElapsed / 60;

    if (mining.stats.energy < mining.stats.energyStorage) {
      mining.stats.energy += (minutesElapsed * mining.stats.energyRegen) * ((getActiveGlobalBuff('paid_gathering')) ? 2 : 1);
      if (mining.stats.energy > mining.stats.energyStorage) {
        mining.stats.energy = mining.stats.energyStorage;
      }
    }

    // Update last updated immediately
    // in case an error occurs further on in the code, the users updated will not get set
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
    };

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
          miningSpace.oreId = null;

          let newAmount = 1;
          if (miningSpace.isCluster) {
            newAmount = 8 + Math.round(Math.random() * 4);
          }

          if (gainedItems[oreConstants.itemId]) {
            gainedItems[oreConstants.itemId].amount += newAmount;
          } else {
            gainedItems[oreConstants.itemId] = { amount: newAmount };
          }
          
          gainedXp += (oreConstants.xp * newAmount * 2.25); // making mining faster since it lags
        } else {
          miningSpace.health -= damage;
          damage = 0;
          break;
        }

      }

      return gainedXp;
    };

    // Tick count = How many ticks to step through
    // Tick strength = How strong to make each tick, 1 = seconds
    const simulateMining = function (tickCount, tickStrength) {
      // Store gained exp and items, so we can save mongo db queries
      let gainedXp = 0;
      let gainedItems = {};

      const townBuffQuarryLevel = getBuffLevel('town_quarry');

      // Build prospectors map
      const prospectorsMap = {};
      mining.prospectors.forEach((prospector) => {
        prospectorsMap[prospector.id] = (prospector.amount > 0) ? prospector.amount * 2.5 : 0;
      });

      // Prepare easy arrays for which ore is about to spawn
      const availableOres = rawOresArray.filter((ore) => {
        return ore.requiredLevel <= miningSkill.level;
      });

      // Increase or decrease chance of finding ore based on owned prospectors
      // Clone so we don't mutate the constants
      const computedOres = lodash.cloneDeep(availableOres).map((ore) => {
        // Jewel prospectors cover all available jewel types in one prospector
        if(ore.isGem && prospectorsMap['jewel']) {
          ore.chance *= prospectorsMap['jewel'];
        } else if (prospectorsMap[ore.id]) {
          ore.chance *= prospectorsMap[ore.id];
        } else if (prospectorsMap[ore.id.replace('_essence', '')]) {
          ore.chance *= prospectorsMap[ore.id.replace('_essence', '')];
        }

        if (ore.canCluster && (ore.requiredLevel + 20) <= miningSkill.level) {
          ore.chance /= 9;
          ore.healthMax *= 10;
          ore.isCluster = true;
        } else {
          ore.isCluster = false;
        }
        
        // modifier is 100%
        let oreSpawnRateModifier = 1;
        
        // the emptier the mining pit, the greater the chance to spawn
        //  0 slots free = no bonus
        //  1 slot  free = no bonus
        //  2 slots free = +6.1% bonus
        //  3 slots free = +29.9% bonus
        //  4 slots free = +50.0% bonus
        //  5 slots free = +67.7% bonus
        //  6 slots free = +83.7% bonus
        //  7 slots free = +98.4% bonus
        //  8 slots free = +112.1% bonus
        //  9 slots free = +125.0% bonus
        // 10 slots free = +137.2% bonus
        // 11 slots free = +148.7% bonus
        // 12 slots free = +159.8% bonus
        // 13 slots free = +170.4% bonus
        // 14 slots free = +180.6% bonus
        // 15 slots free = +190.5% bonus
        // 16 slots free = +200% bonus
        let emptyPitBonus = Math.sqrt(emptyMiningSpaces.length / 16 * 9); // range 1-3 (representing 100% to 300% of base spawn rate)
        
        // if we have an empty-pit bonus of at least 100% (not a penalty), add it to the multiplier
        if (emptyPitBonus >= 1.0) {
          oreSpawnRateModifier += (emptyPitBonus - 1.0);
        }

        // add bonus ore spawn rate modifier of 0-30% depending on if town quarry buff (karma) is active and at what strength
        if (townBuffQuarryLevel > 0) {
          oreSpawnRateModifier += ((townBuffQuarryLevel + 1) * 0.05); // 10% min, 5% per level (10% - 30%)
        }
        
        // mutate ore spawn chance by bonus ore spawn rate modifier (100% +/- modifiers)
        ore.chance *= oreSpawnRateModifier;

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

      // modifier is 100%
      let xpPercentModifier = 1;
      
      // add bonus XP modifier of 0-18% depending on if town quarry buff (karma) is active and at what strength
      if (townBuffQuarryLevel > 0) {
        xpPercentModifier += ((townBuffQuarryLevel + 1) * 0.03); // 6% min, 3% per level (6% - 18%)
      }

      // add bonus XP modifier of 20% from membership benefits
      if (userDoc.miningUpgradeTo && moment().isBefore(userDoc.miningUpgradeTo)) {
        xpPercentModifier += (DONATORS_BENEFITS.miningBonus / 100);
      }

      // mutate damage-per-tick (DPT) by bonus XP modifier (100% +/- modifiers)
      damagePerTick *= xpPercentModifier;
      
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
              miningSpace.health = CDbl(newOre.healthMax);
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
              emptySpace.health = CDbl(newOre.healthMax);
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

      if (gainedXp > 0) {
        addXp('mining', gainedXp);
      }

      Object.keys(gainedItems).forEach((key) => {
        if (key === 'gem') {
          addFakeGems(gainedItems[key].amount, Meteor.userId());
        } else {
          addItem(key, gainedItems[key].amount);
        }
      });

      let mutateMiners = false;
      mining.miners.forEach((miner) => {
        const minerName = miner.id === 'primitive_miner' ? 'stone' : miner.id.replace('_miner', '');
        const targetItem = gainedItems[`ore_${minerName}`];
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
            miners: mining.miners
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

    };

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
      return miningSkill.level + 1 >= recipe.requiredMiningLevel;
    });

    return minersArray;
  },

  'mining.fetchOres'() {
    const miningSkill = Skills.findOne({
      owner: Meteor.userId(),
      type: 'mining'
    });

    const oresArray = Object.keys(MINING.ores).map((key) => {
      const constants = MINING.ores[key];
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
};

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
  const transform = function (doc) {
    return doc;
  };

  const self = this;

  const observer = MiningSpace.find({
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
  const transform = function (doc) {
    return doc;
  };

  const self = this;

  const observer = Mining.find({
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
