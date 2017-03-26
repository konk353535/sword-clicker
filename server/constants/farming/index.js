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
        amount: 20
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
        amount: 100
      }, {
        type: 'skill',
        name: 'farming',
        level: 1
      }]
    }
  }
}
