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

  name_changer_common: { // renamer | rare spawns
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
        const curFloor = (actualBattle.floor && actualBattle.floor > 0) ? actualBattle.floor : actualBattle.pqTowerEquivalence();
        const curRoom = (actualBattle.room && actualBattle.room > 0) ? actualBattle.room : 4; // '4' is the average level between 1-7 if we're in PQ or fighting boss
        const thisOre = actualBattle.lookupOreTier(curFloor);
        const thisMetal = actualBattle.lookupMetalTier(curFloor);
        const thisMetalCapped20 = actualBattle.lookupMetalTier((curFloor > 20) ? 20 : curFloor);
        const thisWood = actualBattle.lookupWoodTier(curFloor);
        const allowBonuses = (curRoom > 3);
        
        // debug
        /*
        if (target.name === 'bee') {
          target.extraLootTable = [{ id: `${thisMetal}_knife`, chance: 0.25 }, { type: 'gold', chance: 0.25, quantity: 1000 * curFloor }];
        }
        */


        // enemies handled:
        // grasshopper, fly, goblin, vampire, young ninja, monk, demon, angel, cat purse, beaver, snake, worm, angry miner, bird, rat, fish, lizard, elephant, crab, all mages


        // enemies not handled:
        // bee, ice giant, warden, spartan, unicorn, dwarf, octopus, all spirits, butterfly, dragonfly, wasp, snail, echidna, wombat, rabbit, jellyfish, gorilla, gelatinous cube


        if (target.name === 'crab') {
          if (rand < 0.10) { // 10% chance to upgrade to citizen snips
            const babySnips = Object.assign({}, target.raw());
            babySnips.id = uuid.v4();
            babySnips.icon = 'citizensnips.png';
            babySnips.name = 'baby snips';
            babySnips.buffs = [];
            babySnips.target = _.sample(actualBattle.units).id;
            const babySnipsUnit = actualBattle.addUnit(babySnips);
            const newBuff = {
              id: 'crab_monster',
              icon: 'armor.svg',
              name: 'crab armor',
              stacks: buff.stacks,
              data: {
                name: 'crab armor',
                duration: Infinity,
                totalDuration: Infinity,
                icon: 'armor.svg',
              },
              constants: BUFFS['crab_monster']
            };
            addBuff({ buff: newBuff, target: babySnipsUnit, caster: target, actualBattle });

            target.name = 'citizen snips';
            target.icon = 'citizensnips.png';
            target.stats.health *= 2.25;
            target.stats.healthMax *= 2.25;
            target.stats.attack *= 1.5;
            target.stats.attackMax *= 2.0;
            target.stats.defense *= 1.15;
            target.stats.accuracy *= 1.3;
            notifyChangeForUnitProperty({unit: target, property: 'name', actualBattle});
            notifyChangeForUnitProperty({unit: target, property: 'icon', actualBattle});
            if (allowBonuses) {
              target.bonusLoot += Math.ceil(Math.random() * actualBattle.room * 3);
            }
          }
        } else if (target.name === 'fly') {
          if (rand < 0.10) { // 10% chance to upgrade to hell fly
            target.name = 'hell fly';
            target.icon = 'flyDire.svg';
            target.stats.health *= 1.25;
            target.stats.healthMax *= 1.25;
            target.stats.attack *= 1.5;
            target.stats.attackMax *= 2.0;
            target.stats.defense *= 1.15;
            target.stats.accuracy *= 1.3;
            notifyChangeForUnitProperty({unit: target, property: 'name', actualBattle});
            notifyChangeForUnitProperty({unit: target, property: 'icon', actualBattle});
            if (allowBonuses) {
              target.bonusLoot += Math.ceil(Math.random() * actualBattle.room * 1.25);
            }
          }
        } else if (target.name === 'worm') {
          if (rand < 0.10) { // 10% chance to upgrade to wyrm
            for (let i = 0; i < 2; i++) {
              const newWorm = Object.assign({}, target.raw());
              newWorm.id = uuid.v4();
              newWorm.buffs = [];
              newWorm.target = _.sample(actualBattle.units).id;
              actualBattle.addUnit(newWorm);
            }
            target.name = 'wyrm';
            target.icon = 'wurm.svg';
            target.stats.health *= 1.25;
            target.stats.healthMax *= 1.25;
            target.stats.attack *= 1.5;
            target.stats.attackMax *= 2.0;
            target.stats.defense *= 1.15;
            target.stats.accuracy *= 1.3;
            notifyChangeForUnitProperty({unit: target, property: 'name', actualBattle});
            notifyChangeForUnitProperty({unit: target, property: 'icon', actualBattle});
            if (allowBonuses) {
              target.bonusLoot += Math.ceil(Math.random() * actualBattle.room * 2);
            }
            const newBuff = {
              id: 'rat_monster',
              data: {
                duration: Infinity,
                totalDuration: Infinity,
                icon: 'wurmMouth.svg',
                name: 'Maw'
              },
              constants: BUFFS['rat_monster']
            };
            addBuff({ buff: newBuff, target: target, caster: target, actualBattle });            
          }
        } else if (target.name === 'grasshopper') {
          if (rand < 0.20) { // 20% chance to upgrade to locust
            for (let i = 0; i < 2; i++) {
              const newGrasshopper = Object.assign({}, target.raw());
              newGrasshopper.id = uuid.v4();
              newGrasshopper.buffs = [];
              newGrasshopper.target = _.sample(actualBattle.units).id;
              actualBattle.addUnit(newGrasshopper);
            }
            target.name = 'locust';
            target.icon = 'locust.svg';
            target.stats.health *= 1.25;
            target.stats.healthMax *= 1.25;
            target.stats.attack *= 1.2;
            target.stats.attackMax *= 1.3;
            target.stats.defense *= 1.15;
            target.stats.accuracy *= 1.2;
            notifyChangeForUnitProperty({unit: target, property: 'name', actualBattle});
            notifyChangeForUnitProperty({unit: target, property: 'icon', actualBattle});
            if (allowBonuses) {
              target.bonusLoot += Math.ceil(Math.random() * actualBattle.room * 1.1);
            }
          }
        } else if (target.name === 'vampire') {
          if (rand < 0.10) { // 10% chance to upgrade to wraith
            target.name = 'wraith';
            target.icon = 'wraith.svg';
            target.stats.health *= 1.25;
            target.stats.healthMax *= 1.25;
            target.stats.attack *= 1.2;
            target.stats.attackMax *= 1.3;
            target.stats.defense *= 1.15;
            target.stats.accuracy *= 1.2;
            notifyChangeForUnitProperty({unit: target, property: 'name', actualBattle});
            notifyChangeForUnitProperty({unit: target, property: 'icon', actualBattle});
            const newBuff = {
              id: 'vampirism',
              data: {
                duration: Infinity,
                totalDuration: Infinity,
                icon: 'vampirism.svg',
                name: 'vampirism',
                level: 3
              },
              constants: BUFFS['vampirism']
            };
            addBuff({ buff: newBuff, target: target, caster: target, actualBattle });
            if (allowBonuses) {
              target.bonusLoot += Math.ceil(Math.random() * actualBattle.room * 1.1);
            }
          }
        } else if (target.name === 'rat') {
          if (rand < 0.10) { // 10% chance to upgrade to dire rat
            target.name = 'dire rat';
            target.icon = 'ratDire.svg';
            target.stats.health *= 1.25;
            target.stats.healthMax *= 1.25;
            target.stats.attack *= 1.5;
            target.stats.attackMax *= 2.0;
            target.stats.defense *= 1.15;
            target.stats.accuracy *= 1.3;
            notifyChangeForUnitProperty({unit: target, property: 'name', actualBattle});
            notifyChangeForUnitProperty({unit: target, property: 'icon', actualBattle});
            if (allowBonuses) {
              target.bonusLoot += Math.ceil(Math.random() * actualBattle.room * 1.75);
            }
            const newBuff = {
              id: 'thirsty_fangs',
              data: {
                duration: Infinity,
                totalDuration: Infinity,
                icon: 'thirstyFangs.svg',
                name: 'thirsty fangs',
                level: 1
              },
              constants: BUFFS['thirsty_fangs']
            };
            addBuff({ buff: newBuff, target: target, caster: target, actualBattle });
          }
        } else if (target.name === 'elephant') {
          if (rand < 0.10) { // 10% chance to upgrade to mammoth
            const numInHerd = (Math.ceil(Math.random() * 3) + 1); // 2 - 4;
            for (let i = 0; i < numInHerd; i++) {
              const newElephant = Object.assign({}, target.raw());
              newElephant.id = uuid.v4();
              newElephant.name = 'herd';
              newElephant.buffs = [];
              newElephant.target = _.sample(actualBattle.units).id;
              newElephant.stats.health /= 2;
              newElephant.stats.healthMax /= 2;
              actualBattle.addUnit(newElephant);
            }

            target.name = 'mammoth';
            target.icon = 'mammoth.svg';
            target.stats.health *= 5.15;
            target.stats.healthMax *= 5.15;
            notifyChangeForUnitProperty({unit: target, property: 'name', actualBattle});
            notifyChangeForUnitProperty({unit: target, property: 'icon', actualBattle});
            if (allowBonuses) {
              target.bonusLoot += Math.ceil(Math.random() * actualBattle.room * 2);
            }
            const newBuff = {
              id: 'berserk',
              data: {
                duration: Infinity,
                totalDuration: Infinity,
                icon: 'berserk.svg',
                name: 'berserk',
                level: 3
              },
              constants: BUFFS['berserk']
            };
            addBuff({ buff: newBuff, target: target, caster: target, actualBattle });
          }
        } else if (target.name === 'bird') {
          if (rand < 0.10) { // 10% chance to upgrade to falcon
            target.name = 'falcon';
            target.icon = 'birdFalcon.svg';
            target.stats.health *= 1.25;
            target.stats.healthMax *= 1.25;
            target.stats.attack *= 1.5;
            target.stats.attackMax *= 2.0;
            target.stats.defense *= 1.15;
            target.stats.accuracy *= 1.3;
            notifyChangeForUnitProperty({unit: target, property: 'name', actualBattle});
            notifyChangeForUnitProperty({unit: target, property: 'icon', actualBattle});
            if (allowBonuses) {
              target.bonusLoot += Math.ceil(Math.random() * actualBattle.room * 1.5);
            }
            const newBuff = {
              id: 'rat_monster',
              data: {
                duration: Infinity,
                totalDuration: Infinity,
                icon: 'swipe.svg',
                name: 'Swipe'
              },
              constants: BUFFS['rat_monster']
            };
            addBuff({ buff: newBuff, target: target, caster: target, actualBattle });            
          } else if (rand < 0.20) { // 10% chance to upgrade to eagle
            target.name = 'eagle';
            target.icon = 'birdEagle.svg';
            target.stats.health *= 1.35;
            target.stats.healthMax *= 1.35;
            target.stats.attack *= 1.7;
            target.stats.attackMax *= 2.5;
            target.stats.defense *= 0.85;
            target.stats.accuracy *= 1.3;
            notifyChangeForUnitProperty({unit: target, property: 'name', actualBattle});
            notifyChangeForUnitProperty({unit: target, property: 'icon', actualBattle});
            if (allowBonuses) {
              target.bonusLoot += Math.ceil(Math.random() * actualBattle.room * 1.75);
            }
            const newBuff = {
              id: 'ninja_reflexes',
              data: {
                duration: Infinity,
                totalDuration: Infinity,
                icon: 'birdEagle.svg',
                name: 'Flight'
              },
              constants: BUFFS['ninja_reflexes']
            };
            addBuff({ buff: newBuff, target: target, caster: target, actualBattle });
          }
        } else if (target.name === 'farmer') {
          if (rand < 0.20) {
            target.name = 'townsfolk';
            target.stats.health *= 1.15;
            target.stats.healthMax *= 1.15;
            notifyChangeForUnitProperty({unit: target, property: 'name', actualBattle});
            if (allowBonuses) {
              target.bonusLoot += Math.ceil(Math.random() * actualBattle.room * 1.1);
            }
          } else if (rand < 0.40) {
            target.name = 'pauper';
            target.icon = 'beggar.svg';
            target.stats.health *= 1.1;
            target.stats.healthMax *= 1.1;
            notifyChangeForUnitProperty({unit: target, property: 'name', actualBattle});
            notifyChangeForUnitProperty({unit: target, property: 'icon', actualBattle});
            if (allowBonuses) {
              target.bonusLoot += Math.ceil(Math.random() * actualBattle.room * 1.1);
            }
          } else if (rand < 0.60) {
            target.name = 'rancher';
            target.stats.health *= 1.25;
            target.stats.healthMax *= 1.25;
            notifyChangeForUnitProperty({unit: target, property: 'name', actualBattle});
            if (allowBonuses) {
              target.bonusLoot += Math.ceil(Math.random() * actualBattle.room * 1.1);
              target.extraLootTable = [{ id: 'rockmelon', chance: 0.25 }, { id: 'rockmelon', chance: 0.25 }];
            }
          } else if (rand < 0.80) {
            target.name = 'beggar';
            target.icon = 'beggar.svg';
            target.stats.health *= 0.95;
            target.stats.healthMax *= 0.95;
            notifyChangeForUnitProperty({unit: target, property: 'name', actualBattle});
            notifyChangeForUnitProperty({unit: target, property: 'icon', actualBattle});
          }
        } else if (target.name === 'fish') {
          if (rand < 0.15) { // 15% chance to upgrade to piranha
            target.name = 'piranha';
            target.icon = 'fishPiranha.svg';
            target.stats.health *= 1.35;
            target.stats.healthMax *= 1.35;
            target.stats.attack *= 1.15;
            target.stats.attackMax *= 1.15;
            target.stats.defense *= 0.9;
            target.stats.armor *= 0.9;
            target.stats.accuracy *= 1.2;
            notifyChangeForUnitProperty({unit: target, property: 'name', actualBattle});
            notifyChangeForUnitProperty({unit: target, property: 'icon', actualBattle});
            if (allowBonuses) {
              target.bonusLoot += Math.ceil(Math.random() * actualBattle.room * 2);
            }
          } else if (rand < 0.20) { // 5% chance to upgrade to barracuda
            target.name = 'barracuda';
            target.icon = 'fishBarracuda.svg';
            target.stats.health *= 1.7;
            target.stats.healthMax *= 1.7;
            target.stats.attack *= 1.3;
            target.stats.attackMax *= 1.7;
            target.stats.defense *= 0.7;
            target.stats.armor *= 0.8;
            target.stats.accuracy *= 1.3;
            notifyChangeForUnitProperty({unit: target, property: 'name', actualBattle});
            notifyChangeForUnitProperty({unit: target, property: 'icon', actualBattle});
            if (allowBonuses) {
              target.bonusLoot += Math.ceil(Math.random() * actualBattle.room * 3);
            }
          }
        } else if (target.name === 'lizard') {
          if (rand < 0.05) { // 5% chance to upgrade to basilisk
            target.name = 'basilisk';
            target.icon = 'basilisk.svg';
            target.stats.health *= 3.25;
            target.stats.healthMax *= 3.25;
            target.stats.attack *= 1.5;
            target.stats.attackMax *= 2.5;
            target.stats.defense *= 0.8;
            target.stats.armor *= 1.2;
            target.stats.accuracy *= 1.2;
            notifyChangeForUnitProperty({unit: target, property: 'name', actualBattle});
            notifyChangeForUnitProperty({unit: target, property: 'icon', actualBattle});
            if (allowBonuses) {
              target.bonusLoot += Math.ceil(Math.random() * actualBattle.room * 4);
            }
          }
        } else if (target.name === 'goblin') {
          if (rand < 0.15) { // 15% chance to upgrade to goblin warrior
            target.name = 'warrior';
            target.icon = 'goblinWarrior.svg';
            target.stats.health *= 1.15;
            target.stats.healthMax *= 1.15;
            target.stats.attack *= 1.2;
            target.stats.attackMax *= 1.2;
            target.stats.defense *= 1.2;
            target.stats.armor *= 1.2;
            target.stats.accuracy *= 1.15;
            notifyChangeForUnitProperty({unit: target, property: 'name', actualBattle});
            notifyChangeForUnitProperty({unit: target, property: 'icon', actualBattle});
            const newBuff = {
              id: 'spiked_armor',
              data: {
                duration: Infinity,
                totalDuration: Infinity,
                icon: 'spikedArmor.svg',
                name: 'spiked armor',
                level: 3,
              },
              constants: BUFFS['spiked_armor']
            };
            addBuff({ buff: newBuff, target: target, caster: target, actualBattle });
            if (allowBonuses) {
              target.bonusLoot += Math.ceil(Math.random() * actualBattle.room * 2.5);
              target.extraLootTable = [{ id: `${thisMetalCapped20}_scimitar`, chance: 0.25 }, { id: `${thisMetal}_shield`, chance: 0.25 }];
            }
          } else if (rand < 0.20) { // 5% chance to upgrade to goblin chieftain
            const numInHerd = (Math.ceil(Math.random() * 3) + 1); // 2 - 4;
            for (let i = 0; i < numInHerd; i++) {
              const newGoblin = Object.assign({}, target.raw());
              newGoblin.id = uuid.v4();
              newGoblin.name = 'weakling';
              newGoblin.buffs = [];
              newGoblin.target = _.sample(actualBattle.units).id;
              newGoblin.stats.health /= 2;
              newGoblin.stats.healthMax /= 2;
              actualBattle.addUnit(newGoblin);
            }
            target.name = 'chieftain';
            target.icon = 'goblinChieftain.svg';
            target.stats.health *= 1.65;
            target.stats.healthMax *= 1.65;
            target.stats.defense *= 0.9;
            target.stats.armor *= 0.8;
            target.stats.accuracy *= 1.3;
            notifyChangeForUnitProperty({unit: target, property: 'name', actualBattle});
            notifyChangeForUnitProperty({unit: target, property: 'icon', actualBattle});
            actualBattle.enemies.forEach((enemyUnit) => {
              const newBuff = {
                id: 'war_cry',
                data: {
                  duration: Infinity,
                  totalDuration: Infinity,
                  icon: 'warCry.svg',
                  name: 'war cry',
                  level: 1
                },
                constants: BUFFS['war_cry']
              };
              addBuff({ buff: newBuff, target: enemyUnit, caster: target, actualBattle });
            });
            if (allowBonuses) {
              target.bonusLoot += Math.ceil(Math.random() * actualBattle.room * 4);
              target.extraLootTable = [{ id: `${thisMetalCapped20}_broad_sword`, chance: 0.25 }, { id: `${thisMetal}_kite_shield`, chance: 0.25 }];
            }
          }
        } else if (target.name === 'young ninja') {
          if (rand < 0.10) { // 10% chance to upgrade to adept ninja
            target.name = 'adept ninja';
            target.icon = 'adeptNinja.svg';
            target.stats.health *= 1.15;
            target.stats.healthMax *= 1.15;
            target.stats.attack *= 1.5;
            target.stats.attackMax *= 2.0;
            target.stats.defense *= 1.2;
            target.stats.armor *= 0.9;
            target.stats.accuracy *= 1.15;
            notifyChangeForUnitProperty({unit: target, property: 'name', actualBattle});
            notifyChangeForUnitProperty({unit: target, property: 'icon', actualBattle});
            const newBuff = {
              id: 'phantom_strikes',
              data: {
                duration: Infinity,
                totalDuration: Infinity,
                icon: 'phantomStrikes.svg',
                name: 'phantom strikes',
                level: 2,
              },
              constants: BUFFS['phantom_strikes']
            };
            addBuff({ buff: newBuff, target: target, caster: target, actualBattle });
            if (allowBonuses) {
              target.bonusLoot += Math.ceil(Math.random() * actualBattle.room * 2.5);
            }
          }
        } else if (target.name === 'monk ninja') {
          if (rand < 0.10) { // 10% chance to upgrade to wise monk
            target.name = 'wise monk';
            target.icon = 'monkWise.svg';
            target.stats.attack *= 1.1;
            target.stats.attackMax *= 1.1;
            target.stats.defense *= 1.5;
            target.stats.armor *= 0.9;
            target.stats.accuracy *= 1.1;
            notifyChangeForUnitProperty({unit: target, property: 'name', actualBattle});
            notifyChangeForUnitProperty({unit: target, property: 'icon', actualBattle});
            const newBuff = {
              id: 'phantom_strikes',
              data: {
                duration: Infinity,
                totalDuration: Infinity,
                icon: 'phantomStrikes.svg',
                name: 'phantom strikes',
                level: 2,
              },
              constants: BUFFS['phantom_strikes']
            };
            addBuff({ buff: newBuff, target: target, caster: target, actualBattle });
            if (allowBonuses) {
              target.bonusLoot += Math.ceil(Math.random() * actualBattle.room * 3.5);
            }
          }
        } else if (target.name === 'demon') {
          if (rand < 0.10) { // 10% chance to upgrade to vile demon
            const lesserDemon = Object.assign({}, target.raw());
            lesserDemon.id = uuid.v4();
            lesserDemon.name = 'lesser demon';
            lesserDemon.buffs = [];
            lesserDemon.target = _.sample(actualBattle.units).id;
            lesserDemon.stats.health /= 2;
            lesserDemon.stats.healthMax /= 2;
            actualBattle.addUnit(lesserDemon);
            
            target.name = 'vile demon';
            target.icon = 'demonVile.svg';
            target.stats.health *= 1.5;
            target.stats.healthMax *= 1.5;
            target.stats.attack *= 1.5;
            target.stats.attackMax *= 2.0;
            target.stats.defense *= 1.2;
            target.stats.armor *= 1.2;
            target.stats.accuracy *= 1.5;
            notifyChangeForUnitProperty({unit: target, property: 'name', actualBattle});
            notifyChangeForUnitProperty({unit: target, property: 'icon', actualBattle});
            if (allowBonuses) {
              target.bonusLoot += Math.ceil(Math.random() * actualBattle.room * 3);
            }
          }
        } else if (target.name === 'angel') {
          if (rand < 0.10) { // 10% chance to upgrade to high angel
            const numInHerd = (Math.ceil(Math.random() * 3)); // 1 - 3;
            for (let i = 0; i < numInHerd; i++) {
              const newAngel = Object.assign({}, target.raw());
              newAngel.id = uuid.v4();
              newAngel.name = 'lesser angel';
              newAngel.buffs = [];
              newAngel.target = _.sample(actualBattle.units).id;
              newAngel.stats.health /= 2;
              newAngel.stats.healthMax /= 2;
              actualBattle.addUnit(newAngel);
            }
            target.name = 'high angel';
            target.icon = 'angelHigh.svg';
            target.stats.health *= 1.75;
            target.stats.healthMax *= 1.75;
            target.stats.attack *= 1.2;
            target.stats.attackMax *= 1.5;
            target.stats.defense *= 1.4;
            target.stats.armor *= 1.2;
            target.stats.accuracy *= 1.35;
            notifyChangeForUnitProperty({unit: target, property: 'name', actualBattle});
            notifyChangeForUnitProperty({unit: target, property: 'icon', actualBattle});
            if (allowBonuses) {
              target.bonusLoot += Math.ceil(Math.random() * actualBattle.room * 3);
            }
            const newBuff = {
              id: 'demon_monster',
              data: {
                duration: Infinity,
                totalDuration: Infinity,
                icon: 'heartDrop.svg',
                name: 'Radiance'
              },
              constants: BUFFS['demon_monster']
            };
            addBuff({ buff: newBuff, target: target, caster: target, actualBattle });
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
            const newBuff = {
              id: 'twin_blades',
              data: {
                duration: Infinity,
                totalDuration: Infinity,
                icon: 'twinBlades.svg',
                name: 'twin blades',
                level: 1
              },
              constants: BUFFS['twin_blades']
            };
            addBuff({ buff: newBuff, target: target, caster: target, actualBattle });
            if (allowBonuses) {
              target.bonusLoot += Math.ceil(Math.random() * actualBattle.room * 1.5);
              target.extraLootTable = [{ id: `${thisMetal}_knife`, chance: 0.25 }, { type: 'gold', chance: 0.25, quantity: 1000 * curFloor }];
            }
          } else if (rand < 0.15) { // 5% chance to upgrade to mercenary
            target.name = 'mercenary';
            target.stats.health *= 1.35;
            target.stats.healthMax *= 1.35;
            target.stats.attack *= 1.3;
            target.stats.attackMax *= 1.4;
            target.stats.defense *= 1.1;
            target.stats.armor *= 1.1;
            target.stats.accuracy *= 1.3;
            notifyChangeForUnitProperty({unit: target, property: 'name', actualBattle});
            const newBuff = {
              id: 'spiked_armor',
              data: {
                duration: Infinity,
                totalDuration: Infinity,
                icon: 'spikedArmor.svg',
                name: 'spiked armor',
                level: 3,
              },
              constants: BUFFS['spiked_armor']
            };
            addBuff({ buff: newBuff, target: target, caster: target, actualBattle });
            if (allowBonuses) {
              target.bonusLoot += Math.ceil(Math.random() * actualBattle.room * 2.5);
              target.extraLootTable = [{ id: `${thisMetal}_horned_helmet`, chance: 0.25 }, { type: 'gold', chance: 0.25, quantity: 1000 * curFloor }, { id: 'jade', chance: 0.05 }, { id: 'emerald', chance: 0.05 }, { id: 'lapislazuli', chance: 0.05 }, { id: 'sapphire', chance: 0.03 }, { id: 'ruby', chance: 0.02 }, { id: 'tanzanite', chance: 0.01 }, { id: 'fireopal', chance: 0.01 }];
            }
          }
        } else if (target.name === 'beaver') {
          if (rand < 0.10) { // 10% chance to upgrade to dire beaver
            target.name = 'dire beaver';
            target.icon = 'beaverDire.svg';
            target.stats.health *= 3.25;
            target.stats.healthMax *= 3.25;
            target.stats.attack *= 1.15;
            target.stats.attackMax *= 1.65;
            target.stats.defense *= 0.8;
            target.stats.armor *= 0.5;
            target.stats.accuracy *= 1.15;
            notifyChangeForUnitProperty({unit: target, property: 'name', actualBattle});
            notifyChangeForUnitProperty({unit: target, property: 'icon', actualBattle});
            if (allowBonuses) {
              target.bonusLoot += Math.ceil(Math.random() * actualBattle.room * 3.5);
              target.extraLootTable = [{id: `${thisWood}_log`, quantity: 5 * curFloor, chance: 0.50}];
            }
          }
        } else if (target.name === 'snake') {
          if (rand < 0.20) {
            target.name = 'cobra';
            target.icon = 'snakeCobra.svg';
            target.stats.health *= 1.45;
            target.stats.healthMax *= 1.45;
            notifyChangeForUnitProperty({unit: target, property: 'name', actualBattle});
            notifyChangeForUnitProperty({unit: target, property: 'icon', actualBattle});
            if (allowBonuses) {
              target.bonusLoot += Math.ceil(Math.random() * actualBattle.room * 1.5);
              target.extraLootTable = [{ id: 'poison_shard_fragment', chance: 0.25, quantity: 1 * curFloor }];
            }
            target.buffs.forEach((buff) => {
              if (buff.id === 'poisoned_blade') {
                buff.data.level = 3;
              }
            });
          } else if (rand < 0.40) {
            target.name = 'black mamba';
            target.icon = 'snakeMamba.svg';
            target.stats.attack *= 1.15;
            target.stats.attackMax *= 1.25;
            target.stats.health *= 2.15;
            target.stats.healthMax *= 2.15;
            notifyChangeForUnitProperty({unit: target, property: 'name', actualBattle});
            notifyChangeForUnitProperty({unit: target, property: 'icon', actualBattle});
            if (allowBonuses) {
              target.bonusLoot += Math.ceil(Math.random() * actualBattle.room * 1.5);
              target.extraLootTable = [{ id: 'poison_shard_fragment', chance: 0.25, quantity: 1 * curFloor }];
            }
          } else if (rand < 0.60) {
            target.name = 'diamondback';
            target.icon = 'snakeDiamondback.svg';
            target.stats.attack *= 1.35;
            target.stats.attackMax *= 1.65;
            notifyChangeForUnitProperty({unit: target, property: 'name', actualBattle});
            notifyChangeForUnitProperty({unit: target, property: 'icon', actualBattle});
            if (allowBonuses) {
              target.bonusLoot += Math.ceil(Math.random() * actualBattle.room * 1.5);
              target.extraLootTable = [{ id: 'poison_shard_fragment', chance: 0.25, quantity: 1 * curFloor }];
            }
            target.buffs.forEach((buff) => {
              if (buff.id === 'poisoned_blade') {
                buff.data.level = 3;
              }
            });
          } else if (rand < 0.80) {
            target.name = 'coral snake';
            target.icon = 'snakeCoral.svg';
            target.stats.attack *= 1.15;
            target.stats.attackMax *= 1.35;
            target.stats.health *= 1.35;
            target.stats.healthMax *= 1.35;
            notifyChangeForUnitProperty({unit: target, property: 'name', actualBattle});
            notifyChangeForUnitProperty({unit: target, property: 'icon', actualBattle});
            if (allowBonuses) {
              target.bonusLoot += Math.ceil(Math.random() * actualBattle.room * 1.5);
              target.extraLootTable = [{ id: 'poison_shard_fragment', chance: 0.25, quantity: 1 * curFloor }];
            }
            target.buffs.forEach((buff) => {
              if (buff.id === 'poisoned_blade') {
                buff.data.level = 5;
              }
            });
          }
        } else if (target.name === 'angry miner') {
          if (rand < 0.10) { // 10% chance to upgrade to furious miner
            target.name = 'furious miner';
            target.icon = 'furiousMiner.svg';
            target.stats.health *= 0.8;
            target.stats.healthMax *= 0.8;
            target.stats.attack *= 1.35;
            target.stats.attackMax *= 1.6;
            target.stats.defense *= 0.8;
            target.stats.armor *= 0.7;
            target.stats.accuracy *= 1.15;
            notifyChangeForUnitProperty({unit: target, property: 'name', actualBattle});
            notifyChangeForUnitProperty({unit: target, property: 'icon', actualBattle});
            if (allowBonuses) {
              target.bonusLoot += Math.ceil(Math.random() * actualBattle.room * 2);
              target.extraLootTable = [{id: `ore_${thisOre}`, quantity: 5 * curFloor, chance: 0.50}];
            }
          }
        } else if (target.name.indexOf(' mage') !== -1) {
          if (rand < 0.15) {
            let newBuff;            

            const whichMage = Math.ceil(Math.random() * 3);
            const apprenticeMage = Object.assign({}, target.raw());
            apprenticeMage.id = uuid.v4();
            apprenticeMage.icon = (whichMage === 1) ? 'earthMage.svg' : (whichMage === 2) ? 'waterMage.svg' : 'fireMage.svg';
            apprenticeMage.name = 'apprentice';
            apprenticeMage.buffs = [];
            apprenticeMage.target = _.sample(actualBattle.units).id;
            apprenticeMage.stats.health /= 2;
            apprenticeMage.stats.healthMax /= 2;
            const apprenticeMageUnit = actualBattle.addUnit(apprenticeMage);
            newBuff = {
              id: (whichMage === 1) ? 'earth_mage_monster' : (whichMage === 2) ? 'water_mage_monster' : 'fire_mage_monster',
              data: {
                duration: Infinity,
                totalDuration: Infinity,
                icon: (whichMage === 1) ? '' : (whichMage === 2) ? '' : 'phoenixHat.svg',
                hideBuff: (whichMage === 1) ? true : (whichMage === 2) ? true : false,
                name: 'Apprentice',
              },
              constants: BUFFS[(whichMage === 1) ? 'earth_mage_monster' : (whichMage === 2) ? 'water_mage_monster' : 'fire_mage_monster']
            };
            addBuff({ buff: newBuff, target: apprenticeMageUnit, caster: target, actualBattle });            
            
            if ((target.name === 'water mage') || (target.name === 'blue mage')) {
              target.name = 'glacial wizard';
              target.icon = 'glacialWizard.svg';
              if (allowBonuses) {
                target.bonusLoot += Math.ceil(Math.random() * actualBattle.room * 1.5);
                target.extraLootTable = [{ id: 'water_shard_fragment', chance: 0.50, quantity: 5 * curFloor }, { id: 'complete_water_shard', chance: 0.50, quantity: 2 * curFloor }, { id: 'ancient_water_shard', chance: 0.50, quantity: 1 * curFloor }];
              }
              target.stats.health *= 1.75;
              target.stats.healthMax *= 1.75;
              target.stats.magicPower *= 1.75;
              target.stats.magicArmor *= 1.5;
              notifyChangeForUnitProperty({unit: target, property: 'name', actualBattle});
              notifyChangeForUnitProperty({unit: target, property: 'icon', actualBattle});
              newBuff = {
                id: 'frost_armor',
                data: {
                  duration: Infinity,
                  totalDuration: Infinity,
                  icon: 'frostArmor.svg',
                  name: 'frost armor',
                  level: 2,
                },
                constants: BUFFS['frost_armor']
              };
              addBuff({ buff: newBuff, target: target, caster: target, actualBattle });              
            } else if ((target.name === 'brown mage') || (target.name === 'earth mage')) {
              target.name = 'stone wizard';
              target.icon = 'stoneWizard.svg';
              if (allowBonuses) {
                target.bonusLoot += Math.ceil(Math.random() * actualBattle.room * 2.5);
                target.extraLootTable = [{ id: 'earth_shard_fragment', chance: 0.50, quantity: 5 * curFloor }, { id: 'complete_earth_shard', chance: 0.50, quantity: 2 * curFloor }, { id: 'ancient_earth_shard', chance: 0.50, quantity: 1 * curFloor }];
              }
              target.stats.health *= 1.75;
              target.stats.healthMax *= 1.75;
              target.stats.magicPower *= 1.75;
              target.stats.magicArmor *= 1.5;
              notifyChangeForUnitProperty({unit: target, property: 'name', actualBattle});
              notifyChangeForUnitProperty({unit: target, property: 'icon', actualBattle});
              newBuff = {
                id: 'spiked_armor',
                data: {
                  duration: Infinity,
                  totalDuration: Infinity,
                  icon: 'spikedArmor.svg',
                  name: 'spiked armor',
                  level: 3,
                },
                constants: BUFFS['spiked_armor']
              };
            } else if (target.name === 'fire mage') {
              target.name = 'fiery wizard';
              target.icon = 'fieryWizard.svg';
              if (allowBonuses) {
                target.bonusLoot += Math.ceil(Math.random() * actualBattle.room * 3.5);
                target.extraLootTable = [{ id: 'fire_shard_fragment', chance: 0.50, quantity: 5 * curFloor }, { id: 'complete_fire_shard', chance: 0.50, quantity: 2 * curFloor }, { id: 'ancient_fire_shard', chance: 0.50, quantity: 1 * curFloor }];
              }
              target.stats.health *= 1.75;
              target.stats.healthMax *= 1.75;
              target.stats.magicPower *= 1.25;
              target.stats.magicArmor *= 1.5;
              notifyChangeForUnitProperty({unit: target, property: 'name', actualBattle});
              notifyChangeForUnitProperty({unit: target, property: 'icon', actualBattle});
              // note: his fire_mage_monster buff also changes, so he doesn't get as much additional MP
            }
            newBuff = {
              id: 'sixth_sense',
              data: {
                duration: Infinity,
                totalDuration: Infinity,
                icon: 'sixthSense.svg',
                name: 'watchful aura',
                level: 1,
              },
              constants: BUFFS['sixth_sense']
            };
            addBuff({ buff: newBuff, target: target, caster: target, actualBattle });
            target.extraLootTable = [{id: `${thisMetalCapped20}_wand`, chance: 0.25}];
          }
        } else if (target.name === 'spider') {
          if (rand < 0.05) { // 5% chance to upgrade to terrorantula
            target.name = 'terrorantula';
            target.icon = 'terrorantula.svg';
            target.stats.health *= 3.75;
            target.stats.healthMax *= 3.75;
            target.stats.attack *= 1.35;
            target.stats.attackMax *= 1.55;
            target.stats.defense *= 0.8;
            target.stats.armor *= 0.7;
            target.stats.accuracy *= 1.15;
            notifyChangeForUnitProperty({unit: target, property: 'name', actualBattle});
            notifyChangeForUnitProperty({unit: target, property: 'icon', actualBattle});
            if (allowBonuses) {
              target.bonusLoot += Math.ceil(Math.random() * actualBattle.room * 3.5);
              target.extraLootTable = [{ id: 'poison_shard_fragment', chance: 0.50, quantity: 5 * curFloor }, { id: 'poison_shard_fragment', chance: 0.50, quantity: 15 * curFloor }];
            }
            target.buffs.forEach((buff) => {
              if (buff.id === 'poisoned_blade') {
                buff.data.level = 10;
              }
            });
          } else if (rand < 0.15) { // 10% chance to upgrade to black widow
            target.name = 'black widow';
            target.icon = 'blackwidow.svg';
            target.stats.health *= 1.4;
            target.stats.healthMax *= 1.4;
            target.stats.accuracy *= 1.50;
            notifyChangeForUnitProperty({unit: target, property: 'name', actualBattle});
            notifyChangeForUnitProperty({unit: target, property: 'icon', actualBattle});
            if (allowBonuses) {
              target.bonusLoot += Math.ceil(Math.random() * actualBattle.room * 2);
              target.extraLootTable = [{ id: 'poison_shard_fragment', chance: 0.50, quantity: 2 * curFloor }, { id: 'poison_shard_fragment', chance: 0.50, quantity: 5 * curFloor }];
            }
            target.buffs.forEach((buff) => {
              if (buff.id === 'poisoned_blade') {
                buff.data.level = 5;
              }
            });
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
    icon: 'phoenixHat.svg',
    name: 'fire mage',
    description({ buff, level }) {
    },
    constants: {
    },
    data: {
      icon: 'phoenixHat.svg'
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
        // Blank
      },

      onTookDamage({ buff, defender, attacker, actualBattle }) {
        let randChance = 0.05;
        if (defender.name === 'fiery wizard') {
          randChance = 0.125;
        }
        if (Math.random() <= randChance && !_.findWhere(attacker.buffs, { id: 'ignite' })) {
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
            name: 'Healing Reduced',
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

  generic_bleed: {
    duplicateTag: 'generic_bleed', // Used to stop duplicate buffs
    icon: '',
    name: 'bleed',
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
        const bleedChance = buff.data.bleedChance || 0.2;

        if (Math.random() <= bleedChance) {
          const newBuff = {
            id: 'bleed_proper',
            data: {
              duration: buff.data.bleedTime || 15,
              totalDuration: buff.data.bleedTime || 15,
              dps: attacker.stats.attackMax / 15,
              caster: attacker.id,
              timeTillDamage: 1,
              allowDuplicates: true,
              icon: buff.data.bleedIcon || 'bleeding.svg',
              name: buff.data.bleedName || 'bleed',
              description: `${buff.data.bleedDesc || 'bleed'} every second for ${(attacker.stats.attackMax / 15).toFixed(2)} damage`
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
              name: 'Armor Shredded',
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
      totalDuration: Infinity,
      hideBuff: true
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
            const newCube = Object.assign({}, defender.raw());
            newCube.id = uuid.v4();
            newCube.icon = `gelatinous_cube${(3 - buff.stacks).toFixed(0)}.svg`;
            newCube.buffs = [];
            newCube.stats.health = defender.stats.healthMax / (buff.data.splitAmount + 1);
            newCube.stats.healthMax = defender.stats.healthMax / (buff.data.splitAmount + 1);
            newCube.target = _.sample(actualBattle.units).id;
            const newCubeUnit = actualBattle.addUnit(newCube);
            const newBuff = {
              id: 'gelatinous_cube_monster',
              icon: 'cubeSplit.svg',
              name: 'gelatinous cube',
              stacks: buff.stacks,
              data: {
                duration: Infinity,
                totalDuration: Infinity,
                hideBuff: true,
                icon: 'cubeSplit.svg',
                splitHealthPercentage: buff.data.splitHealthPercentage,
                splitAmount: buff.data.splitAmount,
                hasSplit: false
              },
              constants: BUFFS['gelatinous_cube_monster']
            };
            addBuff({ buff: newBuff, target: newCubeUnit, caster: newCubeUnit, actualBattle });
          }
          // new: make cube splits 'confuse' players, making them target randomly
          actualBattle.units.forEach((unit) => {
            unit.target = _.sample(actualBattle.enemies).id;
          });
          buff.data.hasSplit = true;
        }
      },

      onBeforeDeath({ buff, target, actualBattle }) {
        // spawn cubes if mob is killed without spawning previously
        if (!buff.data.hasSplit && buff.stacks > 0) {
          buff.stacks -= 1;
          for (let i = 0; i < buff.data.splitAmount; i++) {
            const newCube = Object.assign({}, target.raw());
            newCube.id = uuid.v4();
            newCube.icon = `gelatinous_cube${(3 - buff.stacks).toFixed(0)}.svg`;
            newCube.buffs = [];
            newCube.stats.health = target.stats.healthMax / (buff.data.splitAmount + 1);
            newCube.stats.healthMax = target.stats.healthMax / (buff.data.splitAmount + 1);
            newCube.target = _.sample(actualBattle.units).id;
            const newCubeUnit = actualBattle.addUnit(newCube);
            const newBuff = {
              id: 'gelatinous_cube_monster',
              icon: 'cubeSplit.svg',
              name: 'gelatinous cube',
              stacks: buff.stacks,
              data: {
                duration: Infinity,
                totalDuration: Infinity,
                hideBuff: true,
                icon: 'cubeSplit.svg',
                splitHealthPercentage: buff.data.splitHealthPercentage,
                splitAmount: buff.data.splitAmount,
                hasSplit: false
              },
              constants: BUFFS['gelatinous_cube_monster']
            };
            addBuff({ buff: newBuff, target: newCubeUnit, caster: newCubeUnit, actualBattle });
          }
          // new: make cube splits 'confuse' players, making them target randomly
          actualBattle.units.forEach((unit) => {
            unit.target = _.sample(actualBattle.enemies).id;
          });
          buff.data.hasSplit = true;
        }
      },

      onRemove({ buff, target, caster }) {
        // Blank
      }
    }
  },
  
  abstract_monster: {
    duplicateTag: 'abstract_monster', // Used to stop duplicate buffs
    icon: '',
    name: 'abstract monster',
    description({ buff, level }) {
    },
    constants: {
    },
    data: {
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
      },

      onTookDamage({ buff, defender, attacker, actualBattle }) {
        const constants = (buff.constants && buff.constants.constants) ? buff.constants.constants : BUFFS[buff.id].constants;

        // Does this unit have bleed? remove bleed + heal
        const bleedCount = defender.buffs.filter((buff) => {
          return buff.id === 'bleed' || buff.id === 'bleed_proper';
        }).length;

        if (bleedCount >= 1) {
          const totalHeal =  ((defender.stats.defense * bleedCount) / 2);
          actualBattle.healTarget(totalHeal, {
            caster: defender,
            target: defender,
            historyStats: actualBattle.historyStats,
            tickEvents: actualBattle.tickEvents
          });

          defender.buffs.forEach((buff) => {
            if (buff.duration > 1) {
              if (buff.id === 'bleed' || buff.id === 'bleed_proper') {
                buff.duration = 0.2;
                buff.data.timeTillDamage = 5;
              }
            }
          });
        }
      },

      onTick({ secondsElapsed, buff, target, caster }) {
      },

      onRemove({ buff, target, caster }) {
      }
    }
  },

  imp_monster: {
    duplicateTag: 'imp_monster',
    icon: '',
    name: 'imp monster',
    description({ buff, level }) {
    },
    constants: {
    },
    data: {
    },
    events: {
      onApply({ buff, target, caster }) {
      },

      onDidDamage({ buff, defender, attacker, actualBattle, damageDealt }) {
        if (Math.round(damageDealt) <= 0.0) {
          return false;
        }
        
        // when we deal damage, choose a target
        const randomTarget = (Math.random() < 0.50); // if 'true', then we choose a random target instead of defender
        const impVictim = (randomTarget) ? _.sample(actualBattle.units) : defender;
        
        // when we deal damage, cause a random affliction:
        const randomAffliction = Math.random();
        let newBuff;
        
        if (randomAffliction <= 0.10) {
          // stun target
          newBuff = {
            id: 'stunned',
            data: {
              duration: 5,
              totalDuration: 5,
              icon: 'stunned.svg',
              name: 'Stunned',
              description: `You are stunned and can't take any actions or fight.`
            }
          };
        } else if (randomAffliction <= 0.20) {
          // force target to re-target
          
          const new_target = _.sample(actualBattle.enemies);
          if (new_target) {
            impVictim.target = new_target.id;
          }
        } else if (randomAffliction <= 0.30) {
          // bleed target
          newBuff = {
            id: 'bleed_proper',
            data: {
              name: 'bleed',
              description: `You are bleeding from infected imp bites.`,
              icon: 'bleeding.svg',
              allowDuplicates: true,
              duration: 8,
              totalDuration: 8,
              dps: attacker.stats.attackMax / 15,
              timeTillDamage: 1,
              caster: attacker.id,
            },
            constants: BUFFS['bleed']
          };          
        } else if (randomAffliction <= 0.40) {
          // break target armor
            newBuff = {
              id: 'armor_reduction',
              data: {
                name: 'Armor Shredded',
                duration: 5,
                allowDuplicates: true,
                duplicateCap: 2,
                totalDuration: 5,
                armorReduction: 0.66,
                icon: 'armorReduction.svg',
                description: `Reduces your armor by ${Math.round((1 - 0.66) * 100)}%`
              }
            };
          } else {
          // no affliction this round
          return;
        }
        
        if (newBuff) {
          addBuff({ buff: newBuff, target: impVictim, caster: attacker, actualBattle });
        }
      },

      onTick({ secondsElapsed, buff, target, caster }) {
      },

      onRemove({ buff, target, caster }) {
      }
    }
  },
};
