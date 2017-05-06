import { VERY_FAST_SPEED, FAST_SPEED, MEDIUM_SPEED, SLOW_SPEED } from '/server/constants/combat/attackSpeeds';

export const STEEL_ITEMS = {
  steel_dagger: {
    id: 'steel_dagger',
    icon: 'steelDagger',
    category: 'combat',
    weaponType: 'dagger',
    slot: 'mainHand',
    name: 'steel dagger',
    sellPrice: 250,
    description: 'An okay dagger.',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 4,
      attackMax: 6,
      attackSpeed: FAST_SPEED,
      accuracy: 5
    },
    extraStats: {
      attack: 3,
      attackMax: 3,
      accuracy: 7
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 10
    }]
  },

  steel_spear: {
    id: 'steel_spear',
    icon: 'steelSpear',
    category: 'combat',
    weaponType: 'spear',
    slot: 'mainHand',
    name: 'steel spear',
    sellPrice: 250,
    description: 'Often used for defense',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 5,
      attackMax: 8,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 5,
      defense: 10
    },
    extraStats: {
      attack: 3,
      attackMax: 4,
      accuracy: 6,
      defense: 10
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 10
    }]
  },

  steel_short_sword: {
    id: 'steel_short_sword',
    icon: 'steelShortSword',
    category: 'combat',
    weaponType: 'shortSword',
    slot: 'mainHand',
    name: 'steel short sword',
    sellPrice: 250,
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

  steel_scimitar: {
    id: 'steel_scimitar',
    icon: 'steelScimitar',
    category: 'combat',
    weaponType: 'shortSword',
    slot: 'mainHand',
    name: 'steel scimitar',
    sellPrice: 250,
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

  steel_broad_sword: {
    id: 'steel_broad_sword',
    icon: 'steelBroadSword',
    category: 'combat',
    weaponType: 'longSword',
    slot: 'mainHand',
    name: 'steel broad sword',
    sellPrice: 250,
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

  steel_long_sword: {
    id: 'steel_long_sword',
    icon: 'steelLongSword',
    category: 'combat',
    weaponType: 'longSword',
    slot: 'mainHand',
    name: 'steel long sword',
    sellPrice: 250,
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

  steel_battle_axe: {
    id: 'steel_battle_axe',
    icon: 'steelBattleAxe',
    category: 'combat',
    weaponType: 'battleAxe',
    slot: 'mainHand',
    name: 'steel battle axe',
    sellPrice: 300,
    description: 'A slow pure offensive weapon.',
    isTwoHanded: true,
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 12,
      attackMax: 35,
      attackSpeed: SLOW_SPEED,
      accuracy: 13,
    },
    extraStats: {
      attack: 5,
      attackMax: 24
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 10
    }]
  },

  steel_helmet: {
    id: 'steel_helmet',
    icon: 'steelHelmet',
    category: 'combat',
    slot: 'head',
    name: 'steel helmet',
    sellPrice: 400,
    description: 'Protect your head',
    isEquippable: true,
    stats: {
      healthMax: 4,
      defense: 5,
      armor: 13
    },
    extraStats: {
      healthMax: 5,
      defense: 4,
      armor: 7
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 10
    }]
  },

  steel_horned_helmet: {
    id: 'steel_horned_helmet',
    icon: 'steelHornedHelmet',
    category: 'combat',
    slot: 'head',
    name: 'steel horned helmet',
    sellPrice: 400,
    description: 'Headbut your enemies',
    isEquippable: true,
    stats: {
      healthMax: 2,
      armor: 1,
      attack: 3,
      attackMax: 3,
      accuracy: 3
    },
    extraStats: {
      healthMax: 2,
      armor: 1,
      attack: 3,
      attackMax: 3,
      accuracy: 3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 10
    }]
  },

  steel_chest_plate: {
    id: 'steel_chest_plate',
    icon: 'steelChestPlate',
    category: 'combat',
    slot: 'chest',
    name: 'steel chestplate',
    sellPrice: 250,
    description: 'Protect your heart',
    isEquippable: true,
    stats: {
      healthMax: 4,
      defense: 4,
      armor: 13
    },
    extraStats: {
      healthMax: 5,
      defense: 7,
      armor: 13
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 10
    }]
  },

  steel_plate_legs: {
    id: 'steel_plate_legs',
    icon: 'steelPlateLegs',
    category: 'combat',
    slot: 'legs',
    name: 'steel platelegs',
    sellPrice: 300,
    description: 'Protect your legs',
    isEquippable: true,
    stats: {
      healthMax: 4,
      defense: 4,
      armor: 12
    },
    extraStats: {
      healthMax: 5,
      defense: 5,
      armor: 13
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 10
    }]
  },

  steel_shield: {
    id: 'steel_shield',
    icon: 'steelShield',
    category: 'combat',
    slot: 'offHand',
    name: 'steel shield',
    sellPrice: 150,
    description: 'Provides large defense bonuses',
    isEquippable: true,
    stats: {
      healthMax: 8,
      defense: 4,
      armor: 25
    },
    extraStats: {
      healthMax: 10,
      defense: 7,
      armor: 13
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 10
    }]
  }
}
