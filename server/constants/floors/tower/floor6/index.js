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
    name: 'Watermelon Planatation',
    enemies: ['farmer'],
    rewards: orderLootTable(LEVEL_SIX_LOOT_TABLE.concat([{
      chance: 1 / 4,
      rewards: [
        { type: 'item', itemId: 'watermelon', amount: 1 }
      ]
    }, {
      chance: 1 / 128,
      rewards: [
        { type: 'item', itemId: 'chilli_seed', amount: 1 }
      ]
    }]))
  },
  4: {
    name: 'Place of adamantium',
    enemies: ['adamantium_spirit'],
    rewards: orderLootTable(LEVEL_SIX_LOOT_TABLE.concat([{
      chance: 1 / 4,
      rewards: [
        { type: 'item', itemId: 'adamantium_essence', amount: 1 }
      ]
    }]))
  },
  5: {
    name: 'Volcanic Chamber',
    enemies: ['demon'],
    rewards: orderLootTable(LEVEL_SIX_LOOT_TABLE.concat([{
      chance: 1 / 256,
      rewards: [
        { type: 'item', itemId: 'angels_touch_tome', amount: 1 }
      ]
    }]))
  },
  6: {
    name: 'Suspicious Mine',
    enemies: ['angry_miner'],
    rewards: orderLootTable([{
      chance: 1 / 4,
      rewards: [
        { type: 'item', itemId: 'ore_adamantium', amount: 1 },
        { type: 'item', itemId: 'walnut_log', amount: 1 }
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
    }])
  },
  7: {
    name: 'Mysterious Mine',
    enemies: ['dwarf'],
    rewards: [{
      chance: 1 / 256,
      rewards: [
        { type: 'item', itemId: 'dwarven_staff', amount: 1 }
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'adamantium_scimitar', amount: 1 },
        { type: 'item', itemId: 'adamantium_broad_sword', amount: 1 },
        { type: 'item', itemId: 'adamantium_horned_helmet', amount: 1 }
      ]
    }]
  },

  boss: {
    enemy: { id: 'boss_goblin', amount: 1 },
    rewards: LEVEL_SIX_LOOT_TABLE
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
      type: 'gold',
      amount: 60000
    }
  ]
}
