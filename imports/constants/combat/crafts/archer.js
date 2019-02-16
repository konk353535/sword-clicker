import { ITEMS } from '/imports/constants/items/index.js'; 

const CURSED_ESS_XP = 500000;
const ADA_ESS_XP = 43750;
const ORI_ESS_XP = 62500;
const MET_ESS_XP = 125000;
const FS_ESS_XP = 187500;
const ES_ESS_XP = 250000;
const BONUS_XP = 357000;

const ETERNIUM_RESOURCE_HOG = 5;
const ETERNIUM_BONUS_XP = 5;

export const ARCHER_CRAFTS = {
  teak_bow: {
    produces: 'teak_bow',
    name: 'teak bow',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'teak_bow',
    isHidden: true,
    timeToCraft: 2 * 60 * 60, // 120 minutes (2 hours)
    xp: 2000000,
    maxToCraft: 1,
    tags: ['weapon'],
    requiredCraftingLevel: 95,
    required: [{
      type: 'item',
      itemId: 'elven_steel_furnace',
      icon: ITEMS['elven_steel_furnace'].icon,
      name: ITEMS['elven_steel_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'cursed_essence',
      icon: ITEMS['cursed_essence'].icon,
      name: ITEMS['cursed_essence'].name,
      amount: 4,
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
      itemId: 'cursed_bar',
      icon: ITEMS['cursed_bar'].icon,
      name: ITEMS['cursed_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 95
    }]
  },
  
  ebony_bow: {
    produces: 'ebony_bow',
    name: 'ebony bow',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'ebony_bow',
    isHidden: true,
    timeToCraft: 2 * 60 * 60, // 120 minutes (2 hours)
    xp: (CURSED_ESS_XP * 4) + (ADA_ESS_XP * 4),
    maxToCraft: 1,
    tags: ['weapon'],
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
      itemId: 'ebony_log',
      icon: ITEMS['ebony_log'].icon,
      name: ITEMS['ebony_log'].name,
      amount: 100,
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
  
  fiery_bow: {
    produces: 'fiery_bow',
    name: 'charred bow',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'fiery_bow',
    isHidden: true,
    timeToCraft: 2 * 60 * 60, // 120 minutes (2 hours)
    xp: (CURSED_ESS_XP * 4) + (ORI_ESS_XP * 4),
    maxToCraft: 1,
    tags: ['weapon'],
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
      itemId: 'fiery_log',
      icon: ITEMS['fiery_log'].icon,
      name: ITEMS['fiery_log'].name,
      amount: 100,
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
      itemId: 'ebony_bow',
      icon: ITEMS['ebony_bow'].icon,
      name: ITEMS['ebony_bow'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'skill',
      name: 'crafting',
      level: 105
    }]
  },
  
  tamarind_bow: {
    produces: 'tamarind_bow',
    name: 'tamarind bow',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'tamarind_bow',
    isHidden: true,
    timeToCraft: 2 * 60 * 60, // 120 minutes (2 hours)
    xp: (CURSED_ESS_XP * 4) + (MET_ESS_XP * 4),
    maxToCraft: 1,
    tags: ['weapon'],
    requiredCraftingLevel: 110,
    required: [{
      type: 'item',
      itemId: 'radiant_furnace',
      icon: ITEMS['radiant_furnace'].icon,
      name: ITEMS['radiant_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'meteorite_essence',
      icon: ITEMS['meteorite_essence'].icon,
      name: ITEMS['meteorite_essence'].name,
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
      itemId: 'tamarind_log',
      icon: ITEMS['tamarind_log'].icon,
      name: ITEMS['tamarind_log'].name,
      amount: 100,
      consumes: true
    }, {
      type: 'item',
      itemId: 'meteorite_bar',
      icon: ITEMS['meteorite_bar'].icon,
      name: ITEMS['meteorite_bar'].name,
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
      itemId: 'fiery_bow',
      icon: ITEMS['fiery_bow'].icon,
      name: ITEMS['fiery_bow'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'skill',
      name: 'crafting',
      level: 110
    }]
  },
  
  magic_bow: {
    produces: 'magic_bow',
    name: 'magic-infused bow',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'magic_bow',
    isHidden: true,
    timeToCraft: 2 * 60 * 60, // 120 minutes (2 hours)
    xp: (CURSED_ESS_XP * 4) + (FS_ESS_XP * 4),
    maxToCraft: 1,
    tags: ['weapon'],
    requiredCraftingLevel: 115,
    required: [{
      type: 'item',
      itemId: 'astral_furnace',
      icon: ITEMS['astral_furnace'].icon,
      name: ITEMS['astral_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'fairy_steel_essence',
      icon: ITEMS['fairy_steel_essence'].icon,
      name: ITEMS['fairy_steel_essence'].name,
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
      itemId: 'magic_log',
      icon: ITEMS['magic_log'].icon,
      name: ITEMS['magic_log'].name,
      amount: 100,
      consumes: true
    }, {
      type: 'item',
      itemId: 'fairy_steel_bar',
      icon: ITEMS['fairy_steel_bar'].icon,
      name: ITEMS['fairy_steel_bar'].name,
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
      itemId: 'tamarind_bow',
      icon: ITEMS['tamarind_bow'].icon,
      name: ITEMS['tamarind_bow'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'skill',
      name: 'crafting',
      level: 115
    }]
  },
  
  petrified_bow: {
    produces: 'petrified_bow',
    name: 'petrified bow',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'petrified_bow',
    isHidden: true,
    timeToCraft: 2 * 60 * 60, // 120 minutes (2 hours)
    xp: (CURSED_ESS_XP * 4) + (ES_ESS_XP * 4),
    maxToCraft: 1,
    tags: ['weapon'],
    requiredCraftingLevel: 120,
    required: [{
      type: 'item',
      itemId: 'titanfoil_furnace',
      icon: ITEMS['titanfoil_furnace'].icon,
      name: ITEMS['titanfoil_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'elven_steel_essence',
      icon: ITEMS['elven_steel_essence'].icon,
      name: ITEMS['elven_steel_essence'].name,
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
      itemId: 'petrified_log',
      icon: ITEMS['petrified_log'].icon,
      name: ITEMS['petrified_log'].name,
      amount: 100,
      consumes: true
    }, {
      type: 'item',
      itemId: 'elven_steel_bar',
      icon: ITEMS['elven_steel_bar'].icon,
      name: ITEMS['elven_steel_bar'].name,
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
      itemId: 'magic_bow',
      icon: ITEMS['magic_bow'].icon,
      name: ITEMS['magic_bow'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'skill',
      name: 'crafting',
      level: 120
    }]
  },
  
  ancient_bow: {
    produces: 'ancient_bow',
    name: 'ancient bow',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'ancient_bow',
    isHidden: true,
    timeToCraft: 2 * 60 * 60, // 120 minutes (2 hours)
    xp: ((CURSED_ESS_XP * 4) + (BONUS_XP * 4)) * ETERNIUM_BONUS_XP,
    maxToCraft: 1,
    tags: ['weapon'],
    requiredCraftingLevel: 125,
    required: [{
      type: 'item',
      itemId: 'relicrock_furnace',
      icon: ITEMS['relicrock_furnace'].icon,
      name: ITEMS['relicrock_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'mithril_essence',
      icon: ITEMS['mithril_essence'].icon,
      name: ITEMS['mithril_essence'].name,
      amount: 4 * ETERNIUM_RESOURCE_HOG,
      consumes: true
    }, {
      type: 'item',
      itemId: 'cursed_essence',
      icon: ITEMS['cursed_essence'].icon,
      name: ITEMS['cursed_essence'].name,
      amount: 4 * ETERNIUM_RESOURCE_HOG,
      consumes: true
    }, {
      type: 'item',
      itemId: 'ancient_log',
      icon: ITEMS['ancient_log'].icon,
      name: ITEMS['ancient_log'].name,
      amount: 100 * ETERNIUM_RESOURCE_HOG,
      consumes: true
    }, {
      type: 'item',
      itemId: 'mithril_bar',
      icon: ITEMS['mithril_bar'].icon,
      name: ITEMS['mithril_bar'].name,
      amount: 5 * ETERNIUM_RESOURCE_HOG,
      consumes: true
    }, {
      type: 'item',
      itemId: 'cursed_bar',
      icon: ITEMS['cursed_bar'].icon,
      name: ITEMS['cursed_bar'].name,
      amount: 5 * ETERNIUM_RESOURCE_HOG,
      consumes: true
    }, {
      type: 'item',
      itemId: 'petrified_bow',
      icon: ITEMS['petrified_bow'].icon,
      name: ITEMS['petrified_bow'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'skill',
      name: 'crafting',
      level: 125
    }]
  },

  cursed_quiver: {
    recipeFor: 'crafting',
    produces: 'cursed_quiver',
    name: 'cursed quiver',
    category: 'combat',
    id: 'cursed_quiver',
    isHidden: true,
    timeToCraft: 2 * 60 * 60, // 120 minutes (2 hours)
    xp: 2000000,
    maxToCraft: 1,
    tags: ['weapon'],
    requiredCraftingLevel: 95,
    required: [{
      type: 'item',
      itemId: 'elven_steel_furnace',
      icon: ITEMS['elven_steel_furnace'].icon,
      name: ITEMS['elven_steel_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'cursed_essence',
      icon: ITEMS['cursed_essence'].icon,
      name: ITEMS['cursed_essence'].name,
      amount: 4,
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
      itemId: 'cursed_bar',
      icon: ITEMS['cursed_bar'].icon,
      name: ITEMS['cursed_bar'].name,
      amount: 5,
      consumes: true
    }, {
      type: 'skill',
      name: 'crafting',
      level: 95
    }]
  },
  
  darksteel_quiver: {
    produces: 'darksteel_quiver',
    name: 'darksteel quiver',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'darksteel_quiver',
    isHidden: true,
    timeToCraft: 2 * 60 * 60, // 120 minutes (2 hours)
    xp: (CURSED_ESS_XP * 4) + (ADA_ESS_XP * 4),
    maxToCraft: 1,
    tags: ['weapon'],
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
      itemId: 'ebony_log',
      icon: ITEMS['ebony_log'].icon,
      name: ITEMS['ebony_log'].name,
      amount: 100,
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
  
  radiant_quiver: {
    produces: 'radiant_quiver',
    name: 'radiant quiver',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'radiant_quiver',
    isHidden: true,
    timeToCraft: 2 * 60 * 60, // 120 minutes (2 hours)
    xp: (CURSED_ESS_XP * 4) + (ORI_ESS_XP * 4),
    maxToCraft: 1,
    tags: ['weapon'],
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
      itemId: 'fiery_log',
      icon: ITEMS['fiery_log'].icon,
      name: ITEMS['fiery_log'].name,
      amount: 100,
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
      itemId: 'darksteel_quiver',
      icon: ITEMS['darksteel_quiver'].icon,
      name: ITEMS['darksteel_quiver'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'skill',
      name: 'crafting',
      level: 105
    }]
  },
  
  astral_quiver: {
    produces: 'astral_quiver',
    name: 'astral quiver',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'astral_quiver',
    isHidden: true,
    timeToCraft: 2 * 60 * 60, // 120 minutes (2 hours)
    xp: (CURSED_ESS_XP * 4) + (MET_ESS_XP * 4),
    maxToCraft: 1,
    tags: ['weapon'],
    requiredCraftingLevel: 110,
    required: [{
      type: 'item',
      itemId: 'radiant_furnace',
      icon: ITEMS['radiant_furnace'].icon,
      name: ITEMS['radiant_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'meteorite_essence',
      icon: ITEMS['meteorite_essence'].icon,
      name: ITEMS['meteorite_essence'].name,
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
      itemId: 'tamarind_log',
      icon: ITEMS['tamarind_log'].icon,
      name: ITEMS['tamarind_log'].name,
      amount: 100,
      consumes: true
    }, {
      type: 'item',
      itemId: 'meteorite_bar',
      icon: ITEMS['meteorite_bar'].icon,
      name: ITEMS['meteorite_bar'].name,
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
      itemId: 'radiant_quiver',
      icon: ITEMS['radiant_quiver'].icon,
      name: ITEMS['radiant_quiver'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'skill',
      name: 'crafting',
      level: 110
    }]
  },
  
  titanfoil_quiver: {
    produces: 'titanfoil_quiver',
    name: 'titanfoil quiver',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'titanfoil_quiver',
    isHidden: true,
    timeToCraft: 2 * 60 * 60, // 120 minutes (2 hours)
    xp: (CURSED_ESS_XP * 4) + (FS_ESS_XP * 4),
    maxToCraft: 1,
    tags: ['weapon'],
    requiredCraftingLevel: 115,
    required: [{
      type: 'item',
      itemId: 'astral_furnace',
      icon: ITEMS['astral_furnace'].icon,
      name: ITEMS['astral_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'fairy_steel_essence',
      icon: ITEMS['fairy_steel_essence'].icon,
      name: ITEMS['fairy_steel_essence'].name,
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
      itemId: 'magic_log',
      icon: ITEMS['magic_log'].icon,
      name: ITEMS['magic_log'].name,
      amount: 100,
      consumes: true
    }, {
      type: 'item',
      itemId: 'fairy_steel_bar',
      icon: ITEMS['fairy_steel_bar'].icon,
      name: ITEMS['fairy_steel_bar'].name,
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
      itemId: 'astral_quiver',
      icon: ITEMS['astral_quiver'].icon,
      name: ITEMS['astral_quiver'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'skill',
      name: 'crafting',
      level: 115
    }]
  },
  
  relicrock_quiver: {
    produces: 'relicrock_quiver',
    name: 'relicrock quiver',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'relicrock_quiver',
    isHidden: true,
    timeToCraft: 2 * 60 * 60, // 120 minutes (2 hours)
    xp: (CURSED_ESS_XP * 4) + (ES_ESS_XP * 4),
    maxToCraft: 1,
    tags: ['weapon'],
    requiredCraftingLevel: 120,
    required: [{
      type: 'item',
      itemId: 'titanfoil_furnace',
      icon: ITEMS['titanfoil_furnace'].icon,
      name: ITEMS['titanfoil_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'elven_steel_essence',
      icon: ITEMS['elven_steel_essence'].icon,
      name: ITEMS['elven_steel_essence'].name,
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
      itemId: 'petrified_log',
      icon: ITEMS['petrified_log'].icon,
      name: ITEMS['petrified_log'].name,
      amount: 100,
      consumes: true
    }, {
      type: 'item',
      itemId: 'elven_steel_bar',
      icon: ITEMS['elven_steel_bar'].icon,
      name: ITEMS['elven_steel_bar'].name,
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
      itemId: 'titanfoil_quiver',
      icon: ITEMS['titanfoil_quiver'].icon,
      name: ITEMS['titanfoil_quiver'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'skill',
      name: 'crafting',
      level: 120
    }]
  },
  
  eternium_quiver: {
    produces: 'eternium_quiver',
    name: 'eternium quiver',
    recipeFor: 'crafting',
    category: 'combat',
    id: 'eternium_quiver',
    isHidden: true,
    timeToCraft: 2 * 60 * 60, // 120 minutes (2 hours)
    xp: ((CURSED_ESS_XP * 4) + (BONUS_XP * 4)) * ETERNIUM_BONUS_XP,
    maxToCraft: 1,
    tags: ['weapon'],
    requiredCraftingLevel: 125,
    required: [{
      type: 'item',
      itemId: 'relicrock_furnace',
      icon: ITEMS['relicrock_furnace'].icon,
      name: ITEMS['relicrock_furnace'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'mithril_essence',
      icon: ITEMS['mithril_essence'].icon,
      name: ITEMS['mithril_essence'].name,
      amount: 4 * ETERNIUM_RESOURCE_HOG,
      consumes: true
    }, {
      type: 'item',
      itemId: 'cursed_essence',
      icon: ITEMS['cursed_essence'].icon,
      name: ITEMS['cursed_essence'].name,
      amount: 4 * ETERNIUM_RESOURCE_HOG,
      consumes: true
    }, {
      type: 'item',
      itemId: 'ancient_log',
      icon: ITEMS['ancient_log'].icon,
      name: ITEMS['ancient_log'].name,
      amount: 100 * ETERNIUM_RESOURCE_HOG,
      consumes: true
    }, {
      type: 'item',
      itemId: 'mithril_bar',
      icon: ITEMS['mithril_bar'].icon,
      name: ITEMS['mithril_bar'].name,
      amount: 5 * ETERNIUM_RESOURCE_HOG,
      consumes: true
    }, {
      type: 'item',
      itemId: 'cursed_bar',
      icon: ITEMS['cursed_bar'].icon,
      name: ITEMS['cursed_bar'].name,
      amount: 5 * ETERNIUM_RESOURCE_HOG,
      consumes: true
    }, {
      type: 'item',
      itemId: 'relicrock_quiver',
      icon: ITEMS['relicrock_quiver'].icon,
      name: ITEMS['relicrock_quiver'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'skill',
      name: 'crafting',
      level: 125
    }]
  },
};
