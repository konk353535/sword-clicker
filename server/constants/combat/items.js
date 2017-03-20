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
      attackMax: 4,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 2,
      defense: 2
    },
    extraStats: {
      attack: 2,
      attackMax: 2,
      accuracy: 2,
      defense: 2
    }
  },
}
