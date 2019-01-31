import { orderLootTable } from '../../enemies/lootTables/index.js';

export const LEVEL_TWENTY_FOUR_MONSTERS = [{
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

export const LEVEL_TWENTY_FOUR_LOOT_TABLE = orderLootTable([{}, {}, {
  chance: 1 / 16,
  rewards: [
    { type: 'item', itemId: 'cursed_essence', amount: 1 }
  ]
}, {
  chance: 1 / 16,
  rewards: [
    { type: 'item', itemId: 'fairy_steel_essence', amount: 1 }
  ]
}, {
  chance: 1 / 4,
  rewards: [
    { type: 'item', itemId: 'ore_cursed', amount: 1 },
    { type: 'item', itemId: 'cursed_bar', amount: 1 },
    { type: 'item', itemId: 'teak_log', amount: 1 },
    { type: 'item', itemId: 'teak_log', amount: 2 }
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
    { type: 'gold', amount: 2125 },
    { type: 'gold', amount: 4250 },
    { type: 'gold', amount: 8500 },
    { type: 'item', itemId: 'polished_cursed', amount: 6 },
    { type: 'item', itemId: 'polished_cursed', amount: 9 }
  ]
}]);

