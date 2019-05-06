import { ITEMS } from '/imports/constants/items/index.js';

const CURSED_ESS_XP = 500000;
const BONUS_XP = 357000;
const PRISMATIC_BONUS_XP = 5;
const PRISMATIC_RESOURCE_HOG = 5;

export const PRISMATIC_CRAFTS = {
  prismatic_dagger: {
    produces: 'prismatic_dagger',
    name: 'prismatic dagger',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'prismatic_dagger',
    isHidden: true,
    timeToCraft: 30 * 60 * 2,
    xp: 20000000,
    maxToCraft: 1,
    tags: ['weapon'],
    requiredCraftingLevel: 130,
    required: [{
      type: 'item',
      itemId: 'eternium_furnace',
      icon: ITEMS['eternium_furnace'].icon,
      name: ITEMS['eternium_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'purestone_essence',
      icon: ITEMS['purestone_essence'].icon,
      name: ITEMS['purestone_essence'].name,
      amount: 6,
      consumes: true
    }, {
      type: 'item',
      itemId: 'purestone_bar',
      icon: ITEMS['purestone_bar'].icon,
      name: ITEMS['purestone_bar'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'item',
      itemId: 'spiritroot_log',
      icon: ITEMS['spiritroot_log'].icon,
      name: ITEMS['spiritroot_log'].name,
      amount: 25,
      consumes: true
    }, {
      type: 'item',
      itemId: 'eternium_dagger',
      icon: ITEMS['eternium_dagger'].icon,
      name: ITEMS['eternium_dagger'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'skill',
      name: 'crafting',
      level: 130
    }]
  },

  prismatic_spear: {
    produces: 'prismatic_spear',
    name: 'prismatic spear',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'prismatic_spear',
    isHidden: true,
    timeToCraft: 60 * 60 * 2,
    xp: 50000000,
    maxToCraft: 1,
    tags: ['weapon'],
    requiredCraftingLevel: 130,
    required: [{
      type: 'item',
      itemId: 'eternium_furnace',
      icon: ITEMS['eternium_furnace'].icon,
      name: ITEMS['eternium_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'purestone_essence',
      icon: ITEMS['purestone_essence'].icon,
      name: ITEMS['purestone_essence'].name,
      amount: 12,
      consumes: true
    }, {
      type: 'item',
      itemId: 'purestone_bar',
      icon: ITEMS['purestone_bar'].icon,
      name: ITEMS['purestone_bar'].name,
      amount: 20,
      consumes: true
    }, {
      type: 'item',
      itemId: 'spiritroot_log',
      icon: ITEMS['spiritroot_log'].icon,
      name: ITEMS['spiritroot_log'].name,
      amount: 50,
      consumes: true
    }, {
      type: 'item',
      itemId: 'eternium_spear',
      icon: ITEMS['eternium_spear'].icon,
      name: ITEMS['eternium_spear'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'skill',
      name: 'crafting',
      level: 130
    }]
  },

  prismatic_short_sword: {
    produces: 'prismatic_short_sword',
    name: 'prismatic short sword',
    category: 'combat',
    recipeFor: 'crafting',
    id: 'prismatic_short_sword',
    isHidden: true,
    timeToCraft: 60 * 60 * 2,
    xp: 50000000,
    maxToCraft: 1,
    tags: ['weapon'],
    requiredCraftingLevel: 130,
    required: [{
      type: 'item',
      itemId: 'eternium_furnace',
      icon: ITEMS['eternium_furnace'].icon,
      name: ITEMS['eternium_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'purestone_essence',
      icon: ITEMS['purestone_essence'].icon,
      name: ITEMS['purestone_essence'].name,
      amount: 12,
      consumes: true
    }, {
      type: 'item',
      itemId: 'purestone_bar',
      icon: ITEMS['purestone_bar'].icon,
      name: ITEMS['purestone_bar'].name,
      amount: 20,
      consumes: true
    }, {
      type: 'item',
      itemId: 'spiritroot_log',
      icon: ITEMS['spiritroot_log'].icon,
      name: ITEMS['spiritroot_log'].name,
      amount: 50,
      consumes: true
    }, {
      type: 'item',
      itemId: 'eternium_short_sword',
      icon: ITEMS['eternium_short_sword'].icon,
      name: ITEMS['eternium_short_sword'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'skill',
      name: 'crafting',
      level: 130
    }]
  },

  prismatic_long_sword: {
    produces: 'prismatic_long_sword',
    name: 'prismatic long sword',
    category: 'combat',
    recipeFor: 'crafting',
    id: 'prismatic_long_sword',
    isHidden: true,
    timeToCraft: 90 * 60,
    xp: 100000000,
    maxToCraft: 1,
    tags: ['weapon'],
    requiredCraftingLevel: 130,
    required: [{
      type: 'item',
      itemId: 'eternium_furnace',
      icon: ITEMS['eternium_furnace'].icon,
      name: ITEMS['eternium_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'purestone_essence',
      icon: ITEMS['purestone_essence'].icon,
      name: ITEMS['purestone_essence'].name,
      amount: 25,
      consumes: true
    }, {
      type: 'item',
      itemId: 'purestone_bar',
      icon: ITEMS['purestone_bar'].icon,
      name: ITEMS['purestone_bar'].name,
      amount: 40,
      consumes: true
    }, {
      type: 'item',
      itemId: 'spiritroot_log',
      icon: ITEMS['spiritroot_log'].icon,
      name: ITEMS['spiritroot_log'].name,
      amount: 100,
      consumes: true
    }, {
      type: 'item',
      itemId: 'eternium_long_sword',
      icon: ITEMS['eternium_long_sword'].icon,
      name: ITEMS['eternium_long_sword'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'skill',
      name: 'crafting',
      level: 130
    }]
  },

  prismatic_battle_axe: {
    recipeFor: 'crafting',
    produces: 'prismatic_battle_axe',
    name: 'prismatic battle axe',
    category: 'combat',
    id: 'prismatic_battle_axe',
    isHidden: true,
    timeToCraft: 90 * 60,
    xp: 100000000,
    maxToCraft: 1,
    tags: ['weapon'],
    requiredCraftingLevel: 130,
    required: [{
      type: 'item',
      itemId: 'eternium_furnace',
      icon: ITEMS['eternium_furnace'].icon,
      name: ITEMS['eternium_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'purestone_essence',
      icon: ITEMS['purestone_essence'].icon,
      name: ITEMS['purestone_essence'].name,
      amount: 25,
      consumes: true
    }, {
      type: 'item',
      itemId: 'purestone_bar',
      icon: ITEMS['purestone_bar'].icon,
      name: ITEMS['purestone_bar'].name,
      amount: 40,
      consumes: true
    }, {
      type: 'item',
      itemId: 'spiritroot_log',
      icon: ITEMS['spiritroot_log'].icon,
      name: ITEMS['spiritroot_log'].name,
      amount: 100,
      consumes: true
    }, {
      type: 'item',
      itemId: 'eternium_battle_axe',
      icon: ITEMS['eternium_battle_axe'].icon,
      name: ITEMS['eternium_battle_axe'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'skill',
      name: 'crafting',
      level: 130
    }]
  },

  prismatic_helmet: {
    recipeFor: 'crafting',
    produces: 'prismatic_helmet',
    name: 'prismatic helmet',
    category: 'combat',
    id: 'prismatic_helmet',
    isHidden: true,
    timeToCraft: 60 * 60 * 2,
    xp: 50000000,
    maxToCraft: 1,
    tags: ['armor'],
    requiredCraftingLevel: 130,
    required: [{
      type: 'item',
      itemId: 'eternium_furnace',
      icon: ITEMS['eternium_furnace'].icon,
      name: ITEMS['eternium_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'purestone_essence',
      icon: ITEMS['purestone_essence'].icon,
      name: ITEMS['purestone_essence'].name,
      amount: 12,
      consumes: true
    }, {
      type: 'item',
      itemId: 'purestone_bar',
      icon: ITEMS['purestone_bar'].icon,
      name: ITEMS['purestone_bar'].name,
      amount: 20,
      consumes: true
    }, {
      type: 'item',
      itemId: 'spiritroot_log',
      icon: ITEMS['spiritroot_log'].icon,
      name: ITEMS['spiritroot_log'].name,
      amount: 50,
      consumes: true
    }, {
      type: 'item',
      itemId: 'eternium_helmet',
      icon: ITEMS['eternium_helmet'].icon,
      name: ITEMS['eternium_helmet'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'skill',
      name: 'crafting',
      level: 130
    }]
  },

  prismatic_chest_plate: {
    recipeFor: 'crafting',
    produces: 'prismatic_chest_plate',
    name: 'prismatic chest plate',
    category: 'combat',
    id: 'prismatic_chest_plate',
    isHidden: true,
    timeToCraft: 60 * 60 * 2,
    xp: 50000000,
    maxToCraft: 1,
    tags: ['armor'],
    requiredCraftingLevel: 130,
    required: [{
      type: 'item',
      itemId: 'eternium_furnace',
      icon: ITEMS['eternium_furnace'].icon,
      name: ITEMS['eternium_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'purestone_essence',
      icon: ITEMS['purestone_essence'].icon,
      name: ITEMS['purestone_essence'].name,
      amount: 12,
      consumes: true
    }, {
      type: 'item',
      itemId: 'purestone_bar',
      icon: ITEMS['purestone_bar'].icon,
      name: ITEMS['purestone_bar'].name,
      amount: 20,
      consumes: true
    }, {
      type: 'item',
      itemId: 'spiritroot_log',
      icon: ITEMS['spiritroot_log'].icon,
      name: ITEMS['spiritroot_log'].name,
      amount: 50,
      consumes: true
    }, {
      type: 'item',
      itemId: 'eternium_chest_plate',
      icon: ITEMS['eternium_chest_plate'].icon,
      name: ITEMS['eternium_chest_plate'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'skill',
      name: 'crafting',
      level: 130
    }]
  },

  prismatic_plate_legs: {
    recipeFor: 'crafting',
    produces: 'prismatic_plate_legs',
    name: 'prismatic plate legs',
    category: 'combat',
    id: 'prismatic_plate_legs',
    isHidden: true,
    timeToCraft: 60 * 60 * 2, // 60
    xp: 50000000,
    maxToCraft: 1,
    tags: ['armor'],
    requiredCraftingLevel: 130,
    required: [{
      type: 'item',
      itemId: 'eternium_furnace',
      icon: ITEMS['eternium_furnace'].icon,
      name: ITEMS['eternium_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'purestone_essence',
      icon: ITEMS['purestone_essence'].icon,
      name: ITEMS['purestone_essence'].name,
      amount: 12,
      consumes: true
    }, {
      type: 'item',
      itemId: 'purestone_bar',
      icon: ITEMS['purestone_bar'].icon,
      name: ITEMS['purestone_bar'].name,
      amount: 20,
      consumes: true
    }, {
      type: 'item',
      itemId: 'spiritroot_log',
      icon: ITEMS['spiritroot_log'].icon,
      name: ITEMS['spiritroot_log'].name,
      amount: 50,
      consumes: true
    }, {
      type: 'item',
      itemId: 'eternium_plate_legs',
      icon: ITEMS['eternium_plate_legs'].icon,
      name: ITEMS['eternium_plate_legs'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'skill',
      name: 'crafting',
      level: 130
    }]
  },

  prismatic_shield: {
    recipeFor: 'crafting',
    produces: 'prismatic_shield',
    name: 'prismatic shield',
    category: 'combat',
    id: 'prismatic_shield',
    isHidden: true,
    timeToCraft: 60 * 60 * 2, // 60
    xp: 50000000,
    maxToCraft: 1,
    tags: ['weapon'],
    requiredCraftingLevel: 130,
    required: [{
      type: 'item',
      itemId: 'eternium_furnace',
      icon: ITEMS['eternium_furnace'].icon,
      name: ITEMS['eternium_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'purestone_essence',
      icon: ITEMS['purestone_essence'].icon,
      name: ITEMS['purestone_essence'].name,
      amount: 12,
      consumes: true
    }, {
      type: 'item',
      itemId: 'purestone_bar',
      icon: ITEMS['purestone_bar'].icon,
      name: ITEMS['purestone_bar'].name,
      amount: 20,
      consumes: true
    }, {
      type: 'item',
      itemId: 'spiritroot_log',
      icon: ITEMS['spiritroot_log'].icon,
      name: ITEMS['spiritroot_log'].name,
      amount: 50,
      consumes: true
    }, {
      type: 'item',
      itemId: 'eternium_shield',
      icon: ITEMS['eternium_shield'].icon,
      name: ITEMS['eternium_shield'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'skill',
      name: 'crafting',
      level: 130
    }]
  }
};
