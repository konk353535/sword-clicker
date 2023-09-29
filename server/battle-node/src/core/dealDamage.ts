import type Battle from "."
import { BUFFS } from "../../../../imports/constants/buffs"
import { autoPrecisionValueTight } from "../../../../imports/utils"
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
        source
    }: dealDamageOpts
) {
    if (!attacker || !attacker.stats || !defender || !defender.stats) {
        return 0
    }

    if (attacker.isPacifist) {
        return 0
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

    let damage = rawDamage
    if (damage && damage > 0) {
        // true damage penetrates armor and all abilities that allow damage reduction (or fake-dodging like evasive manuevers)
        if (!isTrueDamage) {
            // original armor
            const origPhyscArmor = defender.stats.armor
            const origMagicArmor = defender.stats.magicArmor

            defender.stats.armor = origPhyscArmor - attacker.stats.shred // triggers a calculation of 'defender.stats.damageReduction'
            defender.stats.magicArmor = origMagicArmor - attacker.stats.focus // triggers a calculation of 'defender.stats.magicDamageReduction'

            let dmgReduction = isMagic
                ? defender.stats.magicDamageReduction
                    ? defender.stats.magicDamageReduction
                    : 0
                : defender.stats.damageReduction
                ? defender.stats.damageReduction
                : 0

            defender.stats.armor = origPhyscArmor // triggers a calculation of 'defender.stats.damageReduction'
            defender.stats.magicArmor = origMagicArmor // triggers a calculation of 'defender.stats.magicDamageReduction'

            damage = rawDamage * (1 - dmgReduction) * (defender.stats.damageTaken ? defender.stats.damageTaken : 1.0)
        }

        // damage weakening effects
        if (attacker.stats.damageOutput) {
            damage *= attacker.stats.damageOutput
        }

        defender.stats.health -= damage

        // Tick tookDamage event on defender
        if (defender.buffs) {
            defender.buffs.forEach((buff) => {
                buff.constants = BUFFS[buff.id]
                if (buff.constants.events.onTookRawDamage) {
                    // Took Damage
                    buff.constants.events.onTookRawDamage({
                        buff,
                        defender,
                        attacker,
                        actualBattle: this,
                        rawDamage,
                        damageDealt: damage,
                        source: source ? source : "other"
                    })
                }
            })
        }

        this.checkDeath(defender)
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
    if (damageValue === "0") {
        damageValue = ""
        if (customIcon === "dodge") {
            damageValue = "Dodged"
        }

        if (historyStats && historyStats[defender__id_to_use]) {
            if (!defender.isCompanion) {
                historyStats[defender__id_to_use].attacksDodged ++
            } else {
                historyStats[defender__id_to_use].companionName = defender.name
                historyStats[defender__id_to_use].attacksDodged ++
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
            customColor: customColor ? customColor : isMagicOrig ? "blue" : "red",
            customIcon: customIcon ? customIcon : isMagicOrig ? "basicDamageMagic" : "basicDamage"
        })
    }

    return damage
}
