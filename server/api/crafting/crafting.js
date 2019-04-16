import { Meteor } from 'meteor/meteor';
import { Crafting } from '/imports/api/crafting/crafting';
import { Users } from '/imports/api/users/users';
import { Skills } from '/imports/api/skills/skills';
import { Items } from '/imports/api/items/items';
import { Events } from '/imports/api/events/events';
import moment from 'moment';
import _ from 'underscore';
import lodash from 'lodash';

import { DONATORS_BENEFITS } from '/imports/constants/shop/index.js';
import { CRAFTING } from '/imports/constants/crafting/index.js';
import { ITEMS, ITEM_RARITIES } from '/imports/constants/items/index.js';
import { addItem } from '/server/api/items/items.js';
import { addXp } from '/server/api/skills/skills.js';
import { CInt } from '/imports/utils.js';
import { updateUserActivity } from '/imports/api/users/users.js';

// Take a list of requirements
// If met will return true and take items
// If not met, will return false and take no items
export const requirementsUtility = function (requirements, amountToCraft = 1) {

  const requiredSkillList = requirements.filter((requirement) => {
    return requirement.type === 'skill';
  }).map((skill) => {
    return skill.name;
  });

  const mySkills = Skills.find({
    owner: Meteor.userId(),
    type: {
      $in: requiredSkillList
    }
  }).fetch();

  const mySkillsMap = {};
  mySkills.forEach((mySkill) => {
    mySkillsMap[mySkill.type] = mySkill;
  });

  const requiredItemList = requirements.filter((requirement) => {
    return requirement.type === 'item';
  }).map((item) => {
    return item.itemId;
  });

  const myItems = Items.find({
    owner: Meteor.userId(),
    itemId: {
      $in: requiredItemList
    },
    equipped: false
  }, {
    sort: [
      ['quality', 'desc']
    ]
  }).fetch();

  const myUser = {
    gold: Meteor.user().gold
  };

  const myItemsMap = {};
  myItems.forEach((item) => {
    // If there is multiple versions of this item use the first one
    if (!myItemsMap[item.itemId]) {
      myItemsMap[item.itemId] = item;
    }
  });
  let canCraft = true;

  requirements.forEach((requirement) => {
    if (requirement.type === 'item') {
      const myItem = myItemsMap[requirement.itemId];
      if (requirement.consumes) {
        if (!myItem || myItem.amount < (requirement.amount * amountToCraft)) {
          canCraft = false;
        } else {
          myItem.amount -= (requirement.amount * amountToCraft);
          if (myItem.amount === 0) {
            myItem.deleteMe = true;
          }
        }
      } else {
        if (!myItem || myItem.amount < requirement.amount) {
          canCraft = false;
        }
      }
    } else if (requirement.type === 'gold') {
      if (myUser.gold < requirement.amount * amountToCraft) {
        canCraft = false;
      } else {
        if (requirement.consumes) {
          myUser.gold -= requirement.amount * amountToCraft;
          myUser.isDirty = true;
        }
      }
    } else if (requirement.type === 'skill') {
      const mySkill = mySkillsMap[requirement.name];
      if (mySkill.level < requirement.level) {
        canCraft = false;
      }
    }
  });

  if (!canCraft) {
    return false;
  }

  // Take resources
  myItems.forEach((item) => {
    if (item.deleteMe) {
      Items.remove(item._id);
      Events.insert({
        owner: this.userId,
        event: 'crafting.item.removal',
        date: new Date(),
        data: { itemId: item.itemId, id: item._id, owner: item.owner }
      }, () => {});
    } else {
      Items.update(item._id, {
        $set: { amount: item.amount }
      });
    }
  });

  // Take gold
  if (myUser.isDirty) {
    Users.update(Meteor.userId(), {
      $set: { gold: myUser.gold }
    });
  }

  return true;
};

const craftItem = function (recipeId, amountToCraft = 1) {
  const crafting = Crafting.findOne({ owner: Meteor.userId() });

  if (crafting && (crafting.currentlyCrafting === undefined || crafting.currentlyCrafting === null)) {
    Crafting.update(crafting._id, {
      $set: {
        currentlyCrafting: []
      }
    });
  }

  // Are we crafting at least one item
  if (amountToCraft <= 0) {
    throw new Meteor.Error("cant-craft", "Choose a positive quantity of items to craft.");
  }

  const maxConcurrentCrafts = CRAFTING.getMaxCrafts(crafting.craftingLevel);

  // Are we already crafting?
  if (crafting.currentlyCrafting && crafting.currentlyCrafting.length >= maxConcurrentCrafts) {
    throw new Meteor.Error("already-crafting", "Your crafting queue is full.");
  }

  // Is this a valid recipe?
  const recipeConstants = CRAFTING.recipes[recipeId];

  // If this is a hidden recipe, make sure we have access
  if (recipeConstants.isHidden) {
    if (!crafting.learntCrafts || !crafting.learntCrafts[recipeConstants.id]) {
      throw new Meteor.Error("not-found", "Invalid recipe.");
    }
  }

  if (!recipeConstants || recipeConstants.recipeFor !== 'crafting') {
    throw new Meteor.Error("cant-craft", "Recipe details for that crafting recipe couldn't be found.");
  }

  // Make sure amountToCraft doesn't exceed recipe limit
  if (amountToCraft > recipeConstants.maxToCraft) {
    throw new Meteor.Error("cant-craft", "Can't craft that many at once.");
  }

  // Do we have the requirements for this craft (items / levels / gold)
  // Note this method will take requirements if they are met
  if (!requirementsUtility(recipeConstants.required, amountToCraft)) {
    throw new Meteor.Error("cant-craft", "You don't know how to craft that, yet.");
  }

  let startDate = new Date();

  if (crafting.currentlyCrafting && crafting.currentlyCrafting.length > 0) {
    // Get latest crafting time and use that for next items crafting start time
    // This will make crafting sequential
    startDate = _.sortBy(crafting.currentlyCrafting, 'endDate').reverse()[0].endDate;
  }

  let timeToCraft = recipeConstants.timeToCraft * amountToCraft;

  const userDoc = Meteor.user();

  // Apply membership benefits
  if (userDoc.craftingUpgradeTo && moment().isBefore(userDoc.craftingUpgradeTo)) {
    timeToCraft *= (1 - (DONATORS_BENEFITS.craftingBonus / 100));
  }

  // Add to currently crafting...
  Crafting.update(crafting._id, {
    $push: {
      currentlyCrafting: {
        itemId: recipeConstants.produces,
        startDate,
        recipeId,
        amount: amountToCraft,
        endDate: moment(startDate).add(timeToCraft, 'seconds').toDate()
      }
    }
  });
};

const getReforgeData = function getReforgeData(_id) {
  const user = Meteor.user();
  if (!user) {
    return { isError: true, chance: -1, rarityData: undefined };
  }
      
  const craftingSkill = Skills.findOne({
    owner: Meteor.userId(),
    type: 'crafting'
  });

  const currentItem = Items.findOne({ _id, owner: Meteor.userId() });
  if (!currentItem) {
    return { isError: true, chance: -2, rarityData: undefined };
  }
  
  const recipesArray = Object.keys(CRAFTING.recipes).map((craftingKey) => {
    const recipeConstant = lodash.cloneDeep(CRAFTING.recipes[craftingKey]);
    const itemConstant = ITEMS[recipeConstant.produces];

    recipeConstant.icon = itemConstant.icon;
    recipeConstant.description = itemConstant.description;
    recipeConstant.isTwoHanded = itemConstant.isTwoHanded;

    if (itemConstant.stats) {
      recipeConstant.baseStats = itemConstant.stats;
      recipeConstant.extraStats = itemConstant.extraStats;
    }

    if (itemConstant.requiredEquip) {
      recipeConstant.requiredEquip = itemConstant.requiredEquip;
    }

    return recipeConstant;
  });
  
  let recipeData = undefined;
  recipesArray.forEach((thisRecipe) => {
    if (thisRecipe.produces === currentItem.itemId) {
      recipeData = thisRecipe;
    }
  });
  
  if (!currentItem.rarityId) {
    currentItem.rarityId = 'standard';
  }
  
  if (!recipeData) {
    return { isError: true, chance: -3, rarityData: undefined };
  }
  
  if (!ITEM_RARITIES[currentItem.rarityId]) {
    return { isError: true, chance: -4, rarityData: undefined };
  }
  
  const currentRarityData = ITEM_RARITIES[currentItem.rarityId];
  
  if (!currentRarityData.nextRarity) {
    return { isError: true, chance: -5, rarityData: currentRarityData.nextRarity };
  }
  
  const currentCraftingLevel = craftingSkill.level;
  
  if (craftingSkill.level < recipeData.requiredCraftingLevel) {
    return { isError: true, chance: -6, rarityData: currentRarityData.nextRarity, recipeData };
  }
  
  let chanceToSucceed = (currentRarityData.nextRarity.successChance + (currentCraftingLevel - recipeData.requiredCraftingLevel)) / 100.0;
  if (chanceToSucceed > 0.95) {
    chanceToSucceed = 0.95;
  }

  return { isError: false, chance: (chanceToSucceed <= 0.0) ? 0 : chanceToSucceed, rarityData: currentRarityData.nextRarity, recipeData };
};

Meteor.methods({
  'crafting.reforgeItem'(_id) {    
    const user = Meteor.user();
    if (!user){
      return false;
    }
    
    const currentItem = Items.findOne({ _id, owner: Meteor.userId() });
    if (!currentItem) {
      return false;
    }

    if (currentItem.category !== "combat") {
      throw new Meteor.Error("cant-reforge", "That item can't be reforged.");
    }

    if (currentItem.slot === "neck") {
      throw new Meteor.Error("cant-reforge", "That item can't be reforged.");
    }

    const reforgeData = getReforgeData(_id);

    if (reforgeData.isError) {
      if ((reforgeData.chance === -3) || (reforgeData.chance === -5)) {
        throw new Meteor.Error("cant-reforge", "That item can't be reforged.");
      }
      if (reforgeData.chance === -6) {
        throw new Meteor.Error("cant-reforge", "You don't have enough crafting skill to reforge this item.");
      }
      throw new Meteor.Error("cant-reforge", `Internal error during reforging: ${-reforgeData.chance}.`);
    }

    if (reforgeData.chance <= 0)     {
      throw new Meteor.Error("cant-reforge", "You have no chance to reforge that item.");
    }
    
    const crafting = Crafting.findOne({ owner: Meteor.userId() });
    
    if (crafting.currentlyReforging && crafting.currentlyReforging.itemId) {
      throw new Meteor.Error("cant-reforge", "You are already reforging something.");
    }
    
    if (!currentItem.rarityId) {
      currentItem.rarityId = 'standard';
    }
    
    const whatWereReforging = {
      itemId: currentItem.itemId,
      currentRarityId: currentItem.rarityId,
      itemData: JSON.stringify(currentItem),
      reforgeData: JSON.stringify(reforgeData),
      startDate: moment().toDate(),
      endDate: moment().add((reforgeData.recipeData.requiredCraftingLevel * 5) + 15, 'seconds').toDate()
    };
    
    const updatedCount = Crafting.update({
      _id: crafting._id
    }, {
      $set: {
        currentlyReforging: whatWereReforging,
        anythingReforging: true
      }
    });
    
    if (updatedCount < 1) {
      throw new Meteor.Error("cant-reforge", "Error setting reforging data.");
    }
    
    Items.remove(currentItem._id);    

    updateUserActivity({userId: Meteor.userId()});
  },
  
  'crafting.cancelReforge'() {
    const crafting = Crafting.findOne({
      owner: Meteor.userId()
    });
    
    if (!crafting || !crafting.currentlyReforging) {
      return false;
    }

    const originalItem = JSON.parse(crafting.currentlyReforging.itemData);
    
    Items.insert({
      itemId: originalItem.itemId,
      owner: originalItem.owner,
      category: originalItem.category,
      extraStats: originalItem.extraStats,
      quality: originalItem.quality,
      rarityId: originalItem.rarityId,
      enhanced: originalItem.enhanced
    });
      
    Crafting.update(crafting._id, {
      $unset: { currentlyReforging: "" },
      $set: { anythingReforging: false }
    });
  },
  
  'crafting.craftItem'(recipeId, amount) {
    if (Meteor.user().logEvents) {
      Events.insert({
        owner: this.userId,
        event: 'crafting.craftItem',
        date: new Date(),
        data: { recipeId, amount }
      }, () => {})
    }

    craftItem(recipeId, amount);

    updateUserActivity({userId: Meteor.userId()});
  },

  'crafting.fetchTiers'() {
    const craftingSkill = Skills.findOne({
      owner: Meteor.userId(),
      type: 'crafting'
    });

    const tiersArray = Object.keys(CRAFTING.tiers).map((tierKey) => {
      return CRAFTING.tiers[tierKey];
    }).filter((tier) => {
      return craftingSkill.level + 1 > tier.requiredCraftingLevel;
    });

    return tiersArray;
  },

  'crafting.fetchRecipes'() {
    const user = Meteor.user();
    if (!user){
      return false;
    }
    
    const craftingSkill = Skills.findOne({
      owner: Meteor.userId(),
      type: 'crafting'
    });

    const crafting = Crafting.findOne({
      owner: Meteor.userId()
    });

    const recipesArray = Object.keys(CRAFTING.recipes).map((craftingKey) => {
      const recipeConstant = lodash.cloneDeep(CRAFTING.recipes[craftingKey]);
      const itemConstant = ITEMS[recipeConstant.produces];

      recipeConstant.icon = itemConstant.icon;
      recipeConstant.description = itemConstant.description;
      recipeConstant.isTwoHanded = itemConstant.isTwoHanded;

      if (itemConstant.stats) {
        recipeConstant.baseStats = itemConstant.stats;
        recipeConstant.extraStats = itemConstant.extraStats;
      }

      if (itemConstant.requiredEquip) {
        recipeConstant.requiredEquip = itemConstant.requiredEquip;
      }

      return recipeConstant;
    }).filter((recipe) => {
      if (recipe.recipeFor !== 'crafting') {
        return false;
      }

      // If it's learnt show regardless of level
      if (recipe.isHidden) {
        if (!crafting) {
          return false;
        }
        return !(!crafting.learntCrafts || !crafting.learntCrafts[recipe.id]);
      }

      // Only show recipes we can craft, or recipes close to what we can craft ( 1 level away )
      return craftingSkill.level + 1 >= (recipe && recipe.requiredCraftingLevel ? recipe.requiredCraftingLevel : 0);
    });

    return _.sortBy(recipesArray, 'requiredCraftingLevel');
  },

  'crafting.cancelCraft'(targetEndDate) {
    const userDoc = Meteor.user();
    // If existing crafts done, remove from crafting table
    const crafting = Crafting.findOne({ owner: Meteor.userId() });

    if (!crafting || !crafting.currentlyCrafting) {
      return;
    }

    const newCrafting = lodash.cloneDeep(crafting.currentlyCrafting);

    // Target Crafting Item
    let targetCrafting;
    newCrafting.forEach((currentCrafting, index) => {
      if (moment(currentCrafting.endDate).diff(targetEndDate) === 0) {
        targetCrafting = currentCrafting;
      }
    });

    // Remove targetCrafting from the array
    const filteredCrafting = newCrafting.filter((crafting) => {
      return crafting !== targetCrafting;
    });

    // Reorder crafts and recalculate start / end date
    const sortedCrafts = _.sortBy(filteredCrafting, 'startDate');

    // Reconstruct start and end dates
    sortedCrafts.forEach((craft, index) => {
      if (moment().isBefore(craft.startDate)) {
        let craftDuration = craft.amount * CRAFTING.recipes[craft.recipeId].timeToCraft;
        if (userDoc.craftingUpgradeTo && moment().isBefore(userDoc.craftingUpgradeTo)) {
          craftDuration *= (1 - (DONATORS_BENEFITS.craftingBonus / 100));
        }
        if (index === 0) {
          craft.startDate = moment().toDate();
          craft.endDate = moment().add(craftDuration, 'seconds').toDate();
        } else {
          craft.startDate = moment(sortedCrafts[index - 1].endDate).toDate();
          craft.endDate = moment(craft.startDate).add(craftDuration, 'seconds').toDate();
        }
      }
    });

    // Remove targetCrafting from current crafting array
    const updatedCount = Crafting.update({
      _id: crafting._id,
      currentlyCrafting: crafting.currentlyCrafting
    }, {
      $set: {
        currentlyCrafting: sortedCrafts
      }
    });

    if (updatedCount === 0) {
      return;
    }

    // Refund resources for specified craft
    const recipeConstants = CRAFTING.recipes[targetCrafting.itemId];
    recipeConstants.required.forEach((required) => {
      if (required.consumes) {
        if (required.type === 'item') {
          addItem(required.itemId, required.amount * targetCrafting.amount);
        }
      }
    });

    updateUserActivity({userId: Meteor.userId()});
  },

  'crafting.updateGame'() {
    // If existing crafts done, remove from crafting table
    const crafting = Crafting.findOne({ owner: Meteor.userId() });

    if (!crafting) {
      return;
    }

    if (crafting.currentlyCrafting) {
      let craftingXp = 0;
      const newItems = [];
      const popValues = []; // Store array of currentCrafting endDates

      crafting.currentlyCrafting.forEach((currentCraft) => {
        if (moment().isAfter(currentCraft.endDate)) {
          popValues.push(currentCraft.endDate);
          newItems.push({
            itemId: `${currentCraft.itemId}`,
            amount: CInt(currentCraft.amount)
          });
          craftingXp += (CRAFTING.recipes[currentCraft.recipeId].xp * currentCraft.amount);
        }
      });

      const updatedCount = Crafting.update({
        _id: crafting._id,
        currentlyCrafting: crafting.currentlyCrafting
      }, {
        $pull: {
          currentlyCrafting: {
            endDate: {
              $in: popValues
            }
          }
        }
      });

      if (updatedCount === 0) {
        return;
      }

      // Add new items to user
      newItems.forEach((item) => {
        addItem(item.itemId, item.amount);
      });

      // Add crafting exp
      if (_.isNumber(craftingXp)) {
        addXp('crafting', craftingXp);
      }
    }

    if (crafting.currentlyReforging) {
      if (moment().isAfter(crafting.currentlyReforging.endDate)) {
        const originalItem = JSON.parse(crafting.currentlyReforging.itemData);
        const reforgeData = JSON.parse(crafting.currentlyReforging.reforgeData);
        
        if (!originalItem.rarityId) {
          originalItem.rarityId = 'standard';
        }
        
        const userRoll = Math.random();
        if (userRoll <= reforgeData.chance) {
          // success!  rarity goes UP
          Items.insert({
            itemId: originalItem.itemId,
            owner: originalItem.owner,
            category: originalItem.category,
            extraStats: originalItem.extraStats,
            quality: originalItem.quality,
            rarityId: reforgeData.rarityData.rarityId,
            enhanced: originalItem.enhanced
          });
        } else {
          // failure!  rarity goes DOWN
          const prevRarityId = ITEM_RARITIES[originalItem.rarityId].prevRarity.rarityId;
          Items.insert({
            itemId: originalItem.itemId,
            owner: originalItem.owner,
            category: originalItem.category,
            extraStats: originalItem.extraStats,
            quality: originalItem.quality,
            rarityId: prevRarityId,
            enhanced: originalItem.enhanced
          });
        }
        
        Crafting.update(crafting._id, {
          $unset: { currentlyReforging: "" },
          $set: { anythingReforging: false }
        });
      }
    }
  }
});

const MINUTE = 60 * 1000;
const userId = function userId(userId) {
  return userId;
};

DDPRateLimiter.addRule({ type: 'method', name: 'crafting.craftItem', userId }, 10, 20000);
DDPRateLimiter.addRule({ type: 'method', name: 'crafting.fetchRecipes', userId }, 5, 10000);
DDPRateLimiter.addRule({ type: 'method', name: 'crafting.updateGame', userId }, 5, 10000);
// DDPRateLimiter.addRule({ type: 'subscription', name: 'crafting' }, 20, 1 * MINUTE);

Meteor.publish('crafting', function() {

  //Transform function
  const transform = function (doc) {
    if (doc.currentlyCrafting) {
      doc.currentlyCrafting.forEach((item) => {
        const itemConstants = ITEMS[item.itemId];
        item.icon = itemConstants.icon;
        item.name = itemConstants.name;
      });
    }
    return doc;
  };

  const self = this;

  const observer = Crafting.find({
    owner: this.userId
  }).observe({
    added: function (document) {
      self.added('crafting', document._id, transform(document));
    },
    changed: function (newDocument, oldDocument) {
      self.changed('crafting', oldDocument._id, transform(newDocument));
    },
    removed: function (oldDocument) {
      self.removed('crafting', oldDocument._id);
    }
  });

  self.onStop(function () {
    observer.stop();
  });

  self.ready();

});
