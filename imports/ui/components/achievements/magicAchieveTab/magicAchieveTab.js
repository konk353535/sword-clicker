import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './magicAchieveTab.html';

Template.magicAchieveTab.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

Template.magicAchieveTab.events({
});

Template.magicAchieveTab.helpers({
});
