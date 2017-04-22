import { VERY_FAST_SPEED, FAST_SPEED, MEDIUM_SPEED, SLOW_SPEED } from '/server/constants/combat/attackSpeeds';

export const MISC_ITEMS = {
  thirsting_saber: {
    id: 'thirsting_saber',
    icon: 'thirstingSaber',
    category: 'combat',
    weaponType: 'sword',
    slot: 'mainHand',
    name: 'thirsting saber',
    sellPrice: 2500,
    description: 'The blade seems to hunger for blood.',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 21,
      attackMax: 30,
      attackSpeed: FAST_SPEED,
      accuracy: 33,
    },
    extraStats: {
      attack: 4,
      attackMax: 4,
      accuracy: 4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 20
    }]
  },

  cursed_long_sword: {
    id: 'cursed_long_sword',
    icon: 'cursedLongSword',
    category: 'combat',
    weaponType: 'longSword',
    slot: 'mainHand',
    name: 'cursed long sword',
    sellPrice: 5000,
    description: 'Rumored to be cursed, those who use it perish',
    isTwoHanded: true,
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 33,
      attackMax: 44,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 44,
      defense: -10,
      armor: -10,
      health: -10
    },
    extraStats: {
      attack: 5,
      attackMax: 5,
      accuracy: 5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 20
    }]
  },

  spartan_shield: {
    id: 'spartan_shield',
    icon: 'spartanShield',
    category: 'combat',
    slot: 'offHand',
    name: 'spartan shield',
    sellPrice: 2500,
    description: 'The shield from a fallen spartan.',
    isEquippable: true,
    stats: {
      healthMax: 45,
      defense: 25,
      armor: 80
    },
    extraStats: {
      healthMax: 5,
      defense: 5,
      armor: 5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 20
    }]
  }
}
