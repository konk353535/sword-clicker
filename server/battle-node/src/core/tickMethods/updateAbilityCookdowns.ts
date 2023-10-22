import type Battle from "../"
import { secondsElapsedAll } from "./tickTimer"

export function updateAbilityCooldowns(this: Battle) {
    this.allAliveUnits.forEach((unit) => {
        if (unit.abilities) {
            unit.abilities.forEach((ability) => {
                if (ability.currentCooldown > 0) {
                    ability.currentCooldown -= secondsElapsedAll
                }
            })
        }
    })
}
