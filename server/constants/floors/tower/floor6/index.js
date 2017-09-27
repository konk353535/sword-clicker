import { orderLootTable } from '/server/constants/enemies/lootTables/index.js';
import { ITEMS } from '/server/constants/items/index';
import { LEVEL_SIX_LOOT_TABLE } from '/server/constants/floors/levels/level6';

export const TOWER_FLOOR_6 = {
  1: {
    name: 'Tamarind Tree',
    enemies: ['bee'],
    rewards: [{
      chance: 1 / 64,
      rewards: [
        { type: 'item', itemId: 'tamarind_honey', amount: 1 }
      ]
    }]
  },
  2: {
    name: 'Farmers Market',
    enemies: ['farmer'],
    rewards: orderLootTable(LEVEL_SIX_LOOT_TABLE.concat([{
      chance: 1 / 128,
      rewards: [
        { type: 'item', itemId: 'gold_hammer', amount: 1 }
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'chrysanthemum_seed', amount: 3 }
      ]
    }, {
      chance: 1 / 16,
      rewards: [
        { type: 'item', itemId: 'chilli_seed', amount: 1 }
      ]
    }, {
      chance: 1 / 4,
      rewards: [
        { type: 'item', itemId: 'lettice_seed', amount: 1 },
        { type: 'item', itemId: 'lemon_seed', amount: 1 },
        { type: 'item', itemId: 'pineapple_seed', amount: 1 },
        { type: 'item', itemId: 'red_apple_seed', amount: 1 }
      ]
    }]))
  },
  3: {
    name: 'Watermelon Plantation',
    enemies: ['farmer'],
    rewards: orderLootTable(LEVEL_SIX_LOOT_TABLE.concat([{
      chance: 1 / 4,
      rewards: [
        { type: 'item', itemId: 'watermelon', amount: 1 }
      ]
    }, {
      chance: 1 / 48,
      rewards: [
        { type: 'item', itemId: 'lavender', amount: 1 }
      ]
    }, {
      chance: 1 / 128,
      rewards: [
        { type: 'item', itemId: 'chilli_seed', amount: 1 }
      ]
    }]))
  },
  4: {
    name: 'Place of gold',
    enemies: ['gold_spirit'],
    rewards: orderLootTable(LEVEL_SIX_LOOT_TABLE.concat([{
      chance: 1 / 3,
      rewards: [
        { type: 'item', itemId: 'gold_essence', amount: 1 }
      ]
    }]))
  },
  5: {
    name: 'Volcanic Chamber',
    enemies: ['demon'],
    rewards: orderLootTable(LEVEL_SIX_LOOT_TABLE.concat([{
      chance: 1 / 256,
      rewards: [
        { type: 'item', itemId: 'angels_touch_tome', amount: 1 },
        { type: 'item', itemId: 'gold_wand', amount: 1 }
      ]
    }]))
  },
  6: {
    name: 'Suspicious Mine',
    enemies: ['angry_miner'],
    rewards: orderLootTable(LEVEL_SIX_LOOT_TABLE.concat([{
      chance: 1 / 4,
      rewards: [
        { type: 'item', itemId: 'ore_gold', amount: 1 },
        { type: 'item', itemId: 'walnut_log', amount: 1 }
      ]
    }, {
      chance: 1 / 8,
      rewards: [
        { type: 'item', itemId: 'gold_bar', amount: 1 }
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'gold_dwarven_idol', amount: 1 },
        { type: 'item', itemId: 'gold_mining_hammer', amount: 1 }
      ]
    }]))
  },
  7: {
    name: 'Mysterious Mine',
    enemies: ['dwarf'],
    rewards: orderLootTable(LEVEL_SIX_LOOT_TABLE.concat([{
      chance: 1 / 256,
      rewards: [
        { type: 'item', itemId: 'dwarven_staff', amount: 1 }
      ]
    }, {
      chance: 1 / 128,
      rewards: [
        { type: 'item', itemId: 'gold_buckler', amount: 1 }
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'gold_scimitar', amount: 1 },
        { type: 'item', itemId: 'gold_broad_sword', amount: 1 },
        { type: 'item', itemId: 'gold_horned_helmet', amount: 1 }
      ]
    }]))
  },

  boss: {
    enemy: { id: 'boss_goblin', amount: 1 },
    rewards: orderLootTable(LEVEL_SIX_LOOT_TABLE.concat([{
      chance: 1 / 2,
      rewards: [
        { type: 'item', itemId: 'gold_crown_scroll', amount: 1 }
      ]
    }]))
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
      type: 'item',
      itemId: 'enhancer_key',
      icon: ITEMS['enhancer_key'].icon,
      name: ITEMS['enhancer_key'].name,
      baseStats: ITEMS['enhancer_key'].stats,
      extraStats: ITEMS['enhancer_key'].extraStats
    },
    {
      type: 'gold',
      amount: 60000
    }
  ]
}
