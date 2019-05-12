import { orderLootTable } from '../../../enemies/lootTables/index.js';
import { ITEMS } from '../../../../../imports/constants/items/index';

import { LEVEL_TWENTY_SEVEN_LOOT_TABLE } from '../../levels/level27';

export const TOWER_FLOOR_27 = {
  1: {
    name: 'The Choir',
    enemies: ['grotesque_giant', 'grotesque_giant', 'boss_high_angel', 'boss_high_angel', 'boss_high_angel', 'boss_high_angel', 'boss_high_angel'],
    rewards: []
  },
  2: {
    name: 'The Lair',
    enemies: ['boss_dragon', 'boss_dragon', 'boss_dragon', 'boss_dragon'],
    rewards: orderLootTable(LEVEL_TWENTY_SEVEN_LOOT_TABLE.concat([{
      chance: 1 / 64,
      rewards: [
        { type: 'item', itemId: 'prismatic_dagger_scroll', amount: 1 },
        { type: 'item', itemId: 'prismatic_furnace_scroll', amount: 1 }
      ]
    }]))
  },
  3: {
    name: 'Heads And Tails',
    enemies: ['hydra', 'boss_kraken', 'boss_cassiopeia'],
    rewards: orderLootTable(LEVEL_TWENTY_SEVEN_LOOT_TABLE.concat([{
      chance: 1 / 96,
      rewards: [
        { type: 'item', itemId: 'prismatic_shield_scroll', amount: 1 },
        { type: 'item', itemId: 'prismatic_short_sword_scroll', amount: 1 }
      ]
    }, {
      chance: 1 / 1280,
      rewards: [
        { type: 'item', itemId: 'prismatic_knife', amount: 1 }
      ]
    }, {
      chance: 1 / 96,
      rewards: [
        { type: 'item', itemId: 'spiritroot_bow_scroll', amount: 1 },
      ]
    }, {
      chance: 1 / 96,
      rewards: [
        { type: 'item', itemId: 'prismatic_quiver_scroll', amount: 1 },
      ]
    }]))
  },
  4: {
    name: 'Ruined',
    enemies: ['boss_ruiner', 'boss_ruiner'],
    rewards: orderLootTable(LEVEL_TWENTY_SEVEN_LOOT_TABLE.concat([{
      chance: 1 / 1280,
      rewards: [
        { type: 'item', itemId: 'prismatic_rapiers', amount: 1 }
      ]
    }, {
      chance: 1 / 96,
      rewards: [
        { type: 'item', itemId: 'prismatic_helmet_scroll', amount: 1 },
        { type: 'item', itemId: 'prismatic_chest_plate_scroll', amount: 1 }
      ]
    }, {
      chance: 1 / 1280,
      rewards: [
        { type: 'item', itemId: 'prismatic_wand', amount: 1 }
      ]
    }]))
  },
  5: {
    name: 'Love To Hate It',
    enemies: ['seething_hatred', 'wither', 'seething_hatred', 'seething_hatred', 'wither', 'tormentor'],
    rewards: orderLootTable(LEVEL_TWENTY_SEVEN_LOOT_TABLE.concat([{
      chance: 1 / 1280,
      rewards: [
        { type: 'item', itemId: 'prismatic_kite_shield', amount: 1 }
      ]
    }, {
      chance: 1 / 1280,
      rewards: [
        { type: 'item', itemId: 'prismatic_spirit_shield', amount: 1 }
      ]
    }, {
      chance: 1 / 1280,
      rewards: [
        { type: 'item', itemId: 'prismatic_buckler', amount: 1 }
      ]
    }, {
      chance: 1 / 96,
      rewards: [
        { type: 'item', itemId: 'prismatic_axe_scroll', amount: 1 },
        { type: 'item', itemId: 'prismatic_pickaxe_scroll', amount: 1 },
        { type: 'item', itemId: 'prismatic_mining_anvil_scroll', amount: 1 }
      ]
    }/*, {
      chance: 1 / 1280,
      rewards: [
        { type: 'item', itemId: 'exalted_wizard_hat', amount: 1 },
        { type: 'item', itemId: 'exalted_wizard_shirt', amount: 1 },
        { type: 'item', itemId: 'exalted_wizard_shorts', amount: 1 }
      ]
    }*/]))
  },
  6: {
    name: 'Upset',
    enemies: ['ripper', 'troglodyte', 'ripper', 'troglodyte', 'ripper'],
    rewards: orderLootTable(LEVEL_TWENTY_SEVEN_LOOT_TABLE.concat([{
      chance: 1 / 96,
      rewards: [
        { type: 'item', itemId: 'prismatic_spear_scroll', amount: 1 },
        { type: 'item', itemId: 'prismatic_plate_legs_scroll', amount: 1 }
      ]
    }, {
      chance: 1 / 96,
      rewards: [
        { type: 'item', itemId: 'prismatic_dwarven_idol', amount: 1 },
        { type: 'item', itemId: 'prismatic_mining_hammer', amount: 1 }
      ]
    }/*, {
      chance: 1 / 1280,
      rewards: [
        { type: 'item', itemId: 'exalted_orb', amount: 1 },
        { type: 'item', itemId: 'exalted_tome', amount: 1 }
      ]
    }*/]))
  },
  7: {
    name: 'Suffering',
    enemies: ['eternal_warden', 'boss_mage', 'boss_high_angel', 'eternal_warden'],
    rewards: orderLootTable(LEVEL_TWENTY_SEVEN_LOOT_TABLE.concat([{
      chance: 1 / 96,
      rewards: [
        { type: 'item', itemId: 'prismatic_long_sword_scroll', amount: 1 },
        { type: 'item', itemId: 'prismatic_battle_axe_scroll', amount: 1 }
      ]
    }, {
      chance: 1 / 920,
      rewards: [
        { type: 'item', itemId: 'prismatic_hammer', amount: 1 }
      ]
    }, {
      chance: 1 / 480,
      rewards: [
        { type: 'item', itemId: 'prismatic_scimitar', amount: 1 },
        { type: 'item', itemId: 'prismatic_broad_sword', amount: 1 },
        { type: 'item', itemId: 'prismatic_horned_helmet', amount: 1 }
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'ore_purestone', amount: 1 }
      ]
    }, {
      chance: 1 / 64,
      rewards: [
        { type: 'item', itemId: 'spiritroot_log', amount: 1 }
      ]
    }, {
      chance: 1 / 256,
      rewards: [
        { type: 'item', itemId: 'purestone_essence', amount: 1 }
      ]
    }]))
  },
  
  boss: {
    enemy: { id: 'boss_lich', amount: 1 },
    rewards: orderLootTable(LEVEL_TWENTY_SEVEN_LOOT_TABLE.concat([{
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
      amount: 100000000
    }
  ]
};
