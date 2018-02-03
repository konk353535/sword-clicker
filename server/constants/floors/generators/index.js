import { personalQuestMonsterGenerator } from './personalQuest.js';
import { easyTowerMonsterGenerator } from './easyTower.js';
import { hardTowerMonsterGenerator } from './hardTower.js';
import { veryHardTowerMonsterGenerator } from './veryHardTower.js';
import { genericTowerMonsterGenerator } from './genericTower.js';

export const GENERATORS = Object.assign({
  personalQuestMonsterGenerator,
  easyTowerMonsterGenerator,
  hardTowerMonsterGenerator,
  veryHardTowerMonsterGenerator,
  genericTowerMonsterGenerator
});