import moment from 'moment';
import _ from 'underscore';
import { attackSpeedTicks } from '/server/utils';
import { addBuff, removeBuff } from '/server/battleUtils';
import { BUFFS } from '/server/constants/combat/index.js';
import { Random } from 'meteor/random'

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

          const statsToSteal = ['health', 'healthMax', 'armor', 'attack'];
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
        target.stats.accuracy *= 1.5;
        target.stats.attackSpeed *= 3;
        target.stats.magicArmor *= 0.3;
        target.stats.armor *= 0.3;
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

  rabbit_monster: {
    duplicateTag: 'rabbit_monster', // Used to stop duplicate buffs
    icon: '',
    name: 'rabbit monster',
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

      onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
        // Blank
        if (!buff.data.timeTillRabbit) {
          buff.data.timeTillRabbit = 5 + Math.random () * 5;
        } else {
          buff.data.timeTillRabbit -= secondsElapsed;
          if (buff.data.timeTillRabbit <= 0) {
            buff.data.timeTillRabbit = 15 + Math.random () * 5;
            const newRabbit = JSON.parse(JSON.stringify(target));
            newRabbit.id = Random.id();
            actualBattle.enemies.push(newRabbit);
            buff.data.timeTillRabbit = 5000;
          }
        }
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

  earth_mage_monster: {
    duplicateTag: 'earth_mage_monster', // Used to stop duplicate buffs
    icon: '',
    name: 'earth mage',
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

      onTookDamage({ buff, defender, attacker, actualBattle }) {
        if (Math.random() <= 0.05) {
          const newBuff = {
            id: 'mud_armor',
            data: {
              duration: 15,
              totalDuration: 15,
              icon: 'mudArmor',
              description: ''
            },
            constants: BUFFS['mud_armor']
          }

          // cast mud armor
          addBuff({ buff: newBuff, target: defender, caster: defender, actualBattle });
        }
      },

      onDidDamage({ buff, defender, attacker, actualBattle }) {
        const newBuff = {
          id: 'earth_dart',
          data: {
            duration: 0,
            totalDuration: 0,
            icon: 'earthDart',
            description: ''
          },
          constants: BUFFS['earth_dart']
        }

        // cast earth dart
        addBuff({ buff: newBuff, target: defender, caster: attacker, actualBattle });
      },

      onRemove({ buff, target, caster }) {
        // Blank
      }
    }
  },

  fire_mage_monster: {
    duplicateTag: 'fire_mage_monster', // Used to stop duplicate buffs
    icon: '',
    name: 'fire mage',
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

      onTookDamage({ buff, defender, attacker, actualBattle }) {
        if (Math.random() <= 0.05) {
          const newBuff = {
            id: 'ignite',
            data: {
              duration: 15,
              totalDuration: 15,
              icon: 'ignite',
              description: ''
            },
            constants: BUFFS['ignite']
          }

          // cast ignite
          addBuff({ buff: newBuff, target: attacker, caster: defender, actualBattle });
        }
      },

      onDidDamage({ buff, defender, attacker, actualBattle }) {
        if (Math.random() <= 0.2) {
          const newBuff = {
            id: 'fire_dart',
            data: {
              duration: 0,
              totalDuration: 0,
              icon: 'fireDart',
              description: ''
            },
            constants: BUFFS['fire_dart']
          }

          // cast fire dart
          addBuff({ buff: newBuff, target: defender, caster: attacker, actualBattle });
        }
      },

      onRemove({ buff, target, caster }) {
        // Blank
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
            duration: 20,
            totalDuration: 20,
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

  rat_monster: {
    duplicateTag: 'rat_monster', // Used to stop duplicate buffs
    icon: '',
    name: 'rat monster',
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
        const bleedChance = 0.2;

        if (Math.random() <= bleedChance) {
          const newBuff = {
            id: 'bleed',
            data: {
              duration: 15,
              totalDuration: 15,
              dps: attacker.stats.attackMax / 30,
              timeTillDamage: 1,
              allowDuplicates: true,
              icon: 'bleed',
              name: 'bleed',
              description: `Bleed every second for ${Math.round(attacker.stats.attackMax / 10)} damage`
            }
          }

          // Add bleed debuff
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

  lizard_monster: {
    duplicateTag: 'lizard_monster', // Used to stop duplicate buffs
    icon: '',
    name: 'lizard monster',
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

      onTookDamage({ buff, defender, attacker, actualBattle }) {
        const constants = buff.constants.constants;

        // Does this unit have poison? remove poison + heal
        const poisonedCount = defender.buffs.filter((buff) => {
          return buff.id === 'basic_poison';
        }).length;

        if (poisonedCount >= 1) {
          const totalHeal =  ((defender.stats.defense * poisonedCount) / 2);
          actualBattle.utils.healTarget(totalHeal, {
            caster: defender,
            target: defender,
            tickEvents: actualBattle.tickEvents
          });

          defender.buffs.forEach((buff) => {
            if (buff.id === 'basic_poison' && buff.data.duration > 1) {
              buff.data.duration = 0.2;
              buff.data.timeTillDamage = 5;
            }
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

  crab_monster: {
    duplicateTag: 'crab_monster', // Used to stop duplicate buffs
    icon: '',
    name: 'crab monster',
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

      onTookDamage({ buff, defender, attacker, actualBattle }) {
        defender.stats.armor -= 5;
        defender.stats.magicArmor -= 5;
        buff.data.hitsRequired -= 1;

        if (buff.data.hitsRequired <= 0) {
          defender.stats.armor -= 2000;
          defender.stats.magicArmor -= 2000;
          if (defender.stats.armor <= 1) {
            defender.stats.armor = 1;
          }
          if (defender.stats.magicArmor <= 1) {
            defender.stats.magicArmor = 1;
          }
          removeBuff({ buff, target: defender, caster: defender });
        }
      },

      onTick({ secondsElapsed, buff, target, caster }) {
        // Blank
        if (buff.data.hitsRequired == null) {
          buff.data.hitsRequired = 50;
          target.stats.armor += 2000;
          target.stats.magicArmor += 2000;
        }
      },

      onRemove({ buff, target, caster }) {
        // Blank
      }
    }
  },

  angry_miner_monster: {
    duplicateTag: 'angry_miner_monster', // Used to stop duplicate buffs
    icon: '',
    name: 'angry monster',
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

      onTick({ secondsElapsed, buff, target, caster }) {
        // Blank
        if (!buff.data.timeTillUpdate) {
          buff.data.timeTillUpdate = 5;
        } else if (buff.data.timeTillUpdate <= 0) {
        
          const missingHp = target.stats.healthMax - target.stats.health;

          if (!buff.data.lastMissingHp) {
            buff.data.lastMissingHp = missingHp;
          } else {
            const decimal = (missingHp - buff.data.lastMissingHp) / target.stats.healthMax;
            target.stats.attackMax *= 1 + (decimal / 2);
            target.stats.attack *= 1 + (decimal / 2);
            target.stats.accuracy *= 1 + (decimal / 2);
            buff.data.lastMissingHp = missingHp;
          }

          // Recompute attack speed and damage by missingHp
          target.stats.attackSpeedTicks = attackSpeedTicks(target.stats.attackSpeed);
        }

        buff.data.timeTillUpdate -= secondsElapsed;
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
