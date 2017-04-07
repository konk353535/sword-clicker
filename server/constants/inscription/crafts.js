import { ITEMS } from '/server/constants/items/index.js'; 

const RED_255 = {
  type: 'item',
  itemId: 'pigment_red_255',
  icon: ITEMS['pigment_red_255'].icon,
  name: ITEMS['pigment_red_255'].name,
  amount: 1,
  consumes: true
}

const MANY_RED_255 = {
  type: 'item',
  itemId: 'pigment_red_255',
  icon: ITEMS['pigment_red_255'].icon,
  name: ITEMS['pigment_red_255'].name,
  amount: 3,
  consumes: true
}

const RED_200 = {
  type: 'item',
  itemId: 'pigment_red_200',
  icon: ITEMS['pigment_red_200'].icon,
  name: ITEMS['pigment_red_200'].name,
  amount: 1,
  consumes: true
}

const GREEN_255 = {
  type: 'item',
  itemId: 'pigment_green_255',
  icon: ITEMS['pigment_green_255'].icon,
  name: ITEMS['pigment_green_255'].name,
  amount: 1,
  consumes: true
}

const GREEN_200 = {
  type: 'item',
  itemId: 'pigment_green_200',
  icon: ITEMS['pigment_green_200'].icon,
  name: ITEMS['pigment_green_200'].name,
  amount: 1,
  consumes: true
}

const BLUE_255 = {
  type: 'item',
  itemId: 'pigment_blue_255',
  icon: ITEMS['pigment_blue_255'].icon,
  name: ITEMS['pigment_blue_255'].name,
  amount: 1,
  consumes: true
}

const PURPLE_255 = {
  type: 'item',
  itemId: 'pigment_purple_255',
  icon: ITEMS['pigment_purple_255'].icon,
  name: ITEMS['pigment_purple_255'].name,
  amount: 1,
  consumes: true
}

const PINE_PAPER = {
  type: 'item',
  itemId: 'pine_paper',
  icon: ITEMS['pine_paper'].icon,
  name: ITEMS['pine_paper'].name,
  amount: 1,
  consumes: true
}

const MANY_PINE_PAPER = {
  type: 'item',
  itemId: 'pine_paper',
  icon: ITEMS['pine_paper'].icon,
  name: ITEMS['pine_paper'].name,
  amount: 3,
  consumes: true 
}

const BEECH_PAPER = {
  type: 'item',
  itemId: 'beech_paper',
  icon: ITEMS['beech_paper'].icon,
  name: ITEMS['beech_paper'].name,
  amount: 1,
  consumes: true
}

const ASH_PAPER = {
  type: 'item',
  itemId: 'ash_paper',
  icon: ITEMS['ash_paper'].icon,
  name: ITEMS['ash_paper'].name,
  amount: 1,
  consumes: true
}

const LEVEL_1 = { type: 'skill', name: 'inscription', level: 1 };
const LEVEL_2 = { type: 'skill', name: 'inscription', level: 2 };
const LEVEL_3 = { type: 'skill', name: 'inscription', level: 3 };
const LEVEL_4 = { type: 'skill', name: 'inscription', level: 4 };
const LEVEL_5 = { type: 'skill', name: 'inscription', level: 5 };
const LEVEL_6 = { type: 'skill', name: 'inscription', level: 6 };

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
    required: [MANY_RED_255, PINE_PAPER, LEVEL_1]
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
    required: [GREEN_255, GREEN_200, BEECH_PAPER, LEVEL_4]
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
    required: [RED_255, RED_200, GREEN_255, BEECH_PAPER, LEVEL_4]
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
    required: [MANY_RED_255, GREEN_255, PINE_PAPER, LEVEL_2]
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
    required: [PURPLE_255, ASH_PAPER, LEVEL_6]
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
    required: [BLUE_255, GREEN_200, ASH_PAPER, LEVEL_5]
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
    required: [RED_255, BLUE_255, ASH_PAPER, LEVEL_5]
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
    required: [RED_200, GREEN_255, MANY_PINE_PAPER, LEVEL_3]
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
    required: [RED_255, GREEN_255, PINE_PAPER, LEVEL_1]
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
    required: [GREEN_200, RED_255, BEECH_PAPER, LEVEL_3]
  }
}
