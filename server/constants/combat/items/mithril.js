import { VERY_FAST_SPEED, FAST_SPEED, MEDIUM_SPEED, SLOW_SPEED } from '/server/constants/combat/attackSpeeds';

export const MITHRIL_ITEMS = {
  mithril_dagger: {
    id: 'mithril_dagger',
    icon: 'mithrilDagger',
    category: 'combat',
    weaponType: 'dagger',
    slot: 'mainHand',
    name: 'mithril dagger',
    sellPrice: 500,
    description: 'An okay dagger.',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 4,
      attackMax: 14,
      attackSpeed: VERY_FAST_SPEED,
      accuracy: 21
    },
    extraStats: {
      attack: 2,
      attackMax: 2,
      accuracy: 6
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 20
    }]
  },

  mithril_spear: {
    id: 'mithril_spear',
    icon: 'mithrilSpear',
    category: 'combat',
    weaponType: 'spear',
    slot: 'mainHand',
    name: 'mithril spear',
    sellPrice: 750,
    description: 'Often used for defense',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 14,
      attackMax: 22,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 20,
      defense: 20
    },
    extraStats: {
      attack: 2,
      attackMax: 2,
      accuracy: 2,
      defense: 4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 20
    }]
  },

  mithril_short_sword: {
    id: 'mithril_short_sword',
    icon: 'mithrilShortSword',
    category: 'combat',
    weaponType: 'shortSword',
    slot: 'mainHand',
    name: 'mithril short sword',
    sellPrice: 750,
    description: 'A good balance between offense and defense',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 16,
      attackMax: 25,
      attackSpeed: FAST_SPEED,
      accuracy: 33,
    },
    extraStats: {
      attack: 2,
      attackMax: 2,
      accuracy: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 20
    }]
  },

  mithril_scimitar: {
    id: 'mithril_scimitar',
    icon: 'mithrilScimitar',
    category: 'combat',
    weaponType: 'shortSword',
    slot: 'mainHand',
    name: 'mithril scimitar',
    sellPrice: 1000,
    description: 'A good balance between offense and defense',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 18,
      attackMax: 28,
      attackSpeed: FAST_SPEED,
      accuracy: 36,
    },
    extraStats: {
      attack: 2,
      attackMax: 2,
      accuracy: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 25
    }]
  },

  mithril_broad_sword: {
    id: 'mithril_broad_sword',
    icon: 'mithrilBroadSword',
    category: 'combat',
    weaponType: 'longSword',
    slot: 'mainHand',
    name: 'mithril broad sword',
    sellPrice: 1000,
    description: 'A pure offensive weapon',
    isTwoHanded: true,
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 29,
      attackMax: 40,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 45,
    },
    extraStats: {
      attack: 2,
      attackMax: 2,
      accuracy: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 25
    }]
  },

  mithril_long_sword: {
    id: 'mithril_long_sword',
    icon: 'mithrilLongSword',
    category: 'combat',
    weaponType: 'longSword',
    slot: 'mainHand',
    name: 'mithril long sword',
    sellPrice: 1000,
    description: 'A pure offensive weapon',
    isTwoHanded: true,
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 25,
      attackMax: 34,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 40,
    },
    extraStats: {
      attack: 2,
      attackMax: 4,
      accuracy: 4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 20
    }]
  },

  mithril_battle_axe: {
    id: 'mithril_battle_axe',
    icon: 'mithrilBattleAxe',
    category: 'combat',
    weaponType: 'battleAxe',
    slot: 'mainHand',
    name: 'mithril battle axe',
    sellPrice: 750,
    description: 'A slow pure offensive weapon.',
    isTwoHanded: true,
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 24,
      attackMax: 73,
      attackSpeed: SLOW_SPEED,
      accuracy: 30,
    },
    extraStats: {
      attack: 3,
      attackMax: 12
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 20
    }]
  },

  mithril_helmet: {
    id: 'mithril_helmet',
    icon: 'mithrilHelmet',
    category: 'combat',
    slot: 'head',
    name: 'mithril helmet',
    sellPrice: 500,
    description: 'Protect your head',
    isEquippable: true,
    stats: {
      healthMax: 17,
      defense: 16,
      armor: 34
    },
    extraStats: {
      healthMax: 2,
      defense: 2,
      armor: 6
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 20
    }]
  },

  mithril_horned_helmet: {
    id: 'mithril_horned_helmet',
    icon: 'mithrilHornedHelmet',
    category: 'combat',
    slot: 'head',
    name: 'mithril horned helmet',
    sellPrice: 500,
    description: 'Headbut your enemies',
    isEquippable: true,
    stats: {
      healthMax: 6,
      armor: 8,
      attack: 8,
      attackMax: 8,
      accuracy: 8
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
      level: 20
    }]
  },

  mithril_chest_plate: {
    id: 'mithril_chest_plate',
    icon: 'mithrilChestPlate',
    category: 'combat',
    slot: 'chest',
    name: 'mithril chestplate',
    sellPrice: 700,
    description: 'Protect your heart',
    isEquippable: true,
    stats: {
      healthMax: 15,
      defense: 18,
      armor: 38
    },
    extraStats: {
      healthMax: 2,
      defense: 4,
      armor: 10
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 20
    }]
  },

  mithril_plate_legs: {
    id: 'mithril_plate_legs',
    icon: 'mithrilPlateLegs',
    category: 'combat',
    slot: 'legs',
    name: 'mithril platelegs',
    sellPrice: 500,
    description: 'Protect your legs',
    isEquippable: true,
    stats: {
      healthMax: 16,
      defense: 16,
      armor: 30
    },
    extraStats: {
      healthMax: 2,
      defense: 2,
      armor: 4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 20
    }]
  },

  mithril_shield: {
    id: 'mithril_shield',
    icon: 'mithrilShield',
    category: 'combat',
    slot: 'offHand',
    name: 'mithril shield',
    sellPrice: 500,
    description: 'Provides large defense bonuses',
    isEquippable: true,
    stats: {
      healthMax: 30,
      defense: 15,
      armor: 55
    },
    extraStats: {
      healthMax: 6,
      defense: 4,
      armor: 9
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 20
    }]
  }
}
