import { Meteor } from 'meteor/meteor';

import { Skills } from '/imports/api/skills/skills';
import { Farming } from '/imports/api/farming/farming';
import { FarmingSpace } from '/imports/api/farming/farming';

import { requirementsUtility } from '/server/api/crafting/crafting';
import { addItem } from '/server/api/items/items';

import { FARMING } from '/server/constants/farming';
import { ITEMS } from '/server/constants/items';


Meteor.methods({

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
