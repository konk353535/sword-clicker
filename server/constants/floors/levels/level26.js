import { orderLootTable } from '../../enemies/lootTables/index.js';

export const LEVEL_TWENTY_SIX_MONSTERS = [{
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

export const LEVEL_TWENTY_SIX_LOOT_TABLE = orderLootTable([{}, {}, {
  chance: 1 / 16,
  rewards: [
    { type: 'item', itemId: 'cursed_essence', amount: 1 }
  ]
}, {
  chance: 1 / 16,
  rewards: [
    { type: 'item', itemId: 'mithril_essence', amount: 1 }
  ]
}, {
  chance: 1 / 4,
  rewards: [
    { type: 'item', itemId: 'ore_cursed', amount: 1 },
    { type: 'item', itemId: 'cursed_bar', amount: 1 },
    { type: 'item', itemId: 'magic_log', amount: 1 },
    { type: 'item', itemId: 'magic_log', amount: 2 }
  ]
}, {
  chance: 1 / 4,
  rewards: [
    { type: 'item', itemId: 'ore_mithril', amount: 1 },
    { type: 'item', itemId: 'fairy_steel_bar', amount: 1 },
    { type: 'item', itemId: 'fiery_log', amount: 1 },
    { type: 'item', itemId: 'fiery_log', amount: 2 }
  ]
}, {
  chance: 1 / 4,
  rewards: [
    { type: 'gold', amount: 3067 },
    { type: 'gold', amount: 6125 },
    { type: 'gold', amount: 12500 },
    { type: 'item', itemId: 'polished_cursed', amount: 10 },
    { type: 'item', itemId: 'polished_cursed', amount: 15 }
  ]
}]);

