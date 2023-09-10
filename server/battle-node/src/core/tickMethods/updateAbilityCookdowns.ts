import type Battle from "../"
import { secondsElapsed } from "./../autoAttack"

export function updateAbilityCooldowns(this: Battle) {
    this.allAliveUnits.forEach((unit) => {
        if (unit.abilities) {
            unit.abilities.forEach((ability) => {
                if (ability.currentCooldown > 0) {
                    ability.currentCooldown -= secondsElapsed
                }
            })
        }
    })
}
