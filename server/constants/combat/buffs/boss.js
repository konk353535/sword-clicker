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
  },

  boss_spartan: {
    duplicateTag: 'boss_spartan', // Used to stop duplicate buffs
    icon: 'spartan',
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
            spartanStats.health = 300;
            spartanStats.healthMax = 300;
            spartanStats.attack *= 0.3;
            spartanStats.attackMax *= 0.3;

            // Spawn little snake
            const littleSpartan = {
              id: Random.id(),
              tickOffset: 0,
              icon: 'spartan',
              name: 'spartan',
              stats: spartanStats,
              buffs: [{
                id: 'phalanx',
                data: {
                  duration: Infinity,
                  totalDuration: Infinity,
                  isEnemy: true,
                  icon: 'phalanx',        
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
          birdStats.defense *= 0.7;
          birdStats.attack *= 0.1;
          birdStats.attackMax *= 0.1;
          birdStats.accuracy *= 1.5;
          birdStats.magicPower = 20;

          // Spawn little bird
          const littlebird = {
            id: Random.id(),
            tickOffset: 0,
            icon: 'bird',
            name: 'bird',
            buffs: [{
              id: 'boss_mage_bird',
              data: {
                icon: 'bird'
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
    icon: 'bossMageBird',
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
          target.stats.health = 200;
          const newBuff = {
            id: 'ignite',
            data: {
              duration: 25,
              totalDuration: 25,
              icon: 'ignite',
              description: 'Burns you each second'
            }
          }

          addBuff({ buff: newBuff, target: unit, caster: target, actualBattle });
          target.stats.health = 0;
        });
      }
    }
  },

  boss_goblin: {
    duplicateTag: 'boss_goblin', // Used to stop duplicate buffs
    icon: 'goblin',
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
              icon: 'goblin',
              name: 'goblin',
              stats: goblinStats,
              buffs: [{
                id: 'goblin_stat_stealer',
                data: {
                  duration: Infinity,
                  totalDuration: Infinity,
                  timeTillSteal: 15,
                  icon: 'goblin',        
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
    icon: 'ogre',
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
    icon: 'spartan',
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
              icon: 'phoenixEgg',
              name: 'phoenix egg',
              stats: phoenixStats,
              buffs: [{
                id: 'phoenix_egg',
                data: {
                  duration: Infinity,
                  totalDuration: Infinity,
                  timeTillSpawn: 60,
                  isEnemy: true,
                  icon: 'babyPhoenix',        
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
    icon: 'phoenixEgg',
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
            icon: 'babyPhoenix',
            name: 'babyPhoenix',
            stats: phoenixStats,
            buffs: [{
              id: 'baby_phoenix',
              data: {
                duration: Infinity,
                totalDuration: Infinity,
                icon: 'phoenixEgg',        
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
        if (!buff.data.hasSpawned) {

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
            icon: 'babyPhoenix',
            name: 'babyPhoenix',
            stats: phoenixStats,
            buffs: [{
              id: 'baby_phoenix',
              data: {
                duration: Infinity,
                totalDuration: Infinity,
                icon: 'phoenixEgg',        
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
    icon: 'babyPhoenix',
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
          icon: 'phoenixEgg',
          name: 'phoenix egg',
          stats: phoenixStats,
          buffs: [{
            id: 'phoenix_egg',
            data: {
              duration: Infinity,
              totalDuration: Infinity,
              timeTillSpawn: 120,
              isEnemy: true,
              icon: 'babyPhoenix',  
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
                icon: 'gorillaLearning',
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
    icon: 'gorillaLearning',
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
          tickEvents: actualBattle.tickEvents
        });
      },

      onRemove({ buff, target }) {
      }
    }
  },

  boss_genie_lamp: {
    duplicateTag: 'boss_genie_lamp', // Used to stop duplicate buffs
    icon: 'bossGenieLamp',
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
              icon: 'bossGeniePowerLamp',
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
                  icon: 'bossGeniePowerLamp',        
                  name: 'power lap'
                }
              }]
            }

            const wisdomLamp = {
              id: Random.id(),
              tickOffset: 0,
              icon: 'bossGenieWisdomLamp',
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
                  icon: 'bossGenieWisdomLamp',        
                  name: 'wisdom lamp'
                }
              }]
            }

            const healthLamp = {
              id: Random.id(),
              tickOffset: 0,
              icon: 'bossGenieHealthLamp',
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
                  icon: 'bossGenieHealthLamp',        
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
    icon: 'bossGeniePowerLamp',
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
              icon: 'bossGeniePowerLamp',        
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
    icon: 'bossGenieWisdomLamp',
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
              icon: 'bossGenieWisdomLamp',
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
    icon: 'bossGenieHealthLamp',
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
              icon: 'bossGenieHealthLamp',        
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
    icon: 'bossGenieHealthLamp',
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
        console.log(`Before health = ${caster.stats.health}`)
        caster.stats.health *= 1.5;
        caster.stats.healthMax *= 1.5;
        console.log(`After health = ${caster.stats.health}`)
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
    icon: 'bossGeniePowerLamp',
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
        console.log(`Before attack power = ${caster.stats.attack}`)
        caster.stats.attack *= 1.1;
        caster.stats.attackMax *= 1.1;
        console.log(`After attack power = ${caster.stats.attack}`)
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
    icon: 'bossGenieWisdomLamp',
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
        console.log(`Before magic power = ${caster.stats.magicPower}`)
        caster.stats.magicPower *= 1.2;
        console.log(`After magic power = ${caster.stats.magicPower}`)
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
    icon: 'livingTree',
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
          buff.data.damageTillSpawn = 100;
          const birdStats = JSON.parse(JSON.stringify(target.stats));
          birdStats.health = 250;
          birdStats.healthMax = 250;
          birdStats.attackSpeed = 1;
          birdStats.attackSpeedTicks = attackSpeedTicks(1);
          birdStats.attackMax = 150;
          birdStats.attack = 150;
          birdStats.armor /= 2;

          // Spawn bird
          const bird = {
            id: Random.id(),
            tickOffset: 0,
            icon: 'bird',
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
}
