import { MONSTER_LIST, TABLE_LIST } from '../levels/index.js'; 

export const veryHardTowerMonsterGenerator = function(floor) {
    const possibleMonsters = [];
    possibleMonsters.push(...MONSTER_LIST[1]);
    let rewardLevel = 1;

    if (floor >= 1) {
      rewardLevel = 3;
      possibleMonsters.push(...MONSTER_LIST[3])
    }
    if (floor >= 2) {
      rewardLevel = 5;
      possibleMonsters.push(...MONSTER_LIST[5])
    }
    if (floor >= 3) {
      rewardLevel = 6;
      possibleMonsters.push(...MONSTER_LIST[6])
    }
    if (floor >= 4) {
      rewardLevel = 7;
      possibleMonsters.push(...MONSTER_LIST[7])
    }
    if (floor >= 5) {
      rewardLevel = 8;
      possibleMonsters.push(...MONSTER_LIST[8])
    }
    if (floor >= 6) {
      rewardLevel = 9;
      possibleMonsters.push(...MONSTER_LIST[9])
    }
    if (floor >= 7) {
      rewardLevel = 10;
      possibleMonsters.push(...MONSTER_LIST[10])
    }
    if (floor >= 8) {
      rewardLevel = 11;
      possibleMonsters.push(...MONSTER_LIST[11])
    }
    if (floor >= 9) {
      rewardLevel = 12;
      possibleMonsters.push(...MONSTER_LIST[12])
    }

    const selectedMonster = _.sample(possibleMonsters);

    const monster = {
      id: selectedMonster.id,
      icon: selectedMonster.icon,
      name: selectedMonster.name,
      stats: {
        health: floor * 100 * 3.4,
        healthMax: floor * 100 * 3.4,
        attack: 5 + floor * 7 * 1.7,
        attackMax: (5 + (floor * 7)) * 1.5 * 1.7,
        attackSpeed: 0.5,
        accuracy: 10 + (floor * 15) * 1.7,
        armor: 10 + (floor * 20) * 1.7,
        defense: 10 + (floor * 15) * 1.5,
        magicArmor: 1 + (floor * 10) * 1.7,
        damageTaken: 1
      },
      rewards: TABLE_LIST[rewardLevel]
    }

    if (selectedMonster.heavilyArmored) {
      monster.stats.armor *= 1.5;
      monster.stats.magicArmor *= 0.5;
    } else if (selectedMonster.magicArmored) {
      monster.stats.armor *= 0.6;
      monster.stats.magicArmor *= 2.0;
    }

    return monster;
  }
