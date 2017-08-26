import { ITEMS } from '/server/constants/items/index.js'; 

export const ORICHALCUM_CRAFTS = {
  orichalcum_dagger: {
    produces: 'orichalcum_dagger',
    name: 'orichalcum dagger',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'orichalcum_dagger',
    timeToCraft: 30 * 60 * 2,
    xp: 1700,
    maxToCraft: 1,
    requiredCraftingLevel: 75,
    required: [{
      type: 'item',
      itemId: 'adamantium_furnace',
      icon: ITEMS['adamantium_furnace'].icon,
      name: ITEMS['adamantium_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'orichalcum_essence',
      icon: ITEMS['orichalcum_essence'].icon,
      name: ITEMS['orichalcum_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'larch_log',
      icon: ITEMS['larch_log'].icon,
      name: ITEMS['larch_log'].name,
      amount: 3,
      consumes: true
    }, {
      type: 'item',
      itemId: 'orichalcum_bar',
      icon: ITEMS['orichalcum_bar'].icon,
      name: ITEMS['orichalcum_bar'].name,
      amount: 3,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 75
    }]
  },

  orichalcum_spear: {
    produces: 'orichalcum_spear',
    name: 'orichalcum spear',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'orichalcum_spear',
    timeToCraft: 60 * 60 * 2,
    xp: 4200,
    maxToCraft: 1,
    requiredCraftingLevel: 75,
    required: [{
      type: 'item',
      itemId: 'adamantium_furnace',
      icon: ITEMS['adamantium_furnace'].icon,
      name: ITEMS['adamantium_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'orichalcum_essence',
      icon: ITEMS['orichalcum_essence'].icon,
      name: ITEMS['orichalcum_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'larch_log',
      icon: ITEMS['larch_log'].icon,
      name: ITEMS['larch_log'].name,
      amount: 20,
      consumes: true
    }, {
      type: 'item',
      itemId: 'orichalcum_bar',
      icon: ITEMS['orichalcum_bar'].icon,
      name: ITEMS['orichalcum_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 75
    }]
  },

  orichalcum_short_sword: {
    produces: 'orichalcum_short_sword',
    name: 'orichalcum short sword',
    category: 'combat',
    recipeFor: 'crafting',
    id: 'orichalcum_short_sword',
    timeToCraft: 60 * 60 * 2,
    xp: 4200,
    maxToCraft: 1,
    requiredCraftingLevel: 75,
    required: [{
      type: 'item',
      itemId: 'adamantium_furnace',
      icon: ITEMS['adamantium_furnace'].icon,
      name: ITEMS['adamantium_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'orichalcum_essence',
      icon: ITEMS['orichalcum_essence'].icon,
      name: ITEMS['orichalcum_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'larch_log',
      icon: ITEMS['larch_log'].icon,
      name: ITEMS['larch_log'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'item',
      itemId: 'orichalcum_bar',
      icon: ITEMS['orichalcum_bar'].icon,
      name: ITEMS['orichalcum_bar'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 75
    }]
  },

  orichalcum_long_sword: {
    produces: 'orichalcum_long_sword',
    name: 'orichalcum long sword',
    category: 'combat',
    recipeFor: 'crafting',
    id: 'orichalcum_long_sword',
    timeToCraft: 90 * 60,
    xp: 4650,
    maxToCraft: 1,
    requiredCraftingLevel: 75,
    required: [{
      type: 'item',
      itemId: 'adamantium_furnace',
      icon: ITEMS['adamantium_furnace'].icon,
      name: ITEMS['adamantium_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'orichalcum_essence',
      icon: ITEMS['orichalcum_essence'].icon,
      name: ITEMS['orichalcum_essence'].name,
      amount: 8,
      consumes: true
    }, {
      type: 'item',
      itemId: 'larch_log',
      icon: ITEMS['larch_log'].icon,
      name: ITEMS['larch_log'].name,
      amount: 15,
      consumes: true
    }, {
      type: 'item',
      itemId: 'orichalcum_bar',
      icon: ITEMS['orichalcum_bar'].icon,
      name: ITEMS['orichalcum_bar'].name,
      amount: 20,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 75
    }]
  },

  orichalcum_battle_axe: {
    recipeFor: 'crafting',
    produces: 'orichalcum_battle_axe',
    name: 'orichalcum battle axe',
    category: 'combat',
    id: 'orichalcum_battle_axe',
    timeToCraft: 90 * 60,
    xp: 4650,
    maxToCraft: 1,
    requiredCraftingLevel: 75,
    required: [{
      type: 'item',
      itemId: 'adamantium_furnace',
      icon: ITEMS['adamantium_furnace'].icon,
      name: ITEMS['adamantium_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'orichalcum_essence',
      icon: ITEMS['orichalcum_essence'].icon,
      name: ITEMS['orichalcum_essence'].name,
      amount: 8,
      consumes: true
    }, {
      type: 'item',
      itemId: 'larch_log',
      icon: ITEMS['larch_log'].icon,
      name: ITEMS['larch_log'].name,
      amount: 50,
      consumes: true
    }, {
      type: 'item',
      itemId: 'orichalcum_bar',
      icon: ITEMS['orichalcum_bar'].icon,
      name: ITEMS['orichalcum_bar'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 75
    }]
  },

  orichalcum_helmet: {
    recipeFor: 'crafting',
    produces: 'orichalcum_helmet',
    name: 'orichalcum helmet',
    category: 'combat',
    id: 'orichalcum_helmet',
    timeToCraft: 60 * 60 * 2,
    xp: 4200,
    maxToCraft: 1,
    requiredCraftingLevel: 75,
    required: [{
      type: 'item',
      itemId: 'adamantium_furnace',
      icon: ITEMS['adamantium_furnace'].icon,
      name: ITEMS['adamantium_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'orichalcum_essence',
      icon: ITEMS['orichalcum_essence'].icon,
      name: ITEMS['orichalcum_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'larch_log',
      icon: ITEMS['larch_log'].icon,
      name: ITEMS['larch_log'].name,
      amount: 25,
      consumes: true
    }, {
      type: 'item',
      itemId: 'orichalcum_bar',
      icon: ITEMS['orichalcum_bar'].icon,
      name: ITEMS['orichalcum_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 75
    }]
  },

  orichalcum_chest_plate: {
    recipeFor: 'crafting',
    produces: 'orichalcum_chest_plate',
    name: 'orichalcum chest plate',
    category: 'combat',
    id: 'orichalcum_chest_plate',
    timeToCraft: 60 * 60 * 2,
    xp: 4200,
    maxToCraft: 1,
    requiredCraftingLevel: 75,
    required: [{
      type: 'item',
      itemId: 'adamantium_furnace',
      icon: ITEMS['adamantium_furnace'].icon,
      name: ITEMS['adamantium_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'orichalcum_essence',
      icon: ITEMS['orichalcum_essence'].icon,
      name: ITEMS['orichalcum_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'larch_log',
      icon: ITEMS['larch_log'].icon,
      name: ITEMS['larch_log'].name,
      amount: 25,
      consumes: true
    }, {
      type: 'item',
      itemId: 'orichalcum_bar',
      icon: ITEMS['orichalcum_bar'].icon,
      name: ITEMS['orichalcum_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 75
    }]
  },

  orichalcum_plate_legs: {
    recipeFor: 'crafting',
    produces: 'orichalcum_plate_legs',
    name: 'orichalcum plate legs',
    category: 'combat',
    id: 'orichalcum_plate_legs',
    timeToCraft: 60 * 60 * 2, // 60
    xp: 4200,
    maxToCraft: 1,
    requiredCraftingLevel: 75,
    required: [{
      type: 'item',
      itemId: 'adamantium_furnace',
      icon: ITEMS['adamantium_furnace'].icon,
      name: ITEMS['adamantium_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'orichalcum_essence',
      icon: ITEMS['orichalcum_essence'].icon,
      name: ITEMS['orichalcum_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'larch_log',
      icon: ITEMS['larch_log'].icon,
      name: ITEMS['larch_log'].name,
      amount: 25,
      consumes: true
    }, {
      type: 'item',
      itemId: 'orichalcum_bar',
      icon: ITEMS['orichalcum_bar'].icon,
      name: ITEMS['orichalcum_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 75
    }]
  },

  orichalcum_shield: {
    recipeFor: 'crafting',
    produces: 'orichalcum_shield',
    name: 'orichalcum shield',
    category: 'combat',
    id: 'orichalcum_shield',
    timeToCraft: 60 * 60 * 2, // 60
    xp: 4200,
    maxToCraft: 1,
    requiredCraftingLevel: 75,
    required: [{
      type: 'item',
      itemId: 'adamantium_furnace',
      icon: ITEMS['adamantium_furnace'].icon,
      name: ITEMS['adamantium_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'orichalcum_essence',
      icon: ITEMS['orichalcum_essence'].icon,
      name: ITEMS['orichalcum_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'larch_log',
      icon: ITEMS['larch_log'].icon,
      name: ITEMS['larch_log'].name,
      amount: 50,
      consumes: true
    }, {
      type: 'item',
      itemId: 'orichalcum_bar',
      icon: ITEMS['orichalcum_bar'].icon,
      name: ITEMS['orichalcum_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 75
    }]
  }
}
