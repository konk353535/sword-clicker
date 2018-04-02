import { ITEMS } from '/server/constants/items/index.js';

const CURSED_ESS_XP = 500000;
const ADA_ESS_XP = 43750;

export const DARKSTEEL_CRAFTS = {
  darksteel_dagger: {
    produces: 'darksteel_dagger',
    name: 'darksteel dagger',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'darksteel_dagger',
    isHidden: true,
    timeToCraft: 30 * 60 * 2,
    xp: (CURSED_ESS_XP * 2) + (ADA_ESS_XP * 2),
    maxToCraft: 1,
    tags: ['weapon', 'dagger'],
    requiredCraftingLevel: 100,
    required: [{
      type: 'item',
      itemId: 'cursed_furnace',
      icon: ITEMS['cursed_furnace'].icon,
      name: ITEMS['cursed_furnace'].name,
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
      itemId: 'cursed_essence',
      icon: ITEMS['cursed_essence'].icon,
      name: ITEMS['cursed_essence'].name,
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
      itemId: 'teak_log',
      icon: ITEMS['teak_log'].icon,
      name: ITEMS['teak_log'].name,
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
      type: 'item',
      itemId: 'cursed_bar',
      icon: ITEMS['cursed_bar'].icon,
      name: ITEMS['cursed_bar'].name,
      amount: 3,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 100
    }]
  },

  darksteel_spear: {
    produces: 'darksteel_spear',
    name: 'darksteel spear',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'darksteel_spear',
    isHidden: true,
    timeToCraft: 60 * 60 * 2,
    xp: (CURSED_ESS_XP * 4) + (ADA_ESS_XP * 4),
    maxToCraft: 1,
    tags: ['weapon', 'spear'],
    requiredCraftingLevel: 100,
    required: [{
      type: 'item',
      itemId: 'cursed_furnace',
      icon: ITEMS['cursed_furnace'].icon,
      name: ITEMS['cursed_furnace'].name,
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
      itemId: 'cursed_essence',
      icon: ITEMS['cursed_essence'].icon,
      name: ITEMS['cursed_essence'].name,
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
      itemId: 'teak_log',
      icon: ITEMS['teak_log'].icon,
      name: ITEMS['teak_log'].name,
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
      type: 'item',
      itemId: 'cursed_bar',
      icon: ITEMS['cursed_bar'].icon,
      name: ITEMS['cursed_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 100
    }]
  },

  darksteel_short_sword: {
    produces: 'darksteel_short_sword',
    name: 'darksteel short sword',
    category: 'combat',
    recipeFor: 'crafting',
    id: 'darksteel_short_sword',
    isHidden: true,
    timeToCraft: 60 * 60 * 2,
    xp: (CURSED_ESS_XP * 4) + (ADA_ESS_XP * 4),
    maxToCraft: 1,
    tags: ['weapon', 'shortsword'],
    requiredCraftingLevel: 100,
    required: [{
      type: 'item',
      itemId: 'cursed_furnace',
      icon: ITEMS['cursed_furnace'].icon,
      name: ITEMS['cursed_furnace'].name,
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
      itemId: 'cursed_essence',
      icon: ITEMS['cursed_essence'].icon,
      name: ITEMS['cursed_essence'].name,
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
      itemId: 'teak_log',
      icon: ITEMS['teak_log'].icon,
      name: ITEMS['teak_log'].name,
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
      type: 'item',
      itemId: 'cursed_bar',
      icon: ITEMS['cursed_bar'].icon,
      name: ITEMS['cursed_bar'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 100
    }]
  },

  darksteel_long_sword: {
    produces: 'darksteel_long_sword',
    name: 'darksteel long sword',
    category: 'combat',
    recipeFor: 'crafting',
    id: 'darksteel_long_sword',
    isHidden: true,
    timeToCraft: 90 * 60,
    xp: (CURSED_ESS_XP * 8) + (ADA_ESS_XP * 8),
    maxToCraft: 1,
    tags: ['weapon', 'longsword'],
    requiredCraftingLevel: 100,
    required: [{
      type: 'item',
      itemId: 'cursed_furnace',
      icon: ITEMS['cursed_furnace'].icon,
      name: ITEMS['cursed_furnace'].name,
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
      itemId: 'cursed_essence',
      icon: ITEMS['cursed_essence'].icon,
      name: ITEMS['cursed_essence'].name,
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
      itemId: 'teak_log',
      icon: ITEMS['teak_log'].icon,
      name: ITEMS['teak_log'].name,
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
      type: 'item',
      itemId: 'cursed_bar',
      icon: ITEMS['cursed_bar'].icon,
      name: ITEMS['cursed_bar'].name,
      amount: 20,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 100
    }]
  },

  darksteel_battle_axe: {
    recipeFor: 'crafting',
    produces: 'darksteel_battle_axe',
    name: 'darksteel battle axe',
    category: 'combat',
    id: 'darksteel_battle_axe',
    isHidden: true,
    timeToCraft: 90 * 60,
    xp: (CURSED_ESS_XP * 8) + (ADA_ESS_XP * 8),
    maxToCraft: 1,
    tags: ['weapon', 'battleaxe'],
    requiredCraftingLevel: 100,
    required: [{
      type: 'item',
      itemId: 'cursed_furnace',
      icon: ITEMS['cursed_furnace'].icon,
      name: ITEMS['cursed_furnace'].name,
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
      itemId: 'cursed_essence',
      icon: ITEMS['cursed_essence'].icon,
      name: ITEMS['cursed_essence'].name,
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
      itemId: 'teak_log',
      icon: ITEMS['teak_log'].icon,
      name: ITEMS['teak_log'].name,
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
      type: 'item',
      itemId: 'cursed_bar',
      icon: ITEMS['cursed_bar'].icon,
      name: ITEMS['cursed_bar'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 100
    }]
  },

  darksteel_helmet: {
    recipeFor: 'crafting',
    produces: 'darksteel_helmet',
    name: 'darksteel helmet',
    category: 'combat',
    id: 'darksteel_helmet',
    isHidden: true,
    timeToCraft: 60 * 60 * 2,
    xp: (CURSED_ESS_XP * 4) + (ADA_ESS_XP * 4),
    maxToCraft: 1,
    tags: ['armor', 'helmet'],
    requiredCraftingLevel: 100,
    required: [{
      type: 'item',
      itemId: 'cursed_furnace',
      icon: ITEMS['cursed_furnace'].icon,
      name: ITEMS['cursed_furnace'].name,
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
      itemId: 'cursed_essence',
      icon: ITEMS['cursed_essence'].icon,
      name: ITEMS['cursed_essence'].name,
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
      itemId: 'teak_log',
      icon: ITEMS['teak_log'].icon,
      name: ITEMS['teak_log'].name,
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
      type: 'item',
      itemId: 'cursed_bar',
      icon: ITEMS['cursed_bar'].icon,
      name: ITEMS['cursed_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 100
    }]
  },

  darksteel_chest_plate: {
    recipeFor: 'crafting',
    produces: 'darksteel_chest_plate',
    name: 'darksteel chest plate',
    category: 'combat',
    id: 'darksteel_chest_plate',
    isHidden: true,
    timeToCraft: 60 * 60 * 2,
    xp: (CURSED_ESS_XP * 4) + (ADA_ESS_XP * 4),
    maxToCraft: 1,
    tags: ['armor', 'chest'],
    requiredCraftingLevel: 100,
    required: [{
      type: 'item',
      itemId: 'cursed_furnace',
      icon: ITEMS['cursed_furnace'].icon,
      name: ITEMS['cursed_furnace'].name,
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
      itemId: 'cursed_essence',
      icon: ITEMS['cursed_essence'].icon,
      name: ITEMS['cursed_essence'].name,
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
      itemId: 'teak_log',
      icon: ITEMS['teak_log'].icon,
      name: ITEMS['teak_log'].name,
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
      type: 'item',
      itemId: 'cursed_bar',
      icon: ITEMS['cursed_bar'].icon,
      name: ITEMS['cursed_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 100
    }]
  },

  darksteel_plate_legs: {
    recipeFor: 'crafting',
    produces: 'darksteel_plate_legs',
    name: 'darksteel plate legs',
    category: 'combat',
    id: 'darksteel_plate_legs',
    isHidden: true,
    timeToCraft: 60 * 60 * 2, // 60
    xp: (CURSED_ESS_XP * 4) + (ADA_ESS_XP * 4),
    maxToCraft: 1,
    tags: ['armor', 'legs'],
    requiredCraftingLevel: 100,
    required: [{
      type: 'item',
      itemId: 'cursed_furnace',
      icon: ITEMS['cursed_furnace'].icon,
      name: ITEMS['cursed_furnace'].name,
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
      itemId: 'cursed_essence',
      icon: ITEMS['cursed_essence'].icon,
      name: ITEMS['cursed_essence'].name,
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
      itemId: 'teak_log',
      icon: ITEMS['teak_log'].icon,
      name: ITEMS['teak_log'].name,
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
      type: 'item',
      itemId: 'cursed_bar',
      icon: ITEMS['cursed_bar'].icon,
      name: ITEMS['cursed_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 100
    }]
  },

  darksteel_shield: {
    recipeFor: 'crafting',
    produces: 'darksteel_shield',
    name: 'darksteel shield',
    category: 'combat',
    id: 'darksteel_shield',
    isHidden: true,
    timeToCraft: 60 * 60 * 2, // 60
    xp: (CURSED_ESS_XP * 4) + (ADA_ESS_XP * 4),
    maxToCraft: 1,
    tags: ['weapon', 'armor', 'shield'],
    requiredCraftingLevel: 100,
    required: [{
      type: 'item',
      itemId: 'cursed_furnace',
      icon: ITEMS['cursed_furnace'].icon,
      name: ITEMS['cursed_furnace'].name,
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
      itemId: 'cursed_essence',
      icon: ITEMS['cursed_essence'].icon,
      name: ITEMS['cursed_essence'].name,
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
      itemId: 'teak_log',
      icon: ITEMS['teak_log'].icon,
      name: ITEMS['teak_log'].name,
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
      type: 'item',
      itemId: 'cursed_bar',
      icon: ITEMS['cursed_bar'].icon,
      name: ITEMS['cursed_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 100
    }]
  }
}
