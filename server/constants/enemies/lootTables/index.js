import _ from 'underscore';

export const orderLootTable = function orderLootTable(lootTable) {
  return _.sortBy(lootTable, 'chance');
}
