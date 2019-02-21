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

import { IsValid, CInt } from '/imports/utils.js';
import { sendUserChatMessage } from '/imports/chatUtils.js';
import { updateUserActivity } from '/imports/api/users/users.js';
import { createNewServer, setServerStatus } from '/imports/api/servers/servers';
import { activateGlobalBuff } from '/imports/api/globalbuffs/globalbuffs';

import { ITEMS } from '/imports/constants/items/index.js';
import { FLOORS } from '/server/constants/floors/index.js';

import _ from 'underscore';
import moment from 'moment';

const PUBLIC_ROOMS = ['Server', 'General', 'LFG', 'Help', 'Announcements']

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
    const userDoc = Users.findOne(this.userId);

    if (!userDoc) {
      return;
    }

    if ((userDoc.username !== username) || (userDoc.username !== name)) {
      sendUserChatMessage({ userId: userDoc._id, message: 'An unexpected error occurred.' });
      return;
    }

    if (message.length > 280) {
      sendUserChatMessage({ userId: userDoc._id, message: 'Your message exceeds 280 characters and can\'t be sent.' });
      return;
    }

    updateUserActivity({userId: this.userId});

    if (userDoc.isMutedExpiry) {
      if (moment().isBefore(userDoc.isMutedExpiry)) {
        sendUserChatMessage({ userId: userDoc._id, message: 'You aren\'t allowed to chat right now.' });
        return;
      } else {
        Users.update(userDoc._id, {
          $unset: {
            isMutedExpiry: ""
          }
        });
      }
    }

    if (/\/transfergems/.test(message)) {
      const splitMessage = message.split(' ');
      const targetUsername = splitMessage[1];
      const targetAmount = parseInt(splitMessage[2]);

      if ((!_.isFinite(targetAmount)) || (targetAmount <= 0)) {
        sendUserChatMessage({ userId: userDoc._id, message: 'Invalid amount of gems to send.' });
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
        sendUserChatMessage({ userId: userDoc._id, message: 'Unknown player to send gems to.' });
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

      sendUserChatMessage({ userId: userDoc._id, message: `Successfully transferred ${gemsToSend} gems to ${targetUser.username}.` });
      return;
    }
  
    if (userDoc.isMod) {
      if (/\/banhammer/.test(message) && userDoc.isSuperMod) {
        // Find user
        const targetUser = Users.findOne({ username: message.split('/banhammer')[1].trim() });

        // Remove muted users messages
        Chats.remove({
          userId: targetUser._id
        });

        let clientIpCalculated = '0.0.0.0';
        try {
          if (targetUser.clientIp) {
            clientIpCalculated = targetUser.clientIp;
          }
        } catch (err) {
        };
        
        try {
          if (clientIpCalculated !== '0.0.0.0') {
            const targetUsers = Users.find({
              clientIp: clientIpCalculated
            }).fetch();

            targetUsers.forEach((user) => {
              // Remove muted users messages
              Chats.remove({
                userId: targetUser._id
              });        
            });
          }
        } catch (err) {
        }
        
        // Set isMuted + Expiry
        Users.update(targetUser._id, {
          $set: {
            isMutedExpiry: moment().add(10, 'years').toDate()
          }
        });
        
        // Set all users with this ip
        try {
          if (clientIpCalculated !== '0.0.0.0') {
            Users.update({
              clientIp: clientIpCalculated
            }, {
              $set: {
                isMutedExpiry: moment().add(10, 'years').toDate()
              }
            }, { multi: true });

            // Add users ip to black list, to prevent further sign ups
            BlackList.insert({
              clientIp: clientIpCalculated
            });
          }
        } catch (err) {
        }

        if (clientIpCalculated !== '0.0.0.0') {
          sendUserChatMessage({ userId: userDoc._id, message: `Banned ${clientIpCalculated} for 10 years and removed chat messages from ${targetUser.username} and ${targetUser.clientIp}.` });
        } else {
          sendUserChatMessage({ userId: userDoc._id, message: `Banned ${targetUser.username} for 10 years and removed chat messages from them (IP couldn't be discovered).` });
        }
        return;
      } else if (/\/ipban/.test(message) && userDoc.isSuperMod) {
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
            userId: targetUser._id
          });        
        });

        // Add users ip to black list, to prevent further sign ups
        BlackList.insert({
          clientIp: targetUser.clientIp
        });

        sendUserChatMessage({ userId: userDoc._id, message: `Banned ${targetUser.clientIp} for 10 years and removed chat messages from ${targetUser.username}.` });
        return;
      } else if (/\/createserver/i.test(message) && userDoc.isSuperMod) {
        const splitMessage = message.split(' ');
        const name = splitMessage[1];
        const iteration = (splitMessage.length === 2) ? -1 : parseInt(splitMessage[2]);
        const interationText = (iteration < 0) ? '' : ` with iteration ${iteration}`;

        const newServerId = createNewServer(name, iteration);

        if (newServerId) {
          setServerStatus({serverId: newServerId, enabled: false});
          sendUserChatMessage({ userId: userDoc._id, message: `Created a new, disabled server named ${name}${interationText} (#${newServerId}).` });
        } else {
          sendUserChatMessage({ userId: userDoc._id, message: `Failed to create a new server named ${name}${interationText}.` });
        }
        return;
      } else if (/\/addalltownbuffs/i.test(message) && userDoc.isSuperMod) {
        activateGlobalBuff({buffType: 'town_dwelling'});
        activateGlobalBuff({buffType: 'town_quarry'});
        activateGlobalBuff({buffType: 'town_lumber_yard'});
        activateGlobalBuff({buffType: 'town_armory'});
        activateGlobalBuff({buffType: 'town_library'});
        activateGlobalBuff({buffType: 'town_observatory'});
        sendUserChatMessage({ userId: userDoc._id, message: `Added all town buffs.` });
        return;
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

        sendUserChatMessage({ userId: userDoc._id, message: `Muted ${targetUser.username} for 10 years and removed chat messages from them.` });
        return;
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

        sendUserChatMessage({ userId: userDoc._id, message: `Muted ${targetUser.username} for 12 hours and removed chat messages from them.` });
        return;
      } else if (/\/mute/.test(message)) {
        // Set isMuted + Expiry
        Users.update({
          username: message.split('/mute')[1].toLowerCase().trim()
        }, {
          $set: {
            isMutedExpiry: moment().add(15, 'minutes').toDate()
          }
        });

        sendUserChatMessage({ userId: userDoc._id, message: `Muted ${targetUser.username} for 15 minutes.` });
        return;
      } else if (/\/newUpdates/.test(message) && userDoc.isSuperMod) {
        Users.update({}, {
          $set: {
            newUpdates: true
          }
        }, { multi: true });

        sendUserChatMessage({ userId: userDoc._id, message: `New updates! flagged for all players.` });
        return;
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

        sendUserChatMessage({ userId: userDoc._id, message: `Banned ${targetUser.username} forever.` });
        return;
      } else if (/\/giveItem/.test(message) && userDoc.isSuperMod) {
        const splitMessage = message.trim().split(' ');
        
        let targetUsername, targetItem, targetAmount;
        
        if (splitMessage.length === 2) {
          targetUsername = userDoc.username;
          targetItem = splitMessage[1];
          targetAmount = 1;
        } else if (splitMessage.length === 3) {
          if (CInt(splitMessage[2]) > 0) {
            targetUsername = userDoc.username;
            targetItem = splitMessage[1];
            targetAmount = CInt(splitMessage[2]);
          } else {
            targetUsername = splitMessage[1];
            targetItem = splitMessage[2];
            targetAmount = 1;
          }
        } else if (splitMessage.length === 4) {
          targetUsername = splitMessage[1];
          targetItem = splitMessage[2];
          targetAmount = CInt(splitMessage[3]);
        } else {
          sendUserChatMessage({ userId: userDoc._id, message: `Usage: /giveItem <player> <item> <amount>` });
          return;
        }
        
        while (targetItem.indexOf('-') !== -1) {
          targetItem = targetItem.replace('-', ' ');
        }
        
        const targetUser = Users.findOne({
          username: targetUsername.toLowerCase().trim()
        });
        
        if (!targetUser) {
          sendUserChatMessage({ userId: userDoc._id, message: `Invalid target player '${targetUsername}'.` });
          return;
        }

        let itemConstants = ITEMS[targetItem];
        if (!itemConstants) {
          const ITEMS_as_Array = Object.keys(ITEMS).map((key) => {
            return Object.assign({}, ITEMS[key]);
          });
          ITEMS_as_Array.forEach((itemConstant) => {
            if (itemConstant.name) {
              if (itemConstant.name.trim().toLowerCase() == targetItem.toLowerCase()) {
                itemConstants = itemConstant;
                targetItem = itemConstants.id;
              }
            }
          });
          if (!itemConstants) {
            sendUserChatMessage({ userId: userDoc._id, message: `Invalid item ID '${targetItem}'.'` });
            return;
          }
        }
        
        addItem(targetItem, targetAmount, targetUser._id);
        
        sendUserChatMessage({ userId: userDoc._id, message: `Gave ${targetUser.username} ${targetAmount} x ${targetItem}` });
        return;
      }
    }

    try {
      if (message.trim().indexOf('/') === 0) {
        sendUserChatMessage({ userId: userDoc._id, message: 'You\'ve entered an invalid slash command.' });
        return;
      }
    } catch (err) {
    }
    
    if (!userDoc.isMod) {
      if (roomId === 'Announcements' || RegExp('announcements', 'gi').test(roomId)) {
        sendUserChatMessage({ userId: userDoc._id, message: `Only game staff may send messages to that channel.` });
        return false;
      }
    }
  
    return true;
  }
});
