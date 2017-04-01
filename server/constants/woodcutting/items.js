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
      attack: 2,
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
      attack: 3, // Determines what logs you can cut
      attackSpeed: 2, // How often you cut ( 1 per minute )
      accuracy: 1 // Extra chance of getting a log ( 1% extra chance )
    },
    extraStats: {
      attack: 3,
      attackSpeed: 2,
      accuracy: 50
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
      attack: 6, // Determines what logs you can cut
      attackSpeed: 3, // How often you cut ( 1 per minute )
      accuracy: 25 // Extra chance of getting a log ( 1% extra chance )
    },
    extraStats: {
      attack: 4,
      attackSpeed: 3,
      accuracy: 50
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
      attack: 7, // Determines what logs you can cut
      attackSpeed: 3, // How often you cut ( 1 per minute )
      accuracy: 50 // Extra chance of getting a log ( 1% extra chance )
    },
    extraStats: {
      attack: 5,
      attackSpeed: 3,
      accuracy: 75
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
  }
}
