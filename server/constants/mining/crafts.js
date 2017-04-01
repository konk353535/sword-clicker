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
      itemId: 'ore_coal',
      icon: ITEMS['ore_coal'].icon,
      name: ITEMS['ore_coal'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'item',
      itemId: 'copper_bar',
      icon: ITEMS['copper_bar'].icon,
      name: ITEMS['copper_bar'].name,
      amount: 10,
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
      itemId: 'ore_coal',
      icon: ITEMS['ore_coal'].icon,
      name: ITEMS['ore_coal'].name,
      amount: 10,
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
      itemId: 'ore_coal',
      icon: ITEMS['ore_coal'].icon,
      name: ITEMS['ore_coal'].name,
      amount: 10,
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
  }
}
