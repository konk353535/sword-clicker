import { orderLootTable } from '../../../enemies/lootTables/index.js';
import { LEVEL_TWENTY_SEVEN_LOOT_TABLE } from '../../levels/level27';
import { ITEMS } from '../../../../../imports/constants/items/index';

export const TOWER_FLOOR_27 = {
  unlocks: false,
  1: {
    name: 'Floor Inaccessible',
    enemies: ['grotesque_giant','ripper','devourer','wither','seething_hatred','boss_ruiner'],
    rewards: []
  },
  2: {
    name: 'Floor Inaccessible',
    enemies: ['grotesque_giant','ripper','devourer','wither','seething_hatred','boss_ruiner'],
    rewards: []
  },
  3: {
    name: 'Floor Inaccessible',
    enemies: ['grotesque_giant','ripper','devourer','wither','seething_hatred','boss_ruiner'],
    rewards: []
  },
  4: {
    name: 'Floor Inaccessible',
    enemies: ['grotesque_giant','ripper','devourer','wither','seething_hatred','boss_ruiner'],
    rewards: []
  },
  5: {
    name: 'Floor Inaccessible',
    enemies: ['grotesque_giant','ripper','devourer','wither','seething_hatred','boss_ruiner'],
    rewards: []
  },
  6: {
    name: 'Floor Inaccessible',
    enemies: ['grotesque_giant','ripper','devourer','wither','seething_hatred','boss_ruiner'],
    rewards: []
  },
  7: {
    name: 'Floor Inaccessible',
    enemies: ['grotesque_giant','ripper','devourer','wither','seething_hatred','boss_ruiner'],
    rewards: []
  },

  boss: {
    enemy: { id: 'boss_ruiner', amount: 10 },
    rewards: []
  },

  floorRewards: [
    {
      type: 'gold',
      amount: 0
    }
  ]
};
