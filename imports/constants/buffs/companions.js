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
            icon: 'boneWarrior.svg',
            name: 'Skeletal Warrior',
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
              damageTaken: 0
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
};
