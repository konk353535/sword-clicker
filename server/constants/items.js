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
    slot: 'mainHand',
    name: 'copper dagger',
    sellPrice: 100,
    description: 'A poorly made dagger.',
    isWeapon: true,
    stats: {
      attack: 1, // Deal a min of 1 damage
      attackMax: 3, // Deal a max of 3 damage
      attackSpeed: 0.2, // Attacks per second
      accuracy: 1 // Chance for weapon to hit
    }
  }
}
