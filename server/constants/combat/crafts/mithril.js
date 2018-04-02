import { ITEMS } from '/server/constants/items/index.js'; 

export const MITHRIL_CRAFTS = {
  mithril_dagger: {
    produces: 'mithril_dagger',
    name: 'mithril dagger',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'mithril_dagger',
    timeToCraft: 30 * 60,
    xp: 50000,
    maxToCraft: 1,
    tags: ['weapon', 'dagger'],
    requiredCraftingLevel: 65,
    required: [{
      type: 'item',
      itemId: 'cobalt_furnace',
      icon: ITEMS['cobalt_furnace'].icon,
      name: ITEMS['cobalt_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'mithril_essence',
      icon: ITEMS['mithril_essence'].icon,
      name: ITEMS['mithril_essence'].name,
      amount: 2,
      consumes: true
    }, {
      type: 'item',
      itemId: 'gombe_log',
      icon: ITEMS['gombe_log'].icon,
      name: ITEMS['gombe_log'].name,
      amount: 3,
      consumes: true
    }, {
      type: 'item',
      itemId: 'mithril_bar',
      icon: ITEMS['mithril_bar'].icon,
      name: ITEMS['mithril_bar'].name,
      amount: 3,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 65
    }]
  },

  mithril_spear: {
    produces: 'mithril_spear',
    name: 'mithril spear',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'mithril_spear',
    timeToCraft: 60 * 60,
    xp: 100000,
    maxToCraft: 1,
    tags: ['weapon', 'spear'],
    requiredCraftingLevel: 65,
    required: [{
      type: 'item',
      itemId: 'cobalt_furnace',
      icon: ITEMS['cobalt_furnace'].icon,
      name: ITEMS['cobalt_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'mithril_essence',
      icon: ITEMS['mithril_essence'].icon,
      name: ITEMS['mithril_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'gombe_log',
      icon: ITEMS['gombe_log'].icon,
      name: ITEMS['gombe_log'].name,
      amount: 20,
      consumes: true
    }, {
      type: 'item',
      itemId: 'mithril_bar',
      icon: ITEMS['mithril_bar'].icon,
      name: ITEMS['mithril_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 65
    }]
  },

  mithril_short_sword: {
    produces: 'mithril_short_sword',
    name: 'mithril short sword',
    category: 'combat',
    recipeFor: 'crafting',
    id: 'mithril_short_sword',
    timeToCraft: 60 * 60,
    xp: 100000,
    maxToCraft: 1,
    tags: ['weapon', 'shortsword'],
    requiredCraftingLevel: 65,
    required: [{
      type: 'item',
      itemId: 'cobalt_furnace',
      icon: ITEMS['cobalt_furnace'].icon,
      name: ITEMS['cobalt_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'mithril_essence',
      icon: ITEMS['mithril_essence'].icon,
      name: ITEMS['mithril_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'gombe_log',
      icon: ITEMS['gombe_log'].icon,
      name: ITEMS['gombe_log'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'item',
      itemId: 'mithril_bar',
      icon: ITEMS['mithril_bar'].icon,
      name: ITEMS['mithril_bar'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 65
    }]
  },

  mithril_long_sword: {
    produces: 'mithril_long_sword',
    name: 'mithril long sword',
    category: 'combat',
    recipeFor: 'crafting',
    id: 'mithril_long_sword',
    timeToCraft: 90 * 60,
    xp: 200000,
    maxToCraft: 1,
    tags: ['weapon', 'longsword'],
    requiredCraftingLevel: 65,
    required: [{
      type: 'item',
      itemId: 'cobalt_furnace',
      icon: ITEMS['cobalt_furnace'].icon,
      name: ITEMS['cobalt_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'mithril_essence',
      icon: ITEMS['mithril_essence'].icon,
      name: ITEMS['mithril_essence'].name,
      amount: 8,
      consumes: true
    }, {
      type: 'item',
      itemId: 'gombe_log',
      icon: ITEMS['gombe_log'].icon,
      name: ITEMS['gombe_log'].name,
      amount: 15,
      consumes: true
    }, {
      type: 'item',
      itemId: 'mithril_bar',
      icon: ITEMS['mithril_bar'].icon,
      name: ITEMS['mithril_bar'].name,
      amount: 20,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 65
    }]
  },

  mithril_battle_axe: {
    recipeFor: 'crafting',
    produces: 'mithril_battle_axe',
    name: 'mithril battle axe',
    category: 'combat',
    id: 'mithril_battle_axe',
    timeToCraft: 90 * 60,
    xp: 200000,
    maxToCraft: 1,
    tags: ['weapon', 'battleaxe'],
    requiredCraftingLevel: 65,
    required: [{
      type: 'item',
      itemId: 'cobalt_furnace',
      icon: ITEMS['cobalt_furnace'].icon,
      name: ITEMS['cobalt_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'mithril_essence',
      icon: ITEMS['mithril_essence'].icon,
      name: ITEMS['mithril_essence'].name,
      amount: 8,
      consumes: true
    }, {
      type: 'item',
      itemId: 'gombe_log',
      icon: ITEMS['gombe_log'].icon,
      name: ITEMS['gombe_log'].name,
      amount: 50,
      consumes: true
    }, {
      type: 'item',
      itemId: 'mithril_bar',
      icon: ITEMS['mithril_bar'].icon,
      name: ITEMS['mithril_bar'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 65
    }]
  },

  mithril_helmet: {
    recipeFor: 'crafting',
    produces: 'mithril_helmet',
    name: 'mithril helmet',
    category: 'combat',
    id: 'mithril_helmet',
    timeToCraft: 60 * 60,
    xp: 100000,
    maxToCraft: 1,
    tags: ['armor', 'helmet'],
    requiredCraftingLevel: 65,
    required: [{
      type: 'item',
      itemId: 'cobalt_furnace',
      icon: ITEMS['cobalt_furnace'].icon,
      name: ITEMS['cobalt_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'mithril_essence',
      icon: ITEMS['mithril_essence'].icon,
      name: ITEMS['mithril_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'gombe_log',
      icon: ITEMS['gombe_log'].icon,
      name: ITEMS['gombe_log'].name,
      amount: 25,
      consumes: true
    }, {
      type: 'item',
      itemId: 'mithril_bar',
      icon: ITEMS['mithril_bar'].icon,
      name: ITEMS['mithril_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 65
    }]
  },

  mithril_chest_plate: {
    recipeFor: 'crafting',
    produces: 'mithril_chest_plate',
    name: 'mithril chest plate',
    category: 'combat',
    id: 'mithril_chest_plate',
    timeToCraft: 60 * 60,
    xp: 100000,
    maxToCraft: 1,
    tags: ['armor', 'chest'],
    requiredCraftingLevel: 65,
    required: [{
      type: 'item',
      itemId: 'cobalt_furnace',
      icon: ITEMS['cobalt_furnace'].icon,
      name: ITEMS['cobalt_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'mithril_essence',
      icon: ITEMS['mithril_essence'].icon,
      name: ITEMS['mithril_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'gombe_log',
      icon: ITEMS['gombe_log'].icon,
      name: ITEMS['gombe_log'].name,
      amount: 25,
      consumes: true
    }, {
      type: 'item',
      itemId: 'mithril_bar',
      icon: ITEMS['mithril_bar'].icon,
      name: ITEMS['mithril_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 65
    }]
  },

  mithril_plate_legs: {
    recipeFor: 'crafting',
    produces: 'mithril_plate_legs',
    name: 'mithril plate legs',
    category: 'combat',
    id: 'mithril_plate_legs',
    timeToCraft: 60 * 60, // 60
    xp: 100000,
    maxToCraft: 1,
    tags: ['armor', 'legs'],
    requiredCraftingLevel: 65,
    required: [{
      type: 'item',
      itemId: 'cobalt_furnace',
      icon: ITEMS['cobalt_furnace'].icon,
      name: ITEMS['cobalt_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'mithril_essence',
      icon: ITEMS['mithril_essence'].icon,
      name: ITEMS['mithril_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'gombe_log',
      icon: ITEMS['gombe_log'].icon,
      name: ITEMS['gombe_log'].name,
      amount: 25,
      consumes: true
    }, {
      type: 'item',
      itemId: 'mithril_bar',
      icon: ITEMS['mithril_bar'].icon,
      name: ITEMS['mithril_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 65
    }]
  },

  mithril_shield: {
    recipeFor: 'crafting',
    produces: 'mithril_shield',
    name: 'mithril shield',
    category: 'combat',
    id: 'mithril_shield',
    timeToCraft: 60 * 60, // 60
    xp: 100000,
    maxToCraft: 1,
    tags: ['weapon', 'armor', 'shield'],
    requiredCraftingLevel: 65,
    required: [{
      type: 'item',
      itemId: 'cobalt_furnace',
      icon: ITEMS['cobalt_furnace'].icon,
      name: ITEMS['cobalt_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'mithril_essence',
      icon: ITEMS['mithril_essence'].icon,
      name: ITEMS['mithril_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'gombe_log',
      icon: ITEMS['gombe_log'].icon,
      name: ITEMS['gombe_log'].name,
      amount: 50,
      consumes: true
    }, {
      type: 'item',
      itemId: 'mithril_bar',
      icon: ITEMS['mithril_bar'].icon,
      name: ITEMS['mithril_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 65
    }]
  }
}
