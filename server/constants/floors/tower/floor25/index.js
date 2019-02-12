import { orderLootTable } from '../../../enemies/lootTables/index.js';
import { ITEMS } from '../../../../../imports/constants/items/index';

import { LEVEL_TWENTY_FIVE_LOOT_TABLE } from '../../levels/level25';

export const TOWER_FLOOR_25 = {
  1: {
    name: 'The Farplane',
    enemies: ['devourer', 'devourer', 'tormentor', 'devourer'],
    rewards: []
  },
  2: {
    name: 'Putrid Horror',
    enemies: ['grotesque', 'grotesque_giant', 'grotesque'],
    rewards: orderLootTable(LEVEL_TWENTY_FIVE_LOOT_TABLE.concat([{
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'relicrock_dagger_scroll', amount: 1 },
        { type: 'item', itemId: 'relicrock_furnace_scroll', amount: 1 }
      ]
    }]))
  },
  3: {
    name: 'Soulripped',
    enemies: ['tormentor', 'wither', 'wither', 'tormentor'],
    rewards: orderLootTable(LEVEL_TWENTY_FIVE_LOOT_TABLE.concat([{
      chance: 1 / 64,
      rewards: [
        { type: 'item', itemId: 'relicrock_shield_scroll', amount: 1 },
        { type: 'item', itemId: 'relicrock_short_sword_scroll', amount: 1 }
      ]
    }, {
      chance: 1 / 256,
      rewards: [
        { type: 'item', itemId: 'relicrock_knife', amount: 1 }
      ]
    }, {
      chance: 1 / 128,
      rewards: [
        { type: 'item', itemId: 'petrified_bow_scroll', amount: 1 },
      ]
    }, {
      chance: 1 / 128,
      rewards: [
        { type: 'item', itemId: 'relicrock_quiver_scroll', amount: 1 },
      ]
    }, {
      chance: 1 / 24,
      rewards: [
        { type: 'item', itemId: 'gift_box_valentines', amount: 1 }
      ]
    }, {
      chance: 1 / 24,
      rewards: [
        { type: 'item', itemId: 'event_vd_bear_slippers', amount: 1 }
      ]
    }, {
      chance: 1 / 24,
      rewards: [
        { type: 'item', itemId: 'event_vd_rose_quartz_amulet', amount: 1 }
      ]
    }, {
      chance: 1 / 24,
      rewards: [
        { type: 'item', itemId: 'cupids_bow', amount: 1 }
      ]
    }, {
      chance: 1 / 24,
      rewards: [
        { type: 'item', itemId: 'event_vd_charm_tome', amount: 1 }
      ]
    }, {
      chance: 1 / 8,
      rewards: [
        { type: 'item', itemId: 'vd_cupid_tome_level_1', amount: 1 }
      ]
    }, {
      chance: 1 / 16,
      rewards: [
        { type: 'item', itemId: 'vd_cupid_tome_level_2', amount: 1 }
      ]
    }]))
  },
  4: {
    name: 'Dust to Dust',
    enemies: ['devourer', 'abstract_monster', 'devourer'],
    rewards: orderLootTable(LEVEL_TWENTY_FIVE_LOOT_TABLE.concat([{
      chance: 1 / 256,
      rewards: [
        { type: 'item', itemId: 'relicrock_rapiers', amount: 1 }
      ]
    }, {
      chance: 1 / 64,
      rewards: [
        { type: 'item', itemId: 'relicrock_helmet_scroll', amount: 1 },
        { type: 'item', itemId: 'relicrock_chest_plate_scroll', amount: 1 }
      ]
    }, {
      chance: 1 / 144,
      rewards: [
        { type: 'item', itemId: 'relicrock_wand', amount: 1 }
      ]
    }, {
      chance: 1 / 20,
      rewards: [
        { type: 'item', itemId: 'gift_box_valentines', amount: 1 }
      ]
    }, {
      chance: 1 / 8,
      rewards: [
        { type: 'item', itemId: 'vd_cupid_tome_level_2', amount: 1 }
      ]
    }, {
      chance: 1 / 16,
      rewards: [
        { type: 'item', itemId: 'vd_cupid_tome_level_3', amount: 1 }
      ]
    }]))
  },
  5: {
    name: 'Banishment',
    enemies: ['horrible_eye', 'wither', 'tormentor'],
    rewards: orderLootTable(LEVEL_TWENTY_FIVE_LOOT_TABLE.concat([{
      chance: 1 / 256,
      rewards: [
        { type: 'item', itemId: 'relicrock_kite_shield', amount: 1 }
      ]
    },{
      chance: 1 / 64,
      rewards: [
        { type: 'item', itemId: 'relicrock_axe_scroll', amount: 1 },
        { type: 'item', itemId: 'relicrock_pickaxe_scroll', amount: 1 },
        { type: 'item', itemId: 'relicrock_mining_anvil_scroll', amount: 1 }
      ]
    }, {
      chance: 1 / 256,
      rewards: [
        { type: 'item', itemId: 'exalted_trident', amount: 1 }
      ]
    }, {
      chance: 1 / 16,
      rewards: [
        { type: 'item', itemId: 'gift_box_valentines', amount: 1 }
      ]
    }, {
      chance: 1 / 8,
      rewards: [
        { type: 'item', itemId: 'vd_cupid_tome_level_3', amount: 1 }
      ]
    }, {
      chance: 1 / 16,
      rewards: [
        { type: 'item', itemId: 'vd_cupid_tome_level_4', amount: 1 }
      ]
    }]))
  },
  6: {
    name: 'Place of Sunder',
    enemies: ['ripper', 'ripper', 'ripper'],
    rewards: orderLootTable(LEVEL_TWENTY_FIVE_LOOT_TABLE.concat([{
      chance: 1 / 64,
      rewards: [
        { type: 'item', itemId: 'relicrock_spear_scroll', amount: 1 },
        { type: 'item', itemId: 'relicrock_plate_legs_scroll', amount: 1 }
      ]
    }, {
      chance: 1 / 128,
      rewards: [
        { type: 'item', itemId: 'relicrock_dwarven_idol', amount: 1 },
        { type: 'item', itemId: 'relicrock_mining_hammer', amount: 1 }
      ]
    }, {
      chance: 1 / 256,
      rewards: [
        { type: 'item', itemId: 'farplane_orb', amount: 1 },
        { type: 'item', itemId: 'maniacal_tome', amount: 1 }
      ]
    }, {
      chance: 1 / 12,
      rewards: [
        { type: 'item', itemId: 'gift_box_valentines', amount: 1 }
      ]
    }, {
      chance: 1 / 8,
      rewards: [
        { type: 'item', itemId: 'vd_cupid_tome_level_4', amount: 1 }
      ]
    }, {
      chance: 1 / 16,
      rewards: [
        { type: 'item', itemId: 'vd_cupid_tome_level_5', amount: 1 }
      ]
    }]))
  },
  7: {
    name: 'Evil Envelopment',
    enemies: ['horrible_eye', 'seething_hatred'],
    rewards: orderLootTable(LEVEL_TWENTY_FIVE_LOOT_TABLE.concat([{
      chance: 1 / 64,
      rewards: [
        { type: 'item', itemId: 'relicrock_long_sword_scroll', amount: 1 },
        { type: 'item', itemId: 'relicrock_battle_axe_scroll', amount: 1 }
      ]
    }, {
      chance: 1 / 72,
      rewards: [
        { type: 'item', itemId: 'relicrock_scimitar', amount: 1 },
        { type: 'item', itemId: 'relicrock_broad_sword', amount: 1 },
        { type: 'item', itemId: 'relicrock_horned_helmet', amount: 1 }
      ]
    }, {
      chance: 1 / 8,
      rewards: [
        { type: 'item', itemId: 'gift_box_valentines', amount: 1 }
      ]
    }, {
      chance: 1 / 8,
      rewards: [
        { type: 'item', itemId: 'vd_cupid_tome_level_5', amount: 1 }
      ]
    }]))
  },

  boss: {
    enemy: { id: 'boss_ruiner', amount: 1 },
    rewards: []
  },

  floorRewards: [
    {
      type: 'item',
      itemId: 'eternium_dwarven_idol',
      icon: ITEMS['eternium_dwarven_idol'].icon,
      name: ITEMS['eternium_dwarven_idol'].name,
      baseStats: ITEMS['eternium_dwarven_idol'].stats,
      extraStats: ITEMS['eternium_dwarven_idol'].extraStats
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
      amount: 1000000
    }
  ]
};
