import moment from 'moment';
import { attackSpeedTicks } from '/server/utils';
import { addBuff, removeBuff } from '/server/battleUtils';
import { BUFFS } from '/server/constants/combat/index.js';

export const ENCHANTMENT_BUFFS = {

  bison_axe: {
    duplicateTag: 'bison_axe', // Used to stop duplicate buffs
    icon: 'bisonAxe.svg',
    name: 'bison axe',
    description() {
      return `Every 5 seconds an auto attacks becomes charged. Dealing it's damage to all enemies.`;
    },
    constants: {
    },
    data: {
      duration: Infinity,
      totalDuration: Infinity
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
        buff.data.timeTillCharge = 5;
        buff.data.stacks = Math.round(buff.data.timeTillCharge);
      },

      onTick({ secondsElapsed, buff }) {
        if (buff.data.timeTillCharge > 0) {
          buff.data.timeTillCharge -= secondsElapsed;
          buff.data.stacks = Math.round(buff.data.timeTillCharge);
        }
      },

      onDidDamage({ buff, defender, attacker, actualBattle, damageDealt }) {
        if (buff.data.timeTillCharge <= 0) {
          buff.data.timeTillCharge = 5;
          actualBattle.enemies.forEach((enemy) => {
            if (enemy.id !== defender.id) {
              actualBattle.utils.dealDamage(damageDealt, {
                attacker: attacker,
                defender: enemy,
                // Need to make sure this is required
                isTrueDamage: true,
                tickEvents: actualBattle.tickEvents,
                historyStats: actualBattle.historyStats,
              });
            }
          });
        }
      },

      onRemove({ buff, target, caster }) {
        // Blank
      }
    }
  },

  krakens_tentacle: {
    duplicateTag: 'krakens_tentacle', // Used to stop duplicate buffs
    icon: 'tentacle.svg',
    name: 'krakens tentacle',
    description() {
      return `Each auto attack gives 1 charge. <br />At 20 charges increases attack speed by 50% for 3 seconds.`;
    },
    constants: {
    },
    data: {
      duration: Infinity,
      totalDuration: Infinity
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
        buff.data.charges = 0;
      },

      onDidDamage({ buff, attacker }) {
        if (!buff.data.isActive) {
          buff.data.charges += 1;
          buff.data.stacks = buff.data.charges;
        }

        if (buff.data.charges >= 20 && !buff.data.isActive) {
          attacker.stats.attackSpeed *= 1.5;
          attacker.stats.attackSpeed = attackSpeedTicks(attacker.stats.attackSpeed);
          buff.data.timeTillEnd = 3;
          buff.data.isActive = true;
          buff.data.stacks = undefined;
          buff.data.icon = 'tentacleRed.svg';
        }
      },

      onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
        if (buff.data.isActive) {
          buff.data.timeTillEnd -= secondsElapsed;
          if (buff.data.timeTillEnd <= 0) {
            buff.data.isActive = false;
            buff.data.charges = 0;
            target.stats.attackSpeed /= 1.5;
            target.stats.attackSpeed = attackSpeedTicks(target.stats.attackSpeed);
            buff.data.icon = 'tentacle.svg';
          }
        }
      },

      onRemove({ buff, target, caster }) {
        // Blank
      }
    }
  },

  rich_snake_skin: {
    duplicateTag: 'rich_snake_skin', // Used to stop duplicate buffs
    icon: 'richSnakeSkin.svg',
    name: 'rich snake skin',
    description() {
      return `Converts 10% of armor into defense.`;
    },
    constants: {
    },
    data: {
      duration: Infinity,
      totalDuration: Infinity
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
        const amountToAdd = target.stats.armor * 0.1;
        buff.data.defense = amountToAdd;
        target.stats.defense += buff.data.defense;
        buff.data.stacks = Math.round(buff.data.defense);
      },

      onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
      },

      onRemove({ buff, target, caster }) {
        // Blank
        target.stats.defense -= buff.data.defense;
      }
    }
  },

  frankensteins_heart: {
    duplicateTag: 'frankensteins_heart', // Used to stop duplicate buffs
    icon: 'frankensteinsHeart.svg',
    name: 'frankensteins heart',
    description() {
      return `Increases attack by 1% (of max attack) every 7 seconds. <br />Caps at +35% damage.`;
    },
    constants: {
    },
    data: {
      duration: Infinity,
      totalDuration: Infinity
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
        buff.data.totalTime = 0;
        buff.data.totalDamage = 0;
      },

      onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
        buff.data.totalTime += secondsElapsed;
        if (actualBattle.tick % 4 === 0) {
          target.stats.attack -= buff.data.totalDamage;
          target.stats.attackMax -= buff.data.totalDamage;
          // Extra damage
          const roundedTime = Math.ceil(buff.data.totalTime / 7)
          const extraDamagePercentage = roundedTime < 35 ? roundedTime : 35;
          buff.data.totalDamage = target.stats.attackMax * (extraDamagePercentage / 100);
          target.stats.attackMax += buff.data.totalDamage;
          target.stats.attack += buff.data.totalDamage;
          buff.data.stacks = Math.round(buff.data.totalDamage);
        }
      },

      onRemove({ buff, target, caster }) {
        // Blank
      }
    }
  },

  bloody_plate_legs: {
    duplicateTag: 'bloody_plate_legs', // Used to stop duplicate buffs
    icon: 'bloodyPlateLegs.svg',
    name: 'bloody plate legs',
    description() {
      return `10% chance on hit to inflict 3s bleed.<br />(10% of max damage / second)`;
    },
    constants: {
    },
    data: {
      duration: Infinity,
      totalDuration: Infinity
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
      },

      onDidDamage({ buff, defender, attacker, actualBattle }) {
        const constants = buff.constants.constants;
        const bleedChance = 0.1;

        if (Math.random() <= bleedChance) {
          const newBuff = {
            id: 'bleed',
            data: {
              duration: 3,
              totalDuration: 3,
              dps: JSON.parse(JSON.stringify(attacker.stats.attackMax / 10)),
              caster: attacker.id,
              timeTillDamage: 1,
              allowDuplicates: true,
              icon: 'bleed.svg',
              name: 'bleed',
              description: `Bleed every second for ${(attacker.stats.attackMax / 10).toFixed(2)} damage`
            }
          }

          // Add bleed debuff
          addBuff({ buff: newBuff, target: defender, caster: attacker });
        }
      },

      onTick({ secondsElapsed, buff, target, caster }) {
      },

      onRemove({ buff, target, caster }) {
        // Blank
      }
    }
  },

  living_helmet: {
    duplicateTag: 'living_helmet', // Used to stop duplicate buffs
    icon: 'livingHelmet.svg',
    name: 'living helmet',
    description() {
      return `When above 75% hp living helmet takes over. <br />
        Granting +10 defense, and healing allies for 5hp when you take damage`;
    },
    constants: {
    },
    data: {
      duration: Infinity,
      totalDuration: Infinity
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
        // Blank
        buff.data.isActive = false;
        buff.data.hideBuff = true;
      },

      onTookDamage({ buff, defender, attacker, actualBattle }) {
        if (buff.data.isActive) {
          actualBattle.units.forEach((unit) => {
            if (unit.id !== defender.id) {
              actualBattle.utils.healTarget(5, {
                caster: defender,
                target: unit,
                tickEvents: actualBattle.tickEvents,
                historyStats: actualBattle.historyStats
              });              
            }
          })
        }
      },

      onTick({ secondsElapsed, buff, target, caster }) {
        // Blank
        const decimal = target.stats.health / target.stats.healthMax;
        if (decimal >= 0.75 && !buff.data.isActive) {
          buff.data.isActive = true;
          buff.data.hideBuff = false;
          target.stats.defense += 10;
        } else if (decimal < 0.75 && buff.data.isActive) {
          buff.data.isActive = false;
          buff.data.hideBuff = true;
          target.stats.defense -= 10;
        }
      },

      onRemove({ buff, target, caster }) {
        // Blank
      }
    }
  },

  shadow_knife: {
    duplicateTag: 'shadow_knife', // Used to stop duplicate buffs
    icon: 'shadowKnife.svg',
    name: 'shadow knife',
    description() {
      return `Reduce cd of blade spin by 0.5s for each successfull auto attack.`;
    },
    constants: {
      accuracyDecimal: 0.85,
    },
    data: {
      duration: Infinity,
      totalDuration: Infinity
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
        // Blank
      },

      onDidDamage({ buff, defender, attacker, actualBattle, rawDamage }) {
        const bladeSpin = _.findWhere(attacker.abilities, { id: 'blade_spin' });
        if (bladeSpin && bladeSpin.currentCooldown > 0) {
          bladeSpin.currentCooldown -= 0.5;
        }
      },

      onTick({ secondsElapsed, buff, target, caster }) {
        // Blank
      },

      onRemove({ buff, target, caster }) {
        // Blank
      }
    }
  },

  smoke_dagger: {
    duplicateTag: 'smoke_dagger', // Used to stop duplicate buffs
    icon: 'smokeDagger.svg',
    name: 'smoke dagger',
    description() {
      return `Apply 25% accuracy debuff to enemies damaged by bladespin.`;
    },
    constants: {
      accuracyDecimal: 0.75,
    },
    data: {
      duration: Infinity,
      totalDuration: Infinity
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
        // Blank
      },

      onDidDamage({ buff, defender, attacker, actualBattle, rawDamage }) {
      },

      onTick({ secondsElapsed, buff, target, caster }) {
        // Blank
      },

      onRemove({ buff, target, caster }) {
        // Blank
      }
    }
  },

  smoke_dagger_debuff: {
    duplicateTag: 'smoke', // Used to stop duplicate buffs
    icon: 'smoke.svg',
    name: 'smoke',
    description() {
      return `Reduce accuracy`;
    },
    constants: {
      accuracyDecimal: 0.75,
    },
    data: {
      duration: 7,
      totalDuration: 7
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
        // Blank
        target.stats.accuracy -= buff.data.accuracyReduction;
      },

      onTick({ secondsElapsed, buff, target, caster }) {
        buff.data.duration -= secondsElapsed;
        if (buff.data.duration <= 0) {
          removeBuff({ target, buff, caster: target })
        }
      },

      onRemove({ buff, target, caster }) {
        // Blank
        target.stats.accuracy += buff.data.accuracyReduction;
      }
    }
  },

  axe_cleave: {
    duplicateTag: 'axe_cleave', // Used to stop duplicate buffs
    icon: 'boneKingsAxe.svg',
    name: 'axe cleave',
    description() {
      return `Deal 40% weapon damage to another enemy.`;
    },
    constants: {
      damageDecimal: 0.40,
    },
    data: {
      duration: Infinity,
      totalDuration: Infinity
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
        // Blank
      },

      onDidDamage({ buff, defender, attacker, actualBattle, rawDamage }) {
        const constants = buff.constants.constants;
        const baseDamage = attacker.stats.attack;
        const totalDamage = rawDamage * constants.damageDecimal;

        let target;
        actualBattle.enemies.forEach((enemy) => {
          if (!target && enemy.id !== defender.id) {
            target = enemy;
          }
        })

        if (target) {
         actualBattle.utils.dealDamage(totalDamage, {
            attacker,
            defender: target,
            tickEvents: actualBattle.tickEvents,
            historyStats: actualBattle.historyStats
          });
        }
      },

      onTick({ secondsElapsed, buff, target, caster }) {
        // Blank
      },

      onRemove({ buff, target, caster }) {
        // Blank
      }
    }
  },

  magic_blade: {
    duplicateTag: 'magic_blade', // Used to stop duplicate buffs
    icon: 'magicBlade.svg',
    name: 'magic blade',
    description() {
      return `Deals 25% magic damage on hit`;
    },
    constants: {
      damageDecimal: 0.25,
    },
    data: {
      duration: Infinity,
      totalDuration: Infinity
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
        // Blank
      },

      onDidDamage({ buff, defender, attacker, actualBattle, damageDealt, rawDamage }) {
        const constants = buff.constants.constants;
        const baseDamage = attacker.stats.attack;
        const totalDamage = rawDamage * constants.damageDecimal;

        actualBattle.utils.dealDamage(totalDamage, {
          attacker,
          defender,
          isMagic: true,
          tickEvents: actualBattle.tickEvents,
          historyStats: actualBattle.historyStats
        });
      },

      onTick({ secondsElapsed, buff, target, caster }) {
        // Blank
        if (buff.data.duration <= 0) {
          target.buffs = target.buffs.filter((targetBuff) => {
            return targetBuff.id !== buff.id
          });
        }
      },

      onRemove({ buff, target, caster }) {
        // Blank
      }
    }
  },

  druidic_hat: {
    duplicateTag: 'druidic_hat', // Used to stop duplicate buffs
    icon: 'druidsHat.svg',
    name: 'druids blessing',
    description() {
      return `Emergency heal an ally below 30% hp for 250% MP`;
    },
    constants: {
      healMagicPower: 2.5
    },
    data: {
      duration: Infinity,
      totalDuration: Infinity
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
        // Blank
      },

      onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
        if (buff.data.timeTillHeal == null) {
          buff.data.timeTillHeal = 1.5;
        } else {
          buff.data.timeTillHeal -= secondsElapsed;
        }

        if (buff.data.timeTillHeal <= 0) {
          // Heal a random ally
          let lowestHp = Infinity;
          let targetUnit;
          actualBattle.units.forEach((unit) => {
            const hpPercentage = unit.stats.health / unit.stats.healthMax;
            if (hpPercentage < lowestHp) {
              lowestHp = hpPercentage;
              targetUnit = unit;
            }
          });

          if (targetUnit && lowestHp <= 0.3 && targetUnit !== target) {
            const totalHeal = target.stats.magicPower * 2.5;
            actualBattle.utils.healTarget(totalHeal, {
              caster: target,
              target: targetUnit,
              tickEvents: actualBattle.tickEvents,
              historyStats: actualBattle.historyStats
            });

            removeBuff({ buff, target, caster: target });
          }

          buff.data.timeTillHeal = 1.5;
        }
      },

      onRemove({ buff, target, caster }) {
        // Blank
      }
    }
  },

  oversized_club: {
    duplicateTag: 'oversized_club', // Used to stop duplicate buffs
    icon: 'oversizedClub.svg',
    name: 'over side club',
    description() {
      return `35% chance to shred targets magic armor by 60`;
    },
    constants: {
      chance: 0.35,
      shred: 60
    },
    data: {
      duration: Infinity,
      totalDuration: Infinity
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
        // Blank
      },

      onDidDamage({ buff, defender, attacker, actualBattle, damageDealt, rawDamage }) {
        const constants = buff.constants.constants;

        if (Math.random() <= constants.chance) {
          const armorReduction = constants.shred;
          const newBuff = {
            id: 'magic_armor_reduction',
            data: {
              duration: 5,
              allowDuplicates: true,
              totalDuration: 5,
              armorReduction,
              icon: 'magicArmorReduction.svg',
              description: `Reduces your magic armor by ${armorReduction}%`
            }
          }

          // Add magic armor debuff
          addBuff({ buff: newBuff, target: defender, caster: attacker });
        }
      },

      onTick({ secondsElapsed, buff, target, caster }) {
        // Blank
      },

      onRemove({ buff, target, caster }) {
        // Blank
      }
    }
  },

  phoenix_hat: {
    duplicateTag: 'phoenix_hat', // Used to stop duplicate buffs
    icon: 'babyPhoenix.svg',
    name: 'phoneix hat',
    description() {
      return `Randomly ignites enemies. Fades away after 5 ignites.`;
    },
    constants: {
    },
    data: {
      duration: Infinity,
      totalDuration: Infinity
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
        // Blank
      },

      onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
        if (!buff.data.stacks) {
          buff.data.stacks = 5;
        }

        if (Math.random() <= 0.02) {
          const targetEnemy = _.sample(actualBattle.enemies);
          const newBuff = {
            id: 'ignite',
            data: {
              duration: 15,
              totalDuration: 15,
              icon: 'ignite.svg',
              description: ''
            },
            constants: BUFFS['ignite']
          }

          // cast ignite
          addBuff({ buff: newBuff, target: targetEnemy, caster: target, actualBattle });
          buff.data.stacks -= 1;

          if (buff.data.stacks <= 0) {
            removeBuff({ buff, target, caster: target });
          }
        }
      },

      onRemove({ buff, target, caster }) {
        // Blank
      }
    }
  },

  demons_heart: {
    duplicateTag: 'demons_heart', // Used to stop duplicate buffs
    icon: 'demonsHeart.svg',
    name: 'demons heart',
    description() {
      return `
        When you fall below 20% hp become cursed.<br />
        Cursed: +50% damage, +50% attack speed, +50 hybrid armor<br />
        Take increasing damage each second.`;
    },
    constants: {
    },
    data: {
      duration: Infinity,
      totalDuration: Infinity
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
        // Blank
      },

      onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
        if (!buff.data.active) {
          const decimalHp = target.stats.health / target.stats.healthMax;
          if (decimalHp < 0.2) {

            target.stats.attackMax *= 1.5;
            target.stats.attack *= 1.5;
            target.stats.armor += 50;
            target.stats.magicArmor += 50;
            target.stats.attackSpeed *= 1.5;
            target.stats.attackSpeedTicks = attackSpeedTicks(target.stats.attackSpeed);

            target.icon = 'demon.svg';
            buff.data.active = true;
            buff.data.deathStacks = 0.5;
            buff.data.stacks = 0;
          }
        } else {
          buff.data.deathStacks += secondsElapsed / 10;
          buff.data.stacks = Math.round(buff.data.deathStacks);
          target.stats.health -= buff.data.deathStacks
        }
      },

      onRemove({ buff, target, caster }) {
        // Blank
      }
    }
  },
}
