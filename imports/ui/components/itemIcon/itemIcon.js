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

Template.itemIcon.rendered = function () {
  const minerTooltip = new Drop({
    target: Template.instance().$('.item-icon-container')[0],
    content: Template.instance().$('.item-tooltip-content')[0],
    openOn: 'hover',
    position: 'top left',
    remove: true
  });
}

const sellItem = function (event, instance) {
  Template.instance().$('.sellModal').modal('hide');
  const itemData = instance.data.item;
  Meteor.call('items.sellItem', itemData._id, itemData.itemId, instance.state.get('sellAmount'));
}

Template.itemIcon.events({
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
      instance.state.set('sellAmount', instance.data.item.amount);
      Template.instance().$('.sellModal').modal('show');      
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
