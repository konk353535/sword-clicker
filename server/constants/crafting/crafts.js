import { ITEMS } from '/server/constants/items/index.js'; 
import { BAR_CRAFTS } from './crafts/bars';
import { FURNACE_CRAFTS } from './crafts/furnaces';
import { GOLD_CRAFTS } from './crafts/gold';
import { MISC_CRAFTS } from './crafts/misc';
import { ESSENCE_CRAFTS } from './crafts/essences';
import { XP_CRAFTS } from './crafts/xp';

export const CRAFTING_CRAFTS = Object.assign(ESSENCE_CRAFTS, FURNACE_CRAFTS, MISC_CRAFTS, BAR_CRAFTS, GOLD_CRAFTS, XP_CRAFTS, {
})
