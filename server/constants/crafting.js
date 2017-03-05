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
      timeToCraft: 30, // Time to craft item in seconds
      xp: 2, // Xp earned once crafted
      maxToCraft: 1 // Maximum number of this that can be crafted together
    }
  }
}
