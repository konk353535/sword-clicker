import moment from 'moment';
import _ from 'underscore';
import { attackSpeedTicks } from '/server/utils';
import { addBuff, removeBuff } from '/server/battleUtils';
import { BUFFS } from '/server/constants/combat/index.js';
import { Random } from 'meteor/random'
import { genericTowerMonsterGenerator } from '/server/constants/floors/generators/genericTower';

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
              icon: 'deepWounds.svg',
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
            id: Random.id(),
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
                icon: 'bladeSpin.svg',
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

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {

        if (!buff.data.spartansSpawned) {

          for (let i = 0; i < 2; i++) {
            const spartanStats = JSON.parse(JSON.stringify(target.stats));
            spartanStats.health = 200;
            spartanStats.healthMax = 200;
            spartanStats.attack *= 0.3;
            spartanStats.attackMax *= 0.3;

            // Spawn little snake
            const littleSpartan = {
              id: Random.id(),
              tickOffset: 0,
              icon: 'spartan.svg',
              name: 'spartan',
              stats: spartanStats,
              buffs: [{
                id: 'phalanx',
                data: {
                  duration: Infinity,
                  totalDuration: Infinity,
                  isEnemy: true,
                  icon: 'phalanx.svg',        
                  name: 'phalanx'
                }
              }]
            }

            actualBattle.enemies.push(littleSpartan);
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

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
        buff.data.timeTillSpawn -= secondsElapsed;

        // So user can see how far away spawn is
        buff.data.stacks = Math.round(buff.data.timeTillSpawn);

        if (!buff.data.timeTillSpawn || buff.data.timeTillSpawn <= 0) {

          const birdStats = JSON.parse(JSON.stringify(target.stats));
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
            id: Random.id(),
            tickOffset: 0,
            icon: 'bird.svg',
            name: 'bird',
            buffs: [{
              id: 'boss_mage_bird',
              data: {
                icon: 'bird.svg'
              }
            }],
            stats: birdStats
          }

          actualBattle.enemies.push(littlebird);

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

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
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
            }

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

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {

        buff.data.timeTillSpawn -= secondsElapsed;

        // So user can see how far away spawn is
        buff.data.stacks = Math.round(buff.data.timeTillSpawn);

        if (!buff.data.timeTillSpawn || buff.data.timeTillSpawn <= 0) {

          for (let i = 0; i < 3; i++) {
            const goblinStats = JSON.parse(JSON.stringify(target.stats));
            goblinStats.health = 150;
            goblinStats.healthMax = 150;
            goblinStats.defense *= 0.6;
            goblinStats.attack *= 0.1;
            goblinStats.attackMax *= 0.1;
            goblinStats.accuracy *= 2;

            // Spawn little goblin
            const littleGoblin = {
              id: Random.id(),
              tickOffset: 0,
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
            }

            actualBattle.enemies.push(littleGoblin);
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

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {

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
    name: 'boss phenoix',
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

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {

        if (!buff.data.phoenixsSpawned) {

          for (let i = 0; i < 2; i++) {
            const phoenixStats = JSON.parse(JSON.stringify(target.stats));
            phoenixStats.health = 500;
            phoenixStats.healthMax = 500;
            phoenixStats.attackSpeed = 0.001;
            phoenixStats.attackSpeedTicks = attackSpeedTicks(0.001);
            phoenixStats.attackMax /= 3;
            phoenixStats.attack /= 3;
            phoenixStats.armor /= 3;

            // Spawn little snake
            const phoenixEgg = {
              id: Random.id(),
              tickOffset: 0,
              icon: 'phoenixEgg.svg',
              name: 'phoenix egg',
              stats: phoenixStats,
              buffs: [{
                id: 'phoenix_egg',
                data: {
                  duration: Infinity,
                  totalDuration: Infinity,
                  timeTillSpawn: 60,
                  isEnemy: true,
                  icon: 'babyPhoenix.svg',        
                  name: 'baby phoenix'
                }
              }]
            }

            actualBattle.enemies.push(phoenixEgg);
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

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {

        buff.data.timeTillSpawn -= secondsElapsed;

        // So user can see how far away spawn is
        buff.data.stacks = Math.round(buff.data.timeTillSpawn);

        if (!buff.data.timeTillSpawn || buff.data.timeTillSpawn <= 0) {

          const phoenixStats = JSON.parse(JSON.stringify(target.stats));
          phoenixStats.health = target.stats.health;
          phoenixStats.healthMax = target.stats.health;
          phoenixStats.attackSpeed = 0.5;
          phoenixStats.attackSpeedTicks = attackSpeedTicks(0.5);
          phoenixStats.armor *= 3;

          // Spawn little goblin
          const littlePhoenix = {
            id: Random.id(),
            tickOffset: 0,
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
          }

          actualBattle.enemies.push(littlePhoenix);

          buff.data.hasSpawned = true;
          target.stats.health = -1;
        }
      },

      onRemove({ buff, target }) {
      },

      onBeforeDeath({ buff, target, actualBattle }) {
        // Only respawn if boss phoenix exists
        if (!buff.data.hasSpawned && _.findWhere(actualBattle.enemies, { id: 'boss_phoenix' })) {

          const phoenixStats = JSON.parse(JSON.stringify(target.stats));
          phoenixStats.health = 10;
          phoenixStats.healthMax = 10;
          phoenixStats.attackSpeed = 0.5;
          phoenixStats.attackSpeedTicks = attackSpeedTicks(0.5);
          phoenixStats.armor *= 3;

          // Spawn little goblin
          const littlePhoenix = {
            id: Random.id(),
            tickOffset: 0,
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
          }

          actualBattle.enemies.push(littlePhoenix);
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

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
      },

      onRemove({ buff, target }) {
      },

      onBeforeDeath({ buff, target, actualBattle }) {
        // cast ignite on all units
        const phoenixStats = JSON.parse(JSON.stringify(target.stats));
        phoenixStats.health = 500;
        phoenixStats.healthMax = 500;
        phoenixStats.attackSpeed = 0.001;
        phoenixStats.attackSpeedTicks = attackSpeedTicks(0.001);
        phoenixStats.armor /= 3;

        // Spawn little snake
        const phoenixEgg = {
          id: Random.id(),
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
              isEnemy: true,
              icon: 'babyPhoenix.svg',  
              name: 'baby phoenix'
            }
          }]
        }

        actualBattle.enemies.push(phoenixEgg);

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

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
        buff.data.timeTillLearn -= secondsElapsed;
        buff.data.stacks = Math.round(buff.data.timeTillLearn);

        if (buff.data.stacks <= 0) {
          buff.data.stacks = 0;
        }
      },

      onDidDamage({ buff, defender, attacker, actualBattle }) {

        if (buff.data.timeTillLearn <= 0) {
          const LEARNT_DURATION = Infinity;

          // Does defender already have the buff?
          let targetBuff = _.findWhere(defender.buffs, { id: 'gorilla_learning' });
          if (targetBuff) {
            targetBuff.data.duration = LEARNT_DURATION;
            defender.stats.attackMax *= (1 - ((targetBuff.data.stacks * 2) / 100));
            defender.stats.attack *= (1 - ((targetBuff.data.stacks * 2) / 100));
            defender.stats.magicPower *= (1 - ((targetBuff.data.stacks * 2) / 100));

            if (defender.stats.attackMax <= 0) {
              defender.stats.attackMax = 1;
            }
            if (defender.stats.attack <= 0) {
              defender.stats.attack = 1;
            }
            if (defender.stats.magicPower <= 0) {
              defender.stats.magicPower = 1;
            }

            targetBuff.data.stacks *= 3;
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
            }

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

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
        buff.data.duration -= secondsElapsed;

        if (buff.data.duration < 0) {
          removeBuff({ buff, target, caster });
        }
      },

      onTookDamage({ buff, defender, attacker, actualBattle, damageDealt }) {
        const constants = buff.constants.constants;

        const extraDamage = 0.01 * buff.data.stacks;
        const attackerDamage = attacker.stats.attack + ((attacker.stats.attackMax - attacker.stats.attack) / 2);
        actualBattle.utils.dealDamage(extraDamage * attackerDamage, {
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

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {

        if (!buff.data.lampsSpawned) {

            const powerLamp = {
              id: Random.id(),
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
                  isEnemy: true,
                  icon: 'bossGeniePowerLamp.svg',        
                  name: 'power lap'
                }
              }]
            }

            const wisdomLamp = {
              id: Random.id(),
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
                  isEnemy: true,
                  icon: 'bossGenieWisdomLamp.svg',        
                  name: 'wisdom lamp'
                }
              }]
            }

            const healthLamp = {
              id: Random.id(),
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
                  isEnemy: true,
                  icon: 'bossGenieHealthLamp.svg',        
                  name: 'health lamp'
                }
              }]
            }

            actualBattle.enemies.push(powerLamp);
            actualBattle.enemies.push(wisdomLamp);
            actualBattle.enemies.push(healthLamp);

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

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
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
          }
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

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
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
          }
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

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
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
          }
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
      onApply({ buff, target, caster }) {
        caster.stats.health *= 1.5;
        caster.stats.healthMax *= 1.5;
      },

      onTick({ secondsElapsed, buff, target, caster }) {
        // Blank
        if (buff.data.duration <= 0) {
          removeBuff({ target, buff, caster: target })
        }
      },

      onRemove({ buff, target, caster }) {
        // Blank
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
      onApply({ buff, target, caster }) {
        caster.stats.attack *= 1.1;
        caster.stats.attackMax *= 1.1;
      },

      onTick({ secondsElapsed, buff, target, caster }) {
        // Blank
        if (buff.data.duration <= 0) {
          removeBuff({ target, buff, caster: target })
        }
      },

      onRemove({ buff, target, caster }) {
        // Blank
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
      onApply({ buff, target, caster }) {
        caster.stats.magicPower *= 1.2;
      },

      onTick({ secondsElapsed, buff, target, caster }) {
        // Blank
        if (buff.data.duration <= 0) {
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

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {

        if (!buff.data.lastKnownHealth) {
          buff.data.lastKnownHealth = target.stats.health;
        } else {
          const healthLost = buff.data.lastKnownHealth - target.stats.health;
          buff.data.lastKnownHealth = target.stats.health;
          buff.data.damageTillSpawn -= healthLost;
          buff.data.stacks = Math.round(buff.data.damageTillSpawn);
        }

        if (buff.data.damageTillSpawn <= 0) {
          buff.data.damageTillSpawn = 250;
          const birdStats = JSON.parse(JSON.stringify(target.stats));
          birdStats.health = 250;
          birdStats.healthMax = 250;
          birdStats.attackSpeed = 1;
          birdStats.attackSpeedTicks = attackSpeedTicks(1);
          birdStats.attackMax = 100;
          birdStats.attack = 100;
          birdStats.armor /= 2.5;

          // Spawn bird
          const bird = {
            id: Random.id(),
            tickOffset: actualBattle.tick + 4,
            icon: 'bird.svg',
            name: 'bird',
            stats: birdStats,
            buffs: []
          }

          actualBattle.enemies.push(bird);
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

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
        buff.data.timeTillBlood -= secondsElapsed;

        // So user can see how far away spawn is
        buff.data.stacks = Math.round(buff.data.timeTillBlood);

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
          }

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

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {

        // Healers spawned?
        if (!buff.data.healersSpawned) {
          for (let i = 0; i < 2; i++) {
            const birdStats = JSON.parse(JSON.stringify(target.stats));
            birdStats.health = 1000;
            birdStats.healthMax = 1000;
            birdStats.attackSpeed = 0.7;
            birdStats.attackSpeedTicks = attackSpeedTicks(0.7);
            birdStats.attackMax = 50;
            birdStats.attack = 50;
            birdStats.accuracy *= 1.5;
            birdStats.armor /= 2;
            birdStats.magicPower = 25;
            birdStats.healingPower = 250;
            birdStats.mageArmor = 500;

            // Spawn bird
            const bird = {
              id: Random.id(),
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
            }

            actualBattle.enemies.push(bird);
          }

          const birdStats = JSON.parse(JSON.stringify(target.stats));
          birdStats.health = 5000;
          birdStats.healthMax = 5000;
          birdStats.attackSpeed = 0.01;
          birdStats.attackSpeedTicks = attackSpeedTicks(0.01);
          birdStats.attackMax = 1;
          birdStats.attack = 1;

          // Spawn wall
          const wall = {
            id: Random.id(),
            tickOffset: 0,
            icon: 'stoneWall.svg',
            name: 'stone wall',
            stats: birdStats,
            buffs: []
          }

          actualBattle.enemies.push(wall);

          buff.data.healersSpawned = true;
          buff.data.stacks = 0;
        }

        if (buff.data.stacks >= 0) {
          let ratio = 1;
          if (buff.data.enraged) { 
            ratio = 0.3;
          }
          buff.data.stacks -= secondsElapsed * 66 * ratio;
          buff.data.stacks = Math.round(buff.data.stacks);
        } else {
          buff.data.stacks = 0;
        }

        if (buff.data.stacks < 333 && buff.data.enraged) {
          buff.data.enraged = false;
          target.stats.attackSpeed /= 2;
          target.stats.attackSpeedTicks = attackSpeedTicks(target.stats.attackSpeed);
          buff.data.icon = 'oldTortoise';
        }
      },

      onTookDamage({ buff, defender, attacker, actualBattle, damageDealt }) {
        if (buff.data.stacks != null) {
          buff.data.stacks += damageDealt;
          buff.data.stacks = Math.round(buff.data.stacks);
        }

        if (buff.data.stacks >= 350 && !buff.data.enraged) {
          buff.data.enraged = true;
          defender.stats.attackSpeed *= 2;
          defender.stats.attackSpeedTicks = attackSpeedTicks(defender.stats.attackSpeed);
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

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
        buff.data.timeTillSpawn -= secondsElapsed;

        // So user can see how far away spawn is
        buff.data.stacks = Math.round(buff.data.timeTillSpawn);

        if (!buff.data.timeTillSpawn || buff.data.timeTillSpawn <= 0) {

          const birdStats = JSON.parse(JSON.stringify(target.stats));
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
            id: Random.id(),
            tickOffset: 0,
            icon: 'tentacle.svg',
            name: 'tentacle',
            buffs: [],
            stats: birdStats
          }

          actualBattle.enemies.push(littlebird);

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

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
        buff.data.timeTillCharge -= secondsElapsed;

        // So user can see how far away spawn is
        buff.data.stacks = Math.round(buff.data.timeTillCharge);

        if (!buff.data.timeTillCharge || buff.data.timeTillCharge <= 0) {

          const unitToAttack = _.findWhere(actualBattle.units, { id: target.target });

          const attackMax = target.stats.attackMax;
          const damageToDeal = buff.data.magic ? attackMax * 5 : attackMax * 6
          actualBattle.utils.dealDamage(damageToDeal, {
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

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
        if (!buff.data.poodleSpawned) {
          // Add poodle to the game

          const poodleStats = JSON.parse(JSON.stringify(target.stats));
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
            id: Random.id(),
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
          }

          actualBattle.enemies.push(poodle);

          buff.data.poodleSpawned = true;
        }

        buff.data.timeTillDefensive -= secondsElapsed;

        // So user can see how far away spawn is
        buff.data.stacks = Math.round(buff.data.timeTillDefensive);

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
                const damageDone = poodleBuff.data.damageMap[key]
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
          }

          // cast attack reduction
          addBuff({ buff: newBuff, target: defender, caster: attacker, actualBattle });

          // Refresh existing attack_duration buffs
          defender.buffs.forEach((buff) => {
            if (buff.id === 'attack_duration') {
              buff.data.duration = 10;
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

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
        buff.data.timeTillSwitch -= secondsElapsed;

        // So user can see how far away spawn is
        buff.data.stacks = Math.round(buff.data.timeTillSwitch);

        if (!buff.data.timeTillSwitch || buff.data.timeTillSwitch <= 0) {
          // Target a random unit
          target.target = _.sample(actualBattle.units).id
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
          buff.data.stacks -= 1;
          if (buff.data.stacks < 0) {
            if (buff.data.refreshes > 0) {
              buff.data.refreshes -= 1;
              buff.data.stacks = 35;
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
            }

            // cast earth dart
            addBuff({ buff: newBuff, target: defender, caster: defender, actualBattle });
          }
        } else if (buff.data.phase === AIR_PHASE) {
          buff.data.stacks -= Math.round(damageDealt);
          if (buff.data.stacks <= 0 && buff.data.initPhase) {
            // Next phase
            buff.data.phase = 0;
            buff.data.initPhase = false;
            buff.data.icon = 'waterFox.svg';
            defender.icon = 'waterFox.svg';
          }
        }
      },

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {

        if (buff.data.phase === WATER_PHASE) {
          // Init water phase
          if (!buff.data.initPhase) {
            buff.data.initPhase = true;

            for (let i = 0; i < 3; i++) {
              // Create two fountains that heal fox rather quickly
              const fountainStats = JSON.parse(JSON.stringify(target.stats));
              fountainStats.health = 750;
              fountainStats.healthMax = 750;
              fountainStats.defense = 150;
              fountainStats.armor *= 0.5;
              fountainStats.magicArmor *= 0.5;
              fountainStats.attack = 1;
              fountainStats.attackMax = 1;
              fountainStats.attackSpeedTicks = 100;

              // Spawn little bird
              const fountain = {
                id: Random.id(),
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
              }

              actualBattle.enemies.push(fountain);
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
            buff.data.stacks = 35;
            // 2 refreshes of shield
            buff.data.refreshes = 2;
            // Casts earth shield every 35 stacks (reflects damage at target for 3 seconds)
          }
        } else if (buff.data.phase === FIRE_PHASE) {
          if (!buff.data.initPhase) {
            buff.data.initPhase = true;
            // Start timer till phase ends
            buff.data.stacks = 65;
            buff.data.timeTillNextPhase = 65;
          }

          buff.data.timeTillNextPhase -= secondsElapsed;
          buff.data.stacks = Math.floor(buff.data.timeTillNextPhase);

          if (buff.data.stacks === 60 || buff.data.stacks === 30) {
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
              }

              // cast ignite
              addBuff({ buff: newBuff, target: unit, caster: target, actualBattle });
            })
          } else if (buff.data.stacks <= 0) {
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
            }

            const unit = _.findWhere(actualBattle.units, { id: target.target });
            // cast ignite
            addBuff({ buff: newBuff, target: unit, caster: target, actualBattle });

            actualBattle.utils.dealDamage(500, {
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
            buff.data.stacks = 2000;
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
              const mirageStats = JSON.parse(JSON.stringify(target.stats));
              mirageStats.health = 250;
              mirageStats.healthMax = 250;
              mirageStats.defense = 150;
              mirageStats.armor *= 0.5;
              mirageStats.magicArmor *= 0.5;
              mirageStats.attack = 100;
              mirageStats.attackMax = 100;

              // Spawn little bird
              const mirage = {
                id: Random.id(),
                tickOffset: 0,
                icon: 'airFox.svg',
                name: 'mirage',
                buffs: [],
                stats: mirageStats
              }

              actualBattle.enemies.push(mirage);
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

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
        if (Math.random() * 100 >= 10) return;

        // Find fox
        const fox = _.findWhere(actualBattle.enemies, { name: 'fox' });

        // Heal Fox, reduce health by healed amount
        target.stats.health -= 50;
        actualBattle.utils.healTarget(50, {
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
      const c = buff.constants;
      return `Swipes and bathes the battlefield in flame`;
    },
    constants: {
    },
    data: {
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {
      },

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
        // stacks build up every tick without an attack and reset after attack
        buff.data.stackTimer += secondsElapsed;
        if (buff.data.stackTimer > 1) {
          buff.data.stackTimer = 0;
          buff.data.stacks += 1;
        }

        if (Math.random() < (buff.data.attackChance + buff.data.stacks / 100)) {
          buff.data.stacks = 0;
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
      resurrectionTimer: 25,
    },
    data: {
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {
        buff.data.timeTillResurrection = buff.constants.constants.resurrectionTimer;
      },

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
        if (buff.data.timeTillResurrection > 0) {
          buff.data.timeTillResurrection -= secondsElapsed;
          buff.data.stacks = Math.round(buff.data.timeTillResurrection);
        } else {
          const roomToSpawn = _.sample([1, 2, 3, 4, 5]);
          const enemy = _.sample(genericTowerMonsterGenerator(actualBattle.floor, roomToSpawn));
          actualBattle.enemies.push(enemy);
          buff.data.timeTillResurrection = Math.round(Math.sqrt(Math.pow(roomToSpawn, 2.5) * 10));
          buff.data.stacks = Math.round(buff.data.timeTillResurrection);
        }
      },

      onRemove({ buff, target }) {
      }
    }
  },
}
