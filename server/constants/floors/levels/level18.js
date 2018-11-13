import { orderLootTable } from '../../enemies/lootTables/index.js';

export const LEVEL_EIGHTEEN_MONSTERS = [{
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

export const LEVEL_EIGHTEEN_LOOT_TABLE = orderLootTable([{
  chance: 1 / 64,
  rewards: [
    { type: 'item', itemId: 'meteorite_pickaxe', amount: 1 },
    { type: 'item', itemId: 'meteorite_axe', amount: 1 },
    { type: 'item', itemId: 'meteorite_dagger', amount: 1 },
    { type: 'item', itemId: 'chilli', amount: 1 },
  ]
}, {
  chance: 1 / 46,
  rewards: [
    { type: 'item', itemId: 'meteorite_essence_scroll', amount: 1 }
  ]
}, {
  chance: 1 / 24,
  rewards: [
    { type: 'item', itemId: 'meteorite_essence', amount: 1 }
  ]
}, {
  chance: 1 / 12,
  rewards: [
    { type: 'item', itemId: 'orichalcum_essence', amount: 1 }
  ]
}, {
  chance: 1 / 4,
  rewards: [
    { type: 'item', itemId: 'ore_meteorite', amount: 1 },
    { type: 'item', itemId: 'meteorite_bar', amount: 1 },
    { type: 'item', itemId: 'poplar_log', amount: 1 },
    { type: 'item', itemId: 'poplar_log', amount: 2 }
  ]
}, {
  chance: 1 / 4,
  rewards: [
    { type: 'gold', amount: 281 },
    { type: 'gold', amount: 563 },
    { type: 'gold', amount: 1125 },
    { type: 'item', itemId: 'meteorite_sculpture', amount: 1 },
    { type: 'item', itemId: 'meteorite_sculpture', amount: 2 },
    { type: 'item', itemId: 'meteorite_sculpture', amount: 3 }
  ]
}]);

