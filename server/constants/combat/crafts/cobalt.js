import { ITEMS } from '/server/constants/items/index.js'; 

export const COBALT_CRAFTS = {
  cobalt_dagger: {
    produces: 'cobalt_dagger',
    name: 'cobalt dagger',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'cobalt_dagger',
    timeToCraft: 30 * 60 * 2,
    xp: 160,
    maxToCraft: 1,
    requiredCraftingLevel: 30,
    required: [{
      type: 'item',
      itemId: 'orichalcum_furnace',
      icon: ITEMS['orichalcum_furnace'].icon,
      name: ITEMS['orichalcum_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'cobalt_essence',
      icon: ITEMS['cobalt_essence'].icon,
      name: ITEMS['cobalt_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'mahogany_log',
      icon: ITEMS['mahogany_log'].icon,
      name: ITEMS['mahogany_log'].name,
      amount: 3,
      consumes: true
    }, {
      type: 'item',
      itemId: 'cobalt_bar',
      icon: ITEMS['cobalt_bar'].icon,
      name: ITEMS['cobalt_bar'].name,
      amount: 3,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 30
    }]
  },

  cobalt_spear: {
    produces: 'cobalt_spear',
    name: 'cobalt spear',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'cobalt_spear',
    timeToCraft: 60 * 60 * 2,
    xp: 400,
    maxToCraft: 1,
    requiredCraftingLevel: 30,
    required: [{
      type: 'item',
      itemId: 'orichalcum_furnace',
      icon: ITEMS['orichalcum_furnace'].icon,
      name: ITEMS['orichalcum_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'cobalt_essence',
      icon: ITEMS['cobalt_essence'].icon,
      name: ITEMS['cobalt_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'mahogany_log',
      icon: ITEMS['mahogany_log'].icon,
      name: ITEMS['mahogany_log'].name,
      amount: 20,
      consumes: true
    }, {
      type: 'item',
      itemId: 'cobalt_bar',
      icon: ITEMS['cobalt_bar'].icon,
      name: ITEMS['cobalt_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 30
    }]
  },

  cobalt_short_sword: {
    produces: 'cobalt_short_sword',
    name: 'cobalt short sword',
    category: 'combat',
    recipeFor: 'crafting',
    id: 'cobalt_short_sword',
    timeToCraft: 60 * 60 * 2,
    xp: 550,
    maxToCraft: 1,
    requiredCraftingLevel: 30,
    required: [{
      type: 'item',
      itemId: 'orichalcum_furnace',
      icon: ITEMS['orichalcum_furnace'].icon,
      name: ITEMS['orichalcum_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'cobalt_essence',
      icon: ITEMS['cobalt_essence'].icon,
      name: ITEMS['cobalt_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'mahogany_log',
      icon: ITEMS['mahogany_log'].icon,
      name: ITEMS['mahogany_log'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'item',
      itemId: 'cobalt_bar',
      icon: ITEMS['cobalt_bar'].icon,
      name: ITEMS['cobalt_bar'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 30
    }]
  },

  cobalt_long_sword: {
    produces: 'cobalt_long_sword',
    name: 'cobalt long sword',
    category: 'combat',
    recipeFor: 'crafting',
    id: 'cobalt_long_sword',
    timeToCraft: 90 * 60,
    xp: 850,
    maxToCraft: 1,
    requiredCraftingLevel: 32,
    required: [{
      type: 'item',
      itemId: 'orichalcum_furnace',
      icon: ITEMS['orichalcum_furnace'].icon,
      name: ITEMS['orichalcum_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'cobalt_essence',
      icon: ITEMS['cobalt_essence'].icon,
      name: ITEMS['cobalt_essence'].name,
      amount: 8,
      consumes: true
    }, {
      type: 'item',
      itemId: 'mahogany_log',
      icon: ITEMS['mahogany_log'].icon,
      name: ITEMS['mahogany_log'].name,
      amount: 15,
      consumes: true
    }, {
      type: 'item',
      itemId: 'cobalt_bar',
      icon: ITEMS['cobalt_bar'].icon,
      name: ITEMS['cobalt_bar'].name,
      amount: 20,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 32
    }]
  },

  cobalt_battle_axe: {
    recipeFor: 'crafting',
    produces: 'cobalt_battle_axe',
    name: 'cobalt battle axe',
    category: 'combat',
    id: 'cobalt_battle_axe',
    timeToCraft: 90 * 60,
    xp: 850,
    maxToCraft: 1,
    requiredCraftingLevel: 32,
    required: [{
      type: 'item',
      itemId: 'orichalcum_furnace',
      icon: ITEMS['orichalcum_furnace'].icon,
      name: ITEMS['orichalcum_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'cobalt_essence',
      icon: ITEMS['cobalt_essence'].icon,
      name: ITEMS['cobalt_essence'].name,
      amount: 8,
      consumes: true
    }, {
      type: 'item',
      itemId: 'mahogany_log',
      icon: ITEMS['mahogany_log'].icon,
      name: ITEMS['mahogany_log'].name,
      amount: 50,
      consumes: true
    }, {
      type: 'item',
      itemId: 'cobalt_bar',
      icon: ITEMS['cobalt_bar'].icon,
      name: ITEMS['cobalt_bar'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 32
    }]
  },

  cobalt_helmet: {
    recipeFor: 'crafting',
    produces: 'cobalt_helmet',
    name: 'cobalt helmet',
    category: 'combat',
    id: 'cobalt_helmet',
    timeToCraft: 60 * 60 * 2,
    xp: 450,
    maxToCraft: 1,
    requiredCraftingLevel: 30,
    required: [{
      type: 'item',
      itemId: 'orichalcum_furnace',
      icon: ITEMS['orichalcum_furnace'].icon,
      name: ITEMS['orichalcum_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'cobalt_essence',
      icon: ITEMS['cobalt_essence'].icon,
      name: ITEMS['cobalt_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'mahogany_log',
      icon: ITEMS['mahogany_log'].icon,
      name: ITEMS['mahogany_log'].name,
      amount: 25,
      consumes: true
    }, {
      type: 'item',
      itemId: 'cobalt_bar',
      icon: ITEMS['cobalt_bar'].icon,
      name: ITEMS['cobalt_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 30
    }]
  },

  cobalt_chest_plate: {
    recipeFor: 'crafting',
    produces: 'cobalt_chest_plate',
    name: 'cobalt chest plate',
    category: 'combat',
    id: 'cobalt_chest_plate',
    timeToCraft: 60 * 60 * 2,
    xp: 450,
    maxToCraft: 1,
    requiredCraftingLevel: 30,
    required: [{
      type: 'item',
      itemId: 'orichalcum_furnace',
      icon: ITEMS['orichalcum_furnace'].icon,
      name: ITEMS['orichalcum_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'cobalt_essence',
      icon: ITEMS['cobalt_essence'].icon,
      name: ITEMS['cobalt_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'mahogany_log',
      icon: ITEMS['mahogany_log'].icon,
      name: ITEMS['mahogany_log'].name,
      amount: 25,
      consumes: true
    }, {
      type: 'item',
      itemId: 'cobalt_bar',
      icon: ITEMS['cobalt_bar'].icon,
      name: ITEMS['cobalt_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 30
    }]
  },

  cobalt_plate_legs: {
    recipeFor: 'crafting',
    produces: 'cobalt_plate_legs',
    name: 'cobalt plate legs',
    category: 'combat',
    id: 'cobalt_plate_legs',
    timeToCraft: 60 * 60 * 2, // 60
    xp: 450,
    maxToCraft: 1,
    requiredCraftingLevel: 30,
    required: [{
      type: 'item',
      itemId: 'orichalcum_furnace',
      icon: ITEMS['orichalcum_furnace'].icon,
      name: ITEMS['orichalcum_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'cobalt_essence',
      icon: ITEMS['cobalt_essence'].icon,
      name: ITEMS['cobalt_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'mahogany_log',
      icon: ITEMS['mahogany_log'].icon,
      name: ITEMS['mahogany_log'].name,
      amount: 25,
      consumes: true
    }, {
      type: 'item',
      itemId: 'cobalt_bar',
      icon: ITEMS['cobalt_bar'].icon,
      name: ITEMS['cobalt_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 30
    }]
  },

  cobalt_shield: {
    recipeFor: 'crafting',
    produces: 'cobalt_shield',
    name: 'cobalt shield',
    category: 'combat',
    id: 'cobalt_shield',
    timeToCraft: 60 * 60 * 2, // 60
    xp: 450,
    maxToCraft: 1,
    requiredCraftingLevel: 30,
    required: [{
      type: 'item',
      itemId: 'orichalcum_furnace',
      icon: ITEMS['orichalcum_furnace'].icon,
      name: ITEMS['orichalcum_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'cobalt_essence',
      icon: ITEMS['cobalt_essence'].icon,
      name: ITEMS['cobalt_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'mahogany_log',
      icon: ITEMS['mahogany_log'].icon,
      name: ITEMS['mahogany_log'].name,
      amount: 50,
      consumes: true
    }, {
      type: 'item',
      itemId: 'cobalt_bar',
      icon: ITEMS['cobalt_bar'].icon,
      name: ITEMS['cobalt_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 30
    }]
  }
}
