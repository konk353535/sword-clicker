import { MONSTER_LIST, TABLE_LIST } from '../levels/index.js'; 
import { ENEMIES } from '/server/constants/enemies/index';
import _ from 'underscore';
import { attackSpeedTicks } from '/server/utils';

export const personalQuestMonsterGenerator = function(level, wave) {

  let rewardLevel = 1;

  if (level >= 5) {
    rewardLevel = 2;
  }
  if (level >= 10) {
    rewardLevel = 3;
  }
  if (level >= 15) {
    rewardLevel = 4;
  }
  if (level >= 20) {
    rewardLevel = 5;
  }
  if (level >= 35) {
    rewardLevel = 6;
  }
  if (level >= 50) {
    rewardLevel = 7;
  }
  if (level >= 65) {
    rewardLevel = 8;
  }
  if (level >= 75) {
    rewardLevel = 9;
  }
  if (level >= 90) {
    rewardLevel = 10;
  }
  if (level >= 110) {
    rewardLevel = 11;
  }
  if (level >= 130) {
    rewardLevel = 12;
  }

  const totalEnemies = Object.keys(ENEMIES).length;
  const selectedMonsterId = Object.keys(ENEMIES)[(level + wave - 1) % totalEnemies];
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
      magicPower: 1 + Math.floor(level / 3) + (extraStats / 2),
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
    monster.stats.healthMax = monster.stats.health;
    const allMonsters = [];
    for (let i = 0;i < unitCount; i++) {
      allMonsters.push(JSON.parse(JSON.stringify(monster)));
    }

    return allMonsters;
  }

  return [monster];
}
