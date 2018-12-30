import { orderLootTable } from '../../enemies/lootTables/index.js';

export const LEVEL_SIX_MONSTERS = [{
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

export const LEVEL_SIX_LOOT_TABLE = orderLootTable([{
  chance: 1 / 56,
  rewards: [
    { type: 'item', itemId: 'silver_pickaxe', amount: 1 },
    { type: 'item', itemId: 'silver_axe', amount: 1 },
    { type: 'item', itemId: 'silver_dagger', amount: 1 },
    { type: 'item', itemId: 'lavender', amount: 1 }
  ]
}, {
  chance: 1 / 64,
  rewards: [
    { type: 'item', itemId: 'silver_essence_scroll', amount: 1 },
    { type: 'item', itemId: 'slash_level_2_tome', amount: 1 },
    { type: 'item', itemId: 'magic_power_up_level_1_tome', amount: 1 }
  ]
}, {
  chance: 1 / 24,
  rewards: [
    { type: 'item', itemId: 'silver_essence', amount: 1 }
  ]
}, {
  chance: 1 / 4,
  rewards: [
    { type: 'item', itemId: 'ore_silver', amount: 1 },
    { type: 'item', itemId: 'silver_bar', amount: 1 },
    { type: 'item', itemId: 'maple_log', amount: 1 },
    { type: 'item', itemId: 'maple_log', amount: 2 }
  ]
}, {
  chance: 1 / 6,
  rewards: [
    { type: 'gold', amount: 66 },
    { type: 'gold', amount: 131 },
    { type: 'gold', amount: 263 },
    { type: 'item', itemId: 'silver_sculpture', amount: 1 },
    { type: 'item', itemId: 'silver_sculpture', amount: 2 },
    { type: 'item', itemId: 'silver_sculpture', amount: 3 }
  ]
}]);

