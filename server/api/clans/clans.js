import { Clans, ClanInvites, ClanHighscores } from '/imports/api/clans/clans';
import { Users } from '/imports/api/users/users';

import { requirementsUtility } from '/server/api/crafting/crafting';

const clanCost = [{
  type: 'item',
  itemId: 'ore_stone',
  icon: 'stone.png',
  name: 'stone',
  amount: 500,
  consumes: true
}, {
  type: 'gold',
  amount: 1000,
  consumes: true
}]

Meteor.methods({

  'clan.leaderboard'() {
    const myClan = Clans.findOne({
      members: Meteor.userId()
    });

    if (!myClan) {
      return false;
    }

    return ClanHighscores.find({
      owner: {
        $in: myClan.members
      }
    }).fetch();
  },

  'clans.create'(name) {
    const userDoc = Meteor.user();

    if (!requirementsUtility(clanCost, 1)) {
      return;
    }

    Clans.insert({
      name: name,
      members: [userDoc._id],
      owner: userDoc._id
    });
  },

  'clans.accept'(inviteId) {

    const myClan = Clans.findOne({
      members: Meteor.userId()
    });

    if (myClan) {
      throw new Meteor.Error('your-already-in-a-clan', 'Your already in a clan');
    }

    const clanInvite = ClanInvites.findOne({
      _id: inviteId,
      invitee: Meteor.userId()
    });

    const targetClan = Clans.findOne({
      _id: clanInvite.clanId
    });

    targetClan.members.push(Meteor.userId());

    Clans.update({
      _id: clanInvite.clanId
    }, {
      $set: {
        members: targetClan.members
      }
    })

    ClanInvites.remove({
      _id: clanInvite._id
    });
  },

  'clans.decline'(inviteId) {
    ClanInvites.remove({
      _id: inviteId,
      invitee: Meteor.userId()
    })
  },

  'clans.invite'(username) {
    const myClan = Clans.findOne({
      members: Meteor.userId()
    });

    if (!myClan) {
      throw new Meteor.Error('your-not-in-a-clan', 'Your not in a clan');
    }

    // Does the specified username exist
    const targetUser = Users.findOne({
      $or: [{
        username: username.toLowerCase()
      }, {
        email: username.toLowerCase()
      }]
    });

    // Check if target user is already in a clan
    const targetsClan = Clans.findOne({
      members: targetUser._id
    });

    if (targetsClan) {
      throw new Meteor.Error('target-in-clan', 'Your target is already in a clan');
    }

    ClanInvites.insert({
      clanId: myClan._id,
      invitee: targetUser._id,
      inviterName: Meteor.user().username,
      clanName: myClan.name,
      inviteeName: targetUser.username
    });
  }
});

Meteor.publish('clanInvites', function() {

  const myClan = Clans.findOne({
    members: this.userId
  });

  if (myClan) {
    return ClanInvites.find({
      $or: [{
        invitee: this.userId,
      }, {
        clanId: myClan._id
      }]
    });
  }

  return ClanInvites.find({
    invitee: this.userId
  });
});

Meteor.publish('clans', function() {
  return Clans.find({
    members: this.userId
  });
});

