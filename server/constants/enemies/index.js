const VERY_FAST_SPEED = 0.9;
const FAST_SPEED = 0.7;
const MEDIUM_SPEED = 0.5;
const SLOW_SPEED = 0.3;

const baseLootTable = [{
  type: 'gold',
  chance: 1 / 64,
  amount: 200
}, {
  type: 'gold',
  chance: 1 / 4,
  amount: 50
}];

export const ENEMIES = {
  // Floor 1 - Easy - 1
  rat: {
    id: 'rat',
    icon: 'rat',
    name: 'rat',
    stats: {
      attack: 2,
      attackMax: 3,
      attackSpeed: FAST_SPEED,
      accuracy: 5,
      health: 10,
      maxHealth: 10,
      defense: 4,
      armor: 4
    },
    rewards: baseLootTable.concat([{
      type: 'item',
      itemId: 'rat_head',
      amount: 1,
      chance: 1 / 4
    }])
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
      accuracy: 70,
      health: 20,
      maxHealth: 20,
      defense: 2,
      armor: 2
    },
    rewards: baseLootTable
  },
  // Floor 1 - Easy - 3
  crab: {
    id: 'crab',
    icon: 'crab',
    name: 'crab',
    stats: {
      attack: 1,
      attackMax: 3,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 0,
      health: 7,
      maxHealth: 7,
      defense: 25,
      armor: 250
    },
    rewards: baseLootTable
  },
  // Floor 1 - Easy - 4
  snail: {
    id: 'snail',
    icon: 'snail',
    name: 'snail',
    stats: {
      attack: 3,
      attackMax: 20,
      attackSpeed: SLOW_SPEED,
      accuracy: 0,
      health: 22,
      maxHealth: 22,
      defense: 10,
      armor: 150
    },
    rewards: baseLootTable
  },
  // Floor 1 - Easy - 5
  skunk: {
    id: 'skunk',
    icon: 'skunk',
    name: 'skunk',
    stats: {
      attack: 3,
      attackMax: 5,
      attackSpeed: FAST_SPEED,
      accuracy: 60,
      health: 25,
      maxHealth: 25,
      defense: 0,
      armor: 0
    },
    rewards: baseLootTable
  },

  // Floor 1 - Hard - 1
  fox: {
    id: 'fox',
    icon: 'fox',
    name: 'fox',
    stats: {
      attack: 8,
      attackMax: 16,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 25,
      health: 70,
      maxHealth: 70,
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
      attack: 10,
      attackMax: 15,
      attackSpeed: VERY_FAST_SPEED,
      accuracy: 80,
      health: 70,
      maxHealth: 70,
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
      attack: 6,
      attackMax: 8,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 0,
      health: 100,
      maxHealth: 100,
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
      attack: 4,
      attackMax: 10,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 0,
      health: 120,
      maxHealth: 120,
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
      attack: 10,
      attackMax: 20,
      attackSpeed: SLOW_SPEED,
      accuracy: 30,
      health: 110,
      maxHealth: 110,
      defense: 40,
      armor: 350
    },
    rewards: []
  },

  // Floor 1 - Very Hard - 1
  puma: {
    id: 'puma',
    icon: 'puma',
    name: 'puma',
    stats: {
      attack: 25,
      attackMax: 35,
      attackSpeed: FAST_SPEED,
      accuracy: 70,
      health: 500,
      maxHealth: 500,
      defense: 50,
      armor: 100
    },
    rewards: []
  },

  angryRooster: {
    id: 'angryRooster',
    icon: 'angryRooster',
    name: 'angry rooster',
    stats: {
      attack: 35,
      attackMax: 50,
      attackSpeed: VERY_FAST_SPEED,
      accuracy: 80,
      health: 300,
      maxHealth: 300,
      defense: 25,
      armor: 50
    },
    rewards: []
  },

  elephant: {
    id: 'elephant',
    icon: 'elephant',
    name: 'elephant',
    stats: {
      attack: 40,
      attackMax: 100,
      attackSpeed: SLOW_SPEED,
      accuracy: 35,
      health: 600,
      maxHealth: 600,
      defense: 100,
      armor: 200
    },
    rewards: []
  },
}
