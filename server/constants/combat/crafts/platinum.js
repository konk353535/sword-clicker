import { ITEMS } from '/server/constants/items/index.js'; 

export const PLATINUM_CRAFTS = {
  platinum_dagger: {
    produces: 'platinum_dagger',
    name: 'platinum dagger',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'platinum_dagger',
    timeToCraft: 240, // 60
    xp: 5000,
    maxToCraft: 1,
    tags: ['weapon'],
    requiredCraftingLevel: 40,
    required: [{
      type: 'item',
      itemId: 'steel_furnace',
      icon: ITEMS['steel_furnace'].icon,
      name: ITEMS['steel_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'platinum_essence',
      icon: ITEMS['platinum_essence'].icon,
      name: ITEMS['platinum_essence'].name,
      amount: 2,
      consumes: true
    }, {
      type: 'item',
      itemId: 'elk_log',
      icon: ITEMS['elk_log'].icon,
      name: ITEMS['elk_log'].name,
      amount: 3,
      consumes: true
    }, {
      type: 'item',
      itemId: 'platinum_bar',
      icon: ITEMS['platinum_bar'].icon,
      name: ITEMS['platinum_bar'].name,
      amount: 3,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 40
    }]
  },

  platinum_spear: {
    produces: 'platinum_spear',
    name: 'platinum spear',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'platinum_spear',
    timeToCraft: 300, // 60
    xp: 10000,
    maxToCraft: 1,
    tags: ['weapon'],
    requiredCraftingLevel: 40,
    required: [{
      type: 'item',
      itemId: 'steel_furnace',
      icon: ITEMS['steel_furnace'].icon,
      name: ITEMS['steel_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'platinum_essence',
      icon: ITEMS['platinum_essence'].icon,
      name: ITEMS['platinum_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'elk_log',
      icon: ITEMS['elk_log'].icon,
      name: ITEMS['elk_log'].name,
      amount: 20,
      consumes: true
    }, {
      type: 'item',
      itemId: 'platinum_bar',
      icon: ITEMS['platinum_bar'].icon,
      name: ITEMS['platinum_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 40
    }]
  },

  platinum_short_sword: {
    produces: 'platinum_short_sword',
    name: 'platinum short sword',
    category: 'combat',
    recipeFor: 'crafting',
    id: 'platinum_short_sword',
    timeToCraft: 300, // 60
    xp: 10000,
    maxToCraft: 1,
    tags: ['weapon'],
    requiredCraftingLevel: 40,
    required: [{
      type: 'item',
      itemId: 'steel_furnace',
      icon: ITEMS['steel_furnace'].icon,
      name: ITEMS['steel_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'platinum_essence',
      icon: ITEMS['platinum_essence'].icon,
      name: ITEMS['platinum_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'elk_log',
      icon: ITEMS['elk_log'].icon,
      name: ITEMS['elk_log'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'item',
      itemId: 'platinum_bar',
      icon: ITEMS['platinum_bar'].icon,
      name: ITEMS['platinum_bar'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 40
    }]
  },

  platinum_long_sword: {
    produces: 'platinum_long_sword',
    name: 'platinum long sword',
    category: 'combat',
    recipeFor: 'crafting',
    id: 'platinum_long_sword',
    timeToCraft: 420, // 60
    xp: 20000,
    maxToCraft: 1,
    tags: ['weapon'],
    requiredCraftingLevel: 40,
    required: [{
      type: 'item',
      itemId: 'steel_furnace',
      icon: ITEMS['steel_furnace'].icon,
      name: ITEMS['steel_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'platinum_essence',
      icon: ITEMS['platinum_essence'].icon,
      name: ITEMS['platinum_essence'].name,
      amount: 8,
      consumes: true
    }, {
      type: 'item',
      itemId: 'elk_log',
      icon: ITEMS['elk_log'].icon,
      name: ITEMS['elk_log'].name,
      amount: 15,
      consumes: true
    }, {
      type: 'item',
      itemId: 'platinum_bar',
      icon: ITEMS['platinum_bar'].icon,
      name: ITEMS['platinum_bar'].name,
      amount: 20,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 40
    }]
  },

  platinum_battle_axe: {
    recipeFor: 'crafting',
    produces: 'platinum_battle_axe',
    name: 'platinum battle axe',
    category: 'combat',
    id: 'platinum_battle_axe',
    timeToCraft: 600, // 60
    xp: 20000,
    maxToCraft: 1,
    tags: ['weapon'],
    requiredCraftingLevel: 40,
    required: [{
      type: 'item',
      itemId: 'steel_furnace',
      icon: ITEMS['steel_furnace'].icon,
      name: ITEMS['steel_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'platinum_essence',
      icon: ITEMS['platinum_essence'].icon,
      name: ITEMS['platinum_essence'].name,
      amount: 8,
      consumes: true
    }, {
      type: 'item',
      itemId: 'elk_log',
      icon: ITEMS['elk_log'].icon,
      name: ITEMS['elk_log'].name,
      amount: 50,
      consumes: true
    }, {
      type: 'item',
      itemId: 'platinum_bar',
      icon: ITEMS['platinum_bar'].icon,
      name: ITEMS['platinum_bar'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 40
    }]
  },

  platinum_helmet: {
    recipeFor: 'crafting',
    produces: 'platinum_helmet',
    name: 'platinum helmet',
    category: 'combat',
    id: 'platinum_helmet',
    timeToCraft: 240, // 60
    xp: 10000,
    maxToCraft: 1,
    tags: ['armor'],
    requiredCraftingLevel: 40,
    required: [{
      type: 'item',
      itemId: 'steel_furnace',
      icon: ITEMS['steel_furnace'].icon,
      name: ITEMS['steel_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'platinum_essence',
      icon: ITEMS['platinum_essence'].icon,
      name: ITEMS['platinum_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'elk_log',
      icon: ITEMS['elk_log'].icon,
      name: ITEMS['elk_log'].name,
      amount: 25,
      consumes: true
    }, {
      type: 'item',
      itemId: 'platinum_bar',
      icon: ITEMS['platinum_bar'].icon,
      name: ITEMS['platinum_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 40
    }]
  },

  platinum_chest_plate: {
    recipeFor: 'crafting',
    produces: 'platinum_chest_plate',
    name: 'platinum chest plate',
    category: 'combat',
    id: 'platinum_chest_plate',
    timeToCraft: 240, // 60
    xp: 10000,
    maxToCraft: 1,
    tags: ['armor'],
    requiredCraftingLevel: 40,
    required: [{
      type: 'item',
      itemId: 'steel_furnace',
      icon: ITEMS['steel_furnace'].icon,
      name: ITEMS['steel_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'platinum_essence',
      icon: ITEMS['platinum_essence'].icon,
      name: ITEMS['platinum_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'elk_log',
      icon: ITEMS['elk_log'].icon,
      name: ITEMS['elk_log'].name,
      amount: 25,
      consumes: true
    }, {
      type: 'item',
      itemId: 'platinum_bar',
      icon: ITEMS['platinum_bar'].icon,
      name: ITEMS['platinum_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 40
    }]
  },

  platinum_plate_legs: {
    recipeFor: 'crafting',
    produces: 'platinum_plate_legs',
    name: 'platinum plate legs',
    category: 'combat',
    id: 'platinum_plate_legs',
    timeToCraft: 240, // 60
    xp: 10000,
    maxToCraft: 1,
    tags: ['armor'],
    requiredCraftingLevel: 40,
    required: [{
      type: 'item',
      itemId: 'steel_furnace',
      icon: ITEMS['steel_furnace'].icon,
      name: ITEMS['steel_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'platinum_essence',
      icon: ITEMS['platinum_essence'].icon,
      name: ITEMS['platinum_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'elk_log',
      icon: ITEMS['elk_log'].icon,
      name: ITEMS['elk_log'].name,
      amount: 25,
      consumes: true
    }, {
      type: 'item',
      itemId: 'platinum_bar',
      icon: ITEMS['platinum_bar'].icon,
      name: ITEMS['platinum_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 40
    }]
  },

  platinum_shield: {
    recipeFor: 'crafting',
    produces: 'platinum_shield',
    name: 'platinum shield',
    category: 'combat',
    id: 'platinum_shield',
    timeToCraft: 240, // 60
    xp: 10000,
    maxToCraft: 1,
    tags: ['weapon'],
    requiredCraftingLevel: 40,
    required: [{
      type: 'item',
      itemId: 'steel_furnace',
      icon: ITEMS['steel_furnace'].icon,
      name: ITEMS['steel_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'platinum_essence',
      icon: ITEMS['platinum_essence'].icon,
      name: ITEMS['platinum_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'elk_log',
      icon: ITEMS['elk_log'].icon,
      name: ITEMS['elk_log'].name,
      amount: 50,
      consumes: true
    }, {
      type: 'item',
      itemId: 'platinum_bar',
      icon: ITEMS['platinum_bar'].icon,
      name: ITEMS['platinum_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 40
    }]
  }
};
