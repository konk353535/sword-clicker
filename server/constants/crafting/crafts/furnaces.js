import { ITEMS } from '/server/constants/items/index.js'; 

export const FURNACE_CRAFTS = {
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
    xp: 35, // Xp earned once crafted
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
    xp: 50, // Xp earned once crafted
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
    xp: 70, // Xp earned once crafted
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
    xp: 80,
    maxToCraft: 1
  },

  mithril_furnace: {
    produces: 'mithril_furnace',
    recipeFor: 'crafting',
    name: 'mithril furnace',
    id: 'mithril_furnace',
    category: 'crafting',
    requiredCraftingLevel: 16,
    required: [{
      type: 'item',
      itemId: 'mithril_bar',
      icon: ITEMS['mithril_bar'].icon,
      name: ITEMS['mithril_bar'].name,
      amount: 5,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 16
    }],
    timeToCraft: 15 * 60,
    xp: 100,
    maxToCraft: 1
  },

  adamantium_furnace: {
    produces: 'adamantium_furnace',
    recipeFor: 'crafting',
    name: 'adamantium furnace',
    id: 'adamantium_furnace',
    category: 'crafting',
    requiredCraftingLevel: 20,
    required: [{
      type: 'item',
      itemId: 'adamantium_bar',
      icon: ITEMS['adamantium_bar'].icon,
      name: ITEMS['adamantium_bar'].name,
      amount: 5,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 20
    }],
    timeToCraft: 20 * 60,
    xp: 150,
    maxToCraft: 1
  },

  orichalcum_furnace: {
    produces: 'orichalcum_furnace',
    recipeFor: 'crafting',
    name: 'orichalcum furnace',
    id: 'orichalcum_furnace',
    category: 'crafting',
    requiredCraftingLevel: 25,
    required: [{
      type: 'item',
      itemId: 'orichalcum_bar',
      icon: ITEMS['orichalcum_bar'].icon,
      name: ITEMS['orichalcum_bar'].name,
      amount: 5,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 25
    }],
    timeToCraft: 25 * 60,
    xp: 200,
    maxToCraft: 1
  },

  cobalt_furnace: {
    produces: 'cobalt_furnace',
    recipeFor: 'crafting',
    name: 'cobalt furnace',
    id: 'cobalt_furnace',
    category: 'crafting',
    requiredCraftingLevel: 30,
    required: [{
      type: 'item',
      itemId: 'cobalt_bar',
      icon: ITEMS['cobalt_bar'].icon,
      name: ITEMS['cobalt_bar'].name,
      amount: 5,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 30
    }],
    timeToCraft: 30 * 60,
    xp: 250,
    maxToCraft: 1
  },

  fairy_steel_furnace: {
    produces: 'fairy_steel_furnace',
    recipeFor: 'crafting',
    name: 'fairy steel furnace',
    id: 'fairy_steel_furnace',
    category: 'crafting',
    requiredCraftingLevel: 35,
    required: [{
      type: 'item',
      itemId: 'fairy_steel_bar',
      icon: ITEMS['fairy_steel_bar'].icon,
      name: ITEMS['fairy_steel_bar'].name,
      amount: 5,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 35
    }],
    timeToCraft: 35 * 60,
    xp: 300,
    maxToCraft: 1
  },

  cursed_furnace: {
    produces: 'cursed_furnace',
    recipeFor: 'crafting',
    name: 'cursed furnace',
    id: 'cursed_furnace',
    category: 'crafting',
    requiredCraftingLevel: 40,
    required: [{
      type: 'item',
      itemId: 'cursed_bar',
      icon: ITEMS['cursed_bar'].icon,
      name: ITEMS['cursed_bar'].name,
      amount: 5,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 40
    }],
    timeToCraft: 40 * 60,
    xp: 350,
    maxToCraft: 1
  }
}
