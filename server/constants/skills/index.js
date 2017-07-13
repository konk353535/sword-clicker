import { ITEMS } from '/server/constants/items/index'; 

export const SKILLS = {
  mining: {
    xpToLevel(level) {
      let extra = 0;
      if (level > 65) {
        extra = 25000 * (Math.pow(1.16, (level - 65)));
      }
      return 30 * level + ((level / 2) * (level / 2) * level * 10) + extra;
    }
  },

  magic: {
    xpToLevel(level) {
      let extra = 0;
      if (level > 65) {
        extra = 25000 * (Math.pow(1.16, (level - 65)));
      }
      return 30 * level + ((level / 2) * (level / 2) * level * 10) + extra;
    },

    statsPerLevel: {
      magicPower: 1,
      magicArmor: 1
    }
  },

  total: {
    xpToLevel() {
      return -1;
    }
  },

  inscription: {
    xpToLevel(level) {
      let extra = 0;
      if (level > 65) {
        extra = 25000 * (Math.pow(1.16, (level - 65)));
      }
      return 30 * level + ((level / 2) * (level / 2) * level * 10) + extra;
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
      let extra = 0;
      if (level > 65) {
        extra = 25000 * (Math.pow(1.16, (level - 65)));
      }
      return 30 * level + ((level / 2) * (level / 2) * level * 10) + extra;
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
      let extra = 0;
      if (level > 65) {
        extra = 25000 * (Math.pow(1.16, (level - 65)));
      }
      return 30 * level + ((level / 2) * (level / 2) * level * 10) + extra;
    }
  },

  crafting: {
    xpToLevel(level) {
      let extra = 0;
      if (level > 65) {
        extra = 25000 * (Math.pow(1.16, (level - 65)));
      }
      return 30 * level + ((level / 2) * (level / 2) * level * 10) + extra;
    }
  },

  woodcutting: {
    xpToLevel(level) {
      let extra = 0;
      if (level > 65) {
        extra = 25000 * (Math.pow(1.16, (level - 65)));
      }
      return 30 * level + ((level / 2) * (level / 2) * level * 10) + extra;
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
      let extra = 0;
      if (level > 65) {
        extra = 25000 * (Math.pow(1.16, (level - 65)));
      }
      return 30 * level + ((level / 2) * (level / 2) * level * 10) + extra;
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
      let extra = 0;
      if (level > 65) {
        extra = 25000 * (Math.pow(1.16, (level - 65)));
      }
      return 30 * level + ((level / 2) * (level / 2) * level * 10) + extra;
    },

    statsPerLevel: {
      armor: 1,
      defense: 1
    }
  },

  health: {
    xpToLevel(rawLevel) {
      let level = rawLevel - 4;
      let extra = 0;
      if (level > 65) {
        extra = 25000 * (Math.pow(1.16, (level - 65)));
      }
      return 30 * level + ((level / 2) * (level / 2) * level * 10) + extra;
    },

    baseLevel: 5,

    statsPerLevel: {
      health: 10,
      healthMax: 10
    }
  }
}
