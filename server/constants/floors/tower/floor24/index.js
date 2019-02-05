import { orderLootTable } from '../../../enemies/lootTables/index.js';
import { ITEMS } from '../../../../../imports/constants/items/index';

import { LEVEL_TWENTY_FOUR_LOOT_TABLE } from '../../levels/level24';

export const TOWER_FLOOR_24 = {
  1: {
    name: 'Singed Horrors',
    enemies: ['fire_mage', 'fire_mage', 'fire_mage', 'water_mage', 'water_mage'],
    rewards: []
  },
  2: {
    name: 'Goblin Menace',
    enemies: ['goblin','goblin','goblin','goblin','goblin','goblin','goblin'],
    rewards: orderLootTable(LEVEL_TWENTY_FOUR_LOOT_TABLE.concat([{
      chance: 1 / 24,
      rewards: [
        { type: 'item', itemId: 'titanfoil_dagger_scroll', amount: 1 },
        { type: 'item', itemId: 'titanfoil_furnace_scroll', amount: 1 }
      ]
    }]))
  },
  3: {
    name: 'To the Beyond',
    enemies: ['demon','demon','demon','demon','demon'],
    rewards: orderLootTable(LEVEL_TWENTY_FOUR_LOOT_TABLE.concat([{
      chance: 1 / 24,
      rewards: [
        { type: 'item', itemId: 'titanfoil_shield_scroll', amount: 1 },
        { type: 'item', itemId: 'titanfoil_short_sword_scroll', amount: 1 }
      ]
    }, {
      chance: 1 / 144,
      rewards: [
        { type: 'item', itemId: 'titanfoil_knife', amount: 1 }
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
    name: 'Vile Pools',
    enemies: ['gelatinous_cube','gelatinous_cube'],
    rewards: orderLootTable(LEVEL_TWENTY_FOUR_LOOT_TABLE.concat([{
      chance: 1 / 144,
      rewards: [
        { type: 'item', itemId: 'titanfoil_rapiers', amount: 1 }
      ]
    }, {
      chance: 1 / 24,
      rewards: [
        { type: 'item', itemId: 'titanfoil_helmet_scroll', amount: 1 },
        { type: 'item', itemId: 'titanfoil_chest_plate_scroll', amount: 1 }
      ]
    }, {
      chance: 1 / 64,
      rewards: [
        { type: 'item', itemId: 'gift_box_red_envelope', amount: 1 }
      ]
    }]))
  },
  5: {
    name: 'Spirits',
    enemies: ['cursed_spirit','elven_steel_spirit'],
    rewards: orderLootTable(LEVEL_TWENTY_FOUR_LOOT_TABLE.concat([{
      chance: 1 / 128,
      rewards: [
        { type: 'item', itemId: 'titanfoil_kite_shield', amount: 1 }
      ]
    },{
      chance: 1 / 24,
      rewards: [
        { type: 'item', itemId: 'titanfoil_axe_scroll', amount: 1 },
        { type: 'item', itemId: 'titanfoil_pickaxe_scroll', amount: 1 },
        { type: 'item', itemId: 'titanfoil_mining_anvil_scroll', amount: 1 }
      ]
    }, {
      chance: 1 / 64,
      rewards: [
        { type: 'item', itemId: 'inferno_wizard_hat', amount: 1 },
        { type: 'item', itemId: 'inferno_wizard_shirt', amount: 1 },
        { type: 'item', itemId: 'inferno_wizard_shorts', amount: 1 }
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'gift_box_red_envelope', amount: 1 }
      ]
    }]))
  },
  6: {
    name: 'Flesh-Eaters',
    enemies: ['worm','worm','worm'],
    rewards: orderLootTable(LEVEL_TWENTY_FOUR_LOOT_TABLE.concat([{
      chance: 1 / 24,
      rewards: [
        { type: 'item', itemId: 'titanfoil_spear_scroll', amount: 1 },
        { type: 'item', itemId: 'titanfoil_plate_legs_scroll', amount: 1 }
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'titanfoil_dwarven_idol', amount: 1 }
      ]
    }, {
      chance: 1 / 112,
      rewards: [
        { type: 'item', itemId: 'phantasmal_orb', amount: 1 },
        /* { type: 'item', itemId: 'xxxxx_tome', amount: 1 } */
      ]
    }, {
      chance: 1 / 16,
      rewards: [
        { type: 'item', itemId: 'gift_box_red_envelope', amount: 1 }
      ]
    }]))
  },
  7: {
    name: 'Three Wise Men',
    enemies: ['monk','monk','monk'],
    rewards: orderLootTable(LEVEL_TWENTY_FOUR_LOOT_TABLE.concat([{
      chance: 1 / 24,
      rewards: [
        { type: 'item', itemId: 'titanfoil_long_sword_scroll', amount: 1 },
        { type: 'item', itemId: 'titanfoil_battle_axe_scroll', amount: 1 }
      ]
    }, {
      chance: 1 / 48,
      rewards: [
        /* { type: 'item', itemId: 'titanfoil_scimitar', amount: 1 }, */
        /* { type: 'item', itemId: 'titanfoil_broad_sword', amount: 1 }, */
        { type: 'item', itemId: 'titanfoil_horned_helmet', amount: 1 }
      ]
    }, {
      chance: 1 / 8,
      rewards: [
        { type: 'item', itemId: 'gift_box_red_envelope', amount: 1 }
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
