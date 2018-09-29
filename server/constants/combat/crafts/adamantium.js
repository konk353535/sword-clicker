import { ITEMS } from '/server/constants/items/index.js'; 

export const ADAMANTIUM_CRAFTS = {
  adamantium_dagger: {
    produces: 'adamantium_dagger',
    name: 'adamantium dagger',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'adamantium_dagger',
    timeToCraft: 30 * 60 * 2,
    xp: 87500,
    maxToCraft: 1,
    tags: ['weapon'],
    requiredCraftingLevel: 70,
    required: [{
      type: 'item',
      itemId: 'mithril_furnace',
      icon: ITEMS['mithril_furnace'].icon,
      name: ITEMS['mithril_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'adamantium_essence',
      icon: ITEMS['adamantium_essence'].icon,
      name: ITEMS['adamantium_essence'].name,
      amount: 2,
      consumes: true
    }, {
      type: 'item',
      itemId: 'hickory_log',
      icon: ITEMS['hickory_log'].icon,
      name: ITEMS['hickory_log'].name,
      amount: 3,
      consumes: true
    }, {
      type: 'item',
      itemId: 'adamantium_bar',
      icon: ITEMS['adamantium_bar'].icon,
      name: ITEMS['adamantium_bar'].name,
      amount: 3,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 70
    }]
  },

  adamantium_spear: {
    produces: 'adamantium_spear',
    name: 'adamantium spear',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'adamantium_spear',
    timeToCraft: 60 * 60 * 2,
    xp: 175000,
    maxToCraft: 1,
    tags: ['weapon'],
    requiredCraftingLevel: 70,
    required: [{
      type: 'item',
      itemId: 'mithril_furnace',
      icon: ITEMS['mithril_furnace'].icon,
      name: ITEMS['mithril_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'adamantium_essence',
      icon: ITEMS['adamantium_essence'].icon,
      name: ITEMS['adamantium_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'hickory_log',
      icon: ITEMS['hickory_log'].icon,
      name: ITEMS['hickory_log'].name,
      amount: 20,
      consumes: true
    }, {
      type: 'item',
      itemId: 'adamantium_bar',
      icon: ITEMS['adamantium_bar'].icon,
      name: ITEMS['adamantium_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 70
    }]
  },

  adamantium_short_sword: {
    produces: 'adamantium_short_sword',
    name: 'adamantium short sword',
    category: 'combat',
    recipeFor: 'crafting',
    id: 'adamantium_short_sword',
    timeToCraft: 60 * 60 * 2,
    xp: 175000,
    maxToCraft: 1,
    tags: ['weapon'],
    requiredCraftingLevel: 70,
    required: [{
      type: 'item',
      itemId: 'mithril_furnace',
      icon: ITEMS['mithril_furnace'].icon,
      name: ITEMS['mithril_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'adamantium_essence',
      icon: ITEMS['adamantium_essence'].icon,
      name: ITEMS['adamantium_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'hickory_log',
      icon: ITEMS['hickory_log'].icon,
      name: ITEMS['hickory_log'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'item',
      itemId: 'adamantium_bar',
      icon: ITEMS['adamantium_bar'].icon,
      name: ITEMS['adamantium_bar'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 70
    }]
  },

  adamantium_long_sword: {
    produces: 'adamantium_long_sword',
    name: 'adamantium long sword',
    category: 'combat',
    recipeFor: 'crafting',
    id: 'adamantium_long_sword',
    timeToCraft: 90 * 60,
    xp: 350000,
    maxToCraft: 1,
    tags: ['weapon'],
    requiredCraftingLevel: 70,
    required: [{
      type: 'item',
      itemId: 'mithril_furnace',
      icon: ITEMS['mithril_furnace'].icon,
      name: ITEMS['mithril_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'adamantium_essence',
      icon: ITEMS['adamantium_essence'].icon,
      name: ITEMS['adamantium_essence'].name,
      amount: 8,
      consumes: true
    }, {
      type: 'item',
      itemId: 'hickory_log',
      icon: ITEMS['hickory_log'].icon,
      name: ITEMS['hickory_log'].name,
      amount: 15,
      consumes: true
    }, {
      type: 'item',
      itemId: 'adamantium_bar',
      icon: ITEMS['adamantium_bar'].icon,
      name: ITEMS['adamantium_bar'].name,
      amount: 20,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 70
    }]
  },

  adamantium_battle_axe: {
    recipeFor: 'crafting',
    produces: 'adamantium_battle_axe',
    name: 'adamantium battle axe',
    category: 'combat',
    id: 'adamantium_battle_axe',
    timeToCraft: 90 * 60,
    xp: 350000,
    maxToCraft: 1,
    tags: ['weapon'],
    requiredCraftingLevel: 70,
    required: [{
      type: 'item',
      itemId: 'mithril_furnace',
      icon: ITEMS['mithril_furnace'].icon,
      name: ITEMS['mithril_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'adamantium_essence',
      icon: ITEMS['adamantium_essence'].icon,
      name: ITEMS['adamantium_essence'].name,
      amount: 8,
      consumes: true
    }, {
      type: 'item',
      itemId: 'hickory_log',
      icon: ITEMS['hickory_log'].icon,
      name: ITEMS['hickory_log'].name,
      amount: 50,
      consumes: true
    }, {
      type: 'item',
      itemId: 'adamantium_bar',
      icon: ITEMS['adamantium_bar'].icon,
      name: ITEMS['adamantium_bar'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 70
    }]
  },

  adamantium_helmet: {
    recipeFor: 'crafting',
    produces: 'adamantium_helmet',
    name: 'adamantium helmet',
    category: 'combat',
    id: 'adamantium_helmet',
    timeToCraft: 60 * 60 * 2,
    xp: 175000,
    maxToCraft: 1,
    tags: ['armor'],
    requiredCraftingLevel: 70,
    required: [{
      type: 'item',
      itemId: 'mithril_furnace',
      icon: ITEMS['mithril_furnace'].icon,
      name: ITEMS['mithril_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'adamantium_essence',
      icon: ITEMS['adamantium_essence'].icon,
      name: ITEMS['adamantium_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'hickory_log',
      icon: ITEMS['hickory_log'].icon,
      name: ITEMS['hickory_log'].name,
      amount: 25,
      consumes: true
    }, {
      type: 'item',
      itemId: 'adamantium_bar',
      icon: ITEMS['adamantium_bar'].icon,
      name: ITEMS['adamantium_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 70
    }]
  },

  adamantium_chest_plate: {
    recipeFor: 'crafting',
    produces: 'adamantium_chest_plate',
    name: 'adamantium chest plate',
    category: 'combat',
    id: 'adamantium_chest_plate',
    timeToCraft: 60 * 60 * 2,
    xp: 175000,
    maxToCraft: 1,
    tags: ['armor'],
    requiredCraftingLevel: 70,
    required: [{
      type: 'item',
      itemId: 'mithril_furnace',
      icon: ITEMS['mithril_furnace'].icon,
      name: ITEMS['mithril_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'adamantium_essence',
      icon: ITEMS['adamantium_essence'].icon,
      name: ITEMS['adamantium_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'hickory_log',
      icon: ITEMS['hickory_log'].icon,
      name: ITEMS['hickory_log'].name,
      amount: 25,
      consumes: true
    }, {
      type: 'item',
      itemId: 'adamantium_bar',
      icon: ITEMS['adamantium_bar'].icon,
      name: ITEMS['adamantium_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 70
    }]
  },

  adamantium_plate_legs: {
    recipeFor: 'crafting',
    produces: 'adamantium_plate_legs',
    name: 'adamantium plate legs',
    category: 'combat',
    id: 'adamantium_plate_legs',
    timeToCraft: 60 * 60 * 2, // 60
    xp: 175000,
    maxToCraft: 1,
    tags: ['armor'],
    requiredCraftingLevel: 70,
    required: [{
      type: 'item',
      itemId: 'mithril_furnace',
      icon: ITEMS['mithril_furnace'].icon,
      name: ITEMS['mithril_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'adamantium_essence',
      icon: ITEMS['adamantium_essence'].icon,
      name: ITEMS['adamantium_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'hickory_log',
      icon: ITEMS['hickory_log'].icon,
      name: ITEMS['hickory_log'].name,
      amount: 25,
      consumes: true
    }, {
      type: 'item',
      itemId: 'adamantium_bar',
      icon: ITEMS['adamantium_bar'].icon,
      name: ITEMS['adamantium_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 70
    }]
  },

  adamantium_shield: {
    recipeFor: 'crafting',
    produces: 'adamantium_shield',
    name: 'adamantium shield',
    category: 'combat',
    id: 'adamantium_shield',
    timeToCraft: 60 * 60 * 2, // 60
    xp: 175000,
    maxToCraft: 1,
    tags: ['weapon'],
    requiredCraftingLevel: 70,
    required: [{
      type: 'item',
      itemId: 'mithril_furnace',
      icon: ITEMS['mithril_furnace'].icon,
      name: ITEMS['mithril_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'adamantium_essence',
      icon: ITEMS['adamantium_essence'].icon,
      name: ITEMS['adamantium_essence'].name,
      amount: 4,
      consumes: true
    }, {
      type: 'item',
      itemId: 'hickory_log',
      icon: ITEMS['hickory_log'].icon,
      name: ITEMS['hickory_log'].name,
      amount: 50,
      consumes: true
    }, {
      type: 'item',
      itemId: 'adamantium_bar',
      icon: ITEMS['adamantium_bar'].icon,
      name: ITEMS['adamantium_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 70
    }]
  }
}
