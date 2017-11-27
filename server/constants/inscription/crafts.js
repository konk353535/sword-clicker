import { ITEMS } from '/server/constants/items/index.js'; 

import { PAPER_CRAFTS } from './crafts/paper';
import { PIGMENT_CRAFTS } from './crafts/pigment';
import { TOME_CRAFTS } from './crafts/tomes/index';
import { ENCHANTMENT_CRAFTS } from './crafts/enchantment';

export const INSCRIPTION_CRAFTS = Object.assign(
  PAPER_CRAFTS,
  PIGMENT_CRAFTS,
  TOME_CRAFTS,
  ENCHANTMENT_CRAFTS
);
