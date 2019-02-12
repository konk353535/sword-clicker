import { orderLootTable } from '../../../enemies/lootTables/index.js';
import { ITEMS } from '../../../../../imports/constants/items/index';

import { LEVEL_TWENTY_ONE_LOOT_TABLE } from '../../levels/level21';

export const TOWER_FLOOR_21 = {
  1: {
    name: 'Bees?',
    enemies: ['bee', 'bee'],
    rewards: []
  },
  2: {
    name: 'Tangled Undergrowth',
    enemies: ['wasp'],
    rewards: orderLootTable(LEVEL_TWENTY_ONE_LOOT_TABLE.concat([{
      chance: 1 / 16,
      rewards: [
        { type: 'item', itemId: 'darksteel_dagger_scroll', amount: 1 },
        { type: 'item', itemId: 'darksteel_furnace_scroll', amount: 1 }
      ]
    }]))
  },
  3: {
    name: 'Swampy Grove',
    enemies: ['gelatinous_cube'],
    rewards: orderLootTable(LEVEL_TWENTY_ONE_LOOT_TABLE.concat([{
      chance: 1 / 16,
      rewards: [
        { type: 'item', itemId: 'darksteel_shield_scroll', amount: 1 },
        { type: 'item', itemId: 'darksteel_short_sword_scroll', amount: 1 }
      ]
    }, {
      chance: 1 / 128,
      rewards: [
        { type: 'item', itemId: 'darksteel_knife', amount: 1 }
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'ebony_bow_scroll', amount: 1 },
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'darksteel_quiver_scroll', amount: 1 },
      ]
    }]))
  },
  4: {
    name: 'Abandoned Manor',
    enemies: ['vampire'],
    rewards: orderLootTable(LEVEL_TWENTY_ONE_LOOT_TABLE.concat([{
      chance: 1 / 128,
      rewards: [
        { type: 'item', itemId: 'darksteel_rapiers', amount: 1 }
      ]
    }, {
      chance: 1 / 16,
      rewards: [
        { type: 'item', itemId: 'darksteel_helmet_scroll', amount: 1 },
        { type: 'item', itemId: 'darksteel_chest_plate_scroll', amount: 1 }
      ]
    }, {
      chance: 1 / 64,
      rewards: [
        { type: 'item', itemId: 'darksteel_wand', amount: 1 }
      ]
    }]))
  },
  5: {
    name: 'Old Tree',
    enemies: ['bird', 'cut_purse'],
    rewards: orderLootTable(LEVEL_TWENTY_ONE_LOOT_TABLE.concat([{
      chance: 1 / 128,
      rewards: [
        { type: 'item', itemId: 'darksteel_kite_shield', amount: 1 }
      ]
    },{
      chance: 1 / 16,
      rewards: [
        { type: 'item', itemId: 'darksteel_axe_scroll', amount: 1 },
        { type: 'item', itemId: 'darksteel_pickaxe_scroll', amount: 1 },
        { type: 'item', itemId: 'darksteel_mining_anvil_scroll', amount: 1 }
      ]
    }, {
      chance: 1 / 128,
      rewards: [
        { type: 'item', itemId: 'serpent_trident', amount: 1 }
      ]
    }, {
      chance: 1 / 48,
      rewards: [
        { type: 'item', itemId: 'precise_shots_level_5_tome', amount: 1 }
      ]
    }]))
  },
  6: {
    name: 'Peaceful Hillock',
    enemies: ['echidna', 'water_mage'],
    rewards: orderLootTable(LEVEL_TWENTY_ONE_LOOT_TABLE.concat([{
      chance: 1 / 16,
      rewards: [
        { type: 'item', itemId: 'darksteel_spear_scroll', amount: 1 },
        { type: 'item', itemId: 'darksteel_plate_legs_scroll', amount: 1 }
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'darksteel_dwarven_idol', amount: 1 }
      ]
    }, {
      chance: 1 / 64,
      rewards: [
        { type: 'item', itemId: 'intense_orb', amount: 1 },
        /* { type: 'item', itemId: 'xxxxx_tome', amount: 1 } */
      ]
    }]))
  },
  7: {
    name: 'Dark Cave',
    enemies: ['goblin'],
    rewards: orderLootTable(LEVEL_TWENTY_ONE_LOOT_TABLE.concat([{
      chance: 1 / 16,
      rewards: [
        { type: 'item', itemId: 'darksteel_long_sword_scroll', amount: 1 },
        { type: 'item', itemId: 'darksteel_battle_axe_scroll', amount: 1 }
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'darksteel_scimitar', amount: 1 },
        { type: 'item', itemId: 'darksteel_broad_sword', amount: 1 },
        { type: 'item', itemId: 'darksteel_horned_helmet', amount: 1 }
      ]
    }]))
  },

  boss: {
    enemy: { id: 'boss_dragon', amount: 1 },
    rewards: orderLootTable(LEVEL_TWENTY_ONE_LOOT_TABLE.concat([{
      chance: 1 / 2,
      rewards: [
        { type: 'item', itemId: 'eternal_flame', amount: 1 }
      ]
    }]))
  },

  floorRewards: [
    {
      type: 'item',
      itemId: 'radiant_dwarven_idol',
      icon: ITEMS['radiant_dwarven_idol'].icon,
      name: ITEMS['radiant_dwarven_idol'].name,
      baseStats: ITEMS['radiant_dwarven_idol'].stats,
      extraStats: ITEMS['radiant_dwarven_idol'].extraStats
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
      amount: 500000
    }
  ]
};
