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

  spirit_blink: {
    duplicateTag: 'spirit_blink', // Used to stop duplicate buffs
    icon: 'spiritBlink',
    name: 'spirit blink',
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

      onTick({ secondsElapsed, buff, target, caster }) {
        if (!buff.data.timeTillBlink) {
          buff.data.timeTillBlink = 5 + (Math.random() * 7);
        }

        buff.data.timeTillBlink -= secondsElapsed;

        // Blink on average, every 5 seconds
        if (buff.data.timeTillBlink <= 0) {
          const newBuff = {
            id: 'evasive_maneuvers',
            data: {
              duration: 4,
              totalDuration: 4,
              level: 1,
              icon: 'invulnerable'
            }
          }

          buff.data.timeTillBlink = 5 + (Math.random() * 7);

          addBuff({ buff: newBuff, target, caster: target });
        }
      },

      onRemove({ buff, target, caster }) {
        // Blank
      }
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

  healing_reduction: {
    duplicateTag: 'healing_reduction', // Used to stop duplicate buffs
    icon: 'healingReduction',
    name: 'healing reduction',
    description({ buff, level }) {
      const c = buff.constants;
      return `Reduces healing recieved`;
    },
    constants: {
    },
    data: {
      duration: 0,
      totalDuration: 0,
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {
        if (target.stats.healingReduction != null) {
          target.stats.healingReduction *= buff.data.healingReduction;
        } else {
          target.stats.healingReduction = buff.data.healingReduction;
        }
      },

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
        buff.data.duration -= secondsElapsed;

        if (buff.data.duration < 0) {
          removeBuff({ buff, target, caster });
        }
      },

      onRemove({ buff, target }) {
        target.stats.healingReduction /= buff.data.healingReduction;
      }
    }
  },

  armor_reduction: {
    duplicateTag: 'armor_reduction', // Used to stop duplicate buffs
    icon: 'armorReduction',
    name: 'armor reduction',
    description({ buff, level }) {
      const c = buff.constants;
      return `Reduces your armor`;
    },
    constants: {
    },
    data: {
      duration: 0,
      totalDuration: 0,
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {
        if (target.stats.armor <= 0) {
          buff.data.armorReduction = 1;
        }
        target.stats.armor *= buff.data.armorReduction;
      },

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
        buff.data.duration -= secondsElapsed;

        if (buff.data.duration < 0) {
          removeBuff({ buff, target, caster });
        }
      },

      onRemove({ buff, target }) {
        target.stats.armor /= buff.data.armorReduction;
      }
    }
  },

  demon_monster: {
    duplicateTag: 'demon_monster', // Used to stop duplicate buffs
    icon: '',
    name: 'demon monster',
    description({ buff, level }) {
    },
    constants: {
    },
    data: {
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
        // Blank
      },

      onDidDamage({ buff, defender, attacker, actualBattle }) {
        const constants = buff.constants.constants;
        const healingReduction = 0.25;
        const newBuff = {
          id: 'healing_reduction',
          data: {
            duration: 30,
            totalDuration: 30,
            healingReduction,
            icon: 'healingReduction',
            description: `Reduces healing recieved by ${Math.round((1 - healingReduction) * 100)}%`
          }
        }

        // Add healing reduction buff
        addBuff({ buff: newBuff, target: defender, caster: attacker });
      },

      onTick({ secondsElapsed, buff, target, caster }) {
        // Blank
      },

      onRemove({ buff, target, caster }) {
        // Blank
      }
    }
  },

  beaver_teeth: {
    duplicateTag: 'beaver_teeth', // Used to stop duplicate buffs
    icon: '',
    name: 'beaver teeth',
    description({ buff, level }) {
    },
    constants: {
    },
    data: {
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
        // Blank
      },

      onDidDamage({ buff, defender, attacker, actualBattle }) {
        if (Math.random() <= 0.5) {
          const constants = buff.constants.constants;
          const armorReduction = 0.66;
          const newBuff = {
            id: 'armor_reduction',
            data: {
              duration: 10,
              allowDuplicates: true,
              totalDuration: 10,
              armorReduction,
              icon: 'armorReduction',
              description: `Reduces your armor by ${Math.round((1 - armorReduction) * 100)}%`
            }
          }

          // Add healing reduction buff
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
  }
}
