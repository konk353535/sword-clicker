export const LEVEL_1_TO_10 = {
  // 10 waves per level, then progress to the next level
  1: {
    waves: [
      { enemies: [{ id: 'fly', amount: 1 }] },
      { enemies: [{ id: 'grasshopper', amount: 1 }] },
      { enemies: [{ id: 'mouse', amount: 1 }] },
      { enemies: [{ id: 'bird', amount: 1 }] },
      { enemies: [{ id: 'bee', amount: 1 }] }
    ]
  },

  2: {
    waves: [
      { enemies: [{ id: 'bird', amount: 2 }] },
      { enemies: [{ id: 'grasshopper', amount: 1 }, { id: 'mouse', amount: 1 }] },
      { enemies: [{ id: 'fly', amount: 1 }, { id: 'bee', amount: 1 }] },
      { enemies: [{ id: 'bird', amount: 1 }, { id: 'mouse', amount: 1 }] },
      { enemies: [{ id: 'fly', amount: 4 }] }
    ]
  },

  3: {
    waves: [
      { enemies: [{ id: 'bird', amount: 1 }, { id: 'grasshopper', amount: 1 }, { id: 'bee', amount: 1 }] },
      { enemies: [{ id: 'mouse', amount: 1 }, { id: 'fly', amount: 3 }, { id: 'bee', amount: 1 }] },
      { enemies: [{ id: 'bee', amount: 5 }] },
      { enemies: [{ id: 'mouse', amount: 3}, { id: 'grasshopper', amount: 1 }] },
      { enemies: [{ id: 'bird', amount: 2}, { id: 'grasshopper', amount: 2 }] },
    ]
  },

  4: {
    waves: [
      { enemies: [{ id: 'rat', amount: 1 }] },
      { enemies: [{ id: 'rabbit', amount: 1 }] },
      { enemies: [{ id: 'crab', amount: 1 }] },
      { enemies: [{ id: 'snail', amount: 1 }] },
      { enemies: [{ id: 'wasp', amount: 1 }] }
    ]
  },

  5: {
    waves: [
      { enemies: [{ id: 'rat', amount: 3 }] },
      { enemies: [{ id: 'rabbit', amount: 1 }, { id: 'crab', amount: 1 }] },
      { enemies: [{ id: 'crab', amount: 1 }, { id: 'snail', amount: 1 }] },
      { enemies: [{ id: 'snail', amount: 1 }, { id: 'wasp', amount: 1 }] },
      { enemies: [{ id: 'wasp', amount: 1 }, { id: 'rat', amount: 2 }] }
    ]
  },

  6: {
    waves: [
      { enemies: [{ id: 'rat', amount: 3 }, { id: 'fly', amount: 5 }] },
      { enemies: [{ id: 'rabbit', amount: 2 }, { id: 'grasshopper', amount: 2 }] },
      { enemies: [{ id: 'crab', amount: 1 }, { id: 'bee', amount: 3 }] },
      { enemies: [{ id: 'snail', amount: 1 }, { id: 'mouse', amount: 3 }] },
      { enemies: [{ id: 'wasp', amount: 1 }, { id: 'bird', amount: 2 }] }
    ]
  },

  7: {
    waves: [
      { enemies: [{ id: 'spider', amount: 1 }] },
      { enemies: [{ id: 'snake', amount: 1 }] },
      { enemies: [{ id: 'falcon', amount: 1 }] },
      { enemies: [{ id: 'skunk', amount: 1 }] },
      { enemies: [{ id: 'lizard', amount: 1 }] }
    ]
  },

  8: {
    waves: [
      { enemies: [{ id: 'spider', amount: 1 }, { id: 'e_fly', amount: 1 }] },
      { enemies: [{ id: 'snake', amount: 1 }, { id: 'e_grasshopper', amount: 1 }] },
      { enemies: [{ id: 'falcon', amount: 1 }, { id: 'e_mouse', amount: 1 }] },
      { enemies: [{ id: 'skunk', amount: 1 }, { id: 'e_bird', amount: 1 }] },
      { enemies: [{ id: 'lizard', amount: 1 }, { id: 'e_bee', amount: 1 }] }
    ]
  },

  9: {
    waves: [
      { enemies: [{ id: 'spider', amount: 1 }, { id: 'snake', amount: 1 }] },
      { enemies: [{ id: 'snake', amount: 1 }, { id: 'falcon', amount: 1 }] },
      { enemies: [{ id: 'falcon', amount: 1 }, { id: 'skunk', amount: 1 }] },
      { enemies: [{ id: 'skunk', amount: 1 }, { id: 'lizard', amount: 1 }] },
      { enemies: [{ id: 'lizard', amount: 1 }, { id: 'spider', amount: 1 }] }
    ]
  },

  10: {
    waves: [
      { enemies: [{ id: 'e_rat', amount: 1 }] },
      { enemies: [{ id: 'e_crab', amount: 1 }] },
      { enemies: [{ id: 'e_rabbit', amount: 1 }] },
      { enemies: [{ id: 'e_snail', amount: 1 }] },
      { enemies: [{ id: 'e_wasp', amount: 1 }] }
    ]
  }
}
