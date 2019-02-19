import { orderLootTable } from '../../../enemies/lootTables/index.js';
import { ITEMS } from '../../../../../imports/constants/items/index';

import { LEVEL_TWENTY_SIX_LOOT_TABLE } from '../../levels/level26';

export const TOWER_FLOOR_26 = {
  1: {
    name: 'Through The Filth',
    enemies: ['snake', 'rat', 'spider', 'rat'],
    rewards: []
  },
  2: {
    name: 'Sewer Scum',
    enemies: ['fish', 'fish', 'jellyFish', 'jellyFish'],
    rewards: orderLootTable(LEVEL_TWENTY_SIX_LOOT_TABLE.concat([{
      chance: 1 / 64,
      rewards: [
        { type: 'item', itemId: 'eternium_dagger_scroll', amount: 1 },
        { type: 'item', itemId: 'eternium_furnace_scroll', amount: 1 }
      ]
    }]))
  },
  3: {
    name: 'A Foul Stench',
    enemies: ['troglodyte'],
    rewards: orderLootTable(LEVEL_TWENTY_SIX_LOOT_TABLE.concat([{
      chance: 1 / 128,
      rewards: [
        { type: 'item', itemId: 'eternium_shield_scroll', amount: 1 },
        { type: 'item', itemId: 'eternium_short_sword_scroll', amount: 1 }
      ]
    }, {
      chance: 1 / 512,
      rewards: [
        { type: 'item', itemId: 'eternium_knife', amount: 1 }
      ]
    }, {
      chance: 1 / 256,
      rewards: [
        { type: 'item', itemId: 'ancient_bow_scroll', amount: 1 },
      ]
    }, {
      chance: 1 / 256,
      rewards: [
        { type: 'item', itemId: 'eternium_quiver_scroll', amount: 1 },
      ]
    }]))
  },
  4: {
    name: 'The Grand Wizard',
    enemies: ['eternal_warden'],
    rewards: orderLootTable(LEVEL_TWENTY_SIX_LOOT_TABLE.concat([{
      chance: 1 / 512,
      rewards: [
        { type: 'item', itemId: 'eternium_rapiers', amount: 1 }
      ]
    }, {
      chance: 1 / 128,
      rewards: [
        { type: 'item', itemId: 'eternium_helmet_scroll', amount: 1 },
        { type: 'item', itemId: 'eternium_chest_plate_scroll', amount: 1 }
      ]
    }, {
      chance: 1 / 216,
      rewards: [
        { type: 'item', itemId: 'eternium_wand', amount: 1 }
      ]
    }]))
  },
  5: {
    name: 'Always Another Way',
    enemies: ['jellyFish', 'hydra', 'jellyFish'],
    rewards: orderLootTable(LEVEL_TWENTY_SIX_LOOT_TABLE.concat([{
      chance: 1 / 1024,
      rewards: [
        { type: 'item', itemId: 'scepter_of_power_scroll', amount: 1 }
      ]
    }, {
      chance: 1 / 512,
      rewards: [
        { type: 'item', itemId: 'eternium_kite_shield', amount: 1 }
      ]
    }, {
      chance: 1 / 128,
      rewards: [
        { type: 'item', itemId: 'eternium_spirit_shield', amount: 1 }
      ]
    }, {
      chance: 1 / 512,
      rewards: [
        { type: 'item', itemId: 'eternium_buckler', amount: 1 }
      ]
    }, {
      chance: 1 / 128,
      rewards: [
        { type: 'item', itemId: 'eternium_axe_scroll', amount: 1 },
        { type: 'item', itemId: 'eternium_pickaxe_scroll', amount: 1 },
        { type: 'item', itemId: 'eternium_mining_anvil_scroll', amount: 1 }
      ]
    }, {
      chance: 1 / 512,
      rewards: [
        { type: 'item', itemId: 'exalted_wizard_hat', amount: 1 },
        { type: 'item', itemId: 'exalted_wizard_shirt', amount: 1 },
        { type: 'item', itemId: 'exalted_wizard_shorts', amount: 1 }
      ]
    }]))
  },
  6: {
    name: 'Vile Filth',
    enemies: ['troglodyte', 'demon', 'troglodyte'],
    rewards: orderLootTable(LEVEL_TWENTY_SIX_LOOT_TABLE.concat([{
      chance: 1 / 128,
      rewards: [
        { type: 'item', itemId: 'eternium_spear_scroll', amount: 1 },
        { type: 'item', itemId: 'eternium_plate_legs_scroll', amount: 1 }
      ]
    }, {
      chance: 1 / 256,
      rewards: [
        { type: 'item', itemId: 'eternium_dwarven_idol', amount: 1 },
        { type: 'item', itemId: 'eternium_mining_hammer', amount: 1 }
      ]
    }, {
      chance: 1 / 512,
      rewards: [
        { type: 'item', itemId: 'exalted_orb', amount: 1 },
        { type: 'item', itemId: 'exalted_tome', amount: 1 }
      ]
    }]))
  },
  7: {
    name: 'The Eternal Struggle',
    enemies: ['eternal_warden', 'hydra', 'eternal_warden'],
    rewards: orderLootTable(LEVEL_TWENTY_SIX_LOOT_TABLE.concat([{
      chance: 1 / 128,
      rewards: [
        { type: 'item', itemId: 'eternium_long_sword_scroll', amount: 1 },
        { type: 'item', itemId: 'eternium_battle_axe_scroll', amount: 1 }
      ]
    }, {
      chance: 1 / 216,
      rewards: [
        { type: 'item', itemId: 'eternium_hammer', amount: 1 }
      ]
    }, {
      chance: 1 / 108,
      rewards: [
        { type: 'item', itemId: 'eternium_scimitar', amount: 1 },
        { type: 'item', itemId: 'eternium_broad_sword', amount: 1 },
        { type: 'item', itemId: 'eternium_horned_helmet', amount: 1 }
      ]
    }]))
  },

  boss: {
    enemy: { id: 'boss_witch', amount: 1 }, /* TODO: add floor 27 boss here (this is floor 26 boss) */
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
