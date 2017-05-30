import { SimpleChat } from 'meteor/cesarve:simple-chat/config'
import { Users } from '/imports/api/users/users';
import { Chats } from 'meteor/cesarve:simple-chat/collections';

import moment from 'moment';

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
  publishChats: function(roomId, limit){ //server
    return this.userId;
  },
  onNewMessage: function () {

  },
  allow: function(message, roomId, username, avatar, name){
    if (message.length > 512) {
      return;
    }

    const userDoc = Users.findOne(this.userId);

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
      if (/\/hardmute/.test(message)) {
        // Find user
        const targetUser = Users.findOne({ username: message.split('/hardmute')[1].trim() })
        
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
      }
    }

    return true;
  }
});
