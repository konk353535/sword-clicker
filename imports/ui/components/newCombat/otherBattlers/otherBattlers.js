import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Battles } from '/imports/api/battles/battles.js';
import { ReactiveDict } from 'meteor/reactive-dict';

import './otherBattlers.html';

Template.otherBattlersPage.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

Template.otherBattlersPage.events({
  'click .back-to-lobby-btn'(event, instance) {
    instance.data.setPage('lobby');
  }
})

Template.otherBattlersPage.helpers({
});
