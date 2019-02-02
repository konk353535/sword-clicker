import { orderLootTable } from '../../../enemies/lootTables/index.js';
import { ITEMS } from '../../../../../imports/constants/items/index';

import { LEVEL_TWENTY_FIVE_LOOT_TABLE } from '../../levels/level25';

export const TOWER_FLOOR_25 = {
  1: {
    name: 'Do not try.',
    enemies: ['unicorn','angel','demon','spartan'],
    rewards: []
  },
  2: {
    name: 'Do not try.',
    enemies: ['unicorn','angel','demon','spartan'],
    rewards: orderLootTable(LEVEL_TWENTY_FIVE_LOOT_TABLE.concat([{
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'relicrock_dagger_scroll', amount: 1 },
        { type: 'item', itemId: 'relicrock_furnace_scroll', amount: 1 }
      ]
    }]))
  },
  3: {
    name: 'Do not try.',
    enemies: ['unicorn','angel','demon','spartan'],
    rewards: orderLootTable(LEVEL_TWENTY_FIVE_LOOT_TABLE.concat([{
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'relicrock_shield_scroll', amount: 1 },
        { type: 'item', itemId: 'relicrock_short_sword_scroll', amount: 1 }
      ]
    }, {
      chance: 1 / 160,
      rewards: [
        { type: 'item', itemId: 'relicrock_knife', amount: 1 }
      ]
    }]))
  },
  4: {
    name: 'Do not try.',
    enemies: ['unicorn','angel','demon','spartan'],
    rewards: orderLootTable(LEVEL_TWENTY_FIVE_LOOT_TABLE.concat([{
      chance: 1 / 160,
      rewards: [
        { type: 'item', itemId: 'relicrock_rapiers', amount: 1 }
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'relicrock_helmet_scroll', amount: 1 },
        { type: 'item', itemId: 'relicrock_chest_plate_scroll', amount: 1 }
      ]
    }]))
  },
  5: {
    name: 'Do not try.',
    enemies: ['unicorn','angel','demon','spartan'],
    rewards: orderLootTable(LEVEL_TWENTY_FIVE_LOOT_TABLE.concat([{
      chance: 1 / 128,
      rewards: [
        { type: 'item', itemId: 'relicrock_kite_shield', amount: 1 }
      ]
    },{
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'relicrock_axe_scroll', amount: 1 },
        { type: 'item', itemId: 'relicrock_pickaxe_scroll', amount: 1 },
        { type: 'item', itemId: 'relicrock_mining_anvil_scroll', amount: 1 }
      ]
    }, {
      chance: 1 / 128,
      rewards: [
        { type: 'item', itemId: 'exalted_trident', amount: 1 }
      ]
    }]))
  },
  6: {
    name: 'Do not try.',
    enemies: ['unicorn','angel','demon','spartan'],
    rewards: orderLootTable(LEVEL_TWENTY_FIVE_LOOT_TABLE.concat([{
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'relicrock_spear_scroll', amount: 1 },
        { type: 'item', itemId: 'relicrock_plate_legs_scroll', amount: 1 }
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'relicrock_dwarven_idol', amount: 1 }
      ]
    }, {
      chance: 1 / 128,
      rewards: [
        { type: 'item', itemId: 'farplane_orb', amount: 1 },
        /* { type: 'item', itemId: 'xxxxx_tome', amount: 1 } */
      ]
    }]))
  },
  7: {
    name: 'Do not try.',
    enemies: ['unicorn','angel','demon','spartan'],
    rewards: orderLootTable(LEVEL_TWENTY_FIVE_LOOT_TABLE.concat([{
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'relicrock_long_sword_scroll', amount: 1 },
        { type: 'item', itemId: 'relicrock_battle_axe_scroll', amount: 1 }
      ]
    }, {
      chance: 1 / 64,
      rewards: [
        /* { type: 'item', itemId: 'relicrock_scimitar', amount: 1 }, */
        /* { type: 'item', itemId: 'relicrock_broad_sword', amount: 1 }, */
        { type: 'item', itemId: 'relicrock_horned_helmet', amount: 1 }
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
