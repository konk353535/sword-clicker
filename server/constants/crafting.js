import { ITEMS } from './items';

export const CRAFTING = {
  recipes: {
    stone_furnace: {
      produces: 'stone_furnace',
      name: 'stone furnace',
      id: 'stone_furnace',
      requiredCraftingLevel: 1,
      requiredItems: [{
        itemId: 'ore_stone',
        icon: ITEMS['ore_stone'].icon,
        name: ITEMS['ore_stone'].name,
        amount: 5,
        consumes: true // If true, this required item will dissapear once the item is crafted
      }],
      timeToCraft: 15, // Time to craft item in seconds
      xp: 1, // Xp earned once crafted
      maxToCraft: 1 // Maximum number of this that can be crafted together
    },

    copper_bar: {
      produces: 'copper_bar',
      name: 'copper bar',
      id: 'copper_bar',
      requiredCraftingLevel: 1,
      timeToCraft: 10,
      xp: 5,
      maxToCraft: 10,
      requiredItems: [{
        itemId: 'stone_furnace',
        icon: ITEMS['stone_furnace'].icon,
        name: ITEMS['stone_furnace'].name,
        amount: 1,
        consumes: false
      }, {
        itemId: 'ore_coal',
        icon: ITEMS['ore_coal'].icon,
        name: ITEMS['ore_coal'].name,
        amount: 1,
        consumes: true
      }, {
        itemId: 'ore_copper',
        icon: ITEMS['ore_copper'].icon,
        name: ITEMS['ore_copper'].name,
        amount: 5,
        consumes: true
      }]
    },

    copper_dagger: {
      produces: 'copper_dagger',
      name: 'copper dagger',
      id: 'copper_dagger',
      requiredCraftingLevel: 2,
      timeToCraft: 300,
      xp: 40,
      maxToCraft: 1,
      requiredItems: [{
        itemId: 'stone_furnace',
        icon: ITEMS['stone_furnace'].icon,
        name: ITEMS['stone_furnace'].name,
        amount: 1,
        consumes: false
      }, {
        itemId: 'ore_coal',
        icon: ITEMS['ore_coal'].icon,
        name: ITEMS['ore_coal'].name,
        amount: 5,
        consumes: true
      }, {
        itemId: 'copper_bar',
        icon: ITEMS['copper_bar'].icon,
        name: ITEMS['copper_bar'].name,
        amount: 5,
        consumes: true
      }]
    },
  }
}
