import { Template } from 'meteor/templating';
import { Skills } from '/imports/api/skills/skills.js';
 
import './nav.html';

Template.nav.onCreated(function bodyOnCreated() {
  Meteor.subscribe("userData");
});

Template.nav.helpers({
  currentRoute() {
    return Router.current().route.getName();
  },

  hasCraftingSkill() {
    if (Skills.findOne()) {
      return Skills.findOne({ type: 'crafting' });
    } else {
      return true;
    }
  },

  hasAttackSkill() {
    if (Skills.findOne()) {
      return Skills.findOne({ type: 'attack' });
    } else {
      return true;
    }
  }
});
