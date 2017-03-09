import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Items } from '/imports/api/items/items.js';

import './equipmentTab.html';

Template.equipmentTab.helpers({
  unequippedCombatItems() {
    return Items.find({ category: 'combat', equipped: false }).map((item) => {
      item.primaryAction = {
        description: 'equip',
        item,
        method() {
          Meteor.call('items.equip', this.item.itemId);
        }
      }
      return item;
    });
  },

  equippedItemsMap() {
    const equippedItems = Items.find({
      category: 'combat',
      equipped: true
    }).map((item) => {
      item.hideCount = true;
      item.primaryAction = {
        description: 'unequip',
        item,
        method() {
          Meteor.call('items.unequip', this.item.itemId);
        }
      }
      return item;
    });

    const equippedMap = {};
    equippedItems.forEach((item) => {
      equippedMap[item.slot] = item;
    });

    return equippedMap;
  },

  defenseStats() {
    return [{
      name: 'health',
      icon: 'health',
      value: 10
    }, {
      name: 'defense',
      icon: 'defense',
      value: 10
    }, {
      name: 'armor',
      icon: 'armor',
      value: 10
    }]
  },

  offenseStats() {
    return [{
      name: 'attack',
      icon: 'attack',
      value: 10,
      maxValue: 15
    }, {
      name: 'attack speed',
      icon: 'attackSpeed',
      value: 10
    }, {
      name: 'accuracy',
      icon: 'accuracy',
      value: 10
    }];
  }
});
