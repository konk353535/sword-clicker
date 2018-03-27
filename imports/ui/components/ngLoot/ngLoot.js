import {Meteor} from "meteor/meteor";
import {Template} from "meteor/templating";
import { ReactiveDict } from 'meteor/reactive-dict';

import './ngLoot.html';

let tooltip;

Template.ngLoot.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

Template.ngLoot.rendered = function () {
  if (!Template.instance().data.hideTooltip) {
    tooltip = tippy(Template.instance().$('.ng-help-icon-container')[0],
        {
          theme: "custom",
          html: Template.instance().$('.item-tooltip-content')[0],
          performance: true,
          animateFill: false,
          distance: 5
        })
  }
};

Template.ngLoot.onDestroyed(function () {
  if (tooltip) {
    const tooltipInstance = Template.instance().$('.item-icon-container')[0];
    if (tooltipInstance && tooltipInstance.hasOwnProperty('_tippy')) {
      tooltipInstance._tippy.destroy();
    }
  }
});

Template.ngLoot.events({
  'click .ng-selector-need'(event, instance) {
    const target = $(event.currentTarget);
    Meteor.call('combat.clickedNeedGreed', target.data('loot-id'), 'need');
  },

  'click .ng-selector-greed'(event, instance) {
    const target = $(event.currentTarget);
    Meteor.call('combat.clickedNeedGreed', target.data('loot-id'), 'greed');
  }
});
