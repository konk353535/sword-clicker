import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Session } from 'meteor/session';

import moment from 'moment';
import _ from 'underscore';

import './itemList.html';

Template.itemList.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

Template.itemList.events({
  'click .multiSellStart'(event, instance) {
    Session.set('multiSell', true);
    Session.set('multiSellItems', {});
  },

  'click .multiSellConfirm'(event, instance) {
    instance.$('.confirmSellModal').modal('show');
  },

  'click .multiSellCancel'(event, instance) {
    Session.set('multiSell', false);
    Session.set('multiSellItems', {});
  },

  'click .modalButtonConfirm'(event, instance) {
    instance.$('.confirmSellModal').modal('hide');
    Session.set('multiSell', false);
    const items = Session.get('multiSellItems');
    Object.keys(items).forEach((item) => {
      Meteor.call('items.sellItem', items[item].id, items[item].itemId, items[item].amount);
    });
    Session.set('multiSellItems', {});
  },

  'click .modalButtonCancel'(event, instance) {
    instance.$('.confirmSellModal').modal('hide');
  },
});

Template.itemList.helpers({

  sellItems() {
    return Session.get('multiSell');
  },

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
