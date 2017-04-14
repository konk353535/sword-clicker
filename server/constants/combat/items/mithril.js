import { VERY_FAST_SPEED, FAST_SPEED, MEDIUM_SPEED, SLOW_SPEED } from '/server/constants/combat/attackSpeeds';

export const MITHRIL_ITEMS = {
  mithril_dagger: {
    id: 'mithril_dagger',
    icon: 'mithrilDagger',
    category: 'combat',
    weaponType: 'dagger',
    slot: 'mainHand',
    name: 'mithril dagger',
    sellPrice: 900,
    description: 'An okay dagger.',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 7,
      attackMax: 10,
      attackSpeed: FAST_SPEED,
      accuracy: 10
    },
    extraStats: {
      attack: 6,
      attackMax: 6,
      accuracy: 12
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 15
    }]
  },

  mithril_spear: {
    id: 'mithril_spear',
    icon: 'mithrilSpear',
    category: 'combat',
    weaponType: 'spear',
    slot: 'mainHand',
    name: 'mithril spear',
    sellPrice: 1000,
    description: 'Often used for defense',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 10,
      attackMax: 14,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 10,
      defense: 35
    },
    extraStats: {
      attack: 6,
      attackMax: 10,
      accuracy: 12,
      defense: 18
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 15
    }]
  },

  mithril_short_sword: {
    id: 'mithril_short_sword',
    icon: 'mithrilShortSword',
    category: 'combat',
    weaponType: 'shortSword',
    slot: 'mainHand',
    name: 'mithril short sword',
    sellPrice: 1000,
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
      level: 15
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
      level: 15
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
      attack: 18,
      attackMax: 53,
      attackSpeed: SLOW_SPEED,
      accuracy: 25,
    },
    extraStats: {
      attack: 9,
      attackMax: 35
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 15
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
      healthMax: 9,
      defense: 10,
      armor: 26
    },
    extraStats: {
      healthMax: 10,
      defense: 8,
      armor: 14
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 15
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
      healthMax: 8,
      defense: 8,
      armor: 23
    },
    extraStats: {
      healthMax: 9,
      defense: 14,
      armor: 25
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 15
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
      healthMax: 8,
      defense: 8,
      armor: 20
    },
    extraStats: {
      healthMax: 10,
      defense: 10,
      armor: 24
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 15
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
      healthMax: 16,
      defense: 8,
      armor: 40
    },
    extraStats: {
      healthMax: 20,
      defense: 11,
      armor: 24
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 15
    }]
  }
}
