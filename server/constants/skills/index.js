import { ITEMS } from '/server/constants/items/index'; 

export const SKILLS = {
  mining: {
    xpToLevel(level) {
      return level * 50 * (1 + (level / 5)) - 40;
    }
  },

  crafting: {
    xpToLevel(level) {
      return level * 50 * (1 + (level / 5)) - 40;
    }
  },

  woodcutting: {
    xpToLevel(level) {
      return level * 50 * (1 + (level / 5)) - 40;
    },

    requirementsToLearn: [{
      itemId: 'primitive_axe',
      icon: ITEMS['primitive_axe'].icon,
      name: ITEMS['primitive_axe'].name,
      amount: 1,
      type: 'item'
    }]
  },

  attack: {
    xpToLevel(level) {
      return level * 50 * (1 + (level / 5)) - 40;
    },

    requirementsToLearn: [{
      itemId: 'copper_dagger',
      icon: ITEMS['copper_dagger'].icon,
      name: ITEMS['copper_dagger'].name,
      amount: 1,
      type: 'item'
    }],

    statsPerLevel: {
      accuracy: 1,
      attack: 1,
      attackMax: 1
    }
  },

  defense: {
    xpToLevel(level) {
      return level * 50 * (1 + (level / 5)) - 40;
    },

    statsPerLevel: {
      armor: 1,
      defense: 1
    }
  },

  health: {
    xpToLevel(level) {
      return (level - 9) * 50 * (1 + ((level - 9) / 5 )) - 40;
    },

    baseLevel: 10,

    statsPerLevel: {
      health: 1,
      maxHealth: 1
    }
  }
}
