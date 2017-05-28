import { orderLootTable } from '/server/constants/enemies/lootTables/index.js';
import { ITEMS } from '/server/constants/items/index';
import { LEVEL_THREE_LOOT_TABLE } from '/server/constants/floors/levels/level3';

export const TOWER_FLOOR_3 = {
  1: {
    name: 'Swinging Tree',
    enemies: ['dragonfly'],
    rewards: []
  },
  2: {
    name: 'Cliffs Edge',
    enemies: ['bird'],
    rewards: LEVEL_THREE_LOOT_TABLE
  },
  3: {
    name: 'Herb Garden',
    enemies: ['butterfly'],
    rewards: orderLootTable(LEVEL_THREE_LOOT_TABLE.concat([{
      chance: 1 / 128,
      rewards: [
        { type: 'item', itemId: 'juniper', amount: 1 },
        { type: 'item', itemId: 'agrimony_seed', amount: 1 }
      ]
    }]))
  },
  4: {
    name: 'Shallow Shore',
    enemies: ['crab'],
    rewards: LEVEL_THREE_LOOT_TABLE
  },
  5: {
    name: 'Abandoned Dojo',
    enemies: ['young_ninja'],
    rewards: orderLootTable(LEVEL_THREE_LOOT_TABLE.concat([{
      chance: 1 / 256,
      rewards: [
        { type: 'item', itemId: 'phantom_strikes_level_1_tome', amount: 1 }
      ]
    }]))
  },
  6: {
    name: 'Suspicious Mine',
    enemies: ['angry_miner'],
    rewards: orderLootTable([{
      chance: 1 / 4,
      rewards: [
        { type: 'item', itemId: 'ore_coal', amount: 1 },
        { type: 'item', itemId: 'ore_steel', amount: 1 },
        { type: 'item', itemId: 'ash_log', amount: 1 }
      ]
    }, {
      chance: 1 / 8,
      rewards: [
        { type: 'item', itemId: 'steel_bar', amount: 1 }
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'steel_dwarven_idol', amount: 1 },
        { type: 'item', itemId: 'steel_mining_hammer', amount: 1 }
      ]
    }])
  },
  7: {
    name: 'Spiders Web',
    enemies: ['spider'],
    rewards: [{
      chance: 1 / 64,
      rewards: [
        { type: 'item', itemId: 'polished_stone', amount: 30 }
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'steel_scimitar', amount: 1 },
        { type: 'item', itemId: 'steel_broad_sword', amount: 1 },
        { type: 'item', itemId: 'steel_horned_helmet', amount: 1 }
      ]
    }]
  },

  boss: {
    enemy: { id: 'boss_bone_warrior', amount: 1 },
    rewards: LEVEL_THREE_LOOT_TABLE
  },

  floorRewards: [
    {
      type: 'item',
      itemId: 'carbon_dwarven_idol',
      icon: ITEMS['carbon_dwarven_idol'].icon,
      name: ITEMS['carbon_dwarven_idol'].name,
      baseStats: ITEMS['carbon_dwarven_idol'].stats,
      extraStats: ITEMS['carbon_dwarven_idol'].extraStats
    },
    {
      type: 'gold',
      amount: 8000
    }
  ]
}
