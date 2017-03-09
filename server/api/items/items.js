import { Meteor } from 'meteor/meteor';
import { Items } from '/imports/api/items/items';
import { Users } from '/imports/api/users/users';
import { ITEMS } from '/server/constants/items.js';

export const addItem = function (itemId, amount) {
  const currentItem = Items.findOne({ owner: Meteor.userId(), itemId });
  const itemConstants = ITEMS[itemId];

  if (currentItem) {
    // Update
    Items.update({ _id: currentItem._id }, {
      $inc: { amount: amount }
    });
  } else {
    // Insert
    Items.insert({
      category: 'mining',
      itemId,
      owner: Meteor.userId(),
      category: itemConstants.category
    });
  }
}

Meteor.methods({

  'items.unequip'(itemId) {
    const itemConstants = ITEMS[itemId];
    const itemSlot = itemConstants.slot;
    const itemCategory = itemConstants.category;

    // Unequip existing items
    Items.update({
      owner: Meteor.userId(),
      category: itemCategory,
      slot: itemSlot
    }, {
      $set: {
        equipped: false
      }
    });
  },

  'items.equip'(itemId) {
    const itemConstants = ITEMS[itemId];
    const itemSlot = itemConstants.slot;
    const itemCategory = itemConstants.category;

    // Unequip existing items
    Items.update({
      owner: Meteor.userId(),
      category: itemCategory,
      slot: itemSlot
    }, {
      $set: {
        equipped: false
      }
    });

    // Equip specified item
    Items.update({
      owner: Meteor.userId(),
      itemId
    }, {
      $set: {
        equipped: true,
        slot: itemSlot,
        category: itemCategory
      }
    });
  },

  'items.sellItem'(itemId, amount) {
    if (amount <= 0) {
      return;
    }

    const currentItem = Items.findOne({ owner: Meteor.userId(), itemId: itemId });

    if (!currentItem) {
      return;
    }

    const itemConstants = ITEMS[currentItem.itemId]
    let amountToSell = amount;

    if (amountToSell >= currentItem.amount) {
      // Force amount to sell to actual item count;
      amountToSell = currentItem.amount;
      // Remove item
      Items.remove(currentItem._id);
    } else {
      // Update item quantity
      Items.update(currentItem._id, {
        $inc: { amount: (amountToSell * -1) }
      });
    }

    // Add gold to users account
    Users.update({
      _id: Meteor.userId()
    }, {
      $inc: { gold: amountToSell * itemConstants.sellPrice }
    });
  }
});

Meteor.publish('items', function() {

  //Transform function
  var transform = function(doc) {
    const itemConstants = ITEMS[doc.itemId];
    doc.icon = itemConstants.icon;
    doc.name = itemConstants.name;
    doc.sellPrice = itemConstants.sellPrice;
    if (itemConstants.category === 'combat') {
      doc.stats = itemConstants.stats;
      doc.isWeapon = itemConstants.isWeapon;
    }
    return doc;
  }

  var self = this;

  var observer = Items.find({
    owner: this.userId
  }).observe({
      added: function (document) {
      self.added('items', document._id, transform(document));
    },
    changed: function (newDocument, oldDocument) {
      self.changed('items', oldDocument._id, transform(newDocument));
    },
    removed: function (oldDocument) {
      self.removed('items', oldDocument._id);
    }
  });

  self.onStop(function () {
    observer.stop();
  });

  self.ready();

});
