import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { determineRequiredItems } from '/imports/ui/utils.js';

import './recipeIcon.html';

Template.recipeIcon.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

Template.recipeIcon.rendered = function () {
  const instance = Template.instance();
  const recipe = instance.data.recipe;
  let { maxCraftable, notMet } = determineRequiredItems(recipe);

  instance.state.set('maxCraftableAmount', maxCraftable);
  instance.state.set('maxCraftAmount', recipe.maxToCraft);
  instance.state.set('craftAmount', Math.ceil(maxCraftable / 2));

  if (maxCraftable > recipe.maxToCraft) {
    instance.state.set('maxCraftableAtOnce', recipe.maxToCraft);
  } else {
    instance.state.set('maxCraftableAtOnce', maxCraftable);
  }
}

Template.recipeIcon.events({
  'mouseup .single-craft'(event, instance) {
    // Open the new modal!
    instance.$('.recipeModal').modal('show');
    instance.$('.craft-amount-input').focus();
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
    const recipeId = instance.data.recipe.id;
    const amountToCraft = parseInt(instance.$(event.target).closest('.craft-btn')[0].getAttribute('data-amount'));
    const recipeConstants = instance.data.recipe;
    if (amountToCraft <= 0) {
      return;
    }

    instance.$('.recipeModal').modal('hide');
    Meteor.call('crafting.craftItem', recipeId, amountToCraft, (err) => {
      if (err) {
        toastr.warning(`Failed to craft ${recipeConstants.name}`);
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

  maxCraftableAmount() {
    return Template.instance().state.get('maxCraftableAmount');
  },

  maxCraftableAtOnce() {
    return Template.instance().state.get('maxCraftableAtOnce');
  }
});

Template.recipeIcon.onDestroyed(function () {
})
