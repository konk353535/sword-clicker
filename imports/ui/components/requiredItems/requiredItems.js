import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Items } from '/imports/api/items/items.js';
import { Skills } from '/imports/api/skills/skills.js';

import './requiredItems.html';

Template.requiredItems.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();

  this.autorun(() => {
    let hasSkillRequirements = false;
    let hasItemRequirements = false;
    let hasConsumeItemRequirements = false;

    const requiredItems = this.data.requiredItems;

    if (!requiredItems) {
      return;
    }

    let notMet = false;
    const result = requiredItems.map((requiredItem) => {
      requiredItem.notMet = false;

      if (requiredItem.type === 'gold') {
        if (Meteor.user().gold < requiredItem.amount) {
          requiredItem.notMet = true;
          notMet = true;
        }
      } else if (requiredItem.type === 'skill') {
        const requiredSkill = Skills.findOne({ type: requiredItem.name });
        if (!requiredSkill || requiredSkill.level < requiredItem.level) {
          requiredItem.notMet = true;
          notMet = true;
        }
      } else {
        const hasItem = Items.findOne({ itemId: requiredItem.itemId });

        if (!hasItem) {
          requiredItem.notMet = true;
          notMet = true;
        } else if (hasItem.amount < requiredItem.amount) {
          requiredItem.notMet = true;
          notMet = true;
        }
      }

      if (requiredItem.type === 'skill') {
        hasSkillRequirements = true;
      } else {
        if (requiredItem.consumes) {
          hasConsumeItemRequirements = true;
        } else {
          hasItemRequirements = true;          
        }
      }

      return requiredItem;
    });

    this.state.set('hasSkillRequirements', hasSkillRequirements);
    this.state.set('hasItemRequirements', hasItemRequirements);
    this.state.set('hasConsumeItemRequirements', hasConsumeItemRequirements);
    this.state.set('computedRequiredItems', result);

    if (this.data.requirementsMet) {
      this.data.requirementsMet(!notMet);
    }
  });
});

Template.requiredItems.rendered = function () {
  const mineSpaceTooltip = new Drop({
    target: Template.instance().$('.required-items-container')[0],
    content: Template.instance().$('.required-items-tooltip')[0],
    openOn: 'hover',
    position: 'top left',
    remove: true
  });
}

Template.requiredItems.helpers({
  computedRequiredItems() {
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
})
