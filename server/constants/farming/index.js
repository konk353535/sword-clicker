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
        amount: 6,
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
        amount: 250,
        consumes: true
      }, {
        type: 'skill',
        name: 'farming',
        level: 15
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
    }
  }
}
