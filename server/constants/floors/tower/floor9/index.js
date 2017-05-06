import { orderLootTable } from '/server/constants/enemies/lootTables/index.js';
import { ITEMS } from '/server/constants/items/index';

export const TOWER_FLOOR_9 = {
  easy: {
    name: 'Jungle Bridge',
    image: 'jungleBridge.jpeg',
    floor: 9,
    rewards: orderLootTable([{
      chance: 1 / 8,
      rewards: [
        { type: 'item', itemId: 'ore_fairy_steel', amount: 3 },
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
    floor: 9,
    rewards: orderLootTable([{
      chance: 1 / 2,
      rewards: [{ type: 'gold', amount: 400 }]
    }, {
      chance: 1 / 4,
      rewards: [
        { type: 'item', itemId: 'fairy_steel_bar', amount: 2 },
        { type: 'item', itemId: 'fiery_log', amount: 15 }
      ]
    }, {
      chance: 1 / 16,
      rewards: [
        { type: 'item', itemId: 'cursed_essence', amount: 1 },
        { type: 'item', itemId: 'fairy_steel_shield', amount: 1 },
        { type: 'item', itemId: 'fairy_steel_spear', amount: 1 },
        { type: 'item', itemId: 'fairy_steel_long_sword', amount: 1 },
        { type: 'item', itemId: 'fairy_steel_plate_legs', amount: 1 },
        { type: 'item', itemId: 'fairy_steel_chest_plate', amount: 1 },
        { type: 'item', itemId: 'fairy_steel_helmet', amount: 1 },
        { type: 'item', itemId: 'fairy_steel_dagger', amount: 1 },
        { type: 'item', itemId: 'fairy_steel_short_sword', amount: 1 },
        { type: 'item', itemId: 'fairy_steel_battle_axe', amount: 1 }
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'fairy_steel_horned_helmet', amount: 1 },
        { type: 'item', itemId: 'fairy_steel_mining_hammer', amount: 1 },
        { type: 'item', itemId: 'fairy_steel_dwarven_idol', amount: 1 }
      ]
    }])
  },

  veryHard: {
    name: 'Quartz Lake',
    image: 'quartzLake.jpeg',
    floor: 9,
    rewards: orderLootTable([{
      chance: 1 / 4,
      rewards: [
        { type: 'gold', amount: 800 },
        { type: 'item', itemId: 'cursed_essence', amount: 1 },
      ]
    }, {
      chance: 1 / 8,
      rewards: [
        { type: 'item', itemId: 'fairy_steel_shield', amount: 1 },
        { type: 'item', itemId: 'fairy_steel_spear', amount: 1 },
        { type: 'item', itemId: 'fairy_steel_long_sword', amount: 1 },
        { type: 'item', itemId: 'fairy_steel_plate_legs', amount: 1 },
        { type: 'item', itemId: 'fairy_steel_chest_plate', amount: 1 },
        { type: 'item', itemId: 'fairy_steel_helmet', amount: 1 },
        { type: 'item', itemId: 'fairy_steel_dagger', amount: 1 },
        { type: 'item', itemId: 'fairy_steel_short_sword', amount: 1 },
        { type: 'item', itemId: 'fairy_steel_battle_axe', amount: 1 },
      ]
    }, {
      chance: 1 / 16,
      rewards: [
        { type: 'item', itemId: 'fairy_steel_dwarven_idol', amount: 1 },
        { type: 'item', itemId: 'fairy_steel_horned_helmet', amount: 1 },
        { type: 'item', itemId: 'fairy_steel_mining_hammer', amount: 1 },
        { type: 'item', itemId: 'juniper', amount: 1 }
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'fairy_steel_scimitar', amount: 1 },
        { type: 'item', itemId: 'fairy_steel_broad_sword', amount: 1 }
      ]
    }])
  },

  boss: {
    enemy: { id: 'boss_phenoix', amount: 1 },
    rewards: orderLootTable([{
      chance: 1,
      rewards: [
        { type: 'item', itemId: 'fairy_steel_scimitar', amount: 1 },
        { type: 'item', itemId: 'fairy_steel_broad_sword', amount: 1 }
      ]
    }])
  },

  floorRewards: [
    {
      type: 'item',
      itemId: 'fairy_steel_dwarven_idol',
      icon: ITEMS['fairy_steel_dwarven_idol'].icon,
      name: ITEMS['fairy_steel_dwarven_idol'].name,
      amount: 10,
      baseStats: ITEMS['fairy_steel_dwarven_idol'].stats,
      extraStats: ITEMS['fairy_steel_dwarven_idol'].extraStats
    }
  ]
}
