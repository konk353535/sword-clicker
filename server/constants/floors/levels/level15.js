import { orderLootTable } from '/server/constants/enemies/lootTables/index.js';

export const LEVEL_FIFTEEN_MONSTERS = [{
  id: 'wolf',
  icon: 'wolf',
  name: 'wolf'
}, {
  id: 'beaver',
  icon: 'beaver',
  name: 'beaver'
}, {
  id: 'eagle',
  icon: 'eagle',
  name: 'eagle'
}, {
  id: 'kangaroo',
  icon: 'kangaroo',
  name: 'kangaroo'
}, {
  id: 'jellyFish',
  icon: 'jellyFish',
  name: 'jellyfish',
  buffs: [{
    id: 'poisoned_blade',
    data: {
      level: 1,
      icon: 'poisonedBlade',
      name: 'poisoned blade'
    }
  }]
}];

export const LEVEL_FIFTEEN_LOOT_TABLE = orderLootTable([{
  chance: 1 / 256,
  rewards: [
    { type: 'item', itemId: 'mithril_pickaxe', amount: 1 },
    { type: 'item', itemId: 'mithril_axe', amount: 1 },
    { type: 'item', itemId: 'mithril_dagger', amount: 1 },
  ]
}, {
  chance: 1 / 64,
  rewards: [
    { type: 'item', itemId: 'mithril_bar', amount: 1 }
  ]
}, {
  chance: 1 / 48,
  rewards: [
    { type: 'item', itemId: 'mithril_essence', amount: 1 }
  ]
}, {
  chance: 1 / 4,
  rewards: [
    { type: 'gold', amount: 600 },
    { type: 'item', itemId: 'ore_mithril', amount: 1 },
    { type: 'item', itemId: 'gombe_log', amount: 2 }
  ]
}]);

