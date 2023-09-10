import _ from "underscore"
import type Battle from "../"
import type Unit from "./../unit"

export function unitAutoAttacks(this: Battle, units: Unit[]) {
    units.forEach((unit) => {
        if (unit.attackIn <= 0) {
            unit.attackIn = unit.stats.attackSpeedTicks
            let defender = unit.target ? this.allUnitsMap[unit.target] : false

            if (!defender || defender.stats.health <= 0) {
                if (unit.isEnemy) {
                    defender = _.sample(this.units)
                } else {
                    defender = this.enemies[0]
                }

                if (!defender) {
                    return
                }
                unit.target = defender.id
            }

            if (!unit.isCharmed && !unit.isStunned && !unit.isPacifist) {
                let canAutoAttack = true

                // Check if they're trying to use a bow without a quiver (or vice versa)
                if (unit.mainHandType === "bow" && unit.offHandType !== "quiver") {
                    canAutoAttack = false
                } else if (unit.mainHandType !== "bow" && unit.offHandType === "quiver") {
                    canAutoAttack = false
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
