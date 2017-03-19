import { WOODCUTTING_ITEMS as woodcuttingItems } from './items';
import { ITEMS } from '/server/constants/items/index';

export const WOODCUTTING_ITEMS = woodcuttingItems;
export const WOODCUTTING = {

  baseMaxWoodcutters: 3,

  // Woodcutters inherit stats from there associated axes
  woodcutters: {
    farmer: {
      requiredWoodcuttingLevel: 1,
      icon: 'farmer',
      name: 'farmer',
      id: 'farmer',
      axeId: 'primitive_axe',
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
      }, {
        type: 'skill',
        name: 'woodcutting',
        level: 1
      }]
    },

    wise_farmer: {
      requiredWoodcuttingLevel: 3,
      icon: 'wiseFarmer',
      name: 'wise farmer',
      id: 'wise_farmer',
      axeId: 'copper_axe',
      required: [{
        type: 'item',
        itemId: 'copper_axe',
        icon: ITEMS['copper_axe'].icon,
        name: ITEMS['copper_axe'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'gold',
        amount: 1000,
        consumes: true
      }, {
        type: 'skill',
        name: 'woodcutting',
        level: 2
      }]
    }
  },

  woods: {
    pine_log: {
      requiredAttack: 1,
      xp: 1,
      id: 'pine_log',
      icon: 'pineLog',
      name: 'pine log',
      itemId: 'pine_log',
      chance: 0.3 // Base chance to chop this log
    },

    beech_log: {
      requiredAttack: 3,
      xp: 3,
      id: 'beech_log',
      icon: 'beechLog',
      name: 'beech log',
      itemId: 'beech_log',
      chance: 0.05 // Base chance to chop this log
    },

    ash_log: {
      requiredAttack: 6,
      xp: 15,
      id: 'ash_log',
      icon: 'ashLog',
      name: 'ash log',
      itemId: 'ash_log',
      chance: 0.03 // Base chance to chop this log
    },

    // Oak, Maple, Walnut, Cherry, Mahogany
  }
}
