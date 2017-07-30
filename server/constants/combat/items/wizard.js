import { VERY_FAST_SPEED, FAST_SPEED, MEDIUM_SPEED, SLOW_SPEED } from '/server/constants/combat/attackSpeeds';

export const WIZARD_ITEMS = {

  druids_hat: {
    id: 'druids_hat',
    icon: 'druidsHat',
    category: 'combat',
    slot: 'head',
    name: 'druidic hat',
    sellPrice: 500,
    description: 'Helps emit healing energy',
    isEquippable: true,
    stats: {
      healthMax: 30,
      magicPower: 3,
      magicArmor: 5,
      healingPower: 10
    },
    extraStats: {
      healthMax: 10,
      magicPower: 2,
      healingPower: 5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 15
    }],
    enchantments: ['druidic_hat'],
  },

  druids_shirt: {
    id: 'druids_shirt',
    icon: 'druidsShirt',
    category: 'combat',
    slot: 'head',
    name: 'druidic shirt',
    sellPrice: 600,
    description: 'Helps emit healing energy',
    isEquippable: true,
    stats: {
      healthMax: 60,
      magicPower: 6,
      magicArmor: 5,
      healingPower: 10
    },
    extraStats: {
      healthMax: 60,
      magicPower: 2,
      healingPower: 4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 15
    }]
  },


  druids_pants: {
    id: 'druids_pants',
    icon: 'druidsPants',
    category: 'combat',
    slot: 'head',
    name: 'druidic pants',
    sellPrice: 600,
    description: 'Helps emit healing energy',
    isEquippable: true,
    stats: {
      healthMax: 60,
      magicPower: 6,
      magicArmor: 5,
      healingPower: 10
    },
    extraStats: {
      healthMax: 60,
      magicPower: 2,
      healingPower: 4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 15
    }]
  },

  brown_wizard_hat: {
    id: 'brown_wizard_hat',
    icon: 'brownWizardHat',
    category: 'combat',
    slot: 'head',
    name: 'brown wizard hat',
    sellPrice: 100,
    description: 'Helps emit magical energy',
    isEquippable: true,
    stats: {
      healthMax: 30,
      magicPower: 3,
      magicArmor: 5
    },
    extraStats: {
      healthMax: 10,
      magicPower: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 5
    }]
  },

  blue_wizard_hat: {
    id: 'blue_wizard_hat',
    icon: 'blueWizardHat',
    category: 'combat',
    slot: 'head',
    name: 'blue wizard hat',
    sellPrice: 300,
    description: 'Helps emit magical energy',
    isEquippable: true,
    stats: {
      healthMax: 60,
      magicPower: 6,
      magicArmor: 10
    },
    extraStats: {
      healthMax: 20,
      magicPower: 4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 15
    }]
  },

  purple_wizard_hat: {
    id: 'purple_wizard_hat',
    icon: 'purpleWizardHat',
    category: 'combat',
    slot: 'head',
    name: 'purple wizard hat',
    sellPrice: 1000,
    description: 'Helps emit magical energy',
    isEquippable: true,
    stats: {
      healthMax: 60,
      magicPower: 8,
      magicArmor: 12
    },
    extraStats: {
      healthMax: 20,
      magicPower: 5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 25
    }]
  },

  orange_wizard_hat: {
    id: 'orange_wizard_hat',
    icon: 'orangeWizardHat',
    category: 'combat',
    slot: 'head',
    name: 'orange wizard hat',
    sellPrice: 2000,
    description: 'Helps emit magical energy',
    isEquippable: true,
    stats: {
      healthMax: 70,
      magicPower: 12,
      magicArmor: 15
    },
    extraStats: {
      healthMax: 50,
      magicPower: 3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 35
    }]
  },

  brown_wizard_shirt: {
    id: 'brown_wizard_shirt',
    icon: 'brownWizardShirt',
    category: 'combat',
    slot: 'chest',
    name: 'brown wizard shirt',
    sellPrice: 100,
    description: 'Helps emit magical energy',
    isEquippable: true,
    stats: {
      healthMax: 30,
      magicPower: 3,
      magicArmor: 5,
    },
    extraStats: {
      healthMax: 10,
      magicPower: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 5
    }]
  },

  blue_wizard_shirt: {
    id: 'blue_wizard_shirt',
    icon: 'blueWizardShirt',
    category: 'combat',
    slot: 'chest',
    name: 'blue wizard shirt',
    sellPrice: 300,
    description: 'Helps emit magical energy',
    isEquippable: true,
    stats: {
      healthMax: 60,
      magicPower: 6,
      magicArmor: 10
    },
    extraStats: {
      healthMax: 20,
      magicPower: 4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 15
    }]
  },

  purple_wizard_shirt: {
    id: 'purple_wizard_shirt',
    icon: 'purpleWizardShirt',
    category: 'combat',
    slot: 'chest',
    name: 'purple wizard shirt',
    sellPrice: 1000,
    description: 'Helps emit magical energy',
    isEquippable: true,
    stats: {
      healthMax: 60,
      magicPower: 8,
      magicArmor: 12
    },
    extraStats: {
      healthMax: 20,
      magicPower: 5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 25
    }]
  },

  orange_wizard_shirt: {
    id: 'orange_wizard_shirt',
    icon: 'orangeWizardShirt',
    category: 'combat',
    slot: 'chest',
    name: 'orange wizard shirt',
    sellPrice: 2000,
    description: 'Helps emit magical energy',
    isEquippable: true,
    stats: {
      healthMax: 80,
      magicPower: 12,
      magicArmor: 14
    },
    extraStats: {
      healthMax: 50,
      magicPower: 3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 35
    }]
  },

  brown_wizard_shorts: {
    id: 'brown_wizard_shorts',
    icon: 'brownWizardShorts',
    category: 'combat',
    slot: 'legs',
    name: 'brown wizard shorts',
    sellPrice: 100,
    description: 'Protect your legs',
    isEquippable: true,
    stats: {
      healthMax: 30,
      magicPower: 3,
      magicArmor: 5
    },
    extraStats: {
      healthMax: 10,
      magicPower: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 5
    }]
  },

  blue_wizard_shorts: {
    id: 'blue_wizard_shorts',
    icon: 'blueWizardShorts',
    category: 'combat',
    slot: 'legs',
    name: 'blue wizard shorts',
    sellPrice: 300,
    description: 'Protect your legs',
    isEquippable: true,
    stats: {
      healthMax: 60,
      magicPower: 6,
      magicArmor: 10
    },
    extraStats: {
      healthMax: 10,
      magicPower: 4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 15
    }]
  },

  purple_wizard_shorts: {
    id: 'purple_wizard_shorts',
    icon: 'purpleWizardShorts',
    category: 'combat',
    slot: 'legs',
    name: 'purple wizard shorts',
    sellPrice: 1000,
    description: 'Protect your legs',
    isEquippable: true,
    stats: {
      healthMax: 65,
      magicPower: 8,
      magicArmor: 13
    },
    extraStats: {
      healthMax: 10,
      magicPower: 5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 25
    }]
  },

  orange_wizard_shorts: {
    id: 'orange_wizard_shorts',
    icon: 'orangeWizardShorts',
    category: 'combat',
    slot: 'legs',
    name: 'orange wizard shorts',
    sellPrice: 2000,
    description: 'Protect your legs',
    isEquippable: true,
    stats: {
      healthMax: 80,
      magicPower: 12,
      magicArmor: 15
    },
    extraStats: {
      healthMax: 50,
      magicPower: 3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 35
    }]
  },
}
