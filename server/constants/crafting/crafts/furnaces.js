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

  tin_furnace: {
    produces: 'tin_furnace',
    recipeFor: 'crafting',
    name: 'tin furnace',
    id: 'tin_furnace',
    category: 'crafting',
    requiredCraftingLevel: 9,
    required: [{
      type: 'item',
      itemId: 'tin_bar',
      icon: ITEMS['tin_bar'].icon,
      name: ITEMS['tin_bar'].name,
      amount: 5,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 9
    }],
    timeToCraft: 120, // Time to craft item in seconds
    xp: 35, // Xp earned once crafted
    maxToCraft: 1 // Maximum number of this that can be crafted together
  },

  bronze_furnace: {
    produces: 'bronze_furnace',
    recipeFor: 'crafting',
    name: 'bronze furnace',
    id: 'bronze_furnace',
    category: 'crafting',
    requiredCraftingLevel: 14,
    required: [{
      type: 'item',
      itemId: 'bronze_bar',
      icon: ITEMS['bronze_bar'].icon,
      name: ITEMS['bronze_bar'].name,
      amount: 5,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 14
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
    requiredCraftingLevel: 19,
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
      level: 19
    }],
    timeToCraft: 120, // Time to craft item in seconds
    xp: 50, // Xp earned once crafted
    maxToCraft: 1 // Maximum number of this that can be crafted together
  },

  silver_furnace: {
    produces: 'silver_furnace',
    recipeFor: 'crafting',
    name: 'silver furnace',
    id: 'silver_furnace',
    category: 'crafting',
    requiredCraftingLevel: 24,
    required: [{
      type: 'item',
      itemId: 'silver_bar',
      icon: ITEMS['silver_bar'].icon,
      name: ITEMS['silver_bar'].name,
      amount: 5,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 24
    }],
    timeToCraft: 120, // Time to craft item in seconds
    xp: 50, // Xp earned once crafted
    maxToCraft: 1 // Maximum number of this that can be crafted together
  },

  gold_furnace: {
    produces: 'gold_furnace',
    recipeFor: 'crafting',
    name: 'gold furnace',
    id: 'gold_furnace',
    category: 'crafting',
    requiredCraftingLevel: 29,
    required: [{
      type: 'item',
      itemId: 'gold_bar',
      icon: ITEMS['gold_bar'].icon,
      name: ITEMS['gold_bar'].name,
      amount: 5,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 29
    }],
    timeToCraft: 120, // Time to craft item in seconds
    xp: 50, // Xp earned once crafted
    maxToCraft: 1 // Maximum number of this that can be crafted together
  },

  carbon_furnace: {
    produces: 'carbon_furnace',
    recipeFor: 'crafting',
    name: 'carbon furnace',
    id: 'carbon_furnace',
    category: 'crafting',
    requiredCraftingLevel: 34,
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
      level: 34
    }],
    timeToCraft: 120,
    xp: 80,
    maxToCraft: 1
  },

  steel_furnace: {
    produces: 'steel_furnace',
    recipeFor: 'crafting',
    name: 'steel furnace',
    id: 'steel_furnace',
    category: 'crafting',
    requiredCraftingLevel: 39,
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
      level: 39
    }],
    timeToCraft: 120, // Time to craft item in seconds
    xp: 70, // Xp earned once crafted
    maxToCraft: 1 // Maximum number of this that can be crafted together
  },

  platinum_furnace: {
    produces: 'platinum_furnace',
    recipeFor: 'crafting',
    name: 'platinum furnace',
    id: 'platinum_furnace',
    category: 'crafting',
    requiredCraftingLevel: 44,
    required: [{
      type: 'item',
      itemId: 'platinum_bar',
      icon: ITEMS['platinum_bar'].icon,
      name: ITEMS['platinum_bar'].name,
      amount: 5,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 44
    }],
    timeToCraft: 120, // Time to craft item in seconds
    xp: 70, // Xp earned once crafted
    maxToCraft: 1 // Maximum number of this that can be crafted together
  },

  titanium_furnace: {
    produces: 'titanium_furnace',
    recipeFor: 'crafting',
    name: 'titanium furnace',
    id: 'titanium_furnace',
    category: 'crafting',
    requiredCraftingLevel: 49,
    required: [{
      type: 'item',
      itemId: 'titanium_bar',
      icon: ITEMS['titanium_bar'].icon,
      name: ITEMS['titanium_bar'].name,
      amount: 5,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 49
    }],
    timeToCraft: 120, // Time to craft item in seconds
    xp: 70, // Xp earned once crafted
    maxToCraft: 1 // Maximum number of this that can be crafted together
  },

  tungsten_furnace: {
    produces: 'tungsten_furnace',
    recipeFor: 'crafting',
    name: 'tungsten furnace',
    id: 'tungsten_furnace',
    category: 'crafting',
    requiredCraftingLevel: 54,
    required: [{
      type: 'item',
      itemId: 'tungsten_bar',
      icon: ITEMS['tungsten_bar'].icon,
      name: ITEMS['tungsten_bar'].name,
      amount: 5,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 54
    }],
    timeToCraft: 120, // Time to craft item in seconds
    xp: 70, // Xp earned once crafted
    maxToCraft: 1 // Maximum number of this that can be crafted together
  },

  obsidian_furnace: {
    produces: 'obsidian_furnace',
    recipeFor: 'crafting',
    name: 'obsidian furnace',
    id: 'obsidian_furnace',
    category: 'crafting',
    requiredCraftingLevel: 59,
    required: [{
      type: 'item',
      itemId: 'obsidian_bar',
      icon: ITEMS['obsidian_bar'].icon,
      name: ITEMS['obsidian_bar'].name,
      amount: 5,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 59
    }],
    timeToCraft: 120, // Time to craft item in seconds
    xp: 70, // Xp earned once crafted
    maxToCraft: 1 // Maximum number of this that can be crafted together
  },

  cobalt_furnace: {
    produces: 'cobalt_furnace',
    recipeFor: 'crafting',
    name: 'cobalt furnace',
    id: 'cobalt_furnace',
    category: 'crafting',
    requiredCraftingLevel: 64,
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
      level: 64
    }],
    timeToCraft: 30 * 60,
    xp: 250,
    maxToCraft: 1
  },

  mithril_furnace: {
    produces: 'mithril_furnace',
    recipeFor: 'crafting',
    name: 'mithril furnace',
    id: 'mithril_furnace',
    category: 'crafting',
    requiredCraftingLevel: 69,
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
      level: 69
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
    requiredCraftingLevel: 74,
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
      level: 74
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
    requiredCraftingLevel: 79,
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
      level: 79
    }],
    timeToCraft: 25 * 60,
    xp: 200,
    maxToCraft: 1
  },

  meteorite_furnace: {
    produces: 'meteorite_furnace',
    recipeFor: 'crafting',
    name: 'meteorite furnace',
    id: 'meteorite_furnace',
    category: 'crafting',
    requiredCraftingLevel: 84,
    required: [{
      type: 'item',
      itemId: 'meteorite_bar',
      icon: ITEMS['meteorite_bar'].icon,
      name: ITEMS['meteorite_bar'].name,
      amount: 5,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 84
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
    requiredCraftingLevel: 89,
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
      level: 89
    }],
    timeToCraft: 35 * 60,
    xp: 300,
    maxToCraft: 1
  },

  elven_furnace: {
    produces: 'elven_furnace',
    recipeFor: 'crafting',
    name: 'elven furnace',
    id: 'elven_furnace',
    category: 'crafting',
    requiredCraftingLevel: 94,
    required: [{
      type: 'item',
      itemId: 'elven_bar',
      icon: ITEMS['elven_bar'].icon,
      name: ITEMS['elven_bar'].name,
      amount: 5,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 94
    }],
    timeToCraft: 30 * 60,
    xp: 250,
    maxToCraft: 1
  },

  cursed_furnace: {
    produces: 'cursed_furnace',
    recipeFor: 'crafting',
    name: 'cursed furnace',
    id: 'cursed_furnace',
    category: 'crafting',
    requiredCraftingLevel: 99,
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
      level: 99
    }],
    timeToCraft: 40 * 60,
    xp: 350,
    maxToCraft: 1
  }
}
