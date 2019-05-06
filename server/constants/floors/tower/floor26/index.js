import { orderLootTable } from '../../../enemies/lootTables/index.js';
import { ITEMS } from '../../../../../imports/constants/items/index';

import { LEVEL_TWENTY_SIX_LOOT_TABLE } from '../../levels/level26';

export const TOWER_FLOOR_26 = {
  1: {
    name: 'Through The Muck',
    enemies: ['snake', 'rat', 'spider', 'rat'],
    rewards: []
  },
  2: {
    name: 'Sewer Scum',
    enemies: ['fish', 'fish', 'jellyFish', 'jellyFish'],
    rewards: orderLootTable(LEVEL_TWENTY_SIX_LOOT_TABLE.concat([{
      chance: 1 / 32,
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
      chance: 1 / 48,
      rewards: [
        { type: 'item', itemId: 'eternium_shield_scroll', amount: 1 },
        { type: 'item', itemId: 'eternium_short_sword_scroll', amount: 1 }
      ]
    }, {
      chance: 1 / 128,
      rewards: [
        { type: 'item', itemId: 'eternium_knife', amount: 1 }
      ]
    }, {
      chance: 1 / 48,
      rewards: [
        { type: 'item', itemId: 'ancient_bow_scroll', amount: 1 },
      ]
    }, {
      chance: 1 / 48,
      rewards: [
        { type: 'item', itemId: 'eternium_quiver_scroll', amount: 1 },
      ]
    }]))
  },
  4: {
    name: 'The Grand Wizard',
    enemies: ['eternal_warden'],
    rewards: orderLootTable(LEVEL_TWENTY_SIX_LOOT_TABLE.concat([{
      chance: 1 / 128,
      rewards: [
        { type: 'item', itemId: 'eternium_rapiers', amount: 1 }
      ]
    }, {
      chance: 1 / 48,
      rewards: [
        { type: 'item', itemId: 'eternium_helmet_scroll', amount: 1 },
        { type: 'item', itemId: 'eternium_chest_plate_scroll', amount: 1 }
      ]
    }, {
      chance: 1 / 128,
      rewards: [
        { type: 'item', itemId: 'eternium_wand', amount: 1 }
      ]
    }]))
  },
  5: {
    name: 'Dread Mire',
    enemies: ['jellyFish', 'troglodyte', 'jellyFish'],
    rewards: orderLootTable(LEVEL_TWENTY_SIX_LOOT_TABLE.concat([{
      chance: 1 / 192,
      rewards: [
        { type: 'item', itemId: 'scepter_of_power_scroll', amount: 1 }
      ]
    }, {
      chance: 1 / 128,
      rewards: [
        { type: 'item', itemId: 'eternium_kite_shield', amount: 1 }
      ]
    }, {
      chance: 1 / 48,
      rewards: [
        { type: 'item', itemId: 'eternium_spirit_shield', amount: 1 }
      ]
    }, {
      chance: 1 / 128,
      rewards: [
        { type: 'item', itemId: 'eternium_buckler', amount: 1 }
      ]
    }, {
      chance: 1 / 48,
      rewards: [
        { type: 'item', itemId: 'eternium_axe_scroll', amount: 1 },
        { type: 'item', itemId: 'eternium_pickaxe_scroll', amount: 1 },
        { type: 'item', itemId: 'eternium_mining_anvil_scroll', amount: 1 }
      ]
    }, {
      chance: 1 / 128,
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
      chance: 1 / 48,
      rewards: [
        { type: 'item', itemId: 'eternium_spear_scroll', amount: 1 },
        { type: 'item', itemId: 'eternium_plate_legs_scroll', amount: 1 }
      ]
    }, {
      chance: 1 / 48,
      rewards: [
        { type: 'item', itemId: 'eternium_dwarven_idol', amount: 1 },
        { type: 'item', itemId: 'eternium_mining_hammer', amount: 1 }
      ]
    }, {
      chance: 1 / 128,
      rewards: [
        { type: 'item', itemId: 'exalted_orb', amount: 1 },
        { type: 'item', itemId: 'exalted_tome', amount: 1 }
      ]
    }]))
  },
  7: {
    name: 'Always Another Way',
    enemies: ['hydra'],
    rewards: orderLootTable(LEVEL_TWENTY_SIX_LOOT_TABLE.concat([{
      chance: 1 / 48,
      rewards: [
        { type: 'item', itemId: 'eternium_long_sword_scroll', amount: 1 },
        { type: 'item', itemId: 'eternium_battle_axe_scroll', amount: 1 }
      ]
    }, {
      chance: 1 / 92,
      rewards: [
        { type: 'item', itemId: 'eternium_hammer', amount: 1 }
      ]
    }, {
      chance: 1 / 48,
      rewards: [
        { type: 'item', itemId: 'eternium_scimitar', amount: 1 },
        { type: 'item', itemId: 'eternium_broad_sword', amount: 1 },
        { type: 'item', itemId: 'eternium_horned_helmet', amount: 1 }
      ]
    }]))
  },

  boss: {
    enemy: { id: 'boss_lich', amount: 1 },
    rewards: orderLootTable(LEVEL_TWENTY_SIX_LOOT_TABLE.concat([{
      chance: 1 / 2,
      rewards: [
        { type: 'item', itemId: 'lichs_cowl', amount: 1 }
      ]
    }, {
      chance: 1 / 2,
      rewards: [
        { type: 'item', itemId: 'lichs_robes', amount: 1 }
      ]
    }, {
      chance: 1 / 2,
      rewards: [
        { type: 'item', itemId: 'lichs_wraps', amount: 1 }
      ]
    }]))
  },

  floorRewards: [
    {
      type: 'item',
      itemId: 'prismatic_dwarven_idol',
      icon: ITEMS['prismatic_dwarven_idol'].icon,
      name: ITEMS['prismatic_dwarven_idol'].name,
      baseStats: ITEMS['prismatic_dwarven_idol'].stats,
      extraStats: ITEMS['prismatic_dwarven_idol'].extraStats
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
