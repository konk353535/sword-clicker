console.log('importing farming/items.js BUFFS');
import { FOOD_BUFFS as BUFFS } from '../buffs/food';

console.log('exporting farming/items.js FARMING_ITEMS');
export const FARMING_ITEMS = {
  lettice_seed: {
    id: 'lettice_seed',
    icon: 'letticeSeed.svg',
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
    icon: 'lettice.svg',
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
    icon: 'marigoldSeed.svg',
    category: 'seed',
    name: 'Marigold Seed',
    seedType: 'gold',
    description() {
      return 'Sells for $$$'
    },
    sellPrice: 1,
    produces: 'marigold'
  },

  marigold: {
    id: 'marigold',
    icon: 'marigold.svg',
    category: 'herb',
    name: 'Marigold',
    description() {
      return 'Sells for $$$'
    },
    sellPrice: 250
  },

  blue_rose_seed: {
    id: 'blue_rose_seed',
    icon: 'blueRoseSeed.svg',
    category: 'seed',
    name: 'blue rose Seed',
    seedType: 'herb',
    description() {
      return 'Sells for $$$'
    },
    sellPrice: 1,
    produces: 'blue_rose'
  },

  blue_rose: {
    id: 'blue_rose',
    icon: 'blueRose.svg',
    category: 'herb',
    name: 'blue rose',
    description() {
      return 'Sells for $$$'
    },
    sellPrice: 400
  },

  pink_hydrangea_seed: {
    id: 'pink_hydrangea_seed',
    icon: 'pinkHydrangeaSeed.svg',
    category: 'seed',
    name: 'pink hydrangea seed',
    seedType: 'gold',
    description() {
      return 'Sells for $$$'
    },
    sellPrice: 1,
    produces: 'pink_hydrangea'
  },

  pink_hydrangea: {
    id: 'pink_hydrangea',
    icon: 'pinkHydrangea.svg',
    category: 'gold',
    name: 'pink hydrangea',
    description() {
      return 'Sells for $$$'
    },
    sellPrice: 550
  },


  hydrangea_seed: {
    id: 'hydrangea_seed',
    icon: 'hydrangeaSeed.svg',
    category: 'seed',
    name: 'hydrangea Seed',
    seedType: 'gold',
    description() {
      return 'Sells for $$$'
    },
    sellPrice: 1,
    produces: 'hydrangea'
  },

  hydrangea: {
    id: 'hydrangea',
    icon: 'hydrangea.svg',
    category: 'herb',
    name: 'hydrangea',
    description() {
      return 'Sells for $$$'
    },
    sellPrice: 700
  },

  red_hydrangea_seed: {
    id: 'red_hydrangea_seed',
    icon: 'redHydrangeaSeed.svg',
    category: 'seed',
    name: 'red hydrangea Seed',
    seedType: 'gold',
    description() {
      return 'Sells for $$$'
    },
    sellPrice: 1,
    produces: 'red_hydrangea'
  },

  red_hydrangea: {
    id: 'red_hydrangea',
    icon: 'redHydrangea.svg',
    category: 'gold',
    name: 'red hydrangea',
    description() {
      return 'Sells for $$$'
    },
    sellPrice: 775
  },

  sunburst_hydrangea_seed: {
    id: 'sunburst_hydrangea_seed',
    icon: 'sunburstHydrangeaSeed.svg',
    category: 'seed',
    name: 'sunburst hydrangea Seed',
    seedType: 'gold',
    description() {
      return 'Sells for $$$'
    },
    sellPrice: 1,
    produces: 'sunburst_hydrangea'
  },

  sunburst_hydrangea: {
    id: 'sunburst_hydrangea',
    icon: 'sunburstHydrangea.svg',
    category: 'gold',
    name: 'sunburst hydrangea',
    description() {
      return 'Sells for $$$'
    },
    sellPrice: 825
  },

  sun_rose_seed: {
    id: 'sun_rose_seed',
    icon: 'sunRoseSeed.svg',
    category: 'seed',
    name: 'sun rose Seed',
    seedType: 'gold',
    description() {
      return 'Sells for $$$'
    },
    sellPrice: 1,
    produces: 'sun_rose'
  },

  sun_rose: {
    id: 'sun_rose',
    icon: 'sunRose.svg',
    category: 'gold',
    name: 'sun_rose',
    description() {
      return 'Sells for $$$'
    },
    sellPrice: 825
  },

  crimson_hydrangea_seed: {
    id: 'crimson_hydrangea_seed',
    icon: 'crimsonHydrangeaSeed.svg',
    category: 'seed',
    name: 'crimson hydrangea Seed',
    seedType: 'gold',
    description() {
      return 'Sells for $$$'
    },
    sellPrice: 1,
    produces: 'crimson_hydrangea'
  },

  crimson_hydrangea: {
    id: 'crimson_hydrangea',
    icon: 'crimsonHydrangea.svg',
    category: 'gold',
    name: 'crimson_hydrangea',
    description() {
      return 'Sells for $$$'
    },
    sellPrice: 900
  },

  crimson_rose_seed: {
    id: 'crimson_rose_seed',
    icon: 'crimsonRoseSeed.svg',
    category: 'seed',
    name: 'crimson rose Seed',
    seedType: 'gold',
    description() {
      return 'Sells for $$$'
    },
    sellPrice: 1,
    produces: 'crimson_rose'
  },

  crimson_rose: {
    id: 'crimson_rose',
    icon: 'crimsonRose.svg',
    category: 'gold',
    name: 'crimson_rose',
    description() {
      return 'Sells for $$$'
    },
    sellPrice: 900
  },

  poppy_seed: {
    id: 'poppy_seed',
    icon: 'poppySeed.svg',
    category: 'seed',
    name: 'poppy Seed',
    seedType: 'gold',
    description() {
      return 'Sells for $$$'
    },
    sellPrice: 1,
    produces: 'poppy'
  },

  poppy: {
    id: 'poppy',
    icon: 'poppy.svg',
    category: 'gold',
    name: 'poppy',
    description() {
      return 'Sells for $$$'
    },
    sellPrice: 3200
  },

  zinnia_seed: {
    id: 'zinnia_seed',
    icon: 'zinniaSeed.svg',
    category: 'seed',
    name: 'zinnia Seed',
    seedType: 'gold',
    description() {
      return 'Sells for $$$'
    },
    sellPrice: 1,
    produces: 'zinnia'
  },

  zinnia: {
    id: 'zinnia',
    icon: 'zinnia.svg',
    category: 'gold',
    name: 'zinnia',
    description() {
      return 'Sells for $$$'
    },
    sellPrice: 5600
  },

  tulip_seed: {
    id: 'tulip_seed',
    icon: 'tulipSeed.svg',
    category: 'seed',
    name: 'tulip Seed',
    seedType: 'gold',
    description() {
      return 'Sells for $$$'
    },
    sellPrice: 1,
    produces: 'tulip'
  },

  tulip: {
    id: 'tulip',
    icon: 'tulip.svg',
    category: 'gold',
    name: 'tulip',
    description() {
      return 'Sells for $$$'
    },
    sellPrice: 575
  },

  chrysanthemum_seed: {
    id: 'chrysanthemum_seed',
    icon: 'chrysanthemumSeed.svg',
    category: 'seed',
    name: 'Chrysanthemum Seed',
    seedType: 'gold',
    description() {
      return 'Sells for $$$'
    },
    sellPrice: 1,
    produces: 'chrysanthemum'
  },

  chrysanthemum: {
    id: 'chrysanthemum',
    icon: 'chrysanthemum.svg',
    category: 'gold',
    name: 'chrysanthemum',
    description() {
      return 'Sells for $$$'
    },
    sellPrice: 4000
  },

  cactus_seed: {
    id: 'cactus_seed',
    icon: 'cactusSeed.svg',
    category: 'seed',
    name: 'Cactus Seed',
    seedType: 'xp',
    description() {
      return 'Good exp';
    },
    sellPrice: 1,
    produces: 'cactus'
  },

  cactus: {
    id: 'cactus',
    icon: 'cactus.svg',
    category: 'xp',
    name: 'Cactus',
    description() {
      return 'Looks prickly';
    },
    sellPrice: 1
  },

  reed_seed: {
    id: 'reed_seed',
    icon: 'reedSeed.svg',
    category: 'seed',
    name: 'reed Seed',
    seedType: 'xp',
    description() {
      return 'Good exp';
    },
    sellPrice: 1,
    produces: 'reed'
  },

  reed: {
    id: 'reed',
    icon: 'reed.svg',
    category: 'xp',
    name: 'reed',
    description() {
      return 'Looks useful';
    },
    sellPrice: 1
  },

  papyrus_seed: {
    id: 'papyrus_seed',
    icon: 'papyrusSeed.svg',
    category: 'seed',
    name: 'papyrus Seed',
    seedType: 'xp',
    description() {
      return 'Good exp';
    },
    sellPrice: 1,
    produces: 'papyrus'
  },

  papyrus: {
    id: 'papyrus',
    icon: 'papyrus.svg',
    category: 'xp',
    name: 'papyrus',
    description() {
      return 'Looks useful';
    },
    sellPrice: 1
  },


  bamboo_seed: {
    id: 'bamboo_seed',
    icon: 'bambooSeed.svg',
    category: 'seed',
    name: 'bamboo Seed',
    seedType: 'xp',
    description() {
      return 'Good exp';
    },
    sellPrice: 1,
    produces: 'bamboo'
  },

  bamboo: {
    id: 'bamboo',
    icon: 'bamboo.svg',
    category: 'xp',
    name: 'bamboo',
    description() {
      return 'Looks useful';
    },
    sellPrice: 1
  },

  kenaf: {
    id: 'kenaf',
    icon: 'kenaf.svg',
    category: 'xp',
    name: 'kenaf',
    description() {
      return 'Looks useful';
    },
    sellPrice: 1
  },

  kenaf_seed: {
    id: 'kenaf_seed',
    icon: 'kenafSeed.svg',
    category: 'seed',
    name: 'kenaf Seed',
    seedType: 'xp',
    description() {
      return 'Good exp';
    },
    sellPrice: 1,
    produces: 'kenaf'
  },

  palm: {
    id: 'palm',
    icon: 'palm.svg',
    category: 'xp',
    name: 'palm',
    description() {
      return 'Looks useful';
    },
    sellPrice: 1
  },

  palm_seed: {
    id: 'palm_seed',
    icon: 'palmSeed.svg',
    category: 'seed',
    name: 'palm Seed',
    seedType: 'xp',
    description() {
      return 'Good exp';
    },
    sellPrice: 1,
    produces: 'palm'
  },



  pear_seed: {
    id: 'pear_seed',
    icon: 'pearSeed.svg',
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
    icon: 'pear.svg',
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
    icon: 'acaiBerrySeed.svg',
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
    icon: 'acaiBerry.svg',
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
    icon: 'garlicSeed.svg',
    category: 'seed',
    seedType: 'herb',
    name: 'garlic Seed',
    description: 'Used to grow garlic. Useful for inscription.',
    sellPrice: 500,
    produces: 'garlic'
  },

  lemon_seed: {
    id: 'lemon_seed',
    icon: 'lemonSeed.svg',
    category: 'seed',
    name: 'Lemon Seed',
    seedType: 'food',
    description: 'Used to grow lemon. Useful for regenerating energy.',
    sellPrice: 50,
    produces: 'lemon'
  },

  lemon: {
    id: 'lemon',
    icon: 'lemon.svg',
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
    icon: 'redAppleSeed.svg',
    category: 'seed',
    seedType: 'food',
    name: 'red apple seed',
    description: 'Used to grow red apples. Useful for eating.',
    sellPrice: 10,
    produces: 'red_apple'
  },

  red_apple: {
    id: 'red_apple',
    icon: 'redApple.svg',
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
    icon: 'pineappleSeed.svg',
    category: 'seed',
    name: 'pineapple seed',
    description: 'Used to grow pine apples. Useful for eating.',
    sellPrice: 20,
    seedType: 'food',
    produces: 'pineapple'
  },

  pineapple: {
    id: 'pineapple',
    icon: 'pineapple.svg',
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
    icon: 'potatoSeed.svg',
    category: 'seed',
    name: 'potato seed',
    description: 'Used to grow potatos. Useful for eating.',
    sellPrice: 20,
    seedType: 'food',
    produces: 'potato'
  },

  potato: {
    id: 'potato',
    icon: 'potato.svg',
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
    icon: 'bananaSeed.svg',
    category: 'seed',
    name: 'banana seed',
    description: 'Used to grow bananas. Useful for eating.',
    sellPrice: 20,
    seedType: 'food',
    produces: 'banana'
  },

  banana: {
    id: 'banana',
    icon: 'banana.svg',
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
    icon: 'sweetPotatoSeed.svg',
    category: 'seed',
    name: 'sweet potato seed',
    description: 'Used to grow sweet potatos. Useful for eating.',
    sellPrice: 20,
    seedType: 'food',
    produces: 'sweet_potato'
  },

  sweet_potato: {
    id: 'sweet_potato',
    icon: 'sweetPotato.svg',
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
    icon: 'carrotSeed.svg',
    category: 'seed',
    name: 'carrot seed',
    description: 'Used to grow carrots. Useful for eating.',
    sellPrice: 20,
    seedType: 'food',
    produces: 'carrot'
  },

  carrot: {
    id: 'carrot',
    icon: 'carrot.svg',
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
    icon: 'dragonfruitSeed.svg',
    category: 'seed',
    name: 'dragonfruit seed',
    description: 'Used to grow dragonfruits. Useful for eating.',
    sellPrice: 20,
    seedType: 'food',
    produces: 'dragonfruit'
  },

  dragonfruit: {
    id: 'dragonfruit',
    icon: 'dragonfruit.svg',
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
    icon: 'watermelonSeed.svg',
    category: 'seed',
    name: 'watermelon seed',
    description: 'Used to grow watermelons. Useful for eating.',
    sellPrice: 30,
    seedType: 'food',
    produces: 'watermelon'
  },

  watermelon: {
    id: 'watermelon',
    icon: 'watermelon.svg',
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
    icon: 'orangeSeed.svg',
    category: 'seed',
    name: 'orange seed',
    description: 'Used to grow oranges. Useful for eating.',
    sellPrice: 30,
    seedType: 'food',
    produces: 'orange'
  },

  orange: { // Instant 500 HP heal
    id: 'orange',
    icon: 'orange.svg',
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
    icon: 'rockmelonSeed.svg',
    category: 'seed',
    name: 'rockmelon seed',
    description: 'Used to grow rockmelons. Useful for eating.',
    sellPrice: 30,
    seedType: 'food',
    produces: 'rockmelon'
  },

  rockmelon: { // Upgrade dragonfruit
    id: 'rockmelon',
    icon: 'rockmelon.svg',
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
    icon: 'basilSeed.svg',
    category: 'seed',
    name: 'Basil Seed',
    description: 'Used to grow basil. Useful for inscription',
    sellPrice: 100,
    seedType: 'herb',
    produces: 'basil'
  },

  basil: {
    id: 'basil',
    icon: 'basil.svg',
    category: 'herb',
    name: 'basil',
    sellPrice: 100
  },

  pine_seed: {
    id: 'pine_seed',
    icon: 'pineSeed.svg',
    category: 'seed',
    name: 'Pine Seed',
    description: 'Used to grow pine log. Long time to grow, gives good exp.',
    sellPrice: 10,
    seedType: 'tree',
    produces: 'pine_log'
  },

  beech_seed: {
    id: 'beech_seed',
    icon: 'beechSeed.svg',
    category: 'seed',
    name: 'beech Seed',
    description: 'Used to grow beech log. Long time to grow, gives good exp.',
    sellPrice: 10,
    seedType: 'tree',
    produces: 'beech_log'
  },

  ash_seed: {
    id: 'ash_seed',
    icon: 'ashSeed.svg',
    category: 'seed',
    name: 'ash Seed',
    description: 'Used to grow ash log. Long time to grow, gives good exp.',
    sellPrice: 10,
    seedType: 'tree',
    produces: 'ash_log'
  },

  oak_seed: {
    id: 'oak_seed',
    icon: 'oakSeed.svg',
    category: 'seed',
    name: 'oak Seed',
    seedType: 'tree',
    description: 'Used to grow oak log. Long time to grow, gives good exp.',
    sellPrice: 10,
    produces: 'oak_log'
  },

  maple_seed: {
    id: 'maple_seed',
    icon: 'mapleSeed.svg',
    category: 'seed',
    name: 'maple Seed',
    seedType: 'tree',
    description: 'Used to grow maple log. Long time to grow, gives good exp.',
    sellPrice: 10,
    produces: 'maple_log'
  },

  walnut_seed: {
    id: 'walnut_seed',
    icon: 'walnutSeed.svg',
    category: 'seed',
    name: 'walnut Seed',
    seedType: 'tree',
    description: 'Used to grow walnut log. Long time to grow, gives good exp.',
    sellPrice: 10,
    produces: 'walnut_log'
  },

  cherry_seed: {
    id: 'cherry_seed',
    icon: 'cherrySeed.svg',
    category: 'seed',
    name: 'cherry Seed',
    seedType: 'tree',
    description: 'Used to grow cherry log. Long time to grow, gives good exp.',
    sellPrice: 10,
    produces: 'cherry_log'
  },

  mahogany_seed: {
    id: 'mahogany_seed',
    icon: 'mahoganySeed.svg',
    category: 'seed',
    name: 'mahogany Seed',
    seedType: 'tree',
    description: 'Used to grow mahogany log. Long time to grow, gives good exp.',
    sellPrice: 10,
    produces: 'mahogany_log'
  },

  elk_seed: {
    id: 'elk_seed',
    icon: 'elkSeed.svg',
    category: 'seed',
    name: 'elk Seed',
    seedType: 'tree',
    description: 'Used to grow elk log. Long time to grow, gives good exp.',
    sellPrice: 10,
    produces: 'elk_log'
  },

  black_seed: {
    id: 'black_seed',
    icon: 'blackSeed.svg',
    category: 'seed',
    name: 'black Seed',
    seedType: 'tree',
    description: 'Used to grow black log. Long time to grow, gives good exp.',
    sellPrice: 10,
    produces: 'black_log'
  },

  blue_gum_seed: {
    id: 'blue_gum_seed',
    icon: 'blueGumSeed.svg',
    category: 'seed',
    name: 'blue gum Seed',
    seedType: 'tree',
    description: 'Used to grow blue gum log. Long time to grow, gives good exp.',
    sellPrice: 10,
    produces: 'blue_gum_log'
  },

  cedar_seed: {
    id: 'cedar_seed',
    icon: 'cedarSeed.svg',
    category: 'seed',
    name: 'cedar Seed',
    seedType: 'tree',
    description: 'Used to grow cedar log. Long time to grow, gives good exp.',
    sellPrice: 10,
    produces: 'cedar_log'
  },

  denya_seed: {
    id: 'denya_seed',
    icon: 'denyaSeed.svg',
    category: 'seed',
    name: 'denya Seed',
    seedType: 'tree',
    description: 'Used to grow denya log. Long time to grow, gives good exp.',
    sellPrice: 10,
    produces: 'denya_log'
  },

  gombe_seed: {
    id: 'gombe_seed',
    icon: 'gombeSeed.svg',
    category: 'seed',
    name: 'gombe Seed',
    seedType: 'tree',
    description: 'Used to grow gombe log. Long time to grow, gives good exp.',
    sellPrice: 10,
    produces: 'gombe_log'
  },

  hickory_seed: {
    id: 'hickory_seed',
    icon: 'hickorySeed.svg',
    category: 'seed',
    name: 'hickory Seed',
    seedType: 'tree',
    description: 'Used to grow hickory log. Long time to grow, gives good exp.',
    sellPrice: 10,
    produces: 'hickory_log'
  },

  larch_seed: {
    id: 'larch_seed',
    icon: 'larchSeed.svg',
    category: 'seed',
    name: 'larch Seed',
    seedType: 'tree',
    description: 'Used to grow larch log. Long time to grow, gives good exp.',
    sellPrice: 10,
    produces: 'larch_log'
  },

  poplar_seed: {
    id: 'poplar_seed',
    icon: 'poplarSeed.svg',
    category: 'seed',
    name: 'poplar Seed',
    seedType: 'tree',
    description: 'Used to grow poplar log. Long time to grow, gives good exp.',
    sellPrice: 10,
    produces: 'poplar_log'
  },

  tali_seed: {
    id: 'tali_seed',
    icon: 'taliSeed.svg',
    category: 'seed',
    name: 'tali Seed',
    seedType: 'tree',
    description: 'Used to grow tali log. Long time to grow, gives good exp.',
    sellPrice: 10,
    produces: 'tali_log'
  },

  teak_seed: {
    id: 'teak_seed',
    icon: 'teakSeed.svg',
    category: 'seed',
    name: 'teak Seed',
    seedType: 'tree',
    description: 'Used to grow teak log. Long time to grow, gives good exp.',
    sellPrice: 10,
    produces: 'teak_log'
  },

  willow_seed: {
    id: 'willow_seed',
    icon: 'willowSeed.svg',
    category: 'seed',
    name: 'willow Seed',
    seedType: 'tree',
    description: 'Used to grow willow log. Long time to grow, gives good exp.',
    sellPrice: 10,
    produces: 'willow_log'
  },


  pink_rose_seed: {
    id: 'pink_rose_seed',
    icon: 'pinkRoseSeed.svg',
    category: 'seed',
    seedType: 'herb',
    name: 'pink rose seed',
    description: 'Used to grow a pinkish rose. Useful for inscription',
    sellPrice: 200,
    produces: 'pink_rose'
  },

  pink_rose: {
    id: 'pink_rose',
    icon: 'pinkRose.svg',
    category: 'herb',
    name: 'pink rose',
    sellPrice: 200
  },

  endive_seed: {
    id: 'endive_seed',
    icon: 'endiveSeed.svg',
    seedType: 'herb',
    category: 'seed',
    name: 'endive seed',
    description: 'Used to grow a endive. Useful for inscription',
    sellPrice: 200,
    produces: 'endive'
  },

  endive: {
    id: 'endive',
    icon: 'endive.svg',
    category: 'herb',
    name: 'endive',
    sellPrice: 200
  },

  juniper_seed: {
    id: 'juniper_seed',
    icon: 'juniperSeed.svg',
    category: 'seed',
    seedType: 'herb',
    name: 'juniper seed',
    description: 'Used to grow a juniper. Useful for inscription',
    sellPrice: 300,
    produces: 'juniper'
  },

  juniper: {
    id: 'juniper',
    icon: 'juniper.svg',
    category: 'herb',
    name: 'juniper',
    sellPrice: 300
  },

  agrimony_seed: {
    id: 'agrimony_seed',
    icon: 'agrimonySeed.svg',
    category: 'seed',
    seedType: 'herb',
    name: 'agrimony seed',
    description: 'Used to grow a agrimony. Useful for inscription',
    sellPrice: 300,
    produces: 'agrimony'
  },

  agrimony: {
    id: 'agrimony',
    icon: 'agrimony.svg',
    category: 'herb',
    name: 'agrimony',
    sellPrice: 1000
  },

  cardoon_seed: {
    id: 'cardoon_seed',
    icon: 'cardoonSeed.svg',
    category: 'seed',
    name: 'cardoon seed',
    seedType: 'herb',
    description: 'Used to grow a cardoon. Useful for inscription',
    sellPrice: 300,
    produces: 'cardoon'
  },

  cardoon: {
    id: 'cardoon',
    icon: 'cardoon.svg',
    category: 'herb',
    name: 'cardoon',
    sellPrice: 1000
  },

  chilli_seed: {
    id: 'chilli_seed',
    icon: 'chilliSeed.svg',
    category: 'seed',
    name: 'chilli seed',
    description: 'Used to grow a chilli. Useful for inscription',
    sellPrice: 300,
    seedType: 'herb',
    produces: 'chilli'
  },

  chilli: {
    id: 'chilli',
    icon: 'chilli.svg',
    category: 'herb',
    name: 'chilli',
    sellPrice: 1000
  },

  celery_seed: {
    id: 'celery_seed',
    icon: 'celerySeed.svg',
    category: 'seed',
    name: 'celery seed',
    description: 'Used to grow a celery. Useful for inscription',
    sellPrice: 300,
    seedType: 'herb',
    produces: 'celery'
  },

  celery: {
    id: 'celery',
    icon: 'celery.svg',
    category: 'herb',
    name: 'celery',
    sellPrice: 1000
  },


  feverfew_seed: {
    id: 'feverfew_seed',
    icon: 'feverfewSeed.svg',
    category: 'seed',
    name: 'feverfew seed',
    description: 'Used to grow a feverfew. Useful for inscription',
    sellPrice: 1000,
    seedType: 'herb',
    produces: 'feverfew'
  },

  feverfew: {
    id: 'feverfew',
    icon: 'feverfew.svg',
    category: 'herb',
    name: 'feverfew',
    sellPrice: 5000
  },

  dead_plant: {
    id: 'dead_plant',
    icon: 'deadPlant.svg',
    category: 'farming',
    name: 'dead plant',
    sellPrice: 0
  },

  grape_fruit_seed: {
    id: 'grape_fruit_seed',
    icon: 'grapeFruitSeed.svg',
    category: 'seed',
    name: 'grapefruit seed',
    description: 'Used to grow grape fruit. Yum!',
    sellPrice: 3,
    seedType: 'food',
    produces: 'grape_fruit'
  },

  grape_fruit: {
    id: 'grape_fruit',
    icon: 'grapeFruit.svg',
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
    icon: 'lemonHoney.svg',
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
    icon: 'tamarindHoney.svg',
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

  lemonade: {
    id: 'lemonade',
    icon: 'lemonade.svg',
    category: 'food',
    name: 'lemonade',
    description() {
      const buff = BUFFS.food_lemonade;
      return buff.description({ buff });
    },
    buffs: [{
      id: 'food_lemonade'
    }],
    sellPrice: 100
  },

  rubia_flower_seed: {
    id: 'rubia_flower_seed',
    icon: 'rubiaFlowerSeed.svg',
    category: 'seed',
    name: 'Rubia Flower Seed',
    description: 'Used to grow rubia flower. Useful for inscription.',
    sellPrice: 5,
    seedType: 'herb',
    produces: 'rubia_flower'
  },

  rubia_flower: {
    id: 'rubia_flower',
    icon: 'rubiaFlower.svg',
    category: 'herb',
    name: 'Rubia Flower',
    sellPrice: 10
  }
}
