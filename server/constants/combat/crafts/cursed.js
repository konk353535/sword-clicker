import { ITEMS } from '/server/constants/items/index.js'; 

export const CURSED_CRAFTS = {
  cursed_dagger: {
    produces: 'cursed_dagger',
    name: 'cursed dagger',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'cursed_dagger',
    timeToCraft: 30 * 60 * 2,
    xp: 1000000,
    maxToCraft: 1,
    tags: ['weapon', 'dagger'],
    requiredCraftingLevel: 95,
    required: [{
      type: 'item',
      itemId: 'elven_steel_furnace',
      icon: ITEMS['elven_steel_furnace'].icon,
      name: ITEMS['elven_steel_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'cursed_essence',
      icon: ITEMS['cursed_essence'].icon,
      name: ITEMS['cursed_essence'].name,
      amount: 2,
      consumes: true
    }, {
      type: 'item',
      itemId: 'teak_log',
      icon: ITEMS['teak_log'].icon,
      name: ITEMS['teak_log'].name,
      amount: 3,
      consumes: true
    }, {
      type: 'item',
      itemId: 'cursed_bar',
      icon: ITEMS['cursed_bar'].icon,
      name: ITEMS['cursed_bar'].name,
      amount: 3,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 95
    }]
  },

  cursed_spear: {
    produces: 'cursed_spear',
    name: 'cursed spear',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'cursed_spear',
    timeToCraft: 60 * 60 * 2,
    xp: 2000000,
    maxToCraft: 1,
    tags: ['weapon', 'spear'],
    requiredCraftingLevel: 95,
    required: [{
      type: 'item',
      itemId: 'elven_steel_furnace',
      icon: ITEMS['elven_steel_furnace'].icon,
      name: ITEMS['elven_steel_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'cursed_essence',
      icon: ITEMS['cursed_essence'].icon,
      name: ITEMS['cursed_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'teak_log',
      icon: ITEMS['teak_log'].icon,
      name: ITEMS['teak_log'].name,
      amount: 20,
      consumes: true
    }, {
      type: 'item',
      itemId: 'cursed_bar',
      icon: ITEMS['cursed_bar'].icon,
      name: ITEMS['cursed_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 95
    }]
  },

  cursed_short_sword: {
    produces: 'cursed_short_sword',
    name: 'cursed short sword',
    category: 'combat',
    recipeFor: 'crafting',
    id: 'cursed_short_sword',
    timeToCraft: 60 * 60 * 2,
    xp: 2000000,
    maxToCraft: 1,
    tags: ['weapon', 'shortsword'],
    requiredCraftingLevel: 95,
    required: [{
      type: 'item',
      itemId: 'elven_steel_furnace',
      icon: ITEMS['elven_steel_furnace'].icon,
      name: ITEMS['elven_steel_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'cursed_essence',
      icon: ITEMS['cursed_essence'].icon,
      name: ITEMS['cursed_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'teak_log',
      icon: ITEMS['teak_log'].icon,
      name: ITEMS['teak_log'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'item',
      itemId: 'cursed_bar',
      icon: ITEMS['cursed_bar'].icon,
      name: ITEMS['cursed_bar'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 95
    }]
  },

  cursed_long_sword: {
    produces: 'cursed_long_sword',
    name: 'cursed long sword',
    category: 'combat',
    recipeFor: 'crafting',
    id: 'cursed_long_sword',
    timeToCraft: 90 * 60,
    xp: 4000000,
    maxToCraft: 1,
    tags: ['weapon', 'longsword'],
    requiredCraftingLevel: 95,
    required: [{
      type: 'item',
      itemId: 'elven_steel_furnace',
      icon: ITEMS['elven_steel_furnace'].icon,
      name: ITEMS['elven_steel_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'cursed_essence',
      icon: ITEMS['cursed_essence'].icon,
      name: ITEMS['cursed_essence'].name,
      amount: 8,
      consumes: true
    }, {
      type: 'item',
      itemId: 'teak_log',
      icon: ITEMS['teak_log'].icon,
      name: ITEMS['teak_log'].name,
      amount: 15,
      consumes: true
    }, {
      type: 'item',
      itemId: 'cursed_bar',
      icon: ITEMS['cursed_bar'].icon,
      name: ITEMS['cursed_bar'].name,
      amount: 20,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 95
    }]
  },

  cursed_battle_axe: {
    recipeFor: 'crafting',
    produces: 'cursed_battle_axe',
    name: 'cursed battle axe',
    category: 'combat',
    id: 'cursed_battle_axe',
    timeToCraft: 90 * 60,
    xp: 4000000,
    maxToCraft: 1,
    tags: ['weapon', 'battleaxe'],
    requiredCraftingLevel: 95,
    required: [{
      type: 'item',
      itemId: 'elven_steel_furnace',
      icon: ITEMS['elven_steel_furnace'].icon,
      name: ITEMS['elven_steel_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'cursed_essence',
      icon: ITEMS['cursed_essence'].icon,
      name: ITEMS['cursed_essence'].name,
      amount: 8,
      consumes: true
    }, {
      type: 'item',
      itemId: 'teak_log',
      icon: ITEMS['teak_log'].icon,
      name: ITEMS['teak_log'].name,
      amount: 50,
      consumes: true
    }, {
      type: 'item',
      itemId: 'cursed_bar',
      icon: ITEMS['cursed_bar'].icon,
      name: ITEMS['cursed_bar'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 95
    }]
  },

  cursed_helmet: {
    recipeFor: 'crafting',
    produces: 'cursed_helmet',
    name: 'cursed helmet',
    category: 'combat',
    id: 'cursed_helmet',
    timeToCraft: 60 * 60 * 2,
    xp: 2000000,
    maxToCraft: 1,
    tags: ['armor', 'helmet'],
    requiredCraftingLevel: 95,
    required: [{
      type: 'item',
      itemId: 'elven_steel_furnace',
      icon: ITEMS['elven_steel_furnace'].icon,
      name: ITEMS['elven_steel_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'cursed_essence',
      icon: ITEMS['cursed_essence'].icon,
      name: ITEMS['cursed_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'teak_log',
      icon: ITEMS['teak_log'].icon,
      name: ITEMS['teak_log'].name,
      amount: 25,
      consumes: true
    }, {
      type: 'item',
      itemId: 'cursed_bar',
      icon: ITEMS['cursed_bar'].icon,
      name: ITEMS['cursed_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 95
    }]
  },

  cursed_chest_plate: {
    recipeFor: 'crafting',
    produces: 'cursed_chest_plate',
    name: 'cursed chest plate',
    category: 'combat',
    id: 'cursed_chest_plate',
    timeToCraft: 60 * 60 * 2,
    xp: 2000000,
    maxToCraft: 1,
    tags: ['armor', 'chest'],
    requiredCraftingLevel: 95,
    required: [{
      type: 'item',
      itemId: 'elven_steel_furnace',
      icon: ITEMS['elven_steel_furnace'].icon,
      name: ITEMS['elven_steel_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'cursed_essence',
      icon: ITEMS['cursed_essence'].icon,
      name: ITEMS['cursed_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'teak_log',
      icon: ITEMS['teak_log'].icon,
      name: ITEMS['teak_log'].name,
      amount: 25,
      consumes: true
    }, {
      type: 'item',
      itemId: 'cursed_bar',
      icon: ITEMS['cursed_bar'].icon,
      name: ITEMS['cursed_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 95
    }]
  },

  cursed_plate_legs: {
    recipeFor: 'crafting',
    produces: 'cursed_plate_legs',
    name: 'cursed plate legs',
    category: 'combat',
    id: 'cursed_plate_legs',
    timeToCraft: 60 * 60 * 2, // 60
    xp: 2000000,
    maxToCraft: 1,
    tags: ['armor', 'legs'],
    requiredCraftingLevel: 95,
    required: [{
      type: 'item',
      itemId: 'elven_steel_furnace',
      icon: ITEMS['elven_steel_furnace'].icon,
      name: ITEMS['elven_steel_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'cursed_essence',
      icon: ITEMS['cursed_essence'].icon,
      name: ITEMS['cursed_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'teak_log',
      icon: ITEMS['teak_log'].icon,
      name: ITEMS['teak_log'].name,
      amount: 25,
      consumes: true
    }, {
      type: 'item',
      itemId: 'cursed_bar',
      icon: ITEMS['cursed_bar'].icon,
      name: ITEMS['cursed_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 95
    }]
  },

  cursed_shield: {
    recipeFor: 'crafting',
    produces: 'cursed_shield',
    name: 'cursed shield',
    category: 'combat',
    id: 'cursed_shield',
    timeToCraft: 60 * 60 * 2, // 60
    xp: 2000000,
    maxToCraft: 1,
    tags: ['weapon', 'armor', 'shield'],
    requiredCraftingLevel: 95,
    required: [{
      type: 'item',
      itemId: 'elven_steel_furnace',
      icon: ITEMS['elven_steel_furnace'].icon,
      name: ITEMS['elven_steel_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'cursed_essence',
      icon: ITEMS['cursed_essence'].icon,
      name: ITEMS['cursed_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'teak_log',
      icon: ITEMS['teak_log'].icon,
      name: ITEMS['teak_log'].name,
      amount: 50,
      consumes: true
    }, {
      type: 'item',
      itemId: 'cursed_bar',
      icon: ITEMS['cursed_bar'].icon,
      name: ITEMS['cursed_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 95
    }]
  }
}
