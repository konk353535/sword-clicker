import { ITEMS } from '/server/constants/items/index.js'; 

export const FAIRY_STEEL_CRAFTS = {
  fairy_steel_dagger: {
    produces: 'fairy_steel_dagger',
    name: 'fairy_steel dagger',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'fairy_steel_dagger',
    timeToCraft: 30 * 60 * 2,
    xp: 1700,
    maxToCraft: 1,
    requiredCraftingLevel: 85,
    required: [{
      type: 'item',
      itemId: 'meteorite_furnace',
      icon: ITEMS['meteorite_furnace'].icon,
      name: ITEMS['meteorite_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'fairy_steel_essence',
      icon: ITEMS['fairy_steel_essence'].icon,
      name: ITEMS['fairy_steel_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'tali_log',
      icon: ITEMS['tali_log'].icon,
      name: ITEMS['tali_log'].name,
      amount: 3,
      consumes: true
    }, {
      type: 'item',
      itemId: 'fairy_steel_bar',
      icon: ITEMS['fairy_steel_bar'].icon,
      name: ITEMS['fairy_steel_bar'].name,
      amount: 3,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 85
    }]
  },

  fairy_steel_spear: {
    produces: 'fairy_steel_spear',
    name: 'fairy_steel spear',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'fairy_steel_spear',
    timeToCraft: 60 * 60 * 2,
    xp: 4800,
    maxToCraft: 1,
    requiredCraftingLevel: 85,
    required: [{
      type: 'item',
      itemId: 'meteorite_furnace',
      icon: ITEMS['meteorite_furnace'].icon,
      name: ITEMS['meteorite_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'fairy_steel_essence',
      icon: ITEMS['fairy_steel_essence'].icon,
      name: ITEMS['fairy_steel_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'tali_log',
      icon: ITEMS['tali_log'].icon,
      name: ITEMS['tali_log'].name,
      amount: 20,
      consumes: true
    }, {
      type: 'item',
      itemId: 'fairy_steel_bar',
      icon: ITEMS['fairy_steel_bar'].icon,
      name: ITEMS['fairy_steel_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 85
    }]
  },

  fairy_steel_short_sword: {
    produces: 'fairy_steel_short_sword',
    name: 'fairy_steel short sword',
    category: 'combat',
    recipeFor: 'crafting',
    id: 'fairy_steel_short_sword',
    timeToCraft: 60 * 60 * 2,
    xp: 4800,
    maxToCraft: 1,
    requiredCraftingLevel: 85,
    required: [{
      type: 'item',
      itemId: 'meteorite_furnace',
      icon: ITEMS['meteorite_furnace'].icon,
      name: ITEMS['meteorite_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'fairy_steel_essence',
      icon: ITEMS['fairy_steel_essence'].icon,
      name: ITEMS['fairy_steel_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'tali_log',
      icon: ITEMS['tali_log'].icon,
      name: ITEMS['tali_log'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'item',
      itemId: 'fairy_steel_bar',
      icon: ITEMS['fairy_steel_bar'].icon,
      name: ITEMS['fairy_steel_bar'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 85
    }]
  },

  fairy_steel_long_sword: {
    produces: 'fairy_steel_long_sword',
    name: 'fairy_steel long sword',
    category: 'combat',
    recipeFor: 'crafting',
    id: 'fairy_steel_long_sword',
    timeToCraft: 90 * 60,
    xp: 5250,
    maxToCraft: 1,
    requiredCraftingLevel: 85,
    required: [{
      type: 'item',
      itemId: 'meteorite_furnace',
      icon: ITEMS['meteorite_furnace'].icon,
      name: ITEMS['meteorite_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'fairy_steel_essence',
      icon: ITEMS['fairy_steel_essence'].icon,
      name: ITEMS['fairy_steel_essence'].name,
      amount: 8,
      consumes: true
    }, {
      type: 'item',
      itemId: 'tali_log',
      icon: ITEMS['tali_log'].icon,
      name: ITEMS['tali_log'].name,
      amount: 15,
      consumes: true
    }, {
      type: 'item',
      itemId: 'fairy_steel_bar',
      icon: ITEMS['fairy_steel_bar'].icon,
      name: ITEMS['fairy_steel_bar'].name,
      amount: 20,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 85
    }]
  },

  fairy_steel_battle_axe: {
    recipeFor: 'crafting',
    produces: 'fairy_steel_battle_axe',
    name: 'fairy_steel battle axe',
    category: 'combat',
    id: 'fairy_steel_battle_axe',
    timeToCraft: 90 * 60,
    xp: 5250,
    maxToCraft: 1,
    requiredCraftingLevel: 85,
    required: [{
      type: 'item',
      itemId: 'meteorite_furnace',
      icon: ITEMS['meteorite_furnace'].icon,
      name: ITEMS['meteorite_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'fairy_steel_essence',
      icon: ITEMS['fairy_steel_essence'].icon,
      name: ITEMS['fairy_steel_essence'].name,
      amount: 8,
      consumes: true
    }, {
      type: 'item',
      itemId: 'tali_log',
      icon: ITEMS['tali_log'].icon,
      name: ITEMS['tali_log'].name,
      amount: 50,
      consumes: true
    }, {
      type: 'item',
      itemId: 'fairy_steel_bar',
      icon: ITEMS['fairy_steel_bar'].icon,
      name: ITEMS['fairy_steel_bar'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 85
    }]
  },

  fairy_steel_helmet: {
    recipeFor: 'crafting',
    produces: 'fairy_steel_helmet',
    name: 'fairy_steel helmet',
    category: 'combat',
    id: 'fairy_steel_helmet',
    timeToCraft: 60 * 60 * 2,
    xp: 4800,
    maxToCraft: 1,
    requiredCraftingLevel: 85,
    required: [{
      type: 'item',
      itemId: 'meteorite_furnace',
      icon: ITEMS['meteorite_furnace'].icon,
      name: ITEMS['meteorite_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'fairy_steel_essence',
      icon: ITEMS['fairy_steel_essence'].icon,
      name: ITEMS['fairy_steel_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'tali_log',
      icon: ITEMS['tali_log'].icon,
      name: ITEMS['tali_log'].name,
      amount: 25,
      consumes: true
    }, {
      type: 'item',
      itemId: 'fairy_steel_bar',
      icon: ITEMS['fairy_steel_bar'].icon,
      name: ITEMS['fairy_steel_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 85
    }]
  },

  fairy_steel_chest_plate: {
    recipeFor: 'crafting',
    produces: 'fairy_steel_chest_plate',
    name: 'fairy_steel chest plate',
    category: 'combat',
    id: 'fairy_steel_chest_plate',
    timeToCraft: 60 * 60 * 2,
    xp: 4800,
    maxToCraft: 1,
    requiredCraftingLevel: 85,
    required: [{
      type: 'item',
      itemId: 'meteorite_furnace',
      icon: ITEMS['meteorite_furnace'].icon,
      name: ITEMS['meteorite_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'fairy_steel_essence',
      icon: ITEMS['fairy_steel_essence'].icon,
      name: ITEMS['fairy_steel_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'tali_log',
      icon: ITEMS['tali_log'].icon,
      name: ITEMS['tali_log'].name,
      amount: 25,
      consumes: true
    }, {
      type: 'item',
      itemId: 'fairy_steel_bar',
      icon: ITEMS['fairy_steel_bar'].icon,
      name: ITEMS['fairy_steel_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 85
    }]
  },

  fairy_steel_plate_legs: {
    recipeFor: 'crafting',
    produces: 'fairy_steel_plate_legs',
    name: 'fairy_steel plate legs',
    category: 'combat',
    id: 'fairy_steel_plate_legs',
    timeToCraft: 60 * 60 * 2, // 60
    xp: 4800,
    maxToCraft: 1,
    requiredCraftingLevel: 85,
    required: [{
      type: 'item',
      itemId: 'meteorite_furnace',
      icon: ITEMS['meteorite_furnace'].icon,
      name: ITEMS['meteorite_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'fairy_steel_essence',
      icon: ITEMS['fairy_steel_essence'].icon,
      name: ITEMS['fairy_steel_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'tali_log',
      icon: ITEMS['tali_log'].icon,
      name: ITEMS['tali_log'].name,
      amount: 25,
      consumes: true
    }, {
      type: 'item',
      itemId: 'fairy_steel_bar',
      icon: ITEMS['fairy_steel_bar'].icon,
      name: ITEMS['fairy_steel_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 85
    }]
  },

  fairy_steel_shield: {
    recipeFor: 'crafting',
    produces: 'fairy_steel_shield',
    name: 'fairy_steel shield',
    category: 'combat',
    id: 'fairy_steel_shield',
    timeToCraft: 60 * 60 * 2, // 60
    xp: 4800,
    maxToCraft: 1,
    requiredCraftingLevel: 85,
    required: [{
      type: 'item',
      itemId: 'meteorite_furnace',
      icon: ITEMS['meteorite_furnace'].icon,
      name: ITEMS['meteorite_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'fairy_steel_essence',
      icon: ITEMS['fairy_steel_essence'].icon,
      name: ITEMS['fairy_steel_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'tali_log',
      icon: ITEMS['tali_log'].icon,
      name: ITEMS['tali_log'].name,
      amount: 50,
      consumes: true
    }, {
      type: 'item',
      itemId: 'fairy_steel_bar',
      icon: ITEMS['fairy_steel_bar'].icon,
      name: ITEMS['fairy_steel_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 85
    }]
  }
}
