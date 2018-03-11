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

