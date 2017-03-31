import { CRAFTING_ITEMS as craftingItems } from './items';
import { ITEMS } from '/server/constants/items/index.js'; 

import { CRAFTING_CRAFTS } from './crafts';
import { COMBAT_CRAFTS } from '/server/constants/combat/crafts';
import { MINING_CRAFTS } from '/server/constants/mining/crafts';
import { WOODCUTTING_CRAFTS } from '/server/constants/woodcutting/crafts';
import { INSCRIPTION_CRAFTS } from '/server/constants/inscription/crafts';

export const CRAFTING_ITEMS = craftingItems;

export const CRAFTING = {
  recipes: Object.assign(
    CRAFTING_CRAFTS,
    COMBAT_CRAFTS,
    MINING_CRAFTS,
    WOODCUTTING_CRAFTS,
    INSCRIPTION_CRAFTS
  ),

  baseMaxCrafts: 2
}
