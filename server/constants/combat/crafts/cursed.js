import { ITEMS } from '/server/constants/items/index.js'; 

export const CURSED_CRAFTS = {
  cursed_dagger: {
    produces: 'cursed_dagger',
    name: 'cursed dagger',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'cursed_dagger',
    timeToCraft: 30 * 60 * 2,
    xp: 160,
    maxToCraft: 1,
    requiredCraftingLevel: 40,
    required: [{
      type: 'item',
      itemId: 'fairy_steel_furnace',
      icon: ITEMS['fairy_steel_furnace'].icon,
      name: ITEMS['fairy_steel_furnace'].name,
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
      itemId: 'fiery_log',
      icon: ITEMS['fiery_log'].icon,
      name: ITEMS['fiery_log'].name,
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
      level: 40
    }]
  },

  cursed_spear: {
    produces: 'cursed_spear',
    name: 'cursed spear',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'cursed_spear',
    timeToCraft: 60 * 60 * 2,
    xp: 400,
    maxToCraft: 1,
    requiredCraftingLevel: 40,
    required: [{
      type: 'item',
      itemId: 'fairy_steel_furnace',
      icon: ITEMS['fairy_steel_furnace'].icon,
      name: ITEMS['fairy_steel_furnace'].name,
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
      itemId: 'fiery_log',
      icon: ITEMS['fiery_log'].icon,
      name: ITEMS['fiery_log'].name,
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
      level: 40
    }]
  },

  cursed_short_sword: {
    produces: 'cursed_short_sword',
    name: 'cursed short sword',
    category: 'combat',
    recipeFor: 'crafting',
    id: 'cursed_short_sword',
    timeToCraft: 60 * 60 * 2,
    xp: 550,
    maxToCraft: 1,
    requiredCraftingLevel: 40,
    required: [{
      type: 'item',
      itemId: 'fairy_steel_furnace',
      icon: ITEMS['fairy_steel_furnace'].icon,
      name: ITEMS['fairy_steel_furnace'].name,
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
      itemId: 'fiery_log',
      icon: ITEMS['fiery_log'].icon,
      name: ITEMS['fiery_log'].name,
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
      level: 40
    }]
  },

  cursed_long_sword: {
    produces: 'cursed_long_sword',
    name: 'cursed long sword',
    category: 'combat',
    recipeFor: 'crafting',
    id: 'cursed_long_sword',
    timeToCraft: 90 * 60,
    xp: 850,
    maxToCraft: 1,
    requiredCraftingLevel: 42,
    required: [{
      type: 'item',
      itemId: 'fairy_steel_furnace',
      icon: ITEMS['fairy_steel_furnace'].icon,
      name: ITEMS['fairy_steel_furnace'].name,
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
      itemId: 'fiery_log',
      icon: ITEMS['fiery_log'].icon,
      name: ITEMS['fiery_log'].name,
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
      level: 42
    }]
  },

  cursed_battle_axe: {
    recipeFor: 'crafting',
    produces: 'cursed_battle_axe',
    name: 'cursed battle axe',
    category: 'combat',
    id: 'cursed_battle_axe',
    timeToCraft: 90 * 60,
    xp: 850,
    maxToCraft: 1,
    requiredCraftingLevel: 42,
    required: [{
      type: 'item',
      itemId: 'fairy_steel_furnace',
      icon: ITEMS['fairy_steel_furnace'].icon,
      name: ITEMS['fairy_steel_furnace'].name,
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
      itemId: 'fiery_log',
      icon: ITEMS['fiery_log'].icon,
      name: ITEMS['fiery_log'].name,
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
      level: 42
    }]
  },

  cursed_helmet: {
    recipeFor: 'crafting',
    produces: 'cursed_helmet',
    name: 'cursed helmet',
    category: 'combat',
    id: 'cursed_helmet',
    timeToCraft: 60 * 60 * 2,
    xp: 450,
    maxToCraft: 1,
    requiredCraftingLevel: 40,
    required: [{
      type: 'item',
      itemId: 'fairy_steel_furnace',
      icon: ITEMS['fairy_steel_furnace'].icon,
      name: ITEMS['fairy_steel_furnace'].name,
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
      itemId: 'fiery_log',
      icon: ITEMS['fiery_log'].icon,
      name: ITEMS['fiery_log'].name,
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
      level: 40
    }]
  },

  cursed_chest_plate: {
    recipeFor: 'crafting',
    produces: 'cursed_chest_plate',
    name: 'cursed chest plate',
    category: 'combat',
    id: 'cursed_chest_plate',
    timeToCraft: 60 * 60 * 2,
    xp: 450,
    maxToCraft: 1,
    requiredCraftingLevel: 40,
    required: [{
      type: 'item',
      itemId: 'fairy_steel_furnace',
      icon: ITEMS['fairy_steel_furnace'].icon,
      name: ITEMS['fairy_steel_furnace'].name,
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
      itemId: 'fiery_log',
      icon: ITEMS['fiery_log'].icon,
      name: ITEMS['fiery_log'].name,
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
      level: 40
    }]
  },

  cursed_plate_legs: {
    recipeFor: 'crafting',
    produces: 'cursed_plate_legs',
    name: 'cursed plate legs',
    category: 'combat',
    id: 'cursed_plate_legs',
    timeToCraft: 60 * 60 * 2, // 60
    xp: 450,
    maxToCraft: 1,
    requiredCraftingLevel: 40,
    required: [{
      type: 'item',
      itemId: 'fairy_steel_furnace',
      icon: ITEMS['fairy_steel_furnace'].icon,
      name: ITEMS['fairy_steel_furnace'].name,
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
      itemId: 'fiery_log',
      icon: ITEMS['fiery_log'].icon,
      name: ITEMS['fiery_log'].name,
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
      level: 40
    }]
  },

  cursed_shield: {
    recipeFor: 'crafting',
    produces: 'cursed_shield',
    name: 'cursed shield',
    category: 'combat',
    id: 'cursed_shield',
    timeToCraft: 60 * 60 * 2, // 60
    xp: 450,
    maxToCraft: 1,
    requiredCraftingLevel: 40,
    required: [{
      type: 'item',
      itemId: 'fairy_steel_furnace',
      icon: ITEMS['fairy_steel_furnace'].icon,
      name: ITEMS['fairy_steel_furnace'].name,
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
      itemId: 'fiery_log',
      icon: ITEMS['fiery_log'].icon,
      name: ITEMS['fiery_log'].name,
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
      level: 40
    }]
  }
}
