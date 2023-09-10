import lodash from "lodash"
import _ from "underscore"
import { BATTLES } from "./constants/battles/index.js" // List of encounters

export const flattenObjectForMongo = function (ob) {
    const toReturn = {}

    for (let i in ob) {
        if (!ob.hasOwnProperty(i)) continue

        if (typeof ob[i] === "object") {
            if (_.isDate(ob[i]) || _.isArray(ob[i])) {
                toReturn[i] = ob[i]
            } else {
                const flatObject = flattenObjectForMongo(ob[i])
                for (let x in flatObject) {
                    if (!flatObject.hasOwnProperty(x)) continue

                    toReturn[i + "." + x] = flatObject[x]
                }
            }
        } else {
            toReturn[i] = ob[i]
        }
    }
    return toReturn
}

export const enemyStatSetter = function (constants, baseStats, enhancedStats) {
    Object.keys(constants).forEach((enemyKey) => {
        const enhancedEnemy = lodash.cloneDeep(constants[enemyKey])
        enhancedEnemy.id = `e_${enemyKey}`
        enhancedEnemy.name = `En. ${enhancedEnemy.name}`
        // Store enhanced enemy
        constants[`e_${enemyKey}`] = enhancedEnemy

        // Mutate enhancedEnemy stats
        Object.keys(enhancedEnemy.stats).forEach((statKey) => {
            const currentStatValue = enhancedEnemy.stats[statKey]
            enhancedEnemy.stats[statKey] = currentStatValue * enhancedStats[statKey]
        })

        const currentEnemy = constants[enemyKey]

        // Mutate stats accordingly
        Object.keys(currentEnemy.stats).forEach((statKey) => {
            const currentStatValue = currentEnemy.stats[statKey]
            currentEnemy.stats[statKey] = currentStatValue * baseStats[statKey]
        })
    })
}

export const attackSpeedTicks = function (attackSpeed) {
    const ticksPerSecond = 1000 / BATTLES.tickDuration

    // Convert attack speed seconds to attack speed ticks
    if (attackSpeed !== undefined) {
        // Fixes a bug where attack speeds beyond 8 yield an attack speed of 0
        if (attackSpeed >= 8) {
            return 1
        }
        return Math.round(ticksPerSecond / attackSpeed)
    } else {
        return 0
    }
}

export const cleanRewards = function (rewards) {
    const r = lodash.cloneDeep(rewards)
    let items = r.reduce((acc, cur) => {
        let exists = false
        acc.forEach((item) => {
            if (item.type === "item" && cur.type === "item") {
                if (item.itemId === cur.itemId) {
                    item.amount += cur.amount
                    exists = true
                }
            } else if (item.type === "gold" && cur.type === "gold") {
                item.amount += cur.amount
                exists = true
            }
        })

        if (!exists) {
            acc.push(cur)
        }
        return acc
    }, [])
    return _.sortBy(items, "type")
}

// Object sanity checker
export const IsValid = function IsValid(oObject) {
    try {
        if (typeof oObject === "undefined") return false
        if (oObject === undefined) return false
        if (oObject === null) return false
        return true
    } catch (err) {}
    return false
}

// Converts a value to integer 'int' or returns 0 on error
export const CInt = function CInt(v) {
    try {
        if (!IsValid(v)) return parseInt(0)
        if (!isNaN(v)) return Math.floor(v)
        if (typeof v === "undefined") return parseInt(0)
        if (v === null) return parseInt(0)
        let t = parseInt(v)
        if (isNaN(t)) return parseInt(0)
        return Math.floor(t)
    } catch (err) {}
    return parseInt(0)
}

// Converts a value to floating point 'double' or returns 0.0 on error
export const CDbl = function CDbl(v) {
    try {
        if (!IsValid(v)) return parseFloat(0)
        if (!isNaN(v)) return parseFloat(v)
        if (typeof v === "undefined") return parseFloat(0.0)
        if (v === null) return parseFloat(0.0)
        let t = parseFloat(v)
        if (isNaN(t)) return parseFloat(0.0)
        return t
    } catch (err) {}
    return parseFloat(0.0)
}

// Performs a quick, shallow copy of an object... much faster than JSON.parse(JSON.stringify(o))... but not a true deep copy.
// For a deep copy, use lodash's .cloneDeep() instead
export const CopyObject = function CopyObject(obj) {
    if (typeof obj === "object") {
        return lodash.clone(obj)
    } else if (Array.isArray(obj)) {
        return [...obj]
    }
    return obj
}
