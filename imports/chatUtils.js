import { Chats } from 'meteor/cesarve:simple-chat/collections';

export const sendUserChatMessage = function sendUserChatMessage({ userId, message }) {
  try {
    Chats.insert({
      message: message,
      username: 'Game',
      name: 'Game',
      date: new Date(),
      custom: {
        roomType: 'Game'
      },
      roomId: `Game-${userId}`
    });
  } catch (err) {
  }
};
