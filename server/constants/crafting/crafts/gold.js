import { ITEMS } from '/server/constants/items/index.js'; 

export const GOLD_CRAFTS = {
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
      amount: 3,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 1
    }],
    timeToCraft: 60,
    xp: 1,
    maxToCraft: 1
  },

  copper_sculpture: {
    produces: 'copper_sculpture',
    recipeFor: 'crafting',
    name: 'copper sculpture',
    category: 'crafting',
    id: 'copper_sculpture',
    requiredCraftingLevel: 6,
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
      level: 6
    }],
    timeToCraft: 60,
    xp: 1,
    maxToCraft: 100
  },

  polished_tin: {
    produces: 'polished_tin',
    recipeFor: 'crafting',
    name: 'polished tin',
    category: 'crafting',
    id: 'polished_tin',
    requiredCraftingLevel: 11,
    required: [{
      type: 'item',
      itemId: 'ore_tin',
      icon: ITEMS['ore_tin'].icon,
      name: ITEMS['ore_tin'].name,
      amount: 3,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 11
    }],
    timeToCraft: 60,
    xp: 1,
    maxToCraft: 1
  },

  bronze_sculpture: {
    produces: 'bronze_sculpture',
    recipeFor: 'crafting',
    name: 'bronze sculpture',
    category: 'crafting',
    id: 'bronze_sculpture',
    requiredCraftingLevel: 16,
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
      level: 16
    }],
    timeToCraft: 60,
    xp: 1,
    maxToCraft: 100
  },

  polished_iron: {
    produces: 'polished_iron',
    recipeFor: 'crafting',
    name: 'polished iron',
    category: 'crafting',
    id: 'polished_iron',
    requiredCraftingLevel: 21,
    required: [{
      type: 'item',
      itemId: 'ore_iron',
      icon: ITEMS['ore_iron'].icon,
      name: ITEMS['ore_iron'].name,
      amount: 3,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 21
    }],
    timeToCraft: 60,
    xp: 1,
    maxToCraft: 1
  },

  silver_sculpture: {
    produces: 'silver_sculpture',
    recipeFor: 'crafting',
    name: 'silver sculpture',
    category: 'crafting',
    id: 'silver_sculpture',
    requiredCraftingLevel: 26,
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
      level: 26
    }],
    timeToCraft: 60,
    xp: 1,
    maxToCraft: 100
  },

  polished_gold: {
    produces: 'polished_gold',
    recipeFor: 'crafting',
    name: 'polished gold',
    category: 'crafting',
    id: 'polished_gold',
    requiredCraftingLevel: 31,
    required: [{
      type: 'item',
      itemId: 'ore_gold',
      icon: ITEMS['ore_gold'].icon,
      name: ITEMS['ore_gold'].name,
      amount: 3,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 31
    }],
    timeToCraft: 60,
    xp: 1,
    maxToCraft: 1
  },

  carbon_sculpture: {
    produces: 'carbon_sculpture',
    recipeFor: 'crafting',
    name: 'carbon sculpture',
    category: 'crafting',
    id: 'carbon_sculpture',
    requiredCraftingLevel: 36,
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
      level: 36
    }],
    timeToCraft: 60,
    xp: 1,
    maxToCraft: 100
  },

  polished_steel: {
    produces: 'polished_steel',
    recipeFor: 'crafting',
    name: 'polished steel',
    category: 'crafting',
    id: 'polished_steel',
    requiredCraftingLevel: 41,
    required: [{
      type: 'item',
      itemId: 'ore_steel',
      icon: ITEMS['ore_steel'].icon,
      name: ITEMS['ore_steel'].name,
      amount: 3,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 41
    }],
    timeToCraft: 60,
    xp: 1,
    maxToCraft: 1
  },

  platinum_sculpture: {
    produces: 'platinum_sculpture',
    recipeFor: 'crafting',
    name: 'platinum sculpture',
    category: 'crafting',
    id: 'platinum_sculpture',
    requiredCraftingLevel: 46,
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
      level: 46
    }],
    timeToCraft: 60,
    xp: 1,
    maxToCraft: 100
  },

  polished_titanium: {
    produces: 'polished_titanium',
    recipeFor: 'crafting',
    name: 'polished titanium',
    category: 'crafting',
    id: 'polished_titanium',
    requiredCraftingLevel: 51,
    required: [{
      type: 'item',
      itemId: 'ore_titanium',
      icon: ITEMS['ore_titanium'].icon,
      name: ITEMS['ore_titanium'].name,
      amount: 3,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 51
    }],
    timeToCraft: 60,
    xp: 1,
    maxToCraft: 1
  },

  tungsten_sculpture: {
    produces: 'tungsten_sculpture',
    recipeFor: 'crafting',
    name: 'tungsten sculpture',
    category: 'crafting',
    id: 'tungsten_sculpture',
    requiredCraftingLevel: 56,
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
      level: 56
    }],
    timeToCraft: 60,
    xp: 1,
    maxToCraft: 100
  },

  polished_obsidian: {
    produces: 'polished_obsidian',
    recipeFor: 'crafting',
    name: 'polished obsidian',
    category: 'crafting',
    id: 'polished_obsidian',
    requiredCraftingLevel: 61,
    required: [{
      type: 'item',
      itemId: 'ore_obsidian',
      icon: ITEMS['ore_obsidian'].icon,
      name: ITEMS['ore_obsidian'].name,
      amount: 3,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 61
    }],
    timeToCraft: 60,
    xp: 1,
    maxToCraft: 1
  },

  cobalt_sculpture: {
    produces: 'cobalt_sculpture',
    recipeFor: 'crafting',
    name: 'cobalt sculpture',
    category: 'crafting',
    id: 'cobalt_sculpture',
    requiredCraftingLevel: 66,
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
      level: 66
    }],
    timeToCraft: 60,
    xp: 1,
    maxToCraft: 100
  },

  polished_mithril: {
    produces: 'polished_mithril',
    recipeFor: 'crafting',
    name: 'polished mithril',
    category: 'crafting',
    id: 'polished_mithril',
    requiredCraftingLevel: 71,
    required: [{
      type: 'item',
      itemId: 'ore_mithril',
      icon: ITEMS['ore_mithril'].icon,
      name: ITEMS['ore_mithril'].name,
      amount: 3,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 71
    }],
    timeToCraft: 60,
    xp: 1,
    maxToCraft: 1
  },

  adamantium_sculpture: {
    produces: 'adamantium_sculpture',
    recipeFor: 'crafting',
    name: 'adamantium sculpture',
    category: 'crafting',
    id: 'adamantium_sculpture',
    requiredCraftingLevel: 76,
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
      level: 76
    }],
    timeToCraft: 60,
    xp: 1,
    maxToCraft: 100
  },

  polished_orichalcum: {
    produces: 'polished_orichalcum',
    recipeFor: 'crafting',
    name: 'polished orichalcum',
    category: 'crafting',
    id: 'polished_orichalcum',
    requiredCraftingLevel: 81,
    required: [{
      type: 'item',
      itemId: 'ore_orichalcum',
      icon: ITEMS['ore_orichalcum'].icon,
      name: ITEMS['ore_orichalcum'].name,
      amount: 3,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 81
    }],
    timeToCraft: 60,
    xp: 1,
    maxToCraft: 1
  },

  meteorite_sculpture: {
    produces: 'meteorite_sculpture',
    recipeFor: 'crafting',
    name: 'meteorite sculpture',
    category: 'crafting',
    id: 'meteorite_sculpture',
    requiredCraftingLevel: 86,
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
      level: 86
    }],
    timeToCraft: 60,
    xp: 1,
    maxToCraft: 100
  },

  polished_fairy_steel: {
    produces: 'polished_fairy_steel',
    recipeFor: 'crafting',
    name: 'polished fairy steel',
    category: 'crafting',
    id: 'polished_fairy_steel',
    requiredCraftingLevel: 91,
    required: [{
      type: 'item',
      itemId: 'ore_fairy_steel',
      icon: ITEMS['ore_fairy_steel'].icon,
      name: ITEMS['ore_fairy_steel'].name,
      amount: 3,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 91
    }],
    timeToCraft: 60,
    xp: 1,
    maxToCraft: 1
  },

  elven_steel_sculpture: {
    produces: 'elven_steel_sculpture',
    recipeFor: 'crafting',
    name: 'elven steel sculpture',
    category: 'crafting',
    id: 'elven_steel_sculpture',
    requiredCraftingLevel: 96,
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
      level: 96
    }],
    timeToCraft: 60,
    xp: 1,
    maxToCraft: 100
  },

  polished_cursed: {
    produces: 'polished_cursed',
    recipeFor: 'crafting',
    name: 'polished cursed',
    category: 'crafting',
    id: 'polished_cursed',
    requiredCraftingLevel: 101,
    required: [{
      type: 'item',
      itemId: 'ore_cursed',
      icon: ITEMS['ore_cursed'].icon,
      name: ITEMS['ore_cursed'].name,
      amount: 3,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 101
    }],
    timeToCraft: 60,
    xp: 1,
    maxToCraft: 1
  },

}
