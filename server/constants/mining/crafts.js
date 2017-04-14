import { ITEMS } from '/server/constants/items/index.js'; 

export const MINING_CRAFTS = {
  primitive_pickaxe: {
    produces: 'primitive_pickaxe',
    recipeFor: 'crafting',
    name: 'primitive pickaxe',
    id: 'primitive_pickaxe',
    category: 'mining',
    timeToCraft: 15,
    xp: 3,
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
    xp: 40,
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
      amount: 50,
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

  iron_pickaxe: {
    produces: 'iron_pickaxe',
    recipeFor: 'crafting',
    name: 'iron pickaxe',
    id: 'iron_pickaxe',
    category: 'mining',
    timeToCraft: 120, // 60
    xp: 120,
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
      amount: 25,
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
      level: 6
    }]
  },

  steel_pickaxe: {
    produces: 'steel_pickaxe',
    recipeFor: 'crafting',
    name: 'steel pickaxe',
    id: 'steel_pickaxe',
    category: 'mining',
    timeToCraft: 120, // 60
    xp: 240,
    maxToCraft: 1,
    requiredCraftingLevel: 9,
    required: [{
      type: 'item',
      itemId: 'iron_furnace',
      icon: ITEMS['iron_furnace'].icon,
      name: ITEMS['iron_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'ash_log',
      icon: ITEMS['ash_log'].icon,
      name: ITEMS['ash_log'].name,
      amount: 25,
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
      level: 9
    }]
  },

  carbon_pickaxe: {
    produces: 'carbon_pickaxe',
    recipeFor: 'crafting',
    name: 'carbon pickaxe',
    id: 'carbon_pickaxe',
    category: 'mining',
    timeToCraft: 300,
    xp: 500,
    maxToCraft: 1,
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
      itemId: 'oak_log',
      icon: ITEMS['oak_log'].icon,
      name: ITEMS['oak_log'].name,
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
      level: 9
    }]
  },


  mithril_pickaxe: {
    produces: 'mithril_pickaxe',
    recipeFor: 'crafting',
    name: 'mithril pickaxe',
    id: 'mithril_pickaxe',
    category: 'mining',
    timeToCraft: 300,
    xp: 500,
    maxToCraft: 1,
    requiredCraftingLevel: 15,
    required: [{
      type: 'item',
      itemId: 'carbon_furnace',
      icon: ITEMS['carbon_furnace'].icon,
      name: ITEMS['carbon_furnace'].name,
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
      itemId: 'maple_log',
      icon: ITEMS['maple_log'].icon,
      name: ITEMS['maple_log'].name,
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
      level: 15
    }]
  }
}
