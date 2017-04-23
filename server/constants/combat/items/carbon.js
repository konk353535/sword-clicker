import { VERY_FAST_SPEED, FAST_SPEED, MEDIUM_SPEED, SLOW_SPEED } from '/server/constants/combat/attackSpeeds';

export const CARBON_ITEMS = {
  carbon_dagger: {
    id: 'carbon_dagger',
    icon: 'carbonDagger',
    category: 'combat',
    weaponType: 'dagger',
    slot: 'mainHand',
    name: 'carbon dagger',
    sellPrice: 700,
    description: 'An okay dagger.',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 5,
      attackMax: 7,
      attackSpeed: FAST_SPEED,
      accuracy: 7
    },
    extraStats: {
      attack: 4,
      attackMax: 4,
      accuracy: 9
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 15
    }]
  },

  carbon_spear: {
    id: 'carbon_spear',
    icon: 'carbonSpear',
    category: 'combat',
    weaponType: 'spear',
    slot: 'mainHand',
    name: 'carbon spear',
    sellPrice: 800,
    description: 'Often used for defense',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 7,
      attackMax: 10,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 8,
      defense: 28
    },
    extraStats: {
      attack: 4,
      attackMax: 5,
      accuracy: 8,
      defense: 14
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 15
    }]
  },

  carbon_short_sword: {
    id: 'carbon_short_sword',
    icon: 'carbonShortSword',
    category: 'combat',
    weaponType: 'shortSword',
    slot: 'mainHand',
    name: 'carbon short sword',
    sellPrice: 800,
    description: 'A good balance between offense and defense',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 7,
      attackMax: 13,
      attackSpeed: FAST_SPEED,
      accuracy: 11,
    },
    extraStats: {
      attack: 6,
      attackMax: 7,
      accuracy: 12
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 15
    }]
  },


  carbon_scimitar: {
    id: 'carbon_scimitar',
    icon: 'carbonScimitarSword',
    category: 'combat',
    weaponType: 'shortSword',
    slot: 'mainHand',
    name: 'carbon scimitar',
    sellPrice: 800,
    description: 'A good balance between offense and defense',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 10,
      attackMax: 17,
      attackSpeed: FAST_SPEED,
      accuracy: 14,
    },
    extraStats: {
      attack: 8,
      attackMax: 10,
      accuracy: 16
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 20
    }]
  },

  carbon_broad_sword: {
    id: 'carbon_broad_sword',
    icon: 'carbonBroadSword',
    category: 'combat',
    weaponType: 'longSword',
    slot: 'mainHand',
    name: 'carbon broad sword',
    sellPrice: 800,
    description: 'A pure offensive weapon',
    isTwoHanded: true,
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 17,
      attackMax: 25,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 25,
    },
    extraStats: {
      attack: 11,
      attackMax: 14,
      accuracy: 14
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 20
    }]
  },

  carbon_long_sword: {
    id: 'carbon_long_sword',
    icon: 'carbonLongSword',
    category: 'combat',
    weaponType: 'longSword',
    slot: 'mainHand',
    name: 'carbon long sword',
    sellPrice: 800,
    description: 'A pure offensive weapon',
    isTwoHanded: true,
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 14,
      attackMax: 21,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 21,
    },
    extraStats: {
      attack: 9,
      attackMax: 12,
      accuracy: 12
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 15
    }]
  },

  carbon_battle_axe: {
    id: 'carbon_battle_axe',
    icon: 'carbonBattleAxe',
    category: 'combat',
    weaponType: 'battleAxe',
    slot: 'mainHand',
    name: 'carbon battle axe',
    sellPrice: 500,
    description: 'A slow pure offensive weapon.',
    isTwoHanded: true,
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 15,
      attackMax: 48,
      attackSpeed: SLOW_SPEED,
      accuracy: 20,
    },
    extraStats: {
      attack: 7,
      attackMax: 30
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 15
    }]
  },

  carbon_horned_helmet: {
    id: 'carbon_horned_helmet',
    icon: 'carbonHornedHelmet',
    category: 'combat',
    slot: 'head',
    name: 'carbon horned helmet',
    sellPrice: 400,
    description: 'Headbut your enemies',
    isEquippable: true,
    stats: {
      healthMax: 3,
      armor: 4,
      attack: 4,
      attackMax: 4,
      accuracy: 4
    },
    extraStats: {
      healthMax: 3,
      armor: 4,
      attack: 4,
      attackMax: 4,
      accuracy: 4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 15
    }]
  },

  carbon_helmet: {
    id: 'carbon_helmet',
    icon: 'carbonHelmet',
    category: 'combat',
    slot: 'head',
    name: 'carbon helmet',
    sellPrice: 400,
    description: 'Protect your head',
    isEquippable: true,
    stats: {
      healthMax: 7,
      defense: 8,
      armor: 20
    },
    extraStats: {
      healthMax: 7,
      defense: 6,
      armor: 10
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 15
    }]
  },

  carbon_chest_plate: {
    id: 'carbon_chest_plate',
    icon: 'carbonChestPlate',
    category: 'combat',
    slot: 'chest',
    name: 'carbon chestplate',
    sellPrice: 600,
    description: 'Protect your heart',
    isEquippable: true,
    stats: {
      healthMax: 6,
      defense: 6,
      armor: 19
    },
    extraStats: {
      healthMax: 7,
      defense: 10,
      armor: 20
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 15
    }]
  },

  carbon_plate_legs: {
    id: 'carbon_plate_legs',
    icon: 'carbonPlateLegs',
    category: 'combat',
    slot: 'legs',
    name: 'carbon platelegs',
    sellPrice: 400,
    description: 'Protect your legs',
    isEquippable: true,
    stats: {
      healthMax: 6,
      defense: 6,
      armor: 16
    },
    extraStats: {
      healthMax: 7,
      defense: 7,
      armor: 19
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 15
    }]
  },

  carbon_shield: {
    id: 'carbon_shield',
    icon: 'carbonShield',
    category: 'combat',
    slot: 'offHand',
    name: 'carbon shield',
    sellPrice: 250,
    description: 'Provides large defense bonuses',
    isEquippable: true,
    stats: {
      healthMax: 12,
      defense: 6,
      armor: 35
    },
    extraStats: {
      healthMax: 14,
      defense: 9,
      armor: 19
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 15
    }]
  }
}
