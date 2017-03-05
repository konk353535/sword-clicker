import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './requiredItems.html';

Template.requiredItems.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

Template.requiredItems.rendered = function () {
  const mineSpaceTooltip = new Drop({
    target: Template.instance().$('.required-items-container')[0],
    content: Template.instance().$('.required-items-tooltip')[0],
    openOn: 'hover',
    position: 'top left',
    remove: true
  });
}
