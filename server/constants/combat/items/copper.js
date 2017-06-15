import { VERY_FAST_SPEED, FAST_SPEED, MEDIUM_SPEED, SLOW_SPEED } from '/server/constants/combat/attackSpeeds';

export const COPPER_ITEMS = {
  copper_dagger: {
    id: 'copper_dagger',
    icon: 'copperDagger',
    category: 'combat',
    weaponType: 'dagger',
    slot: 'mainHand',
    name: 'copper dagger',
    sellPrice: 50,
    description: 'A poorly made dagger.',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 1,
      attackMax: 2,
      attackSpeed: VERY_FAST_SPEED,
      accuracy: 1
    }
  },

  copper_spear: {
    id: 'copper_spear',
    icon: 'copperSpear',
    category: 'combat',
    weaponType: 'spear',
    slot: 'mainHand',
    name: 'copper spear',
    sellPrice: 75,
    description: 'Used to train defense.',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 2,
      attackMax: 3,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 2,
      defense: 4
    },
    extraStats: {
      attack: 2,
      attackMax: 2,
      accuracy: 2,
      defense: 4
    }
  },

  copper_short_sword: {
    id: 'copper_short_sword',
    icon: 'copperShortSword',
    category: 'combat',
    weaponType: 'shortSword',
    slot: 'mainHand',
    name: 'copper short sword',
    sellPrice: 75,
    description: 'A good balance between offense and defense',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 2,
      attackMax: 4,
      attackSpeed: FAST_SPEED,
      accuracy: 3,
    },
    extraStats: {
      attack: 2,
      attackMax: 2,
      accuracy: 3
    }
  },

  copper_scimitar: {
    id: 'copper_scimitar',
    icon: 'copperScimitar',
    category: 'combat',
    weaponType: 'shortSword',
    slot: 'mainHand',
    name: 'copper scimitar',
    sellPrice: 75,
    description: 'A good balance between offense and defense',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 4,
      attackMax: 8,
      attackSpeed: FAST_SPEED,
      accuracy: 6,
    },
    extraStats: {
      attack: 4,
      attackMax: 4,
      accuracy: 6
    }
  },

  copper_long_sword: {
    id: 'copper_long_sword',
    icon: 'copperLongSword',
    category: 'combat',
    weaponType: 'longSword',
    slot: 'mainHand',
    name: 'copper long sword',
    sellPrice: 75,
    description: 'A pure offensive weapon',
    isTwoHanded: true,
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 4,
      attackMax: 7,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 7,
    },
    extraStats: {
      attack: 3,
      attackMax: 5,
      accuracy: 4
    }
  },

  copper_broad_sword: {
    id: 'copper_broad_sword',
    icon: 'copperBroadSword',
    category: 'combat',
    weaponType: 'longSword',
    slot: 'mainHand',
    name: 'copper broad sword',
    sellPrice: 75,
    description: 'A pure offensive weapon',
    isTwoHanded: true,
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 8,
      attackMax: 14,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 14,
    },
    extraStats: {
      attack: 6,
      attackMax: 8,
      accuracy: 8
    }
  },

  copper_battle_axe: {
    id: 'copper_battle_axe',
    icon: 'copperBattleAxe',
    category: 'combat',
    weaponType: 'battleAxe',
    slot: 'mainHand',
    name: 'copper battle axe',
    sellPrice: 75,
    description: 'A slow pure offensive weapon.',
    isTwoHanded: true,
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 5,
      attackMax: 15,
      attackSpeed: SLOW_SPEED,
      accuracy: 5,
    },
    extraStats: {
      attack: 2,
      attackMax: 10
    }
  },

  copper_horned_helmet: {
    id: 'copper_horned_helmet',
    icon: 'copperHornedHelmet',
    category: 'combat',
    slot: 'head',
    name: 'copper horned helmet',
    sellPrice: 75,
    description: 'Protect your head',
    isEquippable: true,
    stats: {
      attack: 1,
      attackMax: 1,
      accuracy: 1
    },
    extraStats: {
      attack: 1,
      attackMax: 1,
      accuracy: 1
    }
  },

  copper_helmet: {
    id: 'copper_helmet',
    icon: 'copperHelmet',
    category: 'combat',
    slot: 'head',
    name: 'copper helmet',
    sellPrice: 75,
    description: 'Protect your head',
    isEquippable: true,
    stats: {
      healthMax: 1,
      defense: 1,
      armor: 5
    },
    extraStats: {
      healthMax: 2,
      defense: 1,
      armor: 2
    }
  },

  copper_chest_plate: {
    id: 'copper_chest_plate',
    icon: 'copperChestPlate',
    category: 'combat',
    slot: 'chest',
    name: 'copper chestplate',
    sellPrice: 75,
    description: 'Protect your heart',
    isEquippable: true,
    stats: {
      healthMax: 1,
      defense: 1,
      armor: 5
    },
    extraStats: {
      healthMax: 2,
      defense: 1,
      armor: 2
    }
  },

  copper_plate_legs: {
    id: 'copper_plate_legs',
    icon: 'copperPlateLegs',
    category: 'combat',
    slot: 'legs',
    name: 'copper platelegs',
    sellPrice: 75,
    description: 'Protect your legs',
    isEquippable: true,
    stats: {
      healthMax: 1,
      defense: 1,
      armor: 5
    },
    extraStats: {
      healthMax: 2,
      defense: 1,
      armor: 2
    }
  },

  copper_shield: {
    id: 'copper_shield',
    icon: 'copperShield',
    category: 'combat',
    slot: 'offHand',
    name: 'copper shield',
    sellPrice: 75,
    description: 'Provides large defense bonuses',
    isEquippable: true,
    stats: {
      healthMax: 2,
      defense: 3,
      armor: 10
    },
    extraStats: {
      healthMax: 4,
      defense: 3,
      armor: 5
    }
  }
}
