console.log('importing items/index.js MISC_ITEMS');
import { MISC_ITEMS } from './items';
console.log('importing items/index.js FARMING_ITEMS');
import { FARMING_ITEMS } from '/server/constants/farming/items';
console.log('importing items/index.js COMBAT_ITEMS');
import { COMBAT_ITEMS } from '/server/constants/combat/items';
console.log('importing items/index.js CRAFTING_ITEMS');
import { CRAFTING_ITEMS } from '/server/constants/crafting/items';
console.log('importing items/index.js MINING_ITEMS');
import { MINING_ITEMS } from '/server/constants/mining/items';
console.log('importing items/index.js WOODCUTTING_ITEMS');
import { WOODCUTTING_ITEMS } from '/server/constants/woodcutting/items';
console.log('importing items/index.js INSCRIPTION_ITEMS');
import { INSCRIPTION_ITEMS } from '/server/constants/inscription/items';
console.log('importing items/index.js ASTRONOMY_ITEMS');
import { ASTRONOMY_ITEMS } from '/server/constants/astronomy/items';

console.log('exporting items/index.js ITEMS');
export const ITEMS = Object.assign(
  MISC_ITEMS,
  COMBAT_ITEMS,
  CRAFTING_ITEMS,
  MINING_ITEMS,
  WOODCUTTING_ITEMS,
  FARMING_ITEMS,
  INSCRIPTION_ITEMS,
  ASTRONOMY_ITEMS
);
