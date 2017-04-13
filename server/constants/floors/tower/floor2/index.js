export const TOWER_FLOOR_2 = {
  easy: {
    name: 'Greek Garden',
    image: 'greekGarden.jpeg',
    floor: 2,
    possibleBattles: [
      { enemies: [{ id: 'e_rat', amount: 3 }] },
      { enemies: [{ id: 'e_rabbit', amount: 1 }] },
      { enemies: [{ id: 'e_crab', amount: 1 }] },
      { enemies: [{ id: 'e_snail', amount: 1 }] },
      { enemies: [{ id: 'e_wasp', amount: 1 }] }
    ]
  },

  hard: {
    name: 'Rocky Mountain',
    image: 'rockyMountain.jpeg',
    floor: 2,
    possibleBattles: [
      { enemies: [{ id: 'e_rat', amount: 3 }, { id: 'spider', amount: 1}] },
      { enemies: [{ id: 'e_rabbit', amount: 1 }, { id: 'snake', amount: 1}] },
      { enemies: [{ id: 'e_crab', amount: 1 }, { id: 'falcon', amount: 1}] },
      { enemies: [{ id: 'e_snail', amount: 1 }, { id: 'skunk', amount: 1}] },
      { enemies: [{ id: 'e_wasp', amount: 1 }, { id: 'lizard', amount: 1}] }
    ]
  },

  veryHard: {
    name: 'Desert',
    image: 'desertLandscape.jpeg',
    floor: 2,
    possibleBattles: [
      { enemies: [{ id: 'e_rat', amount: 3 }, { id: 'e_spider', amount: 1}] },
      { enemies: [{ id: 'e_rabbit', amount: 1 }, { id: 'e_snake', amount: 1}] },
      { enemies: [{ id: 'e_crab', amount: 1 }, { id: 'e_falcon', amount: 1}] },
      { enemies: [{ id: 'e_snail', amount: 1 }, { id: 'e_skunk', amount: 1}] },
      { enemies: [{ id: 'e_wasp', amount: 1 }, { id: 'e_lizard', amount: 1}] }
    ]
  },

  boss: {
    possibleBattles: [{
      enemies: [
        { id: 'e_spider', amount: 1 },
        { id: 'e_snake', amount: 1 },
        { id: 'e_falcon', amount: 1 },
        { id: 'e_skunk', amount: 1 },
        { id: 'e_lizard', amount: 1 },
        { id: 'boss_cobra', amount: 1 }
      ]
    }]
  }
}
