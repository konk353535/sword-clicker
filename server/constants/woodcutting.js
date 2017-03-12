import { ITEMS } from '/server/constants/items';

export const MINING = {

  baseMaxWoodcutters: 10,

  woodcutters: {
    farmBoy: {
      rate: 2, // Base rate is two woods per minute
      required: [{
        type: 'item',
        itemId: 'primitive_axe',
        icon: ITEMS['primitive_axe'].icon,
        name: ITEMS['primitive_axe'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'gold',
        amount: 100,
        consumes: true
      }]
    }
  },

  woods: {
    normal_log: {
      requiredLevel: 1,
      xp: 1,
      id: 'normal_log',
      icon: 'normalLog',
      name: 'normal log',
      itemId: 'normal_log',
      chance: 1
    }
  }
}
