import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import _ from 'underscore';
import './pqTab.html';

Template.pqTab.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

Template.pqTab.events({
})

Template.pqTab.helpers({
})
