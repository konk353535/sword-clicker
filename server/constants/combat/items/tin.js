

{
  tin_dagger: {
    id: 'tin_dagger',
    icon: 'tinDagger',
    category: 'combat',
    weaponType: 'dagger',
    slot: 'mainHand',
    name: 'tin dagger',
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

  tin_spear: {
    id: 'tin_spear',
    icon: 'tinSpear',
    category: 'combat',
    weaponType: 'spear',
    slot: 'mainHand',
    name: 'tin spear',
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

  tin_short_sword: {
    id: 'tin_short_sword',
    icon: 'tinShortSword',
    category: 'combat',
    weaponType: 'shortSword',
    slot: 'mainHand',
    name: 'tin short sword',
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

  tin_scimitar: {
    id: 'tin_scimitar',
    icon: 'tinScimitar',
    category: 'combat',
    weaponType: 'shortSword',
    slot: 'mainHand',
    name: 'tin scimitar',
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

  tin_long_sword: {
    id: 'tin_long_sword',
    icon: 'tinLongSword',
    category: 'combat',
    weaponType: 'longSword',
    slot: 'mainHand',
    name: 'tin long sword',
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

  tin_broad_sword: {
    id: 'tin_broad_sword',
    icon: 'tinBroadSword',
    category: 'combat',
    weaponType: 'longSword',
    slot: 'mainHand',
    name: 'tin broad sword',
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

  tin_battle_axe: {
    id: 'tin_battle_axe',
    icon: 'tinBattleAxe',
    category: 'combat',
    weaponType: 'battleAxe',
    slot: 'mainHand',
    name: 'tin battle axe',
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

  tin_horned_helmet: {
    id: 'tin_horned_helmet',
    icon: 'tinHornedHelmet',
    category: 'combat',
    slot: 'head',
    name: 'tin horned helmet',
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

  tin_helmet: {
    id: 'tin_helmet',
    icon: 'tinHelmet',
    category: 'combat',
    slot: 'head',
    name: 'tin helmet',
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

  tin_chest_plate: {
    id: 'tin_chest_plate',
    icon: 'tinChestPlate',
    category: 'combat',
    slot: 'chest',
    name: 'tin chestplate',
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

  tin_plate_legs: {
    id: 'tin_plate_legs',
    icon: 'tinPlateLegs',
    category: 'combat',
    slot: 'legs',
    name: 'tin platelegs',
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

  tin_shield: {
    id: 'tin_shield',
    icon: 'tinShield',
    category: 'combat',
    slot: 'offHand',
    name: 'tin shield',
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
