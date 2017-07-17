import { ITEMS } from '/server/constants/items/index.js'; 

export const STEEL_CRAFTS = {
  steel_dagger: {
    produces: 'steel_dagger',
    name: 'steel dagger',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'steel_dagger',
    timeToCraft: 240, // 60
    xp: 300,
    maxToCraft: 1,
    requiredCraftingLevel: 35,
    required: [{
      type: 'item',
      itemId: 'carbon_furnace',
      icon: ITEMS['carbon_furnace'].icon,
      name: ITEMS['carbon_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'steel_essence',
      icon: ITEMS['steel_essence'].icon,
      name: ITEMS['steel_essence'].name,
      amount: 2,
      consumes: true
    }, {
      type: 'item',
      itemId: 'mahogany_log',
      icon: ITEMS['mahogany_log'].icon,
      name: ITEMS['mahogany_log'].name,
      amount: 3,
      consumes: true
    }, {
      type: 'item',
      itemId: 'steel_bar',
      icon: ITEMS['steel_bar'].icon,
      name: ITEMS['steel_bar'].name,
      amount: 3,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 35
    }]
  },

  steel_spear: {
    produces: 'steel_spear',
    name: 'steel spear',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'steel_spear',
    timeToCraft: 300, // 60
    xp: 600,
    maxToCraft: 1,
    requiredCraftingLevel: 35,
    required: [{
      type: 'item',
      itemId: 'carbon_furnace',
      icon: ITEMS['carbon_furnace'].icon,
      name: ITEMS['carbon_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'steel_essence',
      icon: ITEMS['steel_essence'].icon,
      name: ITEMS['steel_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'mahogany_log',
      icon: ITEMS['mahogany_log'].icon,
      name: ITEMS['mahogany_log'].name,
      amount: 20,
      consumes: true
    }, {
      type: 'item',
      itemId: 'steel_bar',
      icon: ITEMS['steel_bar'].icon,
      name: ITEMS['steel_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 35
    }]
  },

  steel_short_sword: {
    produces: 'steel_short_sword',
    name: 'steel short sword',
    category: 'combat',
    recipeFor: 'crafting',
    id: 'steel_short_sword',
    timeToCraft: 300, // 60
    xp: 600,
    maxToCraft: 1,
    requiredCraftingLevel: 35,
    required: [{
      type: 'item',
      itemId: 'carbon_furnace',
      icon: ITEMS['carbon_furnace'].icon,
      name: ITEMS['carbon_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'steel_essence',
      icon: ITEMS['steel_essence'].icon,
      name: ITEMS['steel_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'mahogany_log',
      icon: ITEMS['mahogany_log'].icon,
      name: ITEMS['mahogany_log'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'item',
      itemId: 'steel_bar',
      icon: ITEMS['steel_bar'].icon,
      name: ITEMS['steel_bar'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 35
    }]
  },

  steel_long_sword: {
    produces: 'steel_long_sword',
    name: 'steel long sword',
    category: 'combat',
    recipeFor: 'crafting',
    id: 'steel_long_sword',
    timeToCraft: 420, // 60
    xp: 750,
    maxToCraft: 1,
    requiredCraftingLevel: 35,
    required: [{
      type: 'item',
      itemId: 'carbon_furnace',
      icon: ITEMS['carbon_furnace'].icon,
      name: ITEMS['carbon_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'steel_essence',
      icon: ITEMS['steel_essence'].icon,
      name: ITEMS['steel_essence'].name,
      amount: 8,
      consumes: true
    }, {
      type: 'item',
      itemId: 'mahogany_log',
      icon: ITEMS['mahogany_log'].icon,
      name: ITEMS['mahogany_log'].name,
      amount: 15,
      consumes: true
    }, {
      type: 'item',
      itemId: 'steel_bar',
      icon: ITEMS['steel_bar'].icon,
      name: ITEMS['steel_bar'].name,
      amount: 20,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 35
    }]
  },

  steel_battle_axe: {
    recipeFor: 'crafting',
    produces: 'steel_battle_axe',
    name: 'steel battle axe',
    category: 'combat',
    id: 'steel_battle_axe',
    timeToCraft: 600, // 60
    xp: 750,
    maxToCraft: 1,
    requiredCraftingLevel: 35,
    required: [{
      type: 'item',
      itemId: 'carbon_furnace',
      icon: ITEMS['carbon_furnace'].icon,
      name: ITEMS['carbon_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'steel_essence',
      icon: ITEMS['steel_essence'].icon,
      name: ITEMS['steel_essence'].name,
      amount: 8,
      consumes: true
    }, {
      type: 'item',
      itemId: 'mahogany_log',
      icon: ITEMS['mahogany_log'].icon,
      name: ITEMS['mahogany_log'].name,
      amount: 50,
      consumes: true
    }, {
      type: 'item',
      itemId: 'steel_bar',
      icon: ITEMS['steel_bar'].icon,
      name: ITEMS['steel_bar'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 35
    }]
  },

  steel_helmet: {
    recipeFor: 'crafting',
    produces: 'steel_helmet',
    name: 'steel helmet',
    category: 'combat',
    id: 'steel_helmet',
    timeToCraft: 240, // 60
    xp: 600,
    maxToCraft: 1,
    requiredCraftingLevel: 35,
    required: [{
      type: 'item',
      itemId: 'carbon_furnace',
      icon: ITEMS['carbon_furnace'].icon,
      name: ITEMS['carbon_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'steel_essence',
      icon: ITEMS['steel_essence'].icon,
      name: ITEMS['steel_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'mahogany_log',
      icon: ITEMS['mahogany_log'].icon,
      name: ITEMS['mahogany_log'].name,
      amount: 25,
      consumes: true
    }, {
      type: 'item',
      itemId: 'steel_bar',
      icon: ITEMS['steel_bar'].icon,
      name: ITEMS['steel_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 35
    }]
  },

  steel_chest_plate: {
    recipeFor: 'crafting',
    produces: 'steel_chest_plate',
    name: 'steel chest plate',
    category: 'combat',
    id: 'steel_chest_plate',
    timeToCraft: 240, // 60
    xp: 600,
    maxToCraft: 1,
    requiredCraftingLevel: 35,
    required: [{
      type: 'item',
      itemId: 'carbon_furnace',
      icon: ITEMS['carbon_furnace'].icon,
      name: ITEMS['carbon_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'steel_essence',
      icon: ITEMS['steel_essence'].icon,
      name: ITEMS['steel_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'mahogany_log',
      icon: ITEMS['mahogany_log'].icon,
      name: ITEMS['mahogany_log'].name,
      amount: 25,
      consumes: true
    }, {
      type: 'item',
      itemId: 'steel_bar',
      icon: ITEMS['steel_bar'].icon,
      name: ITEMS['steel_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 35
    }]
  },

  steel_plate_legs: {
    recipeFor: 'crafting',
    produces: 'steel_plate_legs',
    name: 'steel plate legs',
    category: 'combat',
    id: 'steel_plate_legs',
    timeToCraft: 240, // 60
    xp: 600,
    maxToCraft: 1,
    requiredCraftingLevel: 35,
    required: [{
      type: 'item',
      itemId: 'carbon_furnace',
      icon: ITEMS['carbon_furnace'].icon,
      name: ITEMS['carbon_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'steel_essence',
      icon: ITEMS['steel_essence'].icon,
      name: ITEMS['steel_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'mahogany_log',
      icon: ITEMS['mahogany_log'].icon,
      name: ITEMS['mahogany_log'].name,
      amount: 25,
      consumes: true
    }, {
      type: 'item',
      itemId: 'steel_bar',
      icon: ITEMS['steel_bar'].icon,
      name: ITEMS['steel_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 35
    }]
  },

  steel_shield: {
    recipeFor: 'crafting',
    produces: 'steel_shield',
    name: 'steel shield',
    category: 'combat',
    id: 'steel_shield',
    timeToCraft: 240, // 60
    xp: 600,
    maxToCraft: 1,
    requiredCraftingLevel: 35,
    required: [{
      type: 'item',
      itemId: 'carbon_furnace',
      icon: ITEMS['carbon_furnace'].icon,
      name: ITEMS['carbon_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'steel_essence',
      icon: ITEMS['steel_essence'].icon,
      name: ITEMS['steel_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'mahogany_log',
      icon: ITEMS['mahogany_log'].icon,
      name: ITEMS['mahogany_log'].name,
      amount: 50,
      consumes: true
    }, {
      type: 'item',
      itemId: 'steel_bar',
      icon: ITEMS['steel_bar'].icon,
      name: ITEMS['steel_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 35
    }]
  }
}
