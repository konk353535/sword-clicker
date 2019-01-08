import moment from 'moment';
import { addBuff, removeBuff } from '../../battleUtils';
import { CDbl } from '../../utils.js';
import { BUFFS } from './index.js';
import lodash from 'lodash';
import uuid from 'node-uuid';

export const COMPANION_BUFFS = {
  baby_fox_ability: {
    duplicateTag: 'baby_fox_ability', // Used to stop duplicate buffs
    icon: 'babyFox.svg',
    name: 'baby fox',
    description() {
      return `Summons a baby fox`;
    },
    constants: {
    },
    data: {
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {
      },

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
        if (!buff.data.isSpawned) {
          buff.data.isSpawned = true;
          buff.data.hideBuff = true;
          // Spawn our fox
          const foxToSpawn = lodash.sample(['fire', 'water', 'air', 'earth']);
          let fox = {
            owner: target.id,
            id: uuid.v4(),
            tickOffset: 0,
            isNPC: true,
            isCompanion: true,
          };

          if (foxToSpawn === 'fire') {
            fox.icon = 'babyFireFox.svg';
            fox.name = 'Fire fox';
            fox.stats = {
              attack: 1,
              attackMax: 1,
              attackSpeed: 1,
              accuracy: 1,
              health: target.stats.healthMax * 0.5,
              healthMax: target.stats.healthMax * 0.5,
              defense: target.stats.defense,
              armor: target.stats.armor,
              magicArmor: target.stats.magicArmor * 0.5,
              magicPower: target.stats.magicPower,
              damageTaken: 1
            };
            fox.buffs = [{
              id: 'baby_fire_fox',
              data: {
                duration: Infinity,
                totalDuration: Infinity,
                name: 'baby fire fox',
                timeTillCharge: 5,
                icon: 'babyFireFox.svg'
              }
            }]
          } else if (foxToSpawn === 'earth') {
            fox.icon = 'babyEarthFox.svg';
            fox.name = 'Earth fox';
            fox.stats = {
              attack: target.stats.attackMax * 0.05,
              attackMax: target.stats.attackMax * 0.05,
              attackSpeed: 0.5,
              accuracy: target.stats.accuracy * 0.5,
              health: target.stats.healthMax * 0.5,
              healthMax: target.stats.healthMax * 0.5,
              defense: target.stats.defense,
              armor: target.stats.armor,
              magicArmor: target.stats.magicArmor,
              magicPower: target.stats.magicPower * 0.5,
              damageTaken: 1
            };
            fox.buffs = [{
              id: 'baby_earth_fox',
              data: {
                duration: Infinity,
                totalDuration: Infinity,
                name: 'baby earth fox',
                timeTillCharge: 2,
                icon: 'babyEarthFox.svg'
              }
            }]
          } else if (foxToSpawn === 'air') {
            fox.icon = 'babyAirFox.svg';
            fox.name = 'Air fox';
            fox.stats = {
              attack: target.stats.attackMax * 0.1,
              attackMax: target.stats.attackMax * 0.1,
              attackSpeed: 1,
              accuracy: target.stats.accuracy,
              health: target.stats.healthMax * 0.5,
              healthMax: target.stats.healthMax * 0.5,
              defense: target.stats.defense,
              armor: target.stats.armor,
              magicArmor: target.stats.magicArmor * 0.6,
              magicPower: target.stats.magicPower * 0.6,
              damageTaken: 1
            };
            fox.buffs = [];
          } else if (foxToSpawn === 'water') {
            fox.icon = 'babyWaterFox.svg';
            fox.name = 'Water fox';
            fox.stats = {
              attack: 1,
              attackMax: 1,
              attackSpeed: 0.001,
              accuracy: 1,
              health: target.stats.healthMax * 0.5,
              healthMax: target.stats.healthMax * 0.5,
              defense: target.stats.defense,
              armor: target.stats.armor,
              magicArmor: target.stats.magicArmor * 0.5,
              magicPower: target.stats.magicPower,
              healingPower: target.stats.healingPower,
              damageTaken: 1
            };
            fox.buffs = [{
              id: 'baby_water_fox',
              data: {
                duration: Infinity,
                totalDuration: Infinity,
                name: 'baby water fox',
                icon: 'babyWaterFox.svg',
                timeTillCharge: 5                
              }
            }]
          }

          actualBattle.addUnit(fox);
        }
      },

      onRemove({ buff, target }) {
      }
    }
  },
  
  skeletal_warrior: {
    duplicateTag: 'skeletal_warrior', // Used to stop duplicate buffs
    icon: 'boneWarrior.svg',
    name: 'skeletal warrior',
    description() {
      return `Summons a skeletal warrior`;
    },
    constants: {
    },
    data: {
      hideBuff: true
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {
      },

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
        if (!buff.data.isSpawned) {
          buff.data.isSpawned = true;
          buff.data.hideBuff = true;

          let companion = {
            owner: target.id,
            id: uuid.v4(),
            tickOffset: 0,
            isNPC: true,
            isCompanion: true,
            isSoloCompanion: true,
            icon: 'boneWarrior.svg',
            name: target.name + '\'s Warrior',
            stats: {
              attack: target.stats.attack * 0.25,
              attackMax: target.stats.attackMax * 0.25,
              attackSpeed: target.stats.attackSpeed * 0.5,
              accuracy: target.stats.accuracy * 0.8,
              health: target.stats.healthMax * 0.6,
              healthMax: target.stats.healthMax * 0.6,
              defense: target.stats.defense * 0.7,
              armor: target.stats.armor * 1.0,
              magicArmor: target.stats.magicArmor * 0.5,
              magicPower: target.stats.magicPower * 0.2,
              damageTaken: 1 // damage received (1 = 100% of all incoming damage)
            },
            buffs: [],
          };
          
          actualBattle.addUnit(companion);
        }
      },

      onRemove({ buff, target }) {
      }
    }
  },
  
  cute_pig: {
    duplicateTag: 'cute_pig', // Used to stop duplicate buffs
    icon: 'cutePig.svg',
    name: 'cute pig',
    description() {
      return `Summons a cute pig`;
    },
    constants: {
    },
    data: {
      hideBuff: true
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {
      },

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
        if (!buff.data.isSpawned) {
          buff.data.isSpawned = true;
          buff.data.hideBuff = true;

          // this companion won't help in personal quests
          // this companion won't help in battle with other solo companions
          if ((actualBattle.isTower()) && (!actualBattle.haveAnySoloCompanions())) {
            const attackSkill = target.attackSkill();
            const defenseSkill = target.defenseSkill();
            const magicSkill = target.magicSkill();
            const healthSkill = target.healthSkill();
            const towerFloor = actualBattle.towerFloor() < 5 ? 5 : actualBattle.towerFloor();
            
            let companion = {
              owner: target.id,
              id: uuid.v4(),
              tickOffset: 0,
              isNPC: true,
              isCompanion: true,
              isSoloCompanion: true,
              icon: 'cutePig.svg',
              name: target.name + '\'s Pig',
              stats: {
                attack: (Math.sqrt(attackSkill * 3) * towerFloor / 25) + 1, // pigs don't do much damage, they're tanks
                attackMax: (Math.sqrt(attackSkill * 3) * towerFloor / 25) + 2, // pigs don't do much damage, they're tanks
                attackSpeed: 0.3,
                accuracy: (Math.sqrt(attackSkill * 3) * towerFloor / 2.5) + 1,
                health: (Math.sqrt(healthSkill * 3) * towerFloor * 12.5) + 200,
                healthMax: (Math.sqrt(healthSkill * 3) * towerFloor * 12.5) + 200,
                defense: (Math.sqrt(defenseSkill * 3) * towerFloor / 1.45) + 50,
                armor: (Math.sqrt(defenseSkill * 3) * towerFloor * 1.65) + 100,
                magicArmor: (Math.sqrt(defenseSkill * 2) * towerFloor / 5) + (Math.sqrt(magicSkill * 2) * towerFloor / 5) + 25,
                magicPower: (Math.sqrt(magicSkill * 3) * towerFloor / 3),
                damageTaken: 1 // damage received (1 = 100% of all incoming damage)
              },
              buffs: [{
                id: 'companion_taunt',
                data: {
                  duration: Infinity,
                  totalDuration: Infinity,
                  name: 'companion taunt',
                  icon: 'taunt.svg',
                  timeTillCharge: 5                
                }
              }],
            };
            
            actualBattle.addUnit(companion);
          }
        }
      },

      onRemove({ buff, target }) {
      }
    }
  },  
  
  companion_taunt: {
    duplicateTag: 'companion_taunt', // Used to stop duplicate buffs
    icon: 'taunt.svg',
    name: 'companion taunt',
    description() {
      return `Companion will taunt random targets every 5 seconds.`;
    },
    constants: {
    },
    data: {
      duration: Infinity,
      totalDuration: Infinity,
      timeTillCharge: 5,
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
      },

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
        if (buff.data.timeTillCharge > 0) {
          buff.data.timeTillCharge -= secondsElapsed;
        } else {
          const targetToTaunt = lodash.sample(actualBattle.enemies);
          if (targetToTaunt && targetToTaunt.target !== target.id && targetToTaunt.stats.health > 0) {
            targetToTaunt.target = target.id
            buff.data.timeTillCharge = 5;
          } else {
            buff.data.timeTillCharge = 1;
          }
        }

        buff.stacks = Math.round(buff.data.timeTillCharge);
      },

      onRemove({ buff, target, caster }) {
      }
    }
  },
};
