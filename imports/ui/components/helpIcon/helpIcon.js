import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './helpIcon.html';

Template.helpIcon.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

Template.helpIcon.rendered = function () {
  const helpTooltip = new Drop({
    target: Template.instance().$('.help-icon-container')[0],
    content: Template.instance().$('.help-tooltip-content')[0],
    openOn: 'hover',
    position: 'top left',
    remove: true
  });
};
