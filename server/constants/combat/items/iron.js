import { VERY_FAST_SPEED, FAST_SPEED, MEDIUM_SPEED, SLOW_SPEED } from '/server/constants/combat/attackSpeeds';

export const IRON_ITEMS = {
  iron_dagger: {
    id: 'iron_dagger',
    icon: 'ironDagger',
    category: 'combat',
    weaponType: 'dagger',
    slot: 'mainHand',
    name: 'iron dagger',
    sellPrice: 100,
    description: 'An okay dagger.',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 3,
      attackMax: 4,
      attackSpeed: FAST_SPEED,
      accuracy: 4
    },
    extraStats: {
      attack: 2,
      attackMax: 1,
      accuracy: 5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 5
    }]
  },

  iron_spear: {
    id: 'iron_spear',
    icon: 'ironSpear',
    category: 'combat',
    weaponType: 'spear',
    slot: 'mainHand',
    name: 'iron spear',
    sellPrice: 150,
    description: 'Often used for defense',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 4,
      attackMax: 6,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 3,
      defense: 7
    },
    extraStats: {
      attack: 3,
      attackMax: 3,
      accuracy: 4,
      defense: 8
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 5
    }]
  },

  iron_short_sword: {
    id: 'iron_short_sword',
    icon: 'ironShortSword',
    category: 'combat',
    weaponType: 'shortSword',
    slot: 'mainHand',
    name: 'iron short sword',
    sellPrice: 150,
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
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 5
    }]
  },

  iron_scimitar: {
    id: 'iron_scimitar',
    icon: 'ironScimitar',
    category: 'combat',
    weaponType: 'shortSword',
    slot: 'mainHand',
    name: 'iron scimitar',
    sellPrice: 150,
    description: 'A good balance between offense and defense',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 5,
      attackMax: 10,
      attackSpeed: FAST_SPEED,
      accuracy: 8,
    },
    extraStats: {
      attack: 5,
      attackMax: 5,
      accuracy: 8
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 10
    }]
  },

  iron_broad_sword: {
    id: 'iron_broad_sword',
    icon: 'ironBroadSword',
    category: 'combat',
    weaponType: 'longSword',
    slot: 'mainHand',
    name: 'iron broad sword',
    sellPrice: 150,
    description: 'A pure offensive weapon',
    isTwoHanded: true,
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 10,
      attackMax: 17,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 17,
    },
    extraStats: {
      attack: 7,
      attackMax: 10,
      accuracy: 10
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 10
    }]
  },

  iron_long_sword: {
    id: 'iron_long_sword',
    icon: 'ironLongSword',
    category: 'combat',
    weaponType: 'longSword',
    slot: 'mainHand',
    name: 'iron long sword',
    sellPrice: 150,
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
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 5
    }]
  },

  iron_battle_axe: {
    id: 'iron_battle_axe',
    icon: 'ironBattleAxe',
    category: 'combat',
    weaponType: 'battleAxe',
    slot: 'mainHand',
    name: 'iron battle axe',
    sellPrice: 150,
    description: 'A slow pure offensive weapon.',
    isTwoHanded: true,
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 10,
      attackMax: 30,
      attackSpeed: SLOW_SPEED,
      accuracy: 10,
    },
    extraStats: {
      attack: 4,
      attackMax: 20
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 5
    }]
  },

  iron_horned_helmet: {
    id: 'iron_horned_helmet',
    icon: 'ironHornedHelmet',
    category: 'combat',
    slot: 'head',
    name: 'iron horned helmet',
    sellPrice: 150,
    description: 'Protect your head',
    isEquippable: true,
    stats: {
      healthMax: 1,
      armor: 1,
      attack: 2,
      attackMax: 2,
      accuracy: 2
    },
    extraStats: {
      healthMax: 1,
      armor: 1,
      attack: 2,
      attackMax: 2,
      accuracy: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 5
    }]
  },

  iron_helmet: {
    id: 'iron_helmet',
    icon: 'ironHelmet',
    category: 'combat',
    slot: 'head',
    name: 'iron helmet',
    sellPrice: 150,
    description: 'Protect your head',
    isEquippable: true,
    stats: {
      healthMax: 3,
      defense: 3,
      armor: 10
    },
    extraStats: {
      healthMax: 4,
      defense: 3,
      armor: 5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 5
    }]
  },

  iron_chest_plate: {
    id: 'iron_chest_plate',
    icon: 'ironChestPlate',
    category: 'combat',
    slot: 'chest',
    name: 'iron chestplate',
    sellPrice: 150,
    description: 'Protect your heart',
    isEquippable: true,
    stats: {
      healthMax: 3,
      defense: 3,
      armor: 10
    },
    extraStats: {
      healthMax: 4,
      defense: 5,
      armor: 10
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 5
    }]
  },

  iron_plate_legs: {
    id: 'iron_plate_legs',
    icon: 'ironPlateLegs',
    category: 'combat',
    slot: 'legs',
    name: 'iron platelegs',
    sellPrice: 150,
    description: 'Protect your legs',
    isEquippable: true,
    stats: {
      healthMax: 3,
      defense: 3,
      armor: 10
    },
    extraStats: {
      healthMax: 4,
      defense: 4,
      armor: 10
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 5
    }]
  },

  iron_shield: {
    id: 'iron_shield',
    icon: 'ironShield',
    category: 'combat',
    slot: 'offHand',
    name: 'iron shield',
    sellPrice: 150,
    description: 'Provides large defense bonuses',
    isEquippable: true,
    stats: {
      healthMax: 6,
      defense: 3,
      armor: 20
    },
    extraStats: {
      healthMax: 8,
      defense: 5,
      armor: 10
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 5
    }]
  }
}
