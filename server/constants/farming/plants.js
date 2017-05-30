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

  lemon: {
    produces: 'lemon',
    name: 'lemon',
    id: 'lemon',
    category: 'farming',
    icon: ITEMS['lemon'].icon,
    waterStorage: 100,
    initialWater: 100,
    requiredWater: 50,
    growthTime: 300,
    xp: 15,
    required: [{
      type: 'item',
      itemId: 'lemon_seed',
      icon: ITEMS['lemon_seed'].icon,
      name: ITEMS['lemon_seed'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'farming',
      level: 2
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

  red_apple: {
    produces: 'red_apple',
    name: 'red apple',
    id: 'red_apple',
    category: 'farming',
    icon: ITEMS['red_apple'].icon,
    waterStorage: 100,
    initialWater: 50,
    requiredWater: 120,
    growthTime: 10 * 60,
    xp: 50,
    required: [{
      type: 'item',
      itemId: 'red_apple_seed',
      icon: ITEMS['red_apple_seed'].icon,
      name: ITEMS['red_apple_seed'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'farming',
      level: 5
    }]
  },

  pineapple: {
    produces: 'pineapple',
    name: 'pineapple',
    id: 'pineapple',
    category: 'farming',
    icon: ITEMS['pineapple'].icon,
    waterStorage: 100,
    initialWater: 50,
    requiredWater: 300,
    growthTime: 15 * 60,
    xp: 100,
    required: [{
      type: 'item',
      itemId: 'pineapple_seed',
      icon: ITEMS['pineapple_seed'].icon,
      name: ITEMS['pineapple_seed'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'farming',
      level: 10
    }]
  },

  watermelon: {
    produces: 'watermelon',
    name: 'watermelon',
    id: 'watermelon',
    category: 'farming',
    icon: ITEMS['watermelon'].icon,
    waterStorage: 100,
    initialWater: 50,
    requiredWater: 300,
    growthTime: 15 * 60,
    xp: 75,
    required: [{
      type: 'item',
      itemId: 'watermelon_seed',
      icon: ITEMS['watermelon_seed'].icon,
      name: ITEMS['watermelon_seed'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'farming',
      level: 15
    }]
  },

  potato: {
    produces: 'potato',
    name: 'potato',
    id: 'potato',
    category: 'farming',
    icon: ITEMS['potato'].icon,
    waterStorage: 100,
    initialWater: 50,
    requiredWater: 200,
    growthTime: 10 * 60,
    xp: 75,
    required: [{
      type: 'item',
      itemId: 'potato_seed',
      icon: ITEMS['potato_seed'].icon,
      name: ITEMS['potato_seed'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'farming',
      level: 20
    }]
  },

  carrot: {
    produces: 'carrot',
    name: 'carrot',
    id: 'carrot',
    category: 'farming',
    icon: ITEMS['carrot'].icon,
    waterStorage: 100,
    initialWater: 50,
    requiredWater: 200,
    growthTime: 10 * 60,
    xp: 100,
    required: [{
      type: 'item',
      itemId: 'carrot_seed',
      icon: ITEMS['carrot_seed'].icon,
      name: ITEMS['carrot_seed'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'farming',
      level: 20
    }]
  },

  dragonfruit: {
    produces: 'dragonfruit',
    name: 'dragonfruit',
    id: 'dragonfruit',
    category: 'farming',
    icon: ITEMS['dragonfruit'].icon,
    waterStorage: 100,
    initialWater: 50,
    requiredWater: 200,
    growthTime: 30 * 60,
    xp: 150,
    required: [{
      type: 'item',
      itemId: 'dragonfruit_seed',
      icon: ITEMS['dragonfruit_seed'].icon,
      name: ITEMS['dragonfruit_seed'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'farming',
      level: 25
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
  },

  pink_rose: {
    produces: 'pink_rose',
    name: 'pink rose',
    id: 'pink_rose',
    category: 'farming',
    icon: ITEMS['pink_rose'].icon,
    waterStorage: 100,
    initialWater: 100,
    requiredWater: 110,
    growthTime: 300,
    xp: 30,
    required: [{
      type: 'item',
      itemId: 'pink_rose_seed',
      icon: ITEMS['pink_rose_seed'].icon,
      name: ITEMS['pink_rose_seed'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'farming',
      level: 5
    }]
  },

  pine_log: {
    produces: 'pine_log',
    produceAmount: 20,
    name: 'pine tree',
    id: 'pine_log',
    category: 'farming',
    icon: 'pineTree',
    waterStorage: 100,
    initialWater: 100,
    requiredWater: 100,
    growthTime: 8 * 60 * 60,
    xp: 200,
    required: [{
      type: 'item',
      itemId: 'pine_seed',
      icon: ITEMS['pine_seed'].icon,
      name: ITEMS['pine_seed'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'farming',
      level: 1
    }]
  },

  beech_log: {
    produces: 'beech_log',
    produceAmount: 20,
    name: 'beech tree',
    id: 'beech_log',
    category: 'farming',
    icon: 'beechTree',
    waterStorage: 100,
    initialWater: 100,
    requiredWater: 100,
    growthTime: 8 * 60 * 60,
    xp: 400,
    required: [{
      type: 'item',
      itemId: 'beech_seed',
      icon: ITEMS['beech_seed'].icon,
      name: ITEMS['beech_seed'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'farming',
      level: 5
    }]
  },

  ash_log: {
    produces: 'ash_log',
    name: 'ash tree',
    produceAmount: 20,
    id: 'ash_log',
    category: 'farming',
    icon: 'ashTree',
    waterStorage: 100,
    initialWater: 100,
    requiredWater: 100,
    growthTime: 8 * 60 * 60,
    xp: 800,
    required: [{
      type: 'item',
      itemId: 'ash_seed',
      icon: ITEMS['ash_seed'].icon,
      name: ITEMS['ash_seed'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'farming',
      level: 10
    }]
  },

  oak_log: {
    produces: 'oak_log',
    name: 'oak tree',
    produceAmount: 20,
    id: 'oak_log',
    category: 'farming',
    icon: 'oakTree',
    waterStorage: 100,
    initialWater: 100,
    requiredWater: 100,
    growthTime: 8 * 60 * 60,
    xp: 1200,
    required: [{
      type: 'item',
      itemId: 'oak_seed',
      icon: ITEMS['oak_seed'].icon,
      name: ITEMS['oak_seed'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'farming',
      level: 15
    }]
  },

  endive: {
    produces: 'endive',
    name: 'endive',
    id: 'endive',
    category: 'farming',
    icon: ITEMS['endive'].icon,
    waterStorage: 100,
    initialWater: 100,
    requiredWater: 110,
    growthTime: 300,
    xp: 30,
    required: [{
      type: 'item',
      itemId: 'endive_seed',
      icon: ITEMS['endive_seed'].icon,
      name: ITEMS['endive_seed'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'farming',
      level: 6
    }]
  },

  juniper: {
    produces: 'juniper',
    name: 'juniper',
    id: 'juniper',
    category: 'farming',
    icon: ITEMS['juniper'].icon,
    waterStorage: 100,
    initialWater: 100,
    requiredWater: 200,
    growthTime: 600,
    xp: 50,
    required: [{
      type: 'item',
      itemId: 'juniper_seed',
      icon: ITEMS['juniper_seed'].icon,
      name: ITEMS['juniper_seed'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'farming',
      level: 7
    }]
  },

  agrimony: {
    produces: 'agrimony',
    name: 'agrimony',
    id: 'agrimony',
    category: 'farming',
    icon: ITEMS['agrimony'].icon,
    waterStorage: 100,
    initialWater: 100,
    requiredWater: 1000,
    growthTime: 60 * 60 * 1,
    xp: 100,
    required: [{
      type: 'item',
      itemId: 'agrimony_seed',
      icon: ITEMS['agrimony_seed'].icon,
      name: ITEMS['agrimony_seed'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'farming',
      level: 12
    }]
  },

  cardoon: {
    produces: 'cardoon',
    name: 'cardoon',
    id: 'cardoon',
    category: 'farming',
    icon: ITEMS['cardoon'].icon,
    waterStorage: 100,
    initialWater: 100,
    requiredWater: 2000,
    growthTime: 15 * 60 * 1,
    xp: 100,
    required: [{
      type: 'item',
      itemId: 'cardoon_seed',
      icon: ITEMS['cardoon_seed'].icon,
      name: ITEMS['cardoon_seed'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'farming',
      level: 25
    }]
  },

  chilli: {
    produces: 'chilli',
    name: 'chilli',
    id: 'chilli',
    category: 'farming',
    icon: ITEMS['chilli'].icon,
    waterStorage: 100,
    initialWater: 100,
    requiredWater: 200,
    growthTime: 60 * 60 * 1,
    xp: 50,
    required: [{
      type: 'item',
      itemId: 'chilli_seed',
      icon: ITEMS['chilli_seed'].icon,
      name: ITEMS['chilli_seed'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'farming',
      level: 15
    }]
  },

  celery: {
    produces: 'celery',
    name: 'celery',
    id: 'celery',
    category: 'farming',
    icon: ITEMS['celery'].icon,
    waterStorage: 100,
    initialWater: 100,
    requiredWater: 300,
    growthTime: 60 * 60 * 1,
    xp: 50,
    required: [{
      type: 'item',
      itemId: 'celery_seed',
      icon: ITEMS['celery_seed'].icon,
      name: ITEMS['celery_seed'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'farming',
      level: 20
    }]
  },

  feverfew: {
    produces: 'feverfew',
    name: 'feverfew',
    id: 'feverfew',
    category: 'farming',
    icon: ITEMS['feverfew'].icon,
    waterStorage: 100,
    initialWater: 100,
    requiredWater: 300,
    growthTime: 24 * 60 * 1,
    xp: 50,
    required: [{
      type: 'item',
      itemId: 'feverfew_seed',
      icon: ITEMS['feverfew_seed'].icon,
      name: ITEMS['feverfew_seed'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'farming',
      level: 30
    }]
  }

}
