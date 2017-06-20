import { ITEMS } from '/server/constants/items/index.js'; 

export const PIGMENT_CRAFTS = {
  pigment_red_255: {
    recipeFor: 'inscription',
    produces: 'pigment_red_255',
    name: 'pigment red(255)',
    id: 'pigment_red_255',
    category: 'pigment',
    timeToCraft: 60,
    xp: 5,
    maxToCraft: 5,
    requiredInscriptionLevel: 1,
    required: [{
      type: 'item',
      itemId: 'rubia_flower',
      icon: ITEMS['rubia_flower'].icon,
      name: ITEMS['rubia_flower'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 1
    }]
  },

  pigment_green_255: {
    recipeFor: 'inscription',
    produces: 'pigment_green_255',
    name: 'pigment green(255)',
    id: 'pigment_green_255',
    category: 'pigment',
    timeToCraft: 60,
    xp: 10,
    maxToCraft: 5,
    requiredInscriptionLevel: 2,
    required: [{
      type: 'item',
      itemId: 'basil',
      icon: ITEMS['basil'].icon,
      name: ITEMS['basil'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 2
    }]
  },

  pigment_green_200: {
    recipeFor: 'inscription',
    produces: 'pigment_green_200',
    name: 'pigment green(200)',
    id: 'pigment_green_200',
    category: 'pigment',
    timeToCraft: 180,
    xp: 35,
    maxToCraft: 5,
    requiredInscriptionLevel: 3,
    required: [{
      type: 'item',
      itemId: 'endive',
      icon: ITEMS['endive'].icon,
      name: ITEMS['endive'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 3
    }]
  },

  pigment_red_200: {
    recipeFor: 'inscription',
    produces: 'pigment_red_200',
    name: 'pigment red(200)',
    id: 'pigment_red_200',
    category: 'pigment',
    timeToCraft: 120,
    xp: 25,
    maxToCraft: 5,
    requiredInscriptionLevel: 4,
    required: [{
      type: 'item',
      itemId: 'pink_rose',
      icon: ITEMS['pink_rose'].icon,
      name: ITEMS['pink_rose'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 4
    }]
  },


  pigment_blue_255: {
    recipeFor: 'inscription',
    produces: 'pigment_blue_255',
    name: 'pigment blue(255)',
    id: 'pigment_blue_255',
    category: 'pigment',
    timeToCraft: 180,
    xp: 50,
    maxToCraft: 5,
    requiredInscriptionLevel: 5,
    required: [{
      type: 'item',
      itemId: 'juniper',
      icon: ITEMS['juniper'].icon,
      name: ITEMS['juniper'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 5
    }]
  },

  pigment_purple_255: {
    recipeFor: 'inscription',
    produces: 'pigment_purple_255',
    name: 'pigment purple(255)',
    id: 'pigment_purple_255',
    category: 'pigment',
    timeToCraft: 180,
    xp: 50,
    maxToCraft: 6,
    requiredInscriptionLevel: 6,
    required: [{
      type: 'item',
      itemId: 'lavender',
      icon: ITEMS['lavender'].icon,
      name: ITEMS['lavender'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 6
    }]
  },

  pigment_red_150: {
    recipeFor: 'inscription',
    produces: 'pigment_red_150',
    name: 'pigment red(150)',
    id: 'pigment_red_150',
    category: 'pigment',
    timeToCraft: 300,
    xp: 25,
    maxToCraft: 5,
    requiredInscriptionLevel: 10,
    required: [{
      type: 'item',
      itemId: 'chilli',
      icon: ITEMS['chilli'].icon,
      name: ITEMS['chilli'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 9
    }]
  },

  pigment_white_128: {
    recipeFor: 'inscription',
    produces: 'pigment_white_128',
    name: 'pigment white(128)',
    id: 'pigment_white_128',
    category: 'pigment',
    timeToCraft: 600,
    xp: 100,
    maxToCraft: 1,
    requiredInscriptionLevel: 10,
    required: [{
      type: 'item',
      itemId: 'agrimony',
      icon: ITEMS['agrimony'].icon,
      name: ITEMS['agrimony'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 12
    }]
  },

  pigment_green_170: {
    recipeFor: 'inscription',
    produces: 'pigment_green_170',
    name: 'pigment green(170)',
    id: 'pigment_green_170',
    category: 'pigment',
    timeToCraft: 180,
    xp: 35,
    maxToCraft: 5,
    requiredInscriptionLevel: 15,
    required: [{
      type: 'item',
      itemId: 'celery',
      icon: ITEMS['celery'].icon,
      name: ITEMS['celery'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 15
    }]
  },

  pigment_purple_200: {
    recipeFor: 'inscription',
    produces: 'pigment_purple_200',
    name: 'pigment purple(200)',
    id: 'pigment_purple_200',
    category: 'pigment',
    timeToCraft: 600,
    xp: 50,
    maxToCraft: 1,
    requiredInscriptionLevel: 20,
    required: [{
      type: 'item',
      itemId: 'cardoon',
      icon: ITEMS['cardoon'].icon,
      name: ITEMS['cardoon'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 20
    }]
  },

  pigment_yellow_255: {
    recipeFor: 'inscription',
    produces: 'pigment_yellow_255',
    name: 'pigment yellow(255)',
    id: 'pigment_yellow_255',
    category: 'pigment',
    timeToCraft: 600,
    xp: 50,
    maxToCraft: 1,
    requiredInscriptionLevel: 25,
    required: [{
      type: 'item',
      itemId: 'feverfew',
      icon: ITEMS['feverfew'].icon,
      name: ITEMS['feverfew'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 25
    }]
  },

  pigment_green_140: {
    recipeFor: 'inscription',
    produces: 'pigment_green_140',
    name: 'pigment green(140)',
    id: 'pigment_green_140',
    category: 'pigment',
    timeToCraft: 600,
    xp: 450,
    maxToCraft: 1,
    requiredInscriptionLevel: 31,
    required: [{
      type: 'item',
      itemId: 'catnip',
      icon: ITEMS['catnip'].icon,
      name: ITEMS['catnip'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 31
    }]
  },

  pigment_red_100: {
    recipeFor: 'inscription',
    produces: 'pigment_red_100',
    name: 'pigment red(100)',
    id: 'pigment_red_100',
    category: 'pigment',
    timeToCraft: 600,
    xp: 550,
    maxToCraft: 1,
    requiredInscriptionLevel: 37,
    required: [{
      type: 'item',
      itemId: 'nasturtium',
      icon: ITEMS['nasturtium'].icon,
      name: ITEMS['nasturtium'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 37
    }]
  },

  pigment_yellow_200: {
    recipeFor: 'inscription',
    produces: 'pigment_yellow_200',
    name: 'pigment yellow(200)',
    id: 'pigment_yellow_200',
    category: 'pigment',
    timeToCraft: 900,
    xp: 500,
    maxToCraft: 1,
    requiredInscriptionLevel: 43,
    required: [{
      type: 'item',
      itemId: 'lemon_grass',
      icon: ITEMS['lemon_grass'].icon,
      name: ITEMS['lemon_grass'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 43
    }]
  },

  pigment_white_190: {
    recipeFor: 'inscription',
    produces: 'pigment_white_190',
    name: 'pigment white(190)',
    id: 'pigment_white_190',
    category: 'pigment',
    timeToCraft: 600,
    xp: 1500,
    maxToCraft: 1,
    requiredInscriptionLevel: 49,
    required: [{
      type: 'item',
      itemId: 'garlic',
      icon: ITEMS['garlic'].icon,
      name: ITEMS['garlic'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 49
    }]
  },

  pigment_purple_150: {
    recipeFor: 'inscription',
    produces: 'pigment_purple_150',
    name: 'pigment purple(150)',
    id: 'pigment_purple_150',
    category: 'pigment',
    timeToCraft: 600,
    xp: 4000,
    maxToCraft: 1,
    requiredInscriptionLevel: 54,
    required: [{
      type: 'item',
      itemId: 'chives',
      icon: ITEMS['chives'].icon,
      name: ITEMS['chives'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 54
    }]
  },

  pigment_green_110: {
    recipeFor: 'inscription',
    produces: 'pigment_green_110',
    name: 'pigment green(110)',
    id: 'pigment_green_110',
    category: 'pigment',
    timeToCraft: 900,
    xp: 10000,
    maxToCraft: 1,
    requiredInscriptionLevel: 60,
    required: [{
      type: 'item',
      itemId: 'sorrell',
      icon: ITEMS['sorrell'].icon,
      name: ITEMS['sorrell'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 60
    }]
  }

}
