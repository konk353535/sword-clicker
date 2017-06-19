import { orderLootTable } from '/server/constants/enemies/lootTables/index.js';
import { ITEMS } from '/server/constants/items/index';
import { LEVEL_SIXTEEN_LOOT_TABLE } from '/server/constants/floors/levels/level16';

export const TOWER_FLOOR_16 = {
  1: {
    name: 'Blue House',
    enemies: ['blue_mage'],
    rewards: []
  },
  2: {
    name: 'Jungle',
    enemies: ['lizard'],
    rewards: LEVEL_SIXTEEN_LOOT_TABLE
  },
  3: {
    name: 'Windy Peak',
    enemies: ['echidna'],
    rewards: orderLootTable(LEVEL_SIXTEEN_LOOT_TABLE.concat([{
      chance: 1 / 8,
      rewards: [
        { type: 'item', itemId: 'lettice', amount: 50 },
        { type: 'item', itemId: 'feverfew_seed', amount: 1 }
      ]
    }]))
  },
  4: {
    name: 'Orichalcum Place',
    enemies: ['orichalcum_spirit'],
    rewards: orderLootTable(LEVEL_SIXTEEN_LOOT_TABLE.concat([{
      chance: 1 / 8,
      rewards: [
        { type: 'item', itemId: 'orichalcum_essence', amount: 1 }
      ]
    }]))
  },
  5: {
    name: 'Fiery Pit',
    enemies: ['demon', 'fire_mage'],
    rewards: orderLootTable(LEVEL_SIXTEEN_LOOT_TABLE.concat([{
      chance: 1 / 256,
      rewards: [
        { type: 'item', itemId: 'thirsting_saber', amount: 1 }
      ]
    }]))
  },
  6: {
    name: 'Suspicious Mine',
    enemies: ['angry_miner'],
    rewards: orderLootTable(LEVEL_SIXTEEN_LOOT_TABLE.concat([{
      chance: 1 / 4,
      rewards: [
        { type: 'item', itemId: 'ore_orichalcum', amount: 1 },
        { type: 'item', itemId: 'larch_log', amount: 1 }
      ]
    }, {
      chance: 1 / 8,
      rewards: [
        { type: 'item', itemId: 'orichalcum_bar', amount: 1 }
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'orichalcum_dwarven_idol', amount: 1 },
        { type: 'item', itemId: 'orichalcum_mining_hammer', amount: 1 }
      ]
    }]))
  },
  7: {
    name: 'Howling Abyss',
    enemies: ['ice_giant'],
    rewards: orderLootTable(LEVEL_SIXTEEN_LOOT_TABLE.concat([{
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
    rewards: LEVEL_SIXTEEN_LOOT_TABLE
  },

  floorRewards: [
    {
      type: 'item',
      itemId: 'meteorite_dwarven_idol',
      icon: ITEMS['meteorite_dwarven_idol'].icon,
      name: ITEMS['meteorite_dwarven_idol'].name,
      baseStats: ITEMS['meteorite_dwarven_idol'].stats,
      extraStats: ITEMS['meteorite_dwarven_idol'].extraStats
    },
    {
      type: 'gold',
      amount: 150000
    }
  ]
}
