import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import _ from 'underscore';
import './magicTab.html';

Template.magicTab.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

Template.magicTab.events({
})

Template.magicTab.helpers({
})
