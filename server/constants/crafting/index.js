import { CRAFTING_ITEMS as craftingItems } from './items';
import { ITEMS } from '/server/constants/items/index.js'; 

export const CRAFTING_ITEMS = craftingItems;

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
      }, {
        type: 'skill',
        name: 'crafting',
        level: 1
      }],
      timeToCraft: 15, // Time to craft item in seconds
      xp: 1, // Xp earned once crafted
      maxToCraft: 1 // Maximum number of this that can be crafted together
    },

    copper_furnace: {
      produces: 'copper_furnace',
      name: 'copper furnace',
      id: 'copper_furnace',
      requiredCraftingLevel: 5,
      required: [{
        type: 'item',
        itemId: 'copper_bar',
        icon: ITEMS['copper_bar'].icon,
        name: ITEMS['copper_bar'].name,
        amount: 15,
        consumes: true // If true, this required item will dissapear once the item is crafted
      }, {
        type: 'skill',
        name: 'crafting',
        level: 5
      }],
      timeToCraft: 120, // Time to craft item in seconds
      xp: 50, // Xp earned once crafted
      maxToCraft: 1 // Maximum number of this that can be crafted together
    },

    primitive_axe: {
      produces: 'primitive_axe',
      name: 'primitive axe',
      id: 'primitive_axe',
      timeToCraft: 60, // 60
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

    copper_axe: {
      produces: 'copper_axe',
      name: 'copper axe',
      id: 'copper_axe',
      timeToCraft: 60, // 60
      xp: 50,
      maxToCraft: 1,
      requiredCraftingLevel: 3,
      required: [{
        type: 'item',
        itemId: 'copper_bar',
        icon: ITEMS['copper_bar'].icon,
        name: ITEMS['copper_bar'].name,
        amount: 20,
        consumes: true
      }, {
        type: 'item',
        itemId: 'pine_log',
        icon: ITEMS['pine_log'].icon,
        name: ITEMS['pine_log'].name,
        amount: 30,
        consumes: true
      }, {
        type: 'skill',
        name: 'crafting',
        level: 3
      }]
    },

    copper_bar: {
      produces: 'copper_bar',
      name: 'copper bar',
      id: 'copper_bar',
      timeToCraft: 3,
      xp: 3,
      maxToCraft: 100,
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
      }, {
        type: 'skill',
        name: 'crafting',
        level: 1
      }]
    },

    iron_bar: {
      produces: 'iron_bar',
      name: 'iron bar',
      id: 'iron_bar',
      timeToCraft: 3,
      xp: 21,
      maxToCraft: 100,
      requiredCraftingLevel: 6,
      required: [{
        type: 'item',
        itemId: 'copper_furnace',
        icon: ITEMS['copper_furnace'].icon,
        name: ITEMS['copper_furnace'].name,
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
        itemId: 'ore_iron',
        icon: ITEMS['ore_iron'].icon,
        name: ITEMS['ore_iron'].name,
        amount: 5,
        consumes: true
      }, {
        type: 'skill',
        name: 'crafting',
        level: 6
      }]
    },

    copper_dagger: {
      produces: 'copper_dagger',
      name: 'copper dagger',
      id: 'copper_dagger',
      timeToCraft: 60, // 60
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
