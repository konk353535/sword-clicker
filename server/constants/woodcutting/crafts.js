import { ITEMS } from '/server/constants/items/index.js'; 

export const WOODCUTTING_CRAFTS = {
  primitive_axe: {
    produces: 'primitive_axe',
    recipeFor: 'crafting',
    name: 'primitive axe',
    id: 'primitive_axe',
    category: 'woodcutting',
    timeToCraft: 15,
    xp: 5,
    maxToCraft: 1,
    requiredCraftingLevel: 1,
    required: [{
      type: 'item',
      itemId: 'ore_stone',
      icon: ITEMS['ore_stone'].icon,
      name: ITEMS['ore_stone'].name,
      amount: 3,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 1
    }]
  },

  copper_axe: {
    produces: 'copper_axe',
    recipeFor: 'crafting',
    name: 'copper axe',
    id: 'copper_axe',
    category: 'woodcutting',
    timeToCraft: 60, // 60
    xp: 20,
    maxToCraft: 1,
    requiredCraftingLevel: 5,
    required: [{
      type: 'item',
      itemId: 'copper_bar',
      icon: ITEMS['copper_bar'].icon,
      name: ITEMS['copper_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'item',
      itemId: 'pine_log',
      icon: ITEMS['pine_log'].icon,
      name: ITEMS['pine_log'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 5
    }]
  },

  tin_axe: {
    produces: 'tin_axe',
    recipeFor: 'crafting',
    name: 'tin axe',
    id: 'tin_axe',
    category: 'woodcutting',
    timeToCraft: 60, // 60
    xp: 30,
    maxToCraft: 1,
    requiredCraftingLevel: 10,
    required: [{
      type: 'item',
      itemId: 'tin_bar',
      icon: ITEMS['tin_bar'].icon,
      name: ITEMS['tin_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'item',
      itemId: 'beech_log',
      icon: ITEMS['beech_log'].icon,
      name: ITEMS['beech_log'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 10
    }]
  },

  bronze_axe: {
    produces: 'bronze_axe',
    recipeFor: 'crafting',
    name: 'bronze axe',
    id: 'bronze_axe',
    category: 'woodcutting',
    timeToCraft: 60, // 60
    xp: 40,
    maxToCraft: 1,
    requiredCraftingLevel: 15,
    required: [{
      type: 'item',
      itemId: 'bronze_bar',
      icon: ITEMS['bronze_bar'].icon,
      name: ITEMS['bronze_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'item',
      itemId: 'ash_log',
      icon: ITEMS['ash_log'].icon,
      name: ITEMS['ash_log'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 15
    }]
  },

  iron_axe: {
    produces: 'iron_axe',
    recipeFor: 'crafting',
    name: 'iron axe',
    id: 'iron_axe',
    category: 'woodcutting',
    timeToCraft: 120, // 60
    xp: 50,
    maxToCraft: 1,
    requiredCraftingLevel: 20,
    required: [{
      type: 'item',
      itemId: 'iron_bar',
      icon: ITEMS['iron_bar'].icon,
      name: ITEMS['iron_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'item',
      itemId: 'oak_log',
      icon: ITEMS['oak_log'].icon,
      name: ITEMS['oak_log'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 20
    }]
  },

  silver_axe: {
    produces: 'silver_axe',
    recipeFor: 'crafting',
    name: 'silver axe',
    id: 'silver_axe',
    category: 'woodcutting',
    timeToCraft: 60 * 60, // 60
    xp: 75,
    maxToCraft: 1,
    requiredCraftingLevel: 25,
    required: [{
      type: 'item',
      itemId: 'silver_essence',
      icon: ITEMS['silver_essence'].icon,
      name: ITEMS['silver_essence'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'item',
      itemId: 'silver_bar',
      icon: ITEMS['silver_bar'].icon,
      name: ITEMS['silver_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'item',
      itemId: 'maple_log',
      icon: ITEMS['maple_log'].icon,
      name: ITEMS['maple_log'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 25
    }]
  },

  gold_axe: {
    produces: 'gold_axe',
    recipeFor: 'crafting',
    name: 'gold axe',
    id: 'gold_axe',
    category: 'woodcutting',
    timeToCraft: 60 * 60, // 60
    xp: 100,
    maxToCraft: 1,
    requiredCraftingLevel: 30,
    required: [{
      type: 'item',
      itemId: 'gold_essence',
      icon: ITEMS['gold_essence'].icon,
      name: ITEMS['gold_essence'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'item',
      itemId: 'gold_bar',
      icon: ITEMS['gold_bar'].icon,
      name: ITEMS['gold_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'item',
      itemId: 'walnut_log',
      icon: ITEMS['walnut_log'].icon,
      name: ITEMS['walnut_log'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 30
    }]
  },

  carbon_axe: {
    produces: 'carbon_axe',
    recipeFor: 'crafting',
    name: 'carbon axe',
    id: 'carbon_axe',
    category: 'woodcutting',
    timeToCraft: 300, // 60
    xp: 200,
    maxToCraft: 1,
    requiredCraftingLevel: 35,
    required: [{
      type: 'item',
      itemId: 'carbon_essence',
      icon: ITEMS['carbon_essence'].icon,
      name: ITEMS['carbon_essence'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'item',
      itemId: 'carbon_bar',
      icon: ITEMS['carbon_bar'].icon,
      name: ITEMS['carbon_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'item',
      itemId: 'cherry_log',
      icon: ITEMS['cherry_log'].icon,
      name: ITEMS['cherry_log'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 35
    }]
  },

  steel_axe: {
    produces: 'steel_axe',
    recipeFor: 'crafting',
    name: 'steel axe',
    id: 'steel_axe',
    category: 'woodcutting',
    timeToCraft: 120, // 60
    xp: 300,
    maxToCraft: 1,
    requiredCraftingLevel: 40,
    required: [{
      type: 'item',
      itemId: 'steel_essence',
      icon: ITEMS['steel_essence'].icon,
      name: ITEMS['steel_essence'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'item',
      itemId: 'steel_bar',
      icon: ITEMS['steel_bar'].icon,
      name: ITEMS['steel_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'item',
      itemId: 'mahogany_log',
      icon: ITEMS['mahogany_log'].icon,
      name: ITEMS['mahogany_log'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 40
    }]
  },

  platinum_axe: {
    produces: 'platinum_axe',
    recipeFor: 'crafting',
    name: 'platinum axe',
    id: 'platinum_axe',
    category: 'woodcutting',
    timeToCraft: 120, // 60
    xp: 400,
    maxToCraft: 1,
    requiredCraftingLevel: 45,
    required: [{
      type: 'item',
      itemId: 'platinum_essence',
      icon: ITEMS['platinum_essence'].icon,
      name: ITEMS['platinum_essence'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'item',
      itemId: 'platinum_bar',
      icon: ITEMS['platinum_bar'].icon,
      name: ITEMS['platinum_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'item',
      itemId: 'elk_log',
      icon: ITEMS['elk_log'].icon,
      name: ITEMS['elk_log'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 45
    }]
  },

  titanium_axe: {
    produces: 'titanium_axe',
    recipeFor: 'crafting',
    name: 'titanium axe',
    id: 'titanium_axe',
    category: 'woodcutting',
    timeToCraft: 120, // 60
    xp: 500,
    maxToCraft: 1,
    requiredCraftingLevel: 50,
    required: [{
      type: 'item',
      itemId: 'titanium_essence',
      icon: ITEMS['titanium_essence'].icon,
      name: ITEMS['titanium_essence'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'item',
      itemId: 'titanium_bar',
      icon: ITEMS['titanium_bar'].icon,
      name: ITEMS['titanium_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'item',
      itemId: 'black_log',
      icon: ITEMS['black_log'].icon,
      name: ITEMS['black_log'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 50
    }]
  },

  tungsten_axe: {
    produces: 'tungsten_axe',
    recipeFor: 'crafting',
    name: 'tungsten axe',
    id: 'tungsten_axe',
    category: 'woodcutting',
    timeToCraft: 120, // 60
    xp: 600,
    maxToCraft: 1,
    requiredCraftingLevel: 55,
    required: [{
      type: 'item',
      itemId: 'tungsten_essence',
      icon: ITEMS['tungsten_essence'].icon,
      name: ITEMS['tungsten_essence'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'item',
      itemId: 'tungsten_bar',
      icon: ITEMS['tungsten_bar'].icon,
      name: ITEMS['tungsten_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'item',
      itemId: 'blue_gum_log',
      icon: ITEMS['blue_gum_log'].icon,
      name: ITEMS['blue_gum_log'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 55
    }]
  },

  obsidian_axe: {
    produces: 'obsidian_axe',
    recipeFor: 'crafting',
    name: 'obsidian axe',
    id: 'obsidian_axe',
    category: 'woodcutting',
    timeToCraft: 120, // 60
    xp: 700,
    maxToCraft: 1,
    requiredCraftingLevel: 60,
    required: [{
      type: 'item',
      itemId: 'obsidian_essence',
      icon: ITEMS['obsidian_essence'].icon,
      name: ITEMS['obsidian_essence'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'item',
      itemId: 'obsidian_bar',
      icon: ITEMS['obsidian_bar'].icon,
      name: ITEMS['obsidian_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'item',
      itemId: 'cedar_log',
      icon: ITEMS['cedar_log'].icon,
      name: ITEMS['cedar_log'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 60
    }]
  },

  cobalt_axe: {
    produces: 'cobalt_axe',
    recipeFor: 'crafting',
    name: 'cobalt axe',
    id: 'cobalt_axe',
    category: 'woodcutting',
    timeToCraft: 30 * 60, // 60
    xp: 1000,
    maxToCraft: 1,
    requiredCraftingLevel: 65,
    required: [{
      type: 'item',
      itemId: 'cobalt_essence',
      icon: ITEMS['cobalt_essence'].icon,
      name: ITEMS['cobalt_essence'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'item',
      itemId: 'cobalt_bar',
      icon: ITEMS['cobalt_bar'].icon,
      name: ITEMS['cobalt_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'item',
      itemId: 'denya_log',
      icon: ITEMS['denya_log'].icon,
      name: ITEMS['denya_log'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 65
    }]
  },


  mithril_axe: {
    produces: 'mithril_axe',
    recipeFor: 'crafting',
    name: 'mithril axe',
    id: 'mithril_axe',
    category: 'woodcutting',
    timeToCraft: 30 * 60, // 60
    xp: 1500,
    maxToCraft: 1,
    requiredCraftingLevel: 70,
    required: [{
      type: 'item',
      itemId: 'mithril_essence',
      icon: ITEMS['mithril_essence'].icon,
      name: ITEMS['mithril_essence'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'item',
      itemId: 'mithril_bar',
      icon: ITEMS['mithril_bar'].icon,
      name: ITEMS['mithril_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'item',
      itemId: 'gombe_log',
      icon: ITEMS['gombe_log'].icon,
      name: ITEMS['gombe_log'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 70
    }]
  },

  adamantium_axe: {
    produces: 'adamantium_axe',
    recipeFor: 'crafting',
    name: 'adamantium axe',
    id: 'adamantium_axe',
    category: 'woodcutting',
    timeToCraft: 60 * 60 * 2, // 60
    xp: 1750,
    maxToCraft: 1,
    requiredCraftingLevel: 75,
    required: [{
      type: 'item',
      itemId: 'adamantium_essence',
      icon: ITEMS['adamantium_essence'].icon,
      name: ITEMS['adamantium_essence'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'item',
      itemId: 'adamantium_bar',
      icon: ITEMS['adamantium_bar'].icon,
      name: ITEMS['adamantium_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'item',
      itemId: 'hickory_log',
      icon: ITEMS['hickory_log'].icon,
      name: ITEMS['hickory_log'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 75
    }]
  },

  orichalcum_axe: {
    produces: 'orichalcum_axe',
    recipeFor: 'crafting',
    name: 'orichalcum axe',
    id: 'orichalcum_axe',
    category: 'woodcutting',
    timeToCraft: 60 * 60 * 4, // 60
    xp: 2000,
    maxToCraft: 1,
    requiredCraftingLevel: 80,
    required: [{
      type: 'item',
      itemId: 'orichalcum_essence',
      icon: ITEMS['orichalcum_essence'].icon,
      name: ITEMS['orichalcum_essence'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'item',
      itemId: 'orichalcum_bar',
      icon: ITEMS['orichalcum_bar'].icon,
      name: ITEMS['orichalcum_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'item',
      itemId: 'larch_log',
      icon: ITEMS['larch_log'].icon,
      name: ITEMS['larch_log'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 80
    }]
  },

  meteorite_axe: {
    produces: 'meteorite_axe',
    recipeFor: 'crafting',
    name: 'meteorite axe',
    id: 'meteorite_axe',
    category: 'woodcutting',
    timeToCraft: 60 * 60 * 4, // 60
    xp: 3000,
    maxToCraft: 1,
    requiredCraftingLevel: 85,
    required: [{
      type: 'item',
      itemId: 'meteorite_essence',
      icon: ITEMS['meteorite_essence'].icon,
      name: ITEMS['meteorite_essence'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'item',
      itemId: 'meteorite_bar',
      icon: ITEMS['meteorite_bar'].icon,
      name: ITEMS['meteorite_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'item',
      itemId: 'poplar_log',
      icon: ITEMS['poplar_log'].icon,
      name: ITEMS['poplar_log'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 85
    }]
  },

  fairy_steel_axe: {
    produces: 'fairy_steel_axe',
    recipeFor: 'crafting',
    name: 'fairy steel axe',
    id: 'fairy_steel_axe',
    category: 'woodcutting',
    timeToCraft: 60 * 60 * 6, // 60
    xp: 4000,
    maxToCraft: 1,
    requiredCraftingLevel: 90,
    required: [{
      type: 'item',
      itemId: 'fairy_steel_essence',
      icon: ITEMS['fairy_steel_essence'].icon,
      name: ITEMS['fairy_steel_essence'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'item',
      itemId: 'fairy_steel_bar',
      icon: ITEMS['fairy_steel_bar'].icon,
      name: ITEMS['fairy_steel_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'item',
      itemId: 'tali_log',
      icon: ITEMS['tali_log'].icon,
      name: ITEMS['tali_log'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 90
    }]
  },

  elven_steel_axe: {
    produces: 'elven_steel_axe',
    recipeFor: 'crafting',
    name: 'elven steel axe',
    id: 'elven_steel_axe',
    category: 'woodcutting',
    timeToCraft: 60 * 60 * 6, // 60
    xp: 4500,
    maxToCraft: 1,
    requiredCraftingLevel: 95,
    required: [{
      type: 'item',
      itemId: 'elven_steel_essence',
      icon: ITEMS['elven_steel_essence'].icon,
      name: ITEMS['elven_steel_essence'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'item',
      itemId: 'elven_steel_bar',
      icon: ITEMS['elven_steel_bar'].icon,
      name: ITEMS['elven_steel_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'item',
      itemId: 'willow_log',
      icon: ITEMS['willow_log'].icon,
      name: ITEMS['willow_log'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 95
    }]
  },

  cursed_axe: {
    produces: 'cursed_axe',
    recipeFor: 'crafting',
    name: 'cursed axe',
    id: 'cursed_axe',
    category: 'woodcutting',
    timeToCraft: 60 * 60 * 6, // 60
    xp: 5000,
    maxToCraft: 1,
    requiredCraftingLevel: 100,
    required: [{
      type: 'item',
      itemId: 'cursed_essence',
      icon: ITEMS['cursed_essence'].icon,
      name: ITEMS['cursed_essence'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'item',
      itemId: 'cursed_bar',
      icon: ITEMS['cursed_bar'].icon,
      name: ITEMS['cursed_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'item',
      itemId: 'teak_log',
      icon: ITEMS['teak_log'].icon,
      name: ITEMS['teak_log'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 100
    }]
  }
}
