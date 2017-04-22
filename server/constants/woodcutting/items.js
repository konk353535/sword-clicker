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
    sellPrice: 100,
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
    sellPrice: 500,
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
    sellPrice: 1000,
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
    sellPrice: 1000,
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
    sellPrice: 1000,
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
    sellPrice: 50
  },

  oak_log: {
    id: 'oak_log',
    icon: 'oakLog',
    category: 'woodcutting',
    name: 'oak log',
    sellPrice: 100
  },

  maple_log: {
    id: 'maple_log',
    icon: 'mapleLog',
    category: 'woodcutting',
    name: 'maple log',
    sellPrice: 150
  }
}
