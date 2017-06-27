import { orderLootTable } from '/server/constants/enemies/lootTables/index.js';
import { ITEMS } from '/server/constants/items/index';
import { LEVEL_SEVEN_LOOT_TABLE } from '/server/constants/floors/levels/level7';

export const TOWER_FLOOR_7 = {
  1: {
    name: 'Mud',
    enemies: ['worm'],
    rewards: []
  },
  2: {
    name: 'Rotting Shack',
    enemies: ['rat'],
    rewards: LEVEL_SEVEN_LOOT_TABLE
  },
  3: {
    name: 'Ash Tree',
    enemies: ['beaver'],
    rewards: orderLootTable(LEVEL_SEVEN_LOOT_TABLE.concat([{
      chance: 1 / 64,
      rewards: [
        { type: 'item', itemId: 'cardoon_seed', amount: 1 }
      ]
    }, {
      chance: 1 / 16,
      rewards: [
        { type: 'item', itemId: 'ash_seed', amount: 3 },
        { type: 'item', itemId: 'ash_log', amount: 20 },
        { type: 'item', itemId: 'ash_staff', amount: 1 }
      ]
    }]))
  },
  4: {
    name: 'Place of carbon',
    enemies: ['carbon_spirit'],
    rewards: orderLootTable(LEVEL_SEVEN_LOOT_TABLE.concat([{
      chance: 1 / 4,
      rewards: [
        { type: 'item', itemId: 'carbon_essence', amount: 1 }
      ]
    }]))
  },
  5: {
    name: 'Frozen Peak',
    enemies: ['ice_giant'],
    rewards: orderLootTable(LEVEL_SEVEN_LOOT_TABLE.concat([{
      chance: 1 / 256,
      rewards: [
        { type: 'item', itemId: 'frost_armor_1_tome', amount: 1 }
      ]
    }]))
  },
  6: {
    name: 'Suspicious Mine',
    enemies: ['angry_miner'],
    rewards: orderLootTable(LEVEL_SEVEN_LOOT_TABLE.concat([{
      chance: 1 / 4,
      rewards: [
        { type: 'item', itemId: 'ore_carbon', amount: 1 },
        { type: 'item', itemId: 'cherry_log', amount: 1 }
      ]
    }, {
      chance: 1 / 8,
      rewards: [
        { type: 'item', itemId: 'carbon_bar', amount: 1 }
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'carbon_dwarven_idol', amount: 1 },
        { type: 'item', itemId: 'carbon_mining_hammer', amount: 1 }
      ]
    }]))
  },
  7: {
    name: 'Sparta',
    enemies: ['spartan'],
    rewards: orderLootTable(LEVEL_SEVEN_LOOT_TABLE.concat([{
      chance: 1 / 256,
      rewards: [
        { type: 'item', itemId: 'steel_kite_shield', amount: 1 },
        { type: 'item', itemId: 'water_wave_tome', amount: 1 }
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'carbon_scimitar', amount: 1 },
        { type: 'item', itemId: 'carbon_broad_sword', amount: 1 },
        { type: 'item', itemId: 'carbon_horned_helmet', amount: 1 }
      ]
    }]))
  },

  boss: {
    enemy: { id: 'boss_ogre', amount: 1 },
    rewards: LEVEL_SEVEN_LOOT_TABLE
  },

  floorRewards: [
    {
      type: 'item',
      itemId: 'steel_dwarven_idol',
      icon: ITEMS['steel_dwarven_idol'].icon,
      name: ITEMS['steel_dwarven_idol'].name,
      baseStats: ITEMS['steel_dwarven_idol'].stats,
      extraStats: ITEMS['steel_dwarven_idol'].extraStats
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
      amount: 100000
    }
  ]
}
