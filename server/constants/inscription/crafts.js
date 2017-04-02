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
    xp: 3,
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

  berserk_level_1_page_1: {
    recipeFor: 'inscription',
    produces: 'berserk_level_1_page_1',
    name: 'Berserk Lv 1 Pg 1',
    id: 'berserk_level_1_page_1',
    category: 'page',
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

  berserk_level_1_page_2: {
    recipeFor: 'inscription',
    produces: 'berserk_level_1_page_2',
    name: 'Berserk Lv 1. Pg. 2',
    id: 'berserk_level_1_page_2',
    category: 'page',
    timeToCraft: 60,
    xp: 10,
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

  berserk_level_1_tome: {
    recipeFor: 'inscription',
    produces: 'berserk_level_1_tome',
    name: 'Berserk tome Lv 1.',
    id: 'berserk_level_1_tome',
    category: 'tome',
    timeToCraft: 120,
    xp: 20,
    maxToCraft: 1,
    level: 1,
    requiredInscriptionLevel: 1,
    required: [{
      type: 'item',
      itemId: 'berserk_level_1_page_1',
      icon: ITEMS['berserk_level_1_page_1'].icon,
      name: ITEMS['berserk_level_1_page_1'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'item',
      itemId: 'berserk_level_1_page_2',
      icon: ITEMS['berserk_level_1_page_2'].icon,
      name: ITEMS['berserk_level_1_page_2'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 1
    }]
  },

  execute_level_1_page_1: {
    recipeFor: 'inscription',
    produces: 'execute_level_1_page_1',
    name: 'execute Lv 1 Pg 1',
    id: 'execute_level_1_page_1',
    category: 'page',
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

  execute_level_1_page_2: {
    recipeFor: 'inscription',
    produces: 'execute_level_1_page_2',
    name: 'execute Lv 1. Pg. 2',
    id: 'execute_level_1_page_2',
    category: 'page',
    timeToCraft: 60,
    xp: 10,
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
    name: 'execute tome Lv 1.',
    id: 'execute_level_1_tome',
    category: 'tome',
    timeToCraft: 120,
    xp: 20,
    maxToCraft: 1,
    level: 1,
    requiredInscriptionLevel: 1,
    required: [{
      type: 'item',
      itemId: 'execute_level_1_page_1',
      icon: ITEMS['execute_level_1_page_1'].icon,
      name: ITEMS['execute_level_1_page_1'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'item',
      itemId: 'execute_level_1_page_2',
      icon: ITEMS['execute_level_1_page_2'].icon,
      name: ITEMS['execute_level_1_page_2'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 1
    }]
  },

  bleed_level_1_page_1: {
    recipeFor: 'inscription',
    produces: 'bleed_level_1_page_1',
    name: 'bleed Lv 1 Pg 1',
    id: 'bleed_level_1_page_1',
    category: 'page',
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

  bleed_level_1_tome: {
    recipeFor: 'inscription',
    produces: 'bleed_level_1_tome',
    name: 'bleed tome Lv 1.',
    id: 'bleed_level_1_tome',
    category: 'tome',
    timeToCraft: 120,
    xp: 20,
    maxToCraft: 1,
    level: 1,
    requiredInscriptionLevel: 1,
    required: [{
      type: 'item',
      itemId: 'bleed_level_1_page_1',
      icon: ITEMS['bleed_level_1_page_1'].icon,
      name: ITEMS['bleed_level_1_page_1'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 1
    }]
  },

  blade_spin_level_1_page_1: {
    recipeFor: 'inscription',
    produces: 'blade_spin_level_1_page_1',
    name: 'blade spin Lv 1 Pg 1',
    id: 'blade_spin_level_1_page_1',
    category: 'page',
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

  blade_spin_level_1_tome: {
    recipeFor: 'inscription',
    produces: 'blade_spin_level_1_tome',
    name: 'blade spin tome Lv 1.',
    id: 'blade_spin_level_1_tome',
    category: 'tome',
    timeToCraft: 120,
    xp: 20,
    maxToCraft: 1,
    level: 1,
    requiredInscriptionLevel: 1,
    required: [{
      type: 'item',
      itemId: 'blade_spin_level_1_page_1',
      icon: ITEMS['blade_spin_level_1_page_1'].icon,
      name: ITEMS['blade_spin_level_1_page_1'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 1
    }]
  },

  blade_frenzy_level_1_page_1: {
    recipeFor: 'inscription',
    produces: 'blade_frenzy_level_1_page_1',
    name: 'blade frenzy Lv 1 Pg 1',
    id: 'blade_frenzy_level_1_page_1',
    category: 'page',
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

  blade_frenzy_level_1_tome: {
    recipeFor: 'inscription',
    produces: 'blade_frenzy_level_1_tome',
    name: 'blade frenzy tome Lv 1.',
    id: 'blade_frenzy_level_1_tome',
    category: 'tome',
    timeToCraft: 120,
    xp: 20,
    maxToCraft: 1,
    level: 1,
    requiredInscriptionLevel: 1,
    required: [{
      type: 'item',
      itemId: 'blade_frenzy_level_1_page_1',
      icon: ITEMS['blade_frenzy_level_1_page_1'].icon,
      name: ITEMS['blade_frenzy_level_1_page_1'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 1
    }]
  },

  defensive_stance_level_1_page_1: {
    recipeFor: 'inscription',
    produces: 'defensive_stance_level_1_page_1',
    name: 'defensive stance Lv 1 Pg 1',
    id: 'defensive_stance_level_1_page_1',
    category: 'page',
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

  defensive_stance_level_1_tome: {
    recipeFor: 'inscription',
    produces: 'defensive_stance_level_1_tome',
    name: 'defensive stance tome Lv 1.',
    id: 'defensive_stance_level_1_tome',
    category: 'tome',
    timeToCraft: 120,
    xp: 20,
    maxToCraft: 1,
    level: 1,
    requiredInscriptionLevel: 1,
    required: [{
      type: 'item',
      itemId: 'defensive_stance_level_1_page_1',
      icon: ITEMS['defensive_stance_level_1_page_1'].icon,
      name: ITEMS['defensive_stance_level_1_page_1'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 1
    }]
  },

  evasive_maneuvers_level_1_page_1: {
    recipeFor: 'inscription',
    produces: 'evasive_maneuvers_level_1_page_1',
    name: 'evasive maneuvers Lv 1 Pg 1',
    id: 'evasive_maneuvers_level_1_page_1',
    category: 'page',
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

  evasive_maneuvers_level_1_tome: {
    recipeFor: 'inscription',
    produces: 'evasive_maneuvers_level_1_tome',
    name: 'evasive maneuvers tome Lv 1.',
    id: 'evasive_maneuvers_level_1_tome',
    category: 'tome',
    timeToCraft: 120,
    xp: 20,
    maxToCraft: 1,
    level: 1,
    requiredInscriptionLevel: 1,
    required: [{
      type: 'item',
      itemId: 'evasive_maneuvers_level_1_page_1',
      icon: ITEMS['evasive_maneuvers_level_1_page_1'].icon,
      name: ITEMS['evasive_maneuvers_level_1_page_1'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 1
    }]
  }
}
