import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Items } from '/imports/api/items/items.js';

import './equipmentTab.html';

Template.equipmentTab.helpers({
  combatItems() {
    return Items.find({ category: 'combat' })
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
      value: 10
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
