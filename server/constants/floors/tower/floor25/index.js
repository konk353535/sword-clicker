import { orderLootTable } from '../../../enemies/lootTables/index.js';
import { ITEMS } from '../../../items/index';

import { LEVEL_TWENTY_FIVE_LOOT_TABLE } from '../../levels/level25';

export const TOWER_FLOOR_25 = {
  unlocks: false,
  1: {
    name: 'Do not try.',
    enemies: ['unicorn','angel','demon','spartan'],
    rewards: []
  },
  2: {
    name: 'Do not try.',
    enemies: ['unicorn','angel','demon','spartan'],
    rewards: []
  },
  3: {
    name: 'Do not try.',
    enemies: ['unicorn','angel','demon','spartan'],
    rewards: []
  },
  4: {
    name: 'Do not try.',
    enemies: ['unicorn','angel','demon','spartan'],
    rewards: []
  },
  5: {
    name: 'Do not try.',
    enemies: ['unicorn','angel','demon','spartan'],
    rewards: []
  },
  6: {
    name: 'Do not try.',
    enemies: ['unicorn','angel','demon','spartan'],
    rewards: []
  },
  7: {
    name: 'Do not try.',
    enemies: ['unicorn','angel','demon','spartan'],
    rewards: []
  },

  boss: {
    enemy: { id: 'boss_fox', amount: 10 },
    rewards: []
  },

  floorRewards: [
    {
      type: 'item',
      itemId: 'cursed_dwarven_idol',
      icon: ITEMS['cursed_dwarven_idol'].icon,
      name: ITEMS['cursed_dwarven_idol'].name,
      baseStats: ITEMS['cursed_dwarven_idol'].stats,
      extraStats: ITEMS['cursed_dwarven_idol'].extraStats
    },
    {
      type: 'item',
      itemId: 'enhancer_key',
      icon: ITEMS['enhancer_key'].icon,
      name: ITEMS['enhancer_key'].name,
      baseStats: ITEMS['enhancer_key'].stats,
      extraStats: ITEMS['enhancer_key'].extraStats
    },
    {
      type: 'gold',
      amount: 150000
    }
  ]
}
