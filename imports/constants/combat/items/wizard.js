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
      level: 20
    }],
    enchantments: ['phoenix_hat']
  },
  
  eternal_flame: {
    id: 'eternal_flame',
    icon: 'eternalFlame.svg',
    category: 'combat',
    slot: 'head',
    name: 'eternal flame',
    sellPrice: 17500,
    description: 'A wreath of eternal flames.',
    isEquippable: true,
    stats: {
      healthMax: 250,
      magicPower: 35,
      healingPower: -5
    },
    extraStats: {
      healthMax: 50,
      magicPower: 10
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 60
    }],
    enchantments: ['eternal_flame']
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
      level: 10
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
      healthMax: 30,
      magicPower: 6,
      magicArmor: 5,
      healingPower: 10
    },
    extraStats: {
      healthMax: 30,
      magicPower: 2,
      healingPower: 4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 10
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
      healthMax: 30,
      magicPower: 6,
      magicArmor: 5,
      healingPower: 10
    },
    extraStats: {
      healthMax: 30,
      magicPower: 2,
      healingPower: 4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 10
    }]
  },

  brown_wizard_hat: {
    id: 'brown_wizard_hat',
    icon: 'brownWizardHat.png',
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
    icon: 'blueWizardHat.png',
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
    icon: 'purpleWizardHat.png',
    category: 'combat',
    slot: 'head',
    name: 'purple wizard hat',
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

  orange_wizard_hat: {
    id: 'orange_wizard_hat',
    icon: 'orangeWizardHat.png',
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
    icon: 'brownWizardShirt.png',
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
    icon: 'blueWizardShirt.png',
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
    icon: 'purpleWizardShirt.png',
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
    icon: 'orangeWizardShirt.png',
    category: 'combat',
    slot: 'chest',
    name: 'orange wizard shirt',
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

  brown_wizard_shorts: {
    id: 'brown_wizard_shorts',
    icon: 'brownWizardShorts.png',
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
    icon: 'blueWizardShorts.png',
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
      healthMax: 20,
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
    icon: 'purpleWizardShorts.png',
    category: 'combat',
    slot: 'legs',
    name: 'purple wizard shorts',
    sellPrice: 1000,
    description: 'Protect your legs',
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

  orange_wizard_shorts: {
    id: 'orange_wizard_shorts',
    icon: 'orangeWizardShorts.png',
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

  amber_wizard_hat: {
    id: 'amber_wizard_hat',
    icon: 'amberWizardHat.png',
    category: 'combat',
    slot: 'head',
    name: 'amber wizard hat',
    sellPrice: 2500,
    description: 'Helps emit magical energy',
    isEquippable: true,
    stats: {
      healthMax: 90,
      magicPower: 20,
      magicArmor: 20
    },
    extraStats: {
      healthMax: 50,
      magicPower: 5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 45
    }]
  },

  amber_wizard_shirt: {
    id: 'amber_wizard_shirt',
    icon: 'amberWizardShirt.png',
    category: 'combat',
    slot: 'chest',
    name: 'amber wizard shirt',
    sellPrice: 2500,
    description: 'Helps emit magical energy',
    isEquippable: true,
    stats: {
      healthMax: 90,
      magicPower: 20,
      magicArmor: 20
    },
    extraStats: {
      healthMax: 50,
      magicPower: 5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 45
    }]
  },

 amber_wizard_shorts: {
    id: 'amber_wizard_shorts',
    icon: 'amberWizardShorts.png',
    category: 'combat',
    slot: 'legs',
    name: 'amber wizard shorts',
    sellPrice: 2500,
    description: 'Protect your legs',
    isEquippable: true,
    stats: {
      healthMax: 90,
      magicPower: 20,
      magicArmor: 20
    },
    extraStats: {
      healthMax: 50,
      magicPower: 5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 45
    }]
  },

  violet_wizard_hat: {
    id: 'violet_wizard_hat',
    icon: 'violetWizardHat.png',
    category: 'combat',
    slot: 'head',
    name: 'violet wizard hat',
    sellPrice: 2750,
    description: 'Helps emit magical energy',
    isEquippable: true,
    stats: {
      healthMax: 100,
      magicPower: 25,
      magicArmor: 25
    },
    extraStats: {
      healthMax: 50,
      magicPower: 5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 48
    }]
  },

  violet_wizard_shirt: {
    id: 'violet_wizard_shirt',
    icon: 'violetWizardShirt.png',
    category: 'combat',
    slot: 'chest',
    name: 'violet wizard shirt',
    sellPrice: 2750,
    description: 'Helps emit magical energy',
    isEquippable: true,
    stats: {
      healthMax: 100,
      magicPower: 25,
      magicArmor: 25
    },
    extraStats: {
      healthMax: 50,
      magicPower: 5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 48
    }]
  },

  violet_wizard_shorts: {
    id: 'violet_wizard_shorts',
    icon: 'violetWizardShorts.png',
    category: 'combat',
    slot: 'legs',
    name: 'violet wizard shorts',
    sellPrice: 2750,
    description: 'Protect your legs',
    isEquippable: true,
    stats: {
      healthMax: 100,
      magicPower: 25,
      magicArmor: 25
    },
    extraStats: {
      healthMax: 50,
      magicPower: 5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 48
    }]
  },

  crimson_wizard_hat: {
    id: 'crimson_wizard_hat',
    icon: 'crimsonWizardHat.png',
    category: 'combat',
    slot: 'head',
    name: 'crimson wizard hat',
    sellPrice: 3000,
    description: 'Helps emit magical energy',
    isEquippable: true,
    stats: {
      healthMax: 110,
      magicPower: 30,
      magicArmor: 28
    },
    extraStats: {
      healthMax: 50,
      magicPower: 7
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 51
    }]
  },

  crimson_wizard_shirt: {
    id: 'crimson_wizard_shirt',
    icon: 'crimsonWizardShirt.png',
    category: 'combat',
    slot: 'chest',
    name: 'crimson wizard shirt',
    sellPrice: 3000,
    description: 'Helps emit magical energy',
    isEquippable: true,
    stats: {
      healthMax: 110,
      magicPower: 30,
      magicArmor: 28
    },
    extraStats: {
      healthMax: 50,
      magicPower: 7
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 51
    }]
  },

  crimson_wizard_shorts: {
    id: 'crimson_wizard_shorts',
    icon: 'crimsonWizardShorts.png',
    category: 'combat',
    slot: 'legs',
    name: 'crimson wizard shorts',
    sellPrice: 3000,
    description: 'Protect your legs',
    isEquippable: true,
    stats: {
      healthMax: 110,
      magicPower: 30,
      magicArmor: 28
    },
    extraStats: {
      healthMax: 50,
      magicPower: 7
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 51
    }]
  },

  azure_wizard_hat: {
    id: 'azure_wizard_hat',
    icon: 'azureWizardHat.png',
    category: 'combat',
    slot: 'head',
    name: 'azure wizard hat',
    sellPrice: 3250,
    description: 'Helps emit magical energy',
    isEquippable: true,
    stats: {
      healthMax: 120,
      magicPower: 35,
      magicArmor: 32
    },
    extraStats: {
      healthMax: 50,
      magicPower: 8
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 53
    }]
  },

  azure_wizard_shirt: {
    id: 'azure_wizard_shirt',
    icon: 'azureWizardShirt.png',
    category: 'combat',
    slot: 'chest',
    name: 'azure wizard shirt',
    sellPrice: 3250,
    description: 'Helps emit magical energy',
    isEquippable: true,
    stats: {
      healthMax: 120,
      magicPower: 35,
      magicArmor: 32
    },
    extraStats: {
      healthMax: 50,
      magicPower: 8
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 53
    }]
  },

  azure_wizard_shorts: {
    id: 'azure_wizard_shorts',
    icon: 'azureWizardShorts.png',
    category: 'combat',
    slot: 'legs',
    name: 'azure wizard shorts',
    sellPrice: 3250,
    description: 'Protect your legs',
    isEquippable: true,
    stats: {
      healthMax: 120,
      magicPower: 35,
      magicArmor: 32
    },
    extraStats: {
      healthMax: 50,
      magicPower: 8
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 53
    }]
  },

  verdant_wizard_hat: {
    id: 'verdant_wizard_hat',
    icon: 'verdantWizardHat.png',
    category: 'combat',
    slot: 'head',
    name: 'verdant wizard hat',
    sellPrice: 3500,
    description: 'Helps emit magical energy',
    isEquippable: true,
    stats: {
      healthMax: 130,
      magicPower: 40,
      magicArmor: 35
    },
    extraStats: {
      healthMax: 50,
      magicPower: 10
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 55
    }]
  },

  verdant_wizard_shirt: {
    id: 'verdant_wizard_shirt',
    icon: 'verdantWizardShirt.png',
    category: 'combat',
    slot: 'chest',
    name: 'verdant wizard shirt',
    sellPrice: 3500,
    description: 'Helps emit magical energy',
    isEquippable: true,
    stats: {
      healthMax: 130,
      magicPower: 40,
      magicArmor: 35
    },
    extraStats: {
      healthMax: 50,
      magicPower: 10
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 55
    }]
  },

  verdant_wizard_shorts: {
    id: 'verdant_wizard_shorts',
    icon: 'verdantWizardShorts.png',
    category: 'combat',
    slot: 'legs',
    name: 'verdant wizard shorts',
    sellPrice: 3500,
    description: 'Protect your legs',
    isEquippable: true,
    stats: {
      healthMax: 130,
      magicPower: 40,
      magicArmor: 35
    },
    extraStats: {
      healthMax: 50,
      magicPower: 10
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 55
    }]
  },

  serpent_wizard_hat: {
    id: 'serpent_wizard_hat',
    icon: 'serpentWizardHat.png',
    category: 'combat',
    slot: 'head',
    name: 'serpent wizard hat',
    sellPrice: 3500,
    description: 'Helps emit magical energy',
    isEquippable: true,
    stats: {
      healthMax: 150,
      magicPower: 48,
      magicArmor: 40
    },
    extraStats: {
      healthMax: 75,
      magicPower: 12
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 60
    }]
  },

  serpent_wizard_shirt: {
    id: 'serpent_wizard_shirt',
    icon: 'serpentWizardShirt.png',
    category: 'combat',
    slot: 'chest',
    name: 'serpent wizard shirt',
    sellPrice: 3500,
    description: 'Helps emit magical energy',
    isEquippable: true,
    stats: {
      healthMax: 150,
      magicPower: 48,
      magicArmor: 40
    },
    extraStats: {
      healthMax: 75,
      magicPower: 12
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 60
    }]
  },

  serpent_wizard_shorts: {
    id: 'serpent_wizard_shorts',
    icon: 'serpentWizardShorts.png',
    category: 'combat',
    slot: 'legs',
    name: 'serpent wizard shorts',
    sellPrice: 3500,
    description: 'Protect your legs',
    isEquippable: true,
    stats: {
      healthMax: 150,
      magicPower: 48,
      magicArmor: 40
    },
    extraStats: {
      healthMax: 75,
      magicPower: 12
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 60
    }]
  },

  inferno_wizard_hat: {
    id: 'infernowizard_hat',
    icon: 'infernoWizardHat.png',
    category: 'combat',
    slot: 'head',
    name: 'inferno wizard hat',
    sellPrice: 3500,
    description: 'Helps emit magical energy',
    isEquippable: true,
    stats: {
      healthMax: 180,
      magicPower: 58,
      magicArmor: 45
    },
    extraStats: {
      healthMax: 100,
      magicPower: 14
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 70
    }]
  },

  inferno_wizard_shirt: {
    id: 'inferno_wizard_shirt',
    icon: 'infernoWizardShirt.png',
    category: 'combat',
    slot: 'chest',
    name: 'inferno wizard shirt',
    sellPrice: 3500,
    description: 'Helps emit magical energy',
    isEquippable: true,
    stats: {
      healthMax: 180,
      magicPower: 58,
      magicArmor: 45
    },
    extraStats: {
      healthMax: 100,
      magicPower: 14
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 70
    }]
  },

  inferno_wizard_shorts: {
    id: 'inferno_wizard_shorts',
    icon: 'infernoWizardShorts.png',
    category: 'combat',
    slot: 'legs',
    name: 'inferno wizard shorts',
    sellPrice: 3500,
    description: 'Protect your legs',
    isEquippable: true,
    stats: {
      healthMax: 180,
      magicPower: 58,
      magicArmor: 45
    },
    extraStats: {
      healthMax: 100,
      magicPower: 14
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 70
    }]
  },

  exalted_wizard_hat: {
    id: 'exalted_wizard_hat',
    icon: 'exaltedWizardHat.png',
    category: 'combat',
    slot: 'head',
    name: 'exalted wizard hat',
    sellPrice: 3500,
    description: 'Helps emit magical energy',
    isEquippable: true,
    stats: {
      healthMax: 250,
      magicPower: 70,
      magicArmor: 50
    },
    extraStats: {
      healthMax: 150,
      magicPower: 20
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 80
    }]
  },

  exalted_wizard_shirt: {
    id: 'exalted_wizard_shirt',
    icon: 'exaltedWizardShirt.png',
    category: 'combat',
    slot: 'chest',
    name: 'exalted wizard shirt',
    sellPrice: 3500,
    description: 'Helps emit magical energy',
    isEquippable: true,
    stats: {
      healthMax: 250,
      magicPower: 70,
      magicArmor: 50
    },
    extraStats: {
      healthMax: 150,
      magicPower: 20
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 80
    }]
  },

  exalted_wizard_shorts: {
    id: 'exalted_wizard_shorts',
    icon: 'exaltedWizardShorts.png',
    category: 'combat',
    slot: 'legs',
    name: 'exalted wizard shorts',
    sellPrice: 3500,
    description: 'Protect your legs',
    isEquippable: true,
    stats: {
      healthMax: 250,
      magicPower: 70,
      magicArmor: 50
    },
    extraStats: {
      healthMax: 150,
      magicPower: 20
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 80
    }]
  }
};
