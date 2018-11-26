import _ from 'underscore';
import lodash from 'lodash';

export const orderLootTable = function orderLootTable(lootTable) {
  return _.sortBy(lootTable, 'chance');
};

export const normalizedLootTable = function normalizedLootTable(lootTable, minChance) {
  const table = lodash.cloneDeep(lootTable.map((loot) => {
    if (loot.chance < minChance) {
      loot.chance = minChance;
    }
    return loot;
  }));

  return table;
};
