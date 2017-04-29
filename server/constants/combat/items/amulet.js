export const AMULET_ITEMS = {
  stone_amulet: {
    id: 'stone_amulet',
    icon: 'stoneAmulet',
    category: 'combat',
    slot: 'neck',
    name: 'stone amulet',
    sellPrice: 40,
    description: 'An amulet with traices of magic.',
    isEquippable: true,
    isAttackAmulet: true,
    stats: {
      attack: 1, // Damage per click
      energyStorage: 10, // Max energy stored
      energyRegen: 10 // Per minute
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 1
    }]
  },

  jade_amulet: {
    id: 'jade_amulet',
    icon: 'jadeAmulet',
    category: 'combat',
    slot: 'neck',
    name: 'jade amulet',
    sellPrice: 1000,
    description: 'A magic amulet.',
    isEquippable: true,
    isAttackAmulet: true,
    stats: {
      attack: 2, // Damage per click
      energyStorage: 10, // Max energy stored
      energyRegen: 10 // Per minute
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 5
    }]
  },

  lapislazuli_amulet: {
    id: 'lapislazuli_amulet',
    icon: 'lapislazuliAmulet',
    category: 'combat',
    slot: 'neck',
    name: 'lapis lazuli amulet',
    sellPrice: 2000,
    description: 'A magic amulet.',
    isEquippable: true,
    isAttackAmulet: true,
    stats: {
      attack: 2,
      energyStorage: 25,
      energyRegen: 10
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 10
    }]
  }
}
