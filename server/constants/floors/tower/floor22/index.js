import { orderLootTable } from '/server/constants/enemies/lootTables/index.js';
import { ITEMS } from '/server/constants/items/index';
import { LEVEL_TWENTY_ONE_LOOT_TABLE } from '/server/constants/floors/levels/level21';

export const TOWER_FLOOR_22 = {
  unlocks: false,
  1: {
    name: 'Bees?',
    enemies: ['bee', 'bee'],
    rewards: []
  },
  2: {
    name: 'Tangled Undergrowth',
    enemies: ['wasp'],
    rewards: orderLootTable(LEVEL_TWENTY_ONE_LOOT_TABLE.concat([{
      chance: 1 / 16,
      rewards: [
        { type: 'item', itemId: 'radiant_dagger_scroll', amount: 1 },
        { type: 'item', itemId: 'radiant_furnace_scroll', amount: 1 }
      ]
    }]))
  },
  3: {
    name: 'Swampy Grove',
    enemies: ['gelatinous_cube'],
    rewards: orderLootTable(LEVEL_TWENTY_ONE_LOOT_TABLE.concat([{
      chance: 1 / 16,
      rewards: [
        { type: 'item', itemId: 'radiant_shield_scroll', amount: 1 },
        { type: 'item', itemId: 'radiant_short_sword_scroll', amount: 1 }
      ]
    }]))
  },
  4: {
    name: 'Abandoned Manor',
    enemies: ['vampire'],
    rewards: orderLootTable(LEVEL_TWENTY_ONE_LOOT_TABLE.concat([{
      chance: 1 / 16,
      rewards: [
        { type: 'item', itemId: 'radiant_helmet_scroll', amount: 1 },
        { type: 'item', itemId: 'radiant_chest_plate_scroll', amount: 1 }
      ]
    }]))
  },
  5: {
    name: 'Old Tree',
    enemies: ['bird', 'cut_purse'],
    rewards: orderLootTable(LEVEL_TWENTY_ONE_LOOT_TABLE.concat([{
      chance: 1 / 16,
      rewards: [
        { type: 'item', itemId: 'radiant_axe_scroll', amount: 1 },
        { type: 'item', itemId: 'radiant_pickaxe_scroll', amount: 1 },
        { type: 'item', itemId: 'radiant_mining_anvil_scroll', amount: 1 }
      ]
    }]))
  },
  6: {
    name: 'Peaceful Hillock',
    enemies: ['echidna', 'water_mage'],
    rewards: orderLootTable(LEVEL_TWENTY_ONE_LOOT_TABLE.concat([{
      chance: 1 / 16,
      rewards: [
        { type: 'item', itemId: 'radiant_spear_scroll', amount: 1 },
        { type: 'item', itemId: 'radiant_plate_legs_scroll', amount: 1 }
      ]
    }]))
  },
  7: {
    name: 'Dark Cave',
    enemies: ['goblin'],
    rewards: orderLootTable(LEVEL_TWENTY_ONE_LOOT_TABLE.concat([{
      chance: 1 / 16,
      rewards: [
        { type: 'item', itemId: 'radiant_long_sword_scroll', amount: 1 },
        { type: 'item', itemId: 'radiant_battle_axe_scroll', amount: 1 }
      ]
    }]))
  },

  boss: {
    enemy: { id: 'boss_dragon', amount: 1 },
    rewards: []
  },

  floorRewards: [
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
      amount: 600000
    }
  ]
}
