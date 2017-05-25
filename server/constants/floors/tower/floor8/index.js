import { orderLootTable } from '/server/constants/enemies/lootTables/index.js';
import { ITEMS } from '/server/constants/items/index';
import { LEVEL_EIGHT_LOOT_TABLE } from '/server/constants/floors/levels/level8';

export const TOWER_FLOOR_8 = {
  1: {
    name: 'Long Grass',
    enemies: ['snake'],
    rewards: []
  },
  2: {
    name: 'White Beach',
    enemies: ['crab'],
    rewards: LEVEL_EIGHT_LOOT_TABLE
  },
  3: {
    name: 'Oak Tree',
    enemies: ['bird'],
    rewards: orderLootTable(LEVEL_EIGHT_LOOT_TABLE.concat([{
      chance: 1 / 16,
      rewards: [
        { type: 'item', itemId: 'oak_seed', amount: 3 },
        { type: 'item', itemId: 'oak_log', amount: 20 },
        { type: 'item', itemId: 'oak_staff', amount: 1 }
      ]
    }]))
  },
  4: {
    name: 'Place of cobalt',
    enemies: ['cobalt_spirit'],
    rewards: orderLootTable(LEVEL_EIGHT_LOOT_TABLE.concat([{
      chance: 1 / 16,
      rewards: [
        { type: 'item', itemId: 'cobalt_essence', amount: 1 }
      ]
    }]))
  },
  5: {
    name: 'Carrot Patch',
    enemies: ['rabbit'],
    rewards: orderLootTable(LEVEL_EIGHT_LOOT_TABLE.concat([{
      chance: 1 / 4,
      rewards: [
        { type: 'item', itemId: 'carrot', amount: 1 }
      ]
    }]))
  },
  6: {
    name: 'Suspicious Mine',
    enemies: ['angry_miner'],
    rewards: orderLootTable([{
      chance: 1 / 4,
      rewards: [
        { type: 'item', itemId: 'ore_cobalt', amount: 1 },
        { type: 'item', itemId: 'mahogany_log', amount: 1 }
      ]
    }, {
      chance: 1 / 8,
      rewards: [
        { type: 'item', itemId: 'cobalt_bar', amount: 1 }
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'cobalt_dwarven_idol', amount: 1 },
        { type: 'item', itemId: 'cobalt_mining_hammer', amount: 1 }
      ]
    }])
  },
  7: {
    name: 'Magicians Headquarters',
    enemies: ['blue_mage'],
    rewards: [{
      chance: 1 / 256,
      rewards: [
        { type: 'item', itemId: 'feeding_frenzy_tome', amount: 1 }
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'cobalt_scimitar', amount: 1 },
        { type: 'item', itemId: 'cobalt_broad_sword', amount: 1 },
        { type: 'item', itemId: 'cobalt_horned_helmet', amount: 1 }
      ]
    }]
  },

  boss: {
    enemy: { id: 'boss_phoenix', amount: 1 },
    rewards: LEVEL_EIGHT_LOOT_TABLE
  },

  floorRewards: [
    {
      type: 'item',
      itemId: 'fairy_steel_dwarven_idol',
      icon: ITEMS['fairy_steel_dwarven_idol'].icon,
      name: ITEMS['fairy_steel_dwarven_idol'].name,
      baseStats: ITEMS['fairy_steel_dwarven_idol'].stats,
      extraStats: ITEMS['fairy_steel_dwarven_idol'].extraStats
    },
    {
      type: 'gold',
      amount: 150000
    }
  ]
}
