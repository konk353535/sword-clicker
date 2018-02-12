import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import _ from 'underscore';
import './craftingAchieveTab.html';

Template.craftingAchieveTab.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

Template.craftingAchieveTab.events({
})

Template.craftingAchieveTab.helpers({
})
