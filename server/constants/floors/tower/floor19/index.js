import { orderLootTable } from '../../../enemies/lootTables/index.js';
import { ITEMS } from '../../../../../imports/constants/items/index';

import { LEVEL_NINETEEN_LOOT_TABLE } from '../../levels/level19';

export const TOWER_FLOOR_19 = {
  1: {
    name: 'Murders House',
    enemies: ['demon'],
    rewards: []
  },
  2: {
    name: 'Castle',
    enemies: ['spartan'],
    rewards: LEVEL_NINETEEN_LOOT_TABLE
  },
  3: {
    name: 'Savannah',
    enemies: ['elephant'],
    rewards: orderLootTable(LEVEL_NINETEEN_LOOT_TABLE.concat([{
      chance: 1 / 8,
      rewards: [
        { type: 'item', itemId: 'lettice', amount: 50 },
        { type: 'item', itemId: 'feverfew_seed', amount: 1 }
      ]
    }, {
      chance: 1 / 128,
      rewards: [
        { type: 'item', itemId: 'elven_steel_knife', amount: 1 }
      ]
    }]))
  },
  4: {
    name: 'Place of Elven Steel',
    enemies: ['elven_steel_spirit'],
    rewards: orderLootTable(LEVEL_NINETEEN_LOOT_TABLE.concat([{
      chance: 1 / 128,
      rewards: [
        { type: 'item', itemId: 'elven_steel_rapiers', amount: 1 }
      ]
    }, {
      chance: 1 / 4,
      rewards: [
        { type: 'item', itemId: 'elven_steel_essence', amount: 1 }
      ]
    }, {
      chance: 1 / 64,
      rewards: [
        { type: 'item', itemId: 'elven_steel_wand', amount: 1 }
      ]
    }]))
  },
  5: {
    name: 'Dojo',
    enemies: ['young_ninja'],
    rewards: orderLootTable(LEVEL_NINETEEN_LOOT_TABLE.concat([{
      chance: 1 / 128,
      rewards: [
        { type: 'item', itemId: 'elven_steel_kite_shield', amount: 1 }
      ]
    },{
      chance: 1 / 256,
      rewards: [
        { type: 'item', itemId: 'elven_steel_buckler', amount: 1 }
      ]
    }, {
      chance: 1 / 128,
      rewards: [
        { type: 'item', itemId: 'verdant_trident', amount: 1 }
      ]
    }]))
  },
  6: {
    name: 'Suspicious Mine',
    enemies: ['angry_miner'],
    rewards: orderLootTable(LEVEL_NINETEEN_LOOT_TABLE.concat([{
      chance: 1 / 4,
      rewards: [
        { type: 'item', itemId: 'ore_elven_steel', amount: 1 },
        { type: 'item', itemId: 'poplar_log', amount: 1 }
      ]
    }, {
      chance: 1 / 8,
      rewards: [
        { type: 'item', itemId: 'elven_steel_bar', amount: 1 }
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'elven_steel_dwarven_idol', amount: 1 },
        { type: 'item', itemId: 'elven_steel_mining_hammer', amount: 1 }
      ]
    }, {
      chance: 1 / 64,
      rewards: [
        { type: 'item', itemId: 'prismatic_orb', amount: 1 },
        { type: 'item', itemId: 'stellar_tome', amount: 1 }
      ]
    }, {
      chance: 1 / 64,
      rewards: [
        { type: 'item', itemId: 'healing_power_up_level_5_tome', amount: 1 }
      ]
    }]))
  },
  7: {
    name: 'Hilly Plain',
    enemies: ['unicorn'],
    rewards: orderLootTable(LEVEL_NINETEEN_LOOT_TABLE.concat([{
      chance: 1 / 128,
      rewards: [
        { type: 'item', itemId: 'lightning_speed_tome', amount: 1 }
      ]
    }, {
      chance: 1 / 16,
      rewards: [
        { type: 'item', itemId: 'complete_water_shard', amount: 10 }
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'elven_steel_scimitar', amount: 1 },
        { type: 'item', itemId: 'elven_steel_broad_sword', amount: 1 },
        { type: 'item', itemId: 'elven_steel_horned_helmet', amount: 1 }
      ]
    }]))
  },

  boss: {
    enemy: { id: 'boss_wolf', amount: 1 },
    rewards: orderLootTable(LEVEL_NINETEEN_LOOT_TABLE.concat([{
      chance: 1 / 2,
      rewards: [
        { type: 'item', itemId: 'eel_taunt_tome', amount: 1 },
        { type: 'item', itemId: 'lion_taunt_tome', amount: 1 },
        { type: 'item', itemId: 'bear_taunt_tome', amount: 1 }
      ]
    }]))
  },

  floorRewards: [
    {
      type: 'item',
      itemId: 'cursed_dwarven_idol',
      icon: ITEMS['cursed_dwarven_idol'].icon,
      name: ITEMS['cursed_dwarven_idol'].name,
      baseStats: ITEMS['cursed_dwarven_idol'].stats,
      extraStats: ITEMS['cursed_dwarven_idol'].extraStats
    },
    {
      type: 'item',
      itemId: 'enhancer_key',
      icon: ITEMS['enhancer_key'].icon,
      name: ITEMS['enhancer_key'].name,
      baseStats: ITEMS['enhancer_key'].stats,
      extraStats: ITEMS['enhancer_key'].extraStats
    },
    {
      type: 'gold',
      amount: 150000
    }
  ]
};
