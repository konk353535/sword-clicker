export const TOWER_FLOOR_4 = {
  easy: {
    name: 'Greek Garden',
    image: 'greekGarden.jpeg',
    floor: 4,
    possibleBattles: [
      { enemies: [{ id: 'e_cat', amount: 1 }] },
      { enemies: [{ id: 'e_turtle', amount: 1 }] },
      { enemies: [{ id: 'e_boar', amount: 1 }] },
      { enemies: [{ id: 'e_goat', amount: 1 }] },
      { enemies: [{ id: 'e_fox', amount: 1 }] }
    ]
  },

  hard: {
    name: 'Rocky Mountain',
    image: 'rockyMountain.jpeg',
    floor: 4,
    possibleBattles: [
      { enemies: [{ id: 'wolf', amount: 1 }, { id: 'e_cat', amount: 1}] },
      { enemies: [{ id: 'beaver', amount: 1 }, { id: 'e_turtle', amount: 1}] },
      { enemies: [{ id: 'eagle', amount: 1 }, { id: 'e_boar', amount: 1}] },
      { enemies: [{ id: 'kangaroo', amount: 1 }, { id: 'e_goat', amount: 1}] },
      { enemies: [{ id: 'jellyFish', amount: 1 }, { id: 'e_fox', amount: 1}] }
    ]
  },

  veryHard: {
    name: 'Desert',
    image: 'desertLandscape.jpeg',
    floor: 4,
    possibleBattles: [
      { enemies: [{ id: 'e_cat', amount: 1 }, { id: 'e_wolf', amount: 1}] },
      { enemies: [{ id: 'e_turtle', amount: 1 }, { id: 'e_beaver', amount: 1}] },
      { enemies: [{ id: 'e_boar', amount: 1 }, { id: 'e_eagle', amount: 1}] },
      { enemies: [{ id: 'e_goat', amount: 1 }, { id: 'e_kangaroo', amount: 1}] },
      { enemies: [{ id: 'e_fox', amount: 1 }, { id: 'e_jellyFish', amount: 1}] }
    ]
  },

  boss: {
    possibleBattles: [{
      enemies: [
        { id: 'e_wolf', amount: 1 },
        { id: 'e_beaver', amount: 1 },
        { id: 'e_eagle', amount: 1 },
        { id: 'e_kangaroo', amount: 1 },
        { id: 'e_jellyFish', amount: 1 },
        { id: 'boss_spartan', amount: 1 }
      ]
    }]
  }
}
