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

  this.state.set('userSuggestions', []);
  this.state.set('type', 'group');
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
  },

  'click .other-battlers-btn'(event, instance) {
    instance.data.setPage('otherBattlers');
  },

  'keydown #name'(event, instance) {
    // Get value from form element
    const text = instance.$('#name').val();
    Meteor.call('users.search', text, (err, res) => {
      instance.state.set('userSuggestions', res.map(user => user.username));
    });
  },

  'submit .group-invite'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const text = Template.instance().$('#name').val();
 
    // Send invite request
    Meteor.call('groups.invite', text, (err, res) => {
      if (err) {
        toastr.warning(err.reason);
      }
    });
 
    // Clear input
    Template.instance().$('#name').val('');
  }
})

Template.lobbyPage.rendered = function () {
  Meteor.typeahead.inject();
}

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

  isLeader() {
    const currentGroup = Groups.findOne({
      members: Meteor.userId()
    });

    if (!currentGroup) {
      return true;
    }

    return currentGroup.leader === Meteor.userId()
  },

  search(query, sync, callback) {
    Meteor.call('users.search', query, {}, function(err, res) {
      if (err) {
        console.log(err);
        return;
      }
      callback(res.map(function(v){ return {value: v.username}; }));
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
      }).fetch();

      if (currentGroup.invitesDetails && currentGroup.invitesDetails.length > 0) {
        combats = combats.concat(currentGroup.invitesDetails.map((invitee) => {
          invitee.isInvitee = true;
          return invitee;
        }));
      }
    } else {
      combats = Combat.find({
        owner: Meteor.userId()
      }).fetch();
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
