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
    name: 'Barkskin Enchantment [Chest]',
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
    name: 'Flaming Blade Enchantment [Mainhand]',
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
    name: 'Enchanted Blade Enchantment [Mainhand]',
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
  },

  enchantment_intimidate: {
    recipeFor: 'inscription',
    produces: 'enchantment_intimidate',
    name: 'Intimidate Enchantment [Head]',
    id: 'enchantment_intimidate',
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

  enchantment_fox_skin: {
    recipeFor: 'inscription',
    produces: 'enchantment_fox_skin',
    name: 'Fox Skin Enchantment [Legs]',
    id: 'enchantment_fox_skin',
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

  enchantment_rhino_skin: {
    recipeFor: 'inscription',
    produces: 'enchantment_rhino_skin',
    name: 'Rhino Skin Enchantment [Legs]',
    id: 'enchantment_rhino_skin',
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
