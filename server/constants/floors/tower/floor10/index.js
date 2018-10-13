import { orderLootTable } from '../../../enemies/lootTables/index.js';
import { ITEMS } from '../../../../../imports/constants/items/index';

import { LEVEL_TEN_LOOT_TABLE } from '../../levels/level10';

export const TOWER_FLOOR_10 = {
  1: {
    name: 'Abandoned Lighthouse',
    enemies: ['demon', 'crab'],
    rewards: []
  },
  2: {
    name: 'Bush',
    enemies: ['wombat', 'fly'],
    rewards: LEVEL_TEN_LOOT_TABLE
  },
  3: {
    name: 'Turquoise Lake',
    enemies: ['jellyFish', 'fish'],
    rewards: orderLootTable(LEVEL_TEN_LOOT_TABLE.concat([{
      chance: 1 / 8,
      rewards: [
        { type: 'item', itemId: 'lettice', amount: 50 },
        { type: 'item', itemId: 'feverfew_seed', amount: 1 }
      ]
    }]))
  },
  4: {
    name: 'Place of Titanium',
    enemies: ['titanium_spirit'],
    rewards: orderLootTable(LEVEL_TEN_LOOT_TABLE.concat([{
      chance: 1 / 4,
      rewards: [
        { type: 'item', itemId: 'titanium_essence', amount: 1 }
      ]
    }]))
  },
  5: {
    name: 'Bandit Camp',
    enemies: ['water_mage', 'cut_purse'],
    rewards: orderLootTable(LEVEL_TEN_LOOT_TABLE.concat([{
      chance: 1 / 128,
      rewards: [
        { type: 'item', itemId: 'titanium_knife', amount: 1 }
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'orange_wizard_hat', amount: 1 },
        { type: 'item', itemId: 'orange_wizard_shirt', amount: 1 },
        { type: 'item', itemId: 'orange_wizard_shorts', amount: 1 }
      ]
    }]))
  },
  6: {
    name: 'Suspicious Mine',
    enemies: ['angry_miner'],
    rewards: orderLootTable(LEVEL_TEN_LOOT_TABLE.concat([{
      chance: 1 / 4,
      rewards: [
        { type: 'item', itemId: 'ore_titanium', amount: 1 },
        { type: 'item', itemId: 'black_log', amount: 1 }
      ]
    }, {
      chance: 1 / 8,
      rewards: [
        { type: 'item', itemId: 'titanium_bar', amount: 1 }
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'titanium_dwarven_idol', amount: 1 },
        { type: 'item', itemId: 'titanium_mining_hammer', amount: 1 }
      ]
    }]))
  },
  // To do, some kind of herb garden drops
  7: {
    name: 'Overgrown Grass',
    enemies: ['grasshopper', 'spider'],
    rewards: orderLootTable(LEVEL_TEN_LOOT_TABLE.concat([{
      chance: 1 / 128,
      rewards: [
        { type: 'item', itemId: 'inferno_tome', amount: 1 }
      ]
    }, {
      chance: 1 / 48,
      rewards: [
        { type: 'item', itemId: 'catnip', amount: 1 } // Change to herb
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'titanium_scimitar', amount: 1 },
        { type: 'item', itemId: 'titanium_broad_sword', amount: 1 },
        { type: 'item', itemId: 'titanium_horned_helmet', amount: 1 }
      ]
    }]))
  },

  boss: {
    enemy: { id: 'boss_demon', amount: 1 }, // Change to another boss
    rewards: orderLootTable(LEVEL_TEN_LOOT_TABLE.concat([{
      chance: 1 / 2,
      rewards: [
        { type: 'item', itemId: 'demons_heart', amount: 1 }
      ]
    }]))
  },

  floorRewards: [
    {
      type: 'item',
      itemId: 'tungsten_dwarven_idol',
      icon: ITEMS['tungsten_dwarven_idol'].icon,
      name: ITEMS['tungsten_dwarven_idol'].name,
      baseStats: ITEMS['tungsten_dwarven_idol'].stats,
      extraStats: ITEMS['tungsten_dwarven_idol'].extraStats
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
