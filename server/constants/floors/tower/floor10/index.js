import { orderLootTable } from '/server/constants/enemies/lootTables/index.js';
import { ITEMS } from '/server/constants/items/index';
import { LEVEL_TEN_LOOT_TABLE } from '/server/constants/floors/levels/level10';

export const TOWER_FLOOR_10 = {
  1: {
    name: 'Flaming House',
    enemies: ['demon'],
    rewards: []
  },
  2: {
    name: 'Jungle',
    enemies: ['lizard'],
    rewards: LEVEL_TEN_LOOT_TABLE
  },
  3: {
    name: 'savannah',
    enemies: ['elephant'],
    rewards: orderLootTable(LEVEL_TEN_LOOT_TABLE.concat([{
      chance: 1 / 8,
      rewards: [
        { type: 'item', itemId: 'lettice', amount: 50 },
        { type: 'item', itemId: 'feverfew_seed', amount: 1 }
      ]
    }]))
  },
  4: {
    name: 'titanium Place',
    enemies: ['titanium_spirit'],
    rewards: orderLootTable(LEVEL_TEN_LOOT_TABLE.concat([{
      chance: 1 / 8,
      rewards: [
        { type: 'item', itemId: 'titanium_essence', amount: 1 }
      ]
    }]))
  },
  5: {
    name: 'Demonic Resonance',
    enemies: ['demon'],
    rewards: orderLootTable(LEVEL_TEN_LOOT_TABLE.concat([{
      chance: 1 / 256,
      rewards: [
        { type: 'item', itemId: 'thirsting_saber', amount: 1 },
        { type: 'item', itemId: 'titanium_knife', amount: 1 }
      ]
    }]))
  },
  6: {
    name: 'Suspicious Mine',
    enemies: ['angry_miner'],
    rewards: orderLootTable(LEVEL_TEN_LOOT_TABLE.concat([{
      chance: 1 / 4,
      rewards: [
        { type: 'item', itemId: 'ore_titanium', amount: 1 },
        { type: 'item', itemId: 'black_log', amount: 1 }
      ]
    }, {
      chance: 1 / 8,
      rewards: [
        { type: 'item', itemId: 'titanium_bar', amount: 1 }
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'titanium_dwarven_idol', amount: 1 },
        { type: 'item', itemId: 'titanium_mining_hammer', amount: 1 }
      ]
    }]))
  },
  7: {
    name: 'Fire Mage',
    enemies: ['fire_mage'],
    rewards: orderLootTable(LEVEL_TEN_LOOT_TABLE.concat([{
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
    rewards: LEVEL_TEN_LOOT_TABLE
  },

  floorRewards: [
    {
      type: 'item',
      itemId: 'tungsten_dwarven_idol',
      icon: ITEMS['tungsten_dwarven_idol'].icon,
      name: ITEMS['tungsten_dwarven_idol'].name,
      baseStats: ITEMS['tungsten_dwarven_idol'].stats,
      extraStats: ITEMS['tungsten_dwarven_idol'].extraStats
    },
    {
      type: 'gold',
      amount: 150000
    }
  ]
}
