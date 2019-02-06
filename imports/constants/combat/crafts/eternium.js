import { ITEMS } from '/imports/constants/items/index.js';

const CURSED_ESS_XP = 500000;
const BONUS_XP = 357000;
const ETERNIUM_RESOURCE_HOG = 5;

export const ETERNIUM_CRAFTS = {
  eternium_dagger: {
    produces: 'eternium_dagger',
    name: 'eternium dagger',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'eternium_dagger',
    isHidden: true,
    timeToCraft: 30 * 60 * 2,
    xp: (CURSED_ESS_XP * 2) + (BONUS_XP * 2),
    maxToCraft: 1,
    tags: ['weapon'],
    requiredCraftingLevel: 125,
    required: [{
      type: 'item',
      itemId: 'relicrock_furnace',
      icon: ITEMS['relicrock_furnace'].icon,
      name: ITEMS['relicrock_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'mithril_essence',
      icon: ITEMS['mithril_essence'].icon,
      name: ITEMS['mithril_essence'].name,
      amount: 2 * ETERNIUM_RESOURCE_HOG,
      consumes: true
    }, {
      type: 'item',
      itemId: 'cursed_essence',
      icon: ITEMS['cursed_essence'].icon,
      name: ITEMS['cursed_essence'].name,
      amount: 2 * ETERNIUM_RESOURCE_HOG,
      consumes: true
    }, {
      type: 'item',
      itemId: 'fiery_log',
      icon: ITEMS['fiery_log'].icon,
      name: ITEMS['fiery_log'].name,
      amount: 3 * ETERNIUM_RESOURCE_HOG,
      consumes: true
    }, {
      type: 'item',
      itemId: 'magic_log',
      icon: ITEMS['magic_log'].icon,
      name: ITEMS['magic_log'].name,
      amount: 3 * ETERNIUM_RESOURCE_HOG,
      consumes: true
    }, {
      type: 'item',
      itemId: 'mithril_bar',
      icon: ITEMS['mithril_bar'].icon,
      name: ITEMS['mithril_bar'].name,
      amount: 3 * ETERNIUM_RESOURCE_HOG,
      consumes: true
    }, {
      type: 'item',
      itemId: 'cursed_bar',
      icon: ITEMS['cursed_bar'].icon,
      name: ITEMS['cursed_bar'].name,
      amount: 3 * ETERNIUM_RESOURCE_HOG,
      consumes: true
    }, {
      type: 'item',
      itemId: 'relicrock_dagger',
      icon: ITEMS['relicrock_dagger'].icon,
      name: ITEMS['relicrock_dagger'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'skill',
      name: 'crafting',
      level: 125
    }]
  },

  eternium_spear: {
    produces: 'eternium_spear',
    name: 'eternium spear',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'eternium_spear',
    isHidden: true,
    timeToCraft: 60 * 60 * 2,
    xp: (CURSED_ESS_XP * 4) + (BONUS_XP * 4),
    maxToCraft: 1,
    tags: ['weapon'],
    requiredCraftingLevel: 125,
    required: [{
      type: 'item',
      itemId: 'relicrock_furnace',
      icon: ITEMS['relicrock_furnace'].icon,
      name: ITEMS['relicrock_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'mithril_essence',
      icon: ITEMS['mithril_essence'].icon,
      name: ITEMS['mithril_essence'].name,
      amount: 4 * ETERNIUM_RESOURCE_HOG,
      consumes: true
    }, {
      type: 'item',
      itemId: 'cursed_essence',
      icon: ITEMS['cursed_essence'].icon,
      name: ITEMS['cursed_essence'].name,
      amount: 4 * ETERNIUM_RESOURCE_HOG,
      consumes: true
    }, {
      type: 'item',
      itemId: 'fiery_log',
      icon: ITEMS['fiery_log'].icon,
      name: ITEMS['fiery_log'].name,
      amount: 20 * ETERNIUM_RESOURCE_HOG,
      consumes: true
    }, {
      type: 'item',
      itemId: 'magic_log',
      icon: ITEMS['magic_log'].icon,
      name: ITEMS['magic_log'].name,
      amount: 20 * ETERNIUM_RESOURCE_HOG,
      consumes: true
    }, {
      type: 'item',
      itemId: 'mithril_bar',
      icon: ITEMS['mithril_bar'].icon,
      name: ITEMS['mithril_bar'].name,
      amount: 5 * ETERNIUM_RESOURCE_HOG,
      consumes: true
    }, {
      type: 'item',
      itemId: 'cursed_bar',
      icon: ITEMS['cursed_bar'].icon,
      name: ITEMS['cursed_bar'].name,
      amount: 5 * ETERNIUM_RESOURCE_HOG,
      consumes: true
    }, {
      type: 'item',
      itemId: 'relicrock_spear',
      icon: ITEMS['relicrock_spear'].icon,
      name: ITEMS['relicrock_spear'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'skill',
      name: 'crafting',
      level: 125
    }]
  },

  eternium_short_sword: {
    produces: 'eternium_short_sword',
    name: 'eternium short sword',
    category: 'combat',
    recipeFor: 'crafting',
    id: 'eternium_short_sword',
    isHidden: true,
    timeToCraft: 60 * 60 * 2,
    xp: (CURSED_ESS_XP * 4) + (BONUS_XP * 4),
    maxToCraft: 1,
    tags: ['weapon'],
    requiredCraftingLevel: 125,
    required: [{
      type: 'item',
      itemId: 'relicrock_furnace',
      icon: ITEMS['relicrock_furnace'].icon,
      name: ITEMS['relicrock_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'mithril_essence',
      icon: ITEMS['mithril_essence'].icon,
      name: ITEMS['mithril_essence'].name,
      amount: 4 * ETERNIUM_RESOURCE_HOG,
      consumes: true
    }, {
      type: 'item',
      itemId: 'cursed_essence',
      icon: ITEMS['cursed_essence'].icon,
      name: ITEMS['cursed_essence'].name,
      amount: 4 * ETERNIUM_RESOURCE_HOG,
      consumes: true
    }, {
      type: 'item',
      itemId: 'fiery_log',
      icon: ITEMS['fiery_log'].icon,
      name: ITEMS['fiery_log'].name,
      amount: 10 * ETERNIUM_RESOURCE_HOG,
      consumes: true
    }, {
      type: 'item',
      itemId: 'magic_log',
      icon: ITEMS['magic_log'].icon,
      name: ITEMS['magic_log'].name,
      amount: 10 * ETERNIUM_RESOURCE_HOG,
      consumes: true
    }, {
      type: 'item',
      itemId: 'mithril_bar',
      icon: ITEMS['mithril_bar'].icon,
      name: ITEMS['mithril_bar'].name,
      amount: 10 * ETERNIUM_RESOURCE_HOG,
      consumes: true
    }, {
      type: 'item',
      itemId: 'cursed_bar',
      icon: ITEMS['cursed_bar'].icon,
      name: ITEMS['cursed_bar'].name,
      amount: 10 * ETERNIUM_RESOURCE_HOG,
      consumes: true
    }, {
      type: 'item',
      itemId: 'relicrock_short_sword',
      icon: ITEMS['relicrock_short_sword'].icon,
      name: ITEMS['relicrock_short_sword'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'skill',
      name: 'crafting',
      level: 125
    }]
  },

  eternium_long_sword: {
    produces: 'eternium_long_sword',
    name: 'eternium long sword',
    category: 'combat',
    recipeFor: 'crafting',
    id: 'eternium_long_sword',
    isHidden: true,
    timeToCraft: 90 * 60,
    xp: (CURSED_ESS_XP * 8) + (BONUS_XP * 8),
    maxToCraft: 1,
    tags: ['weapon'],
    requiredCraftingLevel: 125,
    required: [{
      type: 'item',
      itemId: 'relicrock_furnace',
      icon: ITEMS['relicrock_furnace'].icon,
      name: ITEMS['relicrock_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'mithril_essence',
      icon: ITEMS['mithril_essence'].icon,
      name: ITEMS['mithril_essence'].name,
      amount: 8 * ETERNIUM_RESOURCE_HOG,
      consumes: true
    }, {
      type: 'item',
      itemId: 'cursed_essence',
      icon: ITEMS['cursed_essence'].icon,
      name: ITEMS['cursed_essence'].name,
      amount: 8 * ETERNIUM_RESOURCE_HOG,
      consumes: true
    }, {
      type: 'item',
      itemId: 'fiery_log',
      icon: ITEMS['fiery_log'].icon,
      name: ITEMS['fiery_log'].name,
      amount: 15 * ETERNIUM_RESOURCE_HOG,
      consumes: true
    }, {
      type: 'item',
      itemId: 'magic_log',
      icon: ITEMS['magic_log'].icon,
      name: ITEMS['magic_log'].name,
      amount: 15 * ETERNIUM_RESOURCE_HOG,
      consumes: true
    }, {
      type: 'item',
      itemId: 'mithril_bar',
      icon: ITEMS['mithril_bar'].icon,
      name: ITEMS['mithril_bar'].name,
      amount: 20 * ETERNIUM_RESOURCE_HOG,
      consumes: true
    }, {
      type: 'item',
      itemId: 'cursed_bar',
      icon: ITEMS['cursed_bar'].icon,
      name: ITEMS['cursed_bar'].name,
      amount: 20 * ETERNIUM_RESOURCE_HOG,
      consumes: true
    }, {
      type: 'item',
      itemId: 'relicrock_long_sword',
      icon: ITEMS['relicrock_long_sword'].icon,
      name: ITEMS['relicrock_long_sword'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'skill',
      name: 'crafting',
      level: 125
    }]
  },

  eternium_battle_axe: {
    recipeFor: 'crafting',
    produces: 'eternium_battle_axe',
    name: 'eternium battle axe',
    category: 'combat',
    id: 'eternium_battle_axe',
    isHidden: true,
    timeToCraft: 90 * 60,
    xp: (CURSED_ESS_XP * 8) + (BONUS_XP * 8),
    maxToCraft: 1,
    tags: ['weapon'],
    requiredCraftingLevel: 125,
    required: [{
      type: 'item',
      itemId: 'relicrock_furnace',
      icon: ITEMS['relicrock_furnace'].icon,
      name: ITEMS['relicrock_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'mithril_essence',
      icon: ITEMS['mithril_essence'].icon,
      name: ITEMS['mithril_essence'].name,
      amount: 8 * ETERNIUM_RESOURCE_HOG,
      consumes: true
    }, {
      type: 'item',
      itemId: 'cursed_essence',
      icon: ITEMS['cursed_essence'].icon,
      name: ITEMS['cursed_essence'].name,
      amount: 8 * ETERNIUM_RESOURCE_HOG,
      consumes: true
    }, {
      type: 'item',
      itemId: 'fiery_log',
      icon: ITEMS['fiery_log'].icon,
      name: ITEMS['fiery_log'].name,
      amount: 50 * ETERNIUM_RESOURCE_HOG,
      consumes: true
    }, {
      type: 'item',
      itemId: 'magic_log',
      icon: ITEMS['magic_log'].icon,
      name: ITEMS['magic_log'].name,
      amount: 50 * ETERNIUM_RESOURCE_HOG,
      consumes: true
    }, {
      type: 'item',
      itemId: 'mithril_bar',
      icon: ITEMS['mithril_bar'].icon,
      name: ITEMS['mithril_bar'].name,
      amount: 10 * ETERNIUM_RESOURCE_HOG,
      consumes: true
    }, {
      type: 'item',
      itemId: 'cursed_bar',
      icon: ITEMS['cursed_bar'].icon,
      name: ITEMS['cursed_bar'].name,
      amount: 10 * ETERNIUM_RESOURCE_HOG,
      consumes: true
    }, {
      type: 'item',
      itemId: 'relicrock_battle_axe',
      icon: ITEMS['relicrock_battle_axe'].icon,
      name: ITEMS['relicrock_battle_axe'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'skill',
      name: 'crafting',
      level: 125
    }]
  },

  eternium_helmet: {
    recipeFor: 'crafting',
    produces: 'eternium_helmet',
    name: 'eternium helmet',
    category: 'combat',
    id: 'eternium_helmet',
    isHidden: true,
    timeToCraft: 60 * 60 * 2,
    xp: (CURSED_ESS_XP * 4) + (BONUS_XP * 4),
    maxToCraft: 1,
    tags: ['armor'],
    requiredCraftingLevel: 125,
    required: [{
      type: 'item',
      itemId: 'relicrock_furnace',
      icon: ITEMS['relicrock_furnace'].icon,
      name: ITEMS['relicrock_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'mithril_essence',
      icon: ITEMS['mithril_essence'].icon,
      name: ITEMS['mithril_essence'].name,
      amount: 4 * ETERNIUM_RESOURCE_HOG,
      consumes: true
    }, {
      type: 'item',
      itemId: 'cursed_essence',
      icon: ITEMS['cursed_essence'].icon,
      name: ITEMS['cursed_essence'].name,
      amount: 4 * ETERNIUM_RESOURCE_HOG,
      consumes: true
    }, {
      type: 'item',
      itemId: 'fiery_log',
      icon: ITEMS['fiery_log'].icon,
      name: ITEMS['fiery_log'].name,
      amount: 25 * ETERNIUM_RESOURCE_HOG,
      consumes: true
    }, {
      type: 'item',
      itemId: 'magic_log',
      icon: ITEMS['magic_log'].icon,
      name: ITEMS['magic_log'].name,
      amount: 25 * ETERNIUM_RESOURCE_HOG,
      consumes: true
    }, {
      type: 'item',
      itemId: 'mithril_bar',
      icon: ITEMS['mithril_bar'].icon,
      name: ITEMS['mithril_bar'].name,
      amount: 5 * ETERNIUM_RESOURCE_HOG,
      consumes: true
    }, {
      type: 'item',
      itemId: 'cursed_bar',
      icon: ITEMS['cursed_bar'].icon,
      name: ITEMS['cursed_bar'].name,
      amount: 5 * ETERNIUM_RESOURCE_HOG,
      consumes: true
    }, {
      type: 'item',
      itemId: 'relicrock_helmet',
      icon: ITEMS['relicrock_helmet'].icon,
      name: ITEMS['relicrock_helmet'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'skill',
      name: 'crafting',
      level: 125
    }]
  },

  eternium_chest_plate: {
    recipeFor: 'crafting',
    produces: 'eternium_chest_plate',
    name: 'eternium chest plate',
    category: 'combat',
    id: 'eternium_chest_plate',
    isHidden: true,
    timeToCraft: 60 * 60 * 2,
    xp: (CURSED_ESS_XP * 4) + (BONUS_XP * 4),
    maxToCraft: 1,
    tags: ['armor'],
    requiredCraftingLevel: 125,
    required: [{
      type: 'item',
      itemId: 'relicrock_furnace',
      icon: ITEMS['relicrock_furnace'].icon,
      name: ITEMS['relicrock_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'mithril_essence',
      icon: ITEMS['mithril_essence'].icon,
      name: ITEMS['mithril_essence'].name,
      amount: 4 * ETERNIUM_RESOURCE_HOG,
      consumes: true
    }, {
      type: 'item',
      itemId: 'cursed_essence',
      icon: ITEMS['cursed_essence'].icon,
      name: ITEMS['cursed_essence'].name,
      amount: 4 * ETERNIUM_RESOURCE_HOG,
      consumes: true
    }, {
      type: 'item',
      itemId: 'fiery_log',
      icon: ITEMS['fiery_log'].icon,
      name: ITEMS['fiery_log'].name,
      amount: 25 * ETERNIUM_RESOURCE_HOG,
      consumes: true
    }, {
      type: 'item',
      itemId: 'magic_log',
      icon: ITEMS['magic_log'].icon,
      name: ITEMS['magic_log'].name,
      amount: 25 * ETERNIUM_RESOURCE_HOG,
      consumes: true
    }, {
      type: 'item',
      itemId: 'mithril_bar',
      icon: ITEMS['mithril_bar'].icon,
      name: ITEMS['mithril_bar'].name,
      amount: 5 * ETERNIUM_RESOURCE_HOG,
      consumes: true
    }, {
      type: 'item',
      itemId: 'cursed_bar',
      icon: ITEMS['cursed_bar'].icon,
      name: ITEMS['cursed_bar'].name,
      amount: 5 * ETERNIUM_RESOURCE_HOG,
      consumes: true
    }, {
      type: 'item',
      itemId: 'relicrock_chest_plate',
      icon: ITEMS['relicrock_chest_plate'].icon,
      name: ITEMS['relicrock_chest_plate'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'skill',
      name: 'crafting',
      level: 125
    }]
  },

  eternium_plate_legs: {
    recipeFor: 'crafting',
    produces: 'eternium_plate_legs',
    name: 'eternium plate legs',
    category: 'combat',
    id: 'eternium_plate_legs',
    isHidden: true,
    timeToCraft: 60 * 60 * 2, // 60
    xp: (CURSED_ESS_XP * 4) + (BONUS_XP * 4),
    maxToCraft: 1,
    tags: ['armor'],
    requiredCraftingLevel: 125,
    required: [{
      type: 'item',
      itemId: 'relicrock_furnace',
      icon: ITEMS['relicrock_furnace'].icon,
      name: ITEMS['relicrock_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'mithril_essence',
      icon: ITEMS['mithril_essence'].icon,
      name: ITEMS['mithril_essence'].name,
      amount: 4 * ETERNIUM_RESOURCE_HOG,
      consumes: true
    }, {
      type: 'item',
      itemId: 'cursed_essence',
      icon: ITEMS['cursed_essence'].icon,
      name: ITEMS['cursed_essence'].name,
      amount: 4 * ETERNIUM_RESOURCE_HOG,
      consumes: true
    }, {
      type: 'item',
      itemId: 'fiery_log',
      icon: ITEMS['fiery_log'].icon,
      name: ITEMS['fiery_log'].name,
      amount: 25 * ETERNIUM_RESOURCE_HOG,
      consumes: true
    }, {
      type: 'item',
      itemId: 'magic_log',
      icon: ITEMS['magic_log'].icon,
      name: ITEMS['magic_log'].name,
      amount: 25 * ETERNIUM_RESOURCE_HOG,
      consumes: true
    }, {
      type: 'item',
      itemId: 'mithril_bar',
      icon: ITEMS['mithril_bar'].icon,
      name: ITEMS['mithril_bar'].name,
      amount: 5 * ETERNIUM_RESOURCE_HOG,
      consumes: true
    }, {
      type: 'item',
      itemId: 'cursed_bar',
      icon: ITEMS['cursed_bar'].icon,
      name: ITEMS['cursed_bar'].name,
      amount: 5 * ETERNIUM_RESOURCE_HOG,
      consumes: true
    }, {
      type: 'item',
      itemId: 'relicrock_plate_legs',
      icon: ITEMS['relicrock_plate_legs'].icon,
      name: ITEMS['relicrock_plate_legs'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'skill',
      name: 'crafting',
      level: 125
    }]
  },

  eternium_shield: {
    recipeFor: 'crafting',
    produces: 'eternium_shield',
    name: 'eternium shield',
    category: 'combat',
    id: 'eternium_shield',
    isHidden: true,
    timeToCraft: 60 * 60 * 2, // 60
    xp: (CURSED_ESS_XP * 4) + (BONUS_XP * 4),
    maxToCraft: 1,
    tags: ['weapon'],
    requiredCraftingLevel: 125,
    required: [{
      type: 'item',
      itemId: 'relicrock_furnace',
      icon: ITEMS['relicrock_furnace'].icon,
      name: ITEMS['relicrock_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'mithril_essence',
      icon: ITEMS['mithril_essence'].icon,
      name: ITEMS['mithril_essence'].name,
      amount: 4 * ETERNIUM_RESOURCE_HOG,
      consumes: true
    }, {
      type: 'item',
      itemId: 'cursed_essence',
      icon: ITEMS['cursed_essence'].icon,
      name: ITEMS['cursed_essence'].name,
      amount: 4 * ETERNIUM_RESOURCE_HOG,
      consumes: true
    }, {
      type: 'item',
      itemId: 'fiery_log',
      icon: ITEMS['fiery_log'].icon,
      name: ITEMS['fiery_log'].name,
      amount: 50 * ETERNIUM_RESOURCE_HOG,
      consumes: true
    }, {
      type: 'item',
      itemId: 'magic_log',
      icon: ITEMS['magic_log'].icon,
      name: ITEMS['magic_log'].name,
      amount: 50 * ETERNIUM_RESOURCE_HOG,
      consumes: true
    }, {
      type: 'item',
      itemId: 'mithril_bar',
      icon: ITEMS['mithril_bar'].icon,
      name: ITEMS['mithril_bar'].name,
      amount: 5 * ETERNIUM_RESOURCE_HOG,
      consumes: true
    }, {
      type: 'item',
      itemId: 'cursed_bar',
      icon: ITEMS['cursed_bar'].icon,
      name: ITEMS['cursed_bar'].name,
      amount: 5 * ETERNIUM_RESOURCE_HOG,
      consumes: true
    }, {
      type: 'item',
      itemId: 'relicrock_shield',
      icon: ITEMS['relicrock_shield'].icon,
      name: ITEMS['relicrock_shield'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'skill',
      name: 'crafting',
      level: 125
    }]
  }
};
