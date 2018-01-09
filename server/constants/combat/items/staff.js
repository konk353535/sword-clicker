import { VERY_FAST_SPEED, FAST_SPEED, MEDIUM_SPEED, SLOW_SPEED } from '/server/constants/combat/attackSpeeds';

export const STAFF_ITEMS = {
  /* Wands - Same as staffs but 1h, less magic power */

  copper_wand: {
    id: 'copper_wand',
    icon: 'copperWand.svg',
    category: 'combat',
    weaponType: 'wand',
    slot: 'mainHand',
    name: 'copper wand',
    sellPrice: 50,
    description: 'What seems like a copper wand',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 4,
      attackMax: 6,
      attackSpeed: SLOW_SPEED,
      accuracy: 5,
      magicPower: 5
    },
    extraStats: {
      attack: 3,
      attackMax: 3,
      accuracy: 7,
      magicPower: 1
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 1
    }]
  },

  copper_hammer: {
    id: 'copper_hammer',
    icon: 'copperHammer.svg',
    category: 'combat',
    weaponType: 'staff',
    slot: 'mainHand',
    name: 'copper hammer',
    sellPrice: 50,
    description: 'What seems like a copper hammer',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 4,
      attackMax: 6,
      attackSpeed: SLOW_SPEED,
      accuracy: 5,
      defense: 3,
      magicArmor: 10,
      magicPower: 5
    },
    extraStats: {
      attack: 3,
      attackMax: 3,
      accuracy: 7,
      magicPower: 1
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 1
    }]
  },

  beech_staff: {
    id: 'beech_staff',
    icon: 'beechStaff.svg',
    category: 'combat',
    weaponType: 'staff',
    slot: 'mainHand',
    name: 'beech staff',
    sellPrice: 100,
    description: 'What seems like a normal staff',
    isWeapon: true,
    isEquippable: true,
    isTwoHanded: true,
    stats: {
      attack: 4,
      attackMax: 6,
      attackSpeed: SLOW_SPEED,
      accuracy: 7,
      magicPower: 12
    },
    extraStats: {
      attack: 3,
      attackMax: 3,
      accuracy: 7,
      magicPower: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 1
    }]
  },

  oak_staff: {
    id: 'oak_staff',
    icon: 'oakStaff.svg',
    category: 'combat',
    weaponType: 'staff',
    slot: 'mainHand',
    name: 'oak staff',
    sellPrice: 200,
    description: 'What seems like a normal oak staff',
    isWeapon: true,
    isEquippable: true,
    isTwoHanded: true,
    stats: {
      attack: 5,
      attackMax: 10,
      attackSpeed: SLOW_SPEED,
      accuracy: 8,
      magicPower: 13,
      healingPower: 8
    },
    extraStats: {
      attack: 3,
      attackMax: 3,
      accuracy: 7,
      magicPower: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 5
    }]
  },

  brown_trident: {
    id: 'brown_trident',
    icon: 'brownTrident.svg',
    category: 'combat',
    weaponType: 'staff',
    slot: 'mainHand',
    name: 'brown trident',
    sellPrice: 200,
    description: 'A sharp trident, beaming with magical energy.',
    isWeapon: true,
    isEquippable: true,
    isTwoHanded: true,
    stats: {
      attack: 6,
      attackMax: 12,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 14,
      magicPower: 8
    },
    extraStats: {
      attack: 3,
      attackMax: 3,
      accuracy: 7,
      magicPower: 1
    },
    enchantments: ['magic_blade'],
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 5
    }]
  },

  gold_wand: {
    id: 'gold_wand',
    icon: 'goldWand.svg',
    category: 'combat',
    weaponType: 'wand',
    slot: 'mainHand',
    name: 'gold wand',
    sellPrice: 350,
    description: 'What seems like a gold wand',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 6,
      attackMax: 11,
      attackSpeed: SLOW_SPEED,
      accuracy: 8,
      magicPower: 7
    },
    extraStats: {
      attack: 3,
      attackMax: 3,
      accuracy: 7,
      magicPower: 1
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 5
    }]
  },


  gold_hammer: {
    id: 'gold_hammer',
    icon: 'goldHammer.svg',
    category: 'combat',
    weaponType: 'staff',
    slot: 'mainHand',
    name: 'gold hammer',
    sellPrice: 350,
    description: 'What seems like a gold hammer',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 6,
      attackMax: 11,
      attackSpeed: SLOW_SPEED,
      accuracy: 8,
      magicPower: 7,
      magicArmor: 25,
      defense: 10
    },
    extraStats: {
      attack: 3,
      attackMax: 3,
      accuracy: 7,
      magicPower: 1
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 5
    }]
  },


  walnut_staff: {
    id: 'walnut_staff',
    icon: 'walnutStaff.svg',
    category: 'combat',
    weaponType: 'staff',
    slot: 'mainHand',
    name: 'walnut staff',
    sellPrice: 400,
    description: 'What seems like a normal walnut staff',
    isWeapon: true,
    isEquippable: true,
    isTwoHanded: true,
    stats: {
      attack: 8,
      attackMax: 15,
      attackSpeed: SLOW_SPEED,
      accuracy: 18,
      magicPower: 21
    },
    extraStats: {
      attack: 3,
      attackMax: 3,
      accuracy: 7,
      magicPower: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 10
    }]
  },

  blue_trident: {
    id: 'blue_trident',
    icon: 'blueTrident.svg',
    category: 'combat',
    weaponType: 'staff',
    slot: 'mainHand',
    name: 'blue trident',
    sellPrice: 400,
    description: 'What seems like a normal walnut staff',
    isWeapon: true,
    isEquippable: true,
    isTwoHanded: true,
    stats: {
      attack: 8,
      attackMax: 15,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 19,
      magicPower: 12
    },
    enchantments: ['magic_blade'],
    extraStats: {
      attack: 3,
      attackMax: 3,
      accuracy: 7,
      magicPower: 1
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 10
    }]
  },

  obsidian_wand: {
    id: 'obsidian_wand',
    icon: 'obsidianWand.svg',
    category: 'combat',
    weaponType: 'wand',
    slot: 'mainHand',
    name: 'obsidian wand',
    sellPrice: 750,
    description: 'What seems like a obsidian wand',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 12,
      attackMax: 19,
      attackSpeed: SLOW_SPEED,
      accuracy: 18,
      magicPower: 12
    },
    extraStats: {
      attack: 3,
      attackMax: 3,
      accuracy: 7,
      magicPower: 1
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 15
    }]
  },


  obsidian_hammer: {
    id: 'obsidian_hammer',
    icon: 'obsidianHammer.svg',
    category: 'combat',
    weaponType: 'staff',
    slot: 'mainHand',
    name: 'obsidian hammer',
    sellPrice: 750,
    description: 'What seems like a obsidian hammer',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 12,
      attackMax: 19,
      attackSpeed: SLOW_SPEED,
      accuracy: 18,
      magicPower: 12,
      defense: 8  ,
      magicArmor: 40
    },
    extraStats: {
      attack: 3,
      attackMax: 3,
      accuracy: 7,
      magicPower: 1
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 15
    }]
  },

  mahogany_staff: {
    id: 'mahogany_staff',
    icon: 'mahoganyStaff.svg',
    category: 'combat',
    weaponType: 'staff',
    slot: 'mainHand',
    name: 'mahogany staff',
    sellPrice: 600,
    description: 'What seems like a normal mahogany staff',
    isWeapon: true,
    isEquippable: true,
    isTwoHanded: true,
    stats: {
      attack: 10,
      attackMax: 17,
      attackSpeed: SLOW_SPEED,
      accuracy: 23,
      healingPower: 8,
      magicPower: 19
    },
    extraStats: {
      attack: 3,
      attackMax: 3,
      accuracy: 7,
      magicPower: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 15
    }]
  },

  black_staff: {
    id: 'black_staff',
    icon: 'blackStaff.svg',
    category: 'combat',
    weaponType: 'staff',
    slot: 'mainHand',
    name: 'black staff',
    sellPrice: 1000,
    description: 'What seems like a normal black staff',
    isWeapon: true,
    isEquippable: true,
    isTwoHanded: true,
    stats: {
      attack: 15,
      attackMax: 25,
      attackSpeed: SLOW_SPEED,
      accuracy: 33,
      magicPower: 26
    },
    extraStats: {
      attack: 3,
      attackMax: 3,
      accuracy: 7,
      magicPower: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 20
    }]
  },

  blue_gum_staff: {
    id: 'blue_gum_staff',
    icon: 'blueGumStaff.svg',
    category: 'combat',
    weaponType: 'staff',
    slot: 'mainHand',
    name: 'blue gum staff',
    sellPrice: 1000,
    description: 'What seems like a normal blue gum staff',
    isWeapon: true,
    isEquippable: true,
    isTwoHanded: true,
    stats: {
      attack: 18,
      attackMax: 28,
      attackSpeed: SLOW_SPEED,
      accuracy: 33,
      healingPower: 8,
      magicPower: 26
    },
    extraStats: {
      attack: 3,
      attackMax: 3,
      accuracy: 7,
      magicPower: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 23
    }]
  },

  cedar_staff: {
    id: 'cedar_staff',
    icon: 'cedarStaff.svg',
    category: 'combat',
    weaponType: 'staff',
    slot: 'mainHand',
    name: 'cedar staff',
    sellPrice: 1000,
    description: 'What seems like a normal cedar staff',
    isWeapon: true,
    isEquippable: true,
    isTwoHanded: true,
    stats: {
      attack: 20,
      attackMax: 32,
      attackSpeed: SLOW_SPEED,
      accuracy: 39,
      magicPower: 30
    },
    extraStats: {
      attack: 3,
      attackMax: 3,
      accuracy: 7,
      magicPower: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 26
    }]
  },

  denya_staff: {
    id: 'denya_staff',
    icon: 'denyaStaff.svg',
    category: 'combat',
    weaponType: 'staff',
    slot: 'mainHand',
    name: 'denya staff',
    sellPrice: 1000,
    description: 'What seems like a normal denya staff',
    isWeapon: true,
    isEquippable: true,
    isTwoHanded: true,
    stats: {
      attack: 23,
      attackMax: 36,
      attackSpeed: SLOW_SPEED,
      healingPower: 8,
      accuracy: 40,
      magicPower: 32
    },
    extraStats: {
      attack: 3,
      attackMax: 3,
      accuracy: 7,
      magicPower: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 29
    }]
  },

  gombe_staff: {
    id: 'gombe_staff',
    icon: 'gombeStaff.svg',
    category: 'combat',
    weaponType: 'staff',
    slot: 'mainHand',
    name: 'gombe staff',
    sellPrice: 1000,
    description: 'What seems like a normal gombe staff',
    isWeapon: true,
    isEquippable: true,
    isTwoHanded: true,
    stats: {
      attack: 23,
      attackMax: 36,
      attackSpeed: SLOW_SPEED,
      healingPower: 8,
      accuracy: 40,
      magicPower: 34
    },
    extraStats: {
      attack: 3,
      attackMax: 3,
      accuracy: 7,
      magicPower: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 32
    }]
  },

  hickory_staff: {
    id: 'hickory_staff',
    icon: 'hickoryStaff.svg',
    category: 'combat',
    weaponType: 'staff',
    slot: 'mainHand',
    name: 'hickory staff',
    sellPrice: 2000,
    description: 'What seems like a normal hickory staff',
    isWeapon: true,
    isEquippable: true,
    isTwoHanded: true,
    stats: {
      attack: 24,
      attackMax: 40,
      attackSpeed: SLOW_SPEED,
      accuracy: 50,
      magicPower: 36
    },
    extraStats: {
      attack: 3,
      attackMax: 3,
      accuracy: 7,
      magicPower: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 36
    }]
  },

  larch_staff: {
    id: 'larch_staff',
    icon: 'larchStaff.svg',
    category: 'combat',
    weaponType: 'staff',
    slot: 'mainHand',
    name: 'larch staff',
    sellPrice: 2000,
    description: 'What seems like a normal larch staff',
    isWeapon: true,
    isEquippable: true,
    isTwoHanded: true,
    stats: {
      attack: 24,
      attackMax: 40,
      attackSpeed: SLOW_SPEED,
      healingPower: 8,
      accuracy: 50,
      magicPower: 38
    },
    extraStats: {
      attack: 3,
      attackMax: 3,
      accuracy: 7,
      magicPower: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 39
    }]
  },

  poplar_staff: {
    id: 'poplar_staff',
    icon: 'poplarStaff.svg',
    category: 'combat',
    weaponType: 'staff',
    slot: 'mainHand',
    name: 'poplar staff',
    sellPrice: 2000,
    description: 'What seems like a normal poplar staff',
    isWeapon: true,
    isEquippable: true,
    isTwoHanded: true,
    stats: {
      attack: 26,
      attackMax: 42,
      attackSpeed: SLOW_SPEED,
      accuracy: 56,
      magicPower: 40
    },
    extraStats: {
      attack: 3,
      attackMax: 3,
      accuracy: 7,
      magicPower: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 42
    }]
  },

  tali_staff: {
    id: 'tali_staff',
    icon: 'taliStaff.svg',
    category: 'combat',
    weaponType: 'staff',
    slot: 'mainHand',
    name: 'tali staff',
    sellPrice: 2000,
    description: 'What seems like a normal tali staff',
    isWeapon: true,
    isEquippable: true,
    isTwoHanded: true,
    stats: {
      attack: 26,
      attackMax: 42,
      attackSpeed: SLOW_SPEED,
      accuracy: 56,
      healingPower: 8,
      magicPower: 42
    },
    extraStats: {
      attack: 3,
      attackMax: 3,
      accuracy: 7,
      magicPower: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 45
    }]
  },

  willow_staff: {
    id: 'willow_staff',
    icon: 'willowStaff.svg',
    category: 'combat',
    weaponType: 'staff',
    slot: 'mainHand',
    name: 'willow staff',
    sellPrice: 2000,
    description: 'What seems like a normal willow staff',
    isWeapon: true,
    isEquippable: true,
    isTwoHanded: true,
    stats: {
      attack: 30,
      attackMax: 50,
      attackSpeed: SLOW_SPEED,
      accuracy: 60,
      magicPower: 50
    },
    extraStats: {
      attack: 3,
      attackMax: 3,
      accuracy: 7,
      magicPower: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 48
    }]
  },

  teak_staff: {
    id: 'teak_staff',
    icon: 'teakStaff.svg',
    category: 'combat',
    weaponType: 'staff',
    slot: 'mainHand',
    name: 'teak staff',
    sellPrice: 2000,
    description: 'What seems like a normal teak staff',
    isWeapon: true,
    isEquippable: true,
    isTwoHanded: true,
    stats: {
      attack: 35,
      attackMax: 50,
      attackSpeed: SLOW_SPEED,
      accuracy: 60,
      healingPower: 8,
      magicPower: 55
    },
    extraStats: {
      attack: 3,
      attackMax: 3,
      accuracy: 7,
      magicPower: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 51
    }]
  },

  mithril_wand: {
    id: 'mithril_wand',
    icon: 'mithrilWand.svg',
    category: 'combat',
    weaponType: 'wand',
    slot: 'mainHand',
    name: 'mithril wand',
    sellPrice: 1150,
    description: 'What seems like a mithril wand',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 14,
      attackMax: 24,
      attackSpeed: SLOW_SPEED,
      accuracy: 24,
      magicPower: 16
    },
    extraStats: {
      attack: 3,
      attackMax: 3,
      accuracy: 7,
      magicPower: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 20
    }]
  },

  mithril_hammer: {
    id: 'mithril_hammer',
    icon: 'mithrilHammer.svg',
    category: 'combat',
    weaponType: 'staff',
    slot: 'mainHand',
    name: 'mithril hammer',
    sellPrice: 1150,
    description: 'What seems like a mithril hammer',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 14,
      attackMax: 24,
      attackSpeed: SLOW_SPEED,
      accuracy: 24,
      magicPower: 16,
      magicArmor: 50,
      defense: 12
    },
    extraStats: {
      attack: 3,
      attackMax: 3,
      accuracy: 7,
      magicPower: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 20
    }]
  },

  purple_trident: {
    id: 'purple_trident',
    icon: 'purpleTrident.svg',
    category: 'combat',
    weaponType: 'staff',
    slot: 'mainHand',
    name: 'purple trident',
    sellPrice: 1000,
    description: 'A sharp trident, beaming with magical energy',
    isWeapon: true,
    isEquippable: true,
    isTwoHanded: true,
    stats: {
      attack: 15,
      attackMax: 25,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 39,
      magicPower: 28,
    },
    extraStats: {
      attack: 3,
      attackMax: 3,
      accuracy: 7,
      magicPower: 2
    },
    enchantments: ['magic_blade'],
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 20
    }]
  },

  dwarven_staff: {
    id: 'dwarven_staff',
    icon: 'dwarvenStaff.svg',
    category: 'combat',
    weaponType: 'staff',
    slot: 'mainHand',
    name: 'dwarven staff',
    sellPrice: 1400,
    description: 'A staff from an old dwarf',
    isWeapon: true,
    isEquippable: true,
    isTwoHanded: true,
    stats: {
      attack: 15,
      attackMax: 25,
      attackSpeed: SLOW_SPEED,
      accuracy: 30,
      magicPower: 35,
      defense: -20
    },
    extraStats: {
      attack: 3,
      attackMax: 3,
      accuracy: 7,
      magicPower: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 20
    }]
  },

  ruby_staff: {
    id: 'ruby_staff',
    icon: 'rubyStaff.svg',
    category: 'combat',
    weaponType: 'staff',
    slot: 'mainHand',
    name: 'ruby staff',
    sellPrice: 2400,
    description: 'The ruby lusts for blood',
    isWeapon: true,
    isEquippable: true,
    isTwoHanded: true,
    stats: {
      attack: 15,
      attackMax: 25,
      attackSpeed: SLOW_SPEED,
      accuracy: 25,
      magicPower: 43,
      defense: -30,
      armor: -25,
      healthMax: 100
    },
    extraStats: {
      attack: 3,
      attackMax: 3,
      accuracy: 7,
      magicPower: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 25
    }]
  }
}
