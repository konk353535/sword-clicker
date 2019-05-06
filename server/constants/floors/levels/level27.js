import { orderLootTable } from '../../enemies/lootTables/index.js';

export const LEVEL_TWENTY_SEVEN_MONSTERS = [{
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

export const LEVEL_TWENTY_SEVEN_LOOT_TABLE = orderLootTable([{}, {}, {
  chance: 1 / 256,
  rewards: [
    { type: 'item', itemId: 'purestone_ore', amount: 1 }
  ]
}, {
  chance: 1 / 256,
  rewards: [
    { type: 'item', itemId: 'spiritroot_log', amount: 1 }
  ]
}, {
  chance: 1 / 1024,
  rewards: [
    { type: 'item', itemId: 'purestone_essence', amount: 1 }
  ]
}, {
  chance: 1 / 8,
  rewards: [
    { type: 'item', itemId: 'ore_cursed', amount: 1 },
    { type: 'item', itemId: 'cursed_bar', amount: 1 },
    { type: 'item', itemId: 'magic_log', amount: 1 },
    { type: 'item', itemId: 'magic_log', amount: 2 }
  ]
}, {
  chance: 1 / 8,
  rewards: [
    { type: 'item', itemId: 'ore_mithril', amount: 1 },
    { type: 'item', itemId: 'fairy_steel_bar', amount: 1 },
    { type: 'item', itemId: 'fiery_log', amount: 1 },
    { type: 'item', itemId: 'fiery_log', amount: 2 }
  ]
}, {
  chance: 1 / 4,
  rewards: [
    { type: 'gold', amount: 3355 },
    { type: 'gold', amount: 6707},
    { type: 'gold', amount: 13414 },
    { type: 'item', itemId: 'polished_cursed', amount: 14 },
    { type: 'item', itemId: 'polished_cursed', amount: 20 }
  ]
}]);

