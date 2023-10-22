import _ from "underscore"
import type Battle from "../"
import Unit from "./../unit"

export function applyBattleActions(this: Battle) {
    this.battleActions.forEach((action) => {
        const casterId = action.caster
        const casterUnit = this.allUnitsMap[casterId]
        const abilityId = action.abilityId

        if (!casterUnit || casterUnit.battleSecret !== action.battleSecret) {
            return
        }

        if (abilityId === "changeTarget") {
            if (!casterUnit.isAbleToChangeTargets) {
                return
            }

            const targetId = action.targets?.[0]

            if (targetId == null) {
                return
            }

            if (this.enemiesMap[targetId]) {
                // Modify casters preferred target
                casterUnit.target = targetId

                // if this unit is actively targeting another unit, then they're clearly not inactive
                casterUnit.inactiveMinutes = 0
            }
        } else if (abilityId === "forfeit") {
            this.forfitters[casterId] = true
            if (Object.keys(this.forfitters).length >= Object.keys(this.owners).length / 2) {
                this.totalXpGain = 0
                this.units.forEach((unit) => {
                    // Remove all buffs to avoid on death mechanics triggering
                    unit.buffs = []
                    // Set health to -1
                    unit.stats.health = -1
                    // Ensure the unit is picked up as dead
                    this.checkDeath(unit, unit)
                })
                this.end()
            }
        } else if (abilityId === "clickAttack") {
            // sorry, but dead players can't use their amulets
            if (!casterUnit.stats.health || casterUnit.stats.health <= 0) return

            const targetId = action.targets?.[0]
            if (targetId == null) {
                return
            }

            if (!this.enemiesMap[targetId]) {
                return
            }

            // sorry bud, you can't change targets right now and you sure can't click-target an enemy you're not targeting
            if (targetId !== casterUnit.target) {
                if (!casterUnit.isAbleToChangeTargets) {
                    return
                }

                // change target and then proceed with the amulet click damage
                casterUnit.target = targetId
            }

            if (casterUnit.isPacifist) {
                return
            }

            const targetUnit = this.enemiesMap[targetId]

            // Ensure caster unit has sufficient energy
            if (targetUnit && casterUnit && casterUnit.amulet && casterUnit.amulet.energy >= 1) {
                // if this unit is actively using their amulet click charges versus another unit, then they're clearly not inactive
                casterUnit.inactiveMinutes = 0

                casterUnit.amulet.energy -= 1
                this.deltaEvents.push({
                    type: "abs",
                    path: `unitsMap.${casterUnit.id}.amulet.energy`,
                    value: casterUnit.amulet.energy
                })
                this.dealDamage(casterUnit.amulet.damage, {
                    attacker: casterUnit,
                    defender: targetUnit,
                    tickEvents: this.tickEvents,
                    historyStats: this.historyStats,
                    source: "Amulet"
                })
            }
        } else {
            if (!casterUnit.abilitiesMap || !casterUnit.abilitiesMap[abilityId]) {
                return
            }

            const targetAbility = casterUnit.abilitiesMap[abilityId]

            if (targetAbility == null) {
                // invalid ability?
                return
            }

            this.allAliveUnits.forEach((unit) => {})
            Object.keys(this.allUnitsMap).forEach((key) => {})

            const actionTargets =
                action.targets
                    ?.map((rawTarget) => {
                        return this.allUnitsMap[rawTarget]
                    })
                    .filter((targetUnit): targetUnit is Unit => {
                        return !!targetUnit
                    }) ?? []

            const castSuccess = targetAbility.cast(actionTargets)
            if (castSuccess) {
                targetAbility.casts -= 1
                targetAbility.totalCasts += 1
                if (targetAbility.constants && targetAbility.constants.scaledCooldown) {
                    targetAbility.currentCooldown = targetAbility.constants.scaledCooldown(targetAbility)
                } else {
                    targetAbility.currentCooldown = targetAbility.cooldown
                }

                if (targetAbility.cdAdjust) {
                    if (_.isFunction(targetAbility.cdAdjust)) {
                        targetAbility.currentCooldown = targetAbility.cdAdjust(targetAbility)
                    } else {
                        targetAbility.currentCooldown += targetAbility.cdAdjust
                    }
                    targetAbility.cdAdjust = undefined
                }

                // Paladins reduce the cooldowns of all taunts by 50%
                if (casterUnit.currentClass && casterUnit.currentClass?.id === "paladin") {
                    if (targetAbility.isTaunt) {
                        targetAbility.currentCooldown *= 0.50
                    }
                }
            }
        }
    })
}
