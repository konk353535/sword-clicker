import { orderLootTable } from '../../enemies/lootTables/index.js';

export const LEVEL_NINETEEN_MONSTERS = [{
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

export const LEVEL_NINETEEN_LOOT_TABLE = orderLootTable([{
  chance: 1 / 64,
  rewards: [
    { type: 'item', itemId: 'fairy_steel_pickaxe', amount: 1 },
    { type: 'item', itemId: 'fairy_steel_axe', amount: 1 },
    { type: 'item', itemId: 'fairy_steel_dagger', amount: 1 },
    { type: 'item', itemId: 'chilli', amount: 1 },
  ]
}, {
  chance: 1 / 48,
  rewards: [
    { type: 'item', itemId: 'fairy_steel_essence_scroll', amount: 1 }
  ]
}, {
  chance: 1 / 24,
  rewards: [
    { type: 'item', itemId: 'fairy_steel_essence', amount: 1 }
  ]
}, {
  chance: 1 / 12,
  rewards: [
    { type: 'item', itemId: 'meteorite_essence', amount: 1 }
  ]
}, {
  chance: 1 / 4,
  rewards: [
    { type: 'item', itemId: 'ore_fairy_steel', amount: 1 },
    { type: 'item', itemId: 'fairy_steel_bar', amount: 1 },
    { type: 'item', itemId: 'tali_log', amount: 1 },
    { type: 'item', itemId: 'tali_log', amount: 2 }
  ]
}, {
  chance: 1 / 4,
  rewards: [
    { type: 'gold', amount: 375 },
    { type: 'gold', amount: 750 },
    { type: 'gold', amount: 1500 },
    { type: 'item', itemId: 'polished_fairy_steel', amount: 1 },
    { type: 'item', itemId: 'polished_fairy_steel', amount: 2 }
  ]
}]);

