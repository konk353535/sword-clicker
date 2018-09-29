import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './buffIcon.html';

Template.buffIcon.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

Template.buffIcon.helpers({})

Template.buffIcon.rendered = function () {
  const buffTooltip = new Drop({
    target: Template.instance().$('.buff-icon-container')[0],
    content: Template.instance().$('.buff-tooltip-content')[0],
    openOn: 'hover',
    position: 'top left',
    remove: true
  });
}

Template.buffIcon.events({
})
