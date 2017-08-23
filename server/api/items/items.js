import { Meteor } from 'meteor/meteor';
import { Items } from '/imports/api/items/items';
import { Users } from '/imports/api/users/users';
import { Skills } from '/imports/api/skills/skills';
import { Combat } from '/imports/api/combat/combat';
import { Crafting } from '/imports/api/crafting/crafting';
import { Events } from '/imports/api/events/events';

import { addXp } from '/server/api/skills/skills.js';
import { ITEMS } from '/server/constants/items/index.js';
import { FARMING } from '/server/constants/farming/index.js';
import { BUFFS } from '/server/constants/combat/index.js';
import { updateCombatStats, processCombatEvent } from '/server/api/combat/combat.js';
import { updateMiningStats } from '/server/api/mining/mining.js';
import { flattenObjectForMongo } from '/server/utils';

import _ from 'underscore';

const math = require('mathjs');

export const addItem = function (itemId, amount = 1, specificUserId) {
  let owner;
  if (specificUserId) {
    owner = specificUserId;
  } else {
    owner = Meteor.userId();
  }

  const newItemsList = [];
  const itemConstants = ITEMS[itemId];  

  if (!itemConstants) {
    console.log(`Failed - ${itemId}`)
    return;
  }

  // Roll for stats if required
  if (itemConstants.extraStats) {
    for (let i = 0; i < amount; i++) {
      // Generate unique stats for each item
      const extraStats = {};
      let myRoll = 0;
      let maxRoll = 0;

      // Roll for each of the stats
      Object.keys(itemConstants.extraStats).forEach((statName) => {
        const extra = itemConstants.extraStats[statName] * Math.random();
        // Determine how good this roll was
        maxRoll += 1;
        if (extra > 0) {
          extraStats[statName] = math.round(extra, 1);
          myRoll += (extraStats[statName] / itemConstants.extraStats[statName]);
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
      owner,
      amount
    });
  }

  if (newItemsList.length === 1 && !itemConstants.stats) {
    if (itemConstants.extraStats) {
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
      Items.upsert({ owner, itemId }, {
        $inc: {
          amount
        },
        $setOnInsert: {
          itemId,
          owner,
          category: itemConstants.category,
          amount,
          equipped: false
        }
      })
    }
  } else {
    newItemsList.forEach((newItem) => {
      // Insert
      Items.insert(newItem);
    });
  }
}

export const addFakeGems = function (amount, userId) {
  // Ensure amount is valid
  if (!_.isFinite(amount) || amount < 0 || amount > 1000) {
    return;
  }

  // Ensure user already has fakeGems count
  Users.update({
    _id: userId,
    fakeGems: {
      $exists: true
    }
  }, {
    $inc: {
      fakeGems: amount
    }
  });
}

export const hasGems = function (count, userObject) {
  if (userObject.fakeGems == null || userObject.fakeGemsToday == null) {
    return false;
  }

  const totalGems = userObject.gems + userObject.fakeGems;

  return totalGems >= count;
}

export const consumeGems = function (count, userObject) {
  let fakeConsumed = 0;
  let realConsumed = 0;

  if (!userObject || userObject.fakeGems + userObject.gems < count) {
    return false;
  }

  // Remove the fake gems first
  if (userObject.fakeGems >= count) {
    fakeConsumed = count;
  } else {
    fakeConsumed = userObject.fakeGems || 0;
    realConsumed = count - fakeConsumed;
  }

  if (fakeConsumed + realConsumed < count || !_.isFinite(fakeConsumed) || !_.isFinite(realConsumed)) {
    return false;
  }

  Users.update(userObject._id, {
    $inc: {
      fakeGems: fakeConsumed * -1,
      gems: realConsumed * -1
    }
  });

  return true;
}

export const consumeItem = function (itemObject, amount) {
  // Use up item
  if (itemObject.amount === amount) {
    Items.remove(itemObject._id);
  } else {
    Items.update(itemObject._id, {
      $inc: { amount: (-1 * amount) }
    });
  }
}

Meteor.methods({

  'items.unequip'(_id, itemId) {
    const item = Items.findOne({
      owner: Meteor.userId(),
      _id: _id
    });

    // SECURITY ISSUE: We're trusting the user to send the correct itemId here, needs to be fix
    const itemConstants = ITEMS[item.itemId];
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
      updateCombatStats(Meteor.userId(), Meteor.user().username, itemSlot === 'neck');
    } else if (itemCategory === 'mining') {
      updateMiningStats();
    }
  },

  'items.use'({ baseItemId, targetItemId }) {

    // Fetch both items
    const baseItem = Items.findOne({
      owner: Meteor.userId(),
      _id: baseItemId
    });

    if (!baseItem || baseItem.amount <= 0) {
      return;
    }

    let targetItemConstants;
    let targetItem;
    if (targetItemId) {
      targetItem = Items.findOne({
        owner: Meteor.userId(),
        _id: targetItemId
      });

      if (!targetItem || targetItem.amount <= 0) {
        return;
      }

      targetItemConstants = ITEMS[targetItem.itemId];
    }

    const baseItemConstants = ITEMS[baseItem.itemId];

    // Check what the behaviour is for the baseItem, targetting that targetItem
    if (baseItem.itemId === 'enhancer_key') {
      const ENHANCER_KEY_INCREASE = 15;

      if (targetItemConstants.extraStats && targetItem.quality < 100 && !targetItem.enhanced) {
        // Get the current quality
        const originalQuality = targetItem.quality
        const targetItemClone = JSON.parse(JSON.stringify(targetItem));

        // Mutate the targetItems stats until we get to target quality
        const increaseOptions = []
        const extraStatKeys = Object.keys(targetItemConstants.extraStats);
        extraStatKeys.forEach((extraStatKey) => {
          const maxStat = targetItemConstants.extraStats[extraStatKey];
          const currentStat = targetItem.extraStats[extraStatKey];

          if (currentStat !== maxStat) {
            // Stat percentage
            const statPercent = (currentStat / maxStat) * 100;
            // Smallest increment
            // Divide by 10, as smallest increment of stat is 0.1
            const smallestIncrement = (((1 / maxStat) * 100) / extraStatKeys.length) / 10;

            if (smallestIncrement <= ENHANCER_KEY_INCREASE) {
              increaseOptions.push({
                key: extraStatKey,
                smallestIncrement,
                currentStat,
                maxStat,
                maxIncrease: math.round(maxStat - currentStat, 1)
              });
            }
          }
        });

        // Randomly choose an increment
        const shuffledIncreaseOptions = _.shuffle(increaseOptions);
        // Keep track of total quality increase
        let currentQualityIncrease = 0;

        shuffledIncreaseOptions.forEach((option) => {
          // Can we apply this upgrade in the least?
          let upgradePercentLeft = 100 - originalQuality - currentQualityIncrease;
          if (upgradePercentLeft > (ENHANCER_KEY_INCREASE - currentQualityIncrease)) {
            upgradePercentLeft = ENHANCER_KEY_INCREASE - currentQualityIncrease;
          }

          if (option.smallestIncrement <= upgradePercentLeft) {
            // Floor times left to add
            let timesToAdd = (Math.floor(upgradePercentLeft / option.smallestIncrement) / 10);
            if (timesToAdd > option.maxIncrease) {
              timesToAdd = option.maxIncrease;
            }

            // Keep track of current quality increases
            // * 10 as smallest increment is 0.1
            currentQualityIncrease += (timesToAdd * option.smallestIncrement * 10);

            // Handle edge case of this extra stat not existing
            if (!targetItemClone.extraStats[option.key]) {
              targetItemClone.extraStats[option.key] = 0;
            }

            // Each add is 0.1 stat
            targetItemClone.extraStats[option.key] += timesToAdd;
          }
        });

        if (currentQualityIncrease > 0) {
          // Recompute quality
          targetItemClone.quality = 0;
          extraStatKeys.forEach((extraStatKey) => {
            const maxValue = targetItemConstants.extraStats[extraStatKey];
            const currentValue = targetItemClone.extraStats[extraStatKey] || 0;
            targetItemClone.quality += ((currentValue / maxValue) * 100);
          });

          targetItemClone.quality = Math.round(targetItemClone.quality / extraStatKeys.length);

          // Remove the key
          if (baseItem.amount === 1) {
            Items.remove({
              owner: Meteor.userId(),
              _id: baseItem._id
            });
          } else {
            Items.update({
              owner: Meteor.userId(),
              _id: baseItem._id
            }, {
              $inc: {
                amount: -1
              }
            });
          }

          // Update the stats of the item
          Items.update({
            owner: Meteor.userId(),
            _id: targetItem._id
          }, {
            $set: {
              extraStats: targetItemClone.extraStats,
              quality: targetItemClone.quality,
              enhanced: true
            }
          });
        } else {
          throw new Meteor.Error("invalid-target", 'Invalid target item');
        }
      } else {
        throw new Meteor.Error("invalid-target", 'Invalid target item');
      }
    } else if (baseItemConstants.isCraftingScroll) {
      // Learn the craft is we don't already have it
      const crafting = Crafting.findOne({
        owner: Meteor.userId()
      });

      if (!crafting.learntCrafts) {
        crafting.learntCrafts = {};
      }

      if (!crafting.learntCrafts[baseItemConstants.teaches]) {
        crafting.learntCrafts[baseItemConstants.teaches] = true;

        const updatedCount = Crafting.update({
          _id: crafting._id,
          currentlyCrafting: crafting.currentlyCrafting
        }, {
          $set: {
            learntCrafts: crafting.learntCrafts
          }
        });

        if (updatedCount >= 1) {
          consumeItem(baseItem, 1);
        }
      }
    }

    // To Do: Make this more generic
    // If there is a valid behaviour, execute it

    // Done
  },

  'items.eat'(_id, itemId) {

    if (Meteor.user().logEvents) {
      Events.insert({
        owner: this.userId,
        event: 'items.eat',
        date: new Date(),
        data: { itemId }
      }, () => {})
    }

    // Check we have the nom
    const targetItem = Items.findOne({ _id, itemId });
    if (!targetItem || targetItem.amount < 1) {
      return;
    }

    // Check this is a nom
    const itemConstants = ITEMS[itemId];
    if (itemConstants.category !== 'food') {
      return;
    }

    // Fetch users combat
    const currentCombat = Combat.findOne({ owner: Meteor.userId() });

    // If there already consuming food, return
    if (currentCombat.buffs.length > 0) {
      throw new Meteor.Error("already-eating", 'Your already eating food');
    }

    // Remove the nom
    consumeItem(targetItem, 1);

    // Apply nom specific properties
    const buffs = JSON.parse(JSON.stringify(itemConstants.buffs));

    // Builds up the buffs, we store basic info and persistent info in the data
    // All other info such as events can be loaded using the buff.id when required
    buffs.forEach((buff) => {
      // Store constants
      buff.constants = BUFFS[buff.id];

      // Save things we actually want to store in the data property
      buff.data = Object.assign({
        name: buff.constants.name,
        icon: buff.constants.icon,
        duplicateTag: buff.constants.duplicateTag
      }, buff.constants.data);

      buff.data.description = buff.constants.description({ buff: buff, level: 1 });
    });

    // Buffs can do things when applied, will collect them in the form of combatEvents
    buffs.forEach((buff) => {
      if (buff.constants.events.onApply) {
        const buffTarget = currentCombat;
        const buffCaster = currentCombat;
        buff.constants.events.onApply({ buff, caster: buffCaster, target: buffTarget });

        // Remove existing buffs that match
        if (currentCombat.buffs && currentCombat.buffs.length > 0) {
          let existingBuff = _.findWhere(currentCombat.buffs, { id: buff.id });
          if (existingBuff) {
            existingBuff.data.duration = -1;
            existingBuff.constants = buff.constants;
            buff.constants.events.onTick({ secondsElapsed: 0, buff: existingBuff, target: currentCombat });
          }
        }
      }
    });

    // Unique buffs based on the duplicate tag
    // To Do: If something is removed here we need to call the onRemove event
    currentCombat.buffs.push(...buffs);
    currentCombat.buffs = _.uniq(currentCombat.buffs, function (item) {
      return item.duplicateTag
    });

    currentCombat.buffs.forEach((buff) => {
      buff.constants.events.onTick({
        secondsElapsed: 0,
        buff,
        target: currentCombat
      });
    });

    // Save buff and stat changes
    Combat.update(currentCombat._id, {
      $set: flattenObjectForMongo({
        stats: currentCombat.stats,
        buffs: currentCombat.buffs
      })
    });

  },

  'items.equip'(_id) {

    const item = Items.findOne({
      owner: Meteor.userId(),
      _id: _id
    });

    const itemConstants = ITEMS[item.itemId];
    // SECURITY ISSUE: We're trusting the user to send the correct itemId here, needs to be fix
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

    const affectedSlots = [itemSlot];
    // When equipped 2h weapon, clear offHand slot
    if (itemConstants.isTwoHanded) {
      affectedSlots.push('offHand');
    }

    // When equipping off hand, make sure mainHand isn't a 2h weapon
    if (itemConstants.slot === 'offHand') {
      const mainHandEquipped = Items.findOne({
        owner: Meteor.userId(),
        equipped: true,
        slot: 'mainHand'
      });

      if (mainHandEquipped) {
        if (ITEMS[mainHandEquipped.itemId].isTwoHanded) {
          affectedSlots.push('mainHand');
        }
      }
    }

    // Unequip existing items
    Items.update({
      owner: Meteor.userId(),
      equipped: true,
      slot: {
        $in: affectedSlots
      }
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
      updateCombatStats(Meteor.userId(), Meteor.user().username, itemSlot === 'neck');
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
      const itemsUpdated = Items.remove(currentItem._id);

      if (itemsUpdated <= 0) {
        return;
      }

      if (itemConstants.category === 'combat' && currentItem.equipped) {
        updateCombatStats(Meteor.userId(), Meteor.user().username);
      } else if (itemConstants.category === 'mining' && currentItem.equipped) {
        updateMiningStats();
      }
    } else {
      // Update item quantity
      const itemsUpdated = Items.update(currentItem._id, {
        $inc: { amount: (amountToSell * -1) }
      });

      if (itemsUpdated <= 0) {
        return;
      }
    }

    // Add gold to users account
    Users.update({
      _id: Meteor.userId()
    }, {
      $inc: { gold: amountToSell * itemConstants.sellPrice }
    });
  }
});

const MINUTE = 60 * 1000;

// DDPRateLimiter.addRule({ type: 'method', name: 'items.unequip' }, 20, 1 * MINUTE);
// DDPRateLimiter.addRule({ type: 'method', name: 'items.eat' }, 20, 1 * MINUTE);
// DDPRateLimiter.addRule({ type: 'method', name: 'items.equip' }, 20, 1 * MINUTE);
// DDPRateLimiter.addRule({ type: 'method', name: 'items.sellItem' }, 50, 1 * MINUTE);
// DDPRateLimiter.addRule({ type: 'subscription', name: 'items' }, 1000, 5 * MINUTE);

Meteor.publish('items', function() {

  //Transform function
  var transform = function(doc) {
    const itemConstants = ITEMS[doc.itemId];
    if (!itemConstants) {
      return;
    }

    doc.icon = itemConstants.icon;
    doc.name = itemConstants.name;
    doc.isTwoHanded = itemConstants.isTwoHanded;
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
    }

    if (itemConstants.enchantments) {
      doc.enchantments = [];
      itemConstants.enchantments.forEach((buffId) => {
        if (BUFFS[buffId]) {
          doc.enchantments.push(BUFFS[buffId].description());
        }
      });
    }

    if (itemConstants.tier) {
      doc.tier = itemConstants.tier;
    }

    if (itemConstants.category === 'seed') {
      doc.plantingDetails = FARMING.plants[itemConstants.produces];
    }

    if (_.isFunction(itemConstants.description)) {
      doc.description = itemConstants.description();
    }

    if (itemConstants.shiftActionData) {
      doc.shiftActionData = itemConstants.shiftActionData;
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
