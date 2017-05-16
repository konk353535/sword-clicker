import { orderLootTable } from '/server/constants/enemies/lootTables/index.js';

export const LEVEL_SEVEN_MONSTERS = [{
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
  name: 'jellyfish'
}];

export const LEVEL_SEVEN_LOOT_TABLE = orderLootTable([{
  chance: 1 / 512,
  rewards: [
    { type: 'item', itemId: 'elemental_shield_tome', amount: 1 },
  ]
}, {
  chance: 1 / 256,
  rewards: [
    { type: 'item', itemId: 'spiked_armor_1_tome', amount: 1 }
  ]
}, {
  chance: 1 / 128,
  rewards: [
    { type: 'item', itemId: 'mithril_pickaxe', amount: 1 },
    { type: 'item', itemId: 'mithril_axe', amount: 1 },
    { type: 'item', itemId: 'mithril_dagger', amount: 1 },
    { type: 'item', itemId: 'blue_wizard_hat', amount: 1 },
    { type: 'item', itemId: 'blue_wizard_shirt', amount: 1 },
    { type: 'item', itemId: 'blue_wizard_shorts', amount: 1 },
  ]
}, {
  chance: 1 / 64,
  rewards: [
    { type: 'item', itemId: 'chilli_seed', amount: 1 },
    { type: 'item', itemId: 'mithril_bar', amount: 1 }
  ]
}, {
  chance: 1 / 32,
  rewards: [
    { type: 'item', itemId: 'adamantium_essence', amount: 1 }
  ]
}, {
  chance: 1 / 16,
  rewards: [
    { type: 'item', itemId: 'mithril_essence', amount: 1 }
  ]
}, {
  chance: 1 / 8,
  rewards: [
    { type: 'gold', amount: 400 },
    { type: 'item', itemId: 'ore_mithril', amount: 1 },
    { type: 'item', itemId: 'ore_adamantium', amount: 1 },
    { type: 'item', itemId: 'walnut_log', amount: 1 }
  ]
}]);

