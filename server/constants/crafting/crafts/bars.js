import { ITEMS } from '/server/constants/items/index.js'; 

export const BAR_CRAFTS = {
  copper_bar: {
    produces: 'copper_bar',
    recipeFor: 'crafting',
    name: 'copper bar',
    category: 'crafting',
    id: 'copper_bar',
    timeToCraft: 3,
    xp: 2,
    maxToCraft: 100,
    requiredCraftingLevel: 1,
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
      level: 1
    }]
  },

  tin_bar: {
    produces: 'tin_bar',
    recipeFor: 'crafting',
    name: 'tin bar',
    category: 'crafting',
    id: 'tin_bar',
    timeToCraft: 3,
    xp: 3,
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
      itemId: 'ore_tin',
      icon: ITEMS['ore_tin'].icon,
      name: ITEMS['ore_tin'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 5
    }]
  },

  bronze_bar: {
    produces: 'bronze_bar',
    recipeFor: 'crafting',
    name: 'bronze bar',
    category: 'crafting',
    id: 'bronze_bar',
    timeToCraft: 3,
    xp: 4,
    maxToCraft: 100,
    requiredCraftingLevel: 10,
    required: [{
      type: 'item',
      itemId: 'tin_furnace',
      icon: ITEMS['tin_furnace'].icon,
      name: ITEMS['tin_furnace'].name,
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
      itemId: 'ore_bronze',
      icon: ITEMS['ore_bronze'].icon,
      name: ITEMS['ore_bronze'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 10
    }]
  },

  iron_bar: {
    produces: 'iron_bar',
    recipeFor: 'crafting',
    name: 'iron bar',
    id: 'iron_bar',
    category: 'crafting',
    timeToCraft: 6,
    xp: 6,
    maxToCraft: 100,
    requiredCraftingLevel: 15,
    required: [{
      type: 'item',
      itemId: 'bronze_furnace',
      icon: ITEMS['bronze_furnace'].icon,
      name: ITEMS['bronze_furnace'].name,
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
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 15
    }]
  },

  silver_bar: {
    produces: 'silver_bar',
    recipeFor: 'crafting',
    name: 'silver bar',
    category: 'crafting',
    id: 'silver_bar',
    timeToCraft: 7,
    xp: 7,
    maxToCraft: 100,
    requiredCraftingLevel: 20,
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
      itemId: 'ore_silver',
      icon: ITEMS['ore_silver'].icon,
      name: ITEMS['ore_silver'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 20
    }]
  },

  gold_bar: {
    produces: 'gold_bar',
    recipeFor: 'crafting',
    name: 'gold bar',
    category: 'crafting',
    id: 'gold_bar',
    timeToCraft: 8,
    xp: 8,
    maxToCraft: 100,
    requiredCraftingLevel: 25,
    required: [{
      type: 'item',
      itemId: 'silver_furnace',
      icon: ITEMS['silver_furnace'].icon,
      name: ITEMS['silver_furnace'].name,
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
      itemId: 'ore_gold',
      icon: ITEMS['ore_gold'].icon,
      name: ITEMS['ore_gold'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 25
    }]
  },

  carbon_bar: {
    produces: 'carbon_bar',
    recipeFor: 'crafting',
    name: 'carbon bar',
    id: 'carbon_bar',
    category: 'crafting',
    timeToCraft: 9,
    xp: 9,
    maxToCraft: 100,
    requiredCraftingLevel: 30,
    required: [{
      type: 'item',
      itemId: 'gold_furnace',
      icon: ITEMS['gold_furnace'].icon,
      name: ITEMS['gold_furnace'].name,
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
      level: 30
    }]
  },

  steel_bar: {
    produces: 'steel_bar',
    recipeFor: 'crafting',
    name: 'steel bar',
    id: 'steel_bar',
    category: 'crafting',
    timeToCraft: 10,
    xp: 10,
    maxToCraft: 100,
    requiredCraftingLevel: 35,
    required: [{
      type: 'item',
      itemId: 'carbon_furnace',
      icon: ITEMS['carbon_furnace'].icon,
      name: ITEMS['carbon_furnace'].name,
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
      level: 35
    }]
  },

  platinum_bar: {
    produces: 'platinum_bar',
    recipeFor: 'crafting',
    name: 'platinum bar',
    category: 'crafting',
    id: 'platinum_bar',
    timeToCraft: 11,
    xp: 11,
    maxToCraft: 100,
    requiredCraftingLevel: 40,
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
      itemId: 'ore_platinum',
      icon: ITEMS['ore_platinum'].icon,
      name: ITEMS['ore_platinum'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 40
    }]
  },

  titanium_bar: {
    produces: 'titanium_bar',
    recipeFor: 'crafting',
    name: 'titanium bar',
    category: 'crafting',
    id: 'titanium_bar',
    timeToCraft: 12,
    xp: 12,
    maxToCraft: 100,
    requiredCraftingLevel: 45,
    required: [{
      type: 'item',
      itemId: 'platinum_furnace',
      icon: ITEMS['platinum_furnace'].icon,
      name: ITEMS['platinum_furnace'].name,
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
      itemId: 'ore_titanium',
      icon: ITEMS['ore_titanium'].icon,
      name: ITEMS['ore_titanium'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 45
    }]
  },

  tungsten_bar: {
    produces: 'tungsten_bar',
    recipeFor: 'crafting',
    name: 'tungsten bar',
    category: 'crafting',
    id: 'tungsten_bar',
    timeToCraft: 13,
    xp: 13,
    maxToCraft: 100,
    requiredCraftingLevel: 50,
    required: [{
      type: 'item',
      itemId: 'titanium_furnace',
      icon: ITEMS['titanium_furnace'].icon,
      name: ITEMS['titanium_furnace'].name,
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
      itemId: 'ore_tungsten',
      icon: ITEMS['ore_tungsten'].icon,
      name: ITEMS['ore_tungsten'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 50
    }]
  },

  obsidian_bar: {
    produces: 'obsidian_bar',
    recipeFor: 'crafting',
    name: 'obsidian bar',
    category: 'crafting',
    id: 'obsidian_bar',
    timeToCraft: 14,
    xp: 14,
    maxToCraft: 100,
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
      itemId: 'ore_coal',
      icon: ITEMS['ore_coal'].icon,
      name: ITEMS['ore_coal'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'item',
      itemId: 'ore_obsidian',
      icon: ITEMS['ore_obsidian'].icon,
      name: ITEMS['ore_obsidian'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 55
    }]
  },

  cobalt_bar: {
    produces: 'cobalt_bar',
    recipeFor: 'crafting',
    name: 'cobalt bar',
    id: 'cobalt_bar',
    category: 'crafting',
    timeToCraft: 15,
    xp: 15,
    maxToCraft: 100,
    requiredCraftingLevel: 60,
    required: [{
      type: 'item',
      itemId: 'obsidian_furnace',
      icon: ITEMS['obsidian_furnace'].icon,
      name: ITEMS['obsidian_furnace'].name,
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
      level: 60
    }]
  },

  mithril_bar: {
    produces: 'mithril_bar',
    recipeFor: 'crafting',
    name: 'mithril bar',
    id: 'mithril_bar',
    category: 'crafting',
    timeToCraft: 17,
    xp: 17,
    maxToCraft: 150,
    requiredCraftingLevel: 65,
    required: [{
      type: 'item',
      itemId: 'cobalt_furnace',
      icon: ITEMS['cobalt_furnace'].icon,
      name: ITEMS['cobalt_furnace'].name,
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
      level: 65
    }]
  },

  adamantium_bar: {
    produces: 'adamantium_bar',
    recipeFor: 'crafting',
    name: 'adamantium bar',
    id: 'adamantium_bar',
    category: 'crafting',
    timeToCraft: 19,
    xp: 19,
    maxToCraft: 100,
    requiredCraftingLevel: 70,
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
      level: 70
    }]
  },

  orichalcum_bar: {
    produces: 'orichalcum_bar',
    recipeFor: 'crafting',
    name: 'orichalcum bar',
    id: 'orichalcum_bar',
    category: 'crafting',
    timeToCraft: 33,
    xp: 33,
    maxToCraft: 100,
    requiredCraftingLevel: 75,
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
      level: 75
    }]
  },

  meteorite_bar: {
    produces: 'meteorite_bar',
    recipeFor: 'crafting',
    name: 'meteorite bar',
    id: 'meteorite_bar',
    category: 'crafting',
    timeToCraft: 36,
    xp: 36,
    maxToCraft: 100,
    requiredCraftingLevel: 80,
    required: [{
      type: 'item',
      itemId: 'orichalcum_furnace',
      icon: ITEMS['orichalcum_furnace'].icon,
      name: ITEMS['orichalcum_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'ore_meteorite',
      icon: ITEMS['ore_meteorite'].icon,
      name: ITEMS['ore_meteorite'].name,
      amount: 2,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 80
    }]
  },

  fairy_steel_bar: {
    produces: 'fairy_steel_bar',
    recipeFor: 'crafting',
    name: 'fairy_steel bar',
    id: 'fairy_steel_bar',
    category: 'crafting',
    timeToCraft: 45,
    xp: 45,
    maxToCraft: 100,
    requiredCraftingLevel: 85,
    required: [{
      type: 'item',
      itemId: 'meteorite_furnace',
      icon: ITEMS['meteorite_furnace'].icon,
      name: ITEMS['meteorite_furnace'].name,
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
      level: 85
    }]
  },

  elven_steel_bar: {
    produces: 'elven_steel_bar',
    recipeFor: 'crafting',
    name: 'elven_steel bar',
    id: 'elven_steel_bar',
    category: 'crafting',
    timeToCraft: 50,
    xp: 50,
    maxToCraft: 100,
    requiredCraftingLevel: 90,
    required: [{
      type: 'item',
      itemId: 'fairy_steel_furnace',
      icon: ITEMS['fairy_steel_furnace'].icon,
      name: ITEMS['fairy_steel_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'ore_elven_steel',
      icon: ITEMS['ore_elven_steel'].icon,
      name: ITEMS['ore_elven_steel'].name,
      amount: 2,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 90
    }]
  },

  cursed_bar: {
    produces: 'cursed_bar',
    recipeFor: 'crafting',
    name: 'cursed bar',
    id: 'cursed_bar',
    category: 'crafting',
    timeToCraft: 70,
    xp: 70,
    maxToCraft: 100,
    requiredCraftingLevel: 95,
    required: [{
      type: 'item',
      itemId: 'elven_steel_furnace',
      icon: ITEMS['elven_steel_furnace'].icon,
      name: ITEMS['elven_steel_furnace'].name,
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
      level: 95
    }]
  }
}
