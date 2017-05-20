import { orderLootTable } from '/server/constants/enemies/lootTables/index.js';

export const LEVEL_ONE_MONSTERS = [{
  id: 'fly',
  icon: 'fly',
  name: 'fly'
}, {
  id: 'bee',
  icon: 'bee',
  name: 'bee'
}, {
  id: 'mouse',
  icon: 'mouse',
  name: 'mouse'
}, {
  id: 'grasshopper',
  icon: 'grasshopper',
  name: 'grasshopper'
}, {
  id: 'bird',
  icon: 'bird',
  name: 'bird'
}];

export const LEVEL_ONE_LOOT_TABLE = orderLootTable([{
  chance: 1 / 16,
  rewards: [{
    type: 'item',
    itemId: 'primitive_pickaxe',
    amount: 1
  }, {
    type: 'item',
    itemId: 'primitive_axe',
    amount: 1
  }]
}, {
  chance: 1 / 8,
  rewards: [{
    type: 'item',
    itemId: 'ore_stone',
    amount: 1
  }, {
    type: 'gold',
    amount: 25
  }, {
    type: 'item',
    itemId: 'pine_log',
    amount: 1
  }, {
    type: 'item',
    itemId: 'lettice_seed',
    amount: 1
  }, {
    type: 'item',
    itemId: 'lettice',
    amount: 1
  }]
}]);
