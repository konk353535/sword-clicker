import { ITEMS } from '/server/constants/items/index.js'; 

export const GOLD_CRAFTS = {
  polished_stone: {
    produces: 'polished_stone',
    recipeFor: 'crafting',
    name: 'polished stone',
    category: 'crafting',
    id: 'polished_stone',
    requiredCraftingLevel: 1,
    required: [{
      type: 'item',
      itemId: 'ore_stone',
      icon: ITEMS['ore_stone'].icon,
      name: ITEMS['ore_stone'].name,
      amount: 3,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 1
    }],
    timeToCraft: 60,
    xp: 1,
    maxToCraft: 1
  },

  copper_sculpture: {
    produces: 'copper_sculpture',
    recipeFor: 'crafting',
    name: 'copper sculpture',
    category: 'crafting',
    id: 'copper_sculpture',
    requiredCraftingLevel: 6,
    required: [{
      type: 'item',
      itemId: 'ore_copper',
      icon: ITEMS['ore_copper'].icon,
      name: ITEMS['ore_copper'].name,
      amount: 5,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 6
    }],
    timeToCraft: 60,
    xp: 1,
    maxToCraft: 30
  },

  polished_iron: {
    produces: 'polished_iron',
    recipeFor: 'crafting',
    name: 'polished iron',
    category: 'crafting',
    id: 'polished_iron',
    requiredCraftingLevel: 11,
    required: [{
      type: 'item',
      itemId: 'ore_iron',
      icon: ITEMS['ore_iron'].icon,
      name: ITEMS['ore_iron'].name,
      amount: 5,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 11
    }],
    timeToCraft: 60,
    xp: 1,
    maxToCraft: 1
  },

  steel_sculpture: {
    produces: 'steel_sculpture',
    recipeFor: 'crafting',
    name: 'steel sculpture',
    category: 'crafting',
    id: 'steel_sculpture',
    requiredCraftingLevel: 16,
    required: [{
      type: 'item',
      itemId: 'ore_steel',
      icon: ITEMS['ore_steel'].icon,
      name: ITEMS['ore_steel'].name,
      amount: 5,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 16
    }],
    timeToCraft: 60,
    xp: 1,
    maxToCraft: 30
  },

  polished_carbon: {
    produces: 'polished_carbon',
    recipeFor: 'crafting',
    name: 'polished carbon',
    category: 'crafting',
    id: 'polished_carbon',
    requiredCraftingLevel: 21,
    required: [{
      type: 'item',
      itemId: 'ore_carbon',
      icon: ITEMS['ore_carbon'].icon,
      name: ITEMS['ore_carbon'].name,
      amount: 5,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 21
    }],
    timeToCraft: 60,
    xp: 1,
    maxToCraft: 1
  },

  mithril_sculpture: {
    produces: 'mithril_sculpture',
    recipeFor: 'crafting',
    name: 'mithril sculpture',
    category: 'crafting',
    id: 'mithril_sculpture',
    requiredCraftingLevel: 26,
    required: [{
      type: 'item',
      itemId: 'ore_mithril',
      icon: ITEMS['ore_mithril'].icon,
      name: ITEMS['ore_mithril'].name,
      amount: 5,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 26
    }],
    timeToCraft: 60,
    xp: 1,
    maxToCraft: 30
  },

  polished_adamantium: {
    produces: 'polished_adamantium',
    recipeFor: 'crafting',
    name: 'polished adamantium',
    category: 'crafting',
    id: 'polished_adamantium',
    requiredCraftingLevel: 31,
    required: [{
      type: 'item',
      itemId: 'ore_adamantium',
      icon: ITEMS['ore_adamantium'].icon,
      name: ITEMS['ore_adamantium'].name,
      amount: 5,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 31
    }],
    timeToCraft: 60,
    xp: 1,
    maxToCraft: 1
  },

  orichalcum_sculpture: {
    produces: 'orichalcum_sculpture',
    recipeFor: 'crafting',
    name: 'orichalcum sculpture',
    category: 'crafting',
    id: 'orichalcum_sculpture',
    requiredCraftingLevel: 36,
    required: [{
      type: 'item',
      itemId: 'ore_orichalcum',
      icon: ITEMS['ore_orichalcum'].icon,
      name: ITEMS['ore_orichalcum'].name,
      amount: 5,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 36
    }],
    timeToCraft: 60,
    xp: 1,
    maxToCraft: 30
  },

  polished_cobalt: {
    produces: 'polished_cobalt',
    recipeFor: 'crafting',
    name: 'polished cobalt',
    category: 'crafting',
    id: 'polished_cobalt',
    requiredCraftingLevel: 41,
    required: [{
      type: 'item',
      itemId: 'ore_cobalt',
      icon: ITEMS['ore_cobalt'].icon,
      name: ITEMS['ore_cobalt'].name,
      amount: 5,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 41
    }],
    timeToCraft: 60,
    xp: 1,
    maxToCraft: 1
  },

  fairy_steel_sculpture: {
    produces: 'fairy_steel_sculpture',
    recipeFor: 'crafting',
    name: 'fairy steel sculpture',
    category: 'crafting',
    id: 'fairy_steel_sculpture',
    requiredCraftingLevel: 46,
    required: [{
      type: 'item',
      itemId: 'ore_fairy_steel',
      icon: ITEMS['ore_fairy_steel'].icon,
      name: ITEMS['ore_fairy_steel'].name,
      amount: 5,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 46
    }],
    timeToCraft: 60,
    xp: 1,
    maxToCraft: 30
  },

  polished_cursed: {
    produces: 'polished_cursed',
    recipeFor: 'crafting',
    name: 'polished cursed',
    category: 'crafting',
    id: 'polished_cursed',
    requiredCraftingLevel: 51,
    required: [{
      type: 'item',
      itemId: 'ore_cursed',
      icon: ITEMS['ore_cursed'].icon,
      name: ITEMS['ore_cursed'].name,
      amount: 5,
      consumes: true // If true, this required item will dissapear once the item is crafted
    }, {
      type: 'skill',
      name: 'crafting',
      level: 51
    }],
    timeToCraft: 60,
    xp: 1,
    maxToCraft: 1
  },

}
