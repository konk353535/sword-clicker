import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import moment from 'moment';

import { DONATORS_BENEFITS } from '/imports/constants/shop/index.js';

import { Inscription } from '/imports/api/inscription/inscription.js';
import { Skills } from '/imports/api/skills/skills.js';
import { Items } from '/imports/api/items/items.js';
import { Users } from '/imports/api/users/users.js';

// Component used in the template
import './inscription.html';
import '../components/craftingDuration/craftingDuration.js';

let gameUpdateTimer;

Template.inscriptionPage.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();

  this.state.set('hasLearnRequirements', false);

  Meteor.call('abilities.fetchLibrary', (err, abilityResults) => {
    if (abilityResults) {
      const abilityResultsMap = {};
      abilityResults.forEach((ability) => {
        abilityResultsMap[ability.id] = ability;
      });
      this.state.set('abilityMap', abilityResultsMap);
    }
  });

  Tracker.autorun(() => {
    const myUser = Users.findOne({ _id: Meteor.userId() });
    if (myUser) {
      if (myUser.uiState && myUser.uiState.inscriptionFilter !== undefined) {
        this.state.set('recipeFilter', myUser.uiState.inscriptionFilter);
      } else {
        this.state.set('recipeFilter', 'abilities');
      }

      if (myUser.uiState && myUser.uiState.inscriptionLevelFilter !== undefined) {
        this.state.set('levelFilter', myUser.uiState.inscriptionLevelFilter);
      } else {
        this.state.set('levelFilter', 1);
      }
    }
  });

  this.autorun(() => {
    if (Skills.findOne({ type: 'inscription' })) {
      const inscriptionSkill = Skills.findOne({ type: 'inscription' });
      // Pass level so that this is recalled when we get up a level
      const results = ReactiveMethod.call('inscription.fetchRecipes', inscriptionSkill.level);
      if (results) {
        const resultsMap = {};
        results.forEach((result) => {
          resultsMap[result.id] = result;
        });
        this.state.set('recipeListMap', resultsMap);

        // Store recipes
        this.state.set('recipes', results.map((result) => {
          if (inscriptionSkill.level < result.inscriptionSkill) {
            result.notMetLevelReq = true;
          }

          if (Session.get('isMember')) {
            const bonusPercentage = DONATORS_BENEFITS.inscriptionBonus;
            result.calculatedTimeToCraft = (result.timeToCraft * (1 - (bonusPercentage / 100))).toFixed(0);
          } else {
            result.calculatedTimeToCraft = result.timeToCraft;
          }

          return result;
        }));
      }
    } else {
      Meteor.call('skills.requirements', 'inscription', (err, res) => {
        this.state.set('learnRequirements', res);
      });
    }
  })

  // Show currently crafting items
  Meteor.subscribe('inscription');
});

Template.inscriptionPage.events({
  'click .learn-now'(event, instance) {
    Meteor.call('skills.learnSkill', 'inscription');
  },

  'click .crafting-filter'(event, instance) {
    const filter = instance.$(event.target).closest('.crafting-filter').data('filter');
    Meteor.call('users.setUiState', 'inscriptionFilter', filter);
  },

  'click .level-filter'(event, instance) {
    const filter = instance.$(event.target).closest('.level-filter').data('filter');
    Meteor.call('users.setUiState', 'inscriptionLevelFilter', filter);
  },

  'keyup .craft-amount-input'(event, instance) {
    let newValue = parseInt($(event.target).val());
    if (newValue && !isNaN(newValue)) {
      instance.state.set('craftAmount', newValue);
    }
  },

  'click .craft-row'(event, instance) {
    const recipeId = $(event.target).closest('.craft-row')[0].getAttribute('data-recipe');
    const recipeListMap = instance.state.get('recipeListMap');

    const recipeConstants = recipeListMap[recipeId];

    if (recipeConstants.maxToCraft > 1) {
      instance.state.set('maxCraftAmount', recipeConstants.maxToCraft);
      instance.state.set('craftAmount', 1);
      instance.state.set('multiCraftRecipeId', recipeId);
      instance.$('.multiCraftModal').modal('show');
      instance.$('.craft-amount-input').focus();
    } else {
      Meteor.call('inscription.craftItem', recipeId, 1);
    }
  },

  'submit .craft-amount-form, click .craft-btn'(event, instance) {
    event.preventDefault();

    const recipeId = instance.state.get('multiCraftRecipeId');
    const amountToCraft = parseInt(instance.state.get('craftAmount'));

    instance.$('.multiCraftModal').modal('hide');
    Meteor.call('inscription.craftItem', recipeId, amountToCraft);
  }
})

Template.inscriptionPage.helpers({
  inscriptionSkill() {
    // Otherwise, return all of the tasks
    return Skills.findOne({ type: 'inscription' });
  },

  inscription() {
    return Inscription.findOne();
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

  levelFilter() {
    return Template.instance().state.get('levelFilter');
  },  

  recipes() {
    const instance = Template.instance();
    const recipeFilter = instance.state.get('recipeFilter');
    const levelFilter = instance.state.get('levelFilter');

    if (!instance.state.get('recipes')) {
      return [];
    }

    const abilityMap = instance.state.get('abilityMap');

    if (recipeFilter === 'abilities') {
      return instance.state.get('recipes').filter((item) => {
        return item.category === 'tome' && item.teaches.level === parseInt(levelFilter);
      }).map((recipe) => {
        if (recipe.teaches) {
          const recipeTeaches = recipe.teaches.abilityId;
          if (abilityMap[recipeTeaches]) {
            recipe.ability = abilityMap[recipeTeaches];
            recipe.ability.primaryAction = {};
          }
        }
        return recipe;
      });
    } else {
      return instance.state.get('recipes').filter((item) => {
        return item.category === recipeFilter;
      });
    }
  },

  items() {
    return Items.find({
      equipped: false,
      category: {
        $in: ['herb', 'pigment', 'paper', 'page', 'tome']
      } 
    });
  },

  learnRequirements() {
    return Template.instance().state.get('learnRequirements');
  },

  hasLearnRequirements() {
    return Template.instance().state.get('hasLearnRequirements');
  },

  learnRequirementsMet() {
    const instance = Template.instance();
    return function (met) {
      instance.state.set('hasLearnRequirements', met);
    }
  }
});
