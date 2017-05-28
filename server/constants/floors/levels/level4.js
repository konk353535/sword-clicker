import { orderLootTable } from '/server/constants/enemies/lootTables/index.js';

export const LEVEL_FOUR_MONSTERS = [{
  id: 'cat',
  icon: 'cat',
  name: 'cat'
}, {
  id: 'turtle',
  icon: 'turtle',
  name: 'turtle',
  heavilyArmored: true
}, {
  id: 'goat',
  icon: 'goat',
  name: 'goat'
}, {
  id: 'boar',
  icon: 'boar',
  name: 'boar'
}, {
  id: 'fox',
  icon: 'fox',
  name: 'fox'
}];

export const LEVEL_FOUR_LOOT_TABLE = orderLootTable([{
  chance: 1 / 256,
  rewards: [
    { type: 'item', itemId: 'steel_pickaxe', amount: 1 },
    { type: 'item', itemId: 'steel_axe', amount: 1 },
    { type: 'item', itemId: 'steel_dagger', amount: 1 }
  ]
}, {
  chance: 1 / 128,
  rewards: [
    { type: 'item', itemId: 'steel_bar', amount: 1 },
  ]
}, {
  chance: 1 / 32,
  rewards: [
    { type: 'item', itemId: 'ore_steel', amount: 1 },
  ]
}, {
  chance: 1 / 4,
  rewards: [
    { type: 'item', itemId: 'ash_log', amount: 1 },
    { type: 'gold', amount: 100 }
  ]
}]);

