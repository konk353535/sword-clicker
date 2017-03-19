const VERY_FAST_SPEED = 1.8;
const FAST_SPEED = 1.2;
const MEDIUM_SPEED = 0.8;
const SLOW_SPEED = 0.6;

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
    },
    extraStats: {
      attack: 1, // Up to 1 extra attack
      attackMax: 1, // Up to 1 extra max attack
      accuracy: 2 // Up to 1 extra accuracy
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
      attack: 1,
      attackMax: 2,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 1,
      defense: 2
    },
    extraStats: {
      attack: 1,
      attackMax: 1,
      accuracy: 2
    }
  },
}
