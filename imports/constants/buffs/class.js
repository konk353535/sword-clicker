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
                    if (attacker.mainHandWeapon?.indexOf('_long_sword') !== -1 || attacker.mainHandWeapon?.indexOf('_battle_axe') !== -1) {
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
    },

    class_passive_barbarian__brawn: {
        duplicateTag: "class_passive_barbarian__brawn", // Used to stop duplicate buffs
        icon: "barbarianBrawn.svg",
        name: "Brawn",
        description({ buff, level }) {
            return `
        Passive ability<br />
        Any time you miss with an auto-attack, you add a stack of <i>Brawn</i> that increases all of your
        damage by +10% per stack (to a maximum of +200%).  Stacks are reduced by 3 when you successfully
        hit with an auto-attack to a minimum of 0 stacks.`
        },
        constants: {},
        data: {
        },
        events: {
            onApply({ buff, target, caster, actualBattle }) {
                buff.stacks = 0
                buff.data.damageBoosted = {
                    attack: 0,
                    attackMax: 0
                }
            },

            onTargetDodgedDamage({buff, defender, attacker, actualBattle, source}) {
                if (source == "autoattack") {
                    if (buff.stacks < 20) {
                        buff.stacks++
                    }
                }
            },

            onDidDamage({originalAutoAttack, buff, defender, attacker, actualBattle, damageDealt, rawDamage, source, customIcon}) {
                if (source == "autoattack") {
                    buff.stacks -= 3
                    if (buff.stacks < 0) {
                        buff.stacks = 0
                    }
                }
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                // undo existing bonuses
                target.stats.attack -= buff.data.damageBoosted.attack
                target.stats.attackMax -= buff.data.damageBoosted.attackMax

                // calculate new bonuses
                buff.data.damageBoosted.attack = target.stats.attack * buff.stacks * 0.1
                buff.data.damageBoosted.attackMax = target.stats.attackMax * buff.stacks * 0.1

                // apply new bonuses
                target.stats.attack += buff.data.damageBoosted.attack
                target.stats.attackMax += buff.data.damageBoosted.attackMax
            },
        }
    },

    class_passive_duelist__driven: {
        duplicateTag: "class_passive_duelist__driven", // Used to stop duplicate buffs
        icon: "duelistDriven.svg",
        name: "Driven",
        description({ buff, level }) {
            return `
        Passive ability<br />
        Your damage is reduced by half, but you auto-attack twice as fast.`
        },
        constants: {},
        data: {
            hideBuff: true
        },
        events: {
            onApply({ buff, target, caster, actualBattle }) {
                target.stats.attackSpeed *= 2.0
                target.stats.attack /= 2.0
                target.stats.attackMax /= 2.0
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {},
        }
    },

    class_passive_paladin__bulwark: {
        duplicateTag: "class_passive_paladin__bulwark", // Used to stop duplicate buffs
        icon: "warden_shield.svg",
        name: "Bulwark",
        description({ buff, level }) {
            return `
        Passive ability<br />
        Grants all allies 5 stacks of <i>Bulwark</i> protection at the beginning of battle that 
        prevents all damage.  Each time the ally would take damage, a stack is deducted.
        When all stacks are gone, this protection ends.`
        },
        constants: {},
        data: {
            hideBuff: true
        },
        events: {
            onApply({ buff, target, caster, actualBattle }) {
                // apply it to all the friendly units
                actualBattle.units.forEach((friendlyUnit) => {
                    if (true || friendlyUnit.id !== caster.id) {
                        caster.applyBuffTo({
                            buff: caster.generateBuff({
                                buffId: "class_passive_paladin__bulwark_effect",
                                buffData: {
                                    stacks: 5
                                }
                            }),
                            target: friendlyUnit
                        })
                    }
                })
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                removeBuff({ buff, target, caster, actualBattle })
            },
        }
    },

    class_passive_paladin__bulwark_effect: {
        duplicateTag: "class_passive_paladin__bulwark_effect", // Used to stop duplicate buffs
        icon: "warden_shield.svg",
        name: "Bulwark",
        description({ buff, level }) {
            return `
        Passive ability<br />
        A Paladin has granted you stacks of <i>>Bulwark</i> protection at the beginning of this
        battle that prevents all damage.  Each time you would take damage, a stack is deducted.
        When all stacks are gone, this protection ends.`
        },
        constants: {},
        data: {
            stacks: 5
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {
                if (buff.data.hitsRequired == null) {
                    buff.stacks = buff.data.hitsRequired = 5
                    target.stats.armor += 10000
                    target.stats.magicArmor += 10000
                }
            },

            onTookDamage({ buff, defender, attacker, actualBattle }) {
                buff.data.hitsRequired--
                buff.stacks = buff.data.hitsRequired

                if (buff.data.hitsRequired <= 0) {
                    defender.stats.armor -= 10000
                    defender.stats.magicArmor -= 10000
    
                    if (defender.stats.armor <= 1) {
                        defender.stats.armor = 1
                    }
                    if (defender.stats.magicArmor <= 1) {
                        defender.stats.magicArmor = 1
                    }
                    removeBuff({ buff, target: defender, caster: defender, actualBattle })
                }
            },

            onTick({ buff, target, caster, secondsElapsed, actualBattle }) {},

            onRemove({ buff, target, caster }) {}
        }
    },

    class_perk_ranger: {
        duplicateTag: "class_perk_ranger", // Used to stop duplicate buffs
        icon: "rangerPerk.svg",
        name: "Ranger: Perk",
        description() {
            return `
        Class trait<br/>
        Every time you successfully hit with a bow, you gain a stack of this perk that increases
        your attack speed by +20% per stack (up to a maximum of +100% at 5 stacks) which is reset
        when an auto-attack misses.`
        },
        constants: {
        },
        data: {
            duration: Infinity,
            totalDuration: Infinity,
            isEnchantment: true
        },
        events: {
            onApply({ buff, target, caster, actualBattle }) {
                buff.stacks = 0
                buff.data.damageBoosted = {
                    attackSpeed: 0
                }

                if (target.mainHandWeapon?.indexOf('_bow') !== -1 ) {
                    caster.applyBuffTo({
                        buff: target.generateBuff({
                            buffId: "class_perk_ranger_volley",
                            buffData: {
                                stacks: 0
                            }
                        }),
                        target
                    })
                }
            },

            onTargetDodgedDamage({buff, defender, attacker, actualBattle, source}) {
                if (source == "autoattack") {
                    buff.stacks = 0
                }
            },

            onDidDamage({originalAutoAttack, buff, defender, attacker, actualBattle, damageDealt, rawDamage, source, customIcon}) {
                if (source == "autoattack") {
                    buff.stacks++
                    if (buff.stacks > 5) {
                        buff.stacks = 5
                    }
                }
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                // undo existing bonus
                target.stats.attackSpeed -= buff.data.damageBoosted.attackSpeed

                if (target.mainHandWeapon?.indexOf('_bow') === -1 ) {
                    buff.stacks = 0
                    buff.data.damageBoosted.attackSpeed = 0
                    removeBuff({ buff, target, caster, actualBattle })
                    //todo: possibly hide the buff and unhide it if we ever implement a weapon-disarming feature
                    return
                }

                // calculate new bonus
                buff.data.damageBoosted.attackSpeed = target.stats.attack + (buff.stacks * 0.1)

                // apply new bonus
                target.stats.attackSpeed += buff.data.damageBoosted.attackSpeed
            },

            onRemove({ buff, target, caster }) {}
        }
    },

    class_perk_ranger_volley: {
        duplicateTag: "class_perk_ranger_volley", // Used to stop duplicate buffs
        icon: "rangerPerk.svg",
        name: "Ranger: Perk",
        description() {
            return `
        Class trait<br/>
        The fewer active and passive abilities slotted in your loadout, the more maximum
        shots that Volley can fire.  Each empty ability slot adds +1 to Volley's maximum
        number of arrows.`
        },
        constants: {
        },
        data: {
            duration: Infinity,
            totalDuration: Infinity,
            isEnchantment: true
        },
        events: {
            onApply({ buff, target, caster, actualBattle }) {
                buff.stacks = 0
                buff.data.didStacks = false
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                if (!buff.data.didStacks) {
                    buff.data.didStacks = true
                    
                    if (target.abilities) {
                        let abilityCount = 0
                        target.abilities.forEach((ability) => {
                            if (ability.slot != "companion") {
                                abilityCount++
                            }
                        })
                        if (abilityCount < 8) {
                            buff.stacks = 8 - abilityCount
                        }
                    }
                }
            },

            onRemove({ buff, target, caster }) {}
        }
    },

    class_perk_sage: {
        duplicateTag: "class_perk_sage", // Used to stop duplicate buffs
        icon: "",
        name: "Class Perk: Sage",
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

            onDidHealing({ buff, target, caster, actualBattle, healAmount, healSource }) {
                if (!healSource) {
                    return
                }

                const healSourceConsts =
                    healSource.constants && healSource.constants.constants
                        ? healSource.constants.constants
                        : lookupBuff(healSource.id).constants
                if (healSourceConsts.reducesCooldowns && caster.abilities) {
                    caster.abilities.forEach((ability) => {
                        ability._currentCooldown -= 2.0
                    })
                }
            },

            onTick({ buff, target, caster, secondsElapsed, actualBattle }) {},

            onRemove({ buff, target, caster }) {}
        }
    },

    class_passive_sage__ward: {
        duplicateTag: "class_passive_sage__ward", // Used to stop duplicate buffs
        icon: "sageWard.svg",
        name: "Ward",
        description({ buff, level }) {
            return `
        Passive ability<br />
        Prevents you from being directly targeted unless there are no other allies remaining in battle.`
        },
        constants: {},
        data: {
            duration: Infinity,
            totalDuration: Infinity
        },
        events: {
            onApply({ buff, target, caster, actualBattle }) {},

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                if (actualBattle.units.length <= 1) {
                    return
                }

                //todo: improve this, this forces enemies to retarget every tick -- it'd be more efficient and possibly
                //      prevent an edge case race condition by patching where targets are originally assigned instead

                let targetingUs = 0
                actualBattle.enemies.forEach((enemy) => {
                    if (enemy.target == target.id) {
                        targetingUs++
                    }
                })
                if (targetingUs > 0) {
                    let allFriendlyCombatUnitsExcludingSelf = []
                    _.forEach(actualBattle.units, function (thisFriendlyUnit) {
                        if (thisFriendlyUnit.id != target.id) {
                            allFriendlyCombatUnitsExcludingSelf.push(thisFriendlyUnit)
                        }
                    })

                    actualBattle.enemies.forEach((enemy) => {
                        if (enemy.target == target.id) {
                            enemy.target = _.sample(allFriendlyCombatUnitsExcludingSelf).id
                        }
                    })

                }
            },
        }
    },

    class_perk_warmage: {
        duplicateTag: "class_perk_warmage", // Used to stop duplicate buffs
        icon: "",
        name: "Class Perk: War Mage",
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

            onTookDamage({ buff, attacker, defender, actualBattle, secondsElapsed, damageDealt }) {
                if (damageDealt > 0) {
                    // reduce max health by 1%

                    const amountToReduceHealthBy = 0.01 * defender.stats.healthMaxOrig

                    if (amountToReduceHealthBy < defender.stats.healthMax) {
                        defender.stats.healthMax -= amountToReduceHealthBy
                    } else {
                        // to a minimum of 1%
                        defender.stats.healthMax = amountToReduceHealthBy
                    }

                    if (defender.stats.health > defender.stats.healthMax) {
                        defender.stats.health = defender.stats.healthMax
                    }
                }
            },

            onTick({ buff, target, caster, secondsElapsed, actualBattle }) {},

            onRemove({ buff, target, caster }) {}
        }
    },

    class_passive_warmage__glorious_destiny: {
        duplicateTag: "class_passive_warmage__glorious_destiny", // Used to stop duplicate buffs
        icon: "warmageGloriousDestiny.svg",
        name: "Glorious Destiny",
        description({ buff, level }) {
            return `
        Passive ability<br />
        Dealing magic damage restores 2% of your maximum health.`
        },
        constants: {},
        data: {
            hideBuff: true
        },
        events: {
            onApply({ buff, target, caster, actualBattle }) {},

            // for abilities and spells, including the 'magic_blade' proc from tridents -- does not include auto-attack (that's 'onDidDamage'), which can't hit for magic damage
            onDidRawDamage({ buff, defender, attacker, actualBattle, rawDamage, damageDealt, source, magic }) {
                if (magic && damageDealt > 0) {
                    // increase max health by 1%

                    const amountToIncreaseHealthBy = 0.01 * attacker.stats.healthMaxOrig

                    attacker.stats.healthMax += amountToIncreaseHealthBy
                    if (attacker.stats.healthMax > attacker.stats.healthMaxOrig) {
                        attacker.stats.healthMax = attacker.stats.healthMaxOrig
                    }
                }
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {},
        }
    }
}
