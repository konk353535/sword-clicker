import { ITEMS } from '/server/constants/items/index.js'; 

export const MISC_CRAFTS = {

  adventure_token: {
    produces: 'adventure_token',
    recipeFor: 'crafting',
    name: 'adventure token',
    category: 'crafting',
    id: 'adventure_token',
    requiredCraftingLevel: 15,
    required: [{
      type: 'item',
      itemId: 'ore_stone',
      icon: ITEMS['ore_stone'].icon,
      name: ITEMS['ore_stone'].name,
      amount: 75,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'item',
      itemId: 'cactus',
      icon: ITEMS['cactus'].icon,
      name: ITEMS['cactus'].name,
      amount: 1,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 15
    }],
    timeToCraft: 1 * 60,
    xp: 10,
    maxToCraft: 100
  },

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
  },

  thirsty_fangs_1_tome: {
    produces: 'thirsty_fangs_1_tome',
    recipeFor: 'crafting',
    name: 'thirsty fangs lv 1',
    category: 'combat',
    id: 'thirsty_fangs_1_tome',
    requiredCraftingLevel: 30,
    isHidden: true,
    required: [{
      type: 'item',
      itemId: 'tamarind_honey',
      icon: ITEMS['tamarind_honey'].icon,
      name: ITEMS['tamarind_honey'].name,
      amount: 1,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'item',
      itemId: 'lettice',
      icon: ITEMS['lettice'].icon,
      name: ITEMS['lettice'].name,
      amount: 100,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'item',
      itemId: 'silver_wall',
      icon: ITEMS['silver_wall'].icon,
      name: ITEMS['silver_wall'].name,
      amount: 200,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 30
    }],
    timeToCraft: 15 * 60,
    xp: 100,
    maxToCraft: 1
  }
}
