import { Meteor } from 'meteor/meteor';
import moment from 'moment';

import { Skills } from '/imports/api/skills/skills';
import { Farming } from '/imports/api/farming/farming';
import { FarmingSpace } from '/imports/api/farming/farming';
import { Users, UserGames } from '/imports/api/users/users';
import { Events } from '/imports/api/events/events';

import { requirementsUtility } from '/server/api/crafting/crafting';
import { addItem } from '/server/api/items/items';
import { addXp } from '/server/api/skills/skills';

import { FARMING } from '/server/constants/farming';
import { ITEMS } from '/server/constants/items';

export const unlockFarmingSpaces = function unlockFarmingSpaces(userId) {
  // Make sure the user is currently a member
  const userDoc = Users.findOne({ _id: userId });

  if (userDoc.membershipTo && moment().isBefore(userDoc.membershipTo)) {
    // Update there farming spaces and make them active
    FarmingSpace.update({
      owner: userId,
      game: userDoc.currentGame
    }, {
      $set: {
        active: true
      }
    }, { multi: true });
  }
}

Meteor.methods({

  'farming.pick'(index) {
    const userDoc = Meteor.user();

    let indexes = [];
    if (index === 'all') {
      indexes = [0, 1, 2, 3, 4, 5];
    } else {
      indexes = [index]
    }

    const targetsToPick = FarmingSpace.find({
      owner: userDoc._id,
      game: userDoc.currentGame,
      index: {
        $in: indexes
      }
    }).fetch();

    targetsToPick.forEach((targetToPick) => {
      if (moment().isAfter(targetToPick.maturityDate)) {
        // Good to pick
        const plantConstants = FARMING.plants[targetToPick.plantId];
        // Fetch Farming
        const farming = Farming.findOne({
          owner: Meteor.userId()
        });

        // Update patch
        FarmingSpace.update({
          _id: targetToPick._id
        }, {
          $set: {
            plantId: null,
            water: null,
            maturityDate: null,
            plantDate: null,
            growing: null
          }
        });

        // Add item
        addItem(plantConstants.produces, plantConstants.produceAmount || 1, userDoc._id, userDoc.currentGame);
        // Add Xp
        addXp('farming', plantConstants.xp, userDoc._id, userDoc.currentGame);
      }
    });

    UserGames.update({
      owners: userDoc._id,
      game: userDoc.currentGame
    }, {
      $set: {
        lastAction: 'farming',
        lastActionDate: new Date()
      }
    }, () => {});
  },

  'farming.killPlant'(index) {
    const userDoc = Meteor.user();
    // Pick whatever is in the specified index
    FarmingSpace.update({
      owner: userDoc._id,
      game: userDoc.currentGame,
      index
    }, {
      $set: {
        plantId: null,
        water: null,
        maturityDate: null,
        plantDate: null,
        growing: null
      }
    });
  },

  'farming.plant'(plantId) {
    const userDoc = Meteor.user();
    if (userDoc.logEvents) {
      Events.insert({
        owner: userDoc._id,
        event: 'farming.plant.single',
        date: new Date(),
        data: { plantId }
      }, () => {})
    }

    const hasFarmingUpgrade = userDoc.farmingUpgradeTo && moment().isBefore(userDoc.farmingUpgradeTo);

    let searchQuery = {};
    if (hasFarmingUpgrade) {
      searchQuery = {
        owner: userDoc._id,
        game: userDoc.currentGame,
        $or: [{
          plantId: {
            $exists: false
          }
        }, {
          plantId: null
        }]
      }
    } else {
      searchQuery = {
        owner: userDoc._id,
        game: userDoc.currentGame,
        index: {
          $in: [0, 1, 2, 3]
        },
        $or: [{
          plantId: {
            $exists: false
          }
        }, {
          plantId: null
        }]
      }
    }

    // Does the user have a spare planting space?
    const emptySpace = FarmingSpace.findOne(searchQuery);

    if (!emptySpace) {
      throw new Meteor.Error("no-free-spaces", "There are no free farming fields to plant this seed");
    }

    // Fetch plant constants
    const plantConstants = FARMING.plants[plantId];

    if (!plantConstants || !requirementsUtility(plantConstants.required, 1, userDoc._id, userDoc.currentGame)) {
      throw new Meteor.Error("requirements-not-met", "You do not meet the requirements to plant this seed");
    }

    // Modify farming space with growing sapling
    FarmingSpace.update(emptySpace._id, {
      $set: {
        plantId: plantConstants.id,
        maturityDate: moment().add(plantConstants.growthTime, 'seconds').toDate(),
        plantDate: new Date(),
        growing: true
      }
    });

    UserGames.update({
      owner: userDoc._id,
      game: userDoc.currentGame
    }, {
      $set: {
        lastAction: 'farming',
        lastActionDate: new Date()
      }
    }, () => {});
  },

  'farming.plantAll'(plantId, specifiedAmount) {

    if (specifiedAmount < 0) {
      return;
    } else if (specifiedAmount > 6) {
      specifiedAmount = 6;
    }

    const userDoc = Meteor.user();

    if (userDoc.logEvents) {
      Events.insert({
        owner: userDoc._id,
        event: 'farming.plant.all',
        date: new Date(),
        data: { plantId }
      }, () => {})
    }


    const hasFarmingUpgrade = userDoc.farmingUpgradeTo && moment().isBefore(userDoc.farmingUpgradeTo);

    let searchQuery = {};
    if (hasFarmingUpgrade) {
      searchQuery = {
        owner: userDoc._id,
        game: userDoc.currentGame,
        $or: [{
          plantId: {
            $exists: false
          }
        }, {
          plantId: null
        }]
      }
    } else {
      searchQuery = {
        owner: userDoc._id,
        game: userDoc.currentGame,
        index: {
          $in: [0, 1, 2, 3]
        },
        $or: [{
          plantId: {
            $exists: false
          }
        }, {
          plantId: null
        }]
      }
    }

    // Which farming spaces are free
    const emptySpaces = FarmingSpace.find(searchQuery).fetch();

    if (!emptySpaces || emptySpaces.length === 0) {
      throw new Meteor.Error("no-free-spaces", "There are no free farming fields to plant this seed");
    }

    // Fetch plant constants
    const plantConstants = FARMING.plants[plantId];

    let plantAmount = specifiedAmount > emptySpaces.length ? emptySpaces.length : specifiedAmount;

    if (!plantConstants || !requirementsUtility(plantConstants.required, plantAmount, userDoc._id, userDoc.currentGame)) {
      throw new Meteor.Error("requirements-not-met", "You do not meet the requirements to plant this seed");
    }

    let indexesToMutate = [];
    if (plantAmount === emptySpaces.length) {
      indexesToMutate = emptySpaces.map((emptySpace) => { return emptySpace.index });
    } else {
      emptySpaces.forEach((emptySpace) => {
        if (indexesToMutate.length < plantAmount) {
          indexesToMutate.push(emptySpace.index);
        }
      });
    }

    // Modify farming space with growing sapling
    FarmingSpace.update({
      owner: userDoc._id,
      game: userDoc.currentGame,
      index: {
        $in: indexesToMutate
      }
    }, {
      $set: {
        plantId: plantConstants.id,
        maturityDate: moment().add(plantConstants.growthTime, 'seconds').toDate(),
        plantDate: new Date(),
        growing: true
      }
    }, { multi: true });

    UserGames.update({
      owner: userDoc._id,
      game: userDoc.currentGame,
    }, {
      $set: {
        lastAction: 'farming',
        lastActionDate: new Date()
      }
    }, () => {});
  },

  'farming.buyShopItem'(seedId, amountToBuy = 1) {
    const userDoc = Meteor.user();
    if (amountToBuy < 1 || amountToBuy > 100 || !_.isFinite(amountToBuy)) {
      return;
    }

    // Is this a valid recipe?
    const shopItemConstants = FARMING.shopItems[seedId];

    if (!shopItemConstants) {
      return;
    }

    // Do we have the requirements for this craft (items / levels / gold)
    if (!requirementsUtility(shopItemConstants.required, amountToBuy, userDoc._id, userDoc.currentGame)) {
      return;
    }

    // Add specified item
    addItem(shopItemConstants.itemId, amountToBuy, userDoc._id, userDoc.currentGame);
  },

  'farming.fetchSeedShopSells'() {
    const userDoc = Meteor.user();
    const farmingSkill = Skills.findOne({
      owner: userDoc._id,
      game: userDoc.currentGame,
      type: 'farming'
    });

    const shopItemsArray = Object.keys(FARMING.shopItems).map((key) => {
      return FARMING.shopItems[key];
    }).filter((shopItem) => {
      // Only show woodcutters we can hire, or close to ( 1 level away )
      if (farmingSkill.level + 1 >= shopItem.requiredFarmingLevel) {
        return true;
      }

      return false;
    }).map((shopItem) => {
      const itemConstants = ITEMS[shopItem.itemId];
      const producesConstants = ITEMS[itemConstants.produces];
      shopItem.icon = ITEMS[shopItem.itemId].icon;
      shopItem.name = ITEMS[shopItem.itemId].name;
      shopItem.seedType = ITEMS[shopItem.itemId].seedType;

      if (_.isFunction(producesConstants.description)) {
        shopItem.description = producesConstants.description();
      } else {
        shopItem.description = ITEMS[shopItem.itemId].description;
      }
      return shopItem;
    });

    return shopItemsArray;
  },
});

const MINUTE = 60 * 1000;
const userId = function userId(userId) {
  return userId;
}

DDPRateLimiter.addRule({ type: 'method', name: 'farming.gameUpdate', userId }, 5, 15000);
DDPRateLimiter.addRule({ type: 'method', name: 'farming.water', userId }, 20, 10000);
DDPRateLimiter.addRule({ type: 'method', name: 'farming.pick', userId }, 20, 10000);
DDPRateLimiter.addRule({ type: 'method', name: 'farming.plant', userId }, 20, 10000);
DDPRateLimiter.addRule({ type: 'method', name: 'farming.buyShopItem', userId }, 100, 1 * MINUTE);
DDPRateLimiter.addRule({ type: 'method', name: 'farming.fetchSeedShopSells', userId }, 10, 1 * MINUTE);
// DDPRateLimiter.addRule({ type: 'subscription', name: 'farmingSpace', userId }, 240, 2 * MINUTE);

Meteor.publish('farmingSpace', function() {
  const userDoc = Users.findOne(this.userId);
  const owner = userDoc._id;
  const game = userDoc.currentGame;

  //Transform function
  var transform = function(doc) {
    if (doc.plantId) {
      const currentPlantConstants = FARMING.plants[doc.plantId];
      doc.icon = currentPlantConstants.icon;
      doc.name = currentPlantConstants.name;
      doc.waterStorage = currentPlantConstants.waterStorage;
    }

    return doc;
  }

  var self = this;

  var observer = FarmingSpace.find({
    owner: userDoc._id,
    game: userDoc.currentGame
  }).observe({
      added: function (document) {
      self.added('farmingSpace', document._id, transform(document));
    },
    changed: function (newDocument, oldDocument) {
      self.changed('farmingSpace', oldDocument._id, transform(newDocument));
    },
    removed: function (oldDocument) {
      self.removed('farmingSpace', oldDocument._id);
    }
  });

  self.onStop(function () {
    observer.stop();
  });

  self.ready();

});
