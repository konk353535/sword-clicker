import { Meteor } from 'meteor/meteor';
import moment from 'moment';

import { Skills } from '/imports/api/skills/skills';
import { Farming } from '/imports/api/farming/farming';
import { FarmingSpace } from '/imports/api/farming/farming';
import { Users } from '/imports/api/users/users';
import { Events } from '/imports/api/events/events';

import { requirementsUtility } from '/imports/api/crafting/crafting';
import { addItem } from '/imports/api/items/items';
import { addXp } from '/imports/api/skills/skills';

import { FARMING } from '/server/constants/farming';
import { ITEMS } from '/server/constants/items';

// Given a farm space, will return it modified based on
/*
const farmSpaceModifier = function (farmSpace, farming) {
  if (farmSpace.plantId && farmSpace.plantId !== 'dead_plant' && farmSpace.growing) {
    const plantConstants = FARMING.plants[farmSpace.plantId];

    const now = moment();
    const plantDate = moment(farmSpace.plantDate);
    const maturityDate = moment(farmSpace.maturityDate);
    let secondsElapsed = moment.duration(now.diff(farming.lastGameUpdated)).asSeconds();

    // Cap secondsElapsed to plants entire growth time - last updated time
    const timeSincePlanted = moment.duration(now.diff(farmSpace.plantDate)).asSeconds();
    const timeTotal = moment.duration(maturityDate.diff(plantDate)).asSeconds();

    if (secondsElapsed > timeSincePlanted) {
      secondsElapsed = timeSincePlanted;
    }

    if (secondsElapsed > timeTotal) {
      secondsElapsed = timeTotal;
    }

    // Percentage of total growth time
    const growthTimeDecimal = secondsElapsed / plantConstants.growthTime;

    // Store original water
    const originalWater = farmSpace.water;

    // Update me farm space water usage
    farmSpace.water -= (growthTimeDecimal * plantConstants.requiredWater);

    farmSpace.isDirty = true;
    if (farmSpace.water <= 0) {

      // Grow if there was originally any water
      if (originalWater >= 1) {
        // Determine growth from water amount
        const growthAmount = (originalWater / plantConstants.requiredWater) * plantConstants.growthTime;
        secondsElapsed -= growthAmount;
      }

      farmSpace.plantDate = moment(farmSpace.plantDate).add(secondsElapsed, 'seconds').toDate();
      farmSpace.maturityDate = moment(farmSpace.maturityDate).add(secondsElapsed, 'seconds').toDate();
      const totalTime = Math.abs(moment().diff(farmSpace.maturityDate)) / 1000;
      if (totalTime > plantConstants.growthTime) {
        farmSpace.plantDate = moment().toDate();
        farmSpace.maturityDate = moment().add(plantConstants.growthTime, 'seconds').toDate();
      }
    } else if (now.isAfter(maturityDate)) {
      farmSpace.growing = false;
    }
  }

  return farmSpace;
}*/

export const unlockFarmingSpaces = function unlockFarmingSpaces(userId) {
  // Make sure the user is currently a member
  const userDoc = Users.findOne({ _id: userId });

  if (userDoc.membershipTo && moment().isBefore(userDoc.membershipTo)) {
    // Update there farming spaces and make them active
    FarmingSpace.update({
      owner: userId
    }, {
      $set: {
        active: true
      }
    }, { multi: true });
  }
}

Meteor.methods({

  /*
  'farming.gameUpdate'() {
    this.unblock();
    // Fetch farming for last game updated
    const farming = Farming.findOne({ owner: Meteor.userId() });

    if (!farming) {
      return;
    }

    Farming.update(farming._id, {
      $set :{
        lastGameUpdated: new Date()
      }
    });

    // Fetch all in use farming spaces
    const farmingSpaces = FarmingSpace.find({
      owner: Meteor.userId(),
      plantId: {
        $exists: true
      }
    }).map((farmSpace) => {
      return farmSpace;
    });
  },

  'farming.water'(index) {
    // Water whatever is in the specified index
    const targetToWater = FarmingSpace.findOne({
      owner: Meteor.userId(),
      index
    });

    if (targetToWater.plantId) {
      const farming = Farming.findOne({ owner: Meteor.userId() });

      const plantConstants = FARMING.plants[targetToWater.plantId];
      if (targetToWater.water < plantConstants.waterStorage) {
        FarmingSpace.update(targetToWater._id, {
          $set: {
            water: plantConstants.waterStorage
          }
        });
      }
    }
  },*/

  'farming.pick'(index) {
    // Pick whatever is in the specified index
    const targetToPick = FarmingSpace.findOne({
      owner: Meteor.userId(),
      index
    });
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
      addItem(plantConstants.produces, plantConstants.produceAmount || 1);
      // Add Xp
      addXp('farming', plantConstants.xp);
    } else {
      // Not ready to pick
      throw new Meteor.Error("cant-pick", "That is not ready to pick yet");
    }
  },

  'farming.killPlant'(index) {
    // Pick whatever is in the specified index
    FarmingSpace.update({
      owner: Meteor.userId(),
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
        owner: this.userId,
        event: 'farming.plant.single',
        date: new Date(),
        data: { plantId }
      }, () => {})
    }

    const hasFarmingUpgrade = userDoc.farmingUpgradeTo && moment().isBefore(userDoc.farmingUpgradeTo);

    let searchQuery = {};
    if (hasFarmingUpgrade) {
      searchQuery = {
        owner: Meteor.userId(),
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
        owner: Meteor.userId(),
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

    if (!plantConstants || !requirementsUtility(plantConstants.required)) {
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
        owner: this.userId,
        event: 'farming.plant.all',
        date: new Date(),
        data: { plantId }
      }, () => {})
    }


    const hasFarmingUpgrade = userDoc.farmingUpgradeTo && moment().isBefore(userDoc.farmingUpgradeTo);

    let searchQuery = {};
    if (hasFarmingUpgrade) {
      searchQuery = {
        owner: Meteor.userId(),
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
        owner: Meteor.userId(),
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

    if (!plantConstants || !requirementsUtility(plantConstants.required, plantAmount)) {
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
      owner: Meteor.userId(),
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
  },

  'farming.buyShopItem'(seedId, amountToBuy = 1) {
    if (amountToBuy < 1 || amountToBuy > 100 || !_.isFinite(amountToBuy)) {
      return;
    }

    // Is this a valid recipe?
    const shopItemConstants = FARMING.shopItems[seedId];

    if (!shopItemConstants) {
      return;
    }

    // Do we have the requirements for this craft (items / levels / gold)
    if (!requirementsUtility(shopItemConstants.required, amountToBuy)) {
      return;
    }

    // Add specified item
    addItem(shopItemConstants.itemId, amountToBuy);
  },

  'farming.fetchSeedShopSells'() {
    const farmingSkill = Skills.findOne({
      owner: Meteor.userId(),
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
    owner: this.userId
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
