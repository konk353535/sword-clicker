export const ITEMS = {
  ore_stone: {
    id: 'ore_stone',
    icon: 'stone',
    category: 'mining',
    name: 'stone',
    sellPrice: 1
  },

  ore_copper: {
    id: 'ore_copper',
    icon: 'copper',
    category: 'mining',
    name: 'copper',
    sellPrice: 2
  },

  ore_coal: {
    id: 'ore_coal',
    icon: 'coal',
    category: 'mining',
    name: 'coal',
    sellPrice: 10
  },

  stone_furnace: {
    id: 'stone_furnace',
    icon: 'stoneFurnace',
    category: 'crafting',
    name: 'stone furnace',
    sellPrice: 1,
    description: 'Used to melt ores into bars'
  },

  copper_bar: {
    id: 'copper_bar',
    icon: 'copperBar',
    category: 'crafting',
    name: 'copper bar',
    sellPrice: 20,
    description: 'Used to craft copper tools and weapons'
  },

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
    stats: {
      attack: 1, // Deal a min of 1 damage
      attackMax: 2, // Deal a max of 2 damage
      attackSpeed: 2, // Attacks per second
      accuracy: 1 // Chance for weapon to hit
    },
    extraStats: {
      attack: 1, // Up to 1 extra attack
      attackMax: 1, // Up to 1 extra max attack
      accuracy: 2 // Up to 1 extra accuracy
    }
  },

  primitive_axe: {
    id: 'primitive_axe',
    icon: 'primitiveAxe',
    category: 'woodcutting',
    slot: 'axe',
    name: 'primitive axe',
    sellPrice: 25,
    description: 'A sharpened rock. Used for woodcutting',
    isAxe: true,
    stats: {
      attack: 1, // Determines what logs you can cut
      attackSpeed: 1, // How often you cut ( 1 per minute )
      accuracy: 1 // Extra chance of getting a log ( 1% extra chance )
    },
    extraStats: {
      attack: 1,
      attackSpeed: 1,
      accuracy: 24
    }
  },

  rat_head: {
    id: 'rat_head',
    icon: 'ratHead',
    category: 'misc',
    name: 'rat head',
    sellPrice: 5,
    description: 'Not very useful'
  }
}
