import { Meteor } from 'meteor/meteor';
import { Skills } from '/imports/api/skills/skills';
import moment from 'moment';

import { Combat } from '/imports/api/combat/combat';
import { Groups } from '/imports/api/groups/groups';
import { Users, UserGames } from '/imports/api/users/users';

import { BATTLES } from '/server/constants/battles/index.js';
import uuid from 'node-uuid';

function leaveGroup(group, userId, game) {

  group.invites = group.invites.filter((member) => {
    return member !== userId;
  });

  group.members = group.members.filter((member) => {
    return member !== userId;
  });

  group.membersObject = group.membersObject.filter((member) => {
    return member.id !== userId;
  });

  UserGames.update({
    owner: userId,
    game
  }, {
    $set: {
      partyId: null
    }
  })

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
    const userDoc = Meteor.user();
    const currentGroup = Groups.findOne({
      members: userDoc._id,
      game: userDoc.currentGame
    });

    if (!currentGroup) {
      return;
    }

    leaveGroup(currentGroup, userDoc._id, userDoc.currentGame);
  },

  'groups.kick'({ username, ownerId }) {
    const userDoc = Meteor.user();
    // Fetch your current group
    const currentGroup = Groups.findOne({
      leader: userDoc._id,
      game: userDoc.currentGame
    });

    if (ownerId && currentGroup && currentGroup.members.find(member => member === ownerId)) {
      // If leader kicks himself, trigger a group.leave instead so leader status tranfers
      if (ownerId == userDoc._id) {
        Meteor.call('groups.leave');
        return;
      }

      leaveGroup(currentGroup, ownerId, userDoc.currentGame);
    }

    if (username && !ownerId) {
      const targetUser = Users.findOne({
        username: username.toLowerCase(),
        game: userDoc.currentGame
      });

      if (targetUser && currentGroup.invites.find(invitee => invitee === targetUser._id)) {
        console.log('hit');
        leaveGroup(currentGroup, targetUser._id, userDoc.currentGame);
      }
    }
  },

  'groups.ready'() {
    const userDoc = Meteor.user();

    // Are we currently in a group?
    let currentGroup = Groups.findOne({
      members: userDoc._id,
      game: userDoc.currentGame
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
    const userDoc = Meteor.user();

    // Are we currently in a group?
    let currentGroup = Groups.findOne({
      members: userDoc._id,
      game: userDoc.currentGame
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
    const userDoc = Meteor.user();

    // Are we currently in a group?
    let currentGroup = Groups.findOne({
      members: userDoc._id,
      game: userDoc.currentGame
    });

    // Must be leader to ready check users
    if (currentGroup && currentGroup.leader !== userDoc._id) {
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
    const userDoc = Meteor.user();
    Groups.update({
      leader: userDoc._id,
      game: userDoc.currentGame
    }, {
      $set: {
        locked
      }
    });
  },

  'groups.join'(id) {
    const userDoc = Meteor.user();
    const targetGroup = Groups.findOne({
      _id: id,
      game: userDoc.currentGame
    });

    if (targetGroup.locked) {
      return;
    }

    if (targetGroup.members.find(member => member === userDoc._id)) {
      throw new Meteor.Error('already-in-this-group');
    }

    const existingGroup = Groups.findOne({
      members: userDoc._id,
      game: userDoc.currentGame
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

    UserGames.update({
      owner: userDoc._id,
      game: userDoc.currentGame
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
      invites: userDoc._id,
      game: userDoc.currentGame
    });

    if (!targetGroup) {
      return;
    }

    const existingGroup = Groups.findOne({
      members: userDoc._id,
      game: userDoc.currentGame
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

      UserGames.update({
        owner: userDoc._id,
        game: userDoc.currentGame
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
    const userDoc = Meteor.user();
    const isMutedExpiry = userDoc.isMutedExpiry;
    if (isMutedExpiry && moment().isBefore(isMutedExpiry)) {
      throw new Meteor.Error('sorry-sir', 'sorry no can do :(');
    }

    // Does the specified username exist
    const targetUser = Users.findOne({
      $or: [{
        username: username.toLowerCase().replace(/ /g,'')
      }, {
        email: username.toLowerCase()
      }],
      games: userDoc.currentGame
    });

    if (!targetUser) {
      return;
    }

    // Are we currently in a group?
    let currentGroup = Groups.findOne({
      members: userDoc._id,
      game: userDoc.currentGame
    });

    // Must be leader to invite users
    if (currentGroup && currentGroup.leader !== userDoc._id) {
      return;
    }

    // Cannot invite self into group
    if (targetUser._id == userDoc._id) {
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
        game: userDoc.currentGame,
        leaderName: userDoc.username,
        leader: this.userId,
        members: [this.userId],
        membersObject: [{
          name: userDoc.username,
          averageCombat: 0,
          id: userDoc._id
        }],
        invites: [targetUser._id]
      });

      UserGames.update({
        owner: userDoc._id,
        game: userDoc.currentGame
      }, {
        $set: {
          partyId: newGroupId
        }        
      });
    }
  },

  // Transfer leaderhip role to another party member
  'groups.transfer'({ ownerId }) {
    const userDoc = Meteor.user();
    const isMutedExpiry = userDoc.isMutedExpiry;
    if (isMutedExpiry && moment().isBefore(isMutedExpiry)) {
      throw new Meteor.Error('sorry-sir', 'sorry no can do :(');
    }

    // Fetch and confirm group exists
    const currentGroup = Groups.findOne({
      leader: userDoc._id,
      members: userDoc._id,
      game: userDoc.currentGame
    });

    if (!currentGroup) {
      return;
    }


    // Fetch and confirm target user exists
    let targetUser;
      targetUser = Users.findOne({
        _id: ownerId,
        games: userDoc.currentGame
      });

    if (!targetUser) {
      return;
    }


    // Cannot transfer to self into group
    if (targetUser._id == userDoc._id) {
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

  const userDoc = Meteor.user();

  return Groups.find({
    lastBattleStarted: {
      $gte: moment().subtract(24, 'hours').toDate()
    },
    game: userDoc.currentGame
  }, {
    limit,
    sort: {
      lastBattleStarted: -1
    }
  });
});

Meteor.publish('groups', function() {
  const userDoc = Meteor.user();

  //Transform function
  var transform = function(doc) {
    // Transfer invite id to invite names
    const invitesObjects = Combat.find({
      game: userDoc.currentGame,
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
      members: userDoc._id
    }, {
      invites: userDoc._id
    }],
    game: userDoc.currentGame
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
