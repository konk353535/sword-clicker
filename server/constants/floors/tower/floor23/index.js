import { orderLootTable } from '../../../enemies/lootTables/index.js';
import { ITEMS } from '../../../../../imports/constants/items/index';

import { LEVEL_TWENTY_THREE_LOOT_TABLE } from '../../levels/level23';

export const TOWER_FLOOR_23 = {
  unlocks: false,
  1: {
    name: 'Estuary',
    enemies: ['fish'],
    rewards: []
  },
  2: {
    name: 'Sidewalk Path',
    enemies: ['snail', 'wombat'],
    rewards: orderLootTable(LEVEL_TWENTY_THREE_LOOT_TABLE.concat([{
      chance: 1 / 16,
      rewards: [
        { type: 'item', itemId: 'astral_dagger_scroll', amount: 1 },
        { type: 'item', itemId: 'astral_furnace_scroll', amount: 1 }
      ]
    }]))
  },
  3: {
    name: 'Ritual Circle',
    enemies: ['elephant', 'demon', 'demon'],
    rewards: orderLootTable(LEVEL_TWENTY_THREE_LOOT_TABLE.concat([{
      chance: 1 / 16,
      rewards: [
        { type: 'item', itemId: 'astral_shield_scroll', amount: 1 },
        { type: 'item', itemId: 'astral_short_sword_scroll', amount: 1 }
      ]
    }]))
  },
  4: {
    name: 'Jungle Treetops',
    enemies: ['gorilla'],
    rewards: orderLootTable(LEVEL_TWENTY_THREE_LOOT_TABLE.concat([{
      chance: 1 / 16,
      rewards: [
        { type: 'item', itemId: 'astral_helmet_scroll', amount: 1 },
        { type: 'item', itemId: 'astral_chest_plate_scroll', amount: 1 }
      ]
    }]))
  },
  5: {
    name: 'Mining Cave',
    enemies: ['angry_miner', 'earth_mage'],
    rewards: orderLootTable(LEVEL_TWENTY_THREE_LOOT_TABLE.concat([{
      chance: 1 / 128,
      rewards: [
        { type: 'item', itemId: 'astral_kite_shield', amount: 1 }
      ]
    },{
      chance: 1 / 16,
      rewards: [
        { type: 'item', itemId: 'astral_axe_scroll', amount: 1 },
        { type: 'item', itemId: 'astral_pickaxe_scroll', amount: 1 },
        { type: 'item', itemId: 'astral_mining_anvil_scroll', amount: 1 }
      ]
    }]))
  },
  6: {
    name: 'Infested Sewer',
    enemies: ['rat', 'rat'],
    rewards: orderLootTable(LEVEL_TWENTY_THREE_LOOT_TABLE.concat([{
      chance: 1 / 16,
      rewards: [
        { type: 'item', itemId: 'astral_spear_scroll', amount: 1 },
        { type: 'item', itemId: 'astral_plate_legs_scroll', amount: 1 }
      ]
    }]))
  },
  7: {
    name: 'Abandoned Manor',
    enemies: ['vampire'],
    rewards: orderLootTable(LEVEL_TWENTY_THREE_LOOT_TABLE.concat([{
      chance: 1 / 16,
      rewards: [
        { type: 'item', itemId: 'astral_long_sword_scroll', amount: 1 },
        { type: 'item', itemId: 'astral_battle_axe_scroll', amount: 1 }
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
      amount: 700000
    }
  ]
};
