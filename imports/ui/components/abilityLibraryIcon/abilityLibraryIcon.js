import { Session } from "meteor/session";
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './abilityLibraryIcon.html';


let tooltip;
Template.abilityLibraryIcon.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

Template.abilityLibraryIcon.rendered = function () {
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

Template.abilityLibraryIcon.onDestroyed(function () {
  if (tooltip) {
    const tooltipInstance = Template.instance().$('.item-icon-container')[0];
    if (tooltipInstance && tooltipInstance.hasOwnProperty('_tippy')) {
      tooltipInstance._tippy.destroy();
    }
  }
});

Template.abilityLibraryIcon.events({
  'click .icon-box'(event, instance) {

    if ($('body').hasClass('targetting-item')) {
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
    }
  }
});
