import { Meteor } from 'meteor/meteor';
import { Items } from '/imports/api/items/items';
import { Users } from '/imports/api/users/users';
import { Skills } from '/imports/api/skills/skills';
import { Combat } from '/imports/api/combat/combat';
import { Crafting } from '/imports/api/crafting/crafting';
import { Chats } from 'meteor/cesarve:simple-chat/collections';
import { Events } from '/imports/api/events/events';

import { addXp } from '/server/api/skills/skills.js';
import { ITEMS } from '/imports/constants/items/index.js';
import { FARMING } from '/imports/constants/farming/index.js';
import { BUFFS } from '/imports/constants/buffs/index.js';
import { COMBAT_CRAFTS } from '/imports/constants/combat/crafts.js';
import { updateCombatStats } from '/server/api/combat/combat.js';
import { updateMiningStats } from '/server/api/mining/mining.js';
import { flattenObjectForMongo } from '/server/utils';
import { CInt } from '/imports/utils';
import { sendUserChatMessage } from '/imports/chatUtils.js';
import { updateUserActivity } from '/imports/api/users/users.js';

import Numeral from 'numeral';

import _ from 'underscore';
import lodash from 'lodash';

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
    console.log(`Failed - ${itemId}`);
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
          extraStats[statName] = extra /* math.round(extra, 1) */ ;
          
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
      const updatedCount = Items.update({
        owner,
        itemId
      }, {
        $inc: { amount: amount }
      });

      if (!updatedCount) {
        Items.insert({
          itemId,
          amount,
          owner,
          category: itemConstants.category,
          equipped: false
        });
      }
    }
  } else {
    newItemsList.forEach((newItem) => {
      // Insert
      Items.insert(newItem);
    });
  }
};

export const addGold = function( userId, amount ) {
  const userDoc = Users.findOne(userId);

  if (!userDoc) {
    return false;
  }
  
  Users.update(userId, {
    $set: { gold: (userDoc.gold + amount) }
  });
  
  return true;
};

export const addRealGems = function (amount, userId) {
  // Ensure amount is valid
  amount = CInt(amount);
  if (amount < 0 || amount > 1000000) {
    return;
  }

  // Ensure user already has gems count (non-optional in schema, so should always be okay)
  Users.update({
    _id: userId,
    gems: {
      $exists: true
    }
  }, {
    $inc: {
      gems: amount
    }
  });
};

export const addFakeGems = function (amount, userId) {
  // Ensure amount is valid
  amount = CInt(amount);
  if (amount < 0 || amount > 1000000) {
    return;
  }

  // Ensure user already has fakeGems count (non-optional in schema, so should always be okay)
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
};

export const hasGems = function (count, userObject) {
  if (!userObject) {
    return false;
  }
  
  const totalGems = CInt(userObject.gems) + CInt(userObject.fakeGems);

  return totalGems >= count;
};

export const consumeGems = function (count, userObject) {
  let fakeConsumed = 0;
  let realConsumed = 0;

  if (!userObject) {
    return false;
  }
  
  let fakeGems = CInt(userObject.fakeGems);
  let realGems = CInt(userObject.gems);
  
  if (fakeGems + realGems < count) {
    return false;
  }

  // Remove the fake gems first
  if (fakeGems >= count) {
    fakeConsumed = count;
  } else {
    fakeConsumed = fakeGems;
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
};

export const consumeOnlyRealGems = function (count, userObject) {
  let realConsumed = 0;

  if (!userObject) {
    return false;
  }
  
  let realGems = CInt(userObject.gems);
  
  if (realGems < count) {
    return false;
  }

  Users.update(userObject._id, {
    $inc: {
      gems: CInt(count) * -1
    }
  });

  return true;
};

export const consumeItem = function (itemObject, amount) {
  // Use up item
  if (itemObject.amount === amount) {
    Events.insert({
      owner: itemObject.owner,
      event: 'items.consumeItem',
      date: new Date(),
      data: { itemId: itemObject.itemId, id: itemObject._id, owner: itemObject.owner }
    }, () => {});
    Items.remove(itemObject._id);
  } else {
    Items.update(itemObject._id, {
      $inc: { amount: (-1 * amount) }
    });
  }
};

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
      updateMiningStats(Meteor.userId(), itemSlot);
    }

    updateUserActivity({userId: Meteor.userId()});
  },

  'items.hide'( baseItemId) {
    //    
    const baseItem = Items.findOne({
      owner: Meteor.userId(),
      _id: baseItemId
    });

    if (!baseItem || baseItem.amount <= 0) {
      return;
    }

    Items.update({
      owner: Meteor.userId(),
      _id: baseItem._id
    }, {
      $set: {
        hidden: !baseItem.hidden
      }
    });

    updateUserActivity({userId: Meteor.userId()});
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


    if (baseItem.category === "magic_book") {
      UseMagicBook(baseItem, baseItemConstants, targetItem, targetItemConstants);
    }
    
    if (baseItem.category === "item_box") {
      UseItemBox(baseItem, baseItemConstants, targetItem, targetItemConstants);
    }

    if (baseItem.itemId === "jade") {
      UseJade(baseItem, baseItemConstants, targetItem, targetItemConstants);
    }

    // noinspection SpellCheckingInspection
    if (baseItem.itemId === "lapislazuli") {
      UseLapislazuli(baseItem, baseItemConstants, targetItem, targetItemConstants);
    }

    if (baseItem.itemId === "sapphire") {
      UseSapphire(baseItem, baseItemConstants, targetItem, targetItemConstants);
    }

    if (baseItem.itemId === "emerald") {
      UseEmerald(baseItem, baseItemConstants, targetItem, targetItemConstants);
    }

    if (baseItem.itemId === "ruby") {
      UseRuby(baseItem, baseItemConstants, targetItem, targetItemConstants);
    }

    if (baseItem.itemId === "tanzanite") {
      UseTanzanite(baseItem, baseItemConstants, targetItem, targetItemConstants);
    }

    if (baseItem.itemId === "fireopal") {
      UseFireOpal(baseItem, baseItemConstants, targetItem, targetItemConstants);
    }

    //
    if (baseItem.category === 'enchantment') {
      if (baseItem.itemId === "enchantment_nullify") {
        RemoveEnchantment(baseItem, baseItemConstants, targetItem, targetItemConstants);
      } else {
        UseEnchantment(baseItem, baseItemConstants, targetItem, targetItemConstants);
      }
    }


    // Check what the behaviour is for the baseItem, targetting that targetItem
    if (baseItem.itemId === 'enhancer_key') {
      const ENHANCER_KEY_INCREASE = 15;

      if (IsJewelAmulet(targetItem)) {
        if ( (
            targetItem.extraStats
            && targetItem.extraStats.level
            && targetItem.extraStats.level >= 9 // Amulet Upgrade Limit
          ) || targetItem.enhanced
        ) {
          throw new Meteor.Error("invalid-target", 'Invalid target item');
        } else {
          UseKeyOnAmulet(baseItem, baseItemConstants, targetItem, targetItemConstants);
          return;
        }
      }

      if (targetItemConstants.extraStats && targetItem.quality < 100 && !targetItem.enhanced) {
      

        // Get the current quality
        const originalQuality = targetItem.quality;
        const targetItemClone = lodash.cloneDeep(targetItem);

        // Mutate the targetItems stats until we get to target quality
        const increaseOptions = [];
        const extraStatKeys = Object.keys(targetItemConstants.extraStats);
        extraStatKeys.forEach((extraStatKey) => {
          const maxStat = targetItemConstants.extraStats[extraStatKey];
          const currentStat = targetItem.extraStats[extraStatKey];

          if (currentStat !== maxStat) {
            // Stat percentage
            const statPercent = (currentStat / maxStat) * 100;
            // Smallest increment
            // Divide by 100, as smallest increment of stat is 0.01
            
            let smallestIncrement = (((1 / maxStat) * 100) / extraStatKeys.length) / 100;

            if (smallestIncrement <= ENHANCER_KEY_INCREASE) {
              increaseOptions.push({
                key: extraStatKey,
                smallestIncrement,
                currentStat,
                maxStat,
                maxIncrease: maxStat - currentStat /* math.round(maxStat - currentStat, 1) */
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
            let timesToAdd = (Math.floor(upgradePercentLeft / option.smallestIncrement) / 100);
            if (timesToAdd > option.maxIncrease) {
              timesToAdd = option.maxIncrease;
            }

            // Keep track of current quality increases
            // * 10 as smallest increment is 0.01 (or 0.0001)
            currentQualityIncrease += (timesToAdd * option.smallestIncrement * 100);

            // Handle edge case of this extra stat not existing
            if (!targetItemClone.extraStats[option.key]) {
              targetItemClone.extraStats[option.key] = 0;
            }

            // Each add is 0.01 stat (or 0.0001)
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
            Events.insert({
              owner: Meteor.userId(),
              event: 'items.consumeItem',
              date: new Date(),
              data: { itemId: baseItem.itemId, id: baseItem._id, baseItem: baseItem.owner }
            }, () => {});
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
      // Learn the craft if we don't already have it
      const crafting = Crafting.findOne({
        owner: Meteor.userId()
      });

      if (!crafting.learntCrafts) {
        crafting.learntCrafts = {};
      }

      if (!crafting.expiringCrafts) {
        crafting.expiringCrafts = {};
      }

      if (!crafting.learntCrafts[baseItemConstants.teaches]) {
        crafting.learntCrafts[baseItemConstants.teaches] = true;
        if (baseItemConstants.teachesDuration) {
          crafting.expiringCrafts[baseItemConstants.teaches] = moment().add(baseItemConstants.teachesDuration, 'days').toDate();
        }

        const updatedCount = Crafting.update({
          _id: crafting._id,
          currentlyCrafting: crafting.currentlyCrafting
        }, {
          $set: {
            learntCrafts: crafting.learntCrafts,
            expiringCrafts: crafting.expiringCrafts
          }
        });

        if (updatedCount >= 1) {
          consumeItem(baseItem, 1);
        }
      }
    }

    updateUserActivity({userId: Meteor.userId()});
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
      throw new Meteor.Error("already-eating", 'You\'re already eating food');
    }

    // Remove the nom
    consumeItem(targetItem, 1);

    // Apply nom specific properties
    const buffs = lodash.cloneDeep(itemConstants.buffs);

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

      buff.duration = buff.constants.data.duration;
      buff.data.description = buff.constants.description({ buff: buff, level: 1 });
    });

    // Buffs can do things when applied, will collect them in the form of combatEvents
    buffs.forEach((buff) => {
      if (buff.constants.events.onApply) {
        const buffTarget = currentCombat;
        const buffCaster = currentCombat;
        if (!buff.data.didApply) {
          buff.constants.events.onApply({ buff, caster: buffCaster, target: buffTarget });
          buff.data.didApply = true;
        }

        // Remove existing buffs that match
        if (currentCombat.buffs && currentCombat.buffs.length > 0) {
          let existingBuff = _.findWhere(currentCombat.buffs, { id: buff.id });
          if (existingBuff && !existingBuff.allowDuplicates && !buff.data.allowDuplicates) {
            existingBuff.duration = -1;
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
        buffs: currentCombat.buffs,
        lastGameUpdated: new Date()
      })
    });

    updateUserActivity({userId: Meteor.userId()});
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
          requirementString = `You must have at least level ${requirement.level} ${requirement.name} to equip your ${itemConstants.name}.`;
        } else if (mySkill.level < requirement.level) {
          hasEquipRequirements = false;
          requirementString = `You must have at least level ${requirement.level} ${requirement.name} to equip your ${itemConstants.name}.`;
        }
      });

      if (!hasEquipRequirements) {
        throw new Meteor.Error("equip-requirement", requirementString);
      }
    }

    const affectedSlots = [itemSlot];
    // When equipped 2h weapon, clear offHand slot
    if (itemConstants.isTwoHanded) {
      // UNLESS this 2h mainHand is a bow and offHand slot is a quiver
      if (itemConstants.weaponType === 'bow') {
        const offHandEquipped = Items.findOne({
          owner: Meteor.userId(),
          equipped: true,
          slot: 'offHand'
        });
        if (offHandEquipped) {
          if (ITEMS[offHandEquipped.itemId].weaponType !== 'quiver') {
            // offHand slot is not a quiver and this mainHand is a bow, unequip the offHand slot
            affectedSlots.push('offHand');
          } else {
            // offHand slot is a quiver and this mainHand is a bow, no logic
          }
        } else {
          // no offHand slot equipped, no logic
        }
      } else {
        // this mainHand is not a bow, blindly unequip anything in offHand slot
        affectedSlots.push('offHand');
      }
    } else if (itemConstants.isWeapon) {
      // When equipping a 1h (that is obviously NOT a bow), unequip any quivers
	
      const offHandEquipped = Items.findOne({
        owner: Meteor.userId(),
        equipped: true,
        slot: 'offHand'
      });
	
      if (offHandEquipped) {
        if (ITEMS[offHandEquipped.itemId].weaponType === 'quiver') {
          // offHand slot is a quiver and this mainHand is not a bow, unequip the offHand slot
          affectedSlots.push('offHand');
        } else {
          // offHand slot is not a quiver and this mainHand is not a bow, no logic
        }
      } else {
        // no offHand slot equipped, no logic
      }
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
          // UNLESS this offHand is a quiver and our mainHand is a bow
          if (itemConstants.weaponType === 'quiver') {
            if (ITEMS[mainHandEquipped.itemId].weaponType !== 'bow') {
              // mainHand slot is not a bow and this offHand is a quiver, unequip the 2H mainHand slot
              affectedSlots.push('mainHand');
            } else {
              // mainHand slot is a bow and this offHand is a quiver, no logic
            }
          } else {
            // this offHand is not a quiver, unequip the 2H mainHand slot
            affectedSlots.push('mainHand');
          }
        } else {
          // When equipping an offhand when the current offhand is not 2h, unequip the 1H mainHand slot if we're equipping a quiver
          if (itemConstants.weaponType === 'quiver') {
            // Only unequip the mainHand slot if we're equipping a quiver
            affectedSlots.push('mainHand');
          }
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
      updateMiningStats(Meteor.userId(), itemSlot);
    }

    updateUserActivity({userId: Meteor.userId()});
  },

  'items.sellItem'(_id, itemId, amount) {
    if (amount <= 0) {
      return;
    }

    const currentItem = Items.findOne({ _id, owner: Meteor.userId(), itemId: itemId });

    if (!currentItem) {
      return;
    }

    const itemConstants = ITEMS[currentItem.itemId];
    let amountToSell = amount;

    if (amountToSell >= currentItem.amount) {
      // Force amount to sell to actual item count;
      amountToSell = currentItem.amount;
      // Remove item
      const itemsUpdated = Items.remove(currentItem._id);
      Events.insert({
        owner: Meteor.userId(),
        event: 'items.sell',
        date: new Date(),
        data: { itemId: currentItem.itemId, id: currentItem._id, baseItem: currentItem.owner, quantity: amountToSell, goldGained: amountToSell * itemConstants.sellPrice }
      }, () => {});
      if (itemsUpdated <= 0) {
        return;
      }

      if (itemConstants.category === 'combat' && currentItem.equipped) {
        updateCombatStats(Meteor.userId(), Meteor.user().username);
      } else if (itemConstants.category === 'mining' && currentItem.equipped) {
        updateMiningStats(Meteor.userId(), currentItem.slot);
      }
    } else {
      // Update item quantity
      const itemsUpdated = Items.update(currentItem._id, {
        $inc: { amount: (amountToSell * -1) }
      });
      Events.insert({
        owner: Meteor.userId(),
        event: 'items.sell',
        date: new Date(),
        data: { itemId: currentItem.itemId, id: currentItem._id, baseItem: currentItem.owner, quantity: amountToSell, goldGained: amountToSell * itemConstants.sellPrice }
      }, () => {});
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

    updateUserActivity({userId: Meteor.userId()});
  }
});

const MINUTE = 60 * 1000;

// DDPRateLimiter.addRule({ type: 'method', name: 'items.unequip' }, 20, 1 * MINUTE);
// DDPRateLimiter.addRule({ type: 'method', name: 'items.eat' }, 20, 1 * MINUTE);
// DDPRateLimiter.addRule({ type: 'method', name: 'items.equip' }, 20, 1 * MINUTE);
// DDPRateLimiter.addRule({ type: 'method', name: 'items.sellItem' }, 50, 1 * MINUTE);
// DDPRateLimiter.addRule({ type: 'subscription', name: 'items' }, 1000, 5 * MINUTE);

Meteor.publish('items', function() {

  // Transform function
  // TODO: We can move items to local dev, and avoid having to do all this extra processing here
  // Just send raw item to client, then they can do the transforms with the constants locally
  const transform = function(doc) {
    const itemConstants = ITEMS[doc.itemId];
    if (!itemConstants) {
      return;
    }

    // This is gonna be hard to undo
    doc.name = itemConstants.name;
    // So is this :(
    doc.slot = itemConstants.slot;

    return doc;
  };

  const self = this;

  const observer = Items.find({
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


export const UseMagicBook = function (baseItem, baseItemConstants, targetItem, targetItemConstants) {

  // Validation
  if (baseItem.category !== 'magic_book') {
    return;
  }

  if (!baseItemConstants.magicXp) {
    return;
  }


  // Logic 
  addXp('magic', baseItemConstants.magicXp);


  // Post Logic & Cleanup
  ConsumeItem(baseItem);
};

export const UseItemBox = function (baseItem, baseItemConstants, targetItem, targetItemConstants) {

  // Validation
  if (baseItem.category !== 'item_box') {
    return;
  }

  if (!baseItemConstants.contentsList) {
    return;
  }


  // Logic 
  const chosenItem = _.sample(baseItemConstants.contentsList);
  
  if (chosenItem.indexOf("gold:") === 0) {

    const amountInBox = CInt(chosenItem.substring(5));

    sendUserChatMessage({ userId: Meteor.userId(), message: `Inside the ${baseItemConstants.name}, you discovered:  ${Numeral(amountInBox).format('0,0')} gold` });

    Users.update({ _id: Meteor.userId() }, { $inc: { gold: amountInBox } });

  } else if (chosenItem.indexOf("gems:") === 0) {

    const amountInBox = CInt(chosenItem.substring(5));

    sendUserChatMessage({ userId: Meteor.userId(), message: `Inside the ${baseItemConstants.name}, you discovered:  ${Numeral(amountInBox).format('0,0')} gems` });
    
    Users.update({ _id: Meteor.userId() }, { $inc: { fakeGems: amountInBox } });
    
  } else {
    
    const chosenItemConstants = ITEMS[chosenItem];  

    sendUserChatMessage({ userId: Meteor.userId(), message: `Inside the ${baseItemConstants.name}, you discovered:  ${chosenItemConstants.name}` });
    
    addItem(chosenItem, 1, Meteor.userId());
    
  }

  // Post Logic & Cleanup
  ConsumeItem(baseItem);
};

export const UseJade = function (baseItem, baseItemConstants, targetItem, targetItemConstants) {

  // Validation
  if (targetItem.itemId !== "jade_amulet") {
    throw new Meteor.Error("invalid-target", 'Jade can only be used on a jade amulet.');
    return;
  }

  if (!targetItem.extraStats) {
    targetItem.extraStats = {};
  }

  if (!targetItem.extraStats.level) {
    targetItem.extraStats.level = 0;
  }

  // Amulet can be upgraded 9 times.
  if (targetItem.extraStats.level >= 9) {
    throw new Meteor.Error("invalid-target", 'Amulet has reached maximum level.');
    return;
  }


  // Logic 
  targetItem.extraStats.level += 1;

  const level = (targetItem.extraStats.level <= 5 ? targetItem.extraStats.level : 4 + Math.sqrt((targetItem.extraStats.level - 5) * 2.5));
  const originalAccuracy = targetItemConstants.stats.accuracy;

  const accuracyRate = 1.25;

  const accuracy = Math.round(originalAccuracy * Math.pow(accuracyRate, level));

  // Subtract Original Amount to determine Extra
  targetItem.extraStats.accuracy = accuracy - originalAccuracy;


  // Post Logic & Cleanup
  Items.update({
    owner: Meteor.userId(),
    _id: targetItem._id
  }, {
    $set: {
      extraStats: targetItem.extraStats,
    }
  });

  ConsumeItem(baseItem);
};

export const UseLapislazuli = function (baseItem, baseItemConstants, targetItem, targetItemConstants) {

  // Validation
  if (targetItem.itemId !== "lapislazuli_amulet") {
    throw new Meteor.Error("invalid-target", 'Lapis lazuli can only be used on a lapis lazuli amulet.');
    return;
  }

  if (!targetItem.extraStats) {
    targetItem.extraStats = {};
  }

  if (!targetItem.extraStats.level) {
    targetItem.extraStats.level = 0;
  }

  // Amulet can be upgraded 9 times.
  if (targetItem.extraStats.level >= 9) {
    throw new Meteor.Error("invalid-target", 'Amulet has reached maximum level.');
    return;
  }


  // Logic 
  targetItem.extraStats.level += 1;

  const level = (targetItem.extraStats.level <= 5 ? targetItem.extraStats.level : 4 + Math.sqrt((targetItem.extraStats.level - 5) * 2.5));
  const originalHealthMax = targetItemConstants.stats.healthMax;
  const originalDefense = targetItemConstants.stats.defense;

  const healthMaxRate = 1.10;
  const defenseMaxRate = 1.35;

  const healthMax = Math.round(originalHealthMax * Math.pow(healthMaxRate, level));
  const defense = Math.round(originalDefense * Math.pow(defenseMaxRate, level));

  // Subtract Original Amount to determine Extra
  targetItem.extraStats.healthMax = healthMax - originalHealthMax;
  targetItem.extraStats.defense = defense - originalDefense;

  // Post Logic & Cleanup
  Items.update({
    owner: Meteor.userId(),
    _id: targetItem._id
  }, {
    $set: {
      extraStats: targetItem.extraStats,
    }
  });

  ConsumeItem(baseItem);
};

export const UseSapphire = function (baseItem, baseItemConstants, targetItem, targetItemConstants) {

  // Validation
  if (targetItem.itemId !== "sapphire_amulet") {
    throw new Meteor.Error("invalid-target", 'Sapphire can only be used on a sapphire amulet.');
    return;
  }

  if (!targetItem.extraStats) {
    targetItem.extraStats = {};
  }

  if (!targetItem.extraStats.level) {
    targetItem.extraStats.level = 0;
  }

  // Amulet can be upgraded 9 times.
  if (targetItem.extraStats.level >= 9) {
    throw new Meteor.Error("invalid-target", 'Amulet has reached maximum level.');
    return;
  }


  // Logic 
  targetItem.extraStats.level += 1;

  const level = (targetItem.extraStats.level <= 5 ? targetItem.extraStats.level : 4 + Math.sqrt((targetItem.extraStats.level - 5) * 2.5));
  const originalMagicPower = targetItemConstants.stats.magicPower;

  const magicPowerRate = 1.20;

  const magicPower = Math.round(originalMagicPower * Math.pow(magicPowerRate, level));

  // Subtract Original Amount to determine Extra
  targetItem.extraStats.magicPower = magicPower - originalMagicPower;

  // Post Logic & Cleanup
  Items.update({
    owner: Meteor.userId(),
    _id: targetItem._id
  }, {
    $set: {
      extraStats: targetItem.extraStats,
    }
  });

  ConsumeItem(baseItem);
};

export const UseEmerald = function (baseItem, baseItemConstants, targetItem, targetItemConstants) {

  // Validation
  if (targetItem.itemId !== "emerald_amulet") {
    throw new Meteor.Error("invalid-target", 'Emerald can only be used on an emerald amulet.');
    return;
  }

  if (!targetItem.extraStats) {
    targetItem.extraStats = {};
  }

  if (!targetItem.extraStats.level) {
    targetItem.extraStats.level = 0;
  }

  // Amulet can be upgraded 9 times.
  if (targetItem.extraStats.level >= 9) {
    throw new Meteor.Error("invalid-target", 'Amulet has reached maximum level.');
    return;
  }


  // Logic 
  targetItem.extraStats.level += 1;

  const level = (targetItem.extraStats.level <= 5 ? targetItem.extraStats.level : 4 + Math.sqrt((targetItem.extraStats.level - 5) * 2.5));
  const originalHealthMax = targetItemConstants.stats.healthMax;

  const healthMaxRate = 1.15;

  const healthMax = Math.round(originalHealthMax * Math.pow(healthMaxRate, level));

  // Subtract Original Amount to determine Extra
  targetItem.extraStats.healthMax = healthMax - originalHealthMax;

  // Post Logic & Cleanup
  Items.update({
    owner: Meteor.userId(),
    _id: targetItem._id
  }, {
    $set: {
      extraStats: targetItem.extraStats,
    }
  });

  ConsumeItem(baseItem);
};

export const UseRuby = function (baseItem, baseItemConstants, targetItem, targetItemConstants) {

  // Validation
  if (targetItem.itemId !== "ruby_amulet") {
    throw new Meteor.Error("invalid-target", 'Ruby can only be used on a ruby amulet.');
    return;
  }

  if (!targetItem.extraStats) {
    targetItem.extraStats = {};
  }

  if (!targetItem.extraStats.level) {
    targetItem.extraStats.level = 0;
  }

  // Amulet can be upgraded 9 times.
  if (targetItem.extraStats.level >= 9) {
    throw new Meteor.Error("invalid-target", 'Amulet has reached maximum level.');
    return;
  }


  // Logic 
  targetItem.extraStats.level += 1;

  const level = (targetItem.extraStats.level <= 5 ? targetItem.extraStats.level : 4 + Math.sqrt((targetItem.extraStats.level - 5) * 2.5));
  const originalAttack = targetItemConstants.stats.attack;
  const originalAttackMax = targetItemConstants.stats.attackMax;

  const attackRate = 1.225;
  const attackMaxRate = 1.175;

  const attack = Math.round(originalAttack * Math.pow(attackRate, level));
  const attackMax = Math.round(originalAttackMax * Math.pow(attackMaxRate,level));

  // Subtract Original Amount to determine Extra
  targetItem.extraStats.attack = attack - originalAttack;
  targetItem.extraStats.attackMax = attackMax - originalAttackMax;


  // Post Logic & Cleanup
  Items.update({
    owner: Meteor.userId(),
    _id: targetItem._id
  }, {
    $set: {
      extraStats: targetItem.extraStats,
    }
  });

  ConsumeItem(baseItem);
};

export const UseTanzanite = function (baseItem, baseItemConstants, targetItem, targetItemConstants) {

  // Validation
  if (targetItem.itemId !== "tanzanite_amulet") {
    throw new Meteor.Error("invalid-target", 'Tanzanite can only be used on a tanzanite amulet.');
    return;
  }

  if (!targetItem.extraStats) {
    targetItem.extraStats = {};
  }

  if (!targetItem.extraStats.level) {
    targetItem.extraStats.level = 0;
  }

  // Amulet can be upgraded 9 times.
  if (targetItem.extraStats.level >= 9) {
    throw new Meteor.Error("invalid-target", 'Amulet has reached maximum level.');
    return;
  }


  // Logic 
  targetItem.extraStats.level += 1;

  const level = (targetItem.extraStats.level <= 5 ? targetItem.extraStats.level : 4 + Math.sqrt((targetItem.extraStats.level - 5) * 2.5));
  const originalAttack = targetItemConstants.stats.attack;
  const originalAttackMax = targetItemConstants.stats.attackMax;
  const originalAccuracy = targetItemConstants.stats.accuracy;
  const originalDefense = targetItemConstants.stats.defense;
  const originalHealthMax  = targetItemConstants.stats.healthMax;
  const originalMagicPower = targetItemConstants.stats.magicPower;
  const originalMagicArmor = targetItemConstants.stats.magicArmor;

  const attackRate = 1.30;
  const attackMaxRate = 1.30;
  const accuracyRate = 1.30;
  const defenseRate = 1.30;
  const healthMaxRate = 1.20;
  const magicPowerRate = 1.50;
  const magicArmorRate = 1.30;

  const attack = Math.round(originalAttack * Math.pow(attackRate, level));
  const attackMax = Math.round(originalAttackMax * Math.pow(attackMaxRate, level));
  const accuracy = Math.round(originalAccuracy * Math.pow(accuracyRate, level));
  const defense = Math.round(originalDefense * Math.pow(defenseRate, level));
  const healthMax = Math.round(originalHealthMax * Math.pow(healthMaxRate, level));
  const magicPower = Math.round(originalMagicPower * Math.pow(magicPowerRate, level));
  const magicArmor = Math.round(originalMagicArmor * Math.pow(magicArmorRate, level));

  // Subtract Original Amount to determine Extra
  targetItem.extraStats.attack = attack - originalAttack;
  targetItem.extraStats.attackMax = attackMax - originalAttackMax;
  targetItem.extraStats.accuracy = accuracy - originalAccuracy;
  targetItem.extraStats.defense = defense - originalDefense;
  targetItem.extraStats.healthMax = healthMax - originalHealthMax;
  targetItem.extraStats.magicPower = magicPower - originalMagicPower;
  targetItem.extraStats.magicArmor = magicArmor - originalMagicArmor;

  // Post Logic & Cleanup
  Items.update({
    owner: Meteor.userId(),
    _id: targetItem._id
  }, {
    $set: {
      extraStats: targetItem.extraStats,
    }
  });

  ConsumeItem(baseItem);
};

export const UseFireOpal = function (baseItem, baseItemConstants, targetItem, targetItemConstants) {

  // Validation
  if (targetItem.itemId !== "fireopal_amulet") {
    throw new Meteor.Error("invalid-target", 'Fire opal can only be used on a fire opal amulet.');
    return;
  }

  if (!targetItem.extraStats) {
    targetItem.extraStats = {};
  }

  if (!targetItem.extraStats.level) {
    targetItem.extraStats.level = 0;
  }

  // Amulet can be upgraded 9 times.
  if (targetItem.extraStats.level >= 9) {
    throw new Meteor.Error("invalid-target", 'Amulet has reached maximum level.');
    return;
  }


  // Logic 
  targetItem.extraStats.level += 1;

  const level = (targetItem.extraStats.level <= 5 ? targetItem.extraStats.level : 4 + Math.sqrt((targetItem.extraStats.level - 5) * 2.5));
  const originalAttack = targetItemConstants.stats.attack;
  const originalAttackMax = targetItemConstants.stats.attackMax;
  const originalHealthMax = targetItemConstants.stats.healthMax;
  const originalMagicArmor = targetItemConstants.stats.magicArmor;

  const attackRate = 1.075;
  const attackRateMax = 1.150;
  const healthMaxRate = 1.125;
  const magicArmorRate = 1.075;

  const attack = Math.round(originalAttack * Math.pow(attackRate, level));
  const attackMax = Math.round(originalAttackMax * Math.pow(attackRateMax, level));
  const healthMax = Math.round(originalHealthMax * Math.pow(healthMaxRate, level));
  const magicArmor = Math.round(originalMagicArmor * Math.pow(magicArmorRate, level));

  // Subtract Original Amount to determine Extra
  targetItem.extraStats.attack = attack - originalAttack;
  targetItem.extraStats.attackMax = attackMax - originalAttackMax;
  targetItem.extraStats.healthMax = healthMax - originalHealthMax;
  targetItem.extraStats.magicArmor = magicArmor - originalMagicArmor;

  // Post Logic & Cleanup
  Items.update({
    owner: Meteor.userId(),
    _id: targetItem._id
  }, {
    $set: {
      extraStats: targetItem.extraStats,
    }
  });

  ConsumeItem(baseItem);
};


export const UseEnchantment = function (baseItem, baseItemConstants, targetItem, targetItemConstants) {

  if (targetItem.enchantmentId && targetItem.enchantmentId !== 'undefined') {
    console.log('Already enchanted.');
    throw new Meteor.Error("invalid-target", 'Item already enchanted');
  }

  if (!COMBAT_CRAFTS[targetItem.itemId] ) {
    if (targetItem.itemId.indexOf('_wizard') === -1 ) {
      console.log('Not a recipe');
      throw new Meteor.Error("invalid-target", 'Not a recipe.');
    }
  }

  if (!baseItemConstants.enchantSlot) {
    console.log('Enchant Slot not set');
    throw new Meteor.Error("invalid-target", 'Enchant Slot not set');
  }

  if (!targetItemConstants.slot) {
    console.log('Target item slot not defined');
    throw new Meteor.Error("invalid-target", 'Target item slot not defined.');
  }

  if (baseItemConstants.enchantSlot.indexOf(targetItemConstants.slot) === -1) {
    console.log('Enchantment slot doesn\'t match target slot');
    throw new Meteor.Error("invalid-target", 'Item is not crafted.');
  }

  Items.update({
    owner: Meteor.userId(),
    _id: targetItem._id
  }, {
    $set: {
     enchantmentId : baseItem.itemId,
     enchantmentDescription : baseItemConstants.description
    }
  });

  ConsumeItem(baseItem);
};

export const RemoveEnchantment = function (baseItem, baseItemConstants, targetItem, targetItemConstants) {

  if (!targetItem.enchantmentId) {
    throw new Meteor.Error("invalid-target", 'Item not enchanted');
  }

  if (targetItem.enchantmentId && targetItem.enchantmentId === false) {
    throw new Meteor.Error("invalid-target", 'Item not enchanted');
  }


  Items.update({
    owner: Meteor.userId(),
    _id: targetItem._id
  }, {
    $set: {
     enchantmentId : 'undefined',
     enchantmentDescription : 'undefined'
    }
  });

  ConsumeItem(baseItem);
};


export const ConsumeItem = function (baseItem) {

    // Remove the key
    if (baseItem.amount === 1) {
      Events.insert({
        owner: Meteor.userId(),
        event: 'items.consumeItem',
        date: new Date(),
        data: { itemId: baseItem.itemId, id: baseItem._id, baseItem: baseItem.owner }
      }, () => {});
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
};

export const IsJewelAmulet = function (targetItem) {

  return targetItem.itemId === "jade_amulet"
      || targetItem.itemId === "lapislazuli_amulet"
      || targetItem.itemId === "sapphire_amulet"
      || targetItem.itemId === "emerald_amulet"
      || targetItem.itemId === "ruby_amulet"
      || targetItem.itemId === "tanzanite_amulet"
      || targetItem.itemId === "fireopal_amulet";

};

export const UseKeyOnAmulet = function (baseItem, baseItemConstants, targetItem, targetItemConstants) {

  switch (targetItem.itemId) {

    case "jade_amulet":
      UseJade(baseItem, baseItemConstants, targetItem, targetItemConstants);
      break;

    case "lapislazuli_amulet":
      UseLapislazuli(baseItem, baseItemConstants, targetItem, targetItemConstants);
      break;

    case "sapphire_amulet":
      UseSapphire(baseItem, baseItemConstants, targetItem, targetItemConstants);
      break;

    case "emerald_amulet":
      UseEmerald(baseItem, baseItemConstants, targetItem, targetItemConstants);
      break;

    case "ruby_amulet":
      UseRuby(baseItem, baseItemConstants, targetItem, targetItemConstants);
      break;

    case "tanzanite_amulet":
      UseTanzanite(baseItem, baseItemConstants, targetItem, targetItemConstants);
      break;

    case "fireopal_amulet":
      UseFireOpal(baseItem, baseItemConstants, targetItem, targetItemConstants);
      break;

    default:
      //this shouldn't happen
      return;
  }

  // Update the stats of the item
  Items.update({
    owner: Meteor.userId(),
    _id: targetItem._id
  }, {
    $set: {
      enhanced: true
    }
  });
};
