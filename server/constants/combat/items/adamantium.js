import { VERY_FAST_SPEED, FAST_SPEED, MEDIUM_SPEED, SLOW_SPEED } from '/server/constants/combat/attackSpeeds';

export const ADAMANTIUM_ITEMS = {
  adamantium_dagger: {
    id: 'adamantium_dagger',
    icon: 'adamantiumDagger',
    category: 'combat',
    weaponType: 'dagger',
    slot: 'mainHand',
    name: 'adamantium dagger',
    sellPrice: 500,
    description: 'An okay dagger.',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 5,
      attackMax: 16,
      attackSpeed: VERY_FAST_SPEED,
      accuracy: 18
    },
    extraStats: {
      attack: 2,
      attackMax: 2,
      accuracy: 6
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 25
    }]
  },

  adamantium_spear: {
    id: 'adamantium_spear',
    icon: 'adamantiumSpear',
    category: 'combat',
    weaponType: 'spear',
    slot: 'mainHand',
    name: 'adamantium spear',
    sellPrice: 750,
    description: 'Often used for defense',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 15,
      attackMax: 24,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 22,
      defense: 24
    },
    extraStats: {
      attack: 2,
      attackMax: 2,
      accuracy: 2,
      defense: 4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 25
    }]
  },

  adamantium_short_sword: {
    id: 'adamantium_short_sword',
    icon: 'adamantiumShortSword',
    category: 'combat',
    weaponType: 'shortSword',
    slot: 'mainHand',
    name: 'adamantium short sword',
    sellPrice: 750,
    description: 'A good balance between offense and defense',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 17,
      attackMax: 27,
      attackSpeed: FAST_SPEED,
      accuracy: 30,
    },
    extraStats: {
      attack: 2,
      attackMax: 2,
      accuracy: 3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 25
    }]
  },

  adamantium_scimitar: {
    id: 'adamantium_scimitar',
    icon: 'adamantiumScimitarSword',
    category: 'combat',
    weaponType: 'shortSword',
    slot: 'mainHand',
    name: 'adamantium scimitar',
    sellPrice: 1000,
    description: 'A good balance between offense and defense',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 20,
      attackMax: 30,
      attackSpeed: FAST_SPEED,
      accuracy: 34,
    },
    extraStats: {
      attack: 2,
      attackMax: 2,
      accuracy: 3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 25
    }]
  },

  adamantium_broad_sword: {
    id: 'adamantium_broad_sword',
    icon: 'adamantiumBroadSword',
    category: 'combat',
    weaponType: 'longSword',
    slot: 'mainHand',
    name: 'adamantium broad sword',
    sellPrice: 1000,
    description: 'A pure offensive weapon',
    isTwoHanded: true,
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 32,
      attackMax: 44,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 44,
    },
    extraStats: {
      attack: 2,
      attackMax: 2,
      accuracy: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 25
    }]
  },

  adamantium_long_sword: {
    id: 'adamantium_long_sword',
    icon: 'adamantiumLongSword',
    category: 'combat',
    weaponType: 'longSword',
    slot: 'mainHand',
    name: 'adamantium long sword',
    sellPrice: 1000,
    description: 'A pure offensive weapon',
    isTwoHanded: true,
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 27,
      attackMax: 37,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 37,
    },
    extraStats: {
      attack: 3,
      attackMax: 4,
      accuracy: 4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 25
    }]
  },

  adamantium_battle_axe: {
    id: 'adamantium_battle_axe',
    icon: 'adamantiumBattleAxe',
    category: 'combat',
    weaponType: 'battleAxe',
    slot: 'mainHand',
    name: 'adamantium battle axe',
    sellPrice: 750,
    description: 'A slow pure offensive weapon.',
    isTwoHanded: true,
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 26,
      attackMax: 80,
      attackSpeed: SLOW_SPEED,
      accuracy: 27,
    },
    extraStats: {
      attack: 3,
      attackMax: 14
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 25
    }]
  },

  adamantium_helmet: {
    id: 'adamantium_helmet',
    icon: 'adamantiumHelmet',
    category: 'combat',
    slot: 'head',
    name: 'adamantium helmet',
    sellPrice: 500,
    description: 'Protect your head',
    isEquippable: true,
    stats: {
      healthMax: 18,
      defense: 17,
      armor: 37
    },
    extraStats: {
      healthMax: 2,
      defense: 2,
      armor: 6
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 25
    }]
  },

  adamantium_horned_helmet: {
    id: 'adamantium_horned_helmet',
    icon: 'adamantiumHornedHelmet',
    category: 'combat',
    slot: 'head',
    name: 'adamantium horned helmet',
    sellPrice: 500,
    description: 'Headbut your enemies',
    isEquippable: true,
    stats: {
      healthMax: 7,
      armor: 9,
      attack: 9,
      attackMax: 9,
      accuracy: 9
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
      level: 25
    }]
  },

  adamantium_chest_plate: {
    id: 'adamantium_chest_plate',
    icon: 'adamantiumChestPlate',
    category: 'combat',
    slot: 'chest',
    name: 'adamantium chestplate',
    sellPrice: 700,
    description: 'Protect your heart',
    isEquippable: true,
    stats: {
      healthMax: 16,
      defense: 19,
      armor: 41
    },
    extraStats: {
      healthMax: 2,
      defense: 4,
      armor: 10
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 25
    }]
  },

  adamantium_plate_legs: {
    id: 'adamantium_plate_legs',
    icon: 'adamantiumPlateLegs',
    category: 'combat',
    slot: 'legs',
    name: 'adamantium platelegs',
    sellPrice: 500,
    description: 'Protect your legs',
    isEquippable: true,
    stats: {
      healthMax: 17,
      defense: 17,
      armor: 33
    },
    extraStats: {
      healthMax: 2,
      defense: 2,
      armor: 4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 25
    }]
  },

  adamantium_shield: {
    id: 'adamantium_shield',
    icon: 'adamantiumShield',
    category: 'combat',
    slot: 'offHand',
    name: 'adamantium shield',
    sellPrice: 500,
    description: 'Provides large defense bonuses',
    isEquippable: true,
    stats: {
      healthMax: 33,
      defense: 16,
      armor: 60
    },
    extraStats: {
      healthMax: 6,
      defense: 4,
      armor: 11
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 25
    }]
  }
}
