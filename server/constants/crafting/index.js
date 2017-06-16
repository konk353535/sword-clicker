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
    tin: {
      requiredCraftingLevel: 4,
      name: 'tin',
      displayName: 'tin',
      color: 'grey-1'
    },
    bronze: {
      requiredCraftingLevel: 9,
      name: 'bronze',
      displayName: 'bronze',
      color: 'orange-2'
    },
    iron: {
      requiredCraftingLevel: 14,
      name: 'iron',
      displayName: 'iron',
      color: 'grey-2'
    },
    silver: {
      requiredCraftingLevel: 19,
      name: 'silver',
      displayName: 'silver',
      color: 'grey-3'
    },
    gold: {
      requiredCraftingLevel: 24,
      name: 'gold',
      displayName: 'gold',
      color: 'yellow-1'
    },
    carbon: {
      requiredCraftingLevel: 29,
      name: 'carbon',
      displayName: 'carbon',
      color: 'black-1'
    },
    steel: {
      requiredCraftingLevel: 34,
      name: 'steel',
      displayName: 'steel',
      color: 'grey-4'
    },
    platinum: {
      requiredCraftingLevel: 39,
      name: 'platinum',
      displayName: 'platinum',
      color: 'grey-5'
    },
    titanium: {
      requiredCraftingLevel: 44,
      name: 'titanium',
      displayName: 'titanium',
      color: 'black-2'
    },
    tungsten: {
      requiredCraftingLevel: 49,
      name: 'tungsten',
      displayName: 'tungsten',
      color: 'grey-6'
    },
    obsidian: {
      requiredCraftingLevel: 54,
      name: 'obsidian',
      displayName: 'obsidian',
      color: 'black-3'
    },
    cobalt: {
      requiredCraftingLevel: 59,
      name: 'cobalt',
      displayName: 'cobalt',
      color: 'blue-1'
    },
    mithril: {
      requiredCraftingLevel: 64,
      name: 'mithril',
      displayName: 'mithril',
      color: 'blue-2'
    },
    adamantium: {
      requiredCraftingLevel: 69,
      name: 'adamantium',
      displayName: 'adamantium',
      color: 'green-1'
    },
    orichalcum: {
      requiredCraftingLevel: 74,
      name: 'orichalcum',
      displayName: 'orichalcum',
      color: 'yellow-2'
    },
    meteorite: {
      requiredCraftingLevel: 79,
      name: 'meteorite',
      displayName: 'Meteorite',
      color: 'orange-3'
    },
    fairy_steel: {
      requiredCraftingLevel: 84,
      name: 'fairy_steel',
      displayName: 'Fairy Steel',
      color: 'purple-1'
    },
    elven_steel: {
      requiredCraftingLevel: 89,
      name: 'elven_steel',
      displayName: 'Elven Steel',
      color: 'green-2'
    },
    cursed: {
      requiredCraftingLevel: 94,
      name: 'cursed',
      displayName: 'cursed',
      color: 'red-1'
    }
  }
}
