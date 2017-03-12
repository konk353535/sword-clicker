import { ITEMS } from './items';

export const CRAFTING = {
  recipes: {
    stone_furnace: {
      produces: 'stone_furnace',
      name: 'stone furnace',
      id: 'stone_furnace',
      requiredCraftingLevel: 1,
      required: [{
        type: 'item',
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

    primitive_axe: {
      produces: 'primitive_axe',
      name: 'primitive axe',
      id: 'primitive_axe',
      timeToCraft: 60,
      xp: 10,
      maxToCraft: 1,
      requiredCraftingLevel: 2,
      required: [{
        type: 'item',
        itemId: 'ore_stone',
        icon: ITEMS['ore_stone'].icon,
        name: ITEMS['ore_stone'].name,
        amount: 25,
        consumes: true
      }, {
        type: 'gold',
        amount: 10,
        consumes: true
      }, {
        type: 'skill',
        name: 'crafting',
        level: 2
      }]
    },

    copper_bar: {
      produces: 'copper_bar',
      name: 'copper bar',
      id: 'copper_bar',
      timeToCraft: 10,
      xp: 5,
      maxToCraft: 10,
      requiredCraftingLevel: 1,
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
        amount: 1,
        consumes: true
      }, {
        type: 'item',
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
      timeToCraft: 300,
      xp: 40,
      maxToCraft: 1,
      requiredCraftingLevel: 2,
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
        amount: 5,
        consumes: true
      }, {
        type: 'skill',
        name: 'crafting',
        level: 2
      }]
    },
  }
}
