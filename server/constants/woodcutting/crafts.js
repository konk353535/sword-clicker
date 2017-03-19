import { ITEMS } from '/server/constants/items/index.js'; 

export const WOODCUTTING_CRAFTS = {
  primitive_axe: {
    produces: 'primitive_axe',
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
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 1
    }]
  },

  copper_axe: {
    produces: 'copper_axe',
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
      amount: 10,
      consumes: true
    }, {
      type: 'item',
      itemId: 'pine_log',
      icon: ITEMS['pine_log'].icon,
      name: ITEMS['pine_log'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 3
    }]
  }
}
