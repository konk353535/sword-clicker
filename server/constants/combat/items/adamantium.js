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
      attack: 12,
      attackMax: 15,
      attackSpeed: FAST_SPEED,
      accuracy: 15
    },
    extraStats: {
      attack: 6,
      attackMax: 6,
      accuracy: 12
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
      attackMax: 19,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 15,
      defense: 44
    },
    extraStats: {
      attack: 6,
      attackMax: 10,
      accuracy: 12,
      defense: 18
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
      attack: 15,
      attackMax: 22,
      attackSpeed: FAST_SPEED,
      accuracy: 19,
    },
    extraStats: {
      attack: 8,
      attackMax: 10,
      accuracy: 16
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 30
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
      attack: 17,
      attackMax: 26,
      attackSpeed: FAST_SPEED,
      accuracy: 23,
    },
    extraStats: {
      attack: 8,
      attackMax: 10,
      accuracy: 16
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 30
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
      attack: 26,
      attackMax: 33,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 33,
    },
    extraStats: {
      attack: 11,
      attackMax: 14,
      accuracy: 14
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 30
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
      attack: 22,
      attackMax: 30,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 30,
    },
    extraStats: {
      attack: 11,
      attackMax: 14,
      accuracy: 14
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
      attack: 23,
      attackMax: 63,
      attackSpeed: SLOW_SPEED,
      accuracy: 30,
    },
    extraStats: {
      attack: 9,
      attackMax: 35
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
      healthMax: 12,
      defense: 13,
      armor: 31
    },
    extraStats: {
      healthMax: 10,
      defense: 8,
      armor: 14
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
      armor: 7,
      attack: 8,
      attackMax: 8,
      accuracy: 8
    },
    extraStats: {
      healthMax: 4,
      armor: 5,
      attack: 5,
      attackMax: 5,
      accuracy: 5
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
      healthMax: 11,
      defense: 11,
      armor: 29
    },
    extraStats: {
      healthMax: 9,
      defense: 14,
      armor: 25
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
      healthMax: 12,
      defense: 12,
      armor: 25
    },
    extraStats: {
      healthMax: 10,
      defense: 10,
      armor: 24
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
      healthMax: 23,
      defense: 14,
      armor: 60
    },
    extraStats: {
      healthMax: 20,
      defense: 11,
      armor: 24
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 25
    }]
  }
}
