import moment from 'moment';
import _ from 'underscore';
import { attackSpeedTicks } from '/server/utils';
import { addBuff, removeBuff } from '/server/battleUtils';

export const MONSTER_BUFFS = {

 stolen_stats: {
    duplicateTag: 'stolen_stats', // Used to stop duplicate buffs
    icon: 'goblin',
    name: 'stolen stats',
    description({ buff, level }) {
      const c = buff.constants;
      return `Reduces one of your stats by 10%`;
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
        buff.data.duration -= secondsElapsed;

        if (buff.data.duration < 0) {
          removeBuff({ buff, target, caster });
        }
      },

      onRemove({ buff, target }) {
        Object.keys(buff.data.stats).forEach((buffKey) => {
          target.stats[buffKey] += buff.data.stats[buffKey];
        });
      }
    }
  },

  goblin_stat_stealer: {
    duplicateTag: 'goblin_stat_stealer', // Used to stop duplicate buffs
    icon: 'goblin',
    name: 'stat stealer',
    description({ buff, level }) {
      const c = buff.constants;
      return `Every 15s the goblin steals a random players stats. Gaining 50% of the stolen stat permenantly`;
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
        buff.data.timeTillSteal -= secondsElapsed;
        if (!buff.data.timeTillSteal || buff.data.timeTillSteal <= 0) {

          const statsToSteal = ['health', 'healthMax', 'armor', 'damage'];
          const targetToSteal = _.sample(actualBattle.units);

          const newBuff = {
            id: 'stolen_stats',
            data: {
              duration: 15,
              totalDuration: 15,
              stats: {},
              name: 'Stolen Stats',
              icon: 'goblin'
            }
          }

          const statToSteal = _.sample(statsToSteal);
          let amount = targetToSteal.stats[statToSteal] * 0.2;
          if (amount < 0) {
            amount = 0;
          }
          newBuff.data.stats[statToSteal] = amount;
          newBuff.data.description = `Stole ${Math.round(amount)} of your ${statToSteal}`;
          target.stats[statToSteal] += amount * 0.5;

          addBuff({ buff: newBuff, target: targetToSteal, caster: target });

          buff.data.timeTillSteal = 15;
        }
      },

      onRemove() {}
    }
  }
}
