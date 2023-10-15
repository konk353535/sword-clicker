import { Meteor } from "meteor/meteor"
import { DDPRateLimiter } from "meteor/ddp-rate-limiter"
import _ from "underscore"
import lodash from "lodash"
import moment from "moment"

import { ITEMS } from "/imports/constants/items/index.js"
import { DONATORS_BENEFITS } from "/imports/constants/shop/index.js"
import { WOODCUTTING } from "/imports/constants/woodcutting/index.js"

import { getBuffLevel } from "/imports/api/globalbuffs/globalbuffs.js"
import { Items } from "/imports/api/items/items"
import { Skills } from "/imports/api/skills/skills"
import { Events } from "/imports/api/events/events"
import { updateUserActivity } from "/imports/api/users/users.js"
import { Woodcutting } from "/imports/api/woodcutting/woodcutting"
import { requirementsUtility } from "/server/api/crafting/crafting"
import { addItem } from "/server/api/items/items"
import { addXp } from "/server/api/skills/skills"

Meteor.methods({
    "woodcutting.fireWoodcutter"(index) {
        const woodcutting = Woodcutting.findOne({ owner: this.userId })
        const targetWoodcutter = woodcutting.woodcutters[index]

        // Ensure this woodcutter isn't already set to die
        if (!targetWoodcutter || targetWoodcutter.deathTime) {
            return
        }

        // Increase stats
        targetWoodcutter.stats.attackSpeed *= WOODCUTTING.suicidalFury.attackSpeedIncrease / 100

        // Append death time
        targetWoodcutter.deathTime = moment().add(WOODCUTTING.suicidalFury.duration, "seconds").toDate()

        Woodcutting.update(
            {
                owner: this.userId
            },
            {
                $set: {
                    woodcutters: woodcutting.woodcutters
                }
            }
        )

        updateUserActivity({ userId: Meteor.userId() })
    },

    "woodcutting.gameUpdate"() {
        // Fetch all db data we need
        const woodcutting = Woodcutting.findOne({ owner: this.userId })

        if (!woodcutting) {
            return
        }

        const userDoc = Meteor.user()

        // Update last updated immediately
        // in case an error occurs further on in the code, the users updated will not get set
        // Giving them a lot of extra XP!
        Woodcutting.update(woodcutting._id, {
            $set: { lastGameUpdated: new Date() }
        })

        // Determine time since last update
        const now = moment()
        let minutesElapsed = moment.duration(now.diff(woodcutting.lastGameUpdated)).asMinutes()

        // Cap offline gains to 8 hours
        if (minutesElapsed > 8 * 60) {
            minutesElapsed = 8 * 60
        }

        // Determine item and exp gains
        const gainedItems = {}
        let gainedXp = 0

        // Iterate through all miners for minutesElapsed
        woodcutting.woodcutters.forEach((currentWoodcutter) => {
            let localMinutesElapsed = minutesElapsed
            // Is this woodcutter got a death timer on it?
            if (currentWoodcutter.deathTime) {
                // See how long is left on the deathTime
                const timeDiff = moment().diff(currentWoodcutter.deathTime)
                if (moment().isAfter(currentWoodcutter.deathTime)) {
                    localMinutesElapsed -= timeDiff / 60
                }

                if (localMinutesElapsed < 0) {
                    localMinutesElapsed = 0
                } else if (localMinutesElapsed > 1) {
                    localMinutesElapsed = 1
                }
            }

            const rawSwingCount = currentWoodcutter.stats.attackSpeed * localMinutesElapsed

            // attack bonus is 0 (no bonus tiers)
            let woodcutterAttackModifier = 0

            // attack speed modifier is 100%
            let woodcutterAttackSpeedModifier = 1

            // get lumber yard buff level
            const townBuffLumberYardLevel = getBuffLevel("town_lumber_yard")

            // add bonus attack modifier of 0-20 (0-4 tiers) depending on if town lumber yard buff (karma) is active and at what strength
            if (townBuffLumberYardLevel > 1) {
                woodcutterAttackModifier += (townBuffLumberYardLevel - 1) * 5 // 5-20 (1-4 tiers) starting at buff level 2
            }

            // add bonus attack speed modifier of 0-15% depending on if town lumber yard buff (karma) is active and at what strength
            if (townBuffLumberYardLevel > 0) {
                woodcutterAttackSpeedModifier += (townBuffLumberYardLevel + 1) * 0.025 // 5% min, 2.5% per buff level (5% - 15%)
            }

            // mutate definite swing count by bonus attack speed modifier (100% +/- modifiers)
            let definiteSwingCount = Math.floor(rawSwingCount * woodcutterAttackSpeedModifier)
            if (rawSwingCount % 1 >= Math.random()) {
                definiteSwingCount += 1
            }

            // Possible woods
            const possibleLogs = Object.keys(WOODCUTTING.woods)
                .map((woodKey) => {
                    return WOODCUTTING.woods[woodKey]
                })
                .filter((log) => {
                    return currentWoodcutter.stats.attack + woodcutterAttackModifier >= log.requiredAttack
                })

            const sortedLogs = _.sortBy(possibleLogs, "chance")
            sortedLogs.forEach((log) => {
                let rawGeneratedLogs = log.chance * definiteSwingCount
                if (currentWoodcutter.stats.accuracy) {
                    rawGeneratedLogs *= 1 + currentWoodcutter.stats.accuracy / 100
                }

                // Apply membership benefits
                if (userDoc.woodcuttingUpgradeTo && moment().isBefore(userDoc.woodcuttingUpgradeTo)) {
                    rawGeneratedLogs *= 1 + DONATORS_BENEFITS.woodcuttingBonus / 100
                }

                let definiteGenerateLogs = Math.floor(rawGeneratedLogs)
                if (rawGeneratedLogs % 1 >= Math.random()) {
                    definiteGenerateLogs += 1
                }

                if (definiteGenerateLogs > 0) {
                    if (gainedItems[log.id]) {
                        gainedItems[log.id] += definiteGenerateLogs
                    } else {
                        gainedItems[log.id] = definiteGenerateLogs
                    }
                }

                gainedXp += log.xp * definiteGenerateLogs
                definiteSwingCount -= definiteGenerateLogs
            })
        })

        if (Meteor.user().logEvents) {
            Events.insert(
                {
                    owner: Meteor.userId(),
                    event: "trace.woodcutting.gameUpdate",
                    date: new Date(),
                    data: {
                        stack: new Error().stack,
                        minutesElapsed: minutesElapsed,
                        gainedItems: gainedItems
                    }
                },
                () => {}
            )
        }

        Object.keys(gainedItems).forEach((itemId) => {
            addItem(itemId, gainedItems[itemId])
        })

        addXp("woodcutting", gainedXp)

        // If there is any woodcutters with death timers past now, kill em
        woodcutting.woodcutters.forEach((woodcutter) => {
            if (woodcutter.deathTime && moment().isAfter(woodcutter.deathTime)) {
                Woodcutting.update(
                    woodcutting._id,
                    {
                        $pull: {
                            woodcutters: {
                                deathTime: woodcutter.deathTime
                            }
                        }
                    },
                    { multi: true }
                )
            }
        })
    },

    "woodcutting.fetchWoodcutters"() {
        const woodcuttingSkill = Skills.findOne({
            owner: Meteor.userId(),
            type: "woodcutting"
        })

        const woodcuttersArray = Object.keys(WOODCUTTING.woodcutters)
            .map((key) => {
                return WOODCUTTING.woodcutters[key]
            })
            .filter((recipe) => {
                // Only show woodcutters we can hire, or close to ( 1 level away )
                return woodcuttingSkill.level + 1 >= recipe.requiredWoodcuttingLevel
            })

        return woodcuttersArray
    },

    "woodcutting.hireWoodcutter"(woodcutterId) {
        const woodcutting = Woodcutting.findOne({ owner: Meteor.userId() })

        // Do we have room for more woodcutters?
        if (woodcutting.woodcutters.length >= WOODCUTTING.baseMaxWoodcutters) {
            return
        }

        // Is this a valid recipe?
        const woodcutterConstants = WOODCUTTING.woodcutters[woodcutterId]
        if (!woodcutterConstants) {
            return
        }

        // Fetch the axe which we will use, as it will disappear when we call requirements util
        const axeToUse = Items.findOne(
            {
                itemId: woodcutterConstants.axeId,
                owner: Meteor.userId(),
                locked: false
            },
            {
                sort: [["quality", "desc"]]
            }
        )

        if (!axeToUse) {
            return
        }

        let tempRequirementsWithoutItems = lodash.cloneDeep(woodcutterConstants.required).filter((requirement) => {
            return requirement.type !== "item"
        })

        // Do we have the requirements for this craft (items / levels / gold)
        if (!requirementsUtility(tempRequirementsWithoutItems, 1)) {
            return
        }

        const stats = lodash.cloneDeep(ITEMS[axeToUse.itemId].stats)

        if (axeToUse.extraStats) {
            Object.keys(axeToUse.extraStats).forEach((stat) => {
                if (stats[stat] === undefined) {
                    stats[stat] = 0
                }
                stats[stat] += axeToUse.extraStats[stat]
            })
        }

        // Add woodcutter
        Woodcutting.update(woodcutting._id, {
            $push: {
                woodcutters: {
                    stats,
                    icon: woodcutterConstants.icon,
                    name: woodcutterConstants.name,
                    woodcutterId: woodcutterConstants.id,
                    quality: axeToUse.quality
                }
            }
        })

        Items.remove(axeToUse._id)

        updateUserActivity({ userId: Meteor.userId() })
    }
})

const MINUTE = 60 * 1000

// DDPRateLimiter.addRule({ type: 'method', name: 'woodcutting.fireWoodcutter' }, 10, 1 * MINUTE);
DDPRateLimiter.addRule(
    {
        type: "method",
        name: "woodcutting.gameUpdate",
        userId(userId) {
            return userId
        }
    },
    3,
    10000
)
// DDPRateLimiter.addRule({ type: 'method', name: 'woodcutting.fetchWoodcutters' }, 10, 1 * MINUTE);
// DDPRateLimiter.addRule({ type: 'method', name: 'woodcutting.hireWoodcutter' }, 10, 1 * MINUTE);
// DDPRateLimiter.addRule({ type: 'subscription', name: 'woodcutting' }, 40, 2 * MINUTE);

Meteor.publish("woodcutting", function () {
    //Transform function
    const transform = function (doc) {
        doc.maxWoodcutters = WOODCUTTING.baseMaxWoodcutters
        return doc
    }

    const self = this

    const observer = Woodcutting.find({
        owner: this.userId
    }).observe({
        added: function (document) {
            self.added("woodcutting", document._id, transform(document))
        },
        changed: function (newDocument, oldDocument) {
            self.changed("woodcutting", oldDocument._id, transform(newDocument))
        },
        removed: function (oldDocument) {
            self.removed("woodcutting", oldDocument._id)
        }
    })

    self.onStop(function () {
        observer.stop()
    })

    self.ready()
})
