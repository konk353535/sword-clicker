import { ITEMS } from '/server/constants/items/index.js'; 

export const SILVER_CRAFTS = {
  silver_dagger: {
    produces: 'silver_dagger',
    name: 'silver dagger',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'silver_dagger',
    timeToCraft: 120, // 60
    xp: 60,
    maxToCraft: 1,
    requiredCraftingLevel: 20,
    required: [{
      type: 'item',
      itemId: 'iron_furnace',
      icon: ITEMS['iron_furnace'].icon,
      name: ITEMS['iron_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'silver_essence',
      icon: ITEMS['silver_essence'].icon,
      name: ITEMS['silver_essence'].name,
      amount: 2,
      consumes: true
    }, {
      type: 'item',
      itemId: 'maple_log',
      icon: ITEMS['maple_log'].icon,
      name: ITEMS['maple_log'].name,
      amount: 3,
      consumes: true
    }, {
      type: 'item',
      itemId: 'silver_bar',
      icon: ITEMS['silver_bar'].icon,
      name: ITEMS['silver_bar'].name,
      amount: 3,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 20
    }]
  },

  silver_spear: {
    produces: 'silver_spear',
    name: 'silver spear',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'silver_spear',
    timeToCraft: 180, // 60
    xp: 120,
    maxToCraft: 1,
    requiredCraftingLevel: 20,
    required: [{
      type: 'item',
      itemId: 'iron_furnace',
      icon: ITEMS['iron_furnace'].icon,
      name: ITEMS['iron_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'silver_essence',
      icon: ITEMS['silver_essence'].icon,
      name: ITEMS['silver_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'maple_log',
      icon: ITEMS['maple_log'].icon,
      name: ITEMS['maple_log'].name,
      amount: 20,
      consumes: true
    }, {
      type: 'item',
      itemId: 'silver_bar',
      icon: ITEMS['silver_bar'].icon,
      name: ITEMS['silver_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 20
    }]
  },

  silver_short_sword: {
    produces: 'silver_short_sword',
    name: 'silver short sword',
    category: 'combat',
    recipeFor: 'crafting',
    id: 'silver_short_sword',
    timeToCraft: 120, // 60
    xp: 120,
    maxToCraft: 1,
    requiredCraftingLevel: 20,
    required: [{
      type: 'item',
      itemId: 'iron_furnace',
      icon: ITEMS['iron_furnace'].icon,
      name: ITEMS['iron_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'silver_essence',
      icon: ITEMS['silver_essence'].icon,
      name: ITEMS['silver_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'maple_log',
      icon: ITEMS['maple_log'].icon,
      name: ITEMS['maple_log'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'item',
      itemId: 'silver_bar',
      icon: ITEMS['silver_bar'].icon,
      name: ITEMS['silver_bar'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 20
    }]
  },

  silver_long_sword: {
    produces: 'silver_long_sword',
    name: 'silver long sword',
    category: 'combat',
    recipeFor: 'crafting',
    id: 'silver_long_sword',
    timeToCraft: 240, // 60
    xp: 120,
    maxToCraft: 1,
    requiredCraftingLevel: 20,
    required: [{
      type: 'item',
      itemId: 'iron_furnace',
      icon: ITEMS['iron_furnace'].icon,
      name: ITEMS['iron_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'silver_essence',
      icon: ITEMS['silver_essence'].icon,
      name: ITEMS['silver_essence'].name,
      amount: 8,
      consumes: true
    }, {
      type: 'item',
      itemId: 'maple_log',
      icon: ITEMS['maple_log'].icon,
      name: ITEMS['maple_log'].name,
      amount: 15,
      consumes: true
    }, {
      type: 'item',
      itemId: 'silver_bar',
      icon: ITEMS['silver_bar'].icon,
      name: ITEMS['silver_bar'].name,
      amount: 20,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 20
    }]
  },

  silver_battle_axe: {
    recipeFor: 'crafting',
    produces: 'silver_battle_axe',
    name: 'silver battle axe',
    category: 'combat',
    id: 'silver_battle_axe',
    timeToCraft: 300, // 60
    xp: 160,
    maxToCraft: 1,
    requiredCraftingLevel: 20,
    required: [{
      type: 'item',
      itemId: 'iron_furnace',
      icon: ITEMS['iron_furnace'].icon,
      name: ITEMS['iron_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'silver_essence',
      icon: ITEMS['silver_essence'].icon,
      name: ITEMS['silver_essence'].name,
      amount: 8,
      consumes: true
    }, {
      type: 'item',
      itemId: 'maple_log',
      icon: ITEMS['maple_log'].icon,
      name: ITEMS['maple_log'].name,
      amount: 50,
      consumes: true
    }, {
      type: 'item',
      itemId: 'silver_bar',
      icon: ITEMS['silver_bar'].icon,
      name: ITEMS['silver_bar'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 20
    }]
  },

  silver_helmet: {
    recipeFor: 'crafting',
    produces: 'silver_helmet',
    name: 'silver helmet',
    category: 'combat',
    id: 'silver_helmet',
    timeToCraft: 120, // 60
    xp: 100,
    maxToCraft: 1,
    requiredCraftingLevel: 20,
    required: [{
      type: 'item',
      itemId: 'iron_furnace',
      icon: ITEMS['iron_furnace'].icon,
      name: ITEMS['iron_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'silver_essence',
      icon: ITEMS['silver_essence'].icon,
      name: ITEMS['silver_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'maple_log',
      icon: ITEMS['maple_log'].icon,
      name: ITEMS['maple_log'].name,
      amount: 25,
      consumes: true
    }, {
      type: 'item',
      itemId: 'silver_bar',
      icon: ITEMS['silver_bar'].icon,
      name: ITEMS['silver_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 20
    }]
  },

  silver_chest_plate: {
    recipeFor: 'crafting',
    produces: 'silver_chest_plate',
    name: 'silver chest plate',
    category: 'combat',
    id: 'silver_chest_plate',
    timeToCraft: 120, // 60
    xp: 100,
    maxToCraft: 1,
    requiredCraftingLevel: 20,
    required: [{
      type: 'item',
      itemId: 'iron_furnace',
      icon: ITEMS['iron_furnace'].icon,
      name: ITEMS['iron_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'silver_essence',
      icon: ITEMS['silver_essence'].icon,
      name: ITEMS['silver_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'maple_log',
      icon: ITEMS['maple_log'].icon,
      name: ITEMS['maple_log'].name,
      amount: 25,
      consumes: true
    }, {
      type: 'item',
      itemId: 'silver_bar',
      icon: ITEMS['silver_bar'].icon,
      name: ITEMS['silver_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 20
    }]
  },

  silver_plate_legs: {
    recipeFor: 'crafting',
    produces: 'silver_plate_legs',
    name: 'silver plate legs',
    category: 'combat',
    id: 'silver_plate_legs',
    timeToCraft: 120, // 60
    xp: 100,
    maxToCraft: 1,
    requiredCraftingLevel: 20,
    required: [{
      type: 'item',
      itemId: 'iron_furnace',
      icon: ITEMS['iron_furnace'].icon,
      name: ITEMS['iron_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'silver_essence',
      icon: ITEMS['silver_essence'].icon,
      name: ITEMS['silver_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'maple_log',
      icon: ITEMS['maple_log'].icon,
      name: ITEMS['maple_log'].name,
      amount: 25,
      consumes: true
    }, {
      type: 'item',
      itemId: 'silver_bar',
      icon: ITEMS['silver_bar'].icon,
      name: ITEMS['silver_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 20
    }]
  },

  silver_shield: {
    recipeFor: 'crafting',
    produces: 'silver_shield',
    name: 'silver shield',
    category: 'combat',
    id: 'silver_shield',
    timeToCraft: 120, // 60
    xp: 100,
    maxToCraft: 1,
    requiredCraftingLevel: 20,
    required: [{
      type: 'item',
      itemId: 'iron_furnace',
      icon: ITEMS['iron_furnace'].icon,
      name: ITEMS['iron_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'silver_essence',
      icon: ITEMS['silver_essence'].icon,
      name: ITEMS['silver_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'maple_log',
      icon: ITEMS['maple_log'].icon,
      name: ITEMS['maple_log'].name,
      amount: 50,
      consumes: true
    }, {
      type: 'item',
      itemId: 'silver_bar',
      icon: ITEMS['silver_bar'].icon,
      name: ITEMS['silver_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 20
    }]
  }
}
