import { ITEMS } from '/server/constants/items/index.js'; 

export const AMULET_CRAFTS = {
  stone_amulet: {
    produces: 'stone_amulet',
    name: 'stone amulet',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'stone_amulet',
    timeToCraft: 40, // 60
    xp: 1,
    maxToCraft: 1,
    requiredCraftingLevel: 3,
    required: [{
      type: 'item',
      itemId: 'ore_stone',
      icon: ITEMS['ore_stone'].icon,
      name: ITEMS['ore_stone'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 3
    }]
  },

  jade_amulet: {
    produces: 'jade_amulet',
    name: 'jade amulet',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'jade_amulet',
    timeToCraft: 120, // 60
    xp: 10,
    maxToCraft: 1,
    requiredCraftingLevel: 5,
    required: [{
      type: 'item',
      itemId: 'beech_log',
      icon: ITEMS['beech_log'].icon,
      name: ITEMS['beech_log'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'item',
      itemId: 'jade',
      icon: ITEMS['jade'].icon,
      name: ITEMS['jade'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 5
    }]
  },

  lapislazuli_amulet: {
    produces: 'lapislazuli_amulet',
    name: 'lapis lazuli amulet',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'lapislazuli_amulet',
    timeToCraft: 120, // 60
    xp: 10,
    maxToCraft: 1,
    requiredCraftingLevel: 15,
    required: [{
      type: 'item',
      itemId: 'ash_log',
      icon: ITEMS['ash_log'].icon,
      name: ITEMS['ash_log'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'item',
      itemId: 'lapislazuli',
      icon: ITEMS['lapislazuli'].icon,
      name: ITEMS['lapislazuli'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 15
    }]
  },
}
