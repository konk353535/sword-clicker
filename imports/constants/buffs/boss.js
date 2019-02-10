import _ from 'underscore';
import lodash from 'lodash';
import { addBuff, removeBuff } from '../../battleUtils';
import { BUFFS } from './index.js';
import uuid from 'node-uuid';
// import { FLOORS } from '../../../server/constants/floors/index.js';
import { FAST_SPEED } from '../combat/attackSpeeds.js';

const WATER_PHASE = 0;
const EARTH_PHASE = 1;
const FIRE_PHASE = 2;
const AIR_PHASE = 3;

export const BOSS_BUFFS = {

  deep_wounds: {
    duplicateTag: 'deep_wounds', // Used to stop duplicate buffs
    icon: 'deepWounds.svg',
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

      onDidDamage({ buff, defender, attacker, actualBattle, secondsElapsed, rawDamage, damageDealt, originalAutoAttack }) {
        buff.duration -= secondsElapsed;

        if (buff.duration < 0) {
          removeBuff({ buff, target, caster });
        }
      },

      onTookDamage({ buff, defender, attacker, actualBattle, damageDealt }) {
        const constants = (buff.constants && buff.constants.constants) ? buff.constants.constants : BUFFS[buff.id].constants;

        const extraDamage = 0.1 * buff.stacks;
        const attackerDamage = attacker.stats.attack + ((attacker.stats.attackMax - attacker.stats.attack) / 2);

        actualBattle.dealDamage(extraDamage * attackerDamage, {
          attacker,
          defender,
          tickEvents: actualBattle.tickEvents,
          historyStats: actualBattle.historyStats
        });
      },

      onRemove({ buff, target }) {
      }
    }
  },

  boss_cougar: {
    duplicateTag: 'boss_cougar', // Used to stop duplicate buffs
    icon: 'puma.svg',
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
      },

      onDidDamage({ buff, defender, attacker, actualBattle, secondsElapsed, rawDamage, damageDealt, originalAutoAttack }) {
      },

      onDidDamage({ buff, defender, attacker, actualBattle }) {

        const DEEP_WOUNDS_DURATION = 10;

        // Does defender already have the buff?
        let targetBuff = _.findWhere(defender.buffs, { id: 'deep_wounds' });
        if (targetBuff) {
          targetBuff.duration = DEEP_WOUNDS_DURATION;
          targetBuff.stacks += 1;
        } else {
          const newBuff = {
            id: 'deep_wounds',
            data: {
              duration: DEEP_WOUNDS_DURATION,
              totalDuration: DEEP_WOUNDS_DURATION,
              stacks: 1,
              icon: 'deepWounds.svg',
              description: ''
            }
          };

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
      },

      onDidDamage({ buff, defender, attacker, actualBattle, secondsElapsed, rawDamage, damageDealt, originalAutoAttack }) {
        buff.data.timeTillSpawn -= secondsElapsed;

        // So user can see how far away spawn is
        buff.stacks = Math.round(buff.data.timeTillSpawn);

        if (!buff.data.timeTillSpawn || buff.data.timeTillSpawn <= 0) {
          const snakeStats = lodash.cloneDeep(target.stats.raw());
          snakeStats.health = 100;
          snakeStats.healthMax = 100;
          snakeStats.attack *= 0.3;
          snakeStats.attackMax *= 0.3;

          // Spawn little snake
          const littleSnake = {
            id: uuid.v4(),
            isEnemy: true,
            tickOffset: 0,
            icon: 'snake.svg',
            name: 'snake',
            stats: snakeStats,
            buffs: [{
              id: 'poisoned_blade',
              data: {
                icon: 'poisonedBlade.svg',
                duration: Infinity,
                totalDuration: Infinity,
                level: 25
              }
            }]
          };

          actualBattle.addUnit(littleSnake);

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
    icon: 'boneWarrior.svg',
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
      },

      onTookDamage({ buff, attacker, defender, actualBattle, secondsElapsed, damageDealt }) {
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
                icon: 'bladeSpin.svg',
                description: ''
              },
              constants: BUFFS['blade_spin']
            };

            // cast earth dart
            addBuff({ buff: newBuff, target: unit, caster: defender, actualBattle });
          });
        }
      },

      onRemove({ buff, target }) {
      }
    }
  },

  boss_spartan: {
    duplicateTag: 'boss_spartan', // Used to stop duplicate buffs
    icon: 'spartan.svg',
    name: 'boss spartan',
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
      },

      onDidDamage({ buff, defender, attacker, actualBattle, secondsElapsed, rawDamage, damageDealt, originalAutoAttack }) {

        if (!buff.data.spartansSpawned) {

          for (let i = 0; i < 2; i++) {
            const spartanStats = lodash.cloneDeep(target.stats.raw());
            spartanStats.health = 200;
            spartanStats.healthMax = 200;
            spartanStats.attack *= 0.3;
            spartanStats.attackMax *= 0.3;

            // Spawn little snake
            const littleSpartan = {
              id: uuid.v4(),
              isEnemy: true,
              tickOffset: 0,
              icon: 'spartan.svg',
              name: 'spartan',
              stats: spartanStats,
              buffs: [{
                id: 'phalanx',
                data: {
                  duration: Infinity,
                  totalDuration: Infinity,
                  icon: 'phalanx.svg',        
                  name: 'phalanx'
                }
              }]
            };

            actualBattle.addUnit(littleSpartan);
          }

          buff.data.spartansSpawned = true;
        }
      },

      onRemove({ buff, target }) {
      }
    }
  },

  boss_mage: {
    duplicateTag: 'boss_mage', // Used to stop duplicate buffs
    icon: 'boss mage',
    name: 'boss mage',
    description({ buff, level }) {
      const c = buff.constants;
      return `Incrementally summons birds`;
    },
    constants: {
    },
    data: {
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {

      },

      onDidDamage({ buff, defender, attacker, actualBattle, secondsElapsed, rawDamage, damageDealt, originalAutoAttack }) {
        buff.data.timeTillSpawn -= secondsElapsed;

        // So user can see how far away spawn is
        buff.stacks = Math.round(buff.data.timeTillSpawn);

        if (!buff.data.timeTillSpawn || buff.data.timeTillSpawn <= 0) {

          const birdStats = lodash.cloneDeep(target.stats.raw());
          birdStats.health = 150;
          birdStats.healthMax = 150;
          birdStats.defense *= 0.6;
          birdStats.armor *= 0.4;
          birdStats.attack *= 0.1;
          birdStats.attackMax *= 0.1;
          birdStats.accuracy *= 1.5;
          birdStats.magicPower = 20;

          // Spawn little bird
          const littlebird = {
            id: uuid.v4(),
            tickOffset: 0,
            isEnemy: true,
            icon: 'bird.svg',
            name: 'bird',
            buffs: [{
              id: 'boss_mage_bird',
              data: {
                icon: 'bird.svg'
              }
            }],
            stats: birdStats
          };

          actualBattle.addUnit(littlebird);

          buff.data.timeTillSpawn = 15;
        }
      },

      onRemove({ buff, target }) {
      }
    }
  },

  boss_mage_bird: {
    duplicateTag: 'boss_mage_bird', // Used to stop duplicate buffs
    icon: 'bossMageBird.svg',
    name: 'boss mage bird',
    description({ buff, level }) {
      const c = buff.constants;
      return `Explodes on death`;
    },
    constants: {
    },
    data: {
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {
      },

      onDidDamage({ buff, defender, attacker, actualBattle, secondsElapsed, rawDamage, damageDealt, originalAutoAttack }) {
      },

      onRemove({ buff, target }) {
      },

      onBeforeDeath({ buff, target, actualBattle }) {
        // cast ignite on all units
        actualBattle.units.forEach((unit) => {
          if (unit.id === target.target) {
            target.stats.health = 150;
            const newBuff = {
              id: 'ignite',
              data: {
                duration: 10,
                totalDuration: 10,
                icon: 'ignite.svg',
                description: 'Burns you each second'
              }
            };

            addBuff({ buff: newBuff, target: unit, caster: target, actualBattle });
            target.stats.health = 0;
          }
        });
      }
    }
  },

  boss_goblin: {
    duplicateTag: 'boss_goblin', // Used to stop duplicate buffs
    icon: 'goblin.svg',
    name: 'boss goblin',
    description({ buff, level }) {
      const c = buff.constants;
      return ``;
    },
    constants: {
    },
    data: {
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {
      },

      onDidDamage({ buff, defender, attacker, actualBattle, secondsElapsed, rawDamage, damageDealt, originalAutoAttack }) {

        buff.data.timeTillSpawn -= secondsElapsed;

        // So user can see how far away spawn is
        buff.stacks = Math.round(buff.data.timeTillSpawn);

        if (!buff.data.timeTillSpawn || buff.data.timeTillSpawn <= 0) {

          for (let i = 0; i < 3; i++) {
            const goblinStats = lodash.cloneDeep(target.stats.raw());
            goblinStats.health = 150;
            goblinStats.healthMax = 150;
            goblinStats.defense *= 0.6;
            goblinStats.attack *= 0.1;
            goblinStats.attackMax *= 0.1;
            goblinStats.accuracy *= 2;

            // Spawn little goblin
            const littleGoblin = {
              id: uuid.v4(),
              tickOffset: 0,
              isEnemy: true,
              icon: 'goblin.svg',
              name: 'goblin',
              stats: goblinStats,
              buffs: [{
                id: 'goblin_stat_stealer',
                data: {
                  duration: Infinity,
                  totalDuration: Infinity,
                  timeTillSteal: 15,
                  icon: 'goblin.svg',        
                  name: 'goblin stat stealer'
                }
              }]
            };

            actualBattle.addUnit(littleGoblin);
          }

          buff.data.timeTillSpawn = 90;
        }
      },

      onRemove({ buff, target }) {
      }
    }
  },

  boss_ogre: {
    duplicateTag: 'boss_ogre', // Used to stop duplicate buffs
    icon: 'ogre.svg',
    name: 'boss ogre',
    description({ buff, level }) {
      const c = buff.constants;
      return ``;
    },
    constants: {
    },
    data: {
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {
      },

      onDidDamage({ buff, defender, attacker, actualBattle, secondsElapsed, rawDamage, damageDealt, originalAutoAttack }) {

      },

      onDidDamage({ buff, defender, attacker, actualBattle }) {
        attacker.target = _.sample(actualBattle.units).id;
      },

      onRemove({ buff, target }) {
      }
    }
  },
  
  boss_phoenix: {
    duplicateTag: 'boss_phoenix', // Used to stop duplicate buffs
    icon: 'spartan.svg',
    name: 'boss phoenix',
    description({ buff, level }) {
      return `Eternal`;
    },
    constants: {
    },
    data: {
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {
      },

      onDidDamage({ buff, defender, attacker, actualBattle, secondsElapsed, rawDamage, damageDealt, originalAutoAttack }) {

        if (!buff.data.phoenixsSpawned) {

          for (let i = 0; i < 2; i++) {
            const phoenixStats = lodash.cloneDeep(target.stats.raw());
            phoenixStats.health = 500;
            phoenixStats.healthMax = 500;
            phoenixStats.attackSpeed = 0.001;
            phoenixStats.attackMax /= 3;
            phoenixStats.attack /= 3;
            phoenixStats.armor /= 3;

            // Spawn little snake
            const phoenixEgg = {
              id: uuid.v4(),
              tickOffset: 0,
              isEnemy: true,
              icon: 'phoenixEgg.svg',
              name: 'phoenix egg',
              stats: phoenixStats,
              buffs: [{
                id: 'phoenix_egg',
                data: {
                  duration: Infinity,
                  totalDuration: Infinity,
                  timeTillSpawn: 60,
                  icon: 'babyPhoenix.svg',        
                  name: 'baby phoenix'
                }
              }]
            };

            actualBattle.addUnit(phoenixEgg);
          }

          buff.data.phoenixsSpawned = true;
        }
      },

      onRemove({ buff, target }) {
      }
    }
  },

  phoenix_egg: {
    duplicateTag: 'phoenix_egg', // Used to stop duplicate buffs
    icon: 'phoenixEgg.svg',
    name: 'phoenix egg',
    description({ buff, level }) {
      const c = buff.constants;
      return ``;
    },
    constants: {
    },
    data: {
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {
      },

      onDidDamage({ buff, defender, attacker, actualBattle, secondsElapsed, rawDamage, damageDealt, originalAutoAttack }) {

        buff.data.timeTillSpawn -= secondsElapsed;

        // So user can see how far away spawn is
        buff.stacks = Math.round(buff.data.timeTillSpawn);

        if (!buff.data.timeTillSpawn || buff.data.timeTillSpawn <= 0) {

          const phoenixStats = lodash.cloneDeep(target.stats.raw());
          phoenixStats.health = target.stats.health;
          phoenixStats.healthMax = target.stats.health;
          phoenixStats.attackSpeed = 0.5;
          phoenixStats.armor *= 3;

          // Spawn little goblin
          const littlePhoenix = {
            id: uuid.v4(),
            tickOffset: 0,
            isEnemy: true,
            icon: 'babyPhoenix.svg',
            name: 'babyPhoenix',
            stats: phoenixStats,
            buffs: [{
              id: 'baby_phoenix',
              data: {
                duration: Infinity,
                totalDuration: Infinity,
                icon: 'phoenixEgg.svg',        
                name: 'phoenix egg'
              }
            }]
          };

          actualBattle.addUnit(littlePhoenix);

          buff.data.hasSpawned = true;
          target.stats.health = -1;
        }
      },

      onRemove({ buff, target }) {
      },

      onBeforeDeath({ buff, target, actualBattle }) {
        // Only respawn if boss phoenix exists
        if (!buff.data.hasSpawned && _.findWhere(actualBattle.enemies, { id: 'boss_phoenix' })) {

          const phoenixStats = lodash.cloneDeep(target.stats.raw());
          phoenixStats.health = 10;
          phoenixStats.healthMax = 10;
          phoenixStats.attackSpeed = 0.5;
          phoenixStats.armor *= 3;

          // Spawn little goblin
          const littlePhoenix = {
            id: uuid.v4(),
            tickOffset: 0,
            isEnemy: true,
            icon: 'babyPhoenix.svg',
            name: 'babyPhoenix',
            stats: phoenixStats,
            buffs: [{
              id: 'baby_phoenix',
              data: {
                duration: Infinity,
                totalDuration: Infinity,
                icon: 'phoenixEgg.svg',        
                name: 'phoenix egg'
              }
            }]
          };

          actualBattle.addUnit(littlePhoenix);
        }
      }
    }
  },

  baby_phoenix: {
    duplicateTag: 'baby_phoenix', // Used to stop duplicate buffs
    icon: 'babyPhoenix.svg',
    name: 'baby phoenix',
    description({ buff, level }) {
      const c = buff.constants;
      return `Returns to an egg on death`;
    },
    constants: {
    },
    data: {
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {
      },

      onDidDamage({ buff, defender, attacker, actualBattle, secondsElapsed, rawDamage, damageDealt, originalAutoAttack }) {
      },

      onRemove({ buff, target }) {
      },

      onBeforeDeath({ buff, target, actualBattle }) {
        // cast ignite on all units
        const phoenixStats = lodash.cloneDeep(target.stats.raw());
        phoenixStats.health = 500;
        phoenixStats.healthMax = 500;
        phoenixStats.attackSpeed = 0.001;
        phoenixStats.armor /= 3;

        // Spawn little snake
        const phoenixEgg = {
          id: uuid.v4(),
          isEnemy: true,
          tickOffset: 0,
          icon: 'phoenixEgg.svg',
          name: 'phoenix egg',
          stats: phoenixStats,
          buffs: [{
            id: 'phoenix_egg',
            data: {
              duration: Infinity,
              totalDuration: Infinity,
              timeTillSpawn: 120,
              icon: 'babyPhoenix.svg',  
              name: 'baby phoenix'
            }
          }]
        };

        actualBattle.addUnit(phoenixEgg);

      }
    }
  },

  boss_gorilla: {
    duplicateTag: 'boss_gorilla', // Used to stop duplicate buffs
    icon: 'boss gorilla',
    name: 'boss gorilla',
    description({ buff, level }) {
      const c = buff.constants;
      return `Gets smarter every 30 seconds`;
    },
    constants: {
    },
    data: {
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {
      },

      onDidDamage({ buff, defender, attacker, actualBattle, secondsElapsed, rawDamage, damageDealt, originalAutoAttack }) {
        buff.data.timeTillLearn -= secondsElapsed;
        buff.stacks = Math.round(buff.data.timeTillLearn);

        if (buff.stacks <= 0) {
          buff.stacks = 0;
        }
      },

      onDidDamage({ buff, defender, attacker, actualBattle }) {

        if (buff.data.timeTillLearn <= 0) {
          const LEARNT_DURATION = Infinity;

          // Does defender already have the buff?
          let targetBuff = _.findWhere(defender.buffs, { id: 'gorilla_learning' });
          if (targetBuff) {
            targetBuff.duration = LEARNT_DURATION;
            defender.stats.attackMax *= (1 - ((targetBuff.stacks * 2) / 100));
            defender.stats.attack *= (1 - ((targetBuff.stacks * 2) / 100));
            defender.stats.magicPower *= (1 - ((targetBuff.stacks * 2) / 100));

            if (defender.stats.attackMax <= 0) {
              defender.stats.attackMax = 1;
            }
            if (defender.stats.attack <= 0) {
              defender.stats.attack = 1;
            }
            if (defender.stats.magicPower <= 0) {
              defender.stats.magicPower = 1;
            }

            targetBuff.stacks *= 3;
          } else {
            const newBuff = {
              id: 'gorilla_learning',
              data: {
                duration: LEARNT_DURATION,
                totalDuration: LEARNT_DURATION,
                stacks: 1,
                icon: 'gorillaLearning.svg',
                description: 'Increases damage taken, and decrease damage dealt by 1% per stack'
              }
            };

            // cast learning buff
            addBuff({ buff: newBuff, target: defender, caster: attacker, actualBattle });
          }

          buff.data.timeTillLearn = 15;
        }
      },

      onRemove({ buff, target }) {
      }
    }
  },

  gorilla_learning: {
    duplicateTag: 'gorilla_learning', // Used to stop duplicate buffs
    icon: 'gorillaLearning.svg',
    name: 'gorilla learning',
    description({ buff, level }) {
      const c = buff.constants;
      return `Increases damage taken, and decrease damage dealt by 1% per stack`;
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

      onDidDamage({ buff, defender, attacker, actualBattle, secondsElapsed, rawDamage, damageDealt, originalAutoAttack }) {
        buff.duration -= secondsElapsed;

        if (buff.duration < 0) {
          removeBuff({ buff, target, caster });
        }
      },

      onTookDamage({ buff, defender, attacker, actualBattle, damageDealt }) {
        const constants = (buff.constants && buff.constants.constants) ? buff.constants.constants : BUFFS[buff.id].constants;

        const extraDamage = 0.01 * buff.stacks;
        const attackerDamage = attacker.stats.attack + ((attacker.stats.attackMax - attacker.stats.attack) / 2);
        actualBattle.dealDamage(extraDamage * attackerDamage, {
          attacker,
          defender,
          tickEvents: actualBattle.tickEvents,
          historyStats: actualBattle.historyStats
        });
      },

      onRemove({ buff, target }) {
      }
    }
  },

  boss_genie_lamp: {
    duplicateTag: 'boss_genie_lamp', // Used to stop duplicate buffs
    icon: 'bossGenieLamp.svg',
    name: 'boss genie lamp',
    description({ buff, level }) {
      const c = buff.constants;
      return `It's a lamp?`;
    },
    constants: {
    },
    data: {
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {
      },

      onDidDamage({ buff, defender, attacker, actualBattle, secondsElapsed, rawDamage, damageDealt, originalAutoAttack }) {

        if (!buff.data.lampsSpawned) {

            const powerLamp = {
              id: uuid.v4(),
              isEnemy: true,
              tickOffset: 0,
              icon: 'bossGeniePowerLamp.svg',
              name: 'power',
              isLamp: true,
              stats: {
                health: 500,
                healthMax: 500,
                attackSpeed: 0.01,
                attackSpeedTicks: 1000,
                armor: 0,
                magicArmor: 0,
                magicPower: 0,
                defense: 0,
                accuracy: 0,
                damageTaken: 1
              },
              buffs: [{
                id: 'boss_genie_power_lamp',
                data: {
                  duration: Infinity,
                  totalDuration: Infinity,
                  icon: 'bossGeniePowerLamp.svg',        
                  name: 'power lap'
                }
              }]
            };

            const wisdomLamp = {
              id: uuid.v4(),
              isEnemy: true,
              tickOffset: 0,
              icon: 'bossGenieWisdomLamp.svg',
              name: 'wisdom',
              isLamp: true,
              stats: {
                health: 500,
                healthMax: 500,
                attackSpeed: 0.01,
                attackSpeedTicks: 1000,
                armor: 0,
                magicArmor: 0,
                magicPower: 0,
                defense: 0,
                accuracy: 0,
                damageTaken: 1
              },
              buffs: [{
                id: 'boss_genie_wisdom_lamp',
                data: {
                  duration: Infinity,
                  totalDuration: Infinity,
                  icon: 'bossGenieWisdomLamp.svg',        
                  name: 'wisdom lamp'
                }
              }]
            };

            const healthLamp = {
              id: uuid.v4(),
              isEnemy: true,
              tickOffset: 0,
              icon: 'bossGenieHealthLamp.svg',
              name: 'Vitality',
              isLamp: true,
              stats: {
                health: 500,
                healthMax: 500,
                attackSpeed: 0.01,
                attackSpeedTicks: 1000,
                armor: 0,
                magicArmor: 0,
                magicPower: 0,
                defense: 0,
                accuracy: 0,
                damageTaken: 1
              },
              buffs: [{
                id: 'boss_genie_health_lamp',
                data: {
                  duration: Infinity,
                  totalDuration: Infinity,
                  icon: 'bossGenieHealthLamp.svg',        
                  name: 'health lamp'
                }
              }]
            };

            actualBattle.addUnit(powerLamp);
            actualBattle.addUnit(wisdomLamp);
            actualBattle.addUnit(healthLamp);

          buff.data.lampsSpawned = true;
        }
      },

      onRemove({ buff, target }) {
      }
    }
  },

  boss_genie_power_lamp: {
    duplicateTag: 'boss_genie_power_lamp', // Used to stop duplicate buffs
    icon: 'bossGeniePowerLamp.svg',
    name: 'boss genie power lamp',
    description({ buff, level }) {
      const c = buff.constants;
      return `Grants power on destruction`;
    },
    constants: {
    },
    data: {
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {
      },

      onDidDamage({ buff, defender, attacker, actualBattle, secondsElapsed, rawDamage, damageDealt, originalAutoAttack }) {
      },

      onRemove({ buff, target }) {
      },

      onBeforeDeath({ buff, target, actualBattle }) {
        // Apply power buff to all allies
        actualBattle.units.forEach((targetUnit) => {
          const newBuff = {
            id: 'boss_genie_power_up',
            data: {
              duration: Infinity,
              totalDuration: Infinity,
              description: 'Increases damage by 10%',
              icon: 'bossGeniePowerLamp.svg',        
              name: 'power up'
            }
          };
          addBuff({ buff: newBuff, target: targetUnit, caster: targetUnit, actualBattle });
        });

        // Destroy the other lamps
        actualBattle.enemies.forEach((enemy) => {
          if (enemy.id !== target.id && enemy.isLamp) {
            enemy.buffs = [];
            enemy.stats.health = -1;
          }
        });
      }
    }
  },

  boss_genie_wisdom_lamp: {
    duplicateTag: 'boss_genie_wisdom_lamp', // Used to stop duplicate buffs
    icon: 'bossGenieWisdomLamp.svg',
    name: 'boss genie wisdom lamp',
    description({ buff, level }) {
      const c = buff.constants;
      return `Grants wisdom on destruction`;
    },
    constants: {
    },
    data: {
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {
      },

      onDidDamage({ buff, defender, attacker, actualBattle, secondsElapsed, rawDamage, damageDealt, originalAutoAttack }) {
      },

      onRemove({ buff, target }) {
      },

      onBeforeDeath({ buff, target, actualBattle }) {
        // Apply wisdom buff to all allies
        actualBattle.units.forEach((targetUnit) => {
          const newBuff = {
            id: 'boss_genie_wisdom_up',
            data: {
              duration: Infinity,
              totalDuration: Infinity,
              icon: 'bossGenieWisdomLamp.svg',
              description: 'Increases magic power by 20%',      
              name: 'wisdom up'
            }
          };
          addBuff({ buff: newBuff, target: targetUnit, caster: targetUnit, actualBattle });
        });

        // Destroy the other lamps
        actualBattle.enemies.forEach((enemy) => {
          if (enemy.id !== target.id && enemy.isLamp) {
            enemy.buffs = [];
            enemy.stats.health = -1;
          }
        });
      }
    }
  },

  boss_genie_health_lamp: {
    duplicateTag: 'boss_genie_health_lamp', // Used to stop duplicate buffs
    icon: 'bossGenieHealthLamp.svg',
    name: 'health',
    description({ buff, level }) {
      const c = buff.constants;
      return `Grants health on destruction`;
    },
    constants: {
    },
    data: {
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {
      },

      onDidDamage({ buff, defender, attacker, actualBattle, secondsElapsed, rawDamage, damageDealt, originalAutoAttack }) {
      },

      onRemove({ buff, target }) {
      },

      onBeforeDeath({ buff, target, actualBattle }) {
        // Apply health buff to all allies
        actualBattle.units.forEach((targetUnit) => {
          const newBuff = {
            id: 'boss_genie_health_up',
            data: {
              description: 'Increase health by 50%',
              duration: Infinity,
              totalDuration: Infinity,
              icon: 'bossGenieHealthLamp.svg',        
              name: 'health up'
            }
          };
          addBuff({ buff: newBuff, target: targetUnit, caster: targetUnit, actualBattle });
        });

        // Destroy the other lamps
        actualBattle.enemies.forEach((enemy) => {
          if (enemy.id !== target.id && enemy.isLamp) {
            enemy.buffs = [];
            enemy.stats.health = -1;
          }
        });
      }
    }
  },

  boss_genie_health_up: {
    duplicateTag: 'boss_genie_health_up', // Used to stop duplicate buffs
    icon: 'bossGenieHealthLamp.svg',
    name: 'health up',
    description({ buff, level }) {
      return `Increases health by 50%`;
    },
    constants: {
    },
    data: {
      duration: Infinity,
      totalDuration: Infinity
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {
        caster.stats.health *= 1.5;
        caster.stats.healthMax *= 1.5;
      },

      onDidDamage({ buff, defender, attacker, actualBattle, secondsElapsed, rawDamage, damageDealt, originalAutoAttack }) {
        if (buff.duration <= 0) {
          removeBuff({ target, buff, caster: target })
        }
      },

      onRemove({ buff, target, caster }) {
        caster.stats.health /= 1.5;
        caster.stats.healthMax /= 1.5;
      }
    }
  },

  boss_genie_power_up: {
    duplicateTag: 'boss_genie_power_up', // Used to stop duplicate buffs
    icon: 'bossGeniePowerLamp.svg',
    name: 'power up',
    description({ buff, level }) {
      return `Increases damage by 10%`;
    },
    constants: {
    },
    data: {
      duration: Infinity,
      totalDuration: Infinity
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {
        caster.stats.attack *= 1.1;
        caster.stats.attackMax *= 1.1;
      },

      onDidDamage({ buff, defender, attacker, actualBattle, secondsElapsed, rawDamage, damageDealt, originalAutoAttack }) {
        if (buff.duration <= 0) {
          removeBuff({ target, buff, caster: target })
        }
      },

      onRemove({ buff, target, caster }) {
        caster.stats.attack /= 1.1;
        caster.stats.attackMax /= 1.1;
      }
    }
  },

  boss_genie_wisdom_up: {
    duplicateTag: 'boss_genie_wisdom_up', // Used to stop duplicate buffs
    icon: 'bossGenieWisdomLamp.svg',
    name: 'wisdom up',
    description({ buff, level }) {
      return `Increases magic power by 20%`;
    },
    constants: {
    },
    data: {
      duration: Infinity,
      totalDuration: Infinity
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {
        caster.stats.magicPower *= 1.2;
      },

      onDidDamage({ buff, defender, attacker, actualBattle, secondsElapsed, rawDamage, damageDealt, originalAutoAttack }) {
        if (buff.duration <= 0) {
          removeBuff({ target, buff, caster: target })
        }
      },

      onRemove({ buff, target, caster }) {
        caster.stats.magicPower /= 1.2;
      }
    }
  },

  boss_living_tree: {
    duplicateTag: 'boss_living_tree', // Used to stop duplicate buffs
    icon: 'livingTree.svg',
    name: 'boss tree',
    description({ buff, level }) {
      const c = buff.constants;
      return `Eternal`;
    },
    constants: {
    },
    data: {
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {
      },

      onDidDamage({ buff, defender, attacker, actualBattle, secondsElapsed, rawDamage, damageDealt, originalAutoAttack }) {

        if (!buff.data.lastKnownHealth) {
          buff.data.lastKnownHealth = target.stats.health;
        } else {
          const healthLost = buff.data.lastKnownHealth - target.stats.health;
          buff.data.lastKnownHealth = target.stats.health;
          buff.data.damageTillSpawn -= healthLost;
          buff.stacks = Math.round(buff.data.damageTillSpawn);
        }

        if (buff.data.damageTillSpawn <= 0) {
          buff.data.damageTillSpawn = 250;
          const birdStats = lodash.cloneDeep(target.stats.raw());
          birdStats.health = 250;
          birdStats.healthMax = 250;
          birdStats.attackSpeed = 1;
          birdStats.attackMax = 100;
          birdStats.attack = 100;
          birdStats.armor /= 2.5;

          // Spawn bird
          const bird = {
            id: uuid.v4(),
            isEnemy: true,
            tickOffset: _.random(0, 2) + 4,
            icon: 'bird.svg',
            name: 'bird',
            stats: birdStats,
            buffs: []
          };

          actualBattle.addUnit(bird);
        }

      },

      onRemove({ buff, target }) {
      }
    }
  },

  boss_vampire: {
    duplicateTag: 'boss_vampire', // Used to stop duplicate buffs
    icon: 'vampire.svg',
    name: 'vampire',
    description({ buff, level }) {
      const c = buff.constants;
      return 'Loves blood';
    },
    constants: {
    },
    data: {
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {
      },

      onDidDamage({ buff, defender, attacker, actualBattle, secondsElapsed, rawDamage, damageDealt, originalAutoAttack }) {
        buff.data.timeTillBlood -= secondsElapsed;

        // So user can see how far away spawn is
        buff.stacks = Math.round(buff.data.timeTillBlood);

        if (buff.data.timeTillBlood <= 0) {
          const newBuff = {
            id: 'vampirism',
            data: {
              icon: 'vampirism.svg',
              description: 'Gains healtl equal to the damage you deal.',
              level: 32,
              totalDuration: 10,
              duration: 10
            }
          };

          buff.data.timeTillBlood = 150;
          addBuff({ buff: newBuff, target: target, caster: target, actualBattle });
        }
      },

      onRemove({ buff, target }) {
      }
    }
  },

  boss_old_tortoise: {
    duplicateTag: 'boss_old_tortoise', // Used to stop duplicate buffs
    icon: 'vampire.svg',
    name: 'vampire',
    description({ buff, level }) {
      const c = buff.constants;
      return 'quite an old dude';
    },
    constants: {
    },
    data: {
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {
      },

      onDidDamage({ buff, defender, attacker, actualBattle, secondsElapsed, rawDamage, damageDealt, originalAutoAttack }) {

        // Healers spawned?
        if (!buff.data.healersSpawned) {
          for (let i = 0; i < 2; i++) {
            const birdStats = lodash.cloneDeep(target.stats.raw());
            birdStats.health = 1000;
            birdStats.healthMax = 1000;
            birdStats.attackSpeed = 0.7;
            birdStats.attackMax = 50;
            birdStats.attack = 50;
            birdStats.accuracy *= 1.5;
            birdStats.armor /= 2;
            birdStats.magicPower = 25;
            birdStats.healingPower = 250;
            birdStats.mageArmor = 500;

            // Spawn bird
            const bird = {
              id: uuid.v4(),
              isEnemy: true,
              tickOffset: 0,
              icon: 'waterMage.svg',
              name: 'water mage',
              stats: birdStats,
              buffs: [{
                id: 'water_mage_monster',
                data: {
                  hideBuff: true
                }
              }]
            };

            actualBattle.addUnit(bird);
          }

          const birdStats = lodash.cloneDeep(target.stats.raw());
          birdStats.health = 5000;
          birdStats.healthMax = 5000;
          birdStats.attackSpeed = 0.01;
          birdStats.attackMax = 1;
          birdStats.attack = 1;

          // Spawn wall
          const wall = {
            id: uuid.v4(),
            isEnemy: true,
            tickOffset: 0,
            icon: 'stoneWall.svg',
            name: 'stone wall',
            stats: birdStats,
            buffs: []
          };

          actualBattle.addUnit(wall);

          buff.data.healersSpawned = true;
          buff.stacks = 0;
        }

        if (buff.stacks >= 0) {
          let ratio = 1;
          if (buff.data.enraged) { 
            ratio = 0.3;
          }
          buff.stacks -= secondsElapsed * 66 * ratio;
          buff.stacks = Math.round(buff.stacks);
        } else {
          buff.stacks = 0;
        }

        if (buff.stacks < 333 && buff.data.enraged) {
          buff.data.enraged = false;
          target.stats.attackSpeed /= 2;
          buff.data.icon = 'oldTortoise';
        }
      },

      onTookDamage({ buff, defender, attacker, actualBattle, damageDealt }) {
        if (buff.stacks != null) {
          buff.stacks += damageDealt;
          buff.stacks = Math.round(buff.stacks);
        }

        if (buff.stacks >= 350 && !buff.data.enraged) {
          buff.data.enraged = true;
          defender.stats.attackSpeed *= 2;
          buff.data.icon = 'enragedTortoise.svg';
        }
      },

      onRemove({ buff, target }) {
      }
    }
  },

  boss_kraken: {
    duplicateTag: 'boss_kraken', // Used to stop duplicate buffs
    icon: 'kraken.svg',
    name: 'boss kraken',
    description({ buff, level }) {
      const c = buff.constants;
      return `Incrementally summons tentacles`;
    },
    constants: {
    },
    data: {
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {

      },

      onDidDamage({ buff, defender, attacker, actualBattle, secondsElapsed, rawDamage, damageDealt, originalAutoAttack }) {
        buff.data.timeTillSpawn -= secondsElapsed;

        // So user can see how far away spawn is
        buff.stacks = Math.round(buff.data.timeTillSpawn);

        if (!buff.data.timeTillSpawn || buff.data.timeTillSpawn <= 0) {

          const birdStats = lodash.cloneDeep(target.stats.raw());
          birdStats.health = 1500;
          birdStats.healthMax = 1500;
          birdStats.defense *= 0.6;
          birdStats.armor *= 0.35;
          birdStats.magicArmor *= 0.35;
          birdStats.attack *= 3.5;
          birdStats.attackMax *= 3.5;
          birdStats.accuracy *= 1.5;
          birdStats.magicPower = 20;

          // Spawn little bird
          const littlebird = {
            id: uuid.v4(),
            isEnemy: true,
            tickOffset: 0,
            icon: 'tentacle.svg',
            name: 'tentacle',
            buffs: [],
            stats: birdStats
          };

          actualBattle.addUnit(littlebird);

          buff.data.timeTillSpawn = 180;
        }
      },

      onRemove({ buff, target }) {
      }
    }
  },

  boss_bison: {
    duplicateTag: 'boss_bison', // Used to stop duplicate buffs
    icon: 'bisonRed.svg',
    name: 'boss bison',
    description({ buff, level }) {
      const c = buff.constants;
      return `Charges every 45 seconds`;
    },
    constants: {
    },
    data: {
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {

      },

      onDidDamage({ buff, defender, attacker, actualBattle, secondsElapsed, rawDamage, damageDealt, originalAutoAttack }) {
        buff.data.timeTillCharge -= secondsElapsed;

        // So user can see how far away spawn is
        buff.stacks = Math.round(buff.data.timeTillCharge);

        if (!buff.data.timeTillCharge || buff.data.timeTillCharge <= 0) {

          const unitToAttack = _.findWhere(actualBattle.units, { id: target.target });

          const attackMax = target.stats.attackMax;
          const damageToDeal = buff.data.magic ? attackMax * 5 : attackMax * 6
          actualBattle.dealDamage(damageToDeal, {
            attacker: target,
            defender: unitToAttack,
            tickEvents: actualBattle.tickEvents,
            historyStats: actualBattle.historyStats,
            isMagic: buff.data.magic
          });

          buff.data.timeTillCharge = 100;
          
          // Switch to magic / physical
          buff.data.magic = !buff.data.magic;

          if (buff.data.magic) {
            buff.data.icon = 'bisonBlue.svg';
          } else {
            buff.data.icon = 'bisonRed.svg';
          }
        }
      },

      onRemove({ buff, target }) {
      }
    }
  },

  boss_wolf: {
    duplicateTag: 'boss_wolf', // Used to stop duplicate buffs
    icon: 'bossPoodle.svg',
    name: 'defensive poodle',
    description({ buff, level }) {
      const c = buff.constants;
      return `Protects poodle every 5 seconds`;
    },
    constants: {
    },
    data: {
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {

      },

      onDidDamage({ buff, defender, attacker, actualBattle, secondsElapsed, rawDamage, damageDealt, originalAutoAttack }) {
        if (!buff.data.poodleSpawned) {
          // Add poodle to the game

          const poodleStats = lodash.cloneDeep(target.stats.raw());
          poodleStats.health *= 0.33;
          poodleStats.healthMax *= 0.33;
          poodleStats.defense *= 0.5;
          poodleStats.armor *= 0.5;
          poodleStats.magicArmor *= 0.5;
          poodleStats.attack *= 0.1;
          poodleStats.attackMax *= 0.1;
          poodleStats.accuracy *= 2;
          poodleStats.magicPower = 20;

          // Spawn little bird
          const poodle = {
            id: uuid.v4(),
            isEnemy: true,
            tickOffset: 0,
            icon: 'bossPoodle.svg',
            name: 'poodle',
            buffs: [{
              id: 'boss_poodle',
              data: {
                duration: Infinity,
                totalDuration: Infinity,
                icon: 'glasses.svg',        
                name: 'smarty pants',
                timeTillSwitch: 30
              }
            }],
            stats: poodleStats
          };

          actualBattle.addUnit(poodle);

          buff.data.poodleSpawned = true;
        }

        buff.data.timeTillDefensive -= secondsElapsed;

        // So user can see how far away spawn is
        buff.stacks = Math.round(buff.data.timeTillDefensive);

        if (!buff.data.timeTillDefensive || buff.data.timeTillDefensive <= 0) {
          // Find poodle
          const poodle = _.findWhere(actualBattle.enemies, { name: 'poodle' });
          if (poodle) {
            // Aggro the unit that did the most damage to poodle in the last 5 seconds
            let max = -Infinity;
            let unitToKill;
            // Access poodle buff
            const poodleBuff = _.findWhere(poodle.buffs, { id: 'boss_poodle' });

            if (poodleBuff.data.damageMap) {
              Object.keys(poodleBuff.data.damageMap).forEach((key) => {
                const damageDone = poodleBuff.data.damageMap[key];
                if (damageDone > max) {
                  max = damageDone;
                  unitToKill = key;
                }
                // Remove targetting of poodle to units that damaged poodle
                const targetUnit = _.findWhere(actualBattle.units, { id: key });
                targetUnit.target = target.id;
              });
            }
            poodleBuff.data.damageMap = {};
    
            // Attack whoever did most damage to poodle
            if (unitToKill) {
              target.target = unitToKill
            }

            buff.data.timeTillDefensive = 15;
          }
        }
      },

      onRemove({ buff, target }) {
      }
    }
  },

  boss_poodle: {
    duplicateTag: 'boss_poodle', // Used to stop duplicate buffs
    icon: 'bossPoodle.svg',
    name: 'poodle',
    description({ buff, level }) {
      const c = buff.constants;
      return `Breaks down the target over time`;
    },
    constants: {
    },
    data: {
      damageMap: {}
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {
      },

      onDidDamage({ buff, defender, attacker, actualBattle }) {
        if (Math.random() * 100 <= 33) {
          // Reduces target attack, attackMax, magicPower
          const newBuff = {
            id: 'attack_reduction',
            data: {
              duration: 15,
              totalDuration: 15,
              allowDuplicates: true,
              attack: 25,
              icon: 'attackReduction.svg',
              description: 'Reduces your attack by 25, for 30 seconds'
            }
          };

          // cast attack reduction
          addBuff({ buff: newBuff, target: defender, caster: attacker, actualBattle });

          // Refresh existing attack_duration buffs
          defender.buffs.forEach((buff) => {
            if (buff.id === 'attack_duration') {
              buff.duration = 10;
            }
          });
        }
      },

      onTookDamage({ buff, defender, attacker, actualBattle, damageDealt }) {
        if (!buff.data.damageMap) {
          buff.data.damageMap = {};
        }

        if (!buff.data.damageMap[attacker.id]) {
          buff.data.damageMap[attacker.id] = damageDealt;
        } else {
          buff.data.damageMap[attacker.id] += damageDealt;
        }
      },

      onDidDamage({ buff, defender, attacker, actualBattle, secondsElapsed, rawDamage, damageDealt, originalAutoAttack }) {
        buff.data.timeTillSwitch -= secondsElapsed;

        // So user can see how far away spawn is
        buff.stacks = Math.round(buff.data.timeTillSwitch);

        if (!buff.data.timeTillSwitch || buff.data.timeTillSwitch <= 0) {
          // Target a random unit
          target.target = _.sample(actualBattle.units).id;
          buff.data.timeTillSwitch = 30;
        }
      },

      onRemove({ buff, target }) {
      }
    }
  },

  boss_fox: {
    duplicateTag: 'boss_fox', // Used to stop duplicate buffs
    icon: 'waterFox.svg',
    name: 'water fox',
    description({ buff, level }) {
      const c = buff.constants;
      return `A blend of all the elements`;
    },
    constants: {
    },
    data: {
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {
      },

      onTookDamage({ buff, defender, attacker, actualBattle, damageDealt }) {
        if (buff.data.phase === EARTH_PHASE) {
          buff.stacks -= 1;
          if (buff.stacks < 0) {
            if (buff.data.refreshes > 0) {
              buff.data.refreshes -= 1;
              buff.stacks = 35;
            } else if (buff.data.initPhase) {
              // End EARTH phase
              buff.data.phase += 1;
              buff.data.initPhase = false;
              buff.data.icon = 'fireFox.svg';
              defender.icon = 'fireFox.svg';
              return;
            }
            // Apply damage reflection buff for 10s
            const newBuff = {
              id: 'spiked_armor',
              data: {
                level: 10,
                duration: 5,
                totalDuration: 5,
                icon: 'spikedArmor.svg',
                description: 'Reflect damage back at you.'
              }
            };

            // cast earth dart
            addBuff({ buff: newBuff, target: defender, caster: defender, actualBattle });
          }
        } else if (buff.data.phase === AIR_PHASE) {
          buff.stacks -= Math.round(damageDealt);
          if (buff.stacks <= 0 && buff.data.initPhase) {
            // Next phase
            buff.data.phase = 0;
            buff.data.initPhase = false;
            buff.data.icon = 'waterFox.svg';
            defender.icon = 'waterFox.svg';
          }
        }
      },

      onDidDamage({ buff, defender, attacker, actualBattle, secondsElapsed, rawDamage, damageDealt, originalAutoAttack }) {

        if (buff.data.phase === WATER_PHASE) {
          // Init water phase
          if (!buff.data.initPhase) {
            buff.data.initPhase = true;

            for (let i = 0; i < 3; i++) {
              // Create two fountains that heal fox rather quickly
              const fountainStats = lodash.cloneDeep(target.stats.raw());
              fountainStats.health = 750;
              fountainStats.healthMax = 750;
              fountainStats.defense = 150;
              fountainStats.armor *= 0.5;
              fountainStats.magicArmor *= 0.5;
              fountainStats.attack = 1;
              fountainStats.attackMax = 1;

              // Spawn little bird
              const fountain = {
                id: uuid.v4(),
                isEnemy: true,
                tickOffset: 0,
                icon: 'fountain.svg',
                name: 'fountain',
                buffs: [{
                  id: 'healing_fountain',
                  data: {
                    duration: Infinity,
                    totalDuration: Infinity,
                    icon: 'fountain.svg',        
                    name: 'healing water'
                  }
                }],
                stats: fountainStats
              };

              actualBattle.addUnit(fountain);
            }
          }

          // Check if fountains are still alive, if dead move to next phase
          const fountain = _.findWhere(actualBattle.enemies, { name: 'fountain' });
          if (!fountain && buff.data.initPhase) {
            // Next Phase!
            buff.data.phase += 1;
            buff.data.initPhase = false;
            buff.data.icon = 'earthFox.svg';
            target.icon = 'earthFox.svg';
          }
        } else if (buff.data.phase === EARTH_PHASE) {
          if (!buff.data.initPhase) {
            buff.data.initPhase = true;
            // Earth phase ends with an earth blast at 0 stacks
            buff.stacks = 35;
            // 2 refreshes of shield
            buff.data.refreshes = 2;
            // Casts earth shield every 35 stacks (reflects damage at target for 3 seconds)
          }
        } else if (buff.data.phase === FIRE_PHASE) {
          if (!buff.data.initPhase) {
            buff.data.initPhase = true;
            // Start timer till phase ends
            buff.stacks = 65;
            buff.data.timeTillNextPhase = 65;
          }

          buff.data.timeTillNextPhase -= secondsElapsed;
          buff.stacks = Math.floor(buff.data.timeTillNextPhase);

          if (buff.stacks === 60 || buff.stacks === 30) {
            actualBattle.units.forEach((unit) => {
              // Fire wave
              const newBuff = {
                id: 'ignite',
                data: {
                  duration: 10,
                  totalDuration: 10,
                  timeTillDamage: 1,
                  totalDamage: 30,
                  sourceId: target.id,
                  icon: 'ignite.svg',
                  description: ''
                },
                constants: BUFFS['ignite']
              };

              // cast ignite
              addBuff({ buff: newBuff, target: unit, caster: target, actualBattle });
            })
          } else if (buff.stacks <= 0) {
            // Fire blast
            const newBuff = {
              id: 'ignite',
              data: {
                duration: 3,
                totalDuration: 3,
                timeTillDamage: 1,
                sourceId: target.id,
                totalDamage: 100,
                icon: 'ignite.svg',
                description: ''
              },
              constants: BUFFS['ignite']
            };

            const unit = _.findWhere(actualBattle.units, { id: target.target });
            // cast ignite
            addBuff({ buff: newBuff, target: unit, caster: target, actualBattle });

            actualBattle.dealDamage(500, {
              attacker: target,
              defender: unit,
              isMagic: true,
              tickEvents: actualBattle.tickEvents,
              historyStats: actualBattle.historyStats
            });

            // Next Phase!
            if (buff.data.initPhase) {
              buff.data.phase += 1;
              buff.data.initPhase = false;
              buff.data.icon = 'airFox.svg';
              target.icon = 'airFox.svg';              
            }
          }
        } else if (buff.data.phase === AIR_PHASE) {
          if (!buff.data.initPhase) {
            buff.data.initPhase = true;
            // Damage to take until phase ends
            buff.stacks = 2000;
            buff.data.mirages = 9;
            buff.data.timeTillMirage = Math.random() * 5;
          }

          buff.data.timeTillMirage -= secondsElapsed;
          if (buff.data.timeTillMirage <= 0 && buff.data.mirages > 0) {
            buff.data.timeTillMirage = Math.random() * 3;
            buff.data.mirages -= 1;
            // Spawn 3 mirages

            for (let i = 0; i < 1; i++) {
              // Create two fountains that heal fox rather quickly
              const mirageStats = lodash.cloneDeep(target.stats.raw());
              mirageStats.health = 250;
              mirageStats.healthMax = 250;
              mirageStats.defense = 150;
              mirageStats.armor *= 0.5;
              mirageStats.magicArmor *= 0.5;
              mirageStats.attack = 100;
              mirageStats.attackMax = 100;

              // Spawn little bird
              const mirage = {
                id: uuid.v4(),
                isEnemy: true,
                tickOffset: 0,
                icon: 'airFox.svg',
                name: 'mirage',
                buffs: [],
                stats: mirageStats
              };

              actualBattle.addUnit(mirage);
            }
          }
        }
      },

      onRemove({ buff, target }) {
      }
    }
  },

  healing_fountain: {
    duplicateTag: 'healing_fountain', // Used to stop duplicate buffs
    icon: 'fountain.svg',
    name: 'fountain',
    description({ buff, level }) {
      const c = buff.constants;
      return `Heals the all mighty fox.`;
    },
    constants: {
    },
    data: {
      damageMap: {}
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {
      },

      onDidDamage({ buff, defender, attacker, actualBattle, secondsElapsed, rawDamage, damageDealt, originalAutoAttack }) {
        if (Math.random() * 100 >= 10) return;

        // Find fox
        const fox = _.findWhere(actualBattle.enemies, { name: 'fox' });

        // Heal Fox, reduce health by healed amount
        target.stats.health -= 50;
        actualBattle.healTarget(50, {
          caster: target,
          target: fox,
          tickEvents: actualBattle.tickEvents,
          historyStats: actualBattle.historyStats,
        });
      },

      onRemove({ buff, target }) {
      }
    }
  },

  boss_dragon: {
    duplicateTag: 'boss_dragon', // Used to stop duplicate buffs
    icon: 'dragon.svg',
    name: 'boss dragon',
    description({ buff, level }) {
      return `Swipes and bathes the battlefield in flame`;
    },
    constants: {
    },
    data: {
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {
        buff.data.stackTimer = 0;
        buff.stacks = buff.data.stacks = 0;
        buff.data.lastAttack = '';
        buff.data.attackChance = 1 / 50;
      },

      onDidDamage({ buff, defender, attacker, actualBattle, secondsElapsed, rawDamage, damageDealt, originalAutoAttack }) {
        // stacks build up every tick without an attack and reset after attack
        buff.data.stackTimer += secondsElapsed;
        if (buff.data.stackTimer > 1) {
          buff.data.stackTimer = 0;
          buff.stacks += 1;
        }

        if (Math.random() < (buff.data.attackChance + buff.stacks / 100)) {
          buff.stacks = 0;
          // alternate attack types every time
          if (buff.data.lastAttack === 'flamebreath')
          {
            // cast 'swipe' (blade spin)
            buff.data.lastAttack = 'swipe';
            actualBattle.units.forEach((unit) => {
              const newBuff = {
                id: 'blade_spin',
                data: {
                  level: 10,
                  icon: 'swipe.svg',
                  description: '',
                },
                constants: BUFFS['blade_spin']
              };
              addBuff({ buff: newBuff, target: unit, caster: target, actualBattle });
            });
          } else {
            // cast 'flamebreath' (magic blade spin)
            buff.data.lastAttack = 'flamebreath';
            actualBattle.units.forEach((unit) => {
              // Blade Spin
              const newBuff = {
                id: 'blade_spin',
                data: {
                  level: 10,
                  icon: 'flamebreath.svg',
                  description: '',
                  isMagic: true
                },
                constants: BUFFS['blade_spin']
              };
              addBuff({ buff: newBuff, target: unit, caster: target, actualBattle });
            });
          }
        }
      },

      onRemove({ buff, target }) {
      }
    }
  },

  boss_high_angel: {
    duplicateTag: 'boss_high_angel', // Used to stop duplicate buffs
    icon: 'resurrection.svg',
    name: 'boss high angel',
    description({ buff, level }) {
      return `Brings forth fallen allies to aid in battle`;
    },
    constants: {
      timeTillResurrection: 25, // this isn't used anywhere
    },
    data: {
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {
        buff.stacks = buff.data.stacks = 0;
        buff.data.timeTillResurrection = 5;
        
        buff.data.internal_genericTowerMonsterGenerator = function(floor, room) {
          const FLOOR_21_monsters = {
            1: { enemies: ['bee', 'bee'] },
            2: { enemies: ['wasp'] },
            3: { enemies: ['gelatinous_cube'] },
            4: { enemies: ['vampire'] },
            5: { enemies: ['bird', 'cut_purse'] },
          };
          
          const FLOOR_21_raw_enemies = {
            bee: {
              id: 'bee',
              icon: 'bee.svg',
              name: 'bee',
              swarmRange: [1, 7],
              statBuffs: [{
                type: 'plus',
                key: 'criticalChance',
                amount: 10
              }]
            },
            wasp: {
              id: 'wasp',
              icon: 'wasp.svg',
              name: 'wasp',
              statBuffs: [{
                type: 'plus',
                key: 'criticalChance',
                amount: 10
              }]
            },
            gelatinous_cube: {
              id: 'gelatinous_cube',
              icon: 'gelatinous_cube.svg',
              name: 'gelatinous cube',
              buffs: [{
                id: 'gelatinous_cube_monster',
                duration: Infinity,
                stacks: 2,
                data: {
                  totalDuration: Infinity,
                  icon: 'cubeSplit.svg',
                  hideBuff: true,
                  name: 'gelatinous cube',
                  splitHealthPercentage: 15,
                  splitAmount: 3,
                  hasSplit: false
                }
              }],
              statBuffs: [{
                type: 'times',
                key: 'attack',
                amount: 0.35
              }, {
                type: 'times',
                key: 'attackMax',
                amount: 0.35
              }, {
                type: 'times',
                key: 'health',
                amount: 1.5
              }, {
                type: 'times',
                key: 'healthMax',
                amount: 1.5
              }]
            },
            vampire: {
              id: 'vampire',
              icon: 'vampire.svg',
              name: 'vampire',
              buffs: [{
                id: 'thirsty_fangs',
                duration: 1,
                data: {
                  totalDuration: 1,
                  level: 1,
                  icon: 'thirstyFangs.svg',
                  name: 'thirsty fangs'
                }
              }, {
                id: 'vampire_monster',
                data: {
                  hideBuff: true
                }
              }],
              statBuffs: [{
                type: 'times',
                key: 'attack',
                amount: 0.7
              }, {
                type: 'plus',
                key: 'accuracy',
                amount: 25
              }]
            },
            bird: {
              id: 'bird',
              icon: 'bird.svg',
              name: 'bird',
              statBuffs: [{
                type: 'plus',
                key: 'criticalChance',
                amount: 5
              }, {
                type: 'plus',
                key: 'criticalDamage',
                amount: 2
              }]
            },
            cut_purse: {
              id: 'cut_purse',
              icon: 'cutPurse.svg',
              name: 'cut purse',
              statBuffs: [{
                type: 'times',
                key: 'armor',
                amount: 0.8
              }, {
                type: 'times',
                key: 'attackSpeed',
                amount: 1.6
              }, {
                type: 'times',
                key: 'accuracy',
                amount: 0.8
              }, {
                type: 'times',
                key: 'attack',
                amount: 0.8
              }]
            },
          };
          
          const allMonsters = FLOOR_21_monsters[room].enemies;
          const totalUnits = allMonsters.length;
          const newMonsters = [];

          allMonsters.forEach((selectedMonsterId) => {
            const selectedMonster = FLOOR_21_raw_enemies[selectedMonsterId];

            // 'Good Enough', for now
            const monster = {
              id: selectedMonster.id,
              icon: selectedMonster.icon,
              name: selectedMonster.name,
              buffs: lodash.cloneDeep(selectedMonster.buffs || []),
              stats: {
                health: (room / 1.2) * 25 * floor * (1 + (floor / 3.3)) * (1 / totalUnits),
                healthMax: (room / 1.2) * 25 * floor * (1 + (floor / 3.3)) * (1 / totalUnits),
                attack: (room / 1.8) * 3.80 * floor * (1 + (floor / 3.3)),
                attackMax: (room / 1.8) * 4.75 * floor * (1 + (floor / 3.3)),
                magicPower: (room / 1.8) * 2.5 * floor * (1 + (floor / 3.3)),
                attackSpeed: 0.5 + (room / 30),
                accuracy: ((floor * 2) + (room / 4) * 6.5 * (floor * 1.1)),
                armor: (room / 2.4) * 25 * (floor / 4),
                defense: ((floor * 2) + (room / 4) * 6.5 * (floor * 1.1)),
                magicArmor: (room / 1.2) * 1.5 * floor * (1 + (floor / 3.3)),
                criticalChance: 0,
                criticalDamage: 2,
                damageTaken: 1
              },
              rewards: []
            };

            if (selectedMonster.statBuffs) {
              selectedMonster.statBuffs.forEach((statBuff) => {
                if (statBuff.type === 'plus') {
                  monster.stats[statBuff.key] += statBuff.amount;
                } else if (statBuff.type === "times") {
                  monster.stats[statBuff.key] *= statBuff.amount;
                }
              })
            }

            // Is this a swarm mob?
            if (selectedMonster.swarmRange) {
              const unitCount = _.random(selectedMonster.swarmRange[0], selectedMonster.swarmRange[1]);
              // Divide monsters health
              monster.stats.health /= unitCount; // Divide health evenly
              monster.stats.health *= 1.2; // To account for aoe
              monster.stats.attack /= unitCount;
              monster.stats.attackMax /= unitCount;
              monster.stats.attack *= 1.2;
              monster.stats.attackMax *= 1.2;

              monster.stats.healthMax = monster.stats.health;
              for (let i = 0;i < unitCount; i++) {
                const monsterClone = lodash.cloneDeep(monster);
                monsterClone.id = uuid.v4();
                newMonsters.push(monsterClone);
              }
            } else {
              newMonsters.push(monster);
            }
          });

          return newMonsters;
        };
      },

      onDidDamage({ buff, defender, attacker, actualBattle, secondsElapsed, rawDamage, damageDealt, originalAutoAttack }) {
        if (buff.data.timeTillResurrection > 0) {
          buff.data.timeTillResurrection -= secondsElapsed;
          buff.stacks = Math.round(buff.data.timeTillResurrection);
        } else {
          const roomToSpawn = _.sample([1, 2, 3, 4, 5]);
          const enemy = _.sample(buff.data.internal_genericTowerMonsterGenerator(actualBattle.floor, roomToSpawn));
          actualBattle.addUnit(enemy);
          buff.data.timeTillResurrection = Math.round(Math.sqrt(Math.pow(roomToSpawn, 2.5) * 10) * 2);
          buff.stacks = Math.round(buff.data.timeTillResurrection);
        }
      },

      onRemove({ buff, target }) {
      }
    }
  },

  boss_hive: {
    duplicateTag: 'boss_hive', // Used to stop duplicate buffs
    icon: 'honeycomb.svg',
    name: 'boss hive',
    description({ buff, level }) {
      return `Don't agitate what dwells within`;
    },
    constants: {
      damageLimit: 5000
    },
    data: {
    },
    events: { // This can be rebuilt from the buff id
      onApply({buff, target, caster, actualBattle}) {
        buff.stacks = buff.data.stacks = 0;
        buff.data.damageLimit = 5000;
      },

      onTick({buff, target, caster, secondsElapsed, actualBattle}) {
        if (!buff.data.oldHealth) {
          buff.data.oldHealth = target.stats.health;
        }
        if (!buff.data.damageTaken) {
          buff.data.damageTaken = 0;
        }
        buff.data.damageTaken += (buff.data.oldHealth - target.stats.health);
        buff.data.oldHealth = target.stats.health;

        if (buff.data.damageTaken > buff.data.damageLimit) {
          // anti-de protection
          const spawnAmount = Math.floor(buff.data.damageTaken / buff.data.damageLimit);
          buff.data.damageTaken = 0;
          for(let i = 0; i < spawnAmount; i++) {
            // summon the queen + attendants
            const queenStats = {
              attack: 650,
              attackMax: 900,
              attackSpeed: FAST_SPEED,
              accuracy: 350,
              health: 5000,
              healthMax: 5000,
              defense: 150,
              armor: 450,
              magicArmor: 50,
              damageTaken: 1,
              criticalChance: 10
            };

            const queen = {
              id: uuid.v4(),
              isEnemy: true,
              tickOffset: 0,
              icon: 'spiderbee.svg',
              name: 'Queen Spiderbee',
              stats: queenStats,
              buffs: [{
                id: 'poisoned_blade',
                data: {
                  duration: 10000,
                  totalDuration: 10000,
                  icon: 'poisonedBlade.svg',
                  name: 'poisoned blade',
                  level: 5
                }
              }]
            };

            const droneStats = {
              attack: 250,
              attackMax: 300,
              attackSpeed: FAST_SPEED,
              accuracy: 450,
              health: 2500,
              healthMax: 2500,
              defense: 75,
              armor: 250,
              magicArmor: 25,
              magicPower: 1250,
              damageTaken: 1,
              criticalChance: 10
            };

            const drone1 = {
              id: uuid.v4(),
              isEnemy: true,
              tickOffset: 0,
              icon: 'spiderbee.svg',
              name: 'Spiderbee Drone',
              stats: droneStats,
              buffs: [{
                id: 'water_mage_monster',
                data: {
                  hideBuff: true
                }
              }]
            };

            const drone2 = {
              id: uuid.v4(),
              isEnemy: true,
              tickOffset: 0,
              icon: 'spiderbee.svg',
              name: 'Spiderbee Drone',
              stats: droneStats,
              buffs: [{
                id: 'water_mage_monster',
                data: {
                  hideBuff: true
                }
              }]
            };

            actualBattle.addUnit(...[queen, lodash.cloneDeep(drone1), lodash.cloneDeep(drone2)]);
          }
        }

        buff.stacks = Math.round((1 - ((buff.data.damageLimit - buff.data.damageTaken) / buff.data.damageLimit)) * 100);
      },

      onRemove({buff, target}) {
      }
    }
  },

  boss_ruiner: {
    duplicateTag: 'boss_ruiner', // Used to stop duplicate buffs
    icon: 'boss24.svg',
    name: 'The Ruiner',
    description({ buff, level }) {
      const c = buff.constants;
      return `Summons imps`;
    },
    constants: {
    },
    data: {
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {
        buff.data.timeTillSpawn = 10;
      },

      onDidDamage({ buff, defender, attacker, actualBattle, secondsElapsed, rawDamage, damageDealt, originalAutoAttack }) {
        buff.data.timeTillSpawn -= secondsElapsed;

        // So user can see how far away spawn is
        buff.stacks = Math.round(buff.data.timeTillSpawn);

        if (buff.data.timeTillSpawn <= 0) {
          const impStats = lodash.cloneDeep(target.stats.raw());
          impStats.health = 150;
          impStats.healthMax = 150;
          impStats.defense *= 0.6;
          impStats.armor *= 0.3;
          impStats.attack *= 0.1;
          impStats.attackMax *= 0.1;
          impStats.accuracy *= 0.8;
          impStats.magicPower = 1;

          // Spawn an imp.. nasty thing
          const newImp = {
            id: uuid.v4(),
            tickOffset: 0,
            isEnemy: true,
            icon: 'imp.svg',
            name: 'Imp',
            buffs: [{
              id: 'imp_monster',
              data: {
                hideBuff: true
              }
            }],
            stats: impStats
          };

          actualBattle.addUnit(newImp);

          buff.data.timeTillSpawn = (Math.random() * 5) + 10;
        }
      },

      onRemove({ buff, target }) {
      }
    }
  },
};
