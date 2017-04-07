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
  }
}
