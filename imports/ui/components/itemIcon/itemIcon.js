import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './itemIcon.html';

Template.itemIcon.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

Template.itemIcon.events({
});

Template.itemIcon.rendered = function () {
  $(function () {
    $('[data-toggle="popover"]').popover({
      trigger: 'hover'
    });
  });
};
