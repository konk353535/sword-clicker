import { TOWER_FLOORS } from './tower/index';
import { PERSONAL_QUEST_LEVELS } from './personalQuest/index';
import { MONSTER_LIST, TABLE_LIST } from './levels/index.js'; 

export const FLOORS = Object.assign({

  getWaveCounts() {
    const activePlayers = 1;

    // Total # waves = weekly activePlayers rounded to closest 100
    const totalWaves = Math.ceil(activePlayers / 100) * 1000;

    return {
      easy: totalWaves * 0.65,
      hard: totalWaves * 0.25,
      veryHard: totalWaves * 0.1
    }
  },

  // Given a level, create a monster for personal quest
  personalQuestMonsterGenerator(level) {
    const possibleMonsters = MONSTER_LIST[1];
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

    const selectedMonster = _.sample(possibleMonsters);

    return {
      id: selectedMonster.id,
      icon: selectedMonster.icon,
      name: selectedMonster.name,
      stats: {
        health: 10 + (level * 7),
        healthMax: 10 + (level * 7),
        attack: 1 + Math.floor(level / 3),
        attackMax: (1 + Math.floor(level / 3)) * 1.5,
        attackSpeed: 0.5,
        accuracy: 1 + level,
        armor: 1 + (level * 2.5),
        defense: 1 + level,
        damageTaken: 1
      },
      rewards: TABLE_LIST[rewardLevel]
    }
  }

}, TOWER_FLOORS);
