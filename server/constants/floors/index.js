import { TOWER_FLOORS } from './tower/index';
import { PERSONAL_QUEST_LEVELS } from './personalQuest/index';

export const FLOORS = Object.assign({

  getWaveCounts() {
    const activePlayers = 1;

    // Total # waves = weekly activePlayers rounded to closest 100
    const totalWaves = Math.ceil(activePlayers / 100) * 100;

    return {
      easy: totalWaves * 0.7,
      hard: totalWaves * 0.25,
      veryHard: totalWaves * 0.05
    }
  },

  personalQuest: PERSONAL_QUEST_LEVELS

}, TOWER_FLOORS);
