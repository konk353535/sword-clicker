import _ from 'underscore';
import { addBuff, removeBuff } from '../../battleUtils';
import { BUFFS } from './index.js';
import uuid from 'node-uuid';

export const notifyChangeForUnitProperty = function notifyChangeForUnitProperty({unit, property, actualBattle}) {
  try {
    const event = {
      type: 'abs',
      path: `unitsMap.${unit.id}.${property}`,
      value: unit[property]
    };

    actualBattle.deltaEvents.push(event);
  } catch (err) {
  }
};

export const MONSTER_BUFFS = {

  name_changer_common: {
    duplicateTag: 'name_changer_common',
    icon: '',
    name: '',
    description({ buff, level }) {
      return '';
    },
    constants: {
    },
    data: {
      hideBuff: true
    },
    events: {
      onApply({ buff, target, caster, actualBattle }) {
        
        const rand = Math.random();
        
        if (target.name === 'crab') {
          if (rand < 0.15) { // 15% chance to upgrade to citizen snips
            target.name = 'citizen snips';
            target.icon = 'citizensnips.png';
            target.stats.health *= 1.25;
            target.stats.healthMax *= 1.25;
            target.stats.attack *= 1.3;
            target.stats.attackMax *= 1.3;
            target.stats.defense *= 1.15;
            target.stats.accuracy *= 1.3;
            notifyChangeForUnitProperty({unit: target, property: 'name', actualBattle});
            notifyChangeForUnitProperty({unit: target, property: 'icon', actualBattle});
          }
        } else if (target.name === 'farmer') {
          if (rand < 0.15) {
            target.name = 'townsfolk';
            target.stats.health *= 1.15;
            target.stats.healthMax *= 1.15;
            notifyChangeForUnitProperty({unit: target, property: 'name', actualBattle});
          } else if (rand < 0.30) {
            target.name = 'pauper';
            notifyChangeForUnitProperty({unit: target, property: 'name', actualBattle});
          } else if (rand < 0.45) {
            target.name = 'rancher';
            notifyChangeForUnitProperty({unit: target, property: 'name', actualBattle});
          } else if (rand < 0.60) {
            target.name = 'beggar';
            notifyChangeForUnitProperty({unit: target, property: 'name', actualBattle});
          }
        } else if (target.name === 'fish') {
          if (rand < 0.15) { // 15% chance to upgrade to piranha
            target.name = 'piranha';
            target.stats.health *= 1.15;
            target.stats.healthMax *= 1.15;
            target.stats.attack *= 1.1;
            target.stats.attackMax *= 1.1;
            target.stats.defense *= 0.9;
            target.stats.armor *= 0.9;
            target.stats.accuracy *= 1.2;
            notifyChangeForUnitProperty({unit: target, property: 'name', actualBattle});
          } else if (rand < 0.20) { // 5% chance to upgrade to baracuda
            target.name = 'baracuda';
            target.stats.health *= 1.3;
            target.stats.healthMax *= 1.3;
            target.stats.attack *= 1.2;
            target.stats.attackMax *= 1.3;
            target.stats.defense *= 0.7;
            target.stats.armor *= 0.8;
            target.stats.accuracy *= 1.3;
            notifyChangeForUnitProperty({unit: target, property: 'name', actualBattle});
          }
        } else if (target.name === 'lizard') {
          if (rand < 0.05) { // 5% chance to upgrade to basilisk
            target.name = 'basilisk';
            target.icon = 'basilisk.svg';
            target.stats.health *= 1.25;
            target.stats.healthMax *= 1.25;
            target.stats.attack *= 1.5;
            target.stats.attackMax *= 1.5;
            target.stats.defense *= 1.2;
            target.stats.armor *= 1.2;
            target.stats.accuracy *= 1.2;
            notifyChangeForUnitProperty({unit: target, property: 'name', actualBattle});
            notifyChangeForUnitProperty({unit: target, property: 'icon', actualBattle});
          }
        } else if (target.name === 'goblin') {
          if (rand < 0.15) { // 15% chance to upgrade to goblin warrior
            target.name = 'warrior';
            target.stats.health *= 1.15;
            target.stats.healthMax *= 1.15;
            target.stats.attack *= 1.2;
            target.stats.attackMax *= 1.2;
            target.stats.defense *= 1.2;
            target.stats.armor *= 1.2;
            target.stats.accuracy *= 1.1;
            notifyChangeForUnitProperty({unit: target, property: 'name', actualBattle});
          } else if (rand < 0.05) { // 5% chance to upgrade to goblin chieftain
            target.name = 'chieftain';
            target.stats.health *= 1.65;
            target.stats.healthMax *= 1.65;
            target.stats.attack *= 1.35;
            target.stats.attackMax *= 1.4;
            target.stats.defense *= 0.9;
            target.stats.armor *= 0.8;
            target.stats.accuracy *= 1.2;
            notifyChangeForUnitProperty({unit: target, property: 'name', actualBattle});
          }
        } else if (target.name === 'young ninja') {
          if (rand < 0.10) { // 10% chance to upgrade to adept ninja
            target.name = 'adept ninja';
            target.stats.health *= 1.15;
            target.stats.healthMax *= 1.15;
            target.stats.attack *= 1.1;
            target.stats.attackMax *= 1.1;
            target.stats.defense *= 1.2;
            target.stats.armor *= 0.9;
            target.stats.accuracy *= 1.1;
            notifyChangeForUnitProperty({unit: target, property: 'name', actualBattle});
            const newBuff = {
              id: 'phantom_strikes',
              data: {
                duration: Infinity,
                totalDuration: Infinity,
                icon: 'phantomStrikes.svg',
                name: 'phantom strikes',
                level: 1
              },
              constants: BUFFS['phantom_strikes']
            };
            addBuff({ buff: newBuff, target: target, caster: target, actualBattle });
          }
        } else if (target.name === 'monk ninja') {
          if (rand < 0.10) { // 10% chance to upgrade to wise monk
            target.name = 'wise monk';
            target.stats.attack *= 1.1;
            target.stats.attackMax *= 1.1;
            target.stats.defense *= 1.2;
            target.stats.armor *= 0.9;
            target.stats.accuracy *= 1.1;
            notifyChangeForUnitProperty({unit: target, property: 'name', actualBattle});
            const newBuff = {
              id: 'phantom_strikes',
              data: {
                duration: Infinity,
                totalDuration: Infinity,
                icon: 'phantomStrikes.svg',
                name: 'phantom strikes',
                level: 1
              },
              constants: BUFFS['phantom_strikes']
            };
            addBuff({ buff: newBuff, target: target, caster: target, actualBattle });
          }
        } else if (target.name === 'demon') {
          if (rand < 0.10) { // 10% chance to upgrade to vile demon
            target.name = 'vile demon';
            target.stats.health *= 1.5;
            target.stats.healthMax *= 1.5;
            target.stats.attack *= 1.2;
            target.stats.attackMax *= 2.0;
            target.stats.defense *= 1.2;
            target.stats.armor *= 1.2;
            target.stats.accuracy *= 1.2;
            notifyChangeForUnitProperty({unit: target, property: 'name', actualBattle});
          }
        } else if (target.name === 'angel') {
          if (rand < 0.10) { // 10% chance to upgrade to high angel
            target.name = 'high angel';
            target.stats.health *= 1.75;
            target.stats.healthMax *= 1.75;
            target.stats.attack *= 1.2;
            target.stats.attackMax *= 2.0;
            target.stats.defense *= 1.2;
            target.stats.armor *= 1.2;
            target.stats.accuracy *= 1.2;
            notifyChangeForUnitProperty({unit: target, property: 'name', actualBattle});
          }
        } else if (target.name === 'cut purse') {
          if (rand < 0.10) { // 10% chance to upgrade to thief
            target.name = 'thief';
            target.stats.attack *= 1.2;
            target.stats.attackMax *= 1.2;
            target.stats.defense *= 1.2;
            target.stats.armor *= 1.2;
            target.stats.accuracy *= 1.2;
            notifyChangeForUnitProperty({unit: target, property: 'name', actualBattle});
          } else if (rand < 0.15) { // 5% chance to upgrade to mercenary
            target.name = 'mercenary';
            target.stats.health *= 1.2;
            target.stats.healthMax *= 1.2;
            target.stats.attack *= 1.3;
            target.stats.attackMax *= 1.3;
            target.stats.defense *= 1.1;
            target.stats.armor *= 1.1;
            target.stats.accuracy *= 1.2;
            notifyChangeForUnitProperty({unit: target, property: 'name', actualBattle});
          }
        } else if (target.name === 'beaver') {
          if (rand < 0.10) { // 10% chance to upgrade to dire beaver
            target.name = 'dire beaver';
            target.stats.health *= 1.25;
            target.stats.healthMax *= 1.25;
            target.stats.attack *= 1.15;
            target.stats.attackMax *= 1.65;
            target.stats.defense *= 0.8;
            target.stats.armor *= 0.5;
            target.stats.accuracy *= 1.15;
            notifyChangeForUnitProperty({unit: target, property: 'name', actualBattle});
          }
        } else if (target.name === 'snake') {
          if (rand < 0.20) {
            target.name = 'cobra';
            notifyChangeForUnitProperty({unit: target, property: 'name', actualBattle});
          } else if (rand < 0.40) {
            target.name = 'black mamba';
            notifyChangeForUnitProperty({unit: target, property: 'name', actualBattle});
          } else if (rand < 0.60) {
            target.name = 'diamondback';
            notifyChangeForUnitProperty({unit: target, property: 'name', actualBattle});
          } else if (rand < 0.80) {
            target.name = 'coral snake';
            notifyChangeForUnitProperty({unit: target, property: 'name', actualBattle});
          }
        } else if (target.name === 'angry miner') {
          if (rand < 0.10) { // 10% chance to upgrade to furious miner
            target.name = 'furious miner';
            target.stats.health *= 0.8;
            target.stats.healthMax *= 0.8;
            target.stats.attack *= 1.15;
            target.stats.attackMax *= 1.15;
            target.stats.defense *= 0.8;
            target.stats.armor *= 0.7;
            target.stats.accuracy *= 1.15;
            notifyChangeForUnitProperty({unit: target, property: 'name', actualBattle});
          }
        } else if (target.name.indexOf(' mage') !== -1) {
          if (rand < 0.15) {
            if (target.name === 'water mage') {
              target.name = 'water wizard';
            } else if (target.name === 'earth mage') {
              target.name = 'earth wizard';
            } else if (target.name === 'fire mage') {
              target.name = 'fire wizard';
            } else if (target.name === 'blue mage') {
              target.name = 'blue wizard';
            }
            target.stats.health *= 1.5;
            target.stats.healthMax *= 1.5;
            target.stats.defense *= 1.1;
            target.stats.armor *= 1.1;
            target.stats.magicPower *= 1.25;
            target.stats.magicArmor *= 1.5;
            notifyChangeForUnitProperty({unit: target, property: 'name', actualBattle});
            const newBuff = {
              id: 'sixth_sense',
              data: {
                duration: Infinity,
                totalDuration: Infinity,
                icon: 'sixthSense.svg',
                name: 'watchful aura'
              },
              constants: BUFFS['sixth_sense']
            };
            addBuff({ buff: newBuff, target: target, caster: target, actualBattle });
          }
        } else if (target.name === 'spider') {
          if (rand < 0.05) { // 5% chance to upgrade to terrorantula
            target.name = 'terrorantula';
            target.icon = 'terrorantula.svg';
            target.stats.health *= 1.75;
            target.stats.healthMax *= 1.75;
            target.stats.attack *= 1.15;
            target.stats.attackMax *= 1.25;
            target.stats.defense *= 0.8;
            target.stats.armor *= 0.7;
            target.stats.accuracy *= 1.15;
            notifyChangeForUnitProperty({unit: target, property: 'name', actualBattle});
            notifyChangeForUnitProperty({unit: target, property: 'icon', actualBattle});
          } else if (rand < 0.15) { // 10% chance to upgrade to black widow
            target.name = 'black widow';
            target.stats.health *= 1.5;
            target.stats.healthMax *= 1.5;
            target.stats.accuracy *= 1.15;
            notifyChangeForUnitProperty({unit: target, property: 'name', actualBattle});
          }
        }
        
        buff.data.done = true;
        removeBuff({buff, target, caster, actualBattle});
      },

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
        if (buff.data.done) {
          removeBuff({buff, target, caster, actualBattle});
        }
      },

      onRemove({ buff, target }) {
      }
    }
  },

  stolen_stats: {
    duplicateTag: 'stolen_stats', // Used to stop duplicate buffs
    icon: 'goblin.svg',
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
        buff.duration -= secondsElapsed;

        if (buff.duration < 0) {
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
    icon: 'goblin.svg',
    name: 'stat stealer',
    description({ buff, level }) {
      return `Every 15s the goblin steals a random players stats. Gaining 50% of the stolen stat permanently`;
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
        buff.stacks = Math.round(buff.data.timeTillSteal);

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
              icon: 'goblin.svg',
              allowDuplicates: true
            }
          };

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
    icon: 'spectre.svg',
    name: 'spirit blink',
    description({ buff, level }) {
    },
    constants: {
    },
    data: {
      duration: Infinity,
      totalDuration: Infinity,
      hideBuff: true,
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
        buff.data.hideBuff = true;
      },

      onTick({ secondsElapsed, buff, target, caster }) {
        if (!buff.data.timeTillBlink) {
          buff.data.timeTillBlink = 6 + (Math.random() * 7);
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
              icon: 'spectre.svg'
            }
          };

          buff.data.timeTillBlink = 6 + (Math.random() * 7);

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
    icon: 'youngNinja.svg',
    name: 'ninja reflexes',
    description({ buff, level }) {
    },
    constants: {
    },
    data: {
      duration: Infinity,
      totalDuration: Infinity,
      hideBuff: true
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
        buff.data.hideBuff = true;
      },

      onTookDamage({ buff, defender, attacker, actualBattle }) {
        const constants = (buff.constants && buff.constants.constants) ? buff.constants.constants : BUFFS[buff.id].constants;
        if (Math.random() <= 0.1) {
          const hasEvasive = _.find(defender.buffs, (buff) => {
            return buff.id === 'evasive_maneuvers';
          });

          if (!hasEvasive) {
            const iconToUse = ((buff.data.icon) ? buff.data.icon : ((buff.constants) ? buff.constants.icon : 'evasiveManeuvers.svg'));
            const newBuff = {
              id: 'evasive_maneuvers',
              icon: iconToUse,
              data: {
                duration: 3,
                totalDuration: 3,
                level: 1,
                icon: iconToUse
              }
            };

            addBuff({ buff: newBuff, target: defender, caster: defender });
          }
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
    icon: 'berserk.svg',
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
        const constants = (buff.constants && buff.constants.constants) ? buff.constants.constants : BUFFS[buff.id].constants;
        if (defender.stats.health <= (defender.stats.healthMax * 0.2)) {

          const newBuff = {
            id: 'dwarfs_rage',
            data: {
              duration: Infinity,
              totalDuration: Infinity,
              icon: 'dwarfsRage.svg',
              description: 'Massively increased offensive stats. More vulnerable to magic.'
            }
          };

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
          buff.data.timeTillRabbit = 8 + Math.random () * 3;
        } else {
          buff.data.timeTillRabbit -= secondsElapsed;
          const newStacks = Math.round(buff.data.timeTillRabbit);
          if (buff.stacks !== newStacks) {
            buff.stacks = newStacks;
          }

          if (buff.data.timeTillRabbit <= 0) {
            buff.data.timeTillRabbit = 15 + Math.random () * 5;
            const newRabbit = Object.assign({}, target.raw(), {
              id: uuid.v4()
            });
            actualBattle.addUnit(newRabbit);
            target.removeBuff(buff);
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
    icon: 'healingReduction.svg',
    name: 'healing reduction',
    description({ buff, level }) {
      const c = buff.constants;
      return `Reduces healing received`;
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
        buff.duration -= secondsElapsed;

        if (buff.duration < 0) {
          removeBuff({ buff, target, caster });
        }
      },

      onRemove({ buff, target }) {
        if (buff.data.healingReduction) {
          target.stats.healingReduction /= buff.data.healingReduction;
        }
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
        if (Math.random() <= 0.05 && !_.findWhere(defender.buffs, { id: 'mud_armor' })) {
          const newBuff = {
            id: 'mud_armor',
            data: {
              duration: 15,
              totalDuration: 15,
              icon: 'mudArmor.svg',
              description: ''
            }
          };

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
            icon: 'earthDart.svg',
            description: ''
          }
        };

        // cast earth dart
        addBuff({ buff: newBuff, target: defender, caster: attacker, actualBattle });
      },

      onRemove({ buff, target, caster }) {
        // Blank
      }
    }
  },

  water_mage_monster: {
    duplicateTag: 'water_mage_monster', // Used to stop duplicate buffs
    icon: '',
    name: 'water mage',
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
        if (Math.random() <= 0.05 && !_.findWhere(attacker.buffs, { id: 'frosted_attacks' })) {
          const newBuff = {
            id: 'frosted_attacks',
            data: {
              duration: 10,
              totalDuration: 10,
              attackSpeedDecrease: 25,
              icon: 'frostedAttacks.svg',
              description: 'Reduces your attack speed by 25%',
              name: 'Frosted Attacks'
            }
          };

          // cast frost attack
          addBuff({ buff: newBuff, target: attacker, caster: defender, actualBattle });
        }
      },

      onDidDamage({ buff, defender, attacker, actualBattle }) {
        if (Math.random() <= 0.6) {
          const newBuff = {
            id: 'water_dart',
            data: {
              duration: 0,
              totalDuration: 0,
              icon: 'waterDart.svg',
              description: ''
            },
            constants: BUFFS['water_dart']
          };

          const target = _.sample(actualBattle.enemies);

          // cast water dart
          addBuff({ buff: newBuff, target, caster: attacker, actualBattle });
        }
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
        if (Math.random() <= 0.05 && !_.findWhere(attacker.buffs, { id: 'ignite' })) {
          const newBuff = {
            id: 'ignite',
            data: {
              duration: 15,
              totalDuration: 15,
              icon: 'ignite.svg',
              description: ''
            }
          };

          // cast ignite
          addBuff({ buff: newBuff, target: attacker, caster: defender, actualBattle });
        }
      },

      onDidDamage({ buff, defender, attacker, actualBattle }) {
        if (Math.random() <= 0.5) {
          const newBuff = {
            id: 'fire_dart',
            data: {
              duration: 0,
              totalDuration: 0,
              icon: 'fireDart.svg',
              description: ''
            }
          };

          // cast fire dart
          addBuff({ buff: newBuff, target: defender, caster: attacker, actualBattle });
        }
      },

      onRemove({ buff, target, caster }) {
        // Blank
      }
    }
  },

  attack_reduction: {
    duplicateTag: 'attack_reduction', // Used to stop duplicate buffs
    icon: 'attackReduction.svg',
    name: 'attack reduction',
    description({ buff, level }) {
      const c = buff.constants;
      return `Reduces your attack`;
    },
    constants: {
    },
    data: {
      duration: 0,
      totalDuration: 0,
      allowDuplicates: true
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {
        if (target.stats.attack <= 0) {
          buff.data.attack = 0;
          return;
        }

        if (target.stats.attack - buff.data.attack <= 0) {
          buff.data.attack -= Math.abs(target.stats.attack - buff.data.attack);
        }

        target.stats.attack -= buff.data.attack;
        target.stats.attackMax -= buff.data.attack;
      },

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
        buff.duration -= secondsElapsed;

        if (buff.duration < 0) {
          removeBuff({ buff, target, caster });
        }
      },

      onRemove({ buff, target }) {
        target.stats.attack += buff.data.attack;
        target.stats.attackMax += buff.data.attack;
      }
    }
  },

  armor_reduction: {
    duplicateTag: 'armor_reduction', // Used to stop duplicate buffs
    icon: 'armorReduction.svg',
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

        // Determine armor to take
        const flatArmorReduction = target.stats.armor * (1 - buff.data.armorReduction);
        buff.data.flatArmorReduction = flatArmorReduction;
        target.stats.armor -= buff.data.flatArmorReduction;
      },

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
        buff.duration -= secondsElapsed;

        if (buff.duration < 0) {
          removeBuff({ buff, target, caster });
        }
      },

      onRemove({ buff, target }) {
        target.stats.armor += buff.data.flatArmorReduction;
      }
    }
  },

  magic_armor_reduction: {
    duplicateTag: 'magic_armor_reduction', // Used to stop duplicate buffs
    icon: 'magicArmorReduction.svg',
    name: 'magic armor reduction',
    description({ buff, level }) {
      const c = buff.constants;
      return `Reduces your magic armor`;
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

        // Determine armor to take
        const flatArmorReduction = buff.data.armorReduction;
        buff.data.flatArmorReduction = flatArmorReduction;
        target.stats.magicArmor -= buff.data.flatArmorReduction;
      },

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
        buff.duration -= secondsElapsed;

        if (buff.duration < 0) {
          removeBuff({ buff, target, caster });
        }
      },

      onRemove({ buff, target }) {
        target.stats.magicArmor += buff.data.flatArmorReduction;
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
        const constants = (buff.constants && buff.constants.constants) ? buff.constants.constants : BUFFS[buff.id].constants;
        const healingReduction = 0.25;
        const newBuff = {
          id: 'healing_reduction',
          data: {
            duration: 20,
            totalDuration: 20,
            healingReduction,
            icon: 'healingReduction.svg',
            description: `Reduces healing received by ${Math.round((1 - healingReduction) * 100)}%`
          }
        };

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
        const constants = (buff.constants && buff.constants.constants) ? buff.constants.constants : BUFFS[buff.id].constants;
        const bleedChance = 0.2;

        if (Math.random() <= bleedChance) {
          const newBuff = {
            id: 'bleed_proper',
            data: {
              duration: 15,
              totalDuration: 15,
              dps: attacker.stats.attackMax / 15,
              caster: attacker.id,
              timeTillDamage: 1,
              allowDuplicates: true,
              icon: 'bleeding.svg',
              name: 'bleed',
              description: `Bleed every second for ${(attacker.stats.attackMax / 15).toFixed(2)} damage`
            }
          };

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

  vampire_monster: {
    duplicateTag: 'vampire_monster', // Used to stop duplicate buffs
    icon: '',
    name: 'vampire monster',
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
        const constants = (buff.constants && buff.constants.constants) ? buff.constants.constants : BUFFS[buff.id].constants;
        const bleedChance = 0.66;

        if (Math.random() <= bleedChance) {
          const newBuff = {
            id: 'bleed_proper',
            data: {
              duration: 3,
              totalDuration: 3,
              dps: attacker.stats.attackMax / 6,
              caster: attacker.id,
              timeTillDamage: 1,
              icon: 'bleeding.svg',
              name: 'bleed',
              description: `Bleed every second for ${(attacker.stats.attackMax / 6).toFixed(2)} damage`
            }
          };

          const accuracyBuff = {
            id: 'accuracy_up',
            data: {
              duration: 3,
              totalDuration: 3,
              allowDuplicates: true,
              level: 2,
              icon: 'accuracy.svg',
              name: 'accuracy'
            }
          };

          // Add bleed debuff
          addBuff({ buff: newBuff, target: defender, caster: attacker });
          // Add accuracy buff
          addBuff({ buff: accuracyBuff, target: attacker, caster: attacker });
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
        const constants = (buff.constants && buff.constants.constants) ? buff.constants.constants : BUFFS[buff.id].constants;

        // Does this unit have poison? remove poison + heal
        const poisonedCount = defender.buffs.filter((buff) => {
          return buff.id === 'basic_poison';
        }).length;

        if (poisonedCount >= 1) {
          const totalHeal =  ((defender.stats.defense * poisonedCount) / 2);
          actualBattle.healTarget(totalHeal, {
            caster: defender,
            target: defender,
            historyStats: actualBattle.historyStats,
            tickEvents: actualBattle.tickEvents
          });

          defender.buffs.forEach((buff) => {
            if (buff.id === 'basic_poison' && buff.duration > 1) {
              buff.duration = 0.2;
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

  monk: {
    duplicateTag: 'monk', // Used to stop duplicate buffs
    icon: '',
    name: 'monk',
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
        defender.stats.attack *= 1.03;
        defender.stats.attackMax *= 1.03;
        buff.stacks += 1;
      },

      onTick({ secondsElapsed, buff, target, caster }) {
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
        buff.stacks = buff.data.hitsRequired;

        if (buff.data.hitsRequired <= 0) {
          defender.stats.armor -= 2000;
          defender.stats.magicArmor -= 2000;
          if (defender.stats.armor <= 1) {
            defender.stats.armor = 1;
          }
          if (defender.stats.magicArmor <= 1) {
            defender.stats.magicArmor = 1;
          }
          removeBuff({ buff, target: defender, caster: defender, actualBattle });
        }
      },

      onTick({ secondsElapsed, buff, target, caster }) {
        // Blank
        if (buff.data.hitsRequired == null) {
          buff.data.hitsRequired = 45;
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
            target.stats.attackMax *= 1 + (decimal / 1.75);
            target.stats.attack *= 1 + (decimal / 1.75);
            target.stats.accuracy *= 1 + (decimal / 1.75);
            buff.data.lastMissingHp = missingHp;
          }
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
        if (Math.random() <= 0.25) {
          const constants = (buff.constants && buff.constants.constants) ? buff.constants.constants : BUFFS[buff.id].constants;
          const armorReduction = 0.66;
          const newBuff = {
            id: 'armor_reduction',
            data: {
              duration: 10,
              allowDuplicates: true,
              duplicateCap: 2,
              totalDuration: 10,
              armorReduction,
              icon: 'armorReduction.svg',
              description: `Reduces your armor by ${Math.round((1 - armorReduction) * 100)}%`
            }
          };

          // Add armor reduction buff
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

  gelatinous_cube_monster: {
    duplicateTag: 'gelatinous_cube_monster', // Used to stop duplicate buffs
    icon: '',
    name: 'gelatinous cube monster',
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

      onTookDamage({ buff, defender, actualBattle }) {
        // spawn three minicubes when HP drops below 15%
        const healthPercentage = defender.stats.health / defender.stats.healthMax * 100;
        if (healthPercentage <= buff.data.splitHealthPercentage && !buff.data.hasSplit && buff.stacks > 0) {
          buff.stacks -= 1;
          for (let i = 0; i < buff.data.splitAmount; i++) {
            let newCube = Object.assign({}, defender.raw(), {
              id: uuid.v4()
            });
            newCube.stats.health = defender.stats.healthMax / (buff.data.splitAmount + 1);
            newCube.stats.healthMax = defender.stats.healthMax / (buff.data.splitAmount + 1);
            newCube.target = _.sample(actualBattle.units).id;
            actualBattle.addUnit(newCube);
            const newBuff = {
              id: 'gelatinous_cube_monster',
              stacks: buff.stacks,
              data: {
                duration: Infinity,
                totalDuration: Infinity,
                icon: 'cubeSplit.svg',
                name: 'gelatinous cube',
                splitHealthPercentage: 15,
                splitAmount: buff.splitAmount,
                hasSplit: false
              },
              constants: BUFFS['gelatinous_cube_monster']
            };
            addBuff({ buff: newBuff, target: newCube, caster: newCube, actualBattle });
          }
          buff.data.hasSplit = true;
        }
      },

      onBeforeDeath({ buff, target, actualBattle }) {
        // spawn cubes if mob is killed without spawning previously
        if (!buff.data.hasSplit && buff.stacks > 0) {
          buff.stacks -= 1;
          for (let i = 0; i < buff.data.splitAmount; i++) {
            let newCube = Object.assign({}, target.raw(), {
              id: uuid.v4()
            });
            newCube.stats.health = target.stats.healthMax / (buff.data.splitAmount + 1);
            newCube.stats.healthMax = target.stats.healthMax / (buff.data.splitAmount + 1);
            newCube.target = _.sample(actualBattle.units).id;
            actualBattle.addUnit(newCube);
            const newBuff = {
              id: 'gelatinous_cube_monster',
              stacks: buff.stacks,
              data: {
                duration: Infinity,
                totalDuration: Infinity,
                icon: 'cubeSplit.svg',
                name: 'gelatinous cube',
                splitHealthPercentage: 15,
                splitAmount: buff.splitAmount,
                hasSplit: false
              },
              constants: BUFFS['gelatinous_cube_monster']
            };
            addBuff({ buff: newBuff, target: newCube, caster: newCube, actualBattle });
          }
          buff.data.hasSplit = true;
        }
      },

      onRemove({ buff, target, caster }) {
        // Blank
      }
    }
  }
};
