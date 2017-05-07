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
      level: 7
    }]
  },

  oak_paper: {
    recipeFor: 'inscription',
    produces: 'oak_paper',
    name: 'oak paper',
    id: 'oak_paper',
    category: 'paper',
    timeToCraft: 120,
    xp: 80,
    maxToCraft: 10,
    requiredInscriptionLevel: 10,
    required: [{
      type: 'item',
      itemId: 'oak_log',
      icon: ITEMS['oak_log'].icon,
      name: ITEMS['oak_log'].name,
      amount: 50,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 10
    }]
  },

  maple_paper: {
    recipeFor: 'inscription',
    produces: 'maple_paper',
    name: 'maple paper',
    id: 'maple_paper',
    category: 'paper',
    timeToCraft: 120,
    xp: 100,
    maxToCraft: 10,
    requiredInscriptionLevel: 15,
    required: [{
      type: 'item',
      itemId: 'maple_log',
      icon: ITEMS['maple_log'].icon,
      name: ITEMS['maple_log'].name,
      amount: 50,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 15
    }]
  },

  walnut_paper: {
    recipeFor: 'inscription',
    produces: 'walnut_paper',
    name: 'walnut paper',
    id: 'walnut_paper',
    category: 'paper',
    timeToCraft: 120,
    xp: 130,
    maxToCraft: 10,
    requiredInscriptionLevel: 20,
    required: [{
      type: 'item',
      itemId: 'walnut_log',
      icon: ITEMS['walnut_log'].icon,
      name: ITEMS['walnut_log'].name,
      amount: 50,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 20
    }]
  },

  cherry_paper: {
    recipeFor: 'inscription',
    produces: 'cherry_paper',
    name: 'cherry paper',
    id: 'cherry_paper',
    category: 'paper',
    timeToCraft: 120,
    xp: 150,
    maxToCraft: 10,
    requiredInscriptionLevel: 25,
    required: [{
      type: 'item',
      itemId: 'cherry_log',
      icon: ITEMS['cherry_log'].icon,
      name: ITEMS['cherry_log'].name,
      amount: 50,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 25
    }]
  },

  mahogany_paper: {
    recipeFor: 'inscription',
    produces: 'mahogany_paper',
    name: 'mahogany paper',
    id: 'mahogany_paper',
    category: 'paper',
    timeToCraft: 120,
    xp: 200,
    maxToCraft: 10,
    requiredInscriptionLevel: 30,
    required: [{
      type: 'item',
      itemId: 'mahogany_log',
      icon: ITEMS['mahogany_log'].icon,
      name: ITEMS['mahogany_log'].name,
      amount: 50,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 30
    }]
  },
}
