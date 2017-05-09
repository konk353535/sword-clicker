import { orderLootTable } from '/server/constants/enemies/lootTables/index.js';
import { ITEMS } from '/server/constants/items/index';

export const TOWER_FLOOR_1 = {
  easy: {
    name: 'Grass Fields',
    image: 'grassField.jpeg',
    floor: 1,
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
    rewards: orderLootTable([{
      chance: 1 / 2,
      rewards: [{ type: 'gold', amount: 50 }]
    }, {
      chance: 1 / 4,
      rewards: [
        { type: 'item', itemId: 'copper_bar', amount: 2 },
        { type: 'item', itemId: 'pine_log', amount: 20 }
      ]
    }, {
      chance: 1 / 16,
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
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'copper_horned_helmet', amount: 1 },
        { type: 'item', itemId: 'copper_mining_hammer', amount: 1 },
        { type: 'item', itemId: 'copper_dwarven_idol', amount: 1 }
      ]
    }])
  },

  veryHard: {
    name: 'Misty Ruins',
    image: 'mistyRuins.jpeg',
    floor: 1,
    rewards: orderLootTable([{
      chance: 1 / 4,
      rewards: [{ type: 'gold', amount: 100 }]
    }, {
      chance: 1 / 8,
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
    }, {
      chance: 1 / 16,
      rewards: [
        { type: 'item', itemId: 'copper_dwarven_idol', amount: 1 },
        { type: 'item', itemId: 'copper_horned_helmet', amount: 1 },
        { type: 'item', itemId: 'copper_mining_hammer', amount: 1 }
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'copper_scimitar', amount: 1 },
        { type: 'item', itemId: 'copper_broad_sword', amount: 1 }
      ]
    }, {
      chance: 1 / 128,
      rewards: [
        { type: 'item', itemId: 'phantom_strikes_level_1_tome', amount: 1 },
        { type: 'item', itemId: 'jade', amount: 1 }
      ]
    }])
  },

  boss: {
    enemy: { id: 'boss_cougar', amount: 1 },
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
