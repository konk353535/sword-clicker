import { orderLootTable } from '/server/constants/enemies/lootTables/index.js';
import { ITEMS } from '/server/constants/items/index';

export const TOWER_FLOOR_7 = {
  easy: {
    name: 'Jungle Bridge',
    image: 'jungleBridge.jpeg',
    floor: 7,
    rewards: orderLootTable([{
      chance: 1 / 8,
      rewards: [
        { type: 'item', itemId: 'ore_orichalcum', amount: 3 },
        { type: 'gold', amount: 500 }
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'chill_seed', amount: 1 }
      ]
    }])
  },

  hard: {
    name: 'Lone Island',
    image: 'loneIsland.jpeg',
    floor: 7,
    rewards: orderLootTable([{
      chance: 1 / 2,
      rewards: [{ type: 'gold', amount: 400 }]
    }, {
      chance: 1 / 4,
      rewards: [
        { type: 'item', itemId: 'orichalcum_bar', amount: 2 },
        { type: 'item', itemId: 'cherry_log', amount: 15 }
      ]
    }, {
      chance: 1 / 16,
      rewards: [
        { type: 'item', itemId: 'cobalt_essence', amount: 1 },
        { type: 'item', itemId: 'orichalcum_shield', amount: 1 },
        { type: 'item', itemId: 'orichalcum_spear', amount: 1 },
        { type: 'item', itemId: 'orichalcum_long_sword', amount: 1 },
        { type: 'item', itemId: 'orichalcum_plate_legs', amount: 1 },
        { type: 'item', itemId: 'orichalcum_chest_plate', amount: 1 },
        { type: 'item', itemId: 'orichalcum_helmet', amount: 1 },
        { type: 'item', itemId: 'orichalcum_dagger', amount: 1 },
        { type: 'item', itemId: 'orichalcum_short_sword', amount: 1 },
        { type: 'item', itemId: 'orichalcum_battle_axe', amount: 1 }
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'orichalcum_horned_helmet', amount: 1 },
        { type: 'item', itemId: 'orichalcum_mining_hammer', amount: 1 },
        { type: 'item', itemId: 'orichalcum_dwarven_idol', amount: 1 }
      ]
    }])
  },

  veryHard: {
    name: 'Quartz Lake',
    image: 'quartzLake.jpeg',
    floor: 7,
    rewards: orderLootTable([{
      chance: 1 / 4,
      rewards: [
        { type: 'gold', amount: 800 },
        { type: 'item', itemId: 'cobalt_essence', amount: 1 },
      ]
    }, {
      chance: 1 / 8,
      rewards: [
        { type: 'item', itemId: 'orichalcum_shield', amount: 1 },
        { type: 'item', itemId: 'orichalcum_spear', amount: 1 },
        { type: 'item', itemId: 'orichalcum_long_sword', amount: 1 },
        { type: 'item', itemId: 'orichalcum_plate_legs', amount: 1 },
        { type: 'item', itemId: 'orichalcum_chest_plate', amount: 1 },
        { type: 'item', itemId: 'orichalcum_helmet', amount: 1 },
        { type: 'item', itemId: 'orichalcum_dagger', amount: 1 },
        { type: 'item', itemId: 'orichalcum_short_sword', amount: 1 },
        { type: 'item', itemId: 'orichalcum_battle_axe', amount: 1 },
      ]
    }, {
      chance: 1 / 16,
      rewards: [
        { type: 'item', itemId: 'orichalcum_dwarven_idol', amount: 1 },
        { type: 'item', itemId: 'orichalcum_horned_helmet', amount: 1 },
        { type: 'item', itemId: 'orichalcum_mining_hammer', amount: 1 }
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'celery_seed', amount: 1 },
        { type: 'item', itemId: 'orichalcum_scimitar', amount: 1 },
        { type: 'item', itemId: 'orichalcum_broad_sword', amount: 1 }
      ]
    }])
  },

  boss: {
    enemy: { id: 'boss_ogre', amount: 1 },
    rewards: orderLootTable([{
      chance: 1,
      rewards: [
        { type: 'item', itemId: 'orichalcum_scimitar', amount: 1 },
        { type: 'item', itemId: 'orichalcum_broad_sword', amount: 1 }
      ]
    }])
  },

  floorRewards: [
    {
      type: 'item',
      itemId: 'orichalcum_dwarven_idol',
      icon: ITEMS['orichalcum_dwarven_idol'].icon,
      name: ITEMS['orichalcum_dwarven_idol'].name,
      amount: 10,
      baseStats: ITEMS['orichalcum_dwarven_idol'].stats,
      extraStats: ITEMS['orichalcum_dwarven_idol'].extraStats
    }
  ]
}
