import { Session } from "meteor/session";
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { BUFFS } from '/imports/constants/buffs/index.js';

import { getBuffLevel } from '/imports/api/globalbuffs/globalbuffs.js';

import './abilityIconOther.html';

let tooltip;
Template.abilityIconOther.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

Template.abilityIconOther.helpers({
  name() {
    const instance = Template.instance();
    
    return `${instance.data.ability.name} (${instance.data.ability.level})`;
  },
  
  description() {
    const instance = Template.instance();
    
    if (instance.data.ability.description !== undefined) {
      if (_.isFunction(instance.data.ability.description)) {
        return instance.data.ability.description({ buff: BUFFS[instance.data.ability.abilityId], level: instance.data.ability.level, townBuffLevel: getBuffLevel('town_armory') });
      }
      return instance.data.ability.description;
    }
    
    return false;
  },
  
  needsIcons() {
    const instance = Template.instance();
    
    if (instance.data.ability.isPacifist) {
      return true;
    }
    if (instance.data.ability.requires) {
      return true;
    }
    if (instance.data.ability.cantUseWith) {
      return true;
    }
    
    return false;
  }
});


Template.abilityIconOther.rendered = function () {
  if (!Template.instance().data.hideTooltip) {
    const vm = this;
    vm.state.set('tooltipOpen', false);
    tooltip = tippy(Template.instance().$('.item-icon-container')[0],
        {
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

Template.abilityIconOther.onDestroyed(function () {
  if (tooltip) {
    const tooltipInstance = Template.instance().$('.item-icon-container')[0];
    if (tooltipInstance && tooltipInstance.hasOwnProperty('_tippy')) {
      tooltipInstance._tippy.destroy();
    }
  }
});

Template.abilityIconOther.events({
  'click .icon-box'(event, instance) {
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
  }
});
