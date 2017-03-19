import { ITEMS } from '/server/constants/items/index.js'; 

export const MINING_CRAFTS = {
  primitive_pickaxe: {
    produces: 'primitive_pickaxe',
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
  }
}
