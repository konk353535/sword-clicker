export const COPPER_ITEMS = {
  copper_dagger: {
    id: 'copper_dagger',
    icon: 'copperDagger.svg',
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
      attackSpeed: 1,
      accuracy: 4.5
    }
  },

  copper_spear: {
    id: 'copper_spear',
    icon: 'copperSpear.svg',
    category: 'combat',
    weaponType: 'spear',
    slot: 'mainHand',
    name: 'copper spear',
    sellPrice: 75,
    description: 'Used to train defense.',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 4,
      attackMax: 5,
      attackSpeed: 0.5,
      accuracy: 5,
      defense: 2
    },
    extraStats: {
      attack: 1.2,
      attackMax: 1.4,
      accuracy: 1.2,
      defense: 0.4
    }
  },

  copper_short_sword: {
    id: 'copper_short_sword',
    icon: 'copperShortSword.svg',
    category: 'combat',
    weaponType: 'shortSword',
    slot: 'mainHand',
    name: 'copper short sword',
    sellPrice: 75,
    description: 'A good balance between offense and defense',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 4,
      attackMax: 6,
      attackSpeed: 0.7,
      accuracy: 6,
    },
    extraStats: {
      attack: 1,
      attackMax: 1.5,
      accuracy: 1.5
    }
  },

  copper_scimitar: {
    id: 'copper_scimitar',
    icon: 'copperScimitar.svg',
    category: 'combat',
    weaponType: 'shortSword',
    slot: 'mainHand',
    name: 'copper scimitar',
    sellPrice: 75,
    description: 'A good balance between offense and defense',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 4.4,
      attackMax: 7,
      attackSpeed: 0.7,
      accuracy: 6,
    },
    extraStats: {
      attack: 1.2,
      attackMax: 2,
      accuracy: 1.5
    }
  },

  copper_long_sword: {
    id: 'copper_long_sword',
    icon: 'copperLongSword.svg',
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
      attack: 7,
      attackMax: 12,
      attackSpeed: 0.5,
      accuracy: 8,
    },
    extraStats: {
      attack: 2.1,
      attackMax: 3.6,
      accuracy: 2
    }
  },

  copper_broad_sword: {
    id: 'copper_broad_sword',
    icon: 'copperBroadSword.svg',
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
      attack: 10,
      attackMax: 14,
      attackSpeed: 0.5,
      accuracy: 8,
    },
    extraStats: {
      attack: 2,
      attackMax: 4.2,
      accuracy: 2.4
    }
  },

  copper_battle_axe: {
    id: 'copper_battle_axe',
    icon: 'copperBattleAxe.svg',
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
      attackMax: 18,
      attackSpeed: 0.3,
      accuracy: 8,
      criticalChance: 5
    },
    extraStats: {
      attack: 1.2,
      attackMax: 5.4,
      accuracy: 2
    }
  },

  copper_horned_helmet: {
    id: 'copper_horned_helmet',
    icon: 'copperHornedHelmet.svg',
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
    icon: 'copperHelmet.svg',
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
      healthMax: 1,
      defense: 1,
      armor: 1
    }
  },

  copper_chest_plate: {
    id: 'copper_chest_plate',
    icon: 'copperChestPlate.svg',
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
      healthMax: 1,
      defense: 1,
      armor: 1
    }
  },

  copper_plate_legs: {
    id: 'copper_plate_legs',
    icon: 'copperPlateLegs.svg',
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
      healthMax: 1,
      defense: 1,
      armor: 1
    }
  },

  copper_shield: {
    id: 'copper_shield',
    icon: 'copperShield.svg',
    category: 'combat',
    weaponType: 'shield',
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
      healthMax: 1,
      defense: 1,
      armor: 3
    }
  }
}
