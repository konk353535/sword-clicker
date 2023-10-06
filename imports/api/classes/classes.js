import { Meteor } from "meteor/meteor"

import { Users, classFeatureUnlocked } from "/imports/api/users/users.js"

import { CLASSES } from "/imports/constants/classes/index.js"

export const userEligibleForClass = function (uid, classData) {
    if (uid == null || !uid || typeof uid === "undefined" || typeof classData === "undefined" || typeof classData?.id === "undefined") {
        return false
    }

    return classData.eligible(uid)
}

export const userCurrentClass = function (uid) {
    if (uid == null || !uid || typeof uid === "undefined") {
        uid = Meteor.userId()
    }

    const defaultClass = CLASSES.default()
    const thisUser = Users.findOne({ _id: uid })

    if (thisUser) {
        if (thisUser.classData && thisUser.classData.currentClass) {
            const equippedClass = CLASSES.lookup(thisUser.classData.currentClass)

            if (userEligibleForClass(uid, equippedClass)) {
                return {
                    unlocked: classFeatureUnlocked(uid),
                    eligible: userEligibleForClass(uid, equippedClass),
                    equipped: equippedClass.id,
                    data: equippedClass,
                    icon: equippedClass.icon,
                    cooldown: thisUser.classData.changeCooldown || undefined
                }
            }
        }

        return {
            unlocked: classFeatureUnlocked(uid),
            eligible: classFeatureUnlocked(uid),
            equipped: defaultClass.id,
            data: defaultClass,
            icon: "classNone.png",
            cooldown: undefined
        }
    }

    return {
        unlocked: false,
        eligible: false,
        equipped: defaultClass.id,
        data: defaultClass,
        icon: "classNone.png",
        cooldown: undefined
    }
}