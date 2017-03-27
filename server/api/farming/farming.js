import { Meteor } from 'meteor/meteor';
import moment from 'moment';

import { Skills } from '/imports/api/skills/skills';
import { Farming } from '/imports/api/farming/farming';
import { FarmingSpace } from '/imports/api/farming/farming';

import { requirementsUtility } from '/server/api/crafting/crafting';
import { addItem } from '/server/api/items/items';

import { FARMING } from '/server/constants/farming';
import { ITEMS } from '/server/constants/items';


Meteor.methods({

  'farming.gameUpdate'() {
    // Fetch farming for last game updated
    const farming = Farming.findOne({ owner: Meteor.userId() });

    if (!farming) {
      return;
    }

    // Time since last update
    const now = moment();
    const secondsElapsed = moment.duration(now.diff(farming.lastGameUpdated)).asSeconds();

    // Fetch all in use farming spaces
    const farmingSpaces = FarmingSpace.find({
      owner: Meteor.userId(),
      plantId: {
        $exists: true
      }
    }).forEach((farmSpace) => {
      if (farmSpace.plantId) {
        // Update me farm space water usage

      } else {
        console.log('Shouldnt be here...?');
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

      // Update patch
      FarmingSpace.update({
        _id: targetToPick._id
      }, {
        $set: {
          plantId: null,
          water: null,
          maturityDate: null,
          plantDate: null
        }
      });

      // Add item
      addItem(plantConstants.produces);
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
        plantDate: new Date()
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
      console.log('Changed');
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
