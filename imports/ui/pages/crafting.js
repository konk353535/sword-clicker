import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Skills } from '/imports/api/skills/skills.js';
import { Items } from '/imports/api/items/items.js';

// Component used in the template
import './crafting.html';

let gameUpdateTimer;

Template.craftingPage.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  // Show crafting exp
  Meteor.subscribe('skills');
  // Show items
  Meteor.subscribe('items');
});

Template.craftingPage.events({
  'click .learn-now'(event, instance) {
    Meteor.call('skills.learnSkill', 'crafting');
  },

  'click .craft-row'(event, instance) {
    const recipeId = Template.instance().$(event.target).closest('.craft-row').data('recipe');
    Meteor.call('crafting.craftItem', recipeId, 1);
  }
})

Template.craftingPage.helpers({
  craftingSkill() {
    // Otherwise, return all of the tasks
    return Skills.findOne({ type: 'crafting' });
  },

  recipes() {
    const craftingSkill = Skills.findOne({ type: 'crafting' });
    const results = ReactiveMethod.call('crafting.fetchRecipes', craftingSkill.level);
    if (!results) {
      return [];
    }
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
