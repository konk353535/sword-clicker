import { VERY_FAST_SPEED, FAST_SPEED, MEDIUM_SPEED, SLOW_SPEED } from '/server/constants/combat/attackSpeeds';

export const FAIRY_STEEL_ITEMS = {
  fairy_steel_dagger: {
    id: 'fairy_steel_dagger',
    icon: 'fairySteelDagger',
    category: 'combat',
    weaponType: 'dagger',
    slot: 'mainHand',
    name: 'fairy steel dagger',
    sellPrice: 1100,
    description: 'An okay dagger.',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 8,
      attackMax: 20,
      attackSpeed: VERY_FAST_SPEED,
      accuracy: 33
    },
    extraStats: {
      attack: 2,
      attackMax: 2,
      accuracy: 6
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 40
    }]
  },

  fairy_steel_spear: {
    id: 'fairy_steel_spear',
    icon: 'fairySteelSpear',
    category: 'combat',
    weaponType: 'spear',
    slot: 'mainHand',
    name: 'fairy steel spear',
    sellPrice: 1100,
    description: 'Often used for defense',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 18,
      attackMax: 30,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 28,
      defense: 36
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
      level: 40
    }]
  },

  fairy_steel_short_sword: {
    id: 'fairy_steel_short_sword',
    icon: 'fairySteelShortSword',
    category: 'combat',
    weaponType: 'shortSword',
    slot: 'mainHand',
    name: 'fairy steel short sword',
    sellPrice: 1100,
    description: 'A good balance between offense and defense',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 21,
      attackMax: 33,
      attackSpeed: FAST_SPEED,
      accuracy: 47,
    },
    extraStats: {
      attack: 2,
      attackMax: 3,
      accuracy: 4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 40
    }]
  },

  fairy_steel_scimitar: {
    id: 'fairy_steel_scimitar',
    icon: 'fairySteelScimitarSword',
    category: 'combat',
    weaponType: 'shortSword',
    slot: 'mainHand',
    name: 'fairy steel scimitar',
    sellPrice: 1100,
    description: 'A good balance between offense and defense',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 26,
      attackMax: 39,
      attackSpeed: FAST_SPEED,
      accuracy: 53,
    },
    extraStats: {
      attack: 2,
      attackMax: 3,
      accuracy: 4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 40
    }]
  },

  fairy_steel_broad_sword: {
    id: 'fairy_steel_broad_sword',
    icon: 'fairySteelBroadSword',
    category: 'combat',
    weaponType: 'longSword',
    slot: 'mainHand',
    name: 'fairy steel broad sword',
    sellPrice: 1100,
    description: 'A pure offensive weapon',
    isTwoHanded: true,
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 41,
      attackMax: 54,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 64,
    },
    extraStats: {
      attack: 3,
      attackMax: 3,
      accuracy: 3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 40
    }]
  },

  fairy_steel_long_sword: {
    id: 'fairy_steel_long_sword',
    icon: 'fairySteelLongSword',
    category: 'combat',
    weaponType: 'longSword',
    slot: 'mainHand',
    name: 'fairy steel long sword',
    sellPrice: 1100,
    description: 'A pure offensive weapon',
    isTwoHanded: true,
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 33,
      attackMax: 45,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 55,
    },
    extraStats: {
      attack: 4,
      attackMax: 5,
      accuracy: 5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 40
    }]
  },

  fairy_steel_battle_axe: {
    id: 'fairy_steel_battle_axe',
    icon: 'fairySteelBattleAxe',
    category: 'combat',
    weaponType: 'battleAxe',
    slot: 'mainHand',
    name: 'fairy steel battle axe',
    sellPrice: 1100,
    description: 'A slow pure offensive weapon.',
    isTwoHanded: true,
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 33,
      attackMax: 93,
      attackSpeed: SLOW_SPEED,
      accuracy: 43,
    },
    extraStats: {
      attack: 4,
      attackMax: 17
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 40
    }]
  },

  fairy_steel_helmet: {
    id: 'fairy_steel_helmet',
    icon: 'fairySteelHelmet',
    category: 'combat',
    slot: 'head',
    name: 'fairy steel helmet',
    sellPrice: 1100,
    description: 'Protect your head',
    isEquippable: true,
    stats: {
      healthMax: 23,
      defense: 21,
      armor: 46
    },
    extraStats: {
      healthMax: 2,
      defense: 2,
      armor: 7
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 40
    }]
  },

  fairy_steel_horned_helmet: {
    id: 'fairy_steel_horned_helmet',
    icon: 'fairySteelHornedHelmet',
    category: 'combat',
    slot: 'head',
    name: 'fairy steel horned helmet',
    sellPrice: 1100,
    description: 'Headbut your enemies',
    isEquippable: true,
    stats: {
      healthMax: 10,
      armor: 12,
      attack: 12,
      attackMax: 12,
      accuracy: 12
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
      level: 40
    }]
  },

  fairy_steel_chest_plate: {
    id: 'fairy_steel_chest_plate',
    icon: 'fairySteelChestPlate',
    category: 'combat',
    slot: 'chest',
    name: 'fairy steel chestplate',
    sellPrice: 700,
    description: 'Protect your heart',
    isEquippable: true,
    stats: {
      healthMax: 19,
      defense: 23,
      armor: 51
    },
    extraStats: {
      healthMax: 2,
      defense: 4,
      armor: 10
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 40
    }]
  },

  fairy_steel_plate_legs: {
    id: 'fairy_steel_plate_legs',
    icon: 'fairySteelPlateLegs',
    category: 'combat',
    slot: 'legs',
    name: 'fairy steel platelegs',
    sellPrice: 1100,
    description: 'Protect your legs',
    isEquippable: true,
    stats: {
      healthMax: 21,
      defense: 20,
      armor: 42
    },
    extraStats: {
      healthMax: 2,
      defense: 2,
      armor: 5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 40
    }]
  },

  fairy_steel_shield: {
    id: 'fairy_steel_shield',
    icon: 'fairySteelShield',
    category: 'combat',
    slot: 'offHand',
    name: 'fairy steel shield',
    sellPrice: 1100,
    description: 'Provides large defense bonuses',
    isEquippable: true,
    stats: {
      healthMax: 41,
      defense: 20,
      armor: 80
    },
    extraStats: {
      healthMax: 6,
      defense: 4,
      armor: 13
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 40
    }]
  }
}
