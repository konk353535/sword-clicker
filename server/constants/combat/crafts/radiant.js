import { ITEMS } from '/server/constants/items/index.js';

const CURSED_ESS_XP = 500000;
const ORI_ESS_XP = 62500;

export const RADIANT_CRAFTS = {
  radiant_dagger: {
    produces: 'radiant_dagger',
    name: 'radiant dagger',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'radiant_dagger',
    isHidden: true,
    timeToCraft: 30 * 60 * 2,
    xp: (CURSED_ESS_XP * 2) + (ORI_ESS_XP * 2),
    maxToCraft: 1,
    tags: ['weapon', 'dagger'],
    requiredCraftingLevel: 105,
    required: [{
      type: 'item',
      itemId: 'darksteel_furnace',
      icon: ITEMS['darksteel_furnace'].icon,
      name: ITEMS['darksteel_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'orichalcum_essence',
      icon: ITEMS['orichalcum_essence'].icon,
      name: ITEMS['orichalcum_essence'].name,
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
      itemId: 'larch_log',
      icon: ITEMS['larch_log'].icon,
      name: ITEMS['larch_log'].name,
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
      itemId: 'orichalcum_bar',
      icon: ITEMS['orichalcum_bar'].icon,
      name: ITEMS['orichalcum_bar'].name,
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
      type: 'item',
      itemId: 'darksteel_dagger',
      icon: ITEMS['darksteel_dagger'].icon,
      name: ITEMS['darksteel_dagger'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'skill',
      name: 'crafting',
      level: 105
    }]
  },

  radiant_spear: {
    produces: 'radiant_spear',
    name: 'radiant spear',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'radiant_spear',
    isHidden: true,
    timeToCraft: 60 * 60 * 2,
    xp: (CURSED_ESS_XP * 4) + (ORI_ESS_XP * 4),
    maxToCraft: 1,
    tags: ['weapon', 'spear'],
    requiredCraftingLevel: 105,
    required: [{
      type: 'item',
      itemId: 'darksteel_furnace',
      icon: ITEMS['darksteel_furnace'].icon,
      name: ITEMS['darksteel_furnace'].name,
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
      itemId: 'cursed_essence',
      icon: ITEMS['cursed_essence'].icon,
      name: ITEMS['cursed_essence'].name,
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
      itemId: 'teak_log',
      icon: ITEMS['teak_log'].icon,
      name: ITEMS['teak_log'].name,
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
      type: 'item',
      itemId: 'cursed_bar',
      icon: ITEMS['cursed_bar'].icon,
      name: ITEMS['cursed_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'item',
      itemId: 'darksteel_spear',
      icon: ITEMS['darksteel_spear'].icon,
      name: ITEMS['darksteel_spear'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'skill',
      name: 'crafting',
      level: 105
    }]
  },

  radiant_short_sword: {
    produces: 'radiant_short_sword',
    name: 'radiant short sword',
    category: 'combat',
    recipeFor: 'crafting',
    id: 'radiant_short_sword',
    isHidden: true,
    timeToCraft: 60 * 60 * 2,
    xp: (CURSED_ESS_XP * 4) + (ORI_ESS_XP * 4),
    maxToCraft: 1,
    tags: ['weapon', 'shortsword'],
    requiredCraftingLevel: 105,
    required: [{
      type: 'item',
      itemId: 'darksteel_furnace',
      icon: ITEMS['darksteel_furnace'].icon,
      name: ITEMS['darksteel_furnace'].name,
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
      itemId: 'cursed_essence',
      icon: ITEMS['cursed_essence'].icon,
      name: ITEMS['cursed_essence'].name,
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
      itemId: 'teak_log',
      icon: ITEMS['teak_log'].icon,
      name: ITEMS['teak_log'].name,
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
      type: 'item',
      itemId: 'cursed_bar',
      icon: ITEMS['cursed_bar'].icon,
      name: ITEMS['cursed_bar'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'item',
      itemId: 'darksteel_short_sword',
      icon: ITEMS['darksteel_short_sword'].icon,
      name: ITEMS['darksteel_short_sword'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'skill',
      name: 'crafting',
      level: 105
    }]
  },

  radiant_long_sword: {
    produces: 'radiant_long_sword',
    name: 'radiant long sword',
    category: 'combat',
    recipeFor: 'crafting',
    id: 'radiant_long_sword',
    isHidden: true,
    timeToCraft: 90 * 60,
    xp: (CURSED_ESS_XP * 8) + (ORI_ESS_XP * 8),
    maxToCraft: 1,
    tags: ['weapon', 'longsword'],
    requiredCraftingLevel: 105,
    required: [{
      type: 'item',
      itemId: 'darksteel_furnace',
      icon: ITEMS['darksteel_furnace'].icon,
      name: ITEMS['darksteel_furnace'].name,
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
      itemId: 'cursed_essence',
      icon: ITEMS['cursed_essence'].icon,
      name: ITEMS['cursed_essence'].name,
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
      itemId: 'teak_log',
      icon: ITEMS['teak_log'].icon,
      name: ITEMS['teak_log'].name,
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
      type: 'item',
      itemId: 'cursed_bar',
      icon: ITEMS['cursed_bar'].icon,
      name: ITEMS['cursed_bar'].name,
      amount: 20,
      consumes: true
    }, {
      type: 'item',
      itemId: 'darksteel_long_sword',
      icon: ITEMS['darksteel_long_sword'].icon,
      name: ITEMS['darksteel_long_sword'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'skill',
      name: 'crafting',
      level: 105
    }]
  },

  radiant_battle_axe: {
    recipeFor: 'crafting',
    produces: 'radiant_battle_axe',
    name: 'radiant battle axe',
    category: 'combat',
    id: 'radiant_battle_axe',
    isHidden: true,
    timeToCraft: 90 * 60,
    xp: (CURSED_ESS_XP * 8) + (ORI_ESS_XP * 8),
    maxToCraft: 1,
    tags: ['weapon', 'battleaxe'],
    requiredCraftingLevel: 105,
    required: [{
      type: 'item',
      itemId: 'darksteel_furnace',
      icon: ITEMS['darksteel_furnace'].icon,
      name: ITEMS['darksteel_furnace'].name,
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
      itemId: 'cursed_essence',
      icon: ITEMS['cursed_essence'].icon,
      name: ITEMS['cursed_essence'].name,
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
      itemId: 'teak_log',
      icon: ITEMS['teak_log'].icon,
      name: ITEMS['teak_log'].name,
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
      type: 'item',
      itemId: 'cursed_bar',
      icon: ITEMS['cursed_bar'].icon,
      name: ITEMS['cursed_bar'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'item',
      itemId: 'darksteel_battle_axe',
      icon: ITEMS['darksteel_battle_axe'].icon,
      name: ITEMS['darksteel_battle_axe'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'skill',
      name: 'crafting',
      level: 105
    }]
  },

  radiant_helmet: {
    recipeFor: 'crafting',
    produces: 'radiant_helmet',
    name: 'radiant helmet',
    category: 'combat',
    id: 'radiant_helmet',
    isHidden: true,
    timeToCraft: 60 * 60 * 2,
    xp: (CURSED_ESS_XP * 4) + (ORI_ESS_XP * 4),
    maxToCraft: 1,
    tags: ['armor', 'helmet'],
    requiredCraftingLevel: 105,
    required: [{
      type: 'item',
      itemId: 'darksteel_furnace',
      icon: ITEMS['darksteel_furnace'].icon,
      name: ITEMS['darksteel_furnace'].name,
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
      itemId: 'cursed_essence',
      icon: ITEMS['cursed_essence'].icon,
      name: ITEMS['cursed_essence'].name,
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
      itemId: 'teak_log',
      icon: ITEMS['teak_log'].icon,
      name: ITEMS['teak_log'].name,
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
      type: 'item',
      itemId: 'cursed_bar',
      icon: ITEMS['cursed_bar'].icon,
      name: ITEMS['cursed_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'item',
      itemId: 'darksteel_helmet',
      icon: ITEMS['darksteel_helmet'].icon,
      name: ITEMS['darksteel_helmet'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'skill',
      name: 'crafting',
      level: 105
    }]
  },

  radiant_chest_plate: {
    recipeFor: 'crafting',
    produces: 'radiant_chest_plate',
    name: 'radiant chest plate',
    category: 'combat',
    id: 'radiant_chest_plate',
    isHidden: true,
    timeToCraft: 60 * 60 * 2,
    xp: (CURSED_ESS_XP * 4) + (ORI_ESS_XP * 4),
    maxToCraft: 1,
    tags: ['armor', 'chest'],
    requiredCraftingLevel: 105,
    required: [{
      type: 'item',
      itemId: 'darksteel_furnace',
      icon: ITEMS['darksteel_furnace'].icon,
      name: ITEMS['darksteel_furnace'].name,
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
      itemId: 'cursed_essence',
      icon: ITEMS['cursed_essence'].icon,
      name: ITEMS['cursed_essence'].name,
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
      itemId: 'teak_log',
      icon: ITEMS['teak_log'].icon,
      name: ITEMS['teak_log'].name,
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
      type: 'item',
      itemId: 'cursed_bar',
      icon: ITEMS['cursed_bar'].icon,
      name: ITEMS['cursed_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'item',
      itemId: 'darksteel_chest_plate',
      icon: ITEMS['darksteel_chest_plate'].icon,
      name: ITEMS['darksteel_chest_plate'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'skill',
      name: 'crafting',
      level: 105
    }]
  },

  radiant_plate_legs: {
    recipeFor: 'crafting',
    produces: 'radiant_plate_legs',
    name: 'radiant plate legs',
    category: 'combat',
    id: 'radiant_plate_legs',
    isHidden: true,
    timeToCraft: 60 * 60 * 2, // 60
    xp: (CURSED_ESS_XP * 4) + (ORI_ESS_XP * 4),
    maxToCraft: 1,
    tags: ['armor', 'legs'],
    requiredCraftingLevel: 105,
    required: [{
      type: 'item',
      itemId: 'darksteel_furnace',
      icon: ITEMS['darksteel_furnace'].icon,
      name: ITEMS['darksteel_furnace'].name,
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
      itemId: 'cursed_essence',
      icon: ITEMS['cursed_essence'].icon,
      name: ITEMS['cursed_essence'].name,
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
      itemId: 'teak_log',
      icon: ITEMS['teak_log'].icon,
      name: ITEMS['teak_log'].name,
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
      type: 'item',
      itemId: 'cursed_bar',
      icon: ITEMS['cursed_bar'].icon,
      name: ITEMS['cursed_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'item',
      itemId: 'darksteel_plate_legs',
      icon: ITEMS['darksteel_plate_legs'].icon,
      name: ITEMS['darksteel_plate_legs'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'skill',
      name: 'crafting',
      level: 105
    }]
  },

  radiant_shield: {
    recipeFor: 'crafting',
    produces: 'radiant_shield',
    name: 'radiant shield',
    category: 'combat',
    id: 'radiant_shield',
    isHidden: true,
    timeToCraft: 60 * 60 * 2, // 60
    xp: (CURSED_ESS_XP * 4) + (ORI_ESS_XP * 4),
    maxToCraft: 1,
    tags: ['weapon', 'armor', 'shield'],
    requiredCraftingLevel: 105,
    required: [{
      type: 'item',
      itemId: 'darksteel_furnace',
      icon: ITEMS['darksteel_furnace'].icon,
      name: ITEMS['darksteel_furnace'].name,
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
      itemId: 'cursed_essence',
      icon: ITEMS['cursed_essence'].icon,
      name: ITEMS['cursed_essence'].name,
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
      itemId: 'teak_log',
      icon: ITEMS['teak_log'].icon,
      name: ITEMS['teak_log'].name,
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
      type: 'item',
      itemId: 'cursed_bar',
      icon: ITEMS['cursed_bar'].icon,
      name: ITEMS['cursed_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'item',
      itemId: 'darksteel_shield',
      icon: ITEMS['darksteel_shield'].icon,
      name: ITEMS['darksteel_shield'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'skill',
      name: 'crafting',
      level: 105
    }]
  }
}
