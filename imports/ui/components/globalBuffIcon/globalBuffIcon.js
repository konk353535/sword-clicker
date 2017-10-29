import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './globalBuffIcon.html';

Template.globalBuffIcon.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

Template.globalBuffIcon.helpers({
})

Template.globalBuffIcon.rendered = function () {
  const buffTooltip = new Drop({
    target: Template.instance().$('.buff-icon-container')[0],
    content: Template.instance().$('.buff-tooltip-content')[0],
    openOn: 'hover',
    position: 'top left',
    remove: true
  });
}

Template.globalBuffIcon.events({
})
