import { orderLootTable } from '../../../enemies/lootTables/index.js';
import { ITEMS } from '../../../items/index';

import { LEVEL_SIXTEEN_LOOT_TABLE } from '../../levels/level16';

export const TOWER_FLOOR_16 = {
  1: {
    name: 'Blue House',
    enemies: ['blue_mage'],
    rewards: []
  },
  2: {
    name: 'Jungle',
    enemies: ['lizard'],
    rewards: LEVEL_SIXTEEN_LOOT_TABLE
  },
  3: {
    name: 'Windy Peak',
    enemies: ['echidna'],
    rewards: orderLootTable(LEVEL_SIXTEEN_LOOT_TABLE.concat([{
      chance: 1 / 8,
      rewards: [
        { type: 'item', itemId: 'pineapple', amount: 10 }
      ]
    }, {
      chance: 1 / 64,
      rewards: [
        { type: 'item', itemId: 'lemon_grass', amount: 1 }
      ]
    }]))
  },
  4: {
    name: 'Place of Orichalcum',
    enemies: ['orichalcum_spirit'],
    rewards: orderLootTable(LEVEL_SIXTEEN_LOOT_TABLE.concat([{
      chance: 1 / 4,
      rewards: [
        { type: 'item', itemId: 'orichalcum_essence', amount: 1 }
      ]
    }]))
  },
  5: {
    name: 'Fiery Pit',
    enemies: ['demon', 'fire_mage'],
    rewards: orderLootTable(LEVEL_SIXTEEN_LOOT_TABLE.concat([{
      chance: 1 / 128,
      rewards: [
        { type: 'item', itemId: 'meteor_tome', amount: 1 }
      ]
    }, {
      chance: 1 / 48,
      rewards: [
        { type: 'item', itemId: 'crimson_wizard_hat', amount: 1 },
        { type: 'item', itemId: 'crimson_wizard_shirt', amount: 1 },
        { type: 'item', itemId: 'crimson_wizard_shorts', amount: 1 }
      ]
    }]))
  },
  6: {
    name: 'Suspicious Mine',
    enemies: ['angry_miner'],
    rewards: orderLootTable(LEVEL_SIXTEEN_LOOT_TABLE.concat([{
      chance: 1 / 4,
      rewards: [
        { type: 'item', itemId: 'ore_orichalcum', amount: 1 },
        { type: 'item', itemId: 'larch_log', amount: 1 }
      ]
    }, {
      chance: 1 / 8,
      rewards: [
        { type: 'item', itemId: 'orichalcum_bar', amount: 1 }
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'orichalcum_dwarven_idol', amount: 1 },
        { type: 'item', itemId: 'orichalcum_mining_hammer', amount: 1 }
      ]
    }]))
  },
  7: {
    name: 'Howling Abyss',
    enemies: ['ice_giant'],
    rewards: orderLootTable(LEVEL_SIXTEEN_LOOT_TABLE.concat([{
      chance: 1 / 128,
      rewards: [
        { type: 'item', itemId: 'frost_armor_3_tome', amount: 1 }
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'orichalcum_scimitar', amount: 1 },
        { type: 'item', itemId: 'orichalcum_broad_sword', amount: 1 },
        { type: 'item', itemId: 'orichalcum_horned_helmet', amount: 1 }
      ]
    }]))
  },

  boss: {
    enemy: { id: 'boss_old_tortoise', amount: 1 },
    rewards: orderLootTable(LEVEL_SIXTEEN_LOOT_TABLE.concat([{
      chance: 1 / 2,
      rewards: [
        { type: 'item', itemId: 'war_cry_tome', amount: 1 }
      ]
    }]))
  },

  floorRewards: [
    {
      type: 'item',
      itemId: 'meteorite_dwarven_idol',
      icon: ITEMS['meteorite_dwarven_idol'].icon,
      name: ITEMS['meteorite_dwarven_idol'].name,
      baseStats: ITEMS['meteorite_dwarven_idol'].stats,
      extraStats: ITEMS['meteorite_dwarven_idol'].extraStats
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
