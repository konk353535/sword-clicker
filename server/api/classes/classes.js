import { Meteor } from "meteor/meteor"

import { Abilities } from "/imports/api/abilities/abilities"
import { userCurrentClass, userEligibleForClass } from "/imports/api/classes/classes"
import { Items } from "/imports/api/items/items"
import { Users, classFeatureUnlocked, updateUserActivity } from "/imports/api/users/users.js"

import { CLASSES } from "/imports/constants/classes/index.js"

import { ABILITIES } from "/server/constants/combat/index"

import { updateCombatStats } from "/server/api/combat/combat.js"

const userUnequipAllItems = function (uid) {
    Items.update({ owner: uid, category: "combat" }, { $set: { equipped: false } }, { multi: true })
}

const userUnequipAllAbilities = function (uid) {
    Abilities.update(
        { owner: uid },
        { $set: { "learntAbilities.$[].equipped": false } }, // thank you: https://stackoverflow.com/questions/64758739/ and https://docs.mongodb.com/manual/reference/operator/update/positional-all/
        { multi: true, bypassCollection2: true } // thank you: https://stackoverflow.com/questions/61936551/
    )
}

Meteor.methods({
    "classes.equipClass"(uid, newClass) {
        //todo: check if they're on class swap cooldown

        const userNewClassToEquip = CLASSES.lookup(newClass)

        if (userEligibleForClass(uid, userNewClassToEquip)) {
            const userCurrentClassEquipped = userCurrentClass(uid).data

            if (userCurrentClassEquipped.id != newClass) {
                //todo: logic for equipping a new class
                const thisUser = Users.findOne({ _id: uid })

                userUnequipAllItems(uid)
                userUnequipAllAbilities(uid)

                if (thisUser) {
                    updateCombatStats(uid, thisUser.username, true)
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

                    Abilities.update(userAbilities._id, {
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
                    })
                })

                // update that the user was active
                updateUserActivity({ userId: Meteor.userId() })

                // note: the actual state of setting the user's active class is done when we return true/false success to the client
                //       from 'loadout.js'.  On true, the client calls 'users.setUiState' with the new class ID.  In every case where
                //       we check the user's active class, their eligibilty is verified server-side and the class ID that they should
                //       actually be set to is sent back.
            }

            return { equipped: true, reason: "" }
        }

        return { equipped: false, reason: "Ineligible for class swap" }
    },

    "classes.getCurrentClass"(uid) {
        const thisUser = Users.findOne({ _id: uid })

        if (thisUser) {
            if (thisUser.uiState && thisUser.uiState.currentClass) {
                const equippedClass = CLASSES.lookup(thisUser.uiState.currentClass)

                if (userEligibleForClass(uid, equippedClass)) {
                    return { unlocked: classFeatureUnlocked(uid), equipped: equippedClass.id, data: equippedClass }
                }
            }
        }

        const defaultClass = CLASSES.default()

        Meteor.call("classes.equipClass", uid, defaultClass.id)

        return { unlocked: classFeatureUnlocked(uid), equipped: defaultClass.id, data: defaultClass }
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
