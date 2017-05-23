import { VERY_FAST_SPEED, FAST_SPEED, MEDIUM_SPEED, SLOW_SPEED } from '/server/constants/combat/attackSpeeds';

export const COBALT_ITEMS = {
  cobalt_dagger: {
    id: 'cobalt_dagger',
    icon: 'cobaltDagger',
    category: 'combat',
    weaponType: 'dagger',
    slot: 'mainHand',
    name: 'cobalt dagger',
    sellPrice: 1000,
    description: 'An okay dagger.',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 7,
      attackMax: 19,
      attackSpeed: VERY_FAST_SPEED,
      accuracy: 21
    },
    extraStats: {
      attack: 2,
      attackMax: 2,
      accuracy: 6
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 35
    }]
  },

  cobalt_spear: {
    id: 'cobalt_spear',
    icon: 'cobaltSpear',
    category: 'combat',
    weaponType: 'spear',
    slot: 'mainHand',
    name: 'cobalt spear',
    sellPrice: 1000,
    description: 'Often used for defense',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 17,
      attackMax: 28,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 26,
      defense: 32
    },
    extraStats: {
      attack: 2,
      attackMax: 2,
      accuracy: 2,
      defense: 6
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 35
    }]
  },

  cobalt_short_sword: {
    id: 'cobalt_short_sword',
    icon: 'cobaltShortSword',
    category: 'combat',
    weaponType: 'shortSword',
    slot: 'mainHand',
    name: 'cobalt short sword',
    sellPrice: 1000,
    description: 'A good balance between offense and defense',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 19,
      attackMax: 31,
      attackSpeed: FAST_SPEED,
      accuracy: 35,
    },
    extraStats: {
      attack: 2,
      attackMax: 3,
      accuracy: 4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 35
    }]
  },

  cobalt_scimitar: {
    id: 'cobalt_scimitar',
    icon: 'cobaltScimitarSword',
    category: 'combat',
    weaponType: 'shortSword',
    slot: 'mainHand',
    name: 'cobalt scimitar',
    sellPrice: 1000,
    description: 'A good balance between offense and defense',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 24,
      attackMax: 36,
      attackSpeed: FAST_SPEED,
      accuracy: 40,
    },
    extraStats: {
      attack: 2,
      attackMax: 3,
      accuracy: 4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 35
    }]
  },

  cobalt_broad_sword: {
    id: 'cobalt_broad_sword',
    icon: 'cobaltBroadSword',
    category: 'combat',
    weaponType: 'longSword',
    slot: 'mainHand',
    name: 'cobalt broad sword',
    sellPrice: 1000,
    description: 'A pure offensive weapon',
    isTwoHanded: true,
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 38,
      attackMax: 51,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 51,
    },
    extraStats: {
      attack: 3,
      attackMax: 3,
      accuracy: 3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 35
    }]
  },

  cobalt_long_sword: {
    id: 'cobalt_long_sword',
    icon: 'cobaltLongSword',
    category: 'combat',
    weaponType: 'longSword',
    slot: 'mainHand',
    name: 'cobalt long sword',
    sellPrice: 1000,
    description: 'A pure offensive weapon',
    isTwoHanded: true,
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 31,
      attackMax: 42,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 42,
    },
    extraStats: {
      attack: 4,
      attackMax: 5,
      accuracy: 5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 35
    }]
  },

  cobalt_battle_axe: {
    id: 'cobalt_battle_axe',
    icon: 'cobaltBattleAxe',
    category: 'combat',
    weaponType: 'battleAxe',
    slot: 'mainHand',
    name: 'cobalt battle axe',
    sellPrice: 1000,
    description: 'A slow pure offensive weapon.',
    isTwoHanded: true,
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 30,
      attackMax: 90,
      attackSpeed: SLOW_SPEED,
      accuracy: 31,
    },
    extraStats: {
      attack: 4,
      attackMax: 17
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 35
    }]
  },

  cobalt_helmet: {
    id: 'cobalt_helmet',
    icon: 'cobaltHelmet',
    category: 'combat',
    slot: 'head',
    name: 'cobalt helmet',
    sellPrice: 1000,
    description: 'Protect your head',
    isEquippable: true,
    stats: {
      healthMax: 21,
      defense: 19,
      armor: 43
    },
    extraStats: {
      healthMax: 2,
      defense: 2,
      armor: 7
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 35
    }]
  },

  cobalt_horned_helmet: {
    id: 'cobalt_horned_helmet',
    icon: 'cobaltHornedHelmet',
    category: 'combat',
    slot: 'head',
    name: 'cobalt horned helmet',
    sellPrice: 1000,
    description: 'Headbut your enemies',
    isEquippable: true,
    stats: {
      healthMax: 9,
      armor: 11,
      attack: 11,
      attackMax: 11,
      accuracy: 11
    },
    extraStats: {
      healthMax: 2,
      armor: 2,
      attack: 2,
      attackMax: 2,
      accuracy: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 35
    }]
  },

  cobalt_chest_plate: {
    id: 'cobalt_chest_plate',
    icon: 'cobaltChestPlate',
    category: 'combat',
    slot: 'chest',
    name: 'cobalt chestplate',
    sellPrice: 700,
    description: 'Protect your heart',
    isEquippable: true,
    stats: {
      healthMax: 18,
      defense: 22,
      armor: 47
    },
    extraStats: {
      healthMax: 2,
      defense: 4,
      armor: 10
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 35
    }]
  },

  cobalt_plate_legs: {
    id: 'cobalt_plate_legs',
    icon: 'cobaltPlateLegs',
    category: 'combat',
    slot: 'legs',
    name: 'cobalt platelegs',
    sellPrice: 1000,
    description: 'Protect your legs',
    isEquippable: true,
    stats: {
      healthMax: 19,
      defense: 19,
      armor: 39
    },
    extraStats: {
      healthMax: 2,
      defense: 2,
      armor: 5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 35
    }]
  },

  cobalt_shield: {
    id: 'cobalt_shield',
    icon: 'cobaltShield',
    category: 'combat',
    slot: 'offHand',
    name: 'cobalt shield',
    sellPrice: 1000,
    description: 'Provides large defense bonuses',
    isEquippable: true,
    stats: {
      healthMax: 39,
      defense: 19,
      armor: 75
    },
    extraStats: {
      healthMax: 6,
      defense: 4,
      armor: 13
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 35
    }]
  }
}
