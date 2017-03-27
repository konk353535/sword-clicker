import { Meteor } from 'meteor/meteor';
import { Items } from '/imports/api/items/items';
import { Users } from '/imports/api/users/users';
import { Skills } from '/imports/api/skills/skills';
import { ITEMS } from '/server/constants/items/index.js';
import { FARMING } from '/server/constants/farming/index.js';
import { updateCombatStats } from '/server/api/combat/combat.js';
import { updateMiningStats } from '/server/api/mining/mining.js';

export const addItem = function (itemId, amount = 1, specificUserId) {
  let owner;
  if (specificUserId) {
    owner = specificUserId;
  } else {
    owner = Meteor.userId();
  }

  const newItemsList = [];
  const itemConstants = ITEMS[itemId];  

  // Roll for stats if required
  if (itemConstants.extraStats) {
    for (let i = 0; i < amount; i++) {
      // Generate unique stats for each item
      const extraStats = {};
      let myRoll = 0;
      let maxRoll = 0;

      // Roll for each of the stats
      Object.keys(itemConstants.extraStats).forEach((statName) => {
        const extra = Math.round(itemConstants.extraStats[statName] * Math.random());
        // Determine how good this roll was
        maxRoll += 1;
        if (extra > 0) {
          extraStats[statName] = extra;
          myRoll += (extra / itemConstants.extraStats[statName]);
        }
      });

      let quality = 0;
      if (myRoll === 0 || maxRoll === 0) {
        quality = 0;
      } else {
        quality = Math.round((myRoll / maxRoll) * 100);
      }

      newItemsList.push({
        category: itemConstants.category,
        itemId,
        owner,
        extraStats,
        quality
      });
    }
  } else {
    newItemsList.push({
      category: itemConstants.category,
      itemId,
      owner
    });
  }

  if (newItemsList.length === 1) {
    const extraStats = newItemsList[0].extraStats;
    const currentItem = Items.findOne({ owner, itemId, extraStats });
    if (currentItem) {
      // Update
      Items.update({ _id: currentItem._id }, {
        $inc: { amount: amount }
      });
    } else {
      Items.insert(newItemsList[0]);
    }
  } else {
    newItemsList.forEach((newItem) => {
      // Insert
      Items.insert(newItem);
    });
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
    }, { multi: true });

    if (itemCategory === 'combat') {
      updateCombatStats();
    } else if (itemCategory === 'mining') {
      updateMiningStats();
    }
  },

  'items.equip'(_id, itemId) {
    const itemConstants = ITEMS[itemId];
    const itemSlot = itemConstants.slot;
    const itemCategory = itemConstants.category;

    // Can we equip the specified item?
    if (itemConstants.requiredEquip) {
      // Make sure we have the correct stats
      const statNames = itemConstants.requiredEquip.map((skill) => skill.name);
      const usersStats = Skills.find({
        owner: Meteor.userId(),
        type: {
          $in: statNames
        }
      }).fetch();

      let hasEquipRequirements = true;
      let requirementString;
      itemConstants.requiredEquip.forEach((requirement) => {
        const mySkill = _.findWhere(usersStats, { type: requirement.name });

        if (!mySkill) {
          hasEquipRequirements = false;
          requirementString = 'You must have atleast level ';
          requirementString += `${requirement.level} ${requirement.name} to equip this item`;
        } else if (mySkill.level < requirement.level) {
          hasEquipRequirements = false;
          requirementString = 'You must have atleast level ';
          requirementString += `${requirement.level} ${requirement.name} to equip this item`;
        }
      });

      if (!hasEquipRequirements) {
        throw new Meteor.Error("equip-requirement", requirementString);
      }
    }


    // Unequip existing items
    Items.update({
      owner: Meteor.userId(),
      equipped: true,
      slot: itemSlot
    }, {
      $set: {
        equipped: false
      }
    }, { multi: true });

    // Equip specified item
    Items.update({
      owner: Meteor.userId(),
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
    } else if (itemCategory === 'mining') {
      updateMiningStats();
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

      if (itemConstants.category === 'combat') {
        updateCombatStats();
      } else if (itemConstants.category === 'mining') {
        updateMiningStats();
      }
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
      doc.isEquippable = itemConstants.isEquippable;
      if (doc.extraStats) {
        Object.keys(doc.extraStats).forEach((statName) => {
          if (doc.stats[statName]) {
            doc.stats[statName] += doc.extraStats[statName];
          }
        });
      }
    } else if (itemConstants.category === 'seed') {
      doc.plantingDetails = FARMING.plants[itemConstants.produces];
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
