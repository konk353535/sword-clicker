import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Battles } from '/imports/api/battles/battles.js';

import './battleTab.html';

Template.battleTab.onCreated(function bodyOnCreated() {
  Meteor.subscribe('battles');
});

Template.battleTab.events({
  'click .battle-btn'(event, instance) {
    console.log('here');
    Meteor.call('battles.randomBattle');
  }
})

Template.battleTab.helpers({
  currentBattle() {
    return Battles.findOne();
  }
})
