import { orderLootTable } from '/server/constants/enemies/lootTables/index.js';

export const LEVEL_TWO_MONSTERS = [{
  id: 'rat',
  icon: 'rat.svg',
  name: 'rat'
}, {
  id: 'rabbit',
  icon: 'rabbit.svg',
  name: 'rabbit'
}, {
  id: 'crab',
  icon: 'crab.svg',
  name: 'crab'
}, {
  id: 'wasp',
  icon: 'wasp.svg',
  name: 'wasp'
}, {
  id: 'snail',
  icon: 'snail.svg',
  name: 'snail'
}];

export const LEVEL_TWO_LOOT_TABLE = orderLootTable([{
  chance: 1 / 64,
  rewards: [
    { type: 'item', itemId: 'copper_pickaxe', amount: 1 },
    { type: 'item', itemId: 'copper_axe', amount: 1 },
    { type: 'item', itemId: 'defense_up_1_tome', amount: 1 },
    { type: 'item', itemId: 'copper_dagger', amount: 1 }
  ]
}, {
  chance: 1 / 32,
  rewards: [
    { type: 'item', itemId: 'ore_coal', amount: 1 },
  ]
}, {
  chance: 1 / 4,
  rewards: [
    { type: 'item', itemId: 'ore_copper', amount: 1 },
    { type: 'item', itemId: 'copper_bar', amount: 1 },
    { type: 'gold', amount: 50 },
    { type: 'item', itemId: 'pine_log', amount: 1 }
  ]
}]);
