export const TOWER_FLOOR_1 = {
  easy: {
    name: 'Grass Fields',
    image: 'grassField.jpeg',
    floor: 1,
    possibleBattles: [
      { enemies: [{ id: 'e_fly', amount: 3 }] },
      { enemies: [{ id: 'e_grasshopper', amount: 1 }] },
      { enemies: [{ id: 'e_mouse', amount: 1 }] },
      { enemies: [{ id: 'e_bee', amount: 1 }] },
      { enemies: [{ id: 'e_bird', amount: 1 }] }
    ]
  },

  hard: {
    name: 'Woods',
    image: 'woods.jpg',
    floor: 1,
    possibleBattles: [
      { enemies: [{ id: 'e_fly', amount: 3 }, { id: 'rat', amount: 3 }] },
      { enemies: [{ id: 'e_grasshopper', amount: 1 }, { id: 'rabbit', amount: 1 }] },
      { enemies: [{ id: 'e_mouse', amount: 1 }, { id: 'crab', amount: 1 }] },
      { enemies: [{ id: 'e_bee', amount: 1 }, { id: 'snail', amount: 1 }] },
      { enemies: [{ id: 'e_bird', amount: 1 }, { id: 'wasp', amount: 1 }] }
    ]
  },

  veryHard: {
    name: 'Misty Ruins',
    image: 'mistyRuins.jpeg',
    floor: 1,
    possibleBattles: [
      { enemies: [{ id: 'e_fly', amount: 3 }, { id: 'e_rat', amount: 3 }] },
      { enemies: [{ id: 'e_grasshopper', amount: 1 }, { id: 'e_rabbit', amount: 1 }] },
      { enemies: [{ id: 'e_mouse', amount: 1 }, { id: 'e_crab', amount: 1 }] },
      { enemies: [{ id: 'e_bee', amount: 1 }, { id: 'e_snail', amount: 1 }] },
      { enemies: [{ id: 'e_bird', amount: 1 }, { id: 'e_wasp', amount: 1 }] }
    ]
  },

  boss: {
    possibleBattles: [{
      enemies: [
        { id: 'e_rabbit', amount: 1 },
        { id: 'e_snail', amount: 1 },
        { id: 'e_wasp', amount: 1 },
        { id: 'boss_cougar', amount: 1 }
      ]
    }]
  }
}
