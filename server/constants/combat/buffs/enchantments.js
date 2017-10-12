import moment from 'moment';
import { attackSpeedTicks } from '/server/utils';
import { addBuff, removeBuff } from '/server/battleUtils';
import { BUFFS } from '/server/constants/combat/index.js';

export const ENCHANTMENT_BUFFS = {

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
