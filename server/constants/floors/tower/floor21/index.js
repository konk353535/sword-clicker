import { orderLootTable } from '/server/constants/enemies/lootTables/index.js';
import { ITEMS } from '/server/constants/items/index';
import { LEVEL_TWENTY_ONE_LOOT_TABLE } from '/server/constants/floors/levels/level21';

export const TOWER_FLOOR_21 = {
  unlocks: false,
  1: {
    name: 'Bees?',
    enemies: ['bee', 'bee'],
    rewards: []
  },
  2: {
    name: 'Swampy Grove',
    enemies: ['gelatinous cube'],
    rewards: orderLootTable(LEVEL_TWENTY_ONE_LOOT_TABLE.concat([{
      chance: 1 / 16,
      rewards: [
        { type: 'item', itemId: 'darksteel_dagger_scroll', amount: 1 },
        { type: 'item', itemId: 'darksteel_furnace_scroll', amount: 1 }
      ]
    }]))
  },
  3: {
    name: 'Tangled Undergrowth',
    enemies: ['wasp'],
    rewards: orderLootTable(LEVEL_TWENTY_ONE_LOOT_TABLE.concat([{
      chance: 1 / 16,
      rewards: [
        { type: 'item', itemId: 'darksteel_shield_scroll', amount: 1 },
        { type: 'item', itemId: 'darksteel_short_sword_scroll', amount: 1 }
      ]
    }]))
  },
  4: {
    name: 'Peaceful Hillock',
    enemies: ['echinda', 'water mage'],
    rewards: orderLootTable(LEVEL_TWENTY_ONE_LOOT_TABLE.concat([{
      chance: 1 / 16,
      rewards: [
        { type: 'item', itemId: 'darksteel_helmet_scroll', amount: 1 },
        { type: 'item', itemId: 'darksteel_chest_plate_scroll', amount: 1 }
      ]
    }]))
  },
  5: {
    name: 'Old Tree',
    enemies: ['bird', 'bird', 'cut purse'],
    rewards: orderLootTable(LEVEL_TWENTY_ONE_LOOT_TABLE.concat([{
      chance: 1 / 16,
      rewards: [
        { type: 'item', itemId: 'darksteel_axe_scroll', amount: 1 },
        { type: 'item', itemId: 'darksteel_pickaxe_scroll', amount: 1 },
        { type: 'item', itemId: 'darksteel_mining_anvil_scroll', amount: 1 }
      ]
    }]))
  },
  6: {
    name: 'Abandoned Manor',
    enemies: ['vampire'],
    rewards: orderLootTable(LEVEL_TWENTY_ONE_LOOT_TABLE.concat([{
      chance: 1 / 16,
      rewards: [
        { type: 'item', itemId: 'darksteel_spear_scroll', amount: 1 },
        { type: 'item', itemId: 'darksteel_plate_legs_scroll', amount: 1 }
      ]
    }]))
  },
  7: {
    name: 'Dark Cave',
    enemies: ['goblin', 'monk'],
    rewards: orderLootTable(LEVEL_TWENTY_ONE_LOOT_TABLE.concat([{
      chance: 1 / 16,
      rewards: [
        { type: 'item', itemId: 'darksteel_long_sword_scroll', amount: 1 },
        { type: 'item', itemId: 'darksteel_battle_axe_scroll', amount: 1 }
      ]
    }]))
  },

  boss: {
    enemy: { id: 'boss_fox', amount: 1 },
    rewards: orderLootTable(LEVEL_TWENTY_ONE_LOOT_TABLE.concat([{
      chance: 1 / 2,
      rewards: [
        { type: 'item', itemId: 'baby_fox', amount: 1 }
      ]
    }]))
  },

  floorRewards: [
    {
      type: 'item',
      itemId: 'cursed_dwarven_idol',
      icon: ITEMS['cursed_dwarven_idol'].icon,
      name: ITEMS['cursed_dwarven_idol'].name,
      baseStats: ITEMS['cursed_dwarven_idol'].stats,
      extraStats: ITEMS['cursed_dwarven_idol'].extraStats
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
