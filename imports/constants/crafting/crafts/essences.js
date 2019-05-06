import { ITEMS } from '/imports/constants/items/index.js'; 

export const ESSENCE_CRAFTS = {

  silver_essence: {
    produces: 'silver_essence',
    recipeFor: 'crafting',
    name: 'silver essence',
    category: 'crafting',
    id: 'silver_essence',
    timeToCraft: 300,
    xp: 300,
    maxToCraft: 1,
    isHidden: true,
    requiredCraftingLevel: 23,
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
      amount: 50,
      consumes: true
    }, {
      type: 'item',
      itemId: 'ore_silver',
      icon: ITEMS['ore_silver'].icon,
      name: ITEMS['ore_silver'].name,
      amount: 50,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 23
    }]
  },

  gold_essence: {
    produces: 'gold_essence',
    recipeFor: 'crafting',
    name: 'gold essence',
    category: 'crafting',
    id: 'gold_essence',
    timeToCraft: 450,
    xp: 450,
    maxToCraft: 1,
    isHidden: true,
    requiredCraftingLevel: 28,
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
      amount: 50,
      consumes: true
    }, {
      type: 'item',
      itemId: 'ore_gold',
      icon: ITEMS['ore_gold'].icon,
      name: ITEMS['ore_gold'].name,
      amount: 50,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 28
    }]
  },

  carbon_essence: {
    produces: 'carbon_essence',
    recipeFor: 'crafting',
    name: 'carbon essence',
    id: 'carbon_essence',
    category: 'crafting',
    timeToCraft: 600,
    xp: 600,
    maxToCraft: 1,
    isHidden: true,
    requiredCraftingLevel: 33,
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
      amount: 50,
      consumes: true
    }, {
      type: 'item',
      itemId: 'ore_carbon',
      icon: ITEMS['ore_carbon'].icon,
      name: ITEMS['ore_carbon'].name,
      amount: 50,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 33
    }]
  },

  steel_essence: {
    produces: 'steel_essence',
    recipeFor: 'crafting',
    name: 'steel essence',
    id: 'steel_essence',
    category: 'crafting',
    timeToCraft: 900,
    xp: 900,
    maxToCraft: 1,
    isHidden: true,
    requiredCraftingLevel: 38,
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
      amount: 50,
      consumes: true
    }, {
      type: 'item',
      itemId: 'ore_steel',
      icon: ITEMS['ore_steel'].icon,
      name: ITEMS['ore_steel'].name,
      amount: 50,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 38
    }]
  },

  platinum_essence: {
    produces: 'platinum_essence',
    recipeFor: 'crafting',
    name: 'platinum essence',
    category: 'crafting',
    id: 'platinum_essence',
    timeToCraft: 900,
    xp: 900,
    maxToCraft: 1,
    isHidden: true,
    requiredCraftingLevel: 43,
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
      amount: 50,
      consumes: true
    }, {
      type: 'item',
      itemId: 'ore_platinum',
      icon: ITEMS['ore_platinum'].icon,
      name: ITEMS['ore_platinum'].name,
      amount: 50,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 43
    }]
  },

  titanium_essence: {
    produces: 'titanium_essence',
    recipeFor: 'crafting',
    name: 'titanium essence',
    category: 'crafting',
    id: 'titanium_essence',
    timeToCraft: 900,
    xp: 900,
    maxToCraft: 1,
    isHidden: true,
    requiredCraftingLevel: 48,
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
      amount: 50,
      consumes: true
    }, {
      type: 'item',
      itemId: 'ore_titanium',
      icon: ITEMS['ore_titanium'].icon,
      name: ITEMS['ore_titanium'].name,
      amount: 50,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 48
    }]
  },

  tungsten_essence: {
    produces: 'tungsten_essence',
    recipeFor: 'crafting',
    name: 'tungsten essence',
    category: 'crafting',
    id: 'tungsten_essence',
    timeToCraft: 900,
    xp: 900,
    maxToCraft: 1,
    isHidden: true,
    requiredCraftingLevel: 53,
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
      amount: 50,
      consumes: true
    }, {
      type: 'item',
      itemId: 'ore_tungsten',
      icon: ITEMS['ore_tungsten'].icon,
      name: ITEMS['ore_tungsten'].name,
      amount: 50,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 53
    }]
  },

  obsidian_essence: {
    produces: 'obsidian_essence',
    recipeFor: 'crafting',
    name: 'obsidian essence',
    category: 'crafting',
    id: 'obsidian_essence',
    timeToCraft: 900,
    xp: 900,
    maxToCraft: 1,
    isHidden: true,
    requiredCraftingLevel: 58,
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
      amount: 50,
      consumes: true
    }, {
      type: 'item',
      itemId: 'ore_obsidian',
      icon: ITEMS['ore_obsidian'].icon,
      name: ITEMS['ore_obsidian'].name,
      amount: 50,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 58
    }]
  },

  cobalt_essence: {
    produces: 'cobalt_essence',
    recipeFor: 'crafting',
    name: 'cobalt essence',
    id: 'cobalt_essence',
    category: 'crafting',
    timeToCraft: 900,
    xp: 900,
    maxToCraft: 1,
    isHidden: true,
    requiredCraftingLevel: 63,
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
      amount: 50,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 63
    }]
  },

  mithril_essence: {
    produces: 'mithril_essence',
    recipeFor: 'crafting',
    name: 'mithril essence',
    id: 'mithril_essence',
    category: 'crafting',
    timeToCraft: 900,
    xp: 900,
    maxToCraft: 1,
    isHidden: true,
    requiredCraftingLevel: 68,
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
      amount: 50,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 68
    }]
  },

  adamantium_essence: {
    produces: 'adamantium_essence',
    recipeFor: 'crafting',
    name: 'adamantium essence',
    id: 'adamantium_essence',
    category: 'crafting',
    timeToCraft: 900,
    xp: 900,
    maxToCraft: 1,
    isHidden: true,
    requiredCraftingLevel: 73,
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
      amount: 50,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 73
    }]
  },

  orichalcum_essence: {
    produces: 'orichalcum_essence',
    recipeFor: 'crafting',
    name: 'orichalcum essence',
    id: 'orichalcum_essence',
    category: 'crafting',
    timeToCraft: 900,
    xp: 900,
    maxToCraft: 1,
    isHidden: true,
    requiredCraftingLevel: 78,
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
      amount: 50,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 78
    }]
  },

  meteorite_essence: {
    produces: 'meteorite_essence',
    recipeFor: 'crafting',
    name: 'meteorite essence',
    id: 'meteorite_essence',
    category: 'crafting',
    timeToCraft: 900,
    xp: 900,
    maxToCraft: 1,
    isHidden: true,
    requiredCraftingLevel: 83,
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
      amount: 50,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 83
    }]
  },

  fairy_steel_essence: {
    produces: 'fairy_steel_essence',
    recipeFor: 'crafting',
    name: 'fairy steel essence',
    id: 'fairy_steel_essence',
    category: 'crafting',
    timeToCraft: 900,
    xp: 900,
    maxToCraft: 1,
    isHidden: true,
    requiredCraftingLevel: 88,
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
      amount: 50,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 88
    }]
  },

  elven_steel_essence: {
    produces: 'elven_steel_essence',
    recipeFor: 'crafting',
    name: 'elven steel essence',
    id: 'elven_steel_essence',
    category: 'crafting',
    timeToCraft: 900,
    xp: 900,
    maxToCraft: 1,
    isHidden: true,
    requiredCraftingLevel: 93,
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
      amount: 50,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 93
    }]
  },

  cursed_essence: {
    produces: 'cursed_essence',
    recipeFor: 'crafting',
    name: 'cursed essence',
    id: 'cursed_essence',
    category: 'crafting',
    timeToCraft: 900,
    xp: 900,
    maxToCraft: 1,
    isHidden: true,
    requiredCraftingLevel: 98,
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
      amount: 50,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 98
    }]
  },

  purestone_essence: {
    produces: 'purestone_essence',
    recipeFor: 'crafting',
    name: 'purestone essence',
    id: 'purestone_essence',
    category: 'crafting',
    timeToCraft: 900,
    xp: 2500,
    maxToCraft: 10,
    isHidden: false,
    requiredCraftingLevel: 130,
    required: [{
      type: 'item',
      itemId: 'eternium_furnace',
      icon: ITEMS['eternium_furnace'].icon,
      name: ITEMS['eternium_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'ore_purestone',
      icon: ITEMS['ore_purestone'].icon,
      name: ITEMS['ore_purestone'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'ancient_fire_shard',
      icon: ITEMS['ancient_fire_shard'].icon,
      name: ITEMS['ancient_fire_shard'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'item',
      itemId: 'ancient_water_shard',
      icon: ITEMS['ancient_water_shard'].icon,
      name: ITEMS['ancient_water_shard'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'item',
      itemId: 'ancient_earth_shard',
      icon: ITEMS['ancient_earth_shard'].icon,
      name: ITEMS['ancient_earth_shard'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'item',
      itemId: 'ancient_air_shard',
      icon: ITEMS['ancient_air_shard'].icon,
      name: ITEMS['ancient_air_shard'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 130
    }]
  }
};
