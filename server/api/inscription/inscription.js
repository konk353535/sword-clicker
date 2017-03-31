import { Meteor } from 'meteor/meteor';

import { Inscription } from '/imports/api/inscription/inscription';
import { Skills } from '/imports/api/skills/skills';
import moment from 'moment';

import { CRAFTING } from '/server/constants/crafting/index.js';
import { INSCRIPTION } from '/server/constants/inscription/index.js';
import { ITEMS } from '/server/constants/items/index.js';
import { addItem } from '/server/api/items/items.js';
import { addXp } from '/server/api/skills/skills.js';

import { requirementsUtility } from '/server/api/crafting/crafting';

const craftItem = function (recipeId, amountToCraft) {
  const inscription = Inscription.findOne({ owner: Meteor.userId() });

  // Are we crafting atleast one item
  if (amountToCraft <= 0) {
    return;
  }

  const maxConcurrentCrafts = INSCRIPTION.baseMaxCrafts;

  // Are we already crafting?
  if (inscription.currentlyCrafting && inscription.currentlyCrafting.length >= maxConcurrentCrafts) {
    console.log('Already crafting');
    return;
  }

  // Is this a valid recipe?
  const recipeConstants = CRAFTING.recipes[recipeId];
  if (!recipeConstants || recipeConstants.recipeFor !== 'inscription') {
    console.log('Invalid recipe');
    return;
  }

  // Do we have the requirements for this craft (items / levels / gold)
  // Note this method will take requirements if they are met
  if (!requirementsUtility(recipeConstants.required, amountToCraft)) {
    console.log('doesnt meet reqs');
    return;
  }

  let startDate = new Date();

  if (inscription.currentlyCrafting && inscription.currentlyCrafting.length > 0) {
    // Get latest crafting time and use that for next items crafting start time
    // This will make crafting sequential
    startDate = _.sortBy(inscription.currentlyCrafting, 'endDate')[0].endDate;
  }

  // Add to currently crafting...
  Inscription.update(inscription._id, {
    $push: {
      currentlyCrafting: {
        itemId: recipeConstants.produces,
        startDate,
        recipeId,
        amount: amountToCraft,
        endDate: moment(startDate).add(recipeConstants.timeToCraft * amountToCraft, 'seconds').toDate()
      }
    }
  });
}

Meteor.methods({
  'inscription.craftItem'(recipeId, amount) {
    craftItem(recipeId, amount);
  },

  'inscription.fetchRecipes'() {
    const inscriptionSkill = Skills.findOne({
      owner: Meteor.userId(),
      type: 'inscription'
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
      if (recipe.recipeFor !== 'inscription') {
        return false;
      }

      // Only show recipes we can craft, or recipes close to what we can craft ( 1 level away )
      if (inscriptionSkill.level + 1 >= recipe.requiredInscriptionLevel) {
        return true;
      }

      return false;
    });

    return _.sortBy(recipesArray, 'requiredInscriptionLevel');
  },

  'inscription.updateGame'() {
    // If existing crafts done, remove from crafting table
    const inscription = Inscription.findOne({ owner: Meteor.userId() });

    let inscriptionXp = 0;
    const newItems = [];
    const popValues = []; // Store array of currentCrafting endDates

    inscription.currentlyCrafting.forEach((currentCraft) => {
      if (moment().isAfter(currentCraft.endDate)) {
        popValues.push(currentCraft.endDate);
        newItems.push({
          itemId: JSON.parse(JSON.stringify(currentCraft.itemId)),
          amount: JSON.parse(JSON.stringify(currentCraft.amount))
        });
        inscriptionXp += (CRAFTING.recipes[currentCraft.recipeId].xp * currentCraft.amount);
      }
    });

    Inscription.update(inscription._id, {
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

    // Add inscription exp
    if (_.isNumber(inscriptionXp)) {
      addXp('inscription', inscriptionXp);
    }
  }
});

Meteor.publish('inscription', function() {

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

  var observer = Inscription.find({
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
