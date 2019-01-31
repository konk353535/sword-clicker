import { orderLootTable } from '../../../enemies/lootTables/index.js';
import { ITEMS } from '../../../../../imports/constants/items/index';

import { LEVEL_TWENTY_TWO_LOOT_TABLE } from '../../levels/level22';

export const TOWER_FLOOR_22 = {
  1: {
    name: 'Frozen Waste',
    enemies: ['ice_giant'],
    rewards: []
  },
  2: {
    name: 'Dojo',
    enemies: ['monk'],
    rewards: orderLootTable(LEVEL_TWENTY_TWO_LOOT_TABLE.concat([{
      chance: 1 / 16,
      rewards: [
        { type: 'item', itemId: 'radiant_dagger_scroll', amount: 1 },
        { type: 'item', itemId: 'radiant_furnace_scroll', amount: 1 }
      ]
    }]))
  },
  3: {
    name: 'Sparta',
    enemies: ['spartan', 'crab'],
    rewards: orderLootTable(LEVEL_TWENTY_TWO_LOOT_TABLE.concat([{
      chance: 1 / 16,
      rewards: [
        { type: 'item', itemId: 'radiant_shield_scroll', amount: 1 },
        { type: 'item', itemId: 'radiant_short_sword_scroll', amount: 1 }
      ]
    }, {
      chance: 1 / 64,
      rewards: [
        { type: 'item', itemId: 'event_lny_lion_claws', amount: 1 }
      ]
    }, {
      chance: 1 / 64,
      rewards: [
        { type: 'item', itemId: 'event_lny_lion_body', amount: 1 }
      ]
    }, {
      chance: 1 / 64,
      rewards: [
        { type: 'item', itemId: 'event_lny_lion_head', amount: 1 }
      ]
    }, {
      chance: 1 / 64,
      rewards: [
        { type: 'item', itemId: 'event_lny_lunar_shield', amount: 1 }
      ]
    }, {
      chance: 1 / 72,
      rewards: [
        { type: 'item', itemId: 'lny_pig_tome_level_1', amount: 1 }
      ]
    }, {
      chance: 1 / 96,
      rewards: [
        { type: 'item', itemId: 'lny_pig_tome_level_2', amount: 1 }
      ]
    }, {
      chance: 1 / 120,
      rewards: [
        { type: 'item', itemId: 'lny_pig_tome_level_3', amount: 1 }
      ]
    }, {
      chance: 1 / 144,
      rewards: [
        { type: 'item', itemId: 'lny_pig_tome_level_4', amount: 1 }
      ]
    }, {
      chance: 1 / 168,
      rewards: [
        { type: 'item', itemId: 'lny_pig_tome_level_5', amount: 1 }
      ]
    }]))
  },
  4: {
    name: 'The Field',
    enemies: ['farmer', 'snake'],
    rewards: orderLootTable(LEVEL_TWENTY_TWO_LOOT_TABLE.concat([{
      chance: 1 / 16,
      rewards: [
        { type: 'item', itemId: 'radiant_helmet_scroll', amount: 1 },
        { type: 'item', itemId: 'radiant_chest_plate_scroll', amount: 1 }
      ]
    }, {
      chance: 1 / 64,
      rewards: [
        { type: 'item', itemId: 'gift_box_red_envelope', amount: 1 }
      ]
    }]))
  },
  5: {
    name: 'Mage\'s Caravan',
    enemies: ['warden', 'fire_mage'],
    rewards: orderLootTable(LEVEL_TWENTY_TWO_LOOT_TABLE.concat([{
      chance: 1 / 128,
      rewards: [
        { type: 'item', itemId: 'radiant_kite_shield', amount: 1 }
      ]
    }, {
      chance: 1 / 16,
      rewards: [
        { type: 'item', itemId: 'radiant_axe_scroll', amount: 1 },
        { type: 'item', itemId: 'radiant_pickaxe_scroll', amount: 1 },
        { type: 'item', itemId: 'radiant_mining_anvil_scroll', amount: 1 }
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'gift_box_red_envelope', amount: 1 }
      ]
    }]))
  },
  6: {
    name: 'Abandoned Dojo',
    enemies: ['young_ninja'],
    rewards: orderLootTable(LEVEL_TWENTY_TWO_LOOT_TABLE.concat([{
      chance: 1 / 16,
      rewards: [
        { type: 'item', itemId: 'radiant_spear_scroll', amount: 1 },
        { type: 'item', itemId: 'radiant_plate_legs_scroll', amount: 1 }
      ]
    }, {
      chance: 1 / 16,
      rewards: [
        { type: 'item', itemId: 'gift_box_red_envelope', amount: 1 }
      ]
    }]))
  },
  7: {
    name: 'Blessed Mine',
    enemies: ['dwarf'],
    rewards: orderLootTable(LEVEL_TWENTY_TWO_LOOT_TABLE.concat([{
      chance: 1 / 16,
      rewards: [
        { type: 'item', itemId: 'radiant_long_sword_scroll', amount: 1 },
        { type: 'item', itemId: 'radiant_battle_axe_scroll', amount: 1 }
      ]
    }, {
      chance: 1 / 8,
      rewards: [
        { type: 'item', itemId: 'gift_box_red_envelope', amount: 1 }
      ]
    }]))
  },

  boss: {
    enemy: { id: 'boss_high_angel', amount: 1 },
    rewards: []
  },

  floorRewards: [
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
      amount: 600000
    }
  ]
};
