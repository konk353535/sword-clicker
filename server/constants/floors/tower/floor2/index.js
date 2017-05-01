import { orderLootTable } from '/server/constants/enemies/lootTables/index.js';
import { ITEMS } from '/server/constants/items/index';

export const TOWER_FLOOR_2 = {
  easy: {
    name: 'Greek Garden',
    image: 'greekGarden.jpeg',
    floor: 2,
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
    rewards: orderLootTable([{
      chance: 1 / 2,
      rewards: [{ type: 'gold', amount: 200 }]
    }, {
      chance: 1 / 4,
      rewards: [
        { type: 'item', itemId: 'iron_bar', amount: 2 },
        { type: 'item', itemId: 'beech_log', amount: 20 }
      ]
    }, {
      chance: 1 / 16,
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
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'iron_horned_helmet', amount: 1 },
        { type: 'item', itemId: 'iron_mining_hammer', amount: 1 },
        { type: 'item', itemId: 'iron_dwarven_idol', amount: 1 }
      ]
    }])
  },

  veryHard: {
    name: 'Desert',
    image: 'desertLandscape.jpeg',
    floor: 2,
    rewards: orderLootTable([{
      chance: 1 / 2,
      rewards: [{ type: 'gold', amount: 400 }]
    }, {
      chance: 1 / 8,
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
    }, {
      chance: 1 / 16,
      rewards: [
        { type: 'item', itemId: 'iron_dwarven_idol', amount: 1 },
        { type: 'item', itemId: 'iron_horned_helmet', amount: 1 },
        { type: 'item', itemId: 'iron_mining_hammer', amount: 1 },
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'iron_scimitar', amount: 1 },
        { type: 'item', itemId: 'iron_broad_sword', amount: 1 }
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
      itemId: 'carbon_horned_helmet',
      icon: ITEMS['carbon_horned_helmet'].icon,
      name: ITEMS['carbon_horned_helmet'].name,
      amount: 15,
      baseStats: ITEMS['carbon_horned_helmet'].stats,
      extraStats: ITEMS['carbon_horned_helmet'].extraStats
    },
    {
      type: 'item',
      itemId: 'carbon_hammer',
      icon: ITEMS['carbon_mining_hammer'].icon,
      name: ITEMS['carbon_mining_hammer'].name,
      amount: 15,
      baseStats: ITEMS['carbon_mining_hammer'].stats,
      extraStats: ITEMS['carbon_mining_hammer'].extraStats
    }
  ]
}
