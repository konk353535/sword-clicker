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

export const LEVEL_NINE_LOOT_TABLE = orderLootTable([{
  chance: 1 / 256,
  rewards: [
    { type: 'item', itemId: 'steel_pickaxe', amount: 1 },
    { type: 'item', itemId: 'steel_axe', amount: 1 },
    { type: 'item', itemId: 'steel_dagger', amount: 1 },
  ]
}, {
  chance: 1 / 64,
  rewards: [
    { type: 'item', itemId: 'celery_seed', amount: 1 },
    { type: 'item', itemId: 'steel_bar', amount: 1 }
  ]
}, {
  chance: 1 / 32,
  rewards: [
    { type: 'item', itemId: 'steel_essence', amount: 1 }
  ]
}, {
  chance: 1 / 4,
  rewards: [
    { type: 'gold', amount: 600 },
    { type: 'item', itemId: 'ore_steel', amount: 1 },
    { type: 'item', itemId: 'mahogany_log', amount: 2 }
  ]
}]);

