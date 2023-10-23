import { Meteor } from "meteor/meteor"
import { Accounts } from "meteor/accounts-base"

import moment from "moment"
import uuid from "node-uuid"
import _ from "underscore"

import { BlackList } from "/imports/api/blacklist/blacklist"
import { Combat } from "/imports/api/combat/combat"
import { FloorWaveScores } from "/imports/api/floors/floorWaveScores"
import { Mining } from "/imports/api/mining/mining"
import { Servers } from "/imports/api/servers/servers"
import { Skills } from "/imports/api/skills/skills"
import { Users } from "/imports/api/users/users"
import { getIPFromConnection, updateUserActivity } from "/imports/api/users/users.js"
import { addItem } from "/server/api/items/items.js"
import { addXp } from "/server/api/skills/skills"

Meteor.methods({
    "users.initUiState"() {
        Users.update(
            {
                _id: Meteor.userId(),
                uiState: {
                    $exists: false
                }
            },
            {
                $set: {
                    uiState: {}
                }
            }
        )
    },

    "users.activeUsers"() {
        const user = Users.findOne({ _id: Meteor.userId() })

        if (user) {
            const passiveUserCount = Mining.find({
                server: user.server,
                lastGameUpdated: {
                    $gte: moment().subtract(15, "minutes").toDate()
                }
            }).count()

            const activeUserCount = Users.find({
                server: user.server,
                lastActivity: {
                    $gte: moment().subtract(5, "minutes").toDate()
                }
            }).count()

            return { passive: passiveUserCount, active: activeUserCount }
            
        } else {
            const passiveUserCount =  Mining.find({
                lastGameUpdated: {
                    $gte: moment().subtract(15, "minutes").toDate()
                }
            }).count()

            const activeUserCount = Users.find({
                lastActivity: {
                    $gte: moment().subtract(5, "minutes").toDate()
                }
            }).count()

            return { passive: passiveUserCount, active: activeUserCount }
        }

        return { passive: 0, active: 0}
    },

    "users.createGuest"(serverId) {
        const serverDoc = Servers.findOne({
            _id: serverId
        })

        if (!serverDoc) {
            throw new Meteor.Error("something-is-wrong", "Something went wrong, sorry :|")
        }

        if (serverDoc.noGuests) {
            throw new Meteor.Error("no-guests-allowed", "Guest accounts aren't being accepted at this time.")
        }

        let clientIp = ""
        try {
            clientIp = getIPFromConnection(this.connection)
        } catch (err) {}

        if (BlackList.findOne({ clientIp })) {
            throw new Meteor.Error("something-is-wrong", "Your I.P. address is banned.")
        }

        // Fetch a prefabbed guest
        const existingGuest = Users.findOne({
            isPreFabbedGuest: true,
            server: serverId
        })

        if (!existingGuest) {
            return
        }

        // Set prefabbed guest to false
        Users.update(
            existingGuest._id,
            {
                $set: {
                    isPreFabbedGuest: false,
                    clientIp: clientIp
                }
            },
            (err, res) => {}
        )

        // Update mining to now
        Mining.update(
            {
                owner: existingGuest._id
            },
            {
                $set: {
                    lastGameUpdated: new Date()
                }
            },
            (err, res) => {}
        )

        // Update password
        const tempPassword = uuid.v4()
        Accounts.setPassword(existingGuest._id, tempPassword, { logout: false })

        // Return guests username and password (Might need to set the password again)
        return {
            password: tempPassword,
            username: existingGuest.username
        }
    },

    "users.updateGuest"({ username, password, email }) {
        // Make sure this account is actually a guest
        if (!Meteor.user().isGuest) {
            throw new Meteor.Error("not-guest", "Cant update details if you are not a guest")
        }

        if (Users.findOne({ "emails.address": email })) {
            throw new Meteor.Error("email-taken", "Cant use an already registered email")
        }

        let clientIp = ""
        try {
            clientIp = getIPFromConnection(this.connection)
        } catch (err) {}

        // Update username
        Accounts.setUsername(Meteor.userId(), username)

        // NOTE: new players are not announced during creation anymore, but instead are announced when the tutorial is completed or skipped
        /*
    Chats.insert({
      message: `Welcome new player ${username} to the game!`,
      username: 'GAME',
      name: 'GAME',
      date: new Date(),
      custom: {
        roomType: 'General'
      },
      roomId: `General`
    });
    */

        // Update password
        Accounts.setPassword(Meteor.userId(), password, { logout: false })

        // Update isGuest flag + add email
        Users.update(Meteor.userId(), {
            $set: {
                isGuest: false,
                isPreFabbedGuest: false,
                emails: [
                    {
                        address: email,
                        verified: false
                    }
                ],
                clientIp: clientIp
            }
        })

        // Send email verification
        Accounts.sendVerificationEmail(Meteor.userId())

        const newUsername = Meteor.user().username

        // Update other places in the app now that username has changed
        Skills.update(
            {
                owner: Meteor.userId()
            },
            {
                $set: {
                    username: newUsername
                }
            },
            { multi: true }
        )

        Combat.update(
            {
                owner: Meteor.userId()
            },
            {
                $set: {
                    username: newUsername
                }
            }
        )

        FloorWaveScores.update(
            {
                owner: Meteor.userId()
            },
            {
                $set: {
                    username: newUsername
                }
            },
            { multi: true }
        )
    },

    "users.readNewUpdates"() {
        Users.update(this.userId, {
            $set: {
                newUpdates: false
            }
        })
    },

    "users.skipTutorial"() {
        const userDoc = Users.findOne({ _id: Meteor.userId() })
        if (!userDoc || !userDoc.tutorial) {
            return false
        }

        // Chats.insert({
        //     message: `Welcome new player ${userDoc.username} to the game!`,
        //     username: "GAME",
        //     name: "GAME",
        //     date: new Date(),
        //     custom: {
        //         roomType: "General"
        //     },
        //     roomId: `General`
        // })

        return Users.update(
            {
                _id: Meteor.userId()
            },
            {
                $unset: {
                    tutorial: ""
                }
            }
        )
    },

    "users.completedTutorial"() {
        const userDoc = Users.findOne({})
        if (!userDoc || !userDoc.tutorial) {
            return false
        }

        // return Chats.insert({
        //     message: `Welcome new player ${userDoc.username} to the game!`,
        //     username: "GAME",
        //     name: "GAME",
        //     date: new Date(),
        //     custom: {
        //         roomType: "General"
        //     },
        //     roomId: `General`
        // })
    },

    "users.tutorialUpdate"(updateObject) {
        const userDoc = Meteor.user()

        if (!userDoc || !userDoc.tutorial) {
            return false
        }

        const allKeys = Object.keys(updateObject)

        const validIds = [
            "hideCrafting",
            "highlightCrafting",

            "hideWoodcutting",
            "highlightWoodcutting",

            "hideFarming",
            "highlightFarming",
            "hideFarmingPlots",
            "highlightFarmingPlots",

            "hideInscription",
            "highlightInscription",
            "hideInscriptionAbilities",
            "highlightInscriptionAbilities",
            "hideInscriptionPaper",
            "highlightInscriptionPaper",
            "hideInscriptionPigments",
            "highlightInscriptionPigments",

            "hideCombat",
            "highlightCombat",
            "highlightCombatEquipment",
            "highlightCombatAbilities",
            "highlightCombatTower",
            "highlightCombatPersonalQuest",
            "highlightCombatAdventures",

            "hideCombatEquipment",
            "hideCombatAbilities",
            "hideCombatTower",
            "hideCombatPersonalQuest",
            "hideCombatAdventures",
            "hideCombatGroup",
            "hideCombatBattleLog",

            "hideMiningEquipment",
            "highlightMiningEquipment",
            "hideMiningMiners",
            "highlightMiningMiners",
            "hideMiningProspectors",
            "highlightMiningProspectors",

            "currentStep"
        ]

        const setObject = {}

        let abortRequest = false
        allKeys.forEach((key) => {
            if (!_.contains(validIds, key)) {
                console.log(`rejecting - ${key}`)
                abortRequest = true
            } else if (!_.isBoolean(updateObject[key] && !_.isFinite(updateObject[key]))) {
                console.log(`rejecting - ${key}`)
                abortRequest = true
            } else {
                if (key === "currentStep" && updateObject[key] <= userDoc.tutorial.currentStep) {
                    abortRequest = true
                } else {
                    setObject[`tutorial.${key}`] = updateObject[key]
                }
            }
        })
        if (abortRequest) {
            return
        }

        if (setObject["tutorial.currentStep"] === 2) {
            const miningSkill = Skills.findOne({
                owner: Meteor.userId(),
                type: "mining"
            })

            if (miningSkill.level === 1) {
                addXp("mining", 21)
            }
        } else if (setObject["tutorial.currentStep"] === 9) {
            // Check users current farming level
            const woodcuttingSkill = Skills.findOne({
                owner: Meteor.userId(),
                type: "woodcutting"
            })

            if (woodcuttingSkill.level === 1) {
                addXp("woodcutting", 2)
                addItem("pine_log", 1, Meteor.userId())
            }
        } else if (setObject["tutorial.currentStep"] === 16) {
            // Check users current farming level
            const farmingSkill = Skills.findOne({
                owner: Meteor.userId(),
                type: "farming"
            })

            if (farmingSkill.level === 1) {
                addXp("farming", 21)
                addItem("pine_log", 30, Meteor.userId())
                //addItem('pine_paper', 1, Meteor.userId());
                addItem("rubia_flower_seed", 1, Meteor.userId())
            }
        } else if (setObject["tutorial.currentStep"] === 10000) {
            return Users.update(
                {
                    _id: Meteor.userId()
                },
                {
                    $unset: {
                        tutorial: ""
                    },
                    $set: {
                        newUpdates: false // don't start fresh players with a list of updates
                    }
                }
            )
        }

        return Users.update(
            {
                _id: Meteor.userId()
            },
            {
                $set: setObject
            }
        )
    },

    "users.search"(searchValue) {
        if (searchValue.length < 3 || !/^\w+$/.test(searchValue)) {
            return []
        }

        return Users.find(
            {
                username: {
                    $regex: `${searchValue}*`
                }
            },
            {
                fields: {
                    username: true,
                    lastActivity: true,
                    _id: false
                },
                limit: 5
            }
        ).fetch()
    },

    "users.setItemAutoActions"(itemId, autoActionFlag) {
        // find and remove the flag
        Users.update({ _id: Meteor.userId() }, { $pull: { itemAutoActions: { itemId: itemId } } })

        if (autoActionFlag == "normal") {
            // do nothing!
        } else if (autoActionFlag == "hide" || autoActionFlag == "lock" || autoActionFlag == "sell" || autoActionFlag == "donate") {
            // add a new flag for this item (any existing is guaranteed to be removed above)
            Users.update({ _id: Meteor.userId() }, { $push: { itemAutoActions: { itemId: itemId, action: autoActionFlag } } })
        }
    },

    "users.setUiState"(id, value) {
        const validIds = [
            "showChat",
            "showSummaryList",
            "showNumberShorthand",
            "inscriptionFilter",
            "inscriptionLevelFilter",
            "craftingFilter",
            "combatTab",
            "miningTab",
            "farmingTab",
            "newCombatType",
            "magicTab",
            "achievementTab",
            "towerFloor",
            "questLevel",
            "craftingTierFilter.primitive",
            "craftingTierFilter.copper",
            "craftingTierFilter.tin",
            "craftingTierFilter.bronze",
            "craftingTierFilter.iron",
            "craftingTierFilter.silver",
            "craftingTierFilter.gold",
            "craftingTierFilter.carbon",
            "craftingTierFilter.steel",
            "craftingTierFilter.platinum",
            "craftingTierFilter.titanium",
            "craftingTierFilter.tungsten",
            "craftingTierFilter.obsidian",
            "craftingTierFilter.cobalt",
            "craftingTierFilter.mithril",
            "craftingTierFilter.adamantium",
            "craftingTierFilter.orichalcum",
            "craftingTierFilter.meteorite",
            "craftingTierFilter.fairy_steel",
            "craftingTierFilter.elven_steel",
            "craftingTierFilter.cursed",
            "battleAgain",
            "itemFilter",
            "miningMultihit",
            "seedsFilter",
            "miningMultihit",
            "recipeTileConsumables",
            "craftingShowMore",
            "townSection",
            "energyUse",
            "ngAutoMode",
            "darkMode",
            "largeChatEnabled",
            "autopage",
            "floatingTextDisabled",
            "combatDeathsDisabled",
            "idleFeatureDots"
        ]

        if (_.contains(validIds, id)) {
            const username = Meteor.user().username.toLowerCase()

            username.replace(" ", "_")
            username.replace("-", "_")
            username.replace(".", "_")

            const setObject = {
                username
            }
            setObject[`uiState.${id}`] = value

            Users.update(
                {
                    _id: Meteor.userId()
                },
                {
                    $set: setObject
                }
            )

            updateUserActivity({ userId: Meteor.userId() })
        }
    }
})

const MINUTE = 60 * 1000
const clientAddress = function clientAddress(in_clientAddress) {
    try {
        if (this && this.connection) {
            return getIPFromConnection(this.connection)
        }
    } catch (err) {}
    return true
}

// DDPRateLimiter.addRule({ type: 'method', name: 'users.updateGuest' }, 10, 2 * MINUTE);
// DDPRateLimiter.addRule({ type: "method", name: "users.createGuest", clientAddress }, 3, 24 * 60 * MINUTE)
// DDPRateLimiter.addRule({ type: "method", name: "ATCreateUserServer", clientAddress }, 3, 24 * 60 * MINUTE)
// DDPRateLimiter.addRule({ type: 'method', name: 'users.initUiState' }, 10, 10 * MINUTE);
// DDPRateLimiter.addRule({ type: 'method', name: 'users.activeUsers' }, 10, 2 * MINUTE);
// DDPRateLimiter.addRule({ type: 'method', name: 'users.setUiState' }, 50, 1 * MINUTE);
// DDPRateLimiter.addRule({ type: 'subscription', name: 'userData' }, 50, 1 * MINUTE);

Meteor.publish("userData", function () {
    if (this.userId) {
        return Meteor.users.find(
            {
                _id: this.userId
            },
            {
                fields: {
                    server: 1,
                    gold: 1,
                    uiState: 1,
                    tutorial: 1,
                    battleSecret: 1,
                    newUpdates: 1,
                    gems: 1,
                    fakeGems: 1,
                    membershipTo: 1,
                    personalQuest: 1,
                    miningUpgradeTo: 1,
                    craftingUpgradeTo: 1,
                    combatUpgradeTo: 1,
                    woodcuttingUpgradeTo: 1,
                    astronomyUpgradeTo: 1,
                    farmingUpgradeTo: 1,
                    inscriptionUpgradeTo: 1,
                    isMod: 1,
                    isSuperMod: 1,
                    isGuest: 1,
                    isMutedExpiry: 1,
                    stats: 1,
                    townKarma: 1,
                    classData: 1,
                    itemAutoActions: 1
                }
            }
        )
    } else {
        this.ready()
    }
})
