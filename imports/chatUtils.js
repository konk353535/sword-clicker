import lodash from "lodash"
import { Chats } from "meteor/cesarve:simple-chat/collections"

export const sendUserChatMessage = function sendUserChatMessage({ userId, message, avatar }) {
    try {
        Chats.insert({
            message: lodash.escape(message),
            username: "Game",
            name: "Game",
            date: new Date(),
            custom: {
                roomType: "Game"
            },
            roomId: `Game-${userId}`,
            avatar: avatar
        })
    } catch (err) {}
}
