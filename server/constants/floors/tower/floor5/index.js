import { orderLootTable } from '/server/constants/enemies/lootTables/index.js';
import { ITEMS } from '/server/constants/items/index';
import { LEVEL_FIVE_LOOT_TABLE } from '/server/constants/floors/levels/level5';

export const TOWER_FLOOR_5 = {
  1: {
    name: 'Muddy Creek',
    enemies: ['worm'],
    rewards: []
  },
  2: {
    name: 'Farmer\'s Market',
    enemies: ['farmer'],
    rewards: orderLootTable(LEVEL_FIVE_LOOT_TABLE.concat([{
      chance: 1 / 4,
      rewards: [
        { type: 'item', itemId: 'lettice_seed', amount: 1 },
        { type: 'item', itemId: 'lemon_seed', amount: 1 },
        { type: 'item', itemId: 'pineapple_seed', amount: 1 },
        { type: 'item', itemId: 'red_apple_seed', amount: 1 }
      ]
    }]))
  },
  3: {
    name: 'Dark Ally',
    enemies: ['cut_purse'],
    rewards: orderLootTable(LEVEL_FIVE_LOOT_TABLE.concat([{
      chance: 1 / 16,
      rewards: [
        { type: 'icon', iconId: 'crow_t1' }
      ]
    }, {
      chance: 1 / 16,
      rewards: [
        { type: 'item', itemId: 'double_edged_sword_1_tome', amount: 1 }
      ]
    },{
      chance: 1 / 128,
      rewards: [
        { type: 'item', itemId: 'silver_knife', amount: 1 }
      ]
    }]))
  },
  4: {
    name: 'Place of Silver',
    enemies: ['vampire'],
    rewards: orderLootTable(LEVEL_FIVE_LOOT_TABLE.concat([{
      chance: 1 / 3,
      rewards: [
        { type: 'item', itemId: 'silver_essence', amount: 1 }
      ]
    }]))
  },
  5: {
    name: 'Beech Tree',
    enemies: ['beaver'],
    rewards: orderLootTable(LEVEL_FIVE_LOOT_TABLE.concat([{
      chance: 1 / 16,
      rewards: [
        { type: 'item', itemId: 'beech_seed', amount: 3 },
        { type: 'item', itemId: 'beech_log', amount: 20 },
        { type: 'item', itemId: 'beech_staff', amount: 1 }
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'blue_wizard_hat', amount: 1 },
        { type: 'item', itemId: 'blue_wizard_shirt', amount: 1 },
        { type: 'item', itemId: 'blue_wizard_shorts', amount: 1 }
      ]
    }, {
      chance: 1 / 128,
      rewards: [
        { type: 'item', itemId: 'blue_trident', amount: 1 }
      ]
    }]))
  },
  6: {
    name: 'Suspicious Mine',
    enemies: ['angry_miner'],
    rewards: orderLootTable(LEVEL_FIVE_LOOT_TABLE.concat([{
      chance: 1 / 4,
      rewards: [
        { type: 'item', itemId: 'ore_silver', amount: 1 },
        { type: 'item', itemId: 'maple_log', amount: 1 }
      ]
    }, {
      chance: 1 / 8,
      rewards: [
        { type: 'item', itemId: 'silver_bar', amount: 1 }
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'silver_dwarven_idol', amount: 1 },
        { type: 'item', itemId: 'silver_mining_hammer', amount: 1 }
      ]
    }]))
  },
  7: {
    name: 'Snake',
    enemies: ['snake'],
    rewards: orderLootTable(LEVEL_FIVE_LOOT_TABLE.concat([{
      chance: 1 / 24,
      rewards: [
        { type: 'item', itemId: 'poisoned_blade_1_tome', amount: 1 },
        { type: 'item', itemId: 'poison_dart_tome', amount: 1 }
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'silver_scimitar', amount: 1 },
        { type: 'item', itemId: 'silver_broad_sword', amount: 1 },
        { type: 'item', itemId: 'silver_horned_helmet', amount: 1 },
      ]
    }, {
      chance: 1 / 4,
      rewards: [
        { type: 'item', itemId: 'poison_shard_fragment', amount: 25 }
      ]
    }]))
  },

  boss: {
    enemy: { id: 'boss_spartan', amount: 1 },
    rewards: orderLootTable(LEVEL_FIVE_LOOT_TABLE.concat([{
      chance: 1 / 2,
      rewards: [
        { type: 'item', itemId: 'spartan_spear', amount: 1 }
      ]
    }]))
  },

  floorRewards: [
    {
      type: 'item',
      itemId: 'gold_dwarven_idol',
      icon: ITEMS['gold_dwarven_idol'].icon,
      name: ITEMS['gold_dwarven_idol'].name,
      baseStats: ITEMS['gold_dwarven_idol'].stats,
      extraStats: ITEMS['gold_dwarven_idol'].extraStats
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
      amount: 30000
    }
  ]
}
