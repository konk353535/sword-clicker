import { VERY_FAST_SPEED, FAST_SPEED, MEDIUM_SPEED, SLOW_SPEED } from '/server/constants/combat/attackSpeeds';

export const ORICHALCUM_ITEMS = {
  orichalcum_dagger: {
    id: 'orichalcum_dagger',
    icon: 'orichalcumDagger',
    category: 'combat',
    weaponType: 'dagger',
    slot: 'mainHand',
    name: 'orichalcum dagger',
    sellPrice: 750,
    description: 'An okay dagger.',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 6,
      attackMax: 17,
      attackSpeed: FAST_SPEED,
      accuracy: 19
    },
    extraStats: {
      attack: 2,
      attackMax: 2,
      accuracy: 6
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 30
    }]
  },

  orichalcum_spear: {
    id: 'orichalcum_spear',
    icon: 'orichalcumSpear',
    category: 'combat',
    weaponType: 'spear',
    slot: 'mainHand',
    name: 'orichalcum spear',
    sellPrice: 750,
    description: 'Often used for defense',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 16,
      attackMax: 26,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 24,
      defense: 28
    },
    extraStats: {
      attack: 2,
      attackMax: 2,
      accuracy: 2,
      defense: 5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 30
    }]
  },

  orichalcum_short_sword: {
    id: 'orichalcum_short_sword',
    icon: 'orichalcumShortSword',
    category: 'combat',
    weaponType: 'shortSword',
    slot: 'mainHand',
    name: 'orichalcum short sword',
    sellPrice: 750,
    description: 'A good balance between offense and defense',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 18,
      attackMax: 29,
      attackSpeed: FAST_SPEED,
      accuracy: 33,
    },
    extraStats: {
      attack: 2,
      attackMax: 3,
      accuracy: 4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 30
    }]
  },

  orichalcum_scimitar: {
    id: 'orichalcum_scimitar',
    icon: 'orichalcumScimitarSword',
    category: 'combat',
    weaponType: 'shortSword',
    slot: 'mainHand',
    name: 'orichalcum scimitar',
    sellPrice: 1000,
    description: 'A good balance between offense and defense',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 22,
      attackMax: 33,
      attackSpeed: FAST_SPEED,
      accuracy: 37,
    },
    extraStats: {
      attack: 2,
      attackMax: 3,
      accuracy: 4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 30
    }]
  },

  orichalcum_broad_sword: {
    id: 'orichalcum_broad_sword',
    icon: 'orichalcumBroadSword',
    category: 'combat',
    weaponType: 'longSword',
    slot: 'mainHand',
    name: 'orichalcum broad sword',
    sellPrice: 1000,
    description: 'A pure offensive weapon',
    isTwoHanded: true,
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 35,
      attackMax: 47,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 47,
    },
    extraStats: {
      attack: 3,
      attackMax: 3,
      accuracy: 3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 30
    }]
  },

  orichalcum_long_sword: {
    id: 'orichalcum_long_sword',
    icon: 'orichalcumLongSword',
    category: 'combat',
    weaponType: 'longSword',
    slot: 'mainHand',
    name: 'orichalcum long sword',
    sellPrice: 1000,
    description: 'A pure offensive weapon',
    isTwoHanded: true,
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 29,
      attackMax: 39,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 39,
    },
    extraStats: {
      attack: 4,
      attackMax: 5,
      accuracy: 5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 30
    }]
  },

  orichalcum_battle_axe: {
    id: 'orichalcum_battle_axe',
    icon: 'orichalcumBattleAxe',
    category: 'combat',
    weaponType: 'battleAxe',
    slot: 'mainHand',
    name: 'orichalcum battle axe',
    sellPrice: 750,
    description: 'A slow pure offensive weapon.',
    isTwoHanded: true,
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 28,
      attackMax: 86,
      attackSpeed: SLOW_SPEED,
      accuracy: 29,
    },
    extraStats: {
      attack: 4,
      attackMax: 16
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 30
    }]
  },

  orichalcum_helmet: {
    id: 'orichalcum_helmet',
    icon: 'orichalcumHelmet',
    category: 'combat',
    slot: 'head',
    name: 'orichalcum helmet',
    sellPrice: 750,
    description: 'Protect your head',
    isEquippable: true,
    stats: {
      healthMax: 19,
      defense: 18,
      armor: 40
    },
    extraStats: {
      healthMax: 2,
      defense: 2,
      armor: 7
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 30
    }]
  },

  orichalcum_horned_helmet: {
    id: 'orichalcum_horned_helmet',
    icon: 'orichalcumHornedHelmet',
    category: 'combat',
    slot: 'head',
    name: 'orichalcum horned helmet',
    sellPrice: 750,
    description: 'Headbut your enemies',
    isEquippable: true,
    stats: {
      healthMax: 8,
      armor: 10,
      attack: 10,
      attackMax: 10,
      accuracy: 10
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
      level: 30
    }]
  },

  orichalcum_chest_plate: {
    id: 'orichalcum_chest_plate',
    icon: 'orichalcumChestPlate',
    category: 'combat',
    slot: 'chest',
    name: 'orichalcum chestplate',
    sellPrice: 700,
    description: 'Protect your heart',
    isEquippable: true,
    stats: {
      healthMax: 17,
      defense: 20,
      armor: 44
    },
    extraStats: {
      healthMax: 2,
      defense: 4,
      armor: 10
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 30
    }]
  },

  orichalcum_plate_legs: {
    id: 'orichalcum_plate_legs',
    icon: 'orichalcumPlateLegs',
    category: 'combat',
    slot: 'legs',
    name: 'orichalcum platelegs',
    sellPrice: 750,
    description: 'Protect your legs',
    isEquippable: true,
    stats: {
      healthMax: 18,
      defense: 18,
      armor: 36
    },
    extraStats: {
      healthMax: 2,
      defense: 2,
      armor: 5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 30
    }]
  },

  orichalcum_shield: {
    id: 'orichalcum_shield',
    icon: 'orichalcumShield',
    category: 'combat',
    slot: 'offHand',
    name: 'orichalcum shield',
    sellPrice: 750,
    description: 'Provides large defense bonuses',
    isEquippable: true,
    stats: {
      healthMax: 37,
      defense: 18,
      armor: 70
    },
    extraStats: {
      healthMax: 6,
      defense: 4,
      armor: 13
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 30
    }]
  }
}
