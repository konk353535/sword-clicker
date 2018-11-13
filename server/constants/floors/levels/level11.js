import { orderLootTable } from '../../enemies/lootTables/index.js';

export const LEVEL_ELEVEN_MONSTERS = [{
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

export const LEVEL_ELEVEN_LOOT_TABLE = orderLootTable([{
  chance: 1 / 64,
  rewards: [
    { type: 'item', itemId: 'titanium_pickaxe', amount: 1 },
    { type: 'item', itemId: 'titanium_axe', amount: 1 },
    { type: 'item', itemId: 'titanium_dagger', amount: 1 },
    { type: 'item', itemId: 'chilli', amount: 1 }
  ]
}, {
  chance: 1 / 16,
  rewards: [
    { type: 'item', itemId: 'titanium_essence_scroll', amount: 1 }
  ]
}, {
  chance: 1 / 24,
  rewards: [
    { type: 'item', itemId: 'titanium_essence', amount: 1 }
  ]
}, {
  chance: 1 / 12,
  rewards: [
    { type: 'item', itemId: 'platinum_essence', amount: 1 }
  ]
}, {
  chance: 1 / 64,
  rewards: [
    { type: 'item', itemId: 'penetrating_slash_level_2_tome', amount: 1 }
  ]
}, {
  chance: 1 / 128,
  rewards: [
    { type: 'item', itemId: 'sixth_sense_tome', amount: 1 }
  ]
}, {
  chance: 1 / 4,
  rewards: [
    { type: 'item', itemId: 'ore_titanium', amount: 1 },
    { type: 'item', itemId: 'titanium_bar', amount: 1 },
    { type: 'item', itemId: 'black_log', amount: 1 },
    { type: 'item', itemId: 'black_log', amount: 2 }
  ]
}, {
  chance: 1 / 4,
  rewards: [
    { type: 'gold', amount: 188 },
    { type: 'gold', amount: 375 },
    { type: 'gold', amount: 750 },
    { type: 'item', itemId: 'polished_titanium', amount: 1 },
    { type: 'item', itemId: 'polished_titanium', amount: 2 }
  ]
}]);

