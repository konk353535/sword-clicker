import { ITEMS } from '/imports/constants/items/index.js'; 

export const ARCHER_CRAFTS = {
  teak_bow: {
    produces: 'teak_bow',
    name: 'teak bow',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'teak_bow',
    isHidden: true,
    timeToCraft: 2, //2 * 60 * 60, // 60
    xp: 1, //100000,
    maxToCraft: 1,
    tags: ['weapon'],
    requiredCraftingLevel: 1,
    required: [{
      type: 'item',
      itemId: 'teak_log',
      icon: ITEMS['teak_log'].icon,
      name: ITEMS['teak_log'].name,
      amount: 15,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 1
    }]
  },

  cursed_quiver: {
    recipeFor: 'crafting',
    produces: 'cursed_quiver',
    name: 'cursed quiver',
    category: 'combat',
    id: 'cursed_quiver',
    isHidden: true,
    timeToCraft: 2, //60 * 60 * 2, // 60
    xp: 1, //2000000,
    maxToCraft: 1,
    tags: ['weapon'],
    requiredCraftingLevel: 1,
    required: [/*{
      type: 'item',
      itemId: 'elven_steel_furnace',
      icon: ITEMS['elven_steel_furnace'].icon,
      name: ITEMS['elven_steel_furnace'].name,
      amount: 1,
      consumes: false
    }, */{
      type: 'item',
      itemId: 'cursed_essence',
      icon: ITEMS['cursed_essence'].icon,
      name: ITEMS['cursed_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'teak_log',
      icon: ITEMS['teak_log'].icon,
      name: ITEMS['teak_log'].name,
      amount: 50,
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
      level: 1
    }]
  },
};
