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
    maxToCraft: 100,
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

  pine_book: {
    recipeFor: 'inscription',
    produces: 'pine_book',
    name: 'pine book',
    id: 'pine_book',
    category: 'paper',
    timeToCraft: 3600,
    xp: 800,
    maxToCraft: 1,
    requiredInscriptionLevel: 10,
    required: [{
      type: 'item',
      itemId: 'pine_paper',
      icon: ITEMS['pine_paper'].icon,
      name: ITEMS['pine_paper'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 10
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
    maxToCraft: 100,
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

  beech_book: {
    recipeFor: 'inscription',
    produces: 'beech_book',
    name: 'beech book',
    id: 'beech_book',
    category: 'paper',
    timeToCraft: 300,
    xp: 80,
    maxToCraft: 1,
    requiredInscriptionLevel: 15,
    required: [{
      type: 'item',
      itemId: 'beech_paper',
      icon: ITEMS['beech_paper'].icon,
      name: ITEMS['beech_paper'].name,
      amount: 3,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 15
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
    maxToCraft: 100,
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
    maxToCraft: 100,
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
    maxToCraft: 100,
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
    maxToCraft: 100,
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
    maxToCraft: 100,
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
    maxToCraft: 100,
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

  blue_gum_paper: {
    recipeFor: 'inscription',
    produces: 'blue_gum_paper',
    name: 'blue_gum paper',
    id: 'blue_gum_paper',
    category: 'paper',
    timeToCraft: 120,
    xp: 200,
    maxToCraft: 100,
    requiredInscriptionLevel: 35,
    required: [{
      type: 'item',
      itemId: 'blue_gum_log',
      icon: ITEMS['blue_gum_log'].icon,
      name: ITEMS['blue_gum_log'].name,
      amount: 50,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 35
    }]
  },

  denya_paper: {
    recipeFor: 'inscription',
    produces: 'denya_paper',
    name: 'denya paper',
    id: 'denya_paper',
    category: 'paper',
    timeToCraft: 120,
    xp: 200,
    maxToCraft: 100,
    requiredInscriptionLevel: 40,
    required: [{
      type: 'item',
      itemId: 'denya_log',
      icon: ITEMS['denya_log'].icon,
      name: ITEMS['denya_log'].name,
      amount: 50,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 40
    }]
  },

  gombe_paper: {
    recipeFor: 'inscription',
    produces: 'gombe_paper',
    name: 'gombe paper',
    id: 'gombe_paper',
    category: 'paper',
    timeToCraft: 120,
    xp: 200,
    maxToCraft: 100,
    requiredInscriptionLevel: 45,
    required: [{
      type: 'item',
      itemId: 'gombe_log',
      icon: ITEMS['gombe_log'].icon,
      name: ITEMS['gombe_log'].name,
      amount: 50,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 45
    }]
  },

  elk_paper: {
    recipeFor: 'inscription',
    produces: 'elk_paper',
    name: 'elk paper',
    id: 'elk_paper',
    category: 'paper',
    timeToCraft: 120,
    xp: 200,
    maxToCraft: 100,
    requiredInscriptionLevel: 45,
    required: [{
      type: 'item',
      itemId: 'elk_log',
      icon: ITEMS['elk_log'].icon,
      name: ITEMS['elk_log'].name,
      amount: 50,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 45
    }]
  }
}
