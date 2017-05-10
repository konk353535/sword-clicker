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

  polished_black_stone: {
    produces: 'polished_black_stone',
    recipeFor: 'crafting',
    name: 'polished black stone',
    category: 'crafting',
    id: 'polished_black_stone',
    requiredCraftingLevel: 5,
    required: [{
      type: 'item',
      itemId: 'ore_stone',
      icon: ITEMS['ore_stone'].icon,
      name: ITEMS['ore_stone'].name,
      amount: 50,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'item',
      itemId: 'ore_coal',
      icon: ITEMS['ore_coal'].icon,
      name: ITEMS['ore_coal'].name,
      amount: 5,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'item',
      itemId: 'ore_copper',
      icon: ITEMS['ore_copper'].icon,
      name: ITEMS['ore_copper'].name,
      amount: 20,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 5
    }],
    timeToCraft: 600,
    xp: 1,
    maxToCraft: 1
  },

  composite_wall: {
    produces: 'composite_wall',
    recipeFor: 'crafting',
    name: 'composite wall',
    category: 'crafting',
    id: 'composite_wall',
    requiredCraftingLevel: 10,
    required: [{
      type: 'item',
      itemId: 'ore_stone',
      icon: ITEMS['ore_stone'].icon,
      name: ITEMS['ore_stone'].name,
      amount: 100,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'item',
      itemId: 'copper_bar',
      icon: ITEMS['copper_bar'].icon,
      name: ITEMS['copper_bar'].name,
      amount: 10,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'item',
      itemId: 'iron_bar',
      icon: ITEMS['iron_bar'].icon,
      name: ITEMS['iron_bar'].name,
      amount: 10,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'item',
      itemId: 'steel_bar',
      icon: ITEMS['steel_bar'].icon,
      name: ITEMS['steel_bar'].name,
      amount: 10,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 10
    }],
    timeToCraft: 60 * 60 * 8,
    xp: 4000,
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
  },

  copper_bar: {
    produces: 'copper_bar',
    recipeFor: 'crafting',
    name: 'copper bar',
    category: 'crafting',
    id: 'copper_bar',
    timeToCraft: 3,
    xp: 2,
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
    xp: 19,
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
    xp: 27,
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
    xp: 27,
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
    xp: 54,
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
  },

  adamantium_bar: {
    produces: 'adamantium_bar',
    recipeFor: 'crafting',
    name: 'adamantium bar',
    id: 'adamantium_bar',
    category: 'crafting',
    timeToCraft: 30,
    xp: 72,
    maxToCraft: 100,
    requiredCraftingLevel: 20,
    required: [{
      type: 'item',
      itemId: 'mithril_furnace',
      icon: ITEMS['mithril_furnace'].icon,
      name: ITEMS['mithril_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'ore_adamantium',
      icon: ITEMS['ore_adamantium'].icon,
      name: ITEMS['ore_adamantium'].name,
      amount: 2,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 20
    }]
  },

  orichalcum_bar: {
    produces: 'orichalcum_bar',
    recipeFor: 'crafting',
    name: 'orichalcum bar',
    id: 'orichalcum_bar',
    category: 'crafting',
    timeToCraft: 40,
    xp: 72,
    maxToCraft: 100,
    requiredCraftingLevel: 25,
    required: [{
      type: 'item',
      itemId: 'adamantium_furnace',
      icon: ITEMS['adamantium_furnace'].icon,
      name: ITEMS['adamantium_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'ore_orichalcum',
      icon: ITEMS['ore_orichalcum'].icon,
      name: ITEMS['ore_orichalcum'].name,
      amount: 2,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 25
    }]
  },

  cobalt_bar: {
    produces: 'cobalt_bar',
    recipeFor: 'crafting',
    name: 'cobalt bar',
    id: 'cobalt_bar',
    category: 'crafting',
    timeToCraft: 50,
    xp: 72,
    maxToCraft: 100,
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
      itemId: 'ore_cobalt',
      icon: ITEMS['ore_cobalt'].icon,
      name: ITEMS['ore_cobalt'].name,
      amount: 2,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 30
    }]
  },

  fairy_steel_bar: {
    produces: 'fairy_steel_bar',
    recipeFor: 'crafting',
    name: 'fairy_steel bar',
    id: 'fairy_steel_bar',
    category: 'crafting',
    timeToCraft: 50,
    xp: 72,
    maxToCraft: 100,
    requiredCraftingLevel: 35,
    required: [{
      type: 'item',
      itemId: 'cobalt_furnace',
      icon: ITEMS['cobalt_furnace'].icon,
      name: ITEMS['cobalt_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'ore_fairy_steel',
      icon: ITEMS['ore_fairy_steel'].icon,
      name: ITEMS['ore_fairy_steel'].name,
      amount: 2,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 35
    }]
  },

  cursed_bar: {
    produces: 'cursed_bar',
    recipeFor: 'crafting',
    name: 'cursed bar',
    id: 'cursed_bar',
    category: 'crafting',
    timeToCraft: 70,
    xp: 72,
    maxToCraft: 100,
    requiredCraftingLevel: 40,
    required: [{
      type: 'item',
      itemId: 'fairy_steel_furnace',
      icon: ITEMS['fairy_steel_furnace'].icon,
      name: ITEMS['fairy_steel_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'ore_cursed',
      icon: ITEMS['ore_cursed'].icon,
      name: ITEMS['ore_cursed'].name,
      amount: 2,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 40
    }]
  }
}
