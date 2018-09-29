import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './foodIcon.html';

Template.foodIcon.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

Template.foodIcon.helpers({})

Template.foodIcon.rendered = function () {
  const buffTooltip = new Drop({
    target: Template.instance().$('.item-icon-container')[0],
    content: Template.instance().$('.food-tooltip-content')[0],
    openOn: 'hover',
    position: 'top left',
    remove: true
  });
}

Template.foodIcon.events({
})
