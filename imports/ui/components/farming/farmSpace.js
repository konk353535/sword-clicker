import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './farmSpace.html';

Template.farmSpace.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

Template.farmSpace.events({
  'click'(event, instance) {
    /*
    if (instance.data.farmSpace.oreId) {
      Meteor.call('mining.clickedfarmSpace', instance.data.farmSpace._id);
    }*/
  }
});

Template.farmSpace.rendered = function () {
  const farmSpaceTooltip = new Drop({
    target: Template.instance().$('.farm-space-container')[0],
    content: Template.instance().$('.farm-space-tooltip-content')[0],
    openOn: 'hover',
    position: 'top left',
    remove: true
  });
}

Template.farmSpace.helpers({
  isEmpty() {
    return !this.farmSpace.plantId;
  }
});
