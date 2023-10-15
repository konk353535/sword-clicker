import type Battle from "."
import { BUFFS } from "../../../../imports/constants/buffs"
import { autoPrecisionValueTight, CDbl } from "../../../../imports/utils"
import { dealDamageOpts } from "../types/tickOpts"

export function dealDamage(
    this: Battle,
    rawDamage: number,
    {
        attacker,
        defender,
        tickEvents,
        historyStats,
        customColor,
        customIcon,
        isMagic,
        isTrueDamage,
        bypassArmor,
        source
    }: dealDamageOpts
) {
    if (!attacker || !attacker.stats || !defender || !defender.stats) {
        return 0
    }

    if (attacker.isPacifist) {
        return 0
    }

    if (defender.currentClass && defender.currentClass?.id === "tactician") {
        if (Math.random() <= 0.1) {
            // Tacticians have a 10% chance to completely nullify any tick of damage, whether it's from autoattack, DoT ticks, spell casts, etc.
            return 0
        }
    }
    
    if (attacker.currentClass && attacker.currentClass?.id === "duelist") {
        if (!isMagic) {
            if (attacker.target != defender.id) {
                // Duelists deal +50% physical damage to targets they aren't directly targeting
                rawDamage *= 1.5
            }
        }
    }

    const isMagicOrig = isMagic

    // if the attacker wants to flip phys to magic or magic to phys
    if (attacker.effectFlipDamageTypeAttack) {
        isMagic = isMagic ? false : true
    }

    // if the defender wants to flip phys to magic or magic to phys
    if (defender.effectFlipDamageTypeDefense) {
        isMagic = isMagic ? false : true
    }

    // NOTE:
    // 'isTrueDamage'  cannot be reduced by (a) armor, (b) magic armor, or (c) damage absorption
    // 'bypassArmor' cannot be reduced by (a) armor or (b) magic armor, but can be reduced by damage absorption

    const wantDamageDebug = false

    let damage = rawDamage
    if (wantDamageDebug) {
        console.log("Raw damage:", damage)
    }
    if (damage && damage > 0) {
        
        // damage weakening effects
        if (attacker.stats.damageOutput) {
            damage *= attacker.stats.damageOutput
        }
        if (wantDamageDebug) {
            console.log("... damage after target weakening:", damage)
        }

        const defenderDamageTakenMultiplier = (defender.stats.damageTaken ? defender.stats.damageTaken : 1.0)
        if (defenderDamageTakenMultiplier !== 1.0) {
            damage *= defenderDamageTakenMultiplier
            if (wantDamageDebug) {
                console.log("... damage after vulnerable target factor:", damage)
                console.log("...... vulnerable target factor:", defenderDamageTakenMultiplier)
            }
        }

        // true damage penetrates armor and all abilities that allow damage reduction (or fake-dodging like evasive manuevers)
        if (!isTrueDamage) {
            // original armor
            const origPhyscArmor = defender.stats.armor
            const origMagicArmor = defender.stats.magicArmor

            defender.stats.armor = origPhyscArmor - attacker.stats.shred // triggers a calculation of 'defender.stats.damageReduction'
            defender.stats.magicArmor = origMagicArmor - attacker.stats.focus // triggers a calculation of 'defender.stats.magicDamageReduction'

            let damageReductionFromArmorPercent = isMagic
                ? defender.stats.magicDamageReduction
                    ? defender.stats.magicDamageReduction
                    : 0
                : defender.stats.damageReduction
                ? defender.stats.damageReduction
                : 0

            // armor does not protect against some DoT effects:  bleed, poison, ignite, etc.
            if (bypassArmor) {
                damageReductionFromArmorPercent = 0
            }

            defender.stats.armor = origPhyscArmor // triggers a calculation of 'defender.stats.damageReduction'
            defender.stats.magicArmor = origMagicArmor // triggers a calculation of 'defender.stats.magicDamageReduction'

            damage = damage * (1 - (damageReductionFromArmorPercent))
            if (wantDamageDebug) {
                console.log("... damage after armor:", damage)
                console.log("...... armor reduction amount:", damageReductionFromArmorPercent)
            }

            // NOTE: damage absorption DOES apply against some DoT effects:  bleed, poison, ignite, etc. (no adjustment for 'bypassArmor')
            damage = damage * (1 - (defender.stats.absorption))
            if (wantDamageDebug) {
                console.log("... damage after absorption:", damage)
                console.log("...... absorption amount:", defender.stats.absorption)
            }
        }

        // Negative damage can't heal the target
        if (damage < 0) {
            damage = 0
        }

        if (wantDamageDebug) {
            console.log("... FINAL DAMAGE IS:", damage)
        }

        if (damage > 0) {
            defender.stats.health -= damage
        }

        // Tick didRawDamage event on defender
        if (attacker.buffs) {
            attacker.buffs.forEach((buff) => {
                buff.constants = BUFFS[buff.id]
                if (buff.constants.events.onDidRawDamage) {
                    // Did Raw Damage
                    buff.constants.events.onDidRawDamage({
                        buff,
                        defender,
                        attacker,
                        actualBattle: this,
                        rawDamage,
                        damageDealt: damage,
                        source: source ? source : "other",
                        magic: isMagic
                    })
                }
            })
        }

        // Tick tookRawDamage event on defender
        if (defender.buffs) {
            defender.buffs.forEach((buff) => {
                buff.constants = BUFFS[buff.id]
                if (buff.constants.events.onTookRawDamage) {
                    // Took Raw Damage
                    buff.constants.events.onTookRawDamage({
                        buff,
                        defender,
                        attacker,
                        actualBattle: this,
                        rawDamage,
                        damageDealt: damage,
                        source: source ? source : "other",
                        magic: isMagic
                    })
                }
            })
        }

        this.checkDeath(defender, attacker)
    }

    let attacker__id_to_use = attacker.id
    if (attacker.isCompanion) {
        try {
            if (attacker?.owner?.endsWith("_companion")) {
                attacker__id_to_use = attacker.owner.substring(0, attacker.owner.length - 10)
            }
        } catch (err) {}
    }

    let defender__id_to_use = defender.id
    if (defender.isCompanion) {
        try {
            if (defender?.owner?.endsWith("_companion")) {
                defender__id_to_use = defender.owner.substring(0, defender.owner.length - 10)
            }
        } catch (err) {}
    }

    if (historyStats && historyStats[attacker__id_to_use]) {
        if (!attacker.isCompanion) {
            historyStats[attacker__id_to_use].damageDone += damage
        } else {
            historyStats[attacker__id_to_use].companionName = attacker.name
            historyStats[attacker__id_to_use].damageDoneCompanion += damage
        }
    }

    if (historyStats && historyStats[defender__id_to_use]) {
        if (!defender.isCompanion) {
            historyStats[defender__id_to_use].damageTaken += damage
        } else {
            historyStats[defender__id_to_use].companionName = defender.name
            historyStats[defender__id_to_use].damageTakenCompanion += damage
        }
    }

    let damageValue = autoPrecisionValueTight(damage).toString()
    if (damageValue === "0" || CDbl(damage) <= 0.1) {
        damageValue = ""
        if (customIcon === "dodge") {
            damageValue = "Dodged"
        } else {
            customIcon = "armor"
            customColor = "#888888"
            damageValue = "Absorbed"
        }

        if (historyStats && historyStats[defender__id_to_use]) {
            if (!defender.isCompanion) {
                historyStats[defender__id_to_use].attacksDodged++
            } else {
                historyStats[defender__id_to_use].companionName = defender.name
                historyStats[defender__id_to_use].attacksDodged++
            }
        }
    } else {
        if (historyStats && historyStats[defender__id_to_use]) {
            if (!defender.isCompanion) {
                historyStats[defender__id_to_use].damageMitigated += rawDamage - damage
            } else {
                historyStats[defender__id_to_use].companionName = defender.name
                historyStats[defender__id_to_use].damageMitigated += rawDamage - damage
            }
        }
    }

    if (tickEvents) {
        tickEvents.push({
            from: attacker ? attacker.id : "",
            to: defender ? defender.id : "",
            eventType: "damage",
            label: damageValue,
            customColor: customColor ? customColor : isMagicOrig ? "#3322ff" : "#880011",
            customIcon: customIcon ? customIcon : isMagicOrig ? "basicDamageMagic" : "basicDamage"
        })
    }

    return damage
}
