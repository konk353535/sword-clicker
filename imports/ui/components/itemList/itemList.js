import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import moment from 'moment';
import _ from 'underscore';

import './itemList.html';

Template.itemList.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

Template.itemList.events({
})

Template.itemList.helpers({

  visibleItems() {
    const instance = Template.instance();

    return instance.data.items.filter((item) => {
      return !item.hidden;
    });
  },

  hiddenItems() {
    const instance = Template.instance();

    return instance.data.items.filter((item) => {
      return item.hidden;
    });
  },
});
