import { orderLootTable } from '/server/constants/enemies/lootTables/index.js';

export const LEVEL_ELEVEN_MONSTERS = [{
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

export const LEVEL_ELEVEN_LOOT_TABLE = orderLootTable([{
  chance: 1 / 256,
  rewards: [
    { type: 'item', itemId: 'titanium_pickaxe', amount: 1 },
    { type: 'item', itemId: 'titanium_axe', amount: 1 },
    { type: 'item', itemId: 'titanium_dagger', amount: 1 },
  ]
}, {
  chance: 1 / 64,
  rewards: [
    { type: 'item', itemId: 'titanium_bar', amount: 1 }
  ]
}, {
  chance: 1 / 48,
  rewards: [
    { type: 'item', itemId: 'titanium_essence', amount: 1 }
  ]
}, {
  chance: 1 / 8,
  rewards: [
    { type: 'gold', amount: 600 },
    { type: 'item', itemId: 'ore_titanium', amount: 1 },
    { type: 'item', itemId: 'black_log', amount: 2 }
  ]
}]);

