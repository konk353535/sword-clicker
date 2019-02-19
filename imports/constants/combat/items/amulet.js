export const AMULET_ITEMS = {
  stone_amulet: {
    id: 'stone_amulet',
    icon: 'stoneAmulet.png',
    category: 'combat',
    slot: 'neck',
    name: 'stone amulet',
    sellPrice: 40,
    description: 'An amulet with traces of magic. Click monsters to damage in combat.',
    isEquippable: true,
    isAttackAmulet: true,
    stats: {
      damage: 1, // Damage per click
      energyStorage: 10, // Max energy stored
      energyRegen: 10 // Per minute
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 1
    }]
  },

  shark_tooth_amulet: {
    id: 'shark_tooth_amulet',
    icon: 'sharkToothAmulet.svg',
    category: 'combat',
    slot: 'neck',
    name: 'shark tooth amulet',
    sellPrice: 120,
    description: 'An amulet with traces of magic. Click monsters to damage in combat.',
    isEquippable: true,
    isAttackAmulet: true,
    stats: {
      damage: 5, // Damage per click
      energyStorage: 5, // Max energy stored
      energyRegen: 5, // Per minute
      criticalChance: 3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 1
    }]
  },

  copper_amulet: {
    id: 'copper_amulet',
    icon: 'copperAmulet.png',
    category: 'combat',
    slot: 'neck',
    name: 'copper amulet',
    sellPrice: 200,
    description: 'An amulet with traces of magic. Click monsters to damage in combat.',
    isEquippable: true,
    isAttackAmulet: true,
    stats: {
      damage: 2,
      energyStorage: 10,
      energyRegen: 10,
      healthMax: 20,
      defense: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 5
    }]
  },

  tin_amulet: {
    id: 'tin_amulet',
    icon: 'tinAmulet.png',
    category: 'combat',
    slot: 'neck',
    name: 'tin amulet',
    sellPrice: 600,
    description: 'An amulet with traces of magic. Click monsters to damage in combat.',
    isEquippable: true,
    isAttackAmulet: true,
    stats: {
      damage: 3,
      energyStorage: 10,
      energyRegen: 10,
      magicPower: 5,
      magicArmor: 15
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 5
    }]
  },

  bronze_amulet: {
    id: 'bronze_amulet',
    icon: 'bronzeAmulet.png',
    category: 'combat',
    slot: 'neck',
    name: 'bronze amulet',
    sellPrice: 1000,
    description: 'An amulet with traces of magic. Click monsters to damage in combat.',
    isEquippable: true,
    isAttackAmulet: true,
    stats: {
      damage: 4,
      energyStorage: 10,
      energyRegen: 10,
      attack: 2,
      attackMax: 2,
      accuracy: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 5
    }]
  },

  iron_amulet: {
    id: 'iron_amulet',
    icon: 'ironAmulet.png',
    category: 'combat',
    slot: 'neck',
    name: 'iron amulet',
    sellPrice: 1400,
    description: 'An amulet with traces of magic. Click monsters to damage in combat.',
    isEquippable: true,
    isAttackAmulet: true,
    stats: {
      damage: 5,
      energyStorage: 10,
      energyRegen: 10,
      healthMax: 10,
      defense: 1,
      accuracy: 1,
      attackMax: 1,
      magicPower: 1
    },
    requiredEquip: [{
      type: 'skill',
      name: 'health',
      level: 10
    }]
  },

  silver_amulet: {
    id: 'silver_amulet',
    icon: 'silverAmulet.png',
    category: 'combat',
    slot: 'neck',
    name: 'silver amulet',
    sellPrice: 2000,
    description: 'An amulet with traces of magic. Click monsters to damage in combat.',
    isEquippable: true,
    isAttackAmulet: true,
    stats: {
      damage: 6,
      energyStorage: 10,
      energyRegen: 10,
      healthMax: 20,
      defense: 2,
      accuracy: 2,
      attackMax: 3,
      magicPower: 3
    },
    requiredEquip: [{
      type: 'skill',
      name: 'health',
      level: 20
    }]
  },

  gold_amulet: {
    id: 'gold_amulet',
    icon: 'goldAmulet.png',
    category: 'combat',
    slot: 'neck',
    name: 'gold amulet',
    sellPrice: 2500,
    description: 'An amulet with traces of magic. Click monsters to damage in combat.',
    isEquippable: true,
    isAttackAmulet: true,
    stats: {
      damage: 7,
      energyStorage: 10,
      energyRegen: 10,
      healthMax: 50,
      defense: 4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 15
    }]
  },

  carbon_amulet: {
    id: 'carbon_amulet',
    icon: 'carbonAmulet.png',
    category: 'combat',
    slot: 'neck',
    name: 'carbon amulet',
    sellPrice: 3000,
    description: 'An amulet with traces of magic. Click monsters to damage in combat.',
    isEquippable: true,
    isAttackAmulet: true,
    stats: {
      damage: 8,
      energyStorage: 10,
      energyRegen: 10,
      magicPower: 10,
      magicArmor: 30
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 15
    }]
  },

  steel_amulet: {
    id: 'steel_amulet',
    icon: 'steelAmulet.png',
    category: 'combat',
    slot: 'neck',
    name: 'steel amulet',
    sellPrice: 3500,
    description: 'An amulet with traces of magic. Click monsters to damage in combat.',
    isEquippable: true,
    isAttackAmulet: true,
    stats: {
      damage: 9,
      energyStorage: 10,
      energyRegen: 10,
      attack: 5,
      attackMax: 5,
      accuracy: 4
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 15
    }]
  },

  platinum_amulet: {
    id: 'platinum_amulet',
    icon: 'platinumAmulet.png',
    category: 'combat',
    slot: 'neck',
    name: 'platinum amulet',
    sellPrice: 4000,
    description: 'An amulet with traces of magic. Click monsters to damage in combat.',
    isEquippable: true,
    isAttackAmulet: true,
    stats: {
      damage: 10,
      energyStorage: 10,
      energyRegen: 10,
      healthMax: 40,
      defense: 3,
      accuracy: 3,
      attackMax: 5,
      magicPower: 5
    },
    requiredEquip: [{
      type: 'skill',
      name: 'health',
      level: 20
    }]
  },

  titanium_amulet: {
    id: 'titanium_amulet',
    icon: 'titaniumAmulet.png',
    category: 'combat',
    slot: 'neck',
    name: 'titanium amulet',
    sellPrice: 5000,
    description: 'An amulet with traces of magic. Click monsters to damage in combat.',
    isEquippable: true,
    isAttackAmulet: true,
    stats: {
      damage: 11,
      energyStorage: 10,
      energyRegen: 10,
      healthMax: 100,
      defense: 6
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 30
    }]
  },

  tungsten_amulet: {
    id: 'tungsten_amulet',
    icon: 'tungstenAmulet.png',
    category: 'combat',
    slot: 'neck',
    name: 'tungsten amulet',
    sellPrice: 6000,
    description: 'An amulet with traces of magic. Click monsters to damage in combat.',
    isEquippable: true,
    isAttackAmulet: true,
    stats: {
      damage: 12,
      energyStorage: 10,
      energyRegen: 10,
      magicPower: 15,
      magicArmor: 45
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 25
    }]
  },

  obsidian_amulet: {
    id: 'obsidian_amulet',
    icon: 'obsidianAmulet.png',
    category: 'combat',
    slot: 'neck',
    name: 'obsidian amulet',
    sellPrice: 7000,
    description: 'An amulet with traces of magic. Click monsters to damage in combat.',
    isEquippable: true,
    isAttackAmulet: true,
    stats: {
      damage: 13,
      energyStorage: 10,
      energyRegen: 10,
      attack: 10,
      attackMax: 10,
      accuracy: 6
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 30
    }]
  },

  cobalt_amulet: {
    id: 'cobalt_amulet',
    icon: 'cobaltAmulet.png',
    category: 'combat',
    slot: 'neck',
    name: 'cobalt amulet',
    sellPrice: 8000,
    description: 'An amulet with traces of magic. Click monsters to damage in combat.',
    isEquippable: true,
    isAttackAmulet: true,
    stats: {
      damage: 14,
      energyStorage: 10,
      energyRegen: 10,
      healthMax: 70,
      defense: 4,
      accuracy: 4,
      magicPower: 7,
      attackMax: 9
    },
    requiredEquip: [{
      type: 'skill',
      name: 'health',
      level: 30
    }]
  },

  mithril_amulet: {
    id: 'mithril_amulet',
    icon: 'mithrilAmulet.png',
    category: 'combat',
    slot: 'neck',
    name: 'mithril amulet',
    sellPrice: 9000,
    description: 'An amulet with traces of magic. Click monsters to damage in combat.',
    isEquippable: true,
    isAttackAmulet: true,
    stats: {
      damage: 15,
      energyStorage: 10,
      energyRegen: 10,
      healthMax: 150,
      defense: 8
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 45
    }]
  },

  adamantium_amulet: {
    id: 'adamantium_amulet',
    icon: 'adamantiumAmulet.png',
    category: 'combat',
    slot: 'neck',
    name: 'adamantium amulet',
    sellPrice: 10000,
    description: 'An amulet with traces of magic. Click monsters to damage in combat.',
    isEquippable: true,
    isAttackAmulet: true,
    stats: {
      damage: 16,
      energyStorage: 10,
      energyRegen: 10,
      magicPower: 20,
      magicArmor: 60
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 35
    }]
  },

  orichalcum_amulet: {
    id: 'orichalcum_amulet',
    icon: 'orichalcumAmulet.png',
    category: 'combat',
    slot: 'neck',
    name: 'orichalcum amulet',
    sellPrice: 11000,
    description: 'An amulet with traces of magic. Click monsters to damage in combat.',
    isEquippable: true,
    isAttackAmulet: true,
    stats: {
      damage: 17,
      energyStorage: 10,
      energyRegen: 10,
      attackMax: 15,
      attack: 15,
      accuracy: 8
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 45
    }]
  },

  meteorite_amulet: {
    id: 'meteorite_amulet',
    icon: 'meteoriteAmulet.png',
    category: 'combat',
    slot: 'neck',
    name: 'meteorite amulet',
    sellPrice: 12000,
    description: 'An amulet with traces of magic. Click monsters to damage in combat.',
    isEquippable: true,
    isAttackAmulet: true,
    stats: {
      damage: 18,
      energyStorage: 10,
      energyRegen: 10,
      healthMax: 100,
      defense: 6,
      accuracy: 6,
      attackMax: 12,
      magicPower: 10

    },
    requiredEquip: [{
      type: 'skill',
      name: 'health',
      level: 60
    }]
  },

  fairy_steel_amulet: {
    id: 'fairy_steel_amulet',
    icon: 'fairySteelAmulet.png',
    category: 'combat',
    slot: 'neck',
    name: 'fairy steel amulet',
    sellPrice: 13000,
    description: 'An amulet with traces of magic. Click monsters to damage in combat.',
    isEquippable: true,
    isAttackAmulet: true,
    stats: {
      damage: 19,
      energyStorage: 10,
      energyRegen: 10,
      healthMax: 400,
      defense: 8
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 60
    }]
  },

  elven_steel_amulet: {
    id: 'elven_steel_amulet',
    icon: 'elvenSteelAmulet.png',
    category: 'combat',
    slot: 'neck',
    name: 'elven steel amulet',
    sellPrice: 14000,
    description: 'An amulet with traces of magic. Click monsters to damage in combat.',
    isEquippable: true,
    isAttackAmulet: true,
    stats: {
      damage: 20,
      energyStorage: 10,
      energyRegen: 10,
      magicPower: 25,
      magicArmor: 75
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 45
    }]
  },

  cursed_amulet: {
    id: 'cursed_amulet',
    icon: 'cursedAmulet.png',
    category: 'combat',
    slot: 'neck',
    name: 'cursed amulet',
    sellPrice: 15000,
    description: 'An amulet with traces of magic. Click monsters to damage in combat.',
    isEquippable: true,
    isAttackAmulet: true,
    stats: {
      damage: 21,
      energyStorage: 10,
      energyRegen: 10,
      attackMax: 25,
      attack: 25,
      accuracy: 10
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 60
    }]
  },

  // Amulet of accuracy
  jade_amulet: {
    id: 'jade_amulet',
    icon: 'jadeAmulet.png',
    category: 'combat',
    slot: 'neck',
    name: 'jade amulet',
    sellPrice: 1000,
    description: 'A magic amulet. Click monsters to damage in combat.',
    isEquippable: true,
    isAttackAmulet: true,
    stats: {
      damage: 6, // Damage per click
      energyStorage: 20, // Max energy stored
      energyRegen: 2, // Per minute
      accuracy: 15
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 15
    }]
  },

  // Amulet of defense
  lapislazuli_amulet: {
    id: 'lapislazuli_amulet',
    icon: 'lapislazuliAmulet.png',
    category: 'combat',
    slot: 'neck',
    name: 'lapis lazuli amulet',
    sellPrice: 2000,
    description: 'A magic amulet. Click monsters to damage in combat.',
    isEquippable: true,
    isAttackAmulet: true,
    stats: {
      damage: 12,
      energyStorage: 20,
      energyRegen: 2,
      healthMax: 100,
      defense: 10
    },
    requiredEquip: [{
      type: 'skill',
      name: 'defense',
      level: 25
    }]
  },

  // Amulet of Wisdom (magic)
  sapphire_amulet: {
    id: 'sapphire_amulet',
    icon: 'sapphireAmulet.png',
    category: 'combat',
    slot: 'neck',
    name: 'sapphire amulet',
    sellPrice: 5000,
    description: 'A magic amulet. Click monsters to damage in combat.',
    isEquippable: true,
    isAttackAmulet: true,
    stats: {
      damage: 18,
      energyStorage: 20,
      magicPower: 20,
      energyRegen: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'magic',
      level: 25
    }]
  },

  // Amulet of health
  emerald_amulet: {
    id: 'emerald_amulet',
    icon: 'emeraldAmulet.png',
    category: 'combat',
    slot: 'neck',
    name: 'emerald amulet',
    sellPrice: 10000,
    description: 'A magic amulet. Click monsters to damage in combat.',
    isEquippable: true,
    isAttackAmulet: true,
    stats: {
      damage: 24,
      healthMax: 300,
      energyStorage: 20,
      energyRegen: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'health',
      level: 25
    }]
  },

  // Amulet of power (damage)
  ruby_amulet: {
    id: 'ruby_amulet',
    icon: 'rubyAmulet.png',
    category: 'combat',
    slot: 'neck',
    name: 'ruby amulet',
    sellPrice: 15000,
    description: 'A magic amulet. Click monsters to damage in combat.',
    isEquippable: true,
    isAttackAmulet: true,
    stats: {
      damage: 30,
      attack: 20,
      attackMax: 30,
      energyStorage: 20,
      energyRegen: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 50
    }]
  },

  // Amulet of balance
  tanzanite_amulet: {
    id: 'tanzanite_amulet',
    icon: 'tanzaniteAmulet.png',
    category: 'combat',
    slot: 'neck',
    name: 'tanzanite amulet',
    sellPrice: 20000,
    description: 'A magic amulet. Click monsters to damage in combat.',
    isEquippable: true,
    isAttackAmulet: true,
    stats: {
      damage: 36,
      attack: 10,
      attackMax: 10,
      accuracy: 10,
      defense: 10,
      healthMax: 100,
      magicPower: 5,
      magicArmor: 20,
      energyStorage: 20,
      energyRegen: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 50
    }, {
      type: 'skill',
      name: 'defense',
      level: 50
    }, {
      type: 'skill',
      name: 'magic',
      level: 25
    }, {
      type: 'skill',
      name: 'health',
      level: 50
    }]
  },

  // Amulet of absorption
  fireopal_amulet: {
    id: 'fireopal_amulet',
    icon: 'fireOpalAmulet.png',
    category: 'combat',
    slot: 'neck',
    name: 'fire opal amulet',
    sellPrice: 30000,
    description: 'A magic amulet. Click monsters to damage in combat.',
    isEquippable: true,
    isAttackAmulet: true,
    stats: {
      damage: 40,
      attack: 16,
      attackMax: 20,
      healthMax: 160,
      magicArmor: 30,
      energyStorage: 30,
      energyRegen: 2
    },
    requiredEquip: [{
      type: 'skill',
      name: 'attack',
      level: 75
    }, {
      type: 'skill',
      name: 'defense',
      level: 75
    }],
    enchantments: ['fireopal_amulet']
  }
};
