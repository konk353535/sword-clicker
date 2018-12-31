import { orderLootTable } from '../../../enemies/lootTables/index.js';
import { ITEMS } from '../../../../../imports/constants/items/index';

import { LEVEL_NINE_LOOT_TABLE } from '../../levels/level9';

export const TOWER_FLOOR_9 = {
  1: {
    name: 'Flaming House',
    enemies: ['demon'],
    rewards: []
  },
  2: {
    name: 'Jungle',
    enemies: ['lizard'],
    rewards: LEVEL_NINE_LOOT_TABLE
  },
  3: {
    name: 'Savannah',
    enemies: ['elephant'],
    rewards: orderLootTable(LEVEL_NINE_LOOT_TABLE.concat([{
      chance: 1 / 8,
      rewards: [
        { type: 'item', itemId: 'lettice', amount: 50 }
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'catnip', amount: 1 }
      ]
    }, {
      chance: 1 / 128,
      rewards: [
        { type: 'item', itemId: 'platinum_knife', amount: 1 }
      ]
    }]))
  },
  4: {
    name: 'Place of Platinum',
    enemies: ['platinum_spirit'],
    rewards: orderLootTable(LEVEL_NINE_LOOT_TABLE.concat([{
      chance: 1 / 4,
      rewards: [
        { type: 'item', itemId: 'platinum_essence', amount: 1 }
      ]
    }, {
      chance: 1 / 64,
      rewards: [
        { type: 'item', itemId: 'platinum_wand', amount: 1 }
      ]
    }]))
  },
  5: {
    name: 'Carrot Patch',
    enemies: ['rabbit'],
    rewards: orderLootTable(LEVEL_NINE_LOOT_TABLE.concat([{
      chance: 1 / 128,
      rewards: [
        { type: 'item', itemId: 'platinum_kite_shield', amount: 1 }
      ]
    }, {
      chance: 1 / 128,
      rewards: [
        { type: 'item', itemId: 'fairy_spirit_shield', amount: 1 }
      ]
    }, {
      chance: 1 / 4,
      rewards: [
        { type: 'item', itemId: 'carrot', amount: 1 }
      ]
    }]))
  },
  6: {
    name: 'Suspicious Mine',
    enemies: ['angry_miner'],
    rewards: orderLootTable(LEVEL_NINE_LOOT_TABLE.concat([{
      chance: 1 / 4,
      rewards: [
        { type: 'item', itemId: 'ore_platinum', amount: 1 },
        { type: 'item', itemId: 'elk_log', amount: 1 }
      ]
    }, {
      chance: 1 / 8,
      rewards: [
        { type: 'item', itemId: 'platinum_bar', amount: 1 }
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'platinum_dwarven_idol', amount: 1 },
        { type: 'item', itemId: 'platinum_mining_hammer', amount: 1 }
      ]
    }, {
      chance: 1 / 64,
      rewards: [
        { type: 'item', itemId: 'shimmering_orb', amount: 1 },
        { type: 'item', itemId: 'paradoxical_tome', amount: 1 }
      ]
    }, {
      chance: 1 / 48,
      rewards: [
        { type: 'item', itemId: 'defense_up_4_tome', amount: 1 }
      ]
    }]))
  },
  7: {
    name: 'Master Farmer\'s Market',
    enemies: ['farmer'],
    rewards: orderLootTable(LEVEL_NINE_LOOT_TABLE.concat([{
      chance: 1 / 48,
      rewards: [
        { type: 'item', itemId: 'celery_seed', amount: 1 },
        { type: 'item', itemId: 'catnip', amount: 1 },
        { type: 'item', itemId: 'dragonfruit', amount: 3 }
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'platinum_scimitar', amount: 1 },
        { type: 'item', itemId: 'platinum_broad_sword', amount: 1 },
        { type: 'item', itemId: 'platinum_horned_helmet', amount: 1 }
      ]
    }]))
  },

  boss: {
    enemy: { id: 'boss_gorilla', amount: 1 },
    rewards: orderLootTable(LEVEL_NINE_LOOT_TABLE.concat([{
      chance: 1 / 2,
      rewards: [
        { type: 'item', itemId: 'thors_skull', amount: 1 }
      ]
    }]))
  },

  floorRewards: [
    {
      type: 'item',
      itemId: 'titanium_dwarven_idol',
      icon: ITEMS['titanium_dwarven_idol'].icon,
      name: ITEMS['titanium_dwarven_idol'].name,
      baseStats: ITEMS['titanium_dwarven_idol'].stats,
      extraStats: ITEMS['titanium_dwarven_idol'].extraStats
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
