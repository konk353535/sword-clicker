import { COPPER_CRAFTS } from './crafts/copper';
import { IRON_CRAFTS } from './crafts/iron';
import { STEEL_CRAFTS } from './crafts/steel';
import { CARBON_CRAFTS } from './crafts/carbon';
import { MITHRIL_CRAFTS } from './crafts/mithril';
import { ADAMANTIUM_CRAFTS } from './crafts/adamantium';
import { AMULET_CRAFTS } from './crafts/amulet';

export const COMBAT_CRAFTS = Object.assign(
  IRON_CRAFTS,
  COPPER_CRAFTS,
  STEEL_CRAFTS,
  CARBON_CRAFTS,
  MITHRIL_CRAFTS,
  ADAMANTIUM_CRAFTS,
  AMULET_CRAFTS);
