import { orderLootTable } from '/server/constants/enemies/lootTables/index.js';

export const LEVEL_TWO_MONSTERS = [{
  id: 'rat',
  icon: 'rat',
  name: 'rat'
}, {
  id: 'rabbit',
  icon: 'rabbit',
  name: 'rabbit'
}, {
  id: 'crab',
  icon: 'crab',
  name: 'crab'
}, {
  id: 'wasp',
  icon: 'wasp',
  name: 'wasp'
}, {
  id: 'snail',
  icon: 'snail',
  name: 'snail'
}];

export const LEVEL_TWO_LOOT_TABLE = orderLootTable([{
  chance: 1 / 64,
  rewards: [
    { type: 'item', itemId: 'copper_pickaxe', amount: 1 },
    { type: 'item', itemId: 'copper_axe', amount: 1 },
    { type: 'item', itemId: 'copper_dagger', amount: 1 }
  ]
}, {
  chance: 1 / 32,
  rewards: [
    { type: 'item', itemId: 'ore_coal', amount: 1 },
  ]
}, {
  chance: 1 / 16,
  rewards: [
    { type: 'item', itemId: 'ore_copper', amount: 1 },
    { type: 'item', itemId: 'copper_bar', amount: 1 },
    { type: 'gold', amount: 50 },
    { type: 'item', itemId: 'beech_log', amount: 1 }
  ]
}]);
