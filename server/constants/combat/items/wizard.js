import { VERY_FAST_SPEED, FAST_SPEED, MEDIUM_SPEED, SLOW_SPEED } from '/server/constants/combat/attackSpeeds';

export const WIZARD_ITEMS = {

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
    sellPrice: 100,
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
    sellPrice: 100,
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
    sellPrice: 100,
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
}
