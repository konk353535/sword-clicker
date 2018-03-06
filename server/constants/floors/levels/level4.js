import { orderLootTable } from '../../enemies/lootTables/index.js';

export const LEVEL_FOUR_MONSTERS = [{
  id: 'cat',
  icon: 'cat.svg',
  name: 'cat'
}, {
  id: 'turtle',
  icon: 'turtle.svg',
  name: 'turtle',
  heavilyArmored: true
}, {
  id: 'goat',
  icon: 'goat.svg',
  name: 'goat'
}, {
  id: 'boar',
  icon: 'boar.svg',
  name: 'boar'
}, {
  id: 'fox',
  icon: 'fox.svg',
  name: 'fox'
}];

export const LEVEL_FOUR_LOOT_TABLE = orderLootTable([{
  chance: 1 / 256,
  rewards: [
    { type: 'item', itemId: 'bronze_pickaxe', amount: 1 },
    { type: 'item', itemId: 'bronze_axe', amount: 1 },
    { type: 'item', itemId: 'bronze_dagger', amount: 1 }
  ]
}, {
  chance: 1 / 128,
  rewards: [
    { type: 'item', itemId: 'bronze_bar', amount: 1 },
    { type: 'item', itemId: 'health_up_1_tome', amount: 1 },
  ]
}, {
  chance: 1 / 32,
  rewards: [
    { type: 'item', itemId: 'ore_bronze', amount: 1 },
  ]
}, {
  chance: 1 / 4,
  rewards: [
    { type: 'item', itemId: 'ash_log', amount: 1 },
    { type: 'gold', amount: 100 }
  ]
}]);

