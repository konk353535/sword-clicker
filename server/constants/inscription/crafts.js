console.log('importing inscription/crafts.js ITEMS');

import { PAPER_CRAFTS } from './crafts/paper';
import { PIGMENT_CRAFTS } from './crafts/pigment';
import { TOME_CRAFTS } from './crafts/tomes/index';
import { ENCHANTMENT_CRAFTS } from './crafts/enchantment';
import { MAGIC_BOOK_CRAFTS } from './crafts/magic_book';

console.log('exporting inscription/crafts.js INSCRIPTION_CRAFTS');
export const INSCRIPTION_CRAFTS = Object.assign(
  PAPER_CRAFTS,
  PIGMENT_CRAFTS,
  TOME_CRAFTS,
  ENCHANTMENT_CRAFTS,
  MAGIC_BOOK_CRAFTS
);
