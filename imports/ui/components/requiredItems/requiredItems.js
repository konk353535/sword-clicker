import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Items } from '/imports/api/items/items.js';
import { Skills } from '/imports/api/skills/skills.js';

import './requiredItems.html';

Template.requiredItems.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
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
    const instance = Template.instance();
    const requiredItems = instance.data.requiredItems;
    instance.state.set('hasSkillRequirements', false);
    instance.state.set('hasItemRequirements', false);
    instance.state.set('hasConsumeItemRequirements', false);

    if (!requiredItems) {
      return;
    }

    let notMet = false;
    const result = requiredItems.map((requiredItem) => {
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
        instance.state.set('hasSkillRequirements', true);
      } else {
        if (requiredItem.consumes) {
          instance.state.set('hasConsumeItemRequirements', true);
        } else {
          instance.state.set('hasItemRequirements', true);          
        }
      }

      return requiredItem;
    });

    if (instance.data.requirementsMet) {
      instance.data.requirementsMet(!notMet);
    }

    return result;
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
