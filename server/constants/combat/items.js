import { COPPER_ITEMS } from './items/copper';
import { IRON_ITEMS } from './items/iron';
import { STEEL_ITEMS } from './items/steel';
import { CARBON_ITEMS } from './items/carbon';
import { MITHRIL_ITEMS } from './items/mithril';
import { ADAMANTIUM_ITEMS } from './items/adamantium';
import { ORICHALCUM_ITEMS } from './items/orichalcum';
import { COBALT_ITEMS } from './items/cobalt';
import { FAIRY_STEEL_ITEMS } from './items/fairySteel';
import { CURSED_ITEMS } from './items/cursed';
import { MISC_ITEMS } from './items/misc';
import { AMULET_ITEMS } from './items/amulet';
import { STAFF_ITEMS } from './items/staff';
import { WIZARD_ITEMS } from './items/wizard';

export const COMBAT_ITEMS = Object.assign(
  IRON_ITEMS,
  COPPER_ITEMS,
  STEEL_ITEMS,
  CARBON_ITEMS,
  MITHRIL_ITEMS,
  ADAMANTIUM_ITEMS,
  ORICHALCUM_ITEMS,
  COBALT_ITEMS,
  FAIRY_STEEL_ITEMS,
  CURSED_ITEMS,
  MISC_ITEMS,
  AMULET_ITEMS,
  STAFF_ITEMS,
  WIZARD_ITEMS);
