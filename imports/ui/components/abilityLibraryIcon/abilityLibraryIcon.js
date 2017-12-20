import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './abilityLibraryIcon.html';

let tooltip;
Template.abilityLibraryIcon.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

Template.abilityLibraryIcon.rendered = function () {
  if (!Template.instance().data.hideTooltip) {
    tooltip = tippy(Template.instance().$('.item-icon-container')[0],
        {
          html: Template.instance().$('.item-tooltip-content')[0],
          performance: true,
          animateFill: false,
          distance: 5
        })
  }
}

Template.abilityLibraryIcon.onDestroyed(function () {
  if (tooltip) {
    Template.instance().$('.item-icon-container')[0]._tippy.destroy();
  }
})

Template.abilityLibraryIcon.events({
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
    }
  }
})
