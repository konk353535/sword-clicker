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
  this.state = new ReactiveDict();
  this.state.set('recipeFilter', 'all');

  Tracker.autorun(() => {
    if (Skills.findOne()) {
      const craftingSkill = Skills.findOne({ type: 'crafting' });
      // Pass level so that this is recalled when we get up a level
      const results = ReactiveMethod.call('crafting.fetchRecipes', craftingSkill.level);
      if (results) {
        const resultsMap = {};
        results.forEach((result) => {
          resultsMap[result.id] = result;
        });
        this.state.set('recipeListMap', resultsMap);

        // Store recipes
        this.state.set('recipes', results.map((result) => {
          if (craftingSkill.level < result.requiredCraftingLevel) {
            result.notMetLevelReq = true;
          }

          return result;
        }));
      }
    }
  })

  // Show currently crafting items
  Meteor.subscribe('crafting');
});

Template.craftingPage.events({
  'click .learn-now'(event, instance) {
    Meteor.call('skills.learnSkill', 'crafting');
  },

  'click .crafting-filter'(event, instance) {
    const filter = instance.$(event.target).closest('.crafting-filter').data('filter');
    instance.state.set('recipeFilter', filter);
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

  recipeFilter() {
    return Template.instance().state.get('recipeFilter');
  },

  recipes() {
    const instance = Template.instance();
    const recipeFilter = instance.state.get('recipeFilter');

    if (recipeFilter === 'all') {
      return instance.state.get('recipes');
    } else {
      return instance.state.get('recipes').filter((item) => {
        return item.category === recipeFilter;
      });
    }
  },

  items() {
    return Items.find({ equipped: false });
  }
});
