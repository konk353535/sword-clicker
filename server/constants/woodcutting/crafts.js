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
    xp: 50,
    maxToCraft: 1,
    requiredCraftingLevel: 3,
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
      level: 3
    }]
  },

  iron_axe: {
    produces: 'iron_axe',
    recipeFor: 'crafting',
    name: 'iron axe',
    id: 'iron_axe',
    category: 'woodcutting',
    timeToCraft: 120, // 60
    xp: 150,
    maxToCraft: 1,
    requiredCraftingLevel: 6,
    required: [{
      type: 'item',
      itemId: 'iron_bar',
      icon: ITEMS['iron_bar'].icon,
      name: ITEMS['iron_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'item',
      itemId: 'beech_log',
      icon: ITEMS['beech_log'].icon,
      name: ITEMS['beech_log'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 6
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
    requiredCraftingLevel: 9,
    required: [{
      type: 'item',
      itemId: 'steel_bar',
      icon: ITEMS['steel_bar'].icon,
      name: ITEMS['steel_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'item',
      itemId: 'ash_log',
      icon: ITEMS['ash_log'].icon,
      name: ITEMS['ash_log'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 9
    }]
  },

  carbon_axe: {
    produces: 'carbon_axe',
    recipeFor: 'crafting',
    name: 'carbon axe',
    id: 'carbon_axe',
    category: 'woodcutting',
    timeToCraft: 300, // 60
    xp: 500,
    maxToCraft: 1,
    requiredCraftingLevel: 12,
    required: [{
      type: 'item',
      itemId: 'carbon_bar',
      icon: ITEMS['carbon_bar'].icon,
      name: ITEMS['carbon_bar'].name,
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
      level: 11
    }]
  },

  mithril_axe: {
    produces: 'mithril_axe',
    recipeFor: 'crafting',
    name: 'mithril axe',
    id: 'mithril_axe',
    category: 'woodcutting',
    timeToCraft: 60 * 60, // 60
    xp: 1000,
    maxToCraft: 1,
    requiredCraftingLevel: 15,
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
      itemId: 'maple_log',
      icon: ITEMS['maple_log'].icon,
      name: ITEMS['maple_log'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 15
    }]
  },

  adamantium_axe: {
    produces: 'adamantium_axe',
    recipeFor: 'crafting',
    name: 'adamantium axe',
    id: 'adamantium_axe',
    category: 'woodcutting',
    timeToCraft: 60 * 60 * 2, // 60
    xp: 1500,
    maxToCraft: 1,
    requiredCraftingLevel: 20,
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
      itemId: 'walnut_log',
      icon: ITEMS['walnut_log'].icon,
      name: ITEMS['walnut_log'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 20
    }]
  },

  orichalcum_axe: {
    produces: 'orichalcum_axe',
    recipeFor: 'crafting',
    name: 'orichalcum axe',
    id: 'orichalcum_axe',
    category: 'woodcutting',
    timeToCraft: 60 * 60 * 4, // 60
    xp: 3000,
    maxToCraft: 1,
    requiredCraftingLevel: 25,
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
      itemId: 'cherry_log',
      icon: ITEMS['cherry_log'].icon,
      name: ITEMS['cherry_log'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 25
    }]
  },

  cobalt_axe: {
    produces: 'cobalt_axe',
    recipeFor: 'crafting',
    name: 'cobalt axe',
    id: 'cobalt_axe',
    category: 'woodcutting',
    timeToCraft: 60 * 60 * 5, // 60
    xp: 4500,
    maxToCraft: 1,
    requiredCraftingLevel: 30,
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
      itemId: 'mahogany_log',
      icon: ITEMS['mahogany_log'].icon,
      name: ITEMS['mahogany_log'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 30
    }]
  },

  fairy_steel_axe: {
    produces: 'fairy_steel_axe',
    recipeFor: 'crafting',
    name: 'fairy_steel axe',
    id: 'fairy_steel_axe',
    category: 'woodcutting',
    timeToCraft: 60 * 60 * 6, // 60
    xp: 4500,
    maxToCraft: 1,
    requiredCraftingLevel: 35,
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
      itemId: 'elk_log',
      icon: ITEMS['elk_log'].icon,
      name: ITEMS['elk_log'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 35
    }]
  },

  cursed_axe: {
    produces: 'cursed_axe',
    recipeFor: 'crafting',
    name: 'cursed axe',
    id: 'cursed_axe',
    category: 'woodcutting',
    timeToCraft: 60 * 60 * 6, // 60
    xp: 4500,
    maxToCraft: 1,
    requiredCraftingLevel: 40,
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
      itemId: 'fiery_log',
      icon: ITEMS['fiery_log'].icon,
      name: ITEMS['fiery_log'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 40
    }]
  }
}
