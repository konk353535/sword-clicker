import { ATTACK_ABILITIES } from "./abilities/attack"
import { DEFENSE_ABILITIES } from "./abilities/defense"
import { MAGIC_ABILITIES } from "./abilities/magic"

export const ABILITY = {
    slots: ["mainHand", "offHand", "head", "chest", "legs", "classAbil1", "classAbil2", "classAbil3", "companion"]
}

export const ABILITIES = Object.assign(ATTACK_ABILITIES, DEFENSE_ABILITIES, MAGIC_ABILITIES)
