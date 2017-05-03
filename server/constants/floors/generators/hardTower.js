import { MONSTER_LIST, TABLE_LIST } from '../levels/index.js'; 

export const hardTowerMonsterGenerator = function(floor) {
    const possibleMonsters = [];
    possibleMonsters.push(...MONSTER_LIST[1]);
    let rewardLevel = 1;

    if (floor >= 2) {
      rewardLevel = 3;
      possibleMonsters.push(...MONSTER_LIST[3])
    }
    if (floor >= 3) {
      rewardLevel = 4;
      possibleMonsters.push(...MONSTER_LIST[4])
    }
    if (floor >= 4) {
      rewardLevel = 5;
      possibleMonsters.push(...MONSTER_LIST[5])
    }
    if (floor >= 5) {
      rewardLevel = 6;
      possibleMonsters.push(...MONSTER_LIST[6])
    }

    const selectedMonster = _.sample(possibleMonsters);

    return {
      id: selectedMonster.id,
      icon: selectedMonster.icon,
      name: selectedMonster.name,
      stats: {
        health: floor * 100 * 1.7,
        healthMax: floor * 100 * 1.7,
        attack: 5 + floor * 7 * 1.7,
        attackMax: (5 + (floor * 7)) * 1.5 * 1.7,
        attackSpeed: 0.5,
        accuracy: 10 + (floor * 15) * 1.7,
        armor: 10 + (floor * 20) * 1.7,
        defense: 10 + (floor * 15) * 1.5,
        damageTaken: 1
      },
      rewards: TABLE_LIST[rewardLevel]
    }
  }
