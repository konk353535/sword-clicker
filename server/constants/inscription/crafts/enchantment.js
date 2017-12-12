import { ITEMS } from '/server/constants/items/index.js'; 

export const ENCHANTMENT_CRAFTS = {
  enchantment_fire: {
    recipeFor: 'inscription',
    produces: 'enchantment_fire',
    name: 'lesser fire',
    id: 'enchantment_fire',
    category: 'enchantment',
    timeToCraft: 1,
    xp: 5,
    maxToCraft: 1,
    requiredInscriptionLevel: 1,
    required: [{
      type: 'item',
      itemId: 'pigment_red_255',
      icon: ITEMS['pigment_red_255'].icon,
      name: ITEMS['pigment_red_255'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 1
    }]
  }
}
