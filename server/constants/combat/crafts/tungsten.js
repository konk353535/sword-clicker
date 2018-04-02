import { ITEMS } from '/server/constants/items/index.js'; 

export const TUNGSTEN_CRAFTS = {
  tungsten_dagger: {
    produces: 'tungsten_dagger',
    name: 'tungsten dagger',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'tungsten_dagger',
    timeToCraft: 240, // 60
    xp: 12500,
    maxToCraft: 1,
    tags: ['weapon', 'dagger'],
    requiredCraftingLevel: 50,
    required: [{
      type: 'item',
      itemId: 'titanium_furnace',
      icon: ITEMS['titanium_furnace'].icon,
      name: ITEMS['titanium_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'tungsten_essence',
      icon: ITEMS['tungsten_essence'].icon,
      name: ITEMS['tungsten_essence'].name,
      amount: 2,
      consumes: true
    }, {
      type: 'item',
      itemId: 'blue_gum_log',
      icon: ITEMS['blue_gum_log'].icon,
      name: ITEMS['blue_gum_log'].name,
      amount: 3,
      consumes: true
    }, {
      type: 'item',
      itemId: 'tungsten_bar',
      icon: ITEMS['tungsten_bar'].icon,
      name: ITEMS['tungsten_bar'].name,
      amount: 3,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 50
    }]
  },

  tungsten_spear: {
    produces: 'tungsten_spear',
    name: 'tungsten spear',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'tungsten_spear',
    timeToCraft: 300, // 60
    xp: 25000,
    maxToCraft: 1,
    tags: ['weapon', 'spear'],
    requiredCraftingLevel: 50,
    required: [{
      type: 'item',
      itemId: 'titanium_furnace',
      icon: ITEMS['titanium_furnace'].icon,
      name: ITEMS['titanium_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'tungsten_essence',
      icon: ITEMS['tungsten_essence'].icon,
      name: ITEMS['tungsten_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'blue_gum_log',
      icon: ITEMS['blue_gum_log'].icon,
      name: ITEMS['blue_gum_log'].name,
      amount: 20,
      consumes: true
    }, {
      type: 'item',
      itemId: 'tungsten_bar',
      icon: ITEMS['tungsten_bar'].icon,
      name: ITEMS['tungsten_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 50
    }]
  },

  tungsten_short_sword: {
    produces: 'tungsten_short_sword',
    name: 'tungsten short sword',
    category: 'combat',
    recipeFor: 'crafting',
    id: 'tungsten_short_sword',
    timeToCraft: 300, // 60
    xp: 25000,
    maxToCraft: 1,
    tags: ['weapon', 'shortsword'],
    requiredCraftingLevel: 50,
    required: [{
      type: 'item',
      itemId: 'titanium_furnace',
      icon: ITEMS['titanium_furnace'].icon,
      name: ITEMS['titanium_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'tungsten_essence',
      icon: ITEMS['tungsten_essence'].icon,
      name: ITEMS['tungsten_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'blue_gum_log',
      icon: ITEMS['blue_gum_log'].icon,
      name: ITEMS['blue_gum_log'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'item',
      itemId: 'tungsten_bar',
      icon: ITEMS['tungsten_bar'].icon,
      name: ITEMS['tungsten_bar'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 50
    }]
  },

  tungsten_long_sword: {
    produces: 'tungsten_long_sword',
    name: 'tungsten long sword',
    category: 'combat',
    recipeFor: 'crafting',
    id: 'tungsten_long_sword',
    timeToCraft: 420, // 60
    xp: 50000,
    maxToCraft: 1,
    tags: ['weapon', 'longsword'],
    requiredCraftingLevel: 50,
    required: [{
      type: 'item',
      itemId: 'titanium_furnace',
      icon: ITEMS['titanium_furnace'].icon,
      name: ITEMS['titanium_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'tungsten_essence',
      icon: ITEMS['tungsten_essence'].icon,
      name: ITEMS['tungsten_essence'].name,
      amount: 8,
      consumes: true
    }, {
      type: 'item',
      itemId: 'blue_gum_log',
      icon: ITEMS['blue_gum_log'].icon,
      name: ITEMS['blue_gum_log'].name,
      amount: 15,
      consumes: true
    }, {
      type: 'item',
      itemId: 'tungsten_bar',
      icon: ITEMS['tungsten_bar'].icon,
      name: ITEMS['tungsten_bar'].name,
      amount: 20,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 50
    }]
  },

  tungsten_battle_axe: {
    recipeFor: 'crafting',
    produces: 'tungsten_battle_axe',
    name: 'tungsten battle axe',
    category: 'combat',
    id: 'tungsten_battle_axe',
    timeToCraft: 600, // 60
    xp: 50000,
    maxToCraft: 1,
    tags: ['weapon', 'battleaxe'],
    requiredCraftingLevel: 50,
    required: [{
      type: 'item',
      itemId: 'titanium_furnace',
      icon: ITEMS['titanium_furnace'].icon,
      name: ITEMS['titanium_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'tungsten_essence',
      icon: ITEMS['tungsten_essence'].icon,
      name: ITEMS['tungsten_essence'].name,
      amount: 8,
      consumes: true
    }, {
      type: 'item',
      itemId: 'blue_gum_log',
      icon: ITEMS['blue_gum_log'].icon,
      name: ITEMS['blue_gum_log'].name,
      amount: 50,
      consumes: true
    }, {
      type: 'item',
      itemId: 'tungsten_bar',
      icon: ITEMS['tungsten_bar'].icon,
      name: ITEMS['tungsten_bar'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 50
    }]
  },

  tungsten_helmet: {
    recipeFor: 'crafting',
    produces: 'tungsten_helmet',
    name: 'tungsten helmet',
    category: 'combat',
    id: 'tungsten_helmet',
    timeToCraft: 240, // 60
    xp: 25000,
    maxToCraft: 1,
    tags: ['armor', 'helmet'],
    requiredCraftingLevel: 50,
    required: [{
      type: 'item',
      itemId: 'titanium_furnace',
      icon: ITEMS['titanium_furnace'].icon,
      name: ITEMS['titanium_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'tungsten_essence',
      icon: ITEMS['tungsten_essence'].icon,
      name: ITEMS['tungsten_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'blue_gum_log',
      icon: ITEMS['blue_gum_log'].icon,
      name: ITEMS['blue_gum_log'].name,
      amount: 25,
      consumes: true
    }, {
      type: 'item',
      itemId: 'tungsten_bar',
      icon: ITEMS['tungsten_bar'].icon,
      name: ITEMS['tungsten_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 50
    }]
  },

  tungsten_chest_plate: {
    recipeFor: 'crafting',
    produces: 'tungsten_chest_plate',
    name: 'tungsten chest plate',
    category: 'combat',
    id: 'tungsten_chest_plate',
    timeToCraft: 240, // 60
    xp: 25000,
    maxToCraft: 1,
    tags: ['armor', 'chest'],
    requiredCraftingLevel: 50,
    required: [{
      type: 'item',
      itemId: 'titanium_furnace',
      icon: ITEMS['titanium_furnace'].icon,
      name: ITEMS['titanium_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'tungsten_essence',
      icon: ITEMS['tungsten_essence'].icon,
      name: ITEMS['tungsten_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'blue_gum_log',
      icon: ITEMS['blue_gum_log'].icon,
      name: ITEMS['blue_gum_log'].name,
      amount: 25,
      consumes: true
    }, {
      type: 'item',
      itemId: 'tungsten_bar',
      icon: ITEMS['tungsten_bar'].icon,
      name: ITEMS['tungsten_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 50
    }]
  },

  tungsten_plate_legs: {
    recipeFor: 'crafting',
    produces: 'tungsten_plate_legs',
    name: 'tungsten plate legs',
    category: 'combat',
    id: 'tungsten_plate_legs',
    timeToCraft: 240, // 60
    xp: 25000,
    maxToCraft: 1,
    tags: ['armor', 'legs'],
    requiredCraftingLevel: 50,
    required: [{
      type: 'item',
      itemId: 'titanium_furnace',
      icon: ITEMS['titanium_furnace'].icon,
      name: ITEMS['titanium_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'tungsten_essence',
      icon: ITEMS['tungsten_essence'].icon,
      name: ITEMS['tungsten_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'blue_gum_log',
      icon: ITEMS['blue_gum_log'].icon,
      name: ITEMS['blue_gum_log'].name,
      amount: 25,
      consumes: true
    }, {
      type: 'item',
      itemId: 'tungsten_bar',
      icon: ITEMS['tungsten_bar'].icon,
      name: ITEMS['tungsten_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 50
    }]
  },

  tungsten_shield: {
    recipeFor: 'crafting',
    produces: 'tungsten_shield',
    name: 'tungsten shield',
    category: 'combat',
    id: 'tungsten_shield',
    timeToCraft: 240, // 60
    xp: 25000,
    maxToCraft: 1,
    tags: ['weapon', 'armor', 'shield'],
    requiredCraftingLevel: 50,
    required: [{
      type: 'item',
      itemId: 'titanium_furnace',
      icon: ITEMS['titanium_furnace'].icon,
      name: ITEMS['titanium_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'tungsten_essence',
      icon: ITEMS['tungsten_essence'].icon,
      name: ITEMS['tungsten_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'blue_gum_log',
      icon: ITEMS['blue_gum_log'].icon,
      name: ITEMS['blue_gum_log'].name,
      amount: 50,
      consumes: true
    }, {
      type: 'item',
      itemId: 'tungsten_bar',
      icon: ITEMS['tungsten_bar'].icon,
      name: ITEMS['tungsten_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 50
    }]
  }
}
