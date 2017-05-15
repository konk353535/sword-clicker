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
}

Template.equipmentTab.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  this.state.set('tooltipsLoaded', false);

  this.autorun(() => {
    if (this.state.get('offenseStats') && this.state.get('defenseStats')) {
      if (!this.state.get('tooltipsLoaded')) {
        this.state.set('tooltipsLoaded', true);
        updateTooltips(this, ['attack', 'attackSpeed', 'accuracy', 'defense', 'health', 'armor', 'magicPower']);
      }
    }
  });
});

Template.equipmentTab.rendered = function () {
  updateTooltips(Template.instance(), ['attackSkill', 'defenseSkill', 'healthSkill', 'magicSkill']);
}

Template.equipmentTab.helpers({
  unequippedCombatItems() {
    return Items.find({ category: 'combat', equipped: false }).map((item) => {
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
      }
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
          Meteor.call('items.unequip', this.item._id, this.item.itemId);
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
        icon: 'health',
        value: combat.stats.health,
        maxValue: combat.stats.healthMax
      }, {
        name: 'defense',
        icon: 'defense',
        value: combat.stats.defense
      }, {
        name: 'armor',
        icon: 'armor',
        value: combat.stats.armor
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
        icon: 'attack',
        value: combat.stats.attack,
        maxValue: combat.stats.attackMax
      }, {
        name: 'attack speed',
        icon: 'attackSpeed',
        value: combat.stats.attackSpeed
      }, {
        name: 'magic power',
        icon: 'magicPower',
        value: combat.stats.magicPower
      }, {
        name: 'accuracy',
        icon: 'accuracy',
        value: combat.stats.accuracy
      }]);   
    }

    return Template.instance().state.get('offenseStats');
  }
});
