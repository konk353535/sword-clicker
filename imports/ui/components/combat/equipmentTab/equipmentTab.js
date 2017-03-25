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
  }, 1000);
}

Template.equipmentTab.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  this.state.set('tooltipsLoaded', false);

  this.autorun(() => {
    if (this.state.get('offenseStats') && this.state.get('defenseStats')) {
      if (!this.state.get('tooltipsLoaded')) {
        this.state.set('tooltipsLoaded', true);
        updateTooltips(this, ['attack', 'attackSpeed', 'accuracy', 'defense', 'health', 'armor']);
      }
    }
  });
});

Template.equipmentTab.rendered = function () {
  updateTooltips(Template.instance(), ['attackSkill', 'defenseSkill', 'healthSkill']);
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

  defenseStats() {
    const combat = Combat.findOne();
    if (!combat) {
      Template.instance().state.set('defenseStats', []);
    } else {
      Template.instance().state.set('defenseStats', [{
        name: 'health',
        icon: 'health',
        value: combat.health,
        maxValue: combat.maxHealth
      }, {
        name: 'defense',
        icon: 'defense',
        value: combat.defense
      }, {
        name: 'armor',
        icon: 'armor',
        value: combat.armor
      }]);
    }

    return Template.instance().state.get('defenseStats');
  },

  offenseStats() {
    const combat = Combat.findOne();
    if (!combat) {
      Template.instance().state.set('offenseStats', []);
    } else {
      Template.instance().state.set('offenseStats', [{
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
      }]);   
    }

    return Template.instance().state.get('offenseStats');
  }
});
