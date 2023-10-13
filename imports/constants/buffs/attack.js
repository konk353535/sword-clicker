import moment from "moment"
import _ from "underscore"

import { addBuff, lookupBuff, removeBuff } from "../../battleUtils"
import { CInt, autoPrecisionValue } from "../../utils.js"

export const ATTACK_BUFFS = {
    furied_defense: {
        duplicateTag: "furied_defense", // Used to stop duplicate buffs
        icon: "furiedDefense.svg",
        name: "furied defense",
        description({ buff, level }) {
            const c = buff.constants
            return `Counter attack for 100% attack damage. <br />
        Lasts for 25 seconds.`
        },
        constants: {
            damageDecimal: 1
        },
        data: {
            duration: 25,
            totalDuration: 25
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {
                const constants =
                    buff.constants && buff.constants.constants
                        ? buff.constants.constants
                        : lookupBuff(buff.id).constants
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                if (buff.duration !== Infinity) {
                    buff.duration -= secondsElapsed
                    if (buff.duration <= 0) {
                        removeBuff({ buff, target, caster, actualBattle })
                    }
                }
            },

            onTookDamage({ buff, attacker, defender, actualBattle, secondsElapsed, damageDealt }) {
                const constants =
                    buff.constants && buff.constants.constants
                        ? buff.constants.constants
                        : lookupBuff(buff.id).constants
                const defenderAttack = defender.stats.attack
                const defenderAttackMax = defender.stats.attackMax
                const actualDamage =
                    (defenderAttack + (defenderAttackMax - defenderAttack) * Math.random()) * constants.damageDecimal

                actualBattle.dealDamage(actualDamage, {
                    defender: attacker,
                    attacker: defender,
                    tickEvents: actualBattle.tickEvents,
                    historyStats: actualBattle.historyStats,
                    customIcon: "counterAttack.svg",
                    customColor: "#f7750f"
                })
            },

            onRemove({ buff, target, caster, actualBattle }) {}
        }
    },

    basic_poison: {
        duplicateTag: "basic_poison", // Used to stop duplicate buffs
        icon: "poison.svg",
        name: "basic poison",
        description({ buff, level }) {
            return "Deals poison damage over time"
        },
        constants: {
            timeTillDamage: 5,
            allowTicks: true // allow this to tick even when stunned
        },
        events: {
            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                const constants =
                    buff.constants && buff.constants.constants
                        ? buff.constants.constants
                        : lookupBuff(buff.id).constants

                if (buff.data.timeTillDamage !== undefined) {
                    buff.data.timeTillDamage -= secondsElapsed
                } else {
                    buff.data.timeTillDamage = 0
                }

                if (buff.data.timeTillDamage <= 0) {
                    buff.data.timeTillDamage = constants.timeTillDamage
                    const poisonDamage = buff.data.damage
                    actualBattle.dealDamage(poisonDamage, {
                        defender: target,
                        attacker: actualBattle.allUnitsMap[buff.data.sourceId],
                        tickEvents: actualBattle.tickEvents,
                        historyStats: actualBattle.historyStats,
                        customIcon: "poison.svg",
                        customColor: "#229b00"
                    })
                }

                if (buff.duration !== Infinity) {
                    buff.duration -= secondsElapsed
                    if (buff.duration <= 0) {
                        removeBuff({ buff, target, caster, actualBattle })
                    }
                }
            },

            onRemove() {}
        }
    },

    attack_up: {
        duplicateTag: "attack_up", // Used to stop duplicate buffs
        icon: "attack.svg",
        name: "attack up",
        description({ buff, level }) {
            const attackBase = buff.constants.attackBase
            const attackPerLevel = buff.constants.attackPerLevel * level
            const attackIncrease = attackBase + attackPerLevel

            return `
        Passive ability<br />
        <b>+${Math.round(attackIncrease * 100)}%</b> attack damage. (+${Math.round(
                buff.constants.attackPerLevel * 100
            )}% per lvl)<br />
        While equipped this is <b>always active</b>.`
        },
        constants: {
            attackBase: 0.05,
            attackPerLevel: 0.05
        },
        data: {
            duration: Infinity,
            totalDuration: Infinity
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {
                const constants =
                    buff.constants && buff.constants.constants
                        ? buff.constants.constants
                        : lookupBuff(buff.id).constants

                const attackBase = constants.attackBase
                const attackPerLevel = constants.attackPerLevel * buff.data.level
                const attackIncrease = attackBase + attackPerLevel

                buff.data.attackIncrease = attackIncrease
                caster.stats.attack *= 1 + buff.data.attackIncrease
                caster.stats.attackMax *= 1 + buff.data.attackIncrease
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                if (buff.duration !== Infinity) {
                    buff.duration -= secondsElapsed
                    if (buff.duration <= 0) {
                        removeBuff({ buff, target, caster, actualBattle })
                    }
                }
            },

            onRemove({ buff, target, caster }) {
                caster.stats.attack /= 1 + buff.data.attackIncrease
                caster.stats.attackMax /= 1 + buff.data.attackIncrease
            }
        }
    },

    accuracy_up: {
        duplicateTag: "accuracy_up", // Used to stop duplicate buffs
        icon: "accuracy.svg",
        name: "accuracy up",
        description({ buff, level }) {
            const accuracyBase = buff.constants.accuracyBase
            const accuracyPerLevel = buff.constants.accuracyPerLevel * level
            const accuracyIncrease = accuracyBase + accuracyPerLevel

            return `
        Passive ability<br />
        <b>+${accuracyIncrease}</b> accuracy. (+${buff.constants.accuracyPerLevel} per lvl)<br />
        While equipped this is <b>always active</b>.`
        },
        constants: {
            accuracyBase: 10,
            accuracyPerLevel: 15
        },
        data: {
            duration: Infinity,
            totalDuration: Infinity
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {
                const constants =
                    buff.constants && buff.constants.constants
                        ? buff.constants.constants
                        : lookupBuff(buff.id).constants
                const accuracyBase = constants.accuracyBase
                const accuracyPerLevel = constants.accuracyPerLevel * buff.data.level
                const accuracyIncrease = accuracyBase + accuracyPerLevel
                buff.data.accuracyIncrease = accuracyIncrease
                caster.stats.accuracy += buff.data.accuracyIncrease
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                if (buff.duration !== Infinity) {
                    buff.duration -= secondsElapsed
                    if (buff.duration <= 0) {
                        removeBuff({ buff, target, caster, actualBattle })
                    }
                }
            },

            onRemove({ buff, target, caster }) {
                //console.log(`${caster.stats.accuracy} -= ${buff.data.accuracyIncrease}`);
                if (buff.data.accuracyIncrease) {
                    caster.stats.accuracy -= buff.data.accuracyIncrease
                }
            }
        }
    },

    critical_up: {
        duplicateTag: "critical_up", // Used to stop duplicate buffs
        icon: "criticalChance2.svg",
        name: "critical up",
        description({ buff, level }) {
            const criticalBase = buff.constants.criticalBase
            const criticalPerLevel = buff.constants.criticalPerLevel * level
            const criticalIncrease = criticalBase + criticalPerLevel
            return `
        Passive ability<br />
        <b>+${criticalIncrease}%</b> critical chance. (+${buff.constants.criticalPerLevel}% per lvl)<br />
        While equipped this is <b>always active</b>.`
        },
        constants: {
            criticalBase: 4,
            criticalPerLevel: 3
        },
        data: {
            duration: Infinity,
            totalDuration: Infinity
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {},

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                if (!buff.data.criticalIncrease) {
                    const constants =
                        buff.constants && buff.constants.constants
                            ? buff.constants.constants
                            : lookupBuff(buff.id).constants
                    const criticalBase = constants.criticalBase
                    const criticalPerLevel = constants.criticalPerLevel * buff.data.level
                    const criticalIncrease = criticalBase + criticalPerLevel
                    buff.data.criticalIncrease = criticalIncrease
                    target.stats.criticalChance += buff.data.criticalIncrease
                }

                if (buff.duration !== Infinity) {
                    buff.duration -= secondsElapsed
                    if (buff.duration <= 0) {
                        removeBuff({ buff, target, caster, actualBattle })
                    }
                }
            },

            onRemove({ buff, target, caster }) {
                if (buff.data.criticalIncrease) {
                    target.stats.criticalChance -= buff.data.criticalIncrease
                }
            }
        }
    },

    haste: {
        duplicateTag: "haste", // Used to stop duplicate buffs
        icon: "attackSpeed.svg",
        name: "haste",
        description({ buff, level }) {
            const attackSpeedBase = buff.constants.attackSpeedBase
            const attackSpeedPerLevel = buff.constants.attackSpeedPerLevel * level
            const attackSpeedIncrease = attackSpeedBase + attackSpeedPerLevel
            return `
        Passive ability<br />
        <b>+${attackSpeedIncrease}%</b> attack speed. (+${buff.constants.attackSpeedPerLevel}% per lvl)<br />
        While equipped this is <b>always active</b>.`
        },
        constants: {
            attackSpeedBase: 5,
            attackSpeedPerLevel: 3
        },
        data: {
            duration: Infinity,
            totalDuration: Infinity,
            custom: true
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {
                const constants =
                    buff.constants && buff.constants.constants
                        ? buff.constants.constants
                        : lookupBuff(buff.id).constants
                const attackSpeedBase = constants.attackSpeedBase
                const attackSpeedPerLevel = constants.attackSpeedPerLevel * buff.data.level
                const attackSpeedIncrease = attackSpeedBase + attackSpeedPerLevel

                buff.data.attackSpeedIncrease = target.stats.attackSpeed * (attackSpeedIncrease / 100)
                target.stats.attackSpeed += buff.data.attackSpeedIncrease // causes relcalcuation in getAttackSpeedTicks()

                buff.custom = true
                buff.data.custom = true
                buff.customText = `+${autoPrecisionValue(buff.data.attackSpeedIncrease)}`
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                if (buff.duration !== Infinity) {
                    buff.duration -= secondsElapsed
                    if (buff.duration <= 0) {
                        removeBuff({ buff, target, caster, actualBattle })
                    }
                }
            },

            onRemove({ buff, target, caster }) {
                if (buff.data.attackSpeedIncrease) {
                    target.stats.attackSpeed -= buff.data.attackSpeedIncrease // causes relcalcuation in getAttackSpeedTicks()
                }
                buff.customText = ""
            }
        }
    },

    vampirism: {
        duplicateTag: "vampirism", // Used to stop duplicate buffs
        icon: "vampirism.svg",
        name: "vampirism",
        description({ buff, level }) {
            const lifestealBase = buff.constants.lifestealBase * 100
            const lifestealPerLevel = buff.constants.lifestealPerLevel * 100

            const lifestealTotal = lifestealBase + lifestealPerLevel * level
            return `Heal for ${lifestealTotal.toFixed(0)}% of auto attack damage. (+${lifestealPerLevel.toFixed(
                0
            )}% damage per lvl)<br />
        Lasts 2 minutes.`
        },
        constants: {
            lifestealBase: 0.16,
            lifestealPerLevel: 0.04
        },
        data: {
            duration: 120,
            totalDuration: 120
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {
                const constants =
                    buff.constants && buff.constants.constants
                        ? buff.constants.constants
                        : lookupBuff(buff.id).constants

                const lifestealBase = constants.lifestealBase
                const lifestealPerLevel = constants.lifestealPerLevel
                buff.data.lifestealTotal = lifestealBase + lifestealPerLevel * buff.data.level
            },

            onDidDamage({ buff, defender, attacker, actualBattle, damageDealt }) {
                const totalHeal = damageDealt * buff.data.lifestealTotal

                actualBattle.healTarget(totalHeal, {
                    caster: attacker,
                    target: attacker,
                    tickEvents: actualBattle.tickEvents,
                    historyStats: actualBattle.historyStats,
                    healSource: buff
                })
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                if (buff.duration !== Infinity) {
                    buff.duration -= secondsElapsed
                    if (buff.duration <= 0) {
                        removeBuff({ buff, target, caster, actualBattle })
                    }
                }
            },

            onRemove({ buff, target, caster }) {}
        }
    },

    poisoned_blade: {
        duplicateTag: "poisoned_blade", // Used to stop duplicate buffs
        icon: "poisonedBlade.svg",
        name: "poisoned blade",
        description({ buff, level }) {
            let localLevel = CInt(level)
            if (localLevel <= 0) {
                localLevel = 1
            }

            const chance = buff.constants.poisonChance * 100
            const damagePerLevel = buff.constants.poisonDamagePerLevel * 100
            const damage = (buff.constants.poisonDamageBase + buff.constants.poisonDamagePerLevel * localLevel) * 100

            return `
        Passive ability<br />
        <b>${chance.toFixed(
            0
        )}%</b> chance on auto-attack hit to poison the enemy.  Poison will cause <b>${damage.toFixed(
                0
            )}%</b> physical damage every <b>5</b> seconds for <b>5 minutes</b>. (+${damagePerLevel}% damage per lvl).<br />
        While equipped this is <b>always active</b>.`
        },
        constants: {
            poisonChance: 0.07,
            poisonDamageBase: 0.2,
            poisonDamagePerLevel: 0.05
        },
        data: {
            duration: Infinity,
            totalDuration: Infinity
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {},

            onDidDamage({ buff, defender, attacker, actualBattle }) {
                const constants =
                    buff.constants && buff.constants.constants
                        ? buff.constants.constants
                        : lookupBuff(buff.id).constants
                if (Math.random() <= constants.poisonChance) {
                    const baseDamage = attacker.stats.attack
                    const extraDamage = Math.round(Math.random() * (attacker.stats.attackMax - attacker.stats.attack))
                    const abilityDamagePercentage =
                        constants.poisonDamageBase + constants.poisonDamagePerLevel * buff.data.level

                    const totalDamage = (baseDamage + extraDamage) * abilityDamagePercentage

                    // Add poisoned debuff to enemy
                    const newBuff = defender.addBuff({
                        id: "basic_poison",
                        data: {
                            duration: 300,
                            totalDuration: 300,
                            damage: Math.ceil(totalDamage),
                            icon: "poison.svg",
                            name: "Poison",
                            description: `Take ${Math.ceil(totalDamage)} damage every 5 seconds.`,
                            sourceId: attacker.id
                        }
                    })

                    newBuff.data.casterUnit = attacker.id
                }
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                if (buff.duration !== Infinity) {
                    buff.duration -= secondsElapsed
                    if (buff.duration <= 0) {
                        removeBuff({ buff, target, caster, actualBattle })
                    }
                }
            },

            onRemove({ buff, target, caster }) {}
        }
    },

    phantom_strikes: {
        duplicateTag: "phantom_strikes", // Used to stop duplicate buffs
        icon: "phantomStrikes.svg",
        name: "phantom strikes",
        description({ buff, level }) {
            let localLevel = CInt(level)
            if (localLevel <= 0) {
                localLevel = 1
            }

            const chance = buff.constants.extraAttackChance * 100
            const damagePerLevel = buff.constants.extraAttackDamagePerLevel * 100
            const damage =
                (buff.constants.extraAttackDamageBase + buff.constants.extraAttackDamagePerLevel * localLevel) * 100

            return `
        Passive ability<br />
        Auto-attacks have a <b>${chance}%</b> chance to repeat.<br />
        Repeat attacks cause <b>+${damage.toFixed(0)}%</b> extra damage. (+${damagePerLevel}% per lvl)<br />
        While equipped this is <b>always active</b>.`
        },
        constants: {
            extraAttackChance: 0.2,
            extraAttackDamageBase: 0.8,
            extraAttackDamagePerLevel: 0.2
        },
        data: {
            duration: Infinity,
            totalDuration: Infinity
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {},

            onDidDamage({ originalAutoAttack, buff, defender, attacker, actualBattle }) {
                const constants =
                    buff.constants && buff.constants.constants
                        ? buff.constants.constants
                        : lookupBuff(buff.id).constants
                if (originalAutoAttack && Math.random() <= constants.extraAttackChance) {
                    // 2018-11-10 psouza4:  updated phantom strikes to actually call auto-attack routine and prevent it from recursively
                    //                      calling itself (in case the phantom strikes chance tries to proc itself), allowing phantom
                    //                      strikes to apply on-hit effects as it should

                    actualBattle.autoAttack({
                        attacker,
                        defender,
                        originalAutoAttack: false,
                        damageModifier: 0.2 * buff.data.level, // 20% bonus damage x level
                        source: "phantom_strikes"
                    })

                    /*        
          const baseDamage = attacker.stats.attack;
          const extraDamage = Math.round(Math.random() * (attacker.stats.attackMax - attacker.stats.attack));
          const abilityDamagePercentage = constants.extraAttackDamageBase + constants.extraAttackDamagePerLevel * buff.data.level;

          const totalDamage = (baseDamage + extraDamage) * abilityDamagePercentage;

          actualBattle.dealDamage(totalDamage, {
            attacker,
            defender,
            tickEvents: actualBattle.tickEvents,
            historyStats: actualBattle.historyStats,
          });
          */
                }
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                if (buff.duration !== Infinity) {
                    buff.duration -= secondsElapsed
                    if (buff.duration <= 0) {
                        removeBuff({ buff, target, caster, actualBattle })
                    }
                }
            },

            onRemove({ buff, target, caster }) {}
        }
    },

    twin_blades: {
        duplicateTag: "twin_blades",
        icon: "twinBlades.svg",
        name: "twin blades",
        description({ buff, level }) {
            let localLevel = CInt(level)
            if (localLevel <= 0) {
                localLevel = 1
            }

            const chance = buff.constants.extraAttackChance * 100
            const damagePerLevel = buff.constants.extraAttackDamagePerLevel * 100
            const damage =
                (buff.constants.extraAttackDamageBase + buff.constants.extraAttackDamagePerLevel * localLevel) * 100

            return `
        Passive ability<br />
        Auto-attacks hit enemies adjacent to your target (applies on-hit effects). Consumes one stack when triggered. Stacks generate every second, maximum of 20.<br />
        While equipped this is <b>always active</b>.`
        },
        constants: {},
        data: {
            duration: Infinity,
            totalDuration: Infinity
        },
        events: {
            onApply({ buff, target, caster, actualBattle }) {
                buff.stacks = 1
                buff.data.timeTillStack = 1
            },

            onDidDamage({ buff, defender, attacker, actualBattle, originalAutoAttack }) {
                if (buff.stacks <= 0 || !originalAutoAttack) {
                    return
                }

                /*
                const baseDamage = attacker.stats.attack
                const extraDamage = Math.round(Math.random() * (attacker.stats.attackMax - attacker.stats.attack))
                const damage = baseDamage + extraDamage
                */

                if (attacker) {
                    // Get the defender
                    const ourTargetUnit = attacker.targetUnit
                    if (ourTargetUnit) {
                        // Get enemies both side of him
                        const ourTargetsAllies = ourTargetUnit.adjacentAllies
                        if (ourTargetsAllies && ourTargetsAllies.length > 0) {
                            buff.stacks -= 1
                            ourTargetUnit.adjacentAllies.forEach((newTarget) => {
                                // Call auto attack on them as well
                                actualBattle.autoAttack({
                                    attacker,
                                    defender: newTarget,
                                    tickEvents: actualBattle.tickEvents,
                                    historyStats: actualBattle.historyStats,
                                    originalAutoAttack: false
                                })

                                // Apply a cooldown to our ability
                            })
                        }
                    }
                }
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                buff.data.timeTillStack -= secondsElapsed
                if (buff.data.timeTillStack <= 0) {
                    buff.data.timeTillStack = 1
                    buff.stacks++
                    if (buff.stacks > 20) {
                        buff.stacks = 20
                    }
                }
            },

            onRemove({ buff, target, caster }) {}
        }
    },

    thirsty_fangs: {
        duplicateTag: "thirsty_fangs", // Used to stop duplicate buffs
        icon: "thirstyFangs.svg",
        name: "thirsty fangs",
        description({ buff, level }) {
            let localLevel = CInt(level)
            if (localLevel <= 0) {
                localLevel = 1
            }

            const damagePerLevel = buff.constants.extraAttackDamagePerLevel * 100
            const damage = (buff.constants.damageDecimal + buff.constants.extraAttackDamagePerLevel * localLevel) * 100
            const healing = buff.constants.healingDecimal * 100

            return `
        Passive ability<br />
        <i>When your target is bleeding</i><br />
        <b>+${damage.toFixed(0)}%</b> damage to bleeding targets (+${damagePerLevel}% per lvl).<br />
        While below <b>60%</b> health, heal for <b>${healing.toFixed(0)}%</b> of damage dealt.<br />
        While equipped this is <b>always active</b>.`
        },
        constants: {
            damageDecimal: 0.15,
            extraAttackDamagePerLevel: 0.05,
            healingDecimal: 0.2
        },
        data: {
            duration: Infinity,
            totalDuration: Infinity
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {},

            onDidDamage({ buff, defender, attacker, actualBattle }) {
                const constants =
                    buff.constants && buff.constants.constants
                        ? buff.constants.constants
                        : lookupBuff(buff.id).constants
                const baseDamage = attacker.stats.attack
                const extraDamage = Math.round(Math.random() * (attacker.stats.attackMax - attacker.stats.attack))
                const damageBoost = constants.damageDecimal + constants.extraAttackDamagePerLevel * buff.data.level
                const totalHealing = (baseDamage + extraDamage) * constants.healingDecimal
                const totalDamage = (baseDamage + extraDamage) * damageBoost

                const hasBleed = defender.buffs.find((buff) => buff.id === "bleed" || buff.id === "bleed_proper")

                if (hasBleed) {
                    // My current hp
                    const hpDecimal = attacker.stats.health / attacker.stats.healthMax

                    if (hpDecimal <= 0.6) {
                        actualBattle.healTarget(totalHealing, {
                            caster: attacker,
                            target: attacker,
                            tickEvents: actualBattle.tickEvents,
                            historyStats: actualBattle.historyStats,
                            healSource: buff,
                            customIcon: "thirstyFangs.svg"
                        })
                    }

                    actualBattle.dealDamage(totalDamage, {
                        attacker,
                        defender,
                        tickEvents: actualBattle.tickEvents,
                        historyStats: actualBattle.historyStats,
                        customIcon: "thirstyFangs.svg"
                    })
                }
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                if (buff.duration !== Infinity) {
                    buff.duration -= secondsElapsed
                    if (buff.duration <= 0) {
                        removeBuff({ buff, target, caster, actualBattle })
                    }
                }
            },

            onRemove({ buff, target, caster }) {}
        }
    },

    war_cry: {
        duplicateTag: "war_cry", // Used to stop duplicate buffs
        icon: "warCry.svg",
        name: "war cry",
        description({ buff, level }) {
            let localLevel = CInt(level)
            if (localLevel <= 0) {
                localLevel = 1
            }

            return `Increases your party's maximum damage range by 50% for 10 seconds.`
        },
        constants: {},
        data: {
            duration: 10,
            totalDuration: 10
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {
                const extraAttack = target.stats.attackMax * 1.5
                buff.data.extraAttack = extraAttack
                target.stats.attackMax += extraAttack
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                if (buff.duration !== Infinity) {
                    buff.duration -= secondsElapsed
                    if (buff.duration <= 0) {
                        removeBuff({ buff, target, caster, actualBattle })
                    }
                }
            },

            onRemove({ buff, target, caster }) {
                target.stats.attackMax -= buff.data.extraAttack
            }
        }
    },

    berserk: {
        duplicateTag: "berserk", // Used to stop duplicate buffs
        icon: "berserk.svg",
        name: "berserk",
        description({ buff, level, characterClass }) {
            let localLevel = CInt(level)
            if (localLevel <= 0) {
                localLevel = 1
            }

            if (typeof characterClass === 'undefined') {
                characterClass = { id: '', equipped: '' }
            }

            const damagePerLevel = (characterClass?.equipped != 'barbarian') ? buff.constants.damagePercentageIncreasePerLevel : buff.constants.barbarian.damagePercentageIncreasePerLevel
            const damageTakenPerLevel = (characterClass?.equipped != 'barbarian') ? buff.constants.damageTakenPercentageIncreasePerLevel : buff.constants.barbarian.damageTakenPercentageIncreasePerLevel
            const healthLostPerLevel = (characterClass?.equipped != 'barbarian') ? buff.constants.healthLostPerSecondPerLevel : buff.constants.barbarian.healthLostPerSecondPerLevel

            const damageIncrease = ((characterClass?.equipped != 'barbarian') ? buff.constants.damagePercentageIncreaseBase : buff.constants.barbarian.damagePercentageIncreaseBase) + damagePerLevel * localLevel
            const damageTakenIncrease = ((characterClass?.equipped != 'barbarian') ? buff.constants.damageTakenPercentageIncreaseBase : buff.constants.barbarian.damageTakenPercentageIncreaseBase) + damageTakenPerLevel * localLevel
            const healthLostPerSecond = ((characterClass?.equipped != 'barbarian') ? buff.constants.healthLostPerSecondBase : buff.constants.barbarian.healthLostPerSecondBase) + healthLostPerLevel * localLevel
            const duration = (characterClass?.equipped != 'barbarian') ? buff.data.totalDuration : buff.data.barbarian.totalDuration

            const classEffect = (characterClass?.equipped === 'barbarian') ? `This ability has been enhanced as a <b>${characterClass?.data?.name}</b><br />` : ''

            return `
        ${classEffect}
        <b>+${damageIncrease.toFixed(0)}%</b> damage and attack speed. (+${damagePerLevel}% per lvl)<br />
        <b>+${damageTakenIncrease.toFixed(0)}%</b> damage taken. (+${damageTakenPerLevel}% per lvl)<br />
        You lose <b>${healthLostPerSecond.toFixed(0)} health</b> per second. (+${healthLostPerLevel} per lvl)<br />
        You can\'t change your active target while berserking.<br />
        Duration <b>${duration}s</b>`
        },
        constants: {
            damagePercentageIncreaseBase: 35,
            damagePercentageIncreasePerLevel: 5,
            damageTakenPercentageIncreaseBase: 17,
            damageTakenPercentageIncreasePerLevel: 3,
            healthLostPerSecondBase: -1,
            healthLostPerSecondPerLevel: 3,
            barbarian: { // Barbarian version
                damagePercentageIncreaseBase: 70,
                damagePercentageIncreasePerLevel: 10,
                damageTakenPercentageIncreaseBase: 17,
                damageTakenPercentageIncreasePerLevel: 3,
                healthLostPerSecondBase: -0.5,
                healthLostPerSecondPerLevel: 1.5,
            }
        },
        data: {
            duration: 15,
            totalDuration: 15,
            barbarian: { // Barbarian version
                duration: 30,
                totalDuration: 30
            }
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {
                let constants =
                    buff.constants && buff.constants.constants
                        ? buff.constants.constants
                        : lookupBuff(buff.id).constants

                // Barbarian version
                if (caster?.currentClass?.id === "barbarian" && constants?.barbarian) {
                    constants = constants.barbarian
                    buff.duration = buff.data.barbarian.duration
                    buff.data.duration = buff.data.barbarian.duration
                    buff.data.totalDuration = buff.data.barbarian.totalDuration
                }

                buff.data.endDate = moment().add(buff.duration, "seconds").toDate()
                // Increases damage and attack speed
                const damageIncrease =
                    constants.damagePercentageIncreaseBase +
                    constants.damagePercentageIncreasePerLevel * buff.data.level
                // Damage taken
                const damageTaken =
                    constants.damageTakenPercentageIncreaseBase +
                    constants.damageTakenPercentageIncreasePerLevel * buff.data.level
                // Health lost
                const healthLost =
                    constants.healthLostPerSecondBase + constants.healthLostPerSecondPerLevel * buff.data.level

                buff.data.damageIncrease = damageIncrease
                buff.data.damageTakenIncrease = damageTaken
                buff.data.healthLost = -1 * healthLost

                buff.data.extraAttackMax = target.stats.attackMax * (buff.data.damageIncrease / 100)
                buff.data.extraAttack = target.stats.attack * (buff.data.damageIncrease / 100)

                target.stats.attack += buff.data.extraAttack
                target.stats.attackMax += buff.data.extraAttackMax
                target.stats.attackSpeed *= 1 + buff.data.damageIncrease / 100
                target.stats.damageTaken *= 1 + buff.data.damageTakenIncrease / 100

                target.isAbleToChangeTargets = false
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                let localSecondsElapsed = secondsElapsed

                const damageToTake = localSecondsElapsed * buff.data.healthLost

                actualBattle.dealDamage(damageToTake * -1, {
                    attacker: caster,
                    defender: caster,
                    tickEvents: actualBattle.tickEvents,
                    historyStats: actualBattle.historyStats,
                    isTrueDamage: true,
                    customIcon: "berserk.svg"
                })

                if (buff.duration !== Infinity) {
                    buff.duration -= secondsElapsed
                    if (buff.duration <= 0) {
                        removeBuff({ buff, target, caster, actualBattle })
                    }
                }
            },

            onRemove({ buff, target, caster }) {
                target.stats.attack -= buff.data.extraAttack
                target.stats.attackMax -= buff.data.extraAttackMax
                target.stats.attackSpeed /= 1 + buff.data.damageIncrease / 100
                target.stats.damageTaken /= 1 + buff.data.damageTakenIncrease / 100

                target.isAbleToChangeTargets = true
            }
        }
    },

    mammoth_berserk: {
        duplicateTag: "mammoth_berserk", // Used to stop duplicate buffs
        icon: "berserk.svg",
        name: "berserk",
        description({ buff, level }) {
            let localLevel = CInt(level)
            if (localLevel <= 0) {
                localLevel = 1
            }

            const damagePerLevel = buff.constants.damagePercentageIncreasePerLevel
            const damageTakenPerLevel = buff.constants.damageTakenPercentageIncreasePerLevel

            const damageIncrease = buff.constants.damagePercentageIncreaseBase + damagePerLevel * localLevel
            const damageTakenIncrease =
                buff.constants.damageTakenPercentageIncreaseBase + damageTakenPerLevel * localLevel
            const duration = buff.data.totalDuration

            return `
        <b>+${damageIncrease.toFixed(0)}%</b> damage and attack speed. (+${damagePerLevel}% per lvl)<br />
        <b>+${damageTakenIncrease.toFixed(0)}%</b> damage taken. (+${damageTakenPerLevel}% per lvl)<br />
        You can\'t change your active target while berserking.<br />
        Duration <b>${duration}s</b>`
        },
        constants: {
            damagePercentageIncreaseBase: 35,
            damagePercentageIncreasePerLevel: 5,
            damageTakenPercentageIncreaseBase: 17,
            damageTakenPercentageIncreasePerLevel: 3,
            healthLostPerSecondBase: -1,
            healthLostPerSecondPerLevel: 3
        },
        data: {
            duration: 15,
            totalDuration: 15
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {
                const constants =
                    buff.constants && buff.constants.constants
                        ? buff.constants.constants
                        : lookupBuff(buff.id).constants

                buff.data.endDate = moment().add(buff.duration, "seconds").toDate()
                // Increases damage and attack speed
                const damageIncrease =
                    constants.damagePercentageIncreaseBase +
                    constants.damagePercentageIncreasePerLevel * buff.data.level
                // Damage taken
                const damageTaken =
                    constants.damageTakenPercentageIncreaseBase +
                    constants.damageTakenPercentageIncreasePerLevel * buff.data.level

                buff.data.damageIncrease = damageIncrease
                buff.data.damageTakenIncrease = damageTaken

                buff.data.extraAttackMax = target.stats.attackMax * (buff.data.damageIncrease / 100)
                buff.data.extraAttack = target.stats.attack * (buff.data.damageIncrease / 100)

                target.stats.attack += buff.data.extraAttack
                target.stats.attackMax += buff.data.extraAttackMax
                target.stats.attackSpeed *= 1 + buff.data.damageIncrease / 100
                target.stats.damageTaken *= 1 + buff.data.damageTakenIncrease / 100

                target.isAbleToChangeTargets = false
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                if (buff.duration !== Infinity) {
                    buff.duration -= secondsElapsed
                    if (buff.duration <= 0) {
                        removeBuff({ buff, target, caster, actualBattle })
                    }
                }
            },

            onRemove({ buff, target, caster }) {
                target.stats.attack -= buff.data.extraAttack
                target.stats.attackMax -= buff.data.extraAttackMax
                target.stats.attackSpeed /= 1 + buff.data.damageIncrease / 100
                target.stats.damageTaken /= 1 + buff.data.damageTakenIncrease / 100

                target.isAbleToChangeTargets = true
            }
        }
    },

    double_edged_sword: {
        duplicateTag: "double_edged_sword", // Used to stop duplicate buffs
        icon: "doubleEdgedSword.svg",
        name: "double edged sword",
        description({ buff, level }) {
            const damagePerLevel = buff.constants.damagePerLevel
            const damageIncreasePerPercentage = buff.constants.damageBase + damagePerLevel * level
            return `
        Attack for <b>${damageIncreasePerPercentage * 100}%</b> of your max damage. (+${
                damagePerLevel * 100
            }% per lvl)<br />
        Deal 10% of this damage to yourself as true damage.`
        },
        constants: {
            damageBase: 1.25, // 200, 275, 350, 425, 500
            damagePerLevel: 0.75
        },
        duration: 0,
        data: {
            totalDuration: 0
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {
                const constants =
                    buff.constants && buff.constants.constants
                        ? buff.constants.constants
                        : lookupBuff(buff.id).constants
                const damageIncreasePerPercentage = constants.damageBase + constants.damagePerLevel * buff.data.level
                // Targets missing health %
                const baseDamage = caster.stats.attackMax
                const totalDamage = baseDamage * damageIncreasePerPercentage

                buff.data.endDate = moment().add(0, "seconds").toDate()
                actualBattle.dealDamage(totalDamage, {
                    attacker: caster,
                    defender: target,
                    tickEvents: actualBattle.tickEvents,
                    historyStats: actualBattle.historyStats,
                    customIcon: "doubleEdgedSword.svg"
                })

                actualBattle.dealDamage(totalDamage / 10, {
                    attacker: caster,
                    defender: caster,
                    tickEvents: actualBattle.tickEvents,
                    historyStats: actualBattle.historyStats,
                    isTrueDamage: true,
                    customIcon: "doubleEdgedSword.svg"
                })
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                removeBuff({ buff, target, caster, actualBattle })
            }
        }
    },

    execute: {
        duplicateTag: "execute", // Used to stop duplicate buffs
        icon: "execute.svg",
        name: "execute",
        description({ buff, level }) {
            const damagePerLevel = buff.constants.damagePerLevel
            const damageIncreasePerPercentageMin = (buff.constants.damageBase + damagePerLevel * level) * 0.6499
            const damageIncreasePerPercentageMax = (buff.constants.damageBase + damagePerLevel * level) * 0.9999
            return `
        <i>When your target is under 35% health</i><br />
        Execute enemies below 35% health for <b>${Math.round(
            damageIncreasePerPercentageMin * 100
        )}%</b> to <b>${Math.round(damageIncreasePerPercentageMax * 100)}%</b> damage. (+${
                damagePerLevel * 100
            }% per lvl)<br />
        Based on your target's missing health.  Causes no damage to targets above 35% health.`
        },
        constants: {
            damageBase: 2, // % Increase of damage for each % of health enemy is missing
            damagePerLevel: 0.5
        },
        duration: 0,
        data: {
            totalDuration: 0
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {
                // Target HP
                const targetHp = (target.stats.health / target.stats.healthMax) * 100
                if (targetHp > 35) {
                    return
                }

                const constants =
                    buff.constants && buff.constants.constants
                        ? buff.constants.constants
                        : lookupBuff(buff.id).constants
                const damageIncreasePerPercentage = constants.damageBase + constants.damagePerLevel * buff.data.level
                // Targets missing health %
                const missingHealthPercentage = 100 - (target.stats.health / target.stats.healthMax) * 100
                const baseDamage = caster.stats.attack
                const extraDamage = Math.round(Math.random() * (caster.stats.attackMax - caster.stats.attack))
                const totalDamage =
                    (baseDamage + extraDamage) * (missingHealthPercentage / 100) * damageIncreasePerPercentage

                buff.data.endDate = moment().add(0, "seconds").toDate()
                actualBattle.dealDamage(totalDamage, {
                    attacker: caster,
                    defender: target,
                    tickEvents: actualBattle.tickEvents,
                    historyStats: actualBattle.historyStats,
                    customIcon: "execute.svg"
                })
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                removeBuff({ buff, target, caster, actualBattle })
            }
        }
    },

    slash: {
        duplicateTag: "slash", // Used to stop duplicate buffs
        icon: "slash.svg",
        name: "slash",
        description({ buff, level }) {
            const damagePerLevel = buff.constants.damagePerLevel
            const damageBase = buff.constants.damageBase
            const damageTotal = Math.round((damageBase + damagePerLevel * level) * 100)
            return `
        Slash for <b>${damageTotal}%</b> damage. (+${damagePerLevel * 100}% per lvl)`
        },
        constants: {
            damageBase: 0.8,
            damagePerLevel: 0.2
        },
        duration: 0,
        data: {
            totalDuration: 0
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {
                const constants =
                    buff.constants && buff.constants.constants
                        ? buff.constants.constants
                        : lookupBuff(buff.id).constants
                const damagePerLevel = constants.damagePerLevel
                const damageBase = constants.damageBase
                const damageTotalDecimal = damageBase + damagePerLevel * buff.data.level

                const casterAttack = caster.stats.attack
                const casterAttackMax = caster.stats.attackMax
                const actualDamage =
                    (casterAttack + (casterAttackMax - casterAttack) * Math.random()) * damageTotalDecimal

                actualBattle.dealDamage(actualDamage, {
                    attacker: caster,
                    defender: target,
                    tickEvents: actualBattle.tickEvents,
                    historyStats: actualBattle.historyStats,
                    customIcon: "slash.svg"
                })
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                removeBuff({ buff, target, caster, actualBattle })
            }
        }
    },

    penetrating_slash: {
        duplicateTag: "penetrating_slash", // Used to stop duplicate buffs
        icon: "penetratingSlash.svg",
        name: "penetrating slash",
        description({ buff, level }) {
            const damagePerLevel = buff.constants.damagePerLevel
            const damageBase = buff.constants.damageBase
            const damageTotal = Math.round((damageBase + damagePerLevel * level) * 100)
            return `
        Slash for ${damageTotal}% damage. Ignores ${Math.round(
                buff.constants.armorPenetration * 100
            )}% of targets armor. <br />
        (+${damagePerLevel * 100}% damage per lvl)`
        },
        constants: {
            damageBase: 0.8,
            damagePerLevel: 0.2,
            armorPenetration: 0.8
        },
        data: {
            duration: 0,
            totalDuration: 0
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {
                const constants =
                    buff.constants && buff.constants.constants
                        ? buff.constants.constants
                        : lookupBuff(buff.id).constants
                const damagePerLevel = constants.damagePerLevel
                const damageBase = constants.damageBase
                const damageTotalDecimal = damageBase + damagePerLevel * buff.data.level

                const casterAttack = caster.stats.attack
                const casterAttackMax = caster.stats.attackMax
                const actualDamage =
                    (casterAttack + (casterAttackMax - casterAttack) * Math.random()) * damageTotalDecimal

                // Reduce armor by X% before hit
                target.stats.armor *= 1 - constants.armorPenetration
                actualBattle.dealDamage(actualDamage, {
                    attacker: caster,
                    defender: target,
                    tickEvents: actualBattle.tickEvents,
                    historyStats: actualBattle.historyStats,
                    customIcon: "penetratingSlash.svg"
                })
                target.stats.armor /= 1 - constants.armorPenetration
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                removeBuff({ buff, target, caster, actualBattle })
            }
        }
    },

    shield_bash: {
        duplicateTag: "shield_bash", // Used to stop duplicate buffs
        icon: "shieldBash.svg",
        name: "shield bash",
        description({ buff, level }) {
            const damagePerLevel = buff.constants.damagePerLevel
            const damageBase = buff.constants.damageBase
            const damageTotal = Math.round((damageBase + damagePerLevel * level) * 100)
            return `Deal ${damageTotal}% of your defense as damage. (+${damagePerLevel * 100}% per lvl)`
        },
        constants: {
            damageBase: 0.9,
            damagePerLevel: 0.1
        },
        data: {
            duration: 0,
            totalDuration: 0
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {
                const constants =
                    buff.constants && buff.constants.constants
                        ? buff.constants.constants
                        : lookupBuff(buff.id).constants
                const damagePerLevel = constants.damagePerLevel
                const damageBase = constants.damageBase
                const damageTotalDecimal = damageBase + damagePerLevel * buff.data.level
                // Targets missing health %
                const actualDamage = caster.stats.defense * damageTotalDecimal

                actualBattle.dealDamage(actualDamage, {
                    attacker: caster,
                    defender: target,
                    tickEvents: actualBattle.tickEvents,
                    historyStats: actualBattle.historyStats,
                    actualBattle,
                    customIcon: "shieldBash.svg"
                })
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                removeBuff({ target, buff, caster, actualBattle })
            }
        }
    },

    blade_spin: {
        duplicateTag: "blade_spin", // Used to stop duplicate buffs
        icon: "bladeSpin.svg",
        name: "blade spin",
        description({ buff, level }) {
            const damagePerLevel = buff.constants.damagePerLevel
            const damagePercentage = buff.constants.damagePercentage + damagePerLevel * level
            return `Deals ${damagePercentage}% weapon damage to all enemies. (+${damagePerLevel}% per lvl)`
        },
        constants: {
            damagePercentage: 55,
            damagePerLevel: 5
        },
        data: {
            duration: 0,
            totalDuration: 0
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {
                const constants =
                    buff.constants && buff.constants.constants
                        ? buff.constants.constants
                        : lookupBuff(buff.id).constants
                const baseDamage = caster.stats.attack
                const extraDamage = Math.round(Math.random() * (caster.stats.attackMax - caster.stats.attack))
                const percentDamage = constants.damagePercentage + buff.data.level * constants.damagePerLevel
                const totalDamage = (baseDamage + extraDamage) * (percentDamage / 100)

                // Do we have smoke_dagger buff?
                if (caster.buffs.find((buff) => buff.id === "smoke_dagger")) {
                    // Apply smoke_debuff to target
                    const newBuff = {
                        id: "smoke_dagger_debuff",
                        data: {
                            duration: 7,
                            totalDuration: 7,
                            icon: "smoke.svg",
                            description: "reduces accuracy",
                            accuracyReduction: target.stats.accuracy * 0.25
                        }
                    }
                    addBuff({ buff: newBuff, target, caster, actualBattle })
                }

                buff.data.endDate = moment().add(0, "seconds").toDate()
                actualBattle.dealDamage(totalDamage, {
                    attacker: caster,
                    defender: target,
                    tickEvents: actualBattle.tickEvents,
                    historyStats: actualBattle.historyStats,
                    isMagic: buff.data.hasOwnProperty("isMagic") ? buff.data.isMagic : false,
                    customIcon: "bladeSpin.svg"
                })
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                removeBuff({ buff, target, caster, actualBattle })
            },

            onRemove() {}
        }
    },

    blade_frenzy: {
        duplicateTag: "blade_frenzy", // Used to stop duplicate buffs
        icon: "bladeFrenzy.svg",
        name: "blade frenzy",
        description({ buff, level }) {
            const duration = buff.data.totalDuration
            const attackSpeedPerLevel = buff.constants.attackSpeedPerLevel
            const attackSpeedGain = buff.constants.attackSpeedBase + attackSpeedPerLevel * level
            return `
        <b>+${attackSpeedGain}%</b> attack speed. (+${attackSpeedPerLevel}% per lvl)<br />
        Duration <b>${duration}s</b>`
        },
        constants: {
            attackSpeedBase: 75,
            attackSpeedPerLevel: 25
        },
        data: {
            duration: 3,
            totalDuration: 3
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {
                buff.data.endDate = moment().add(buff.duration, "seconds").toDate()
                const constants =
                    buff.constants && buff.constants.constants
                        ? buff.constants.constants
                        : lookupBuff(buff.id).constants
                const attackSpeedGain = constants.attackSpeedBase + constants.attackSpeedPerLevel * buff.data.level

                buff.data.attackSpeedGain = attackSpeedGain

                target.stats.attackSpeed *= 1 + buff.data.attackSpeedGain / 100
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                if (buff.duration !== Infinity) {
                    buff.duration -= secondsElapsed
                    if (buff.duration <= 0) {
                        removeBuff({ buff, target, caster, actualBattle })
                    }
                }
            },

            onRemove({ buff, target, caster }) {
                target.stats.attackSpeed /= 1 + buff.data.attackSpeedGain / 100
            }
        }
    },

    bleed: {
        duplicateTag: "bleed", // Used to stop duplicate buffs
        icon: "bleed.svg",
        name: "bleed",
        description({ buff, level }) {
            const damagePerSecondPerLevel = buff.constants.damagePerSecondPerLevel
            const dps = buff.constants.damagePerSecondBase + damagePerSecondPerLevel * level
            return `Deals ${dps * 100}% of your accuracy as physical damage every second. (+3% per lvl) <br />
      For ${buff.data.totalDuration}s.`
        },
        constants: {
            damagePerSecondBase: 0.07,
            damagePerSecondPerLevel: 0.03,
            allowTicks: true // allow this to tick even when stunned
        },
        data: {
            duration: 12,
            totalDuration: 12
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {
                buff.data.endDate = moment().toDate()

                const constants =
                    buff.constants && buff.constants.constants
                        ? buff.constants.constants
                        : lookupBuff(buff.id).constants

                if (constants && !buff.data.dps) {
                    buff.data.dps = constants.damagePerSecondBase + constants.damagePerSecondPerLevel * buff.data.level
                    buff.data.dps *= caster.stats.accuracy
                }

                buff.data.timeTillDamage = 1
                buff.data.caster = caster.id

                const newBuff = {
                    id: "bleed_proper",
                    data: {
                        realDuration: 12,
                        duration: 12,
                        totalDuration: 12,
                        dps: buff.data.dps,
                        caster: caster.id,
                        timeTillDamage: 1,
                        allowDuplicates: true,
                        icon: "bleeding.svg",
                        name: "bleed",
                        duplicateTag: "bleed_proper",
                        description: `Bleed every second for ${buff.data.dps.toFixed(0)} damage`
                    }
                }

                // Add bleed debuff
                addBuff({ buff: newBuff, target: target, caster: caster })

                // remove stub debuff
                removeBuff({ buff, target, caster, actualBattle })
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                // remove stub debuff
                const originalCaster = actualBattle.allUnitsMap[buff.data.caster]

                removeBuff({ buff, target, originalCaster, actualBattle })
            },

            onRemove() {}
        }
    },

    bleed_proper: {
        duplicateTag: "bleed_proper", // Used to stop duplicate buffs
        icon: "bleeding.svg",
        name: "bleed",
        description({ buff, level }) {
            const damagePerSecondPerLevel = buff.constants.damagePerSecondPerLevel
            const dps = buff.constants.damagePerSecondBase + damagePerSecondPerLevel * level
            return `Deals ${dps * 100}% of your accuracy as physical damage every second. (+3% per lvl) <br />
      For ${buff.data.totalDuration}s.`
        },
        constants: {
            damagePerSecondBase: 0.07,
            damagePerSecondPerLevel: 0.03,
            allowTicks: true // allow this to tick even when stunned
        },
        data: {
            duration: 12,
            totalDuration: 12
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {
                if (CInt(buff.data.realDuration) > 0) {
                    buff.duration = CInt(buff.data.realDuration)
                    buff.totalDuration = CInt(buff.data.realDuration)
                    buff.data.duration = CInt(buff.data.realDuration)
                    buff.data.totalDuration = CInt(buff.data.realDuration)
                }

                buff.data.endDate = moment().add(buff.duration, "seconds").toDate()

                const constants =
                    buff.constants && buff.constants.constants
                        ? buff.constants.constants
                        : lookupBuff(buff.id).constants

                if (constants && !buff.data.dps) {
                    buff.data.dps = constants.damagePerSecondBase + constants.damagePerSecondPerLevel * buff.data.level
                    buff.data.dps *= caster.stats.accuracy
                }

                buff.data.timeTillDamage = 1
                buff.data.caster = caster.id
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                let localSecondsElapsed = secondsElapsed
                buff.data.timeTillDamage -= localSecondsElapsed

                if (buff.duration < 0) {
                    localSecondsElapsed += buff.duration
                    if (localSecondsElapsed < 0) {
                        localSecondsElapsed = 0
                    }
                }

                const originalCaster = actualBattle.allUnitsMap[buff.data.caster]

                if (buff.data.timeTillDamage < 0) {
                    buff.data.timeTillDamage = 1

                    actualBattle.dealDamage(buff.data.dps, {
                        attacker: originalCaster,
                        defender: target,
                        tickEvents: actualBattle.tickEvents,
                        historyStats: actualBattle.historyStats,
                        customIcon: "bleeding.svg"
                    })
                }

                if (buff.duration !== Infinity) {
                    buff.duration -= secondsElapsed
                    if (buff.duration <= 0) {
                        removeBuff({ buff, target, caster, actualBattle })
                    }
                }
            },

            onRemove() {}
        }
    },

    precise_shots: {
        duplicateTag: "precise_shots",
        icon: "preciseShots.svg",
        name: "precise shots",
        description({ buff, level }) {
            const totalDuration = buff.constants.baseDuration + buff.constants.extraTimePerLevel * level
            return `
        Your auto-attacks can't miss for <b>${totalDuration}</b> seconds. <br />
        (+${buff.constants.extraTimePerLevel} seconds per ability level)`
        },
        constants: {
            baseDuration: 12.5,
            extraTimePerLevel: 2.5
        },
        data: {
            duration: 12.5,
            totalDuration: 12.5
        },
        events: {
            onApply({ buff, target, caster, actualBattle }) {
                if (buff.duration !== Infinity) {
                    const buffConstants =
                        buff.constants && buff.constants.constants
                            ? buff.constants.constants
                            : lookupBuff(buff.id).constants
                    buff.duration += buffConstants.extraTimePerLevel * buff.data.level
                    buff.data.endDate = moment().add(buff.duration, "seconds").toDate()
                }
                target.cantMiss = true
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                if (buff.duration !== Infinity) {
                    buff.duration -= secondsElapsed
                    if (buff.duration <= 0) {
                        removeBuff({ buff, target, caster, actualBattle })
                    }
                }
            },

            onRemove({ buff, target, caster }) {
                target.cantMiss = false
            }
        }
    },

    power_shot: {
        duplicateTag: "power_shot",
        icon: "powerShot.svg",
        name: "power shot",
        description({ buff, level }) {
            const bonusDamage =
                buff.constants.baseDamageMultiplierPerLevel + buff.constants.extraDamageMultiplierPerLevel * level
            const armorPenetration =
                buff.constants.baseArmorPenetrationPerLevel + buff.constants.extraArmorPenetrationPerLevel * level
            return `
        A strong attack that deals <b>${100 * bonusDamage}%</b> damage and ignores <b>${
                100 * armorPenetration
            }%</b> of target's armor. <br />
        (+${100 * buff.constants.extraDamageMultiplierPerLevel}% damage and +${
                100 * buff.constants.extraArmorPenetrationPerLevel
            }% armor ignored per ability level)`
        },
        constants: {
            baseDamageMultiplierPerLevel: 1.75,
            extraDamageMultiplierPerLevel: 0.25,
            baseArmorPenetrationPerLevel: 0.5,
            extraArmorPenetrationPerLevel: 0.1
        },
        data: {},
        events: {
            onApply({ buff, target, caster, actualBattle }) {
                const buffConstants =
                    buff.constants && buff.constants.constants
                        ? buff.constants.constants
                        : lookupBuff(buff.id).constants
                const bonusDamage =
                    buffConstants.baseDamageMultiplierPerLevel +
                    buffConstants.extraDamageMultiplierPerLevel * buff.data.level
                const armorPenetration =
                    buffConstants.baseArmorPenetrationPerLevel +
                    buffConstants.extraArmorPenetrationPerLevel * buff.data.level
                const actualDamage =
                    bonusDamage * (caster.stats.attack + (caster.stats.attackMax - caster.stats.attack) * Math.random())

                // Reduce target armor by X% before hit
                const previousArmor = target.stats.armor
                target.stats.armor *= 1 - armorPenetration

                actualBattle.dealDamage(actualDamage, {
                    attacker: caster,
                    defender: target,
                    tickEvents: actualBattle.tickEvents,
                    historyStats: actualBattle.historyStats,
                    customIcon: "powerShot.svg"
                })

                // Restore target armor
                target.stats.armor = previousArmor
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                removeBuff({ buff, target, caster, actualBattle })
            }
        }
    },

    volley: {
        duplicateTag: "volley",
        icon: "volley.svg",
        name: "volley",
        description({ buff, level }) {
            const upperRange = buff.constants.extraShotsBase + buff.constants.extraShotsPerLevel * level
            const extraDamage = buff.constants.extraDamagePerLevel * level
            return `
        A succession of <b>${
            buff.constants.minimumShots
        }</b> to <b>${upperRange}</b> rapid fire auto-attack shots at random targets. Each shot deals an additional <b>${
                100 * extraDamage
            }%</b> bonus damage. <br />
        (+${buff.constants.extraShotsPerLevel} maximum shots and +${
                100 * buff.constants.extraDamagePerLevel
            }% bonus damage per ability level)`
        },
        constants: {
            minimumShots: 4,
            extraShotsBase: 7,
            extraShotsPerLevel: 1,
            extraDamagePerLevel: 0.05
        },
        data: {},
        events: {
            onApply({ buff, target, caster, actualBattle }) {
                const buffConstants =
                    buff.constants && buff.constants.constants
                        ? buff.constants.constants
                        : lookupBuff(buff.id).constants
                const lowerRange = buffConstants.minimumShots
                let  upperRange = buffConstants.extraShotsBase + buffConstants.extraShotsPerLevel * buff.data.level
                const extraDamage = buffConstants.extraDamagePerLevel * buff.data.level

                if (caster?.currentClass?.id === "ranger") {
                    let rangerVolleyBuff = undefined
                    target.buffs.forEach((thisBuff) => {
                        if (thisBuff.id === "class_trait_ranger_volley") {
                            rangerVolleyBuff = thisBuff
                        }
                    })
                    if (rangerVolleyBuff) {
                        upperRange += CInt(rangerVolleyBuff?._stacks)
                    }
                }

                const randomAttackCount = Math.ceil(Math.random() * upperRange + lowerRange)

                for (let i = 0; i < randomAttackCount; i++) {
                    let randomTargetUnit = _.sample(target.opposition)

                    // possible we transition to another floor and don't have a target yet
                    if (randomTargetUnit) {
                        actualBattle.autoAttack({
                            attacker: target,
                            defender: randomTargetUnit,
                            damageModifier: extraDamage
                        })
                    }
                }
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                removeBuff({ buff, target, caster, actualBattle })
            }
        }
    }
}
