import { VERY_FAST_SPEED, FAST_SPEED, MEDIUM_SPEED, SLOW_SPEED } from '/server/constants/combat/attackSpeeds';

export const WIZARD_ITEMS = {

  phoenix_hat: {
    id: 'phoenix_hat',
    icon: 'phoenixHat.svg',
    category: 'combat',
    slot: 'head',
    name: 'phoenix hat',
    sellPrice: 750,
    description: 'Seems to smother healing energy',
    isEquippable: true,
    stats: {
      healthMax: 60,
      magicPower: 15,
      healingPower: -12
    },
    extraStats: {
      healthMax: 40,
      magicPower: 5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 25
    }],
    enchantments: ['phoenix_hat']
  },

  druids_hat: {
    id: 'druids_hat',
    icon: 'druidsHat.svg',
    category: 'combat',
    slot: 'head',
    name: 'druidic hat',
    sellPrice: 500,
    description: 'Helps emit healing energy',
    isEquippable: true,
    stats: {
      healthMax: 30,
      accuracy: -25,
      magicPower: 5,
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
    icon: 'druidsShirt.svg',
    category: 'combat',
    slot: 'chest',
    name: 'druidic shirt',
    sellPrice: 600,
    description: 'Helps emit healing energy',
    isEquippable: true,
    stats: {
      healthMax: 60,
      magicPower: 8,
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
    icon: 'druidsPants.svg',
    category: 'combat',
    slot: 'legs',
    name: 'druidic pants',
    sellPrice: 600,
    description: 'Helps emit healing energy',
    isEquippable: true,
    stats: {
      healthMax: 60,
      magicPower: 8,
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
    icon: 'brownWizardHat.svg',
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
    icon: 'blueWizardHat.svg',
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
    icon: 'purpleWizardHat.svg',
    category: 'combat',
    slot: 'head',
    name: 'purple wizard hat',
    sellPrice: 1000,
    description: 'Helps emit magical energy',
    isEquippable: true,
    stats: {
      healthMax: 70,
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
    icon: 'orangeWizardHat.svg',
    category: 'combat',
    slot: 'head',
    name: 'orange wizard hat',
    sellPrice: 2000,
    description: 'Helps emit magical energy',
    isEquippable: true,
    stats: {
      healthMax: 80,
      magicPower: 15,
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
    icon: 'brownWizardShirt.svg',
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
    icon: 'blueWizardShirt.svg',
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
    icon: 'purpleWizardShirt.svg',
    category: 'combat',
    slot: 'chest',
    name: 'purple wizard shirt',
    sellPrice: 1000,
    description: 'Helps emit magical energy',
    isEquippable: true,
    stats: {
      healthMax: 70,
      magicPower: 10,
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
    icon: 'orangeWizardShirt.svg',
    category: 'combat',
    slot: 'chest',
    name: 'orange wizard shirt',
    sellPrice: 2000,
    description: 'Helps emit magical energy',
    isEquippable: true,
    stats: {
      healthMax: 80,
      magicPower: 15,
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
    icon: 'brownWizardShorts.svg',
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
    icon: 'blueWizardShorts.svg',
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
    icon: 'purpleWizardShorts.svg',
    category: 'combat',
    slot: 'legs',
    name: 'purple wizard shorts',
    sellPrice: 1000,
    description: 'Protect your legs',
    isEquippable: true,
    stats: {
      healthMax: 70,
      magicPower: 10,
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
    icon: 'orangeWizardShorts.svg',
    category: 'combat',
    slot: 'legs',
    name: 'orange wizard shorts',
    sellPrice: 2000,
    description: 'Protect your legs',
    isEquippable: true,
    stats: {
      healthMax: 80,
      magicPower: 15,
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

  yellow_wizard_hat: {
    id: 'yellow_wizard_hat',
    icon: 'yellowWizardHat.svg',
    category: 'combat',
    slot: 'head',
    name: 'yellow wizard hat',
    sellPrice: 1500,
    description: 'Helps emit magical energy',
    isEquippable: true,
    stats: {
      healthMax: 65,
      magicPower: 12,
      magicArmor: 13
    },
    extraStats: {
      healthMax: 50,
      magicPower: 3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 30
    }]
  },

  yellow_wizard_shirt: {
    id: 'yellow_wizard_shirt',
    icon: 'yellowWizardShirt.svg',
    category: 'combat',
    slot: 'chest',
    name: 'crimson wizard shirt',
    sellPrice: 1500,
    description: 'Helps emit magical energy',
    isEquippable: true,
    stats: {
      healthMax: 70,
      magicPower: 12,
      magicArmor: 13
    },
    extraStats: {
      healthMax: 25,
      magicPower: 3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 30
    }]
  },

  yellow_wizard_shorts: {
    id: 'yellow_wizard_shorts',
    icon: 'yellowWizardShorts.svg',
    category: 'combat',
    slot: 'legs',
    name: 'yellow wizard shorts',
    sellPrice: 1500,
    description: 'Protect your legs',
    isEquippable: true,
    stats: {
      healthMax: 70,
      magicPower: 12,
      magicArmor: 14
    },
    extraStats: {
      healthMax: 25,
      magicPower: 3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 30
    }]
  },

  violet_wizard_hat: {
    id: 'violet_wizard_hat',
    icon: 'violetWizardHat.svg',
    category: 'combat',
    slot: 'head',
    name: 'violet wizard hat',
    sellPrice: 1500,
    description: 'Helps emit magical energy',
    isEquippable: true,
    stats: {
      healthMax: 65,
      magicPower: 12,
      magicArmor: 13
    },
    extraStats: {
      healthMax: 50,
      magicPower: 3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 30
    }]
  },

  violet_wizard_shirt: {
    id: 'violet_wizard_shirt',
    icon: 'violetWizardShirt.svg',
    category: 'combat',
    slot: 'chest',
    name: 'violet wizard shirt',
    sellPrice: 1500,
    description: 'Helps emit magical energy',
    isEquippable: true,
    stats: {
      healthMax: 70,
      magicPower: 12,
      magicArmor: 13
    },
    extraStats: {
      healthMax: 25,
      magicPower: 3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 30
    }]
  },

  violet_wizard_shorts: {
    id: 'violet_wizard_shorts',
    icon: 'violetWizardShorts.svg',
    category: 'combat',
    slot: 'legs',
    name: 'violet wizard shorts',
    sellPrice: 1500,
    description: 'Protect your legs',
    isEquippable: true,
    stats: {
      healthMax: 70,
      magicPower: 12,
      magicArmor: 14
    },
    extraStats: {
      healthMax: 25,
      magicPower: 3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 30
    }]
  }

  crimson_wizard_hat: {
    id: 'crimson_wizard_hat',
    icon: 'crimsonWizardHat.svg',
    category: 'combat',
    slot: 'head',
    name: 'crimson wizard hat',
    sellPrice: 1500,
    description: 'Helps emit magical energy',
    isEquippable: true,
    stats: {
      healthMax: 65,
      magicPower: 12,
      magicArmor: 13
    },
    extraStats: {
      healthMax: 50,
      magicPower: 3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 30
    }]
  },

  crimson_wizard_shirt: {
    id: 'crimson_wizard_shirt',
    icon: 'crimsonWizardShirt.svg',
    category: 'combat',
    slot: 'chest',
    name: 'crimson wizard shirt',
    sellPrice: 1500,
    description: 'Helps emit magical energy',
    isEquippable: true,
    stats: {
      healthMax: 70,
      magicPower: 12,
      magicArmor: 13
    },
    extraStats: {
      healthMax: 25,
      magicPower: 3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 30
    }]
  },

  crimson_wizard_shorts: {
    id: 'crimson_wizard_shorts',
    icon: 'crimsonWizardShorts.svg',
    category: 'combat',
    slot: 'legs',
    name: 'crimson wizard shorts',
    sellPrice: 1500,
    description: 'Protect your legs',
    isEquippable: true,
    stats: {
      healthMax: 70,
      magicPower: 12,
      magicArmor: 14
    },
    extraStats: {
      healthMax: 25,
      magicPower: 3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 30
    }]
  },

  azure_wizard_hat: {
    id: 'azure_wizard_hat',
    icon: 'azureWizardHat.svg',
    category: 'combat',
    slot: 'head',
    name: 'azure wizard hat',
    sellPrice: 1500,
    description: 'Helps emit magical energy',
    isEquippable: true,
    stats: {
      healthMax: 65,
      magicPower: 12,
      magicArmor: 13
    },
    extraStats: {
      healthMax: 50,
      magicPower: 3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 30
    }]
  },

  azure_wizard_shirt: {
    id: 'azure_wizard_shirt',
    icon: 'azureWizardShirt.svg',
    category: 'combat',
    slot: 'chest',
    name: 'azure wizard shirt',
    sellPrice: 1500,
    description: 'Helps emit magical energy',
    isEquippable: true,
    stats: {
      healthMax: 70,
      magicPower: 12,
      magicArmor: 13
    },
    extraStats: {
      healthMax: 25,
      magicPower: 3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 30
    }]
  },

  azure_wizard_shorts: {
    id: 'azure_wizard_shorts',
    icon: 'azureWizardShorts.svg',
    category: 'combat',
    slot: 'legs',
    name: 'azure wizard shorts',
    sellPrice: 1500,
    description: 'Protect your legs',
    isEquippable: true,
    stats: {
      healthMax: 70,
      magicPower: 12,
      magicArmor: 14
    },
    extraStats: {
      healthMax: 25,
      magicPower: 3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 30
    }]
  },

  gold_wizard_hat: {
    id: 'goldwizard_hat',
    icon: 'goldWizardHat.svg',
    category: 'combat',
    slot: 'head',
    name: 'gold wizard hat',
    sellPrice: 1500,
    description: 'Helps emit magical energy',
    isEquippable: true,
    stats: {
      healthMax: 65,
      magicPower: 12,
      magicArmor: 13
    },
    extraStats: {
      healthMax: 50,
      magicPower: 3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 30
    }]
  },

  gold_wizard_shirt: {
    id: 'gold_wizard_shirt',
    icon: 'goldWizardShirt.svg',
    category: 'combat',
    slot: 'chest',
    name: 'gold wizard shirt',
    sellPrice: 1500,
    description: 'Helps emit magical energy',
    isEquippable: true,
    stats: {
      healthMax: 70,
      magicPower: 12,
      magicArmor: 13
    },
    extraStats: {
      healthMax: 25,
      magicPower: 3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 30
    }]
  },

  gold_wizard_shorts: {
    id: 'gold_wizard_shorts',
    icon: 'goldWizardShorts.svg',
    category: 'combat',
    slot: 'legs',
    name: 'gold wizard shorts',
    sellPrice: 1500,
    description: 'Protect your legs',
    isEquippable: true,
    stats: {
      healthMax: 70,
      magicPower: 12,
      magicArmor: 14
    },
    extraStats: {
      healthMax: 25,
      magicPower: 3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 30
    }]
  },
}
