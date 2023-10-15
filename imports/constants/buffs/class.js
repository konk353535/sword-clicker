// @ts-check

// @ts-expect-error
import lodash from "lodash"
// @ts-expect-error
import uuid from "node-uuid"
//import moment from "moment"
// @ts-expect-error
import _ from "underscore"

import { addBuff, lookupBuff, removeBuff } from "../../battleUtils"
// @ts-ignore
import { CDbl, CInt, autoPrecisionValue } from "../../utils.js"
// @ts-ignore
import { measureMemory } from "vm"

export const CLASS_BUFFS = {
    class_trait_barbarian: {
        duplicateTag: "class_trait_barbarian",
        icon: "classBarbarianSmall.png",
        name: "Class Trait: Barbarian",
        description() {
            return `
        Your critical hits will inflict bleeding for 3 seconds.  Broad swords and battle axes have a 40% chance to
        strike enemies adjacent to your target.  The duration of Berserk is extended by double, deals double damage,
        and the amount of self-damage is reduced by half.  You may not wear magical equipment and your Magic Power
        in combat is always 0, even if another effect would say otherwise.<br />
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
                                description: `Bleed every second for ${(attacker.stats.attackMax / 10).toFixed(2).replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0*$)/,'$1')} damage`,
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
                if (originalAutoAttack && attacker && attacker.targetUnit) {
                    if (attacker.mainHandWeapon?.indexOf("_broad_sword") !== -1 || attacker.mainHandWeapon?.indexOf("_battle_axe") !== -1) {
                        if (Math.random() <= 0.4) {
                            // Check enemies both side of the defender
                            if (attacker.targetUnit.adjacentAllies && attacker.targetUnit.adjacentAllies.length > 0) {
                                attacker.targetUnit.adjacentAllies.forEach((adjacentTarget) => {
                                    // Perform auto attack on them as well
                                    actualBattle.autoAttack({
                                        attacker,
                                        defender: adjacentTarget,
                                        tickEvents: actualBattle.tickEvents,
                                        historyStats: actualBattle.historyStats,
                                        originalAutoAttack: false
                                    })
                                })
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

    class_active_barbarian__charge: {
        duplicateTag: "class_active_barbarian__charge",
        icon: "barbarianCharge.svg",
        name: "Charge",
        description() {
            return `
        You charge into battle dealing <b>75%</b> damage and stunning your enemy for <b>5</b> seconds.  An enemy can't
        be stunned by another Charge again for 30 seconds.`
        },
        constants: {
            abilityDamage: 0.75,
            allowTicks: true
        },
        data: {
            duration: 0,
            totalDuration: 0
        },
        events: {
            onApply({ buff, target, caster, actualBattle }) {
                const buffConstants = buff.constants && buff.constants.constants ? buff.constants.constants : lookupBuff(buff.id).constants
                const abilityDamage = buffConstants.abilityDamage * (caster.stats.attack + (caster.stats.attackMax - caster.stats.attack) * Math.random())

                actualBattle.dealDamage(abilityDamage, {
                    attacker: caster,
                    defender: target,
                    tickEvents: actualBattle.tickEvents,
                    historyStats: actualBattle.historyStats
                })

                let isResilient = false
                target.buffs.forEach((thisBuff) => {
                    if (thisBuff.data?.stunResilience) {
                        isResilient = true
                    }
                })

                if (isResilient) {
                    return
                }

                const newBuff = {
                    id: "stunned",
                    data: {
                        duration: 5,
                        totalDuration: 5,
                        icon: "stunned.svg",
                        name: "Stunned",
                        description: `You are stunned and can't take any actions or fight.`,
                        swapId: "stunned_barbarian_resilience",
                        swapName: "Resilient",
                        swapDuration: 35, // base duration + resilience duration
                        swapIcon: "barbarianCharge.svg",
                        swapDescription: "Resilient to Barbarian Charge stuns."
                    }
                }

                addBuff({ buff: newBuff, target, caster, actualBattle })
            },

            onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
                removeBuff({ buff, target, caster, actualBattle })
            },

            onRemove({ buff, target, caster }) {}
        }
    },

    stunned_barbarian_resilience: {
        duplicateTag: "stunned_barbarian_resilience",
        icon: "barbarianCharge.svg",
        name: "resilient",
        description() {
            return `
        Resilient to Barbarian Charge stuns.`
        },
        constants: {
            allowTicks: true
        },
        data: {
            duration: 30,
            totalDuration: 30,
            allowDuplicates: true,
            stunResilience: true
        },
        events: {
            onApply({ buff, target, caster, actualBattle }) {},

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                buff.duration -= secondsElapsed
                buff.data.duration = buff.duration

                if (buff.duration <= 0) {
                    removeBuff({ buff, target, caster, actualBattle })
                }
            },

            onRemove({ buff, target, caster, actualBattle }) {}
        }
    },

    class_passive_barbarian__brawn: {
        duplicateTag: "class_passive_barbarian__brawn",
        icon: "barbarianBrawn.svg",
        name: "Brawn",
        description() {
            return `
        Passive class ability<br />
        Any time you miss with an auto-attack, you add 2 stacks of <i>Brawn</i> that increases all of your damage by
        +10% per stack (to a maximum of +150%).  Stacks are reduced by 1 when you successfully hit with an auto-attack
        to a minimum of 0 stacks.<br />
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

            onTargetDodgedDamage({ buff, defender, attacker, actualBattle, source }) {
                if (source == "autoattack") {
                    if (buff.stacks < 15) {
                        buff.stacks += 2
                    }
                }
            },

            onDidDamage({originalAutoAttack, buff, defender, attacker, actualBattle, damageDealt, rawDamage, source, customIcon}) {
                if (source == "autoattack") {
                    buff.stacks -= 1
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
            }
        }
    },

    class_trait_duelist: {
        duplicateTag: "class_trait_duelist",
        icon: "classDuelistSmall.png",
        name: "Class Trait: Duelist",
        description() {
            return `
        <i>Twin Blades</i> and other dagger/rapier-only abilities can also be used with short swords, scimitars,
        and longswords.  Physical damage dealt to an enemy you aren't directly targeting is increased by 50%.
        Rapiers and bucklers may be equipped together.  Rapiers no longer reduce Defense.  Double accuracy benefit
        from bucklers.  When striking an enemy with an auto-attack, you reduce their physical armor and defense by
        1% of their original maximum.<br />
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

            onDidDamage({originalAutoAttack, buff, defender, attacker, actualBattle, damageDealt, rawDamage, source, customIcon}) {
                // hitting with an autoattack reduce's the enemy's defense and armor by 1%
                if (source == "autoattack") {
                    defender.stats.armor -= defender.stats.origStats.armor * 0.01
                    defender.stats.defense -= defender.stats.origStats.defense * 0.01

                    if (defender.stats.armor < 1) {
                        defender.stats.armor = 1
                    }

                    if (defender.stats.defense < 1) {
                        defender.stats.defense = 1
                    }

                    defender.tickMessage(lodash.sample(["Shred", "Tear", "Rip", "Pierce"]), "#994444", "rapier", defender)
                }
            },

            onRemove({ buff, target, caster }) {}
        }
    },

    class_active_duelist__parry: {
        duplicateTag: "class_active_duelist__parry", // Used to stop duplicate buffs
        icon: "duelistParry.svg",
        name: "Parry",
        description() {
            return `
        Parry physical attacks, negating the damage and counter attacking for 75% attack damage.<br />
        Lasts for 6 seconds.`
        },
        constants: {
            damageDecimal: 0.75
        },
        data: {
            duration: 6,
            totalDuration: 6
        },
        events: {
            onApply({ buff, target, caster, actualBattle }) {},

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                if (buff.duration !== Infinity) {
                    buff.duration -= secondsElapsed
                    if (buff.duration <= 0) {
                        removeBuff({ buff, target, caster, actualBattle })
                    }
                }
            },

            onTookDamage({ buff, attacker, defender, actualBattle, secondsElapsed, damageDealt }) {
                defender.tickMessage("Parried!", "#558855", "chatBubble", defender)
                defender.stats.health += damageDealt // causes the damage to be nullified

                const constants =
                    buff.constants && buff.constants.constants
                        ? buff.constants.constants
                        : lookupBuff(buff.id).constants
                const defenderAttack = defender.stats.attack
                const defenderAttackMax = defender.stats.attackMax
                const actualDamage = (defenderAttack + (defenderAttackMax - defenderAttack) * Math.random()) * constants.damageDecimal

                actualBattle.dealDamage(actualDamage, {
                    defender: attacker,
                    attacker: defender,
                    tickEvents: actualBattle.tickEvents,
                    historyStats: actualBattle.historyStats,
                    customIcon: "duelistParry.svg",
                    customColor: "#f7750f"
                })
            },

            onRemove({ buff, target, caster, actualBattle }) {}
        }
    },

    class_passive_duelist__driven: {
        duplicateTag: "class_passive_duelist__driven",
        icon: "duelistDriven.svg",
        name: "Driven",
        description() {
            return `
        Passive class ability<br />
        Your damage is reduced by 40%, but you auto-attack 75% faster.<br />
        While equipped when you are a Duelist this is <b>always active</b>`
        },
        constants: {},
        data: {
            duration: Infinity,
            totalDuration: Infinity
        },
        events: {
            onApply({ buff, target, caster, actualBattle }) {
                target.stats.attackSpeed *= 1.75
                target.stats.attack *= 0.6667
                target.stats.attackMax *= 0.6667
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {}
        }
    },

    class_trait_paladin: {
        duplicateTag: "class_trait_paladin",
        icon: "classPaladinSmall.png",
        name: "Class Trait: Paladin",
        description() {
            return `
        A successful taunt triggers a heal for the ally the enemy was targeting.  15% faster
        cooldowns for taunt abilities.  Longswords and shields may be equipped together.  Scream
        may be used with a longsword.  Triple Max Attack from hammers and spears.  Quadruple health
        benefit from non-magical head, chest, and leg equipment.  Your squire always follows you
        into battle; he does not fight, but can take some damage.  You automatically intercept
        half of the damage your squire receives.  If your squire dies, you will be stunned for
        60 seconds.  Entering battle with fewer than 4 player allies will reduce your damage by
        12.5% per missing ally.<br />
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
            onApply({ buff, target, caster, actualBattle }) {
                console.log(target.stats.absorption)
                
                // lose 12.5% damage for each missing ally, up to 50% reduction when alone
                // this value will be 0.5 at 0 allies and 1.0 at 4+ allies... allies must be players
                const damageReduction = 0.5 + Math.min(0.5, (actualBattle.units.filter((thisFriendlyUnit) => {
                    return thisFriendlyUnit.id !== target.id && !thisFriendlyUnit.isNPC && !thisFriendlyUnit.isCompanion && !thisFriendlyUnit.isSoloCompanion
                }).length * 0.125))

                if (damageReduction < 1.0) {
                    target.stats.attack *= damageReduction
                    target.stats.attackMax *= damageReduction

                    buff.custom = true
                    buff.data.custom = true
                    buff.customText = `-${100-(100*damageReduction)}%`
                }
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                if (!buff.data.summonedSquireYet) {
                    buff.data.summonedSquireYet = true

                    const paladinSquire = {
                        owner: target.id + "_companion",
                        id: uuid.v4(),
                        tickOffset: 0,
                        isNPC: true,
                        isCompanion: true,
                        isSoloCompanion: false
                    }

                    paladinSquire.icon = "guyT1.png"
                    paladinSquire.name = target.name + "'s squire",
                    paladinSquire.stats = {
                        attack: 0.001,
                        attackMax: 0.001,
                        attackSpeed: 0.001,
                        accuracy: 0.001,
                        health: target.stats.healthMax * 0.5,
                        healthMax: target.stats.healthMax * 0.5,
                        defense: target.stats.defense * 0.5,
                        armor: target.stats.armor * 0.33,
                        magicArmor: target.stats.magicArmor * 0.33,
                        magicPower: 0.001,
                        healingPower: 0.001,
                        damageTaken: 1,
                        damageOutput: 0
                    }
                    paladinSquire.buffs = []

                    paladinSquire.buffs.push({
                        id: "paladin_trait_squire_damage_interception",
                        data: {
                            duration: Infinity,
                            totalDuration: Infinity,
                            name: "Squire Interception",
                            icon: "paladinSquireInterception.svg",
                            unitToSendDamageTo: target.id
                        }
                    })

                    let broughtBulwark = false
                    caster.abilities.forEach((ability) => {
                        // if this player brought Bulwark to battle, apply it to this new unit
                        if (ability?.id === "class_passive_paladin__bulwark") {
                            broughtBulwark = true
                        }
                    })

                    if (broughtBulwark) {
                        paladinSquire.buffs.push({
                            id: "class_passive_paladin__bulwark_effect",
                            data: {
                                duration: Infinity,
                                totalDuration: Infinity,
                                name: "Bulwark",
                                icon: "paladinBulwark.svg",
                                stacks: 3
                            }
                        })
                    }

                    let allFriendlyCombatUnits = []
                    _.forEach(actualBattle.units, function (thisFriendlyUnit) {
                        if (paladinSquire.id == thisFriendlyUnit.id) {
                            thisFriendlyUnit.isPacifist = true // must be set after adding to actualBattle battle ref
                        }
                        allFriendlyCombatUnits.push(thisFriendlyUnit)
                    })

                    // add the squire to combat (but 'actualBattle.units' does not get updated until next tick)
                    actualBattle.addUnit(paladinSquire)
                    buff.data.squireUnit = paladinSquire.id

                    allFriendlyCombatUnits.push(paladinSquire)

                    // cheezy hack: now that this squire exists, randomize every enemy to target random friendly units
                    //              otherwise the squire will never be targeted in PQ or the first floor of a multi-room tower
                    _.forEach(actualBattle.enemies, function (thisEnemyUnit) {
                        thisEnemyUnit.target = _.sample(allFriendlyCombatUnits).id
                    })
                }
            },

            onRemove({ buff, target, caster }) {}
        }
    },

    class_paladin_inspiration: {
        duplicateTag: "class_paladin_inspiration", // Used to stop duplicate buffs
        icon: "paladinInspiration.svg",
        name: "Paladin's Inspiration",
        description({ buff }) {
            const c = buff.constants
            return `
        Heals target for ${c.healBase} + (${Math.round(c.healMPRatio * 100)}% of MP).`
        },
        constants: {
            healBase: 30,
            healMPRatio: 2.25,
            removesCurse: true
        },
        data: {
            allowDuplicates: true,
            duration: 1.5,
            totalDuration: 1.5
        },
        events: {
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
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                buff.duration -= secondsElapsed

                if (buff.duration < 0) {
                    removeBuff({ buff, target, caster, actualBattle })
                }
            },

            onRemove({ buff, target, caster, actualBattle }) {}
        }
    },

    paladin_trait_squire_damage_interception: {
        duplicateTag: "paladin_trait_squire_damage_interception",
        icon: "paladinSquireInterception.svg",
        name: "Squire Interception",
        description() {
            return `
        Redirects 50% damage from the squire back to the paladin.`
        },
        constants: {},
        data: {
            duration: Infinity,
            totalDuration: Infinity,
            isEnchantment: true
        },
        events: {
            onApply({ buff, target, caster, actualBattle }) {},

            onTick({ buff, target, caster, actualBattle }) {},

            onTookDamage({ buff, defender, attacker, actualBattle, damageDealt }) {
                if (buff.data.unitToSendDamageTo) {
                    // try fo find ally
                    const paladinAlly = actualBattle.units.find((ally) => {
                        return ally.id === buff.data.unitToSendDamageTo
                    })

                    if (!lodash.isUndefined(paladinAlly)) {
                        // redirect half the damage from self back to the paladin
                        const redirectDamage = damageDealt * 0.5

                        actualBattle.healTarget(redirectDamage, {
                            caster: paladinAlly,
                            target: defender,
                            healSource: buff
                        })

                        if (redirectDamage >= 0.1) {
                            actualBattle.dealDamage(redirectDamage, {
                                attacker: defender,
                                defender: paladinAlly,
                                tickEvents: actualBattle.tickEvents,
                                customIcon: buff.data.icon
                            })
                        }

                        const healthPercentage = defender.stats.health / defender.stats.healthMax

                        if (healthPercentage <= 0.3) {
                            defender.tickMessage(lodash.sample(["I'm Dying", "Death Awaits", "Farewell"]), "#aa0000", "chatBubble", defender)
                        } else if (healthPercentage <= 0.6) {
                            defender.tickMessage(lodash.sample(["Ouch", `${paladinAlly.name}?`, "Oof", "Owie"]), "#e27600", "chatBubble", defender)
                        }
                    } else {
                        // paladin is dead already -_-
                        const healthPercentage = defender.stats.health / defender.stats.healthMax

                        if (healthPercentage <= 0.3) {
                            defender.tickMessage(lodash.sample(["I'm Dying", "Death Awaits", "Farewell"]), "#aa0000", "chatBubble", defender)
                        } else if (healthPercentage <= 0.6) {
                            defender.tickMessage(lodash.sample(["Ouch", "Oof", "Owie"]), "#e27600", "chatBubble", defender)
                        }
                    }
                }
            },

            onBeforeDeath({ buff, target, actualBattle }) {
                if (buff.data.unitToSendDamageTo) {
                    // try fo find ally
                    const paladinAlly = actualBattle.units.find((ally) => {
                        return ally.id === buff.data.unitToSendDamageTo
                    })
                    if (!lodash.isUndefined(paladinAlly)) {
                        // penalize the paladin for losing his squire!

                        paladinAlly.tickMessage("Squire Died", "#CC0000", "skull", paladinAlly)

                        const newBuff = {
                            id: "stunned",
                            data: {
                                duration: 60,
                                totalDuration: 60,
                                icon: "stunned.svg",
                                name: "Mourning",
                                description: `Your squire has fallen in combat!  You are stunned and can't take any actions or fight.`
                            }
                        }

                        addBuff({ buff: newBuff, target: paladinAlly, caster: target, actualBattle })
                    }
                }
            },

            onRemove({ buff, target, caster }) {}
        }
    },

    class_active_paladin__wrath: {
        duplicateTag: "class_active_paladin__wrath",
        icon: "paladinWrath.svg",
        name: "Wrath",
        description() {
            return `
        You unleash righteous vengeance upon your enemy, dealing <b>250%</b> weapon damage
        multiplied by how low your health is, from 1x damage at full health to 4x damage at
        10% health.`
        },
        constants: {},
        data: {
            duration: 0,
            totalDuration: 0
        },
        events: {
            onApply({ buff, target, caster, actualBattle }) {
                const abilityBaseDamage = 2.5 * (caster.stats.attack + (caster.stats.attackMax - caster.stats.attack) * Math.random())
                // this will produce a number from 1 to 4 when health is full vs. 10% (or lower)
                const healthAdjustment = (Math.min(1 - ((caster.stats.health - (caster.stats.origStats.healthMax * 0.1)) / Math.max(caster.stats.origStats.healthMax - (caster.stats.origStats.healthMax * 0.1), 1)), 1) + 0.333333) * 3
                const abilityDamage = abilityBaseDamage * healthAdjustment

                actualBattle.dealDamage(abilityDamage, {
                    attacker: caster,
                    defender: target,
                    tickEvents: actualBattle.tickEvents,
                    historyStats: actualBattle.historyStats
                })
            },

            onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
                removeBuff({ buff, target, caster, actualBattle })
            },

            onRemove({ buff, target, caster }) {}
        }
    },

    class_passive_paladin__bulwark: {
        duplicateTag: "class_passive_paladin__bulwark",
        icon: "paladinBulwark.svg",
        name: "Bulwark",
        description() {
            return `
        Passive class ability<br />
        Grants all allies 3 stacks of <i>Bulwark</i> protection at the beginning of battle that 
        prevents all damage.  An additional stack is granted per each room the group advances to
        up to a maximum of 3 stacks.  Each time the ally would take damage, a stack is deducted.
        When all stacks are gone, this protection ends.<br />
        While equipped when you are a Paladin this is <b>always active</b>`
        },
        constants: {},
        data: {
            duration: Infinity,
            totalDuration: Infinity
        },
        events: {
            onApply({ buff, target, caster, actualBattle }) {},

            onNextFloorRoom({ buff, unit, actualBattle, newRoom }) {
                // apply it to all the friendly units
                actualBattle.units.forEach((friendlyUnit) => {
                    if (friendlyUnit.id !== unit.id) {
                        let stacks = 3

                        const ally_existing_bulwark_buff = friendlyUnit.findBuff("class_passive_paladin__bulwark_effect")
                        if (ally_existing_bulwark_buff) {
                            ally_existing_bulwark_buff.stacks = Math.min(3, stacks + ally_existing_bulwark_buff.stacks)
                            ally_existing_bulwark_buff.data.hitsRequired = ally_existing_bulwark_buff.stacks
                        } else {
                            unit.applyBuffTo({
                                buff: unit.generateBuff({
                                    buffId: "class_passive_paladin__bulwark_effect",
                                    buffData: {
                                        stacks: stacks
                                    }
                                }),
                                target: friendlyUnit
                            })
                        }

                        friendlyUnit.tickMessage("Bulwark", "#445599", "paladinBulwark", friendlyUnit)
                    }
                })
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {}
        }
    },

    class_passive_paladin__bulwark_effect: {
        duplicateTag: "class_passive_paladin__bulwark_effect",
        icon: "paladinBulwark.svg",
        name: "Bulwark",
        description() {
            return `
        A Paladin has granted you a stack of <i>Bulwark</i> protection that prevents all damage.
        Each time you would take damage, a stack is deducted. When all stacks are gone, this
        protection ends.`
        },
        constants: {},
        data: {
            duration: Infinity,
            totalDuration: Infinity
        },
        events: {
            onApply({ buff, target, caster, actualBattle }) {
                if (buff.data.hitsRequired == null) {
                    buff.stacks = buff.data.hitsRequired = 3
                    target.stats.armor += 100000
                    target.stats.magicArmor += 100000
                }
            },

            onTookRawDamage({ buff, defender, attacker, actualBattle, damageDealt, source }) {
                buff.data.hitsRequired--
                buff.stacks = buff.data.hitsRequired

                if (buff.data.hitsRequired <= 0) {
                    defender.stats.armor -= 100000
                    defender.stats.magicArmor -= 100000

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
        icon: "classRangerSmall.png",
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
                if (target.mainHandWeapon?.indexOf("_bow") !== -1) {
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

            onTargetDodgedDamage({ buff, defender, attacker, actualBattle, source }) {
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
                if (target.mainHandWeapon?.indexOf("_bow") === -1) {
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

    class_passive_ranger__thicket: {
        duplicateTag: "class_passive_ranger__thicket",
        icon: "rangerThicket.svg",
        name: "Thicket",
        description() {
            return `
        Passive class ability<br />
        You summon a growth of briars from nearby thickets to endanger your enemies! Briars do not
        attack but will confuse and frustrate your enemies into injuring themselves on them.  Briars
        will periodically regrow (about every 45 seconds).<br />
        While equipped when you are a Ranger this is <b>always active</b>`
        },
        constants: {
        },
        data: {
            duration: Infinity,
            totalDuration: Infinity,
            // we erase this buff in the first tick anyway, so don't even show it to reduce flickering
            hideBuff: true
        },
        events: {
            onApply({ buff, target, caster, actualBattle }) {},

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                if (!buff.data.summonedThicketYet) {
                    buff.data.summonedThicketYet = true

                    // unit quantity adjustment based on party size (36% at group size 10, 56% at group size 5, 100% at group size 1)
                    const partySizeAdjustment = 1 - ((actualBattle.units.length - 1)/((actualBattle.units.length - 1) + 5))
                    const iHowManyBriars = Math.round(partySizeAdjustment * 6)

                    for (let i = 0; i < iHowManyBriars; i++) {
                        const rangerBriar = {
                            owner: target.id + "_briar",
                            id: uuid.v4(),
                            tickOffset: 0,
                            isNPC: true,
                            isCompanion: true,
                            isSoloCompanion: false
                        }

                        const randomBriarHealth = (target.stats.healthMax * 0.035 * Math.random()) + 3

                        rangerBriar.icon = "rangerThicketBriar.svg"
                        rangerBriar.name = target.name + "'s briar",
                        rangerBriar.stats = {
                            attack: 0.001,
                            attackMax: 0.001,
                            attackSpeed: 0.001,
                            accuracy: 0.001,
                            health: randomBriarHealth,
                            healthMax: randomBriarHealth,
                            defense: 1,
                            armor: 1,
                            magicArmor: 1,
                            magicPower: 0,
                            healingPower: 0,
                            damageTaken: 1,
                            damageOutput: 1
                        }
                        rangerBriar.buffs = [{
                            id: "class_ranger_briar_effect",
                            data: {
                                duration: Infinity,
                                totalDuration: Infinity,
                                allowDuplicates: false,
                                sourceId: caster.id,
                                caster: caster.id,
                                icon: rangerBriar.icon,
                                name: rangerBriar.name,
                                description: ``,
                                duplicateTag: "class_ranger_briar_effect",
                                hideBuff: false
                            }
                        }]

                        // add the briar unit to combat
                        actualBattle.addUnit(rangerBriar)
                    }

                    let allFriendlyCombatUnits = []
                    _.forEach(actualBattle.units, function (thisFriendlyUnit) {
                        if (thisFriendlyUnit.icon == "rangerThicketBriar.svg") {
                            thisFriendlyUnit.isStunned = true // must be set after adding to actualBattle battle ref
                        }
                        allFriendlyCombatUnits.push(thisFriendlyUnit)
                    })

                    // cheezy hack: now that this briar exists, randomize every enemy to target random friendly units
                    //              otherwise the briar will never be targeted in PQ or the first floor of a multi-room tower
                    _.forEach(actualBattle.enemies, function (thisEnemyUnit) {
                        thisEnemyUnit.target = _.sample(allFriendlyCombatUnits).id
                    })
                } else if (Math.random() <= 0.004444) {
                    // On average, every 45 seconds
                    // NOTE: random value x time to target (in seconds) should = 0.2 (seconds per tick)

                    const rangerBriar = {
                        owner: target.id + "_briar",
                        id: uuid.v4(),
                        tickOffset: 0,
                        isNPC: true,
                        isCompanion: true,
                        isSoloCompanion: false
                    }

                    const randomBriarHealth = (target.stats.healthMax * 0.035 * Math.random()) + 3

                    rangerBriar.icon = "rangerThicketBriar.svg"
                    rangerBriar.name = target.name + "'s briar",
                    rangerBriar.stats = {
                        attack: 0.001,
                        attackMax: 0.001,
                        attackSpeed: 0.001,
                        accuracy: 0.001,
                        health: randomBriarHealth,
                        healthMax: randomBriarHealth,
                        defense: 1,
                        armor: 1,
                        magicArmor: 1,
                        magicPower: 0,
                        healingPower: 0,
                        damageTaken: 1,
                        damageOutput: 1
                    }
                    rangerBriar.buffs = [{
                        id: "class_ranger_briar_effect",
                        data: {
                            duration: Infinity,
                            totalDuration: Infinity,
                            allowDuplicates: false,
                            sourceId: caster.id,
                            caster: caster.id,
                            icon: rangerBriar.icon,
                            name: rangerBriar.name,
                            description: ``,
                            duplicateTag: "class_ranger_briar_effect",
                            hideBuff: false
                        }
                    }]

                    // add the briar unit to combat
                    actualBattle.addUnit(rangerBriar)
                }
            },

            onRemove({ buff, target, caster }) {}
        }
    },

    class_ranger_briar_effect: {
        duplicateTag: "class_ranger_briar_effect",
        icon: "rangerThicketBriar.svg",
        name: "Painful",
        description() {
            return `When destroyed, the briar causes damage to the enemy that destroyed it!`
        },
        constants: {},
        data: {},
        events: {
            onApply({ buff, target, caster, actualBattle }) {
                buff.data.popped = false
            },

            onTick({ buff, target, caster, secondsElapsed, actualBattle }) {},

            onTookDamage({ buff, defender, attacker, actualBattle, damageDealt }) {
                try {
                    // if the briar dies, deal damage back to the unit who landed the finishing blow
                    if (defender.stats.health <= 0) {
                        buff.data.popped = true

                        actualBattle.dealDamage((attacker.stats.healthMax / 6) + damageDealt, {
                            attacker: defender,
                            defender: attacker,
                            tickEvents: actualBattle.tickEvents,
                            historyStats: actualBattle.historyStats,
                            customIcon: buff.data.icon
                        })
                    }
                } catch (err) {}
            },

            onBeforeDeath({ buff, target, actualBattle }) {
                if (!buff.data.popped) {
                    buff.data.popped = true

                    // if the briar dies without onTookDamage (from an ability, spell, or effect), deal damage back to the current target unit (or at random if we can't find a target)
                    let targetUnit = target.targetUnit
                    if (!targetUnit) {
                        targetUnit = _.sample(target.enemies)
                    }

                    actualBattle.dealDamage(target.stats.healthMax / 6, {
                        attacker: target,
                        defender: targetUnit,
                        tickEvents: actualBattle.tickEvents,
                        historyStats: actualBattle.historyStats,
                        customIcon: buff.data.icon
                    })
                }
            },

            onRemove({ buff, target }) {}
        }
    },

    class_active_ranger__blaze_arrows: {
        duplicateTag: "class_active_ranger__blaze_arrows",
        icon: "rangerBlazeArrows.svg",
        name: "Blaze Arrows",
        description({ buff }) {
            return `
        A fiery attack that deals <b>${(buff.constants.initialDamage * 100).toFixed(0)}%</b> damage immediately and sets
        the target on fire, burning for <b>${(buff.constants.fireDamage * 100).toFixed(0)}%</b> damage every second for
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
                        icon: "rangerBlazeArrows.svg",
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
        icon: "rangerBlazeArrows.svg",
        name: "Blaze Arrow",
        description() {
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
                        customIcon: "rangerBlazeArrows.svg"
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
        description({ buff }) {
            return `
        An icy attack that deals <b>${(buff.constants.initialDamage * 100).toFixed(0)}%</b> damage
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
                        name: "Sleet Arrow"
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
        description({ buff }) {
            return `
        An electrified attack that deals <b>${(buff.constants.initialDamage * 100).toFixed(0)}%</b>
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
                        name: "Sleet Arrow"
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
        description() {
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
        icon: "classSageSmall.png",
        name: "Class Trait: Sage",
        description() {
            return `
        Healing a target reduces all of your active ability cooldowns by 2 seconds and places a protective blessing
        upon them for 2 seconds that reduces the damage they take by 35%.  You cannot receive your own blessing.
        Double Healing Power benefit from staves Can reforge most magical clothing.  Cannot auto-attack when in combat
        with allies.<br />
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

                if (caster.id === target.id) {
                    return
                }

                const newBuff = {
                    id: "class_trait_sage__sages_blessing",
                    data: {
                        duration: 2.2,
                        totalDuration: 2.2,
                        caster: caster.id,
                        allowDuplicates: false,
                        icon: "sagesBlessing.svg",
                        name: "Sage's Blessing",
                        description: "A Sage's blessing is preventing 35% of the damage you would ordinarily take."
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
                        if (ability.currentCooldown > 0.0) {
                            ability.currentCooldown -= 2.0
                        }
                    })
                }
            },

            onTick({ buff, target, caster, secondsElapsed, actualBattle }) {},

            onRemove({ buff, target, caster }) {}
        }
    },

    class_active_sage__mystic_bond: {
        duplicateTag: "class_active_sage__mystic_bond",
        icon: "sageMysticBond.svg",
        name: "Bond",
        description() {
            return `
        Use on an ally to form a mystical bond.  Whenever they are struck in combat, you regain <b>1%</b> of your lost
        Maximum Health.  If the bonded ally is under 50% health, you will lose 10% of your original maximum health as
        Health to automatically heal the struck ally for 10% of their original Maximum Health.  These effects can only
        occur once every <b>3</b> seconds.  You may reuse this ability at any time to place it on a different target.
        You may not use this on yourself and the bond cannot be broken without transferring it to another ally.`
        },
        constants: {
        },
        data: {
            duration: Infinity,
            totalDuration: Infinity,
            preventUse: function ({ buff, target, caster, actualBattle }) {
                setTimeout(function () {
                    caster.abilities.forEach((ability) => {
                        if (ability.id == "class_active_sage__mystic_bond") {
                            ability.currentCooldown = 0
                        }
                    })

                    removeBuff({ buff, target, caster, actualBattle })
                }, 1)
                return
            }
        },
        events: {
            onApply({ buff, target, caster, actualBattle }) {
                if (caster.id == target.id) {
                    buff.data.preventUse({ buff, target, caster, actualBattle })
                    return
                }

                let alreadyCastOnThisTarget = false

                actualBattle.units.forEach((friendlyUnit) => {
                    let buffsToRemove = []
                    friendlyUnit.buffs.forEach((thisBuff) => {
                        if (thisBuff.id == "class_active_sage__mystic_bond" && thisBuff.data?.caster == caster.id) {
                            if (friendlyUnit.id == target.id) {
                                alreadyCastOnThisTarget = true
                            } else {
                                buffsToRemove.push(thisBuff)
                            }
                        }
                    })
                    buffsToRemove.forEach((thisBuff) => {
                        setTimeout(function () {
                            removeBuff({ buff: thisBuff, target: friendlyUnit, caster, actualBattle })
                        }, 1)
                    })
                })

                if (alreadyCastOnThisTarget) {
                    buff.data.preventUse({ buff, target, caster, actualBattle })
                    return
                }

                buff.data.description = "Whenever you are struck in combat, the Sage who placed this bond upon you regains 1% of their lost Maximum Health.  This effect can only occur once every 5 seconds."
                buff.data.caster = caster.id
            },

            onTookDamage({ buff, attacker, defender, actualBattle, secondsElapsed, damageDealt }) {
                if (damageDealt <= 0 || !buff.data.caster || buff.data.casterUnit?.stats?.health <= 0) {
                    return
                }

                let casterUnit
                actualBattle.units.forEach((friendlyUnit) => {
                    if (friendlyUnit.id == buff.data.caster) {
                        casterUnit = friendlyUnit
                    }
                })

                if (!casterUnit) {
                    removeBuff({ buff, target: defender, actualBattle })
                    return
                } else if (casterUnit?.stats?.health <= 0) {
                    removeBuff({ buff, target: defender, caster: casterUnit, actualBattle })
                    return
                }

                if (!buff.stacksTimer || buff.stacksTimer === 0) {
                    const amountToIncreaseMaxHealthBy = 0.01 * casterUnit.stats.healthMaxOrig

                    casterUnit.stats.healthMax += amountToIncreaseMaxHealthBy
                    if (casterUnit.stats.healthMax > casterUnit.stats.healthMaxOrig) {
                        casterUnit.stats.healthMax = casterUnit.stats.healthMaxOrig
                    }

                    if ((defender.stats.health + 1) / (defender.stats.healthMax + 1) <= 0.5) {
                        const totalHeal = defender.stats.origStats.healthMax * 0.1
                        const damageToTake = casterUnit.stats.healthMax * 0.1

                        actualBattle.dealDamage(damageToTake, {
                            attacker: defender,
                            defender: casterUnit,
                            tickEvents: actualBattle.tickEvents,
                            historyStats: actualBattle.historyStats,
                            isMagic: true,
                            isTrueDamage: true,
                            customIcon: "sageMysticBond.svg"
                        })

                        actualBattle.healTarget(totalHeal, {
                            casterUnit,
                            defender,
                            tickEvents: actualBattle.tickEvents,
                            historyStats: actualBattle.historyStats,
                            healSource: buff
                        })
                    }

                    buff.stacksTimer = 3.0
                    buff.stacks = Math.ceil(buff.stacksTimer)
                    buff.icon = "sageMysticBondActive.svg"
                }
            },

            onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
                let casterUnit
                actualBattle.units.forEach((friendlyUnit) => {
                    if (friendlyUnit.id == buff.data.caster) {
                        casterUnit = friendlyUnit
                    }
                })

                if (!casterUnit || casterUnit?.stats?.health <= 0) {
                    removeBuff({ buff, target, caster, actualBattle })
                    return
                }

                if (buff.stacksTimer > 0) {
                    buff.stacksTimer -= secondsElapsed
                }
                if (buff.stacksTimer <= 0) {
                    buff.stacksTimer = undefined
                    buff.stacks = undefined
                    buff.icon = "sageMysticBond.svg"
                } else {
                    buff.stacks = Math.ceil(buff.stacksTimer)
                }
            },

            onRemove({ buff, target, caster }) {}
        }
    },

    class_passive_sage__ward: {
        duplicateTag: "class_passive_sage__ward",
        icon: "sageWard.svg",
        name: "Ward",
        description() {
            return `
        Passive class ability<br />
        Prevents you from being directly targeted unless there are no other targetable allies remaining in battle.
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
                        enemy.target = _.sample(
                            actualBattle.units.filter((thisFriendlyUnit) => {
                                return thisFriendlyUnit.id !== target.id
                            })
                        ).id
                    }
                }
            }
        }
    },

    class_trait_sage__sages_blessing: {
        duplicateTag: "class_trait_sage__sages_blessing",
        icon: "sagesBlessing.svg",
        name: "Sage's Blessing",
        description() {
            return `
        A Sage's blessing is preventing 15% of the damage you would ordinarily take.`
        },
        constants: {},
        data: {
            duration: 2.2, // intentionally 0.2 over
            totalDuration: 2.2, // intentionally 0.2 over
            allowDuplicates: false
        },
        events: {
            onApply({ buff, target, caster, actualBattle }) {
                target.stats.damageTaken -= 0.35
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
                target.stats.damageTaken += 0.35
            }
        }
    },

    class_trait_tactician: {
        duplicateTag: "class_trait_tactician",
        icon: "classTacticianSmall.png",
        name: "Class Trait: Tactician",
        description() {
            return `
        You gain +15% damage and +10% accuracy, except:<br />
        You lose 5% damage and 4% accuracy for every active ability slotted in your loadout beyond 3 active abilities.<br />
        You lose 5% damage and 4% accuracy for every passive passive slotted in your loadout beyond 3 passive abilities.<br />
        You have a 10% chance to negate damage, which cannot be reduced, prevented, or nullified.<br />
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
                            activeAbilityCount  += (ability.isPassive) ? 0 : 1
                        }
                    })

                    const damageBuff   = 0.15 - ((Math.max(0, passiveAbilityCount - 3) + Math.max(0, activeAbilityCount - 3)) * 0.05)
                    const accuracyBuff = 0.10 - ((Math.max(0, passiveAbilityCount - 3) + Math.max(0, activeAbilityCount - 3)) * 0.04)
                    
                    buff.custom = true
                    buff.data.custom = true

                    const damageBuffText   = (damageBuff   >= 0) ? `+${(damageBuff   * 100.0).toFixed(0)}` : `${(damageBuff   * 100.0).toFixed(0)}`
                    const accuracyBuffText = (accuracyBuff >= 0) ? `+${(accuracyBuff * 100.0).toFixed(0)}` : `${(accuracyBuff * 100.0).toFixed(0)}`

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

    class_active_tactician_rally: {
        duplicateTag: "class_active_tactician_rally",
        icon: "tacticianRally.svg",
        name: "Rally",
        description() {
            return `
        Cause all of your allies to target your target, even if they would otherwise be
        unable to change targets on their own.  All damage dealt to your target is increased
        by <b>25%</b> to <b>75%</b> depending on how many allies are in battle with you.<br />
        Lasts for 4 seconds.`
        },
        constants: {},
        data: {
            duration: 4,
            totalDuration: 4
        },
        events: {
            onApply({ buff, target, caster, actualBattle }) {

                const damageBonus = Math.min(0.5, (actualBattle.units.filter((thisFriendlyUnit) => {
                    return thisFriendlyUnit.id !== caster.id && !thisFriendlyUnit.isPacifist
                }).length * 0.05))

                // deal 25-75% more damage
                buff.data.amountAdded = 0.25 + damageBonus
                buff.data.description = `All damage dealt to this enemy is increased by ${buff.data.amountAdded * 100}%.`

                if (!caster.targetUnit) {
                    caster.target = _.sample(target.opposition)
                }

                if (target.stats.damageTaken == 0) {
                    // unless they're immune to damage
                    target.stats.damageTaken = 0
                } else if (target.stats.damageTaken < 1.0) {
                    // or unless they have damage absorption, then mutate it to X% of their absorption
                    // this way, a boss that normally takes 30% damage will take 45% during the buff (and not 80%) if the buff amount would be 50%
                    target.stats.damageTaken = target.stats.damageTaken * buff.data.amountAdded
                }
                target.stats.damageTaken += buff.data.amountAdded

                actualBattle.units.forEach((friendlyUnit) => {
                    if (!friendlyUnit.isStunned && !friendlyUnit.isPacifist) {
                        friendlyUnit.target = caster.target
                        friendlyUnit.tickMessage("Rallied!", "#448877", "tacticianRally", friendlyUnit)
                    }
                })

                target.tickMessage("Rally!", "#448877", "tacticianRally", target)
            },

            onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
                buff.duration -= secondsElapsed

                if (buff.duration < 0) {
                    removeBuff({ buff, target, caster, actualBattle })
                }
            },

            onRemove({ buff, target, caster }) {
                target.stats.damageTaken -= buff.data.amountAdded
            }
        }
    },

    class_passive_tactician__grit: {
        duplicateTag: "class_passive_tactician__grit",
        icon: "tacticianGrit.svg",
        name: "Grit",
        description() {
            return `
        Passive class ability<br />
        For every 5% Health you are missing from your original Maximum Health,
        your Defense and Magic Armor increases by +3%.<br />
        While equipped when you are a Tactician this is <b>always active</b>`
        },
        constants: {},
        data: {
            duration: Infinity,
            totalDuration: Infinity
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
                const missingHealthIncrements = CInt((1.0 - (target.stats.health / target.stats.healthMax)) / 0.05)
                buff.data.statsBoosted.defense = missingHealthIncrements * 0.03 * target.stats.origStats.defense
                buff.data.statsBoosted.magicArmor = missingHealthIncrements * 0.03 * target.stats.origStats.magicArmor

                buff.custom = true
                buff.data.custom = true
                buff.customText = `+${missingHealthIncrements * 3}%`

                // apply new bonuses
                target.stats.defense += buff.data.statsBoosted.defense
                target.stats.magicArmor += buff.data.statsBoosted.magicArmor
            },

            onRemove({ buff, target, caster }) {}
        }
    },

    class_trait_warmage: {
        duplicateTag: "class_trait_warmage",
        icon: "classWarMageSmall.png",
        name: "Class Trait: War Mage",
        description() {
            return `
        Whenever you are struck in combat, your maximum health is reduced by 1% of its original amount.  May cast hostile
        spells while wielding any style of weapon. Once per battle when you would otherwise die, you unleash a powerful
        blast through a Special Shift that stuns you and all enemies for 5 seconds and restores 20% of your health.
        Can reforge tridents.  Triple Attack Speed for tridents and tridents now deal 100% of your auto-attack damage
        as additional magic damage.  Double all stat benefits from amulets.<br />
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
            onApply({ buff, target, caster, actualBattle }) {
                buff.data.deathPrevent = 1
            },

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

            onBeforeDeath({ buff, target, actualBattle }) {
                if (buff?.data?.deathPrevent === 1) {
                    // pop "Spacial Shift" death prevent
                    buff.data.deathPrevent = 0

                    const newBuff = {
                        id: "stunned",
                        data: {
                            duration: 5,
                            totalDuration: 5,
                            icon: "warMageSpacialShift.svg",
                            name: "Stunned",
                            description: `You are stunned and can't take any actions or fight.`
                        }
                    }

                    // regain 20% health
                    target.stats.health = target.stats.healthMax * 0.2

                    // stun self
                    addBuff({ buff: newBuff, target, caster: target, actualBattle })
                    target.tickMessage("Disoriented!", "black", "warMageSpacialShift", target)

                    // stun all enemies
                    actualBattle.enemies.forEach((enemy) => {
                        addBuff({ buff: newBuff, target: enemy, caster: target, actualBattle })
                        enemy.tickMessage("Disoriented!", "black", "warMageSpacialShift", enemy)
                    })
                }
            },

            onTick({ buff, target, caster, secondsElapsed, actualBattle }) {},

            onRemove({ buff, target, caster }) {}
        }
    },

    class_active_warmage__weaken: {
        duplicateTag: "class_active_warmage__weaken",
        icon: "warmageWeaken.svg",
        name: "Weaken",
        description() {
            return `
        Your target enemy deals 50% less damage.<br />
        Lasts for 6 seconds.
        `
        },
        constants: {},
        data: {
            duration: 6,
            totalDuration: 6
        },
        events: {
            onApply({ buff, target, caster, actualBattle }) {
                target.stats.damageOutput -= 0.5
            },

            onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
                buff.duration -= secondsElapsed

                if (buff.duration < 0) {
                    removeBuff({ buff, target, caster, actualBattle })
                }
            },

            onRemove({ buff, target, caster }) {
                target.stats.damageOutput += 0.5
            }
        }
    },

    class_passive_warmage__glorious_destiny: {
        duplicateTag: "class_passive_warmage__glorious_destiny",
        icon: "warmageGloriousDestiny.svg",
        name: "Glorious Destiny",
        description() {
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

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {}
        }
    },

    class_trait_wizard: {
        duplicateTag: "class_trait_wizard",
        icon: "classWizardSmall.png",
        name: "Class Trait: Wizard",
        description({ active, casterStats }) {
            if (active) {
                return `
                Can reforge wands, tomes, and orbs.  Receive 25% additional Magic XP from spellcasting and reading
                codexes.  Double Magic Power benefit from tomes and orbs.  When entering battle, your Focus is
                increased by half of your Magic Power (your Focus is now <b>${casterStats.focus}</b>).  Maximum Health
                is reduced by half.  The Maximum Health cost of all spells is reduced by half.<br />
                While you are a Wizard this is <b>always active</b>`
            }
            
            return `
                Can reforge wands, tomes, and orbs.  Receive 25% additional Magic XP from spellcasting and reading
                codexes.  Double Magic Power benefit from tomes and orbs.  When entering battle, your Focus is set to
                half of your Magic Power.  Maximum Health is reduced by half.  The Maximum Health cost of all spells is
                reduced by half.<br />
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
            onApply({ buff, target, caster, actualBattle }) {
                const buffBase = buff.constants && buff.constants.constants ? buff.constants : lookupBuff(buff.id)
                target.stats.focus += Math.ceil(target.stats.magicPower * 0.5)
                
                buff.custom = buff.data.custom = true
                buff.customText = `+${target.stats.focus}`
                if (buffBase) {
                    buff.description = buffBase.description({ active: true, casterStats: caster.stats })
                }
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {},

            onRemove({ buff, target, caster }) {}
        }
    },

    class_active_wizard__time_warp: {
        duplicateTag: "class_active_wizard__time_warp",
        icon: "wizardTimeWarp.svg",
        name: "Time Warp",
        description() {
            return `
        Speeds up time for you and your allies, lowering ability cooldowns for as long as
        you channel this spell.  Does not modify effects that last over time such as Mending
        Waters or Poison.  As long as you channel this spell, will lose 2% of your Health
        and 0.75% of your Maximum Health per second.<br />
        This is a <b>channeled</b> spell and will last for as long as you maintain it.`
        },
        constants: {
        },
        data: {
            duration: Infinity,
            totalDuration: Infinity,
            hideBuff: true
        },
        events: {
            onApply({ buff, target, caster, actualBattle }) {
                const existingTimeWarp = caster.findBuff("class_active_wizard__time_warp_caster")

                if (existingTimeWarp) {
                    // Time Warp is already active, stop channelling it

                    removeBuff({ buff: existingTimeWarp, target: caster, caster, actualBattle })
                } else {
                    // Time Warp is not active, start channeling it

                    if (caster.stats.health <= 100 || caster.stats.healthMax <= 100) {
                        return
                    }

                    let otherTimeWarpCasterExists = false
                    actualBattle.units.forEach((friendlyUnit) => {
                        if (friendlyUnit.id !== caster.id) {
                            const ally_existing_time_warp_buff = friendlyUnit.findBuff("class_active_wizard__time_warp_caster")
                            if (ally_existing_time_warp_buff) {
                                otherTimeWarpCasterExists = true
                            }
                        }
                    })

                    if (otherTimeWarpCasterExists) {
                        return
                    }

                    caster.applyBuffTo({
                        buff: caster.generateBuff({
                            buffId: "class_active_wizard__time_warp_caster"
                        }),
                        target: caster
                    })
                }
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {},
            onRemove({ buff, target, caster }) {}
        }
    },

    class_active_wizard__time_warp_caster: {
        duplicateTag: "class_active_wizard__time_warp_caster",
        icon: "wizardTimeWarp.svg",
        name: "Time Warp",
        description() {
            return `
        You are warping time...<br />
        You are losing health maintaining this channeled spell.<br />
        This is a <b>channeled</b> spell and will last for as long as you maintain it.`
            /*return `
        You are warping time...<br />
        Halves your attack speed.  Your ability cooldowns flow in the opposite direction.
        You are losing health maintaining this channeled spell.<br />
        This is a <b>channeled</b> spell and will last for as long as you maintain it.` */
        },
        constants: {
        },
        data: {
            duration: Infinity,
            totalDuration: Infinity
        },
        events: {
            onApply({ buff, target, caster, actualBattle }) {
                //buff.data.attackSpeedOriginal = target.stats.origStats.attackSpeed
                //target.stats.attackSpeed -= buff.data.attackSpeedOriginal / 2

                caster.tickMessage("Warping Time", "#445599", "chatBubble", caster)
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                if (caster.stats.health <= 100 || caster.stats.healthMax <= 100) {
                    removeBuff({ buff, target, caster, actualBattle })
                    return
                }

                actualBattle.units.forEach((friendlyUnit) => {
                    //if (friendlyUnit.id !== caster.id) {
                        const ally_existing_time_warp_buff = friendlyUnit.findBuff("class_active_wizard__time_warp_target")
                        if (!ally_existing_time_warp_buff) {
                            caster.applyBuffTo({
                                buff: caster.generateBuff({
                                    buffId: "class_active_wizard__time_warp_target"
                                }),
                                target: friendlyUnit
                            })

                            if (friendlyUnit.id !== caster.id) {
                                friendlyUnit.tickMessage("Time Warp!", "#445599", "wizardTimeWarpActive", friendlyUnit)
                            }
                        }
                    //}
                })

                //if (caster.abilities) {
                //    caster.abilities.forEach((ability) => {
                //        if (ability.constants && ability.constants.buffs && ability.constants.buffs.length == 1 && ability.constants.cooldown > 0) {
                //            ability.currentCooldown += secondsElapsed * 2.0
                //        }
                //    })
                //}

                caster.stats.health -= caster.stats.origStats.healthMax * secondsElapsed * 0.02
                caster.stats.healthMax -= caster.stats.origStats.healthMax * secondsElapsed * 0.0075
                if (caster.stats.health > caster.stats.healthMax) {
                    caster.stats.health = caster.stats.healthMax
                }
                if (caster.stats.health <= 100 || caster.stats.healthMax <= 100) {
                    caster.stats.health = caster.stats.healthMax = 100
                }
            },

            onRemove({ buff, target, caster, actualBattle }) {
                target.stats.attackSpeed += buff.data.attackSpeedOriginal * 2

                actualBattle.units.forEach((friendlyUnit) => {
                    const ally_existing_time_warp_buff = friendlyUnit.findBuff("class_active_wizard__time_warp_target")
                    if (ally_existing_time_warp_buff) {
                        removeBuff({ buff: ally_existing_time_warp_buff, target: friendlyUnit, caster, actualBattle })
                    }
                })

                caster.tickMessage("Exhausted!", "#885599", "chatBubble", caster)
            }
        }
    },

    class_active_wizard__time_warp_target: {
        duplicateTag: "class_active_wizard__time_warp_target",
        icon: "wizardTimeWarpActive.svg",
        name: "Time Warp",
        description() {
            return `
        Time is being warped around you, reducing your ability cooldown time.`
        },
        constants: {
        },
        data: {
            duration: Infinity,
            totalDuration: Infinity
        },
        events: {
            onApply({ buff, target, caster, actualBattle }) {
                //buff.data.attackSpeedOriginal = target.stats.origStats.attackSpeed
                //target.stats.attackSpeed += buff.data.attackSpeedOriginal
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                if (target.abilities) {
                    target.abilities.forEach((ability) => {
                        if (ability.currentCooldown && ability.currentCooldown > 0) {
                            ability.currentCooldown -= secondsElapsed
                        }
                    })
                }
            },

            onRemove({ buff, target, caster }) {
                //target.stats.attackSpeed -= buff.data.attackSpeedOriginal
            }
        }
    },

    class_passive_wizard__summon_familiar: {
        duplicateTag: "class_passive_wizard__summon_familiar",
        icon: "wizardSummonFamiliar.svg",
        name: "Summon Familiar",
        description() {
            return `
        Passive class ability<br />
        You summon a familiar to battle based on whatever you have equipped in your offhand.<br />
        While equipped when you are a Wizard this is <b>always active</b>`
        },
        constants: {
        },
        data: {
            duration: Infinity,
            totalDuration: Infinity,
            // we erase this buff in the first tick anyway, so don't even show it to reduce flickering
            hideBuff: true
        },
        events: {
            onApply({ buff, target, caster, actualBattle }) {},

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                if (!buff.data.summonedFamiliarYet) {
                    buff.data.summonedFamiliarYet = true

                    let summonType = ""

                    if (target.offHandType === "orb") {
                        summonType = "Orb"
                    } else if (target.offHandType === "tome") {
                        summonType = "Tome"
                    } else if (target.offHandType === "shield" && target.offHandIsMagic) {
                        summonType = "Spirit"
                    } else {
                        return
                    }

                    const wizardFamiliar = {
                        owner: target.id + "_companion",
                        id: uuid.v4(),
                        tickOffset: 0,
                        isNPC: true,
                        isCompanion: true,
                        isSoloCompanion: false
                    }

                    wizardFamiliar.icon = `wizardSummonFamiliar${summonType}.svg`
                    wizardFamiliar.name = target.name + "'s " + summonType.toLowerCase(),
                    wizardFamiliar.stats = {
                        attack: 0.001,
                        attackMax: 0.001,
                        attackSpeed: 0.001,
                        accuracy: 0.001,
                        health: target.stats.healthMax * 1.35,
                        healthMax: target.stats.healthMax * 1.35,
                        defense: target.stats.defense * 0.65,
                        armor: target.stats.armor * 0.65,
                        magicArmor: target.stats.magicArmor * 0.65,
                        magicPower: target.stats.magicPower * 0.5,
                        healingPower: target.stats.healingPower * 0.75,
                        damageTaken: 1,
                        damageOutput: 1
                    }
                    wizardFamiliar.buffs = []

                    if (summonType == "Orb") {
                        // skirmisher

                        wizardFamiliar.stats.attack = target.stats.magicPower * 0.3
                        wizardFamiliar.stats.attackMax = target.stats.magicPower * 0.8
                        wizardFamiliar.stats.attackSpeed = 0.6
                        wizardFamiliar.stats.accuracy = target.stats.magicPower

                        // multiple attack logic
                        wizardFamiliar.buffs.push({
                            id: "companion_skeletal_warrior",
                            data: {
                                duration: Infinity,
                                totalDuration: Infinity,
                                allowDuplicates: false,
                                sourceId: caster.id,
                                caster: caster.id,
                                icon: wizardFamiliar.icon,
                                name: `${summonType} Familiar`,
                                description: ``,
                                duplicateTag: "companion_skeletal_warrior",
                                level: 2,
                                hideBuff: true
                            }
                        })
                    }

                    if (summonType == "Tome") {
                        // healer

                        // multiple healer logic
                        wizardFamiliar.buffs.push({
                            id: "companion_healer",
                            data: {
                                duration: Infinity,
                                totalDuration: Infinity,
                                allowDuplicates: false,
                                sourceId: caster.id,
                                caster: caster.id,
                                icon: wizardFamiliar.icon,
                                name: `${summonType} Familiar`,
                                description: ``,
                                duplicateTag: "companion_healer",
                                level: 2,
                                hideBuff: true
                            }
                        })
                    }

                    if (summonType == "Spirit") {
                        // defender
                        wizardFamiliar.stats.armor = target.stats.armor * 1.25
                        wizardFamiliar.stats.health = target.stats.healthMax * 1.75
                        wizardFamiliar.stats.healthMax = target.stats.healthMax * 1.75

                        // taunt
                        wizardFamiliar.buffs.push({
                            id: "companion_taunt",
                            data: {
                                duration: Infinity,
                                totalDuration: Infinity,
                                name: "companion taunt",
                                icon: "taunt.svg",
                                timeTillCharge: 0.4,
                                level: buff.data.level,
                                hideBuff: true
                            }
                        })

                        // evasive maneuvers
                        wizardFamiliar.buffs.push({
                            id: "companion_pig_logic_lny",
                            data: {
                                duration: Infinity,
                                totalDuration: Infinity,
                                allowDuplicates: false,
                                sourceId: caster.id,
                                caster: caster.id,
                                icon: wizardFamiliar.icon,
                                name: `${summonType} Familiar`,
                                description: ``,
                                duplicateTag: "companion_pig_logic_lny",
                                level: 2,
                                hideBuff: true
                            }
                        })
                    }

                    // stat adjuster based on party size (36% at group size 10, 56% at group size 5, 100% at group size 1)
                    const partySizeAdjustment = 1 - ((actualBattle.units.length - 1)/((actualBattle.units.length - 1) + 5))

                    wizardFamiliar.stats.attack *= partySizeAdjustment
                    wizardFamiliar.stats.attackMax *= partySizeAdjustment
                    wizardFamiliar.stats.accuracy *= partySizeAdjustment
                    wizardFamiliar.stats.armor *= partySizeAdjustment
                    wizardFamiliar.stats.health *= partySizeAdjustment
                    wizardFamiliar.stats.healthMax *= partySizeAdjustment

                    // add the familiar unit to combat
                    actualBattle.addUnit(wizardFamiliar)
                    buff.data.familiarUnit = wizardFamiliar.id

                    // end this buff
                    removeBuff({ buff, target, caster, actualBattle })
                }
            },

            onRemove({ buff, target, caster }) {}
        }
    }
}
