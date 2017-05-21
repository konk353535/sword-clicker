import { orderLootTable } from '/server/constants/enemies/lootTables/index.js';
import { ITEMS } from '/server/constants/items/index';
import { LEVEL_FIVE_LOOT_TABLE } from '/server/constants/floors/levels/level5';

export const TOWER_FLOOR_5 = {
  1: {
    name: 'Muddy Creek',
    enemies: ['worm'],
    rewards: []
  },
  2: {
    name: 'Farmers Market',
    enemies: ['farmer'],
    rewards: orderLootTable(LEVEL_FIVE_LOOT_TABLE.concat([{
      chance: 1 / 4,
      rewards: [
        { type: 'item', itemId: 'lettice_seed', amount: 1 }
        { type: 'item', itemId: 'lemon_seed', amount: 1 }
        { type: 'item', itemId: 'pineapple_seed', amount: 1 }
        { type: 'item', itemId: 'red_apple_seed', amount: 1 }
      ]
    }])
  },
  3: {
    name: 'Grape Fruit Tree',
    enemies: ['bee'],
    rewards: orderLootTable(LEVEL_FIVE_LOOT_TABLE.concat([{
      chance: 1 / 4,
      rewards: [
        { type: 'item', itemId: 'grape_fruit', amount: 1 }
      ]
    }])
  },
  4: {
    name: 'Protected Bay',
    enemies: ['jellyFish'],
    rewards: LEVEL_FIVE_LOOT_TABLE
  },
  5: {
    name: 'Beech Tree',
    enemies: ['beaver'],
    rewards: orderLootTable(LEVEL_FIVE_LOOT_TABLE.concat([{
      chance: 1 / 16,
      rewards: [
        { type: 'item', itemId: 'beech_seed', amount: 3 },
        { type: 'item', itemId: 'beech_log', amount: 20 },
        { type: 'item', itemId: 'beech_staff', amount: 1 }
      ]
    }])
  },
  6: {
    name: 'Suspicious Mine',
    enemies: ['angry_miner'],
    rewards: orderLootTable([{
      chance: 1 / 4,
      rewards: [
        { type: 'item', itemId: 'ore_mithril', amount: 1 },
        { type: 'item', itemId: 'maple_log', amount: 1 }
      ]
    }, {
      chance: 1 / 8,
      rewards: [
        { type: 'item', itemId: 'mithril_bar', amount: 1 }
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'mithril_dwarven_idol', amount: 1 },
        { type: 'item', itemId: 'mithril_mining_hammer', amount: 1 }
      ]
    }]
  },
  7: {
    name: 'Snake',
    enemies: ['snake'],
    rewards: [{
      chance: 1 / 128,
      rewards: [
        { type: 'item', itemId: 'poisoned_blade_1_tome', amount: 1 }
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'mithril_scimitar', amount: 1 },
        { type: 'item', itemId: 'mithril_broad_sword', amount: 1 },
        { type: 'item', itemId: 'mithril_horned_helmet', amount: 1 }
      ]
    }]
  },

  boss: {
    enemy: { id: 'boss_mage', amount: 1 },
    rewards: LEVEL_FIVE_LOOT_TABLE
  },

  floorRewards: [
    {
      type: 'item',
      itemId: 'adamantium_dwarven_idol',
      icon: ITEMS['adamantium_dwarven_idol'].icon,
      name: ITEMS['adamantium_dwarven_idol'].name,
      baseStats: ITEMS['adamantium_dwarven_idol'].stats,
      extraStats: ITEMS['adamantium_dwarven_idol'].extraStats
    },
    {
      type: 'gold',
      amount: 30000
    }
  ]
}
