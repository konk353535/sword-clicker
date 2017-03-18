import { Meteor } from 'meteor/meteor';
import { Items } from '/imports/api/items/items';
import { Users } from '/imports/api/users/users';
import { ITEMS } from '/server/constants/items.js';
import { updateCombatStats } from '/server/api/combat/combat.js';

export const addItem = function (itemId, amount, specificUserId) {
  let owner;
  if (specificUserId) {
    owner = specificUserId;
  } else {
    owner = Meteor.userId();
  }

  // Roll stats if we have to
  let extraStats;
  const itemConstants = ITEMS[itemId];  
  if (itemConstants.extraStats) {
    extraStats = {};
    // Roll for each of the stats
    Object.keys(itemConstants.extraStats).forEach((statName) => {
      const extra = Math.round(itemConstants.extraStats[statName] * Math.random());
      if (extra > 0) {
        extraStats[statName] = extra;
      }
    });
  }

  const currentItem = Items.findOne({ owner, itemId, extraStats });

  if (currentItem) {
    // Update
    Items.update({ _id: currentItem._id }, {
      $inc: { amount: amount }
    });
  } else {
    const newItem = {
      category: itemConstants.category,
      itemId,
      owner
    }

    if (extraStats) {
      newItem.extraStats = extraStats;
    }

    // Insert
    Items.insert(newItem);
  }
}

Meteor.methods({

  'items.unequip'(_id, itemId) {
    const itemConstants = ITEMS[itemId];
    const itemSlot = itemConstants.slot;
    const itemCategory = itemConstants.category;

    // Unequip existing items
    Items.update({
      owner: Meteor.userId(),
      category: itemCategory,
      slot: itemSlot,
      _id
    }, {
      $set: {
        equipped: false
      }
    });

    if (itemCategory === 'combat') {
      updateCombatStats();
    }
  },

  'items.equip'(_id, itemId) {
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
      itemId,
      _id,
    }, {
      $set: {
        equipped: true,
        slot: itemSlot,
        category: itemCategory
      }
    });

    if (itemCategory === 'combat') {
      updateCombatStats();
    }
  },

  'items.sellItem'(_id, itemId, amount) {
    if (amount <= 0) {
      return;
    }

    const currentItem = Items.findOne({ _id, owner: Meteor.userId(), itemId: itemId });

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
    if (itemConstants.stats) {
      doc.stats = JSON.parse(JSON.stringify(itemConstants.stats));
      doc.isWeapon = itemConstants.isWeapon;
      if (doc.extraStats) {
        Object.keys(doc.extraStats).forEach((statName) => {
          if (doc.stats[statName]) {
            doc.stats[statName] += doc.extraStats[statName];
          }
        });
      }
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
