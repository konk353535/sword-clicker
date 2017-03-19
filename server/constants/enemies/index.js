const VERY_FAST_SPEED = 1.8;
const FAST_SPEED = 1.2;
const MEDIUM_SPEED = 0.8;
const SLOW_SPEED = 0.6;

export const ENEMIES = {
  // Floor 1 - Easy - 1
  rat: {
    id: 'rat',
    icon: 'rat',
    name: 'rat',
    stats: {
      attack: 2,
      attackMax: 4,
      attackSpeed: 0.7,
      accuracy: 5,
      health: 14,
      maxHealth: 14,
      defense: 5,
      armor: 5
    },
    rewards: [{
      type: 'item',
      itemId: 'rat_head',
      amount: 1,
      chance: 1 / 2
    }, {
      type: 'gold',
      amount: 3,
      chance: 1 / 2
    }]
  },
  // Floor 1 - Easy - 2
  rabbit: {
    id: 'rabbit',
    icon: 'rabbit',
    name: 'rabbit',
    stats: {
      attack: 1,
      attackMax: 1,
      attackSpeed: VERY_FAST_SPEED,
      accuracy: 80,
      health: 14,
      maxHealth: 14,
      defense: 2,
      armor: 2
    },
    rewards: []
  },
  // Floor 1 - Easy - 3
  crab: {
    id: 'crab',
    icon: 'crab',
    name: 'crab',
    stats: {
      attack: 1,
      attackMax: 4,
      attackSpeed: 0.4,
      accuracy: 0,
      health: 7,
      maxHealth: 7,
      defense: 40,
      armor: 300
    },
    rewards: []
  },
  // Floor 1 - Easy - 4
  snail: {
    id: 'snail',
    icon: 'snail',
    name: 'snail',
    stats: {
      attack: 1,
      attackMax: 10,
      attackSpeed: 0.3,
      accuracy: 0,
      health: 10,
      maxHealth: 10,
      defense: 10,
      armor: 150
    },
    rewards: []
  },
  // Floor 1 - Easy - 5
  skunk: {
    id: 'skunk',
    icon: 'skunk',
    name: 'skunk',
    stats: {
      attack: 2,
      attackMax: 3,
      attackSpeed: 0.7,
      accuracy: 80,
      health: 13,
      maxHealth: 13,
      defense: 0,
      armor: 0
    },
    rewards: []
  },

  // Floor 1 - Hard - 1
  fox: {
    id: 'fox',
    icon: 'fox',
    name: 'fox',
    stats: {
      attack: 4,
      attackMax: 6,
      attackSpeed: 0.5,
      accuracy: 25,
      health: 20,
      maxHealth: 20,
      defense: 7,
      armor: 7
    },
    rewards: []
  },
  // Floor 1 - Hard - 2
  cat: {
    id: 'cat',
    icon: 'cat',
    name: 'cat',
    stats: {
      attack: 4,
      attackMax: 6,
      attackSpeed: VERY_FAST_SPEED,
      accuracy: 80,
      health: 10,
      maxHealth: 10,
      defense: 100,
      armor: 0
    },
    rewards: []
  },
  // Floor 1 - Hard - 3
  cuteGoat: {
    id: 'cuteGoat',
    icon: 'cuteGoat',
    name: 'cuteGoat',
    stats: {
      attack: 4,
      attackMax: 6,
      attackSpeed: 0.5,
      accuracy: 0,
      health: 30,
      maxHealth: 30,
      defense: 3,
      armor: 3
    },
    rewards: []
  },
  // Floor 1 - Hard - 4
  cutePig: {
    id: 'cutePig',
    icon: 'cutePig',
    name: 'cutePig',
    stats: {
      attack: 2,
      attackMax: 5,
      attackSpeed: 0.5,
      accuracy: 0,
      health: 50,
      maxHealth: 50,
      defense: 0,
      armor: 0
    },
    rewards: []
  },
  // Floor 1 - Hard - 5
  cuteTurtle: {
    id: 'cuteTurtle',
    icon: 'cuteTurtle',
    name: 'cuteTurtle',
    stats: {
      attack: 4,
      attackMax: 7,
      attackSpeed: 0.3,
      accuracy: 30,
      health: 25,
      maxHealth: 25,
      defense: 100,
      armor: 350
    },
    rewards: []
  },
}
