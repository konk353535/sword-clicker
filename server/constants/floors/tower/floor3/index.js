import { orderLootTable } from '/server/constants/enemies/lootTables/index.js';
import { ITEMS } from '/server/constants/items/index';

export const TOWER_FLOOR_3 = {
  easy: {
    name: 'Poppy Field',
    image: 'poppyField.jpg',
    floor: 3,
    possibleBattles: [
      { enemies: [{ id: 'e_spider', amount: 1 }] },
      { enemies: [{ id: 'e_snake', amount: 1 }] },
      { enemies: [{ id: 'e_falcon', amount: 1 }] },
      { enemies: [{ id: 'e_skunk', amount: 1 }] },
      { enemies: [{ id: 'e_lizard', amount: 1 }] }
    ],
    rewards: orderLootTable([{
      chance: 1 / 8,
      rewards: [
        { type: 'item', itemId: 'ore_steel', amount: 3 },
        { type: 'gold', amount: 200 }
      ]
    }, {
      chance: 1 / 128,
      rewards: [
        { type: 'item', itemId: 'juniper', amount: 1 }
      ]
    }])
  },

  hard: {
    name: 'Mysterious Woods',
    image: 'mysteriousWoods.jpeg',
    floor: 3,
    possibleBattles: [
      { enemies: [{ id: 'cat', amount: 1 }, { id: 'e_spider', amount: 1}] },
      { enemies: [{ id: 'turtle', amount: 1 }, { id: 'e_snake', amount: 1}] },
      { enemies: [{ id: 'boar', amount: 1 }, { id: 'e_falcon', amount: 1}] },
      { enemies: [{ id: 'goat', amount: 1 }, { id: 'e_skunk', amount: 1}] },
      { enemies: [{ id: 'fox', amount: 1 }, { id: 'e_lizard', amount: 1}] }
    ],
    rewards: orderLootTable([{
      chance: 1 / 2,
      rewards: [{ type: 'gold', amount: 300 }]
    }, {
      chance: 1 / 4,
      rewards: [
        { type: 'item', itemId: 'steel_bar', amount: 2 },
        { type: 'item', itemId: 'ash_log', amount: 20 }
      ]
    }, {
      chance: 1 / 16,
      rewards: [
        { type: 'item', itemId: 'steel_shield', amount: 1 },
        { type: 'item', itemId: 'steel_spear', amount: 1 },
        { type: 'item', itemId: 'steel_long_sword', amount: 1 },
        { type: 'item', itemId: 'steel_plate_legs', amount: 1 },
        { type: 'item', itemId: 'steel_chest_plate', amount: 1 },
        { type: 'item', itemId: 'steel_helmet', amount: 1 },
        { type: 'item', itemId: 'steel_dagger', amount: 1 },
        { type: 'item', itemId: 'steel_short_sword', amount: 1 },
        { type: 'item', itemId: 'steel_battle_axe', amount: 1 }
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'steel_horned_helmet', amount: 1 },
        { type: 'item', itemId: 'steel_mining_hammer', amount: 1 },
        { type: 'item', itemId: 'steel_dwarven_idol', amount: 1 }
      ]
    }, {
      chance: 1 / 64,
      rewards: [
        { type: 'item', itemId: 'juniper', amount: 1 }
      ]
    }])
  },

  veryHard: {
    name: 'Green Lake',
    image: 'greenLake.jpeg',
    floor: 3,
    possibleBattles: [
      { enemies: [{ id: 'e_cat', amount: 1 }, { id: 'e_spider', amount: 1}] },
      { enemies: [{ id: 'e_turtle', amount: 1 }, { id: 'e_snake', amount: 1}] },
      { enemies: [{ id: 'e_boar', amount: 1 }, { id: 'e_falcon', amount: 1}] },
      { enemies: [{ id: 'e_goat', amount: 1 }, { id: 'e_skunk', amount: 1}] },
      { enemies: [{ id: 'e_fox', amount: 1 }, { id: 'e_lizard', amount: 1}] }
    ],
    rewards: orderLootTable([{
      chance: 1 / 4,
      rewards: [{ type: 'gold', amount: 600 }]
    }, {
      chance: 1 / 8,
      rewards: [
        { type: 'item', itemId: 'steel_shield', amount: 1 },
        { type: 'item', itemId: 'steel_spear', amount: 1 },
        { type: 'item', itemId: 'steel_long_sword', amount: 1 },
        { type: 'item', itemId: 'steel_plate_legs', amount: 1 },
        { type: 'item', itemId: 'steel_chest_plate', amount: 1 },
        { type: 'item', itemId: 'steel_helmet', amount: 1 },
        { type: 'item', itemId: 'steel_dagger', amount: 1 },
        { type: 'item', itemId: 'steel_short_sword', amount: 1 },
        { type: 'item', itemId: 'steel_battle_axe', amount: 1 },
      ]
    }, {
      chance: 1 / 16,
      rewards: [
        { type: 'item', itemId: 'steel_dwarven_idol', amount: 1 },
        { type: 'item', itemId: 'steel_horned_helmet', amount: 1 },
        { type: 'item', itemId: 'steel_mining_hammer', amount: 1 },
        { type: 'item', itemId: 'mithril_essence', amount: 1 }
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'steel_scimitar', amount: 1 },
        { type: 'item', itemId: 'steel_broad_sword', amount: 1 },
        { type: 'item', itemId: 'juniper', amount: 1 }
      ]
    }])
  },

  boss: {
    possibleBattles: [{
      enemies: [
        { id: 'boss_bone_warrior', amount: 1 }
      ]
    }],
    rewards: orderLootTable([{
      chance: 1,
      rewards: [
        { type: 'item', itemId: 'steel_scimitar', amount: 1 },
        { type: 'item', itemId: 'steel_broad_sword', amount: 1 }
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
