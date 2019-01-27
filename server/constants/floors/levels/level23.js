import { orderLootTable } from '../../enemies/lootTables/index.js';

export const LEVEL_TWENTY_THREE_MONSTERS = [{
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

export const LEVEL_TWENTY_THREE_LOOT_TABLE = orderLootTable([{}, {}, {
  chance: 1 / 16,
  rewards: [
    { type: 'item', itemId: 'cursed_essence', amount: 1 }
  ]
}, {
  chance: 1 / 16,
  rewards: [
    { type: 'item', itemId: 'meteorite_essence', amount: 1 }
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
    { type: 'item', itemId: 'ore_meteorite', amount: 1 },
    { type: 'item', itemId: 'meteorite_bar', amount: 1 },
    { type: 'item', itemId: 'poplar_log', amount: 1 },
    { type: 'item', itemId: 'poplar_log', amount: 2 }
  ]
}, {
  chance: 1 / 4,
  rewards: [
    { type: 'gold', amount: 1500 },
    { type: 'gold', amount: 3000 },
    { type: 'gold', amount: 7000 },
    { type: 'item', itemId: 'polished_cursed', amount: 5 },
    { type: 'item', itemId: 'polished_cursed', amount: 8 }
  ]
}]);

