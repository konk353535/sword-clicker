import { VERY_FAST_SPEED, FAST_SPEED, MEDIUM_SPEED, SLOW_SPEED } from '/server/constants/combat/attackSpeeds';

export const CARBON_ITEMS = {
  carbon_dagger: {
    id: 'carbon_dagger',
    icon: 'carbonDagger',
    category: 'combat',
    weaponType: 'dagger',
    slot: 'mainHand',
    name: 'carbon dagger',
    sellPrice: 350,
    description: 'An okay dagger.',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 5,
      attackMax: 7,
      attackSpeed: VERY_FAST_SPEED,
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
    sellPrice: 350,
    description: 'Often used for defense',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 7,
      attackMax: 11,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 9,
      defense: 18
    },
    extraStats: {
      attack: 4,
      attackMax: 4,
      accuracy: 6,
      defense: 7
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
    sellPrice: 350,
    description: 'A good balance between offense and defense',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 10,
      attackMax: 16,
      attackSpeed: FAST_SPEED,
      accuracy: 15,
    },
    extraStats: {
      attack: 3,
      attackMax: 4,
      accuracy: 8
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
    sellPrice: 350,
    description: 'A good balance between offense and defense',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 14,
      attackMax: 22,
      attackSpeed: FAST_SPEED,
      accuracy: 22,
    },
    extraStats: {
      attack: 4,
      attackMax: 5,
      accuracy: 8
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
    sellPrice: 350,
    description: 'A pure offensive weapon',
    isTwoHanded: true,
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 22,
      attackMax: 32,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 32,
    },
    extraStats: {
      attack: 5,
      attackMax: 7,
      accuracy: 7
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
    sellPrice: 350,
    description: 'A pure offensive weapon',
    isTwoHanded: true,
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 18,
      attackMax: 27,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 27,
    },
    extraStats: {
      attack: 5,
      attackMax: 6,
      accuracy: 6
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
      attackMax: 60,
      attackSpeed: SLOW_SPEED,
      accuracy: 20,
    },
    extraStats: {
      attack: 7,
      attackMax: 15
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
      healthMax: 10,
      defense: 10,
      armor: 25
    },
    extraStats: {
      healthMax: 4,
      defense: 3,
      armor: 5
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
      healthMax: 8,
      defense: 10,
      armor: 29
    },
    extraStats: {
      healthMax: 5,
      defense: 6,
      armor: 10
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
      healthMax: 8,
      defense: 8,
      armor: 25
    },
    extraStats: {
      healthMax: 5,
      defense: 5,
      armor: 10
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
      healthMax: 19,
      defense: 10,
      armor: 45
    },
    extraStats: {
      healthMax: 7,
      defense: 5,
      armor: 9
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 15
    }]
  }
}
