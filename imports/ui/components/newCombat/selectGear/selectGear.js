import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Items } from '/imports/api/items/items.js';
import { Combat } from '/imports/api/combat/combat.js';

import './selectGear.html';

Template.selectGearPage.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

Template.selectGearPage.events({
  'click .back-to-loadout-btn'(event, instance) {
    instance.data.setPage('loadout');
  }
})

Template.selectGearPage.helpers({

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


  slotsMap() {
    const slots = ['mainHand', 'offHand', 'head', 'neck', 'chest', 'legs'];
    const slotsMap = {};

    slots.forEach((slot) => {
      slotsMap[slot] = Items.find({ category: 'combat', slot, equipped: false }).map((item) => {
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
    });

    return slotsMap;
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
  }
});

