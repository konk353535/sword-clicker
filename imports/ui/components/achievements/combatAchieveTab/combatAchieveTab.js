import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import _ from 'underscore';
import './combatAchieveTab.html';

Template.combatAchieveTab.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

Template.combatAchieveTab.events({
})

Template.combatAchieveTab.helpers({
})
