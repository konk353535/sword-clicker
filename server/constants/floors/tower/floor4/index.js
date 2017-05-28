import { orderLootTable } from '/server/constants/enemies/lootTables/index.js';
import { ITEMS } from '/server/constants/items/index';
import { LEVEL_FOUR_LOOT_TABLE } from '/server/constants/floors/levels/level4';

export const TOWER_FLOOR_4 = {
  1: {
    name: 'Lonely Oak',
    enemies: ['bird'],
    rewards: []
  },
  2: {
    name: 'Little Burrow',
    enemies: ['wombat'],
    rewards: LEVEL_FOUR_LOOT_TABLE
  },
  3: {
    name: 'Herb Garden',
    enemies: ['butterfly'],
    rewards: orderLootTable(LEVEL_FOUR_LOOT_TABLE.concat([{
      chance: 1 / 128,
      rewards: [
        { type: 'item', itemId: 'juniper', amount: 1 }
      ]
    }]))
  },
  4: {
    name: 'Deep Mine',
    enemies: ['goblin'],
    rewards: orderLootTable(LEVEL_FOUR_LOOT_TABLE.concat([{
      chance: 1 / 8,
      rewards: [
        { type: 'gold', amount: 750 }
      ]
    }]))
  },
  5: {
    name: 'Small Water Alter',
    enemies: ['blue_mage'],
    rewards: orderLootTable(LEVEL_FOUR_LOOT_TABLE.concat([{
      chance: 1 / 128,
      rewards: [ 
        { type: 'item', itemId: 'spirit_shield', amount: 1 }
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'blue_wizard_hat', amount: 1 },
        { type: 'item', itemId: 'blue_wizard_shirt', amount: 1 },
        { type: 'item', itemId: 'blue_wizard_shorts', amount: 1 }
      ]
    }]))
  },
  6: {
    name: 'Suspicious Mine',
    enemies: ['angry_miner'],
    rewards: orderLootTable([{
      chance: 1 / 4,
      rewards: [
        { type: 'item', itemId: 'ore_carbon', amount: 1 },
        { type: 'item', itemId: 'oak_log', amount: 1 }
      ]
    }, {
      chance: 1 / 8,
      rewards: [
        { type: 'item', itemId: 'carbon_bar', amount: 1 }
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'carbon_dwarven_idol', amount: 1 },
        { type: 'item', itemId: 'carbon_mining_hammer', amount: 1 }
      ]
    }])
  },
  7: {
    name: 'Earthen Mage',
    enemies: ['earth_mage'],
    rewards: [{
      chance: 1 / 128,
      rewards: [
        { type: 'item', itemId: 'elemental_shield_tome', amount: 1 }
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'carbon_scimitar', amount: 1 },
        { type: 'item', itemId: 'carbon_broad_sword', amount: 1 },
        { type: 'item', itemId: 'carbon_horned_helmet', amount: 1 }
      ]
    }]
  },

  boss: {
    enemy: { id: 'boss_spartan', amount: 1 },
    rewards: LEVEL_FOUR_LOOT_TABLE
  },

  floorRewards: [
    {
      type: 'item',
      itemId: 'mithril_dwarven_idol',
      icon: ITEMS['mithril_dwarven_idol'].icon,
      name: ITEMS['mithril_dwarven_idol'].name,
      baseStats: ITEMS['mithril_dwarven_idol'].stats,
      extraStats: ITEMS['mithril_dwarven_idol'].extraStats
    },
    {
      type: 'gold',
      amount: 15000
    }
  ]
}
