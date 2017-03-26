import { ITEMS } from '/server/constants/items/index.js'; 

export const PLANTS = {
  lettice: {
    produces: 'lettice',
    name: 'lettice',
    id: 'lettice',
    category: 'farming',
    waterStorage: 100,
    requiredWater: 50,
    growthTime: 60,
    xp: 4,
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

  rubia_flower: {
    produces: 'rubia_flower',
    name: 'rubia flower',
    id: 'rubia_flower',
    category: 'farming',
    waterStorage: 100,
    requiredWater: 50,
    growthTime: 120,
    xp: 8,
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
      level: 1
    }]
  }
}
