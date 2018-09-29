import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { determineRequiredItems } from '/imports/ui/utils.js';

import './recipeIcon.html';

Template.recipeIcon.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  this.state.set('showStats', false);
  this.state.set('showModal', false);
});

const updateCraftable = function (instance) {
  const recipe = instance.data.recipe;
  let { maxCraftable, notMet } = determineRequiredItems(recipe);

  instance.state.set('maxCraftableAmount', maxCraftable);
  instance.state.set('maxCraftAmount', recipe.maxToCraft);

  let maxCraftableAtOnce = maxCraftable;
  if (maxCraftable > recipe.maxToCraft) {
    maxCraftableAtOnce = recipe.maxToCraft;
  }

  instance.state.set('craftAmount', Math.ceil(maxCraftableAtOnce / 2));
  instance.state.set('maxCraftableAtOnce', maxCraftableAtOnce);
}

Template.recipeIcon.rendered = function () {
  const instance = Template.instance();
  updateCraftable(instance);
}

Template.recipeIcon.events({

  'click .show-stats'(event, instance) {
    instance.state.set('showStats', true);
  },

  'click .hide-stats'(event, instance) {
    instance.state.set('showStats', false);
  },

  'click .quick-craft'(event, instance) {
    if (instance.$('.recipe-tooltip').css('opacity') > 0.9) {
      // Copy PASTA cause im lazy
      const recipeId = instance.data.recipe.id;
      const amountToCraft = parseInt(instance.$(event.target).closest('.quick-craft')[0].getAttribute('data-amount'));
      const recipeConstants = instance.data.recipe;
      if (amountToCraft <= 0) {
        return;
      }

      instance.$('.recipeModal').modal('hide');
      const isInscription = instance.data.isInscription;
      Meteor.call(`${isInscription ? 'inscription' : 'crafting'}.craftItem`, recipeId, amountToCraft, (err) => {
        if (err) {
          toastr.warning(`Failed to craft ${recipeConstants.name}`);
        } else {
          updateCraftable(instance);
        }
      });
      toastr.success(`Crafting ${recipeConstants.name}`)
    }
  },

  'click .single-craft'(event, instance) {
    if (instance.$('.recipe-tooltip').css('opacity') > 0.9) {
      // Open the new modal!
      instance.state.set('showModal', true);
      setTimeout(() => {
        instance.$('.recipeModal').modal('show');
        instance.$('.craft-amount-input').focus();
      });
    }
  },

  'keyup .craft-amount-input'(event, instance) {
    let newValue = parseInt(instance.$('.craft-amount-input').val());
    if (newValue && !isNaN(newValue)) {
      if (newValue > instance.state.get('maxCraftableAtOnce')) {
        newValue = instance.state.get('maxCraftableAtOnce');
      }
      instance.state.set('craftAmount', parseInt(newValue));
    }
  },

  'click .craft-btn'(event, instance) {
    // Note this is all copy pasta'd above
    const recipeId = instance.data.recipe.id;
    const amountToCraft = parseInt(instance.$(event.target).closest('.craft-btn')[0].getAttribute('data-amount'));
    const recipeConstants = instance.data.recipe;
    if (amountToCraft <= 0) {
      return;
    }

    instance.$('.recipeModal').modal('hide');
    const isInscription = instance.data.isInscription;
    Meteor.call(`${isInscription ? 'inscription' : 'crafting'}.craftItem`, recipeId, amountToCraft, (err) => {
      if (err) {
        toastr.warning(`Failed to craft ${recipeConstants.name}`);
      } else {
        updateCraftable(instance);
      }
    });
    toastr.success(`Crafting ${recipeConstants.name}`)
  }
});

Template.recipeIcon.helpers({

  maxCraftAmount() {
    return Template.instance().state.get('maxCraftAmount');
  },

  craftAmount() {
    return Template.instance().state.get('craftAmount');
  },

  showStats() {
    return Template.instance().state.get('showStats');
  },

  showModal() {
    return Template.instance().state.get('showModal');
  },

  maxCraftableAmount() {
    return Template.instance().state.get('maxCraftableAmount');
  },

  maxCraftableAtOnce() {
    return Template.instance().state.get('maxCraftableAtOnce');
  }
});

Template.recipeIcon.onDestroyed(function () {
})
