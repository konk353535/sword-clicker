export const WOODCUTTING_ITEMS = {
  primitive_axe: {
    id: 'primitive_axe',
    icon: 'primitiveAxe',
    category: 'woodcutting',
    slot: 'axe',
    name: 'primitive axe',
    sellPrice: 10,
    description: 'A sharpened rock. Used for woodcutting',
    isAxe: true,
    stats: {
      attack: 1, // Determines what logs you can cut
      attackSpeed: 1, // How often you cut ( 1 per minute )
      accuracy: 1 // Extra chance of getting a log ( 1% extra chance )
    },
    extraStats: {
      accuracy: 25
    }
  },

  copper_axe: {
    id: 'copper_axe',
    icon: 'copperAxe',
    category: 'woodcutting',
    slot: 'axe',
    name: 'copper axe',
    sellPrice: 50,
    description: 'An axe forged from copper. Used for woodcutting',
    isAxe: true,
    stats: {
      attack: 3,
      attackSpeed: 1,
      accuracy: 1
    },
    extraStats: {
      accuracy: 50,
      attackSpeed: 1
    }
  },

  iron_axe: {
    id: 'iron_axe',
    icon: 'ironAxe',
    category: 'woodcutting',
    slot: 'axe',
    name: 'iron axe',
    sellPrice: 100,
    description: 'An axe forged from iron. Used for woodcutting',
    isAxe: true,
    stats: {
      attack: 6,
      attackSpeed: 1,
      accuracy: 25
    },
    extraStats: {
      accuracy: 50,
      attackSpeed: 1
    }
  },

  steel_axe: {
    id: 'steel_axe',
    icon: 'steelAxe',
    category: 'woodcutting',
    slot: 'axe',
    name: 'steel axe',
    sellPrice: 200,
    description: 'An axe forged from steel. Used for woodcutting',
    isAxe: true,
    stats: {
      attack: 9,
      attackSpeed: 1,
      accuracy: 50
    },
    extraStats: {
      accuracy: 75,
      attackSpeed: 1
    }
  },

  carbon_axe: {
    id: 'carbon_axe',
    icon: 'carbonAxe',
    category: 'woodcutting',
    slot: 'axe',
    name: 'carbon axe',
    sellPrice: 300,
    description: 'An axe forged from carbon. Used for woodcutting',
    isAxe: true,
    stats: {
      attack: 12,
      attackSpeed: 1,
      accuracy: 1
    },
    extraStats: {
      accuracy: 24,
      attackSpeed: 1
    }
  },

  mithril_axe: {
    id: 'mithril_axe',
    icon: 'mithrilAxe',
    category: 'woodcutting',
    slot: 'axe',
    name: 'mithril axe',
    sellPrice: 500,
    description: 'An axe forged from mithril. Used for woodcutting',
    isAxe: true,
    stats: {
      attack: 15,
      attackSpeed: 1,
      accuracy: 25
    },
    extraStats: {
      accuracy: 75,
      attackSpeed: 1
    }
  },

  adamantium_axe: {
    id: 'adamantium_axe',
    icon: 'adamantiumAxe',
    category: 'woodcutting',
    slot: 'axe',
    name: 'adamantium axe',
    sellPrice: 750,
    description: 'An axe forged from adamantium. Used for woodcutting',
    isAxe: true,
    stats: {
      attack: 18,
      attackSpeed: 2,
      accuracy: 50
    },
    extraStats: {
      accuracy: 75,
      attackSpeed: 1
    }
  },

  orichalcum_axe: {
    id: 'orichalcum_axe',
    icon: 'orichalcumAxe',
    category: 'woodcutting',
    slot: 'axe',
    name: 'orichalcum axe',
    sellPrice: 1000,
    description: 'An axe forged from orichalcum. Used for woodcutting',
    isAxe: true,
    stats: {
      attack: 21,
      attackSpeed: 2,
      accuracy: 75
    },
    extraStats: {
      accuracy: 75,
      attackSpeed: 1
    }
  },

  cobalt_axe: {
    id: 'cobalt_axe',
    icon: 'cobaltAxe',
    category: 'woodcutting',
    slot: 'axe',
    name: 'cobalt axe',
    sellPrice: 1500,
    description: 'An axe forged from cobalt. Used for woodcutting',
    isAxe: true,
    stats: {
      attack: 24,
      attackSpeed: 2,
      accuracy: 25
    },
    extraStats: {
      accuracy: 50,
      attackSpeed: 1
    }
  },

  fairy_steel_axe: {
    id: 'fairy_steel_axe',
    icon: 'fairySteelAxe',
    category: 'woodcutting',
    slot: 'axe',
    name: 'fairy steel axe',
    sellPrice: 2000,
    description: 'An axe forged from fairy steel. Used for woodcutting',
    isAxe: true,
    stats: {
      attack: 27,
      attackSpeed: 2,
      accuracy: 50
    },
    extraStats: {
      accuracy: 75,
      attackSpeed: 1
    }
  },

  cursed_axe: {
    id: 'cursed_axe',
    icon: 'cursedAxe',
    category: 'woodcutting',
    slot: 'axe',
    name: 'cursed axe',
    sellPrice: 750,
    description: 'A cursed axe. Used for woodcutting',
    isAxe: true,
    stats: {
      attack: 30,
      attackSpeed: 2,
      accuracy: 50
    },
    extraStats: {
      accuracy: 75,
      attackSpeed: 1
    }
  },

  pine_log: {
    id: 'pine_log',
    icon: 'pineLog',
    category: 'woodcutting',
    name: 'pine log',
    sellPrice: 1
  },

  beech_log: {
    id: 'beech_log',
    icon: 'beechLog',
    category: 'woodcutting',
    name: 'beech log',
    sellPrice: 5
  },

  ash_log: {
    id: 'ash_log',
    icon: 'ashLog',
    category: 'woodcutting',
    name: 'ash log',
    sellPrice: 10
  },

  oak_log: {
    id: 'oak_log',
    icon: 'oakLog',
    category: 'woodcutting',
    name: 'oak log',
    sellPrice: 15
  },

  maple_log: {
    id: 'maple_log',
    icon: 'mapleLog',
    category: 'woodcutting',
    name: 'maple log',
    sellPrice: 20
  },

  walnut_log: {
    id: 'walnut_log',
    icon: 'walnutLog',
    category: 'woodcutting',
    name: 'walnut log',
    sellPrice: 30
  },

  cherry_log: {
    id: 'cherry_log',
    icon: 'cherryLog',
    category: 'woodcutting',
    name: 'cherry log',
    sellPrice: 40
  },

  mahogany_log: {
    id: 'mahogany_log',
    icon: 'mahoganyLog',
    category: 'woodcutting',
    name: 'mahogany log',
    sellPrice: 50
  },

  elk_log: {
    id: 'elk_log',
    icon: 'elkLog',
    category: 'woodcutting',
    name: 'elk log',
    sellPrice: 60
  },

  fiery_log: {
    id: 'fiery_log',
    icon: 'fieryLog',
    category: 'woodcutting',
    name: 'fiery log',
    sellPrice: 70
  },

  magic_log: {
    id: 'magic_log',
    icon: 'magicLog',
    category: 'woodcutting',
    name: 'magic log',
    sellPrice: 80
  }
}
