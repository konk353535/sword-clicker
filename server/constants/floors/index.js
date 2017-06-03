import { TOWER_FLOORS } from './tower/index';
import { personalQuestMonsterGenerator } from './generators/personalQuest.js';
import { easyTowerMonsterGenerator } from './generators/easyTower.js';
import { hardTowerMonsterGenerator } from './generators/hardTower.js';
import { veryHardTowerMonsterGenerator } from './generators/veryHardTower.js';
import { genericTowerMonsterGenerator } from './generators/genericTower.js';

export const FLOORS = Object.assign({

  getNewPointCount(floor, activeTowerUsers) {
    const floorDays = {
      1: 1, // Copper
      2: 1, // Iron
      3: 1, // Steel
      4: 2, // Carbon
      5: 2, // Mithril
      6: 3, // Adamantium
      7: 4, // Orichalcum
      8: 5, // Cobalt
      9: 6, // Fairy Steel
      10: 7 // Cursed
    }

    // Max points per player, per day
    let maxPoints = 0;
    for (let i = 0; i <= 7; i++) {
      maxPoints += Math.pow(1.7, i);
    }

    return Math.round(activeTowerUsers * maxPoints * floorDays[floor] * 1);
  },

  // Given a level, create a monster for personal quest
  personalQuestMonsterGenerator,

  // Given a floor, create a monster for tower
  easyTowerMonsterGenerator,
  hardTowerMonsterGenerator,
  veryHardTowerMonsterGenerator,
  genericTowerMonsterGenerator

}, TOWER_FLOORS);
