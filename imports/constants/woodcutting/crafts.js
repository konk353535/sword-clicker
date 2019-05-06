console.log('importing woodcutting/crafts.js ITEMS');
import { ITEMS } from '/imports/constants/items/index.js';

console.log('exporting woodcutting/crafts.js WOODCUTTING_CRAFTS');
export const WOODCUTTING_CRAFTS = {
  primitive_axe: {
    produces: 'primitive_axe',
    recipeFor: 'crafting',
    name: 'primitive axe',
    id: 'primitive_axe',
    category: 'woodcutting',
    timeToCraft: 20,
    xp: 10,
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
    requiredCraftingLevel: 4,
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
      level: 4
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
    requiredCraftingLevel: 9,
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
      level: 9
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
    requiredCraftingLevel: 14,
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
      level: 14
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
    requiredCraftingLevel: 19,
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
      level: 19
    }]
  },

  silver_axe: {
    produces: 'silver_axe',
    recipeFor: 'crafting',
    name: 'silver axe',
    id: 'silver_axe',
    category: 'woodcutting',
    timeToCraft: 180, // 60
    xp: 300,
    maxToCraft: 1,
    requiredCraftingLevel: 24,
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
      level: 24
    }]
  },

  gold_axe: {
    produces: 'gold_axe',
    recipeFor: 'crafting',
    name: 'gold axe',
    id: 'gold_axe',
    category: 'woodcutting',
    timeToCraft: 240, // 60
    xp: 500,
    maxToCraft: 1,
    requiredCraftingLevel: 29,
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
      level: 29
    }]
  },

  carbon_axe: {
    produces: 'carbon_axe',
    recipeFor: 'crafting',
    name: 'carbon axe',
    id: 'carbon_axe',
    category: 'woodcutting',
    timeToCraft: 300, // 60
    xp: 1000,
    maxToCraft: 1,
    requiredCraftingLevel: 34,
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
      level: 34
    }]
  },

  steel_axe: {
    produces: 'steel_axe',
    recipeFor: 'crafting',
    name: 'steel axe',
    id: 'steel_axe',
    category: 'woodcutting',
    timeToCraft: 360, // 60
    xp: 1500,
    maxToCraft: 1,
    requiredCraftingLevel: 39,
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
      level: 39
    }]
  },

  platinum_axe: {
    produces: 'platinum_axe',
    recipeFor: 'crafting',
    name: 'platinum axe',
    id: 'platinum_axe',
    category: 'woodcutting',
    timeToCraft: 600, // 60
    xp: 2500,
    maxToCraft: 1,
    requiredCraftingLevel: 44,
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
      level: 44
    }]
  },

  titanium_axe: {
    produces: 'titanium_axe',
    recipeFor: 'crafting',
    name: 'titanium axe',
    id: 'titanium_axe',
    category: 'woodcutting',
    timeToCraft: 900, // 60
    xp: 3700,
    maxToCraft: 1,
    requiredCraftingLevel: 49,
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
      level: 49
    }]
  },

  tungsten_axe: {
    produces: 'tungsten_axe',
    recipeFor: 'crafting',
    name: 'tungsten axe',
    id: 'tungsten_axe',
    category: 'woodcutting',
    timeToCraft: 900, // 60
    xp: 6250,
    maxToCraft: 1,
    requiredCraftingLevel: 54,
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
      level: 54
    }]
  },

  obsidian_axe: {
    produces: 'obsidian_axe',
    recipeFor: 'crafting',
    name: 'obsidian axe',
    id: 'obsidian_axe',
    category: 'woodcutting',
    timeToCraft: 900, // 60
    xp: 10000,
    maxToCraft: 1,
    requiredCraftingLevel: 59,
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
      level: 59
    }]
  },

  cobalt_axe: {
    produces: 'cobalt_axe',
    recipeFor: 'crafting',
    name: 'cobalt axe',
    id: 'cobalt_axe',
    category: 'woodcutting',
    timeToCraft: 900, // 60
    xp: 15000,
    maxToCraft: 1,
    requiredCraftingLevel: 64,
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
      level: 64
    }]
  },


  mithril_axe: {
    produces: 'mithril_axe',
    recipeFor: 'crafting',
    name: 'mithril axe',
    id: 'mithril_axe',
    category: 'woodcutting',
    timeToCraft: 900, // 60
    xp: 25000,
    maxToCraft: 1,
    requiredCraftingLevel: 69,
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
      level: 69
    }]
  },

  adamantium_axe: {
    produces: 'adamantium_axe',
    recipeFor: 'crafting',
    name: 'adamantium axe',
    id: 'adamantium_axe',
    category: 'woodcutting',
    timeToCraft: 900, // 60
    xp: 43500,
    maxToCraft: 1,
    requiredCraftingLevel: 74,
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
      level: 74
    }]
  },

  orichalcum_axe: {
    produces: 'orichalcum_axe',
    recipeFor: 'crafting',
    name: 'orichalcum axe',
    id: 'orichalcum_axe',
    category: 'woodcutting',
    timeToCraft: 1200, // 60
    xp: 62000,
    maxToCraft: 1,
    requiredCraftingLevel: 79,
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
      level: 79
    }]
  },

  meteorite_axe: {
    produces: 'meteorite_axe',
    recipeFor: 'crafting',
    name: 'meteorite axe',
    id: 'meteorite_axe',
    category: 'woodcutting',
    timeToCraft: 1500, // 60
    xp: 125000,
    maxToCraft: 1,
    requiredCraftingLevel: 84,
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
      level: 84
    }]
  },

  fairy_steel_axe: {
    produces: 'fairy_steel_axe',
    recipeFor: 'crafting',
    name: 'fairy steel axe',
    id: 'fairy_steel_axe',
    category: 'woodcutting',
    timeToCraft: 1800, // 60
    xp: 200000,
    maxToCraft: 1,
    requiredCraftingLevel: 89,
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
      level: 89
    }]
  },

  elven_steel_axe: {
    produces: 'elven_steel_axe',
    recipeFor: 'crafting',
    name: 'elven steel axe',
    id: 'elven_steel_axe',
    category: 'woodcutting',
    timeToCraft: 60 * 60 * 1, // 60
    xp: 300000,
    maxToCraft: 1,
    requiredCraftingLevel: 94,
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
      level: 94
    }]
  },

  cursed_axe: {
    produces: 'cursed_axe',
    recipeFor: 'crafting',
    name: 'cursed axe',
    id: 'cursed_axe',
    category: 'woodcutting',
    timeToCraft: 60 * 60 * 1, // 60
    xp: 500000,
    maxToCraft: 1,
    requiredCraftingLevel: 99,
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
      level: 99
    }]
  },

  darksteel_axe: {
    produces: 'darksteel_axe',
    recipeFor: 'crafting',
    name: 'darksteel axe',
    id: 'darksteel_axe',
    isHidden: true,
    category: 'woodcutting',
    timeToCraft: 60 * 60 * 1, // 60
    xp: 543750,
    maxToCraft: 1,
    requiredCraftingLevel: 104,
    required: [{
      type: 'item',
      itemId: 'adamantium_essence',
      icon: ITEMS['adamantium_essence'].icon,
      name: ITEMS['adamantium_essence'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'item',
      itemId: 'cursed_essence',
      icon: ITEMS['cursed_essence'].icon,
      name: ITEMS['cursed_essence'].name,
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
      itemId: 'cursed_bar',
      icon: ITEMS['cursed_bar'].icon,
      name: ITEMS['cursed_bar'].name,
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
      type: 'item',
      itemId: 'teak_log',
      icon: ITEMS['teak_log'].icon,
      name: ITEMS['teak_log'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 104
    }]
  },

  radiant_axe: {
    produces: 'radiant_axe',
    recipeFor: 'crafting',
    name: 'radiant axe',
    id: 'radiant_axe',
    isHidden: true,
    category: 'woodcutting',
    timeToCraft: 60 * 60 * 1, // 60
    xp: 562500,
    maxToCraft: 1,
    requiredCraftingLevel: 109,
    required: [{
      type: 'item',
      itemId: 'orichalcum_essence',
      icon: ITEMS['orichalcum_essence'].icon,
      name: ITEMS['orichalcum_essence'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'item',
      itemId: 'cursed_essence',
      icon: ITEMS['cursed_essence'].icon,
      name: ITEMS['cursed_essence'].name,
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
      itemId: 'cursed_bar',
      icon: ITEMS['cursed_bar'].icon,
      name: ITEMS['cursed_bar'].name,
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
      type: 'item',
      itemId: 'teak_log',
      icon: ITEMS['teak_log'].icon,
      name: ITEMS['teak_log'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'item',
      itemId: 'darksteel_axe',
      icon: ITEMS['darksteel_axe'].icon,
      name: ITEMS['darksteel_axe'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'skill',
      name: 'crafting',
      level: 109
    }]
  },

  astral_axe: {
    produces: 'astral_axe',
    recipeFor: 'crafting',
    name: 'astral axe',
    id: 'astral_axe',
    isHidden: true,
    category: 'woodcutting',
    timeToCraft: 60 * 60 * 1, // 60
    xp: 625000,
    maxToCraft: 1,
    requiredCraftingLevel: 114,
    required: [{
      type: 'item',
      itemId: 'meteorite_essence',
      icon: ITEMS['meteorite_essence'].icon,
      name: ITEMS['meteorite_essence'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'item',
      itemId: 'cursed_essence',
      icon: ITEMS['cursed_essence'].icon,
      name: ITEMS['cursed_essence'].name,
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
      itemId: 'cursed_bar',
      icon: ITEMS['cursed_bar'].icon,
      name: ITEMS['cursed_bar'].name,
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
      type: 'item',
      itemId: 'teak_log',
      icon: ITEMS['teak_log'].icon,
      name: ITEMS['teak_log'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'item',
      itemId: 'radiant_axe',
      icon: ITEMS['radiant_axe'].icon,
      name: ITEMS['radiant_axe'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'skill',
      name: 'crafting',
      level: 114
    }]
  },

  titanfoil_axe: {
    produces: 'titanfoil_axe',
    recipeFor: 'crafting',
    name: 'titanfoil axe',
    id: 'titanfoil_axe',
    isHidden: true,
    category: 'woodcutting',
    timeToCraft: 60 * 60 * 1, // 60
    xp: 1000000,
    maxToCraft: 1,
    requiredCraftingLevel: 119,
    required: [{
      type: 'item',
      itemId: 'fairy_steel_essence',
      icon: ITEMS['fairy_steel_essence'].icon,
      name: ITEMS['fairy_steel_essence'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'item',
      itemId: 'cursed_essence',
      icon: ITEMS['cursed_essence'].icon,
      name: ITEMS['cursed_essence'].name,
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
      itemId: 'cursed_bar',
      icon: ITEMS['cursed_bar'].icon,
      name: ITEMS['cursed_bar'].name,
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
      type: 'item',
      itemId: 'teak_log',
      icon: ITEMS['teak_log'].icon,
      name: ITEMS['teak_log'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'item',
      itemId: 'astral_axe',
      icon: ITEMS['astral_axe'].icon,
      name: ITEMS['astral_axe'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'skill',
      name: 'crafting',
      level: 119
    }]
  },

  relicrock_axe: {
    produces: 'relicrock_axe',
    recipeFor: 'crafting',
    name: 'relicrock axe',
    id: 'relicrock_axe',
    isHidden: true,
    category: 'woodcutting',
    timeToCraft: 60 * 60 * 1, // 60
    xp: 1500000,
    maxToCraft: 1,
    requiredCraftingLevel: 124,
    required: [{
      type: 'item',
      itemId: 'elven_steel_essence',
      icon: ITEMS['elven_steel_essence'].icon,
      name: ITEMS['elven_steel_essence'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'item',
      itemId: 'cursed_essence',
      icon: ITEMS['cursed_essence'].icon,
      name: ITEMS['cursed_essence'].name,
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
      itemId: 'cursed_bar',
      icon: ITEMS['cursed_bar'].icon,
      name: ITEMS['cursed_bar'].name,
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
      type: 'item',
      itemId: 'teak_log',
      icon: ITEMS['teak_log'].icon,
      name: ITEMS['teak_log'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'item',
      itemId: 'titanfoil_axe',
      icon: ITEMS['titanfoil_axe'].icon,
      name: ITEMS['titanfoil_axe'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'skill',
      name: 'crafting',
      level: 124
    }]
  },

  eternium_axe: {
    produces: 'eternium_axe',
    recipeFor: 'crafting',
    name: 'eternium axe',
    id: 'eternium_axe',
    isHidden: true,
    category: 'woodcutting',
    timeToCraft: 60 * 60 * 1, // 60
    xp: 2500000 * 3,
    maxToCraft: 1,
    requiredCraftingLevel: 129,
    required: [{
      type: 'item',
      itemId: 'mithril_essence',
      icon: ITEMS['mithril_essence'].icon,
      name: ITEMS['mithril_essence'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'item',
      itemId: 'cursed_essence',
      icon: ITEMS['cursed_essence'].icon,
      name: ITEMS['cursed_essence'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'item',
      itemId: 'mithril_bar',
      icon: ITEMS['mithril_bar'].icon,
      name: ITEMS['mithril_bar'].name,
      amount: 25,
      consumes: true
    }, {
      type: 'item',
      itemId: 'cursed_bar',
      icon: ITEMS['cursed_bar'].icon,
      name: ITEMS['cursed_bar'].name,
      amount: 25,
      consumes: true
    }, {
      type: 'item',
      itemId: 'magic_log',
      icon: ITEMS['magic_log'].icon,
      name: ITEMS['magic_log'].name,
      amount: 50,
      consumes: true
    }, {
      type: 'item',
      itemId: 'teak_log',
      icon: ITEMS['fiery_log'].icon,
      name: ITEMS['fiery_log'].name,
      amount: 50,
      consumes: true
    }, {
      type: 'item',
      itemId: 'relicrock_axe',
      icon: ITEMS['relicrock_axe'].icon,
      name: ITEMS['relicrock_axe'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'skill',
      name: 'crafting',
      level: 129
    }]
  }, 

  prismatic_axe: {
    produces: 'prismatic_axe',
    recipeFor: 'crafting',
    name: 'prismatic axe',
    id: 'prismatic_axe',
    isHidden: true,
    category: 'woodcutting',
    timeToCraft: 60 * 60 * 1, // 60
    xp: 10000000,
    maxToCraft: 1,
    requiredCraftingLevel: 134,
    required: [{
      type: 'item',
      itemId: 'purestone_essence',
      icon: ITEMS['purestone_essence'].icon,
      name: ITEMS['purestone_essence'].name,
      amount: 3,
      consumes: true
    }, {
      type: 'item',
      itemId: 'purestone_bar',
      icon: ITEMS['purestone_bar'].icon,
      name: ITEMS['purestone_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'item',
      itemId: 'spiritroot_log',
      icon: ITEMS['spiritroot_log'].icon,
      name: ITEMS['spiritroot_log'].name,
      amount: 12,
      consumes: true
    }, {
      type: 'item',
      itemId: 'eternium_axe',
      icon: ITEMS['eternium_axe'].icon,
      name: ITEMS['eternium_axe'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'skill',
      name: 'crafting',
      level: 134
    }]
  }, 
};
