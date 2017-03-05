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
  }
})

Template.craftingPage.helpers({
  craftingSkill() {
    // Otherwise, return all of the tasks
    return Skills.findOne({ type: 'crafting' });
  },

  recipes() {
    const craftingSkill = Skills.findOne({ type: 'crafting' });
    return ReactiveMethod.call('crafting.fetchRecipes', craftingSkill.level);
  },

  items() {
    return Items.find();
  }
});
