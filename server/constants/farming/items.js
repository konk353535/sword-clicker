import { BUFFS } from '/server/constants/combat';

export const FARMING_ITEMS = {
  lettice_seed: {
    id: 'lettice_seed',
    icon: 'letticeSeed',
    category: 'seed',
    name: 'Lettuce Seed',
    description() {
      const buff = BUFFS.food_lettice;
      return buff.description({ buff });
    },
    sellPrice: 1,
    produces: 'lettice'
  },

  lettice: {
    id: 'lettice',
    icon: 'lettice',
    category: 'food',
    name: 'Lettuce',
    description() {
      const buff = BUFFS.food_lettice;
      return buff.description({ buff });
    },
    buffs: [{
      id: 'food_lettice'
    }],
    sellPrice: 1
  },

  lemon_seed: {
    id: 'lemon_seed',
    icon: 'lemonSeed',
    category: 'seed',
    name: 'Lemon Seed',
    description: 'Used to grow lemon. Useful for regenerating energy.',
    sellPrice: 50,
    produces: 'lemon'
  },

  lemon: {
    id: 'lemon',
    icon: 'lemon',
    category: 'food',
    name: 'lemon',
    description() {
      const buff = BUFFS.food_lemon;
      return buff.description({ buff });
    },
    buffs: [{
      id: 'food_lemon'
    }],
    sellPrice: 50
  },

  red_apple_seed: {
    id: 'red_apple_seed',
    icon: 'redAppleSeed',
    category: 'seed',
    name: 'red apple seed',
    description: 'Used to grow red apples. Useful for eating.',
    sellPrice: 10,
    produces: 'red_apple'
  },

  red_apple: {
    id: 'red_apple',
    icon: 'redApple',
    category: 'food',
    name: 'red apple',
    description() {
      const buff = BUFFS.food_red_apple;
      return buff.description({ buff });
    },
    buffs: [{
      id: 'food_red_apple'
    }],
    sellPrice: 50
  },

  pineapple_seed: {
    id: 'pineapple_seed',
    icon: 'pineappleSeed',
    category: 'seed',
    name: 'pineapple seed',
    description: 'Used to grow pine apples. Useful for eating.',
    sellPrice: 20,
    produces: 'pineapple'
  },

  pineapple: {
    id: 'pineapple',
    icon: 'pineapple',
    category: 'food',
    name: 'pineapple',
    description() {
      const buff = BUFFS.food_pineapple;
      return buff.description({ buff });
    },
    buffs: [{
      id: 'food_pineapple'
    }],
    sellPrice: 100
  },

  potato_seed: {
    id: 'potato_seed',
    icon: 'potatoSeed',
    category: 'seed',
    name: 'potato seed',
    description: 'Used to grow potatos. Useful for eating.',
    sellPrice: 20,
    produces: 'potato'
  },

  potato: {
    id: 'potato',
    icon: 'potato',
    category: 'food',
    name: 'potato',
    description() {
      const buff = BUFFS.food_potato;
      return buff.description({ buff });
    },
    buffs: [{
      id: 'food_potato'
    }],
    sellPrice: 100
  },

  carrot_seed: {
    id: 'carrot_seed',
    icon: 'carrotSeed',
    category: 'seed',
    name: 'carrot seed',
    description: 'Used to grow carrots. Useful for eating.',
    sellPrice: 20,
    produces: 'carrot'
  },

  carrot: {
    id: 'carrot',
    icon: 'carrot',
    category: 'food',
    name: 'carrot',
    description() {
      const buff = BUFFS.food_carrot;
      return buff.description({ buff });
    },
    buffs: [{
      id: 'food_carrot'
    }],
    sellPrice: 100
  },

  dragonfruit_seed: {
    id: 'dragonfruit_seed',
    icon: 'dragonfruitSeed',
    category: 'seed',
    name: 'dragonfruit seed',
    description: 'Used to grow dragonfruits. Useful for eating.',
    sellPrice: 20,
    produces: 'dragonfruit'
  },

  dragonfruit: {
    id: 'dragonfruit',
    icon: 'dragonfruit',
    category: 'food',
    name: 'dragonfruit',
    description() {
      const buff = BUFFS.food_dragonfruit;
      return buff.description({ buff });
    },
    buffs: [{
      id: 'food_dragonfruit'
    }],
    sellPrice: 100
  },

  watermelon_seed: {
    id: 'watermelon_seed',
    icon: 'watermelonSeed',
    category: 'seed',
    name: 'watermelon seed',
    description: 'Used to grow watermelons. Useful for eating.',
    sellPrice: 30,
    produces: 'watermelon'
  },

  watermelon: {
    id: 'watermelon',
    icon: 'watermelon',
    category: 'food',
    name: 'watermelon',
    description() {
      const buff = BUFFS.food_watermelon;
      return buff.description({ buff });
    },
    buffs: [{
      id: 'food_watermelon'
    }],
    sellPrice: 150
  },

  basil_seed: {
    id: 'basil_seed',
    icon: 'basilSeed',
    category: 'seed',
    name: 'Basil Seed',
    description: 'Used to grow basil. Useful for inscription',
    sellPrice: 100,
    produces: 'basil'
  },

  basil: {
    id: 'basil',
    icon: 'basil',
    category: 'herb',
    name: 'basil',
    sellPrice: 100
  },

  pine_seed: {
    id: 'pine_seed',
    icon: 'pineSeed',
    category: 'seed',
    name: 'Pine Seed',
    description: 'Used to grow pine log. Long time to grow, gives good exp.',
    sellPrice: 10,
    produces: 'pine_log'
  },

  beech_seed: {
    id: 'beech_seed',
    icon: 'beechSeed',
    category: 'seed',
    name: 'beech Seed',
    description: 'Used to grow beech log. Long time to grow, gives good exp.',
    sellPrice: 10,
    produces: 'beech_log'
  },

  ash_seed: {
    id: 'ash_seed',
    icon: 'ashSeed',
    category: 'seed',
    name: 'ash Seed',
    description: 'Used to grow ash log. Long time to grow, gives good exp.',
    sellPrice: 10,
    produces: 'ash_log'
  },

  oak_seed: {
    id: 'oak_seed',
    icon: 'oakSeed',
    category: 'seed',
    name: 'oak Seed',
    description: 'Used to grow oak log. Long time to grow, gives good exp.',
    sellPrice: 10,
    produces: 'oak_log'
  },

  pink_rose_seed: {
    id: 'pink_rose_seed',
    icon: 'pinkRoseSeed',
    category: 'seed',
    name: 'pink rose seed',
    description: 'Used to grow a pinkish rose. Useful for inscription',
    sellPrice: 200,
    produces: 'pink_rose'
  },

  pink_rose: {
    id: 'pink_rose',
    icon: 'pinkRose',
    category: 'herb',
    name: 'pink rose',
    sellPrice: 200
  },

  endive_seed: {
    id: 'endive_seed',
    icon: 'endiveSeed',
    category: 'seed',
    name: 'endive seed',
    description: 'Used to grow a endive. Useful for inscription',
    sellPrice: 200,
    produces: 'endive'
  },

  endive: {
    id: 'endive',
    icon: 'endive',
    category: 'herb',
    name: 'endive',
    sellPrice: 200
  },

  juniper_seed: {
    id: 'juniper_seed',
    icon: 'juniperSeed',
    category: 'seed',
    name: 'juniper seed',
    description: 'Used to grow a juniper. Useful for inscription',
    sellPrice: 300,
    produces: 'juniper'
  },

  juniper: {
    id: 'juniper',
    icon: 'juniper',
    category: 'herb',
    name: 'juniper',
    sellPrice: 300
  },

  agrimony_seed: {
    id: 'agrimony_seed',
    icon: 'agrimonySeed',
    category: 'seed',
    name: 'agrimony seed',
    description: 'Used to grow a agrimony. Useful for inscription',
    sellPrice: 300,
    produces: 'agrimony'
  },

  agrimony: {
    id: 'agrimony',
    icon: 'agrimony',
    category: 'herb',
    name: 'agrimony',
    sellPrice: 1000
  },

  cardoon_seed: {
    id: 'cardoon_seed',
    icon: 'cardoonSeed',
    category: 'seed',
    name: 'cardoon seed',
    description: 'Used to grow a cardoon. Useful for inscription',
    sellPrice: 300,
    produces: 'cardoon'
  },

  cardoon: {
    id: 'cardoon',
    icon: 'cardoon',
    category: 'herb',
    name: 'cardoon',
    sellPrice: 1000
  },

  chilli_seed: {
    id: 'chilli_seed',
    icon: 'chilliSeed',
    category: 'seed',
    name: 'chilli seed',
    description: 'Used to grow a chilli. Useful for inscription',
    sellPrice: 300,
    produces: 'chilli'
  },

  chilli: {
    id: 'chilli',
    icon: 'chilli',
    category: 'herb',
    name: 'chilli',
    sellPrice: 1000
  },

  celery_seed: {
    id: 'celery_seed',
    icon: 'celerySeed',
    category: 'seed',
    name: 'celery seed',
    description: 'Used to grow a celery. Useful for inscription',
    sellPrice: 300,
    produces: 'celery'
  },

  celery: {
    id: 'celery',
    icon: 'celery',
    category: 'herb',
    name: 'celery',
    sellPrice: 1000
  },


  feverfew_seed: {
    id: 'feverfew_seed',
    icon: 'feverfewSeed',
    category: 'seed',
    name: 'feverfew seed',
    description: 'Used to grow a feverfew. Useful for inscription',
    sellPrice: 1000,
    produces: 'feverfew'
  },

  feverfew: {
    id: 'feverfew',
    icon: 'feverfew',
    category: 'herb',
    name: 'feverfew',
    sellPrice: 5000
  },

  dead_plant: {
    id: 'dead_plant',
    icon: 'deadPlant',
    category: 'farming',
    name: 'dead plant',
    sellPrice: 0
  },

  grape_fruit_seed: {
    id: 'grape_fruit_seed',
    icon: 'grapeFruitSeed',
    category: 'seed',
    name: 'grapefruit seed',
    description: 'Used to grow grape fruit. Yum!',
    sellPrice: 3,
    produces: 'grape_fruit'
  },

  grape_fruit: {
    id: 'grape_fruit',
    icon: 'grapeFruit',
    category: 'food',
    name: 'grapefruit',
    description() {
      const buff = BUFFS.food_grape_fruit;
      return buff.description({ buff });
    },
    buffs: [{
      id: 'food_grape_fruit'
    }],
    sellPrice: 20
  },

  tamarind_honey: {
    id: 'tamarind_honey',
    icon: 'tamarindHoney',
    category: 'food',
    name: 'tamarind honey',
    description() {
      const buff = BUFFS.food_tamarind_honey;
      return buff.description({ buff });
    },
    buffs: [{
      id: 'food_tamarind_honey'
    }],
    sellPrice: 20
  },

  rubia_flower_seed: {
    id: 'rubia_flower_seed',
    icon: 'rubiaFlowerSeed',
    category: 'seed',
    name: 'Rubia Flower Seed',
    description: 'Used to grow rubia flower. Useful for inscription.',
    sellPrice: 5,
    produces: 'rubia_flower'
  },

  rubia_flower: {
    id: 'rubia_flower',
    icon: 'rubiaFlower',
    category: 'herb',
    name: 'Rubia Flower',
    sellPrice: 10
  }
}
