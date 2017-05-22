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
  },

  ninja_reflexes: {
    duplicateTag: 'ninja_reflexes', // Used to stop duplicate buffs
    icon: 'youngNinja',
    name: 'ninja reflexes',
    description({ buff, level }) {
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

      onTookDamage({ buff, defender, attacker, actualBattle }) {
        const constants = buff.constants.constants;
        if (Math.random() <= 0.10) {
          const newBuff = {
            id: 'evasive_maneuvers',
            data: {
              duration: 3,
              totalDuration: 3,
              level: 1,
              icon: 'evasiveManeuvers'
            }
          }

          addBuff({ buff: newBuff, target: defender, caster: defender });
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

  dwarfs_rage: {
    duplicateTag: 'berserk', // Used to stop duplicate buffs
    icon: 'berserk',
    name: 'dwarfs rage',
    description({ buff, level }) {
    },
    constants: {
    },
    data: {
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
        target.stats.attackMax *= 1.5;
        target.stats.attack *= 1.5;
        target.stats.accuracy *= 2;
        target.stats.attackSpeed *= 3;
        target.stats.magicArmor *= 0.3;
        target.stats.attackSpeedTicks = attackSpeedTicks(target.stats.attackSpeed);
      },

      onTick({ secondsElapsed, buff, target, caster }) {
      },

      onRemove({ buff, target, caster }) {
      }
    }
  },

  dwarfs_pre_rage: {
    duplicateTag: 'dwarfs_pre_rage', // Used to stop duplicate buffs
    icon: '',
    name: 'dwarfs rage',
    description({ buff, level }) {
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

      onTookDamage({ buff, defender, attacker, actualBattle }) {
        const constants = buff.constants.constants;
        if (defender.stats.health <= (defender.stats.healthMax * 0.2)) {

          const newBuff = {
            id: 'dwarfs_rage',
            data: {
              duration: Infinity,
              totalDuration: Infinity,
              icon: 'dwarfsRage',
              description: 'Massively increased offensive stats. More vulnerable to magic.'
            }
          }

          // Add berserk buff
          addBuff({ buff: newBuff, target: defender, caster: defender });
          // Remove this buff
          removeBuff({ buff, target: defender, caster: defender });
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
}
