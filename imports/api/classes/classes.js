import { Meteor } from "meteor/meteor"

import { Users, classFeatureUnlocked } from "/imports/api/users/users.js"

import { CLASSES } from "/imports/constants/classes/index.js"

export const userEligibleForClass = function (uid, classData) {
    if (typeof uid === "undefined" || typeof classData === "undefined" || typeof classData?.id === "undefined") {
        return false
    }

    return classData.eligible(uid)
}

export const userCurrentClass = function (uid) {
    if (typeof uid === "undefined") {
        uid = Meteor.userId()
    }

    const thisUser = Users.findOne({ _id: uid })

    if (thisUser) {
        if (thisUser.uiState && thisUser.uiState.currentClass) {
            const equippedClass = CLASSES.lookup(thisUser.uiState.currentClass)

            if (userEligibleForClass(uid, equippedClass)) {
                return {
                    unlocked: classFeatureUnlocked(uid),
                    eligible: userEligibleForClass(uid, equippedClass),
                    equipped: equippedClass.id,
                    data: equippedClass
                }
            }
        }
    }

    const defaultClass = CLASSES.default()

    return {
        unlocked: classFeatureUnlocked(uid),
        eligible: classFeatureUnlocked(uid),
        equipped: defaultClass.id,
        data: defaultClass
    }
}
