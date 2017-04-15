import { orderLootTable } from '/server/constants/enemies/lootTables/index.js';


export const TOWER_FLOOR_4 = {
  easy: {
    name: 'Jungle Bridge',
    image: 'jungleBridge.jpeg',
    floor: 4,
    possibleBattles: [
      { enemies: [{ id: 'e_cat', amount: 1 }] },
      { enemies: [{ id: 'e_turtle', amount: 1 }] },
      { enemies: [{ id: 'e_boar', amount: 1 }] },
      { enemies: [{ id: 'e_goat', amount: 1 }] },
      { enemies: [{ id: 'e_fox', amount: 1 }] }
    ],
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
    possibleBattles: [
      { enemies: [{ id: 'wolf', amount: 1 }, { id: 'e_cat', amount: 1}] },
      { enemies: [{ id: 'beaver', amount: 1 }, { id: 'e_turtle', amount: 1}] },
      { enemies: [{ id: 'eagle', amount: 1 }, { id: 'e_boar', amount: 1}] },
      { enemies: [{ id: 'kangaroo', amount: 1 }, { id: 'e_goat', amount: 1}] },
      { enemies: [{ id: 'jellyFish', amount: 1 }, { id: 'e_fox', amount: 1}] }
    ],
    rewards: orderLootTable([{
      chance: 1 / 8,
      rewards: [{ type: 'gold', amount: 400 }]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'carbon_bar', amount: 2 },
        { type: 'item', itemId: 'oak_log', amount: 15 },
        { type: 'item', itemId: 'mithril_essence', amount: 1 }
      ]
    }])
  },

  veryHard: {
    name: 'Quartz Lake',
    image: 'quartzLake.jpeg',
    floor: 4,
    possibleBattles: [
      { enemies: [{ id: 'e_cat', amount: 1 }, { id: 'e_wolf', amount: 1}] },
      { enemies: [{ id: 'e_turtle', amount: 1 }, { id: 'e_beaver', amount: 1}] },
      { enemies: [{ id: 'e_boar', amount: 1 }, { id: 'e_eagle', amount: 1}] },
      { enemies: [{ id: 'e_goat', amount: 1 }, { id: 'e_kangaroo', amount: 1}] },
      { enemies: [{ id: 'e_fox', amount: 1 }, { id: 'e_jellyFish', amount: 1}] }
    ],
    rewards: orderLootTable([{
      chance: 1 / 8,
      rewards: [{ type: 'gold', amount: 800 }]
    }, {
      chance: 1 / 32,
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
        { type: 'item', itemId: 'mithril_essence', amount: 3 }
      ]
    }])
  },

  boss: {
    possibleBattles: [{
      enemies: [
        { id: 'e_wolf', amount: 1 },
        { id: 'e_beaver', amount: 1 },
        { id: 'e_eagle', amount: 1 },
        { id: 'e_kangaroo', amount: 1 },
        { id: 'e_jellyFish', amount: 1 },
        { id: 'boss_spartan', amount: 1 }
      ]
    }],
    rewards: orderLootTable([{
      chance: 1,
      rewards: [
        { type: 'item', itemId: 'carbon_scimitar', amount: 1 },
        { type: 'item', itemId: 'carbon_broad_sword', amount: 1 }
      ]
    }])
  }
}
