import lodash from "lodash"
import { Meteor } from "meteor/meteor"
import moment from "moment"
import _ from "underscore"

import { ASTRONOMY } from "/imports/constants/astronomy/index.js"

import { Astronomy } from "/imports/api/astronomy/astronomy"
import { userCurrentClass } from "/imports/api/classes/classes.js"
import { Events } from "/imports/api/events/events"
import { Users } from "/imports/api/users/users"

import { getBuffLevel } from "/imports/api/globalbuffs/globalbuffs.js"
import { updateUserActivity } from "/imports/api/users/users.js"
import { requirementsUtility } from "/server/api/crafting/crafting"
import { addItem } from "/server/api/items/items"
import { addXp } from "/server/api/skills/skills"

Meteor.methods({
    // Upgrade the main mages stats
    "astronomy.upgradeMage"(stat) {
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //
        //  Big ol' debug thing
        //
        try {
            const logUserDoc = Meteor.user()
            if (logUserDoc) {
                console.log(`\x1b[33m[API] ${logUserDoc.username} ${logUserDoc.clientIp} "\x1b[1mastronomy.upgradeMage\x1b[22m"("${stat}")\x1b[0m`)
                if (logUserDoc.xpActionsBlocked) {
                    throw new Meteor.Error("action-blocked", "That action is blocked; please contact support.")
                }
            }
        } catch (err) {
            if (err?.error === "action-blocked") {
                throw err
            }
        }
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////


        if (!_.contains(["attackSpeed", "criticalChance", "ancientShard", "completeShard"], stat)) {
            throw new Meteor.Error("invalid-stat", "Not a valid mage stat")
        }

        // Get current value
        const astronomy = Astronomy.findOne({ owner: Meteor.userId() })
        const mainMage = astronomy.mages[0]

        // Get cost of specified stat
        const requirements = ASTRONOMY.upgradeCosts[stat](mainMage.stats[stat])

        if (!requirementsUtility(requirements, 1)) {
            throw new Meteor.Error("missed-requirements", "don't meet requirements")
        }

        if (mainMage.stats[stat] == null) {
            mainMage.stats[stat] = 0
        }

        mainMage.stats[stat] += 1

        const userDoc = Meteor.user()

        // Does user have astronomy upgrade
        const hasAstronomyUpgrade = userDoc.astronomyUpgradeTo && moment().isBefore(userDoc.astronomyUpgradeTo)
        if (hasAstronomyUpgrade && _.findWhere(astronomy.mages, { id: "donatorMage" })) {
            const donatorMage = _.findWhere(astronomy.mages, { id: "donatorMage" })
            donatorMage.stats = {
                attackSpeed: Math.round(mainMage.stats.attackSpeed / 2),
                criticalChance: mainMage.stats.criticalChance,
                completeShard: mainMage.stats.completeShard,
                ancientShard: mainMage.stats.ancientShard
            }
        }

        // Increment stat
        Astronomy.update(astronomy._id, {
            $set: {
                mages: astronomy.mages
            }
        })

        updateUserActivity({ userId: Meteor.userId() })
    },
    // Fetch main mage upgrade costs
    "astronomy.upgradeCosts"() {
        // Get main mage
        const astronomy = Astronomy.findOne({
            owner: Meteor.userId()
        })

        const mainMage = astronomy.mages[0]
        const upgrades = {}

        if (!mainMage.stats.ancientShard) {
            mainMage.stats.ancientShard = 0
        }

        if (!mainMage.stats.completeShard) {
            mainMage.stats.completeShard = 0
        }

        Object.keys(mainMage.stats).forEach((mageStat) => {
            upgrades[mageStat] = ASTRONOMY.upgradeCosts[mageStat](mainMage.stats[mageStat])
        })

        return upgrades
    },
    // Cost to hire a mage
    "astronomy.hireMageCost"() {
        const astronomy = Astronomy.findOne({ owner: Meteor.userId() })
        if (!astronomy) {
            return
        }
        const mainMage = astronomy.mages[0]
        if (!mainMage) {
            return
        }

        return ASTRONOMY.mageHireCost(mainMage)
    },
    // Hire a specific type of mage
    "astronomy.hireMage"(type) {
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //
        //  Big ol' debug thing
        //
        try {
            const logUserDoc = Meteor.user()
            if (logUserDoc) {
                console.log(`\x1b[33m[API] ${logUserDoc.username} ${logUserDoc.clientIp} "\x1b[1mastronomy.hireMage\x1b[22m"("${type}")\x1b[0m`)
                if (logUserDoc.xpActionsBlocked) {
                    throw new Meteor.Error("action-blocked", "That action is blocked; please contact support.")
                }
            }
        } catch (err) {
            if (err?.error === "action-blocked") {
                throw err
            }
        }
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////


        if (!_.contains(["fire", "water", "air", "earth"], type)) {
            throw new Meteor.Error("missed-requirements", "invalid mage type")
        }
        const astronomy = Astronomy.findOne({ owner: Meteor.userId() })

        // Do we have room for a new mage?
        const currentMages = astronomy.mages.length
        let maxMages = ASTRONOMY.baseMaxMages

        const userDoc = Meteor.user()

        // Does user have astronomy upgrade
        const hasAstronomyUpgrade = userDoc.astronomyUpgradeTo && moment().isBefore(userDoc.astronomyUpgradeTo)
        if (hasAstronomyUpgrade) {
            maxMages = maxMages + 1
        }

        if (currentMages >= maxMages) {
            throw new Meteor.Error("missed-requirements", "already have the max # of mages")
        }

        const mainMage = astronomy.mages[0]
        const requirements = ASTRONOMY.mageHireCost(mainMage)

        if (!requirementsUtility(requirements, 1)) {
            throw new Meteor.Error("missed-requirements", "don't meet requirements")
        }

        // Add mage to our list
        astronomy.mages.push({
            type,
            stats: {
                attackSpeed: Math.floor(astronomy.mages[0].stats.attackSpeed / 2),
                criticalChance: Math.floor(astronomy.mages[0].stats.criticalChance / 2)
            },
            gold: requirements[0].amount
        })

        Astronomy.update(astronomy._id, {
            $set: {
                mages: astronomy.mages
            }
        })

        updateUserActivity({ userId: Meteor.userId() })
    },
    // Deposit gold to mage
    "astronomy.depositMageGold"(index, amount) {
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //
        //  Big ol' debug thing
        //
        try {
            const logUserDoc = Meteor.user()
            if (logUserDoc) {
                console.log(`\x1b[33m[API] ${logUserDoc.username} ${logUserDoc.clientIp} "\x1b[1mastronomy.depositMageGold\x1b[22m"(${index}, ${amount})\x1b[0m`)
                if (logUserDoc.xpActionsBlocked) {
                    throw new Meteor.Error("action-blocked", "That action is blocked; please contact support.")
                }
            }
        } catch (err) {
            if (err?.error === "action-blocked") {
                throw err
            }
        }
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////


        if (amount <= 0) {
            return
        }
        // Check we have enough gold, and deposit it
        const astronomy = Astronomy.findOne({ owner: Meteor.userId() })

        // Do we have enough gold
        const userDoc = Meteor.user()

        if (userDoc.gold < amount) {
            throw new Meteor.Error("invalid-gold", "don't have that much gold")
        }

        // Does mage exist?
        if (astronomy.mages[index] && astronomy.mages[index].type) {
            const targetMage = astronomy.mages[index]
            targetMage.gold += amount
        } else {
            throw new Meteor.Error("invalid-mage", "mage does not exist")
        }

        // Update user, then update mage
        Users.update(Meteor.userId(), {
            $inc: {
                gold: amount * -1
            }
        })

        Astronomy.update(astronomy._id, {
            $set: {
                mages: astronomy.mages
            }
        })

        Events.insert(
            {
                owner: Meteor.userId(),
                event: "astronomy.depositMageGold",
                date: new Date(),
                data: {
                    index: index,
                    amount: amount
                }
            },
            () => {}
        )

        updateUserActivity({ userId: Meteor.userId() })
    },
    // Withdraw gold from mage
    "astronomy.withdrawMageGold"(index, amount) {
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //
        //  Big ol' debug thing
        //
        try {
            const logUserDoc = Meteor.user()
            if (logUserDoc) {
                console.log(`\x1b[33m[API] ${logUserDoc.username} ${logUserDoc.clientIp} "\x1b[1mastronomy.withdrawMageGold\x1b[22m"(${index}, ${amount})\x1b[0m`)
                if (logUserDoc.xpActionsBlocked) {
                    throw new Meteor.Error("action-blocked", "That action is blocked; please contact support.")
                }
            }
        } catch (err) {
            if (err?.error === "action-blocked") {
                throw err
            }
        }
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////


        if (amount <= 0) {
            return
        }

        // If more gold then what is there specified, withdraw all gold
        const astronomy = Astronomy.findOne({ owner: Meteor.userId() })

        // Do we have enough gold
        const userDoc = Meteor.user()

        // Does mage exist?
        if (astronomy.mages[index] && astronomy.mages[index].type && astronomy.mages[index].gold) {
            const targetMage = astronomy.mages[index]
            if (targetMage.gold < amount) {
                amount = targetMage.gold
                targetMage.gold = 0
            } else {
                targetMage.gold -= amount
            }
        } else {
            throw new Meteor.Error("invalid-mage", "mage does not exist")
        }

        // Update user, then update mage
        Users.update(Meteor.userId(), {
            $inc: {
                gold: Math.round(amount)
            }
        })

        Astronomy.update(astronomy._id, {
            $set: {
                mages: astronomy.mages
            }
        })

        Events.insert(
            {
                owner: Meteor.userId(),
                event: "astronomy.withdrawMageGold",
                date: new Date(),
                data: {
                    index: index,
                    amount: amount
                }
            },
            () => {}
        )

        updateUserActivity({ userId: Meteor.userId() })
    },
    // Boost mage
    "astronomy.boostMage"(index) {},
    // Game Update
    "astronomy.gameUpdate"() {
        // Fetch all db data we need
        const astronomy = Astronomy.findOne({ owner: this.userId })

        if (!astronomy) {
            return
        }

        const userDoc = Meteor.user()

        const originalMages = lodash.cloneDeep(astronomy.mages)

        // Determine time since last update
        const now = moment()
        let hoursElapsed = moment.duration(now.diff(astronomy.lastGameUpdated)).asHours()

        // Cap offline gains to 8 hours
        if (hoursElapsed > 8) {
            hoursElapsed = 8
        }

        // Determine item and exp gains
        const gainedItems = {}
        let gainedXp = 0

        // Cost of mage per hour
        const mainMage = astronomy.mages[0]
        const costPerHour = ASTRONOMY.mageHireCost(mainMage)[0].amount

        // Does user have astronomy upgrade
        const hasAstronomyUpgrade = userDoc.astronomyUpgradeTo && moment().isBefore(userDoc.astronomyUpgradeTo)

        // Does user contain members mage?
        if (_.findWhere(astronomy.mages, { id: "donatorMage" })) {
            // Is this user not a donator anymore? if not strip donator mage
            if (!hasAstronomyUpgrade) {
                astronomy.mages = astronomy.mages.filter((mage) => {
                    return mage.id !== "donatorMage"
                })
            }
        } else {
            // Is this user a donator? If so add mage in
            if (hasAstronomyUpgrade) {
                // Get main mage
                const mainMage = _.find(astronomy.mages, (mage) => {
                    return !mage.type
                })

                astronomy.mages.push({
                    id: "donatorMage",
                    stats: {
                        attackSpeed: Math.round(mainMage.stats.attackSpeed / 2),
                        criticalChance: mainMage.stats.criticalChance
                    }
                })
            }
        }

        // Iterate through all mages for minutesElapsed
        astronomy.mages.forEach((currentMage) => {
            let localHoursElapsed = hoursElapsed

            if (currentMage.type) {
                // Check there is enough gold
                const maxTime = currentMage.gold / costPerHour
                if (localHoursElapsed > maxTime) {
                    currentMage.gold = 0
                    localHoursElapsed = maxTime
                } else {
                    // Remove gold
                    currentMage.gold -= localHoursElapsed * costPerHour
                }
            }

            let localMageAttackSpeed = currentMage.stats.attackSpeed
            let mageAttackSpeedBuffFromClass = 0
            let mageAttackSpeedBuffFromTown = 0

            const userClass = userCurrentClass()
            if (userClass?.unlocked && userClass?.equipped === "wizard") {
                mageAttackSpeedBuffFromClass = 0.25
            }

            const townBuffObservatoryLevel = getBuffLevel("town_observatory")
            if (townBuffObservatoryLevel > 0) {
                mageAttackSpeedBuffFromTown = (townBuffObservatoryLevel + 1) * 0.03 // 6% - 18%
            }

            localMageAttackSpeed *= 1 + mageAttackSpeedBuffFromClass + mageAttackSpeedBuffFromTown

            // Calculate shard fragments found
            let totalFound = localMageAttackSpeed * localHoursElapsed
            if (totalFound < 1 && Math.random() < totalFound) {
                totalFound = 1
            }

            // Do we crit?
            let critFinder = 1
            let critChance = currentMage.stats.criticalChance
            while (critChance > 100) {
                critFinder++
                critChance -= 100
            }
            if (Math.random() <= critChance / 100) {
                critFinder++
            }
            totalFound *= critFinder // critFinder can either be 1 (didn't crit), 2 (crit or crit chance > 100), or 3+ (crit + crit chance > 100)

            // base fragment XP gain
            gainedXp += totalFound

            // Based on total found see if we get complete shards
            const completeChance = 1 / 500
            let foundComplete = 0
            let completeChances = 1
            let completeChanceExtra = currentMage.stats.completeShard ? currentMage.stats.completeShard : 0
            while (completeChanceExtra > 100) {
                completeChances++
                completeChanceExtra -= 100
            }
            for (let i = 0; i < completeChances; i++) {
                if (Math.random() <= completeChance * totalFound * (1 + completeChanceExtra / 100)) {
                    foundComplete++
                }
            }

            // complete shard XP gain
            gainedXp += 100 * foundComplete

            // Based on total found see if we get ancient shards
            const ancientChance = 1 / 5000
            let foundAncient = 0
            let ancientChances = 1
            let ancientChanceExtra = currentMage.stats.ancientShard ? currentMage.stats.ancientShard : 0
            while (ancientChanceExtra > 100) {
                ancientChances++
                ancientChanceExtra -= 100
            }
            for (let i = 0; i < ancientChances; i++) {
                if (Math.random() <= ancientChance * totalFound * (1 + ancientChanceExtra / 100)) {
                    foundAncient++
                }
            }

            // ancient shard XP gain
            gainedXp += 1000 * foundAncient

            if (currentMage.type) {
                const item_id = `${currentMage.type}_shard_fragment`
                // all found are of specified type
                if (gainedItems[item_id]) {
                    gainedItems[item_id] += Math.floor(totalFound)
                } else {
                    gainedItems[item_id] = Math.floor(totalFound)
                }

                if (foundComplete > 0) {
                    const item_id = `complete_${currentMage.type}_shard`
                    // all found are of specified type
                    if (gainedItems[item_id]) {
                        gainedItems[item_id] += foundComplete
                    } else {
                        gainedItems[item_id] = foundComplete
                    }
                }

                if (foundAncient > 0) {
                    const item_id = `ancient_${currentMage.type}_shard`
                    // all found are of specified type
                    if (gainedItems[item_id]) {
                        gainedItems[item_id] += foundAncient
                    } else {
                        gainedItems[item_id] = foundAncient
                    }
                }
            } else {
                const types = ["fire", "water", "air", "earth"]

                // Split all found by 4
                if (totalFound >= 4) {
                    types.forEach((type) => {
                        const item_id = `${type}_shard_fragment`

                        if (gainedItems[item_id]) {
                            gainedItems[item_id] += Math.floor(totalFound / 4)
                        } else {
                            gainedItems[item_id] = Math.floor(totalFound / 4)
                        }
                    })
                } else {
                    // Just choose one type at random
                    const type = _.sample(types)
                    const item_id = `${type}_shard_fragment`

                    if (gainedItems[item_id]) {
                        gainedItems[item_id] += Math.floor(totalFound)
                    } else {
                        gainedItems[item_id] = Math.floor(totalFound)
                    }
                }

                const randomType = _.sample(types)
                if (foundComplete > 0) {
                    const item_id = `complete_${randomType}_shard`
                    // all found are of specified type
                    if (gainedItems[item_id]) {
                        gainedItems[item_id] += foundComplete
                    } else {
                        gainedItems[item_id] = foundComplete
                    }
                }

                if (foundAncient > 0) {
                    const item_id = `ancient_${randomType}_shard`
                    // all found are of specified type
                    if (gainedItems[item_id]) {
                        gainedItems[item_id] += foundAncient
                    } else {
                        gainedItems[item_id] = foundAncient
                    }
                }
            }
        })

        // Update mages
        astronomy.mages = astronomy.mages.filter((mage) => {
            return !mage.type || mage.gold > 0
        })

        const astronomyUpdated = Astronomy.update(
            {
                _id: astronomy._id,
                mages: originalMages
            },
            {
                $set: {
                    mages: astronomy.mages,
                    lastGameUpdated: new Date()
                }
            }
        )

        if (Meteor.user().logEvents) {
            Events.insert(
                {
                    owner: Meteor.userId(),
                    event: "trace.astronomy.gameUpdate",
                    date: new Date(),
                    data: {
                        stack: new Error().stack,
                        hoursElapsed: hoursElapsed,
                        gainedItems: gainedItems
                    }
                },
                () => {}
            )
        }

        if (astronomyUpdated) {
            Object.keys(gainedItems).forEach((itemId) => {
                addItem(itemId, gainedItems[itemId])
            })

            if (gainedXp >= 1) {
                addXp("astronomy", gainedXp)
            }
        }
    }
})

Meteor.publish("astronomy", function () {
    //Transform function
    const transform = function (doc) {
        const userDoc = Meteor.user()

        let maxMages = ASTRONOMY.baseMaxMages
        const hasAstronomyUpgrade = userDoc.astronomyUpgradeTo && moment().isBefore(userDoc.astronomyUpgradeTo)
        if (hasAstronomyUpgrade) {
            maxMages = maxMages + 1
        }

        doc.maxMages = maxMages
        doc.mages = doc.mages.map((mage) => {
            if (!mage.type) {
                mage.icon = "mage"
                mage.name = "Mage"
            } else if (mage.type) {
                mage.icon = `${mage.type}Mage`
                mage.name = `${mage.type} mage`
                mage.stats.gold = Math.round(mage.gold)
            }
            return mage
        })
        return doc
    }

    const self = this

    const observer = Astronomy.find({
        owner: this.userId
    }).observe({
        added: function (document) {
            self.added("astronomy", document._id, transform(document))
        },
        changed: function (newDocument, oldDocument) {
            self.changed("astronomy", oldDocument._id, transform(newDocument))
        },
        removed: function (oldDocument) {
            self.removed("astronomy", oldDocument._id)
        }
    })

    self.onStop(function () {
        observer.stop()
    })

    self.ready()
})
