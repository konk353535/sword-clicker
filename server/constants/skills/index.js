import { ITEMS } from '/server/constants/items/index'; 

export const SKILLS = {
  mining: {
    xpToLevel(level) {
      return 30 * level + ((level / 2) * (level / 2) * level * 10);
    }
  },

  total: {
    xpToLevel() {
      return -1;
    }
  },

  inscription: {
    xpToLevel(level) {
      return 30 * level + ((level / 2) * (level / 2) * level * 10);
    },

    requirementsToLearn: [{
      itemId: 'rubia_flower',
      icon: ITEMS['rubia_flower'].icon,
      name: ITEMS['rubia_flower'].name,
      amount: 1,
      type: 'item'
    }]
  },

  astronomy: {
    xpToLevel(level) {
      return 30 * level + ((level / 2) * (level / 2) * level * 10);
    },

    requirementsToLearn: [{
      itemId: 'ore_copper',
      icon: ITEMS['ore_copper'].icon,
      name: ITEMS['ore_copper'].name,
      amount: 25,
      type: 'item'
    }]
  },

  farming: {
    xpToLevel(level) {
      return 30 * level + ((level / 2) * (level / 2) * level * 10);
    }
  },

  crafting: {
    xpToLevel(level) {
      return 30 * level + ((level / 2) * (level / 2) * level * 10);
    }
  },

  woodcutting: {
    xpToLevel(level) {
      return 30 * level + ((level / 2) * (level / 2) * level * 10);
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
      return 30 * level + ((level / 2) * (level / 2) * level * 10);
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
      return 30 * level + ((level / 2) * (level / 2) * level * 10);
    },

    statsPerLevel: {
      armor: 1,
      defense: 1
    }
  },

  health: {
    xpToLevel(rawLevel) {
      let level = rawLevel - 4;
      return 30 * level + ((level / 2) * (level / 2) * level * 10);
    },

    baseLevel: 5,

    statsPerLevel: {
      health: 10,
      healthMax: 10
    }
  }
}
