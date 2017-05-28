import { orderLootTable } from '/server/constants/enemies/lootTables/index.js';

export const LOOT_TABLE = orderLootTable([{
  chance: 1 / 128,
  rewards: [
    { type: 'item', itemId: 'iron_pickaxe', amount: 1 },
    { type: 'item', itemId: 'iron_axe', amount: 1 },
    { type: 'item', itemId: 'iron_dagger', amount: 1 }
  ]
}, {
  chance: 1 / 64,
  rewards: [
    { type: 'item', itemId: 'iron_bar', amount: 1 }
  ]
}, {
  chance: 1 / 4,
  rewards: [
    { type: 'item', itemId: 'ore_iron', amount: 1 },
    { type: 'gold', amount: 75 },
    { type: 'item', itemId: 'beech_log', amount: 3}
  ]
}]);
