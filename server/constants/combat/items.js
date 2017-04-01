const VERY_FAST_SPEED = 0.9;
const FAST_SPEED = 0.7;
const MEDIUM_SPEED = 0.5;
const SLOW_SPEED = 0.3;

export const COMBAT_ITEMS = {
  copper_dagger: {
    id: 'copper_dagger',
    icon: 'copperDagger',
    category: 'combat',
    weaponType: 'dagger',
    slot: 'mainHand',
    name: 'copper dagger',
    sellPrice: 100,
    description: 'A poorly made dagger.',
    isWeapon: true,
    isEquippable: true,
    stats: {
      attack: 1, // Deal a min of 1 damage
      attackMax: 2, // Deal a max of 2 damage
      attackSpeed: FAST_SPEED, // Attacks per second
      accuracy: 1 // Chance for weapon to hit
    }
  },

  copper_spear: {
    id: 'copper_spear',
    icon: 'copperSpear',
    category: 'combat',
    weaponType: 'spear',
    slot: 'mainHand',
    name: 'copper spear',
    sellPrice: 150,
    description: 'Often used for defense',
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
    sellPrice: 150,
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
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 2
    }]
  },

  copper_long_sword: {
    id: 'copper_long_sword',
    icon: 'copperLongSword',
    category: 'combat',
    weaponType: 'longSword',
    slot: 'mainHand',
    name: 'copper long sword',
    sellPrice: 150,
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
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 2
    }]
  },

  copper_battle_axe: {
    id: 'copper_battle_axe',
    icon: 'copperBattleAxe',
    category: 'combat',
    weaponType: 'battleAxe',
    slot: 'mainHand',
    name: 'copper battle axe',
    sellPrice: 150,
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
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 2
    }]
  },

  copper_helmet: {
    id: 'copper_helmet',
    icon: 'copperHelmet',
    category: 'combat',
    slot: 'head',
    name: 'copper helmet',
    sellPrice: 150,
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
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 1
    }]
  },

  copper_chest_plate: {
    id: 'copper_chest_plate',
    icon: 'copperChestPlate',
    category: 'combat',
    slot: 'chest',
    name: 'copper chestplate',
    sellPrice: 150,
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
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 1
    }]
  },

  copper_plate_legs: {
    id: 'copper_plate_legs',
    icon: 'copperPlateLegs',
    category: 'combat',
    slot: 'legs',
    name: 'copper platelegs',
    sellPrice: 150,
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
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 1
    }]
  },
}
