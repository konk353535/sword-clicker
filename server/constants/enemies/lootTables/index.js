import _ from 'underscore';

export const orderLootTable = function orderLootTable(lootTable) {
  return _.sortBy(lootTable, 'chance');
};

export const normalizedLootTable = function normalizedLootTable(lootTable, minChance) {
  const table = JSON.parse(JSON.stringify(lootTable.map((loot) => {
    if (loot.chance < minChance) {
      loot.chance = minChance;
    }
    return loot;
  })));

  return table;
};
