import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './recipeIcon.html';

Template.recipeIcon.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

Template.recipeIcon.rendered = function () {
  const iconTooltip = new Drop({
    target: Template.instance().$('.recipe-container')[0],
    content: Template.instance().$('.recipe-tooltip-content')[0],
    openOn: 'hover',
    position: 'top left',
    remove: true
  });
}
