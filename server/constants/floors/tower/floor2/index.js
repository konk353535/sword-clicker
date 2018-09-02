import { orderLootTable } from '/server/constants/enemies/lootTables/index.js';
console.log('importing floor2/index.js ITEMS');
import { ITEMS } from '/server/constants/items/index';
import { LEVEL_TWO_LOOT_TABLE } from '/server/constants/floors/levels/level2';

console.log('exporting floor2/index.js TOWER_FLOOR_2');
export const TOWER_FLOOR_2 = {
  1: {
    name: 'Derelict House',
    enemies: ['rat'],
    rewards: []
  },
  2: {
    name: 'Cliff\'s Edge',
    enemies: ['bird'],
    rewards: LEVEL_TWO_LOOT_TABLE
  },
  3: {
    name: 'Mossy Garden',
    enemies: ['snail'],
    rewards: LEVEL_TWO_LOOT_TABLE
  },
  4: {
    name: 'Minor Earth Altar',
    enemies: ['brown_mage'],
    rewards: orderLootTable(LEVEL_TWO_LOOT_TABLE.concat([{
      chance: 1 / 128,
      rewards: [
        { type: 'item', itemId: 'copper_wand', amount: 1 },
        { type: 'item', itemId: 'brown_trident', amount: 1 }
      ]
    }, {
      chance: 1 / 16,
      rewards: [
        { type: 'item', itemId: 'brown_wizard_hat', amount: 1 },
        { type: 'item', itemId: 'brown_wizard_shirt', amount: 1 },
        { type: 'item', itemId: 'brown_wizard_shorts', amount: 1 }
      ]
    }]))
  },
  5: {
    name: 'Hidden Cove',
    enemies: ['echidna'],
    rewards: orderLootTable(LEVEL_TWO_LOOT_TABLE.concat([{
      chance: 1 / 64,
      rewards: [
        { type: 'item', itemId: 'spiked_armor_1_tome', amount: 1 }
      ]
    }, {
      chance: 1 / 128,
      rewards: [
        { type: 'item', itemId: 'tin_buckler', amount: 1 }
      ]
    }]))
  },
  6: {
    name: 'Suspicious Mine',
    enemies: ['angry_miner'],
    rewards: orderLootTable(LEVEL_TWO_LOOT_TABLE.concat([{
      chance: 1 / 4,
      rewards: [
        { type: 'item', itemId: 'ore_coal', amount: 1 },
        { type: 'item', itemId: 'ore_tin', amount: 1 },
        { type: 'item', itemId: 'beech_log', amount: 1 }
      ]
    }, {
      chance: 1 / 8,
      rewards: [
        { type: 'item', itemId: 'tin_bar', amount: 1 }
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'tin_dwarven_idol', amount: 1 },
        { type: 'item', itemId: 'tin_mining_hammer', amount: 1 }
      ]
    }]))
  },
  7: {
    name: 'Carrot Farm',
    enemies: ['rabbit'],
    rewards: orderLootTable(LEVEL_TWO_LOOT_TABLE.concat([{
      chance: 1 / 64,
      rewards: [
        { type: 'item', itemId: 'carrot', amount: 1 }
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'tin_scimitar', amount: 1 },
        { type: 'item', itemId: 'tin_broad_sword', amount: 1 },
        { type: 'item', itemId: 'tin_horned_helmet', amount: 1 }
      ]
    }]))
  },

  boss: {
    enemy: { id: 'boss_cobra', amount: 1 },
    rewards: orderLootTable(LEVEL_TWO_LOOT_TABLE.concat([{
      chance: 1 / 2,
      rewards: [
        { type: 'item', itemId: 'snake_skin_chest', amount: 1 }
      ]
    }]))
  },

  floorRewards: [
    {
      type: 'item',
      itemId: 'bronze_dwarven_idol',
      icon: ITEMS['bronze_dwarven_idol'].icon,
      name: ITEMS['bronze_dwarven_idol'].name,
      baseStats: ITEMS['bronze_dwarven_idol'].stats,
      extraStats: ITEMS['bronze_dwarven_idol'].extraStats
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
      amount: 3000
    }
  ]
};
