import { ITEMS } from '/server/constants/items/index.js'; 

export const ENCHANTMENT_CRAFTS = {
  
  enchantment_nullify: {
    recipeFor: 'inscription',
    produces: 'enchantment_nullify',
    name: 'Nullify Enchantment',
    id: 'enchantment_nullify',
    category: 'enchantment',
    timeToCraft: 1,
    xp: 0,
    maxToCraft: 1,
    requiredInscriptionLevel: 1,
    required: [{
      type: 'skill',
      name: 'inscription',
      level: 1
    },
    {
      type: 'skill',
      name: 'astronomy',
      level: 1
    }]
  },

  enchantment_barkskin: {
    recipeFor: 'inscription',
    produces: 'enchantment_barkskin',
    name: 'Barkskin Enchantment',
    id: 'enchantment_barkskin',
    category: 'enchantment',
    timeToCraft: 1,
    xp: 0,
    maxToCraft: 1,
    requiredInscriptionLevel: 1,
    required: [{
      type: 'skill',
      name: 'inscription',
      level: 1
    },
    {
      type: 'skill',
      name: 'astronomy',
      level: 1
    }]
  },

  enchantment_flaming_blade: {
    recipeFor: 'inscription',
    produces: 'enchantment_flaming_blade',
    name: 'Flaming Blade Enchantment',
    id: 'enchantment_flaming_blade',
    category: 'enchantment',
    timeToCraft: 1,
    xp: 0,
    maxToCraft: 1,
    requiredInscriptionLevel: 1,
    required: [{
      type: 'skill',
      name: 'inscription',
      level: 1
    },
    {
      type: 'skill',
      name: 'astronomy',
      level: 1
    }]
  },

  enchantment_enchanted_blade: {
    recipeFor: 'inscription',
    produces: 'enchantment_enchanted_blade',
    name: 'Enchanted Blade Enchantment',
    id: 'enchantment_enchanted_blade',
    category: 'enchantment',
    timeToCraft: 1,
    xp: 0,
    maxToCraft: 1,
    requiredInscriptionLevel: 1,
    required: [{
      type: 'skill',
      name: 'inscription',
      level: 1
    },
    {
      type: 'skill',
      name: 'astronomy',
      level: 1
    }]
  }
}
