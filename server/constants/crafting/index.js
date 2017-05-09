import { CRAFTING_ITEMS as craftingItems } from './items';
import { ITEMS } from '/server/constants/items/index.js'; 

import { CRAFTING_CRAFTS } from './crafts';
import { COMBAT_CRAFTS } from '/server/constants/combat/crafts';
import { MINING_CRAFTS } from '/server/constants/mining/crafts';
import { WOODCUTTING_CRAFTS } from '/server/constants/woodcutting/crafts';
import { INSCRIPTION_CRAFTS } from '/server/constants/inscription/crafts';

export const CRAFTING_ITEMS = craftingItems;

export const CRAFTING = {
  recipes: Object.assign(
    CRAFTING_CRAFTS,
    COMBAT_CRAFTS,
    MINING_CRAFTS,
    WOODCUTTING_CRAFTS,
    INSCRIPTION_CRAFTS
  ),

  baseMaxCrafts: 2,

  tiers: {
    copper: {
      requiredCraftingLevel: 2,
      name: 'copper',
      displayName: 'copper',
      color: 'orange-1'
    },
    iron: {
      requiredCraftingLevel: 4,
      name: 'iron',
      displayName: 'iron',
      color: 'grey-1'
    },
    steel: {
      requiredCraftingLevel: 7,
      name: 'steel',
      displayName: 'steel',
      color: 'grey-2'
    },
    carbon: {
      requiredCraftingLevel: 10,
      name: 'carbon',
      displayName: 'carbon',
      color: 'black-1'
    },
    mithril: {
      requiredCraftingLevel: 14,
      name: 'mithril',
      displayName: 'mithril',
      color: 'blue-1'
    },
    adamantium: {
      requiredCraftingLevel: 17,
      name: 'adamantium',
      displayName: 'adamantium',
      color: 'green-1'
    },
    orichalcum: {
      requiredCraftingLevel: 24,
      name: 'orichalcum',
      displayName: 'orichalcum',
      color: 'yellow-1'
    },
    cobalt: {
      requiredCraftingLevel: 29,
      name: 'cobalt',
      displayName: 'cobalt',
      color: 'blue-2'
    },
    fairy_steel: {
      requiredCraftingLevel: 34,
      name: 'fairy_steel',
      displayName: 'Fairy Steel',
      color: 'purple-1'
    },
    cursed: {
      requiredCraftingLevel: 39,
      name: 'cursed',
      displayName: 'cursed',
      color: 'red-1'
    }
  }
}
