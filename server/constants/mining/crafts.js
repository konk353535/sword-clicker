import { ITEMS } from '/server/constants/items/index.js'; 
const MINUTE = 60;

export const MINING_CRAFTS = {
  primitive_pickaxe: {
    produces: 'primitive_pickaxe',
    recipeFor: 'crafting',
    name: 'primitive pickaxe',
    id: 'primitive_pickaxe',
    category: 'mining',
    timeToCraft: 15,
    xp: 6,
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

  copper_pickaxe: {
    produces: 'copper_pickaxe',
    recipeFor: 'crafting',
    name: 'copper pickaxe',
    id: 'copper_pickaxe',
    category: 'mining',
    timeToCraft: 60, // 60
    xp: 20,
    maxToCraft: 1,
    requiredCraftingLevel: 3,
    required: [{
      type: 'item',
      itemId: 'stone_furnace',
      icon: ITEMS['stone_furnace'].icon,
      name: ITEMS['stone_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'pine_log',
      icon: ITEMS['pine_log'].icon,
      name: ITEMS['pine_log'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'item',
      itemId: 'copper_bar',
      icon: ITEMS['copper_bar'].icon,
      name: ITEMS['copper_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 3
    }]
  },

  pine_idol: {
    produces: 'pine_idol',
    recipeFor: 'crafting',
    name: 'pine idol',
    id: 'pine_idol',
    category: 'mining',
    timeToCraft: 60, // 60
    xp: 100,
    maxToCraft: 1,
    requiredCraftingLevel: 3,
    required: [{
      type: 'item',
      itemId: 'pine_log',
      icon: ITEMS['pine_log'].icon,
      name: ITEMS['pine_log'].name,
      amount: 100,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 3
    }]
  },

  tin_pickaxe: {
    produces: 'tin_pickaxe',
    recipeFor: 'crafting',
    name: 'tin pickaxe',
    id: 'tin_pickaxe',
    category: 'mining',
    timeToCraft: 1.5 * MINUTE, // 60
    xp: 30,
    maxToCraft: 1,
    requiredCraftingLevel: 6,
    required: [{
      type: 'item',
      itemId: 'copper_furnace',
      icon: ITEMS['copper_furnace'].icon,
      name: ITEMS['copper_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'beech_log',
      icon: ITEMS['beech_log'].icon,
      name: ITEMS['beech_log'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'item',
      itemId: 'tin_bar',
      icon: ITEMS['tin_bar'].icon,
      name: ITEMS['tin_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 6
    }]
  },

  bronze_pickaxe: {
    produces: 'bronze_pickaxe',
    recipeFor: 'crafting',
    name: 'bronze pickaxe',
    id: 'bronze_pickaxe',
    category: 'mining',
    timeToCraft: 2 * MINUTE, // 60
    xp: 45,
    maxToCraft: 1,
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
      itemId: 'ash_log',
      icon: ITEMS['ash_log'].icon,
      name: ITEMS['ash_log'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'item',
      itemId: 'bronze_bar',
      icon: ITEMS['bronze_bar'].icon,
      name: ITEMS['bronze_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 10
    }]
  },

  ash_idol: {
    produces: 'ash_idol',
    recipeFor: 'crafting',
    name: 'ash idol',
    id: 'ash_idol',
    category: 'mining',
    timeToCraft: 2 * MINUTE, // 60
    xp: 450,
    maxToCraft: 1,
    requiredCraftingLevel: 10,
    required: [{
      type: 'item',
      itemId: 'ash_log',
      icon: ITEMS['ash_log'].icon,
      name: ITEMS['ash_log'].name,
      amount: 100,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 10
    }]
  },

  iron_pickaxe: {
    produces: 'iron_pickaxe',
    recipeFor: 'crafting',
    name: 'iron pickaxe',
    id: 'iron_pickaxe',
    category: 'mining',
    timeToCraft: 3 * MINUTE, // 60
    xp: 65,
    maxToCraft: 1,
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
      itemId: 'oak_log',
      icon: ITEMS['oak_log'].icon,
      name: ITEMS['oak_log'].name,
      amount: 15,
      consumes: true
    }, {
      type: 'item',
      itemId: 'iron_bar',
      icon: ITEMS['iron_bar'].icon,
      name: ITEMS['iron_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 15
    }]
  },

  silver_pickaxe: {
    produces: 'silver_pickaxe',
    recipeFor: 'crafting',
    name: 'silver pickaxe',
    id: 'silver_pickaxe',
    category: 'mining',
    timeToCraft: 4 * MINUTE, // 60
    xp: 90,
    maxToCraft: 1,
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
      itemId: 'silver_essence',
      icon: ITEMS['silver_essence'].icon,
      name: ITEMS['silver_essence'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'item',
      itemId: 'maple_log',
      icon: ITEMS['maple_log'].icon,
      name: ITEMS['maple_log'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'item',
      itemId: 'silver_bar',
      icon: ITEMS['silver_bar'].icon,
      name: ITEMS['silver_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 20
    }]
  },

  maple_idol: {
    produces: 'maple_idol',
    recipeFor: 'crafting',
    name: 'maple idol',
    id: 'maple_idol',
    category: 'mining',
    timeToCraft: 4 * MINUTE, // 60
    xp: 900,
    maxToCraft: 1,
    requiredCraftingLevel: 20,
    required: [{
      type: 'item',
      itemId: 'maple_log',
      icon: ITEMS['maple_log'].icon,
      name: ITEMS['maple_log'].name,
      amount: 100,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 20
    }]
  },

  gold_pickaxe: {
    produces: 'gold_pickaxe',
    recipeFor: 'crafting',
    name: 'gold pickaxe',
    id: 'gold_pickaxe',
    category: 'mining',
    timeToCraft: 5 * MINUTE, // 60
    xp: 120,
    maxToCraft: 1,
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
      itemId: 'gold_essence',
      icon: ITEMS['gold_essence'].icon,
      name: ITEMS['gold_essence'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'item',
      itemId: 'walnut_log',
      icon: ITEMS['walnut_log'].icon,
      name: ITEMS['walnut_log'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'item',
      itemId: 'gold_bar',
      icon: ITEMS['gold_bar'].icon,
      name: ITEMS['gold_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 25
    }]
  },

  carbon_pickaxe: {
    produces: 'carbon_pickaxe',
    recipeFor: 'crafting',
    name: 'carbon pickaxe',
    id: 'carbon_pickaxe',
    category: 'mining',
    timeToCraft: 5 * MINUTE,
    xp: 180,
    maxToCraft: 1,
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
      itemId: 'carbon_essence',
      icon: ITEMS['carbon_essence'].icon,
      name: ITEMS['carbon_essence'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'item',
      itemId: 'cherry_log',
      icon: ITEMS['cherry_log'].icon,
      name: ITEMS['cherry_log'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'item',
      itemId: 'carbon_bar',
      icon: ITEMS['carbon_bar'].icon,
      name: ITEMS['carbon_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 30
    }]
  },

  cherry_idol: {
    produces: 'cherry_idol',
    recipeFor: 'crafting',
    name: 'cherry idol',
    id: 'cherry_idol',
    category: 'mining',
    timeToCraft: 5 * MINUTE,
    xp: 1800,
    maxToCraft: 1,
    requiredCraftingLevel: 30,
    required: [{
      type: 'item',
      itemId: 'cherry_log',
      icon: ITEMS['cherry_log'].icon,
      name: ITEMS['cherry_log'].name,
      amount: 100,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 30
    }]
  },

  steel_pickaxe: {
    produces: 'steel_pickaxe',
    recipeFor: 'crafting',
    name: 'steel pickaxe',
    id: 'steel_pickaxe',
    category: 'mining',
    timeToCraft: 6 * MINUTE, // 60
    xp: 280,
    maxToCraft: 1,
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
      itemId: 'steel_essence',
      icon: ITEMS['steel_essence'].icon,
      name: ITEMS['steel_essence'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'item',
      itemId: 'mahogany_log',
      icon: ITEMS['mahogany_log'].icon,
      name: ITEMS['mahogany_log'].name,
      amount: 15,
      consumes: true
    }, {
      type: 'item',
      itemId: 'steel_bar',
      icon: ITEMS['steel_bar'].icon,
      name: ITEMS['steel_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 35
    }]
  },

  platinum_pickaxe: {
    produces: 'platinum_pickaxe',
    recipeFor: 'crafting',
    name: 'platinum pickaxe',
    id: 'platinum_pickaxe',
    category: 'mining',
    timeToCraft: 7 * MINUTE,
    xp: 320,
    maxToCraft: 1,
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
      itemId: 'platinum_essence',
      icon: ITEMS['platinum_essence'].icon,
      name: ITEMS['platinum_essence'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'item',
      itemId: 'elk_log',
      icon: ITEMS['elk_log'].icon,
      name: ITEMS['elk_log'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'item',
      itemId: 'platinum_bar',
      icon: ITEMS['platinum_bar'].icon,
      name: ITEMS['platinum_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 40
    }]
  },

  elk_idol: {
    produces: 'elk_idol',
    recipeFor: 'crafting',
    name: 'elk idol',
    id: 'elk_idol',
    category: 'mining',
    timeToCraft: 7 * MINUTE,
    xp: 3200,
    maxToCraft: 1,
    requiredCraftingLevel: 40,
    required: [{
      type: 'item',
      itemId: 'elk_log',
      icon: ITEMS['elk_log'].icon,
      name: ITEMS['elk_log'].name,
      amount: 100,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 40
    }]
  },

  titanium_pickaxe: {
    produces: 'titanium_pickaxe',
    recipeFor: 'crafting',
    name: 'titanium pickaxe',
    id: 'titanium_pickaxe',
    category: 'mining',
    timeToCraft: 8 * MINUTE,
    xp: 380,
    maxToCraft: 1,
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
      itemId: 'titanium_essence',
      icon: ITEMS['titanium_essence'].icon,
      name: ITEMS['titanium_essence'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'item',
      itemId: 'black_log',
      icon: ITEMS['black_log'].icon,
      name: ITEMS['black_log'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'item',
      itemId: 'titanium_bar',
      icon: ITEMS['titanium_bar'].icon,
      name: ITEMS['titanium_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 45
    }]
  },

  tungsten_pickaxe: {
    produces: 'tungsten_pickaxe',
    recipeFor: 'crafting',
    name: 'tungsten pickaxe',
    id: 'tungsten_pickaxe',
    category: 'mining',
    timeToCraft: 9 * MINUTE,
    xp: 450,
    maxToCraft: 1,
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
      itemId: 'tungsten_essence',
      icon: ITEMS['tungsten_essence'].icon,
      name: ITEMS['tungsten_essence'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'item',
      itemId: 'blue_gum_log',
      icon: ITEMS['blue_gum_log'].icon,
      name: ITEMS['blue_gum_log'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'item',
      itemId: 'tungsten_bar',
      icon: ITEMS['tungsten_bar'].icon,
      name: ITEMS['tungsten_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 50
    }]
  },

  blue_gum_idol: {
    produces: 'blue_gum_idol',
    recipeFor: 'crafting',
    name: 'blue gum idol',
    id: 'blue_gum_idol',
    category: 'mining',
    timeToCraft: 9 * MINUTE,
    xp: 4500,
    maxToCraft: 1,
    requiredCraftingLevel: 50,
    required: [{
      type: 'item',
      itemId: 'blue_gum_log',
      icon: ITEMS['blue_gum_log'].icon,
      name: ITEMS['blue_gum_log'].name,
      amount: 100,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 50
    }]
  },

  obsidian_pickaxe: {
    produces: 'obsidian_pickaxe',
    recipeFor: 'crafting',
    name: 'obsidian pickaxe',
    id: 'obsidian_pickaxe',
    category: 'mining',
    timeToCraft: 10 * MINUTE,
    xp: 550,
    maxToCraft: 1,
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
      itemId: 'obsidian_essence',
      icon: ITEMS['obsidian_essence'].icon,
      name: ITEMS['obsidian_essence'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'item',
      itemId: 'cedar_log',
      icon: ITEMS['cedar_log'].icon,
      name: ITEMS['cedar_log'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'item',
      itemId: 'obsidian_bar',
      icon: ITEMS['obsidian_bar'].icon,
      name: ITEMS['obsidian_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 55
    }]
  },

  cobalt_pickaxe: {
    produces: 'cobalt_pickaxe',
    recipeFor: 'crafting',
    name: 'cobalt pickaxe',
    id: 'cobalt_pickaxe',
    category: 'mining',
    timeToCraft: 11 * MINUTE,
    xp: 650,
    maxToCraft: 1,
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
      itemId: 'cobalt_essence',
      icon: ITEMS['cobalt_essence'].icon,
      name: ITEMS['cobalt_essence'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'item',
      itemId: 'denya_log',
      icon: ITEMS['denya_log'].icon,
      name: ITEMS['denya_log'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'item',
      itemId: 'cobalt_bar',
      icon: ITEMS['cobalt_bar'].icon,
      name: ITEMS['cobalt_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 60
    }]
  },

  denya_idol: {
    produces: 'denya_idol',
    recipeFor: 'crafting',
    name: 'denya idol',
    id: 'denya_idol',
    category: 'mining',
    timeToCraft: 11 * MINUTE,
    xp: 6500,
    maxToCraft: 1,
    requiredCraftingLevel: 60,
    required: [{
      type: 'item',
      itemId: 'denya_log',
      icon: ITEMS['denya_log'].icon,
      name: ITEMS['denya_log'].name,
      amount: 100,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 60
    }]
  },

  mithril_pickaxe: {
    produces: 'mithril_pickaxe',
    recipeFor: 'crafting',
    name: 'mithril pickaxe',
    id: 'mithril_pickaxe',
    category: 'mining',
    timeToCraft: 12 * MINUTE,
    xp: 850,
    maxToCraft: 1,
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
      itemId: 'mithril_essence',
      icon: ITEMS['mithril_essence'].icon,
      name: ITEMS['mithril_essence'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'item',
      itemId: 'gombe_log',
      icon: ITEMS['gombe_log'].icon,
      name: ITEMS['gombe_log'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'item',
      itemId: 'mithril_bar',
      icon: ITEMS['mithril_bar'].icon,
      name: ITEMS['mithril_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 65
    }]
  },

  adamantium_pickaxe: {
    produces: 'adamantium_pickaxe',
    recipeFor: 'crafting',
    name: 'adamantium pickaxe',
    id: 'adamantium_pickaxe',
    category: 'mining',
    timeToCraft: 11 * MINUTE,
    xp: 950,
    maxToCraft: 1,
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
      itemId: 'adamantium_essence',
      icon: ITEMS['adamantium_essence'].icon,
      name: ITEMS['adamantium_essence'].name,
      amount: 1,
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
      itemId: 'adamantium_bar',
      icon: ITEMS['adamantium_bar'].icon,
      name: ITEMS['adamantium_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 70
    }]
  },

  hickory_idol: {
    produces: 'hickory_idol',
    recipeFor: 'crafting',
    name: 'hickory idol',
    id: 'hickory_idol',
    category: 'mining',
    timeToCraft: 11 * MINUTE,
    xp: 9500,
    maxToCraft: 1,
    requiredCraftingLevel: 70,
    required: [{
      type: 'item',
      itemId: 'hickory_log',
      icon: ITEMS['hickory_log'].icon,
      name: ITEMS['hickory_log'].name,
      amount: 100,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 70
    }]
  },

  orichalcum_pickaxe: {
    produces: 'orichalcum_pickaxe',
    recipeFor: 'crafting',
    name: 'orichalcum pickaxe',
    id: 'orichalcum_pickaxe',
    category: 'mining',
    timeToCraft: 15 * MINUTE,
    xp: 1000,
    maxToCraft: 1,
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
      itemId: 'orichalcum_essence',
      icon: ITEMS['orichalcum_essence'].icon,
      name: ITEMS['orichalcum_essence'].name,
      amount: 1,
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
      itemId: 'orichalcum_bar',
      icon: ITEMS['orichalcum_bar'].icon,
      name: ITEMS['orichalcum_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 75
    }]
  },

  meteorite_pickaxe: {
    produces: 'meteorite_pickaxe',
    recipeFor: 'crafting',
    name: 'meteorite pickaxe',
    id: 'meteorite_pickaxe',
    category: 'mining',
    timeToCraft: 20 * MINUTE,
    xp: 1500,
    maxToCraft: 1,
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
      itemId: 'meteorite_essence',
      icon: ITEMS['meteorite_essence'].icon,
      name: ITEMS['meteorite_essence'].name,
      amount: 1,
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
      itemId: 'meteorite_bar',
      icon: ITEMS['meteorite_bar'].icon,
      name: ITEMS['meteorite_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 80
    }]
  },

  poplar_idol: {
    produces: 'poplar_idol',
    recipeFor: 'crafting',
    name: 'poplar idol',
    id: 'poplar_idol',
    category: 'mining',
    timeToCraft: 20 * MINUTE,
    xp: 15000,
    maxToCraft: 1,
    requiredCraftingLevel: 80,
    required: [{
      type: 'item',
      itemId: 'poplar_log',
      icon: ITEMS['poplar_log'].icon,
      name: ITEMS['poplar_log'].name,
      amount: 100,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 80
    }]
  },

  fairy_steel_pickaxe: {
    produces: 'fairy_steel_pickaxe',
    recipeFor: 'crafting',
    name: 'fairy steel pickaxe',
    id: 'fairy_steel_pickaxe',
    category: 'mining',
    timeToCraft: 30 * MINUTE,
    xp: 1750,
    maxToCraft: 1,
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
      itemId: 'fairy_steel_essence',
      icon: ITEMS['fairy_steel_essence'].icon,
      name: ITEMS['fairy_steel_essence'].name,
      amount: 1,
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
      itemId: 'fairy_steel_bar',
      icon: ITEMS['fairy_steel_bar'].icon,
      name: ITEMS['fairy_steel_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 85
    }]
  },

  elven_steel_pickaxe: {
    produces: 'elven_steel_pickaxe',
    recipeFor: 'crafting',
    name: 'elven steel pickaxe',
    id: 'elven_steel_pickaxe',
    category: 'mining',
    timeToCraft: 45 * MINUTE,
    xp: 2250,
    maxToCraft: 1,
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
      itemId: 'elven_steel_essence',
      icon: ITEMS['elven_steel_essence'].icon,
      name: ITEMS['elven_steel_essence'].name,
      amount: 1,
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
      itemId: 'elven_steel_bar',
      icon: ITEMS['elven_steel_bar'].icon,
      name: ITEMS['elven_steel_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 90
    }]
  },

  willow_idol: {
    produces: 'willow_idol',
    recipeFor: 'crafting',
    name: 'willow idol',
    id: 'willow_idol',
    category: 'mining',
    timeToCraft: 45 * MINUTE,
    xp: 22500,
    maxToCraft: 1,
    requiredCraftingLevel: 90,
    required: [{
      type: 'item',
      itemId: 'willow_log',
      icon: ITEMS['willow_log'].icon,
      name: ITEMS['willow_log'].name,
      amount: 100,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 90
    }]
  },

  cursed_pickaxe: {
    produces: 'cursed_pickaxe',
    recipeFor: 'crafting',
    name: 'cursed pickaxe',
    id: 'cursed_pickaxe',
    category: 'mining',
    timeToCraft: 60 * MINUTE,
    xp: 3000,
    maxToCraft: 1,
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
      itemId: 'cursed_essence',
      icon: ITEMS['cursed_essence'].icon,
      name: ITEMS['cursed_essence'].name,
      amount: 1,
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
      itemId: 'cursed_bar',
      icon: ITEMS['cursed_bar'].icon,
      name: ITEMS['cursed_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 95
    }]
  }
}
