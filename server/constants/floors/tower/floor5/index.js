import { orderLootTable } from '/server/constants/enemies/lootTables/index.js';
import { ITEMS } from '/server/constants/items/index';

export const TOWER_FLOOR_5 = {
  easy: {
    name: 'Jungle Bridge',
    image: 'jungleBridge.jpeg',
    floor: 5,
    rewards: orderLootTable([{
      chance: 1 / 8,
      rewards: [
        { type: 'item', itemId: 'ore_mithril', amount: 3 },
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
    floor: 5,
    rewards: orderLootTable([{
      chance: 1 / 2,
      rewards: [{ type: 'gold', amount: 400 }]
    }, {
      chance: 1 / 4,
      rewards: [
        { type: 'item', itemId: 'carbon_bar', amount: 2 },
        { type: 'item', itemId: 'maple_log', amount: 15 }
      ]
    }, {
      chance: 1 / 16,
      rewards: [
        { type: 'item', itemId: 'adamantium_essence', amount: 1 },
        { type: 'item', itemId: 'mithril_shield', amount: 1 },
        { type: 'item', itemId: 'mithril_spear', amount: 1 },
        { type: 'item', itemId: 'mithril_long_sword', amount: 1 },
        { type: 'item', itemId: 'mithril_plate_legs', amount: 1 },
        { type: 'item', itemId: 'mithril_chest_plate', amount: 1 },
        { type: 'item', itemId: 'mithril_helmet', amount: 1 },
        { type: 'item', itemId: 'mithril_dagger', amount: 1 },
        { type: 'item', itemId: 'mithril_short_sword', amount: 1 },
        { type: 'item', itemId: 'mithril_battle_axe', amount: 1 }
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'mithril_horned_helmet', amount: 1 },
        { type: 'item', itemId: 'mithril_mining_hammer', amount: 1 },
        { type: 'item', itemId: 'mithril_dwarven_idol', amount: 1 }
      ]
    }])
  },

  veryHard: {
    name: 'Quartz Lake',
    image: 'quartzLake.jpeg',
    floor: 5,
    rewards: orderLootTable([{
      chance: 1 / 4,
      rewards: [{ type: 'gold', amount: 800 }]
    }, {
      chance: 1 / 8,
      rewards: [
        { type: 'item', itemId: 'mithril_shield', amount: 1 },
        { type: 'item', itemId: 'mithril_spear', amount: 1 },
        { type: 'item', itemId: 'mithril_long_sword', amount: 1 },
        { type: 'item', itemId: 'mithril_plate_legs', amount: 1 },
        { type: 'item', itemId: 'mithril_chest_plate', amount: 1 },
        { type: 'item', itemId: 'mithril_helmet', amount: 1 },
        { type: 'item', itemId: 'mithril_dagger', amount: 1 },
        { type: 'item', itemId: 'mithril_short_sword', amount: 1 },
        { type: 'item', itemId: 'mithril_battle_axe', amount: 1 },
      ]
    }, {
      chance: 1 / 16,
      rewards: [
        { type: 'item', itemId: 'mithril_dwarven_idol', amount: 1 },
        { type: 'item', itemId: 'mithril_horned_helmet', amount: 1 },
        { type: 'item', itemId: 'mithril_mining_hammer', amount: 1 },
        { type: 'item', itemId: 'mithril_essence', amount: 3 },
        { type: 'item', itemId: 'juniper', amount: 1 }
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'mithril_scimitar', amount: 1 },
        { type: 'item', itemId: 'mithril_broad_sword', amount: 1 },
        { type: 'item', itemId: 'thirsting_saber', amount: 1 },
        { type: 'item', itemId: 'cursed_long_sword', amount: 1 },
        { type: 'item', itemId: 'spartan_shield', amount: 1 }
      ]
    }])
  },

  boss: {
    enemy: { id: 'boss_mage', amount: 1 },
    rewards: orderLootTable([{
      chance: 1,
      rewards: [
        { type: 'item', itemId: 'mithril_scimitar', amount: 1 },
        { type: 'item', itemId: 'mithril_broad_sword', amount: 1 }
      ]
    }])
  },

  floorRewards: [
    {
      type: 'item',
      itemId: 'thirsting_saber',
      icon: ITEMS['thirsting_saber'].icon,
      name: ITEMS['thirsting_saber'].name,
      amount: 10,
      baseStats: ITEMS['thirsting_saber'].stats,
      extraStats: ITEMS['thirsting_saber'].extraStats
    },
    {
      type: 'item',
      itemId: 'cursed_long_sword',
      icon: ITEMS['cursed_long_sword'].icon,
      name: ITEMS['cursed_long_sword'].name,
      amount: 10,
      baseStats: ITEMS['cursed_long_sword'].stats,
      extraStats: ITEMS['cursed_long_sword'].extraStats
    },
    {
      type: 'item',
      itemId: 'spartan_shield',
      icon: ITEMS['spartan_shield'].icon,
      name: ITEMS['spartan_shield'].name,
      amount: 10,
      baseStats: ITEMS['spartan_shield'].stats,
      extraStats: ITEMS['spartan_shield'].extraStats
    }
  ]
}
