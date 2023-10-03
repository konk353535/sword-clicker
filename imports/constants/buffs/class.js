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

            onDidDamage: function ({ buff, defender, attacker, actualBattle, damageDealt, source, customIcon, originalAutoAttack }) {
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

                // 25% chance that autoattacks strike adjacent targets when using a broadsword or battle axe
                if (originalAutoAttack) {
                    console.log(attacker && attacker.mainHandWeapon)
                    if (attacker.mainHandWeapon?.weaponType?.indexOf('_long_sword') !== -1 || attacker.mainHandWeapon?.weaponType?.indexOf('_battle_axe') !== -1) {
                        if (Math.random() <= 0.25) {
                            if (attacker) {
                                // Get the defender
                                const ourTargetUnit = attacker.targetUnit
                                if (ourTargetUnit) {
                                    // Get enemies both side of him
                                    const ourTargetsAllies = ourTargetUnit.adjacentAllies
                                    if (ourTargetsAllies && ourTargetsAllies.length > 0) {
                                        ourTargetUnit.adjacentAllies.forEach((newTarget) => {
                                            // Call auto attack on them as well
                                            actualBattle.autoAttack({
                                                attacker,
                                                defender: newTarget,
                                                tickEvents: actualBattle.tickEvents,
                                                historyStats: actualBattle.historyStats,
                                                originalAutoAttack: false
                                            })
                                        })
                                    }
                                }
                            }
                        }
                    }
                }
            },

            onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
                target.stats.magicPower = 0
            },

            onRemove({ buff, target, caster }) {}
        }
    }
}
