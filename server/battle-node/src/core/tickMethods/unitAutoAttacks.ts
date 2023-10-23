import _ from "underscore"
import type Battle from "../"
import type Unit from "./../unit"

export function unitAutoAttacks(this: Battle, units: Unit[]) {
    units.forEach((unit) => {
        if (unit.attackIn <= 0) {
            unit.attackIn = unit.stats.attackSpeedTicks
            
            const defender = unit.targetUnit

            if (!defender) {
                return
            }

            if (!unit.isCharmed && !unit.isStunned && !unit.isPacifist) {
                let canAutoAttack = true

                // Check if they're trying to use a bow without a quiver (or vice versa)
                if (unit.mainHandType === "bow" && unit.offHandType !== "quiver") {
                    canAutoAttack = false
                } else if (unit.mainHandType !== "bow" && unit.offHandType === "quiver") {
                    canAutoAttack = false
                }

                if (this.units.length > 1) {
                    if (unit.currentClass?.id === "sage") {
                        canAutoAttack = false
                    }
                }

                if (canAutoAttack) {
                    this.autoAttack({
                        attacker: unit,
                        defender
                    })
                }
            }
        }
    })
}
