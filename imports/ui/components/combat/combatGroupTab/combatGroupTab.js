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
    Meteor.call('groups.invite', text);
 
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
    Meteor.call('groups.invite', text);
 
    // Clear input
    target.text.value = '';
  },

  'click .accept-btn'(event) {
    // Get target data
    const $target = Template.instance().$(event.target);
    const inviteId = $target.data('invite-id');
    Meteor.call('groups.acceptInvite', inviteId, true);
  },

  'click .btn-kick'(event) {
    // Fetch value
    const username = Template.instance().$('.group-user-input').val();
    Meteor.call('groups.kick', username);
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

    return combats.fetch().map((userCombat) => {
      // Map stuff we want to read into stats
      userCombat.stats = {
        health: userCombat.stats.health,
        maxHealth: userCombat.stats.maxHealth,
        energy: userCombat.stats.energy,
        maxEnergy: userCombat.stats.maxEnergy
      }
      userCombat.name = userCombat.username;
      userCombat.icon = 'character';
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
