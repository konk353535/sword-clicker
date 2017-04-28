import { Meteor } from 'meteor/meteor';
import moment from 'moment';

import { Skills } from '/imports/api/skills/skills';
import { Farming } from '/imports/api/farming/farming';
import { FarmingSpace } from '/imports/api/farming/farming';
import { Users } from '/imports/api/users/users';

import { requirementsUtility } from '/server/api/crafting/crafting';
import { addItem } from '/server/api/items/items';
import { addXp } from '/server/api/skills/skills';

import { FARMING } from '/server/constants/farming';
import { ITEMS } from '/server/constants/items';

// Given a farm space, will return it modified based on
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

    // Update me farm space water usage
    farmSpace.water -= (growthTimeDecimal * plantConstants.requiredWater);

    farmSpace.isDirty = true;
    if (farmSpace.water <= 0) {
      // This plant has died!
      farmSpace.plantId = 'dead_plant';
      farmSpace.maturityDate = new Date();
    } else if (now.isAfter(maturityDate)) {
      farmSpace.growing = false;
    }
  }

  return farmSpace;
}

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
      return farmSpaceModifier(farmSpace, farming);
    });

    // Save any changes to farm space
    farmingSpaces.forEach((farmSpace) => {
      if (farmSpace.isDirty) {
        FarmingSpace.update(farmSpace._id, {
          $set: {
            water: farmSpace.water,
            plantId: farmSpace.plantId,
            maturityDate: farmSpace.maturityDate,
            growing: farmSpace.growing
          }
        });
      }
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

      // Is this plant already dead?
      let updatedTargetToWater = farmSpaceModifier(targetToWater, farming);
      if (updatedTargetToWater.water <= 0 && updatedTargetToWater.isDirty) {
        throw new Meteor.Error("woops", "This is dead. So cannot be picked. Sorry!");
      }

      const plantConstants = FARMING.plants[targetToWater.plantId];
      if (targetToWater.water < plantConstants.waterStorage) {
        FarmingSpace.update(targetToWater._id, {
          $set: {
            water: plantConstants.waterStorage
          }
        });
      }
    }
  },

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

      let updatedTargetToPick = farmSpaceModifier(targetToPick, farming);
      if (updatedTargetToPick.water <= 0 && updatedTargetToPick.isDirty) {
        throw new Meteor.Error("woops", "This is dead. So cannot be picked. Sorry!");
      }

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
      addItem(plantConstants.produces);
      // Add Xp
      addXp('farming', plantConstants.xp);
    } else {
      // Not ready to pick
      throw new Meteor.Error("cant-pick", "That is not ready to pick yet");
    }
  },

  'farming.plant'(plantId) {
    // Does the user have a spare planting space?
    const emptySpace = FarmingSpace.findOne({
      owner: Meteor.userId(),
      active: true,
      $or: [{
        plantId: {
          $exists: false
        }
      }, {
        plantId: null
      }]
    });

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
        water: plantConstants.initialWater,
        maturityDate: moment().add(plantConstants.growthTime, 'seconds').toDate(),
        plantDate: new Date(),
        growing: true
      }
    });
  },

  'farming.buyShopItem'(seedId) {
    // Is this a valid recipe?
    const shopItemConstants = FARMING.shopItems[seedId];

    if (!shopItemConstants) {
      return;
    }

    // Do we have the requirements for this craft (items / levels / gold)
    if (!requirementsUtility(shopItemConstants.required, 1)) {
      return;
    }

    // Add specified item
    addItem(shopItemConstants.itemId, 1);
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
      shopItem.icon = ITEMS[shopItem.itemId].icon;
      shopItem.name = ITEMS[shopItem.itemId].name;
      shopItem.description = ITEMS[shopItem.itemId].description;
      return shopItem;
    });

    return shopItemsArray;
  },
});

const MINUTE = 60 * 1000;

// DDPRateLimiter.addRule({ type: 'method', name: 'farming.gameUpdate' }, 20, 1 * MINUTE);
// DDPRateLimiter.addRule({ type: 'method', name: 'farming.water' }, 10, 0.25 * MINUTE);
// DDPRateLimiter.addRule({ type: 'method', name: 'farming.pick' }, 12, 1 * MINUTE);
// DDPRateLimiter.addRule({ type: 'method', name: 'farming.plant' }, 12, 1 * MINUTE);
// DDPRateLimiter.addRule({ type: 'method', name: 'farming.buyShopItem' }, 40, 1 * MINUTE);
// DDPRateLimiter.addRule({ type: 'method', name: 'farming.fetchSeedShopSells' }, 10, 1 * MINUTE);
// DDPRateLimiter.addRule({ type: 'subscription', name: 'farmingSpace' }, 240, 2 * MINUTE);

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
