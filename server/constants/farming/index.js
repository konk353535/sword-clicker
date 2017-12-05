import { ITEMS } from '/server/constants/items/index.js'; 
import { PLANTS } from './plants';

export const FARMING = {
  plants: PLANTS,

  shopItems: {
    lettice_seed: {
      id: 'lettice_seed',
      itemId: 'lettice_seed',
      requiredFarmingLevel: 1,
      required: [{
        type: 'gold',
        amount: 3,
        consumes: true
      }, {
        type: 'skill',
        name: 'farming',
        level: 1
      }]
    },

    marigold_seed: {
      id: 'marigold_seed',
      itemId: 'marigold_seed',
      requiredFarmingLevel: 9,
      required: [{
        type: 'gold',
        amount: 50,
        consumes: true
      }, {
        type: 'skill',
        name: 'farming',
        level: 9
      }]
    },

    blue_rose_seed: {
      id: 'blue_rose_seed',
      itemId: 'blue_rose_seed',
      requiredFarmingLevel: 19,
      required: [{
        type: 'gold',
        amount: 50,
        consumes: true
      }, {
        type: 'skill',
        name: 'farming',
        level: 19
      }]
    },

    hydrangea_seed: {
      id: 'hydrangea_seed',
      itemId: 'hydrangea_seed',
      requiredFarmingLevel: 39,
      required: [{
        type: 'gold',
        amount: 50,
        consumes: true
      }, {
        type: 'skill',
        name: 'farming',
        level: 39
      }]
    },

    cactus_seed: {
      id: 'cactus_seed',
      itemId: 'cactus_seed',
      requiredFarmingLevel: 6,
      required: [{
        type: 'gold',
        amount: 25,
        consumes: true
      }, {
        type: 'skill',
        name: 'farming',
        level: 6
      }]
    },

    bamboo_seed: {
      id: 'bamboo_seed',
      itemId: 'bamboo_seed',
      requiredFarmingLevel: 36,
      required: [{
        type: 'gold',
        amount: 25,
        consumes: true
      }, {
        type: 'skill',
        name: 'farming',
        level: 36
      }]
    },

    pear_seed: {
      id: 'pear_seed',
      itemId: 'pear_seed',
      requiredFarmingLevel: 8,
      required: [{
        type: 'gold',
        amount: 30,
        consumes: true
      }, {
        type: 'skill',
        name: 'farming',
        level: 8
      }]
    },

    pine_seed: {
      id: 'pine_seed',
      itemId: 'pine_seed',
      requiredFarmingLevel: 1,
      required: [{
        type: 'gold',
        amount: 25,
        consumes: true
      }, {
        type: 'skill',
        name: 'farming',
        level: 1
      }]
    },

    beech_seed: {
      id: 'beech_seed',
      itemId: 'beech_seed',
      requiredFarmingLevel: 5,
      required: [{
        type: 'gold',
        amount: 100,
        consumes: true
      }, {
        type: 'skill',
        name: 'farming',
        level: 5
      }]
    },

    ash_seed: {
      id: 'ash_seed',
      itemId: 'ash_seed',
      requiredFarmingLevel: 10,
      required: [{
        type: 'gold',
        amount: 200,
        consumes: true
      }, {
        type: 'skill',
        name: 'farming',
        level: 10
      }]
    },

    oak_seed: {
      id: 'oak_seed',
      itemId: 'oak_seed',
      requiredFarmingLevel: 15,
      required: [{
        type: 'gold',
        amount: 400,
        consumes: true
      }, {
        type: 'skill',
        name: 'farming',
        level: 15
      }]
    },

    maple_seed: {
      id: 'maple_seed',
      itemId: 'maple_seed',
      requiredFarmingLevel: 20,
      required: [{
        type: 'gold',
        amount: 500,
        consumes: true
      }, {
        type: 'skill',
        name: 'farming',
        level: 20
      }]
    },

    walnut_seed: {
      id: 'walnut_seed',
      itemId: 'walnut_seed',
      requiredFarmingLevel: 25,
      required: [{
        type: 'gold',
        amount: 600,
        consumes: true
      }, {
        type: 'skill',
        name: 'farming',
        level: 25
      }]
    },

    cherry_seed: {
      id: 'cherry_seed',
      itemId: 'cherry_seed',
      requiredFarmingLevel: 30,
      required: [{
        type: 'gold',
        amount: 700,
        consumes: true
      }, {
        type: 'skill',
        name: 'farming',
        level: 30
      }]
    },

    mahogany_seed: {
      id: 'mahogany_seed',
      itemId: 'mahogany_seed',
      requiredFarmingLevel: 35,
      required: [{
        type: 'gold',
        amount: 800,
        consumes: true
      }, {
        type: 'skill',
        name: 'farming',
        level: 35
      }]
    },

    elk_seed: {
      id: 'elk_seed',
      itemId: 'elk_seed',
      requiredFarmingLevel: 40,
      required: [{
        type: 'gold',
        amount: 900,
        consumes: true
      }, {
        type: 'skill',
        name: 'farming',
        level: 40
      }]
    },

    black_seed: {
      id: 'black_seed',
      itemId: 'black_seed',
      requiredFarmingLevel: 45,
      required: [{
        type: 'gold',
        amount: 1000,
        consumes: true
      }, {
        type: 'skill',
        name: 'farming',
        level: 45
      }]
    },

    blue_gum_seed: {
      id: 'blue_gum_seed',
      itemId: 'blue_gum_seed',
      requiredFarmingLevel: 50,
      required: [{
        type: 'gold',
        amount: 1100,
        consumes: true
      }, {
        type: 'skill',
        name: 'farming',
        level: 50
      }]
    },

    cedar_seed: {
      id: 'cedar_seed',
      itemId: 'cedar_seed',
      requiredFarmingLevel: 55,
      required: [{
        type: 'gold',
        amount: 1200,
        consumes: true
      }, {
        type: 'skill',
        name: 'farming',
        level: 55
      }]
    },

    denya_seed: {
      id: 'denya_seed',
      itemId: 'denya_seed',
      requiredFarmingLevel: 60,
      required: [{
        type: 'gold',
        amount: 1300,
        consumes: true
      }, {
        type: 'skill',
        name: 'farming',
        level: 60
      }]
    },

    gombe_seed: {
      id: 'gombe_seed',
      itemId: 'gombe_seed',
      requiredFarmingLevel: 65,
      required: [{
        type: 'gold',
        amount: 1400,
        consumes: true
      }, {
        type: 'skill',
        name: 'farming',
        level: 65
      }]
    },

    hickory_seed: {
      id: 'hickory_seed',
      itemId: 'hickory_seed',
      requiredFarmingLevel: 70,
      required: [{
        type: 'gold',
        amount: 1500,
        consumes: true
      }, {
        type: 'skill',
        name: 'farming',
        level: 70
      }]
    },

    larch_seed: {
      id: 'larch_seed',
      itemId: 'larch_seed',
      requiredFarmingLevel: 75,
      required: [{
        type: 'gold',
        amount: 1600,
        consumes: true
      }, {
        type: 'skill',
        name: 'farming',
        level: 75
      }]
    },

    poplar_seed: {
      id: 'poplar_seed',
      itemId: 'poplar_seed',
      requiredFarmingLevel: 80,
      required: [{
        type: 'gold',
        amount: 1700,
        consumes: true
      }, {
        type: 'skill',
        name: 'farming',
        level: 80
      }]
    },

    tali_seed: {
      id: 'tali_seed',
      itemId: 'tali_seed',
      requiredFarmingLevel: 85,
      required: [{
        type: 'gold',
        amount: 1800,
        consumes: true
      }, {
        type: 'skill',
        name: 'farming',
        level: 85
      }]
    },

    teak_seed: {
      id: 'teak_seed',
      itemId: 'teak_seed',
      requiredFarmingLevel: 90,
      required: [{
        type: 'gold',
        amount: 1900,
        consumes: true
      }, {
        type: 'skill',
        name: 'farming',
        level: 90
      }]
    },

    willow_seed: {
      id: 'willow_seed',
      itemId: 'willow_seed',
      requiredFarmingLevel: 95,
      required: [{
        type: 'gold',
        amount: 2000,
        consumes: true
      }, {
        type: 'skill',
        name: 'farming',
        level: 95
      }]
    },



    lemon_seed: {
      id: 'lemon_seed',
      itemId: 'lemon_seed',
      requiredFarmingLevel: 2,
      required: [{
        type: 'gold',
        amount: 100,
        consumes: true
      }, {
        type: 'skill',
        name: 'farming',
        level: 2
      }]
    },

    rubia_flower_seed: {
      id: 'rubia_flower_seed',
      itemId: 'rubia_flower_seed',
      requiredFarmingLevel: 2,
      required: [{
        type: 'gold',
        amount: 50,
        consumes: true
      }, {
        type: 'skill',
        name: 'farming',
        level: 2
      }]
    },

    grape_fruit_seed: {
      id: 'grape_fruit_seed',
      itemId: 'grape_fruit_seed',
      requiredFarmingLevel: 3,
      required: [{
        type: 'gold',
        amount: 10,
        consumes: true
      }, {
        type: 'skill',
        name: 'farming',
        level: 3
      }]
    },

    red_apple_seed: {
      id: 'red_apple_seed',
      itemId: 'red_apple_seed',
      requiredFarmingLevel: 5,
      required: [{
        type: 'gold',
        amount: 20,
        consumes: true
      }, {
        type: 'skill',
        name: 'farming',
        level: 5
      }]
    },

    pineapple_seed: {
      id: 'pineapple_seed',
      itemId: 'pineapple_seed',
      requiredFarmingLevel: 10,
      required: [{
        type: 'gold',
        amount: 100,
        consumes: true
      }, {
        type: 'skill',
        name: 'farming',
        level: 10
      }]
    },

    watermelon_seed: {
      id: 'watermelon_seed',
      itemId: 'watermelon_seed',
      requiredFarmingLevel: 15,
      required: [{
        type: 'gold',
        amount: 150,
        consumes: true
      }, {
        type: 'skill',
        name: 'farming',
        level: 15
      }]
    },

    rockmelon_seed: {
      id: 'rockmelon_seed',
      itemId: 'rockmelon_seed',
      requiredFarmingLevel: 50,
      required: [{
        type: 'gold',
        amount: 750,
        consumes: true
      }, {
        type: 'skill',
        name: 'farming',
        level: 50
      }]
    },

    banana_seed: {
      id: 'banana_seed',
      itemId: 'banana_seed',
      requiredFarmingLevel: 40,
      required: [{
        type: 'gold',
        amount: 300,
        consumes: true
      }, {
        type: 'skill',
        name: 'farming',
        level: 40
      }]
    },

    acai_berry_seed: {
      id: 'acai_berry_seed',
      itemId: 'acai_berry_seed',
      requiredFarmingLevel: 30,
      required: [{
        type: 'gold',
        amount: 50,
        consumes: true
      }, {
        type: 'skill',
        name: 'farming',
        level: 30
      }]
    },

    chrysanthemum_seed: {
      id: 'chrysanthemum_seed',
      itemId: 'chrysanthemum_seed',
      requiredFarmingLevel: 25,
      required: [{
        type: 'gold',
        amount: 600,
        consumes: true
      }, {
        type: 'skill',
        name: 'farming',
        level: 25
      }]
    },

    orange_seed: {
      id: 'orange_seed',
      itemId: 'orange_seed',
      requiredFarmingLevel: 35,
      required: [{
        type: 'gold',
        amount: 250,
        consumes: true
      }, {
        type: 'skill',
        name: 'farming',
        level: 35
      }]
    },

    sweet_potato_seed: {
      id: 'sweet_potato_seed',
      itemId: 'sweet_potato_seed',
      requiredFarmingLevel: 35,
      required: [{
        type: 'gold',
        amount: 250,
        consumes: true
      }, {
        type: 'skill',
        name: 'farming',
        level: 35
      }]
    },

    potato_seed: {
      id: 'potato_seed',
      itemId: 'potato_seed',
      requiredFarmingLevel: 20,
      required: [{
        type: 'gold',
        amount: 100,
        consumes: true
      }, {
        type: 'skill',
        name: 'farming',
        level: 20
      }]
    },

    carrot_seed: {
      id: 'carrot_seed',
      itemId: 'carrot_seed',
      requiredFarmingLevel: 20,
      required: [{
        type: 'gold',
        amount: 300,
        consumes: true
      }, {
        type: 'skill',
        name: 'farming',
        level: 20
      }]
    },

    dragonfruit_seed: {
      id: 'dragonfruit_seed',
      itemId: 'dragonfruit_seed',
      requiredFarmingLevel: 25,
      required: [{
        type: 'gold',
        amount: 300,
        consumes: true
      }, {
        type: 'skill',
        name: 'farming',
        level: 25
      }]
    },

    basil_seed: {
      id: 'basil_seed',
      itemId: 'basil_seed',
      requiredFarmingLevel: 4,
      required: [{
        type: 'gold',
        amount: 250,
        consumes: true
      }, {
        type: 'skill',
        name: 'farming',
        level: 4
      }]
    },

    pink_rose_seed: {
      id: 'pink_rose_seed',
      itemId: 'pink_rose_seed',
      requiredFarmingLevel: 5,
      required: [{
        type: 'gold',
        amount: 500,
        consumes: true
      }, {
        type: 'skill',
        name: 'farming',
        level: 5
      }]
    },

    endive_seed: {
      id: 'endive_seed',
      itemId: 'endive_seed',
      requiredFarmingLevel: 6,
      required: [{
        type: 'gold',
        amount: 1000,
        consumes: true
      }, {
        type: 'skill',
        name: 'farming',
        level: 6
      }]
    },

    juniper_seed: {
      id: 'juniper_seed',
      itemId: 'juniper_seed',
      requiredFarmingLevel: 7,
      required: [{
        type: 'gold',
        amount: 1500,
        consumes: true
      }, {
        type: 'skill',
        name: 'farming',
        level: 7
      }]
    },

    agrimony_seed: {
      id: 'agrimony_seed',
      itemId: 'agrimony_seed',
      requiredFarmingLevel: 12,
      required: [{
        type: 'gold',
        amount: 15000,
        consumes: true
      }, {
        type: 'skill',
        name: 'farming',
        level: 12
      }]
    },
  }
}
