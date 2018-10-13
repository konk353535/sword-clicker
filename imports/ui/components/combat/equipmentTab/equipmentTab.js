import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';

import { Items } from '/imports/api/items/items.js';
import { Combat } from '/imports/api/combat/combat.js';
import { Skills } from '/imports/api/skills/skills.js';
import { ReactiveDict } from 'meteor/reactive-dict';

import './equipmentTab.html';

const updateTooltips = function (instance, tooltipNames) {
  setTimeout(() => {
    tooltipNames.forEach((tooltipName) => {
      new Drop({
        target: instance.$(`.${tooltipName}-tooltip-container`)[0],
        content: instance.$(`.${tooltipName}-tooltip-content`)[0],
        openOn: 'hover',
        position: 'top left',
        remove: true
      });
    });
  }, 100);
};

Template.equipmentTab.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

Template.equipmentTab.rendered = function () {
  updateTooltips(Template.instance(), ['attackSkill', 'defenseSkill', 'healthSkill', 'magicSkill']);
};

Template.equipmentTab.helpers({
  unequippedCombatItems() {
    return Items.find({ category: 'combat', equipped: false, $or: [{hidden: {$exists: false}}, {hidden: false}] }).map((item) => {
      item.primaryAction = {
        description: 'equip',
        item,
        method() {
          Meteor.call('items.equip', this.item._id, this.item.itemId, (err, res) => {
            if (err) {
              toastr.warning(err.reason);
            }
          });
        }
      };
      return item;
    });
  },

  foodItems() {
    return Items.find({ category: 'food' }).map((item) => {
      item.primaryAction = {
        description: 'eat',
        item,
        method() {
          Meteor.call('items.eat', this.item._id, this.item.itemId);
        }
      };
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
          Meteor.call('items.unequip', this.item._id, this.item.itemId);
        }
      };
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
      type: 'health'
    });
  },

  magicSkill() {
    return Skills.findOne({
      type: 'magic'
    });
  },

  defenseStats() {
    const combat = Combat.findOne({
      owner: Meteor.userId()
    });
    if (!combat) {
      Template.instance().state.set('defenseStats', []);
    } else {
      Template.instance().state.set('defenseStats', [{
        name: 'health',
        icon: 'health.svg',
        value: combat.stats.health,
        maxValue: combat.stats.healthMax
      }, {
        name: 'defense',
        icon: 'defense.svg',
        value: combat.stats.defense
      }, {
        name: 'armor',
        icon: 'armor.svg',
        value: combat.stats.armor
      }, {
        name: 'magic armor',
        icon: 'magicArmor.svg',
        value: combat.stats.magicArmor
      }]);
    }

    return Template.instance().state.get('defenseStats');
  },

  offenseStats() {
    const combat = Combat.findOne({
      owner: Meteor.userId()
    });
    if (!combat) {
      Template.instance().state.set('offenseStats', []);
    } else {
      Template.instance().state.set('offenseStats', [{
        name: 'attack',
        icon: 'attack.svg',
        value: combat.stats.attack,
        maxValue: combat.stats.attackMax
      }, {
        name: 'attack speed',
        icon: 'attackSpeed.svg',
        value: combat.stats.attackSpeed
      }, {
        name: 'magic power',
        icon: 'magicPower.svg',
        value: combat.stats.magicPower
      }, {
        name: 'accuracy',
        icon: 'accuracy.svg',
        value: combat.stats.accuracy
      }]);   
    }

    return Template.instance().state.get('offenseStats');
  },

  characterIcon() {
    return Combat.findOne({
      owner: Meteor.userId()
    }).characterIcon || 'character.svg';
  }
});
