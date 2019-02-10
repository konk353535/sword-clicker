import { Meteor } from 'meteor/meteor';
import { Inscription } from '/imports/api/inscription/inscription';
import { Users } from '/imports/api/users/users';
import { Skills } from '/imports/api/skills/skills';
import { Events } from '/imports/api/events/events';
import moment from 'moment';
import lodash from 'lodash';

import { CRAFTING } from '/imports/constants/crafting/index.js';
import { INSCRIPTION } from '/imports/constants/inscription/index.js';
import { DONATORS_BENEFITS } from '/imports/constants/shop/index.js';
import { ITEMS } from '/imports/constants/items/index.js';
import { addItem } from '/server/api/items/items.js';
import { addXp } from '/server/api/skills/skills.js';
import { CInt } from '/imports/utils.js';

import { requirementsUtility } from '/server/api/crafting/crafting';

const craftItem = function (recipeId, amountToCraft) {
  const inscription = Inscription.findOne({ owner: Meteor.userId() });

  // Are we crafting at least one item
  if (amountToCraft <= 0) {
    throw new Meteor.Error("cant-inscribe", "Choose a positive quantity of items to inscribe.");
  }

  const maxConcurrentCrafts = INSCRIPTION.getMaxCrafts(inscription.inscriptionLevel);

  // Are we already crafting?
  if (inscription.currentlyCrafting && inscription.currentlyCrafting.length >= maxConcurrentCrafts) {
    throw new Meteor.Error("cant-inscribe", "Your inscription queue is full.");
  }

  // Is this a valid recipe?
  const recipeConstants = CRAFTING.recipes[recipeId];
  if (!recipeConstants || recipeConstants.recipeFor !== 'inscription') {
    throw new Meteor.Error("cant-inscribe", "Recipe details for that inscription recipe couldn't be found.");
  }

  // Make sure amountToCraft doesn't exceed recipe limit
  if (amountToCraft > recipeConstants.maxToCraft) {
    throw new Meteor.Error("cant-inscribe", "Can't inscribe that many at once.");
  }

  // Do we have the requirements for this craft (items / levels / gold)
  // Note this method will take requirements if they are met
  if (!requirementsUtility(recipeConstants.required, amountToCraft)) {
    throw new Meteor.Error("cant-inscribe", "You don't know how to inscribe that, yet.");
  }

  let startDate = new Date();

  if (inscription.currentlyCrafting && inscription.currentlyCrafting.length > 0) {
    // Get latest crafting time and use that for next items crafting start time
    // This will make crafting sequential
    startDate = _.sortBy(inscription.currentlyCrafting, 'endDate').reverse()[0].endDate;
  }

  let timeToCraft = recipeConstants.timeToCraft * amountToCraft;

  const userDoc = Meteor.user();

  // Apply membership benefits
  if (Meteor.user().inscriptionUpgradeTo && moment().isBefore(Meteor.user().inscriptionUpgradeTo)) {
    timeToCraft *= (1 - (DONATORS_BENEFITS.inscriptionBonus / 100));
  }

  // Add to currently crafting...
  Inscription.update(inscription._id, {
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

Meteor.methods({
  'inscription.craftItem'(recipeId, amount) {
    if (Meteor.user().logEvents) {
      Events.insert({
        owner: this.userId,
        event: 'inscription.craftItem',
        date: new Date(),
        data: { recipeId, amount }
      }, () => {})
    }

    craftItem(recipeId, amount);

    // update user activity
    Users.update({
      _id: Meteor.userId()
    }, {
      $set: {
        lastActivity: moment().toDate()
      }
    });
  },

  'inscription.cancelCraft'(targetEndDate) {
    // If existing crafts done, remove from crafting table
    const inscription = Inscription.findOne({ owner: Meteor.userId() });

    if (!inscription || !inscription.currentlyCrafting) {
      return;
    }

    const newCrafting = lodash.cloneDeep(inscription.currentlyCrafting);

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
    const updatedCount = Inscription.update({
      _id: inscription._id,
      currentlyCrafting: inscription.currentlyCrafting
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

    // update user activity
    Users.update({
      _id: Meteor.userId()
    }, {
      $set: {
        lastActivity: moment().toDate()
      }
    });
  },

  'inscription.fetchRecipes'() {
    const user = Meteor.user();
    if (!user){
      return false;
    }

    const inscriptionSkill = Skills.findOne({
      owner: Meteor.userId(),
      type: 'inscription'
    });

    const recipesArray = Object.keys(CRAFTING.recipes).map((craftingKey) => {
      const recipeConstant = lodash.cloneDeep(CRAFTING.recipes[craftingKey]);
      const itemConstant = ITEMS[recipeConstant.produces];

      recipeConstant.icon = itemConstant.icon;
      recipeConstant.description = itemConstant.description;
      recipeConstant.teaches = itemConstant.teaches;

      if (itemConstant.stats) {
        recipeConstant.baseStats = itemConstant.stats;
        recipeConstant.extraStats = itemConstant.extraStats;
      }

      if (itemConstant.requiredEquip) {
        recipeConstant.requiredEquip = itemConstant.requiredEquip;
      }
      return recipeConstant;
    }).filter((recipe) => {
      if (recipe.recipeFor !== 'inscription') {
        return false;
      }

      // Only show recipes we can craft, or recipes close to what we can craft ( 1 level away )
      return inscriptionSkill.level + 1 >= (recipe && recipe.requiredInscriptionLevel ? recipe.requiredInscriptionLevel : 0);
    });

    return _.sortBy(recipesArray, 'requiredInscriptionLevel');
  },

  'inscription.updateGame'() {
    // If existing crafts done, remove from crafting table
    const inscription = Inscription.findOne({ owner: Meteor.userId() });

    let inscriptionXp = 0;
    const newItems = [];
    const popValues = []; // Store array of currentCrafting endDates

    if (!inscription.currentlyCrafting) {
        return;
    }
    
    inscription.currentlyCrafting.forEach((currentCraft) => {
      if (moment().isAfter(currentCraft.endDate)) {
        popValues.push(currentCraft.endDate);
        newItems.push({
          itemId: `${currentCraft.itemId}`,
          amount: CInt(currentCraft.amount)
        });
        inscriptionXp += (CRAFTING.recipes[currentCraft.recipeId].xp * currentCraft.amount);
      }
    });

    const updated = Inscription.update({
      _id: inscription._id,
      currentlyCrafting: inscription.currentlyCrafting
    }, {
      $pull: {
        currentlyCrafting: {
          endDate: {
            $in: popValues
          }
        }
      }
    });

    if (updated === 0) {
      return;
    }

    // Add new items to user
    newItems.forEach((item) => {
      addItem(item.itemId, item.amount);
    });

    // Add inscription exp
    if (_.isNumber(inscriptionXp)) {
      addXp('inscription', inscriptionXp);
    }
  }
});

const MINUTE = 60 * 1000;

// DDPRateLimiter.addRule({ type: 'method', name: 'inscription.craftItem' }, 10, 2 * MINUTE);
// DDPRateLimiter.addRule({ type: 'method', name: 'inscription.fetchRecipes' }, 10, 5 * MINUTE);
// DDPRateLimiter.addRule({ type: 'method', name: 'inscription.updateGame' }, 10, 1 * MINUTE);
// DDPRateLimiter.addRule({ type: 'subscription', name: 'inscription' }, 100, 10 * MINUTE);

Meteor.publish('inscription', function() {

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

  const observer = Inscription.find({
    owner: this.userId
  }).observe({
    added: function (document) {
      self.added('inscription', document._id, transform(document));
    },
    changed: function (newDocument, oldDocument) {
      self.changed('inscription', oldDocument._id, transform(newDocument));
    },
    removed: function (oldDocument) {
      self.removed('inscription', oldDocument._id);
    }
  });

  self.onStop(function () {
    observer.stop();
  });

  self.ready();

});
