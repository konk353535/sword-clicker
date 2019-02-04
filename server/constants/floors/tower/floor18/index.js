import { orderLootTable } from '../../../enemies/lootTables/index.js';
import { ITEMS } from '../../../../../imports/constants/items/index';

import { LEVEL_EIGHTEEN_LOOT_TABLE } from '../../levels/level18';

export const TOWER_FLOOR_18 = {
  1: {
    name: 'Dirty Field',
    enemies: ['worm'],
    rewards: []
  },
  2: {
    name: 'Honey Comb',
    enemies: ['bee'],
    rewards: orderLootTable(LEVEL_EIGHTEEN_LOOT_TABLE.concat([{
      chance: 1 / 128,
      rewards: [
        { type: 'item', itemId: 'lemon_honey', amount: 1 }
      ]
    }]))
  },
  3: {
    name: 'Wasp Nests',
    enemies: ['wasp'],
    rewards: orderLootTable(LEVEL_EIGHTEEN_LOOT_TABLE.concat([{
      chance: 1 / 8,
      rewards: [
        { type: 'item', itemId: 'lettice', amount: 50 },
        { type: 'item', itemId: 'feverfew_seed', amount: 1 }
      ]
    }, {
      chance: 1 / 64,
      rewards: [
        { type: 'item', itemId: 'garlic_seed', amount: 1 }
      ]
    }, {
      chance: 1 / 128,
      rewards: [
        { type: 'item', itemId: 'fairy_steel_knife', amount: 1 }
      ]
    }]))
  },
  4: {
    name: 'Place of Fairy Steel',
    enemies: ['fairy_steel_spirit'],
    rewards: orderLootTable(LEVEL_EIGHTEEN_LOOT_TABLE.concat([{
      chance: 1 / 128,
      rewards: [
        { type: 'item', itemId: 'fairy_steel_rapiers', amount: 1 }
      ]
    }, {
      chance: 1 / 4,
      rewards: [
        { type: 'item', itemId: 'fairy_steel_essence', amount: 1 }
      ]
    }, {
      chance: 1 / 64,
      rewards: [
        { type: 'item', itemId: 'fairy_steel_wand', amount: 1 }
      ]
    }
]))
  },
  5: {
    name: 'Eternal Struggle',
    enemies: ['demon', 'angel'],
    rewards: orderLootTable(LEVEL_EIGHTEEN_LOOT_TABLE.concat([{
      chance: 1 / 128,
      rewards: [
        { type: 'item', itemId: 'fairy_steel_kite_shield', amount: 1 }
      ]
    }, {
      chance: 1 / 48,
      rewards: [
        { type: 'item', itemId: 'thirsty_fangs_2_tome_scroll', amount: 1 }
      ]
    },{
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'azure_wizard_hat', amount: 1 },
        { type: 'item', itemId: 'azure_wizard_shirt', amount: 1 },
        { type: 'item', itemId: 'azure_wizard_shorts', amount: 1 }
      ]
    }, {
      chance: 1 / 48,
      rewards: [
        { type: 'item', itemId: 'scream_level_4_tome', amount: 1 }
      ]
    }]))
  },
  6: {
    name: 'Suspicious Mine',
    enemies: ['angry_miner'],
    rewards: orderLootTable(LEVEL_EIGHTEEN_LOOT_TABLE.concat([{
      chance: 1 / 4,
      rewards: [
        { type: 'item', itemId: 'ore_fairy_steel', amount: 1 },
        { type: 'item', itemId: 'poplar_log', amount: 1 }
      ]
    }, {
      chance: 1 / 8,
      rewards: [
        { type: 'item', itemId: 'fairy_steel_bar', amount: 1 }
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'fairy_steel_dwarven_idol', amount: 1 },
        { type: 'item', itemId: 'fairy_steel_mining_hammer', amount: 1 }
      ]
    }, {
      chance: 1 / 64,
      rewards: [
        { type: 'item', itemId: 'dangerous_orb', amount: 1 },
        { type: 'item', itemId: 'ancient_tome', amount: 1 }
      ]
    }, {
      chance: 1 / 64,
      rewards: [
        { type: 'item', itemId: 'attack_up_5_tome', amount: 1 }
      ]
    }, {
      chance: 1 / 64,
      rewards: [
        { type: 'item', itemId: 'critical_up_level_5_tome', amount: 1 }
      ]
    }]))
  },
  7: {
    name: 'Waterfall',
    enemies: ['water_mage', 'jellyFish'],
    rewards: orderLootTable(LEVEL_EIGHTEEN_LOOT_TABLE.concat([{
      chance: 1 / 128,
      rewards: [
        { type: 'item', itemId: 'heavens_descent_tome', amount: 1 }
      ]
    }, {
      chance: 1 / 16,
      rewards: [
        { type: 'item', itemId: 'complete_earth_shard', amount: 10 }
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'fairy_steel_scimitar', amount: 1 },
        { type: 'item', itemId: 'fairy_steel_broad_sword', amount: 1 },
        { type: 'item', itemId: 'fairy_steel_horned_helmet', amount: 1 }
      ]
    }]))
  },

  boss: {
    enemy: { id: 'boss_bison', amount: 1 },
    rewards: orderLootTable(LEVEL_EIGHTEEN_LOOT_TABLE.concat([{
      chance: 1 / 2,
      rewards: [
        { type: 'item', itemId: 'bison_axe', amount: 1 }
      ]
    }]))
  },

  floorRewards: [
    {
      type: 'item',
      itemId: 'elven_steel_dwarven_idol',
      icon: ITEMS['elven_steel_dwarven_idol'].icon,
      name: ITEMS['elven_steel_dwarven_idol'].name,
      baseStats: ITEMS['elven_steel_dwarven_idol'].stats,
      extraStats: ITEMS['elven_steel_dwarven_idol'].extraStats
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
