import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Session } from 'meteor/session';

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
  
  'click .multiHideStart'(event, instance) {
    Session.set('multiHide', true);
    Session.set('multiHideItems', {});
  },

  'click .multiHideCancel'(event, instance) {
    Session.set('multiHide', false);
    Session.set('multiHideItems', {});
  },

  'click .multiHideConfirm'(event, instance) {
    Session.set('multiHide', false);
    const items = Session.get('multiHideItems');
    Object.keys(items).forEach((item) => {
      Meteor.call('items.hide', items[item].id, items[item].itemId, items[item].amount);
    });
    Session.set('multiHideItems', {});
  },
  
  'click .multiShowStart'(event, instance) {
    Session.set('multiShow', true);
    Session.set('multiShowItems', {});
  },

  'click .multiShowCancel'(event, instance) {
    Session.set('multiShow', false);
    Session.set('multiShowItems', {});
  },
  
  'click .multiShowConfirm'(event, instance) {
    Session.set('multiShow', false);
    const items = Session.get('multiShowItems');
    Object.keys(items).forEach((item) => {
      Meteor.call('items.hide', items[item].id, items[item].itemId, items[item].amount);
    });
    Session.set('multiShowItems', {});
  },
});

Template.itemList.helpers({

  sellItems() {
    return Session.get('multiSell');
  },
  
  showItems() {
    return Session.get('multiShow');
  },

  hideItems() {
    return Session.get('multiHide');
  },
  
  allItems() {
    const instance = Template.instance();

    return instance.data.items;
  },

  visibleItems() {
    const instance = Template.instance();

    const items = instance.data.items.filter((item) => {
      return !item.hidden;
    });
    
    if (items && items.length > 0) {
      return items;
    }
    return false;
  },

  hiddenItems() {
    const instance = Template.instance();

    const items = instance.data.items.filter((item) => {
      return item.hidden;
    });
    
    if (items && items.length > 0) {
      return items;
    }
    return false;
  },
});
