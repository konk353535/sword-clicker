console.log('importing floors/index.js personalQuestMonsterGenerator');
import { personalQuestMonsterGenerator } from './personalQuest.js';
console.log('importing floors/index.js easyTowerMonsterGenerator');
import { easyTowerMonsterGenerator } from './easyTower.js';
console.log('importing floors/index.js hardTowerMonsterGenerator');
import { hardTowerMonsterGenerator } from './hardTower.js';
console.log('importing floors/index.js veryHardTowerMonsterGenerator');
import { veryHardTowerMonsterGenerator } from './veryHardTower.js';
console.log('importing floors/index.js genericTowerMonsterGenerator');
import { genericTowerMonsterGenerator } from './genericTower.js';

export const GENERATORS = Object.assign({
  // Given a level, create a monster for personal quest
  personalQuestMonsterGenerator,

  // Given a floor, create a monster for tower
  easyTowerMonsterGenerator,
  hardTowerMonsterGenerator,
  veryHardTowerMonsterGenerator,
  genericTowerMonsterGenerator,
});
