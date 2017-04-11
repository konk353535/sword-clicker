export const TOWER_FLOOR_1 = {
  easy: {
    name: 'Grass Fields',
    image: 'grassField.jpeg',
    floor: 1,
    possibleBattles: [{
      enemies: [{
        id: 'fly',
        amount: 1
      }]
    }]
  },

  hard: {
    name: 'Woods',
    image: 'woods.jpg',
    floor: 1,
    possibleBattles: ['fox', 'cat']
  },

  veryHard: {
    name: 'Misty Ruins',
    image: 'mistyRuins.jpeg',
    floor: 1,
    possibleBattles: ['elephant', 'puma', 'angryRooster']
  },

  boss: {
    possibleBattles: ['floorOneBoss']
  }
}
