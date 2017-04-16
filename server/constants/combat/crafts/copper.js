import { ITEMS } from '/server/constants/items/index.js'; 

export const COPPER_CRAFTS = {
  copper_dagger: {
    produces: 'copper_dagger',
    name: 'copper dagger',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'copper_dagger',
    timeToCraft: 60, // 60
    xp: 40,
    maxToCraft: 1,
    requiredCraftingLevel: 2,
    required: [{
      type: 'item',
      itemId: 'stone_furnace',
      icon: ITEMS['stone_furnace'].icon,
      name: ITEMS['stone_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'pine_log',
      icon: ITEMS['pine_log'].icon,
      name: ITEMS['pine_log'].name,
      amount: 3,
      consumes: true
    }, {
      type: 'item',
      itemId: 'copper_bar',
      icon: ITEMS['copper_bar'].icon,
      name: ITEMS['copper_bar'].name,
      amount: 3,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 2
    }]
  },

  copper_spear: {
    produces: 'copper_spear',
    name: 'copper spear',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'copper_spear',
    timeToCraft: 120, // 60
    xp: 80,
    maxToCraft: 1,
    requiredCraftingLevel: 3,
    required: [{
      type: 'item',
      itemId: 'stone_furnace',
      icon: ITEMS['stone_furnace'].icon,
      name: ITEMS['stone_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'pine_log',
      icon: ITEMS['pine_log'].icon,
      name: ITEMS['pine_log'].name,
      amount: 20,
      consumes: true
    }, {
      type: 'item',
      itemId: 'copper_bar',
      icon: ITEMS['copper_bar'].icon,
      name: ITEMS['copper_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 3
    }]
  },

  copper_short_sword: {
    produces: 'copper_short_sword',
    name: 'copper short sword',
    category: 'combat',
    recipeFor: 'crafting',
    id: 'copper_short_sword',
    timeToCraft: 120, // 60
    xp: 80,
    maxToCraft: 1,
    requiredCraftingLevel: 3,
    required: [{
      type: 'item',
      itemId: 'stone_furnace',
      icon: ITEMS['stone_furnace'].icon,
      name: ITEMS['stone_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'pine_log',
      icon: ITEMS['pine_log'].icon,
      name: ITEMS['pine_log'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'item',
      itemId: 'copper_bar',
      icon: ITEMS['copper_bar'].icon,
      name: ITEMS['copper_bar'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 3
    }]
  },

  copper_long_sword: {
    produces: 'copper_long_sword',
    name: 'copper long sword',
    category: 'combat',
    recipeFor: 'crafting',
    id: 'copper_long_sword',
    timeToCraft: 120, // 60
    xp: 80,
    maxToCraft: 1,
    requiredCraftingLevel: 3,
    required: [{
      type: 'item',
      itemId: 'stone_furnace',
      icon: ITEMS['stone_furnace'].icon,
      name: ITEMS['stone_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'pine_log',
      icon: ITEMS['pine_log'].icon,
      name: ITEMS['pine_log'].name,
      amount: 15,
      consumes: true
    }, {
      type: 'item',
      itemId: 'copper_bar',
      icon: ITEMS['copper_bar'].icon,
      name: ITEMS['copper_bar'].name,
      amount: 25,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 3
    }]
  },

  copper_battle_axe: {
    recipeFor: 'crafting',
    produces: 'copper_battle_axe',
    name: 'copper battle axe',
    category: 'combat',
    id: 'copper_battle_axe',
    timeToCraft: 120, // 60
    xp: 80,
    maxToCraft: 1,
    requiredCraftingLevel: 3,
    required: [{
      type: 'item',
      itemId: 'stone_furnace',
      icon: ITEMS['stone_furnace'].icon,
      name: ITEMS['stone_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'pine_log',
      icon: ITEMS['pine_log'].icon,
      name: ITEMS['pine_log'].name,
      amount: 50,
      consumes: true
    }, {
      type: 'item',
      itemId: 'copper_bar',
      icon: ITEMS['copper_bar'].icon,
      name: ITEMS['copper_bar'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 3
    }]
  },

  copper_helmet: {
    recipeFor: 'crafting',
    produces: 'copper_helmet',
    name: 'copper helmet',
    category: 'combat',
    id: 'copper_helmet',
    timeToCraft: 120, // 60
    xp: 60,
    maxToCraft: 1,
    requiredCraftingLevel: 3,
    required: [{
      type: 'item',
      itemId: 'stone_furnace',
      icon: ITEMS['stone_furnace'].icon,
      name: ITEMS['stone_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'ore_coal',
      icon: ITEMS['ore_coal'].icon,
      name: ITEMS['ore_coal'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'item',
      itemId: 'pine_log',
      icon: ITEMS['pine_log'].icon,
      name: ITEMS['pine_log'].name,
      amount: 25,
      consumes: true
    }, {
      type: 'item',
      itemId: 'copper_bar',
      icon: ITEMS['copper_bar'].icon,
      name: ITEMS['copper_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 3
    }]
  },

  copper_chest_plate: {
    recipeFor: 'crafting',
    produces: 'copper_chest_plate',
    name: 'copper chest plate',
    category: 'combat',
    id: 'copper_chest_plate',
    timeToCraft: 120, // 60
    xp: 60,
    maxToCraft: 1,
    requiredCraftingLevel: 3,
    required: [{
      type: 'item',
      itemId: 'stone_furnace',
      icon: ITEMS['stone_furnace'].icon,
      name: ITEMS['stone_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'ore_coal',
      icon: ITEMS['ore_coal'].icon,
      name: ITEMS['ore_coal'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'item',
      itemId: 'pine_log',
      icon: ITEMS['pine_log'].icon,
      name: ITEMS['pine_log'].name,
      amount: 25,
      consumes: true
    }, {
      type: 'item',
      itemId: 'copper_bar',
      icon: ITEMS['copper_bar'].icon,
      name: ITEMS['copper_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 3
    }]
  },

  copper_plate_legs: {
    recipeFor: 'crafting',
    produces: 'copper_plate_legs',
    name: 'copper plate legs',
    category: 'combat',
    id: 'copper_plate_legs',
    timeToCraft: 120, // 60
    xp: 60,
    maxToCraft: 1,
    requiredCraftingLevel: 3,
    required: [{
      type: 'item',
      itemId: 'stone_furnace',
      icon: ITEMS['stone_furnace'].icon,
      name: ITEMS['stone_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'ore_coal',
      icon: ITEMS['ore_coal'].icon,
      name: ITEMS['ore_coal'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'item',
      itemId: 'pine_log',
      icon: ITEMS['pine_log'].icon,
      name: ITEMS['pine_log'].name,
      amount: 25,
      consumes: true
    }, {
      type: 'item',
      itemId: 'copper_bar',
      icon: ITEMS['copper_bar'].icon,
      name: ITEMS['copper_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 3
    }]
  },

  copper_shield: {
    recipeFor: 'crafting',
    produces: 'copper_shield',
    name: 'copper shield',
    category: 'combat',
    id: 'copper_shield',
    timeToCraft: 120, // 60
    xp: 60,
    maxToCraft: 1,
    requiredCraftingLevel: 3,
    required: [{
      type: 'item',
      itemId: 'stone_furnace',
      icon: ITEMS['stone_furnace'].icon,
      name: ITEMS['stone_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'ore_coal',
      icon: ITEMS['ore_coal'].icon,
      name: ITEMS['ore_coal'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'item',
      itemId: 'pine_log',
      icon: ITEMS['pine_log'].icon,
      name: ITEMS['pine_log'].name,
      amount: 50,
      consumes: true
    }, {
      type: 'item',
      itemId: 'copper_bar',
      icon: ITEMS['copper_bar'].icon,
      name: ITEMS['copper_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 3
    }]
  }
}
