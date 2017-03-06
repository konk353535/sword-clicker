import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Skills } from '/imports/api/skills/skills.js';

// Component used in the template
import './combat.html';

Template.craftingPage.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  // Show combat exp
  Meteor.subscribe('skills');
});

Template.craftingPage.events({
  'click .learn-now'(event, instance) {
    Meteor.call('skills.learnSkill', 'attack');
  }
})

Template.craftingPage.helpers({
  attackSkill() {
    return Skills.findOne({ type: 'attack' });
  },

  defenseSkill() {
    return Skills.findOne({ type: 'defense' });
  }
});
