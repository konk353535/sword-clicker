import { COPPER_CRAFTS } from './crafts/copper';
import { IRON_CRAFTS } from './crafts/iron';
import { STEEL_CRAFTS } from './crafts/steel';
import { CARBON_CRAFTS } from './crafts/carbon';

export const COMBAT_CRAFTS = Object.assign(IRON_CRAFTS, COPPER_CRAFTS, STEEL_CRAFTS, CARBON_CRAFTS);
