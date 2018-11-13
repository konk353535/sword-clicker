import { orderLootTable } from '../../enemies/lootTables/index.js';

export const LEVEL_FOURTEEN_MONSTERS = [{
  id: 'wolf',
  icon: 'wolf.svg',
  name: 'wolf'
}, {
  id: 'beaver',
  icon: 'beaver.svg',
  name: 'beaver'
}, {
  id: 'eagle',
  icon: 'eagle.svg',
  name: 'eagle'
}, {
  id: 'kangaroo',
  icon: 'kangaroo.svg',
  name: 'kangaroo'
}, {
  id: 'jellyFish',
  icon: 'jellyFish.svg',
  name: 'jellyfish',
  buffs: [{
    id: 'poisoned_blade',
    data: {
      level: 1,
      icon: 'poisonedBlade.svg',
      name: 'poisoned blade'
    }
  }]
}];

export const LEVEL_FOURTEEN_LOOT_TABLE = orderLootTable([{
  chance: 1 / 64,
  rewards: [
    { type: 'item', itemId: 'cobalt_pickaxe', amount: 1 },
    { type: 'item', itemId: 'cobalt_axe', amount: 1 },
    { type: 'item', itemId: 'cobalt_dagger', amount: 1 },
    { type: 'item', itemId: 'chilli', amount: 1 }
  ]
}, {
  chance: 1 / 64,
  rewards: [
    { type: 'item', itemId: 'slash_level_3_tome', amount: 1 }
  ]
}, {
  chance: 1 / 48,
  rewards: [
    { type: 'item', itemId: 'cobalt_essence_scroll', amount: 1 }
  ]
}, {
  chance: 1 / 24,
  rewards: [
    { type: 'item', itemId: 'cobalt_essence', amount: 1 }
  ]
}, {
  chance: 1 / 12,
  rewards: [
    { type: 'item', itemId: 'obsidian_essence', amount: 1 }
  ]
}, {
  chance: 1 / 4,
  rewards: [
    { type: 'item', itemId: 'ore_cobalt', amount: 1 },
    { type: 'item', itemId: 'cobalt_bar', amount: 1 },
    { type: 'item', itemId: 'denya_log', amount: 1 },
    { type: 'item', itemId: 'denya_log', amount: 2 }
  ]
}, {
  chance: 1 / 4,
  rewards: [
    { type: 'gold', amount: 206 },
    { type: 'gold', amount: 413 },
    { type: 'gold', amount: 825 },
    { type: 'item', itemId: 'cobalt_sculpture', amount: 1 },
    { type: 'item', itemId: 'cobalt_sculpture', amount: 2 },
    { type: 'item', itemId: 'cobalt_sculpture', amount: 3 }
  ]
}]);

