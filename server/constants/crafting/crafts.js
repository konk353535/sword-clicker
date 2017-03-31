import { ITEMS } from '/server/constants/items/index.js'; 

export const CRAFTING_CRAFTS = {
  stone_furnace: {
    produces: 'stone_furnace',
    recipeFor: 'crafting',
    name: 'stone furnace',
    category: 'crafting',
    id: 'stone_furnace',
    requiredCraftingLevel: 1,
    required: [{
      type: 'item',
      itemId: 'ore_stone',
      icon: ITEMS['ore_stone'].icon,
      name: ITEMS['ore_stone'].name,
      amount: 20,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 1
    }],
    timeToCraft: 60, // Time to craft item in seconds
    xp: 20, // Xp earned once crafted
    maxToCraft: 1 // Maximum number of this that can be crafted together
  },

  copper_furnace: {
    produces: 'copper_furnace',
    recipeFor: 'crafting',
    name: 'copper furnace',
    id: 'copper_furnace',
    category: 'crafting',
    requiredCraftingLevel: 4,
    required: [{
      type: 'item',
      itemId: 'copper_bar',
      icon: ITEMS['copper_bar'].icon,
      name: ITEMS['copper_bar'].name,
      amount: 15,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 4
    }],
    timeToCraft: 120, // Time to craft item in seconds
    xp: 50, // Xp earned once crafted
    maxToCraft: 1 // Maximum number of this that can be crafted together
  },

  copper_bar: {
    produces: 'copper_bar',
    recipeFor: 'crafting',
    name: 'copper bar',
    category: 'crafting',
    id: 'copper_bar',
    timeToCraft: 3,
    xp: 3,
    maxToCraft: 100,
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
      itemId: 'ore_coal',
      icon: ITEMS['ore_coal'].icon,
      name: ITEMS['ore_coal'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'item',
      itemId: 'ore_copper',
      icon: ITEMS['ore_copper'].icon,
      name: ITEMS['ore_copper'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 2
    }]
  },

  iron_bar: {
    produces: 'iron_bar',
    recipeFor: 'crafting',
    name: 'iron bar',
    id: 'iron_bar',
    category: 'crafting',
    timeToCraft: 3,
    xp: 21,
    maxToCraft: 100,
    requiredCraftingLevel: 5,
    required: [{
      type: 'item',
      itemId: 'copper_furnace',
      icon: ITEMS['copper_furnace'].icon,
      name: ITEMS['copper_furnace'].name,
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
      itemId: 'ore_iron',
      icon: ITEMS['ore_iron'].icon,
      name: ITEMS['ore_iron'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 5
    }]
  }
}
