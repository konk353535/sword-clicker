import { MISC_ITEMS } from './items';
import { FARMING_ITEMS } from '/server/constants/farming/items';
import { COMBAT_ITEMS } from '/server/constants/combat/items';
import { CRAFTING_ITEMS } from '/server/constants/crafting/items';
import { MINING_ITEMS } from '/server/constants/mining/items';
import { WOODCUTTING_ITEMS } from '/server/constants/woodcutting/items';

export const ITEMS = Object.assign(
  MISC_ITEMS,
  COMBAT_ITEMS,
  CRAFTING_ITEMS,
  MINING_ITEMS,
  WOODCUTTING_ITEMS,
  FARMING_ITEMS
);
