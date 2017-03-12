import { ITEMS } from './items'; 

export const SKILLS = {
  mining: {
    xpToLevel(level) {
      return level * 50 * (1 + (level / 5));
    }
  },

  crafting: {
    xpToLevel(level) {
      return level * 50 * (1 + (level / 5));
    }
  },

  attack: {
    xpToLevel(level) {
      return level * 50 * (1 + (level / 5));
    },

    requirementsToLearn: [{
      itemId: 'copper_dagger',
      icon: ITEMS['copper_dagger'].icon,
      name: ITEMS['copper_dagger'].name,
      amount: 1
    }],

    statsPerLevel: {
      accuracy: 1,
      attack: 1,
      attackMax: 1
    }
  },

  defense: {
    xpToLevel(level) {
      return level * 50 * (1 + (level / 5));
    },

    statsPerLevel: {
      armor: 1,
      defense: 1
    }
  },

  health: {
    xpToLevel(level) {
      return (level - 9) * 50 * (1 + ((level - 9) / 5 ));
    },

    baseLevel: 10,

    statsPerLevel: {
      health: 1,
      maxHealth: 1
    }
  }
}
