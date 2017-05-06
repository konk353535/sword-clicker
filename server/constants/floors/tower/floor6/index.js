import { orderLootTable } from '/server/constants/enemies/lootTables/index.js';
import { ITEMS } from '/server/constants/items/index';

export const TOWER_FLOOR_6 = {
  easy: {
    name: 'Jungle Bridge',
    image: 'jungleBridge.jpeg',
    floor: 6,
    rewards: orderLootTable([{
      chance: 1 / 8,
      rewards: [
        { type: 'item', itemId: 'ore_adamantium', amount: 3 },
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
    floor: 6,
    rewards: orderLootTable([{
      chance: 1 / 2,
      rewards: [{ type: 'gold', amount: 400 }]
    }, {
      chance: 1 / 4,
      rewards: [
        { type: 'item', itemId: 'adamantium_bar', amount: 2 },
        { type: 'item', itemId: 'mahogany_log', amount: 15 }
      ]
    }, {
      chance: 1 / 16,
      rewards: [
        { type: 'item', itemId: 'orichalcum_essence', amount: 1 },
        { type: 'item', itemId: 'adamantium_shield', amount: 1 },
        { type: 'item', itemId: 'adamantium_spear', amount: 1 },
        { type: 'item', itemId: 'adamantium_long_sword', amount: 1 },
        { type: 'item', itemId: 'adamantium_plate_legs', amount: 1 },
        { type: 'item', itemId: 'adamantium_chest_plate', amount: 1 },
        { type: 'item', itemId: 'adamantium_helmet', amount: 1 },
        { type: 'item', itemId: 'adamantium_dagger', amount: 1 },
        { type: 'item', itemId: 'adamantium_short_sword', amount: 1 },
        { type: 'item', itemId: 'adamantium_battle_axe', amount: 1 }
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'adamantium_horned_helmet', amount: 1 },
        { type: 'item', itemId: 'adamantium_mining_hammer', amount: 1 },
        { type: 'item', itemId: 'adamantium_dwarven_idol', amount: 1 }
      ]
    }])
  },

  veryHard: {
    name: 'Quartz Lake',
    image: 'quartzLake.jpeg',
    floor: 6,
    rewards: orderLootTable([{
      chance: 1 / 4,
      rewards: [
        { type: 'gold', amount: 800 },
        { type: 'item', itemId: 'orichalcum_essence', amount: 1 },
      ]
    }, {
      chance: 1 / 8,
      rewards: [
        { type: 'item', itemId: 'adamantium_shield', amount: 1 },
        { type: 'item', itemId: 'adamantium_spear', amount: 1 },
        { type: 'item', itemId: 'adamantium_long_sword', amount: 1 },
        { type: 'item', itemId: 'adamantium_plate_legs', amount: 1 },
        { type: 'item', itemId: 'adamantium_chest_plate', amount: 1 },
        { type: 'item', itemId: 'adamantium_helmet', amount: 1 },
        { type: 'item', itemId: 'adamantium_dagger', amount: 1 },
        { type: 'item', itemId: 'adamantium_short_sword', amount: 1 },
        { type: 'item', itemId: 'adamantium_battle_axe', amount: 1 },
      ]
    }, {
      chance: 1 / 16,
      rewards: [
        { type: 'item', itemId: 'adamantium_dwarven_idol', amount: 1 },
        { type: 'item', itemId: 'adamantium_horned_helmet', amount: 1 },
        { type: 'item', itemId: 'adamantium_mining_hammer', amount: 1 },
        { type: 'item', itemId: 'juniper', amount: 1 }
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'adamantium_scimitar', amount: 1 },
        { type: 'item', itemId: 'adamantium_broad_sword', amount: 1 }
      ]
    }])
  },

  boss: {
    enemy: { id: 'boss_goblin', amount: 1 },
    rewards: orderLootTable([{
      chance: 1,
      rewards: [
        { type: 'item', itemId: 'adamantium_scimitar', amount: 1 },
        { type: 'item', itemId: 'adamantium_broad_sword', amount: 1 }
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
