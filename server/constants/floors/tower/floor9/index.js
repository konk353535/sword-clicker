import { orderLootTable } from '/server/constants/enemies/lootTables/index.js';
import { ITEMS } from '/server/constants/items/index';
import { LEVEL_NINE_LOOT_TABLE } from '/server/constants/floors/levels/level9';

export const TOWER_FLOOR_9 = {
  1: {
    name: 'Flaming House',
    enemies: ['demon'],
    rewards: []
  },
  2: {
    name: 'Jungle',
    enemies: ['lizard'],
    rewards: LEVEL_NINE_LOOT_TABLE
  },
  3: {
    name: 'savannah',
    enemies: ['elephant'],
    rewards: orderLootTable(LEVEL_NINE_LOOT_TABLE.concat([{
      chance: 1 / 8,
      rewards: [
        { type: 'item', itemId: 'lettice', amount: 50 }
      ]
    }]))
  },
  4: {
    name: 'Place of fairies',
    enemies: ['platinum_spirit'],
    rewards: orderLootTable(LEVEL_NINE_LOOT_TABLE.concat([{
      chance: 1 / 8,
      rewards: [
        { type: 'item', itemId: 'platinum_essence', amount: 1 }
      ]
    }]))
  },
  5: {
    name: 'Fire Temple',
    enemies: ['fire_mage'],
    rewards: orderLootTable(LEVEL_NINE_LOOT_TABLE.concat([{
      chance: 1 / 128,
      rewards: [
        { type: 'item', itemId: 'purple_trident', amount: 1 }
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'purple_wizard_hat', amount: 1 },
        { type: 'item', itemId: 'purple_wizard_shirt', amount: 1 },
        { type: 'item', itemId: 'purple_wizard_shorts', amount: 1 }
      ]
    }]))
  },
  6: {
    name: 'Suspicious Mine',
    enemies: ['angry_miner'],
    rewards: orderLootTable(LEVEL_NINE_LOOT_TABLE.concat([{
      chance: 1 / 4,
      rewards: [
        { type: 'item', itemId: 'ore_platinum', amount: 1 },
        { type: 'item', itemId: 'elk_log', amount: 1 }
      ]
    }, {
      chance: 1 / 8,
      rewards: [
        { type: 'item', itemId: 'platinum_bar', amount: 1 }
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'platinum_dwarven_idol', amount: 1 },
        { type: 'item', itemId: 'platinum_mining_hammer', amount: 1 }
      ]
    }]))
  },
  7: {
    name: 'Master Farmers Market',
    enemies: ['farmer'],
    rewards: orderLootTable(LEVEL_NINE_LOOT_TABLE.concat([{
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'celery_seed', amount: 1 },
        { type: 'item', itemId: 'dragon_fruit', amount: 3 }
      ]
    }]))
  },

  boss: {
    enemy: { id: 'boss_gorilla', amount: 1 },
    rewards: LEVEL_NINE_LOOT_TABLE
  },

  floorRewards: [
    {
      type: 'item',
      itemId: 'titanium_dwarven_idol',
      icon: ITEMS['titanium_dwarven_idol'].icon,
      name: ITEMS['titanium_dwarven_idol'].name,
      baseStats: ITEMS['titanium_dwarven_idol'].stats,
      extraStats: ITEMS['titanium_dwarven_idol'].extraStats
    },
    {
      type: 'gold',
      amount: 150000
    }
  ]
}
