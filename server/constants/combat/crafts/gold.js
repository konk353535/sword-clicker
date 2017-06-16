import { ITEMS } from '/server/constants/items/index.js'; 

export const GOLD_CRAFTS = {
  gold_dagger: {
    produces: 'gold_dagger',
    name: 'gold dagger',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'gold_dagger',
    timeToCraft: 120, // 60
    xp: 60,
    maxToCraft: 1,
    requiredCraftingLevel: 25,
    required: [{
      type: 'item',
      itemId: 'silver_furnace',
      icon: ITEMS['silver_furnace'].icon,
      name: ITEMS['silver_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'walnut_log',
      icon: ITEMS['walnut_log'].icon,
      name: ITEMS['walnut_log'].name,
      amount: 3,
      consumes: true
    }, {
      type: 'item',
      itemId: 'gold_bar',
      icon: ITEMS['gold_bar'].icon,
      name: ITEMS['gold_bar'].name,
      amount: 3,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 25
    }]
  },

  gold_spear: {
    produces: 'gold_spear',
    name: 'gold spear',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'gold_spear',
    timeToCraft: 180, // 60
    xp: 120,
    maxToCraft: 1,
    requiredCraftingLevel: 25,
    required: [{
      type: 'item',
      itemId: 'silver_furnace',
      icon: ITEMS['silver_furnace'].icon,
      name: ITEMS['silver_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'walnut_log',
      icon: ITEMS['walnut_log'].icon,
      name: ITEMS['walnut_log'].name,
      amount: 20,
      consumes: true
    }, {
      type: 'item',
      itemId: 'gold_bar',
      icon: ITEMS['gold_bar'].icon,
      name: ITEMS['gold_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 25
    }]
  },

  gold_short_sword: {
    produces: 'gold_short_sword',
    name: 'gold short sword',
    category: 'combat',
    recipeFor: 'crafting',
    id: 'gold_short_sword',
    timeToCraft: 120, // 60
    xp: 120,
    maxToCraft: 1,
    requiredCraftingLevel: 25,
    required: [{
      type: 'item',
      itemId: 'silver_furnace',
      icon: ITEMS['silver_furnace'].icon,
      name: ITEMS['silver_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'walnut_log',
      icon: ITEMS['walnut_log'].icon,
      name: ITEMS['walnut_log'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'item',
      itemId: 'gold_bar',
      icon: ITEMS['gold_bar'].icon,
      name: ITEMS['gold_bar'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 25
    }]
  },

  gold_long_sword: {
    produces: 'gold_long_sword',
    name: 'gold long sword',
    category: 'combat',
    recipeFor: 'crafting',
    id: 'gold_long_sword',
    timeToCraft: 240, // 60
    xp: 120,
    maxToCraft: 1,
    requiredCraftingLevel: 25,
    required: [{
      type: 'item',
      itemId: 'silver_furnace',
      icon: ITEMS['silver_furnace'].icon,
      name: ITEMS['silver_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'walnut_log',
      icon: ITEMS['walnut_log'].icon,
      name: ITEMS['walnut_log'].name,
      amount: 15,
      consumes: true
    }, {
      type: 'item',
      itemId: 'gold_bar',
      icon: ITEMS['gold_bar'].icon,
      name: ITEMS['gold_bar'].name,
      amount: 20,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 25
    }]
  },

  gold_battle_axe: {
    recipeFor: 'crafting',
    produces: 'gold_battle_axe',
    name: 'gold battle axe',
    category: 'combat',
    id: 'gold_battle_axe',
    timeToCraft: 300, // 60
    xp: 160,
    maxToCraft: 1,
    requiredCraftingLevel: 25,
    required: [{
      type: 'item',
      itemId: 'silver_furnace',
      icon: ITEMS['silver_furnace'].icon,
      name: ITEMS['silver_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'walnut_log',
      icon: ITEMS['walnut_log'].icon,
      name: ITEMS['walnut_log'].name,
      amount: 50,
      consumes: true
    }, {
      type: 'item',
      itemId: 'gold_bar',
      icon: ITEMS['gold_bar'].icon,
      name: ITEMS['gold_bar'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 25
    }]
  },

  gold_helmet: {
    recipeFor: 'crafting',
    produces: 'gold_helmet',
    name: 'gold helmet',
    category: 'combat',
    id: 'gold_helmet',
    timeToCraft: 120, // 60
    xp: 100,
    maxToCraft: 1,
    requiredCraftingLevel: 25,
    required: [{
      type: 'item',
      itemId: 'silver_furnace',
      icon: ITEMS['silver_furnace'].icon,
      name: ITEMS['silver_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'walnut_log',
      icon: ITEMS['walnut_log'].icon,
      name: ITEMS['walnut_log'].name,
      amount: 25,
      consumes: true
    }, {
      type: 'item',
      itemId: 'gold_bar',
      icon: ITEMS['gold_bar'].icon,
      name: ITEMS['gold_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 25
    }]
  },

  gold_chest_plate: {
    recipeFor: 'crafting',
    produces: 'gold_chest_plate',
    name: 'gold chest plate',
    category: 'combat',
    id: 'gold_chest_plate',
    timeToCraft: 120, // 60
    xp: 100,
    maxToCraft: 1,
    requiredCraftingLevel: 25,
    required: [{
      type: 'item',
      itemId: 'silver_furnace',
      icon: ITEMS['silver_furnace'].icon,
      name: ITEMS['silver_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'walnut_log',
      icon: ITEMS['walnut_log'].icon,
      name: ITEMS['walnut_log'].name,
      amount: 25,
      consumes: true
    }, {
      type: 'item',
      itemId: 'gold_bar',
      icon: ITEMS['gold_bar'].icon,
      name: ITEMS['gold_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 25
    }]
  },

  gold_plate_legs: {
    recipeFor: 'crafting',
    produces: 'gold_plate_legs',
    name: 'gold plate legs',
    category: 'combat',
    id: 'gold_plate_legs',
    timeToCraft: 120, // 60
    xp: 100,
    maxToCraft: 1,
    requiredCraftingLevel: 25,
    required: [{
      type: 'item',
      itemId: 'silver_furnace',
      icon: ITEMS['silver_furnace'].icon,
      name: ITEMS['silver_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'walnut_log',
      icon: ITEMS['walnut_log'].icon,
      name: ITEMS['walnut_log'].name,
      amount: 25,
      consumes: true
    }, {
      type: 'item',
      itemId: 'gold_bar',
      icon: ITEMS['gold_bar'].icon,
      name: ITEMS['gold_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 25
    }]
  },

  gold_shield: {
    recipeFor: 'crafting',
    produces: 'gold_shield',
    name: 'gold shield',
    category: 'combat',
    id: 'gold_shield',
    timeToCraft: 120, // 60
    xp: 100,
    maxToCraft: 1,
    requiredCraftingLevel: 25,
    required: [{
      type: 'item',
      itemId: 'silver_furnace',
      icon: ITEMS['silver_furnace'].icon,
      name: ITEMS['silver_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'walnut_log',
      icon: ITEMS['walnut_log'].icon,
      name: ITEMS['walnut_log'].name,
      amount: 50,
      consumes: true
    }, {
      type: 'item',
      itemId: 'gold_bar',
      icon: ITEMS['gold_bar'].icon,
      name: ITEMS['gold_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 25
    }]
  }
}
