export const AMULET_ITEMS = {
  stone_amulet: {
    id: 'stone_amulet',
    icon: 'stoneAmulet',
    category: 'combat',
    slot: 'neck',
    name: 'stone amulet',
    sellPrice: 40,
    description: 'An amulet with traces of magic. Click monsters to damage in combat.',
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

  mithril_amulet: {
    id: 'mithril_amulet',
    icon: 'mithrilAmulet',
    category: 'combat',
    slot: 'neck',
    name: 'mithril amulet',
    sellPrice: 400,
    description: 'A mithril amulet. Click monsters to damage in combat.',
    isEquippable: true,
    isAttackAmulet: true,
    stats: {
      attack: 2, // Damage per click
      energyStorage: 15, // Max energy stored
      energyRegen: 5 // Per minute
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 10
    }]
  },

  jade_amulet: {
    id: 'jade_amulet',
    icon: 'jadeAmulet',
    category: 'combat',
    slot: 'neck',
    name: 'jade amulet',
    sellPrice: 600,
    description: 'A magic amulet. Click monsters to damage in combat.',
    isEquippable: true,
    isAttackAmulet: true,
    stats: {
      attack: 3, // Damage per click
      energyStorage: 15, // Max energy stored
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
    description: 'A magic amulet. Click monsters to damage in combat.',
    isEquippable: true,
    isAttackAmulet: true,
    stats: {
      attack: 5,
      energyStorage: 10,
      energyRegen: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 10
    }]
  }
}
