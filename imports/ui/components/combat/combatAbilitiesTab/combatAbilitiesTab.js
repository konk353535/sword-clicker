import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './combatAbilitiesTab.html';

Template.combatAbilitiesTab.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

Template.combatAbilitiesTab.events({
})

Template.combatAbilitiesTab.helpers({
})
