import { orderLootTable } from '../../../enemies/lootTables/index.js';
import { ITEMS } from '../../../../../imports/constants/items/index';

import { LEVEL_TWENTY_SIX_LOOT_TABLE } from '../../levels/level26';

export const TOWER_FLOOR_26 = {
  1: {
    name: 'Do not try.',
    enemies: ['unicorn','angel','demon','spartan'],
    rewards: []
  },
  2: {
    name: 'Do not try.',
    enemies: ['unicorn','angel','demon','spartan'],
    rewards: orderLootTable(LEVEL_TWENTY_SIX_LOOT_TABLE.concat([{
      chance: 1 / 48,
      rewards: [
        { type: 'item', itemId: 'eternium_dagger_scroll', amount: 1 },
        { type: 'item', itemId: 'eternium_furnace_scroll', amount: 1 }
      ]
    }]))
  },
  3: {
    name: 'Do not try.',
    enemies: ['unicorn','angel','demon','spartan'],
    rewards: orderLootTable(LEVEL_TWENTY_SIX_LOOT_TABLE.concat([{
      chance: 1 / 48,
      rewards: [
        { type: 'item', itemId: 'eternium_shield_scroll', amount: 1 },
        { type: 'item', itemId: 'eternium_short_sword_scroll', amount: 1 }
      ]
    }]))
  },
  4: {
    name: 'Do not try.',
    enemies: ['unicorn','angel','demon','spartan'],
    rewards: orderLootTable(LEVEL_TWENTY_SIX_LOOT_TABLE.concat([{
      chance: 1 / 48,
      rewards: [
        { type: 'item', itemId: 'eternium_helmet_scroll', amount: 1 },
        { type: 'item', itemId: 'eternium_chest_plate_scroll', amount: 1 }
      ]
    }]))
  },
  5: {
    name: 'Do not try.',
    enemies: ['unicorn','angel','demon','spartan'],
    rewards: orderLootTable(LEVEL_TWENTY_SIX_LOOT_TABLE.concat([{
      chance: 1 / 128,
      rewards: [
        { type: 'item', itemId: 'eternium_kite_shield', amount: 1 }
      ]
    },{
      chance: 1 / 48,
      rewards: [
        { type: 'item', itemId: 'eternium_axe_scroll', amount: 1 },
        { type: 'item', itemId: 'eternium_pickaxe_scroll', amount: 1 },
        { type: 'item', itemId: 'eternium_mining_anvil_scroll', amount: 1 }
      ]
    }]))
  },
  6: {
    name: 'Do not try.',
    enemies: ['unicorn','angel','demon','spartan'],
    rewards: orderLootTable(LEVEL_TWENTY_SIX_LOOT_TABLE.concat([{
      chance: 1 / 48,
      rewards: [
        { type: 'item', itemId: 'eternium_spear_scroll', amount: 1 },
        { type: 'item', itemId: 'eternium_plate_legs_scroll', amount: 1 }
      ]
    }]))
  },
  7: {
    name: 'Do not try.',
    enemies: ['unicorn','angel','demon','spartan'],
    rewards: orderLootTable(LEVEL_TWENTY_SIX_LOOT_TABLE.concat([{
      chance: 1 / 48,
      rewards: [
        { type: 'item', itemId: 'eternium_long_sword_scroll', amount: 1 },
        { type: 'item', itemId: 'eternium_battle_axe_scroll', amount: 1 }
      ]
    }]))
  },

  boss: {
    enemy: { id: 'boss_hive', amount: 1 },
    rewards: []
  },

  floorRewards: [
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
      amount: 1000000
    }
  ]
};
