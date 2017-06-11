import { ITEMS } from '/server/constants/items/index.js'; 

export const BAR_CRAFTS = {
  copper_bar: {
    produces: 'copper_bar',
    recipeFor: 'crafting',
    name: 'copper bar',
    category: 'crafting',
    id: 'copper_bar',
    timeToCraft: 3,
    xp: 2,
    maxToCraft: 100,
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
      amount: 1,
      consumes: true
    }, {
      type: 'item',
      itemId: 'ore_copper',
      icon: ITEMS['ore_copper'].icon,
      name: ITEMS['ore_copper'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 2
    }]
  },

  iron_bar: {
    produces: 'iron_bar',
    recipeFor: 'crafting',
    name: 'iron bar',
    id: 'iron_bar',
    category: 'crafting',
    timeToCraft: 6,
    xp: 9,
    maxToCraft: 100,
    requiredCraftingLevel: 5,
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
      amount: 1,
      consumes: true
    }, {
      type: 'item',
      itemId: 'ore_iron',
      icon: ITEMS['ore_iron'].icon,
      name: ITEMS['ore_iron'].name,
      amount: 2,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 5
    }]
  },

  steel_bar: {
    produces: 'steel_bar',
    recipeFor: 'crafting',
    name: 'steel bar',
    id: 'steel_bar',
    category: 'crafting',
    timeToCraft: 10,
    xp: 15,
    maxToCraft: 100,
    requiredCraftingLevel: 8,
    required: [{
      type: 'item',
      itemId: 'iron_furnace',
      icon: ITEMS['iron_furnace'].icon,
      name: ITEMS['iron_furnace'].name,
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
      itemId: 'ore_steel',
      icon: ITEMS['ore_steel'].icon,
      name: ITEMS['ore_steel'].name,
      amount: 2,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 8
    }]
  },

  carbon_bar: {
    produces: 'carbon_bar',
    recipeFor: 'crafting',
    name: 'carbon bar',
    id: 'carbon_bar',
    category: 'crafting',
    timeToCraft: 10,
    xp: 18,
    maxToCraft: 100,
    requiredCraftingLevel: 11,
    required: [{
      type: 'item',
      itemId: 'steel_furnace',
      icon: ITEMS['steel_furnace'].icon,
      name: ITEMS['steel_furnace'].name,
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
      itemId: 'ore_carbon',
      icon: ITEMS['ore_carbon'].icon,
      name: ITEMS['ore_carbon'].name,
      amount: 2,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 11
    }]
  },

  mithril_bar: {
    produces: 'mithril_bar',
    recipeFor: 'crafting',
    name: 'mithril bar',
    id: 'mithril_bar',
    category: 'crafting',
    timeToCraft: 10,
    xp: 24,
    maxToCraft: 150,
    requiredCraftingLevel: 14,
    required: [{
      type: 'item',
      itemId: 'carbon_furnace',
      icon: ITEMS['carbon_furnace'].icon,
      name: ITEMS['carbon_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'ore_mithril',
      icon: ITEMS['ore_mithril'].icon,
      name: ITEMS['ore_mithril'].name,
      amount: 2,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 14
    }]
  },

  adamantium_bar: {
    produces: 'adamantium_bar',
    recipeFor: 'crafting',
    name: 'adamantium bar',
    id: 'adamantium_bar',
    category: 'crafting',
    timeToCraft: 30,
    xp: 35,
    maxToCraft: 100,
    requiredCraftingLevel: 20,
    required: [{
      type: 'item',
      itemId: 'mithril_furnace',
      icon: ITEMS['mithril_furnace'].icon,
      name: ITEMS['mithril_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'ore_adamantium',
      icon: ITEMS['ore_adamantium'].icon,
      name: ITEMS['ore_adamantium'].name,
      amount: 2,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 20
    }]
  },

  orichalcum_bar: {
    produces: 'orichalcum_bar',
    recipeFor: 'crafting',
    name: 'orichalcum bar',
    id: 'orichalcum_bar',
    category: 'crafting',
    timeToCraft: 40,
    xp: 39,
    maxToCraft: 100,
    requiredCraftingLevel: 25,
    required: [{
      type: 'item',
      itemId: 'adamantium_furnace',
      icon: ITEMS['adamantium_furnace'].icon,
      name: ITEMS['adamantium_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'ore_orichalcum',
      icon: ITEMS['ore_orichalcum'].icon,
      name: ITEMS['ore_orichalcum'].name,
      amount: 2,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 25
    }]
  },

  cobalt_bar: {
    produces: 'cobalt_bar',
    recipeFor: 'crafting',
    name: 'cobalt bar',
    id: 'cobalt_bar',
    category: 'crafting',
    timeToCraft: 50,
    xp: 42,
    maxToCraft: 100,
    requiredCraftingLevel: 30,
    required: [{
      type: 'item',
      itemId: 'orichalcum_furnace',
      icon: ITEMS['orichalcum_furnace'].icon,
      name: ITEMS['orichalcum_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'ore_cobalt',
      icon: ITEMS['ore_cobalt'].icon,
      name: ITEMS['ore_cobalt'].name,
      amount: 2,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 30
    }]
  },

  fairy_steel_bar: {
    produces: 'fairy_steel_bar',
    recipeFor: 'crafting',
    name: 'fairy_steel bar',
    id: 'fairy_steel_bar',
    category: 'crafting',
    timeToCraft: 50,
    xp: 46,
    maxToCraft: 100,
    requiredCraftingLevel: 35,
    required: [{
      type: 'item',
      itemId: 'cobalt_furnace',
      icon: ITEMS['cobalt_furnace'].icon,
      name: ITEMS['cobalt_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'ore_fairy_steel',
      icon: ITEMS['ore_fairy_steel'].icon,
      name: ITEMS['ore_fairy_steel'].name,
      amount: 2,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 35
    }]
  },

  cursed_bar: {
    produces: 'cursed_bar',
    recipeFor: 'crafting',
    name: 'cursed bar',
    id: 'cursed_bar',
    category: 'crafting',
    timeToCraft: 70,
    xp: 51,
    maxToCraft: 100,
    requiredCraftingLevel: 40,
    required: [{
      type: 'item',
      itemId: 'fairy_steel_furnace',
      icon: ITEMS['fairy_steel_furnace'].icon,
      name: ITEMS['fairy_steel_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'ore_cursed',
      icon: ITEMS['ore_cursed'].icon,
      name: ITEMS['ore_cursed'].name,
      amount: 2,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 40
    }]
  }
}
