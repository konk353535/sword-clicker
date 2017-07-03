import { orderLootTable } from '/server/constants/enemies/lootTables/index.js';

export const LEVEL_SIX_MONSTERS = [{
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

export const LEVEL_SIX_LOOT_TABLE = orderLootTable([{
  chance: 1 / 96,
  rewards: [
    { type: 'item', itemId: 'silver_pickaxe', amount: 1 },
    { type: 'item', itemId: 'silver_axe', amount: 1 },
    { type: 'item', itemId: 'silver_dagger', amount: 1 }
  ]
}, {
  chance: 1 / 32,
  rewards: [
    { type: 'item', itemId: 'silver_essence', amount: 1 }
  ]
}, {
  chance: 1 / 8,
  rewards: [
    { type: 'item', itemId: 'silver_bar', amount: 1 },
    { type: 'item', itemId: 'ore_silver', amount: 1 }
  ]
}, {
  chance: 1 / 4,
  rewards: [
    { type: 'gold', amount: 250 },
    { type: 'item', itemId: 'ore_silver', amount: 1 },
    { type: 'item', itemId: 'maple_log', amount: 1 }
  ]
}]);

