import { orderLootTable } from '/server/constants/enemies/lootTables/index.js';
import { ITEMS } from '/server/constants/items/index';

export const TOWER_FLOOR_2 = {
  easy: {
    name: 'Greek Garden',
    image: 'greekGarden.jpeg',
    floor: 2,
    possibleBattles: [
      { enemies: [{ id: 'e_rat', amount: 3 }] },
      { enemies: [{ id: 'e_rabbit', amount: 1 }] },
      { enemies: [{ id: 'e_crab', amount: 1 }] },
      { enemies: [{ id: 'e_snail', amount: 1 }] },
      { enemies: [{ id: 'e_wasp', amount: 1 }] }
    ],
    rewards: orderLootTable([{
      chance: 1 / 8,
      rewards: [
        { type: 'item', itemId: 'ore_iron', amount: 3 },
        { type: 'gold', amount: 100 }
      ]
    }])
  },

  hard: {
    name: 'Rocky Mountain',
    image: 'rockyMountain.jpeg',
    floor: 2,
    possibleBattles: [
      { enemies: [{ id: 'e_rat', amount: 3 }, { id: 'spider', amount: 1}] },
      { enemies: [{ id: 'e_rabbit', amount: 1 }, { id: 'snake', amount: 1}] },
      { enemies: [{ id: 'e_crab', amount: 1 }, { id: 'falcon', amount: 1}] },
      { enemies: [{ id: 'e_snail', amount: 1 }, { id: 'skunk', amount: 1}] },
      { enemies: [{ id: 'e_wasp', amount: 1 }, { id: 'lizard', amount: 1}] }
    ],
    rewards: orderLootTable([{
      chance: 1 / 8,
      rewards: [{ type: 'gold', amount: 200 }]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'iron_bar', amount: 2 },
        { type: 'item', itemId: 'beech_log', amount: 20 }
      ]
    }])
  },

  veryHard: {
    name: 'Desert',
    image: 'desertLandscape.jpeg',
    floor: 2,
    possibleBattles: [
      { enemies: [{ id: 'e_rat', amount: 3 }, { id: 'e_spider', amount: 1}] },
      { enemies: [{ id: 'e_rabbit', amount: 1 }, { id: 'e_snake', amount: 1}] },
      { enemies: [{ id: 'e_crab', amount: 1 }, { id: 'e_falcon', amount: 1}] },
      { enemies: [{ id: 'e_snail', amount: 1 }, { id: 'e_skunk', amount: 1}] },
      { enemies: [{ id: 'e_wasp', amount: 1 }, { id: 'e_lizard', amount: 1}] }
    ],
    rewards: orderLootTable([{
      chance: 1 / 8,
      rewards: [{ type: 'gold', amount: 400 }]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'iron_shield', amount: 1 },
        { type: 'item', itemId: 'iron_spear', amount: 1 },
        { type: 'item', itemId: 'iron_long_sword', amount: 1 },
        { type: 'item', itemId: 'iron_plate_legs', amount: 1 },
        { type: 'item', itemId: 'iron_chest_plate', amount: 1 },
        { type: 'item', itemId: 'iron_helmet', amount: 1 },
        { type: 'item', itemId: 'iron_dagger', amount: 1 },
        { type: 'item', itemId: 'iron_short_sword', amount: 1 },
        { type: 'item', itemId: 'iron_battle_axe', amount: 1 }
      ]
    }])
  },

  boss: {
    possibleBattles: [{
      enemies: [
        { id: 'boss_cobra', amount: 1 }
      ]
    }],
    rewards: orderLootTable([{
      chance: 1,
      rewards: [
        { type: 'item', itemId: 'iron_scimitar', amount: 1 },
        { type: 'item', itemId: 'iron_broad_sword', amount: 1 }
      ]
    }])
  },

  floorRewards: [
    {
      type: 'item',
      itemId: 'mithril_horned_helmet',
      icon: ITEMS['mithril_horned_helmet'].icon,
      name: ITEMS['mithril_horned_helmet'].name,
      amount: 15,
      baseStats: ITEMS['mithril_horned_helmet'].stats,
      extraStats: ITEMS['mithril_horned_helmet'].extraStats
    },
    {
      type: 'item',
      itemId: 'mithril_mining_hammer',
      icon: ITEMS['mithril_mining_hammer'].icon,
      name: ITEMS['mithril_mining_hammer'].name,
      amount: 15,
      baseStats: ITEMS['mithril_mining_hammer'].stats,
      extraStats: ITEMS['mithril_mining_hammer'].extraStats
    }
  ]
}
