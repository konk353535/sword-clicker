import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import moment from 'moment';

import { Crafting } from '/imports/api/crafting/crafting.js';
import { Skills } from '/imports/api/skills/skills.js';
import { Items } from '/imports/api/items/items.js';

// Component used in the template
import './crafting.html';
import '../components/craftingDuration/craftingDuration.js';

let gameUpdateTimer;

Template.craftingPage.onCreated(function bodyOnCreated() {
  // const subsManager = Session.get('subsManager');

  this.state = new ReactiveDict();
  // Show crafting exp
  Meteor.subscribe('skills');
  // Show items
  Meteor.subscribe('items');
  // Show currently crafting items
  Meteor.subscribe('crafting');
});

Template.craftingPage.events({
  'click .learn-now'(event, instance) {
    Meteor.call('skills.learnSkill', 'crafting');
  },

  'keyup .craft-amount-input'(event, instance) {
    let newValue = parseInt($(event.target).val());
    if (newValue && !isNaN(newValue)) {
      instance.state.set('craftAmount', newValue);
    }
  },

  'click .craft-row'(event, instance) {
    const recipeId = instance.$(event.target).closest('.craft-row').data('recipe');
    const recipeListMap = instance.state.get('recipeListMap');

    const recipeConstants = recipeListMap[recipeId];

    if (recipeConstants.maxToCraft > 1) {
      instance.state.set('maxCraftAmount', recipeConstants.maxToCraft);
      instance.state.set('craftAmount', 1);
      instance.state.set('multiCraftRecipeId', recipeId);
      instance.$('.multiCraftModal').modal('show');
    } else {
      Meteor.call('crafting.craftItem', recipeId, 1);
    }
  },

  'click .craft-btn'(event, instance) {
    const recipeId = instance.state.get('multiCraftRecipeId');
    const amountToCraft = parseInt(instance.state.get('craftAmount'));

    instance.$('.multiCraftModal').modal('hide');
    Meteor.call('crafting.craftItem', recipeId, amountToCraft);
  }
})

Template.craftingPage.helpers({
  craftingSkill() {
    // Otherwise, return all of the tasks
    return Skills.findOne({ type: 'crafting' });
  },

  crafting() {
    return Crafting.findOne();
  },

  maxCraftAmount() {
    return Template.instance().state.get('maxCraftAmount');
  },

  craftAmount() {
    return Template.instance().state.get('craftAmount');
  },

  recipes() {
    const craftingSkill = Skills.findOne({ type: 'crafting' });
    const results = ReactiveMethod.call('crafting.fetchRecipes', craftingSkill.level);
    if (!results) {
      return [];
    }

    const resultsMap = {};
    results.forEach((result) => {
      resultsMap[result.id] = result;
    });
    Template.instance().state.set('recipeListMap', resultsMap);

    return results.map((result) => {
      if (craftingSkill.level < result.requiredCraftingLevel) {
        result.notMetLevelReq = true;
      }

      return result;
    });
  },

  items() {
    return Items.find();
  }
});
