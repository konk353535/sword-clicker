import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Session } from 'meteor/session';
import _ from 'underscore';

import './itemIcon.html';

let tooltip;

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
  },

  showSellModal() {
    const instance = Template.instance();
    return instance.state.get('showSellModal');
  },

  showUseModal() {
    const instance = Template.instance();
    return instance.state.get('showUseModal');
  },

  multiSelling() {
    const instance = Template.instance();
    let selling = false;
    if(!_.isUndefined(Session.get('multiSellItems'))) {
      selling = Session.get('multiSellItems').hasOwnProperty(instance.data.item._id);
    }
    return selling;
  }
});

Template.itemIcon.rendered = function () {
  if (!Template.instance().data.hideTooltip) {
    const vm = this;
    vm.state.set('tooltipOpen', false);
    tooltip = tippy(Template.instance().$('.item-icon-container')[0],
        {
          html: Template.instance().$('.item-tooltip-content')[0],
          performance: true,
          animateFill: false,
          distance: 5,
          onHide: function() {
            vm.state.set('tooltipOpen', false);
          }
        })
  }
};

Template.itemIcon.onDestroyed(function () {
  if (tooltip) {
    const tooltipInstance = Template.instance().$('.item-icon-container')[0];
    if (tooltipInstance && tooltipInstance.hasOwnProperty('_tippy')) {
      tooltipInstance._tippy.destroy();
    }
  }
});

const sellItem = function (event, instance) {
  if (instance.data.hideTooltip) return;

  Template.instance().$('.sellModal').modal('hide');
  Template.instance().$('.useModal').modal('hide');

  const itemData = instance.data.item;
  Meteor.call('items.sellItem', itemData._id, itemData.itemId, instance.state.get('sellAmount'));
};

const hideItem = function (event, instance) {

  Template.instance().$('.sellModal').modal('hide');
  Template.instance().$('.useModal').modal('hide');

  const itemData = instance.data.item;

  Meteor.call('items.hide', itemData._id);
};

Template.itemIcon.events({
  'click .icon-box'(event, instance) {

    if ($('body').hasClass('targetting-item')) {
      return;
    }

    if(Session.get('multiSell')) {
      let currentItems = Session.get('multiSellItems');
      if(currentItems.hasOwnProperty(instance.data.item._id)) {
        delete currentItems[instance.data.item._id];
      } else {
        currentItems[instance.data.item._id] = {
          id: instance.data.item._id,
          itemId: instance.data.item.itemId,
          amount: instance.data.item.amount
        };
      }
      Session.set('multiSellItems', currentItems);
      return;
    }

    if(Session.get('tooltipInput') === 'touch') {
      if (!Template.instance().data.hideTooltip) {
        if (instance.state.get('tooltipOpen')) {
          // close tooltip
          let tooltipInstance = Template.instance().$('.item-icon-container')[0];
          if (tooltipInstance) {
            tooltipInstance._tippy.hide();
            instance.state.set('tooltipOpen', false);
          }
        } else {
          // open tooltip
          let tooltipInstance = Template.instance().$('.item-icon-container')[0];
          if (tooltipInstance) {
            tooltipInstance._tippy.show();
            instance.state.set('tooltipOpen', true);
          }
          return;
        }
      }
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
      if (shiftAction) {
        instance.state.set('showUseModal', true);
        Meteor.setTimeout(() => {
          instance.$('.useModal').modal('show');
        }, 10);
      } else {
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
  },

  'click .use-btn'(event, instance) {

    Template.instance().$('.useModal').modal('hide');

    const shiftAction = instance.data.item.shiftAction;

    if(shiftAction) {
      shiftAction.method();
    }
  },

  'click .hide-btn'(event, instance) {
    hideItem(event, instance);
  }
})
