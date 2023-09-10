import { SimpleSchema } from "meteor/aldeed:simple-schema"
import { Mongo } from "meteor/mongo"

import { Users } from "/imports/api/users/users.js"

import { CLASS_LIST } from "/imports/constants/combat/classes.js"

import { CInt, IsValid } from "/imports/utils.js"

export const Combat = new Mongo.Collection("combat")

export const userClass = function userClass(userId) {
    try {
        if (!IsValid(userId)) {
            userId = Meteor.userId()
        }
        const combatDoc = Combat.findOne({ _id: userId })

        if (IsValid(combatDoc) && IsValid(combatDoc["class"]) && IsValid(combatDoc["class"].id)) {
            const thisClass = CLASS_LIST[combatDoc["class"].id]
            if (IsValid(thisClass)) {
                return thisClass
            }
        }
    } catch (err) {}

    return CLASS_LIST["adventurer"]
}

export const userIsClass = function userIsClass(classId, userId) {
    try {
        if (!IsValid(userId)) {
            userId = Meteor.userId()
        }
    } catch (err) {}
    return classId == userClass(userId)
}

export const userAverageCombat = function userAverageCombat(userId) {
    try {
        if (!IsValid(userId)) {
            userId = Meteor.userId()
        }
        const userDoc = Users.findOne({ _id: userId })
        if (IsValid(userDoc)) {
            return CInt(userDoc.averageCombat)
        }
    } catch (err) {}
    return 0
}

export const changeClass = function changeClass(classId) {
    Meteor.call("combat.changeClass", classId)
}

CombatSchema = new SimpleSchema({
    owner: { type: String, regEx: SimpleSchema.RegEx.Id },
    server: { type: String },
    username: { type: String, optional: true },
    foughtBoss: { type: Boolean, defaultValue: false },
    boughtIcons: { type: [String], optional: true },
    bonusIcons: { type: [String], optional: true },
    characterIcon: { type: String, defaultValue: "character.svg" },
    stats: { type: Object },
    xpDistribution: { type: Object, blackbox: true, defaultValue: { attack: 0.5, health: 0.5 } },

    // Deprecated
    isTowerContribution: { type: Boolean, defaultValue: false, optional: true },

    // Deprecated
    towerContributionsToday: { type: Number, defaultValue: 0, optional: true },

    towerContributions: { type: [Number], decimal: true },

    "stats.attack": { type: Number, decimal: true, defaultValue: 1 },
    "stats.attackMax": { type: Number, decimal: true, defaultValue: 1 },
    "stats.attackSpeed": { type: Number, decimal: true, defaultValue: 1 },
    "stats.accuracy": { type: Number, decimal: true, defaultValue: 1 },
    "stats.criticalChance": { type: Number, decimal: true, defaultValue: 0 },
    "stats.criticalDamage": { type: Number, decimal: true, defaultValue: 1 },
    "stats.health": { type: Number, decimal: true, defaultValue: 50, decimal: true },
    "stats.healthMax": { type: Number, decimal: true, defaultValue: 50 },
    "stats.energy": { type: Number, decimal: true, defaultValue: 20, decimal: true },
    "stats.energyMax": { type: Number, decimal: true, defaultValue: 20 },
    "stats.magicPower": { type: Number, decimal: true, defaultValue: 0 },
    "stats.healingPower": { type: Number, decimal: true, defaultValue: 0 },
    "stats.defense": { type: Number, decimal: true, defaultValue: 0 },
    "stats.magicArmor": { type: Number, decimal: true, defaultValue: 0 },
    "stats.armor": { type: Number, decimal: true, defaultValue: 0 },
    "stats.damageTaken": { type: Number, decimal: true, defaultValue: 1 },
    "stats.force": { type: Number, decimal: true, defaultValue: 0, optional: true },
    "stats.shred": { type: Number, decimal: true, defaultValue: 0, optional: true },
    "stats.focus": { type: Number, decimal: true, defaultValue: 0, optional: true },
    amulet: { type: Object, optional: true },
    "amulet.energy": { type: Number, decimal: true },
    "amulet.energyStorage": { type: Number, optional: true },
    "amulet.energyRegen": { type: Number, optional: true },
    "amulet.damage": { type: Number, decimal: true, optional: true },
    mainHandWeapon: { type: String, optional: true },
    mainHandType: { type: String, optional: true },
    offHandType: { type: String, optional: true },

    buffs: { type: [Object], optional: true, defaultValue: [] },
    "buffs.$.id": { type: String },
    "buffs.$.data": { type: Object, blackbox: true },
    "buffs.$.duration": { type: Number, decimal: true, optional: true },

    enchantments: { type: [String], optional: true, defaultValue: [] },

    //meditatingStartDate: { type: Date, optional: true },

    lastGameUpdated: { type: Date, defaultValue: new Date() },

    class: { type: Object, optional: true },
    "class.id": { type: String, optional: true },
    "class.changesAvailable": { type: Number, optional: true },
    "class.lastChanged": { type: Date, optional: true }
})

Combat.attachSchema(CombatSchema)
