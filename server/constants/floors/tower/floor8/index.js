import { orderLootTable } from '/server/constants/enemies/lootTables/index.js';
import { ITEMS } from '/server/constants/items/index';

export const TOWER_FLOOR_8 = {
  easy: {
    name: 'Jungle Bridge',
    image: 'jungleBridge.jpeg',
    floor: 8,
    rewards: orderLootTable([{
      chance: 1 / 8,
      rewards: [
        { type: 'item', itemId: 'ore_cobalt', amount: 3 },
        { type: 'gold', amount: 500 }
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'juniper', amount: 1 }
      ]
    }])
  },

  hard: {
    name: 'Lone Island',
    image: 'loneIsland.jpeg',
    floor: 8,
    rewards: orderLootTable([{
      chance: 1 / 2,
      rewards: [{ type: 'gold', amount: 400 }]
    }, {
      chance: 1 / 4,
      rewards: [
        { type: 'item', itemId: 'cobalt_bar', amount: 2 },
        { type: 'item', itemId: 'elk_log', amount: 15 }
      ]
    }, {
      chance: 1 / 16,
      rewards: [
        { type: 'item', itemId: 'fairy_steel_essence', amount: 1 },
        { type: 'item', itemId: 'cobalt_shield', amount: 1 },
        { type: 'item', itemId: 'cobalt_spear', amount: 1 },
        { type: 'item', itemId: 'cobalt_long_sword', amount: 1 },
        { type: 'item', itemId: 'cobalt_plate_legs', amount: 1 },
        { type: 'item', itemId: 'cobalt_chest_plate', amount: 1 },
        { type: 'item', itemId: 'cobalt_helmet', amount: 1 },
        { type: 'item', itemId: 'cobalt_dagger', amount: 1 },
        { type: 'item', itemId: 'cobalt_short_sword', amount: 1 },
        { type: 'item', itemId: 'cobalt_battle_axe', amount: 1 }
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'cobalt_horned_helmet', amount: 1 },
        { type: 'item', itemId: 'cobalt_mining_hammer', amount: 1 },
        { type: 'item', itemId: 'cobalt_dwarven_idol', amount: 1 }
      ]
    }])
  },

  veryHard: {
    name: 'Quartz Lake',
    image: 'quartzLake.jpeg',
    floor: 8,
    rewards: orderLootTable([{
      chance: 1 / 4,
      rewards: [{ type: 'gold', amount: 800 }]
    }, {
      chance: 1 / 8,
      rewards: [
        { type: 'item', itemId: 'cobalt_shield', amount: 1 },
        { type: 'item', itemId: 'cobalt_spear', amount: 1 },
        { type: 'item', itemId: 'cobalt_long_sword', amount: 1 },
        { type: 'item', itemId: 'cobalt_plate_legs', amount: 1 },
        { type: 'item', itemId: 'cobalt_chest_plate', amount: 1 },
        { type: 'item', itemId: 'cobalt_helmet', amount: 1 },
        { type: 'item', itemId: 'cobalt_dagger', amount: 1 },
        { type: 'item', itemId: 'cobalt_short_sword', amount: 1 },
        { type: 'item', itemId: 'cobalt_battle_axe', amount: 1 },
      ]
    }, {
      chance: 1 / 16,
      rewards: [
        { type: 'item', itemId: 'cobalt_dwarven_idol', amount: 1 },
        { type: 'item', itemId: 'cobalt_horned_helmet', amount: 1 },
        { type: 'item', itemId: 'cobalt_mining_hammer', amount: 1 },
        { type: 'item', itemId: 'fairy_steel_essence', amount: 3 },
        { type: 'item', itemId: 'juniper', amount: 1 }
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'cobalt_scimitar', amount: 1 },
        { type: 'item', itemId: 'cobalt_broad_sword', amount: 1 }
      ]
    }])
  },

  boss: {
    enemy: { id: 'boss_phenoix', amount: 1 },
    rewards: orderLootTable([{
      chance: 1,
      rewards: [
        { type: 'item', itemId: 'cobalt_scimitar', amount: 1 },
        { type: 'item', itemId: 'cobalt_broad_sword', amount: 1 }
      ]
    }])
  },

  floorRewards: [
    {
      type: 'item',
      itemId: 'cobalt_dwarven_idol',
      icon: ITEMS['cobalt_dwarven_idol'].icon,
      name: ITEMS['cobalt_dwarven_idol'].name,
      amount: 10,
      baseStats: ITEMS['cobalt_dwarven_idol'].stats,
      extraStats: ITEMS['cobalt_dwarven_idol'].extraStats
    }
  ]
}
