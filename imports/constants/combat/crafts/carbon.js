import { ITEMS } from '/imports/constants/items/index.js'; 

export const CARBON_CRAFTS = {
  carbon_dagger: {
    produces: 'carbon_dagger',
    name: 'carbon dagger',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'carbon_dagger',
    timeToCraft: 240, // 60
    xp: 2000,
    maxToCraft: 1,
    tags: ['weapon'],
    requiredCraftingLevel: 30,
    required: [{
      type: 'item',
      itemId: 'gold_furnace',
      icon: ITEMS['gold_furnace'].icon,
      name: ITEMS['gold_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'carbon_essence',
      icon: ITEMS['carbon_essence'].icon,
      name: ITEMS['carbon_essence'].name,
      amount: 2,
      consumes: true
    }, {
      type: 'item',
      itemId: 'cherry_log',
      icon: ITEMS['cherry_log'].icon,
      name: ITEMS['cherry_log'].name,
      amount: 3,
      consumes: true
    }, {
      type: 'item',
      itemId: 'carbon_bar',
      icon: ITEMS['carbon_bar'].icon,
      name: ITEMS['carbon_bar'].name,
      amount: 3,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 30
    }]
  },

  carbon_spear: {
    produces: 'carbon_spear',
    name: 'carbon spear',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'carbon_spear',
    timeToCraft: 300, // 60
    xp: 4000,
    maxToCraft: 1,
    tags: ['weapon'],
    requiredCraftingLevel: 30,
    required: [{
      type: 'item',
      itemId: 'gold_furnace',
      icon: ITEMS['gold_furnace'].icon,
      name: ITEMS['gold_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'carbon_essence',
      icon: ITEMS['carbon_essence'].icon,
      name: ITEMS['carbon_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'cherry_log',
      icon: ITEMS['cherry_log'].icon,
      name: ITEMS['cherry_log'].name,
      amount: 20,
      consumes: true
    }, {
      type: 'item',
      itemId: 'carbon_bar',
      icon: ITEMS['carbon_bar'].icon,
      name: ITEMS['carbon_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 30
    }]
  },

  carbon_short_sword: {
    produces: 'carbon_short_sword',
    name: 'carbon short sword',
    category: 'combat',
    recipeFor: 'crafting',
    id: 'carbon_short_sword',
    timeToCraft: 300, // 60
    xp: 4000,
    maxToCraft: 1,
    tags: ['weapon'],
    requiredCraftingLevel: 30,
    required: [{
      type: 'item',
      itemId: 'gold_furnace',
      icon: ITEMS['gold_furnace'].icon,
      name: ITEMS['gold_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'carbon_essence',
      icon: ITEMS['carbon_essence'].icon,
      name: ITEMS['carbon_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'cherry_log',
      icon: ITEMS['cherry_log'].icon,
      name: ITEMS['cherry_log'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'item',
      itemId: 'carbon_bar',
      icon: ITEMS['carbon_bar'].icon,
      name: ITEMS['carbon_bar'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 30
    }]
  },

  carbon_long_sword: {
    produces: 'carbon_long_sword',
    name: 'carbon long sword',
    category: 'combat',
    recipeFor: 'crafting',
    id: 'carbon_long_sword',
    timeToCraft: 420, // 60
    xp: 8000,
    maxToCraft: 1,
    tags: ['weapon'],
    requiredCraftingLevel: 30,
    required: [{
      type: 'item',
      itemId: 'gold_furnace',
      icon: ITEMS['gold_furnace'].icon,
      name: ITEMS['gold_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'carbon_essence',
      icon: ITEMS['carbon_essence'].icon,
      name: ITEMS['carbon_essence'].name,
      amount: 8,
      consumes: true
    }, {
      type: 'item',
      itemId: 'cherry_log',
      icon: ITEMS['cherry_log'].icon,
      name: ITEMS['cherry_log'].name,
      amount: 15,
      consumes: true
    }, {
      type: 'item',
      itemId: 'carbon_bar',
      icon: ITEMS['carbon_bar'].icon,
      name: ITEMS['carbon_bar'].name,
      amount: 25,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 30
    }]
  },

  carbon_battle_axe: {
    recipeFor: 'crafting',
    produces: 'carbon_battle_axe',
    name: 'carbon battle axe',
    category: 'combat',
    id: 'carbon_battle_axe',
    timeToCraft: 600, // 60
    xp: 8000,
    maxToCraft: 1,
    tags: ['weapon'],
    requiredCraftingLevel: 30,
    required: [{
      type: 'item',
      itemId: 'gold_furnace',
      icon: ITEMS['gold_furnace'].icon,
      name: ITEMS['gold_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'carbon_essence',
      icon: ITEMS['carbon_essence'].icon,
      name: ITEMS['carbon_essence'].name,
      amount: 8,
      consumes: true
    }, {
      type: 'item',
      itemId: 'cherry_log',
      icon: ITEMS['cherry_log'].icon,
      name: ITEMS['cherry_log'].name,
      amount: 50,
      consumes: true
    }, {
      type: 'item',
      itemId: 'carbon_bar',
      icon: ITEMS['carbon_bar'].icon,
      name: ITEMS['carbon_bar'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 30
    }]
  },

  carbon_helmet: {
    recipeFor: 'crafting',
    produces: 'carbon_helmet',
    name: 'carbon helmet',
    category: 'combat',
    id: 'carbon_helmet',
    timeToCraft: 240, // 60
    xp: 4000,
    maxToCraft: 1,
    tags: ['armor'],
    requiredCraftingLevel: 30,
    required: [{
      type: 'item',
      itemId: 'gold_furnace',
      icon: ITEMS['gold_furnace'].icon,
      name: ITEMS['gold_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'carbon_essence',
      icon: ITEMS['carbon_essence'].icon,
      name: ITEMS['carbon_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'cherry_log',
      icon: ITEMS['cherry_log'].icon,
      name: ITEMS['cherry_log'].name,
      amount: 25,
      consumes: true
    }, {
      type: 'item',
      itemId: 'carbon_bar',
      icon: ITEMS['carbon_bar'].icon,
      name: ITEMS['carbon_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 30
    }]
  },

  carbon_chest_plate: {
    recipeFor: 'crafting',
    produces: 'carbon_chest_plate',
    name: 'carbon chest plate',
    category: 'combat',
    id: 'carbon_chest_plate',
    timeToCraft: 240, // 60
    xp: 4000,
    maxToCraft: 1,
    tags: ['armor'],
    requiredCraftingLevel: 30,
    required: [{
      type: 'item',
      itemId: 'gold_furnace',
      icon: ITEMS['gold_furnace'].icon,
      name: ITEMS['gold_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'carbon_essence',
      icon: ITEMS['carbon_essence'].icon,
      name: ITEMS['carbon_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'cherry_log',
      icon: ITEMS['cherry_log'].icon,
      name: ITEMS['cherry_log'].name,
      amount: 25,
      consumes: true
    }, {
      type: 'item',
      itemId: 'carbon_bar',
      icon: ITEMS['carbon_bar'].icon,
      name: ITEMS['carbon_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 30
    }]
  },

  carbon_plate_legs: {
    recipeFor: 'crafting',
    produces: 'carbon_plate_legs',
    name: 'carbon plate legs',
    category: 'combat',
    id: 'carbon_plate_legs',
    timeToCraft: 240, // 60
    xp: 4000,
    maxToCraft: 1,
    tags: ['armor'],
    requiredCraftingLevel: 30,
    required: [{
      type: 'item',
      itemId: 'gold_furnace',
      icon: ITEMS['gold_furnace'].icon,
      name: ITEMS['gold_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'carbon_essence',
      icon: ITEMS['carbon_essence'].icon,
      name: ITEMS['carbon_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'cherry_log',
      icon: ITEMS['cherry_log'].icon,
      name: ITEMS['cherry_log'].name,
      amount: 25,
      consumes: true
    }, {
      type: 'item',
      itemId: 'carbon_bar',
      icon: ITEMS['carbon_bar'].icon,
      name: ITEMS['carbon_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 30
    }]
  },

  carbon_shield: {
    recipeFor: 'crafting',
    produces: 'carbon_shield',
    name: 'carbon shield',
    category: 'combat',
    id: 'carbon_shield',
    timeToCraft: 240, // 60
    xp: 4000,
    maxToCraft: 1,
    tags: ['weapon'],
    requiredCraftingLevel: 30,
    required: [{
      type: 'item',
      itemId: 'gold_furnace',
      icon: ITEMS['gold_furnace'].icon,
      name: ITEMS['gold_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'carbon_essence',
      icon: ITEMS['carbon_essence'].icon,
      name: ITEMS['carbon_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'cherry_log',
      icon: ITEMS['cherry_log'].icon,
      name: ITEMS['cherry_log'].name,
      amount: 50,
      consumes: true
    }, {
      type: 'item',
      itemId: 'carbon_bar',
      icon: ITEMS['carbon_bar'].icon,
      name: ITEMS['carbon_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 30
    }]
  }
};
