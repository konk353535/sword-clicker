import { COPPER_ITEMS } from './items/copper';
import { IRON_ITEMS } from './items/iron';
import { STEEL_ITEMS } from './items/steel';
import { CARBON_ITEMS } from './items/carbon';
import { MITHRIL_ITEMS } from './items/mithril';
import { ADAMANTIUM_ITEMS } from './items/adamantium';
import { MISC_ITEMS } from './items/misc';
import { AMULET_ITEMS } from './items/amulet';

export const COMBAT_ITEMS = Object.assign(
  IRON_ITEMS,
  COPPER_ITEMS,
  STEEL_ITEMS,
  CARBON_ITEMS,
  MITHRIL_ITEMS,
  ADAMANTIUM_ITEMS,
  MISC_ITEMS,
  AMULET_ITEMS);
