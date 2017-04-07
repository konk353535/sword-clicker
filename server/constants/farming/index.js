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

    rubia_flower_seed: {
      id: 'rubia_flower_seed',
      itemId: 'rubia_flower_seed',
      requiredFarmingLevel: 1,
      required: [{
        type: 'gold',
        amount: 100,
        consumes: true
      }, {
        type: 'skill',
        name: 'farming',
        level: 1
      }]
    },

    grape_fruit_seed: {
      id: 'grape_fruit_seed',
      itemId: 'grape_fruit_seed',
      requiredFarmingLevel: 3,
      required: [{
        type: 'gold',
        amount: 25,
        consumes: true
      }, {
        type: 'skill',
        name: 'farming',
        level: 3
      }]
    },

    basil_seed: {
      id: 'basil_seed',
      itemId: 'basil_seed',
      requiredFarmingLevel: 4,
      required: [{
        type: 'gold',
        amount: 500,
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
        amount: 1000,
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
        amount: 2000,
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
        amount: 3000,
        consumes: true
      }, {
        type: 'skill',
        name: 'farming',
        level: 7
      }]
    }
  }
}
