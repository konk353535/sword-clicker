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
    const userDoc = Meteor.user();
    const myClan = Clans.findOne({
      members: userDoc._id,
      game: userDoc.currentGame
    });

    if (!myClan) {
      return false;
    }

    return ClanHighscores.find({
      owner: {
        $in: myClan.members
      },
      game: userDoc.currentGame
    }).fetch();
  },

  'clans.create'(name) {
    const userDoc = Meteor.user();

    if (!requirementsUtility(clanCost, 1, userDoc._id, userDoc.currentGame)) {
      return;
    }

    Clans.insert({
      name: name,
      game: userDoc.currentGame,
      members: [userDoc._id],
      owner: userDoc._id
    });
  },

  'clans.accept'(inviteId) {
    const userDoc = Meteor.user();

    const myClan = Clans.findOne({
      members: userDoc._id,
      game: userDoc.currentGame
    });

    if (myClan) {
      throw new Meteor.Error('your-already-in-a-clan', 'Your already in a clan');
    }

    const clanInvite = ClanInvites.findOne({
      _id: inviteId,
      game: userDoc.currentGame,
      invitee: userDoc._id
    });

    const targetClan = Clans.findOne({
      _id: clanInvite.clanId,
      game: userDoc.currentGame
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
    const userDoc = Meteor.user();
    ClanInvites.remove({
      _id: inviteId,
      invitee: userDoc._id,
      game: userDoc.currentGame
    })
  },

  'clans.invite'(username) {
    const userDoc = Meteor.user();
    const myClan = Clans.findOne({
      game: userDoc.currentGame,
      members: userDoc._id
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
      }],
      games: userDoc.currentGame
    });

    // Check if target user is already in a clan
    const targetsClan = Clans.findOne({
      members: targetUser._id,
      game: userDoc.currentGame
    });

    if (targetsClan) {
      throw new Meteor.Error('target-in-clan', 'Your target is already in a clan');
    }

    ClanInvites.insert({
      clanId: myClan._id,
      game: userDoc.currentGame,
      invitee: targetUser._id,
      inviterName: userDoc.username,
      clanName: myClan.name,
      inviteeName: targetUser.username
    });
  }
});

Meteor.publish('clanInvites', function() {
  const userDoc = Users.findOne(this.userId);
  const owner = userDoc._id;
  const game = userDoc.currentGame;

  const myClan = Clans.findOne({
    members: userDoc._id,
    game: userDoc.currentGame
  });

  if (myClan) {
    return ClanInvites.find({
      $or: [{
        invitee: userDoc._id,
      }, {
        clanId: myClan._id
      }],
      game: userDoc.currentGame
    });
  }

  return ClanInvites.find({
    invitee: userDoc._id,
    game: userDoc.currentGame
  });
});

Meteor.publish('clans', function() {
  const userDoc = Users.findOne(this.userId);
  const owner = userDoc._id;
  const game = userDoc.currentGame;

  return Clans.find({
    game: userDoc.currentGame,
    members: userDoc._id
  });
});

