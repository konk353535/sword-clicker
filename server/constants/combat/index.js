console.log("importing combat/index.js COMBAT_ITEMS")
import { COMBAT_ITEMS as combatItems } from "../../../imports/constants/combat/items"
import { ABILITIES as abilities, ABILITY as ability } from "./abilities"
console.log("importing combat/index.js ABILITIES, ABILITY")

console.log("exporting combat/index.js ABILITIES")
export const ABILITIES = Object.freeze(abilities)
console.log("exporting combat/index.js ABILITY")
export const ABILITY = Object.freeze(ability)
console.log("exporting combat/index.js COMBAT_ITEMS")
export const COMBAT_ITEMS = Object.freeze(combatItems)
console.log("exporting combat/index.js COMBAT")
export const COMBAT = Object.freeze({
    baseEnergyMax: 40,

    baseEnergyRegenPerMinute: 0.35, // 1 every 3 minutes

    baseHealthRegenPerMinute: 30,

    energyConsumption: {
        easy: 1,
        hard: 2,
        veryHard: 3,
        boss: 10
    },

    statsArr: [
        "attack",
        "attackMax",
        "attackSpeed",
        "criticalChance",
        "healingPower",
        "criticalDamage",
        "accuracy",
        "defense",
        "health",
        "healthMax",
        "damageTaken",
        "magicPower",
        "armor",
        "magicArmor",
        "force",
        "shred",
        "focus",
        "absorption"
    ]
})
