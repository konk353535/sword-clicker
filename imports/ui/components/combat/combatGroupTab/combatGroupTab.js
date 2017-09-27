import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Groups } from '/imports/api/groups/groups.js';
import { Combat } from '/imports/api/combat/combat.js';

import './combatGroupTab.html';

Template.combatGroupTab.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

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

  'click .kick-unit'(event, instance) {
    const ownerId = instance.$(event.target).closest('.kick-unit').data('owner');
    Meteor.call('groups.kick', { ownerId });
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
      userCombat.icon = 'character.svg';
      return userCombat;
    });
  },

  pendingInvites() {
    return Groups.find({
      invites: Meteor.userId()
    });
  },

  currentUserId() {
    return Meteor.userId();
  }
});
