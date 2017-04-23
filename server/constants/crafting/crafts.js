import { ITEMS } from '/server/constants/items/index.js'; 

export const CRAFTING_CRAFTS = {

  polished_stone: {
    produces: 'polished_stone',
    recipeFor: 'crafting',
    name: 'polished stone',
    category: 'crafting',
    id: 'polished_stone',
    requiredCraftingLevel: 1,
    required: [{
      type: 'item',
      itemId: 'ore_stone',
      icon: ITEMS['ore_stone'].icon,
      name: ITEMS['ore_stone'].name,
      amount: 1,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 1
    }],
    timeToCraft: 30,
    xp: 1,
    maxToCraft: 1
  },

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
      amount: 5,
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
      amount: 5,
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

  iron_furnace: {
    produces: 'iron_furnace',
    recipeFor: 'crafting',
    name: 'iron furnace',
    id: 'iron_furnace',
    category: 'crafting',
    requiredCraftingLevel: 6,
    required: [{
      type: 'item',
      itemId: 'iron_bar',
      icon: ITEMS['iron_bar'].icon,
      name: ITEMS['iron_bar'].name,
      amount: 5,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 6
    }],
    timeToCraft: 120, // Time to craft item in seconds
    xp: 100, // Xp earned once crafted
    maxToCraft: 1 // Maximum number of this that can be crafted together
  },

  steel_furnace: {
    produces: 'steel_furnace',
    recipeFor: 'crafting',
    name: 'steel furnace',
    id: 'steel_furnace',
    category: 'crafting',
    requiredCraftingLevel: 9,
    required: [{
      type: 'item',
      itemId: 'steel_bar',
      icon: ITEMS['steel_bar'].icon,
      name: ITEMS['steel_bar'].name,
      amount: 5,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 9
    }],
    timeToCraft: 120, // Time to craft item in seconds
    xp: 100, // Xp earned once crafted
    maxToCraft: 1 // Maximum number of this that can be crafted together
  },

  carbon_furnace: {
    produces: 'carbon_furnace',
    recipeFor: 'crafting',
    name: 'carbon furnace',
    id: 'carbon_furnace',
    category: 'crafting',
    requiredCraftingLevel: 13,
    required: [{
      type: 'item',
      itemId: 'carbon_bar',
      icon: ITEMS['carbon_bar'].icon,
      name: ITEMS['carbon_bar'].name,
      amount: 5,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 13
    }],
    timeToCraft: 120,
    xp: 200,
    maxToCraft: 1
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
      amount: 1,
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
    timeToCraft: 6,
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
      amount: 1,
      consumes: true
    }, {
      type: 'item',
      itemId: 'ore_iron',
      icon: ITEMS['ore_iron'].icon,
      name: ITEMS['ore_iron'].name,
      amount: 2,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 5
    }]
  },

  steel_bar: {
    produces: 'steel_bar',
    recipeFor: 'crafting',
    name: 'steel bar',
    id: 'steel_bar',
    category: 'crafting',
    timeToCraft: 10,
    xp: 30,
    maxToCraft: 100,
    requiredCraftingLevel: 8,
    required: [{
      type: 'item',
      itemId: 'iron_furnace',
      icon: ITEMS['iron_furnace'].icon,
      name: ITEMS['iron_furnace'].name,
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
      itemId: 'ore_steel',
      icon: ITEMS['ore_steel'].icon,
      name: ITEMS['ore_steel'].name,
      amount: 2,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 8
    }]
  },

  carbon_bar: {
    produces: 'carbon_bar',
    recipeFor: 'crafting',
    name: 'carbon bar',
    id: 'carbon_bar',
    category: 'crafting',
    timeToCraft: 10,
    xp: 30,
    maxToCraft: 100,
    requiredCraftingLevel: 11,
    required: [{
      type: 'item',
      itemId: 'steel_furnace',
      icon: ITEMS['steel_furnace'].icon,
      name: ITEMS['steel_furnace'].name,
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
      itemId: 'ore_carbon',
      icon: ITEMS['ore_carbon'].icon,
      name: ITEMS['ore_carbon'].name,
      amount: 2,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 11
    }]
  },

  mithril_bar: {
    produces: 'mithril_bar',
    recipeFor: 'crafting',
    name: 'mithril bar',
    id: 'mithril_bar',
    category: 'crafting',
    timeToCraft: 10,
    xp: 60,
    maxToCraft: 150,
    requiredCraftingLevel: 14,
    required: [{
      type: 'item',
      itemId: 'carbon_furnace',
      icon: ITEMS['carbon_furnace'].icon,
      name: ITEMS['carbon_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'ore_mithril',
      icon: ITEMS['ore_mithril'].icon,
      name: ITEMS['ore_mithril'].name,
      amount: 2,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 14
    }]
  }
}
