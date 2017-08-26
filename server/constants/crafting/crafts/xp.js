import { ITEMS } from '/server/constants/items/index.js'; 

export const XP_CRAFTS = {
  stone_pylon: {
    produces: 'stone_pylon',
    recipeFor: 'crafting',
    name: 'stone pylon',
    category: 'crafting',
    id: 'stone_pylon',
    requiredCraftingLevel: 2,
    required: [{
      type: 'item',
      itemId: 'ore_stone',
      icon: ITEMS['ore_stone'].icon,
      name: ITEMS['ore_stone'].name,
      amount: 10,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 2
    }],
    timeToCraft: 120,
    xp: 100,
    maxToCraft: 5
  },

  stone_wall: {
    produces: 'stone_wall',
    recipeFor: 'crafting',
    name: 'stone wall',
    category: 'crafting',
    id: 'stone_wall',
    requiredCraftingLevel: 5,
    required: [{
      type: 'item',
      itemId: 'ore_stone',
      icon: ITEMS['ore_stone'].icon,
      name: ITEMS['ore_stone'].name,
      amount: 3,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 5
    }],
    timeToCraft: 60,
    xp: 20,
    maxToCraft: 100
  },

  copper_wall: {
    produces: 'copper_wall',
    recipeFor: 'crafting',
    name: 'copper wall',
    category: 'crafting',
    id: 'copper_wall',
    requiredCraftingLevel: 7,
    required: [{
      type: 'item',
      itemId: 'ore_copper',
      icon: ITEMS['ore_copper'].icon,
      name: ITEMS['ore_copper'].name,
      amount: 3,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 7
    }],
    timeToCraft: 60,
    xp: 30,
    maxToCraft: 100
  },

  tin_pylon: {
    produces: 'tin_pylon',
    recipeFor: 'crafting',
    name: 'tin pylon',
    category: 'crafting',
    id: 'tin_pylon',
    requiredCraftingLevel: 12,
    required: [{
      type: 'item',
      itemId: 'ore_tin',
      icon: ITEMS['ore_tin'].icon,
      name: ITEMS['ore_tin'].name,
      amount: 10,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 12
    }],
    timeToCraft: 120,
    xp: 150,
    maxToCraft: 5
  },

  bronze_wall: {
    produces: 'bronze_wall',
    recipeFor: 'crafting',
    name: 'bronze wall',
    category: 'crafting',
    id: 'bronze_wall',
    requiredCraftingLevel: 17,
    required: [{
      type: 'item',
      itemId: 'ore_bronze',
      icon: ITEMS['ore_bronze'].icon,
      name: ITEMS['ore_bronze'].name,
      amount: 3,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 17
    }],
    timeToCraft: 60,
    xp: 45,
    maxToCraft: 100
  },

  iron_pylon: {
    produces: 'iron_pylon',
    recipeFor: 'crafting',
    name: 'iron pylon',
    category: 'crafting',
    id: 'iron_pylon',
    requiredCraftingLevel: 22,
    required: [{
      type: 'item',
      itemId: 'ore_iron',
      icon: ITEMS['ore_iron'].icon,
      name: ITEMS['ore_iron'].name,
      amount: 10,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 22
    }],
    timeToCraft: 120,
    xp: 200,
    maxToCraft: 5
  },

  silver_wall: {
    produces: 'silver_wall',
    recipeFor: 'crafting',
    name: 'silver wall',
    category: 'crafting',
    id: 'silver_wall',
    requiredCraftingLevel: 27,
    required: [{
      type: 'item',
      itemId: 'ore_silver',
      icon: ITEMS['ore_silver'].icon,
      name: ITEMS['ore_silver'].name,
      amount: 3,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 27
    }],
    timeToCraft: 60,
    xp: 70,
    maxToCraft: 100
  },

  gold_pylon: {
    produces: 'gold_pylon',
    recipeFor: 'crafting',
    name: 'gold pylon',
    category: 'crafting',
    id: 'gold_pylon',
    requiredCraftingLevel: 32,
    required: [{
      type: 'item',
      itemId: 'ore_gold',
      icon: ITEMS['ore_gold'].icon,
      name: ITEMS['ore_gold'].name,
      amount: 10,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 32
    }],
    timeToCraft: 120,
    xp: 260,
    maxToCraft: 5
  },

  carbon_wall: {
    produces: 'carbon_wall',
    recipeFor: 'crafting',
    name: 'carbon wall',
    category: 'crafting',
    id: 'carbon_wall',
    requiredCraftingLevel: 37,
    required: [{
      type: 'item',
      itemId: 'ore_carbon',
      icon: ITEMS['ore_carbon'].icon,
      name: ITEMS['ore_carbon'].name,
      amount: 3,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 37
    }],
    timeToCraft: 60,
    xp: 80,
    maxToCraft: 100
  },

  steel_pylon: {
    produces: 'steel_pylon',
    recipeFor: 'crafting',
    name: 'steel pylon',
    category: 'crafting',
    id: 'steel_pylon',
    requiredCraftingLevel: 42,
    required: [{
      type: 'item',
      itemId: 'ore_steel',
      icon: ITEMS['ore_steel'].icon,
      name: ITEMS['ore_steel'].name,
      amount: 10,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 42
    }],
    timeToCraft: 120,
    xp: 320,
    maxToCraft: 5
  },

  platinum_wall: {
    produces: 'platinum_wall',
    recipeFor: 'crafting',
    name: 'platinum wall',
    category: 'crafting',
    id: 'platinum_wall',
    requiredCraftingLevel: 47,
    required: [{
      type: 'item',
      itemId: 'ore_platinum',
      icon: ITEMS['ore_platinum'].icon,
      name: ITEMS['ore_platinum'].name,
      amount: 3,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 47
    }],
    timeToCraft: 60,
    xp: 100,
    maxToCraft: 100
  },

  titanium_pylon: {
    produces: 'titanium_pylon',
    recipeFor: 'crafting',
    name: 'titanium pylon',
    category: 'crafting',
    id: 'titanium_pylon',
    requiredCraftingLevel: 52,
    required: [{
      type: 'item',
      itemId: 'ore_titanium',
      icon: ITEMS['ore_titanium'].icon,
      name: ITEMS['ore_titanium'].name,
      amount: 10,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 52
    }],
    timeToCraft: 120,
    xp: 400,
    maxToCraft: 5
  },

  tungsten_wall: {
    produces: 'tungsten_wall',
    recipeFor: 'crafting',
    name: 'tungsten wall',
    category: 'crafting',
    id: 'tungsten_wall',
    requiredCraftingLevel: 57,
    required: [{
      type: 'item',
      itemId: 'ore_tungsten',
      icon: ITEMS['ore_tungsten'].icon,
      name: ITEMS['ore_tungsten'].name,
      amount: 3,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 57
    }],
    timeToCraft: 60,
    xp: 120,
    maxToCraft: 100
  },

  obsidian_pylon: {
    produces: 'obsidian_pylon',
    recipeFor: 'crafting',
    name: 'obsidian pylon',
    category: 'crafting',
    id: 'obsidian_pylon',
    requiredCraftingLevel: 62,
    required: [{
      type: 'item',
      itemId: 'ore_obsidian',
      icon: ITEMS['ore_obsidian'].icon,
      name: ITEMS['ore_obsidian'].name,
      amount: 10,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 62
    }],
    timeToCraft: 120,
    xp: 500,
    maxToCraft: 5
  },

  cobalt_wall: {
    produces: 'cobalt_wall',
    recipeFor: 'crafting',
    name: 'cobalt wall',
    category: 'crafting',
    id: 'cobalt_wall',
    requiredCraftingLevel: 67,
    required: [{
      type: 'item',
      itemId: 'ore_cobalt',
      icon: ITEMS['ore_cobalt'].icon,
      name: ITEMS['ore_cobalt'].name,
      amount: 3,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 67
    }],
    timeToCraft: 60,
    xp: 150,
    maxToCraft: 100
  },

  mithril_pylon: {
    produces: 'mithril_pylon',
    recipeFor: 'crafting',
    name: 'mithril pylon',
    category: 'crafting',
    id: 'mithril_pylon',
    requiredCraftingLevel: 72,
    required: [{
      type: 'item',
      itemId: 'ore_mithril',
      icon: ITEMS['ore_mithril'].icon,
      name: ITEMS['ore_mithril'].name,
      amount: 10,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 72
    }],
    timeToCraft: 120,
    xp: 600,
    maxToCraft: 5
  },

  adamantium_wall: {
    produces: 'adamantium_wall',
    recipeFor: 'crafting',
    name: 'adamantium wall',
    category: 'crafting',
    id: 'adamantium_wall',
    requiredCraftingLevel: 77,
    required: [{
      type: 'item',
      itemId: 'ore_adamantium',
      icon: ITEMS['ore_adamantium'].icon,
      name: ITEMS['ore_adamantium'].name,
      amount: 3,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 77
    }],
    timeToCraft: 60,
    xp: 200,
    maxToCraft: 100
  },

  orichalcum_pylon: {
    produces: 'orichalcum_pylon',
    recipeFor: 'crafting',
    name: 'orichalcum pylon',
    category: 'crafting',
    id: 'orichalcum_pylon',
    requiredCraftingLevel: 82,
    required: [{
      type: 'item',
      itemId: 'ore_orichalcum',
      icon: ITEMS['ore_orichalcum'].icon,
      name: ITEMS['ore_orichalcum'].name,
      amount: 10,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 82
    }],
    timeToCraft: 120,
    xp: 800,
    maxToCraft: 5
  },

  meteorite_wall: {
    produces: 'meteorite_wall',
    recipeFor: 'crafting',
    name: 'meteorite wall',
    category: 'crafting',
    id: 'meteorite_wall',
    requiredCraftingLevel: 87,
    required: [{
      type: 'item',
      itemId: 'ore_meteorite',
      icon: ITEMS['ore_meteorite'].icon,
      name: ITEMS['ore_meteorite'].name,
      amount: 3,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 87
    }],
    timeToCraft: 60,
    xp: 250,
    maxToCraft: 100
  },

  fairy_steel_pylon: {
    produces: 'fairy_steel_pylon',
    recipeFor: 'crafting',
    name: 'fairy steel pylon',
    category: 'crafting',
    id: 'fairy_steel_pylon',
    requiredCraftingLevel: 92,
    required: [{
      type: 'item',
      itemId: 'ore_fairy_steel',
      icon: ITEMS['ore_fairy_steel'].icon,
      name: ITEMS['ore_fairy_steel'].name,
      amount: 10,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 92
    }],
    timeToCraft: 120,
    xp: 1000,
    maxToCraft: 5
  },

  elven_steel_wall: {
    produces: 'elven_steel_wall',
    recipeFor: 'crafting',
    name: 'elven steel wall',
    category: 'crafting',
    id: 'elven_steel_wall',
    requiredCraftingLevel: 97,
    required: [{
      type: 'item',
      itemId: 'ore_elven_steel',
      icon: ITEMS['ore_elven_steel'].icon,
      name: ITEMS['ore_elven_steel'].name,
      amount: 3,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 97
    }],
    timeToCraft: 60,
    xp: 300,
    maxToCraft: 100
  },

  cursed_pylon: {
    produces: 'cursed_pylon',
    recipeFor: 'crafting',
    name: 'cursed pylon',
    category: 'crafting',
    id: 'cursed_pylon',
    requiredCraftingLevel: 102,
    required: [{
      type: 'item',
      itemId: 'ore_cursed',
      icon: ITEMS['ore_cursed'].icon,
      name: ITEMS['ore_cursed'].name,
      amount: 10,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 102
    }],
    timeToCraft: 120,
    xp: 1200,
    maxToCraft: 5
  },
  
}
