import { orderLootTable } from '/server/constants/enemies/lootTables/index.js';

export const LEVEL_SEVEN_MONSTERS = [{
  id: 'wolf',
  icon: 'wolf.svg',
  name: 'wolf'
}, {
  id: 'beaver',
  icon: 'beaver.svg',
  name: 'beaver'
}, {
  id: 'eagle',
  icon: 'eagle.svg',
  name: 'eagle'
}, {
  id: 'kangaroo',
  icon: 'kangaroo.svg',
  name: 'kangaroo'
}, {
  id: 'jellyFish',
  icon: 'jellyFish.svg',
  name: 'jellyfish',
  buffs: [{
    id: 'poisoned_blade',
    data: {
      level: 1,
      icon: 'poisonedBlade.svg',
      name: 'poisoned blade'
    }
  }]
}];

export const LEVEL_SEVEN_LOOT_TABLE = orderLootTable([{
  chance: 1 / 128,
  rewards: [
    { type: 'item', itemId: 'gold_pickaxe', amount: 1 },
    { type: 'item', itemId: 'gold_axe', amount: 1 },
    { type: 'item', itemId: 'gold_dagger', amount: 1 },
    { type: 'item', itemId: 'lavender', amount: 1 }
  ]
}, {
  chance: 1 / 64,
  rewards: [
    { type: 'item', itemId: 'gold_bar', amount: 1 }
  ]
}, {
  chance: 1 / 48,
  rewards: [
    { type: 'item', itemId: 'gold_essence_scroll', amount: 1 },
    { type: 'item', itemId: 'thirsty_fangs_1_tome_scroll', amount: 1 }
  ]
}, {
  chance: 1 / 16,
  rewards: [
    { type: 'item', itemId: 'gold_essence', amount: 1 }
  ]
}, {
  chance: 1 / 8,
  rewards: [
    { type: 'item', itemId: 'silver_essence', amount: 1 }
  ]
}, {
  chance: 1 / 8,
  rewards: [
    { type: 'gold', amount: 400 },
    { type: 'item', itemId: 'ore_gold', amount: 1 },
    { type: 'item', itemId: 'ore_silver', amount: 1 },
    { type: 'item', itemId: 'walnut_log', amount: 1 }
  ]
}]);

