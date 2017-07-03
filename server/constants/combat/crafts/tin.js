import { ITEMS } from '/server/constants/items/index.js'; 

export const TIN_CRAFTS = {
  tin_dagger: {
    produces: 'tin_dagger',
    name: 'tin dagger',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'tin_dagger',
    timeToCraft: 60, // 60
    xp: 37,
    maxToCraft: 1,
    requiredCraftingLevel: 6,
    required: [{
      type: 'item',
      itemId: 'copper_furnace',
      icon: ITEMS['copper_furnace'].icon,
      name: ITEMS['copper_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'beech_log',
      icon: ITEMS['beech_log'].icon,
      name: ITEMS['beech_log'].name,
      amount: 3,
      consumes: true
    }, {
      type: 'item',
      itemId: 'tin_bar',
      icon: ITEMS['tin_bar'].icon,
      name: ITEMS['tin_bar'].name,
      amount: 3,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 6
    }]
  },

  tin_spear: {
    produces: 'tin_spear',
    name: 'tin spear',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'tin_spear',
    timeToCraft: 120, // 60
    xp: 76,
    maxToCraft: 1,
    requiredCraftingLevel: 6,
    required: [{
      type: 'item',
      itemId: 'copper_furnace',
      icon: ITEMS['copper_furnace'].icon,
      name: ITEMS['copper_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'beech_log',
      icon: ITEMS['beech_log'].icon,
      name: ITEMS['beech_log'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'item',
      itemId: 'tin_bar',
      icon: ITEMS['tin_bar'].icon,
      name: ITEMS['tin_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 6
    }]
  },

  tin_short_sword: {
    produces: 'tin_short_sword',
    name: 'tin short sword',
    category: 'combat',
    recipeFor: 'crafting',
    id: 'tin_short_sword',
    timeToCraft: 120, // 60
    xp: 76,
    maxToCraft: 1,
    requiredCraftingLevel: 6,
    required: [{
      type: 'item',
      itemId: 'copper_furnace',
      icon: ITEMS['copper_furnace'].icon,
      name: ITEMS['copper_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'beech_log',
      icon: ITEMS['beech_log'].icon,
      name: ITEMS['beech_log'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'item',
      itemId: 'tin_bar',
      icon: ITEMS['tin_bar'].icon,
      name: ITEMS['tin_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 6
    }]
  },

  tin_long_sword: {
    produces: 'tin_long_sword',
    name: 'tin long sword',
    category: 'combat',
    recipeFor: 'crafting',
    id: 'tin_long_sword',
    timeToCraft: 120, // 60
    xp: 76,
    maxToCraft: 1,
    requiredCraftingLevel: 6,
    required: [{
      type: 'item',
      itemId: 'copper_furnace',
      icon: ITEMS['copper_furnace'].icon,
      name: ITEMS['copper_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'beech_log',
      icon: ITEMS['beech_log'].icon,
      name: ITEMS['beech_log'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'item',
      itemId: 'tin_bar',
      icon: ITEMS['tin_bar'].icon,
      name: ITEMS['tin_bar'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 6
    }]
  },

  tin_battle_axe: {
    recipeFor: 'crafting',
    produces: 'tin_battle_axe',
    name: 'tin battle axe',
    category: 'combat',
    id: 'tin_battle_axe',
    timeToCraft: 120, // 60
    xp: 76,
    maxToCraft: 1,
    requiredCraftingLevel: 6,
    required: [{
      type: 'item',
      itemId: 'copper_furnace',
      icon: ITEMS['copper_furnace'].icon,
      name: ITEMS['copper_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'beech_log',
      icon: ITEMS['beech_log'].icon,
      name: ITEMS['beech_log'].name,
      amount: 20,
      consumes: true
    }, {
      type: 'item',
      itemId: 'tin_bar',
      icon: ITEMS['tin_bar'].icon,
      name: ITEMS['tin_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 6
    }]
  },

  tin_helmet: {
    recipeFor: 'crafting',
    produces: 'tin_helmet',
    name: 'tin helmet',
    category: 'combat',
    id: 'tin_helmet',
    timeToCraft: 120, // 60
    xp: 60,
    maxToCraft: 1,
    requiredCraftingLevel: 6,
    required: [{
      type: 'item',
      itemId: 'copper_furnace',
      icon: ITEMS['copper_furnace'].icon,
      name: ITEMS['copper_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'beech_log',
      icon: ITEMS['beech_log'].icon,
      name: ITEMS['beech_log'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'item',
      itemId: 'tin_bar',
      icon: ITEMS['tin_bar'].icon,
      name: ITEMS['tin_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 6
    }]
  },

  tin_chest_plate: {
    recipeFor: 'crafting',
    produces: 'tin_chest_plate',
    name: 'tin chest plate',
    category: 'combat',
    id: 'tin_chest_plate',
    timeToCraft: 120, // 60
    xp: 60,
    maxToCraft: 1,
    requiredCraftingLevel: 6,
    required: [{
      type: 'item',
      itemId: 'copper_furnace',
      icon: ITEMS['copper_furnace'].icon,
      name: ITEMS['copper_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'beech_log',
      icon: ITEMS['beech_log'].icon,
      name: ITEMS['beech_log'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'item',
      itemId: 'tin_bar',
      icon: ITEMS['tin_bar'].icon,
      name: ITEMS['tin_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 6
    }]
  },

  tin_plate_legs: {
    recipeFor: 'crafting',
    produces: 'tin_plate_legs',
    name: 'tin plate legs',
    category: 'combat',
    id: 'tin_plate_legs',
    timeToCraft: 120, // 60
    xp: 60,
    maxToCraft: 1,
    requiredCraftingLevel: 6,
    required: [{
      type: 'item',
      itemId: 'copper_furnace',
      icon: ITEMS['copper_furnace'].icon,
      name: ITEMS['copper_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'beech_log',
      icon: ITEMS['beech_log'].icon,
      name: ITEMS['beech_log'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'item',
      itemId: 'tin_bar',
      icon: ITEMS['tin_bar'].icon,
      name: ITEMS['tin_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 6
    }]
  },

  tin_shield: {
    recipeFor: 'crafting',
    produces: 'tin_shield',
    name: 'tin shield',
    category: 'combat',
    id: 'tin_shield',
    timeToCraft: 120, // 60
    xp: 60,
    maxToCraft: 1,
    requiredCraftingLevel: 6,
    required: [{
      type: 'item',
      itemId: 'copper_furnace',
      icon: ITEMS['copper_furnace'].icon,
      name: ITEMS['copper_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'beech_log',
      icon: ITEMS['beech_log'].icon,
      name: ITEMS['beech_log'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'item',
      itemId: 'tin_bar',
      icon: ITEMS['tin_bar'].icon,
      name: ITEMS['tin_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 6
    }]
  }
}
