import { ITEMS } from '/server/constants/items/index.js'; 

export const PAPER_CRAFTS = {
  pine_paper: {
    recipeFor: 'inscription',
    produces: 'pine_paper',
    name: 'pine paper',
    id: 'pine_paper',
    category: 'paper',
    timeToCraft: 120,
    xp: 10,
    maxToCraft: 5,
    requiredInscriptionLevel: 1,
    required: [{
      type: 'item',
      itemId: 'pine_log',
      icon: ITEMS['pine_log'].icon,
      name: ITEMS['pine_log'].name,
      amount: 30,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 1
    }]
  },

  beech_paper: {
    recipeFor: 'inscription',
    produces: 'beech_paper',
    name: 'beech paper',
    id: 'beech_paper',
    category: 'paper',
    timeToCraft: 120,
    xp: 40,
    maxToCraft: 5,
    requiredInscriptionLevel: 3,
    required: [{
      type: 'item',
      itemId: 'beech_log',
      icon: ITEMS['beech_log'].icon,
      name: ITEMS['beech_log'].name,
      amount: 50,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 3
    }]
  },

  ash_paper: {
    recipeFor: 'inscription',
    produces: 'ash_paper',
    name: 'ash paper',
    id: 'ash_paper',
    category: 'paper',
    timeToCraft: 120,
    xp: 60,
    maxToCraft: 5,
    requiredInscriptionLevel: 5,
    required: [{
      type: 'item',
      itemId: 'ash_log',
      icon: ITEMS['ash_log'].icon,
      name: ITEMS['ash_log'].name,
      amount: 50,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 5
    }]
  },
}
