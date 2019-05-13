import { ITEMS } from '/imports/constants/items/index.js'; 

export const ELVEN_STEEL_CRAFTS = {
  elven_steel_dagger: {
    produces: 'elven_steel_dagger',
    name: 'elven steel dagger',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'elven_steel_dagger',
    timeToCraft: 30 * 60 * 2,
    xp: 625000,
    maxToCraft: 1,
    tags: ['weapon'],
    requiredCraftingLevel: 89,
    required: [{
      type: 'item',
      itemId: 'fairy_steel_furnace',
      icon: ITEMS['fairy_steel_furnace'].icon,
      name: ITEMS['fairy_steel_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'elven_steel_essence',
      icon: ITEMS['elven_steel_essence'].icon,
      name: ITEMS['elven_steel_essence'].name,
      amount: 2,
      consumes: true
    }, {
      type: 'item',
      itemId: 'willow_log',
      icon: ITEMS['willow_log'].icon,
      name: ITEMS['willow_log'].name,
      amount: 3,
      consumes: true
    }, {
      type: 'item',
      itemId: 'elven_steel_bar',
      icon: ITEMS['elven_steel_bar'].icon,
      name: ITEMS['elven_steel_bar'].name,
      amount: 3,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 90
    }]
  },

  elven_steel_spear: {
    produces: 'elven_steel_spear',
    name: 'elven steel spear',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'elven_steel_spear',
    timeToCraft: 60 * 60 * 2,
    xp: 1250000,
    maxToCraft: 1,
    tags: ['weapon'],
    requiredCraftingLevel: 89,
    required: [{
      type: 'item',
      itemId: 'fairy_steel_furnace',
      icon: ITEMS['fairy_steel_furnace'].icon,
      name: ITEMS['fairy_steel_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'elven_steel_essence',
      icon: ITEMS['elven_steel_essence'].icon,
      name: ITEMS['elven_steel_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'willow_log',
      icon: ITEMS['willow_log'].icon,
      name: ITEMS['willow_log'].name,
      amount: 20,
      consumes: true
    }, {
      type: 'item',
      itemId: 'elven_steel_bar',
      icon: ITEMS['elven_steel_bar'].icon,
      name: ITEMS['elven_steel_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 90
    }]
  },

  elven_steel_short_sword: {
    produces: 'elven_steel_short_sword',
    name: 'elven steel short sword',
    category: 'combat',
    recipeFor: 'crafting',
    id: 'elven_steel_short_sword',
    timeToCraft: 60 * 60 * 2,
    xp: 1250000,
    maxToCraft: 1,
    tags: ['weapon'],
    requiredCraftingLevel: 89,
    required: [{
      type: 'item',
      itemId: 'fairy_steel_furnace',
      icon: ITEMS['fairy_steel_furnace'].icon,
      name: ITEMS['fairy_steel_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'elven_steel_essence',
      icon: ITEMS['elven_steel_essence'].icon,
      name: ITEMS['elven_steel_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'willow_log',
      icon: ITEMS['willow_log'].icon,
      name: ITEMS['willow_log'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'item',
      itemId: 'elven_steel_bar',
      icon: ITEMS['elven_steel_bar'].icon,
      name: ITEMS['elven_steel_bar'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 90
    }]
  },

  elven_steel_long_sword: {
    produces: 'elven_steel_long_sword',
    name: 'elven steel long sword',
    category: 'combat',
    recipeFor: 'crafting',
    id: 'elven_steel_long_sword',
    timeToCraft: 90 * 60,
    xp: 2500000,
    maxToCraft: 1,
    tags: ['weapon'],
    requiredCraftingLevel: 89,
    required: [{
      type: 'item',
      itemId: 'fairy_steel_furnace',
      icon: ITEMS['fairy_steel_furnace'].icon,
      name: ITEMS['fairy_steel_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'elven_steel_essence',
      icon: ITEMS['elven_steel_essence'].icon,
      name: ITEMS['elven_steel_essence'].name,
      amount: 8,
      consumes: true
    }, {
      type: 'item',
      itemId: 'willow_log',
      icon: ITEMS['willow_log'].icon,
      name: ITEMS['willow_log'].name,
      amount: 15,
      consumes: true
    }, {
      type: 'item',
      itemId: 'elven_steel_bar',
      icon: ITEMS['elven_steel_bar'].icon,
      name: ITEMS['elven_steel_bar'].name,
      amount: 20,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 90
    }]
  },

  elven_steel_battle_axe: {
    recipeFor: 'crafting',
    produces: 'elven_steel_battle_axe',
    name: 'elven steel battle axe',
    category: 'combat',
    id: 'elven_steel_battle_axe',
    timeToCraft: 90 * 60,
    xp: 2500000,
    maxToCraft: 1,
    tags: ['weapon'],
    requiredCraftingLevel: 89,
    required: [{
      type: 'item',
      itemId: 'fairy_steel_furnace',
      icon: ITEMS['fairy_steel_furnace'].icon,
      name: ITEMS['fairy_steel_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'elven_steel_essence',
      icon: ITEMS['elven_steel_essence'].icon,
      name: ITEMS['elven_steel_essence'].name,
      amount: 8,
      consumes: true
    }, {
      type: 'item',
      itemId: 'willow_log',
      icon: ITEMS['willow_log'].icon,
      name: ITEMS['willow_log'].name,
      amount: 50,
      consumes: true
    }, {
      type: 'item',
      itemId: 'elven_steel_bar',
      icon: ITEMS['elven_steel_bar'].icon,
      name: ITEMS['elven_steel_bar'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 90
    }]
  },

  elven_steel_helmet: {
    recipeFor: 'crafting',
    produces: 'elven_steel_helmet',
    name: 'elven steel helmet',
    category: 'combat',
    id: 'elven_steel_helmet',
    timeToCraft: 60 * 60 * 2,
    xp: 1250000,
    maxToCraft: 1,
    tags: ['armor'],
    requiredCraftingLevel: 89,
    required: [{
      type: 'item',
      itemId: 'fairy_steel_furnace',
      icon: ITEMS['fairy_steel_furnace'].icon,
      name: ITEMS['fairy_steel_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'elven_steel_essence',
      icon: ITEMS['elven_steel_essence'].icon,
      name: ITEMS['elven_steel_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'willow_log',
      icon: ITEMS['willow_log'].icon,
      name: ITEMS['willow_log'].name,
      amount: 25,
      consumes: true
    }, {
      type: 'item',
      itemId: 'elven_steel_bar',
      icon: ITEMS['elven_steel_bar'].icon,
      name: ITEMS['elven_steel_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 90
    }]
  },

  elven_steel_chest_plate: {
    recipeFor: 'crafting',
    produces: 'elven_steel_chest_plate',
    name: 'elven steel chest plate',
    category: 'combat',
    id: 'elven_steel_chest_plate',
    timeToCraft: 60 * 60 * 2,
    xp: 1250000,
    maxToCraft: 1,
    tags: ['armor'],
    requiredCraftingLevel: 89,
    required: [{
      type: 'item',
      itemId: 'fairy_steel_furnace',
      icon: ITEMS['fairy_steel_furnace'].icon,
      name: ITEMS['fairy_steel_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'elven_steel_essence',
      icon: ITEMS['elven_steel_essence'].icon,
      name: ITEMS['elven_steel_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'willow_log',
      icon: ITEMS['willow_log'].icon,
      name: ITEMS['willow_log'].name,
      amount: 25,
      consumes: true
    }, {
      type: 'item',
      itemId: 'elven_steel_bar',
      icon: ITEMS['elven_steel_bar'].icon,
      name: ITEMS['elven_steel_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 90
    }]
  },

  elven_steel_plate_legs: {
    recipeFor: 'crafting',
    produces: 'elven_steel_plate_legs',
    name: 'elven steel plate legs',
    category: 'combat',
    id: 'elven_steel_plate_legs',
    timeToCraft: 60 * 60 * 2, // 60
    xp: 1250000,
    maxToCraft: 1,
    tags: ['armor'],
    requiredCraftingLevel: 89,
    required: [{
      type: 'item',
      itemId: 'fairy_steel_furnace',
      icon: ITEMS['fairy_steel_furnace'].icon,
      name: ITEMS['fairy_steel_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'elven_steel_essence',
      icon: ITEMS['elven_steel_essence'].icon,
      name: ITEMS['elven_steel_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'willow_log',
      icon: ITEMS['willow_log'].icon,
      name: ITEMS['willow_log'].name,
      amount: 25,
      consumes: true
    }, {
      type: 'item',
      itemId: 'elven_steel_bar',
      icon: ITEMS['elven_steel_bar'].icon,
      name: ITEMS['elven_steel_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 90
    }]
  },

  elven_steel_shield: {
    recipeFor: 'crafting',
    produces: 'elven_steel_shield',
    name: 'elven steel shield',
    category: 'combat',
    id: 'elven_steel_shield',
    timeToCraft: 60 * 60 * 2, // 60
    xp: 1250000,
    maxToCraft: 1,
    tags: ['weapon'],
    requiredCraftingLevel: 89,
    required: [{
      type: 'item',
      itemId: 'fairy_steel_furnace',
      icon: ITEMS['fairy_steel_furnace'].icon,
      name: ITEMS['fairy_steel_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'elven_steel_essence',
      icon: ITEMS['elven_steel_essence'].icon,
      name: ITEMS['elven_steel_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'willow_log',
      icon: ITEMS['willow_log'].icon,
      name: ITEMS['willow_log'].name,
      amount: 50,
      consumes: true
    }, {
      type: 'item',
      itemId: 'elven_steel_bar',
      icon: ITEMS['elven_steel_bar'].icon,
      name: ITEMS['elven_steel_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 90
    }]
  }
};
