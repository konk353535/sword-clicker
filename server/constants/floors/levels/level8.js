import { orderLootTable } from '../../enemies/lootTables/index.js';

export const LEVEL_EIGHT_MONSTERS = [{
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

export const LEVEL_EIGHT_LOOT_TABLE = orderLootTable([{
  chance: 1 / 128,
  rewards: [
    { type: 'item', itemId: 'carbon_pickaxe', amount: 1 },
    { type: 'item', itemId: 'carbon_axe', amount: 1 },
    { type: 'item', itemId: 'carbon_dagger', amount: 1 },
    { type: 'item', itemId: 'lavender', amount: 1 }
  ]
}, {
  chance: 1 / 64,
  rewards: [
    { type: 'item', itemId: 'affliction_tome', amount: 1 }
  ]
}, {
  chance: 1 / 48,
  rewards: [
    { type: 'item', itemId: 'carbon_bar', amount: 1 },
    { type: 'item', itemId: 'chrysanthemum_seed', amount: 3 }
  ]  
}, {
  chance: 1 / 48,
  rewards: [
    { type: 'item', itemId: 'carbon_essence_scroll', amount: 1 },
    { type: 'item', itemId: 'sixth_sense_tome', amount: 1 }
  ]
}, {
  chance: 1 / 16,
  rewards: [
    { type: 'item', itemId: 'carbon_essence', amount: 1 }
  ]
}, {
  chance: 1 / 4,
  rewards: [
    { type: 'gold', amount: 600 },
    { type: 'item', itemId: 'ore_carbon', amount: 1 },
    { type: 'item', itemId: 'cherry_log', amount: 2 }
  ]
}]);

