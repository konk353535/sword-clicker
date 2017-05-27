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
      chance: 1 / 16,
      rewards: [
        { type: 'item', itemId: 'ash_seed', amount: 3 },
        { type: 'item', itemId: 'ash_log', amount: 20 },
        { type: 'item', itemId: 'ash_staff', amount: 1 }
      ]
    }]))
  },
  4: {
    name: 'Place of orichalcum',
    enemies: ['orichalcum_spirit'],
    rewards: orderLootTable(LEVEL_SEVEN_LOOT_TABLE.concat([{
      chance: 1 / 4,
      rewards: [
        { type: 'item', itemId: 'orichalcum_essence', amount: 1 }
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
    rewards: orderLootTable([{
      chance: 1 / 4,
      rewards: [
        { type: 'item', itemId: 'ore_orichalcum', amount: 1 },
        { type: 'item', itemId: 'cherry_log', amount: 1 }
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
    }])
  },
  7: {
    name: 'Sparta',
    enemies: ['spartan'],
    rewards: [{
      chance: 1 / 256,
      rewards: [
        { type: 'item', itemId: 'spartan_shield', amount: 1 }
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'orichalcum_scimitar', amount: 1 },
        { type: 'item', itemId: 'orichalcum_broad_sword', amount: 1 },
        { type: 'item', itemId: 'orichalcum_horned_helmet', amount: 1 }
      ]
    }]
  },

  boss: {
    enemy: { id: 'boss_ogre', amount: 1 },
    rewards: LEVEL_SEVEN_LOOT_TABLE
  },

  floorRewards: [
    {
      type: 'item',
      itemId: 'cobalt_dwarven_idol',
      icon: ITEMS['cobalt_dwarven_idol'].icon,
      name: ITEMS['cobalt_dwarven_idol'].name,
      baseStats: ITEMS['cobalt_dwarven_idol'].stats,
      extraStats: ITEMS['cobalt_dwarven_idol'].extraStats
    },
    {
      type: 'gold',
      amount: 100000
    }
  ]
}
