import { SimpleChat } from 'meteor/cesarve:simple-chat/config'
import { BlackList } from '/imports/api/blacklist/blacklist';
import { Users } from '/imports/api/users/users';
import { Skills } from '/imports/api/skills/skills';
import { Groups } from '/imports/api/groups/groups';
import { Servers } from '/imports/api/servers/servers';
import { Floors } from '/imports/api/floors/floors';
import { Chats } from 'meteor/cesarve:simple-chat/collections';
import { addItem } from '/server/api/items/items.js';
import { Events } from '/imports/api/events/events';

import { FLOORS } from '/server/constants/floors/index.js';

import _ from 'underscore';
import moment from 'moment';

const PUBLIC_ROOMS = ['General', 'LFG', 'Offtopic', 'Help']

const createNewServer = function (name, iteration) {
  // Create the server
  const newServer = Servers.insert({
    membersCount: 0,
    createdAt: new Date(),
    name,
    iteration
  });

  // Create the floor
  Floors.insert({
    floor: 1,
    server: newServer,
    createdAt: new Date(),
    points: 0,
    pointsMax: FLOORS.getNewPointCount(1, 10)
  });
};

SimpleChat.configure ({
  texts:{
    loadMore: 'Load More',
    placeholder: 'Type message ...',
    button: 'send',
    join: 'Join to',
    left: 'Left the',
    room: 'room at'
  },
  limit: 25,
  publishChats: function(roomId, limit){ // server
    return this.userId;
  },
  onNewMessage: function () {

  },
  allow: function(message, roomId, username, avatar, name){
    if (message.length > 280) {
      return;
    }

    const userDoc = Users.findOne(this.userId);

    if (name !== userDoc.username || username !== userDoc.username) {
      return false;
    }

    if (!userDoc.clientIp && this.connection) {
      Users.update({
        _id: this.userId
      }, {
        $set: {
          clientIp: this.connection.clientAddress
        }
      })
    }

    if (userDoc.username !== username || userDoc.username !== name) {
      return;
    }

    if (userDoc.isMutedExpiry) {
      if (moment().isBefore(userDoc.isMutedExpiry)) {
        return false;
      } else {
        Users.update(userDoc._id, {
          $unset: {
            isMutedExpiry: ""
          }
        });
        return true;
      }
    }

    if (/\/transfergems/.test(message)) {
      const splitMessage = message.split(' ');
      const targetUsername = splitMessage[1];
      const targetAmount = parseInt(splitMessage[2]);

      if (!_.isFinite(targetAmount)) {
        return;
      } else if (targetAmount <= 0) {
        return;
      }

      let gemsToSend = targetAmount;
      if (gemsToSend > userDoc.gems) {
        gemsToSend = userDoc.gems;
      }

      const targetUser = Users.findOne({
        username: targetUsername.toLowerCase().trim()
      });

      if (!targetUser) {
        return;
      }

      Events.insert({
        owner: userDoc._id,
        event: 'transfergems',
        date: new Date(),
        data: {
          from: userDoc._id,
          to: targetUser._id,
          amount: gemsToSend
        }
      }, () => {});

      Users.update(userDoc._id, {
        $inc: {
          gems: (gemsToSend * -1)
        }
      });

      Users.update(targetUser._id, {
        $inc: {
          gems: gemsToSend
        }
      });

      return false;
    }

    if (userDoc.isMod) {
      if (/\/ipban/.test(message) && userDoc.isSuperMod) {
        // Find user
        const targetUser = Users.findOne({ username: message.split('/ipban')[1].trim() });

        // Set all users with this ip
        Users.update({
          clientIp: targetUser.clientIp
        }, {
          $set: {
            isMutedExpiry: moment().add(10, 'years').toDate()
          }
        }, { multi: true });

        const targetUsers = Users.find({
          clientIp: targetUser.clientIp
        }).fetch();

        targetUsers.forEach((user) => {
          // Remove muted users messages
          Chats.remove({
            userId: user._id
          });        
        });

        // Add users ip to black list, to prevent further sign ups
        BlackList.insert({
          clientIp: targetUser.clientIp
        });

        return false;  
      } else if (/\/createserver/.test(message)) {
        const splitMessage = message.split(' ');
        const name = splitMessage[1];
        const iteration = parseInt(splitMessage[2]);

        createNewServer(name, iteration);

        return false;
      } else if (/\/permamute/.test(message)) {
        // Find user
        const targetUser = Users.findOne({ username: message.split('/permamute')[1].trim() });

        // Set isMuted + Expiry
        Users.update(targetUser._id, {
          $set: {
            isMutedExpiry: moment().add(10, 'years').toDate()
          }
        });

        // Remove muted users messages
        Chats.remove({
          userId: targetUser._id
        });

        return false;
      } else if (/\/hardmute/.test(message)) {
        // Find user
        const targetUser = Users.findOne({ username: message.split('/hardmute')[1].trim() });
        
        // Set isMuted + Expiry
        Users.update(targetUser._id, {
          $set: {
            isMutedExpiry: moment().add(12, 'hours').toDate()
          }
        });


        // Remove muted users messages
        Chats.remove({
          userId: targetUser._id
        });

        return false;
      } else if (/\/mute/.test(message)) {
        // Set isMuted + Expiry
        Users.update({
          username: message.split('/mute')[1].toLowerCase().trim()
        }, {
          $set: {
            isMutedExpiry: moment().add(15, 'minutes').toDate()
          }
        });

        return false;
      } else if (/\/newUpdates/.test(message) && userDoc.isSuperMod) {
        Users.update({}, {
          $set: {
            newUpdates: true
          }
        }, { multi: true });
        return false;
      } else if (/\/ban/.test(message) && userDoc.isSuperMod) {

        const targetUser = Users.findOne({
          username: message.split('/ban')[1].toLowerCase().trim()
        });

        Users.update({
          _id: targetUser._id
        }, {
          $set: {
            banned: true
          }
        });

        Skills.update({
          owner: targetUser._id
        }, {
          $set: {
            banned: true
          }
        }, {
          multi: true
        });

        return false;
      } else if (/\/giveItem/.test(message) && userDoc.isSuperMod) {
        const splitMessage = message.split(' ');
        const targetUsername = splitMessage[1];
        const targetItem = splitMessage[2];
        const targetAmount = parseInt(splitMessage[3]);

        const targetUser = Users.findOne({
          username: targetUsername.toLowerCase().trim()
        });

        addItem(targetItem, targetAmount, targetUser._id);
      }
    }

    return true;
  }
});
