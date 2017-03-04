import { Meteor } from 'meteor/meteor';
import { MINING } from '/server/constants/mining.js';
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
    // Fetch current users mine space
    const mining = Mining.findOne({ owner: this.userId });
    const miningSkill = Skills.findOne({ owner: this.userId, type: 'mining' });
    const miningSpaces = _.shuffle(MiningSpace.find({ owner: this.userId }).map((doc) => doc));
    const emptyMiningSpaces = miningSpaces.filter((miningSpace) => !miningSpace.oreId);

    // Determine time since last update
    const now = moment();
    const secondsElapsed = moment.duration(now.diff(mining.lastGameUpdated)).asSeconds();

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

    const simulateMining = function (tickCount, tickStrength) {
      console.log(`Simulating Mining: ${tickCount} Strength ${tickStrength}`);
      // Tick count = How many ticks to step through
      // Tick strength = How strong to make each tick, 1 = seconds, 60 = minutes, ect

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

      console.log(`Generating ${newOresCount} new ores`);

      // Determine how much damage your miners do
      const damagePerTick = mining.miners * MINING.miners.damagePerSecond * tickStrength;
      let totalRemainingDamage = damagePerTick * tickCount;

      console.log(`Applying ${totalRemainingDamage} damage from miners`);

      console.log(`Empty spaces - ${emptyMiningSpaces.length} - New Ores - ${newOresCount}`);
      if (emptyMiningSpaces.length >= newOresCount) {
        console.log('Ping');
        // Add Ores
        _.shuffle(emptyMiningSpaces).forEach((emptyMiningSpace) => {
          if (newOresCount > 0) {
            newOresCount--;
            // Spawn ore
            const newOre = spawnOre(sortedChanceOres);
            emptyMiningSpace.health = newOre.maxHealth;
            emptyMiningSpace.oreId = newOre.id;
            emptyMiningSpace.isDirty = true; // So we know to save this later
          }
        });

        // Do damage
        for (let i = 0; i < miningSpaces.length; i++) {
          const miningSpace = miningSpaces[i];
          const oreConstants = MINING.ores[miningSpace.oreId];
          miningSpace.isDirty = true;
          if (miningSpace.health <= totalRemainingDamage) {
            totalRemainingDamage -= miningSpace.health;
            miningSpace.oreId = null;
            addItem(oreConstants.itemId, 1);
          } else {
            miningSpace.health -= totalRemainingDamage;
            totalRemainingDamage = 0;
            break;
          }
        }

        // Save modified miningSpaces
        miningSpaces.forEach((miningSpace) => {
          if (miningSpace.isDirty) {
            MiningSpace.update(miningSpace._id, {
              $set: { oreId: miningSpace.oreId, health: miningSpace.health },
            });
          }
        });
      } else {
        // Step through

      }
    }

    if (secondsElapsed > 300) {
      // To save CPU, use minute based ticks
      const minuteTicks = Math.floor(secondsElapsed / 60);
      simulateMining(minuteTicks, 60);
    } else {
      // Less then 5 minutes, use second based ticks
      simulateMining(secondsElapsed, 1);
    }

    Mining.update(mining._id, {
      $set: { lastGameUpdated: new Date() }
    });
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
