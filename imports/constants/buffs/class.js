import moment from "moment"
import _ from "underscore"

import { addBuff, lookupBuff, removeBuff } from "../../battleUtils"
import { CDbl, CInt, autoPrecisionValue } from "../../utils.js"

export const CLASS_BUFFS = {
    class_trait_barbarian: {
        duplicateTag: "class_trait_barbarian",
        icon: "classBarbarian.png",
        name: "Class Trait: Barbarian",
        description() {
            return `
        Your critical hits have a chance to inflict bleeding for 3 seconds.
        Broad swords and battle axes have a 25% chance to strike enemies adjacent to your target.
        You may not wear magical head, chest, or leg equipment.
        Your Magic Power in combat is always 0, even if another effect would say otherwise.<br />
        While you are a Barbarian this is <b>always active</b>`
        },
        constants: {
        },
        data: {
            duration: Infinity,
            totalDuration: Infinity,
            isEnchantment: true
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
        duplicateTag: "class_passive_barbarian__brawn",
        icon: "barbarianBrawn.svg",
        name: "Brawn",
        description({ buff, level }) {
            return `
        Passive class ability<br />
        Any time you miss with an auto-attack, you add a stack of <i>Brawn</i> that increases all of your
        damage by +10% per stack (to a maximum of +200%).  Stacks are reduced by 3 when you successfully
        hit with an auto-attack to a minimum of 0 stacks.<br />
        While equipped when you are a Barbarian this is <b>always active</b>`
        },
        constants: {},
        data: {
            duration: Infinity,
            totalDuration: Infinity
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

    class_trait_duelist: {
        duplicateTag: "class_trait_duelist",
        icon: "classDuelist.png",
        name: "Class Trait: Duelist",
        description() {
            return `
        <i>Twin Blades</i> and other dagger/rapier-only abilities can also be used with short swords,
        scimitars, and longswords.  Physical damage dealt to an enemy you aren't directly targeting
        is increased by 50%.  Rapiers and bucklers may be equipped together.  Double accuracy benefit
        from rapiers.  Rapiers no longer reduce Defense.<br />
        While you are a Duelist this is <b>always active</b>`
        },
        constants: {
        },
        data: {
            duration: Infinity,
            totalDuration: Infinity,
            isEnchantment: true
        },
        events: {
            onApply({ buff, target, caster, actualBattle }) {},
            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {},
            onRemove({ buff, target, caster }) {}
        }
    },

    class_passive_duelist__driven: {
        duplicateTag: "class_passive_duelist__driven",
        icon: "duelistDriven.svg",
        name: "Driven",
        description({ buff, level }) {
            return `
        Passive class ability<br />
        Your damage is reduced by half, but you auto-attack twice as fast.<br />
        While equipped when you are a Duelist this is <b>always active</b>`
        },
        constants: {},
        data: {
            duration: Infinity,
            totalDuration: Infinity
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

    class_trait_paladin: {
        duplicateTag: "class_trait_paladin",
        icon: "classPaladin.png",
        name: "Class Trait: Paladin",
        description() {
            return `
        A successful taunt triggers a heal for the ally the enemy was targeting.  15% faster
        cooldowns for taunt abilities.  Longswords and shields may be equipped together.
        Double Max Attack from hammers and spears.  Double health benefit from non-magical
        head, chest, and leg equipment.<br />
        While you are a Paladin this is <b>always active</b>`
        },
        constants: {
        },
        data: {
            duration: Infinity,
            totalDuration: Infinity,
            isEnchantment: true
        },
        events: {
            onApply({ buff, target, caster, actualBattle }) {},
            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {},
            onRemove({ buff, target, caster }) {}
        }
    },

    class_passive_paladin__bulwark: {
        duplicateTag: "class_passive_paladin__bulwark",
        icon: "warden_shield.svg",
        name: "Bulwark",
        description({ buff, level }) {
            return `
        Passive class ability<br />
        Grants all allies 5 stacks of <i>Bulwark</i> protection at the beginning of battle that 
        prevents all damage.  Each time the ally would take damage, a stack is deducted.
        When all stacks are gone, this protection ends.<br />
        While equipped when you are a Paladin this is <b>always active</b>`
        },
        constants: {},
        data: {
            duration: Infinity,
            totalDuration: Infinity,
                // we erase this buff in the first tick anyway, so don't even show it to reduce flickering
            hideBuff: true
        },
        events: {
            onApply({ buff, target, caster, actualBattle }) {
                // apply it to all the friendly units
                actualBattle.units.forEach((friendlyUnit) => {
                    if (friendlyUnit.id !== caster.id) {
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
        duplicateTag: "class_passive_paladin__bulwark_effect",
        icon: "warden_shield.svg",
        name: "Bulwark",
        description({ buff, level }) {
            return `
        A Paladin has granted you 5 stacks of <i>>Bulwark</i> protection at the beginning of this
        battle that prevents all damage.  Each time you would take damage, a stack is deducted.
        When all stacks are gone, this protection ends.`
        },
        constants: {},
        data: {
            duration: Infinity,
            totalDuration: Infinity,
            stacks: 5
        },
        events: {
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

    class_trait_ranger: {
        duplicateTag: "class_trait_ranger",
        icon: "classRanger.png",
        name: "Class Trait: Ranger",
        description() {
            return `
        Every time you successfully hit with a bow, you gain a stack of this trait that increases
        your attack speed by +20% per stack (up to a maximum of +100% at 5 stacks).  You lose 2
        stacks any time an auto-attack misses.
        Each unused ability slot adds 1 to the maximum number of arrows fired from <i>Volley</i>.
        Bow Attack Speed raised by +10%.
        Non-Bow Damage lowered by -20%.<br />
        While you are a Ranger this is <b>always active</b>`
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

                // not wielding a weapon with itemId containing '_bow' ?
                if (target.mainHandWeapon?.indexOf('_bow') !== -1 ) {
                    caster.applyBuffTo({
                        buff: target.generateBuff({
                            buffId: "class_trait_ranger_volley",
                            buffData: {
                                duration: Infinity,
                                totalDuration: Infinity,
                                stacks: 0
                            }
                        }),
                        target
                    })
                }
            },

            onDidDamage({originalAutoAttack, buff, defender, attacker, actualBattle, damageDealt, rawDamage, source, customIcon}) {
                // hitting with an autoattack increases stacks by 1
                if (source == "autoattack") {
                    if (buff.stacks < 5) {
                        buff.stacks++
                    }
                }
            },

            onTargetDodgedDamage({buff, defender, attacker, actualBattle, source}) {
                // missing with an autoattack decreases stacks by 2
                if (source == "autoattack") {
                    buff.stacks -= 2
                    if (buff.stacks < 0) {
                        buff.stacks = 0
                    }
                }
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                // undo existing bonus
                target.stats.attackSpeed -= buff.data.damageBoosted.attackSpeed

                // not wielding a weapon with itemId containing '_bow' ?
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

    class_trait_ranger_volley: {
        duplicateTag: "class_trait_ranger_volley",
        icon: "rangerTrait.svg",
        name: "Class Trait: Ranger",
        description() {
            return `
        The fewer active and passive abilities slotted in your loadout, the more maximum
        shots that Volley can fire.  Each empty ability slot adds +1 to Volley's maximum
        number of arrows.<br />
        While you are a Ranger this is <b>always active</b>`
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

    class_active_ranger__blaze_arrows: {
        duplicateTag: "class_active_ranger__blaze_arrows",
        icon: "rangerBlazeArrows.svg",
        name: "Blaze Arrows",
        description({ buff, level }) {
            return `
        A fiery attack that deals <b>${(buff.constants.initialDamage*100).toFixed(0)}%</b> damage immediately and sets
        the target on fire, burning for <b>${(buff.constants.fireDamage*100).toFixed(0)}%</b> damage every second for
        <b>8</b> seconds.`
        },
        constants: {
            initialDamage: 0.5,
            fireDamage: 0.2
        },
        data: {},
        events: {
            onApply({ buff, target, caster, actualBattle }) {
                const buffConstants = buff.constants && buff.constants.constants ? buff.constants.constants : lookupBuff(buff.id).constants
                const initialDamage = buffConstants.initialDamage * (caster.stats.attack + (caster.stats.attackMax - caster.stats.attack) * Math.random())
                const fireDamage = buffConstants.fireDamage * (caster.stats.attack + (caster.stats.attackMax - caster.stats.attack) * Math.random())

                actualBattle.dealDamage(initialDamage, {
                    attacker: caster,
                    defender: target,
                    tickEvents: actualBattle.tickEvents,
                    historyStats: actualBattle.historyStats,
                    customIcon: "rangerBlazeArrows.svg"
                })

                const newBuff = {
                    id: "class_active_ranger__blaze_arrows__burning_effect",
                    data: {
                        duration: 8,
                        totalDuration: 8,
                        totalDamage: fireDamage,
                        sourceId: caster.id,
                        caster: caster.id,
                        timeTillDamage: 0,
                        allowDuplicates: true,
                        icon: "ignite.svg",
                        name: "Blaze Arrow",
                        duplicateTag: "class_active_ranger__blaze_arrows__burning_effect"
                    }
                }

                addBuff({ buff: newBuff, target, caster, actualBattle })
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                removeBuff({ buff, target, caster, actualBattle })
            }
        }
    },

    class_active_ranger__blaze_arrows__burning_effect: {
        duplicateTag: "class_active_ranger__blaze_arrows__burning_effect",
        icon: "ignite.svg",
        name: "Blaze Arrow",
        description({ buff, level }) {
            return ``
        },
        constants: {},
        data: {
            duration: 8,
            totalDuration: 8,
            allowDuplicates: true
        },
        events: {
            onApply({ buff, target, caster, actualBattle }) {},

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                buff.duration -= secondsElapsed
                buff.data.timeTillDamage -= secondsElapsed

                if (buff.data.timeTillDamage <= 0) {
                    actualBattle.dealDamage(buff.data.totalDamage, {
                        attacker: actualBattle.allUnitsMap[buff.data.sourceId],
                        defender: target,
                        tickEvents: actualBattle.tickEvents,
                        historyStats: actualBattle.historyStats,
                        customIcon: "ignite.svg"
                    })
                    buff.data.timeTillDamage = 1
                }

                if (buff.duration < 0) {
                    removeBuff({ buff, target, caster, actualBattle })
                }
            },

            onRemove({ buff, target, caster, actualBattle }) {}
        }
    },

    class_active_ranger__sleet_arrows: {
        duplicateTag: "class_active_ranger__sleet_arrows",
        icon: "rangerSleetArrows.svg",
        name: "Sleet Arrows",
        description({ buff, level }) {
            return `
        An icy attack that deals <b>${(buff.constants.initialDamage*100).toFixed(0)}%</b> damage
        and chills the target, lowering its attack speed by <b>50%</b> for 4 seconds.`
        },
        constants: {
            initialDamage: 1.1
        },
        data: {},
        events: {
            onApply({ buff, target, caster, actualBattle }) {
                const buffConstants = buff.constants && buff.constants.constants ? buff.constants.constants : lookupBuff(buff.id).constants
                const initialDamage = buffConstants.initialDamage * (caster.stats.attack + (caster.stats.attackMax - caster.stats.attack) * Math.random())

                actualBattle.dealDamage(initialDamage, {
                    attacker: caster,
                    defender: target,
                    tickEvents: actualBattle.tickEvents,
                    historyStats: actualBattle.historyStats,
                    customIcon: "rangerSleetArrows.svg"
                })

                const newBuff = {
                    id: "frosted_attacks",
                    data: {
                        duration: 4,
                        totalDuration: 4,
                        attackSpeedDecrease: 50,
                        sourceId: caster.id,
                        caster: caster.id,
                        allowDuplicates: true,
                        icon: "frostedAttacks.svg",
                        description: `Reduces your attack speed by 50%`,
                        name: "Sleet Arrow",
                    }
                }

                addBuff({ buff: newBuff, target, caster, actualBattle })
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                removeBuff({ buff, target, caster, actualBattle })
            }
        }
    },

    class_active_ranger__storm_arrows: {
        duplicateTag: "class_active_ranger__storm_arrows",
        icon: "rangerStormArrows.svg",
        name: "Storm Arrows",
        description({ buff, level }) {
            return `
        An electrified attack that deals <b>${(buff.constants.initialDamage*100).toFixed(0)}%</b>
        damage and shocks the target, lowering its armor by half of your accuracy for 4 seconds.`
        },
        constants: {
            initialDamage: 0.65,
            armorReductionPerAccuracy: 0.5
        },
        data: {},
        events: {
            onApply({ buff, target, caster, actualBattle }) {
                const buffConstants = buff.constants && buff.constants.constants ? buff.constants.constants : lookupBuff(buff.id).constants
                const initialDamage = buffConstants.initialDamage * (caster.stats.attack + (caster.stats.attackMax - caster.stats.attack) * Math.random())

                actualBattle.dealDamage(initialDamage, {
                    attacker: caster,
                    defender: target,
                    tickEvents: actualBattle.tickEvents,
                    historyStats: actualBattle.historyStats,
                    customIcon: "rangerStormArrows.svg"
                })

                const newBuff = {
                    id: "class_active_ranger__storm_arrows__armor_reduction_effect",
                    data: {
                        duration: 4,
                        totalDuration: 4,
                        armorReduction: buffConstants.armorReductionPerAccuracy * caster.stats.accuracy,
                        sourceId: caster.id,
                        caster: caster.id,
                        allowDuplicates: true,
                        icon: "rangerStormArrowEffect.svg",
                        description: `Reduces your armor by 50%`,
                        name: "Sleet Arrow",
                    }
                }

                addBuff({ buff: newBuff, target, caster, actualBattle })
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                removeBuff({ buff, target, caster, actualBattle })
            }
        }
    },

    class_active_ranger__storm_arrows__armor_reduction_effect: {
        duplicateTag: "class_active_ranger__storm_arrows__armor_reduction_effect",
        icon: "rangerStormArrowEffect.svg",
        name: "Storm Arrow",
        description({ buff, level }) {
            return ``
        },
        constants: {},
        data: {
            duration: 4,
            totalDuration: 4,
            allowDuplicates: true
        },
        events: {
            onApply({ buff, target, caster, actualBattle }) {
                // 'armorReduction' here is set when addBuff is called from another buff
                buff.data.targetArmorLoweredAmount = buff.armorReduction || buff.data.armorReduction || 0

                target.stats.armor -= buff.data.targetArmorLoweredAmount
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                buff.duration -= secondsElapsed

                if (buff.duration < 0) {
                    removeBuff({ buff, target, caster, actualBattle })
                }
            },

            onRemove({ buff, target, caster, actualBattle }) {
                target.stats.armor += buff.data.targetArmorLoweredAmount
            }
        }
    },

    class_trait_sage: {
        duplicateTag: "class_trait_sage",
        icon: "classSage.png",
        name: "Class Trait: Sage",
        description() {
            return `
        Healing a target reduces all of your active ability cooldowns by 2 seconds and places
        a protective blessing upon them for 2 seconds that reduces the damage they take by
        25%.
        Triple Healing Power benefit from staves
        Can reforge most magical clothing.
        Cannot auto-attack when in combat with allies.<br />
        While you are a Sage this is <b>always active</b>`
        },
        constants: {
        },
        data: {
            duration: Infinity,
            totalDuration: Infinity,
            isEnchantment: true
        },
        events: {
            onApply({ buff, target, caster, actualBattle }) {},

            onDidHealing({ buff, target, caster, actualBattle, healAmount, healSource }) {
                if (!healSource) {
                    return
                }

                const newBuff = {
                    id: "class_trait_sage__sages_blessing",
                    data: {
                        duration: 2.2,
                        totalDuration: 2.2,
                        caster: caster.id,
                        allowDuplicates: true,
                        icon: "sagesBlessing.svg",
                        name: "Sage's Blessing",
                        description: "A Sage's blessing is preventing 15% of the damage you would ordinarily take."
                    }
                }

                addBuff({ buff: newBuff, target, caster })

                const healSourceConsts =
                    healSource.constants && healSource.constants.constants
                        ? healSource.constants.constants
                        : lookupBuff(healSource.id).constants
                if (healSourceConsts.reducesCooldowns && caster.abilities) {
                    caster.abilities.forEach((ability) => {
                        // healing spells reduce the cooldown of ALL abilities by 2 seconds
                        if (ability._currentCooldown > 0.0) {
                            ability._currentCooldown -= 2.0
                            
                            // don't reduce below 0
                            if (ability._currentCooldown <= 0.0) {
                                // will be cleared by the combat server on the next tick
                                ability._currentCooldown = 0.01
                            }
                        }
                    })
                }
            },

            onTick({ buff, target, caster, secondsElapsed, actualBattle }) {},

            onRemove({ buff, target, caster }) {}
        }
    },

    class_passive_sage__ward: {
        duplicateTag: "class_passive_sage__ward",
        icon: "sageWard.svg",
        name: "Ward",
        description({ buff, level }) {
            return `
        Passive class ability<br />
        Prevents you from being directly targeted unless there are no other allies remaining in battle.
        While equipped when you are a Sage this is <b>always active</b>`
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

                //todo: improve this, this forces enemies (that are targeting the player) to retarget every tick;
                //      it'd be more efficient and possibly prevent an edge case race condition by patching where
                //      targets are originally assigned instead

                // pick someone new (filtering us out)
                for (let enemy of actualBattle.enemies) {
                    if (enemy.target == target.id) {
                        enemy.target = _.sample(actualBattle.units.filter((thisFriendlyUnit) => {
                            return thisFriendlyUnit.id !== target.id
                        })).id
                    }
                }
            },
        }
    },

    class_trait_sage__sages_blessing: {
        duplicateTag: "class_trait_sage__sages_blessing",
        icon: "sagesBlessing.svg",
        name: "Sage's Blessing",
        description({ buff, level }) {
            return `
        A Sage's blessing is preventing 15% of the damage you would ordinarily take.`
        },
        constants: {},
        data: {
            duration: 2.2,
            totalDuration: 2.2,
            allowDuplicates: true
        },
        events: {
            onApply({ buff, target, caster, actualBattle }) {
                target.stats.damageTaken -= 0.15
            },

            onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
                if (buff.duration !== Infinity) {
                    buff.duration -= secondsElapsed
                    if (buff.duration <= 0) {
                        removeBuff({ buff, target, caster, actualBattle })
                    }
                }
            },

            onRemove({ buff, target, caster }) {
                target.stats.damageTaken += 0.15
            }
        }
    },

    class_trait_tactician: {
        duplicateTag: "class_trait_tactician",
        icon: "classTactician.png",
        name: "Class Trait: Tactician",
        description() {
            return `
        You gain +20% damage and +15% accuracy, except:<br />
        You lose 5% damage and 4% accuracy for every active ability slotted in your loadout beyond 3 active abilities.<br />
        You lose 5% damage and 4% accuracy for every passive passive slotted in your loadout beyond 3 passive abilities.<br />
        You have a 10% chance to prevent damage, which cannot be reduced, prevented, or nullified.<br />
        While you are a Tactician this is <b>always active</b>`
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
                if (target.abilities) {
                    let passiveAbilityCount = 0
                    let activeAbilityCount = 0
                    target.abilities.forEach((ability) => {
                        if (ability.slot != "companion") {
                            passiveAbilityCount += (ability.isPassive) ? 1 : 0
                            activeAbilityCount += (ability.isPassive) ? 0 : 1
                        }
                    })

                    const damageBuff = 0.20 - ((Math.max(0, passiveAbilityCount - 3) + Math.max(0, activeAbilityCount - 3)) * 0.05)
                    const accuracyBuff = 0.15 - ((Math.max(0, passiveAbilityCount - 3) + Math.max(0, activeAbilityCount - 3)) * 0.04)
                    
                    buff.custom = true
                    buff.data.custom = true

                    const damageBuffText = (damageBuff >= 0) ? `+${(damageBuff*100.0).toFixed(0)}` : `${(damageBuff*100.0).toFixed(0)}`
                    const accuracyBuffText = (accuracyBuff >= 0) ? `+${(accuracyBuff*100.0).toFixed(0)}` : `${(accuracyBuff*100.0).toFixed(0)}`

                    buff.customText = `${damageBuffText} / ${accuracyBuffText}`

                    target.stats.attack += target.stats.attack * (1.0 + damageBuff)
                    target.stats.attackMax += target.stats.attackMax * (1.0 + damageBuff)
                    target.stats.accuracy += target.stats.accuracy * (1.0 + accuracyBuff)
                }

            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {},

            onRemove({ buff, target, caster }) {}
        }
    },

    class_passive_tactician__grit: {
        duplicateTag: "class_passive_tactician__grit",
        icon: "tacticianGrit.svg",
        name: "Grit",
        description({ buff, level }) {
            return `
        Passive class ability<br />
        For every 5% Health you are missing from your original Maximum Health,
        your Defense and Magic Armor increases by +4%.<br />
        While equipped when you are a Tactician this is <b>always active</b>`
        },
        constants: {},
        data: {
            duration: Infinity,
            totalDuration: Infinity,
        },
        events: {
            onApply({ buff, target, caster, actualBattle }) {
                buff.data.statsBoosted = {
                    defense: 0,
                    magicArmor: 0
                }
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                // undo existing bonuses
                target.stats.defense -= buff.data.statsBoosted.defense
                target.stats.magicArmor -= buff.data.statsBoosted.magicArmor

                // calculate new bonuses
                const missingHealthIncrements = CInt((1.0 - (target.stats.health / target.stats.origStats.healthMax)) / 0.05)
                buff.data.statsBoosted.defense = missingHealthIncrements * 0.04 * target.stats.origStats.defense
                buff.data.statsBoosted.magicArmor = missingHealthIncrements * 0.04 * target.stats.origStats.magicArmor

                buff.custom = true
                buff.data.custom = true
                buff.customText = `+${missingHealthIncrements*4}%`

                // apply new bonuses
                target.stats.defense += buff.data.statsBoosted.defense
                target.stats.magicArmor += buff.data.statsBoosted.magicArmor
            },

            onRemove({ buff, target, caster }) {}
        }
    },

    class_trait_warmage: {
        duplicateTag: "class_trait_warmage",
        icon: "classWarMage.png",
        name: "Class Trait: War Mage",
        description() {
            return `
        Whenever you inflict magic damage in combat, your maximum health is restored by 0.5% of its original amount.
        Whenever you are struck in combat, your maximum health is reduced by 1% of its original amount.
        May cast hostile spells while wielding any style of weapon.
        Can reforge tridents.
        Triple Attack Speed for tridents and tridents now deal 100% of your auto-attack damage as additional magic damage.
        Double all stat benefits from amulets.<br />
        While you are a War Mage this is <b>always active</b>`
        },
        constants: {
        },
        data: {
            duration: Infinity,
            totalDuration: Infinity,
            isEnchantment: true
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
        duplicateTag: "class_passive_warmage__glorious_destiny",
        icon: "warmageGloriousDestiny.svg",
        name: "Glorious Destiny",
        description({ buff, level }) {
            return `
        Passive class ability<br />
        Dealing magic damage restores 0.5% of your maximum health.<br />
        While equipped when you are a War Mage this is <b>always active</b>`
        },
        constants: {},
        data: {
            duration: Infinity,
            totalDuration: Infinity
        },
        events: {
            onApply({ buff, target, caster, actualBattle }) {},

            // for abilities and spells, including the 'magic_blade' proc from tridents -- does not include auto-attack (that's 'onDidDamage'), which can't hit for magic damage
            onDidRawDamage({ buff, defender, attacker, actualBattle, rawDamage, damageDealt, source, magic }) {
                if (magic && damageDealt > 0) {
                    // increase max health by 0.5%

                    const amountToIncreaseHealthBy = 0.005 * attacker.stats.healthMaxOrig

                    attacker.stats.healthMax += amountToIncreaseHealthBy
                    if (attacker.stats.healthMax > attacker.stats.healthMaxOrig) {
                        attacker.stats.healthMax = attacker.stats.healthMaxOrig
                    }
                }
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {},
        }
    },

    class_trait_wizard: {
        duplicateTag: "class_trait_wizard",
        icon: "classWizard.png",
        name: "Class Trait: Wizard",
        description() {
            return `
        Can reforge wands, tomes, and orbs.  Astronomy mages produce magic shards 25% faster.  Double
        Magic Power benefit from tomes and orbs.  Maximum Health is reduced by half.  The Maximum
        Health cost of all spells is reduced by half.<br />
        While you are a Wizard this is <b>always active</b>`
        },
        constants: {
        },
        data: {
            duration: Infinity,
            totalDuration: Infinity,
            isEnchantment: true
        },
        events: {
            onApply({ buff, target, caster, actualBattle }) {},
            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {},
            onRemove({ buff, target, caster }) {}
        }
    }
}
