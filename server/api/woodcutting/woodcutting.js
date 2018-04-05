import { Meteor } from 'meteor/meteor';
import moment from 'moment';

import { DONATORS_BENEFITS } from '/imports/constants/shop/index.js';
import { WOODCUTTING } from '/server/constants/woodcutting/index.js';
import { ITEMS } from '/server/constants/items/index.js';

import { Skills } from '/imports/api/skills/skills';
import { Items } from '/imports/api/items/items';
import { Woodcutting } from '/imports/api/woodcutting/woodcutting';
import { Users, UserGames } from '/imports/api/users/users';

import { requirementsUtility } from '/server/api/crafting/crafting';
import { addItem } from '/server/api/items/items';
import { addXp } from '/server/api/skills/skills';

import { flattenObjectForMongo } from '/server/utils';

Meteor.methods({

  'woodcutting.upgradeStorage'(logId) {
    const userDoc = Meteor.user();
    const owner = userDoc._id;
    const game = userDoc.currentGame;

    const woodcutting = Woodcutting.findOne({
      owner,
      game
    });

    const constants = WOODCUTTING.woods[logId];
    if (!WOODCUTTING.woods[logId]) {
      return;
    }

    let storageLevel = 0;
    if (woodcutting.storage[logId]) {
      storageLevel = woodcutting.storage[logId];
    }

    const costs = WOODCUTTING.STORAGE.costs(storageLevel, logId);

    if (!requirementsUtility(costs, 1)) {
      return;
    }

    woodcutting.storage[logId] = storageLevel + 1;

    Woodcutting.update({
      _id: woodcutting._id
    }, {
      $set: {
        storage: flattenObjectForMongo(woodcutting.storage)
      }
    })
  },

  'woodcutting.collect'() {
    const userDoc = Meteor.user();
    const owner = userDoc._id;
    const game = userDoc.currentGame;

    const woodcutting = Woodcutting.findOne({ owner, game });

    let xpGained = 0;
    Object.keys(woodcutting.collector).forEach((key) => {
      const amount = woodcutting.collector[key];
      addItem(key, amount);
      xpGained += (WOODCUTTING.woods[key].xp * amount);
    });

    const woodcuttingUpdated = Woodcutting.update({
      _id: woodcutting._id,
      lastGameUpdated: woodcutting.lastGameUpdated
    }, {
      $set: {
        collector: {}
      }
    });

    if (woodcuttingUpdated === 1) {
      addXp('woodcutting', xpGained, owner, game);
    }

    UserGames.update({
      owner,
      game
    }, {
      $set: {
        lastAction: 'woodcutting',
        lastActionDate: new Date()
      }
    }, () => {});
  },

  'woodcutting.fireWoodcutter'(index) {
    const userDoc = Meteor.user();
    const owner = userDoc._id;
    const game = userDoc.currentGame;

    const woodcutting = Woodcutting.findOne({ owner, game });
    const targetWoodcutter = woodcutting.woodcutters[index];

    // Ensure this woodcutter isn't already set to die
    if (!targetWoodcutter || targetWoodcutter.deathTime) {
      return;
    }

    // Increase stats
    targetWoodcutter.stats.attackSpeed *= (WOODCUTTING.suicidalFury.attackSpeedIncrease / 100);

    // Append death time
    targetWoodcutter.deathTime = moment().add(WOODCUTTING.suicidalFury.duration, 'seconds').toDate();

    Woodcutting.update({
      owner,
      game
    }, {
      $set: {
        woodcutters: woodcutting.woodcutters
      }
    });

    UserGames.update({
      owner,
      game
    }, {
      $set: {
        lastAction: 'woodcutting',
        lastActionDate: new Date()
      }
    }, () => {});
  },

  'woodcutting.gameUpdate'() {
    const userDoc = Meteor.user();
    const owner = userDoc._id;
    const game = userDoc.currentGame;

    // Fetch all db data we need
    const woodcutting = Woodcutting.findOne({ owner, game });

    if (!woodcutting) {
      return;
    }

    // Update last updated immeditely
    // incase an error occurs further on in the code, the users updated will not get set
    // Giving them a lot of extra XP!
    const newLastGameUpdated = new Date()
    Woodcutting.update(woodcutting._id, {
      $set: { lastGameUpdated: newLastGameUpdated }
    });

    // Determine time since last update
    const now = moment();
    let minutesElapsed = moment.duration(now.diff(woodcutting.lastGameUpdated)).asMinutes();

    // Cap offline gains to 8 hours
    if (minutesElapsed > (8 * 60)) {
      minutesElapsed = 8 * 60;
    }

    // Determine item and exp gains
    const gainedItems = {};
    let gainedXp = 0;

    // Iterate through all miners for minutesElapsed
    woodcutting.woodcutters.forEach((currentWoodcutter) => {
      let localMinutesElapsed = minutesElapsed;
      // Is this woodcutter got a death timer on it?
      if (currentWoodcutter.deathTime) {
        // See how long is left on the deathTime
        const timeDiff = moment().diff(currentWoodcutter.deathTime);
        if (moment().isAfter(currentWoodcutter.deathTime)) {
          localMinutesElapsed -= (timeDiff / 60);
        }

        if (localMinutesElapsed < 0) {
          localMinutesElapsed = 0;
        } else if (localMinutesElapsed > 1) {
          localMinutesElapsed = 1;
        }
      }

      const rawSwingCount = currentWoodcutter.stats.attackSpeed * localMinutesElapsed;
      let definiteSwingCount = Math.floor(rawSwingCount);
      if (rawSwingCount % 1 >= Math.random()) {
        definiteSwingCount += 1;
      }

      // Possible woods
      const possibleLogs = Object.keys(WOODCUTTING.woods).map((woodKey) => {
        return WOODCUTTING.woods[woodKey];
      }).filter((log) => {
        if (currentWoodcutter.stats.attack >= log.requiredAttack) {
          return true;
        }

        return false;
      });

      const sortedLogs = _.sortBy(possibleLogs, 'chance');
      sortedLogs.forEach((log) => {
        let rawGeneratedLogs = log.chance * definiteSwingCount;
        if (currentWoodcutter.stats.accuracy) {
          rawGeneratedLogs *= (1 + (currentWoodcutter.stats.accuracy / 100));
        }

        // Apply membership benefits
        if (userDoc.woodcuttingUpgradeTo && moment().isBefore(userDoc.woodcuttingUpgradeTo)) {
          rawGeneratedLogs *= (1 + (DONATORS_BENEFITS.woodcuttingBonus / 100));
        }

        let definiteGenerateLogs = Math.floor(rawGeneratedLogs);
        if (rawGeneratedLogs % 1 >= Math.random()) {
          definiteGenerateLogs += 1;
        }

        if (definiteGenerateLogs > 0) {
          if (gainedItems[log.id]) {
            gainedItems[log.id] += definiteGenerateLogs;
          } else {
            gainedItems[log.id] = definiteGenerateLogs;
          }
        }

        gainedXp += (log.xp * definiteGenerateLogs);
        definiteSwingCount -= definiteGenerateLogs;
      });
    });


    let collectorMutated = false;

    let storageLimits = {};
    if (Object.keys(gainedItems).length > 0) {
      Object.keys(WOODCUTTING.woods).forEach((key) => {
        const log = WOODCUTTING.woods[key];

        let baseLimit = 50;
        let storagePerLevel = 10;
        if (WOODCUTTING.woods[key].storage) {
          if (WOODCUTTING.woods[key].storage.base) {
            baseLimit = WOODCUTTING.woods[key].storage.base;
          }
          if (WOODCUTTING.woods[key].storage.perLevel) {
            storagePerLevel = WOODCUTTING.woods[key].storage.perLevel;
          }
        }

        let storageLevel = 0;
        if (woodcutting.storage[log.id]) {
          storageLevel = woodcutting.storage[log.id];
        }
        storageLimits[log.id] = baseLimit + (storageLevel * storagePerLevel);
      });
    }

    Object.keys(gainedItems).forEach((key) => {
      collectorMutated = true;
      if (woodcutting.collector[key]) {
        woodcutting.collector[key] += gainedItems[key];
        if (woodcutting.collector[key] > storageLimits[key]) {
          woodcutting.collector[key] = storageLimits[key];
        }
      } else {
        woodcutting.collector[key] = gainedItems[key];
      }
    });

    if (collectorMutated) {
      Woodcutting.update({
        owner,
        game,
        lastGameUpdated: newLastGameUpdated
      }, {
        $set: {
          collector: flattenObjectForMongo(woodcutting.collector)
        }
      });
    }

    // If there is any woodcutters with death timers past now, kill em
    woodcutting.woodcutters.forEach((woodcutter) => {
      if (woodcutter.deathTime && moment().isAfter(woodcutter.deathTime)) {
        Woodcutting.update(woodcutting._id, {
          $pull: {
            woodcutters: {
              deathTime: woodcutter.deathTime
            }
          }
        }, { multi: true });  
      }
    });
  },

  'woodcutting.fetchWoodcutters'() {
    const userDoc = Meteor.user();
    const owner = userDoc._id;
    const game = userDoc.currentGame;

    const woodcuttingSkill = Skills.findOne({
      owner,
      game,
      type: 'woodcutting'
    });

    const woodcuttersArray = Object.keys(WOODCUTTING.woodcutters).map((key) => {
      return WOODCUTTING.woodcutters[key];
    }).filter((recipe) => {
      // Only show woodcutters we can hire, or close to ( 1 level away )
      if (woodcuttingSkill.level + 1 >= recipe.requiredWoodcuttingLevel) {
        return true;
      }

      return false;
    });

    return woodcuttersArray;
  },

  'woodcutting.hireWoodcutter'(woodcutterId) {
    const userDoc = Meteor.user();
    const owner = userDoc._id;
    const game = userDoc.currentGame;

    const woodcutting = Woodcutting.findOne({ owner, game });

    // Do we have room for more woodcutters?
    if (woodcutting.woodcutters.length >= WOODCUTTING.baseMaxWoodcutters) {
      return;
    }

    // Is this a valid recipe?
    const woodcutterConstants = WOODCUTTING.woodcutters[woodcutterId];
    if (!woodcutterConstants) {
      return;
    }

    // Fetch the axe which we will use, as it will dissapear when we call requirements util
    const axeToUse = Items.findOne({
      itemId: woodcutterConstants.axeId,
      owner,
      game
    }, {
      sort: [
        ['quality', 'desc']
      ]
    });

    // Do we have the requirements for this craft (items / levels / gold)
    if (!requirementsUtility(woodcutterConstants.required, 1)) {
      return;
    }

    const stats = JSON.parse(JSON.stringify(ITEMS[axeToUse.itemId].stats));

    if (axeToUse.extraStats) {
      Object.keys(axeToUse.extraStats).forEach((stat) => {
        if(stats[stat] !== undefined) {
          stats[stat] += axeToUse.extraStats[stat];
        }
      });
    }

    // Add woodcutter
    Woodcutting.update(woodcutting._id, {
      $push: {
        woodcutters: {
          stats,
          icon: woodcutterConstants.icon,
          name: woodcutterConstants.name,
          woodcutterId: woodcutterConstants.id,
          quality: axeToUse.quality
        }
      }
    });

    UserGames.update({
      owner,
      game
    }, {
      $set: {
        lastActionDate: 'woodcutting',
        lastActionDate: new Date()
      }
    });
  }

})

const MINUTE = 60 * 1000;

// DDPRateLimiter.addRule({ type: 'method', name: 'woodcutting.fireWoodcutter' }, 10, 1 * MINUTE);
DDPRateLimiter.addRule({ type: 'method', name: 'woodcutting.gameUpdate',
  userId(userId) {
    return userId;
  } 
}, 3, 10000);
// DDPRateLimiter.addRule({ type: 'method', name: 'woodcutting.fetchWoodcutters' }, 10, 1 * MINUTE);
// DDPRateLimiter.addRule({ type: 'method', name: 'woodcutting.hireWoodcutter' }, 10, 1 * MINUTE);
// DDPRateLimiter.addRule({ type: 'subscription', name: 'woodcutting' }, 40, 2 * MINUTE);

Meteor.publish('woodcutting', function() {
  const userDoc = Meteor.user();
  const owner = userDoc._id;
  const game = userDoc.currentGame;

  //Transform function
  var transform = function(doc) {
    doc.maxWoodcutters = WOODCUTTING.baseMaxWoodcutters;
    return doc;
  }

  var self = this;

  var observer = Woodcutting.find({
    owner,
    game
  }).observe({
      added: function (document) {
      self.added('woodcutting', document._id, transform(document));
    },
    changed: function (newDocument, oldDocument) {
      self.changed('woodcutting', oldDocument._id, transform(newDocument));
    },
    removed: function (oldDocument) {
      self.removed('woodcutting', oldDocument._id);
    }
  });

  self.onStop(function () {
    observer.stop();
  });

  self.ready();

});
