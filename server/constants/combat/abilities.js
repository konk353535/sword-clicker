import { ATTACK_ABILITIES } from "./abilities/attack"
import { DEFENSE_ABILITIES } from "./abilities/defense"
import { MAGIC_ABILITIES } from "./abilities/magic"

export const ABILITY = {
    slots: ["mainHand", "offHand", "head", "chest", "legs", "classAbil1", "classAbil2", "classAbil3", "companion"],
    activeSlots: ["mainHand", "offHand", "head", "chest", "legs"],
    passiveSlots: ["classAbil1", "classAbil2", "classAbil3"],
    slotsForClasses: {
        mainHand: {
            slot: 'mainHand',
            allowedType: 'active'
        },
        offHand: {
            slot: 'offHand',
            allowedType: 'active'
        },
        head: {
            slot: 'head',
            allowedType: 'active'
        },
        chest: {
            slot: 'chest',
            allowedType: 'active'
        },
        legs: {
            slot: 'legs',
            allowedType: 'active'
        },
        classAbil1: {
            slot: 'classAbil1',
            allowedType: 'passive'
        },
        classAbil2: {
            slot: 'classAbil2',
            allowedType: 'passive'
        },
        classAbil3: {
            slot: 'classAbil3',
            allowedType: 'passive'
        },
        companion: {
            slot: 'companion',
            allowedType: 'companion'
        }
    }
}

export const ABILITIES = Object.assign(ATTACK_ABILITIES, DEFENSE_ABILITIES, MAGIC_ABILITIES)
