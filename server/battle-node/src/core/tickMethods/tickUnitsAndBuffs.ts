import type Battle from "../"
import { BUFFS } from "../../../../../imports/constants/buffs"
import { fixupBuffText } from "../../../../battleUtils"
import { secondsElapsedBuffs } from "./../tickMethods/tickTimer"

export function tickUnitsAndBuffs(this: Battle) {
    this.allAliveUnits.forEach((aliveUnit) => {
        if (aliveUnit.tick) {
            aliveUnit.tick()
        }

        // only tick buffs every 2 ticks (200ms)
        if (aliveUnit.buffs && (this.tickCount % 2 == 0)) {
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
                            buff.data.duration = Math.max(buff.duration, buff.data.duration)
                            const fixedBuff = fixupBuffText(buff, caster)
                            buff.data.name = fixedBuff.data.name
                            buff.data.description = fixedBuff.data.description
                        }
                    }
                } catch (err) {
                    console.log("Couldn't buff.onApply()")
                    console.trace(err)
                }

                try {
                    if (buff._isBuffClass && buff.onTick) {
                        buff.onTick({ secondsElapsed: secondsElapsedBuffs, buff, caster: caster, target: aliveUnit, actualBattle: this })
                    }
                } catch (err) {
                    console.log("Couldn't buff.onTick()")
                    console.log(err)
                }
            })
        }
    })
}
