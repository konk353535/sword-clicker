import { Meteor } from "meteor/meteor"

import { Users, classFeatureUnlocked } from "/imports/api/users/users.js"

import { CLASSES } from "/imports/constants/classes/index.js"

export const userEligibleForClass = function (uid, classData) {
    if (
        uid == null ||
        !uid ||
        typeof uid === "undefined" ||
        typeof classData === "undefined" ||
        typeof classData?.id === "undefined"
    ) {
        return false
    }

    return classData.eligible(uid)
}

export const userCurrentClass = function (uid) {
    let impliedUser = false

    if (uid == null || !uid || typeof uid === "undefined") {
        impliedUser = true
        uid = Meteor.userId()
    }

    const noClass = CLASSES.none()
    const defaultClass = CLASSES.default()
    let thisUser = Users.findOne({ _id: uid })

    if (!thisUser && impliedUser) {
        thisUser = Meteor.user()
    }

    if (thisUser && thisUser.classData && thisUser.classData.currentClass) {
        const equippedClass = CLASSES.lookup(thisUser.classData.currentClass)

        if (equippedClass) {
            return {
                player: uid,
                unlocked: classFeatureUnlocked(uid),
                eligible: userEligibleForClass(uid, equippedClass),
                equipped: equippedClass.id,
                data: equippedClass,
                icon: equippedClass.icon,
                cooldown: thisUser.classData.changeCooldown || undefined
            }
        }

        return {
            player: uid,
            unlocked: classFeatureUnlocked(uid),
            eligible: userEligibleForClass(uid, defaultClass),
            equipped: defaultClass.id,
            data: defaultClass,
            icon: defaultClass.icon,
            cooldown: thisUser.classData.changeCooldown || undefined
        }
    }

    return {
        player: uid,
        unlocked: classFeatureUnlocked(uid),
        eligible: false,
        equipped: noClass.id,
        data: noClass,
        icon: noClass.icon,
        cooldown: undefined
    }
}
