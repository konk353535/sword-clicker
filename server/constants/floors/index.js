export const FLOORS = {

  getWaveCounts() {
    const activePlayers = 1;

    // Total # waves = weekly activePlayers rounded to closest 100
    const totalWaves = Math.ceil(activePlayers / 100) * 100;

    return {
      easy: totalWaves * 0.7,
      hard: totalWaves * 0.25,
      veryHard: totalWaves * 0.05
    }
  },

  1: {
    easy: {
      name: 'Grass Fields',
      image: 'grassField.jpeg',
      floor: 1,
      possibleBattles: ['rat', 'rabbit', 'skunk', 'crab', 'snail']
    },

    hard: {
      name: 'Woods',
      image: 'woods.jpg',
      floor: 1,
      possibleBattles: ['fox', 'cat', 'cuteGoat', 'cutePig', 'cuteTurtle']
    },

    veryHard: {
      name: 'Misty Ruins',
      image: 'mistyRuins.jpeg',
      floor: 1,
      possibleBattles: ['rat', 'rabbit', 'skunk', 'crab', 'snail']
    }
  }
}
