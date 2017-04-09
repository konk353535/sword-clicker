import { ITEMS } from '/server/constants/items/index'; 

export const SKILLS = {
  mining: {
    xpToLevel(level) {
      return level * 35 * (1 + (level / 4)) - 26;
    }
  },

  total: {
    xpToLevel() {
      return -1;
    }
  },

  inscription: {
    xpToLevel(level) {
      return level * 35 * (1 + (level / 4)) - 26;
    },

    requirementsToLearn: [{
      itemId: 'rubia_flower',
      icon: ITEMS['rubia_flower'].icon,
      name: ITEMS['rubia_flower'].name,
      amount: 1,
      type: 'item'
    }]
  },

  farming: {
    xpToLevel(level) {
      return level * 35 * (1 + (level / 4)) - 26;
    }
  },

  crafting: {
    xpToLevel(level) {
      return level * 35 * (1 + (level / 4)) - 26;
    }
  },

  woodcutting: {
    xpToLevel(level) {
      return level * 35 * (1 + (level / 4)) - 26;
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
      return level * 35 * (1 + (level / 4)) - 26;
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
      attackMax: 0.5
    }
  },

  defense: {
    xpToLevel(level) {
      return level * 35 * (1 + (level / 4)) - 26;
    },

    statsPerLevel: {
      armor: 1,
      defense: 1
    }
  },

  health: {
    xpToLevel(level) {
      return (level - 4) * 35 * (1 + ((level - 4) / 4)) - 26;
    },

    baseLevel: 5,

    statsPerLevel: {
      health: 10,
      healthMax: 10
    }
  }
}
