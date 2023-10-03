import lodash from "lodash"
import { SimpleSchema } from "meteor/aldeed:simple-schema"
import { Mongo } from "meteor/mongo"

import { ITEMS, ITEM_RARITIES } from "/imports/constants/items/index.js"

import { userCurrentClass } from "/imports/api/classes/classes.js"
import { CDbl } from "/imports/utils.js"

export const Items = new Mongo.Collection("items")

ItemsSchema = new SimpleSchema({
    itemId: { type: String },
    category: { type: String, optional: true },
    amount: { type: Number, defaultValue: 1 },
    owner: { type: String, regEx: SimpleSchema.RegEx.Id },
    equipped: { type: Boolean, defaultValue: false },
    enhanced: { type: Boolean, optional: true },
    slot: { type: String, optional: true },
    extraStats: { type: Object, blackbox: true, optional: true },
    quality: { type: Number, optional: true },
    rarityId: { type: String, optional: true },
    enchantmentId: { type: String, optional: true },
    enchantmentDescription: { type: String, optional: true },
    hidden: { type: Boolean, optional: true, defaultValue: false },
    locked: { type: Boolean, optional: true, defaultValue: false }
})

Items.attachSchema(ItemsSchema)

export const applyClassBonuses = function applyClassBonuses(statsObj, itemConstants) {
    let localStatsObj

    try {
        const userClass = userCurrentClass()
        localStatsObj = lodash.cloneDeep(statsObj)

        if (userClass.unlocked && userClass.data && userClass.data.equipmentBonuses) {
            Object.keys(localStatsObj).forEach((statName) => {
                // ensure that property refers to a stat of any value
                if (typeof localStatsObj[statName] !== 'undefined') {
                    // if the class modifies this stat
                    if (userClass.data.equipmentBonuses[itemConstants.weaponType || itemConstants.slot] && userClass.data.equipmentBonuses[itemConstants.weaponType || itemConstants.slot][statName]) {
                        // then let's go!
                        const classModifications = userClass.data.equipmentBonuses[itemConstants.weaponType || itemConstants.slot][statName]

                        let processRule = true
                        if (classModifications.ifMagic && !itemConstants.isMagic) {
                            processRule = false
                        }
                        else if (classModifications.unlessMagic && itemConstants.isMagic) {
                            processRule = false
                        }

                        if (processRule) {
                            if (classModifications.valueAdd) {
                                // apply additive stats first (REMINDER: this gets applied to both the base item and the extra, so use half values in constants)
                                localStatsObj[statName] += CDbl(classModifications?.valueAdd)
                            }
                            if (classModifications.valueMultiply !== 'undefined') {
                                // apply multiplicative stats second (NOTE: this gets applied to both, but since it scales, use full values in constants)
                                localStatsObj[statName] *= CDbl(classModifications.valueMultiply)
                            }
                        }
                    }
                }
            })
        }
    } catch (err) {}

    return localStatsObj ? localStatsObj : statsObj
}

export const applyRarities = function applyRarities(statsObj, rarityId) {
    let localStatsObj

    try {
        localStatsObj = lodash.cloneDeep(statsObj)

        if (rarityId && typeof rarityId === "string") {
            const rarityIdConsts = ITEM_RARITIES[rarityId]
            if (rarityIdConsts && rarityIdConsts.statBonuses) {
                Object.keys(localStatsObj).forEach((statName) => {
                    // disallow % bonuses to attack speed
                    if (statName !== "attackSpeed") {
                        // ensure that property refers to a stat that is a number and valued more than 0 (non-numeric/non-positive/non-zero all disallowed)
                        if (CDbl(localStatsObj[statName]) > 0.0) {
                            localStatsObj[statName] =
                                localStatsObj[statName] * ((100.0 + rarityIdConsts.statBonuses) / 100.0)
                        }
                    }
                })
            }
        }
    } catch (err) {}

    return localStatsObj ? localStatsObj : statsObj
}

export const getStatsMap = function getStatsMap(actualItem) {
    try {
        const clonedItem = lodash.cloneDeep(actualItem)

        let localItem

        if (!clonedItem.stats) {
            localItem = { ...ITEMS[localItem.itemId], ...localItem }
        } else {
            localItem = clonedItem
        }

        Object.keys(localItem.extraStats).forEach((key) => {
            if (!localItem.stats[key] || localItem.stats[key] === undefined) {
                localItem.stats[key] = 0
            }
        })

        return localItem.stats
    } catch (err) {
        console.log("Problem in 'getStatsMap' utility:")
        console.log(err)
    }
    return []
}

export const combineStatsMap = function combineStatsMap(origStats, origExtraStats) {
    try {
        let clonedStats = lodash.cloneDeep(origStats)

        if (origExtraStats) {
            Object.keys(origExtraStats).forEach((key) => {
                if (!clonedStats[key] || clonedStats[key] === undefined) {
                    clonedStats[key] = 0
                }
            })
        }

        return clonedStats
    } catch (err) {
        console.log("Problem in 'combineStatsMap' utility:")
        console.log(err)
    }
    return []
}
