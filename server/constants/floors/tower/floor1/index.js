import { orderLootTable } from '/server/constants/enemies/lootTables/index.js';
import { ITEMS } from '/server/constants/items/index';

export const TOWER_FLOOR_1 = {
  easy: {
    name: 'Grass Fields',
    image: 'grassField.jpeg',
    floor: 1,
    possibleBattles: [
      { enemies: [{ id: 'e_fly', amount: 3 }] },
      { enemies: [{ id: 'e_grasshopper', amount: 1 }] },
      { enemies: [{ id: 'e_mouse', amount: 1 }] },
      { enemies: [{ id: 'e_bee', amount: 1 }] },
      { enemies: [{ id: 'e_bird', amount: 1 }] }
    ],
    rewards: orderLootTable([{
      chance: 1 / 8,
      rewards: [
        { type: 'item', itemId: 'ore_stone', amount: 3 },
        { type: 'gold', amount: 25 }
      ]
    }])
  },

  hard: {
    name: 'Woods',
    image: 'woods.jpg',
    floor: 1,
    possibleBattles: [
      { enemies: [{ id: 'e_fly', amount: 3 }, { id: 'rat', amount: 3 }] },
      { enemies: [{ id: 'e_grasshopper', amount: 1 }, { id: 'rabbit', amount: 1 }] },
      { enemies: [{ id: 'e_mouse', amount: 1 }, { id: 'crab', amount: 1 }] },
      { enemies: [{ id: 'e_bee', amount: 1 }, { id: 'snail', amount: 1 }] },
      { enemies: [{ id: 'e_bird', amount: 1 }, { id: 'wasp', amount: 1 }] }
    ],
    rewards: orderLootTable([{
      chance: 1 / 8,
      rewards: [{ type: 'gold', amount: 50 }]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'copper_bar', amount: 2 },
        { type: 'item', itemId: 'pine_log', amount: 20 }
      ]
    }])
  },

  veryHard: {
    name: 'Misty Ruins',
    image: 'mistyRuins.jpeg',
    floor: 1,
    possibleBattles: [
      { enemies: [{ id: 'e_fly', amount: 3 }, { id: 'e_rat', amount: 3 }] },
      { enemies: [{ id: 'e_grasshopper', amount: 1 }, { id: 'e_rabbit', amount: 1 }] },
      { enemies: [{ id: 'e_mouse', amount: 1 }, { id: 'e_crab', amount: 1 }] },
      { enemies: [{ id: 'e_bee', amount: 1 }, { id: 'e_snail', amount: 1 }] },
      { enemies: [{ id: 'e_bird', amount: 1 }, { id: 'e_wasp', amount: 1 }] }
    ],
    rewards: orderLootTable([{
      chance: 1 / 8,
      rewards: [{ type: 'gold', amount: 100 }]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'copper_shield', amount: 1 },
        { type: 'item', itemId: 'copper_spear', amount: 1 },
        { type: 'item', itemId: 'copper_long_sword', amount: 1 },
        { type: 'item', itemId: 'copper_plate_legs', amount: 1 },
        { type: 'item', itemId: 'copper_chest_plate', amount: 1 },
        { type: 'item', itemId: 'copper_helmet', amount: 1 },
        { type: 'item', itemId: 'copper_dagger', amount: 1 },
        { type: 'item', itemId: 'copper_short_sword', amount: 1 },
        { type: 'item', itemId: 'copper_battle_axe', amount: 1 }
      ]
    }])
  },

  boss: {
    possibleBattles: [{
      enemies: [
        { id: 'boss_cougar', amount: 1 }
      ]
    }],
    rewards: orderLootTable([{
      chance: 1,
      rewards: [
        { type: 'item', itemId: 'copper_scimitar', amount: 1 },
        { type: 'item', itemId: 'copper_broad_sword', amount: 1 }
      ]
    }])
  },

  floorRewards: [
    {
      type: 'item',
      itemId: 'steel_dwarven_idol',
      icon: ITEMS['steel_dwarven_idol'].icon,
      name: ITEMS['steel_dwarven_idol'].name,
      amount: 20,
      baseStats: ITEMS['steel_dwarven_idol'].stats,
      extraStats: ITEMS['steel_dwarven_idol'].extraStats
    },
    {
      type: 'item',
      itemId: 'dwarven_hammer',
      icon: ITEMS['dwarven_hammer'].icon,
      name: ITEMS['dwarven_hammer'].name,
      amount: 10,
      baseStats: ITEMS['dwarven_hammer'].stats,
      extraStats: ITEMS['dwarven_hammer'].extraStats
    }
  ]
}
