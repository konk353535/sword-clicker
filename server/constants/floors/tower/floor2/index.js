import { orderLootTable } from '/server/constants/enemies/lootTables/index.js';
import { ITEMS } from '/server/constants/items/index';
import { LEVEL_TWO_LOOT_TABLE } from '/server/constants/floors/levels/level2';

export const TOWER_FLOOR_2 = {
  1: {
    name: 'Derelict House',
    enemies: ['rat'],
    rewards: []
  },
  2: {
    name: 'Cliffs Edge',
    enemies: ['bird'],
    rewards: LEVEL_TWO_LOOT_TABLE
  },
  3: {
    name: 'Mossy Garden',
    enemies: ['snail'],
    rewards: LEVEL_TWO_LOOT_TABLE
  },
  4: {
    name: 'Minor Earth Alter',
    enemies: ['brown_mage'],
    rewards: orderLootTable(LEVEL_TWO_LOOT_TABLE.concat([{
      chance: 1 / 16,
      rewards: [
        { type: 'item', itemId: 'brown_wizard_hat', amount: 1 },
        { type: 'item', itemId: 'brown_wizard_shirt', amount: 1 },
        { type: 'item', itemId: 'brown_wizard_shorts', amount: 1 }
      ]
    }]))
  },
  5: {
    name: 'Hidden Cove',
    enemies: ['echidna'],
    rewards: orderLootTable(LEVEL_TWO_LOOT_TABLE.concat([{
      chance: 1 / 256,
      rewards: [
        { type: 'item', itemId: 'spiked_armor_1_tome', amount: 1 }
      ]
    }]))
  },
  6: {
    name: 'Suspicious Mine',
    enemies: ['angry_miner'],
    rewards: orderLootTable([{
      chance: 1 / 4,
      rewards: [
        { type: 'item', itemId: 'ore_coal', amount: 1 },
        { type: 'item', itemId: 'ore_iron', amount: 1 },
        { type: 'item', itemId: 'beech_log', amount: 1 }
      ]
    }, {
      chance: 1 / 8,
      rewards: [
        { type: 'item', itemId: 'iron_bar', amount: 1 }
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'iron_dwarven_idol', amount: 1 },
        { type: 'item', itemId: 'iron_mining_hammer', amount: 1 }
      ]
    }])
  },
  7: {
    name: 'Carrot Farm',
    enemies: ['rabbit'],
    rewards: [{
      chance: 1 / 64,
      rewards: [
        { type: 'item', itemId: 'carrot', amount: 1 }
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'iron_scimitar', amount: 1 },
        { type: 'item', itemId: 'iron_broad_sword', amount: 1 },
        { type: 'item', itemId: 'iron_horned_helmet', amount: 1 }
      ]
    }]
  },

  boss: {
    enemy: { id: 'boss_cobra', amount: 1 },
    rewards: LEVEL_TWO_LOOT_TABLE
  },

  floorRewards: [
    {
      type: 'item',
      itemId: 'steel_dwarven_idol',
      icon: ITEMS['steel_dwarven_idol'].icon,
      name: ITEMS['steel_dwarven_idol'].name,
      baseStats: ITEMS['steel_dwarven_idol'].stats,
      extraStats: ITEMS['steel_dwarven_idol'].extraStats
    },
    {
      type: 'gold',
      amount: 3000
    }
  ]
}
