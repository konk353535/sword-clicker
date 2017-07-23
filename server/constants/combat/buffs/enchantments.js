import moment from 'moment';
import { attackSpeedTicks } from '/server/utils';
import { addBuff, removeBuff } from '/server/battleUtils';

export const ENCHANTMENT_BUFFS = {

  magic_blade: {
    duplicateTag: 'magic_blade', // Used to stop duplicate buffs
    icon: 'magicBlade',
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
          tickEvents: actualBattle.tickEvents
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
    icon: 'druidsHat',
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
              tickEvents: actualBattle.tickEvents
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
  }

}
