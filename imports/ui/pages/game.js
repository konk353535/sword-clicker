import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Session } from 'meteor/session';

import { Skills } from '/imports/api/skills/skills.js';
import { Items } from '/imports/api/items/items.js';

import './game.html';

Template.gamePage.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  this.state.set('depositAmount', 0);
  this.state.set('depositItem', {});
  this.state.set('withdrawAmount', 0);
  this.state.set('withdrawItem', {});
  this.state.set('gameItems', []);

  Meteor.call('games.itemsList', (err, res) => {
    if (res) {
      this.state.set('gameItems', res);
    }
  })
});

Template.gamePage.onDestroyed(function bodyOnDestroyed() {
});

Template.gamePage.events({
  'submit .deposit-form'(event, instance) {
    // Submitted
    event.preventDefault();

    const amount = parseInt(instance.state.get('depositAmount'));
    const item = instance.state.get('depositItem');

    Meteor.call('games.deposit', item._id, amount, (err, res) => {
      if (err) {
        toastr.error(err.reason);
      }
      if (res) {
        instance.state.set('gameItems', res);
      }
    });

    instance.$('.deposit-modal').modal('hide');
    instance.state.set('depositItem', {});
    instance.state.set('depositAmount', 0);
  },

  'keyup .deposit-amount-input'(event, instance) {
    let newValue = parseInt($(event.target).val());
    if (newValue && !isNaN(newValue)) {
      if (newValue > instance.state.get('depositItem').amount) {
        newValue = instance.state.get('depositItem').amount;
      }
      instance.state.set('depositAmount', parseInt(newValue));
    }
  },

  'keyup .withdraw-amount-input'(event, instance) {
    let newValue = parseInt($(event.target).val());
    if (newValue && !isNaN(newValue)) {
      if (newValue > instance.state.get('withdrawItem').amount) {
        newValue = instance.state.get('withdrawItem').amount;
      }
      instance.state.set('withdrawAmount', parseInt(newValue));
    }
  },

  'submit .withdraw-form'(event, instance) {
    // Submitted
    event.preventDefault();

    const amount = parseInt(instance.state.get('withdrawAmount'));
    const item = instance.state.get('withdrawItem');

    Meteor.call('games.withdraw', item._id, amount, (err, res) => {
      if (err) {
        toastr.error(err.reason);
      }
      if (res) {
        instance.state.set('gameItems', res);
      }
    });

    instance.$('.withdraw-modal').modal('hide');
    instance.state.set('withdrawItem', {});
    instance.state.set('withdrawAmount', 0);
  }
});

Template.gamePage.helpers({

  gameItems() {
    const instance = Template.instance();
    return instance.state.get('gameItems').map((item) => {
      item.primaryAction = {
        description: 'withdraw',
        item,
        method() {
          // Set count to max
          instance.$('.withdraw-modal').modal('show');
          instance.state.set('withdrawAmount', item.amount);
          const clonedItem = Object.assign({}, item, { primaryAction: {} });
          instance.state.set('withdrawItem', clonedItem);
          instance.$('.withdraw-amount-input').focus();
        }
      }
      return item;
    });
  },

  myItems() {
    const instance = Template.instance();
    return Items.find({
      equipped: false
    }).map((item) => {
      item.primaryAction = {
        description: 'deposit',
        item,
        method() {
          // Set count to max
          instance.$('.deposit-modal').modal('show');
          instance.state.set('depositAmount', item.amount);
          const clonedItem = Object.assign({}, item, { primaryAction: {} });
          instance.state.set('depositItem', clonedItem);
          instance.$('.deposit-amount-input').focus();
        }
      }
      return item;
    });
  },

  depositAmount() {
    return Template.instance().state.get('depositAmount');
  },

  depositItem() {
    return Template.instance().state.get('depositItem');
  },

  withdrawAmount() {
    return Template.instance().state.get('withdrawAmount');
  },

  withdrawItem() {
    return Template.instance().state.get('withdrawItem');
  }
});
