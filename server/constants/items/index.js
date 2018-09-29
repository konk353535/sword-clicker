import { MISC_ITEMS } from './items';
import { FARMING_ITEMS } from '../farming/items';
import { COMBAT_ITEMS } from '../combat/items';
import { CRAFTING_ITEMS } from '../crafting/items';
import { MINING_ITEMS } from '../mining/items';
import { WOODCUTTING_ITEMS } from '../woodcutting/items';
import { INSCRIPTION_ITEMS } from '../inscription/items';
import { ASTRONOMY_ITEMS } from '../astronomy/items';

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
