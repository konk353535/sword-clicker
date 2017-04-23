import { MONSTER_LIST, TABLE_LIST } from '../levels/index.js'; 

export const easyTowerMonsterGenerator = function(floor) {
    const possibleMonsters = MONSTER_LIST[1];
    let rewardLevel = 1;

    if (floor >= 3) {
      rewardLevel = 2;
      possibleMonsters.push(...MONSTER_LIST[2])
    }
    if (floor >= 5) {
      rewardLevel = 3;
      possibleMonsters.push(...MONSTER_LIST[3])
    }
    if (floor >= 7) {
      rewardLevel = 4;
      possibleMonsters.push(...MONSTER_LIST[4])
    }
    if (floor >= 9) {
      rewardLevel = 5;
      possibleMonsters.push(...MONSTER_LIST[5])
    }

    const selectedMonster = _.sample(possibleMonsters);

    return {
      id: selectedMonster.id,
      icon: selectedMonster.icon,
      name: selectedMonster.name,
      stats: {
        health: floor * 100,
        healthMax: floor * 100,
        attack: 5 + floor * 7,
        attackMax: (5 + (floor * 7)) * 1.5,
        attackSpeed: 0.5,
        accuracy: 10 + (floor * 15),
        armor: 10 + (floor * 20),
        defense: 10 + (floor * 15),
        damageTaken: 1
      },
      rewards: TABLE_LIST[rewardLevel]
    }
  }
