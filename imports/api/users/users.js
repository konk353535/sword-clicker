import { SimpleSchema } from "meteor/aldeed:simple-schema"
import { Meteor } from "meteor/meteor"

import { Achievements } from "/imports/api/achievements/achievements"

import moment from "moment/moment"

export const Users = Meteor.users

export const getIPFromConnection = function getIPFromConnection(connectionInfo) {
    let ipDiscovered = ""

    if (connectionInfo) {
        try {
            if (connectionInfo.httpHeaders) {
                ;[
                    "x-forwarded-for",
                    "X-Forwarded-For",
                    "cf-connecting-ip",
                    "CF-Connecting-IP",
                    "x-real-ip",
                    "X-Real-IP"
                ].forEach((httpHeader) => {
                    try {
                        if (connectionInfo.httpHeaders[httpHeader]) {
                            let localIP = connectionInfo.httpHeaders[httpHeader].split(/[ ,]/).map(function (a) {
                                return a.trim()
                            })[0]

                            // no IPv6
                            if (
                                ipDiscovered === "" &&
                                localIP &&
                                typeof localIP === "string" &&
                                localIP.length > 0 &&
                                localIP.indexOf(":") === -1
                            ) {
                                ipDiscovered = localIP
                            }
                        }
                    } catch (err) {}
                })
            }

            if (ipDiscovered === "") {
                ipDiscovered = connectionInfo.clientAddress
            }
        } catch (err) {}
    }

    try {
        ipDiscovered = ipDiscovered && ipDiscovered.length > 0 ? ipDiscovered : "0.0.0.0"
    } catch (err) {}

    if (typeof ipDiscovered === "string") {
        return ipDiscovered
    }

    return "0.0.0.0"
}

export const updateUserIP = function updateUserIP({ userId, ipAddress }) {
    // Update user activity
    Users.update(
        {
            _id: Meteor.userId()
        },
        {
            $set: {
                lastActivity: moment().toDate(),
                clientIp: ipAddress
            }
        }
    )
}

export const updateUserActivity = function updateUserActivity({ userId }) {
    // Update user activity
    Users.update(
        {
            _id: Meteor.userId()
        },
        {
            $set: {
                lastActivity: moment().toDate()
            }
        }
    )
}

export const getUserVersion = function getUserVersion(userId__in = false) {
    try {
        if (userId__in) {
            const userDoc = Users.findOne({ _id: userId__in })
            if (userDoc && userDoc.server) {
                return userDoc.version
            }
        } else {
            const user = Meteor.user()
            if (user && user.version) {
                return user.version
            }
        }
    } catch (err) {}
    return 1
}

export const updateUserVersion = function updateUserVersion({ userId, newVersion }) {
    // Update user version
    Users.update(
        {
            _id: Meteor.userId()
        },
        {
            $set: {
                version: newVersion
            }
        }
    )
}

export const serverFromUser = function serverFromUser(userId__in = false) {
    try {
        if (userId__in) {
            const userDoc = Users.findOne({ _id: userId__in })
            if (userDoc && userDoc.server) {
                return userDoc.server
            }
        } else {
            const user = Meteor.user()
            if (user && user.server) {
                return user.server
            }
        }
    } catch (err) {}
    return false
}

export const classFeatureUnlocked = function (userId__in = false) {
    if (userId__in == null || !userId__in || typeof userId__in === 'undefined') {
        userId__in = Meteor.userId()
    }

    const achievements = Achievements.findOne({
        owner: userId__in
    })

    try {
        return achievements?.collected?.tower_10
    } catch (err) {}
    return false
}

UserSchema = new SimpleSchema({
    _id: { type: String },
    createdAt: { type: Date },
    services: { type: Object, blackbox: true },
    gold: { type: Number, defaultValue: 200 },
    floor: { type: Number, defaultValue: 1 },

    gems: { type: Number, defaultValue: 0 },
    fakeGems: { type: Number, defaultValue: 200 },
    fakeGemsToday: { type: Number, defaultValue: 0 },

    battleSecret: { type: String },
    server: { type: String },
    banned: { type: Boolean, optional: true },

    lastActivity: { type: Date, optional: true },

    membershipTo: { type: Date, optional: true },
    miningUpgradeTo: { type: Date, optional: true },
    craftingUpgradeTo: { type: Date, optional: true },
    combatUpgradeTo: { type: Date, optional: true },
    woodcuttingUpgradeTo: { type: Date, optional: true },
    inscriptionUpgradeTo: { type: Date, optional: true },
    astronomyUpgradeTo: { type: Date, optional: true },
    farmingUpgradeTo: { type: Date, optional: true },

    newUpdates: { type: Boolean, optional: true, defaultValue: true },

    clientIp: { type: String, optional: true },

    isMutedExpiry: { type: Date, optional: true },
    isMod: { type: Boolean, optional: true },
    isSuperMod: { type: Boolean, optional: true },
    excludeFromRankings: { type: Boolean, optional: true, defaultValue: false },

    isGuest: { type: Boolean, optional: true },
    isPreFabbedGuest: { type: Boolean, optional: true },

    averageCombat: { type: Number, optional: true },

    logEvents: { type: Boolean, optional: true },
    uiState: { type: Object, blackbox: true, defaultValue: {} }, // used to save ui state, eg: hide / show chat
    /*username: {
    type: String,
    regEx: /^\w+$/,
    min: 3,
    max: 20
  },*/
    username: { type: String },

    tutorial: { type: Object, optional: true },

    "tutorial.currentStep": { type: Number },

    "tutorial.hideCrafting": { type: Boolean },
    "tutorial.highlightCrafting": { type: Boolean },

    "tutorial.hideWoodcutting": { type: Boolean },
    "tutorial.highlightWoodcutting": { type: Boolean },

    "tutorial.hideFarming": { type: Boolean },
    "tutorial.highlightFarming": { type: Boolean },
    "tutorial.hideFarmingPlots": { type: Boolean },
    "tutorial.highlightFarmingPlots": { type: Boolean },

    "tutorial.hideInscription": { type: Boolean },
    "tutorial.highlightInscription": { type: Boolean },
    "tutorial.hideInscriptionAbilities": { type: Boolean },
    "tutorial.highlightInscriptionAbilities": { type: Boolean },
    "tutorial.hideInscriptionPigments": { type: Boolean },
    "tutorial.highlightInscriptionPigments": { type: Boolean },
    "tutorial.hideInscriptionPaper": { type: Boolean },
    "tutorial.highlightInscriptionPaper": { type: Boolean },

    "tutorial.hideCombat": { type: Boolean },
    "tutorial.highlightCombat": { type: Boolean },
    "tutorial.highlightCombatEquipment": { type: Boolean },
    "tutorial.hideCombatEquipment": { type: Boolean },
    "tutorial.hideCombatAbilities": { type: Boolean },
    "tutorial.highlightCombatAbilities": { type: Boolean },
    "tutorial.hideCombatTower": { type: Boolean },
    "tutorial.highlightCombatTower": { type: Boolean },
    "tutorial.hideCombatPersonalQuest": { type: Boolean },
    "tutorial.highlightCombatPersonalQuest": { type: Boolean },
    "tutorial.hideCombatAdventures": { type: Boolean },
    "tutorial.highlightCombatAdventures": { type: Boolean },
    "tutorial.hideCombatGroup": { type: Boolean },
    "tutorial.hideCombatBattleLog": { type: Boolean },

    "tutorial.hideMiningEquipment": { type: Boolean },
    "tutorial.highlightMiningEquipment": { type: Boolean },
    "tutorial.hideMiningMiners": { type: Boolean },
    "tutorial.highlightMiningMiners": { type: Boolean },
    "tutorial.hideMiningProspectors": { type: Boolean },
    "tutorial.highlightMiningProspectors": { type: Boolean },

    emails: { type: Array, optional: true },
    "emails.$": { type: Object },
    "emails.$.address": { type: String },
    "emails.$.verified": { type: Boolean },

    personalQuest: { type: Object },
    "personalQuest.level": { type: Number, defaultValue: 1 },
    "personalQuest.wave": { type: Number, defaultValue: 1 },

    stats: { type: Object },
    "stats.spellsCast": { type: Number, defaultValue: 1 },
    "stats.towerHighestClear": { type: Number, defaultValue: 0 },
    "stats.combatMostDamageDone": { type: Number, defaultValue: 0 },
    "stats.combatMostHealingDone": { type: Number, defaultValue: 0 },
    "stats.combatMostDamageTaken": { type: Number, defaultValue: 0 },

    townKarma: { type: Number, optional: true, defaultValue: 0 },

    classData: { type: Object, optional: true },
    "classData.currentClass": { type: String, optional: true },
    "classData.changeCooldown": { type: Date, optional: true },

    version: { type: Number, optional: true, defaultValue: 1 }
})

Meteor.users.attachSchema(UserSchema)
