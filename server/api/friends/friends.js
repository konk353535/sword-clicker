import { Meteor } from 'meteor/meteor';
import { Skills } from '/imports/api/skills/skills';
import moment from 'moment';

import { Friends, FriendRequests, } from '/imports/api/friends/friends';
import { Users, UserGames } from '/imports/api/users/users';
import { Combat } from '/imports/api/combat/combat';

Meteor.methods({

  // Invite the user to your current group or create a group if not in one
  'friends.invite'(username) {
    const userDoc = Meteor.user();
    const isMutedExpiry = userDoc.isMutedExpiry;
    if (isMutedExpiry && moment().isBefore(isMutedExpiry)) {
      throw new Meteor.Error('sorry-sir', 'sorry no can do :(');
    }

    // Does the specified username exist
    const targetUser = Users.findOne({
      games: userDoc.currentGame,
      $or: [{
        username: username.toLowerCase()
      }, {
        email: username.toLowerCase()
      }]
    });

    if (!targetUser) {
      return;
    }

    // Is targetUser already a friend?
    let currentFriends;

    currentFriends = Friends.findOne({
      owner: userDoc._id,
      game: userDoc.currentGame,
    });

    if (!currentFriends) {
      currentFriends = {
        owner: userDoc._id,
        game: userDoc.currentGame,
        friends: []
      };
      Friends.insert(currentFriends);
    }

    if (_.find(currentFriends.friends, (friend) => { return friend === targetUser._id })) {
      throw new Meteor.Error("already-friend", "already-a-friend");
    }

    const existingRequest = FriendRequests.findOne({
      sender: userDoc._id,
      game: userDoc.currentGame,
      reciever: targetUser._id
    });

    if (existingRequest) {
      throw new Meteor.Error("already-requested", "already-a-request-pending");
    }

    FriendRequests.insert({
      game: userDoc.currentGame,
      sender: Meteor.userId(),
      senderName: Meteor.user().username,
      reciever: targetUser._id,
      recieverName: targetUser.username
    });
  },

  'friends.cancel'(reciever) {
    const userDoc = Meteor.user();
    FriendRequests.remove({
      reciever,
      sender: userDoc._id,
      game: userDoc.currentGame
    });
  },

  'friends.decline'(sender) {
    FriendRequests.remove({
      reciever: userDoc._id,
      game: userDoc.currentGame,
      sender
    });
  },

  'friends.accept'(sender) {
    const userDoc = Meteor.user();
    const targetRequest = FriendRequests.findOne({
      reciever: userDoc._id,
      game: userDoc.currentGame,
      sender
    });

    if (!targetRequest) {
      throw new Meteor.Error("invalid-request", "invalid-request");
    }

    let currentFriends = Friends.findOne({
      owner: userDoc._id,
      game: userDoc.currentGame
    });

    if (!currentFriends) {
      currentFriends = {
        owner: userDoc._id,
        game: userDoc.currentGame,
        friends: []
      };
      currentFriends._id = Friends.insert(currentFriends);
    }

    const senderFriends = Friends.findOne({
      owner: targetRequest.sender,
      game: userDoc.currentGame
    });

    currentFriends.friends.push(targetRequest.sender);
    senderFriends.friends.push(targetRequest.reciever);

    FriendRequests.remove({
      reciever: userDoc._id,
      game: userDoc.currentGame,
      sender
    });

    Friends.update({
      _id: currentFriends._id
    }, {
      $set: {
        friends: currentFriends.friends
      }
    });

    Friends.update({
      _id: senderFriends._id
    }, {
      $set: {
        friends: senderFriends.friends
      }
    });
  },

  'friends.remove'(username) {
    const userDoc = Meteor.user();
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

    // Is targetUser already a friend?
    let currentFriends;

    currentFriends = Friends.findOne({
      owner: userDoc._id,
      game: userDoc.currentGame
    });

    if (!currentFriends) {
      currentFriends = {
        owner: userDoc._id,
        game: userDoc.currentGame,
        friends: []
      };
      Friends.insert(currentFriends);
    }

    currentFriends.friends = currentFriends.friends.filter((friend) => { return friend !== targetUser._id });

    Friends.update(currentFriends._id, {
      $set: {
        friends: currentFriends.friends
      }
    });
  }
});

Meteor.publish('friendRequests', function () {
  const userDoc = Meteor.user();
  return FriendRequests.find({
    $or: [{
      reciever: userDoc._id
    }, {
      sender: userDoc._id
    }],
    game: userDoc.currentGame
  });
});

Meteor.publish('friends', function() {
  const userDoc = Meteor.user();
  return Friends.find({
    owner: userDoc._id,
    game: userDoc.currentGame
  });
});
