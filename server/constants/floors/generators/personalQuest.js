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
    possibleMonsters.push(...['crab', 'bee', 'spider']);
    rewardLevel = 5;
  }
  if (level >= 35) {
    possibleMonsters.push(...['wasp', 'jellyFish', 'blue_mage', 'demon', 'goblin', 'young_ninja']);
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
    rewardLevel = 10;
  }
  if (level >= 100) {
    rewardLevel = 11;
  }
  if (level >= 115) {
    rewardLevel = 12;
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
    buffs: selectedMonster.buffs,
    stats: {
      health: 10 + (level * 7) + (extraStats * 20),
      healthMax: 10 + (level * 7) + (extraStats * 20),
      attack: 1 + Math.floor(level / 3) + (extraStats / 2),
      magicPower: 1 + Math.floor(level / 2.7),
      attackMax: ((1 + Math.floor(level / 3)) * 1.5) + (extraStats / 2),
      attackSpeed: 0.5,
      accuracy: 1 + level + extraStats,
      armor: 1 + (level * 2.5),
      defense: 1 + (level * 0.8),
      magicArmor: 1 + (level * 1.2),
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
    monster.stats.health *= 1.3; // To account for aoe
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
