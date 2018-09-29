import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { ReactiveDict } from 'meteor/reactive-dict';
import { Items } from '/imports/api/items/items.js';

import './consumables.html';

Template.consumablesPage.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

Template.consumablesPage.events({
  'click .back-to-lobby-btn'(event, instance) {
    instance.data.setPage('lobby');
  }
})

Template.consumablesPage.helpers({
  foodItems() {
    return Items.find({
      category: 'food'
    }).map((item) => {
      item.primaryAction = {
        description: 'eat',
        item,
        method() {
          Meteor.call('items.eat', this.item._id, this.item.itemId);
        }
      }
      return item;
    });
  },
});
