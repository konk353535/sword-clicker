import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './itemIcon.html';

Template.itemIcon.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

Template.itemIcon.helpers({
  totalPrice(amount, price) {
    return amount * price;
  },

  sellAmount() {
    const instance = Template.instance();
    return instance.state.get('sellAmount');
  }
})

Template.itemIcon.events({
  'click .icon-box'(event, instance) {
    instance.state.set('sellAmount', instance.data.item.amount);
    Template.instance().$('.sellModal').modal('show');
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
    Template.instance().$('.sellModal').modal('hide');
    Meteor.call('items.sellItem', instance.data.item.itemId, instance.state.get('sellAmount'));
  }
})
