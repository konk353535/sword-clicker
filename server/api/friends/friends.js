import { Meteor } from 'meteor/meteor';
import moment from 'moment';

import { Friends } from '/imports/api/friends/friends';
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
      return;
    }

    currentFriends.friends.push(targetUser._id);

    Friends.update(currentFriends._id, {
      $set: {
        friends: currentFriends.friends
      }
    });

    // update user activity
    Users.update({
      _id: Meteor.userId()
    }, {
      $set: {
        lastActivity: moment().toDate()
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

    // update user activity
    Users.update({
      _id: Meteor.userId()
    }, {
      $set: {
        lastActivity: moment().toDate()
      }
    });
  }
});

Meteor.publish('friends', function() {

  //Transform function
  const transform = function (doc) {
    // Transfer invite id to invite names
    const invitesObjects = Combat.find({
      owner: {
        $in: doc.friends
      }
    }, {
      fields: {
        owner: 1,
        username: 1,
        lastGameUpdated: 1,
        lastActivity: 1
      }
    }).fetch();

    // Modify members and invites objects as fake 'battle units for display'?
    doc.friends = invitesObjects;

    return doc;
  };

  const self = this;

  const observer = Friends.find({
    owner: this.userId
  }).observe({
    added: function (document) {
      self.added('friend', document._id, transform(document));
    },
    changed: function (newDocument, oldDocument) {
      self.changed('friend', oldDocument._id, transform(newDocument));
    },
    removed: function (oldDocument) {
      self.removed('friend', oldDocument._id);
    }
  });

  self.onStop(function () {
    observer.stop();
  });

  self.ready();

});
