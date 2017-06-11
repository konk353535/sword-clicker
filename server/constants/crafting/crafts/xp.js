import { ITEMS } from '/server/constants/items/index.js'; 

export const XP_CRAFTS = {
  stone_pylon: {
    produces: 'stone_pylon',
    recipeFor: 'crafting',
    name: 'stone pylon',
    category: 'crafting',
    id: 'stone_pylon',
    requiredCraftingLevel: 2,
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
      level: 2
    }],
    timeToCraft: 60,
    xp: 50,
    maxToCraft: 1
  },

  copper_wall: {
    produces: 'copper_wall',
    recipeFor: 'crafting',
    name: 'copper wall',
    category: 'crafting',
    id: 'copper_wall',
    requiredCraftingLevel: 7,
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
      level: 7
    }],
    timeToCraft: 60,
    xp: 25,
    maxToCraft: 30
  },

  iron_pylon: {
    produces: 'iron_pylon',
    recipeFor: 'crafting',
    name: 'iron pylon',
    category: 'crafting',
    id: 'iron_pylon',
    requiredCraftingLevel: 12,
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
      level: 12
    }],
    timeToCraft: 60,
    xp: 150,
    maxToCraft: 1
  },

  steel_wall: {
    produces: 'steel_wall',
    recipeFor: 'crafting',
    name: 'steel wall',
    category: 'crafting',
    id: 'steel_wall',
    requiredCraftingLevel: 17,
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
      level: 17
    }],
    timeToCraft: 60,
    xp: 75,
    maxToCraft: 30
  },

  carbon_pylon: {
    produces: 'carbon_pylon',
    recipeFor: 'crafting',
    name: 'carbon pylon',
    category: 'crafting',
    id: 'carbon_pylon',
    requiredCraftingLevel: 22,
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
      level: 22
    }],
    timeToCraft: 60,
    xp: 300,
    maxToCraft: 1
  },

  mithril_wall: {
    produces: 'mithril_wall',
    recipeFor: 'crafting',
    name: 'mithril wall',
    category: 'crafting',
    id: 'mithril_wall',
    requiredCraftingLevel: 27,
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
      level: 27
    }],
    timeToCraft: 60,
    xp: 150,
    maxToCraft: 30
  },

  adamantium_pylon: {
    produces: 'adamantium_pylon',
    recipeFor: 'crafting',
    name: 'adamantium pylon',
    category: 'crafting',
    id: 'adamantium_pylon',
    requiredCraftingLevel: 32,
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
      level: 32
    }],
    timeToCraft: 60,
    xp: 350,
    maxToCraft: 1
  },

  orichalcum_wall: {
    produces: 'orichalcum_wall',
    recipeFor: 'crafting',
    name: 'orichalcum wall',
    category: 'crafting',
    id: 'orichalcum_wall',
    requiredCraftingLevel: 37,
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
      level: 37
    }],
    timeToCraft: 60,
    xp: 175,
    maxToCraft: 30
  },

  cobalt_pylon: {
    produces: 'cobalt_pylon',
    recipeFor: 'crafting',
    name: 'cobalt pylon',
    category: 'crafting',
    id: 'cobalt_pylon',
    requiredCraftingLevel: 42,
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
      level: 42
    }],
    timeToCraft: 60,
    xp: 450,
    maxToCraft: 1
  },

  fairy_steel_wall: {
    produces: 'fairy_steel_wall',
    recipeFor: 'crafting',
    name: 'fairy steel wall',
    category: 'crafting',
    id: 'fairy_steel_wall',
    requiredCraftingLevel: 47,
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
      level: 47
    }],
    timeToCraft: 60,
    xp: 225,
    maxToCraft: 30
  },

  cursed_pylon: {
    produces: 'cursed_pylon',
    recipeFor: 'crafting',
    name: 'cursed pylon',
    category: 'crafting',
    id: 'cursed_pylon',
    requiredCraftingLevel: 52,
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
      level: 52
    }],
    timeToCraft: 60,
    xp: 600,
    maxToCraft: 1
  },
}
