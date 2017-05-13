import { MONSTER_LIST, TABLE_LIST } from '../levels/index.js'; 

export const personalQuestMonsterGenerator = function(level) {
    const possibleMonsters = [];
    possibleMonsters.push(...MONSTER_LIST[1]);
    let rewardLevel = 1;

    if (level >= 5) {
      rewardLevel = 2;
      possibleMonsters.push(...MONSTER_LIST[2])
    }
    if (level >= 10) {
      rewardLevel = 3;
      possibleMonsters.push(...MONSTER_LIST[3])
    }
    if (level >= 15) {
      rewardLevel = 4;
      possibleMonsters.push(...MONSTER_LIST[4])
    }
    if (level >= 20) {
      rewardLevel = 5;
      possibleMonsters.push(...MONSTER_LIST[5])
    }
    if (level >= 35) {
      rewardLevel = 6;
      possibleMonsters.push(...MONSTER_LIST[6])
    }
    if (level >= 50) {
      rewardLevel = 7;
      possibleMonsters.push(...MONSTER_LIST[7])
    }
    if (level >= 65) {
      rewardLevel = 8;
      possibleMonsters.push(...MONSTER_LIST[8])
    }
    if (level >= 75) {
      rewardLevel = 9;
      possibleMonsters.push(...MONSTER_LIST[9])
    }
    if (level >= 90) {
      rewardLevel = 10;
      possibleMonsters.push(...MONSTER_LIST[10])
    }
    if (level >= 110) {
      rewardLevel = 11;
      possibleMonsters.push(...MONSTER_LIST[11])
    }
    if (level >= 130) {
      rewardLevel = 12;
      possibleMonsters.push(...MONSTER_LIST[12])
    }

    const selectedMonster = _.sample(possibleMonsters);

    let extraStats = 0;
    if (level >= 35) {
      extraStats = level - 34;
    }

    return {
      id: selectedMonster.id,
      icon: selectedMonster.icon,
      name: selectedMonster.name,
      stats: {
        health: 10 + (level * 7) + (extraStats * 20),
        healthMax: 10 + (level * 7) + (extraStats * 20),
        attack: 1 + Math.floor(level / 3) + (extraStats / 2),
        attackMax: ((1 + Math.floor(level / 3)) * 1.5) + (extraStats / 2),
        attackSpeed: 0.5,
        accuracy: 1 + level + extraStats,
        armor: 1 + (level * 2.5) + extraStats,
        defense: 1 + level,
        damageTaken: 1
      },
      rewards: TABLE_LIST[rewardLevel]
    }
  }
