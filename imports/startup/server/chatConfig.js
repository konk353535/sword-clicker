import { Meteor } from "meteor/meteor"
import { Chats } from "meteor/cesarve:simple-chat/collections"
import { SimpleChat } from "meteor/cesarve:simple-chat/config"

import _ from "underscore"
import moment from "moment"

import { BlackList } from "/imports/api/blacklist/blacklist"
import { Combat } from "/imports/api/combat/combat"
import { Events } from "/imports/api/events/events"
import { FloorWaveScores } from "/imports/api/floors/floorWaveScores"
import { Skills } from "/imports/api/skills/skills"
import { Users } from "/imports/api/users/users"
import { addItem } from "/server/api/items/items.js"
import { addXp } from "/server/api/skills/skills.js"

import { activateGlobalBuff } from "/imports/api/globalbuffs/globalbuffs"
import { Items } from "/imports/api/items/items"
import { createNewServer, setServerStatus } from "/imports/api/servers/servers"
import { updateUserActivity } from "/imports/api/users/users.js"
import { sendUserChatMessage } from "/imports/chatUtils.js"
import { CInt } from "/imports/utils.js"
import { env } from "/server/validateEnv.js"
import { sendGlobalBuffWebhookMessage } from "/server/webhook.js"

import { ITEMS, ITEM_RARITIES } from "/imports/constants/items/index.js"
import { SKILLS } from "/server/constants/skills/index.js"

//const PUBLIC_ROOMS = ['Server', 'General', 'LFG', 'Help', 'Announcements'] // literally not used for anything

SimpleChat.configure({
    texts: {
        loadMore: "Load More",
        placeholder: "Type message ...",
        button: "send",
        join: "Join to",
        left: "Left the",
        room: "room at"
    },
    limit: 25,
    publishChats: function (roomId, limit) {
        // server
        return this.userId // only allow chats if we're logged in
    },
    onNewMessage: function () {},
    allow: function (message, roomId, username, avatar, name) {
        const userDoc = Users.findOne(this.userId)

        if (!userDoc) {
            return
        }

        if (userDoc.username !== username || userDoc.username !== name) {
            sendUserChatMessage({ userId: userDoc._id, message: "An unexpected error occurred." })
            return
        }

        if (message.length > 280) {
            sendUserChatMessage({
                userId: userDoc._id,
                message: "Your message exceeds 280 characters and can't be sent."
            })
            return
        }

        updateUserActivity({ userId: this.userId })

        if (userDoc.isMutedExpiry) {
            if (moment().isBefore(userDoc.isMutedExpiry)) {
                sendUserChatMessage({ userId: userDoc._id, message: "You aren't allowed to chat right now." })
                return
            } else {
                Users.update(userDoc._id, {
                    $unset: {
                        isMutedExpiry: ""
                    }
                })
            }
        }

        if (/\/transfergems/.test(message)) {
            const splitMessage = message.split(" ")
            const targetUsername = splitMessage[1]
            const targetAmount = parseInt(splitMessage[2])

            if (!_.isFinite(targetAmount) || targetAmount <= 0) {
                sendUserChatMessage({ userId: userDoc._id, message: "Invalid amount of gems to send." })
                return
            }

            let gemsToSend = targetAmount
            if (gemsToSend > userDoc.gems) {
                gemsToSend = userDoc.gems
            }

            const targetUser = Users.findOne({
                username: targetUsername.toLowerCase().trim()
            })

            if (!targetUser) {
                sendUserChatMessage({ userId: userDoc._id, message: "Unknown player to send gems to." })
                return
            }

            Events.insert(
                {
                    owner: userDoc._id,
                    event: "transfergems",
                    date: new Date(),
                    data: {
                        from: userDoc._id,
                        to: targetUser._id,
                        amount: gemsToSend
                    }
                },
                () => {}
            )

            Users.update(userDoc._id, {
                $inc: {
                    gems: gemsToSend * -1
                }
            })

            Users.update(targetUser._id, {
                $inc: {
                    gems: gemsToSend
                }
            })

            sendUserChatMessage({
                userId: userDoc._id,
                message: `Successfully transferred ${gemsToSend} gems to ${targetUser.username}.`
            })
            return
        }

        if (userDoc.isMod) {
            if (/\/banhammer/.test(message) && userDoc.isSuperMod) {
                // Find user
                const targetUser = Users.findOne({ username: message.split("/banhammer")[1].trim() })

                // Remove muted users messages
                Chats.remove({
                    userId: targetUser._id
                })

                let clientIpCalculated = "0.0.0.0"
                try {
                    if (targetUser.clientIp) {
                        clientIpCalculated = targetUser.clientIp
                    }
                } catch (err) {}

                try {
                    if (clientIpCalculated !== "0.0.0.0") {
                        const targetUsers = Users.find({
                            clientIp: clientIpCalculated
                        }).fetch()

                        targetUsers.forEach((user) => {
                            // Remove muted users messages
                            Chats.remove({
                                userId: targetUser._id
                            })
                        })
                    }
                } catch (err) {}

                // Set isMuted + Expiry
                Users.update(targetUser._id, {
                    $set: {
                        isMutedExpiry: moment().add(10, "years").toDate(),
                        "services.resume.loginTokens": [],
                        banned: true
                    }
                })

                Skills.update(
                    {
                        owner: targetUser._id
                    },
                    {
                        $set: {
                            banned: true
                        }
                    },
                    {
                        multi: true
                    }
                )

                // Set all users with this ip
                try {
                    if (clientIpCalculated !== "0.0.0.0") {
                        Users.update(
                            {
                                clientIp: clientIpCalculated
                            },
                            {
                                $set: {
                                    isMutedExpiry: moment().add(10, "years").toDate(),
                                    "services.resume.loginTokens": [],
                                    banned: true
                                }
                            },
                            { multi: true }
                        )

                        // Add users ip to black list, to prevent further sign ups
                        BlackList.insert({
                            clientIp: clientIpCalculated
                        })
                    }
                } catch (err) {}

                if (clientIpCalculated !== "0.0.0.0") {
                    sendUserChatMessage({
                        userId: userDoc._id,
                        message: `Banned ${clientIpCalculated} for 10 years and removed chat messages from ${targetUser.username} and ${targetUser.clientIp}.`
                    })
                } else {
                    sendUserChatMessage({
                        userId: userDoc._id,
                        message: `Banned ${targetUser.username} for 10 years and removed chat messages from them (IP couldn't be discovered).`
                    })
                }
                return
            } else if (/\/ipban/.test(message) && userDoc.isSuperMod) {
                // Find user
                const targetUser = Users.findOne({ username: message.split("/ipban")[1].trim() })

                // Set all users with this ip
                Users.update(
                    {
                        clientIp: targetUser.clientIp
                    },
                    {
                        $set: {
                            isMutedExpiry: moment().add(10, "years").toDate()
                        }
                    },
                    { multi: true }
                )

                const targetUsers = Users.find({
                    clientIp: targetUser.clientIp
                }).fetch()

                targetUsers.forEach((user) => {
                    // Remove muted users messages
                    Chats.remove({
                        userId: targetUser._id
                    })
                })

                // Add users ip to black list, to prevent further sign ups
                BlackList.insert({
                    clientIp: targetUser.clientIp
                })

                sendUserChatMessage({
                    userId: userDoc._id,
                    message: `Banned ${targetUser.clientIp} for 10 years and removed chat messages from ${targetUser.username}.`
                })
                return
            } else if (/\/createserver/i.test(message) && userDoc.isSuperMod) {
                const splitMessage = message.split(" ")
                const name = splitMessage[1]
                const iteration = splitMessage.length === 2 ? -1 : parseInt(splitMessage[2])
                const interationText = iteration < 0 ? "" : ` with iteration ${iteration}`

                const newServerId = createNewServer(name, iteration)

                if (newServerId) {
                    setServerStatus({ serverId: newServerId, enabled: false })
                    sendUserChatMessage({
                        userId: userDoc._id,
                        message: `Created a new, disabled server named ${name}${interationText} (#${newServerId}).`
                    })
                } else {
                    sendUserChatMessage({
                        userId: userDoc._id,
                        message: `Failed to create a new server named ${name}${interationText}.`
                    })
                }
                return
            } else if (/\/addalltownbuffs/i.test(message) && userDoc.isSuperMod) {
                activateGlobalBuff({ buffType: "town_dwelling" })
                activateGlobalBuff({ buffType: "town_quarry" })
                activateGlobalBuff({ buffType: "town_lumber_yard" })
                activateGlobalBuff({ buffType: "town_armory" })
                activateGlobalBuff({ buffType: "town_library" })
                activateGlobalBuff({ buffType: "town_observatory" })
                sendUserChatMessage({ userId: userDoc._id, message: `Added all town buffs.` })
                return
            } else if (/\/loottest/i.test(message) && userDoc.isSuperMod) {
                Meteor.call("debug.loottest")
                sendUserChatMessage({ userId: userDoc._id, message: `Test complete.` })
                return
            } else if (/\/permamute/.test(message)) {
                // Find user
                const targetUser = Users.findOne({ username: message.split("/permamute")[1].trim() })

                // Set isMuted + Expiry
                Users.update(targetUser._id, {
                    $set: {
                        isMutedExpiry: moment().add(10, "years").toDate()
                    }
                })

                // Remove muted users messages
                Chats.remove({
                    userId: targetUser._id
                })

                sendUserChatMessage({
                    userId: userDoc._id,
                    message: `Muted ${targetUser.username} for 10 years and removed chat messages from them.`
                })
                return
            } else if (/\/hardmute/.test(message)) {
                // Find user
                const targetUser = Users.findOne({ username: message.split("/hardmute")[1].trim() })

                // Set isMuted + Expiry
                Users.update(targetUser._id, {
                    $set: {
                        isMutedExpiry: moment().add(12, "hours").toDate()
                    }
                })

                // Remove muted users messages
                Chats.remove({
                    userId: targetUser._id
                })

                sendUserChatMessage({
                    userId: userDoc._id,
                    message: `Muted ${targetUser.username} for 12 hours and removed chat messages from them.`
                })
                return
            } else if (/\/mute/.test(message)) {
                const targetUser = Users.findOne({ username: message.split("/hardmute")[1].trim() })

                // Set isMuted + Expiry
                Users.update(
                    {
                        username: message.split("/mute")[1].toLowerCase().trim()
                    },
                    {
                        $set: {
                            isMutedExpiry: moment().add(15, "minutes").toDate()
                        }
                    }
                )

                sendUserChatMessage({ userId: userDoc._id, message: `Muted ${targetUser.username} for 15 minutes.` })
                return
            } else if (/\/newUpdates/.test(message) && userDoc.isSuperMod) {
                Users.update(
                    {},
                    {
                        $set: {
                            newUpdates: true
                        }
                    },
                    { multi: true }
                )

                sendGlobalBuffWebhookMessage("There are new updates available in the game!", false)

                sendUserChatMessage({ userId: userDoc._id, message: `New updates! flagged for all players.` })
                return
            } else if (/\/ban/.test(message) && userDoc.isSuperMod) {
                const targetUser = Users.findOne({
                    username: message.split("/ban")[1].toLowerCase().trim()
                })

                Users.update(
                    {
                        _id: targetUser._id
                    },
                    {
                        $set: {
                            banned: true,
                            "services.resume.loginTokens": []
                        }
                    }
                )

                Skills.update(
                    {
                        owner: targetUser._id
                    },
                    {
                        $set: {
                            banned: true
                        }
                    },
                    {
                        multi: true
                    }
                )

                sendUserChatMessage({ userId: userDoc._id, message: `Banned ${targetUser.username} forever.` })
                return
            } else if (/\/giveItem/.test(message) && userDoc.isSuperMod) {
                const splitMessage = message.trim().split(" ")

                let targetUsername,
                    targetItem,
                    targetAmount,
                    targetQuality = -1,
                    targetRarityTier = ""

                if (splitMessage.length === 2) {
                    targetUsername = userDoc.username
                    targetItem = splitMessage[1]
                    targetAmount = 1
                } else if (splitMessage.length === 3) {
                    if (CInt(splitMessage[2]) > 0) {
                        targetUsername = userDoc.username
                        targetItem = splitMessage[1]
                        targetAmount = CInt(splitMessage[2])
                    } else {
                        targetUsername = splitMessage[1]
                        targetItem = splitMessage[2]
                        targetAmount = 1
                    }
                } else if (splitMessage.length === 4) {
                    targetUsername = splitMessage[1]
                    targetItem = splitMessage[2]
                    targetAmount = CInt(splitMessage[3])
                } else if (splitMessage.length === 5) {
                    targetUsername = splitMessage[1]
                    targetItem = splitMessage[2]
                    targetAmount = CInt(splitMessage[3])
                    targetQuality = CInt(splitMessage[4])
                } else if (splitMessage.length === 6) {
                    targetUsername = splitMessage[1]
                    targetItem = splitMessage[2]
                    targetAmount = CInt(splitMessage[3])
                    targetQuality = CInt(splitMessage[4])
                    targetRarityTier = splitMessage[5]
                } else {
                    sendUserChatMessage({
                        userId: userDoc._id,
                        message: `Usage: /giveItem <player> <item> <amount> <quality> <rarity>`
                    })
                    return
                }

                while (targetItem.indexOf("-") !== -1) {
                    targetItem = targetItem.replace("-", " ")
                }

                const targetUser = Users.findOne({
                    username: targetUsername.toLowerCase().trim()
                })

                if (!targetUser) {
                    sendUserChatMessage({ userId: userDoc._id, message: `Invalid target player '${targetUsername}'.` })
                    return
                }

                if ((targetQuality !== -1) && (targetQuality < 0 || targetQuality < 0)) {
                    sendUserChatMessage({ userId: userDoc._id, message: `Invalid target quality ${targetQuality}.` })
                    return
                }

                if (targetRarityTier !== '' && !ITEM_RARITIES[targetRarityTier]) {
                    sendUserChatMessage({ userId: userDoc._id, message: `Invalid target rarity '${targetUsername}'.` })
                    return
                }

                let itemConstants = ITEMS[targetItem]
                if (!itemConstants) {
                    const ITEMS_as_Array = Object.keys(ITEMS).map((key) => {
                        return Object.assign({}, ITEMS[key])
                    })
                    ITEMS_as_Array.forEach((itemConstant) => {
                        if (itemConstant.name) {
                            if (itemConstant.name.trim().toLowerCase() == targetItem.toLowerCase()) {
                                itemConstants = itemConstant
                                targetItem = itemConstants.id
                            } else if (itemConstant.id.trim().toLowerCase() == targetItem.toLowerCase()) {
                                itemConstants = itemConstant
                                targetItem = itemConstants.id
                            }
                        }
                    })
                    if (!itemConstants) {
                        ITEMS_as_Array.forEach((itemConstant) => {
                            if (itemConstant.name) {
                                if (itemConstant.name.trim().toLowerCase().indexOf(targetItem.toLowerCase()) !== -1) {
                                    itemConstants = itemConstant
                                    targetItem = itemConstants.id
                                }
                            } else if (itemConstant.id) {
                                if (itemConstant.id.trim().toLowerCase().indexOf(targetItem.toLowerCase()) !== -1) {
                                    itemConstants = itemConstant
                                    targetItem = itemConstants.id
                                }
                            }
                        })
                    }
                    if (!itemConstants) {
                        sendUserChatMessage({ userId: userDoc._id, message: `Invalid item name or ID '${targetItem}'.'` })
                        return
                    }
                }

                addItem(targetItem, targetAmount, targetUser._id, false, targetQuality, targetRarityTier)

                const qualityText = (targetQuality >= 0) ? ` (${targetQuality}% quality)` : ''
                const rarityText = (targetRarityTier != '') ? ` (${targetRarityTier} rarity)` : ''

                sendUserChatMessage({
                    userId: userDoc._id,
                    message: `Gave ${targetUser.username} ${targetAmount} x ${itemConstants.id}${qualityText}${rarityText}`
                })
                return
            } else if (/\/debugAllItems/.test(message) && userDoc.isSuperMod && env.NODE_ENV === "development") {
                // give the caller one of every item
                // only allow this command if in dev mode

                const splitMessage = message.trim()?.split("/debugAllItems")?.[1]?.trim()?.split(" ")

                if (splitMessage.length !== 1) {
                    sendUserChatMessage({ userId: userDoc._id, message: "Usage: /debugAllItems [EVERYTHING | partial item ID]" })
                    return
                }

                if (splitMessage[0].trim().toLowerCase() == 'everything') {
                    Object.keys(ITEMS).forEach((itemId) => {
                        console.log("skip item", itemId)
                        //addItem(itemId, 1, userDoc._id)
                    })
                } else {
                    Object.keys(ITEMS).forEach((itemId) => {
                        if (itemId.trim().toLowerCase().indexOf(splitMessage[0].trim().toLowerCase()) !== -1) {
                            addItem(itemId, 1, userDoc._id)
                        }
                    })
                }
                return
            } else if (/\/changeName/i.test(message) && userDoc.isSuperMod) {
                const userPortion = message.split("/changeName")[1]?.trim()?.split(" ")
                const existingUsername = userPortion[0]?.toLowerCase()?.trim()
                const newUsername = userPortion[1]?.toLowerCase()?.trim()

                if (existingUsername == null || newUsername == null) {
                    return
                }

                const targetUser = Users.findOne({
                    username: existingUsername
                })

                const existingUser = Users.findOne({
                    username: newUsername
                })

                if (existingUser != null) {
                    // user exists, can't take their name
                    sendUserChatMessage({ userId: userDoc._id, message: "That username is already taken." })
                    return
                }

                Events.insert(
                    {
                        owner: targetUser._id,
                        event: "changeName",
                        date: new Date(),
                        data: {
                            initiator: userDoc._id,
                            oldName: existingUsername,
                            newName: newUsername
                        }
                    },
                    () => {}
                )

                Users.update(targetUser._id, {
                    $set: {
                        username: newUsername
                    }
                })

                const existingCombat = Combat.findOne({
                    owner: targetUser._id
                })

                // update their combat name
                if (existingCombat != null) {
                    Combat.update(existingCombat._id, {
                        $set: {
                            username: newUsername
                        }
                    })
                }

                // update their chats
                Chats.update(
                    {
                        userId: targetUser._id
                    },
                    {
                        $set: {
                            username: newUsername,
                            name: newUsername
                        }
                    },
                    { multi: true }
                )

                // update their stats
                Skills.update(
                    {
                        owner: targetUser._id
                    },
                    {
                        $set: {
                            username: newUsername
                        }
                    },
                    { multi: true }
                )

                // update their stats
                FloorWaveScores.update(
                    {
                        owner: targetUser._id
                    },
                    {
                        $set: {
                            username: newUsername
                        }
                    },
                    { multi: true }
                )

                sendUserChatMessage({ userId: userDoc._id, message: "Successfully updated username." })

                return
            } else if (/\/giveXp/.test(message) && userDoc.isSuperMod) {
                const splitMessage = message.trim()?.split("/giveXp")?.[1]?.trim()?.split(" ")

                let targetUsername, targetSkill, targetAmount

                if (splitMessage.length === 3) {
                    targetUsername = userDoc.username
                    targetSkill = splitMessage[1]
                    targetAmount = CInt(splitMessage[2])
                } else {
                    sendUserChatMessage({ userId: userDoc._id, message: `Usage: /giveXp player skill amount` })
                    return
                }

                const targetUser = Users.findOne({
                    username: targetUsername.toLowerCase().trim()
                })

                if (!targetUser) {
                    sendUserChatMessage({ userId: userDoc._id, message: `Invalid target player '${targetUsername}'.` })
                    return
                }

                const skill = Skills.findOne({ owner: targetUser._id, type: targetSkill })

                if (!skill) {
                    sendUserChatMessage({ userId: userDoc._id, message: `Invalid skill '${targetSkill}'.` })
                    return
                }

                if (targetAmount < 0) {
                    sendUserChatMessage({ userId: userDoc._id, message: `Can\'t remove XP (use /setLevel instead).` })
                    return
                }

                // force the logic that comes from skill ups including combat stats, unlocked recipes, etc.
                addXp(targetSkill, targetAmount, targetUser._id, true, true)

                sendUserChatMessage({
                    userId: userDoc._id,
                    message: `Gave ${targetUser.username} ${targetAmount} ${targetSkill} XP`
                })
                return
            } else if (/\/setLevel/.test(message) && userDoc.isSuperMod) {
                const splitMessage = message.trim()?.split("/setLevel")?.[1]?.trim()?.split(" ")

                let targetUsername, targetSkill, targetLevel

                if (splitMessage.length === 3) {
                    targetUsername = userDoc.username
                    targetSkill = splitMessage[1]
                    targetLevel = CInt(splitMessage[2])
                } else {
                    sendUserChatMessage({ userId: userDoc._id, message: "Usage: /setLevel <player> <skill> <level>" })
                    return
                }

                const targetUser = Users.findOne({
                    username: targetUsername.toLowerCase().trim()
                })

                if (!targetUser) {
                    sendUserChatMessage({ userId: userDoc._id, message: `Invalid target player '${targetUsername}'.` })
                    return
                }

                const skill = Skills.findOne({ owner: targetUser._id, type: targetSkill })

                if (!skill) {
                    sendUserChatMessage({ userId: userDoc._id, message: `Invalid skill '${targetSkill}'.` })
                    return
                }

                if (targetLevel < 1) {
                    sendUserChatMessage({ userId: userDoc._id, message: `Can\'t set level to below 1.` })
                    return
                }

                let totalXp = 0
                //console.log(`Total XP set: ${totalXp}, level: 0`)
                for (let i = 1; i < targetLevel; i++) {
                    let thisLevelUpReq = SKILLS[targetSkill].xpToLevel(i)
                    totalXp += thisLevelUpReq
                    //console.log(`XP required for level ${i+1} is ${thisLevelUpReq} XP, now require a total of ${totalXp} XP`)
                }

                //console.log(`Total XP set: ${totalXp}, skill ${skill._id}, level: ${targetLevel}`)

                // Update Level
                Skills.update(
                    {
                        _id: skill._id
                    },
                    {
                        $set: {
                            level: targetLevel,
                            totalXp,
                            xp: 0
                        }
                    }
                )

                // force the logic that comes from skill ups including combat stats, unlocked recipes, etc.
                addXp(targetSkill, 0, targetUser._id, true, true, true)

                sendUserChatMessage({
                    userId: userDoc._id,
                    message: `Set ${targetUser.username} ${targetSkill} level to ${targetLevel}`
                })
                return
            } else if (/\/restoreReforge/.test(message) && userDoc.isSuperMod) {
                const splitMessage = message.trim()?.split("/restoreReforge")?.[1]?.trim()?.split(" ")

                let targetUsername, targetUid

                if (splitMessage.length === 2) {
                    targetUsername = splitMessage[0]
                    targetUid = splitMessage[1]
                } else {
                    sendUserChatMessage({
                        userId: userDoc._id,
                        message: `Usage: /restoreReforge player (itemId || itemUid)`
                    })
                    return
                }

                if (!targetUid) {
                    sendUserChatMessage({ userId: userDoc._id, message: `Invalid target item uid '${targetUid}'.` })
                }

                const targetUser = Users.findOne({
                    username: targetUsername.toLowerCase().trim()
                })

                if (!targetUser) {
                    sendUserChatMessage({ userId: userDoc._id, message: `Invalid target player '${targetUsername}'.` })
                    return
                }

                // find item from event
                const reforgeEvent = Events.findOne(
                    {
                        owner: targetUser._id,
                        event: "crafting.reforgeItem",
                        $or: [{ "data.origUid": targetUid }, { "data.itemId": targetUid }]
                    },
                    { sort: { date: -1, limit: 1 } }
                )

                if (!reforgeEvent) {
                    sendUserChatMessage({ userId: userDoc._id, message: `Could not find reforge event.` })
                    return
                }

                try {
                    const itemData = JSON.parse(reforgeEvent.data.itemData)
                    Items.insert(itemData)
                    sendUserChatMessage({ userId: userDoc._id, message: `Successfully restored item.` })
                } catch (err) {
                    console.log("unable to restore item", err.message.split("\n")[0])
                    sendUserChatMessage({
                        userId: userDoc._id,
                        message: `Failed to restore item: ${err.message.split("\n")[0]}`
                    })
                }

                return
            } else if (/\/resetClassCooldown/.test(message)) {
                const splitMessage = message.trim()?.split("/resetClassCooldown")?.[1]?.trim()?.split(" ")

                let targetUsername

                if (splitMessage.length === 1) {
                    targetUsername = splitMessage[0]
                } else {
                    sendUserChatMessage({
                        userId: userDoc._id,
                        message: `Usage: /resetClassCooldown player`
                    })
                    return
                }

                const targetUser = Users.findOne({
                    username: targetUsername.toLowerCase().trim()
                })

                if (!targetUser) {
                    sendUserChatMessage({ userId: userDoc._id, message: `Invalid target player '${targetUsername}'.` })
                    return
                }

                Meteor.call("classes.clearCooldown", targetUser._id, function(err, dat) {
                    if (err || !dat) {
                        sendUserChatMessage({ userId: userDoc._id, message: `Problem clearing class change cooldown for ${targetUsername}.  ${err}.` })
                    } else {
                        sendUserChatMessage({ userId: userDoc._id, message: `Cleared class change cooldown for ${targetUsername}.` })
                    }
                })
                return
            }
        }

        try {
            if (message.trim().indexOf("/") === 0) {
                sendUserChatMessage({ userId: userDoc._id, message: "You've entered an invalid slash command." })
                return
            }
        } catch (err) {}

        if (!userDoc.isMod) {
            if (roomId === "Announcements" || RegExp("announcements", "gi").test(roomId)) {
                sendUserChatMessage({
                    userId: userDoc._id,
                    message: `Only game staff may send messages to that channel.`
                })
                return false
            }
        }

        return true
    }
})
