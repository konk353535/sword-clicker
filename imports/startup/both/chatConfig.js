import { SimpleChat } from 'meteor/cesarve:simple-chat/config'

SimpleChat.configure ({
  texts:{
    loadMore: 'Load More',
    placeholder: 'Type message ...',
    button: 'send',
    join: 'Join to',
    left: 'Left the',
    room: 'room at'
  },
  limit: 10,
  publishChats: function(roomId, limit){ //server
    return this.userId;
  },
  onNewMessage: function () {

  },
  allow: function(message, roomId, username, avatar, name){
    return this.userId;
  }
});
