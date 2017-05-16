import { orderLootTable } from '/server/constants/enemies/lootTables/index.js';

export const LEVEL_THREE_MONSTERS = [{
  id: 'spider',
  icon: 'spider',
  name: 'spider'
}, {
  id: 'snake',
  icon: 'snake',
  name: 'snake',
  buffs: [{
    id: 'poisoned_blade',
    data: {
      level: 1,
      icon: 'poisonedBlade',
      name: 'poisoned blade'
    }
  }]
}, {
  id: 'falcon',
  icon: 'falcon',
  name: 'falcon',
  magicArmored: true
}, {
  id: 'lizard',
  icon: 'lizard',
  name: 'lizard'
}, {
  id: 'skunk',
  icon: 'skunk',
  name: 'skunk'
}];

export const LEVEL_THREE_LOOT_TABLE = orderLootTable([{
  chance: 1 / 128,
  rewards: [
    { type: 'item', itemId: 'iron_pickaxe', amount: 1 },
    { type: 'item', itemId: 'iron_axe', amount: 1 },
    { type: 'item', itemId: 'iron_dagger', amount: 1 },
    { type: 'item', itemId: 'brown_wizard_hat', amount: 1 },
    { type: 'item', itemId: 'brown_wizard_shirt', amount: 1 },
    { type: 'item', itemId: 'brown_wizard_shorts', amount: 1 },
  ]
}, {
  chance: 1 / 64,
  rewards: [
    { type: 'item', itemId: 'phantom_strikes_level_1_tome', amount: 1 }
  ]
}, {
  chance: 1 / 16,
  rewards: [
    { type: 'item', itemId: 'ore_iron', amount: 1 },
    { type: 'gold', amount: 75 },
    { type: 'item', itemId: 'beech_log', amount: 3}
  ]
}]);
