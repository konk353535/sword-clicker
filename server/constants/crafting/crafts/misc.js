import { ITEMS } from '/server/constants/items/index.js'; 

export const MISC_CRAFTS = {
  enhancer_key: {
    produces: 'enhancer_key',
    recipeFor: 'crafting',
    name: 'enhancer key',
    category: 'crafting',
    id: 'enhancer_key',
    requiredCraftingLevel: 1000,
    required: [{
      type: 'item',
      itemId: 'ore_stone',
      icon: ITEMS['ore_stone'].icon,
      name: ITEMS['ore_stone'].name,
      amount: 10000,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'item',
      itemId: 'jade',
      icon: ITEMS['jade'].icon,
      name: ITEMS['jade'].name,
      amount: 1,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 1000
    }],
    timeToCraft: 15 * 60,
    xp: 100,
    maxToCraft: 1
  }
}
