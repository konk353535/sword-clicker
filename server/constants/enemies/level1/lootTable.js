import { orderLootTable } from '/server/constants/enemies/lootTables/index.js';

export const LOOT_TABLE = orderLootTable([{
  chance: 1 / 32,
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
  chance: 1 / 16,
  rewards: [  {
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
