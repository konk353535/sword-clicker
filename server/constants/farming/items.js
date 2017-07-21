import { BUFFS } from '/server/constants/combat';

export const FARMING_ITEMS = {
  lettice_seed: {
    id: 'lettice_seed',
    icon: 'letticeSeed',
    category: 'seed',
    name: 'Lettuce Seed',
    seedType: 'food',
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

  marigold_seed: {
    id: 'marigold_seed',
    icon: 'marigoldSeed',
    category: 'seed',
    name: 'Marigold Seed',
    seedType: 'misc',
    description() {
      return 'Sells for $$$'
    },
    sellPrice: 1,
    produces: 'marigold'
  },

  marigold: {
    id: 'marigold',
    icon: 'marigold',
    category: 'herb',
    name: 'Marigold',
    description() {
      return 'Sells for $$$'
    },
    sellPrice: 250
  },

  chrysanthemum_seed: {
    id: 'chrysanthemum_seed',
    icon: 'chrysanthemumSeed',
    category: 'seed',
    name: 'Chrysanthemum Seed',
    seedType: 'misc',
    description() {
      return 'Sells for $$$'
    },
    sellPrice: 400,
    produces: 'chrysanthemum'
  },

  chrysanthemum: {
    id: 'chrysanthemum',
    icon: 'chrysanthemum',
    category: 'herb',
    name: 'chrysanthemum',
    description() {
      return 'Sells for $$$'
    },
    sellPrice: 4000
  },

  cactus_seed: {
    id: 'cactus_seed',
    icon: 'cactusSeed',
    category: 'seed',
    name: 'Cactus Seed',
    seedType: 'misc',
    description() {
      return 'Good exp';
    },
    sellPrice: 1,
    produces: 'cactus'
  },

  cactus: {
    id: 'cactus',
    icon: 'cactus',
    category: 'herb',
    name: 'Cactus',
    description() {
      return 'Looks prickly';
    },
    sellPrice: 1
  },

  pear_seed: {
    id: 'pear_seed',
    icon: 'pearSeed',
    category: 'seed',
    name: 'Pear Seed',
    seedType: 'food',
    description() {
      const buff = BUFFS.food_pear;
      return buff.description({ buff });
    },
    sellPrice: 1,
    produces: 'pear'
  },

  pear: {
    id: 'pear',
    icon: 'pear',
    category: 'food',
    name: 'Pear',
    description() {
      const buff = BUFFS.food_pear;
      return buff.description({ buff });
    },
    buffs: [{
      id: 'food_pear'
    }],
    sellPrice: 70
  },

  acai_berry_seed: {
    id: 'acai_berry_seed',
    icon: 'acaiBerrySeed',
    category: 'seed',
    name: 'acai berry Seed',
    seedType: 'food',
    description() {
      const buff = BUFFS.food_acai_berry;
      return buff.description({ buff });
    },
    sellPrice: 10,
    produces: 'acai_berry'
  },

  acai_berry: {
    id: 'acai_berry',
    icon: 'acaiBerry',
    category: 'food',
    name: 'acai berry',
    description() {
      const buff = BUFFS.food_acai_berry;
      return buff.description({ buff });
    },
    buffs: [{
      id: 'food_acai_berry'
    }],
    sellPrice: 100
  },

  garlic_seed: {
    id: 'garlic_seed',
    icon: 'garlicSeed',
    category: 'seed',
    seedType: 'herb',
    name: 'garlic Seed',
    description: 'Used to grow garlic. Useful for inscription.',
    sellPrice: 500,
    produces: 'garlic'
  },

  lemon_seed: {
    id: 'lemon_seed',
    icon: 'lemonSeed',
    category: 'seed',
    name: 'Lemon Seed',
    seedType: 'food',
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
    seedType: 'food',
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
    seedType: 'food',
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
    seedType: 'food',
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

  banana_seed: {
    id: 'banana_seed',
    icon: 'bananaSeed',
    category: 'seed',
    name: 'banana seed',
    description: 'Used to grow bananas. Useful for eating.',
    sellPrice: 20,
    seedType: 'food',
    produces: 'banana'
  },

  banana: {
    id: 'banana',
    icon: 'banana',
    category: 'food',
    name: 'banana',
    description() {
      const buff = BUFFS.food_banana;
      return buff.description({ buff });
    },
    buffs: [{
      id: 'food_banana'
    }],
    sellPrice: 100
  },

  sweet_potato_seed: {
    id: 'sweet_potato_seed',
    icon: 'sweetPotatoSeed',
    category: 'seed',
    name: 'sweet potato seed',
    description: 'Used to grow sweet potatos. Useful for eating.',
    sellPrice: 20,
    seedType: 'food',
    produces: 'sweet_potato'
  },

  sweet_potato: {
    id: 'sweet_potato',
    icon: 'sweetPotato',
    category: 'food',
    name: 'sweet potato',
    description() {
      const buff = BUFFS.food_sweet_potato;
      return buff.description({ buff });
    },
    buffs: [{
      id: 'food_sweet_potato'
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
    seedType: 'food',
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
    seedType: 'food',
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
    seedType: 'food',
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


  orange_seed: {
    id: 'orange_seed',
    icon: 'orangeSeed',
    category: 'seed',
    name: 'orange seed',
    description: 'Used to grow oranges. Useful for eating.',
    sellPrice: 30,
    seedType: 'food',
    produces: 'orange'
  },

  orange: { // Instant 500 HP heal
    id: 'orange',
    icon: 'orange',
    category: 'food',
    name: 'orange',
    description() {
      const buff = BUFFS.food_orange;
      return buff.description({ buff });
    },
    buffs: [{
      id: 'food_orange'
    }],
    sellPrice: 200
  },

  rockmelon_seed: {
    id: 'rockmelon_seed',
    icon: 'rockmelonSeed',
    category: 'seed',
    name: 'rockmelon seed',
    description: 'Used to grow rockmelons. Useful for eating.',
    sellPrice: 30,
    seedType: 'food',
    produces: 'rockmelon'
  },

  rockmelon: { // Upgrade dragonfruit
    id: 'rockmelon',
    icon: 'rockmelon',
    category: 'food',
    name: 'rockmelon',
    description() {
      const buff = BUFFS.food_rockmelon;
      return buff.description({ buff });
    },
    buffs: [{
      id: 'food_rockmelon'
    }],
    sellPrice: 200
  },

  basil_seed: {
    id: 'basil_seed',
    icon: 'basilSeed',
    category: 'seed',
    name: 'Basil Seed',
    description: 'Used to grow basil. Useful for inscription',
    sellPrice: 100,
    seedType: 'herb',
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
    seedType: 'tree',
    produces: 'pine_log'
  },

  beech_seed: {
    id: 'beech_seed',
    icon: 'beechSeed',
    category: 'seed',
    name: 'beech Seed',
    description: 'Used to grow beech log. Long time to grow, gives good exp.',
    sellPrice: 10,
    seedType: 'tree',
    produces: 'beech_log'
  },

  ash_seed: {
    id: 'ash_seed',
    icon: 'ashSeed',
    category: 'seed',
    name: 'ash Seed',
    description: 'Used to grow ash log. Long time to grow, gives good exp.',
    sellPrice: 10,
    seedType: 'tree',
    produces: 'ash_log'
  },

  oak_seed: {
    id: 'oak_seed',
    icon: 'oakSeed',
    category: 'seed',
    name: 'oak Seed',
    seedType: 'tree',
    description: 'Used to grow oak log. Long time to grow, gives good exp.',
    sellPrice: 10,
    produces: 'oak_log'
  },

  maple_seed: {
    id: 'maple_seed',
    icon: 'mapleSeed',
    category: 'seed',
    name: 'maple Seed',
    seedType: 'tree',
    description: 'Used to grow maple log. Long time to grow, gives good exp.',
    sellPrice: 10,
    produces: 'maple_log'
  },

  walnut_seed: {
    id: 'walnut_seed',
    icon: 'walnutSeed',
    category: 'seed',
    name: 'walnut Seed',
    seedType: 'tree',
    description: 'Used to grow walnut log. Long time to grow, gives good exp.',
    sellPrice: 10,
    produces: 'walnut_log'
  },

  cherry_seed: {
    id: 'cherry_seed',
    icon: 'cherrySeed',
    category: 'seed',
    name: 'cherry Seed',
    seedType: 'tree',
    description: 'Used to grow cherry log. Long time to grow, gives good exp.',
    sellPrice: 10,
    produces: 'cherry_log'
  },

  mahogany_seed: {
    id: 'mahogany_seed',
    icon: 'mahoganySeed',
    category: 'seed',
    name: 'mahogany Seed',
    seedType: 'tree',
    description: 'Used to grow mahogany log. Long time to grow, gives good exp.',
    sellPrice: 10,
    produces: 'mahogany_log'
  },

  elk_seed: {
    id: 'elk_seed',
    icon: 'elkSeed',
    category: 'seed',
    name: 'elk Seed',
    seedType: 'tree',
    description: 'Used to grow elk log. Long time to grow, gives good exp.',
    sellPrice: 10,
    produces: 'elk_log'
  },

  black_seed: {
    id: 'black_seed',
    icon: 'blackSeed',
    category: 'seed',
    name: 'black Seed',
    seedType: 'tree',
    description: 'Used to grow black log. Long time to grow, gives good exp.',
    sellPrice: 10,
    produces: 'black_log'
  },

  blue_gum_seed: {
    id: 'blue_gum_seed',
    icon: 'blueGumSeed',
    category: 'seed',
    name: 'blue gum Seed',
    seedType: 'tree',
    description: 'Used to grow blue gum log. Long time to grow, gives good exp.',
    sellPrice: 10,
    produces: 'blue_gum_log'
  },

  pink_rose_seed: {
    id: 'pink_rose_seed',
    icon: 'pinkRoseSeed',
    category: 'seed',
    seedType: 'herb',
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
    seedType: 'herb',
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
    seedType: 'herb',
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
    seedType: 'herb',
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
    seedType: 'herb',
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
    seedType: 'herb',
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
    seedType: 'herb',
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
    seedType: 'herb',
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
    seedType: 'fruit',
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

  lemon_honey: {
    id: 'lemon_honey',
    icon: 'lemonHoney',
    category: 'food',
    name: 'lemon honey',
    description() {
      const buff = BUFFS.food_lemon_honey;
      return buff.description({ buff });
    },
    buffs: [{
      id: 'food_lemon_honey'
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
    seedType: 'herb',
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
