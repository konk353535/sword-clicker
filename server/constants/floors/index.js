import { TOWER_FLOORS } from './tower/index';
import { personalQuestMonsterGenerator } from './generators/personalQuest.js';
import { easyTowerMonsterGenerator } from './generators/easyTower.js';
import { hardTowerMonsterGenerator } from './generators/hardTower.js';
import { veryHardTowerMonsterGenerator } from './generators/veryHardTower.js';

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
  personalQuestMonsterGenerator,

  // Given a floor, create a monster for tower
  easyTowerMonsterGenerator,
  hardTowerMonsterGenerator,
  veryHardTowerMonsterGenerator

}, TOWER_FLOORS);
