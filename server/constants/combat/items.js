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
      attackSpeed: 2, // Attacks per second
      accuracy: 1 // Chance for weapon to hit
    },
    extraStats: {
      attack: 1, // Up to 1 extra attack
      attackMax: 1, // Up to 1 extra max attack
      accuracy: 2 // Up to 1 extra accuracy
    }
  },
}
