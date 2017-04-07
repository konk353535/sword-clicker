import { ITEMS } from '/server/constants/items/index.js'; 

export const PLANTS = {
  lettice: {
    produces: 'lettice',
    name: 'lettice',
    id: 'lettice',
    category: 'farming',
    icon: ITEMS['lettice'].icon,
    waterStorage: 100,
    initialWater: 100,
    requiredWater: 50,
    growthTime: 60,
    xp: 3,
    required: [{
      type: 'item',
      itemId: 'lettice_seed',
      icon: ITEMS['lettice_seed'].icon,
      name: ITEMS['lettice_seed'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'farming',
      level: 1
    }]
  },

  grape_fruit: {
    produces: 'grape_fruit',
    name: 'grapefruit',
    id: 'grape_fruit',
    category: 'farming',
    icon: ITEMS['grape_fruit'].icon,
    waterStorage: 100,
    initialWater: 100,
    requiredWater: 120,
    growthTime: 300,
    xp: 12,
    required: [{
      type: 'item',
      itemId: 'grape_fruit_seed',
      icon: ITEMS['grape_fruit_seed'].icon,
      name: ITEMS['grape_fruit_seed'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'farming',
      level: 3
    }]
  },

  dead_plant: {
    produces: 'dead_plant',
    name: 'dead plant',
    id: 'dead_plant',
    category: 'farming',
    icon: ITEMS['dead_plant'].icon,
    xp: 0
  },

  rubia_flower: {
    produces: 'rubia_flower',
    name: 'rubia flower',
    id: 'rubia_flower',
    category: 'farming',
    icon: ITEMS['rubia_flower'].icon,
    waterStorage: 100,
    initialWater: 100,
    requiredWater: 200,
    growthTime: 120,
    xp: 15,
    required: [{
      type: 'item',
      itemId: 'rubia_flower_seed',
      icon: ITEMS['rubia_flower_seed'].icon,
      name: ITEMS['rubia_flower_seed'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'farming',
      level: 2
    }]
  },

  basil: {
    produces: 'basil',
    name: 'basil',
    id: 'basil',
    category: 'farming',
    icon: ITEMS['basil'].icon,
    waterStorage: 100,
    initialWater: 100,
    requiredWater: 110,
    growthTime: 300,
    xp: 15,
    required: [{
      type: 'item',
      itemId: 'basil_seed',
      icon: ITEMS['basil_seed'].icon,
      name: ITEMS['basil_seed'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'farming',
      level: 4
    }]
  }

}
