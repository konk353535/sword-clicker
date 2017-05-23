import { VERY_FAST_SPEED, FAST_SPEED, MEDIUM_SPEED, SLOW_SPEED } from '/server/constants/combat/attackSpeeds';

export const CURSED_ITEMS = {
  cursed_dagger: {
    id: 'cursed_dagger',
    icon: 'cursedDagger',
    category: 'combat',
    weaponType: 'dagger',
    slot: 'mainHand',
    name: 'cursed dagger',
    sellPrice: 1300,
    description: 'An okay dagger.',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 9,
      attackMax: 22,
      attackSpeed: VERY_FAST_SPEED,
      accuracy: 25
    },
    extraStats: {
      attack: 2,
      attackMax: 2,
      accuracy: 6
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 45
    }]
  },

  cursed_spear: {
    id: 'cursed_spear',
    icon: 'cursedSpear',
    category: 'combat',
    weaponType: 'spear',
    slot: 'mainHand',
    name: 'cursed spear',
    sellPrice: 1300,
    description: 'Often used for defense',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 19,
      attackMax: 32,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 30,
      defense: 40
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
      level: 45
    }]
  },

  cursed_short_sword: {
    id: 'cursed_short_sword',
    icon: 'cursedShortSword',
    category: 'combat',
    weaponType: 'shortSword',
    slot: 'mainHand',
    name: 'cursed short sword',
    sellPrice: 1300,
    description: 'A good balance between offense and defense',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 23,
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
      level: 45
    }]
  },

  cursed_scimitar: {
    id: 'cursed_scimitar',
    icon: 'cursedScimitarSword',
    category: 'combat',
    weaponType: 'shortSword',
    slot: 'mainHand',
    name: 'cursed scimitar',
    sellPrice: 1300,
    description: 'A good balance between offense and defense',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 28,
      attackMax: 42,
      attackSpeed: FAST_SPEED,
      accuracy: 46,
    },
    extraStats: {
      attack: 2,
      attackMax: 3,
      accuracy: 4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 45
    }]
  },

  cursed_broad_sword: {
    id: 'cursed_broad_sword',
    icon: 'cursedBroadSword',
    category: 'combat',
    weaponType: 'longSword',
    slot: 'mainHand',
    name: 'cursed broad sword',
    sellPrice: 1300,
    description: 'A pure offensive weapon',
    isTwoHanded: true,
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 43,
      attackMax: 58,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 57,
    },
    extraStats: {
      attack: 3,
      attackMax: 3,
      accuracy: 3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 45
    }]
  },

  cursed_long_sword: {
    id: 'cursed_long_sword',
    icon: 'cursedLongSword',
    category: 'combat',
    weaponType: 'longSword',
    slot: 'mainHand',
    name: 'cursed long sword',
    sellPrice: 1300,
    description: 'A pure offensive weapon',
    isTwoHanded: true,
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 35,
      attackMax: 48,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 48,
    },
    extraStats: {
      attack: 4,
      attackMax: 5,
      accuracy: 5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 45
    }]
  },

  cursed_battle_axe: {
    id: 'cursed_battle_axe',
    icon: 'cursedBattleAxe',
    category: 'combat',
    weaponType: 'battleAxe',
    slot: 'mainHand',
    name: 'cursed battle axe',
    sellPrice: 1300,
    description: 'A slow pure offensive weapon.',
    isTwoHanded: true,
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 36,
      attackMax: 99,
      attackSpeed: SLOW_SPEED,
      accuracy: 36,
    },
    extraStats: {
      attack: 4,
      attackMax: 18
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 45
    }]
  },

  cursed_helmet: {
    id: 'cursed_helmet',
    icon: 'cursedHelmet',
    category: 'combat',
    slot: 'head',
    name: 'cursed helmet',
    sellPrice: 1300,
    description: 'Protect your head',
    isEquippable: true,
    stats: {
      healthMax: 25,
      defense: 23,
      armor: 48
    },
    extraStats: {
      healthMax: 2,
      defense: 2,
      armor: 7
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 45
    }]
  },

  cursed_horned_helmet: {
    id: 'cursed_horned_helmet',
    icon: 'cursedHornedHelmet',
    category: 'combat',
    slot: 'head',
    name: 'cursed horned helmet',
    sellPrice: 1300,
    description: 'Headbut your enemies',
    isEquippable: true,
    stats: {
      healthMax: 11,
      armor: 13,
      attack: 13,
      attackMax: 13,
      accuracy: 13
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
      level: 45
    }]
  },

  cursed_chest_plate: {
    id: 'cursed_chest_plate',
    icon: 'cursedChestPlate',
    category: 'combat',
    slot: 'chest',
    name: 'cursed chestplate',
    sellPrice: 700,
    description: 'Protect your heart',
    isEquippable: true,
    stats: {
      healthMax: 21,
      defense: 25,
      armor: 55
    },
    extraStats: {
      healthMax: 2,
      defense: 4,
      armor: 10
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 45
    }]
  },

  cursed_plate_legs: {
    id: 'cursed_plate_legs',
    icon: 'cursedPlateLegs',
    category: 'combat',
    slot: 'legs',
    name: 'cursed platelegs',
    sellPrice: 1300,
    description: 'Protect your legs',
    isEquippable: true,
    stats: {
      healthMax: 23,
      defense: 22,
      armor: 45
    },
    extraStats: {
      healthMax: 2,
      defense: 2,
      armor: 5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 45
    }]
  },

  cursed_shield: {
    id: 'cursed_shield',
    icon: 'cursedShield',
    category: 'combat',
    slot: 'offHand',
    name: 'cursed shield',
    sellPrice: 1300,
    description: 'Provides large defense bonuses',
    isEquippable: true,
    stats: {
      healthMax: 43,
      defense: 22,
      armor: 87
    },
    extraStats: {
      healthMax: 6,
      defense: 4,
      armor: 13
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 45
    }]
  }
}
