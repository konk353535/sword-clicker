import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { determineRequiredItems } from '/imports/ui/utils.js';

import { CInt } from '/imports/utils';

import './requiredItemsList.html';

let tooltip;
const fetchRequiredItems = function (instance) {
  let recipeName = instance.data.recipeName;
  const requiredItems = instance.data.requiredItems;

  if (!requiredItems && !recipeName) {
    return;
  }

  const result = determineRequiredItems({
    required: requiredItems
  });

  instance.state.set('hasSkillRequirements', result.hasSkillRequirements);
  instance.state.set('hasItemRequirements', result.hasItemRequirements);
  instance.state.set('hasConsumeItemRequirements', result.hasConsumeItemRequirements);
  instance.state.set('computedRequiredItems', result.recipeItems);

  if (instance.data.requirementsMet) {
    instance.data.requirementsMet(!result.notMet);
  }
};

Template.requiredItemsList.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();

  this.autorun(() => {
    fetchRequiredItems(this);
  });
});

Template.requiredItemsList.rendered = function () {
  if (!Template.instance().data.hideTooltip) {
    const target = Template.instance().$('.required-items-container')[0];
    if (target) {
      tooltip = new Drop({
        target,
        content: Template.instance().$('.required-items-tooltip')[0],
        openOn: 'hover',
        position: 'top left',
        remove: true
      });
    }
  }
};

Template.requiredItemsList.onDestroyed(function () {
  if (tooltip && tooltip.target) {
    tooltip.destroy();
  }
});

Template.requiredItemsList.helpers({
  computedRequiredItems() {
    fetchRequiredItems(Template.instance());
    return Template.instance().state.get('computedRequiredItems');
  },

  hasConsumeItemRequirements() {
    return Template.instance().state.get('hasConsumeItemRequirements');
  },

  hasItemRequirements() {
    return Template.instance().state.get('hasItemRequirements');
  },

  hasSkillRequirements() {
    return Template.instance().state.get('hasSkillRequirements');
  },
  
  betterDuration() {
    const inst = Template.instance();
    if (inst && inst.data && CInt(inst.data.duration) > 0) {
      const duration = CInt(inst.data.duration);
      
      const seconds = duration % 60;
      const minutes = Math.floor(duration / 60) % 60;
      const hours = Math.floor(duration / (60 * 60)) % 24;
      const days = Math.floor(duration / (24 * 60  * 60));
      
      if (days > 0) {
        return `${days}d${hours}h`;
      } else if (hours > 0) {
        return `${hours}h${minutes}m`;
      } else if (minutes > 0) {
        return `${minutes}m${seconds}s`;
      } else {
        return `${seconds}s`;
      }
    }
    return false;
  }
});
