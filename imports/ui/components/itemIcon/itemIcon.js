import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Session } from 'meteor/session';
import _ from 'underscore';
import { ITEMS, ITEM_RARITIES } from '/imports/constants/items/index.js';
import { WOODCUTTING } from '/imports/constants/woodcutting/index.js';
import { BUFFS } from '/imports/constants/buffs/index.js';

import { applyRarities } from '/imports/api/items/items.js';

import './itemIcon.html';

let tooltip;

Template.itemIcon.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

Template.itemIcon.helpers({
  totalPrice(amount, price) {
    return amount * price;
  },

  icon() {
    const instance = Template.instance();
    const constants = ITEMS[instance.data.item.itemId];

    if (instance.data.item.icon) {
      return instance.data.item.icon;
    }

    if (constants && constants.icon)
        return constants.icon;
        
    return false;
  },

  description() {
    const instance = Template.instance();
    
    if (instance.data.item.description !== undefined)
        return instance.data.item.description;
    
    const constants = ITEMS[instance.data.item.itemId];
    
    if (constants) {
      if (_.isFunction(constants.description)) {
        return constants.description();
      }
    }
    return false;
  },
  
  itemDescription() {
    const instance = Template.instance();
    const constants = ITEMS[instance.data.item.itemId];
    
    if (constants) {
      if (constants.description && !_.isFunction(constants.description)) {
        return constants.description;
      }
    }
    return false;
  },

  
  abilityRequiresOrForbids() {
    const instance = Template.instance();
    
    if (instance.data.item.abilityId) {
      return (instance.data.item.requires || instance.data.item.cantUseWith);
    }
    return false;
  },

  
  abilityRequires() {
    const instance = Template.instance();
    
    if (instance.data.item.abilityId) {
      if (instance.data.item.requires) {
        return instance.data.item.requires;
      }
    }
    return false;
  },

  abilityForbids() {
    const instance = Template.instance();
    
    if (instance.data.item.abilityId) {
      if (instance.data.item.cantUseWith) {
        return instance.data.item.cantUseWith;
      }
    }
    return false;
  },

  enchantments() {
    const instance = Template.instance();
    const item = instance.data.item;
    const constants = ITEMS[instance.data.item.itemId];

    if (!constants || !constants.enchantments) {
      return false;
    }

    return constants.enchantments.map((buffId) => {
      return BUFFS[buffId].description();
    });
  },

  amuletLevel() {
    const instance = Template.instance();
    const item = instance.data.item;
    
    if (_.contains(['jade_amulet','lapislazuli_amulet','sapphire_amulet','emerald_amulet','ruby_amulet','tanzanite_amulet','fireopal_amulet'], item.itemId)) {
      if (item.extraStats && item.extraStats.level) {
        return ` (Lv.${item.extraStats.level+1})`;
      }
      return " (Lv.1)";
    }
    
    return "";
  },
  
  rarity() {
    const instance = Template.instance();
    const item = instance.data.item;
    
    if (item.rarityId) {
      if (ITEM_RARITIES[item.rarityId]) {
        return { rare: true, label: ITEM_RARITIES[item.rarityId].label, color: ITEM_RARITIES[item.rarityId].color };
      }
    }
    
    return { rare: false, label: '', color: '000' };
  },
  
  stats() {
    const instance = Template.instance();
    const item = instance.data.item;
    if (!item) {
      return false;
    }
    
    const constants = (item.itemId) ? ITEMS[item.itemId] : undefined;
    const statsObj = (constants && constants.stats) ? applyRarities(constants.stats, item.rarityId) : applyRarities(item.stats, item.rarityId);
    const extraStats = (item.extraStats) ? applyRarities(item.extraStats, item.rarityId) : undefined;

    if (extraStats) {
      Object.keys(extraStats).forEach((statName) => {
        if (statsObj[statName]) {
          statsObj[statName] += extraStats[statName];
        }
      });
    }

    return statsObj;
  },

  constants() {
    const instance = Template.instance();
    let consts;
    
    if (instance.data.item.woodcutterId !== undefined)
        if (WOODCUTTING.woodcutters[instance.data.item.woodcutterId] !== undefined)
            consts = WOODCUTTING.woodcutters[instance.data.item.woodcutterId];

    if (consts === undefined)
        consts = ITEMS[instance.data.item.itemId];
    
    if (consts === undefined)
        return instance.data.item;
    
    if (consts.name === undefined) 
        consts.name = '';
    if (consts.description === undefined) 
        consts.description = '';
    if (consts.stats === undefined) 
        consts.stats = {};
    if (consts.enchantments === undefined) 
        consts.enchantments = [];
    
    return consts;
  },

  sellAmount() {
    const instance = Template.instance();
    return instance.state.get('sellAmount');
  },

  showSellModal() {
    const instance = Template.instance();
    return instance.state.get('showSellModal');
  },
  
  donateAmount() {
    const instance = Template.instance();
    return instance.state.get('donateAmount');
  },

  donateAmountMaxFormatted() {
    const instance = Template.instance();
    return `You have: ${CInt(instance.state.get('donateAmountMax')).toLocaleString()}`;
  },

  showDonateModal() {
    const instance = Template.instance();
    return instance.state.get('showDonateModal');
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
  },
  
  multiShowing() {
    const instance = Template.instance();
    let showing = false;
    if(!_.isUndefined(Session.get('multiShowItems'))) {
      showing = Session.get('multiShowItems').hasOwnProperty(instance.data.item._id);
    }
    return showing;
  },
  
  multiHiding() {
    const instance = Template.instance();
    let hiding = false;
    if(!_.isUndefined(Session.get('multiHideItems'))) {
      hiding = Session.get('multiHideItems').hasOwnProperty(instance.data.item._id);
    }
    return hiding;
  },
  
  scaledCooldownVal() {
    const instance = Template.instance();
    
    if (BUFFS && BUFFS[instance.data.item.abilityId] && BUFFS[instance.data.item.abilityId].scaledCooldown) {
      return BUFFS[instance.data.item.abilityId].scaledCooldown(instance.data.item);
    } else if (instance.data.item && instance.data.item.scaledCooldown) {
      return instance.data.item.scaledCooldown(instance.data.item);
    }
    
    return false;
  }
});

Template.itemIcon.rendered = function () {
  if (!Template.instance().data.hideTooltip) {
    const vm = this;
    vm.state.set('tooltipOpen', false);
    tooltip = tippy(Template.instance().$('.item-icon-container')[0], {
      appendTo: Template.instance().$('.item-icon-container')[0].parentNode,
      popperOptions: {
        modifiers: {
          preventOverflow: {
            enabled: true
          },
          hide: {
            enabled: false
          }
        }
      },
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

const donateItem = function (event, instance) {
  if (instance.data.hideTooltip) return;

  Template.instance().$('.donateModal').modal('hide');
  Template.instance().$('.useModal').modal('hide');

  const itemData = instance.data.item;
  Meteor.call('town.donateItem', itemData._id, itemData.itemId, instance.state.get('donateAmount'), itemData.donateSection);
};

const hideItem = function (event, instance) {

  Template.instance().$('.sellModal').modal('hide');
  Template.instance().$('.useModal').modal('hide');

  const itemData = instance.data.item;

  Meteor.call('items.hide', itemData._id);
};

Template.itemIcon.events({
  'click .icon-box'(event, instance) {

    if (Template.instance().data.readOnly) {
      return;
    }

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

    if(Session.get('multiShow')) {
      let currentItems = Session.get('multiShowItems');
      if(currentItems.hasOwnProperty(instance.data.item._id)) {
        delete currentItems[instance.data.item._id];
      } else {
        currentItems[instance.data.item._id] = {
          id: instance.data.item._id,
          itemId: instance.data.item.itemId,
          amount: instance.data.item.amount
        };
      }
      Session.set('multiShowItems', currentItems);
      return;
    }

    if(Session.get('multiHide')) {
      let currentItems = Session.get('multiHideItems');
      if(currentItems.hasOwnProperty(instance.data.item._id)) {
        delete currentItems[instance.data.item._id];
      } else {
        currentItems[instance.data.item._id] = {
          id: instance.data.item._id,
          itemId: instance.data.item.itemId,
          amount: instance.data.item.amount
        };
      }
      Session.set('multiHideItems', currentItems);
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

    if (instance.data.item.donateMode) {
      instance.state.set('donateAmount', 1 /* instance.data.item.amount */); // allow them to donate as many as they want, but only default to 1 of them
      instance.state.set('donateAmountMax', instance.data.item.amount);
      instance.state.set('showDonateModal', true);
      Meteor.setTimeout(() => {
        instance.$('.donateModal').modal('show');
      }, 10);
    } else {
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
  
  'submit .donate-form'(event, instance) {
    donateItem(event, instance);
  },

  'keyup .donate-amount-input'(event, instance) {
    let newValue = parseInt($(event.target).val());
    if (newValue && !isNaN(newValue)) {
      if (newValue > instance.data.item.amount) {
        newValue = instance.data.item.amount;
      }
      instance.state.set('donateAmount', parseInt(newValue));
    }
  },

  'click .donate-btn'(event, instance) {
    donateItem(event, instance);
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
});
