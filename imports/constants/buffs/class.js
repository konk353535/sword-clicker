import moment from "moment"
import _ from "underscore"

import { addBuff, lookupBuff, removeBuff } from "../../battleUtils"
import { CDbl, CInt, autoPrecisionValue } from "../../utils.js"

export const CLASS_BUFFS = {
    class_perk_barbarian: {
        duplicateTag: "class_perk_barbarian", // Used to stop duplicate buffs
        icon: "",
        name: "Class Perk: Barbarian",
        description() {
            return ``
        },
        constants: {
        },
        data: {
            duration: Infinity,
            totalDuration: Infinity,
            isEnchantment: true,
            hideBuff: true
        },
        events: {
            onApply({ buff, target, caster, actualBattle }) {},

            onDidDamage: function ({ buff, defender, attacker, actualBattle, damageDealt, source, customIcon }) {
                if (customIcon === "basicDamageCrit") {
                    // Add bleed debuff
                    attacker.applyBuffTo({
                        buff: attacker.generateBuff({
                            buffId: "bleed_proper",
                            buffData: {
                                description: `Bleed every second for ${(attacker.stats.attackMax / 10).toFixed(
                                    2
                                )} damage`,
                                realDuration: 3,
                                duration: 3,
                                allowDuplicates: true,
                                dps: CDbl(attacker.stats.attackMax) / 10,
                                timeTillDamage: 1
                            }
                        }),
                        target: defender // alternatively can use attacker.targetUnit
                    })
                }
            },

            onTick({ buff, target, caster, secondsElapsed, actualBattle }) {},

            onRemove({ buff, target, caster }) {}
        }
    }
}
