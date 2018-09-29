import { ORE_ITEMS } from './items/ore';
import { PICKAXE_ITEMS } from './items/pickaxe';

console.log('exporting mining/items.js MINING_ITEMS');
export const MINING_ITEMS = Object.assign(ORE_ITEMS, PICKAXE_ITEMS);
