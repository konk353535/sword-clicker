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
      { enemies: [{ id: 'bird', amount: 1 }] },
      { enemies: [{ id: 'grasshopper', amount: 1 }, { id: 'mouse', amount: 1 }] },
      { enemies: [{ id: 'fly', amount: 1 }, { id: 'bee', amount: 1 }] },
      { enemies: [{ id: 'bird', amount: 1 }, { id: 'mouse', amount: 1 }] },
      { enemies: [{ id: 'fly', amount: 4 }] }
    ]
  }
}
