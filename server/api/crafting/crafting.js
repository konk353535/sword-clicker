import { Meteor } from 'meteor/meteor';
import { Crafting } from '/imports/api/crafting/crafting';
import { Users } from '/imports/api/users/users';
import { Skills } from '/imports/api/skills/skills';
import { Items } from '/imports/api/items/items';
import moment from 'moment';

import { CRAFTING } from '/server/constants/crafting.js';
import { ITEMS } from '/server/constants/items.js';
import { addItem } from '/server/api/items/items.js';
import { addXp } from '/server/api/skills/skills.js';

const craftItem = function (recipeId, amountToCraft) {
  const crafting = Crafting.findOne({ owner: Meteor.userId() });

  // Are we already crafting?
  if (crafting.currentlyCrafting && crafting.currentlyCrafting.length > 0) {
    return;
  }

  // Have required resources?
  const recipeConstants = CRAFTING.recipes[recipeId];
  if (!recipeConstants) {
    return;
  }
  const requiredItemList = recipeConstants.requiredItems.map((item) => item.itemId);
  const searchMyItems = Items.find({
    owner: Meteor.userId(),
    itemId: {
      $in: requiredItemList
    }
  });
  const myItems = searchMyItems.fetch();
  const myItemsMap = {};
  myItems.forEach((item) => {
    myItemsMap[item.itemId] = item;
  });
  let canCraft = true;
  recipeConstants.requiredItems.forEach((requiredItem) => {
    const myItem = myItemsMap[requiredItem.itemId];

    if (!myItem || myItem.amount < (requiredItem.amount * amountToCraft)) {
      canCraft = false;
    } else {
      myItem.amount -= (requiredItem.amount * amountToCraft);
      if (myItem.amount === 0) {
        myItem.deleteMe = true;
      }
    }
  });
  if (!canCraft) {
    return;
  }

  // Have required level?
  const craftingSkill = Skills.findOne({ owner: Meteor.userId(), type: 'crafting' });
  if (craftingSkill.level < recipeConstants.requiredCraftingLevel) {
    return;
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

  // Add to currently crafting...
  Crafting.update(crafting._id, {
    $push: {
      currentlyCrafting: {
        itemId: recipeConstants.produces,
        startDate: new Date(),
        recipeId,
        amount: amountToCraft,
        endDate: moment().add(recipeConstants.timeToCraft * amountToCraft, 'seconds').toDate()
      }
    }
  });
}

Meteor.methods({
  'crafting.craftItem'(recipeId, amount) {
    craftItem(recipeId, amount);
  },

  'crafting.fetchRecipes'(craftingLevel) {
    const craftingSkill = Skills.findOne({
      owner: Meteor.userId(),
      type: 'crafting'
    });

    const recipesArray = Object.keys(CRAFTING.recipes).map((craftingKey) => {
      const recipeConstant = CRAFTING.recipes[craftingKey];
      const itemConstant = ITEMS[recipeConstant.produces];
      recipeConstant.icon = itemConstant.icon;
      recipeConstant.description = itemConstant.description;
      return recipeConstant;
    }).filter((recipe) => {
      // Only show recipes we can craft, or recipes close to what we can craft ( 1 level away )
      if (craftingSkill.level + 1 >= recipe.requiredCraftingLevel) {
        return true;
      }

      return false;
    });

    return recipesArray;
  },

  'crafting.updateGame'() {
    // If existing crafts done, remove from crafting table
    const crafting = Crafting.findOne({ owner: Meteor.userId() });

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

    Crafting.update(crafting._id, {
      $pull: {
        currentlyCrafting: {
          endDate: {
            $in: popValues
          }
        }
      }
    });

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

Meteor.publish('crafting', function() {

  //Transform function
  var transform = function(doc) {
    doc.currentlyCrafting.forEach((item) => {
      const itemConstants = ITEMS[item.itemId];
      item.icon = itemConstants.icon;
      item.name = itemConstants.name;
    });
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
