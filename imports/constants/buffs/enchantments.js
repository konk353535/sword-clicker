import lodash from "lodash"
import _ from "underscore"

import { addBuff, lookupBuff, removeBuff, removeBuffWithMessage } from "../../battleUtils"
import { CDbl } from "../../utils.js"

export const ENCHANTMENT_BUFFS = {
    baby_earth_fox: {
        duplicateTag: "baby_earth_fox", // Used to stop duplicate buffs
        icon: "babyEarthFox.svg",
        name: "earth fox",
        description() {
            return `Taunts every 15 seconds`
        },
        constants: {},
        data: {
            duration: Infinity,
            totalDuration: Infinity,
            isEnchantment: true
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {},

            onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
                if (buff.data.timeTillCharge > 0) {
                    buff.data.timeTillCharge -= secondsElapsed
                } else {
                    buff.data.timeTillCharge = 15
                    const targetsToTaunt = actualBattle.enemies.filter((enemy) => {
                        return enemy.target !== target.id
                    })

                    if (targetsToTaunt.length > 0) {
                        const targetToTaunt = lodash.sample(targetsToTaunt)
                        targetToTaunt.target = target.id
                    }
                }

                buff.stacks = Math.round(buff.data.timeTillCharge)
            },

            onRemove({ buff, target, caster }) {}
        }
    },

    baby_water_fox: {
        duplicateTag: "baby_water_fox", // Used to stop duplicate buffs
        icon: "babyWaterFox.svg",
        name: "water fox",
        description() {
            return `Heals for 50% of magic power every 5 seconds`
        },
        constants: {},
        data: {
            duration: Infinity,
            totalDuration: Infinity,
            isEnchantment: true
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {},

            onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
                if (buff.data.timeTillCharge > 0) {
                    buff.data.timeTillCharge -= secondsElapsed
                } else {
                    buff.data.timeTillCharge = 5
                    const targetToHeal = lodash.sample(actualBattle.units)
                    actualBattle.healTarget(target.stats.magicPower * 0.5, {
                        caster: target,
                        target: targetToHeal,
                        tickEvents: actualBattle.tickEvents,
                        historyStats: actualBattle.historyStats,
                        healSource: buff
                    })
                }

                buff.stacks = Math.round(buff.data.timeTillCharge)
            },

            onRemove({ buff, target, caster }) {}
        }
    },

    baby_fire_fox: {
        duplicateTag: "baby_fire_fox", // Used to stop duplicate buffs
        icon: "babyFireFox.svg",
        name: "fire fox",
        description() {
            return `Deals 50% of magic power every 5 seconds`
        },
        constants: {},
        data: {
            duration: Infinity,
            totalDuration: Infinity,
            isEnchantment: true
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {},

            onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
                if (buff.data.timeTillCharge > 0) {
                    buff.data.timeTillCharge -= secondsElapsed
                } else {
                    buff.data.timeTillCharge = 5
                    const targetToAttack = lodash.sample(actualBattle.enemies)
                    actualBattle.dealDamage(target.stats.magicPower * 0.5, {
                        attacker: target,
                        defender: targetToAttack,
                        isMagic: true,
                        tickEvents: actualBattle.tickEvents,
                        historyStats: actualBattle.historyStats,
                        customIcon: buff.data.icon,
                        source: "Fire Fox"
                    })
                }

                buff.stacks = Math.round(buff.data.timeTillCharge)
            },

            onRemove({ buff, target, caster }) {}
        }
    },

    /*
  baby_fox__outdated: {
    duplicateTag: 'baby_fox__outdated', // Used to stop duplicate buffs
    icon: 'babyFox.svg',
    name: 'babyFox',
    description() {
      return `Summons a baby fox`;
    },
    constants: {
    },
    data: {
      isEnchantment: true
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {
      },

      onTick({buff, target, caster, secondsElapsed, actualBattle}) {
        if (!buff.data.isSpawned) {
          buff.data.isSpawned = true;
          buff.data.hideBuff = true;
          // Spawn our fox
          const foxToSpawn = lodash.sample(['fire', 'water', 'air', 'earth']);
          let fox = {
            owner: target.id,
            id: uuid.v4(),
            tickOffset: 0,
          };

          if (foxToSpawn === 'fire') {
            fox.icon = 'babyFireFox.svg';
            fox.name = 'Fire fox';
            fox.stats = {
              attack: 1,
              attackMax: 1,
              attackSpeed: 1,
              accuracy: 1,
              health: target.stats.healthMax * 0.1,
              healthMax: target.stats.healthMax * 0.1,
              defense: target.stats.defense * 0.5,
              armor: target.stats.armor * 0.5,
              magicArmor: target.stats.magicArmor * 0.5,
              magicPower: target.stats.magicPower,
              damageTaken: 1
            };
            fox.buffs = [{
              id: 'baby_fire_fox',
              data: {
                duration: Infinity,
                totalDuration: Infinity,
                name: 'baby fire fox',
                timeTillCharge: 5,
                icon: 'babyFireFox.svg'
              }
            }]
          } else if (foxToSpawn === 'earth') {
            fox.icon = 'babyEarthFox.svg';
            fox.name = 'Earth fox';
            fox.stats = {
              attack: target.stats.attackMax * 0.05,
              attackMax: target.stats.attackMax * 0.05,
              attackSpeed: 0.5,
              accuracy: target.stats.accuracy * 0.5,
              health: target.stats.healthMax * 0.25,
              healthMax: target.stats.healthMax * 0.25,
              defense: target.stats.defense,
              armor: target.stats.armor,
              magicArmor: target.stats.magicArmor,
              magicPower: target.stats.magicPower * 0.5,
              damageTaken: 1
            };
            fox.buffs = [{
              id: 'baby_earth_fox',
              data: {
                duration: Infinity,
                totalDuration: Infinity,
                name: 'baby earth fox',
                timeTillCharge: 2,
                icon: 'babyEarthFox.svg'
              }
            }]
          } else if (foxToSpawn === 'air') {
            fox.icon = 'babyAirFox.svg';
            fox.name = 'Air fox';
            fox.stats = {
              attack: target.stats.attackMax * 0.1,
              attackMax: target.stats.attackMax * 0.1,
              attackSpeed: 1,
              accuracy: target.stats.accuracy,
              health: target.stats.healthMax * 0.15,
              healthMax: target.stats.healthMax * 0.15,
              defense: target.stats.defense * 0.6,
              armor: target.stats.armor * 0.6,
              magicArmor: target.stats.magicArmor * 0.6,
              magicPower: target.stats.magicPower * 0.6,
              damageTaken: 1
            };
            fox.buffs = [];
          } else if (foxToSpawn === 'water') {
            fox.icon = 'babyWaterFox.svg';
            fox.name = 'Water fox';
            fox.stats = {
              attack: 1,
              attackMax: 1,
              attackSpeed: 0.001,
              accuracy: 1,
              health: target.stats.healthMax * 0.1,
              healthMax: target.stats.healthMax * 0.1,
              defense: target.stats.defense * 0.5,
              armor: target.stats.armor * 0.5,
              magicArmor: target.stats.magicArmor * 0.5,
              magicPower: target.stats.magicPower,
              healingPower: target.stats.healingPower,
              damageTaken: 1
            };
            fox.buffs = [{
              id: 'baby_water_fox',
              data: {
                duration: Infinity,
                totalDuration: Infinity,
                name: 'baby water fox',
                icon: 'babyWaterFox.svg',
                timeTillCharge: 5                
              }
            }]
          }

          actualBattle.addUnit(fox);
        }
      },

      onRemove({ buff, target }) {
      }
    }
  },
  */

    bison_axe: {
        duplicateTag: "bison_axe", // Used to stop duplicate buffs
        icon: "bisonAxe.svg",
        name: "bison axe",
        description() {
            return `Every 5 seconds an auto-attacks becomes charged. Dealing its damage to all enemies.`
        },
        constants: {},
        data: {
            duration: Infinity,
            totalDuration: Infinity,
            isEnchantment: true,
            timeTillCharge: 5
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {},

            onTick({ secondsElapsed, buff }) {
                if (buff.data.timeTillCharge > 0) {
                    buff.data.timeTillCharge -= secondsElapsed
                    buff.stacks = Math.round(buff.data.timeTillCharge)
                }
            },

            onDidDamage({ buff, defender, attacker, actualBattle, damageDealt }) {
                if (buff.data.timeTillCharge <= 0) {
                    buff.data.timeTillCharge = 5
                    actualBattle.enemies.forEach((enemy) => {
                        if (enemy.id !== defender.id) {
                            actualBattle.dealDamage(damageDealt, {
                                attacker: attacker,
                                defender: enemy,
                                // Need to make sure this is required
                                isTrueDamage: true,
                                tickEvents: actualBattle.tickEvents,
                                historyStats: actualBattle.historyStats,
                                customIcon: buff.data.icon,
                                source: "Bison Axe Burst"
                            })
                        }
                    })
                }
            },

            onRemove({ buff, target, caster }) {}
        }
    },

    krakens_tentacle: {
        duplicateTag: "krakens_tentacle", // Used to stop duplicate buffs
        icon: "tentacle.svg",
        name: "kraken's tentacle",
        description() {
            return `Each auto-attack gives 1 charge.  At 20 charges increases attack speed by 50% for 3 seconds.`
        },
        constants: {},
        data: {
            duration: Infinity,
            totalDuration: Infinity,
            isEnchantment: true
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {
                buff.data.charges = 0
            },

            onDidDamage({ buff, attacker }) {
                if (!buff.data.isActive) {
                    buff.data.charges += 1
                    buff.stacks = buff.data.charges
                }

                if (buff.data.charges >= 20 && !buff.data.isActive) {
                    attacker.stats.attackSpeed *= 1.5
                    buff.data.timeTillEnd = 3
                    buff.data.isActive = true
                    buff.stacks = undefined
                    buff.icon = "tentacleRed.svg"
                }
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                if (buff.data.isActive) {
                    buff.data.timeTillEnd -= secondsElapsed
                    if (buff.data.timeTillEnd <= 0) {
                        buff.data.isActive = false
                        buff.data.charges = 0
                        target.stats.attackSpeed /= 1.5
                        buff.icon = "tentacle.svg"
                    }
                }
            },

            onRemove({ buff, target, caster }) {}
        }
    },

    rich_snake_skin: {
        duplicateTag: "rich_snake_skin", // Used to stop duplicate buffs
        icon: "richSnakeSkin.svg",
        name: "rich snake skin",
        description() {
            return `Converts 10% of armor into defense.`
        },
        constants: {},
        data: {
            duration: Infinity,
            totalDuration: Infinity,
            isEnchantment: true
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {
                const amountToAdd = target.stats.armor * 0.1
                buff.data.defense = amountToAdd
                target.stats.defense += buff.data.defense
                buff.stacks = Math.round(buff.data.defense)
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {},

            onRemove({ buff, target, caster }) {
                target.stats.defense -= buff.data.defense
            }
        }
    },

    opal_chest_plate: {
        duplicateTag: "opal_chest_plate", // Used to stop duplicate buffs
        icon: "opalChestPlate.png",
        name: "opal chest plate",
        description() {
            return `
        Your magic regeneration rate increases by your Magic skill level for all pools.`
        },
        constants: {},
        data: {
            duration: Infinity,
            totalDuration: Infinity,
            isEnchantment: true
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {
                target.stats.magicRegenerationExtra += target.stats.origStats.magicPower
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {},

            onRemove({ buff, target, caster }) {
                target.stats.magicRegenerationExtra -= target.stats.origStats.magicPower
            }
        }
    },

    frankensteins_heart: {
        duplicateTag: "frankensteins_heart", // Used to stop duplicate buffs
        icon: "frankensteinsHeart.svg",
        name: "frankenstein's heart",
        description() {
            return `Increases attack by 1% (of max attack) every 7 seconds. <br />Caps at +35% damage.`
        },
        constants: {},
        data: {
            duration: Infinity,
            totalDuration: Infinity,
            isEnchantment: true,
            totalTime: 0,
            totalDamage: 0
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {
                buff.data.totalTime = 0
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                buff.data.totalTime += secondsElapsed
                if (Math.ceil(buff.data.totalTime) % 7 === 0) {
                    target.stats.attack -= buff.data.totalDamage
                    target.stats.attackMax -= buff.data.totalDamage
                    // Extra damage
                    const roundedTime = Math.ceil(buff.data.totalTime / 7)
                    const extraDamagePercentage = roundedTime < 35 ? roundedTime : 35
                    buff.data.totalDamage = target.stats.attackMax * (extraDamagePercentage / 100)
                    target.stats.attackMax += buff.data.totalDamage
                    target.stats.attack += buff.data.totalDamage
                    buff.stacks = Math.round(buff.data.totalDamage)
                }
            },

            onRemove({ buff, target, caster }) {
                target.stats.attack -= buff.data.totalDamage
                target.stats.attackMax -= buff.data.totalDamage
            }
        }
    },

    bloody_plate_legs: {
        duplicateTag: "bloody_plate_legs", // Used to stop duplicate buffs
        icon: "bloodyPlatelegs.png",
        name: "bloody plate legs",
        description() {
            return `10% chance on hit to inflict 3s bleed.<br />(10% of max damage / second)`
        },
        constants: {},
        data: {
            duration: Infinity,
            totalDuration: Infinity,
            isEnchantment: true
        },
        events: {
            onApply({ buff, target, caster, actualBattle }) {},

            onDidDamage({ buff, defender, attacker, actualBattle }) {
                const constants =
                    buff.constants && buff.constants.constants
                        ? buff.constants.constants
                        : lookupBuff(buff.id).constants
                const bleedChance = 0.1

                if (Math.random() <= bleedChance) {
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
            },

            onTick({ buff, target, caster, secondsElapsed, actualBattle }) {},

            onRemove({ buff, target, caster }) {}
        }
    },

    living_helmet: {
        duplicateTag: "living_helmet", // Used to stop duplicate buffs
        icon: "livingHelmet.png",
        name: "living helmet",
        description() {
            return `When above 75% health living helmet takes over: granting +10 defense and healing allies for 5hp when you take damage`
        },
        constants: {},
        data: {
            duration: Infinity,
            totalDuration: Infinity,
            isEnchantment: true,
            isActive: false,
            hideBuff: true
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {},

            onTookDamage({ buff, attacker, defender, actualBattle, secondsElapsed, damageDealt }) {
                if (buff.data.isActive) {
                    actualBattle.units.forEach((unit) => {
                        if (unit.id !== defender.id) {
                            actualBattle.healTarget(5, {
                                caster: defender,
                                target: unit,
                                tickEvents: actualBattle.tickEvents,
                                historyStats: actualBattle.historyStats,
                                healSource: buff
                            })
                        }
                    })
                }
            },

            onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
                const decimal = target.stats.health / target.stats.healthMax
                if (decimal >= 0.75 && !buff.data.isActive) {
                    buff.data.isActive = true
                    buff.data.hideBuff = false
                    target.stats.defense += 10
                } else if (decimal < 0.75 && buff.data.isActive) {
                    buff.data.isActive = false
                    buff.data.hideBuff = true
                    target.stats.defense -= 10
                }
            },

            onRemove({ buff, target, caster }) {}
        }
    },

    shadow_knife: {
        duplicateTag: "shadow_knife", // Used to stop duplicate buffs
        icon: "shadowKnife.svg",
        name: "shadow knife",
        description() {
            return `Reduce cooldown of blade spin by 0.5s for each successful auto-attack.`
        },
        constants: {
            accuracyDecimal: 0.85
        },
        data: {
            duration: Infinity,
            totalDuration: Infinity,
            isEnchantment: true
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {},

            onDidDamage({ buff, defender, attacker, actualBattle, rawDamage }) {
                attacker.abilities.forEach((ability) => {
                    if (ability.id === "blade_spin" && ability.currentCooldown > 0) {
                        ability.currentCooldown -= 0.5
                    }
                })
            },

            onTick({ buff, target, caster, secondsElapsed, actualBattle }) {},

            onRemove({ buff, target, caster }) {}
        }
    },

    smoke_dagger: {
        duplicateTag: "smoke_dagger", // Used to stop duplicate buffs
        icon: "smokeDagger.svg",
        name: "smoke dagger",
        description() {
            return `Apply 25% accuracy debuff to enemies damaged by bladespin.`
        },
        constants: {
            accuracyDecimal: 0.75
        },
        data: {
            duration: Infinity,
            totalDuration: Infinity,
            isEnchantment: true
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {},

            onDidDamage({ buff, defender, attacker, actualBattle, rawDamage }) {},

            onTick({ buff, target, caster, secondsElapsed, actualBattle }) {},

            onRemove({ buff, target, caster }) {}
        }
    },

    // todo: does this work?
    smoke_dagger_debuff: {
        duplicateTag: "smoke", // Used to stop duplicate buffs
        icon: "smoke.svg",
        name: "smoke",
        description() {
            return `Reduce accuracy`
        },
        constants: {
            accuracyDecimal: 0.75
        },
        data: {
            duration: 7,
            totalDuration: 7,
            isEnchantment: true
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {
                target.stats.accuracy -= buff.data.accuracyReduction
            },

            onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
                buff.duration -= secondsElapsed
                if (buff.duration <= 0) {
                    removeBuff({ target, buff, caster: target, actualBattle })
                }
            },

            onRemove({ buff, target, caster }) {
                target.stats.accuracy += buff.data.accuracyReduction
            }
        }
    },

    axe_cleave: {
        duplicateTag: "axe_cleave", // Used to stop duplicate buffs
        icon: "boneKingsAxe.svg",
        name: "axe cleave",
        description() {
            return `Deal 40% weapon damage to another enemy.`
        },
        constants: {
            damageDecimal: 0.4
        },
        data: {
            duration: Infinity,
            totalDuration: Infinity,
            isEnchantment: true
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {},

            onDidDamage({ buff, defender, attacker, actualBattle, rawDamage }) {
                const constants =
                    buff.constants && buff.constants.constants
                        ? buff.constants.constants
                        : lookupBuff(buff.id).constants
                const baseDamage = attacker.stats.attack
                const totalDamage = rawDamage * constants.damageDecimal

                let target
                actualBattle.enemies.forEach((enemy) => {
                    if (!target && enemy.id !== defender.id) {
                        target = enemy
                    }
                })

                if (target) {
                    actualBattle.dealDamage(totalDamage, {
                        attacker,
                        defender: target,
                        tickEvents: actualBattle.tickEvents,
                        historyStats: actualBattle.historyStats,
                        customIcon: buff.data.icon,
                        source: "Bone King Axe Cleave"
                    })
                }
            },

            onTick({ buff, target, caster, secondsElapsed, actualBattle }) {},

            onRemove({ buff, target, caster }) {}
        }
    },

    axe_cleave__prismatic_battle_axe: {
        duplicateTag: "axe_cleave__prismatic_battle_axe", // Used to stop duplicate buffs
        icon: "prismaticBattleAxe.png",
        name: "axe cleave",
        description() {
            return `Deal 40% weapon damage to another enemy.`
        },
        constants: {
            damageDecimal: 0.4
        },
        data: {
            duration: Infinity,
            totalDuration: Infinity,
            isEnchantment: true
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {},

            onDidDamage({ buff, defender, attacker, actualBattle, rawDamage }) {
                const constants =
                    buff.constants && buff.constants.constants
                        ? buff.constants.constants
                        : lookupBuff(buff.id).constants
                const baseDamage = attacker.stats.attack
                const totalDamage = rawDamage * constants.damageDecimal

                let target
                actualBattle.enemies.forEach((enemy) => {
                    if (!target && enemy.id !== defender.id) {
                        target = enemy
                    }
                })

                if (target) {
                    actualBattle.dealDamage(totalDamage, {
                        attacker,
                        defender: target,
                        tickEvents: actualBattle.tickEvents,
                        historyStats: actualBattle.historyStats,
                        customIcon: "battleAxe.svg",
                        source: "Prismatic Axe Cleave"
                    })
                }
            },

            onTick({ buff, target, caster, secondsElapsed, actualBattle }) {},

            onRemove({ buff, target, caster }) {}
        }
    },

    magic_blade: {
        duplicateTag: "magic_blade", // Used to stop duplicate buffs
        icon: "magicBlade.svg",
        name: "enchanted weapon",
        description() {
            return `Deals 25% auto-attack damage as additional magic damage.  This amount is increased by your magic power.`
        },
        constants: {
            damageDecimal: 0.25,
            bonusMPMultiplier: 1.0
        },
        data: {
            duration: Infinity,
            totalDuration: Infinity,
            isEnchantment: true
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {},

            onDidDamage({
                buff,
                attacker,
                defender,
                actualBattle,
                rawDamage,
                damageDealt,
                originalAutoAttack,
                secondsElapsed
            }) {
                const buffConsts =
                    buff.constants && buff.constants.constants
                        ? buff.constants.constants
                        : lookupBuff(buff.id).constants
                const totalDamage =
                    rawDamage * ((attacker?.currentClass?.id === "warmage") ? 1.3333 : buffConsts.damageDecimal) + attacker.stats.magicPower * buffConsts.bonusMPMultiplier
                    
                actualBattle.dealDamage(totalDamage, {
                    attacker,
                    defender,
                    isMagic: true,
                    tickEvents: actualBattle.tickEvents,
                    historyStats: actualBattle.historyStats,
                    customIcon: buff.data.icon,
                    source: "Enchanted Weapon"
                })
            },

            onTick({ buff, target, caster, secondsElapsed, actualBattle }) {},

            onRemove({ buff, target, caster }) {}
        }
    },

    druidic_hat: {
        duplicateTag: "druidic_hat", // Used to stop duplicate buffs
        icon: "druidsHat.svg",
        name: "druids blessing",
        description() {
            return `Emergency heal an ally below 30% health for 250% MP`
        },
        constants: {
            healMagicPower: 2.5
        },
        data: {
            duration: Infinity,
            totalDuration: Infinity,
            isEnchantment: true
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {},

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                if (!buff.data.timeTillHeal) {
                    buff.data.timeTillHeal = 1.5
                } else {
                    buff.data.timeTillHeal -= secondsElapsed
                }

                if (buff.data.timeTillHeal <= 0) {
                    // Heal a random ally
                    let lowestHp = Infinity
                    let targetUnit
                    actualBattle.units.forEach((unit) => {
                        const hpPercentage = unit.stats.health / unit.stats.healthMax
                        if (hpPercentage < lowestHp) {
                            lowestHp = hpPercentage
                            targetUnit = unit
                        }
                    })

                    if (targetUnit && lowestHp <= 0.3 && targetUnit !== target) {
                        const totalHeal = target.stats.magicPower * 2.5
                        actualBattle.healTarget(totalHeal, {
                            caster: target,
                            target: targetUnit,
                            tickEvents: actualBattle.tickEvents,
                            historyStats: actualBattle.historyStats,
                            healSource: buff
                        })

                        removeBuff({ buff, target, caster: target, actualBattle })
                    }

                    buff.data.timeTillHeal = 1.5
                }
            },

            onRemove({ buff, target, caster }) {}
        }
    },

    event_ny_balloons: {
        duplicateTag: "event_ny_balloons", // Used to stop duplicate buffs
        icon: "eventNYBalloons.svg",
        name: "decorative balloons",
        description() {
            return `Emergency heal an ally below 30% health to full health.  Effect works only once per battle.`
        },
        constants: {},
        data: {
            duration: Infinity,
            totalDuration: Infinity,
            isEnchantment: true
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {},

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                // Heal a random ally
                let lowestHp = Infinity
                let targetUnit
                actualBattle.units.forEach((unit) => {
                    const hpPercentage = unit.stats.health / unit.stats.healthMax
                    if (hpPercentage < lowestHp) {
                        lowestHp = hpPercentage
                        targetUnit = unit
                    }
                })

                if (targetUnit && lowestHp <= 0.3 && targetUnit !== target) {
                    targetUnit.stats.health = targetUnit.stats.healthMax
                    const totalHeal = 1
                    actualBattle.healTarget(totalHeal, {
                        caster: target,
                        target: targetUnit,
                        tickEvents: actualBattle.tickEvents,
                        historyStats: actualBattle.historyStats,
                        healSource: buff
                    })

                    removeBuff({ buff, target, caster: target, actualBattle })
                    if (actualBattle.tickEvents) {
                        actualBattle.tickEvents.push({
                            from: target.id,
                            to: target.id,
                            eventType: "special",
                            label: "Pop!",
                            customColor: "#FF9933",
                            customIcon: "noicon"
                        })
                    }

                    // find everyone else with balloons and pop them
                    actualBattle.units.forEach((friendlyUnit) => {
                        if (friendlyUnit.id !== target.id) {
                            let tempBalloonBuff = undefined
                            friendlyUnit.buffs.forEach((tempBuff) => {
                                if (tempBuff.id === "event_ny_balloons") {
                                    tempBalloonBuff = tempBuff
                                }
                            })
                            if (tempBalloonBuff) {
                                removeBuff({
                                    buff: tempBalloonBuff,
                                    target: friendlyUnit,
                                    caster: target,
                                    actualBattle
                                })
                                if (actualBattle.tickEvents) {
                                    actualBattle.tickEvents.push({
                                        from: target.id,
                                        to: friendlyUnit.id,
                                        eventType: "special",
                                        label: "Pop!",
                                        customColor: "#FF9933",
                                        customIcon: "noicon"
                                    })
                                }
                            }
                        }
                    })
                }
            },

            onRemove({ buff, target, caster }) {}
        }
    },

    oversized_club: {
        duplicateTag: "oversized_club", // Used to stop duplicate buffs
        icon: "oversizedClub.svg",
        name: "over side club",
        description() {
            return `35% chance to shred targets magic armor by 60`
        },
        constants: {
            chance: 0.35,
            shred: 60
        },
        data: {
            duration: Infinity,
            totalDuration: Infinity,
            isEnchantment: true
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {},

            onDidDamage({ buff, defender, attacker, actualBattle, damageDealt, rawDamage }) {
                const constants =
                    buff.constants && buff.constants.constants
                        ? buff.constants.constants
                        : lookupBuff(buff.id).constants

                if (Math.random() <= constants.chance) {
                    const armorReduction = constants.shred
                    const newBuff = {
                        id: "magic_armor_reduction",
                        data: {
                            duration: 5,
                            allowDuplicates: true,
                            totalDuration: 5,
                            armorReduction,
                            icon: "magicArmorReduction.svg",
                            description: `Reduces your magic armor by ${armorReduction}%`
                        }
                    }

                    // Add magic armor debuff
                    addBuff({ buff: newBuff, target: defender, caster: attacker })
                }
            },

            onTick({ buff, target, caster, secondsElapsed, actualBattle }) {},

            onRemove({ buff, target, caster }) {}
        }
    },

    phoenix_hat: {
        duplicateTag: "phoenix_hat", // Used to stop duplicate buffs
        icon: "babyPhoenix.svg",
        name: "phoenix hat",
        description() {
            return `Randomly ignites enemies. Fades away after 5 ignites.`
        },
        constants: {},
        data: {
            duration: Infinity,
            totalDuration: Infinity,
            isEnchantment: true
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {
                buff.stacks = 5
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                if (Math.random() <= 0.02) {
                    const targetEnemy = lodash.sample(actualBattle.enemies)
                    const newBuff = {
                        id: "ignite_phoenix_hat",
                        data: {
                            allowDuplicates: true,
                            duration: 15,
                            totalDuration: 15,
                            icon: "ignite.svg",
                            description: ""
                        },
                        constants: lookupBuff("ignite_phoenix_hat")
                    }

                    // cast ignite
                    addBuff({ buff: newBuff, target: targetEnemy, caster: target, actualBattle })
                    buff.stacks -= 1

                    if (buff.stacks <= 0) {
                        removeBuff({ buff, target, caster: target, actualBattle })
                    }
                }
            },

            onRemove({ buff, target, caster }) {}
        }
    },

    eternal_flame: {
        duplicateTag: "eternal_flame", // Used to stop duplicate buffs
        icon: "eternalFlame.svg",
        name: "eternal flame",
        description() {
            return `Randomly ignites enemies.`
        },
        constants: {},
        data: {
            duration: Infinity,
            totalDuration: Infinity,
            isEnchantment: true
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {},

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                if (Math.random() <= 0.01) {
                    const targetEnemy = lodash.sample(actualBattle.enemies)
                    const newBuff = {
                        id: "ignite_phoenix_hat",
                        data: {
                            allowDuplicates: true,
                            duration: 15,
                            totalDuration: 15,
                            icon: "ignite.svg",
                            description: ""
                        },
                        constants: lookupBuff("ignite_phoenix_hat")
                    }

                    // cast ignite
                    addBuff({ buff: newBuff, target: targetEnemy, caster: target, actualBattle })
                }
            },

            onRemove({ buff, target, caster }) {}
        }
    },

    honeycomb: {
        duplicateTag: "honeycomb", // Used to stop duplicate buffs
        icon: "honeycombItem.svg",
        name: "honeycomb",
        description() {
            return `Slowly heals you during combat and can also remove poisons and stop bleeding.`
        },
        constants: {},
        data: {
            duration: Infinity,
            totalDuration: Infinity,
            isEnchantment: true
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {
                buff.data.delay = 1.0
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                if (buff.data.delay > 0.0) {
                    buff.data.delay -= secondsElapsed
                    return
                }

                if (Math.random() <= 0.2) {
                    // average once per second, self-heal 5-15 health (plus healingPower % bonus)
                    buff.data.delay = 1.0
                    actualBattle.healTarget(5 + Math.random() * 10, {
                        caster: target,
                        target: target,
                        tickEvents: actualBattle.tickEvents,
                        historyStats: actualBattle.historyStats,
                        healSource: buff
                    })
                }

                if (Math.random() <= 0.02) {
                    // average once per 10 seconds, remove a bleed
                    let tempBleedBuff = undefined
                    target.buffs.forEach((tempBuff) => {
                        if (tempBuff.id === "bleed" || tempBuff.id === "bleed_proper") {
                            tempBleedBuff = tempBuff
                        }
                    })
                    if (tempBleedBuff) {
                        buff.data.delay = 1.0
                        removeBuff({ buff: tempBleedBuff, target: target, caster: target, actualBattle })
                    }
                }

                if (Math.random() <= 0.01) {
                    // average once per 20 seconds, remove a poison
                    let tempPoisonBuff = undefined
                    target.buffs.forEach((tempBuff) => {
                        if (tempBuff.id === "basic_poison") {
                            tempPoisonBuff = tempBuff
                        }
                    })
                    if (tempPoisonBuff) {
                        buff.data.delay = 1.0
                        removeBuff({ buff: tempPoisonBuff, target: target, caster: target, actualBattle })
                    }
                }
            },

            onRemove({ buff, target, caster }) {}
        }
    },

    prismatic_spear: {
        duplicateTag: "prismatic_spear", // Used to stop duplicate buffs
        icon: "prismaticSpear.png",
        name: "prismatic spear",
        description() {
            return `Slowly heals you during combat and can also remove poisons and stop bleeding.`
        },
        constants: {},
        data: {
            duration: Infinity,
            totalDuration: Infinity,
            isEnchantment: true
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {
                buff.data.delay = 1.0
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                if (buff.data.delay > 0.0) {
                    buff.data.delay -= secondsElapsed
                    return
                }

                if (Math.random() <= 0.2) {
                    // average once per second, self-heal 5-15 health (plus healingPower % bonus)
                    buff.data.delay = 1.0
                    actualBattle.healTarget(5 + Math.random() * 10, {
                        caster: target,
                        target: target,
                        tickEvents: actualBattle.tickEvents,
                        historyStats: actualBattle.historyStats,
                        healSource: buff
                    })
                }

                if (Math.random() <= 0.02) {
                    // average once per 10 seconds, remove a bleed
                    let tempBleedBuff = undefined
                    target.buffs.forEach((tempBuff) => {
                        if (tempBuff.id === "bleed" || tempBuff.id === "bleed_proper") {
                            tempBleedBuff = tempBuff
                        }
                    })
                    if (tempBleedBuff) {
                        buff.data.delay = 1.0
                        removeBuff({ buff: tempBleedBuff, target: target, caster: target, actualBattle })
                    }
                }

                if (Math.random() <= 0.01) {
                    // average once per 20 seconds, remove a poison
                    let tempPoisonBuff = undefined
                    target.buffs.forEach((tempBuff) => {
                        if (tempBuff.id === "basic_poison") {
                            tempPoisonBuff = tempBuff
                        }
                    })
                    if (tempPoisonBuff) {
                        buff.data.delay = 1.0
                        removeBuff({ buff: tempPoisonBuff, target: target, caster: target, actualBattle })
                    }
                }
            },

            onRemove({ buff, target, caster }) {}
        }
    },

    holy_plate: {
        duplicateTag: "holy_plate", // Used to stop duplicate buffs
        icon: "holyChestplate.png",
        name: "holy plate",
        description() {
            return `Brings you back from the brink of death during combat. This effect can only occur once per battle.`
        },
        constants: {},
        data: {
            duration: Infinity,
            totalDuration: Infinity,
            isEnchantment: true,
            usedUp: false
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {
                buff.data.usedUp = false
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {},

            onBeforeDeath({ buff, target, actualBattle }) {
                if (!buff.data.usedUp) {
                    target.stats.health = target.stats.healthMax
                    buff.data.usedUp = true
                    removeBuff({ target, buff, caster: target, actualBattle })
                }
            },

            onRemove({ buff, target, caster }) {}
        }
    },

    event_spd_jeweled_greaves: {
        duplicateTag: "event_spd_jeweled_greaves", // Used to stop duplicate buffs
        icon: "eventSPDJeweledPlatelegs.png",
        name: "jeweled greaves",
        description() {
            return `Brings you back from the brink of death during combat. This effect can only occur once per battle.`
        },
        constants: {},
        data: {
            duration: Infinity,
            totalDuration: Infinity,
            isEnchantment: true,
            usedUp: false
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {
                buff.data.usedUp = false
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {},

            onBeforeDeath({ buff, target, actualBattle }) {
                if (!buff.data.usedUp) {
                    target.stats.health = Math.round(target.stats.healthMax / 2)
                    buff.data.usedUp = true
                    removeBuff({ target, buff, caster: target, actualBattle })
                }
            },

            onRemove({ buff, target, caster }) {}
        }
    },

    prismatic_chestplate: {
        duplicateTag: "prismatic_chestplate", // Used to stop duplicate buffs
        icon: "prismaticChestplate.png",
        name: "prismatic chestplate",
        description() {
            return `Brings you back from the brink of death during combat. This effect can only occur once per battle.`
        },
        constants: {},
        data: {
            duration: Infinity,
            totalDuration: Infinity,
            isEnchantment: true,
            usedUp: false
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {
                buff.data.usedUp = false
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {},

            onBeforeDeath({ buff, target, actualBattle }) {
                if (!buff.data.usedUp) {
                    target.stats.health = Math.round(target.stats.healthMax * 0.667)
                    buff.data.usedUp = true
                    removeBuff({ target, buff, caster: target, actualBattle })
                }
            },

            onRemove({ buff, target, caster }) {}
        }
    },

    demons_heart: {
        duplicateTag: "demons_heart", // Used to stop duplicate buffs
        icon: "demonsHeart.svg",
        name: "demon's heart",
        description() {
            return `Periodically drain health from your entire team.  Drained health empowers your damage.  The lower your health and the more you drain, the more damage you will do.`
        },
        constants: {},
        data: {
            duration: Infinity,
            totalDuration: Infinity,
            isEnchantment: true
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {
                buff.stacks = 5
                buff.data.secondsLastDrain = 0
                buff.data.currentDamageBonus = 0
                buff.data.lastHealthDrained = 0

                const newBuff = {
                    id: "demons_heart_damage",
                    data: {
                        name: "demon's heart damage",
                        allowDuplicates: false,
                        duration: Infinity,
                        totalDuration: Infinity,
                        icon: "demonsHeartDamage.svg",
                        description: "Bonus damage from Demon's Heart"
                    },
                    constants: lookupBuff("demons_heart_damage"),
                    stacks: 0
                }

                addBuff({ buff: newBuff, target, caster, actualBattle })
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                buff.data.secondsLastDrain += secondsElapsed

                if (buff.data.secondsLastDrain >= 5.0) {
                    buff.data.secondsLastDrain -= 5.0

                    // debuff old bonus (0 if none)
                    target.stats.attack -= buff.data.currentDamageBonus
                    target.stats.attackMax -= buff.data.currentDamageBonus
                    buff.data.currentDamageBonus = 0

                    // perform party drain (allow dodge/mitigation)
                    const aliveUnits = actualBattle.units.length
                    // NOTE: can't use BATTLES.maxTowerPartySize here because BATTLES is a main game server-only constant
                    const actualDamage = (target.stats.accuracy * 0.35 * 5) / aliveUnits // 35% of accuracy

                    let damageDealt = 0
                    actualBattle.units.forEach((friendly_unit) => {
                        let localDamageDealt = actualBattle.dealDamage(actualDamage, {
                            attacker: target,
                            defender: friendly_unit,
                            tickEvents: actualBattle.tickEvents,
                            historyStats: actualBattle.historyStats,
                            customIcon: buff.data.icon,
                            source: "Demon's Heart"
                        })
                        damageDealt += localDamageDealt
                        if (friendly_unit.buffs) {
                            friendly_unit.buffs.forEach((local_buff) => {
                                local_buff.constants = lookupBuff(local_buff.id)
                                if (local_buff.constants.events.onTookDamage) {
                                    // .onTookDamage() only triggers on auto-attack normally, so we're cheesing it here
                                    local_buff.constants.events.onTookDamage({
                                        secondsElapsed,
                                        buff: local_buff,
                                        defender: friendly_unit,
                                        attacker: target,
                                        actualBattle,
                                        damageDealt: localDamageDealt
                                    })
                                }
                            })
                        }
                        actualBattle.checkDeath(friendly_unit, target)
                    })

                    // calculate new bonus
                    buff.data.lastHealthDrained = damageDealt
                    buff.data.currentDamageBonus =
                        (1.2 - target.stats.health / target.stats.healthMax) * buff.data.lastHealthDrained // 20-119% of damage dealt to party

                    // update damage buff
                    target.buffs.forEach((local_buff) => {
                        if (local_buff.id === "demons_heart_damage") {
                            local_buff.stacks = Math.round(buff.data.currentDamageBonus)
                        }
                    })

                    // rebuff with new bonus
                    target.stats.attack += buff.data.currentDamageBonus
                    target.stats.attackMax += buff.data.currentDamageBonus
                }

                buff.stacks = Math.ceil(5.0 - buff.data.secondsLastDrain)
            },

            onBeforeDeath({ buff, target, actualBattle }) {
                // debuff old bonus (0 if none)
                target.stats.attack -= buff.data.currentDamageBonus
                target.stats.attackMax -= buff.data.currentDamageBonus
                buff.data.currentDamageBonus = 0
            },

            onRemove({ buff, target, caster }) {
                // debuff old bonus (0 if none)
                target.stats.attack -= buff.data.currentDamageBonus
                target.stats.attackMax -= buff.data.currentDamageBonus
                buff.data.currentDamageBonus = 0
            }
        }
    },

    demons_heart_damage: {
        duplicateTag: "demons_heart_damage", // Used to stop duplicate buffs
        icon: "demonsHeartDamage.svg",
        name: "demon's heart damage",
        description() {
            return `
        Bonus damage from Demon's Heart.`
        },
        constants: {},
        data: {
            duration: Infinity,
            totalDuration: Infinity
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {},

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {}
        }
    },

    /*
  demons_heart_old: {
    duplicateTag: 'demons_heart_old', // Used to stop duplicate buffs
    icon: 'demonsHeart.svg',
    name: 'demons heart (old)',
    description() {
      return `
        When you die, temporarily heal to full hp and become cursed.<br />
        Cursed: +50% damage, +50% attack speed, +50 hybrid armor<br />
        Take increasing damage each second. You cannot cast abilities while cursed`;
    },
    constants: {
    },
    data: {
      duration: Infinity,
      totalDuration: Infinity,
      isEnchantment: true
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {
      },

      onBeforeDeath({ buff, target, actualBattle }) {
        if (!buff.data.active) {
          target.isSilenced = true;
          target.stats.health = target.stats.healthMax;
          target.stats.attackMax *= 1.5;
          target.stats.attack *= 1.5;
          target.stats.armor += 50;
          target.stats.magicArmor += 50;
          target.stats.attackSpeed *= 1.5;
          target.icon = 'demon.svg';
          buff.data.active = true;
          buff.data.secondsElapsed = 0; 
        }
      },

      onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
        if (buff.data.active) {
          buff.data.secondsElapsed += secondsElapsed;
          const percentDamage = (buff.data.secondsElapsed / 12) * 100;
          target.stats.health -= ((target.stats.healthMax / 100) * percentDamage) * secondsElapsed;
          actualBattle.checkDeath(target, caster)
        }
      },

      onRemove({ buff, target, caster }) {
        target.stats.attackMax /= 1.5;
        target.stats.attack /= 1.5;
        target.stats.armor -= 50;
        target.stats.magicArmor -= 50;
        target.stats.attackSpeed /= 1.5;
      }
    }
  },
  */

    winged_shield: {
        duplicateTag: "winged_shield", // Used to stop duplicate buffs
        icon: "winged_shield.svg",
        name: "winged shield",
        description() {
            return `Every 15 seconds, blocks the damage from the next attack.`
        },
        constants: {},
        data: {
            duration: Infinity,
            totalDuration: Infinity,
            isEnchantment: true,
            timeTillDodge: 15,
            dodge: false
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {},

            onTick({ buff, target, secondsElapsed }) {
                if (buff.data.timeTillDodge > 0) {
                    buff.data.timeTillDodge -= secondsElapsed
                } else if (!buff.data.dodge) {
                    buff.data.damageReduction = target.stats.damageTaken * (99.9 / 100)
                    target.stats.damageTaken -= buff.data.damageReduction
                    buff.data.dodge = true
                }
                if (buff.data.timeTillDodge < 0) {
                    buff.data.timeTillDodge = 0
                }
                buff.stacks = Math.round(buff.data.timeTillDodge)
            },

            onTookDamage({ buff, attacker, defender, actualBattle, secondsElapsed, damageDealt }) {
                // re-add DR once a hit has been tanked
                if (buff.data.dodge) {
                    defender.stats.damageTaken += buff.data.damageReduction
                    buff.data.timeTillDodge = 15
                    buff.data.dodge = false
                }
            },

            onRemove({ buff, target, caster }) {}
        }
    },

    warden_shield: {
        duplicateTag: "warden_shield",
        icon: "warden_shield.svg",
        name: "warden shield",
        description({ buff, level }) {
            const defensePerLevel = Math.round(buff.constants.defensePerLevel * 100)
            const maxDefense = Math.round((buff.constants.baseDefense + defensePerLevel * level) * 100)
            return `
        Redirects ${maxDefense}% (+${defensePerLevel}% per lvl) damage from allies onto yourself.`
        },
        constants: {
            baseDefense: 0.3,
            defensePerLevel: 0.05
        },
        data: {
            duration: Infinity,
            totalDuration: Infinity,
            isEnchantment: true,
            allies: "units",
            applyToAllies: true,
            appliedToAllies: false,
            sourceAlly: null
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {},

            onTick({ buff, target, caster, actualBattle }) {
                // apply buff to 'allies' if required
                if (buff.data.applyToAllies && !buff.data.appliedToAllies) {
                    const newBuff = {
                        id: "warden_shield",
                        data: {
                            duration: Infinity,
                            totalDuration: Infinity,
                            caster: target.id,
                            icon: "warden_shield.svg",
                            name: "warden shield",
                            allies: buff.data.allies,
                            applyToAllies: false,
                            appliedToAllies: false,
                            sourceAlly: target.id,
                            hideBuff: false,
                            level: buff.data.level
                        },
                        constants: lookupBuff("warden_shield")
                    }
                    // apply to all but self
                    actualBattle[buff.data.allies]
                        .filter((ally) => {
                            return ally.id !== target.id
                        })
                        .forEach((ally) => {
                            addBuff({ buff: newBuff, target: ally, caster: caster })
                        })
                    buff.data.appliedToAllies = true
                }
            },

            onTookDamage({ buff, defender, attacker, actualBattle, damageDealt }) {
                if (buff.data.sourceAlly !== null) {
                    // try fo find ally
                    const sourceAlly = actualBattle[buff.data.allies].find((ally) => {
                        return ally.id === buff.data.sourceAlly
                    })
                    if (!lodash.isUndefined(sourceAlly)) {
                        // redirect damage from self to sourceAlly
                        const constants =
                            buff.constants && buff.constants.constants
                                ? buff.constants.constants
                                : lookupBuff(buff.id).constants
                        const redirectDamage =
                            damageDealt * (constants.baseDefense + constants.defensePerLevel * buff.data.level)
                        actualBattle.healTarget(redirectDamage, {
                            caster: sourceAlly,
                            target: defender,
                            healSource: buff
                        })
                        actualBattle.dealDamage(redirectDamage, {
                            attacker: defender,
                            defender: sourceAlly,
                            tickEvents: actualBattle.tickEvents,
                            customIcon: buff.data.icon,
                            source: "Warden's Interception"
                        })
                    }
                }
            },

            onRemove({ buff, target, caster }) {}
        }
    },

    angels_heart: {
        duplicateTag: "angels_heart",
        icon: "angels_heart.svg",
        name: "angels heart",
        description({ buff, level }) {
            const healthTransferCost = buff.constants.baseTransferRate * level
            const healthTransfer = healthTransferCost * buff.constants.baseTransferEfficiency
            return `Heals allies for ${healthTransfer * 4} per second at the cost of ${healthTransferCost * 4} health.`
        },
        constants: {
            baseTransferRate: 5,
            baseTransferEfficiency: 1
        },
        data: {
            duration: Infinity,
            totalDuration: Infinity,
            isEnchantment: true,
            allies: "units"
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {},

            onTick({ buff, target, caster, actualBattle }) {
                // ticks are now 5 per second, so eat 4 out of 5 ticks randomly.
                if (Math.random() < 0.8) {
                    return
                }

                const constants =
                    buff.constants && buff.constants.constants
                        ? buff.constants.constants
                        : lookupBuff(buff.id).constants
                let healthTransferred = false
                const healthToTransfer = buff.data.level * constants.baseTransferRate
                const actualHealthTransferred = healthToTransfer * constants.baseTransferEfficiency
                actualBattle[buff.data.allies].forEach((ally) => {
                    if (ally.id === target.id) return
                    // transfer HP from self to allies
                    if (ally.stats.health + actualHealthTransferred < ally.stats.healthMax) {
                        healthTransferred = true
                        actualBattle.healTarget(actualHealthTransferred, {
                            caster: target,
                            target: ally,
                            tickEvents: actualBattle.tickEvents,
                            healSource: buff
                        })
                    }
                })
                if (healthTransferred) {
                    target.stats.health -= healthToTransfer
                }
            },

            onRemove({ buff, target, caster }) {}
        }
    },

    fireopal_amulet: {
        duplicateTag: "fireopal_amulet", // Used to stop duplicate buffs
        icon: "fireOpalAmulet.png",
        name: "fire opal amulet",
        description() {
            return `Whenever you take damage, a temporary elemental shield will be cast on you, shielding you and increasing your damage.  This effect can only occur once every ten seconds.`
        },
        constants: {},
        data: {
            name: "Fire Opal Amulet",
            duration: Infinity,
            totalDuration: Infinity,
            isEnchantment: true,
            timeToApply: 0.0
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {
                buff.stacks = 0
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                if (buff.data.timeToApply > 0.0) {
                    buff.data.timeToApply -= secondsElapsed
                }

                buff.stacks = Math.ceil(buff.data.timeToApply)
            },

            onTookDamage({ buff, attacker, defender, actualBattle, secondsElapsed, damageDealt }) {
                if (buff.data.timeToApply <= 0.0) {
                    // store max health
                    const curHealthMax = defender.stats.healthMax

                    const newBuff = {
                        id: "fireopal_shield",
                        data: {
                            duration: 3,
                            totalDuration: 3,
                            icon: "elementalShield.svg",
                            description: `Temporary fire opal magical shield.`,
                            name: "fire opal shield"
                        },
                        constants: lookupBuff("fireopal_shield")
                    }

                    newBuff.constants.constants = {
                        damageBase: 25,
                        baseShield: 250,
                        shieldMPRatio: 1.0,
                        healthCost: 0, // no health cost
                        healthCostMPRatio: 0 // no health cost
                    }
                    ;(newBuff.duration = 3), (newBuff.totalDuration = 3)

                    addBuff({ buff: newBuff, target: defender, caster: defender, actualBattle })

                    // revert max health
                    defender.stats.healthMax = curHealthMax

                    buff.data.timeToApply = 10.0
                }
            },

            onRemove({ buff, target, caster }) {}
        }
    },

    prismatic_helmet: {
        duplicateTag: "prismatic_helmet", // Used to stop duplicate buffs
        icon: "prismaticHelmet.png",
        name: "prismatic helmet",
        description() {
            return `Whenever you take damage, a temporary elemental shield will be cast on you, shielding you and increasing your damage.  This effect can only occur once every ten seconds.`
        },
        constants: {},
        data: {
            name: "Prismatic Helmet",
            duration: Infinity,
            totalDuration: Infinity,
            isEnchantment: true,
            timeToApply: 0.0
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {
                buff.stacks = 0
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                if (buff.data.timeToApply > 0.0) {
                    buff.data.timeToApply -= secondsElapsed
                }

                buff.stacks = Math.ceil(buff.data.timeToApply)
            },

            onTookDamage({ buff, attacker, defender, actualBattle, secondsElapsed, damageDealt }) {
                if (buff.data.timeToApply <= 0.0) {
                    // store max health
                    const curHealthMax = defender.stats.healthMax

                    const newBuff = {
                        id: "elemental_shield",
                        data: {
                            duration: 3,
                            totalDuration: 3,
                            icon: "elementalShield.svg",
                            description: `Temporary elemental shield.`,
                            name: "elemental shield"
                        },
                        constants: lookupBuff("elemental_shield")
                    }

                    newBuff.constants.constants = {
                        damageBase: 25,
                        baseShield: 250,
                        shieldMPRatio: 1.0,
                        healthCost: 0, // no health cost
                        healthCostMPRatio: 0 // no health cost
                    }
                    ;(newBuff.duration = 3), (newBuff.totalDuration = 3)

                    addBuff({ buff: newBuff, target: defender, caster: defender, actualBattle })

                    // revert max health
                    defender.stats.healthMax = curHealthMax

                    buff.data.timeToApply = 10.0
                }
            },

            onRemove({ buff, target, caster }) {}
        }
    },

    lion_claws: {
        duplicateTag: "lion_claws", // Used to stop duplicate buffs
        icon: "eventLNYLionClaws.svg",
        name: "lion claws",
        description() {
            return `Your auto-attacks are especially deadly and can rip flesh easily, leaving bloody wounds on your target.`
        },
        constants: {},
        data: {
            name: "Lion Claws",
            duration: Infinity,
            totalDuration: Infinity,
            isEnchantment: true
        },
        events: {
            onApply({ buff, target, caster, actualBattle }) {},

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {},

            onDidDamage({
                originalAutoAttack,
                secondsElapsed,
                buff,
                defender,
                attacker,
                actualBattle,
                damageDealt,
                rawDamage
            }) {
                if (damageDealt >= 1.0) {
                    const bleedChance = 0.2

                    if (Math.random() <= bleedChance) {
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
                }
            },

            onRemove({ buff, target, caster }) {}
        }
    },

    prismatic_long_sword: {
        duplicateTag: "prismatic_long_sword", // Used to stop duplicate buffs
        icon: "prismaticLongsword.png",
        name: "prismatic long sword",
        description() {
            return `Your auto-attacks are especially deadly and can rip flesh easily, leaving bloody wounds on your target.`
        },
        constants: {},
        data: {
            name: "Prismatic Long Sword",
            duration: Infinity,
            totalDuration: Infinity,
            isEnchantment: true
        },
        events: {
            onApply({ buff, target, caster, actualBattle }) {},

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {},

            onDidDamage({
                originalAutoAttack,
                secondsElapsed,
                buff,
                defender,
                attacker,
                actualBattle,
                damageDealt,
                rawDamage
            }) {
                if (damageDealt >= 1.0) {
                    const bleedChance = 0.2

                    if (Math.random() <= bleedChance) {
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
                }
            },

            onRemove({ buff, target, caster }) {}
        }
    },

    lion_body: {
        duplicateTag: "lion_body", // Used to stop duplicate buffs
        icon: "eventLNYLionBody.svg",
        name: "lion costume body",
        description() {
            return `With the rhythm of a spirited dancer, you dance and weave through battle relying on your agility instead of tough armor.  Every 8 seconds, you will automatically evade all attacks for 2 seconds.`
        },
        constants: {},
        data: {
            name: "Lion Costume Body",
            duration: Infinity,
            totalDuration: Infinity,
            isEnchantment: true,
            timeToEvade: 8
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {
                buff.data.timeToEvade = 8.0
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                buff.data.timeToEvade -= secondsElapsed

                if (buff.data.timeToEvade <= 0.0) {
                    buff.data.timeToEvade = 8.0

                    const newBuff = {
                        id: "evasive_maneuvers",
                        data: {
                            duration: 1,
                            totalDuration: 1,
                            icon: "eventLNYLionBodyDodge.svg",
                            description: `You're dodging all damage while dancing in your costume.`,
                            name: "Lion Costume Dodge",
                            level: 2
                        },
                        constants: lookupBuff("evasive_maneuvers")
                    }
                    addBuff({ buff: newBuff, target: target, caster: target, actualBattle })
                }

                buff.stacks = Math.ceil(buff.data.timeToEvade > 0.0 ? buff.data.timeToEvade : 0)
            },

            onRemove({ buff, target, caster }) {}
        }
    },

    lion_head: {
        duplicateTag: "lion_head", // Used to stop duplicate buffs
        icon: "eventLNYLionHead.svg",
        name: "lion costume head",
        description() {
            return `With the rhythm of a spirited dancer, you dance and weave through battle relying on your agility instead of force.  Every 8 seconds, you will gain +1% of your base accuracy up to a maximum of +80%.`
        },
        constants: {},
        data: {
            duration: Infinity,
            totalDuration: Infinity,
            isEnchantment: true,
            totalTime: 0,
            totalAccuracy: 0
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {},

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                buff.data.totalTime += secondsElapsed
                if (Math.ceil(buff.data.totalTime) % 8 === 0) {
                    target.stats.accuracy -= buff.data.totalAccuracy
                    // Extra accuracy
                    const roundedTime = Math.ceil(buff.data.totalTime / 8)
                    const extraAccuracyPercentage = roundedTime < 80 ? roundedTime : 80
                    buff.data.totalAccuracy = target.stats.accuracy * (extraAccuracyPercentage / 100)
                    target.stats.accuracy += buff.data.totalAccuracy
                    buff.stacks = Math.round(buff.data.totalAccuracy)
                }
            },

            onRemove({ buff, target, caster }) {}
        }
    },

    lunar_shield: {
        duplicateTag: "lunar_shield", // Used to stop duplicate buffs
        icon: "eventLNYLunarShield.svg",
        name: "lunar shield",
        description() {
            return `Automatically taunts all enemies every round at the cost of health.  This effect will not reduce your health below 40%.`
        },
        constants: {},
        data: {
            duration: Infinity,
            totalDuration: Infinity,
            isEnchantment: true
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {},

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                if (actualBattle.enemies) {
                    const maxHealth =
                        target.stats.healthMaxOrig && target.stats.healthMaxOrig > 1
                            ? target.stats.healthMaxOrig
                            : target.stats.healthMax
                    const minHealth = maxHealth * 0.4
                    const healthIncrementPerEnemy = maxHealth * 0.15

                    let healthReduxTotal = 0

                    actualBattle.enemies.forEach((enemy) => {
                        if (enemy && enemy.target !== target.id) {
                            enemy.target = target.id
                            if (enemy.stats.health * 0.2 > healthIncrementPerEnemy) {
                                healthReduxTotal += healthIncrementPerEnemy
                            } else {
                                healthReduxTotal += enemy.stats.health * 0.2
                            }
                        }
                    })

                    if (healthReduxTotal > 0 && target.stats.health > minHealth) {
                        let newHealth = target.stats.health - healthReduxTotal
                        if (newHealth < minHealth) {
                            newHealth = minHealth
                        }
                        target.stats.health = newHealth
                    }
                }
            },

            onRemove({ buff, target, caster }) {}
        }
    },

    prismatic_shield: {
        duplicateTag: "prismatic_shield", // Used to stop duplicate buffs
        icon: "prismaticShield.png",
        name: "prismatic shield",
        description() {
            return `Automatically taunts all enemies every round.`
        },
        constants: {},
        data: {
            duration: Infinity,
            totalDuration: Infinity,
            isEnchantment: true
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {},

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                if (actualBattle.enemies) {
                    actualBattle.enemies.forEach((enemy) => {
                        if (enemy && enemy.target !== target.id) {
                            enemy.target = target.id
                        }
                    })
                }
            },

            onRemove({ buff, target, caster }) {}
        }
    },

    bear_slippers: {
        duplicateTag: "bear_slippers", // Used to stop duplicate buffs
        icon: "eventVDbear.svg",
        name: "bear slippers",
        description() {
            return `Restores 1% of your original maximum health that has been lowered from combat spellcasting every second.  This will not restore any of your current missing health.`
        },
        constants: {},
        data: {
            duration: Infinity,
            totalDuration: Infinity,
            isEnchantment: true
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {
                buff.data.timeCount = 1.0
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                if (buff.data.timeCount > 0) {
                    buff.data.timeCount -= secondsElapsed
                }
                if (buff.data.timeCount <= 0) {
                    buff.data.timeCount = 1.0

                    try {
                        let hpMaxHealth = target.stats.healthMaxOrig
                        let hpAmountToRaise = 0.01 * hpMaxHealth

                        if (target.stats.healthMax + hpAmountToRaise > hpMaxHealth) {
                            target.stats.healthMax = hpMaxHealth
                        } else {
                            target.stats.healthMax += hpAmountToRaise
                        }
                    } catch (err) {}
                }
            },

            onRemove({ buff, target, caster }) {}
        }
    },

    rose_quartz_amulet: {
        duplicateTag: "rose_quartz_amulet", // Used to stop duplicate buffs
        icon: "eventVDnecklace.svg",
        name: "rose quartz amulet",
        description() {
            return `While wearing this amulet, you are incapable of causing harm.`
        },
        constants: {},
        data: {
            duration: Infinity,
            totalDuration: Infinity,
            isEnchantment: true,
            hideBuff: true,
            combatTimer: 0.6 // wait a moment for combat to start
        },
        events: {
            onApply({ buff, target, caster, actualBattle }) {
                target.isPacifist = true

                // Add the generic pacifist buff
                target.applyBuff({
                    buff: target.generateBuff({
                        buffId: "pacifist"
                    })
                })
            },

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
                if (buff.data.combatTimer < 0) {
                    // If we added pacifist, then remove the Rose Quartz Amulet buff (hiding it programmically doesn't work entirely, player would have to tab away and tab back)
                    if (target.hasBuff("pacifist")) {
                        removeBuff({ buff, target, caster, actualBattle })
                    }
                    return
                }

                // For the first 0.6s of combat, aggressively try to remove these effects from this player
                buff.data.combatTimer -= secondsElapsed

                // Once we're sure all passive and enchantments have been applied, look for and remove some offensive ones:
                removeBuffWithMessage({
                    target,
                    caster,
                    buffId: "phoenix_hat",
                    actualBattle,
                    messageOptions: { label: "Pacifist", color: "#E825AE" }
                })
                removeBuffWithMessage({
                    target,
                    caster,
                    buffId: "eternal_flame",
                    actualBattle,
                    messageOptions: { label: "Pacifist", color: "#E825AE" }
                })
                removeBuffWithMessage({
                    target,
                    caster,
                    buffId: "demons_heart",
                    actualBattle,
                    messageOptions: { label: "Pacifist", color: "#E825AE" }
                })
                removeBuffWithMessage({
                    target,
                    caster,
                    buffId: "demons_heart_damage",
                    actualBattle,
                    messageOptions: { label: "Pacifist", color: "#E825AE" }
                })
                removeBuffWithMessage({
                    target,
                    caster,
                    buffId: "spiked_armor",
                    actualBattle,
                    messageOptions: { label: "Pacifist", color: "#E825AE" }
                })

                // NOTE: lion_claws and bloody_plate_legs both apply bleed during .onHit() which is impossible when .isPacifist = true because
                //       auto-attacks can't occur at all.  That said, we're going to remove them here anyway to let the player know.
                removeBuffWithMessage({
                    target,
                    caster,
                    buffId: "lion_claws",
                    actualBattle,
                    messageOptions: { label: "Pacifist", color: "#E825AE" }
                })
                removeBuffWithMessage({
                    target,
                    caster,
                    buffId: "bloody_plate_legs",
                    actualBattle,
                    messageOptions: { label: "Pacifist", color: "#E825AE" }
                })
            },

            onRemove({ buff, target, caster }) {
                //target.isPacifist = false; // intentionally left on if this buff is removed
            }
        }
    },

    cupids_bow: {
        duplicateTag: "cupids_bow", // Used to stop duplicate buffs
        icon: "eventVDcupidbow.svg",
        name: "cupids bow",
        description() {
            return `Your auto-attack damage is tripled against charmed targets. This applies to all auto-attack damage, including any effects that add auto-attacks such as Phantom Strikes and Volley.`
        },
        constants: {},
        data: {
            duration: Infinity,
            totalDuration: Infinity,
            isEnchantment: true,
            combatTimer: 0.6 // wait a moment for combat to start
        },
        events: {
            onApply({ buff, target, caster, actualBattle }) {},

            onTick({ secondsElapsed, buff, target, caster, actualBattle }) {},

            onDidDamage({
                buff,
                defender,
                attacker,
                actualBattle,
                damageDealt,
                rawDamage,
                originalAutoAttack,
                secondsElapsed,
                source
            }) {
                if (defender.hasBuff("charm")) {
                    actualBattle.dealDamage(rawDamage * 3, {
                        attacker,
                        defender,
                        isMagic: false,
                        tickEvents: actualBattle.tickEvents,
                        historyStats: actualBattle.historyStats,
                        customIcon: buff.data.icon,
                        source // mirror source
                    })
                }
            },

            onRemove({ buff, target, caster }) {}
        }
    },

    witchs_cauldron: {
        duplicateTag: "witchs_cauldron",
        icon: "potionMixing.svg",
        name: "Mixing Potions",
        description() {
            return `You're mixing some potions like a witch.`
        },
        constants: {},
        data: {
            duration: Infinity,
            totalDuration: Infinity,
            isEnchantment: true
        },
        events: {
            onApply({ buff, target, caster, actualBattle }) {
                buff.data.timeToUse = Math.random() * 5 + 10 // 5-15 seconds to mix the first potion

                // find everyone else with cauldrons and spill theirs
                target.allies.forEach((alliedUnit) => {
                    const cauldronBuff = alliedUnit.findBuff("witchs_cauldron")
                    if (cauldronBuff) {
                        alliedUnit.removeBuff(cauldronBuff)
                        alliedUnit.tickMessage("Cauldron Spilled!", "#448822", "noicon", target)
                    }
                })
            },

            onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
                if (buff.data.timeToUse > 0) {
                    buff.data.timeToUse -= secondsElapsed
                    // So user can see how far away potion is
                    buff.stacks = Math.ceil(buff.data.timeToUse)
                } else {
                    buff.stacks = 0

                    if (buff.data.timeToUse <= 0) {
                        const thisPotionEffect = _.sample(["armor_loss_potion", "weapon_loss_potion", "acid_potion"])

                        target.opposition.forEach((opponent) => {
                            if (thisPotionEffect === "acid_potion") {
                                target.applyBuffTo({
                                    buff: target.generateBuff({
                                        buffId: "bleed_proper",
                                        buffData: {
                                            realDuration: 10,
                                            duration: 10,
                                            dps: opponent.stats.healthMax / 10,
                                            timeTillDamage: 1,
                                            name: "Covered in Acid",
                                            description: `You are covered in horrible acid!`,
                                            icon: "potionAcid.svg"
                                        }
                                    }),
                                    target: opponent
                                })
                            } else if (thisPotionEffect === "weapon_loss_potion") {
                                target.applyBuffTo({
                                    buff: target.generateBuff({ buffId: thisPotionEffect, buffData: { duration: 5 } }),
                                    target: opponent
                                })
                                opponent.tickMessage("Weapon Vanished!", "#6600aa", "noicon", target)
                            } else {
                                target.applyBuffTo({
                                    buff: target.generateBuff({ buffId: thisPotionEffect, buffData: { duration: 7 } }),
                                    target: opponent
                                })
                                opponent.tickMessage("Armor Vanished!", "#6600aa", "noicon", target)
                            }
                        })

                        buff.data.timeToUse = Math.random() * 10 + 15 // 15-25 seconds to mix the next potion
                    }
                }
            },

            onRemove({ buff, target }) {}
        }
    },

    health_up_enchantment: {
        duplicateTag: "health_up_enchantment", // Used to stop duplicate buffs
        icon: "health.svg",
        name: "extra health up",
        description() {
            return "Increase health by 10%."
        },
        constants: {},
        data: {
            duration: Infinity,
            totalDuration: Infinity,
            isEnchantment: true
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {
                const healthIncrease = 0.1

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

    dark_aura: {
        // watchful_aura clone
        duplicateTag: "dark_aura", // Used to stop duplicate buffs
        icon: "darkAura.svg",
        name: "dark aura",
        description() {
            return `Dodge rate from defense skill won't fall below 35%. <br />
        Whenever you dodge, you are healed for 2% of your original maximum health. <br />
        This heal can occur only every 3 seconds. <br />
        This effect is not compatible with <i>Watchful Aura</i>.`
        },
        constants: {},
        data: {
            duration: Infinity,
            totalDuration: Infinity,
            isEnchantment: true
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {
                target.stats.minimumHitChance = 0.35
                buff.stats = 0
                buff.data.doneTicks = 0
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

                buff.data.doneTicks++
                if (buff.data.doneTicks < 3) {
                    const watchfulAuraBuff = target.findBuff("sixth_sense")
                    if (watchfulAuraBuff) {
                        target.removeBuff(watchfulAuraBuff)
                    }
                }
            },

            onRemove({ buff, target, caster }) {},

            onDodgedDamage({ buff, defender, attacker, actualBattle }) {
                if (!buff.stacksTimer || buff.stacksTimer === 0) {
                    let hpMaxHealth = defender.stats.healthMax
                    if (defender.stats.healthMaxOrig) {
                        hpMaxHealth = defender.stats.healthMaxOrig
                    }
                    let hpHealAmount = (2 * hpMaxHealth) / 100
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

                        buff.stacksTimer = 3.0
                        buff.stacks = Math.ceil(buff.stacksTimer)
                    }
                }
            }
        }
    },

    damage_reflect: {
        duplicateTag: "damage_reflect", // Used to stop duplicate buffs
        icon: "redirectDamage.svg",
        name: "damage reflection",
        description() {
            return "Reflect (25% of received damage) + 50 as magic damage."
        },
        constants: {},
        data: {
            duration: Infinity,
            totalDuration: Infinity,
            isEnchantment: true
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {},

            onTookRawDamage({ buff, defender, attacker, actualBattle, damageDealt, source }) {
                if (source !== "autoattack") {
                    return
                }

                actualBattle.dealDamage(damageDealt * 0.25 + 50, {
                    attacker: defender,
                    defender: attacker,
                    isMagic: true,
                    tickEvents: actualBattle.tickEvents,
                    historyStats: actualBattle.historyStats,
                    source: "Damage Reflection",
                    customIcon: buff.data.icon
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

    prismatic_plate_legs: {
        duplicateTag: "prismatic_plate_legs", // Used to stop duplicate buffs
        icon: "prismaticPlatelegs.png",
        name: "prismatic platelegs",
        description() {
            return "Reflect (25% of received damage) + 150 as magic damage."
        },
        constants: {},
        data: {
            duration: Infinity,
            totalDuration: Infinity,
            isEnchantment: true
        },
        events: {
            // This can be rebuilt from the buff id
            onApply({ buff, target, caster, actualBattle }) {},

            onTookRawDamage({ buff, defender, attacker, actualBattle, damageDealt, source }) {
                if (source !== "autoattack") {
                    return
                }

                if (attacker.stats.health <= 0) {
                    return
                }

                actualBattle.dealDamage(damageDealt * 0.25 + 150, {
                    attacker: defender,
                    defender: attacker,
                    isMagic: true,
                    tickEvents: actualBattle.tickEvents,
                    historyStats: actualBattle.historyStats,
                    source: "Prismatic Damage Reflection",
                    customIcon: "obsidianPlateLegs.svg"
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
    }
}
