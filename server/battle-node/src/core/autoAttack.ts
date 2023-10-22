import type Battle from "."
import { BUFFS } from "../../../../imports/constants/buffs"
import { autoAttackOpts } from "../types/tickOpts"

export function autoAttack(
    this: Battle,
    { attacker, defender, originalAutoAttack = true, damageModifier = 0, source }: autoAttackOpts
) {
    let sourceFinal: string = ""
    if (!source || source?.trim().length === 0) {
        sourceFinal = "autoattack"
    } else {
        sourceFinal = source
    }

    // new 'force' stat has a flat % to ignore all target defense (but not armor)
    let defenderDefense = defender.stats.defense
    if (attacker.stats.force && attacker.stats.force > 0) {
        if (Math.random() <= attacker.stats.force / 100.0) {
            defenderDefense = 0
        }
    }

    // Do we hit?
    let hitGap = attacker.stats.accuracy - defenderDefense
    let hitChance = 0.5

    if (hitGap > 0) {
        // Favours attacker
        const extraChance = Math.abs(hitGap) / (Math.abs(hitGap) + 50) / 2
        hitChance += extraChance
    } else {
        // Favours defender
        const extraChance = Math.abs(hitGap) / (Math.abs(hitGap) + 50) / 2
        hitChance -= extraChance
    }

    if (defender.stats.minimumHitChance && hitChance > 1 - defender.stats.minimumHitChance) {
        hitChance = 1 - defender.stats.minimumHitChance
    }

    if ((attacker.cantMiss || hitChance >= Math.random()) && !defender.cantBeHit) {
        // How much do we hit for
        const extraRawDamage = Math.round(Math.random() * (attacker.stats.attackMax - attacker.stats.attack))
        let rawDamage = attacker.stats.attack + extraRawDamage

        if (damageModifier !== 0) {
            rawDamage *= 1.0 + damageModifier
        }

        // Custom icon undefined by default
        let customIcon: string | undefined = undefined

        // Adjust icon per source
        if ((sourceFinal === "phantom_strikes") || (sourceFinal === "Phantom Strikes")) {
            customIcon = "phantomStrikes"
        }


        // Is this a crit?
        if (attacker.stats.criticalChance) {
            let localCritMultiplier = 0
            let localCritChance = attacker.stats.criticalChance
            while (localCritChance > 100) {
                // apply over-crit
                localCritChance -= 100
                localCritMultiplier++
            }
            if (Math.random() <= localCritChance / 100) {
                // apply crit (if crit chance success)
                localCritMultiplier++
            }
            if (localCritMultiplier > 0) {
                rawDamage *= attacker.stats.criticalDamage * localCritMultiplier
                customIcon = "basicDamageCrit"
            }
        }

        const damageDealt = this.dealDamage(rawDamage, {
            attacker,
            defender,
            tickEvents: this.tickEvents,
            customIcon,
            historyStats: this.historyStats,
            source: sourceFinal
        })

        // Tick didDamage event on attacker
        if (attacker.buffs) {
            attacker.buffs.forEach((buff) => {
                buff.constants = BUFFS[buff.id]
                if (buff.constants.events.onDidDamage) {
                    // Did Damage
                    buff.constants.events.onDidDamage({
                        originalAutoAttack,
                        buff,
                        defender,
                        attacker,
                        actualBattle: this,
                        damageDealt,
                        rawDamage,
                        source: sourceFinal,
                        customIcon
                    })
                }
            })
        }

        // Tick tookDamage event on defender
        if (defender.buffs) {
            defender.buffs.forEach((buff) => {
                buff.constants = BUFFS[buff.id]
                if (buff.constants.events.onTookDamage) {
                    // Took Damage
                    buff.constants.events.onTookDamage({
                        buff,
                        defender,
                        attacker,
                        actualBattle: this,
                        damageDealt,
                        source: sourceFinal
                    })
                }
            })
        }
    } else {
        this.dealDamage(0, {
            attacker,
            defender,
            tickEvents: this.tickEvents,
            customIcon: "dodge",
            customColor: "#888888",
            historyStats: this.historyStats,
            source: sourceFinal
        })

        // Tick targetDodgedDamage event on attacker
        if (attacker.buffs) {
            attacker.buffs.forEach((buff) => {
                buff.constants = BUFFS[buff.id]
                if (buff.constants.events.onTargetDodgedDamage) {
                    // Dodged Damage
                    buff.constants.events.onTargetDodgedDamage({
                        buff,
                        defender,
                        attacker,
                        actualBattle: this,
                        source: sourceFinal
                    })
                }
            })
        }

        // Tick dodgedDamage event on defender
        if (defender.buffs) {
            defender.buffs.forEach((buff) => {
                buff.constants = BUFFS[buff.id]
                if (buff.constants.events.onDodgedDamage) {
                    // Dodged Damage
                    buff.constants.events.onDodgedDamage({
                        buff,
                        defender,
                        attacker,
                        actualBattle: this,
                        source: sourceFinal
                    })
                }
            })
        }
    }
}
