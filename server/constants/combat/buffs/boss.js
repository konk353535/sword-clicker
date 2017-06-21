import moment from 'moment';
import _ from 'underscore';
import { attackSpeedTicks } from '/server/utils';
import { addBuff, removeBuff } from '/server/battleUtils';
import { BUFFS } from '/server/constants/combat/index.js';
import { Random } from 'meteor/random'

export const BOSS_BUFFS = {

  deep_wounds: {
    duplicateTag: 'deep_wounds', // Used to stop duplicate buffs
    icon: 'deepWounds',
    name: 'deep wounds',
    description({ buff, level }) {
      const c = buff.constants;
      return `Increases damage taken by 10% for each stack of deep wounds`;
    },
    constants: {
    },
    data: {
      duration: 0,
      totalDuration: 0,
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {

      },

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
        buff.data.duration -= secondsElapsed;

        if (buff.data.duration < 0) {
          removeBuff({ buff, target, caster });
        }
      },

      onTookDamage({ buff, defender, attacker, actualBattle, damageDealt }) {
        const constants = buff.constants.constants;

        const extraDamage = 0.1 * buff.data.stacks;
        const attackerDamage = attacker.stats.attack + ((attacker.stats.attackMax - attacker.stats.attack) / 2);
        actualBattle.utils.dealDamage(extraDamage * attackerDamage, {
          attacker,
          defender,
          tickEvents: actualBattle.tickEvents
        });
      },

      onRemove({ buff, target }) {
      }
    }
  },

  boss_cougar: {
    duplicateTag: 'boss_cougar', // Used to stop duplicate buffs
    icon: 'boss cougar',
    name: 'boss cougar',
    description({ buff, level }) {
      const c = buff.constants;
      return `Increases damage against target per hit`;
    },
    constants: {
    },
    data: {
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {
        Object.keys(buff.data.stats).forEach((buffKey) => {
          target.stats[buffKey] -= buff.data.stats[buffKey];
        });
      },

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
      },

      onDidDamage({ buff, defender, attacker, actualBattle }) {

        const DEEP_WOUNDS_DURATION = 10;

        // Does defender already have the buff?
        let targetBuff = _.findWhere(defender.buffs, { id: 'deep_wounds' });
        if (targetBuff) {
          targetBuff.data.duration = DEEP_WOUNDS_DURATION;
          targetBuff.data.stacks += 1;
        } else {
          const newBuff = {
            id: 'deep_wounds',
            data: {
              duration: DEEP_WOUNDS_DURATION,
              totalDuration: DEEP_WOUNDS_DURATION,
              stacks: 1,
              icon: 'deepWounds',
              description: ''
            }
          }

          // cast earth dart
          addBuff({ buff: newBuff, target: defender, caster: attacker, actualBattle });
        }
      },

      onRemove({ buff, target }) {
      }
    }
  }

}
