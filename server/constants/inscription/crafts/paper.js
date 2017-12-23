import { ITEMS } from '/server/constants/items/index.js'; 

export const PAPER_CRAFTS = {
  pine_paper: {
    recipeFor: 'inscription',
    produces: 'pine_paper',
    name: 'pine paper',
    id: 'pine_paper',
    category: 'paper',
    timeToCraft: 120,
    xp: 5,
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
    category: 'book',
    timeToCraft: 900,
    xp: 250,
    maxToCraft: 5,
    requiredInscriptionLevel: 3,
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
      level: 3
    }]
  },

  beech_paper: {
    recipeFor: 'inscription',
    produces: 'beech_paper',
    name: 'beech paper',
    id: 'beech_paper',
    category: 'paper',
    timeToCraft: 120,
    xp: 15,
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
    category: 'book',
    timeToCraft: 900,
    xp: 475,
    maxToCraft: 5,
    requiredInscriptionLevel: 7,
    required: [{
      type: 'item',
      itemId: 'beech_paper',
      icon: ITEMS['beech_paper'].icon,
      name: ITEMS['beech_paper'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 7
    }]
  },

  ash_paper: {
    recipeFor: 'inscription',
    produces: 'ash_paper',
    name: 'ash paper',
    id: 'ash_paper',
    category: 'paper',
    timeToCraft: 120,
    xp: 25,
    maxToCraft: 100,
    requiredInscriptionLevel: 7,
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

  ash_book: {
    recipeFor: 'inscription',
    produces: 'ash_book',
    name: 'ash book',
    id: 'ash_book',
    category: 'book',
    timeToCraft: 900,
    xp: 500,
    maxToCraft: 5,
    requiredInscriptionLevel: 10,
    required: [{
      type: 'item',
      itemId: 'ash_paper',
      icon: ITEMS['ash_paper'].icon,
      name: ITEMS['ash_paper'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 10
    }]
  },

  oak_paper: {
    recipeFor: 'inscription',
    produces: 'oak_paper',
    name: 'oak paper',
    id: 'oak_paper',
    category: 'paper',
    timeToCraft: 120,
    xp: 35,
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

  oak_book: {
    recipeFor: 'inscription',
    produces: 'oak_book',
    name: 'oak book',
    id: 'oak_book',
    category: 'book',
    timeToCraft: 900,
    xp: 650,
    maxToCraft: 5,
    requiredInscriptionLevel: 15,
    required: [{
      type: 'item',
      itemId: 'oak_paper',
      icon: ITEMS['oak_paper'].icon,
      name: ITEMS['oak_paper'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 15
    }]
  },

  maple_paper: {
    recipeFor: 'inscription',
    produces: 'maple_paper',
    name: 'maple paper',
    id: 'maple_paper',
    category: 'paper',
    timeToCraft: 120,
    xp: 45,
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

  maple_book: {
    recipeFor: 'inscription',
    produces: 'maple_book',
    name: 'maple book',
    id: 'maple_book',
    category: 'book',
    timeToCraft: 900,
    xp: 800,
    maxToCraft: 5,
    requiredInscriptionLevel: 20,
    required: [{
      type: 'item',
      itemId: 'maple_paper',
      icon: ITEMS['maple_paper'].icon,
      name: ITEMS['maple_paper'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 20
    }]
  },

  walnut_paper: {
    recipeFor: 'inscription',
    produces: 'walnut_paper',
    name: 'walnut paper',
    id: 'walnut_paper',
    category: 'paper',
    timeToCraft: 120,
    xp: 55,
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

  walnut_book: {
    recipeFor: 'inscription',
    produces: 'walnut_book',
    name: 'walnut book',
    id: 'walnut_book',
    category: 'book',
    timeToCraft: 900,
    xp: 950,
    maxToCraft: 5,
    requiredInscriptionLevel: 25,
    required: [{
      type: 'item',
      itemId: 'walnut_paper',
      icon: ITEMS['walnut_paper'].icon,
      name: ITEMS['walnut_paper'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 25
    }]
  },

  cherry_paper: {
    recipeFor: 'inscription',
    produces: 'cherry_paper',
    name: 'cherry paper',
    id: 'cherry_paper',
    category: 'paper',
    timeToCraft: 120,
    xp: 65,
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

  cherry_book: {
    recipeFor: 'inscription',
    produces: 'cherry_book',
    name: 'cherry book',
    id: 'cherry_book',
    category: 'book',
    timeToCraft: 900,
    xp: 1100,
    maxToCraft: 5,
    requiredInscriptionLevel: 30,
    required: [{
      type: 'item',
      itemId: 'cherry_paper',
      icon: ITEMS['cherry_paper'].icon,
      name: ITEMS['cherry_paper'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 30
    }]
  },

  mahogany_paper: {
    recipeFor: 'inscription',
    produces: 'mahogany_paper',
    name: 'mahogany paper',
    id: 'mahogany_paper',
    category: 'paper',
    timeToCraft: 120,
    xp: 75,
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

  mahogany_book: {
    recipeFor: 'inscription',
    produces: 'mahogany_book',
    name: 'mahogany book',
    id: 'mahogany_book',
    category: 'book',
    timeToCraft: 900,
    xp: 1500,
    maxToCraft: 5,
    requiredInscriptionLevel: 35,
    required: [{
      type: 'item',
      itemId: 'mahogany_paper',
      icon: ITEMS['mahogany_paper'].icon,
      name: ITEMS['mahogany_paper'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 35
    }]
  },

  elk_paper: {
    recipeFor: 'inscription',
    produces: 'elk_paper',
    name: 'elk paper',
    id: 'elk_paper',
    category: 'paper',
    timeToCraft: 120,
    xp: 85,
    maxToCraft: 100,
    requiredInscriptionLevel: 35,
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
      level: 35
    }]
  },

  elk_book: {
    recipeFor: 'inscription',
    produces: 'elk_book',
    name: 'elk book',
    id: 'elk_book',
    category: 'book',
    timeToCraft: 900,
    xp: 1650,
    maxToCraft: 5,
    requiredInscriptionLevel: 40,
    required: [{
      type: 'item',
      itemId: 'elk_paper',
      icon: ITEMS['elk_paper'].icon,
      name: ITEMS['elk_paper'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 40
    }]
  },

  black_paper: {
    recipeFor: 'inscription',
    produces: 'black_paper',
    name: 'black paper',
    id: 'black_paper',
    category: 'paper',
    timeToCraft: 120,
    xp: 95,
    maxToCraft: 100,
    requiredInscriptionLevel: 40,
    required: [{
      type: 'item',
      itemId: 'black_log',
      icon: ITEMS['black_log'].icon,
      name: ITEMS['black_log'].name,
      amount: 50,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 40
    }]
  },

  black_book: {
    recipeFor: 'inscription',
    produces: 'black_book',
    name: 'black book',
    id: 'black_book',
    category: 'book',
    timeToCraft: 900,
    xp: 1800,
    maxToCraft: 5,
    requiredInscriptionLevel: 45,
    required: [{
      type: 'item',
      itemId: 'black_paper',
      icon: ITEMS['black_paper'].icon,
      name: ITEMS['black_paper'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 45
    }]
  },

  blue_gum_paper: {
    recipeFor: 'inscription',
    produces: 'blue_gum_paper',
    name: 'blue gum paper',
    id: 'blue_gum_paper',
    category: 'paper',
    timeToCraft: 120,
    xp: 105,
    maxToCraft: 100,
    requiredInscriptionLevel: 45,
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
      level: 45
    }]
  },

  blue_gum_book: {
    recipeFor: 'inscription',
    produces: 'blue_gum_book',
    name: 'blue gum book',
    id: 'blue_gum_book',
    category: 'book',
    timeToCraft: 900,
    xp: 1950,
    maxToCraft: 5,
    requiredInscriptionLevel: 50,
    required: [{
      type: 'item',
      itemId: 'blue_gum_paper',
      icon: ITEMS['blue_gum_paper'].icon,
      name: ITEMS['blue_gum_paper'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 50
    }]
  },

  cedar_paper: {
    recipeFor: 'inscription',
    produces: 'cedar_paper',
    name: 'cedar paper',
    id: 'cedar_paper',
    category: 'paper',
    timeToCraft: 120,
    xp: 120,
    maxToCraft: 100,
    requiredInscriptionLevel: 50,
    required: [{
      type: 'item',
      itemId: 'cedar_log',
      icon: ITEMS['cedar_log'].icon,
      name: ITEMS['cedar_log'].name,
      amount: 50,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 50
    }]
  },

  cedar_book: {
    recipeFor: 'inscription',
    produces: 'cedar_book',
    name: 'cedar book',
    id: 'cedar_book',
    category: 'book',
    timeToCraft: 900,
    xp: 2300,
    maxToCraft: 5,
    requiredInscriptionLevel: 55,
    required: [{
      type: 'item',
      itemId: 'cedar_paper',
      icon: ITEMS['cedar_paper'].icon,
      name: ITEMS['cedar_paper'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 55
    }]
  },  
  
  denya_paper: {
    recipeFor: 'inscription',
    produces: 'denya_paper',
    name: 'denya paper',
    id: 'denya_paper',
    category: 'paper',
    timeToCraft: 120,
    xp: 140,
    maxToCraft: 100,
    requiredInscriptionLevel: 55,
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
      level: 55
    }]
  },

  denya_book: {
    recipeFor: 'inscription',
    produces: 'denya_book',
    name: 'denya book',
    id: 'denya_book',
    category: 'book',
    timeToCraft: 900,
    xp: 2600,
    maxToCraft: 5,
    requiredInscriptionLevel: 60,
    required: [{
      type: 'item',
      itemId: 'denya_paper',
      icon: ITEMS['denya_paper'].icon,
      name: ITEMS['denya_paper'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 60
    }]
  },

  gombe_paper: {
    recipeFor: 'inscription',
    produces: 'gombe_paper',
    name: 'gombe paper',
    id: 'gombe_paper',
    category: 'paper',
    timeToCraft: 120,
    xp: 160,
    maxToCraft: 100,
    requiredInscriptionLevel: 60,
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
      level: 60
    }]
  },

  gombe_book: {
    recipeFor: 'inscription',
    produces: 'gombe_book',
    name: 'gombe book',
    id: 'gombe_book',
    category: 'book',
    timeToCraft: 900,
    xp: 2900,
    maxToCraft: 5,
    requiredInscriptionLevel: 65,
    required: [{
      type: 'item',
      itemId: 'gombe_paper',
      icon: ITEMS['gombe_paper'].icon,
      name: ITEMS['gombe_paper'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 65
    }]
  },

  hickory_paper: {
    recipeFor: 'inscription',
    produces: 'hickory_paper',
    name: 'hickory paper',
    id: 'hickory_paper',
    category: 'paper',
    timeToCraft: 120,
    xp: 180,
    maxToCraft: 100,
    requiredInscriptionLevel: 65,
    required: [{
      type: 'item',
      itemId: 'hickory_log',
      icon: ITEMS['hickory_log'].icon,
      name: ITEMS['hickory_log'].name,
      amount: 50,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 65
    }]
  },

  hickory_book: {
    recipeFor: 'inscription',
    produces: 'hickory_book',
    name: 'hickory book',
    id: 'hickory_book',
    category: 'book',
    timeToCraft: 900,
    xp: 3200,
    maxToCraft: 5,
    requiredInscriptionLevel: 70,
    required: [{
      type: 'item',
      itemId: 'hickory_paper',
      icon: ITEMS['hickory_paper'].icon,
      name: ITEMS['hickory_paper'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 70
    }]
  },

  larch_paper: {
    recipeFor: 'inscription',
    produces: 'larch_paper',
    name: 'larch paper',
    id: 'larch_paper',
    category: 'paper',
    timeToCraft: 120,
    xp: 200,
    maxToCraft: 100,
    requiredInscriptionLevel: 70,
    required: [{
      type: 'item',
      itemId: 'larch_log',
      icon: ITEMS['larch_log'].icon,
      name: ITEMS['larch_log'].name,
      amount: 50,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 70
    }]
  },

  larch_book: {
    recipeFor: 'inscription',
    produces: 'larch_book',
    name: 'larch book',
    id: 'larch_book',
    category: 'book',
    timeToCraft: 900,
    xp: 3500,
    maxToCraft: 5,
    requiredInscriptionLevel: 75,
    required: [{
      type: 'item',
      itemId: 'larch_paper',
      icon: ITEMS['larch_paper'].icon,
      name: ITEMS['larch_paper'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 75
    }]
  },

  poplar_paper: {
    recipeFor: 'inscription',
    produces: 'poplar_paper',
    name: 'poplar paper',
    id: 'poplar_paper',
    category: 'paper',
    timeToCraft: 120,
    xp: 220,
    maxToCraft: 100,
    requiredInscriptionLevel: 75,
    required: [{
      type: 'item',
      itemId: 'poplar_log',
      icon: ITEMS['poplar_log'].icon,
      name: ITEMS['poplar_log'].name,
      amount: 50,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 75
    }]
  },

  poplar_book: {
    recipeFor: 'inscription',
    produces: 'poplar_book',
    name: 'poplar book',
    id: 'poplar_book',
    category: 'book',
    timeToCraft: 900,
    xp: 3800,
    maxToCraft: 5,
    requiredInscriptionLevel: 80,
    required: [{
      type: 'item',
      itemId: 'poplar_paper',
      icon: ITEMS['poplar_paper'].icon,
      name: ITEMS['poplar_paper'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 80
    }]
  },

  tali_paper: {
    recipeFor: 'inscription',
    produces: 'tali_paper',
    name: 'tali paper',
    id: 'tali_paper',
    category: 'paper',
    timeToCraft: 120,
    xp: 240,
    maxToCraft: 100,
    requiredInscriptionLevel: 80,
    required: [{
      type: 'item',
      itemId: 'tali_log',
      icon: ITEMS['tali_log'].icon,
      name: ITEMS['tali_log'].name,
      amount: 50,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 80
    }]
  },

  tali_book: {
    recipeFor: 'inscription',
    produces: 'tali_book',
    name: 'tali book',
    id: 'tali_book',
    category: 'book',
    timeToCraft: 900,
    xp: 4100,
    maxToCraft: 5,
    requiredInscriptionLevel: 85,
    required: [{
      type: 'item',
      itemId: 'tali_paper',
      icon: ITEMS['tali_paper'].icon,
      name: ITEMS['tali_paper'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 85
    }]
  },

  willow_paper: {
    recipeFor: 'inscription',
    produces: 'willow_paper',
    name: 'willow paper',
    id: 'willow_paper',
    category: 'paper',
    timeToCraft: 120,
    xp: 260,
    maxToCraft: 100,
    requiredInscriptionLevel: 85,
    required: [{
      type: 'item',
      itemId: 'willow_log',
      icon: ITEMS['willow_log'].icon,
      name: ITEMS['willow_log'].name,
      amount: 50,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 85
    }]
  },

  willow_book: {
    recipeFor: 'inscription',
    produces: 'willow_book',
    name: 'willow book',
    id: 'willow_book',
    category: 'book',
    timeToCraft: 900,
    xp: 4400,
    maxToCraft: 5,
    requiredInscriptionLevel: 90,
    required: [{
      type: 'item',
      itemId: 'willow_paper',
      icon: ITEMS['willow_paper'].icon,
      name: ITEMS['willow_paper'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 90
    }]
  },

  teak_paper: {
    recipeFor: 'inscription',
    produces: 'teak_paper',
    name: 'teak paper',
    id: 'teak_paper',
    category: 'paper',
    timeToCraft: 120,
    xp: 280,
    maxToCraft: 100,
    requiredInscriptionLevel: 90,
    required: [{
      type: 'item',
      itemId: 'teak_log',
      icon: ITEMS['teak_log'].icon,
      name: ITEMS['teak_log'].name,
      amount: 50,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 90
    }]
  },

  teak_book: {
    recipeFor: 'inscription',
    produces: 'teak_book',
    name: 'teak book',
    id: 'teak_book',
    category: 'paper',
    timeToCraft: 900,
    xp: 4700,
    maxToCraft: 5,
    requiredInscriptionLevel: 95,
    required: [{
      type: 'item',
      itemId: 'teak_paper',
      icon: ITEMS['teak_paper'].icon,
      name: ITEMS['teak_paper'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 95
    }]
  },

  fiery_paper: {
    recipeFor: 'inscription',
    produces: 'fiery_paper',
    name: 'fiery paper',
    id: 'fiery_paper',
    category: 'paper',
    timeToCraft: 120,
    xp: 300,
    maxToCraft: 100,
    requiredInscriptionLevel: 95,
    required: [{
      type: 'item',
      itemId: 'fiery_log',
      icon: ITEMS['fiery_log'].icon,
      name: ITEMS['fiery_log'].name,
      amount: 50,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 95
    }]
  },

  fiery_book: {
    recipeFor: 'inscription',
    produces: 'fiery_book',
    name: 'fiery book',
    id: 'fiery_book',
    category: 'paper',
    timeToCraft: 900,
    xp: 5000,
    maxToCraft: 5,
    requiredInscriptionLevel: 100,
    required: [{
      type: 'item',
      itemId: 'fiery_paper',
      icon: ITEMS['fiery_paper'].icon,
      name: ITEMS['fiery_paper'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 100
    }]
  },

  magic_paper: {
    recipeFor: 'inscription',
    produces: 'magic_paper',
    name: 'magic paper',
    id: 'magic_paper',
    category: 'paper',
    timeToCraft: 120,
    xp: 320,
    maxToCraft: 100,
    requiredInscriptionLevel: 100,
    required: [{
      type: 'item',
      itemId: 'magic_log',
      icon: ITEMS['magic_log'].icon,
      name: ITEMS['magic_log'].name,
      amount: 50,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 100
    }]
  },

  magic_book: {
    recipeFor: 'inscription',
    produces: 'magic_book',
    name: 'magic book',
    id: 'magic_book',
    category: 'paper',
    timeToCraft: 900,
    xp: 5000,
    maxToCraft: 5,
    requiredInscriptionLevel: 105,
    required: [{
      type: 'item',
      itemId: 'magic_paper',
      icon: ITEMS['magic_paper'].icon,
      name: ITEMS['magic_paper'].name,
      amount: 10,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 105
    }]
  },
};
