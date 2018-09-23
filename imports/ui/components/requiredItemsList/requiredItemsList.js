import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { determineRequiredItems } from '/imports/ui/utils.js';

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
  }
});
