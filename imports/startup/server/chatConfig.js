import { SimpleChat } from 'meteor/cesarve:simple-chat/config'
import { BlackList } from '/imports/api/blacklist/blacklist';
import { Users } from '/imports/api/users/users';
import { Skills } from '/imports/api/skills/skills';
import { Groups } from '/imports/api/groups/groups';
import { Chats } from 'meteor/cesarve:simple-chat/collections';
import { addItem } from '/server/api/items/items.js';

import moment from 'moment';

const PUBLIC_ROOMS = ['General', 'LFG', 'Offtopic', 'Help']

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
    if (PUBLIC_ROOMS.find(room => room === roomId)) {
      return this.userId;
    }

    if (roomId === `Game-${this.userId}`) {
      return this.userId;
    }

    const targetGroup = Groups.findOne({
      _id: roomId,
      members: this.userId
    });

    if (targetGroup) {
      return this.userId;
    }

    return false;
  },
  onNewMessage: function () {

  },
  allow: function(message, roomId, username, avatar, name){
    if (message.length > 140) {
      return;
    }

    const userDoc = Users.findOne(this.userId);

    if (userDoc.lastActionDate && moment().isAfter(moment(userDoc.lastActionDate).add(1, 'minutes'))) {
      Users.update({
        _id: userDoc._id
      }, {
        $set: {
          lastAction: 'chatting',
          lastActionDate: new Date()
        }
      }, () => {});
    }

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
