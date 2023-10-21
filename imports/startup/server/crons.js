import { Accounts } from "meteor/accounts-base"
import { SimpleSchema } from "meteor/aldeed:simple-schema"
import { HTTP } from "meteor/http"
import { SyncedCron } from "meteor/littledata:synced-cron"
import { Meteor } from "meteor/meteor"
import { Mongo } from "meteor/mongo"

import faker from "faker"
import moment from "moment/moment"
import uuid from "node-uuid"
import _ from "underscore"

import { env } from "/server/validateEnv"

import { Chats } from "meteor/cesarve:simple-chat/collections"
import { Battles, BattlesList } from "/imports/api/battles/battles"
import { Combat } from "/imports/api/combat/combat"
import { BossHealthScores } from "/imports/api/floors/bossHealthScores"
import { FloorWaveScores } from "/imports/api/floors/floorWaveScores"
import { Floors } from "/imports/api/floors/floors"
import { Mining } from "/imports/api/mining/mining"
import { Servers } from "/imports/api/servers/servers"
import { Skills } from "/imports/api/skills/skills"
import { Users } from "/imports/api/users/users"

import { ENEMIES } from "/server/constants/enemies/index.js"
import { FLOORS } from "/server/constants/floors/index.js"

import { createNewFloor } from "/imports/api/floors/floors"
import { getBuffLevel } from "/imports/api/globalbuffs/globalbuffs.js"
import { CInt } from "/imports/utils.js"
import { distributeRewards, removeBattle, resolveLoot } from "/server/api/battles/battleMethods/completeBattle"
import { addItem } from "/server/api/items/items.js"
import { newTownDay } from "/server/api/town/town.js"

if (process.env["NODE_ENV"] === "production" && process.env["CLUSTER_WORKER_ID"] !== "1") return

// Prefab some guest account
SyncedCron.add({
    name: "Prefab Guests",
    schedule: function (parser) {
        return parser.text("every 30 seconds")
    },
    job: function () {
        Servers.find()
            .fetch()
            .forEach((thisServer) => {
                // Check for existing prefab accounts
                const existingCount = Users.find({
                    isPreFabbedGuest: true,
                    server: thisServer._id
                }).count()

                const amountToCreate = 20 - existingCount

                if (amountToCreate > 0) {
                    for (let i = 0; i < amountToCreate; i++) {
                        const username = `guest_${faker.internet.userName()}`.replace(".", "")
                        console.log(username)
                        const password = uuid.v4()

                        Accounts.createUser({
                            username,
                            password,
                            isGuest: true,
                            isPreFabbedGuest: true,
                            server: thisServer._id
                        })
                    }

                    console.log(`Created ${amountToCreate} pre fabbed accounts on server ${thisServer.name}`)
                }
            })
    }
})

// Handle town dwelling buff
SyncedCron.add({
    name: "Town Dwelling Buff",
    schedule: function (parser) {
        return parser.text("every 20 minutes")
    },
    job: function () {
        Servers.find()
            .fetch()
            .forEach((thisServer) => {
                try {
                    const activeUsersByMiningUpdate = Mining.find({
                        lastGameUpdated: { $gte: moment().subtract(8, "hours").toDate() }
                    }).fetch()
                    let activeUsersArray = []
                    activeUsersByMiningUpdate.forEach((activeUser) => {
                        activeUsersArray.push(activeUser.owner)
                    })
                    const activeUserDocs = Users.find({
                        _id: { $in: activeUsersArray },
                        server: thisServer._id
                    }).fetch()
                    const activeUserCount = activeUserDocs.length

                    if (activeUserCount > 0) {
                        const townBuffDwellingLevel = getBuffLevel("town_dwelling", thisServer._id)

                        if (townBuffDwellingLevel > 0) {
                            let foodList = []
                            foodList.push("lettice") // farming level 1, floors 1, 5-6, 9-13, 15, 17-20
                            foodList.push("grape_fruit") // farming level 3
                            foodList.push("red_apple") // farming level 5, floors 5-6, 14
                            foodList.push("rubia_flower") // farming level 1
                            foodList.push("basil") // farming level 4
                            if (townBuffDwellingLevel >= 2) {
                                foodList.push("pear") // farming level 8
                                foodList.push("pineapple") // farming level 10, floors 5-6, 16
                                foodList.push("pink_rose") // farming level 5
                                foodList.push("lavender") // floors 3-9
                                foodList.push("tamarind_honey") // floor 6
                            }
                            if (townBuffDwellingLevel >= 3) {
                                foodList.push("watermelon") // farming level 15, floor 6
                                foodList.push("potato") // farming level 20
                                foodList.push("carrot") // farming level 20, floor 2, 9
                                foodList.push("lemon") // farming level 2 (but restores energy and costly), floors 5-6 (as seeds only)
                                foodList.push("endive") // farming level 6
                                foodList.push("lemon_grass") // floors 14 and 16
                            }
                            if (townBuffDwellingLevel >= 4) {
                                foodList.push("acai_berry") // farming level 30
                                foodList.push("orange") // farming level 35
                                foodList.push("juniper") // farming level 7
                                foodList.push("chilli") // floors 10-20
                                foodList.push("garlic") // floors 14 and 18
                                foodList.push("chives") // floors 15 and 17
                            }
                            if (townBuffDwellingLevel >= 5) {
                                foodList.push("banana") // farming level 40
                                foodList.push("rockmelon") // farming level 50
                                foodList.push("agrimony") // farming level 12 (valuable)
                                foodList.push("sorrel") // floors 17 and 20
                                foodList.push("lemon_honey") // floor 18
                            }

                            // choose X random players where X is a % of the active player list (and a higher % for a higher buff level)
                            const userChance = 0.15 + 0.05 * townBuffDwellingLevel // 20%, 25%, 30%, 35%, 40%
                            const usersToPick = Math.ceil(activeUserCount * userChance)

                            for (let i = 0; i < usersToPick; i++) {
                                const targetUser = _.sample(activeUserDocs)
                                const foodItemId = _.sample(foodList)

                                // buff level 1 = 1 item
                                // buff level 2 = 1 item
                                // buff level 3 = 1-2 items
                                // buff level 4 = 1-4 items
                                // buff level 5 = 1-6 items
                                addItem(
                                    foodItemId,
                                    CInt(Math.ceil(Math.random() * Math.ceil((townBuffDwellingLevel * townBuffDwellingLevel) / 4))),
                                    targetUser._id
                                )
                            }
                        }
                    }
                } catch (err) {
                    console.log("Exception in 'Town Buffs' cron:")
                    console.log(err)
                }
            })
    }
})

// Handle town library buff
SyncedCron.add({
    name: "Town Library Buff",
    schedule: function (parser) {
        return parser.text("every 10 minutes")
    },
    job: function () {
        Servers.find()
            .fetch()
            .forEach((thisServer) => {
                try {
                    const activeUsersByMiningUpdate = Mining.find({
                        lastGameUpdated: { $gte: moment().subtract(8, "hours").toDate() }
                    }).fetch()
                    let activeUsersArray = []
                    activeUsersByMiningUpdate.forEach((activeUser) => {
                        activeUsersArray.push(activeUser.owner)
                    })
                    const activeUserDocs = Users.find({
                        _id: { $in: activeUsersArray },
                        server: thisServer._id
                    }).fetch()
                    const activeUserCount = activeUserDocs.length

                    if (activeUserCount > 0) {
                        const townBuffLibraryLevel = getBuffLevel("town_library", thisServer._id)

                        if (townBuffLibraryLevel > 0) {
                            let codexList = []
                            codexList.push("pine_magic_book")
                            codexList.push("beech_magic_book")
                            if (townBuffLibraryLevel >= 2) {
                                codexList.push("ash_magic_book")
                                codexList.push("oak_magic_book")
                            }
                            if (townBuffLibraryLevel >= 3) {
                                codexList.push("maple_magic_book")
                                codexList.push("walnut_magic_book")
                            }
                            if (townBuffLibraryLevel >= 4) {
                                codexList.push("cherry_magic_book")
                            }
                            if (townBuffLibraryLevel >= 5) {
                                codexList.push("mahogany_magic_book")
                            }

                            // choose X random players where X the town library buff level
                            const usersToPick = townBuffLibraryLevel

                            for (let i = 0; i < usersToPick; i++) {
                                const targetUser = _.sample(activeUserDocs)
                                const codexItemId = _.sample(codexList)

                                addItem(codexItemId, 1, targetUser._id)
                            }
                        }
                    }
                } catch (err) {
                    console.log("Exception in 'Town Buffs' cron:")
                    console.log(err)
                }
            })
    }
})

// Reset town buffs
SyncedCron.add({
    name: "Reset Town Buffs (karma)",
    schedule: function (parser) {
        return parser.cron("0 0 * * * * *")
    },
    job: function () {
        newTownDay()
    }
})

// Reset personal karma
SyncedCron.add({
    name: "Reset Personal Karma (karma)",
    schedule: function (parser) {
        return parser.cron("0 0 * * * * *")
    },
    job: function () {
        Users.update(
            { townKarma: { $ne: 0 } }, // always use an index to avoid blindly setting data for the whole database
            { $set: { townKarma: 0 } },
            { multi: true }
        )
    }
})

// Reset tower things (daily)
SyncedCron.add({
    name: "Reset Offs",
    schedule: function (parser) {
        return parser.cron("0 0 * * * * *")
    },
    job: function () {
        // Fetch current active floor
        const currentFloor = Floors.findOne({ floorComplete: false })
        const floorConstants = FLOORS[currentFloor.floor]

        // Get boss' HP
        const bossEnemyId = floorConstants.boss.enemy.id
        const bossEnemyConstants = ENEMIES[bossEnemyId]

        const activeTowerUsers = FloorWaveScores.find({
            floor: currentFloor.floor,
            points: {
                $gte: 25
            }
        }).count()
        console.log(`active tower users ${activeTowerUsers}`)
        console.log(`boss enemy constants`)
        console.log(bossEnemyConstants)
        const newHealthMax = activeTowerUsers * bossEnemyConstants.stats.healthMax
        console.log(`new health max is ${newHealthMax}`)
        Floors.update({ health: { $gt: 0 }, floorComplete: false }, { $set: { healthMax: newHealthMax } })

        console.log("Have re-evaluated boss max health")

        // Enable users to fight waves again
        // Filter to anyone with any offs attempts
        Combat.update(
            { towerContributions: { $ne: [] } }, // always use an index to avoid blindly setting data for the whole database
            { $set: { towerContributions: [], towerContributionsToday: 0 } },
            { multi: true }
        )
        // Filter to anyone with any contribution score
        Combat.update(
            { towerContributionsToday: { $ne: 0 } }, // always use an index to avoid blindly setting data for the whole database
            { $set: { towerContributions: [], towerContributionsToday: 0 } },
            { multi: true }
        )
        // These two filters will skip anyone who hasn't played in the last day.

        // Reset gems today
        Users.update(
            { fakeGemsToday: { $ne: 0 } }, // always use an index to avoid blindly setting data for the whole database
            { $set: { fakeGemsToday: 0 } },
            { multi: true }
        )
    }
})

// Reset tower things (daily)
SyncedCron.add({
    name: "Check boss health / death",
    schedule: function (parser) {
        return parser.cron("* * * * * * *")
    },
    job: function () {
        Servers.find({})
            .fetch()
            .forEach((server) => {
                // Fetch current active floor
                const currentFloor = Floors.findOne({ server: server._id, floorComplete: false })

                if (!currentFloor) {
                    return
                }

                // reset boss HP
                if (moment().isAfter(currentFloor.bossResetAt)) {
                    if (Math.floor(currentFloor.health) <= 0) {
                        // kill the boss
                        console.log("Health is below 0")
                        // Complete the floor!
                        let updatedCount = Floors.update(
                            {
                                floor: currentFloor.floor,
                                server: currentFloor.server,
                                floorComplete: false
                            },
                            {
                                $set: {
                                    floorComplete: true
                                }
                            }
                        )

                        //console.log(`Updated count is ${updatedCount}`);
                        if (updatedCount === 1) {
                            // Distribute rewards
                            distributeRewards({ floor: currentFloor.floor, server: currentFloor.server })

                            // Notify general chat
                            if (currentFloor.floor === env.MAX_FLOOR) {
                                Chats.insert({
                                    message: `The boss on floor ${currentFloor.floor} has been defeated!
                THE TOWER HAS BEEN COMPLETED!`,
                                    username: "SERVER",
                                    name: "SERVER",
                                    date: new Date(),
                                    custom: {
                                        roomType: "Server"
                                    },
                                    roomId: `Server-${currentFloor.server}`
                                })
                            } else {
                                Chats.insert({
                                    message: `The boss on floor ${currentFloor.floor} has been defeated!
                Floor ${currentFloor.floor + 1} is now unlocked.`,
                                    username: "SERVER",
                                    name: "SERVER",
                                    date: new Date(),
                                    custom: {
                                        roomType: "Server"
                                    },
                                    roomId: `Server-${currentFloor.server}`
                                })
                            }

                            // Insert the next floor (To do, make this pass a valid active tower users number)
                            const activeTowerUsers = FloorWaveScores.find({
                                server: currentFloor.server,
                                floor: currentFloor.floor,
                                points: {
                                    $gte: 25
                                }
                            }).count()
                            //const newPointMax = FLOORS.getNewPointCount(currentFloor.floor + 1, activeTowerUsers);

                            // Get bosses hp
                            //const bossEnemyId = FLOORS[currentFloor.floor + 1].boss.enemy.id;
                            //const bossEnemyConstants = ENEMIES[bossEnemyId];

                            // Reset tower contributions for all
                            // Filter to anyone with any offs attempts
                            Combat.update(
                                { towerContributions: { $ne: [] } }, // always use an index to avoid blindly setting data for the whole database
                                { $set: { towerContributions: [], towerContributionsToday: 0 } },
                                { multi: true }
                            )
                            // Filter to anyone with any contribution score
                            Combat.update(
                                { towerContributionsToday: { $ne: 0 } }, // always use an index to avoid blindly setting data for the whole database
                                { $set: { towerContributions: [], towerContributionsToday: 0 } },
                                { multi: true }
                            )
                            // These two filters will skip anyone who hasn't played in the last day.

                            BossHealthScores.remove({})

                            createNewFloor(
                                currentFloor.server,
                                currentFloor.floor + 1,
                                activeTowerUsers /*, newPointMax, bossEnemyConstants.stats.healthMax * activeTowerUsers */
                            )

                            // Create our next floor
                            /*
            Floors.insert({
              floor: currentFloor.floor + 1,
              createdAt: new Date(),
              points: 0,
              pointsMax: newPointMax, // Need some kind of
              health: bossEnemyConstants.stats.healthMax * activeTowerUsers,
              healthMax: bossEnemyConstants.stats.healthMax * activeTowerUsers,
              floorComplete: false,
              server: currentFloor.server,
              loot: []
            });
            */

                            // Enable users to fight bosses again
                            Combat.update({ foughtBoss: true }, { $set: { foughtBoss: false } }, { multi: true })
                        }
                    } else {
                        // reset the boss
                        const floorConstants = FLOORS[currentFloor.floor]

                        // Get bosses hp
                        const bossEnemyId = floorConstants.boss.enemy.id
                        const bossEnemyConstants = ENEMIES[bossEnemyId]

                        const activeTowerUsers = FloorWaveScores.find({
                            server: server._id,
                            floor: currentFloor.floor,
                            points: {
                                $gte: 25
                            }
                        }).count()
                        console.log(`Server: ${server.name}: active tower users ${activeTowerUsers}`)
                        console.log(`boss enemy constants`)
                        console.log(bossEnemyConstants)
                        const resetDate = moment(currentFloor.bossResetAt).add(24, "hours").toDate()
                        console.log(`new health max is ${currentFloor.healthMax}`)
                        Floors.update(
                            {
                                server: server._id,
                                floor: currentFloor.floor,
                                floorComplete: false
                            },
                            {
                                $set: {
                                    health: currentFloor.healthMax,
                                    bossResetAt: resetDate
                                }
                            }
                        )

                        console.log("Have finally reset boss health")

                        // Clear hp dealt on leaderboards
                        BossHealthScores.remove({})

                        console.log("Boss hp score reset")

                        // Enable users to fight bosses again
                        Combat.update({ foughtBoss: true }, { $set: { foughtBoss: false } }, { multi: true })

                        console.log("Fought boss is done now")

                        console.log("All done for boss battle reset")
                    }
                }
            })
    }
})

SyncedCron.add({
    name: "Clean up battles and chat",
    schedule: function (parser) {
        return parser.cron("* * * * * * *")
    },
    job: function () {
        Battles.remove({
            updatedAt: {
                $lt: moment().subtract(1, "month").toDate()
            }
        })

        Chats.remove({
            date: {
                $lt: moment().subtract(1, "month").toDate()
            }
        })

        return true
    }
})

// Finish dead battles
SyncedCron.add({
    name: "Remove dead battles",
    schedule: function (parser) {
        return parser.text("every 30 seconds")
    },
    job: function () {
        BattlesList.find({
            createdAt: { $lte: moment().subtract(10, "minutes").toDate() },
            $or: [{ isBigBoss: { $exists: false } }, { isBigBoss: false }]
        })
            .fetch()
            .forEach((battleList) => {
                HTTP.call(
                    "DELETE",
                    `${Meteor.settings.public.battleUrl}/battle/${battleList._id}?balancer=${battleList.balancer}&userId=SERVER&userName=cron.deleteBattle`,
                    (error, result) => {
                        removeBattle(battleList._id)
                    }
                )
            })

        BattlesList.find({
            createdAt: { $lte: moment().subtract(30, "minutes").toDate() },
            isBigBoss: true
        })
            .fetch()
            .forEach((battleList) => {
                HTTP.call(
                    "DELETE",
                    `${Meteor.settings.public.battleUrl}/battle/${battleList._id}?balancer=${battleList.balancer}&userId=SERVER&userName=cron.deleteBattle`,
                    (error, result) => {
                        removeBattle(battleList._id)
                    }
                )
            })
        return true
    }
})

// Update global skill rankings
SyncedCron.add({
    name: "Update Rankings",
    schedule: function (parser) {
        return parser.text("every 12 hours")
    },
    job: function () {
        const stats = ["mining", "crafting", "woodcutting", "attack", "defense", "magic", "health", "farming", "inscription", "astronomy"]

        Servers.find({})
            .fetch()
            .forEach((server) => {
                const playersTotalXp = {}

                stats.forEach((statName) => {
                    // Fetch all skills with that stat name by order
                    Skills.find({ type: statName, server: server._id }, { sort: { totalXp: -1 } })
                        .fetch()
                        .forEach((skill, skillIndex) => {
                            if (playersTotalXp[skill.owner]) {
                                playersTotalXp[skill.owner] += skill.totalXp
                            } else {
                                playersTotalXp[skill.owner] = skill.totalXp
                            }
                            Skills.update(skill._id, { $set: { rank: skillIndex + 1 } })
                        })
                })

                Object.keys(playersTotalXp).forEach((playerId) => {
                    Skills.update({ owner: playerId, type: "total" }, { $set: { totalXp: playersTotalXp[playerId] } })
                })

                // Fetch total
                Skills.find({ type: "total", server: server._id }, { sort: { totalXp: -1 } })
                    .fetch()
                    .forEach((skill, skillIndex) => {
                        Skills.update(skill._id, { $set: { rank: skillIndex + 1 } })
                    })
            })

        return true
    }
})

// Resolve Need Greed loot
SyncedCron.add({
    name: "Resolve Need Greed loot",
    schedule: function (parser) {
        return parser.cron("* * * * * * *")
    },
    job: function () {
        Battles.find({
            "loot.0": { $exists: true },
            createdAt: {
                $lte: moment().subtract(1, "minutes").toDate()
            },
            $or: [{ lootResolved: { $exists: false } }, { lootResolved: false }]
        })
            .fetch()
            .forEach((battle) => {
                resolveLoot(battle)
            })
        return true
    }
})

SyncedCron.config({
    utc: true
})

Meteor.setTimeout(
    () => {
        SyncedCron.start()

        export const SC = Mongo.Collection.get("cronHistory")

        const SynchedCronSchema = new SimpleSchema(
            {
                intendedAt: { type: Date, optional: true },
                startedAt: { type: Date, optional: true },
                finishedAt: { type: Date, optional: true },
                name: { type: String, optional: true },
                result: { type: Boolean, optional: true }
            },
            {
                clean: {
                    filter: false
                }
            }
        )

        SC.attachSchema(SynchedCronSchema)
    },
    Meteor.settings.is_dev ? 5000 : 60000
)
