import { ITEMS } from '/server/constants/items/index.js'; 

export const PLANTS = {
  lettice: {
    produces: 'lettice',
    name: 'lettuce',
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

  marigold: {
    produces: 'marigold',
    name: 'marigold',
    id: 'marigold',
    category: 'farming',
    icon: ITEMS['marigold'].icon,
    waterStorage: 100,
    initialWater: 100,
    requiredWater: 50,
    growthTime: 15 * 60,
    xp: 1,
    required: [{
      type: 'item',
      itemId: 'marigold_seed',
      icon: ITEMS['marigold_seed'].icon,
      name: ITEMS['marigold_seed'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'farming',
      level: 9
    }]
  },

  blue_rose: {
    produces: 'blue_rose',
    name: 'blue rose',
    id: 'blue_rose',
    category: 'farming',
    icon: ITEMS['blue_rose'].icon,
    waterStorage: 100,
    initialWater: 100,
    requiredWater: 50,
    growthTime: 15 * 60,
    xp: 3,
    required: [{
      type: 'item',
      itemId: 'blue_rose_seed',
      icon: ITEMS['blue_rose_seed'].icon,
      name: ITEMS['blue_rose_seed'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'farming',
      level: 19
    }]
  },

  // 0.25 hours, 2800g/hr
  hydrangea: {
    produces: 'hydrangea',
    name: 'hydrangea',
    id: 'hydrangea',
    category: 'farming',
    icon: ITEMS['hydrangea'].icon,
    waterStorage: 100,
    initialWater: 100,
    requiredWater: 50,
    growthTime: 15 * 60,
    xp: 1,
    required: [{
      type: 'item',
      itemId: 'hydrangea_seed',
      icon: ITEMS['hydrangea_seed'].icon,
      name: ITEMS['hydrangea_seed'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'farming',
      level: 39
    }]
  },

  // 4 hours, 800g/hr
  poppy: {
    produces: 'poppy',
    name: 'poppy',
    id: 'poppy',
    category: 'farming',
    icon: ITEMS['poppy'].icon,
    waterStorage: 100,
    initialWater: 100,
    requiredWater: 50,
    growthTime: 60 * 60 * 4,
    xp: 1,
    required: [{
      type: 'item',
      itemId: 'poppy_seed',
      icon: ITEMS['poppy_seed'].icon,
      name: ITEMS['poppy_seed'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'farming',
      level: 49
    }]
  },

  // 8 hours, 700/hr
  zinnia: {
    produces: 'zinnia',
    name: 'zinnia',
    id: 'zinnia',
    category: 'farming',
    icon: ITEMS['zinnia'].icon,
    waterStorage: 100,
    initialWater: 100,
    requiredWater: 50,
    growthTime: 60 * 60 * 8,
    xp: 1,
    required: [{
      type: 'item',
      itemId: 'zinnia_seed',
      icon: ITEMS['zinnia_seed'].icon,
      name: ITEMS['zinnia_seed'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'farming',
      level: 59
    }]
  },

  // 0.16 hr, 3450/hr
  tulip: {
    produces: 'tulip',
    name: 'tulip',
    id: 'tulip',
    category: 'farming',
    icon: ITEMS['zinnia'].icon,
    waterStorage: 100,
    initialWater: 100,
    requiredWater: 50,
    growthTime: 10 * 60,
    xp: 1,
    required: [{
      type: 'item',
      itemId: 'tulip_seed',
      icon: ITEMS['tulip_seed'].icon,
      name: ITEMS['tulip_seed'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'farming',
      level: 69
    }]
  },

  // 8 hours, 500g/hr
  chrysanthemum: {
    produces: 'chrysanthemum',
    name: 'chrysanthemum',
    id: 'chrysanthemum',
    category: 'farming',
    icon: ITEMS['chrysanthemum'].icon,
    waterStorage: 100,
    initialWater: 100,
    requiredWater: 50,
    growthTime: 8 * 60 * 60,
    xp: 100,
    required: [{
      type: 'item',
      itemId: 'chrysanthemum_seed',
      icon: ITEMS['chrysanthemum_seed'].icon,
      name: ITEMS['chrysanthemum_seed'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'farming',
      level: 18
    }]
  },

  cactus: {
    produces: 'cactus',
    name: 'cactus',
    id: 'cactus',
    category: 'farming',
    icon: ITEMS['cactus'].icon,
    waterStorage: 100,
    initialWater: 100,
    requiredWater: 50,
    growthTime: 60 * 60,
    xp: 300,
    required: [{
      type: 'item',
      itemId: 'cactus_seed',
      icon: ITEMS['cactus_seed'].icon,
      name: ITEMS['cactus_seed'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'farming',
      level: 6
    }]
  },

  bamboo: {
    produces: 'bamboo',
    name: 'bamboo',
    id: 'bamboo',
    category: 'farming',
    icon: ITEMS['bamboo'].icon,
    waterStorage: 100,
    initialWater: 100,
    requiredWater: 50,
    growthTime: 60 * 60,
    xp: 1500,
    required: [{
      type: 'item',
      itemId: 'bamboo_seed',
      icon: ITEMS['bamboo_seed'].icon,
      name: ITEMS['bamboo_seed'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'farming',
      level: 36
    }]
  },

  kenaf: {
    produces: 'kenaf',
    name: 'kenaf',
    id: 'kenaf',
    category: 'farming',
    icon: ITEMS['kenaf'].icon,
    waterStorage: 100,
    initialWater: 100,
    requiredWater: 50,
    growthTime: 60 * 30,
    xp: 1250,
    required: [{
      type: 'item',
      itemId: 'kenaf_seed',
      icon: ITEMS['kenaf_seed'].icon,
      name: ITEMS['kenaf_seed'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'farming',
      level: 56
    }]
  },

  palm: {
    produces: 'palm',
    name: 'palm',
    id: 'palm',
    category: 'farming',
    icon: ITEMS['palm'].icon,
    waterStorage: 100,
    initialWater: 100,
    requiredWater: 50,
    growthTime: 60 * 60 * 2,
    xp: 8000,
    required: [{
      type: 'item',
      itemId: 'palm_seed',
      icon: ITEMS['palm_seed'].icon,
      name: ITEMS['palm_seed'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'farming',
      level: 76
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

  pear: {
    produces: 'pear',
    name: 'pear',
    id: 'pear',
    category: 'farming',
    icon: ITEMS['pear'].icon,
    waterStorage: 100,
    initialWater: 100,
    requiredWater: 50,
    growthTime: 300,
    xp: 20,
    required: [{
      type: 'item',
      itemId: 'pear_seed',
      icon: ITEMS['pear_seed'].icon,
      name: ITEMS['pear_seed'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'farming',
      level: 8
    }]
  },

  acai_berry: {
    produces: 'acai_berry',
    name: 'acai berry',
    id: 'acai_berry',
    category: 'farming',
    icon: ITEMS['acai_berry'].icon,
    waterStorage: 100,
    initialWater: 100,
    requiredWater: 50,
    growthTime: 300,
    xp: 35,
    required: [{
      type: 'item',
      itemId: 'acai_berry_seed',
      icon: ITEMS['acai_berry_seed'].icon,
      name: ITEMS['acai_berry_seed'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'farming',
      level: 24
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
    xp: 110,
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

  orange: {
    produces: 'orange',
    name: 'orange',
    id: 'orange',
    category: 'farming',
    icon: ITEMS['orange'].icon,
    waterStorage: 100,
    initialWater: 50,
    requiredWater: 300,
    growthTime: 15 * 60,
    xp: 150,
    required: [{
      type: 'item',
      itemId: 'orange_seed',
      icon: ITEMS['orange_seed'].icon,
      name: ITEMS['orange_seed'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'farming',
      level: 30
    }]
  },

  sweet_potato: {
    produces: 'sweet_potato',
    name: 'sweet_potato',
    id: 'sweet_potato',
    category: 'farming',
    icon: ITEMS['sweet_potato'].icon,
    waterStorage: 100,
    initialWater: 50,
    requiredWater: 200,
    growthTime: 10 * 60,
    xp: 200,
    required: [{
      type: 'item',
      itemId: 'sweet_potato_seed',
      icon: ITEMS['sweet_potato_seed'].icon,
      name: ITEMS['sweet_potato_seed'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'farming',
      level: 35
    }]
  },

  banana: {
    produces: 'banana',
    name: 'banana',
    id: 'banana',
    category: 'farming',
    icon: ITEMS['banana'].icon,
    waterStorage: 100,
    initialWater: 50,
    requiredWater: 200,
    growthTime: 10 * 60,
    xp: 300,
    required: [{
      type: 'item',
      itemId: 'banana_seed',
      icon: ITEMS['banana_seed'].icon,
      name: ITEMS['banana_seed'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'farming',
      level: 40
    }]
  },

  rockmelon: {
    produces: 'rockmelon',
    name: 'rockmelon',
    id: 'rockmelon',
    category: 'farming',
    icon: ITEMS['rockmelon'].icon,
    waterStorage: 100,
    initialWater: 50,
    requiredWater: 200,
    growthTime: 17 * 60,
    xp: 400,
    required: [{
      type: 'item',
      itemId: 'rockmelon_seed',
      icon: ITEMS['rockmelon_seed'].icon,
      name: ITEMS['rockmelon_seed'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'farming',
      level: 50
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
    xp: 100,
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
    xp: 150,
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
    growthTime: 20 * 60,
    xp: 400,
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
    icon: 'pineTree.svg',
    waterStorage: 100,
    initialWater: 100,
    requiredWater: 100,
    growthTime: 8 * 60 * 60,
    xp: 300,
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
    icon: 'beechTree.svg',
    waterStorage: 100,
    initialWater: 100,
    requiredWater: 100,
    growthTime: 8 * 60 * 60,
    xp: 600,
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
    icon: 'ashTree.svg',
    waterStorage: 100,
    initialWater: 100,
    requiredWater: 100,
    growthTime: 8 * 60 * 60,
    xp: 1200,
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
    icon: 'oakTree.svg',
    waterStorage: 100,
    initialWater: 100,
    requiredWater: 100,
    growthTime: 8 * 60 * 60,
    xp: 1600,
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

  maple_log: {
    produces: 'maple_log',
    name: 'maple tree',
    produceAmount: 20,
    id: 'maple_log',
    category: 'farming',
    icon: 'mapleTree.svg',
    waterStorage: 100,
    initialWater: 100,
    requiredWater: 100,
    growthTime: 8 * 60 * 60,
    xp: 2000,
    required: [{
      type: 'item',
      itemId: 'maple_seed',
      icon: ITEMS['maple_seed'].icon,
      name: ITEMS['maple_seed'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'farming',
      level: 20
    }]
  },

  walnut_log: {
    produces: 'walnut_log',
    name: 'walnut tree',
    produceAmount: 20,
    id: 'walnut_log',
    category: 'farming',
    icon: 'walnutTree.svg',
    waterStorage: 100,
    initialWater: 100,
    requiredWater: 100,
    growthTime: 8 * 60 * 60,
    xp: 2200,
    required: [{
      type: 'item',
      itemId: 'walnut_seed',
      icon: ITEMS['walnut_seed'].icon,
      name: ITEMS['walnut_seed'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'farming',
      level: 25
    }]
  },

  cherry_log: {
    produces: 'cherry_log',
    name: 'cherry tree',
    produceAmount: 20,
    id: 'cherry_log',
    category: 'farming',
    icon: 'cherryTree.svg',
    waterStorage: 100,
    initialWater: 100,
    requiredWater: 100,
    growthTime: 8 * 60 * 60,
    xp: 2600,
    required: [{
      type: 'item',
      itemId: 'cherry_seed',
      icon: ITEMS['cherry_seed'].icon,
      name: ITEMS['cherry_seed'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'farming',
      level: 30
    }]
  },

  mahogany_log: {
    produces: 'mahogany_log',
    name: 'mahogany tree',
    produceAmount: 20,
    id: 'mahogany_log',
    category: 'farming',
    icon: 'mahoganyTree.svg',
    waterStorage: 100,
    initialWater: 100,
    requiredWater: 100,
    growthTime: 8 * 60 * 60,
    xp: 3000,
    required: [{
      type: 'item',
      itemId: 'mahogany_seed',
      icon: ITEMS['mahogany_seed'].icon,
      name: ITEMS['mahogany_seed'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'farming',
      level: 35
    }]
  },

  elk_log: {
    produces: 'elk_log',
    name: 'elk tree',
    produceAmount: 20,
    id: 'elk_log',
    category: 'farming',
    icon: 'elkTree.svg',
    waterStorage: 100,
    initialWater: 100,
    requiredWater: 100,
    growthTime: 8 * 60 * 60,
    xp: 3200,
    required: [{
      type: 'item',
      itemId: 'elk_seed',
      icon: ITEMS['elk_seed'].icon,
      name: ITEMS['elk_seed'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'farming',
      level: 40
    }]
  },

  black_log: {
    produces: 'black_log',
    name: 'black tree',
    produceAmount: 20,
    id: 'black_log',
    category: 'farming',
    icon: 'blackTree.svg',
    waterStorage: 100,
    initialWater: 100,
    requiredWater: 100,
    growthTime: 8 * 60 * 60,
    xp: 3600,
    required: [{
      type: 'item',
      itemId: 'black_seed',
      icon: ITEMS['black_seed'].icon,
      name: ITEMS['black_seed'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'farming',
      level: 45
    }]
  },

  blue_gum_log: {
    produces: 'blue_gum_log',
    name: 'blue gum tree',
    produceAmount: 20,
    id: 'blue_gum_log',
    category: 'farming',
    icon: 'blueGumTree.svg',
    waterStorage: 100,
    initialWater: 100,
    requiredWater: 100,
    growthTime: 8 * 60 * 60,
    xp: 4000,
    required: [{
      type: 'item',
      itemId: 'blue_gum_seed',
      icon: ITEMS['blue_gum_seed'].icon,
      name: ITEMS['blue_gum_seed'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'farming',
      level: 50
    }]
  },

  cedar_log: {
    produces: 'cedar_log',
    name: 'cedar tree',
    produceAmount: 20,
    id: 'cedar_log',
    category: 'farming',
    icon: 'cedarTree.svg',
    waterStorage: 100,
    initialWater: 100,
    requiredWater: 100,
    growthTime: 8 * 60 * 60,
    xp: 4500,
    required: [{
      type: 'item',
      itemId: 'cedar_seed',
      icon: ITEMS['cedar_seed'].icon,
      name: ITEMS['cedar_seed'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'farming',
      level: 55
    }]
  },

  denya_log: {
    produces: 'denya_log',
    name: 'denya tree',
    produceAmount: 20,
    id: 'denya_log',
    category: 'farming',
    icon: 'denyaTree.svg',
    waterStorage: 100,
    initialWater: 100,
    requiredWater: 100,
    growthTime: 8 * 60 * 60,
    xp: 5000,
    required: [{
      type: 'item',
      itemId: 'denya_seed',
      icon: ITEMS['denya_seed'].icon,
      name: ITEMS['denya_seed'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'farming',
      level: 60
    }]
  },

  gombe_log: {
    produces: 'gombe_log',
    name: 'gombe tree',
    produceAmount: 20,
    id: 'gombe_log',
    category: 'farming',
    icon: 'gombeTree.svg',
    waterStorage: 100,
    initialWater: 100,
    requiredWater: 100,
    growthTime: 8 * 60 * 60,
    xp: 5600,
    required: [{
      type: 'item',
      itemId: 'gombe_seed',
      icon: ITEMS['gombe_seed'].icon,
      name: ITEMS['gombe_seed'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'farming',
      level: 65
    }]
  },

  hickory_log: {
    produces: 'hickory_log',
    name: 'hickory tree',
    produceAmount: 20,
    id: 'hickory_log',
    category: 'farming',
    icon: 'hickoryTree.svg',
    waterStorage: 100,
    initialWater: 100,
    requiredWater: 100,
    growthTime: 8 * 60 * 60,
    xp: 6200,
    required: [{
      type: 'item',
      itemId: 'hickory_seed',
      icon: ITEMS['hickory_seed'].icon,
      name: ITEMS['hickory_seed'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'farming',
      level: 70
    }]
  },

  larch_log: {
    produces: 'larch_log',
    name: 'larch tree',
    produceAmount: 20,
    id: 'larch_log',
    category: 'farming',
    icon: 'larchTree.svg',
    waterStorage: 100,
    initialWater: 100,
    requiredWater: 100,
    growthTime: 8 * 60 * 60,
    xp: 6900,
    required: [{
      type: 'item',
      itemId: 'larch_seed',
      icon: ITEMS['larch_seed'].icon,
      name: ITEMS['larch_seed'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'farming',
      level: 75
    }]
  },

  poplar_log: {
    produces: 'poplar_log',
    name: 'poplar tree',
    produceAmount: 20,
    id: 'poplar_log',
    category: 'farming',
    icon: 'poplarTree.svg',
    waterStorage: 100,
    initialWater: 100,
    requiredWater: 100,
    growthTime: 8 * 60 * 60,
    xp: 7600,
    required: [{
      type: 'item',
      itemId: 'poplar_seed',
      icon: ITEMS['poplar_seed'].icon,
      name: ITEMS['poplar_seed'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'farming',
      level: 80
    }]
  },

  tali_log: {
    produces: 'tali_log',
    name: 'tali tree',
    produceAmount: 20,
    id: 'tali_log',
    category: 'farming',
    icon: 'taliTree.svg',
    waterStorage: 100,
    initialWater: 100,
    requiredWater: 100,
    growthTime: 8 * 60 * 60,
    xp: 8400,
    required: [{
      type: 'item',
      itemId: 'tali_seed',
      icon: ITEMS['tali_seed'].icon,
      name: ITEMS['tali_seed'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'farming',
      level: 85
    }]
  },

  teak_log: {
    produces: 'teak_log',
    name: 'teak tree',
    produceAmount: 20,
    id: 'teak_log',
    category: 'farming',
    icon: 'teakTree.svg',
    waterStorage: 100,
    initialWater: 100,
    requiredWater: 100,
    growthTime: 8 * 60 * 60,
    xp:9000,
    required: [{
      type: 'item',
      itemId: 'teak_seed',
      icon: ITEMS['teak_seed'].icon,
      name: ITEMS['teak_seed'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'farming',
      level: 90
    }]
  },

  willow_log: {
    produces: 'willow_log',
    name: 'willow tree',
    produceAmount: 20,
    id: 'willow_log',
    category: 'farming',
    icon: 'willowTree.svg',
    waterStorage: 100,
    initialWater: 100,
    requiredWater: 100,
    growthTime: 8 * 60 * 60,
    xp:10000,
    required: [{
      type: 'item',
      itemId: 'willow_seed',
      icon: ITEMS['willow_seed'].icon,
      name: ITEMS['willow_seed'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'farming',
      level: 95
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
    xp: 1000,
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
    xp: 1200,
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

  garlic: {
    produces: 'garlic',
    name: 'garlic',
    id: 'garlic',
    category: 'farming',
    icon: ITEMS['garlic'].icon,
    waterStorage: 100,
    initialWater: 100,
    requiredWater: 300,
    growthTime: 60 * 60 * 1,
    xp: 500,
    required: [{
      type: 'item',
      itemId: 'garlic_seed',
      icon: ITEMS['garlic_seed'].icon,
      name: ITEMS['garlic_seed'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'farming',
      level: 35
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
    xp: 3000,
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
    xp: 700,
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
