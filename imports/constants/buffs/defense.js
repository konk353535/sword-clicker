import moment from "moment"
import _ from "underscore"

import { addBuff, lookupBuff, removeBuff, getTargetableFriendlyUnits, getTargetableFriendlyUnitsBesidesMe, forceEnemiesToTargetRandomFromList } from "../../battleUtils"
import { CInt } from "../../utils.js"

export const DEFENSE_BUFFS = {
    volcanic_shield: {
        duplicateTag: "volcanic_shield", // Used to stop duplicate buffs
        icon: "volcanicShield.svg",
        name: "volcanic shield",
        description({ buff, level }) {
            let localLevel = CInt(level)
            if (localLevel <= 0) {
                localLevel = 1
            }

            const constants = buff.constants

            let armorBuff = constants.armorBase + constants.armorPerLevel * localLevel
            let damageBuff = (constants.damageBase + constants.damagePerLevel * localLevel) * 100

            return `Increase armor & magic armor by ${armorBuff}. (+${constants.armorPerLevel} per lvl)<br />
        After 10 seconds, erupts dealing ${damageBuff}% (+${
                constants.damagePerLevel * 100
            }% per lvl) weapon damage to all enemies`
        },
        data: {
            duration: 10,
            totalDuration: 10
        },
        constants: {
            armorBase: 75,
            armorPerLevel: 25,
            damageBase: 2,
            damagePerLevel: 0.5
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {
                const constants =
                    buff.constants && buff.constants.constants
                        ? buff.constants.constants
                        : lookupBuff(buff.id).constants
                let armorBuff = constants.armorBase + constants.armorPerLevel * buff.data.level

                // Increase armor & magic armor by 100
                target.stats.armor += armorBuff
                target.stats.magicArmor += armorBuff
                buff.duration = 10
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                buff.duration -= secondsElapsed

                if (buff.duration < 0) {
                    removeBuff({ buff, target, caster, actualBattle })
                }
            },

            onRemove({ buff, target, caster, actualBattle }) {
                // Mutate targets attack speed

                const constants =
                    buff.constants && buff.constants.constants
                        ? buff.constants.constants
                        : lookupBuff(buff.id).constants
                let armorBuff = constants.armorBase + constants.armorPerLevel * buff.data.level
                let damageBuff = constants.damageBase + constants.damagePerLevel * buff.data.level

                target.stats.armor -= armorBuff
                target.stats.magicArmor -= armorBuff

                const attack = target.stats.attack
                const attackMax = target.stats.attackMax
                const actualDamage = (attack + (attackMax - attack) * Math.random()) * damageBuff

                actualBattle.enemies.forEach((enemy) => {
                    actualBattle.dealDamage(actualDamage, {
                        attacker: target,
                        defender: enemy,
                        tickEvents: actualBattle.tickEvents,
                        historyStats: actualBattle.historyStats,
                        customIcon: "volcanicShield.svg",
                        source: "Volcanic Shield"
                    })
                })
            }
        }
    },

    frosted_attacks: {
        duplicateTag: "frosted_attacks", // Used to stop duplicate buffs
        icon: "frostedAttacks.svg",
        name: "frosted attacks",
        description({ buff, level }) {
            return `Lowers units attack speed by ${buff.data.attackSpeedDecrease}%`
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {
                // Mutate targets attack speed
                target.stats.attackSpeed *= 1 - buff.data.attackSpeedDecrease / 100
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                buff.duration -= secondsElapsed

                if (buff.duration < 0) {
                    removeBuff({ buff, target, caster, actualBattle })
                }
            },

            onRemove({ buff, target, caster }) {
                // Mutate targets attack speed
                target.stats.attackSpeed /= 1 - buff.data.attackSpeedDecrease / 100
            }
        }
    },

    phalanx: {
        duplicateTag: "phalanx", // Used to stop duplicate buffs
        icon: "phalanx.svg",
        name: "phalanx",
        description({ buff, level }) {},
        constants: {
            armorPerAlly: 200
        },
        data: {
            duration: Infinity,
            totalDuration: Infinity
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {
                buff.data.extraArmor = 0
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                const constants =
                    buff.constants && buff.constants.constants
                        ? buff.constants.constants
                        : lookupBuff(buff.id).constants

                if (!buff.data.timeTillUpdate || buff.data.timeTillUpdate <= 0) {
                    let phalanxCount = 0
                    if (buff.data.isEnemy) {
                        // Check for other enemies with buff
                        phalanxCount = actualBattle.enemies.filter((enemy) => {
                            return enemy.buffs.find((buff) => buff.id === "phalanx")
                        }).length
                    } else {
                        // Check for other allies with buff
                        phalanxCount = actualBattle.enemies.filter((enemy) => {
                            return enemy.buffs.find((buff) => buff.id === "phalanx")
                        }).length
                    }

                    if (buff.data.extraArmor) {
                        target.stats.armor -= buff.data.extraArmor
                    }

                    if (phalanxCount > 1) {
                        buff.data.hideBuff = false
                        buff.stacks = phalanxCount
                        buff.data.extraArmor = phalanxCount * constants.armorPerAlly
                        target.stats.armor += buff.data.extraArmor
                    } else {
                        buff.data.hideBuff = true
                        // Remove armor buff
                        buff.data.extraArmor = 0
                    }

                    buff.data.timeTillUpdate = 10
                }

                buff.data.timeTillUpdate -= secondsElapsed
            },

            onRemove({ buff, target, caster }) {}
        }
    },

    frost_armor: {
        duplicateTag: "frost_armor", // Used to stop duplicate buffs
        icon: "frostArmor.svg",
        name: "frost armor",
        description({ buff, level }) {
            let localLevel = CInt(level)
            if (localLevel <= 0) {
                localLevel = 1
            }

            const chance = buff.constants.frostChance * 100
            const attackSpeedDecrease = buff.constants.attackSpeedDecrease * 100
            const durationPerLevel = buff.constants.durationPerLevel
            const durationTotal = buff.constants.durationBase + durationPerLevel * localLevel

            return `
        Passive ability<br />
        <b>${chance}%</b> chance to freeze your attacker.  Frozen attackers have <b>${attackSpeedDecrease}%</b> lowered attack speed for <b>${durationTotal}s</b>. (+${durationPerLevel}s per lvl).<br />
        While equipped this is <b>always active</b>.`
        },
        constants: {
            frostChance: 0.2,
            attackSpeedDecrease: 0.35,
            durationBase: 9,
            durationPerLevel: 1
        },
        data: {
            duration: Infinity,
            totalDuration: Infinity
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {},

            onTookDamage({ buff, attacker, defender, actualBattle, secondsElapsed, damageDealt }) {
                const constants =
                    buff.constants && buff.constants.constants
                        ? buff.constants.constants
                        : lookupBuff(buff.id).constants
                if (Math.random() <= constants.frostChance) {
                    const attackSpeedDecrease = constants.attackSpeedDecrease * 100
                    const durationPerLevel = constants.durationPerLevel
                    const durationTotal = constants.durationBase + durationPerLevel * buff.data.level

                    const newBuff = {
                        id: "frosted_attacks",
                        data: {
                            duration: durationTotal,
                            totalDuration: durationTotal,
                            attackSpeedDecrease,
                            icon: "frostedAttacks.svg",
                            description: `Reduces your attack speed by ${attackSpeedDecrease}%`,
                            name: "Frosted Attacks"
                        }
                    }

                    addBuff({ buff: newBuff, target: attacker, caster: defender })
                }
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                if (buff.duration <= 0) {
                    removeBuff({ buff, target, caster, actualBattle })
                }
            },

            onRemove({ buff, target, caster }) {}
        }
    },

    health_up: {
        duplicateTag: "health_up", // Used to stop duplicate buffs
        icon: "health.svg",
        name: "health up",
        description({ buff, level }) {
            const healthBase = buff.constants.healthBase
            const healthPerLevel = buff.constants.healthPerLevel * level
            const healthIncrease = healthBase + healthPerLevel

            return `
        Passive ability<br />
        <b>+${Math.round(healthIncrease * 100)}%</b> maximum health. (+${
                Math.round(buff.constants.healthPerLevel * 1000) / 10
            }% per lvl)<br />
        While equipped this is <b>always active</b>.`
        },
        constants: {
            healthBase: 0.1,
            healthPerLevel: 0.025
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

                const healthBase = constants.healthBase
                const healthPerLevel = constants.healthPerLevel * buff.data.level
                const healthIncrease = healthBase + healthPerLevel

                buff.data.healthIncrease = healthIncrease

                // Only mutate health if it's full
                if (caster.stats.health === caster.stats.healthMax) {
                    caster.stats.health *= 1 + buff.data.healthIncrease
                }
                caster.stats.healthMax *= 1 + buff.data.healthIncrease
                caster.stats.healthMaxOrig *= 1 + buff.data.healthIncrease
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                if (buff.duration !== Infinity) {
                    buff.duration -= secondsElapsed
                    if (buff.duration <= 0) {
                        removeBuff({ buff, target, caster, actualBattle })
                    }
                }
            },

            onRemove({ buff, target, caster, actualBattle }) {
                caster.stats.health /= 1 + buff.data.healthIncrease
                caster.stats.healthMax /= 1 + buff.data.healthIncrease
                caster.stats.healthMaxOrig /= 1 + buff.data.healthIncrease
                actualBattle.checkDeath(caster, target)
            }
        }
    },

    sixth_sense: {
        // watchful_aura
        duplicateTag: "sixth_sense", // Used to stop duplicate buffs
        icon: "sixthSense.svg",
        name: "watchful aura",
        description({ buff, level }) {
            return `
        Passive ability<br />
        Dodge rate from defense skill won't fall below 35%. <br />
        Whenever you dodge, you are healed for 2% of your original maximum health. <br />
        This heal can occur only every 5 seconds.<br />
        While equipped this is <b>always active</b>.`
        },
        constants: {},
        data: {
            duration: Infinity,
            totalDuration: Infinity
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {
                target.stats.minimumHitChance = 0.35
                buff.stats = 0
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                if (buff.stacksTimer > 0) {
                    buff.stacksTimer -= secondsElapsed
                }
                if (buff.stacksTimer <= 0) {
                    buff.stacksTimer = undefined
                    buff.stacks = undefined
                } else {
                    buff.stacks = Math.ceil(buff.stacksTimer)
                }
            },

            onRemove({ buff, target, caster }) {},

            onDodgedDamage({ buff, defender, attacker, actualBattle }) {
                if (!buff.stacksTimer || buff.stacksTimer === 0) {
                    let hpMaxHealth = defender.stats.healthMax
                    if (defender.stats.healthMaxOrig) {
                        hpMaxHealth = defender.stats.healthMaxOrig
                    }
                    let hpHealAmount = (hpMaxHealth * 2) / 100
                    if (hpHealAmount + defender.stats.health > defender.stats.healthMax) {
                        hpHealAmount = defender.stats.healthMax - defender.stats.health
                    }

                    if (hpHealAmount > 0) {
                        actualBattle.healTarget(hpHealAmount, {
                            caster: defender,
                            target: defender,
                            tickEvents: actualBattle.tickEvents,
                            historyStats: actualBattle.historyStats,
                            healSource: buff
                        })

                        buff.stacksTimer = 5.0
                        buff.stacks = Math.ceil(buff.stacksTimer)
                    }
                }
            }
        }
    },

    defense_up: {
        duplicateTag: "defense_up", // Used to stop duplicate buffs
        icon: "defense.svg",
        name: "defense up",
        description({ buff, level }) {
            const defenseBase = buff.constants.defenseBase
            const defensePerLevel = buff.constants.defensePerLevel * level
            const defenseIncrease = defenseBase + defensePerLevel

            return `
        Passive ability<br />
        <b>+${defenseIncrease}</b> defense. (+${buff.constants.defensePerLevel} per lvl)<br />
        While equipped this is <b>always active</b>.`
        },
        constants: {
            defenseBase: 7.5,
            defensePerLevel: 12.5
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

                const defenseBase = constants.defenseBase
                const defensePerLevel = constants.defensePerLevel * buff.data.level
                const defenseIncrease = defenseBase + defensePerLevel

                buff.data.defenseIncrease = defenseIncrease
                caster.stats.defense += buff.data.defenseIncrease
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
                caster.stats.defense -= buff.data.defenseIncrease
            }
        }
    },

    spiked_armor: {
        duplicateTag: "spiked_armor", // Used to stop duplicate buffs
        icon: "spikedArmor.svg",
        name: "spiked armor",
        description({ buff, level }) {
            const damageReflectionBase = buff.constants.damageReflectionBase
            const damageReflectionPerLevel = buff.constants.damageReflectionPerLevel * level
            const damageReflection = damageReflectionBase + damageReflectionPerLevel

            return `
        Passive ability<br />
        Reflect (<b>${Math.round(
            damageReflection * 100
        )}% of attack damage taken) + 10</b> as magic damage. (+${Math.round(
                damageReflectionPerLevel * 100
            )}% per lvl)<br />
        While equipped this is <b>always active</b>.`
        },
        constants: {
            damageReflectionBase: 0.3,
            damageReflectionPerLevel: 0.05
        },
        data: {
            duration: Infinity,
            totalDuration: Infinity
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {},

            onTookDamage({ buff, defender, attacker, actualBattle, damageDealt }) {
                // bows dont get damage reflected back from spiked armor
                if (attacker.mainHandType === "bow") {
                    return
                }

                const constants =
                    buff.constants && buff.constants.constants
                        ? buff.constants.constants
                        : lookupBuff(buff.id).constants

                const damageReflectionBase = constants.damageReflectionBase
                const damageReflectionPerLevel = constants.damageReflectionPerLevel * buff.data.level
                const damageReflection = damageReflectionBase + damageReflectionPerLevel

                const totalDamage = damageDealt

                actualBattle.dealDamage(totalDamage * damageReflection + 10, {
                    attacker: defender,
                    defender: attacker,
                    isMagic: true,
                    tickEvents: actualBattle.tickEvents,
                    historyStats: actualBattle.historyStats,
                    customIcon: "spikedArmor.svg",
                    source: "Spiked Armor"
                })
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                buff.duration -= secondsElapsed
                if (buff.duration <= 0) {
                    removeBuff({ buff, target, caster, actualBattle })
                }
            },

            onRemove({ buff, target, caster }) {}
        }
    },

    eel_taunt: {
        duplicateTag: "eel_taunt", // Used to stop duplicate buffs
        icon: "eelTaunt.svg",
        name: "eel taunt",
        description({ buff, level }) {
            return "Taunts the target, and ignites the target for (200% MP) after 3 seconds."
        },
        constants: {},
        data: {
            duration: 3,
            totalDuration: 3
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {
                if (caster?.currentClass?.id === "paladin") {
                    if (target.target != caster.id) {
                        // trigger a heal for the original target
                        caster.applyBuffTo({
                            buff: caster.generateBuff({
                                buffId: "class_paladin_inspiration",
                                buffData: {
                                    allowDuplicates: true
                                }
                            }),
                            target: target.targetUnit
                        })
                    }
                }

                target.target = caster.id
                buff.data.damage = caster.stats.magicPower * 2

                const hasIntimidate = caster.buffs.find((buff) => buff.id === "enchantment_intimidate")

                if (hasIntimidate) {
                    actualBattle.dealDamage(caster.stats.attack * 2, {
                        defender: caster,
                        attacker: target,
                        tickEvents: actualBattle.tickEvents,
                        historyStats: actualBattle.historyStats,
                        customIcon: "intimidate.svg",
                        source: "Intimidate"
                    })
                }
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                buff.duration -= secondsElapsed

                if (buff.duration < 0) {
                    removeBuff({ buff, target, caster, actualBattle })
                }
            },

            onRemove({ buff, target, actualBattle }) {
                actualBattle.dealDamage(buff.data.damage, {
                    defender: target,
                    attacker: target,
                    isMagic: true,
                    tickEvents: actualBattle.tickEvents,
                    historyStats: actualBattle.historyStats,
                    customIcon: "eelTaunt.svg",
                    source: "Eel Taunt"
                })
            }
        }
    },

    lion_taunt: {
        duplicateTag: "lion_taunt", // Used to stop duplicate buffs
        icon: "lionTaunt.svg",
        name: "lion taunt",
        description({ buff, level }) {
            return "Taunts the target, and deals 75% max attack damage after 3 seconds."
        },
        constants: {},
        data: {
            duration: 3,
            totalDuration: 3
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {
                if (caster?.currentClass?.id === "paladin") {
                    if (target.target != caster.id) {
                        // trigger a heal for the original target
                        caster.applyBuffTo({
                            buff: caster.generateBuff({
                                buffId: "class_paladin_inspiration",
                                buffData: {
                                    allowDuplicates: true
                                }
                            }),
                            target: target.targetUnit
                        })
                    }
                }

                target.target = caster.id
                buff.data.damage = caster.stats.attackMax * 0.75

                const hasIntimidate = caster.buffs.find((buff) => buff.id === "enchantment_intimidate")

                if (hasIntimidate) {
                    actualBattle.dealDamage(caster.stats.attack * 2, {
                        defender: caster,
                        attacker: target,
                        tickEvents: actualBattle.tickEvents,
                        historyStats: actualBattle.historyStats,
                        customIcon: "intimidate.svg",
                        source: "Intimidate"
                    })
                }
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                buff.duration -= secondsElapsed

                if (buff.duration < 0) {
                    removeBuff({ buff, target, caster, actualBattle })
                }
            },

            onRemove({ buff, target, actualBattle }) {
                actualBattle.dealDamage(buff.data.damage, {
                    defender: target,
                    attacker: target,
                    tickEvents: actualBattle.tickEvents,
                    historyStats: actualBattle.historyStats,
                    customIcon: "lionTaunt.svg",
                    source: "Lion Taunt"
                })
            }
        }
    },

    bear_taunt: {
        duplicateTag: "bear_taunt", // Used to stop duplicate buffs
        icon: "bearTaunt.svg",
        name: "bear taunt",
        description({ buff, level }) {
            return "Taunts the target, and reduces its attack by 10% for 5 seconds"
        },
        constants: {},
        data: {
            duration: 5,
            totalDuration: 5
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {
                if (caster?.currentClass?.id === "paladin") {
                    if (target.target != caster.id) {
                        // trigger a heal for the original target
                        caster.applyBuffTo({
                            buff: caster.generateBuff({
                                buffId: "class_paladin_inspiration",
                                buffData: {
                                    allowDuplicates: true
                                }
                            }),
                            target: target.targetUnit
                        })
                    }
                }

                target.target = caster.id
                buff.data.attack = target.stats.attackMax * 0.1
                target.stats.attack -= buff.data.attack
                target.stats.attackMax -= buff.data.attack

                const hasIntimidate = caster.buffs.find((buff) => buff.id === "enchantment_intimidate")

                if (hasIntimidate) {
                    actualBattle.dealDamage(caster.stats.attack * 2, {
                        defender: caster,
                        attacker: target,
                        tickEvents: actualBattle.tickEvents,
                        historyStats: actualBattle.historyStats,
                        customIcon: "intimidate.svg",
                        source: "Intimidate"
                    })
                }
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                buff.duration -= secondsElapsed

                if (buff.duration < 0) {
                    removeBuff({ buff, target, caster, actualBattle })
                }
            },

            onRemove({ buff, target }) {
                target.stats.attack += buff.data.attack
                target.stats.attackMax += buff.data.attack
            }
        }
    },

    taunt: {
        duplicateTag: "taunt", // Used to stop duplicate buffs
        icon: "taunt.svg",
        name: "taunt",
        description({ buff, level }) {
            return `Forces the enemy to target you. <br />
        Cooldown is reduced by 1.5 seconds per ability level.`
        },
        scaledCooldown: function (ability) {
            if (ability) {
                if (ability.level >= 1 && ability.level <= 5) {
                    return 10 - (ability.level - 1) * 1.5
                }
            }
            return 10 // failsafe
        },
        constants: {},
        data: {
            duration: 0,
            totalDuration: 0
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {
                if (caster?.currentClass?.id === "paladin") {
                    if (target.target != caster.id) {
                        // trigger a heal for the original target
                        caster.applyBuffTo({
                            buff: caster.generateBuff({
                                buffId: "class_paladin_inspiration",
                                buffData: {
                                    allowDuplicates: true
                                }
                            }),
                            target: target.targetUnit
                        })
                    }
                }

                if (target.target === caster.id) {
                    // already being targeted)
                    if (caster) {
                        const targetAbility = caster.abilitiesMap["taunt"]
                        if (targetAbility) {
                            targetAbility.cdAdjust = function (abil) {
                                return 2
                            }
                        }
                    }
                } else {
                    target.target = caster.id

                    buff.data.endDate = moment().add(0, "seconds").toDate()

                    const hasIntimidate = caster.buffs.find((buff) => buff.id === "enchantment_intimidate")

                    if (hasIntimidate) {
                        actualBattle.dealDamage(caster.stats.attack * 2, {
                            defender: caster,
                            attacker: target,
                            tickEvents: actualBattle.tickEvents,
                            historyStats: actualBattle.historyStats,
                            customIcon: "intimidate.svg",
                            source: "Intimidate"
                        })
                    }
                }
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                removeBuff({ buff, target, caster, actualBattle })
            }
        }
    },

    scream: {
        duplicateTag: "scream", // Used to stop duplicate buffs
        icon: "scream.svg",
        name: "scream",
        description({ buff, level }) {
            let extraInfo = ""
            if (level >= 2) {
                extraInfo = `<br />Maximum cooldown is ${(45 - 5 * level).toFixed(0)}s - (5s per level).`
            }
            return `Forces all enemies to target you. <br />
        Cooldown increases by 10 seconds for each taunted enemy.${extraInfo}`
        },
        constants: {},
        data: {
            duration: 0,
            totalDuration: 0
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {
                if (caster?.currentClass?.id === "paladin") {
                    if (target.target != caster.id) {
                        // trigger a heal for the original target
                        caster.applyBuffTo({
                            buff: caster.generateBuff({
                                buffId: "class_paladin_inspiration",
                                buffData: {
                                    allowDuplicates: true
                                }
                            }),
                            target: target.targetUnit
                        })
                    }
                }

                target.target = caster.id

                buff.data.endDate = moment().add(0, "seconds").toDate()

                const hasIntimidate = caster.buffs.find((buff) => buff.id === "enchantment_intimidate")

                if (hasIntimidate) {
                    actualBattle.dealDamage(caster.stats.attack * 2, {
                        defender: caster,
                        attacker: target,
                        tickEvents: actualBattle.tickEvents,
                        historyStats: actualBattle.historyStats,
                        customIcon: "intimidate.svg",
                        source: "Intimidate"
                    })
                }
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                removeBuff({ buff, target, caster, actualBattle })
            }
        }
    },

    distract: {
        duplicateTag: "distract", // Used to stop duplicate buffs
        icon: "redirectDamage.svg",
        name: "distract",
        description({ buff, level }) {
            return `Forces all enemies that are targeting you to find a new target if possible.`
        },
        constants: {},
        data: {
            duration: 0,
            totalDuration: 0
        },
        events: {
            onApply({ buff, target, caster, actualBattle }) {
                forceEnemiesToTargetRandomFromList(
                    getTargetableFriendlyUnitsBesidesMe(caster, actualBattle),
                    actualBattle,
                    caster
                )
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                removeBuff({ buff, target, caster, actualBattle })
            }
        }
    },

    defensive_stance: {
        duplicateTag: "defensiveStance", // Used to stop duplicate buffs
        icon: "defensiveStance.svg",
        name: "defensive stance",
        description({ buff, level }) {
            const damageDecreasePerLevel = buff.constants.damageDealtPercentagePerLevel
            const damageTakenPerLevel = buff.constants.damageTakenPercentagePerLevel

            const damageDecrease = buff.constants.damageDealtPercentageBase + damageDecreasePerLevel * level
            const damageTakenDecrease = buff.constants.damageTakenPercentageBase + damageTakenPerLevel * level

            return `
        Reduce damage taken by ${damageTakenDecrease}%, damage dealt by ${damageDecrease}%.<br />
        Last for ${buff.data.totalDuration}s. (+${damageDecreasePerLevel}% per lvl), (+${damageTakenPerLevel}% per lvl)`
        },
        constants: {
            damageDealtPercentageBase: 37,
            damageDealtPercentagePerLevel: 3,
            damageTakenPercentageBase: 47,
            damageTakenPercentagePerLevel: 3
        },
        data: {
            duration: 10,
            totalDuration: 10
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {
                buff.data.endDate = moment().add(buff.duration, "seconds").toDate()
                const constants =
                    buff.constants && buff.constants.constants
                        ? buff.constants.constants
                        : lookupBuff(buff.id).constants
                // Reduce damage dealt
                const damageDecrease =
                    constants.damageDealtPercentageBase + constants.damageDealtPercentagePerLevel * buff.data.level
                // Reduce damage taken
                const damageReduction =
                    constants.damageTakenPercentageBase + constants.damageTakenPercentagePerLevel * buff.data.level

                buff.data.damageDecrease = damageDecrease
                buff.data.damageReduction = damageReduction

                buff.data.attackMax = target.stats.attackMax * (buff.data.damageDecrease / 100)
                buff.data.attack = target.stats.attack * (buff.data.damageDecrease / 100)
                target.stats.attackMax -= buff.data.attackMax
                target.stats.attack -= buff.data.attack
                target.stats.damageTaken *= 1 - buff.data.damageReduction / 100
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                let localSecondsElapsed = secondsElapsed
                buff.duration -= localSecondsElapsed

                if (buff.duration < 0) {
                    localSecondsElapsed += buff.duration
                    if (localSecondsElapsed < 0) {
                        localSecondsElapsed = 0
                    }
                }

                if (buff.duration < 0) {
                    removeBuff({ buff, target, caster, actualBattle })
                }
            },

            onRemove({ buff, target, caster }) {
                target.stats.attackMax += buff.data.attackMax
                target.stats.attack += buff.data.attack
                target.stats.damageTaken /= 1 - buff.data.damageReduction / 100
            }
        }
    },

    evasive_maneuvers: {
        duplicateTag: "evasive_maneuvers", // Used to stop duplicate buffs
        icon: "evasiveManeuvers.svg",
        name: "evasive maneuvers",
        description({ buff, level }) {
            const durationPerLevel = buff.constants.durationPerLevel
            return `
        Dodges all attacks for ${buff.constants.durationBase + durationPerLevel * level}s.
         (+${durationPerLevel}s per lvl)`
        },
        constants: {
            durationBase: 1,
            durationPerLevel: 0.5,
            allowTicks: true
        },
        data: {
            duration: 1,
            totalDuration: 1
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {
                buff.data.name = buff.data.name || "Dodging"
                buff.data.description = buff.data.description || "The enemy is dodging all atacks!"

                const constants =
                    buff.constants && buff.constants.constants
                        ? buff.constants.constants
                        : lookupBuff(buff.id).constants

                if (constants) {
                    buff.duration += buff.data.level * constants.durationPerLevel
                }
                
                buff.data.defenseAddition = 1000000
                target.stats.defense += buff.data.defenseAddition
            },

            onTookRawDamage({ buff, defender, attacker, actualBattle, rawDamage, damageDealt, source, magic }) {
                const formattedSource = (source || "autoattack").trim().toLowerCase()

                // magic hits dodging targets
                if (magic) {
                    // ... unless ... the source is trident damage
                    if (formattedSource != "enchanted weapon") {
                        return
                    }

                    // trident damage continues on: this infers the source is an auto-attack, which the target dodged
                }

                // if we're bleeding or poisoned, we take the damage
                if (formattedSource == "bleed" || formattedSource == "poison") {
                    return
                }

                // if the source is an autoattack and the attacker can't miss because of Precise Shots, we take the damage
                if (formattedSource == "volley" || formattedSource == "autoattack" || formattedSource == "phantom strikes") {
                    if (attacker.hasBuff("precise_shots")) {
                        return
                    }
                }

                // if the source is interception, we take the damage
                if (formattedSource == "squire interception") {
                    return
                }

                // at this point, the damage is physical (or a nullified trident hit) that we definitely should have dodged
                // so let's heal back any damage dealt
                defender.stats.health += damageDealt
                if (defender.stats.health > defender.stats.healthMax) {
                    defender.stats.health = defender.stats.healthMax
                }

                // tell the battle-node server handling dealDamage() that called this event that we're explicitly dodging
                // it will use this to change the icon for the tickevent message during battle
                //
                // (it will automatically recalculate damage dealt for stats purposes)
                buff.data.hasNotes = {
                    customIcon: "dodge"
                }
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                buff.duration -= secondsElapsed
                if (buff.duration <= 0) {
                    removeBuff({ buff, target, caster, actualBattle })
                }
            },

            onRemove({ buff, target, caster }) {
                if (buff.data.defenseAddition) {
                    target.stats.defense -= buff.data.defenseAddition
                }
            }
        }
    },

    full_damage_immunity: {
        duplicateTag: "full_damage_immunity", // Used to stop duplicate buffs
        icon: "evasiveManeuvers.svg",
        name: "immune",
        description({ buff, level }) {
            const durationPerLevel = buff.constants.durationPerLevel
            return `
        Immune to all damage.`
        },
        constants: {
            allowTicks: true
        },
        data: {
            duration: 3,
            totalDuration: 3
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {
                buff.data.name = buff.data.name || "Dodging"
                buff.data.description = buff.data.description || "The enemy is completely immune to all damage."
                buff.duration = buff.data.duration
                buff.data.endDate = moment().add(buff.duration, "seconds").toDate()

                // make target absorb all damage (reducing all incoming damage by 99.9999%)
                buff.data.damageReduction = target.stats.damageTaken * (99.9999 / 100)
                target.stats.damageTaken -= buff.data.damageReduction
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                buff.duration -= secondsElapsed
                if (buff.duration <= 0) {
                    removeBuff({ buff, target, caster, actualBattle })
                }
            },

            onRemove({ buff, target, caster }) {
                if (buff.data.damageReduction) {
                    // remove damage absorption
                    target.stats.damageTaken += buff.data.damageReduction
                }
            }
        }
    },

    armor_up: {
        duplicateTag: "armor_up",
        icon: "armorUp.svg",
        name: "bolster",
        description({ buff, level }) {
            const armorPerLevel = buff.constants.armorPerLevel
            const totalArmor = buff.constants.baseArmor + armorPerLevel * level
            const duration = buff.data.totalDuration

            return `
        <b>+${totalArmor}</b> physical and magical armor. (+${armorPerLevel} per lvl)<br />
        Duration <b>${duration}s</b>`
        },
        constants: {
            baseArmor: 100,
            armorPerLevel: 50
        },
        data: {
            duration: 10,
            totalDuration: 10
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {
                buff.data.endDate = moment().add(buff.duration, "seconds").toDate()

                const constants =
                    buff.constants && buff.constants.constants
                        ? buff.constants.constants
                        : lookupBuff(buff.id).constants
                const totalArmor = constants.baseArmor + constants.armorPerLevel * buff.data.level

                buff.data.totalArmor = totalArmor
                target.stats.armor += totalArmor
                target.stats.magicArmor += totalArmor
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                let localSecondsElapsed = secondsElapsed
                buff.duration -= localSecondsElapsed

                if (buff.duration < 0) {
                    localSecondsElapsed += buff.duration
                    if (localSecondsElapsed < 0) {
                        localSecondsElapsed = 0
                    }
                }

                if (buff.duration < 0) {
                    removeBuff({ buff, target, caster, actualBattle })
                }
            },

            onRemove({ buff, target, caster }) {
                target.stats.armor -= buff.data.totalArmor
                target.stats.magicArmor -= buff.data.totalArmor
            }
        }
    },

    armor_up_new: {
        duplicateTag: "armor_up_new", // Used to stop duplicate buffs
        icon: "armorUpNew.svg",
        name: "armor up",
        description({ buff, level }) {
            const armorBase = buff.constants.armorBase
            const armorPerLevel = buff.constants.armorPerLevel * level
            const armorIncrease = armorBase + armorPerLevel
            return `
        Passive ability<br />
        +<b>${armorIncrease}</b> physical armor. (+${buff.constants.armorPerLevel} per lvl)<br />
        While equipped this is <b>always active</b>.`
        },
        constants: {
            armorBase: 20,
            armorPerLevel: 20
        },
        data: {
            duration: Infinity,
            totalDuration: Infinity
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {},

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                if (!buff.data.armorIncrease) {
                    const constants =
                        buff.constants && buff.constants.constants
                            ? buff.constants.constants
                            : lookupBuff(buff.id).constants
                    const armorBase = constants.armorBase
                    const armorPerLevel = constants.armorPerLevel * buff.data.level
                    const armorIncrease = armorBase + armorPerLevel
                    buff.data.armorIncrease = armorIncrease
                    target.stats.armor += buff.data.armorIncrease
                }
            },

            onRemove({ buff, target, caster }) {
                if (buff.data.armorIncrease) {
                    target.stats.armor -= buff.data.armorIncrease
                }
            }
        }
    },

    magic_armor_up: {
        duplicateTag: "magic_armor_up", // Used to stop duplicate buffs
        icon: "magicArmorUp.svg",
        name: "magic armor up",
        description({ buff, level }) {
            const armorBase = buff.constants.armorBase
            const armorPerLevel = buff.constants.armorPerLevel * level
            const armorIncrease = armorBase + armorPerLevel
            return `
        Passive ability<br />
        <b>+${armorIncrease}</b> magic armor. (+${buff.constants.armorPerLevel} per lvl)<br />
        While equipped this is <b>always active</b>.`
        },
        constants: {
            armorBase: 10,
            armorPerLevel: 10
        },
        data: {
            duration: Infinity,
            totalDuration: Infinity
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {},

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                if (!buff.data.armorIncrease) {
                    const constants =
                        buff.constants && buff.constants.constants
                            ? buff.constants.constants
                            : lookupBuff(buff.id).constants
                    const armorBase = constants.armorBase
                    const armorPerLevel = constants.armorPerLevel * buff.data.level
                    const armorIncrease = armorBase + armorPerLevel
                    buff.data.armorIncrease = armorIncrease
                    target.stats.magicArmor += buff.data.armorIncrease
                }

                if (buff.duration !== Infinity) {
                    buff.duration -= secondsElapsed
                    if (buff.duration <= 0) {
                        removeBuff({ buff, target, caster, actualBattle })
                    }
                }
            },

            onRemove({ buff, target, caster }) {
                if (buff.data.armorIncrease) {
                    target.stats.magicArmor -= buff.data.armorIncrease
                }
            }
        }
    },

    iron_will: {
        duplicateTag: "ironWill",
        icon: "ironWill.svg",
        name: "iron will",
        description({ buff, level }) {
            const defensePerLevel = buff.constants.defensePerLevel
            const maxDefense = buff.constants.baseDefense + defensePerLevel * level
            return `
        Increase defense by 10 - ${maxDefense}. (+${defensePerLevel} per lvl)<br />
        Based on your missing health. Lasts for ${buff.data.totalDuration}s. `
        },
        constants: {
            baseDefense: 35,
            defensePerLevel: 5
        },
        data: {
            duration: 15,
            totalDuration: 15
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {
                buff.data.endDate = moment().add(buff.duration, "seconds").toDate()

                const constants =
                    buff.constants && buff.constants.constants
                        ? buff.constants.constants
                        : lookupBuff(buff.id).constants
                const maxDefense = constants.baseDefense + constants.defensePerLevel * buff.data.level

                buff.data.extraDefense = maxDefense * (1 - target.stats.health / target.stats.healthMax)
                if (buff.data.extraDefense < 10) {
                    buff.data.extraDefense = 10
                }
                target.stats.defense += buff.data.extraDefense
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                let localSecondsElapsed = secondsElapsed
                buff.duration -= localSecondsElapsed

                if (buff.duration < 0) {
                    localSecondsElapsed += buff.duration
                    if (localSecondsElapsed < 0) {
                        localSecondsElapsed = 0
                    }
                }

                if (buff.duration < 0) {
                    removeBuff({ buff, target, caster, actualBattle })
                }
            },

            onRemove({ buff, target, caster }) {
                target.stats.defense -= buff.data.extraDefense
            }
        }
    },

    holiday_cheer: {
        duplicateTag: "holiday_cheer", // Used to stop duplicate buffs
        icon: "holidayCheerBuff.svg",
        name: "holiday cheer",
        description({ buff, level }) {
            const c = buff.constants
            return `
        Heals your entire party with inspiring holiday cheer <br />
        for ${c.healBase} + (${Math.round(c.healMPRatio * 100)}% of MP).`
        },
        constants: {
            healBase: 3,
            healMPRatio: 0.3
        },
        data: {
            duration: 1,
            totalDuration: 1
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {
                const constants =
                    buff.constants && buff.constants.constants
                        ? buff.constants.constants
                        : lookupBuff(buff.id).constants
                const healBase = constants.healBase
                const healMP = constants.healMPRatio * caster.stats.magicPower
                const totalHeal = healBase + healMP

                actualBattle.healTarget(totalHeal, {
                    caster,
                    target,
                    tickEvents: actualBattle.tickEvents,
                    historyStats: actualBattle.historyStats,
                    healSource: buff
                })

                // 'units' won't include dead units, so this is okay
                /*
        actualBattle.units.forEach((unit) => {
          actualBattle.healTarget(totalHeal, {
            caster,
            target: unit,
            tickEvents: actualBattle.tickEvents,
            historyStats: actualBattle.historyStats,
            healSource: buff
          });
        });
        */
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                buff.duration -= secondsElapsed

                if (buff.duration < 0) {
                    removeBuff({ buff, target, caster, actualBattle })
                }
            },

            onRemove() {}
        }
    }
}
