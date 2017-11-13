import { ITEMS } from '/server/constants/items/index.js'; 

export const OBSIDIAN_CRAFTS = {
  obsidian_dagger: {
    produces: 'obsidian_dagger',
    name: 'obsidian dagger',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'obsidian_dagger',
    timeToCraft: 240, // 60
    xp: 20000,
    maxToCraft: 1,
    tags: ['weapon'],
    requiredCraftingLevel: 55,
    required: [{
      type: 'item',
      itemId: 'tungsten_furnace',
      icon: ITEMS['tungsten_furnace'].icon,
      name: ITEMS['tungsten_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'obsidian_essence',
      icon: ITEMS['obsidian_essence'].icon,
      name: ITEMS['obsidian_essence'].name,
      amount: 2,
      consumes: true
    }, {
      type: 'item',
      itemId: 'cedar_log',
      icon: ITEMS['cedar_log'].icon,
      name: ITEMS['cedar_log'].name,
      amount: 3,
      consumes: true
    }, {
      type: 'item',
      itemId: 'obsidian_bar',
      icon: ITEMS['obsidian_bar'].icon,
      name: ITEMS['obsidian_bar'].name,
      amount: 3,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 55
    }]
  },

  obsidian_spear: {
    produces: 'obsidian_spear',
    name: 'obsidian spear',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'obsidian_spear',
    timeToCraft: 300, // 60
    xp: 40000,
    maxToCraft: 1,
    tags: ['weapon'],
    requiredCraftingLevel: 55,
    required: [{
      type: 'item',
      itemId: 'tungsten_furnace',
      icon: ITEMS['tungsten_furnace'].icon,
      name: ITEMS['tungsten_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'obsidian_essence',
      icon: ITEMS['obsidian_essence'].icon,
      name: ITEMS['obsidian_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'cedar_log',
      icon: ITEMS['cedar_log'].icon,
      name: ITEMS['cedar_log'].name,
      amount: 20,
      consumes: true
    }, {
      type: 'item',
      itemId: 'obsidian_bar',
      icon: ITEMS['obsidian_bar'].icon,
      name: ITEMS['obsidian_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 55
    }]
  },

  obsidian_short_sword: {
    produces: 'obsidian_short_sword',
    name: 'obsidian short sword',
    category: 'combat',
    recipeFor: 'crafting',
    id: 'obsidian_short_sword',
    timeToCraft: 300, // 60
    xp: 40000,
    maxToCraft: 1,
    tags: ['weapon'],
    requiredCraftingLevel: 55,
    required: [{
      type: 'item',
      itemId: 'tungsten_furnace',
      icon: ITEMS['tungsten_furnace'].icon,
      name: ITEMS['tungsten_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'obsidian_essence',
      icon: ITEMS['obsidian_essence'].icon,
      name: ITEMS['obsidian_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'cedar_log',
      icon: ITEMS['cedar_log'].icon,
      name: ITEMS['cedar_log'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'item',
      itemId: 'obsidian_bar',
      icon: ITEMS['obsidian_bar'].icon,
      name: ITEMS['obsidian_bar'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 55
    }]
  },

  obsidian_long_sword: {
    produces: 'obsidian_long_sword',
    name: 'obsidian long sword',
    category: 'combat',
    recipeFor: 'crafting',
    id: 'obsidian_long_sword',
    timeToCraft: 420, // 60
    xp: 40000,
    maxToCraft: 1,
    tags: ['weapon'],
    requiredCraftingLevel: 55,
    required: [{
      type: 'item',
      itemId: 'tungsten_furnace',
      icon: ITEMS['tungsten_furnace'].icon,
      name: ITEMS['tungsten_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'obsidian_essence',
      icon: ITEMS['obsidian_essence'].icon,
      name: ITEMS['obsidian_essence'].name,
      amount: 8,
      consumes: true
    }, {
      type: 'item',
      itemId: 'cedar_log',
      icon: ITEMS['cedar_log'].icon,
      name: ITEMS['cedar_log'].name,
      amount: 15,
      consumes: true
    }, {
      type: 'item',
      itemId: 'obsidian_bar',
      icon: ITEMS['obsidian_bar'].icon,
      name: ITEMS['obsidian_bar'].name,
      amount: 20,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 55
    }]
  },

  obsidian_battle_axe: {
    recipeFor: 'crafting',
    produces: 'obsidian_battle_axe',
    name: 'obsidian battle axe',
    category: 'combat',
    id: 'obsidian_battle_axe',
    timeToCraft: 600, // 60
    xp: 40000,
    maxToCraft: 1,
    tags: ['weapon'],
    requiredCraftingLevel: 55,
    required: [{
      type: 'item',
      itemId: 'tungsten_furnace',
      icon: ITEMS['tungsten_furnace'].icon,
      name: ITEMS['tungsten_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'obsidian_essence',
      icon: ITEMS['obsidian_essence'].icon,
      name: ITEMS['obsidian_essence'].name,
      amount: 8,
      consumes: true
    }, {
      type: 'item',
      itemId: 'cedar_log',
      icon: ITEMS['cedar_log'].icon,
      name: ITEMS['cedar_log'].name,
      amount: 50,
      consumes: true
    }, {
      type: 'item',
      itemId: 'obsidian_bar',
      icon: ITEMS['obsidian_bar'].icon,
      name: ITEMS['obsidian_bar'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 55
    }]
  },

  obsidian_helmet: {
    recipeFor: 'crafting',
    produces: 'obsidian_helmet',
    name: 'obsidian helmet',
    category: 'combat',
    id: 'obsidian_helmet',
    timeToCraft: 240, // 60
    xp: 40000,
    maxToCraft: 1,
    tags: ['armor'],
    requiredCraftingLevel: 55,
    required: [{
      type: 'item',
      itemId: 'tungsten_furnace',
      icon: ITEMS['tungsten_furnace'].icon,
      name: ITEMS['tungsten_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'obsidian_essence',
      icon: ITEMS['obsidian_essence'].icon,
      name: ITEMS['obsidian_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'cedar_log',
      icon: ITEMS['cedar_log'].icon,
      name: ITEMS['cedar_log'].name,
      amount: 25,
      consumes: true
    }, {
      type: 'item',
      itemId: 'obsidian_bar',
      icon: ITEMS['obsidian_bar'].icon,
      name: ITEMS['obsidian_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 55
    }]
  },

  obsidian_chest_plate: {
    recipeFor: 'crafting',
    produces: 'obsidian_chest_plate',
    name: 'obsidian chest plate',
    category: 'combat',
    id: 'obsidian_chest_plate',
    timeToCraft: 240, // 60
    xp: 40000,
    maxToCraft: 1,
    tags: ['armor'],
    requiredCraftingLevel: 55,
    required: [{
      type: 'item',
      itemId: 'tungsten_furnace',
      icon: ITEMS['tungsten_furnace'].icon,
      name: ITEMS['tungsten_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'obsidian_essence',
      icon: ITEMS['obsidian_essence'].icon,
      name: ITEMS['obsidian_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'cedar_log',
      icon: ITEMS['cedar_log'].icon,
      name: ITEMS['cedar_log'].name,
      amount: 25,
      consumes: true
    }, {
      type: 'item',
      itemId: 'obsidian_bar',
      icon: ITEMS['obsidian_bar'].icon,
      name: ITEMS['obsidian_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 55
    }]
  },

  obsidian_plate_legs: {
    recipeFor: 'crafting',
    produces: 'obsidian_plate_legs',
    name: 'obsidian plate legs',
    category: 'combat',
    id: 'obsidian_plate_legs',
    timeToCraft: 240, // 60
    xp: 40000,
    maxToCraft: 1,
    tags: ['armor'],
    requiredCraftingLevel: 55,
    required: [{
      type: 'item',
      itemId: 'tungsten_furnace',
      icon: ITEMS['tungsten_furnace'].icon,
      name: ITEMS['tungsten_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'obsidian_essence',
      icon: ITEMS['obsidian_essence'].icon,
      name: ITEMS['obsidian_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'cedar_log',
      icon: ITEMS['cedar_log'].icon,
      name: ITEMS['cedar_log'].name,
      amount: 25,
      consumes: true
    }, {
      type: 'item',
      itemId: 'obsidian_bar',
      icon: ITEMS['obsidian_bar'].icon,
      name: ITEMS['obsidian_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 55
    }]
  },

  obsidian_shield: {
    recipeFor: 'crafting',
    produces: 'obsidian_shield',
    name: 'obsidian shield',
    category: 'combat',
    id: 'obsidian_shield',
    timeToCraft: 240, // 60
    xp: 40000,
    maxToCraft: 1,
    tags: ['weapon'],
    requiredCraftingLevel: 55,
    required: [{
      type: 'item',
      itemId: 'tungsten_furnace',
      icon: ITEMS['tungsten_furnace'].icon,
      name: ITEMS['tungsten_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'obsidian_essence',
      icon: ITEMS['obsidian_essence'].icon,
      name: ITEMS['obsidian_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'cedar_log',
      icon: ITEMS['cedar_log'].icon,
      name: ITEMS['cedar_log'].name,
      amount: 50,
      consumes: true
    }, {
      type: 'item',
      itemId: 'obsidian_bar',
      icon: ITEMS['obsidian_bar'].icon,
      name: ITEMS['obsidian_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 55
    }]
  }
}
