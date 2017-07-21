import { VERY_FAST_SPEED, FAST_SPEED, MEDIUM_SPEED, SLOW_SPEED } from '/server/constants/combat/attackSpeeds';

export const STAFF_ITEMS = {
  /* Wands - Same as staffs but 1h, less magic power */

  copper_wand: {
    id: 'copper_wand',
    icon: 'copperWand',
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
    icon: 'copperHammer',
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
    icon: 'beechStaff',
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
      accuracy: 5,
      magicPower: 10
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
    icon: 'oakStaff',
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
      magicPower: 13
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
    icon: 'brownTrident',
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
    icon: 'goldWand',
    category: 'combat',
    weaponType: 'wand',
    slot: 'mainHand',
    name: 'gold wand',
    sellPrice: 50,
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
    icon: 'goldHammer',
    category: 'combat',
    weaponType: 'staff',
    slot: 'mainHand',
    name: 'gold hammer',
    sellPrice: 50,
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
    icon: 'walnutStaff',
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
      accuracy: 15,
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
      level: 10
    }]
  },

  blue_trident: {
    id: 'blue_trident',
    icon: 'blueTrident',
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
    icon: 'obsidianWand',
    category: 'combat',
    weaponType: 'wand',
    slot: 'mainHand',
    name: 'obsidian wand',
    sellPrice: 50,
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
    icon: 'obsidianHammer',
    category: 'combat',
    weaponType: 'staff',
    slot: 'mainHand',
    name: 'obsidian hammer',
    sellPrice: 50,
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
    icon: 'mahoganyStaff',
    category: 'combat',
    weaponType: 'staff',
    slot: 'mainHand',
    name: 'mahogany staff',
    sellPrice: 400,
    description: 'What seems like a normal mahogany staff',
    isWeapon: true,
    isEquippable: true,
    isTwoHanded: true,
    stats: {
      attack: 10,
      attackMax: 17,
      attackSpeed: SLOW_SPEED,
      accuracy: 23,
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

  fiery_staff: {
    id: 'fiery_staff',
    icon: 'fieryStaff',
    category: 'combat',
    weaponType: 'staff',
    slot: 'mainHand',
    name: 'fiery staff',
    sellPrice: 400,
    description: 'What seems like a normal fiery staff',
    isWeapon: true,
    isEquippable: true,
    isTwoHanded: true,
    stats: {
      attack: 15,
      attackMax: 25,
      attackSpeed: SLOW_SPEED,
      accuracy: 30,
      magicPower: 24
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

  mithril_wand: {
    id: 'mithril_wand',
    icon: 'mithrilWand',
    category: 'combat',
    weaponType: 'wand',
    slot: 'mainHand',
    name: 'mithril wand',
    sellPrice: 50,
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
    icon: 'mithrilHammer',
    category: 'combat',
    weaponType: 'staff',
    slot: 'mainHand',
    name: 'mithril hammer',
    sellPrice: 50,
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
    icon: 'purpleTrident',
    category: 'combat',
    weaponType: 'staff',
    slot: 'mainHand',
    name: 'purple trident',
    sellPrice: 400,
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
    icon: 'dwarvenStaff',
    category: 'combat',
    weaponType: 'staff',
    slot: 'mainHand',
    name: 'dwarven staff',
    sellPrice: 400,
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
    icon: 'rubyStaff',
    category: 'combat',
    weaponType: 'staff',
    slot: 'mainHand',
    name: 'ruby staff',
    sellPrice: 400,
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
