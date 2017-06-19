import { orderLootTable } from '/server/constants/enemies/lootTables/index.js';

export const LEVEL_FIVE_MONSTERS = [{
  id: 'wolf',
  icon: 'wolf',
  name: 'wolf'
}, {
  id: 'beaver',
  icon: 'beaver',
  name: 'beaver'
}, {
  id: 'eagle',
  icon: 'eagle',
  name: 'eagle'
}, {
  id: 'kangaroo',
  icon: 'kangaroo',
  name: 'kangaroo'
}, {
  id: 'jellyFish',
  icon: 'jellyFish',
  name: 'jellyfish',
  magicArmored: true,
  buffs: [{
    id: 'poisoned_blade',
    data: {
      level: 1,
      icon: 'poisonedBlade',
      name: 'poisoned blade'
    }
  }]
}];

export const LEVEL_FIVE_LOOT_TABLE = orderLootTable([{
  chance: 1 / 256,
  rewards: [
    { type: 'item', itemId: 'damage_up_1_tome', amount: 1 },
  ]
}, {
  chance: 1 / 128,
  rewards: [
    { type: 'item', itemId: 'iron_pickaxe', amount: 1 },
    { type: 'item', itemId: 'iron_axe', amount: 1 },
    { type: 'item', itemId: 'iron_dagger', amount: 1 }
  ]
}, {
  chance: 1 / 64,
  rewards: [
    { type: 'item', itemId: 'ore_iron', amount: 1 },
    { type: 'item', itemId: 'iron_bar', amount: 1 }
  ]
}, {
  chance: 1 / 4,
  rewards: [
    { type: 'gold', amount: 125 },
    { type: 'item', itemId: 'ore_iron', amount: 1 },
    { type: 'item', itemId: 'oak_log', amount: 1 }
  ]
}]);

