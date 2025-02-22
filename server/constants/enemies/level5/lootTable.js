import { orderLootTable } from '/server/constants/enemies/lootTables/index.js';

export const LOOT_TABLE = orderLootTable([{
  chance: 1 / 256,
  rewards: [
    { type: 'item', itemId: 'steel_pickaxe', amount: 1 },
    { type: 'item', itemId: 'steel_axe', amount: 1 },
    { type: 'item', itemId: 'steel_dagger', amount: 1 },
  ]
}, {
  chance: 1 / 128,
  rewards: [
    { type: 'item', itemId: 'lavender', amount: 1 },
    { type: 'item', itemId: 'steel_bar', amount: 1 }
  ]
}, {
  chance: 1 / 64,
  rewards: [
    { type: 'item', itemId: 'ore_carbon', amount: 1 }
  ]
}, {
  chance: 1 / 32,
  rewards: [
    { type: 'item', itemId: 'ore_steel', amount: 1 }
  ]
}, {
  chance: 1 / 16,
  rewards: [
    { type: 'gold', amount: 125 },
    { type: 'item', itemId: 'oak_log', amount: 1 }
  ]
}]);
