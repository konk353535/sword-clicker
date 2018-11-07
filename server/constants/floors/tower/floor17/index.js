import { orderLootTable } from '../../../enemies/lootTables/index.js';
import { ITEMS } from '../../../../../imports/constants/items/index';

import { LEVEL_SEVENTEEN_LOOT_TABLE } from '../../levels/level17';

export const TOWER_FLOOR_17 = {
  1: {
    name: 'Old Shed',
    enemies: ['rat'],
    rewards: []
  },
  2: {
    name: 'Chestnut tree',
    enemies: ['bird'],
    rewards: LEVEL_SEVENTEEN_LOOT_TABLE
  },
  3: {
    name: 'Cubby House',
    enemies: ['spider'],
    rewards: orderLootTable(LEVEL_SEVENTEEN_LOOT_TABLE.concat([{
      chance: 1 / 8,
      rewards: [
        { type: 'item', itemId: 'lettice', amount: 50 },
        { type: 'item', itemId: 'feverfew_seed', amount: 1 }
      ]
    }]))
  },
  4: {
    name: 'Place of Meteorite',
    enemies: ['meteorite_spirit'],
    rewards: orderLootTable(LEVEL_SEVENTEEN_LOOT_TABLE.concat([{
      chance: 1 / 4,
      rewards: [
        { type: 'item', itemId: 'meteorite_essence', amount: 1 }
      ]
    }, {
      chance: 1 / 64,
      rewards: [
        { type: 'item', itemId: 'meteorite_wand', amount: 1 }
      ]
    }]))
  },
  5: {
    name: 'Rocky Beach',
    enemies: ['crab', 'crab', 'crab'],
    rewards: orderLootTable(LEVEL_SEVENTEEN_LOOT_TABLE.concat([{
      chance: 1 / 128,
      rewards: [
        { type: 'item', itemId: 'meteorite_kite_shield', amount: 1 }
      ]
    }]))
  },
  6: {
    name: 'Suspicious Mine',
    enemies: ['angry_miner'],
    rewards: orderLootTable(LEVEL_SEVENTEEN_LOOT_TABLE.concat([{
      chance: 1 / 4,
      rewards: [
        { type: 'item', itemId: 'ore_meteorite', amount: 1 },
        { type: 'item', itemId: 'poplar_log', amount: 1 }
      ]
    }, {
      chance: 1 / 8,
      rewards: [
        { type: 'item', itemId: 'meteorite_bar', amount: 1 }
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'meteorite_dwarven_idol', amount: 1 },
        { type: 'item', itemId: 'meteorite_mining_hammer', amount: 1 }
      ]
    }, {
      chance: 1 / 64,
      rewards: [
        { type: 'item', itemId: 'powerful_orb', amount: 1 },
        { type: 'item', itemId: 'breathtaking_tome', amount: 1 }
      ]
    }]))
  },
  7: {
    name: 'Empty Cave',
    enemies: ['goblin', 'cut_purse'],
    rewards: orderLootTable(LEVEL_SEVENTEEN_LOOT_TABLE.concat([{
      chance: 1 / 64,
      rewards: [
        { type: 'item', itemId: 'sorrell', amount: 1 },
        { type: 'item', itemId: 'chives', amount: 1 }
      ]
    }, {
      chance: 1 / 16,
      rewards: [
        { type: 'item', itemId: 'complete_air_shard', amount: 10 }
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'meteorite_scimitar', amount: 1 },
        { type: 'item', itemId: 'meteorite_broad_sword', amount: 1 },
        { type: 'item', itemId: 'meteorite_horned_helmet', amount: 1 }
      ]
    }]))
  },

  boss: {
    enemy: { id: 'boss_kraken', amount: 1 },
    rewards: orderLootTable(LEVEL_SEVENTEEN_LOOT_TABLE.concat([{
      chance: 1 / 2,
      rewards: [
        { type: 'item', itemId: 'krakens_tentacle', amount: 1 }
      ]
    }]))
  },

  floorRewards: [
    {
      type: 'item',
      itemId: 'fairy_steel_dwarven_idol',
      icon: ITEMS['fairy_steel_dwarven_idol'].icon,
      name: ITEMS['fairy_steel_dwarven_idol'].name,
      baseStats: ITEMS['fairy_steel_dwarven_idol'].stats,
      extraStats: ITEMS['fairy_steel_dwarven_idol'].extraStats
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
};
