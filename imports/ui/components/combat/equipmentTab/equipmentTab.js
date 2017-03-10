import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Items } from '/imports/api/items/items.js';
import { Combat } from '/imports/api/combat/combat.js';
import { Skills } from '/imports/api/skills/skills.js';

import './equipmentTab.html';

Template.equipmentTab.onCreated(function bodyOnCreated() {
  Meteor.subscribe('combat');
});

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

  defenseSkill() {
    return Skills.findOne({
      type: 'defense'
    });
  },

  attackSkill() {
    return Skills.findOne({
      type: 'attack'
    });
  },

  healthSkill() {
    return Skills.findOne({
      type: 'defense'
    });
  },

  defenseStats() {
    const combat = Combat.findOne();
    if (!combat) {
      return [];
    }
    return [{
      name: 'health',
      icon: 'health',
      value: combat.maxHealth
    }, {
      name: 'defense',
      icon: 'defense',
      value: combat.defense
    }, {
      name: 'armor',
      icon: 'armor',
      value: combat.armor
    }]
  },

  offenseStats() {
    const combat = Combat.findOne();
    if (!combat) {
      return [];
    }
    return [{
      name: 'attack',
      icon: 'attack',
      value: combat.attack,
      maxValue: combat.attackMax
    }, {
      name: 'attack speed',
      icon: 'attackSpeed',
      value: combat.attackSpeed
    }, {
      name: 'accuracy',
      icon: 'accuracy',
      value: combat.accuracy
    }];
  }
});
