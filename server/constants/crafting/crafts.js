import { ITEMS } from '/server/constants/items/index.js'; 
import { BAR_CRAFTS } from './crafts/bars';
import { FURNACE_CRAFTS } from './crafts/furnaces';
import { GOLD_CRAFTS } from './crafts/gold';
import { MISC_CRAFTS } from './crafts/misc';
import { ESSENCE_CRAFTS } from './crafts/essences';
import { XP_CRAFTS } from './crafts/xp';

export const CRAFTING_CRAFTS = Object.assign(ESSENCE_CRAFTS, FURNACE_CRAFTS, MISC_CRAFTS, BAR_CRAFTS, GOLD_CRAFTS, XP_CRAFTS, {

  polished_black_stone: {
    produces: 'polished_black_stone',
    recipeFor: 'crafting',
    name: 'polished black stone',
    category: 'crafting',
    id: 'polished_black_stone',
    requiredCraftingLevel: 5000,
    required: [{
      type: 'item',
      itemId: 'ore_stone',
      icon: ITEMS['ore_stone'].icon,
      name: ITEMS['ore_stone'].name,
      amount: 50,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'item',
      itemId: 'ore_coal',
      icon: ITEMS['ore_coal'].icon,
      name: ITEMS['ore_coal'].name,
      amount: 5,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'item',
      itemId: 'ore_copper',
      icon: ITEMS['ore_copper'].icon,
      name: ITEMS['ore_copper'].name,
      amount: 20,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 5000
    }],
    timeToCraft: 600,
    xp: 1,
    maxToCraft: 5
  },

  polished_blue_stone: {
    produces: 'polished_blue_stone',
    recipeFor: 'crafting',
    name: 'polished blue stone',
    category: 'crafting',
    id: 'polished_blue_stone',
    requiredCraftingLevel: 5000,
    required: [{
      type: 'item',
      itemId: 'ore_stone',
      icon: ITEMS['ore_stone'].icon,
      name: ITEMS['ore_stone'].name,
      amount: 50,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'item',
      itemId: 'ore_mithril',
      icon: ITEMS['ore_mithril'].icon,
      name: ITEMS['ore_mithril'].name,
      amount: 5,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 5000
    }],
    timeToCraft: 300,
    xp: 5,
    maxToCraft: 5
  },

  composite_wall: {
    produces: 'composite_wall',
    recipeFor: 'crafting',
    name: 'composite wall',
    category: 'crafting',
    id: 'composite_wall',
    requiredCraftingLevel: 5000,
    required: [{
      type: 'item',
      itemId: 'ore_stone',
      icon: ITEMS['ore_stone'].icon,
      name: ITEMS['ore_stone'].name,
      amount: 100,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'item',
      itemId: 'copper_bar',
      icon: ITEMS['copper_bar'].icon,
      name: ITEMS['copper_bar'].name,
      amount: 10,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'item',
      itemId: 'iron_bar',
      icon: ITEMS['iron_bar'].icon,
      name: ITEMS['iron_bar'].name,
      amount: 10,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'item',
      itemId: 'steel_bar',
      icon: ITEMS['steel_bar'].icon,
      name: ITEMS['steel_bar'].name,
      amount: 10,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 5000
    }],
    timeToCraft: 60 * 60 * 8,
    xp: 4000,
    maxToCraft: 1
  },

})
