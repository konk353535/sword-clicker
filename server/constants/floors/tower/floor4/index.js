import { orderLootTable } from '/server/constants/enemies/lootTables/index.js';
import { ITEMS } from '/server/constants/items/index';

export const TOWER_FLOOR_4 = {
  easy: {
    name: 'Jungle Bridge',
    image: 'jungleBridge.jpeg',
    floor: 4,
    rewards: orderLootTable([{
      chance: 1 / 8,
      rewards: [
        { type: 'item', itemId: 'ore_carbon', amount: 3 },
        { type: 'gold', amount: 250 }
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
    floor: 4,
    rewards: orderLootTable([{
      chance: 1 / 2,
      rewards: [{ type: 'gold', amount: 400 }]
    }, {
      chance: 1 / 4,
      rewards: [
        { type: 'item', itemId: 'carbon_bar', amount: 2 },
        { type: 'item', itemId: 'oak_log', amount: 15 },
        { type: 'item', itemId: 'mithril_essence', amount: 1 }
      ]
    }, {
      chance: 1 / 16,
      rewards: [
        { type: 'item', itemId: 'carbon_shield', amount: 1 },
        { type: 'item', itemId: 'carbon_spear', amount: 1 },
        { type: 'item', itemId: 'carbon_long_sword', amount: 1 },
        { type: 'item', itemId: 'carbon_plate_legs', amount: 1 },
        { type: 'item', itemId: 'carbon_chest_plate', amount: 1 },
        { type: 'item', itemId: 'carbon_helmet', amount: 1 },
        { type: 'item', itemId: 'carbon_dagger', amount: 1 },
        { type: 'item', itemId: 'carbon_short_sword', amount: 1 },
        { type: 'item', itemId: 'carbon_battle_axe', amount: 1 }
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'carbon_horned_helmet', amount: 1 },
        { type: 'item', itemId: 'carbon_mining_hammer', amount: 1 },
        { type: 'item', itemId: 'carbon_dwarven_idol', amount: 1 }
      ]
    }])
  },

  veryHard: {
    name: 'Quartz Lake',
    image: 'quartzLake.jpeg',
    floor: 4,
    rewards: orderLootTable([{
      chance: 1 / 4,
      rewards: [{ type: 'gold', amount: 800 }]
    }, {
      chance: 1 / 8,
      rewards: [
        { type: 'item', itemId: 'carbon_shield', amount: 1 },
        { type: 'item', itemId: 'carbon_spear', amount: 1 },
        { type: 'item', itemId: 'carbon_long_sword', amount: 1 },
        { type: 'item', itemId: 'carbon_plate_legs', amount: 1 },
        { type: 'item', itemId: 'carbon_chest_plate', amount: 1 },
        { type: 'item', itemId: 'carbon_helmet', amount: 1 },
        { type: 'item', itemId: 'carbon_dagger', amount: 1 },
        { type: 'item', itemId: 'carbon_short_sword', amount: 1 },
        { type: 'item', itemId: 'carbon_battle_axe', amount: 1 },
      ]
    }, {
      chance: 1 / 16,
      rewards: [
        { type: 'item', itemId: 'carbon_dwarven_idol', amount: 1 },
        { type: 'item', itemId: 'carbon_horned_helmet', amount: 1 },
        { type: 'item', itemId: 'carbon_mining_hammer', amount: 1 },
        { type: 'item', itemId: 'mithril_essence', amount: 3 },
        { type: 'item', itemId: 'juniper', amount: 1 }
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'carbon_scimitar', amount: 1 },
        { type: 'item', itemId: 'carbon_broad_sword', amount: 1 }
      ]
    }])
  },

  boss: {
    enemy: { id: 'boss_spartan', amount: 1 },
    rewards: orderLootTable([{
      chance: 1,
      rewards: [
        { type: 'item', itemId: 'carbon_scimitar', amount: 1 },
        { type: 'item', itemId: 'carbon_broad_sword', amount: 1 }
      ]
    }])
  },

  floorRewards: [
    {
      type: 'item',
      itemId: 'mithril_dwarven_idol',
      icon: ITEMS['mithril_dwarven_idol'].icon,
      name: ITEMS['mithril_dwarven_idol'].name,
      amount: 30,
      baseStats: ITEMS['mithril_dwarven_idol'].stats,
      extraStats: ITEMS['mithril_dwarven_idol'].extraStats
    }
  ]
}
