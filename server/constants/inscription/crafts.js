import { ITEMS } from '/server/constants/items/index.js'; 

export const INSCRIPTION_CRAFTS = {
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
      amount: 50,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 1
    }]
  },

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

  berserk_level_1_tome: {
    recipeFor: 'inscription',
    produces: 'berserk_level_1_tome',
    name: 'Berserk Lv 1.',
    id: 'berserk_level_1_tome',
    category: 'tome',
    timeToCraft: 180,
    xp: 30,
    maxToCraft: 1,
    requiredInscriptionLevel: 1,
    required: [{
      type: 'item',
      itemId: 'pigment_red_255',
      icon: ITEMS['pigment_red_255'].icon,
      name: ITEMS['pigment_red_255'].name,
      amount: 3,
      consumes: true
    }, {
      type: 'item',
      itemId: 'pine_paper',
      icon: ITEMS['pine_paper'].icon,
      name: ITEMS['pine_paper'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 1
    }]
  },

  execute_level_1_tome: {
    recipeFor: 'inscription',
    produces: 'execute_level_1_tome',
    name: 'execute Lv 1.',
    id: 'execute_level_1_tome',
    category: 'tome',
    timeToCraft: 180,
    xp: 30,
    maxToCraft: 1,
    requiredInscriptionLevel: 4,
    required: [{
      type: 'item',
      itemId: 'pigment_red_255',
      icon: ITEMS['pigment_red_255'].icon,
      name: ITEMS['pigment_red_255'].name,
      amount: 3,
      consumes: true
    }, {
      type: 'item',
      itemId: 'pine_paper',
      icon: ITEMS['pine_paper'].icon,
      name: ITEMS['pine_paper'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 4
    }]
  },

  bleed_level_1_tome: {
    recipeFor: 'inscription',
    produces: 'bleed_level_1_tome',
    name: 'bleed Lv 1.',
    id: 'bleed_level_1_tome',
    category: 'tome',
    timeToCraft: 180,
    xp: 30,
    maxToCraft: 1,
    requiredInscriptionLevel: 4,
    required: [{
      type: 'item',
      itemId: 'pigment_red_255',
      icon: ITEMS['pigment_red_255'].icon,
      name: ITEMS['pigment_red_255'].name,
      amount: 3,
      consumes: true
    }, {
      type: 'item',
      itemId: 'pine_paper',
      icon: ITEMS['pine_paper'].icon,
      name: ITEMS['pine_paper'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 4
    }]
  },

  blade_spin_level_1_tome: {
    recipeFor: 'inscription',
    produces: 'blade_spin_level_1_tome',
    name: 'blade spin Lv 1.',
    id: 'blade_spin_level_1_tome',
    category: 'tome',
    timeToCraft: 180,
    xp: 30,
    maxToCraft: 1,
    requiredInscriptionLevel: 2,
    required: [{
      type: 'item',
      itemId: 'pigment_red_255',
      icon: ITEMS['pigment_red_255'].icon,
      name: ITEMS['pigment_red_255'].name,
      amount: 2,
      consumes: true
    }, {
      type: 'item',
      itemId: 'pigment_green_255',
      icon: ITEMS['pigment_green_255'].icon,
      name: ITEMS['pigment_green_255'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'item',
      itemId: 'pine_paper',
      icon: ITEMS['pine_paper'].icon,
      name: ITEMS['pine_paper'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 2
    }]
  },

  blade_frenzy_level_1_tome: {
    recipeFor: 'inscription',
    produces: 'blade_frenzy_level_1_tome',
    name: 'blade frenzy Lv 1.',
    id: 'blade_frenzy_level_1_tome',
    category: 'tome',
    timeToCraft: 180,
    xp: 30,
    maxToCraft: 1,
    requiredInscriptionLevel: 6,
    required: [{
      type: 'item',
      itemId: 'pigment_red_255',
      icon: ITEMS['pigment_red_255'].icon,
      name: ITEMS['pigment_red_255'].name,
      amount: 3,
      consumes: true
    }, {
      type: 'item',
      itemId: 'pine_paper',
      icon: ITEMS['pine_paper'].icon,
      name: ITEMS['pine_paper'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 6
    }]
  },

  defensive_stance_level_1_tome: {
    recipeFor: 'inscription',
    produces: 'defensive_stance_level_1_tome',
    name: 'defensive stance Lv 1.',
    id: 'defensive_stance_level_1_tome',
    category: 'tome',
    timeToCraft: 180,
    xp: 30,
    maxToCraft: 1,
    requiredInscriptionLevel: 5,
    required: [{
      type: 'item',
      itemId: 'pigment_red_255',
      icon: ITEMS['pigment_red_255'].icon,
      name: ITEMS['pigment_red_255'].name,
      amount: 3,
      consumes: true
    }, {
      type: 'item',
      itemId: 'pine_paper',
      icon: ITEMS['pine_paper'].icon,
      name: ITEMS['pine_paper'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 5
    }]
  },

  evasive_maneuvers_level_1_tome: {
    recipeFor: 'inscription',
    produces: 'evasive_maneuvers_level_1_tome',
    name: 'evasive maneuvers Lv 1.',
    id: 'evasive_maneuvers_level_1_tome',
    category: 'tome',
    timeToCraft: 180,
    xp: 30,
    maxToCraft: 1,
    requiredInscriptionLevel: 5,
    required: [{
      type: 'item',
      itemId: 'pigment_red_255',
      icon: ITEMS['pigment_red_255'].icon,
      name: ITEMS['pigment_red_255'].name,
      amount: 3,
      consumes: true
    }, {
      type: 'item',
      itemId: 'pine_paper',
      icon: ITEMS['pine_paper'].icon,
      name: ITEMS['pine_paper'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 5
    }]
  },

  armor_up_level_1_tome: {
    recipeFor: 'inscription',
    produces: 'armor_up_level_1_tome',
    name: 'armor up Lv 1',
    id: 'armor_up_level_1_tome',
    category: 'tome',
    timeToCraft: 180,
    xp: 30,
    maxToCraft: 1,
    requiredInscriptionLevel: 3,
    required: [{
      type: 'item',
      itemId: 'pigment_red_255',
      icon: ITEMS['pigment_red_255'].icon,
      name: ITEMS['pigment_red_255'].name,
      amount: 3,
      consumes: true
    }, {
      type: 'item',
      itemId: 'pine_paper',
      icon: ITEMS['pine_paper'].icon,
      name: ITEMS['pine_paper'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 3
    }]
  },

  iron_will_level_1_tome: {
    recipeFor: 'inscription',
    produces: 'iron_will_level_1_tome',
    name: 'iron will Lv 1.',
    id: 'iron_will_level_1_tome',
    category: 'tome',
    timeToCraft: 180,
    xp: 20,
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
      type: 'item',
      itemId: 'pigment_green_255',
      icon: ITEMS['pigment_green_255'].icon,
      name: ITEMS['pigment_green_255'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'item',
      itemId: 'pine_paper',
      icon: ITEMS['pine_paper'].icon,
      name: ITEMS['pine_paper'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 1
    }]
  },

  taunt_level_1_tome: {
    recipeFor: 'inscription',
    produces: 'taunt_level_1_tome',
    name: 'taunt Lv 1.',
    id: 'taunt_level_1_tome',
    category: 'tome',
    timeToCraft: 180,
    xp: 30,
    maxToCraft: 1,
    requiredInscriptionLevel: 3,
    required: [{
      type: 'item',
      itemId: 'pigment_red_255',
      icon: ITEMS['pigment_red_255'].icon,
      name: ITEMS['pigment_red_255'].name,
      amount: 3,
      consumes: true
    }, {
      type: 'item',
      itemId: 'pine_paper',
      icon: ITEMS['pine_paper'].icon,
      name: ITEMS['pine_paper'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 3
    }]
  }
}
