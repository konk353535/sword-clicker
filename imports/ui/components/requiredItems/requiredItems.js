import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Items } from '/imports/api/items/items.js';

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

    if (!requiredItems) {
      return;
    }

    let notMet = false;
    const result = requiredItems.map((requiredItem) => {
      const hasItem = Items.findOne({ itemId: requiredItem.itemId });

      if (!hasItem) {
        requiredItem.notMet = true;
        notMet = true;
      } else if (hasItem.amount < requiredItem.amount) {
        requiredItem.notMet = true;
        notMet = true;
      }

      return requiredItem;
    });

    if (instance.data.requirementsMet) {
      instance.data.requirementsMet(!notMet);
    }

    return result;
  }
})
