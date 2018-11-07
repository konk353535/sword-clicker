import { orderLootTable } from '../../../enemies/lootTables/index.js';
import { ITEMS } from '../../../../../imports/constants/items/index';

import { LEVEL_ELEVEN_LOOT_TABLE } from '../../levels/level11';

export const TOWER_FLOOR_11 = {
  1: {
    name: 'Deep Mine',
    enemies: ['goblin', 'goblin'],
    rewards: []
  },
  2: {
    name: 'Ninja Academy',
    enemies: ['young_ninja', 'young_ninja'],
    rewards: LEVEL_ELEVEN_LOOT_TABLE
  },
  3: {
    name: 'Dwarven Fortress',
    enemies: ['dwarf', 'elephant'],
    rewards: orderLootTable(LEVEL_ELEVEN_LOOT_TABLE.concat([{
      chance: 1 / 8,
      rewards: [
        { type: 'item', itemId: 'lettice', amount: 50 },
        { type: 'item', itemId: 'feverfew_seed', amount: 1 }
      ]
    }, {
      chance: 1 / 128,
      rewards: [
        { type: 'item', itemId: 'tungsten_knife', amount: 1 }
      ]
    }]))
  },
  4: {
    name: 'Place of Tungsten',
    enemies: ['tungsten_spirit'],
    rewards: orderLootTable(LEVEL_ELEVEN_LOOT_TABLE.concat([{
      chance: 1 / 4,
      rewards: [
        { type: 'item', itemId: 'tungsten_essence', amount: 1 }
      ]
    }, {
      chance: 1 / 64,
      rewards: [
        { type: 'item', itemId: 'tungsten_wand', amount: 1 }
      ]
    }]))
  },
  5: {
    name: 'Warlock\'s Palace',
    enemies: ['demon', 'fire_mage'],
    rewards: orderLootTable(LEVEL_ELEVEN_LOOT_TABLE.concat([{
      chance: 1 / 128,
      rewards: [
        { type: 'item', itemId: 'tungsten_kite_shield', amount: 1 }
      ]
    }, {
      chance: 1 / 256,
      rewards: [
        { type: 'item', itemId: 'tungsten_buckler', amount: 1 }
      ]
    }]))
  },
  6: {
    name: 'Suspicious Mine',
    enemies: ['angry_miner', 'gorilla'],
    rewards: orderLootTable(LEVEL_ELEVEN_LOOT_TABLE.concat([{
      chance: 1 / 4,
      rewards: [
        { type: 'item', itemId: 'ore_tungsten', amount: 1 },
        { type: 'item', itemId: 'blue_gum_log', amount: 1 }
      ]
    }, {
      chance: 1 / 8,
      rewards: [
        { type: 'item', itemId: 'tungsten_bar', amount: 1 }
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'tungsten_dwarven_idol', amount: 1 },
        { type: 'item', itemId: 'tungsten_mining_hammer', amount: 1 }
      ]
    }, {
      chance: 1 / 64,
      rewards: [
        { type: 'item', itemId: 'glowing_orb', amount: 1 },
        { type: 'item', itemId: 'prestigious_tome', amount: 1 }
      ]
    }]))
  },
  7: {
    name: 'Mage\'s Guild',
    enemies: ['water_mage', 'fire_mage', 'earth_mage'],
    rewards: orderLootTable(LEVEL_ELEVEN_LOOT_TABLE.concat([{
      chance: 1 / 96,
      rewards: [
        { type: 'item', itemId: 'blizzard_tome', amount: 1 }
      ]
    }, {
      chance: 1 / 64,
      rewards: [
        { type: 'item', itemId: 'mending_spring_tome', amount: 1 }
      ]
    }, {
      chance: 1 / 4,
      rewards: [
        { type: 'item', itemId: 'water_shard_fragment', amount: 50 }
      ]
    }, {
      chance: 1 / 32,
      rewards: [
        { type: 'item', itemId: 'tungsten_scimitar', amount: 1 },
        { type: 'item', itemId: 'tungsten_broad_sword', amount: 1 },
        { type: 'item', itemId: 'tungsten_horned_helmet', amount: 1 }
      ]
    }]))
  },

  boss: {
    enemy: { id: 'boss_genie_lamp', amount: 1 },
    rewards: orderLootTable(LEVEL_ELEVEN_LOOT_TABLE.concat([{
      chance: 1 / 2,
      rewards: [
        { type: 'item', itemId: 'shadow_knife', amount: 1 },
        { type: 'item', itemId: 'smoke_dagger', amount: 1 }
      ]
    }]))
  },

  floorRewards: [
    {
      type: 'item',
      itemId: 'obsidian_dwarven_idol',
      icon: ITEMS['obsidian_dwarven_idol'].icon,
      name: ITEMS['obsidian_dwarven_idol'].name,
      baseStats: ITEMS['obsidian_dwarven_idol'].stats,
      extraStats: ITEMS['obsidian_dwarven_idol'].extraStats
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
