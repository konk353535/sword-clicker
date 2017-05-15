import { orderLootTable } from '/server/constants/enemies/lootTables/index.js';

export const LEVEL_EIGHT_MONSTERS = [{
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

export const LEVEL_EIGHT_LOOT_TABLE = orderLootTable([{
  chance: 1 / 256,
  rewards: [
    { type: 'item', itemId: 'celery_seed', amount: 1 },
  ]
}, {
  chance: 1 / 128,
  rewards: [
    { type: 'item', itemId: 'adamantium_pickaxe', amount: 1 },
    { type: 'item', itemId: 'adamantium_axe', amount: 1 },
    { type: 'item', itemId: 'adamantium_dagger', amount: 1 }
  ]
}, {
  chance: 1 / 64,
  rewards: [
    { type: 'item', itemId: 'adamantium_bar', amount: 1 }
  ]
}, {
  chance: 1 / 16,
  rewards: [
    { type: 'item', itemId: 'adamantium_essence', amount: 1 }
  ]
}, {
  chance: 1 / 8,
  rewards: [
    { type: 'gold', amount: 600 },
    { type: 'item', itemId: 'ore_adamantium', amount: 1 },
    { type: 'item', itemId: 'walnut_log', amount: 2 }
  ]
}]);

