import { MONSTER_LIST, TABLE_LIST } from '../levels/index.js'; 
import { ENEMIES } from '/server/constants/enemies/index';
import _ from 'underscore';
import { attackSpeedTicks } from '/server/utils';
import { Random } from 'meteor/random';

export const personalQuestMonsterGenerator = function(level, wave) {

  let rewardLevel = 1;
  let possibleMonsters = ['grasshopper', 'fly', 'worm'];

  if (level >= 5) {
    rewardLevel = 2;
    possibleMonsters.push(...['bird', 'rat', 'wombat']);
  }
  if (level >= 10) {
    rewardLevel = 3;
    possibleMonsters.push(...['snake', 'elephant', 'rabbit']);
  }
  if (level >= 15) {
    rewardLevel = 4;
    possibleMonsters.push(...['snail', 'echidna', 'lizard']);
  }
  if (level >= 20) {
    possibleMonsters.push(...['demon', 'bee', 'spider']);
    rewardLevel = 5;
  }
  if (level >= 35) {
    possibleMonsters.push(...['wasp', 'jellyFish', 'blue_mage', 'crab', 'goblin', 'young_ninja']);
    rewardLevel = 6;
  }
  if (level >= 45) {
    possibleMonsters.push(...['angry_miner', 'dragonfly', 'brown_mage', 'ice_giant', 'dwarf', 'spartan']);
    rewardLevel = 7;
  }
  if (level >= 55) {
    possibleMonsters.push(...['beaver', 'farmer', 'mithril_spirit']);
    rewardLevel = 8;
  }
  if (level >= 70) {
    possibleMonsters.push(...['fire_mage', 'earth_mage']);
    rewardLevel = 9;
  }
  if (level >= 85) {
    possibleMonsters.push(...['vampire']);
    rewardLevel = 10;
  }
  if (level >= 95) {
    possibleMonsters.push(...['monk']);
    rewardLevel = 11;
  }
  if (level >= 105) {
    rewardLevel = 12;
  }
  if (level >= 120) {
    rewardLevel = 13;
  }
  if (level >= 130) {
    rewardLevel = 14;
  }
  if (level >= 140) {
    rewardLevel = 15;
  }
  if (level >= 150) {
    rewardLevel = 16;
  }
  if (level >= 160) {
    rewardLevel = 17;
  }
  if (level >= 170) {
    rewardLevel = 18;
  }
  if (level >= 180) {
    rewardLevel = 19;
  }
  if (level >= 190) {
    rewardLevel = 20;
  }
  if (level >= 200) {
    rewardLevel = 21;
  }

  const totalEnemies = possibleMonsters.length;
  const selectedMonsterId = possibleMonsters[((level * 5) + wave - 1) % totalEnemies];
  const selectedMonster = ENEMIES[selectedMonsterId];

  let extraStats = 0;
  if (level >= 35) {
    extraStats = level - 34;
  }

  // 'Good Enough', for now
  const monster = {
    id: selectedMonster.id,
    icon: selectedMonster.icon,
    name: selectedMonster.name,
    buffs: JSON.parse(JSON.stringify(selectedMonster.buffs || [])),
    stats: {
      health: 10 + (level * 7) + (extraStats * 26),
      healthMax: 10 + (level * 7) + (extraStats * 26),
      attack: 1 + Math.floor(level / 3) + (extraStats / 2),
      magicPower: 1 + Math.floor(level / 2.7),
      attackMax: ((1 + Math.floor(level / 3)) * 1.5) + (extraStats / 2),
      attackSpeed: 0.5,
      accuracy: 1 + level + (extraStats * 0.7),
      armor: 1 + (level * 2.25),
      defense: 1 + (level * 0.67),
      magicArmor: 1 + (level * 1.47),
      criticalChance: 0,
      criticalDamage: 2,
      damageTaken: 1
    },
    rewards: TABLE_LIST[rewardLevel]
  }

  if (selectedMonster.statBuffs) {
    selectedMonster.statBuffs.forEach((statBuff) => {
      if (statBuff.type === 'plus') {
        monster.stats[statBuff.key] += statBuff.amount
      } else if (statBuff.type === "times") {
        monster.stats[statBuff.key] *= statBuff.amount        
      }
    })
  }

  monster.stats.attackSpeedTicks = attackSpeedTicks(monster.stats.attackSpeed);

  // Is this a swarm mob?
  if (selectedMonster.swarmRange) {
    const unitCount = _.random(selectedMonster.swarmRange[0], selectedMonster.swarmRange[1]);
    // Divide monsters health
    monster.stats.health /= unitCount; // Divide health evenly
    monster.stats.health *= 1.4; // To account for aoe
    monster.stats.attack /= unitCount;
    monster.stats.attackMax /= unitCount;
    monster.stats.attack *= 1.2;
    monster.stats.attackMax *= 1.2;
    monster.stats.healthMax = monster.stats.health;
    const allMonsters = [];
    for (let i = 0;i < unitCount; i++) {
      const monsterClone = JSON.parse(JSON.stringify(monster));
      monsterClone.id = Random.id();
      allMonsters.push(monsterClone);
    }

    return allMonsters;
  }

  return [monster];
}
