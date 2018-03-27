import { Meteor } from 'meteor/meteor';
import { Skills } from '/imports/api/skills/skills';
import moment from 'moment';

import { Combat } from '/imports/api/combat/combat';
import { Groups } from '/imports/api/groups/groups';
import { Users } from '/imports/api/users/users';

import { BATTLES } from '/server/constants/battles/index.js';
import uuid from 'node-uuid';

function leaveGroup(group, userId) {

  group.invites = group.invites.filter((member) => {
    return member !== userId;
  });

  group.members = group.members.filter((member) => {
    return member !== userId;
  });

  group.membersObject = group.membersObject.filter((member) => {
    return member.id !== userId;
  });

  Users.update({
    _id: userId
  }, {
    $set: {
      partyId: null
    }
  });

  if (group.members.length === 0) {
    Groups.remove(group._id);
  } else {
    // Is leader leaving?
    if (group.leader === userId) {
      group.leader = group.members[0];
    }

    Groups.update(group._id, {
      $set :{
        members: group.members,
        invites: group.invites,
        membersObject: group.membersObject,
        leader: group.leader
      }
    });
  }
}

Meteor.methods({

  'groups.leave'() {
    const currentGroup = Groups.findOne({
      members: this.userId
    });

    if (!currentGroup) {
      return;
    }

    leaveGroup(currentGroup, this.userId);
  },

  'groups.kick'({ username, ownerId }) {
    // Fetch your current group
    const currentGroup = Groups.findOne({
      leader: this.userId
    });

    if (ownerId && currentGroup && currentGroup.members.find(member => member === ownerId)) {
      // If leader kicks himself, trigger a group.leave instead so leader status tranfers
      if (ownerId == this.userId) {
        Meteor.call('groups.leave');
        return;
      }

      leaveGroup(currentGroup, ownerId);
    }

    if (username && !ownerId) {
      const targetUser = Users.findOne({
        username: username.toLowerCase()
      });

      if (targetUser && currentGroup.invites.find(invitee => invitee === targetUser._id)) {
        console.log('hit');
        leaveGroup(currentGroup, targetUser._id);
      }
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

  'groups.lock'(locked) {
    Groups.update({
      leader: Meteor.userId()
    }, {
      $set: {
        locked
      }
    });
  },

  'groups.join'(id) {
    const userDoc = Meteor.user();
    const targetGroup = Groups.findOne({
      _id: id
    });

    if (targetGroup.locked) {
      return;
    }

    if (targetGroup.members.find(member => member === userDoc._id)) {
      throw new Meteor.Error('already-in-this-group');
    }

    const existingGroup = Groups.findOne({
      members: userDoc._id
    });
    if (existingGroup) {
      leaveGroup(existingGroup, userDoc._id);
    }
    if (!targetGroup || targetGroup.members.length >= 5) {
      throw new Meteor.Error('group does not exist or is full');
      return;
    }
    if (targetGroup.members.length + 1 > BATTLES.maxBossPartySize) {
      throw new Meteor.Error('group-full',
        `Group is full (${targetGroup.members.length} / ${BATTLES.maxBossPartySize}) members`);
    }
    // Remove from invites list
    targetGroup.invites = targetGroup.invites.filter((userId) => {
      if (userId === userDoc._id) {
        return false;
      }
      return true;
    });

    // Add user to members if accepting
    targetGroup.members.push(userDoc._id);
    targetGroup.membersObject.push({
      averageCombat: userDoc.averageCombat,
      name: userDoc.username,
      id: userDoc._id
    });

    Users.update({
      _id: userDoc._id
    }, {
      $set: {
        partyId: targetGroup._id
      }
    });

    Groups.update(targetGroup._id, {
      $set: {
        members: targetGroup.members,
        membersObject: targetGroup.membersObject,
        invites: targetGroup.invites
      }
    });
  },

  'groups.acceptInvite'(id, accept) {
    const userDoc = Meteor.user();
    const targetGroup = Groups.findOne({
      _id: id,
      invites: userDoc._id
    });

    if (!targetGroup) {
      return;
    }

    const existingGroup = Groups.findOne({
      members: userDoc._id
    });

    if (existingGroup) {
      leaveGroup(existingGroup, userDoc._id);
    }

    if (targetGroup.members.find(member => member === userDoc._id)) {
      throw new Meteor.Error('already-in-this-group', 'already in this group');
    }

    if (accept && targetGroup.members.length + 1 > BATTLES.maxBossPartySize) {
      throw new Meteor.Error('group-full',
        `Group is full (${targetGroup.members.length} / ${BATTLES.maxBossPartySize}) members`);
    }

    // Remove from invites list
    targetGroup.invites = targetGroup.invites.filter((userId) => {
      if (userId === userDoc._id) {
        return false;
      }
      return true;
    });

    // Add user to members if accepting
    if (accept) {
      targetGroup.members.push(userDoc._id);
      targetGroup.membersObject.push({
        name: userDoc.username,
        id: userDoc._id,
        averageCombat: userDoc.averageCombat
      });

      Users.update({
        _id: userDoc._id
      }, {
        $set: {
          partyId: targetGroup._id
        }
      });
    }

    Groups.update(targetGroup._id, {
      $set: {
        members: targetGroup.members,
        membersObject: targetGroup.membersObject,
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
        username: username.toLowerCase().replace(/ /g,'')
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
      const newGroupId = Groups.insert({
        balancer: uuid.v4(),
        leaderName: Meteor.user().username,
        leader: this.userId,
        members: [this.userId],
        membersObject: [{
          name: Meteor.user().username,
          averageCombat: Meteor.user().averageCombat,
          id: this.userId
        }],
        invites: [targetUser._id]
      });

      Users.update({
        _id: Meteor.userId()
      }, {
        $set: {
          partyId: newGroupId
        }
      });
    }
  },

  // Transfer leaderhip role to another party member
  'groups.transfer'({ ownerId }) {
    const isMutedExpiry = Meteor.user().isMutedExpiry;
    if (isMutedExpiry && moment().isBefore(isMutedExpiry)) {
      throw new Meteor.Error('sorry-sir', 'sorry no can do :(');
    }

    // Fetch and confirm group exists
    const currentGroup = Groups.findOne({
      leader: this.userId,
      members: this.userId
    });

    if (!currentGroup) {
      return;
    }


    // Fetch and confirm target user exists
    let targetUser;
      targetUser = Users.findOne({
        _id: ownerId
      });

    if (!targetUser) {
      return;
    }


    // Cannot transfer to self into group
    if (targetUser._id == this.userId) {
      return;
    }

    // Set target user as leader of the group
    Groups.update(currentGroup._id, {
      $set: {
        leaderName: targetUser.username,
        leader: targetUser._id
      }
    });
  }
});




const MINUTE = 60 * 1000;

// DDPRateLimiter.addRule({ type: 'method', name: 'groups.leave' }, 10, 2 * MINUTE);
// DDPRateLimiter.addRule({ type: 'method', name: 'groups.kick' }, 10, 2 * MINUTE);
// DDPRateLimiter.addRule({ type: 'method', name: 'groups.acceptInvite' }, 5, 2 * MINUTE);
// DDPRateLimiter.addRule({ type: 'method', name: 'groups.invite' }, 25, 5 * MINUTE);
// DDPRateLimiter.addRule({ type: 'subscription', name: 'groups' }, 100, 10 * MINUTE);

Meteor.publish('otherBattlers', function(limit) {
  if (limit > 100) {
    limit = 100;
  }

  return Groups.find({
    lastBattleStarted: {
      $gte: moment().subtract(24, 'hours').toDate()
    }
  }, {
    limit,
    sort: {
      lastBattleStarted: -1
    }
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
