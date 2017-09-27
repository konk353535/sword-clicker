import { orderLootTable } from '/server/constants/enemies/lootTables/index.js';
import { ITEMS } from '/server/constants/items/index';
import { LEVEL_FIFTEEN_LOOT_TABLE } from '/server/constants/floors/levels/level15';

export const TOWER_FLOOR_15 = {
  1: {
    name: 'Flaming House',
    enemies: ['demon'],
    rewards: []
  },
  2: {
    name: 'Creaking Door',
    enemies: ['wasp'],
    rewards: LEVEL_FIFTEEN_LOOT_TABLE
  },
  3: {
    name: 'Deep Water',
    enemies: ['octopus'],
    rewards: orderLootTable(LEVEL_FIFTEEN_LOOT_TABLE.concat([{
      chance: 1 / 8,
      rewards: [
        { type: 'item', itemId: 'lettice', amount: 50 },
        { type: 'item', itemId: 'feverfew_seed', amount: 1 }
      ]
    }]))
  },
  4: {
    name: 'Adamantium Place',
    enemies: ['adamantium_spirit'],
    rewards: orderLootTable(LEVEL_FIFTEEN_LOOT_TABLE.concat([{
      chance: 1 / 128,
      rewards: [
        { type: 'item', itemId: 'cursed_spirit_shield', amount: 1 }
      ]
    }, {
      chance: 1 / 4,
      rewards: [
        { type: 'item', itemId: 'adamantium_essence', amount: 1 }
      ]
    }]))
  },
  5: {
    name: 'Dark Chasm',
    enemies: ['crab'],
    rewards: orderLootTable(LEVEL_FIFTEEN_LOOT_TABLE.concat([{
      chance: 1 / 256,
      rewards: [
        { type: 'item', itemId: 'adamantium_rapiers', amount: 1 }
      ]
    }]))
  },
  6: {
    name: 'Big Pit',
    enemies: ['snake', 'snake', 'snake'],
    rewards: orderLootTable(LEVEL_FIFTEEN_LOOT_TABLE.concat([{
      chance: 1 / 4,
      rewards: [
        { type: 'item', itemId: 'ore_adamantium', amount: 1 },
        { type: 'item', itemId: 'hickory_log', amount: 1 }
      ]
    }, {
      chance: 1 / 8,
      rewards: [
        { type: 'item', itemId: 'adamantium_bar', amount: 1 }
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'adamantium_dwarven_idol', amount: 1 },
        { type: 'item', itemId: 'adamantium_mining_hammer', amount: 1 }
      ]
    }, {
      chance: 1 / 64,
      rewards: [
        { type: 'item', itemId: 'adamantium_rapiers', amount: 1 }
      ]
    }]))
  },
  7: {
    name: 'Eternal Abyss',
    enemies: ['demon', 'angel'],
    rewards: orderLootTable(LEVEL_FIFTEEN_LOOT_TABLE.concat([{
      chance: 1 / 128,
      rewards: [
        { type: 'item', itemId: 'chives', amount: 1 }
      ]
    }, {
      chance: 1 / 8,
      rewards: [
        { type: 'item', itemId: 'complete_fire_shard', amount: 50 }
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'adamantium_scimitar', amount: 1 },
        { type: 'item', itemId: 'adamantium_broad_sword', amount: 1 },
        { type: 'item', itemId: 'adamantium_horned_helmet', amount: 1 }
      ]
    }]))
  },

  boss: {
    enemy: { id: 'boss_cassiopeia', amount: 1 },
    rewards: LEVEL_FIFTEEN_LOOT_TABLE
  },

  floorRewards: [
    {
      type: 'item',
      itemId: 'orichalcum_dwarven_idol',
      icon: ITEMS['orichalcum_dwarven_idol'].icon,
      name: ITEMS['orichalcum_dwarven_idol'].name,
      baseStats: ITEMS['orichalcum_dwarven_idol'].stats,
      extraStats: ITEMS['orichalcum_dwarven_idol'].extraStats
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
}
