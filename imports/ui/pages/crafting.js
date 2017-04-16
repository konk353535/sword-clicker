import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { ReactiveDict } from 'meteor/reactive-dict';
import { determineRequiredItems } from '/imports/ui/utils.js';
import moment from 'moment';

import { DONATORS_BENEFITS } from '/imports/constants/shop/index.js';

import { Crafting } from '/imports/api/crafting/crafting.js';
import { Skills } from '/imports/api/skills/skills.js';
import { Items } from '/imports/api/items/items.js';
import { Users } from '/imports/api/users/users';

// Component used in the template
import './crafting.html';
import '../components/craftingDuration/craftingDuration.js';

let gameUpdateTimer;

Template.craftingPage.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();

  Tracker.autorun(() => {
    const myUser = Users.findOne({ _id: Meteor.userId() });
    if (myUser) {
      if (myUser.uiState && myUser.uiState.craftingFilter !== undefined) {
        this.state.set('recipeFilter', myUser.uiState.craftingFilter);
      } else {
        this.state.set('recipeFilter', 'all');
      }

      if (myUser.uiState && myUser.uiState.craftingTierFilter !== undefined) {
        this.state.set('craftingTierFilter', myUser.uiState.craftingTierFilter);
      } else {
        this.state.set('craftingTierFilter', {});
      }
    }
  });

  this.autorun(() => {
    if (Skills.findOne({ type: 'crafting' })) {
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

          if (Session.get('isMember')) {
            const bonusPercentage = DONATORS_BENEFITS.craftingBonus;
            result.calculatedTimeToCraft = (result.timeToCraft * (1 - (bonusPercentage / 100))).toFixed(0);
          } else {
            result.calculatedTimeToCraft = result.timeToCraft;
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
    Meteor.call('users.setUiState', 'craftingFilter', filter);
  },

  'click .tier-filter'(event, instance) {
    const filter = instance.$(event.target).closest('.tier-filter').data('tier-filter');
    const craftingTierFilter = instance.state.get('craftingTierFilter')
    const existingFilter = craftingTierFilter[filter];

    if (existingFilter) {
      craftingTierFilter[existingFilter] = false;
      instance.state.set('craftingTierFilter', craftingTierFilter);
      Meteor.call('users.setUiState', `craftingTierFilter.${filter}`, false);
    } else {
      craftingTierFilter[existingFilter] = true;
      instance.state.set('craftingTierFilter', craftingTierFilter);
      Meteor.call('users.setUiState', `craftingTierFilter.${filter}`, true);
    }
  },

  'keyup .craft-amount-input'(event, instance) {
    let newValue = parseInt($(event.target).val());
    if (newValue && !isNaN(newValue)) {
      if (newValue > instance.state.get('maxCraftableAmount')) {
        newValue = instance.state.get('maxCraftableAmount');
      }
      instance.state.set('craftAmount', newValue);
    }
  },

  'click .craft-row'(event, instance) {
    const recipeId = $(event.target).closest('.craft-row')[0].getAttribute('data-recipe');
    const recipeListMap = instance.state.get('recipeListMap');

    const recipeConstants = recipeListMap[recipeId];

    let { maxCraftable, notMet } = determineRequiredItems(recipeConstants);

    if (notMet) {
      return toastr.warning('Not enough resources to craft');
    }

    if (maxCraftable > recipeConstants.maxToCraft) {
      maxCraftable = JSON.parse(JSON.stringify(recipeConstants.maxToCraft));
    }

    if (recipeConstants.maxToCraft > 1) {
      instance.state.set('maxCraftableAmount', maxCraftable);
      instance.state.set('maxCraftAmount', recipeConstants.maxToCraft);
      instance.state.set('craftAmount', Math.ceil(maxCraftable / 2));
      instance.state.set('multiCraftRecipeId', recipeId);
      instance.$('.multiCraftModal').modal('show');
    } else {
      Meteor.call('crafting.craftItem', recipeId, 1, (err) => {
        if (err) {
          toastr.warning(err.reason);
        } else {
          toastr.success(`Crafting ${recipeConstants.name}`)
        }
      });
    }
  },

  'click .craft-btn'(event, instance) {
    const recipeId = instance.state.get('multiCraftRecipeId');
    const amountToCraft = parseInt($(event.target).closest('.craft-btn')[0].getAttribute('data-amount'));
    
    const recipeListMap = instance.state.get('recipeListMap');
    const recipeConstants = recipeListMap[recipeId];

    instance.$('.multiCraftModal').modal('hide');
    Meteor.call('crafting.craftItem', recipeId, amountToCraft, (err) => {
      if (err) {
        toastr.warning('Failed to craft item');
      } else {
        toastr.success(`Started crafting ${recipeConstants.name}`)
      }
    });
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

  maxCraftableAmount() {
    return Template.instance().state.get('maxCraftableAmount');
  },

  recipeFilter() {
    return Template.instance().state.get('recipeFilter');
  },

  craftingLevel() {
    return Skills.findOne({ type: 'crafting' }).level;
  },

  craftingTierFilter() {
    return Template.instance().state.get('craftingTierFilter');
  },

  recipes() {
    const instance = Template.instance();
    const recipeFilter = instance.state.get('recipeFilter');

    if (!instance.state.get('recipes')) {
      return [];
    }

    const patterns = [];
    const craftingTierFilter = instance.state.get('craftingTierFilter');
    Object.keys(craftingTierFilter).forEach((tierKey) => {
      if (craftingTierFilter[tierKey]) {
        patterns.push(tierKey);
      }
    });

    // Create regex exp to filter out based on current tier filter selection
    let filterTierRegex = new RegExp(patterns.join('|'), 'gi');

    let filteredRecipes = instance.state.get('recipes').filter((item) => {
      if (patterns.length > 0 && filterTierRegex) {
        // Filter out if it matches the pattern.
        if(item.id.match(filterTierRegex)) {
          return false;
        }
        return true;
      }

      return true;
    });

    if (recipeFilter === 'all') {
      return filteredRecipes;
    } else {
      return filteredRecipes.filter((item) => {
        return item.category === recipeFilter;
      });
    }
  },

  items() {
    return Items.find({ equipped: false });
  }
});
