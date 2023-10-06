import { Meteor } from "meteor/meteor"

import { Abilities } from "/imports/api/abilities/abilities"
import { userCurrentClass, userEligibleForClass } from "/imports/api/classes/classes"
import { Items } from "/imports/api/items/items"
import { Users, classFeatureUnlocked, updateUserActivity } from "/imports/api/users/users.js"
import { Skills } from "/imports/api/skills/skills"

import { CLASSES } from "/imports/constants/classes/index.js"

import { ABILITIES } from "/server/constants/combat/index"

import { updateCombatStats } from "/server/api/combat/combat.js"
import moment from "moment"

export const userUnequipAllItems = function (uid) {
    Items.update({ owner: uid, category: "combat" }, { $set: { equipped: false } }, { multi: true })
}

export const userUnequipAllAbilities = function (uid) {
    Abilities.update(
        { owner: uid },
        { $set: { "learntAbilities.$[].equipped": false } }, // thank you: https://stackoverflow.com/questions/64758739/ and https://docs.mongodb.com/manual/reference/operator/update/positional-all/
        { multi: true, bypassCollection2: true }             // thank you: https://stackoverflow.com/questions/61936551/
    )
}

const setClass = function(uid, newClass) {
    if (uid == null || !uid || typeof uid === 'undefined') {
        uid = Meteor.userId()
    }

    let newCooldown = (newClass == CLASSES.default().id)
        ? moment().add(-1, "seconds").toDate()
        : moment().add(12, "hours").toDate()

    Users.update(
        {
            _id: uid
        },
        {
            $set: {
                classData: {
                    currentClass: newClass,
                    changeCooldown: newCooldown
                }
            }
        }
    )

    Skills.update(
        {
            owner: uid
        },
        {
            $set: {
                icon: CLASSES.lookup(newClass).icon
            }
        },
        { multi: true }
    )
}

export const clearClassCooldown = function(uid) {
    if (uid == null || !uid || typeof uid === 'undefined') {
        uid = Meteor.userId()
    }

    Users.update(
        {
            _id: uid
        },
        {
            $set: {
                classData: {
                    currentClass: userCurrentClass(uid).equipped,
                    changeCooldown:  moment().add(-1, "seconds").toDate()
                }
            }
        }
    )
}

const classMayChange = function(uid, newClass) {
    if (uid == null || !uid || typeof uid === 'undefined') {
        uid = Meteor.userId()
    }

    if (!userCurrentClass(uid).unlocked) {
        return false
    }
    
    const userDoc = Users.findOne(uid)

    if (!userDoc) {
        return false
    }

    if (userDoc.classData && userDoc.classData.changeCooldown) {
        if (moment().isBefore(userDoc.classData.changeCooldown)) {
            return false
        }
    }

    return true
}

Meteor.methods({
    "classes.clearCooldown"(targetUid) {
        const userIsAdmin = userDoc && userDoc.isSuperMod

        if (!userIsAdmin) {
            return false
        }

        if (targetUid == null || !targetUid || typeof targetUid === 'undefined') {
            return false
        }

        const userDoc = Users.findOne({ _id: targetUid })

        if (!userDoc) {
            return false
        }

        clearClassCooldown(targetUid)
        return true
    },

    "classes.welcome"(uid) {
        if (uid == null || !uid || typeof uid === 'undefined') {
            uid = Meteor.userId()
        }

        if (!classMayChange(uid)) {
            return { equipped: false, reason: "Ineligible for class change." }
        }

        const userNewClassToEquip = CLASSES.default()

        if (userEligibleForClass(uid, userNewClassToEquip)) {
            // going from 'nothing' to 'wanderer'/default:
            
            // don't unequip any gear
            // do unequip abilities (since loadout restrictions apply now)
            userUnequipAllAbilities(uid)
            // set the class data
            setClass(uid, userNewClassToEquip.id)

            if (thisUser) {
                // pass the data to the new class here since it's not actually set yet (update: Meteor.call moved here, so it might be)
                updateCombatStats(uid, thisUser.username, true, userNewClassToEquip)
            }

            // update that the user was active
            updateUserActivity({ userId: uid })

            return { equipped: true, reason: "" }
        }

        return { equipped: false, reason: "Ineligible for class change." }
    },

    "classes.equipClass"(uid, newClass) {
        if (uid == null || !uid || typeof uid === 'undefined') {
            uid = Meteor.userId()
        }

        if (!classMayChange(uid)) {
            return { equipped: false, reason: "Ineligible for class change." }
        }

        const userNewClassToEquip = CLASSES.lookup(newClass)

        if (userEligibleForClass(uid, userNewClassToEquip)) {
            const userCurrentClassEquipped = userCurrentClass(uid).data

            if (userCurrentClassEquipped.id != newClass) {
                const thisUser = Users.findOne({ _id: uid })

                userUnequipAllItems(uid)
                userUnequipAllAbilities(uid)

                if (userCurrentClassEquipped.id != CLASSES.default().id) {
                    Meteor.call("crafting.cancelReforgeAll")
                }

                const userAbilities = Abilities.findOne({ owner: uid })

                userCurrentClassEquipped.exclusiveAbilities.forEach((thisAbility) => {
                    Abilities.update(userAbilities._id, {
                        $pull: {
                            learntAbilities: {
                                abilityId: thisAbility
                            }
                        }
                    })
                })

                userNewClassToEquip.exclusiveAbilities.forEach((thisAbility) => {
                    const abilityConstants = ABILITIES[thisAbility]

                    Abilities.update(
                        userAbilities._id,
                        {
                            $push: {
                                learntAbilities: {
                                    abilityId: thisAbility,
                                    level: 1,
                                    equipped: false,
                                    isSpell: abilityConstants.isMagic,
                                    casts: abilityConstants.isMagic ? 1 : undefined,
                                    currentCooldown: 0
                                }
                            }
                        }
                    )
                })

                setClass(uid, newClass)
                //Meteor.call("users.setUiState", "currentClass", newClass)

                if (thisUser) {
                    // pass the data to the new class here since it's not actually set yet (update: Meteor.call moved here, so it might be)
                    updateCombatStats(uid, thisUser.username, true, userNewClassToEquip)
                }

                // update that the user was active
                updateUserActivity({ userId: uid })

                // note: the actual state of setting the user's active class is done when we return true/false success to the client
                //       from 'loadout.js'.  On true, the client calls 'users.setUiState' with the new class ID.  In every case where
                //       we check the user's active class, their eligibilty is verified server-side and the class ID that they should
                //       actually be set to is sent back.

                // note: ** UPDATE ** Meteor.call was moved here, so the above may no longer be true
            }

            return { equipped: true, reason: "" }
        }

        return { equipped: false, reason: "Ineligible for class change." }
    },

    "classes.getCurrentClass"(uid) {
        if (uid == null || !uid || typeof uid === 'undefined') {
            uid = Meteor.userId()
        }
        
        const thisUser = Users.findOne({ _id: uid })

        if (thisUser) {
            if (thisUser.classData && thisUser.classData.currentClass) {
                const equippedClass = CLASSES.lookup(thisUser.classData.currentClass)

                if (userEligibleForClass(uid, equippedClass)) {
                    return { unlocked: classFeatureUnlocked(uid), equipped: equippedClass.id, data: equippedClass, cooldown: moment().isBefore(thisUser.classData.changeCooldown) ? thisUser.classData.changeCooldown : false }
                }
            }
        }

        const defaultClass = CLASSES.default()

        Meteor.call("classes.equipClass", uid, defaultClass.id)

        return { unlocked: classFeatureUnlocked(uid), equipped: defaultClass.id, data: defaultClass, cooldown: undefined }
    }
})

const MILLISECOND = 1
const SECOND = MILLISECOND * 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE

const userId = function userId(userId) {
    return userId
}

DDPRateLimiter.addRule({ type: "method", name: "classes.equipClass", userId }, 10, 3 * SECOND)
DDPRateLimiter.addRule({ type: "method", name: "classes.getCurrentClass", userId }, 1 * SECOND)
