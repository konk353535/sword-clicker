import { ITEMS } from '/server/constants/items/index.js'; 

export const IRON_CRAFTS = {
  iron_dagger: {
    produces: 'iron_dagger',
    name: 'iron dagger',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'iron_dagger',
    timeToCraft: 120, // 60
    xp: 60,
    maxToCraft: 1,
    requiredCraftingLevel: 15,
    required: [{
      type: 'item',
      itemId: 'bronze_furnace',
      icon: ITEMS['bronze_furnace'].icon,
      name: ITEMS['bronze_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'oak_log',
      icon: ITEMS['oak_log'].icon,
      name: ITEMS['oak_log'].name,
      amount: 3,
      consumes: true
    }, {
      type: 'item',
      itemId: 'iron_bar',
      icon: ITEMS['iron_bar'].icon,
      name: ITEMS['iron_bar'].name,
      amount: 3,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 15
    }]
  },

  iron_spear: {
    produces: 'iron_spear',
    name: 'iron spear',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'iron_spear',
    timeToCraft: 180, // 60
    xp: 120,
    maxToCraft: 1,
    requiredCraftingLevel: 15,
    required: [{
      type: 'item',
      itemId: 'bronze_furnace',
      icon: ITEMS['bronze_furnace'].icon,
      name: ITEMS['bronze_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'oak_log',
      icon: ITEMS['oak_log'].icon,
      name: ITEMS['oak_log'].name,
      amount: 20,
      consumes: true
    }, {
      type: 'item',
      itemId: 'iron_bar',
      icon: ITEMS['iron_bar'].icon,
      name: ITEMS['iron_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 15
    }]
  },

  iron_short_sword: {
    produces: 'iron_short_sword',
    name: 'iron short sword',
    category: 'combat',
    recipeFor: 'crafting',
    id: 'iron_short_sword',
    timeToCraft: 120, // 60
    xp: 120,
    maxToCraft: 1,
    requiredCraftingLevel: 15,
    required: [{
      type: 'item',
      itemId: 'bronze_furnace',
      icon: ITEMS['bronze_furnace'].icon,
      name: ITEMS['bronze_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'oak_log',
      icon: ITEMS['oak_log'].icon,
      name: ITEMS['oak_log'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'item',
      itemId: 'iron_bar',
      icon: ITEMS['iron_bar'].icon,
      name: ITEMS['iron_bar'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 15
    }]
  },

  iron_long_sword: {
    produces: 'iron_long_sword',
    name: 'iron long sword',
    category: 'combat',
    recipeFor: 'crafting',
    id: 'iron_long_sword',
    timeToCraft: 240, // 60
    xp: 120,
    maxToCraft: 1,
    requiredCraftingLevel: 15,
    required: [{
      type: 'item',
      itemId: 'bronze_furnace',
      icon: ITEMS['bronze_furnace'].icon,
      name: ITEMS['bronze_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'oak_log',
      icon: ITEMS['oak_log'].icon,
      name: ITEMS['oak_log'].name,
      amount: 15,
      consumes: true
    }, {
      type: 'item',
      itemId: 'iron_bar',
      icon: ITEMS['iron_bar'].icon,
      name: ITEMS['iron_bar'].name,
      amount: 20,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 15
    }]
  },

  iron_battle_axe: {
    recipeFor: 'crafting',
    produces: 'iron_battle_axe',
    name: 'iron battle axe',
    category: 'combat',
    id: 'iron_battle_axe',
    timeToCraft: 300, // 60
    xp: 160,
    maxToCraft: 1,
    requiredCraftingLevel: 15,
    required: [{
      type: 'item',
      itemId: 'bronze_furnace',
      icon: ITEMS['bronze_furnace'].icon,
      name: ITEMS['bronze_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'oak_log',
      icon: ITEMS['oak_log'].icon,
      name: ITEMS['oak_log'].name,
      amount: 50,
      consumes: true
    }, {
      type: 'item',
      itemId: 'iron_bar',
      icon: ITEMS['iron_bar'].icon,
      name: ITEMS['iron_bar'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 15
    }]
  },

  iron_helmet: {
    recipeFor: 'crafting',
    produces: 'iron_helmet',
    name: 'iron helmet',
    category: 'combat',
    id: 'iron_helmet',
    timeToCraft: 120, // 60
    xp: 100,
    maxToCraft: 1,
    requiredCraftingLevel: 15,
    required: [{
      type: 'item',
      itemId: 'bronze_furnace',
      icon: ITEMS['bronze_furnace'].icon,
      name: ITEMS['bronze_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'oak_log',
      icon: ITEMS['oak_log'].icon,
      name: ITEMS['oak_log'].name,
      amount: 25,
      consumes: true
    }, {
      type: 'item',
      itemId: 'iron_bar',
      icon: ITEMS['iron_bar'].icon,
      name: ITEMS['iron_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 15
    }]
  },

  iron_chest_plate: {
    recipeFor: 'crafting',
    produces: 'iron_chest_plate',
    name: 'iron chest plate',
    category: 'combat',
    id: 'iron_chest_plate',
    timeToCraft: 120, // 60
    xp: 100,
    maxToCraft: 1,
    requiredCraftingLevel: 15,
    required: [{
      type: 'item',
      itemId: 'bronze_furnace',
      icon: ITEMS['bronze_furnace'].icon,
      name: ITEMS['bronze_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'oak_log',
      icon: ITEMS['oak_log'].icon,
      name: ITEMS['oak_log'].name,
      amount: 25,
      consumes: true
    }, {
      type: 'item',
      itemId: 'iron_bar',
      icon: ITEMS['iron_bar'].icon,
      name: ITEMS['iron_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 15
    }]
  },

  iron_plate_legs: {
    recipeFor: 'crafting',
    produces: 'iron_plate_legs',
    name: 'iron plate legs',
    category: 'combat',
    id: 'iron_plate_legs',
    timeToCraft: 120, // 60
    xp: 100,
    maxToCraft: 1,
    requiredCraftingLevel: 15,
    required: [{
      type: 'item',
      itemId: 'bronze_furnace',
      icon: ITEMS['bronze_furnace'].icon,
      name: ITEMS['bronze_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'oak_log',
      icon: ITEMS['oak_log'].icon,
      name: ITEMS['oak_log'].name,
      amount: 25,
      consumes: true
    }, {
      type: 'item',
      itemId: 'iron_bar',
      icon: ITEMS['iron_bar'].icon,
      name: ITEMS['iron_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 15
    }]
  },

  iron_shield: {
    recipeFor: 'crafting',
    produces: 'iron_shield',
    name: 'iron shield',
    category: 'combat',
    id: 'iron_shield',
    timeToCraft: 120, // 60
    xp: 100,
    maxToCraft: 1,
    requiredCraftingLevel: 15,
    required: [{
      type: 'item',
      itemId: 'bronze_furnace',
      icon: ITEMS['bronze_furnace'].icon,
      name: ITEMS['bronze_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'oak_log',
      icon: ITEMS['oak_log'].icon,
      name: ITEMS['oak_log'].name,
      amount: 50,
      consumes: true
    }, {
      type: 'item',
      itemId: 'iron_bar',
      icon: ITEMS['iron_bar'].icon,
      name: ITEMS['iron_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 15
    }]
  }
}
