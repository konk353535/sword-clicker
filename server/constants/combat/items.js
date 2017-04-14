import { COPPER_ITEMS } from './items/copper';
import { IRON_ITEMS } from './items/iron';
import { STEEL_ITEMS } from './items/steel';
import { CARBON_ITEMS } from './items/carbon';

export const COMBAT_ITEMS = Object.assign(IRON_ITEMS, COPPER_ITEMS, STEEL_ITEMS, CARBON_ITEMS);
