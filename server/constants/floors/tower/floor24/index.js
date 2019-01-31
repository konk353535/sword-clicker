import { orderLootTable } from '../../../enemies/lootTables/index.js';
import { ITEMS } from '../../../../../imports/constants/items/index';

import { LEVEL_TWENTY_FOUR_LOOT_TABLE } from '../../levels/level24';

export const TOWER_FLOOR_24 = {
  1: {
    name: 'Singed Horrors',
    enemies: ['fire_mage', 'fire_mage', 'fire_mage', 'water_mage', 'water_mage'],
    rewards: []
  },
  2: {
    name: 'Goblin Menace',
    enemies: ['goblin','goblin','goblin','goblin','goblin','goblin','goblin'],
    rewards: orderLootTable(LEVEL_TWENTY_FOUR_LOOT_TABLE.concat([{
      chance: 1 / 24,
      rewards: [
        { type: 'item', itemId: 'titanfoil_dagger_scroll', amount: 1 },
        { type: 'item', itemId: 'titanfoil_furnace_scroll', amount: 1 }
      ]
    }]))
  },
  3: {
    name: 'To the Beyond',
    enemies: ['demon','demon','demon','demon','demon'],
    rewards: orderLootTable(LEVEL_TWENTY_FOUR_LOOT_TABLE.concat([{
      chance: 1 / 24,
      rewards: [
        { type: 'item', itemId: 'titanfoil_shield_scroll', amount: 1 },
        { type: 'item', itemId: 'titanfoil_short_sword_scroll', amount: 1 }
      ]
    }]))
  },
  4: {
    name: 'Vile Pools',
    enemies: ['gelatinous_cube','gelatinous_cube'],
    rewards: orderLootTable(LEVEL_TWENTY_FOUR_LOOT_TABLE.concat([{
      chance: 1 / 24,
      rewards: [
        { type: 'item', itemId: 'titanfoil_helmet_scroll', amount: 1 },
        { type: 'item', itemId: 'titanfoil_chest_plate_scroll', amount: 1 }
      ]
    }]))
  },
  5: {
    name: 'Spirits',
    enemies: ['cursed_spirit','elven_steel_spirit'],
    rewards: orderLootTable(LEVEL_TWENTY_FOUR_LOOT_TABLE.concat([{
      chance: 1 / 128,
      rewards: [
        { type: 'item', itemId: 'titanfoil_kite_shield', amount: 1 }
      ]
    },{
      chance: 1 / 24,
      rewards: [
        { type: 'item', itemId: 'titanfoil_axe_scroll', amount: 1 },
        { type: 'item', itemId: 'titanfoil_pickaxe_scroll', amount: 1 },
        { type: 'item', itemId: 'titanfoil_mining_anvil_scroll', amount: 1 }
      ]
    }]))
  },
  6: {
    name: 'Flesh-Eaters',
    enemies: ['worm','worm','worm'],
    rewards: orderLootTable(LEVEL_TWENTY_FOUR_LOOT_TABLE.concat([{
      chance: 1 / 24,
      rewards: [
        { type: 'item', itemId: 'titanfoil_spear_scroll', amount: 1 },
        { type: 'item', itemId: 'titanfoil_plate_legs_scroll', amount: 1 }
      ]
    }]))
  },
  7: {
    name: 'Three Wise Men',
    enemies: ['monk','monk','monk'],
    rewards: orderLootTable(LEVEL_TWENTY_FOUR_LOOT_TABLE.concat([{
      chance: 1 / 24,
      rewards: [
        { type: 'item', itemId: 'titanfoil_long_sword_scroll', amount: 1 },
        { type: 'item', itemId: 'titanfoil_battle_axe_scroll', amount: 1 }
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
