import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Session } from 'meteor/session';

import './itemIcon.html';

Template.itemIcon.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();

  this.state.set('quickSelling', false);
});

Template.itemIcon.helpers({
  totalPrice(amount, price) {
    return amount * price;
  },

  sellAmount() {
    const instance = Template.instance();
    return instance.state.get('sellAmount');
  },

  showSellModal() {
    const instance = Template.instance();
    return instance.state.get('showSellModal');
  },

  quickSelling() {
    const instance = Template.instance();
    return instance.state.get('quickSelling');
  }
})

const sellItem = function (event, instance) {
  if (instance.data.hideTooltip) return;

  Template.instance().$('.sellModal').modal('hide');
  const itemData = instance.data.item;
  if (instance.state.get('quickSelling')) {
    Session.set('instaSellDateTo', moment().add(10, 'seconds').toDate());
    toastr.error('Quick selling enabled for 10 seconds!');
    Meteor.setTimeout(() => {
      const instaSellDateTo = Session.get('instaSellDateTo');
      if (instaSellDateTo && moment().isAfter(instaSellDateTo)) {
        toastr.success('Quick selling is now disabled');
        Session.set('instaSellDateTo', undefined);
      }
    }, 11000)
  }
  Meteor.call('items.sellItem', itemData._id, itemData.itemId, instance.state.get('sellAmount'));
}


Template.itemIcon.events({

  'click .toggle-quick-selling'(event, instance) {
    instance.state.set('quickSelling', !instance.state.get('quickSelling'));
    if (instance.state.get('quickSelling')) {
      toastr.error('Warning you have enabled quick selling!');
    }
  },

  'click .icon-box'(event, instance) {

    if ($('body').hasClass('targetting-item')) {
      return;
    }

    const primaryAction = instance.data.item.primaryAction;
    const shiftAction = instance.data.item.shiftAction;
    const shiftKey = window.event ? window.event.shiftKey : event.originalEvent.shiftKey;
    
    if (shiftKey) {
      shiftAction.method();      
    } else if (primaryAction) {
      primaryAction.method();
    } else {
      const instaSellDateTo = Session.get('instaSellDateTo');
      if (instaSellDateTo && moment().isBefore(instaSellDateTo)) {
        Meteor.call('items.sellItem', instance.data.item._id, instance.data.item.itemId, instance.data.item.amount);
      } else {
        instance.state.set('sellAmount', instance.data.item.amount);
        instance.state.set('showSellModal', true);
        Meteor.setTimeout(() => {
          instance.$('.sellModal').modal('show');
        }, 10);
      }
    }
  },

  'submit .sell-form'(event, instance) {
    sellItem(event, instance);
  },

  'keyup .sell-amount-input'(event, instance) {
    let newValue = parseInt($(event.target).val());
    if (newValue && !isNaN(newValue)) {
      if (newValue > instance.data.item.amount) {
        newValue = instance.data.item.amount;
      }
      instance.state.set('sellAmount', parseInt(newValue));
    }
  },

  'click .sell-btn'(event, instance) {
    sellItem(event, instance);
  }
})
