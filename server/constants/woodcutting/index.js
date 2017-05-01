import { WOODCUTTING_ITEMS as woodcuttingItems } from './items';
import { ITEMS } from '/server/constants/items/index';

export const WOODCUTTING_ITEMS = woodcuttingItems;
export const WOODCUTTING = {

  suicidalFury: {
    duration: 60, // In seconds
    attackSpeedIncrease: 1250 // Percentage
  },

  baseMaxWoodcutters: 5,

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
        amount: 20,
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
        amount: 75,
        consumes: true
      }, {
        type: 'skill',
        name: 'woodcutting',
        level: 3
      }]
    },

    wise_man: {
      requiredWoodcuttingLevel: 6,
      icon: 'wiseMan',
      name: 'wise man',
      id: 'wise_man',
      axeId: 'iron_axe',
      required: [{
        type: 'item',
        itemId: 'iron_axe',
        icon: ITEMS['iron_axe'].icon,
        name: ITEMS['iron_axe'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'gold',
        amount: 200,
        consumes: true
      }, {
        type: 'skill',
        name: 'woodcutting',
        level: 6
      }]
    },

    muscle_man: {
      requiredWoodcuttingLevel: 9,
      icon: 'muscleMan',
      name: 'Muscle Man',
      id: 'muscle_man',
      axeId: 'steel_axe',
      required: [{
        type: 'item',
        itemId: 'steel_axe',
        icon: ITEMS['steel_axe'].icon,
        name: ITEMS['steel_axe'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'gold',
        amount: 1000,
        consumes: true
      }, {
        type: 'skill',
        name: 'woodcutting',
        level: 9
      }]
    },

    novice_lumber_jack: {
      requiredWoodcuttingLevel: 12,
      icon: 'noviceLumberJack',
      name: 'novice lumberjack',
      id: 'novice_lumber_jack',
      axeId: 'carbon_axe',
      required: [{
        type: 'item',
        itemId: 'carbon_axe',
        icon: ITEMS['carbon_axe'].icon,
        name: ITEMS['carbon_axe'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'gold',
        amount: 3000,
        consumes: true
      }, {
        type: 'skill',
        name: 'woodcutting',
        level: 12
      }]
    },

    lumber_jack: {
      requiredWoodcuttingLevel: 15,
      icon: 'lumberJack',
      name: 'lumberjack',
      id: 'lumber_jack',
      axeId: 'mithril_axe',
      required: [{
        type: 'item',
        itemId: 'mithril_axe',
        icon: ITEMS['mithril_axe'].icon,
        name: ITEMS['mithril_axe'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'gold',
        amount: 10000,
        consumes: true
      }, {
        type: 'skill',
        name: 'woodcutting',
        level: 15
      }]
    },

    lumber_jack_expert: {
      requiredWoodcuttingLevel: 20,
      icon: 'lumberJack',
      name: 'lumberjack expert',
      id: 'lumber_jack',
      axeId: 'adamantium_axe',
      required: [{
        type: 'item',
        itemId: 'adamantium_axe',
        icon: ITEMS['adamantium_axe'].icon,
        name: ITEMS['adamantium_axe'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'gold',
        amount: 25000,
        consumes: true
      }, {
        type: 'skill',
        name: 'woodcutting',
        level: 20
      }]
    }
  },

  woods: {
    pine_log: {
      requiredAttack: 1,
      xp: 3,
      id: 'pine_log',
      icon: 'pineLog',
      name: 'pine log',
      itemId: 'pine_log',
      chance: 0.16 // Base chance to chop this log
    },

    beech_log: {
      requiredAttack: 3,
      xp: 5,
      id: 'beech_log',
      icon: 'beechLog',
      name: 'beech log',
      itemId: 'beech_log',
      chance: 0.035
    },

    ash_log: {
      requiredAttack: 6,
      xp: 15,
      id: 'ash_log',
      icon: 'ashLog',
      name: 'ash log',
      itemId: 'ash_log',
      chance: 0.025
    },

    oak_log: {
      requiredAttack: 9,
      xp: 45,
      id: 'oak_log',
      icon: 'oakLog',
      name: 'oak log',
      itemId: 'oak_log',
      chance: 0.025
    },

    maple_log: {
      requiredAttack: 12,
      xp: 45,
      id: 'maple_log',
      icon: 'mapleLog',
      name: 'maple log',
      itemId: 'maple_log',
      chance: 0.01
    },

    walnut_log: {
      requiredAttack: 15,
      xp: 90,
      id: 'walnut_log',
      icon: 'walnutLog',
      name: 'walnut log',
      itemId: 'walnut_log',
      chance: 0.01
    }

    // Cherry, Mahogany
  }
}
