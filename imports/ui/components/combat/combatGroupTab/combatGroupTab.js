import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Groups } from '/imports/api/groups/groups.js';
import { Friends } from '/imports/api/friends/friends.js';
import { Combat } from '/imports/api/combat/combat.js';

import moment from 'moment';
import _ from 'underscore';

import './combatGroupTab.html';

Template.combatGroupTab.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

Template.combatGroupTab.rendered = function () {
  Meteor.subscribe('friends');
};

Template.combatGroupTab.events({
  'click .btn-invite'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const text = Template.instance().$('.group-user-input').val();
 
    // Send invite request
    Meteor.call('groups.invite', text, (err, res) => {
      if (err) {
        toastr.warning(err.reason);
      }
    });
 
    // Clear input
    Template.instance().$('.group-user-input').val('');
  },

  'click .invite-friend-to-group'(event, instance) {
    const name = $(event.currentTarget).data('username');
    // Send invite request
    Meteor.call('groups.invite', name, (err, res) => {
      if (err) {
        toastr.warning(err.reason);
      }
    });
  },

  'click .remove-friend-click'(event, instance) {
    // convert to confirm button
    $(event.target).addClass('remove-friend-confirm btn-success');
    $(event.target).removeClass('remove-friend-click btn-warning');
    $(event.target).html('✓');
  },

  'click .remove-friend-confirm'(event, instance) {
    const name = $(event.currentTarget).data('username');
    // Send remove request
    Meteor.call('friends.remove', name, (err, res) => {
      if (err) {
        toastr.warning(err.reason);
      }
    });
  },

  'blur .remove-friend-confirm'(event, instance) {
    // convert to confirm button on blur (cancel)
    $(event.target).addClass('remove-friend-click btn-warning');
    $(event.target).removeClass('remove-friend-confirm btn-success');
    $(event.target).html('x');
  },

  'submit .invite-user'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const target = event.target;
    const text = target.text.value;
 
    // Send invite request
    Meteor.call('groups.invite', text, (err, res) => {
      if (err) {
        toastr.warning(err.reason);
      }
    });
 
    // Clear input
    target.text.value = '';
  },

  'submit .invite-friend'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const target = event.target;
    const text = target.text.value;
 
    // Send invite request
    Meteor.call('friends.invite', text, (err, res) => {
      if (err) {
        toastr.warning(err.reason);
      }
    });
 
    // Clear input
    target.text.value = '';
  },

  'click .kick-unit'(event, instance) {
    const ownerId = instance.$(event.target).closest('.kick-unit').data('owner');
    Meteor.call('groups.kick', { ownerId });
  },

  'click .transfer-unit'(event, instance) {
    const ownerId = instance.$(event.target).closest('.transfer-unit').data('owner');
    Meteor.call('groups.transfer', { ownerId });
  },

  'click .accept-btn'(event) {
    // Get target data
    const $target = Template.instance().$(event.target);
    const inviteId = $target.data('invite-id');
    Meteor.call('groups.acceptInvite', inviteId, true, (err, res) => {
      if (err) {
        toastr.warning(err.reason);
      }
    });
  },

  'click .btn-kick'(event) {
    // Fetch value
    const username = Template.instance().$('.group-user-input').val();
    Meteor.call('groups.kick', { username });
    Template.instance().$('.group-user-input').val('');
  },

  'click .leave-group'(event) {
    Meteor.call('groups.leave');
  },

  'click .decline-btn'(event) {
    // Get target data
    const $target = Template.instance().$(event.target);
    const inviteId = $target.data('invite-id');
    Meteor.call('groups.acceptInvite', inviteId, false);
  }
})

Template.combatGroupTab.helpers({

  currentGroup() {
    return Groups.findOne({
      members: Meteor.userId()
    });
  },

  currentGroupMembers() {
    const currentGroup = Groups.findOne({
      members: Meteor.userId()
    });

    if (!currentGroup) {
      return [];
    }

    const combats = Combat.find({
      owner: {
        $in: currentGroup.members
      }
    });

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

  pendingInvites() {
    return Groups.find({
      invites: Meteor.userId()
    });
  },

  friends() {
    return _.sortBy(Friends.findOne({}).friends.map((friend) => {
      friend.isOnline = moment().diff(friend.lastGameUpdated) < 1000 * 60 * 5;

      return friend;
    }), 'lastGameUpdated').reverse();
  },

  currentUserId() {
    return Meteor.userId();
  }
});
