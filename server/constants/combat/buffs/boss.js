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
  },

  boss_cobra: {
    duplicateTag: 'boss_cobra', // Used to stop duplicate buffs
    icon: 'boss cobra',
    name: 'boss cobra',
    description({ buff, level }) {
      const c = buff.constants;
      return `Poisons the target every 60 seconds`;
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
        buff.data.timeTillSpawn -= secondsElapsed;

        // So user can see how far away spawn is
        buff.data.stacks = Math.round(buff.data.timeTillSpawn);

        if (!buff.data.timeTillSpawn || buff.data.timeTillSpawn <= 0) {

          const snakeStats = JSON.parse(JSON.stringify(target.stats));
          snakeStats.health = 100;
          snakeStats.healthMax = 100;
          snakeStats.attack *= 0.3;
          snakeStats.attackMax *= 0.3;

          // Spawn little snake
          const littleSnake = {
            enemyId: Random.id(),
            tickOffset: 0,
            icon: 'snake',
            name: 'snake',
            stats: snakeStats,
            buffs: [{
              id: 'poisoned_blade',
              data: {
                icon: 'poisonedBlade',
                duration: Infinity,
                totalDuration: Infinity,
                level: 25
              }
            }]
          }

          actualBattle.enemies.push(littleSnake);

          if (buff.data.phase === 1) {
            buff.data.timeTillSpawn = 5;
            buff.data.phase = 2;
          } else {
            buff.data.timeTillSpawn = 45;
            buff.data.phase = 1;
          }
        }
      },

      onRemove({ buff, target }) {
      }
    }
  },

  boss_bone_warrior: {
    duplicateTag: 'boss_bone_warrior', // Used to stop duplicate buffs
    icon: 'boneWarrior',
    name: 'boss bone warrior',
    description({ buff, level }) {
      const c = buff.constants;
      return `Blade spin chance on hit`;
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

      onTookDamage({ buff, defender, attacker, actualBattle }) {
        const SPIN_CHANCE = 0.3;
        if (Math.random() <= SPIN_CHANCE) {
          // Cast Blade Spin
          actualBattle.units.forEach((unit) => {

            // Blade Spin
            const newBuff = {
              id: 'blade_spin',
              data: {
                duration: 0,
                totalDuration: 0,
                level: 1,
                icon: 'bladeSpin',
                description: ''
              },
              constants: BUFFS['blade_spin']
            }

            // cast earth dart
            addBuff({ buff: newBuff, target: unit, caster: defender, actualBattle });
          });
        }
      },

      onRemove({ buff, target }) {
      }
    }
  }

}
