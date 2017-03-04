import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './mineSpace.html';

Template.mineSpace.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

Template.mineSpace.events({
  'click'(event, instance) {
    if (instance.data.mineSpace.oreId) {
      Meteor.call('mining.clickedMineSpace', instance.data.mineSpace._id);
    }
  }
});

Template.mineSpace.helpers({
  isEmpty() {
    return !this.mineSpace.oreId;
  }
});
