import { orderLootTable } from '/server/constants/enemies/lootTables/index.js';
import { ITEMS } from '/server/constants/items/index';
import { LEVEL_ONE_LOOT_TABLE } from '/server/constants/floors/levels/level1';

export const TOWER_FLOOR_1 = {
  1: {
    name: 'Grass Field',
    enemies: ['grasshopper'],
    rewards: [{
      chance: 1 / 4,
      rewards: [
        { type: 'item', itemId: 'lettice', amount: 1 }
      ]
    }]
  },
  2: {
    name: 'Cow Poo',
    enemies: ['fly'],
    rewards: LEVEL_ONE_LOOT_TABLE
  },
  3: {
    name: 'Under Garden',
    enemies: ['worm'],
    rewards: LEVEL_ONE_LOOT_TABLE
  },
  4: {
    name: 'Flower Field',
    enemies: ['butterfly'],
    rewards: orderLootTable(LEVEL_ONE_LOOT_TABLE.concat([{
      chance: 1 / 4,
      rewards: [
        { type: 'item', itemId: 'rubia_flower_seed', amount: 1 }
      ]
    }]))
  },
  5: {
    name: 'Abandoned Mine',
    enemies: ['angry_miner'],
    rewards: orderLootTable(LEVEL_ONE_LOOT_TABLE.concat[{
      chance: 1 / 4,
      rewards: [
        { type: 'item', itemId: 'ore_stone', amount: 5 },
        { type: 'item', itemId: 'ore_copper', amount: 3 },
        { type: 'item', itemId: 'pine_log', amount: 3 }
      ]
    }, {
      chance: 1 / 8,
      rewards: [
        { type: 'item', itemId: 'copper_bar', amount: 2 }
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'copper_dwarven_idol', amount: 1 },
        { type: 'item', itemId: 'copper_mining_hammer', amount: 1 }
      ]
    }])
  },
  6: {
    name: 'Bee Hive',
    enemies: ['bee'],
    rewards: LEVEL_ONE_LOOT_TABLE
  },
  7: {
    name: 'String Fortress',
    enemies: ['wasp'],
    rewards: orderLootTable(LEVEL_ONE_LOOT_TABLE.concat[{
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'copper_scimitar', amount: 1 },
        { type: 'item', itemId: 'copper_broad_sword', amount: 1 },
        { type: 'item', itemId: 'copper_horned_helmet', amount: 1 }
      ]
    }])
  },

  boss: {
    enemy: { id: 'boss_cougar', amount: 1 },
    rewards: LEVEL_ONE_LOOT_TABLE
  },

  floorRewards: [
    {
      type: 'item',
      itemId: 'tin_dwarven_idol',
      icon: ITEMS['tin_dwarven_idol'].icon,
      name: ITEMS['tin_dwarven_idol'].name,
      baseStats: ITEMS['tin_dwarven_idol'].stats,
      extraStats: ITEMS['tin_dwarven_idol'].extraStats
    },
    {
      type: 'gold',
      amount: 1000
    }
  ]
}
