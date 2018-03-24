import { Meteor } from 'meteor/meteor';
import { Skills } from '/imports/api/skills/skills';
import moment from 'moment';

import { Friends, FriendRequests, } from '/imports/api/friends/friends';
import { Users } from '/imports/api/users/users';
import { Combat } from '/imports/api/combat/combat';

Meteor.methods({

  // Invite the user to your current group or create a group if not in one
  'friends.invite'(username) {
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

    // Is targetUser already a friend?
    let currentFriends;

    currentFriends = Friends.findOne({
      owner: this.userId
    });

    if (!currentFriends) {
      currentFriends = {
        owner: this.userId,
        friends: []
      };
      Friends.insert(currentFriends);
    }

    if (_.find(currentFriends.friends, (friend) => { return friend === targetUser._id })) {
      throw new Meteor.Error("already-friend", "already-a-friend");
    }

    const existingRequest = FriendRequests.findOne({
      sender: Meteor.userId(),
      reciever: targetUser._id
    });

    if (existingRequest) {
      throw new Meteor.Error("already-requested", "already-a-request-pending");
    }

    FriendRequests.insert({
      sender: Meteor.userId(),
      senderName: Meteor.user().username,
      reciever: targetUser._id,
      recieverName: targetUser.username
    });
  },

  'friends.cancel'(reciever) {
    FriendRequests.remove({
      reciever,
      sender: Meteor.userId()
    });
  },

  'friends.decline'(sender) {
    FriendRequests.remove({
      reciever: Meteor.userId(),
      sender
    });
  },

  'friends.accept'(sender) {
    const targetRequest = FriendRequests.findOne({
      reciever: Meteor.userId(),
      sender
    });

    if (!targetRequest) {
      throw new Meteor.Error("invalid-request", "invalid-request");
    }

    let currentFriends = Friends.findOne({
      owner: this.userId
    });

    if (!currentFriends) {
      currentFriends = {
        owner: this.userId,
        friends: []
      };
      currentFriends._id = Friends.insert(currentFriends);
    }

    const senderFriends = Friends.findOne({
      owner: targetRequest.sender
    });

    console.log('currentFriends');
    console.log(currentFriends);
    console.log('senderFriends');
    console.log(senderFriends);
    console.log('-------');

    currentFriends.friends.push(targetRequest.sender);
    senderFriends.friends.push(targetRequest.reciever);

    console.log('currentFriends');
    console.log(currentFriends);
    console.log('senderFriends');
    console.log(senderFriends);
    console.log('-------');

    FriendRequests.remove({
      reciever: Meteor.userId(),
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
      owner: this.userId
    });

    if (!currentFriends) {
      currentFriends = {
        owner: this.userId,
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
  return FriendRequests.find({
    $or: [{
      reciever: this.userId
    }, {
      sender: this.userId
    }]
  });
});

Meteor.publish('friends', function() {
  return Friends.find({
    owner: this.userId
  });
});
