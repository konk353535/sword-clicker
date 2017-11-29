import { Meteor } from 'meteor/meteor';
import { Skills } from '/imports/api/skills/skills';
import moment from 'moment';

import { Combat } from '/imports/api/combat/combat';
import { Groups, GroupFinder } from '/imports/api/groups/groups';
import { Users } from '/imports/api/users/users';

import { BATTLES } from '/server/constants/battles/index.js';

Meteor.methods({

  'groups.leave'() {
    const currentGroup = Groups.findOne({
      members: this.userId
    });

    if (!currentGroup) {
      return;
    }

    currentGroup.members = currentGroup.members.filter((member) => {
      return member !== this.userId;
    });

    // Is this user in group finder?
    GroupFinder.remove({
      owner: Meteor.userId()
    });

    if (currentGroup.members.length === 0) {
      Groups.remove(currentGroup._id);

      // Is this group tied to a LFG?
      GroupFinder.remove({
        groupCreatedId: currentGroup._id
      });
    } else {

      // Is leader leaving?
      if (currentGroup.leader === this.userId) {
        currentGroup.leader = currentGroup.members[0];
      }

      Groups.update(currentGroup._id, {
        $set :{
          members: currentGroup.members,
          leader: currentGroup.leader
        }
      });
    }

  },

  'groups.kick'({ username, ownerId }) {
    // Fetch your current group
    const currentGroup = Groups.findOne({
      leader: this.userId,
      members: this.userId
    });

    if (!currentGroup) {
      return;
    }

    let targetUser;
    if (username) {
      // Find specified username id
      targetUser = Users.findOne({
        username
      });
    }

    const memberFilter = function (member) {
      if (targetUser) {
        return member !== targetUser._id
      } else {
        return member !== ownerId;
      }
    }

    // Remove from current group (invites + users)
    currentGroup.members = currentGroup.members.filter(memberFilter);
    currentGroup.invites = currentGroup.invites.filter(memberFilter);

    Groups.update(currentGroup._id, {
      $set: {
        members: currentGroup.members,
        invites: currentGroup.invites
      }
    });
  },

  'groups.findGroup'(floor) {
    // Is there one other user looking for this floor?
    // Can specify floor later when there is more users
    const existingGroup = GroupFinder.findOne({
      floor
    });

    // Existing Group
    if (existingGroup) {
      if (existingGroup.groupCreatedId) {
        // If a group exists
        // Add this user to it as the leader
        const targetGroup = Groups.findOne(existingGroup.groupCreatedId);

        if (targetGroup) {
          targetGroup.members.push(Meteor.userId());
          targetGroup.leader = Meteor.userId();
          targetGroup.leaderName = Meteor.user().username;

          if (targetGroup.members.length >= 5) {
            // Remove this entry
            GroupFinder.remove(existingGroup._id);
          }

          Groups.update(targetGroup._id, {
            $set: {
              members: targetGroup.members,
              leader: targetGroup.leader,
              leaderName: targetGroup.leaderName
            }
          });
          return;
        }
      } else {
        // If no created group yet, make one.
        // Add this user as leader
        // Add other user as second player
        const newlyCreatedGroupId = Groups.insert({
          leaderName: Meteor.user().username,
          leader: this.userId,
          members: [this.userId],
          invites: [existingGroup.owner]
        });

        GroupFinder.update(existingGroup._id, {
          $set: {
            groupCreatedId: newlyCreatedGroupId
          }
        });
      }
    } else {
      // No group exists yet, add single entry and wait
      GroupFinder.insert({
        owner: Meteor.userId(),
        createdAt: moment().toDate(),
        floor
      });
    }
  },

  'groups.ready'() {

    // Are we currently in a group?
    let currentGroup = Groups.findOne({
      members: this.userId
    });

    if (currentGroup.membersChecks[Meteor.userId()]) {
      currentGroup.membersChecks[Meteor.userId()].ready = true;
    }

    Groups.update({
      _id: currentGroup._id
    }, {
      $set: {
        membersChecks: currentGroup.membersChecks
      }
    });
  },

  'groups.notReady'() {

    // Are we currently in a group?
    let currentGroup = Groups.findOne({
      members: this.userId
    });

    if (currentGroup.membersChecks[Meteor.userId()]) {
      currentGroup.membersChecks[Meteor.userId()].notReady = true;
    }

    Groups.update({
      _id: currentGroup._id
    }, {
      $set: {
        membersChecks: currentGroup.membersChecks
      }
    });
  },

  'groups.readyCheck'() {

    // Are we currently in a group?
    let currentGroup = Groups.findOne({
      members: this.userId
    });

    // Must be leader to ready check users
    if (currentGroup && currentGroup.leader !== this.userId) {
      return;
    }

    // Members Object
    const membersObject = {};

    currentGroup.members.forEach((memberId) => {
      membersObject[memberId] = {
        notReady: false,
        ready: false
      };
    })

    // Set ready checks
    Groups.update({
      _id: currentGroup._id
    }, {
      $set: {
        membersChecks: membersObject,
        lastReadyCheck: new Date()
      }
    });
  },

  'groups.stopFindingGroup'() {
    // Remove all records for this user
    GroupFinder.remove({
      owner: Meteor.userId()
    });
  },

  'groups.acceptInvite'(id, accept) {
    const targetGroup = Groups.findOne({
      _id: id,
      invites: Meteor.userId()
    });

    if (!targetGroup) {
      return;
    }

    if (accept && targetGroup.members.length + 1 > BATTLES.maxBossPartySize) {
      throw new Meteor.Error('group-full',
        `Group is full (${targetGroup.members.length} / ${BATTLES.maxBossPartySize}) members`);
    }

    // Remove from invites list
    targetGroup.invites = targetGroup.invites.filter((userId) => {
      if (userId === Meteor.userId()) {
        return false;
      }
      return true;
    });

    // Add user to members if accepting
    if (accept) {
      targetGroup.members.push(Meteor.userId());
    }

    Groups.update(targetGroup._id, {
      $set: {
        members: targetGroup.members,
        invites: targetGroup.invites
      }
    });
  },

  // Invite the user to your current group or create a group if not in one
  'groups.invite'(username) {
    const isMutedExpiry = Meteor.user().isMutedExpiry;
    if (isMutedExpiry && moment().isBefore(isMutedExpiry)) {
      throw new Meteor.Error('sorry-sir', 'sorry no can do :(');
    }

    // Does the specified username exist
    const targetUser = Users.findOne({
      $or: [{
        username: username.toLowerCase()
      }, {
        email: username.toLowerCase()
      }]
    });

    if (!targetUser) {
      return;
    }

    // Are we currently in a group?
    let currentGroup = Groups.findOne({
      members: this.userId
    });

    // Must be leader to invite users
    if (currentGroup && currentGroup.leader !== this.userId) {
      return;
    }

    // Cannot invite self into group
    if (targetUser._id == this.userId) {
      return;
    }

    // Can't invite / add already added / invited users
    if (currentGroup && (_.contains(currentGroup.invites, targetUser._id) ||
      _.contains(currentGroup.members, targetUser._id))) {
      return;
    }

    // Make sure there is room for target user
    if (currentGroup && currentGroup.members.length + currentGroup.invites.length + 1 > BATTLES.maxBossPartySize) {
      throw new Meteor.Error('group-full',
        `Group is full (${currentGroup.members.length + currentGroup.invites.length} / ${BATTLES.maxBossPartySize}) members`);
    }

    if (currentGroup) {
      // Add target user to group
      Groups.update(currentGroup._id, {
        $push: {
          invites: targetUser._id
        }
      });
    } else {
      // Create group with myself and the target user
      Groups.insert({
        leaderName: Meteor.user().username,
        leader: this.userId,
        members: [this.userId],
        invites: [targetUser._id]
      });
    }
  }
});

const MINUTE = 60 * 1000;

// DDPRateLimiter.addRule({ type: 'method', name: 'groups.leave' }, 10, 2 * MINUTE);
// DDPRateLimiter.addRule({ type: 'method', name: 'groups.kick' }, 10, 2 * MINUTE);
// DDPRateLimiter.addRule({ type: 'method', name: 'groups.acceptInvite' }, 5, 2 * MINUTE);
// DDPRateLimiter.addRule({ type: 'method', name: 'groups.invite' }, 25, 5 * MINUTE);
// DDPRateLimiter.addRule({ type: 'subscription', name: 'groups' }, 100, 10 * MINUTE);

Meteor.publish('groupFinder', function() {
  return GroupFinder.find({
    owner: this.userId
  });
});

Meteor.publish('groups', function() {

  //Transform function
  var transform = function(doc) {
    // Transfer invite id to invite names
    const invitesObjects = Combat.find({
      owner: {
        $in: doc.invites
      }
    }, {
      fields: {
        username: 1,
        stats: 1,
        characterIcon: 1,
        owner: 1,
        _id: 1
      }
    }).fetch();

    const memberTransform = function (member) {
      const orginalStats = JSON.parse(JSON.stringify(member.stats));
      delete member.stats;
      member.name = member.username;
      member.owner = member.owner;
      member.icon = member.characterIcon || "character.svg";
      member.stats = {
        health: orginalStats.health,
        healthMax: orginalStats.healthMax
      }
      return member;
    }

    // Modify members and invites objects as fake 'battle units for display'?
    doc.invitesDetails = invitesObjects.map(memberTransform);

    return doc;
  }

  var self = this;

  var observer = Groups.find({
    $or: [{
      members: this.userId
    }, {
      invites: this.userId
    }]
  }).observe({
      added: function (document) {
      self.added('groups', document._id, transform(document));
    },
    changed: function (newDocument, oldDocument) {
      self.changed('groups', oldDocument._id, transform(newDocument));
    },
    removed: function (oldDocument) {
      self.removed('groups', oldDocument._id);
    }
  });

  self.onStop(function () {
    observer.stop();
  });

  self.ready();

});
