import { ITEMS } from '/imports/constants/items/index.js'; 

export const ARCHER_CRAFTS = {
  teak_bow: {
    produces: 'teak_bow',
    name: 'teak bow',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'teak_bow',
    isHidden: true,
    timeToCraft: 2 * 60 * 60, // 60
    xp: 100000,
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
};
