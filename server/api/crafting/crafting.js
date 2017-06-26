import { Meteor } from 'meteor/meteor';
import { Crafting } from '/imports/api/crafting/crafting';
import { Users } from '/imports/api/users/users';
import { Skills } from '/imports/api/skills/skills';
import { Items } from '/imports/api/items/items';
import { Events } from '/imports/api/events/events';
import moment from 'moment';
import _ from 'underscore';

import { DONATORS_BENEFITS } from '/imports/constants/shop/index.js';
import { CRAFTING } from '/server/constants/crafting/index.js';
import { ITEMS } from '/server/constants/items/index.js';
import { addItem } from '/server/api/items/items.js';
import { addXp } from '/server/api/skills/skills.js';

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
  }

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
      if (myUser.gold < requirement.amount) {
        canCraft = false;
      } else {
        if (requirement.consumes) {
          myUser.gold -= requirement.amount;
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
}

const craftItem = function (recipeId, amountToCraft = 1) {
  const crafting = Crafting.findOne({ owner: Meteor.userId() });

  if (crafting && (crafting.currentlyCrafting === undefined || crafting.currentlyCrafting === null)) {
    Crafting.update(crafting._id, {
      $set: {
        currentlyCrafting: []
      }
    });
  }

  // Are we crafting atleast one item
  if (amountToCraft <= 0) {
    return;
  }

  const maxConcurrentCrafts = CRAFTING.getMaxCrafts(crafting.craftingLevel);

  // Are we already crafting?
  if (crafting.currentlyCrafting && crafting.currentlyCrafting.length >= maxConcurrentCrafts) {
    throw new Meteor.Error("already-crafting", "Already crafting too many items.");
    return;
  }

  // Is this a valid recipe?
  const recipeConstants = CRAFTING.recipes[recipeId];
  if (!recipeConstants || recipeConstants.recipeFor !== 'crafting') {
    return;
  }

  // Make sure amountToCraft doesn't exceed recipe limit
  if (amountToCraft > recipeConstants.maxToCraft) {
    return;
  }

  // Do we have the requirements for this craft (items / levels / gold)
  // Note this method will take requirements if they are met
  if (!requirementsUtility(recipeConstants.required, amountToCraft)) {
    return;
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
}

Meteor.methods({
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
    const craftingSkill = Skills.findOne({
      owner: Meteor.userId(),
      type: 'crafting'
    });

    const recipesArray = Object.keys(CRAFTING.recipes).map((craftingKey) => {
      const recipeConstant = JSON.parse(JSON.stringify(CRAFTING.recipes[craftingKey]));
      const itemConstant = ITEMS[recipeConstant.produces];

      recipeConstant.icon = itemConstant.icon;
      recipeConstant.description = itemConstant.description;

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

      // Only show recipes we can craft, or recipes close to what we can craft ( 1 level away )
      if (craftingSkill.level + 1 >= recipe.requiredCraftingLevel) {
        return true;
      }

      return false;
    });

    return _.sortBy(recipesArray, 'requiredCraftingLevel');
  },

  'crafting.cancelCraft'(targetEndDate) {
    // If existing crafts done, remove from crafting table
    const crafting = Crafting.findOne({ owner: Meteor.userId() });

    if (!crafting || !crafting.currentlyCrafting) {
      return;
    }

    const newCrafting = JSON.parse(JSON.stringify(crafting.currentlyCrafting));

    // Target Crafting Item
    let targetCrafting;
    newCrafting.forEach((currentCrafting, index) => {
      if (moment(currentCrafting.endDate).diff(targetEndDate) === 0) {
        targetCrafting = currentCrafting;
      }
    });

    console.log(`Before length = ${newCrafting.length}`);

    // Remove targetCrafting from the array
    const filteredCrafting = newCrafting.filter((crafting) => {
      return crafting !== targetCrafting;
    });

    console.log(`After length = ${filteredCrafting.length}`);

    // Reorder crafts and recalculate start / end date
    const sortedCrafts = _.sortBy(filteredCrafting, 'startDate');

    // Reconstruct start and end dates
    sortedCrafts.forEach((craft, index) => {
      if (moment().isBefore(craft.startDate)) {
        const craftDuration = craft.amount * CRAFTING.recipes[craft.recipeId].timeToCraft;
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

    // Refund resources for specified crat
    const recipeConstants = CRAFTING.recipes[targetCrafting.itemId];
    recipeConstants.required.forEach((required) => {
      if (required.consumes) {
        if (required.type === 'item') {
          addItem(required.itemId, required.amount * targetCrafting.amount);
        }
      }
    });
  },

  'crafting.updateGame'() {
    // If existing crafts done, remove from crafting table
    const crafting = Crafting.findOne({ owner: Meteor.userId() });

    if (!crafting || !crafting.currentlyCrafting) {
      return;
    }

    let craftingXp = 0;
    const newItems = [];
    const popValues = []; // Store array of currentCrafting endDates

    crafting.currentlyCrafting.forEach((currentCraft) => {
      if (moment().isAfter(currentCraft.endDate)) {
        popValues.push(currentCraft.endDate);
        newItems.push({
          itemId: JSON.parse(JSON.stringify(currentCraft.itemId)),
          amount: JSON.parse(JSON.stringify(currentCraft.amount))
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
    })

    // Add crafting exp
    if (_.isNumber(craftingXp)) {
      addXp('crafting', craftingXp);
    }
  }
});

const MINUTE = 60 * 1000;
const userId = function userId(userId) {
  return userId;
}

DDPRateLimiter.addRule({ type: 'method', name: 'crafting.craftItem', userId }, 5, 10000);
DDPRateLimiter.addRule({ type: 'method', name: 'crafting.fetchRecipes', userId }, 5, 10000);
DDPRateLimiter.addRule({ type: 'method', name: 'crafting.updateGame', userId }, 5, 10000);
// DDPRateLimiter.addRule({ type: 'subscription', name: 'crafting' }, 20, 1 * MINUTE);

Meteor.publish('crafting', function() {

  //Transform function
  var transform = function(doc) {
    if (doc.currentlyCrafting) {
      doc.currentlyCrafting.forEach((item) => {
        const itemConstants = ITEMS[item.itemId];
        item.icon = itemConstants.icon;
        item.name = itemConstants.name;
      });
    }
    return doc;
  }

  var self = this;

  var observer = Crafting.find({
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
