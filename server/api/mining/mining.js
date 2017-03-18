import { Meteor } from 'meteor/meteor';
import { MINING } from '/server/constants/mining/index.js';
import moment from 'moment';
import _ from 'underscore';

import { Skills } from '/imports/api/skills/skills';
import { Users } from '/imports/api/users/users';
import { Mining } from '/imports/api/mining/mining';
import { MiningSpace } from '/imports/api/mining/mining';
import { addItem } from '/server/api/items/items';
import { addXp } from '/server/api/skills/skills';

// Store array of sorted ores
const rawOresArray = Object.keys(MINING.ores).map((oreKey) => {
  return MINING.ores[oreKey];
});

const attackMineSpace = function (id, damage) {
  const mineSpace = MiningSpace.findOne({ _id: id, owner: Meteor.userId() });

  const oreConstants = MINING.ores[mineSpace.oreId];

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
  'mining.clickedMineSpace'(mineSpaceId) {
    attackMineSpace(mineSpaceId, 1);
  },

  'mining.buyMiner'() {
    const mining = Mining.findOne({ owner: Meteor.userId() });
    // Maximum # of miners?
    if (mining.miners >= MINING.miners.max) {
      return;
    }

    // Enough gold?
    const newMinersCost = MINING.miners.cost(mining.miners);
    if (Meteor.user().gold < newMinersCost) {
      return;
    }

    // Take gold
    Users.update(Meteor.userId(), {
      $inc: { gold: (newMinersCost * -1) }
    });

    // Up miners
    Mining.update(mining._id, {
      $inc: { miners: 1 }
    });
  },

  'mining.gameUpdate'() {
    // Fetch all db data we need
    const mining = Mining.findOne({ owner: this.userId });
    const miningSkill = Skills.findOne({ owner: this.userId, type: 'mining' });
    let miningSpaces = _.shuffle(MiningSpace.find({ owner: this.userId }).map((doc) => doc));
    let emptyMiningSpaces = miningSpaces.filter((miningSpace) => !miningSpace.oreId);

    // Update last updated immeditely
    // incase an error occurs further on in the code, the users updated will not get set
    // Giving them a lot of extra XP!
    Mining.update(mining._id, {
      $set: { lastGameUpdated: new Date() }
    });

    // Determine time since last update
    const now = moment();
    const secondsElapsed = moment.duration(now.diff(mining.lastGameUpdated)).asSeconds();

    // Takes a list of possible ores, and returns one based off there chances to spawn
    const spawnOre = function (sortedChanceOres) {
      const rollDice = Math.random();
      let newOre;
      for (let i = 0; i < sortedChanceOres.length; i++) {
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
      }

      return gainedXp;
    }

    // Tick count = How many ticks to step through
    // Tick strength = How strong to make each tick, 1 = seconds
    const simulateMining = function (tickCount, tickStrength) {
      // Store gained exp and items, so we can save mongo db queries
      let gainedXp = 0;
      let gainedItems = {};

      // Prepare easy arrays for which ore is about to spawn
      const availableOres = rawOresArray.filter((ore) => ore.requiredLevel <= miningSkill.level);
      const sortedChanceOres = _.sortBy(availableOres, 'chance');

      // Determine how many new ores to spawn
      let newOresCount = tickCount * (MINING.prospecting.chance * tickStrength);
      if ((newOresCount % 1) > Math.random()) {
        newOresCount = Math.ceil(newOresCount);
      } else {
        newOresCount = Math.floor(newOresCount);
      }

      // Determine how much damage your miners do
      const damagePerTick = mining.miners * MINING.miners.damagePerSecond * tickStrength;
      let totalRemainingDamage = damagePerTick * tickCount;

      if (emptyMiningSpaces.length >= newOresCount || (tickCount * tickStrength < 60)) {
        // Add Ores
        miningSpaces.forEach((miningSpace, index) => {
          // Make sure this is an empty mining space
          if (newOresCount > 0 && !miningSpace.oreId) {
            newOresCount--;
            // Spawn ore
            const newOre = spawnOre(sortedChanceOres);
            miningSpace.health = newOre.maxHealth;
            miningSpace.oreId = newOre.id;
            miningSpace.isDirty = true; // So we know to save this later
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
        const genOreEvery = Math.floor(tickCount / newOresCount)

        // Step through
        for (let tick = 0; tick < tickCount; tick++) {
          if (tick % genOreEvery === 0 && emptyMiningSpaces.length > 0) {
            const emptyMiningSpaces = miningSpaces.filter((space) => !space.oreId);
            if (emptyMiningSpaces.length > 0) {
              // Generate ore
              const emptySpace = emptyMiningSpaces[0];
              // Spawn ore
              const newOre = spawnOre(sortedChanceOres);
              emptySpace.health = newOre.maxHealth;
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
  }
});

Meteor.publish('miningSpace', function() {

  //Transform function
  var transform = function(doc) {
    if (doc.oreId) {
      const currentOreConstants = MINING.ores[doc.oreId];
      doc.requiredLevel = currentOreConstants.requiredLevel;
      doc.maxHealth = currentOreConstants.maxHealth;
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
    doc.nextMinerCost = MINING.miners.cost(doc.miners);
    doc.maxMiners = MINING.miners.max;
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
