import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Groups } from '/imports/api/groups/groups.js';
import { Combat } from '/imports/api/combat/combat.js';
import { BattlesList } from '/imports/api/battles/battles.js';

import './groupList.html';

Template.groupList.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
});

Template.groupList.events({
  'click .accept-btn'(event, instance) {
    // Get target data
    const $target = instance.$(event.target);
    const inviteId = $target.data('invite-id');
    Meteor.call('groups.acceptInvite', inviteId, true, (err, res) => {
      if (err) {
        toastr.warning(err.reason);
      }
    });
  },

  'click .decline-btn'(event, instance) {
    // Get target data
    const $target = instance.$(event.target);
    const inviteId = $target.data('invite-id');
    Meteor.call('groups.acceptInvite', inviteId, false);
  },

  'click .leave-group'(event) {
    Meteor.call('groups.leave');
  }
})

Template.groupList.helpers({

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
      userCombat.icon = 'character';
      return userCombat;
    });
  },

  pendingInvites() {
    return Groups.find({
      invites: Meteor.userId()
    });
  },

  inCurrentBattle() {
    return BattlesList.findOne({});
  },

  hasPendingInvites() {
    return Groups.find({
      invites: Meteor.userId()
    }).count();
  },

  currentUserId() {
    return Meteor.userId();
  }
});
