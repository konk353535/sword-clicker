import type Battle from "."
import { BUFFS } from "../../../../imports/constants/buffs"
import Unit from "./unit"

export function checkDeath(this: Battle, defender: Unit) {
    // Check if this unit is dead
    if (defender.stats.health <= 0 || !defender.stats.health) {
        defender.stats.health = 0

        // Call death event for this defender
        if (defender.buffs) {
            // Buffs can do things on tick, will collect them in the form of combatEvents
            defender.buffs.forEach((buff) => {
                buff.constants = BUFFS[buff.id]
                if (buff.constants.events.onBeforeDeath) {
                    buff.constants.events.onBeforeDeath({ buff, target: defender, actualBattle: this })
                }
            })
        }

        // Only kill defender if it is still dead
        if (defender.stats.health <= 0) {
            if (defender.onDeath) {
                defender.onDeath()
            }
            this.removeUnit(defender)
        }
    }
}
