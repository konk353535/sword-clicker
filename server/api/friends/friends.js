import { Meteor } from 'meteor/meteor';
import moment from 'moment';

import { Friends } from '/imports/api/friends/friends';
import { Users } from '/imports/api/users/users';
import { Combat } from '/imports/api/combat/combat';
import { updateUserActivity } from '/imports/api/users/users.js';

Meteor.methods({

  // add the friend to your friends list
  'friends.add'(username) {
    const isMutedExpiry = Meteor.user().isMutedExpiry;
    if (isMutedExpiry && moment().isBefore(isMutedExpiry)) {
      throw new Meteor.Error('error', 'You are not logged in.');
    }

    // Does the specified username exist
    const targetUser = Users.findOne({
      $or: [{
        username: username.toLowerCase()
      }, {
        username: username
      }, {
        email: username.toLowerCase()
      }, {
        email: username
      }]
    });

    if (!targetUser) {
      throw new Meteor.Error('error', 'Player name not found.');
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
      throw new Meteor.Error('error', 'That player is already on your friend\'s list.');
    }

    currentFriends.friends.push(targetUser._id);

    Friends.update(currentFriends._id, {
      $set: {
        friends: currentFriends.friends
      }
    });

    updateUserActivity({userId: Meteor.userId()});
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

    updateUserActivity({userId: Meteor.userId()});
  },
  
  'friends.list'() {
    const doc = Friends.findOne({ owner: Meteor.userId() });

    if (doc) {
      const friendsDetails = Users.find({
        _id: {
          $in: doc.friends
        }
      }, {
        fields: {
          _id: 1,
          username: 1,
          lastActivity: 1
        }
      }).fetch();

      doc.friends = friendsDetails;
      
      for (let i = 0; i < doc.friends.length; i++) {
        doc.friends[i].owner = doc.friends[i]._id;
        doc.friends[i].lastActionDate = (doc.friends[i].lastActivity) ? doc.friends[i].lastActivity : 0;
      };
      
      return doc;
    }
    
    return false;
  }
});

Meteor.publish('friends', function() {

  const transform = function (doc) {
    const friendsDetails = Users.find({
      _id: {
        $in: doc.friends
      }
    }, {
      fields: {
        _id: 1,
        username: 1,
        lastActivity: 1
      }
    }).fetch();

    doc.friends = friendsDetails;
    
    for (let i = 0; i < doc.friends.length; i++) {
      doc.friends[i].owner = doc.friends[i]._id;
      doc.friends[i].lastActionDate = (doc.friends[i].lastActivity) ? doc.friends[i].lastActivity : 0;
    };
    
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
