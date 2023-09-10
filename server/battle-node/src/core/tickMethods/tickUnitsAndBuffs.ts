import type Battle from "../"
import { BUFFS } from "../../../../../imports/constants/buffs"
import { secondsElapsed } from "./../autoAttack"

export function tickUnitsAndBuffs(this: Battle) {
    this.allAliveUnits.forEach((aliveUnit) => {
        if (aliveUnit.tick) {
            aliveUnit.tick()
        }

        if (aliveUnit.buffs) {
            // Buffs can do things on tick, will collect them in the form of combatEvents
            aliveUnit.buffs.forEach((buff) => {
                if (!buff.constants) {
                    buff.constants = BUFFS[buff.id]
                }

                let caster = aliveUnit

                // Find original caster for .onApply() and .onTick()
                try {
                    if (buff._isBuffClass && buff.data.casterUnit) {
                        try {
                            this.units.forEach((localUnit) => {
                                if (localUnit.id === buff.data.casterUnit) {
                                    caster = localUnit
                                }
                            })
                            this.enemies.forEach((localEnemy) => {
                                if (localEnemy.id === buff.data.casterUnit) {
                                    caster = localEnemy
                                }
                            })
                        } catch (err) {}
                    }
                } catch (err) {}

                try {
                    if (buff._isBuffClass && buff.onApply) {
                        if (!buff.data.didApply) {
                            buff.onApply({ buff, caster: caster, target: aliveUnit, actualBattle: this })
                            buff.data.didApply = true
                        }
                    }
                } catch (err) {
                    console.log("Couldn't buff.onApply()")
                    console.trace(err)
                }

                try {
                    if (buff._isBuffClass && buff.onTick) {
                        buff.onTick({ secondsElapsed, buff, caster: caster, target: aliveUnit, actualBattle: this })
                    }
                } catch (err) {
                    console.log("Couldn't buff.onTick()")
                    console.log(err)
                }
            })
        }
    })
}
