import { Meteor } from 'meteor/meteor';
import { Skills } from '/imports/api/skills/skills';

import { Combat } from '/imports/api/combat/combat';
import { Groups } from '/imports/api/groups/groups';
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

    Groups.update(currentGroup._id, {
      $set :{
        members: currentGroup.members
      }
    });
  },

  'groups.kick'(username) {
    // Fetch your current group
    const currentGroup = Groups.findOne({
      leader: this.userId
    });

    if (!currentGroup) {
      return;
    }

    // Find specified username id
    const targetUser = Users.findOne({
      username
    });

    const memberFilter = function (member) {
      return member !== targetUser._id;
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
    // Does the specified username exist
    const targetUser = Users.findOne({
      username: new RegExp(username, "i")
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

    // Can't invite / add already added / invited users
    if (currentGroup && (_.contains(currentGroup.invites, targetUser._id) ||
      _.contains(currentGroup.members, targetUser._id))) {
      return;
    }

    // Make sure there is room for target user
    if (currentGroup.members.length + currentGroup.invites.length + 1 > BATTLES.maxBossPartySize) {
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
        leader: this.userId,
        members: [this.userId],
        invites: [targetUser._id]
      });
    }
  }
});

const MINUTE = 60 * 1000;

DDPRateLimiter.addRule({ type: 'method', name: 'groups.leave' }, 10, 2 * MINUTE);
DDPRateLimiter.addRule({ type: 'method', name: 'groups.kick' }, 10, 2 * MINUTE);
DDPRateLimiter.addRule({ type: 'method', name: 'groups.acceptInvite' }, 5, 2 * MINUTE);
DDPRateLimiter.addRule({ type: 'method', name: 'groups.invite' }, 25, 5 * MINUTE);
DDPRateLimiter.addRule({ type: 'subscription', name: 'groups' }, 100, 10 * MINUTE);

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
        _id: 1
      }
    }).fetch();

    const memberTransform = function (member) {
      member.name = member.username;
      member.icon = "character";
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
