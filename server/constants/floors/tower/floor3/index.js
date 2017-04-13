export const TOWER_FLOOR_3 = {
  easy: {
    name: 'Poppy Field',
    image: 'poppyField.jpg',
    floor: 3,
    possibleBattles: [
      { enemies: [{ id: 'e_spider', amount: 1 }] },
      { enemies: [{ id: 'e_snake', amount: 1 }] },
      { enemies: [{ id: 'e_falcon', amount: 1 }] },
      { enemies: [{ id: 'e_skunk', amount: 1 }] },
      { enemies: [{ id: 'e_lizard', amount: 1 }] }
    ]
  },

  hard: {
    name: 'Mysterious Woods',
    image: 'mysteriousWoods.jpeg',
    floor: 3,
    possibleBattles: [
      { enemies: [{ id: 'cat', amount: 1 }, { id: 'e_spider', amount: 1}] },
      { enemies: [{ id: 'turtle', amount: 1 }, { id: 'e_snake', amount: 1}] },
      { enemies: [{ id: 'boar', amount: 1 }, { id: 'e_falcon', amount: 1}] },
      { enemies: [{ id: 'goat', amount: 1 }, { id: 'e_skunk', amount: 1}] },
      { enemies: [{ id: 'fox', amount: 1 }, { id: 'e_lizard', amount: 1}] }
    ]
  },

  veryHard: {
    name: 'Green Lake',
    image: 'greenLake.jpeg',
    floor: 3,
    possibleBattles: [
      { enemies: [{ id: 'e_cat', amount: 1 }, { id: 'e_spider', amount: 1}] },
      { enemies: [{ id: 'e_turtle', amount: 1 }, { id: 'e_snake', amount: 1}] },
      { enemies: [{ id: 'e_boar', amount: 1 }, { id: 'e_falcon', amount: 1}] },
      { enemies: [{ id: 'e_goat', amount: 1 }, { id: 'e_skunk', amount: 1}] },
      { enemies: [{ id: 'e_fox', amount: 1 }, { id: 'e_lizard', amount: 1}] }
    ]
  },

  boss: {
    possibleBattles: [{
      enemies: [
        { id: 'e_cat', amount: 1 },
        { id: 'e_turtle', amount: 1 },
        { id: 'e_boar', amount: 1 },
        { id: 'e_goat', amount: 1 },
        { id: 'e_fox', amount: 1 },
        { id: 'boss_bone_warrior', amount: 1 }
      ]
    }]
  }
}
