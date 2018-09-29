import { ITEMS } from '/server/constants/items/index.js'; 

export const AMULET_CRAFTS = {
  stone_amulet: {
    produces: 'stone_amulet',
    name: 'primitive amulet',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'stone_amulet',
    timeToCraft: 40, // 60
    xp: 1,
    tags: ['amulet'],
    maxToCraft: 1,
    requiredCraftingLevel: 3,
    required: [{
      type: 'item',
      itemId: 'ore_stone',
      icon: ITEMS['ore_stone'].icon,
      name: ITEMS['ore_stone'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 3
    }]
  },

  copper_amulet: {
    produces: 'copper_amulet',
    name: 'copper amulet',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'copper_amulet',
    timeToCraft: 40, // 60
    xp: 1,
    tags: ['amulet'],
    maxToCraft: 1,
    requiredCraftingLevel: 10,
    required: [{
      type: 'item',
      itemId: 'ore_copper',
      icon: ITEMS['ore_copper'].icon,
      name: ITEMS['ore_copper'].name,
      amount: 500,
      consumes: true
    }, {
      type: 'item',
      itemId: 'ore_stone',
      icon: ITEMS['ore_stone'].icon,
      name: ITEMS['ore_stone'].name,
      amount: 500,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 10
    }]
  },

  tin_amulet: {
    produces: 'tin_amulet',
    name: 'tin amulet',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'tin_amulet',
    timeToCraft: 40, // 60
    xp: 1,
    tags: ['amulet'],
    maxToCraft: 1,
    requiredCraftingLevel: 15,
    required: [{
      type: 'item',
      itemId: 'ore_tin',
      icon: ITEMS['ore_tin'].icon,
      name: ITEMS['ore_tin'].name,
      amount: 500,
      consumes: true
    }, {
      type: 'item',
      itemId: 'ore_stone',
      icon: ITEMS['ore_stone'].icon,
      name: ITEMS['ore_stone'].name,
      amount: 1000,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 15
    }]
  },

  bronze_amulet: {
    produces: 'bronze_amulet',
    name: 'bronze amulet',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'bronze_amulet',
    timeToCraft: 40, // 60
    xp: 1,
    tags: ['amulet'],
    maxToCraft: 1,
    requiredCraftingLevel: 20,
    required: [{
      type: 'item',
      itemId: 'ore_bronze',
      icon: ITEMS['ore_bronze'].icon,
      name: ITEMS['ore_bronze'].name,
      amount: 500,
      consumes: true
    }, {
      type: 'item',
      itemId: 'ore_stone',
      icon: ITEMS['ore_stone'].icon,
      name: ITEMS['ore_stone'].name,
      amount: 2000,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 20
    }]
  },

  silver_amulet: {
    produces: 'silver_amulet',
    name: 'silver amulet',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'silver_amulet',
    timeToCraft: 40, // 60
    xp: 1,
    tags: ['amulet'],
    maxToCraft: 1,
    requiredCraftingLevel: 25,
    required: [{
      type: 'item',
      itemId: 'ore_silver',
      icon: ITEMS['ore_silver'].icon,
      name: ITEMS['ore_silver'].name,
      amount: 500,
      consumes: true
    }, {
      type: 'item',
      itemId: 'ore_stone',
      icon: ITEMS['ore_stone'].icon,
      name: ITEMS['ore_stone'].name,
      amount: 4000,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 25
    }]
  },

  gold_amulet: {
    produces: 'gold_amulet',
    name: 'gold amulet',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'gold_amulet',
    timeToCraft: 40, // 60
    xp: 1,
    tags: ['amulet'],
    maxToCraft: 1,
    requiredCraftingLevel: 30,
    required: [{
      type: 'item',
      itemId: 'ore_gold',
      icon: ITEMS['ore_gold'].icon,
      name: ITEMS['ore_gold'].name,
      amount: 500,
      consumes: true
    }, {
      type: 'item',
      itemId: 'ore_stone',
      icon: ITEMS['ore_stone'].icon,
      name: ITEMS['ore_stone'].name,
      amount: 6000,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 30
    }]
  },

  carbon_amulet: {
    produces: 'carbon_amulet',
    name: 'carbon amulet',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'carbon_amulet',
    timeToCraft: 40, // 60
    xp: 1,
    tags: ['amulet'],
    maxToCraft: 1,
    requiredCraftingLevel: 35,
    required: [{
      type: 'item',
      itemId: 'ore_carbon',
      icon: ITEMS['ore_carbon'].icon,
      name: ITEMS['ore_carbon'].name,
      amount: 500,
      consumes: true
    }, {
      type: 'item',
      itemId: 'ore_stone',
      icon: ITEMS['ore_stone'].icon,
      name: ITEMS['ore_stone'].name,
      amount: 10000,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 35
    }]
  },

  steel_amulet: {
    produces: 'steel_amulet',
    name: 'steel amulet',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'steel_amulet',
    timeToCraft: 40, // 60
    xp: 1,
    tags: ['amulet'],
    maxToCraft: 1,
    requiredCraftingLevel: 40,
    required: [{
      type: 'item',
      itemId: 'ore_steel',
      icon: ITEMS['ore_steel'].icon,
      name: ITEMS['ore_steel'].name,
      amount: 500,
      consumes: true
    }, {
      type: 'item',
      itemId: 'ore_stone',
      icon: ITEMS['ore_stone'].icon,
      name: ITEMS['ore_stone'].name,
      amount: 10000,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 40
    }]
  },

  platinum_amulet: {
    produces: 'platinum_amulet',
    name: 'platinum amulet',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'platinum_amulet',
    timeToCraft: 40, // 60
    xp: 1,
    tags: ['amulet'],
    maxToCraft: 1,
    requiredCraftingLevel: 45,
    required: [{
      type: 'item',
      itemId: 'ore_platinum',
      icon: ITEMS['ore_platinum'].icon,
      name: ITEMS['ore_platinum'].name,
      amount: 500,
      consumes: true
    }, {
      type: 'item',
      itemId: 'ore_stone',
      icon: ITEMS['ore_stone'].icon,
      name: ITEMS['ore_stone'].name,
      amount: 10000,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 45
    }]
  },

  titanium_amulet: {
    produces: 'titanium_amulet',
    name: 'titanium amulet',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'titanium_amulet',
    timeToCraft: 40, // 60
    xp: 1,
    tags: ['amulet'],
    maxToCraft: 1,
    requiredCraftingLevel: 50,
    required: [{
      type: 'item',
      itemId: 'ore_titanium',
      icon: ITEMS['ore_titanium'].icon,
      name: ITEMS['ore_titanium'].name,
      amount: 500,
      consumes: true
    }, {
      type: 'item',
      itemId: 'ore_stone',
      icon: ITEMS['ore_stone'].icon,
      name: ITEMS['ore_stone'].name,
      amount: 10000,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 50
    }]
  },

  tungsten_amulet: {
    produces: 'tungsten_amulet',
    name: 'tungsten amulet',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'tungsten_amulet',
    timeToCraft: 40, // 60
    xp: 1,
    tags: ['amulet'],
    maxToCraft: 1,
    requiredCraftingLevel: 55,
    required: [{
      type: 'item',
      itemId: 'ore_tungsten',
      icon: ITEMS['ore_tungsten'].icon,
      name: ITEMS['ore_tungsten'].name,
      amount: 500,
      consumes: true
    }, {
      type: 'item',
      itemId: 'ore_stone',
      icon: ITEMS['ore_stone'].icon,
      name: ITEMS['ore_stone'].name,
      amount: 10000,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 55
    }]
  },

  obsidian_amulet: {
    produces: 'obsidian_amulet',
    name: 'obsidian amulet',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'obsidian_amulet',
    timeToCraft: 40, // 60
    xp: 1,
    tags: ['amulet'],
    maxToCraft: 1,
    requiredCraftingLevel: 60,
    required: [{
      type: 'item',
      itemId: 'ore_obsidian',
      icon: ITEMS['ore_obsidian'].icon,
      name: ITEMS['ore_obsidian'].name,
      amount: 500,
      consumes: true
    }, {
      type: 'item',
      itemId: 'ore_stone',
      icon: ITEMS['ore_stone'].icon,
      name: ITEMS['ore_stone'].name,
      amount: 15000,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 60
    }]
  },

  cobalt_amulet: {
    produces: 'cobalt_amulet',
    name: 'cobalt amulet',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'cobalt_amulet',
    timeToCraft: 40, // 60
    xp: 1,
    tags: ['amulet'],
    maxToCraft: 1,
    requiredCraftingLevel: 65,
    required: [{
      type: 'item',
      itemId: 'ore_cobalt',
      icon: ITEMS['ore_cobalt'].icon,
      name: ITEMS['ore_cobalt'].name,
      amount: 500,
      consumes: true
    }, {
      type: 'item',
      itemId: 'ore_stone',
      icon: ITEMS['ore_stone'].icon,
      name: ITEMS['ore_stone'].name,
      amount: 15000,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 65
    }]
  },

  mithril_amulet: {
    produces: 'mithril_amulet',
    name: 'mithril amulet',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'mithril_amulet',
    timeToCraft: 40, // 60
    xp: 1,
    tags: ['amulet'],
    maxToCraft: 1,
    requiredCraftingLevel: 70,
    required: [{
      type: 'item',
      itemId: 'ore_mithril',
      icon: ITEMS['ore_mithril'].icon,
      name: ITEMS['ore_mithril'].name,
      amount: 500,
      consumes: true
    }, {
      type: 'item',
      itemId: 'ore_stone',
      icon: ITEMS['ore_stone'].icon,
      name: ITEMS['ore_stone'].name,
      amount: 15000,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 70
    }]
  },

  adamantium_amulet: {
    produces: 'adamantium_amulet',
    name: 'adamantium amulet',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'adamantium_amulet',
    timeToCraft: 40, // 60
    xp: 1,
    tags: ['amulet'],
    maxToCraft: 1,
    requiredCraftingLevel: 75,
    required: [{
      type: 'item',
      itemId: 'ore_adamantium',
      icon: ITEMS['ore_adamantium'].icon,
      name: ITEMS['ore_adamantium'].name,
      amount: 500,
      consumes: true
    }, {
      type: 'item',
      itemId: 'ore_stone',
      icon: ITEMS['ore_stone'].icon,
      name: ITEMS['ore_stone'].name,
      amount: 15000,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 75
    }]
  },

  orichalcum_amulet: {
    produces: 'orichalcum_amulet',
    name: 'orichalcum amulet',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'orichalcum_amulet',
    timeToCraft: 40, // 60
    xp: 1,
    tags: ['amulet'],
    maxToCraft: 1,
    requiredCraftingLevel: 80,
    required: [{
      type: 'item',
      itemId: 'ore_orichalcum',
      icon: ITEMS['ore_orichalcum'].icon,
      name: ITEMS['ore_orichalcum'].name,
      amount: 500,
      consumes: true
    }, {
      type: 'item',
      itemId: 'ore_stone',
      icon: ITEMS['ore_stone'].icon,
      name: ITEMS['ore_stone'].name,
      amount: 25000,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 80
    }]
  },

  meteorite_amulet: {
    produces: 'meteorite_amulet',
    name: 'meteorite amulet',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'meteorite_amulet',
    timeToCraft: 40, // 60
    xp: 1,
    tags: ['amulet'],
    maxToCraft: 1,
    requiredCraftingLevel: 85,
    required: [{
      type: 'item',
      itemId: 'ore_meteorite',
      icon: ITEMS['ore_meteorite'].icon,
      name: ITEMS['ore_meteorite'].name,
      amount: 500,
      consumes: true
    }, {
      type: 'item',
      itemId: 'ore_stone',
      icon: ITEMS['ore_stone'].icon,
      name: ITEMS['ore_stone'].name,
      amount: 25000,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 85
    }]
  },

  fairy_steel_amulet: {
    produces: 'fairy_steel_amulet',
    name: 'fairy steel amulet',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'fairy_steel_amulet',
    timeToCraft: 40, // 60
    xp: 1,
    tags: ['amulet'],
    maxToCraft: 1,
    requiredCraftingLevel: 90,
    required: [{
      type: 'item',
      itemId: 'ore_fairy_steel',
      icon: ITEMS['ore_fairy_steel'].icon,
      name: ITEMS['ore_fairy_steel'].name,
      amount: 500,
      consumes: true
    }, {
      type: 'item',
      itemId: 'ore_stone',
      icon: ITEMS['ore_stone'].icon,
      name: ITEMS['ore_stone'].name,
      amount: 25000,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 90
    }]
  },

  elven_steel_amulet: {
    produces: 'elven_steel_amulet',
    name: 'elven steel amulet',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'elven_steel_amulet',
    timeToCraft: 40, // 60
    xp: 1,
    tags: ['amulet'],
    maxToCraft: 1,
    requiredCraftingLevel: 95,
    required: [{
      type: 'item',
      itemId: 'ore_elven_steel',
      icon: ITEMS['ore_elven_steel'].icon,
      name: ITEMS['ore_elven_steel'].name,
      amount: 500,
      consumes: true
    }, {
      type: 'item',
      itemId: 'ore_stone',
      icon: ITEMS['ore_stone'].icon,
      name: ITEMS['ore_stone'].name,
      amount: 25000,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 95
    }]
  },

  cursed_amulet: {
    produces: 'cursed_amulet',
    name: 'cursed amulet',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'cursed_amulet',
    timeToCraft: 40, // 60
    xp: 1,
    tags: ['amulet'],
    maxToCraft: 1,
    requiredCraftingLevel: 100,
    required: [{
      type: 'item',
      itemId: 'ore_cursed',
      icon: ITEMS['ore_cursed'].icon,
      name: ITEMS['ore_cursed'].name,
      amount: 500,
      consumes: true
    }, {
      type: 'item',
      itemId: 'ore_stone',
      icon: ITEMS['ore_stone'].icon,
      name: ITEMS['ore_stone'].name,
      amount: 25000,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 100
    }]
  },
  

  jade_amulet: {
    produces: 'jade_amulet',
    name: 'jade amulet',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'jade_amulet',
    timeToCraft: 120, // 60
    xp: 10,
    tags: ['amulet'],
    maxToCraft: 1,
    requiredCraftingLevel: 15,
    required: [{
      type: 'item',
      itemId: 'beech_log',
      icon: ITEMS['beech_log'].icon,
      name: ITEMS['beech_log'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'item',
      itemId: 'jade',
      icon: ITEMS['jade'].icon,
      name: ITEMS['jade'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 15
    }]
  },

  lapislazuli_amulet: {
    produces: 'lapislazuli_amulet',
    name: 'lapis lazuli amulet',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'lapislazuli_amulet',
    timeToCraft: 120, // 60
    xp: 10,
    tags: ['amulet'],
    maxToCraft: 1,
    requiredCraftingLevel: 30,
    required: [{
      type: 'item',
      itemId: 'ash_log',
      icon: ITEMS['ash_log'].icon,
      name: ITEMS['ash_log'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'item',
      itemId: 'lapislazuli',
      icon: ITEMS['lapislazuli'].icon,
      name: ITEMS['lapislazuli'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 30
    }]
  },

  sapphire_amulet: {
    produces: 'sapphire_amulet',
    name: 'sapphire amulet',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'sapphire_amulet',
    timeToCraft: 120, // 60
    xp: 10,
    tags: ['amulet'],
    maxToCraft: 1,
    requiredCraftingLevel: 45,
    required: [{
      type: 'item',
      itemId: 'walnut_log',
      icon: ITEMS['walnut_log'].icon,
      name: ITEMS['walnut_log'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'item',
      itemId: 'sapphire',
      icon: ITEMS['sapphire'].icon,
      name: ITEMS['sapphire'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 45
    }]
  },

  emerald_amulet: {
    produces: 'emerald_amulet',
    name: 'emerald amulet',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'emerald_amulet',
    timeToCraft: 120, // 60
    xp: 10,
    tags: ['amulet'],
    maxToCraft: 1,
    requiredCraftingLevel: 60,
    required: [{
      type: 'item',
      itemId: 'mahogany_log',
      icon: ITEMS['mahogany_log'].icon,
      name: ITEMS['mahogany_log'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'item',
      itemId: 'emerald',
      icon: ITEMS['emerald'].icon,
      name: ITEMS['emerald'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 60
    }]
  },

  ruby_amulet: {
    produces: 'ruby_amulet',
    name: 'ruby amulet',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'ruby_amulet',
    timeToCraft: 120, // 60
    xp: 10,
    tags: ['amulet'],
    maxToCraft: 1,
    requiredCraftingLevel: 75,
    required: [{
      type: 'item',
      itemId: 'black_log',
      icon: ITEMS['black_log'].icon,
      name: ITEMS['black_log'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'item',
      itemId: 'ruby',
      icon: ITEMS['ruby'].icon,
      name: ITEMS['ruby'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 75
    }]
  },

  tanzanite_amulet: {
    produces: 'tanzanite_amulet',
    name: 'tanzanite amulet',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'tanzanite_amulet',
    timeToCraft: 120, // 60
    xp: 10,
    tags: ['amulet'],
    maxToCraft: 1,
    requiredCraftingLevel: 90,
    required: [{
      type: 'item',
      itemId: 'cedar_log',
      icon: ITEMS['cedar_log'].icon,
      name: ITEMS['cedar_log'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'item',
      itemId: 'tanzanite',
      icon: ITEMS['tanzanite'].icon,
      name: ITEMS['tanzanite'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 90
    }]
  }

}
