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
  name: 'jellyfish'
}];

export const LEVEL_SIX_LOOT_TABLE = orderLootTable([{
  chance: 1 / 128,
  rewards: [
    { type: 'item', itemId: 'carbon_pickaxe', amount: 1 },
    { type: 'item', itemId: 'carbon_axe', amount: 1 },
    { type: 'item', itemId: 'carbon_dagger', amount: 1 }
  ]
}, {
  chance: 1 / 64,
  rewards: [
    { type: 'item', itemId: 'lavender', amount: 1 },
    { type: 'item', itemId: 'carbon_bar', amount: 1 }
  ]
}, {
  chance: 1 / 32,
  rewards: [
    { type: 'item', itemId: 'ore_mithril', amount: 1 }
  ]
}, {
  chance: 1 / 16,
  rewards: [
    { type: 'item', itemId: 'ore_carbon', amount: 1 },
    { type: 'item', itemId: 'mithril_essence', amount: 1 }
  ]
}, {
  chance: 1 / 8,
  rewards: [
    { type: 'gold', amount: 250 },
    { type: 'item', itemId: 'maple_log', amount: 1 }
  ]
}]);

