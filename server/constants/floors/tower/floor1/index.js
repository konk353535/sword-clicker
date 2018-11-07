import { orderLootTable } from '../../../enemies/lootTables/index.js';
import { ITEMS } from '../../../../../imports/constants/items/index';
import { LEVEL_ONE_LOOT_TABLE } from '../../levels/level1';

console.log('exporting floor1/index.js TOWER_FLOOR_1');
export const TOWER_FLOOR_1 = {
  1: {
    name: 'Grass Field',
    enemies: ['rabbit'],
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
    rewards: orderLootTable(LEVEL_ONE_LOOT_TABLE.concat([{
      chance: 1 / 128,
      rewards: [
        { type: 'item', itemId: 'copper_knife', amount: 1 }
      ]
    }    
  },
  4: {
    name: 'Flower Field',
    enemies: ['butterfly'],
    rewards: orderLootTable(LEVEL_ONE_LOOT_TABLE.concat([{
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'wisdom_tome', amount: 1 }
      ]
    }, {
      chance: 1 / 4,
      rewards: [
        { type: 'item', itemId: 'rubia_flower_seed', amount: 1 }
      ]
    }, {
      chance: 1 / 64,
      rewards: [
        { type: 'item', itemId: 'copper_wand', amount: 1 }
      ]
    }]))
  },
  5: {
    name: 'Abandoned Mine',
    enemies: ['angry_miner'],
    rewards: orderLootTable(LEVEL_ONE_LOOT_TABLE.concat[{
      chance: 1 / 128,
      rewards: [
        { type: 'item', itemId: 'copper_kite_shield', amount: 1 }
      ]
    }, {
      chance: 1 / 4,
      rewards: [ // grouping these together means that only 1 of them will drop... 25% chance to drop x 33% chance = 8.25% chance for any specific item here (x quantity)
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
    name: 'Honey Mine',
    enemies: ['bee'],
    rewards: orderLootTable(LEVEL_ONE_LOOT_TABLE.concat[{
      chance: 1 / 128,
      rewards: [
        { type: 'item', itemId: 'copper_hammer', amount: 1 }
      ]
    }, {
      chance: 1 / 64,
      rewards: [
        { type: 'item', itemId: 'diminished_orb', amount: 1 },
        { type: 'item', itemId: 'ripped_tome', amount: 1 }
      ]
    }])
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
    rewards: orderLootTable(LEVEL_ONE_LOOT_TABLE.concat([{
      chance: 1 / 2,
      rewards: [
        { type: 'item', itemId: 'shark_tooth_amulet', amount: 1 }
      ]
    }]))
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
      type: 'item',
      itemId: 'enhancer_key',
      icon: ITEMS['enhancer_key'].icon,
      name: ITEMS['enhancer_key'].name,
      baseStats: ITEMS['enhancer_key'].stats,
      extraStats: ITEMS['enhancer_key'].extraStats
    },
    {
      type: 'gold',
      amount: 1000
    }
  ]
};
