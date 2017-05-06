import { orderLootTable } from '/server/constants/enemies/lootTables/index.js';

export const LEVEL_NINE_MONSTERS = [{
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
  name: 'jellyfish'
}];

export const LEVEL_NINE_LOOT_TABLE = orderLootTable([{
  chance: 1 / 256,
  rewards: [
    { type: 'item', itemId: 'orichalcum_pickaxe', amount: 1 },
    { type: 'item', itemId: 'orichalcum_axe', amount: 1 },
    { type: 'item', itemId: 'orichalcum_dagger', amount: 1 },
  ]
}, {
  chance: 1 / 64,
  rewards: [
    { type: 'item', itemId: 'lavender', amount: 1 },
    { type: 'item', itemId: 'orichalcum_bar', amount: 1 }
  ]
}, {
  chance: 1 / 32,
  rewards: [
    { type: 'item', itemId: 'ore_orichalcum', amount: 1 }
  ]
}, {
  chance: 1 / 16,
  rewards: [
    { type: 'item', itemId: 'ore_orichalcum', amount: 1 },
    { type: 'item', itemId: 'orichalcum_essence', amount: 1 }
  ]
}, {
  chance: 1 / 8,
  rewards: [
    { type: 'gold', amount: 600 },
    { type: 'item', itemId: 'cherry_log', amount: 2 }
  ]
}]);

