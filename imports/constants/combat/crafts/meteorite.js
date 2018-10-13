import { ITEMS } from '/imports/constants/items/index.js'; 

export const METEORITE_CRAFTS = {
  meteorite_dagger: {
    produces: 'meteorite_dagger',
    name: 'meteorite dagger',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'meteorite_dagger',
    timeToCraft: 30 * 60 * 2,
    xp: 250000,
    maxToCraft: 1,
    tags: ['weapon'],
    requiredCraftingLevel: 80,
    required: [{
      type: 'item',
      itemId: 'orichalcum_furnace',
      icon: ITEMS['orichalcum_furnace'].icon,
      name: ITEMS['orichalcum_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'meteorite_essence',
      icon: ITEMS['meteorite_essence'].icon,
      name: ITEMS['meteorite_essence'].name,
      amount: 2,
      consumes: true
    }, {
      type: 'item',
      itemId: 'poplar_log',
      icon: ITEMS['poplar_log'].icon,
      name: ITEMS['poplar_log'].name,
      amount: 3,
      consumes: true
    }, {
      type: 'item',
      itemId: 'meteorite_bar',
      icon: ITEMS['meteorite_bar'].icon,
      name: ITEMS['meteorite_bar'].name,
      amount: 3,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 80
    }]
  },

  meteorite_spear: {
    produces: 'meteorite_spear',
    name: 'meteorite spear',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'meteorite_spear',
    timeToCraft: 60 * 60 * 2,
    xp: 500000,
    maxToCraft: 1,
    tags: ['weapon'],
    requiredCraftingLevel: 80,
    required: [{
      type: 'item',
      itemId: 'orichalcum_furnace',
      icon: ITEMS['orichalcum_furnace'].icon,
      name: ITEMS['orichalcum_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'meteorite_essence',
      icon: ITEMS['meteorite_essence'].icon,
      name: ITEMS['meteorite_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'poplar_log',
      icon: ITEMS['poplar_log'].icon,
      name: ITEMS['poplar_log'].name,
      amount: 20,
      consumes: true
    }, {
      type: 'item',
      itemId: 'meteorite_bar',
      icon: ITEMS['meteorite_bar'].icon,
      name: ITEMS['meteorite_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 80
    }]
  },

  meteorite_short_sword: {
    produces: 'meteorite_short_sword',
    name: 'meteorite short sword',
    category: 'combat',
    recipeFor: 'crafting',
    id: 'meteorite_short_sword',
    timeToCraft: 60 * 60 * 2,
    xp: 500000,
    maxToCraft: 1,
    tags: ['weapon'],
    requiredCraftingLevel: 80,
    required: [{
      type: 'item',
      itemId: 'orichalcum_furnace',
      icon: ITEMS['orichalcum_furnace'].icon,
      name: ITEMS['orichalcum_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'meteorite_essence',
      icon: ITEMS['meteorite_essence'].icon,
      name: ITEMS['meteorite_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'poplar_log',
      icon: ITEMS['poplar_log'].icon,
      name: ITEMS['poplar_log'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'item',
      itemId: 'meteorite_bar',
      icon: ITEMS['meteorite_bar'].icon,
      name: ITEMS['meteorite_bar'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 80
    }]
  },

  meteorite_long_sword: {
    produces: 'meteorite_long_sword',
    name: 'meteorite long sword',
    category: 'combat',
    recipeFor: 'crafting',
    id: 'meteorite_long_sword',
    timeToCraft: 90 * 60,
    xp: 1000000,
    maxToCraft: 1,
    tags: ['weapon'],
    requiredCraftingLevel: 80,
    required: [{
      type: 'item',
      itemId: 'orichalcum_furnace',
      icon: ITEMS['orichalcum_furnace'].icon,
      name: ITEMS['orichalcum_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'meteorite_essence',
      icon: ITEMS['meteorite_essence'].icon,
      name: ITEMS['meteorite_essence'].name,
      amount: 8,
      consumes: true
    }, {
      type: 'item',
      itemId: 'poplar_log',
      icon: ITEMS['poplar_log'].icon,
      name: ITEMS['poplar_log'].name,
      amount: 15,
      consumes: true
    }, {
      type: 'item',
      itemId: 'meteorite_bar',
      icon: ITEMS['meteorite_bar'].icon,
      name: ITEMS['meteorite_bar'].name,
      amount: 20,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 80
    }]
  },

  meteorite_battle_axe: {
    recipeFor: 'crafting',
    produces: 'meteorite_battle_axe',
    name: 'meteorite battle axe',
    category: 'combat',
    id: 'meteorite_battle_axe',
    timeToCraft: 90 * 60,
    xp: 1000000,
    maxToCraft: 1,
    tags: ['weapon'],
    requiredCraftingLevel: 80,
    required: [{
      type: 'item',
      itemId: 'orichalcum_furnace',
      icon: ITEMS['orichalcum_furnace'].icon,
      name: ITEMS['orichalcum_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'meteorite_essence',
      icon: ITEMS['meteorite_essence'].icon,
      name: ITEMS['meteorite_essence'].name,
      amount: 8,
      consumes: true
    }, {
      type: 'item',
      itemId: 'poplar_log',
      icon: ITEMS['poplar_log'].icon,
      name: ITEMS['poplar_log'].name,
      amount: 50,
      consumes: true
    }, {
      type: 'item',
      itemId: 'meteorite_bar',
      icon: ITEMS['meteorite_bar'].icon,
      name: ITEMS['meteorite_bar'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 80
    }]
  },

  meteorite_helmet: {
    recipeFor: 'crafting',
    produces: 'meteorite_helmet',
    name: 'meteorite helmet',
    category: 'combat',
    id: 'meteorite_helmet',
    timeToCraft: 60 * 60 * 2,
    xp: 500000,
    maxToCraft: 1,
    tags: ['armor'],
    requiredCraftingLevel: 80,
    required: [{
      type: 'item',
      itemId: 'orichalcum_furnace',
      icon: ITEMS['orichalcum_furnace'].icon,
      name: ITEMS['orichalcum_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'meteorite_essence',
      icon: ITEMS['meteorite_essence'].icon,
      name: ITEMS['meteorite_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'poplar_log',
      icon: ITEMS['poplar_log'].icon,
      name: ITEMS['poplar_log'].name,
      amount: 25,
      consumes: true
    }, {
      type: 'item',
      itemId: 'meteorite_bar',
      icon: ITEMS['meteorite_bar'].icon,
      name: ITEMS['meteorite_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 80
    }]
  },

  meteorite_chest_plate: {
    recipeFor: 'crafting',
    produces: 'meteorite_chest_plate',
    name: 'meteorite chest plate',
    category: 'combat',
    id: 'meteorite_chest_plate',
    timeToCraft: 60 * 60 * 2,
    xp: 500000,
    maxToCraft: 1,
    tags: ['armor'],
    requiredCraftingLevel: 80,
    required: [{
      type: 'item',
      itemId: 'orichalcum_furnace',
      icon: ITEMS['orichalcum_furnace'].icon,
      name: ITEMS['orichalcum_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'meteorite_essence',
      icon: ITEMS['meteorite_essence'].icon,
      name: ITEMS['meteorite_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'poplar_log',
      icon: ITEMS['poplar_log'].icon,
      name: ITEMS['poplar_log'].name,
      amount: 25,
      consumes: true
    }, {
      type: 'item',
      itemId: 'meteorite_bar',
      icon: ITEMS['meteorite_bar'].icon,
      name: ITEMS['meteorite_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 80
    }]
  },

  meteorite_plate_legs: {
    recipeFor: 'crafting',
    produces: 'meteorite_plate_legs',
    name: 'meteorite plate legs',
    category: 'combat',
    id: 'meteorite_plate_legs',
    timeToCraft: 60 * 60 * 2, // 60
    xp: 500000,
    maxToCraft: 1,
    tags: ['armor'],
    requiredCraftingLevel: 80,
    required: [{
      type: 'item',
      itemId: 'orichalcum_furnace',
      icon: ITEMS['orichalcum_furnace'].icon,
      name: ITEMS['orichalcum_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'meteorite_essence',
      icon: ITEMS['meteorite_essence'].icon,
      name: ITEMS['meteorite_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'poplar_log',
      icon: ITEMS['poplar_log'].icon,
      name: ITEMS['poplar_log'].name,
      amount: 25,
      consumes: true
    }, {
      type: 'item',
      itemId: 'meteorite_bar',
      icon: ITEMS['meteorite_bar'].icon,
      name: ITEMS['meteorite_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 80
    }]
  },

  meteorite_shield: {
    recipeFor: 'crafting',
    produces: 'meteorite_shield',
    name: 'meteorite shield',
    category: 'combat',
    id: 'meteorite_shield',
    timeToCraft: 60 * 60 * 2, // 60
    xp: 500000,
    maxToCraft: 1,
    tags: ['weapon'],
    requiredCraftingLevel: 80,
    required: [{
      type: 'item',
      itemId: 'orichalcum_furnace',
      icon: ITEMS['orichalcum_furnace'].icon,
      name: ITEMS['orichalcum_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'meteorite_essence',
      icon: ITEMS['meteorite_essence'].icon,
      name: ITEMS['meteorite_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'poplar_log',
      icon: ITEMS['poplar_log'].icon,
      name: ITEMS['poplar_log'].name,
      amount: 50,
      consumes: true
    }, {
      type: 'item',
      itemId: 'meteorite_bar',
      icon: ITEMS['meteorite_bar'].icon,
      name: ITEMS['meteorite_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 80
    }]
  }
};
