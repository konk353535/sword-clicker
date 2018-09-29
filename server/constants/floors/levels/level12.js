import { orderLootTable } from '../../enemies/lootTables/index.js';

export const LEVEL_TWELVE_MONSTERS = [{
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

export const LEVEL_TWELVE_LOOT_TABLE = orderLootTable([{
  chance: 1 / 256,
  rewards: [
    { type: 'item', itemId: 'tungsten_pickaxe', amount: 1 },
    { type: 'item', itemId: 'tungsten_axe', amount: 1 },
    { type: 'item', itemId: 'tungsten_dagger', amount: 1 },
    { type: 'item', itemId: 'lavender', amount: 1 }
  ]
}, {
  chance: 1 / 64,
  rewards: [
    { type: 'item', itemId: 'tungsten_bar', amount: 1 }
  ]
}, {
  chance: 1 / 24,
  rewards: [
    { type: 'item', itemId: 'tungsten_essence', amount: 1 }
  ]
}, {
  chance: 1 / 16,
  rewards: [
    { type: 'item', itemId: 'tungsten_essence_scroll', amount: 1 }
  ]
}, {
  chance: 1 / 4,
  rewards: [
    { type: 'gold', amount: 1500 },
    { type: 'item', itemId: 'ore_tungsten', amount: 1 },
    { type: 'item', itemId: 'blue_gum_log', amount: 2 }
  ]
}]);

