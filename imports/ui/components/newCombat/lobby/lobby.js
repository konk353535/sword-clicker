import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './lobby.html';
import '../lobbyUnit/lobbyUnit.js';

const TYPES = {
  solo: 'Solo',
  group: 'Tower',
  afk: 'Adventure',
}

import { Groups } from '/imports/api/groups/groups.js';
import { Items } from '/imports/api/items/items.js';
import { Combat } from '/imports/api/combat/combat.js';
import { Battles } from '/imports/api/battles/battles.js';

Template.lobbyPage.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();

  Meteor.subscribe('battles');

  this.state.set('type', 'solo');
});

Template.lobbyPage.events({
  'click .select-type'(event, instance) {
    const newType = instance.$(event.target).closest('.select-type').data('type');
    instance.state.set('type', newType);
  },

  'click .loadout-btn'(event, instance) {
    instance.data.setPage('loadout');
  },

  'click .recent-battles-btn'(event, instance) {
    instance.data.setPage('recentBattles');
  }

})

Template.lobbyPage.helpers({
  typeKey() {
    return Template.instance().state.get('type');
  },

  type() {
    return TYPES[Template.instance().state.get('type')];
  },

  recentBattles() {
    return Battles.find({}, {
      limit: 3,
      sort: {
        updatedAt: -1
      }
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

  currentGroupMembers() {
    const currentGroup = Groups.findOne({
      members: Meteor.userId()
    });

    let combats;
    if (currentGroup) {
      combats = Combat.find({
        owner: {
          $in: currentGroup.members
        }
      });
    } else {
      combats = Combat.find({
        owner: Meteor.userId()
      });
    }

    return combats.map((userCombat) => {
      // Map stuff we want to read into stats
      userCombat.stats = {
        health: userCombat.stats.health,
        healthMax: userCombat.stats.healthMax,
        energy: userCombat.stats.energy,
        energyMax: userCombat.stats.energyMax
      }

      userCombat.name = userCombat.username;
      userCombat.icon = userCombat.characterIcon || 'character.svg';

      return userCombat;
    });
  },
});
