import { TOWER_FLOORS } from './tower/index';
import { PERSONAL_QUEST_LEVELS } from './personalQuest/index';

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

  personalQuest: PERSONAL_QUEST_LEVELS

}, TOWER_FLOORS);
