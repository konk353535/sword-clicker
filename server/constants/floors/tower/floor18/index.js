import { orderLootTable } from '/server/constants/enemies/lootTables/index.js';
import { ITEMS } from '/server/constants/items/index';
import { LEVEL_EIGHTEEN_LOOT_TABLE } from '/server/constants/floors/levels/level18';

export const TOWER_FLOOR_18 = {
  1: {
    name: 'Dirty Field',
    enemies: ['worm'],
    rewards: []
  },
  2: {
    name: 'Honey Comb',
    enemies: ['bee'],
    rewards: LEVEL_EIGHTEEN_LOOT_TABLE
  },
  3: {
    name: 'Wasp Nests',
    enemies: ['wasp'],
    rewards: orderLootTable(LEVEL_EIGHTEEN_LOOT_TABLE.concat([{
      chance: 1 / 8,
      rewards: [
        { type: 'item', itemId: 'lettice', amount: 50 },
        { type: 'item', itemId: 'feverfew_seed', amount: 1 }
      ]
    }]))
  },
  4: {
    name: 'Fairy Steel Place',
    enemies: ['fairy_steel_spirit'],
    rewards: orderLootTable(LEVEL_EIGHTEEN_LOOT_TABLE.concat([{
      chance: 1 / 8,
      rewards: [
        { type: 'item', itemId: 'fairy_steel_essence', amount: 1 }
      ]
    }]))
  },
  5: {
    name: 'Eternal Struggle',
    enemies: ['demon', 'angel'],
    rewards: orderLootTable(LEVEL_EIGHTEEN_LOOT_TABLE.concat([{
      chance: 1 / 256,
      rewards: [
        { type: 'item', itemId: 'fairy_steel_rapiers', amount: 1 }
      ]
    }]))
  },
  6: {
    name: 'Suspicious Mine',
    enemies: ['angry_miner'],
    rewards: orderLootTable(LEVEL_EIGHTEEN_LOOT_TABLE.concat([{
      chance: 1 / 4,
      rewards: [
        { type: 'item', itemId: 'ore_fairy_steel', amount: 1 },
        { type: 'item', itemId: 'poplar_log', amount: 1 }
      ]
    }, {
      chance: 1 / 8,
      rewards: [
        { type: 'item', itemId: 'fairy_steel_bar', amount: 1 }
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'fairy_steel_dwarven_idol', amount: 1 },
        { type: 'item', itemId: 'fairy_steel_mining_hammer', amount: 1 }
      ]
    }]))
  },
  7: {
    name: 'Waterfall',
    enemies: ['water_mage', 'jellyFish'],
    rewards: orderLootTable(LEVEL_EIGHTEEN_LOOT_TABLE.concat([{
      chance: 1 / 1024,
      rewards: [
        { type: 'item', itemId: 'inferno_tome', amount: 1 }
      ]
    }, {
      chance: 1 / 4,
      rewards: [
        { type: 'item', itemId: 'fire_shard_fragment', amount: 50 }
      ]
    }]))
  },

  boss: {
    enemy: { id: 'boss_gorilla', amount: 1 },
    rewards: LEVEL_EIGHTEEN_LOOT_TABLE
  },

  floorRewards: [
    {
      type: 'item',
      itemId: 'elven_steel_dwarven_idol',
      icon: ITEMS['elven_steel_dwarven_idol'].icon,
      name: ITEMS['elven_steel_dwarven_idol'].name,
      baseStats: ITEMS['elven_steel_dwarven_idol'].stats,
      extraStats: ITEMS['elven_steel_dwarven_idol'].extraStats
    },
    {
      type: 'gold',
      amount: 150000
    }
  ]
}
