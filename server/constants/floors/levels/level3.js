import { orderLootTable } from '../../enemies/lootTables/index.js';

export const LEVEL_THREE_MONSTERS = [{
  id: 'spider',
  icon: 'spider.svg',
  name: 'spider'
}, {
  id: 'snake',
  icon: 'snake.svg',
  name: 'snake',
  buffs: [{
    id: 'poisoned_blade',
    data: {
      level: 1,
      icon: 'poisonedBlade.svg',
      name: 'poisoned blade'
    }
  }]
}, {
  id: 'falcon',
  icon: 'falcon.svg',
  name: 'falcon',
  magicArmored: true
}, {
  id: 'lizard',
  icon: 'lizard.svg',
  name: 'lizard'
}, {
  id: 'skunk',
  icon: 'skunk.svg',
  name: 'skunk'
}];

export const LEVEL_THREE_LOOT_TABLE = orderLootTable([{
  chance: 1 / 64,
  rewards: [
    { type: 'item', itemId: 'ore_coal', amount: 1 },
  ]
}, {
  chance: 1 / 32,
  rewards: [
    { type: 'item', itemId: 'tin_pickaxe', amount: 1 },
    { type: 'item', itemId: 'tin_axe', amount: 1 },
    { type: 'item', itemId: 'tin_dagger', amount: 1 },
    { type: 'item', itemId: 'armor_up_new_level_1_tome', amount: 1 }
  ]
}, {
  chance: 1 / 64,
  rewards: [
    { type: 'item', itemId: 'brown_wizard_hat', amount: 1 },
    { type: 'item', itemId: 'brown_wizard_shirt', amount: 1 },
    { type: 'item', itemId: 'brown_wizard_shorts', amount: 1 },
  ]
}, {
  chance: 1 / 4,
  rewards: [
    { type: 'item', itemId: 'ore_tin', amount: 1 },
    { type: 'item', itemId: 'tin_bar', amount: 1 },
    { type: 'item', itemId: 'beech_log', amount: 1},
    { type: 'item', itemId: 'beech_log', amount: 2}
  ]
}, {
  chance: 1 / 6,
  rewards: [
    { type: 'gold', amount: 25 },
    { type: 'gold', amount: 60 },
    { type: 'gold', amount: 100 },
    { type: 'item', itemId: 'polished_tin', amount: 1 },
    { type: 'item', itemId: 'polished_tin', amount: 2 }
  ]
}]);
