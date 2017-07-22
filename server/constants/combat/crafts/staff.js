import { ITEMS } from '/server/constants/items/index.js'; 

export const STAFF_CRAFTS = {
  beech_staff: {
    produces: 'beech_staff',
    name: 'beech staff',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'beech_staff',
    timeToCraft: 60, // 60
    xp: 10,
    maxToCraft: 1,
    requiredCraftingLevel: 5,
    required: [{
      type: 'item',
      itemId: 'beech_log',
      icon: ITEMS['beech_log'].icon,
      name: ITEMS['beech_log'].name,
      amount: 15,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 5
    }]
  },

  oak_staff: {
    produces: 'oak_staff',
    name: 'oak staff',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'oak_staff',
    timeToCraft: 120, // 60
    xp: 50,
    maxToCraft: 1,
    requiredCraftingLevel: 10,
    required: [{
      type: 'item',
      itemId: 'oak_log',
      icon: ITEMS['oak_log'].icon,
      name: ITEMS['oak_log'].name,
      amount: 30,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 10
    }]
  },

  walnut_staff: {
    produces: 'walnut_staff',
    name: 'walnut staff',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'walnut_staff',
    timeToCraft: 60 * 15, // 60
    xp: 200,
    maxToCraft: 1,
    requiredCraftingLevel: 20,
    required: [{
      type: 'item',
      itemId: 'walnut_log',
      icon: ITEMS['walnut_log'].icon,
      name: ITEMS['walnut_log'].name,
      amount: 30,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 20
    }]
  },

  mahogany_staff: {
    produces: 'mahogany_staff',
    name: 'mahogany staff',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'mahogany_staff',
    timeToCraft: 60 * 60, // 60
    xp: 300,
    maxToCraft: 1,
    requiredCraftingLevel: 30,
    required: [{
      type: 'item',
      itemId: 'mahogany_log',
      icon: ITEMS['mahogany_log'].icon,
      name: ITEMS['mahogany_log'].name,
      amount: 15,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 30
    }]
  },

  black_staff: {
    produces: 'black_staff',
    name: 'black staff',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'black_staff',
    timeToCraft: 2 * 60 * 60, // 60
    xp: 600,
    maxToCraft: 1,
    requiredCraftingLevel: 40,
    required: [{
      type: 'item',
      itemId: 'black_log',
      icon: ITEMS['black_log'].icon,
      name: ITEMS['black_log'].name,
      amount: 15,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 40
    }]
  }
}
