const VERY_FAST_SPEED = 0.9;
const FAST_SPEED = 0.7;
const MEDIUM_SPEED = 0.5;
const SLOW_SPEED = 0.3;

const baseLootTable = [{
  type: 'item',
  itemId: 'copper_pickaxe',
  amount: 1,
  chance: 1 / 64
}, {
  type: 'item',
  itemId: 'copper_axe',
  amount: 1,
  chance: 1 / 64
}, {
  type: 'gold',
  chance: 1 / 64,
  amount: 400
}, {
  type: 'item',
  itemId: 'copper_bar',
  amount: 1,
  chance: 1 / 16
}, {
  type: 'item',
  itemId: 'ore_stone',
  amount: 3,
  chance: 1 / 8
}, {
  type: 'item',
  itemId: 'ore_copper',
  amount: 2,
  chance: 1 / 8
}, {
  type: 'item',
  itemId: 'pine_log',
  amount: 1,
  chance: 1 / 8
}, {
  type: 'item',
  itemId: 'lettice',
  amount: 5,
  chance: 1 / 8
}, {
  type: 'gold',
  chance: 1 / 4,
  amount: 50
}];

const floorOneHardLootTable = [{
  type: 'item',
  itemId: 'iron_pickaxe',
  amount: 1,
  chance: 1 / 64
}, {
  type: 'item',
  itemId: 'iron_axe',
  amount: 1,
  chance: 1 / 64
}, {
  type: 'item',
  itemId: 'holy_pickaxe',
  amount: 1,
  chance: 1 / 256
}]

export const ENEMIES = {
  // Floor 1 - Easy - 1
  rat: {
    id: 'rat',
    icon: 'rat',
    name: 'rat',
    stats: {
      attack: 1,
      attackMax: 2,
      attackSpeed: FAST_SPEED,
      accuracy: 0,
      health: 5,
      healthMax: 5,
      defense: 3,
      armor: 3,
      damageTaken: 1
    },
    rewards: baseLootTable.concat([{
      type: 'item',
      itemId: 'rat_head',
      amount: 1,
      chance: 1 / 4
    }])
  },

  dummy: {
    id: 'dummy',
    icon: 'rat',
    name: 'dummy',
    stats: {
      attack: 1,
      attackMax: 1,
      attackSpeed: SLOW_SPEED,
      accuracy: 10,
      health: 100,
      healthMax: 100,
      defense: 4,
      armor: 4,
      damageTaken: 1
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
      accuracy: 50,
      health: 13,
      healthMax: 13,
      defense: 2,
      armor: 2,
      damageTaken: 1
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
      healthMax: 7,
      defense: 25,
      armor: 250,
      damageTaken: 1
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
      attackMax: 12,
      attackSpeed: SLOW_SPEED,
      accuracy: 0,
      health: 10,
      healthMax: 10,
      defense: 8,
      armor: 120,
      damageTaken: 1
    },
    rewards: baseLootTable
  },
  // Floor 1 - Easy - 5
  skunk: {
    id: 'skunk',
    icon: 'skunk',
    name: 'skunk',
    stats: {
      attack: 2,
      attackMax: 4,
      attackSpeed: FAST_SPEED,
      accuracy: 30,
      health: 15,
      healthMax: 15,
      defense: 0,
      armor: 0,
      damageTaken: 1
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
      healthMax: 70,
      defense: 7,
      armor: 7,
      damageTaken: 1
    },
    rewards: baseLootTable.concat(floorOneHardLootTable)
  },
  // Floor 1 - Hard - 2
  cat: {
    id: 'cat',
    icon: 'cat',
    name: 'cat',
    stats: {
      attack: 5,
      attackMax: 10,
      attackSpeed: VERY_FAST_SPEED,
      accuracy: 80,
      health: 70,
      healthMax: 70,
      defense: 100,
      armor: 0,
      damageTaken: 1
    },
    rewards: baseLootTable.concat(floorOneHardLootTable)
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
      healthMax: 100,
      defense: 3,
      armor: 3,
      damageTaken: 1
    },
    rewards: baseLootTable.concat(floorOneHardLootTable)
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
      healthMax: 120,
      defense: 0,
      armor: 0,
      damageTaken: 1
    },
    rewards: baseLootTable.concat(floorOneHardLootTable)
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
      healthMax: 110,
      defense: 40,
      armor: 350,
      damageTaken: 1
    },
    rewards: baseLootTable.concat(floorOneHardLootTable)
  },

  // Floor 1 - Very Hard - 1
  puma: {
    id: 'puma',
    icon: 'puma',
    name: 'puma',
    stats: {
      attack: 15,
      attackMax: 20,
      attackSpeed: FAST_SPEED,
      accuracy: 70,
      health: 300,
      healthMax: 300,
      defense: 25,
      armor: 50,
      damageTaken: 1
    },
    rewards: []
  },

  angryRooster: {
    id: 'angryRooster',
    icon: 'angryRooster',
    name: 'angry rooster',
    stats: {
      attack: 25,
      attackMax: 25,
      attackSpeed: VERY_FAST_SPEED,
      accuracy: 70,
      health: 300,
      healthMax: 300,
      defense: 0,
      armor: 0,
      damageTaken: 1
    },
    rewards: []
  },

  elephant: {
    id: 'elephant',
    icon: 'elephant',
    name: 'elephant',
    stats: {
      attack: 20,
      attackMax: 40,
      attackSpeed: SLOW_SPEED,
      accuracy: 35,
      health: 600,
      healthMax: 600,
      defense: 0,
      armor: 50,
      damageTaken: 1
    },
    rewards: []
  },

  lionBoss: {
    id: 'lionBoss',
    icon: 'lionBoss',
    name: 'Jungle King',
    stats: {
      attack: 30,
      attackMax: 50,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 35,
      health: 3000,
      healthMax: 3000,
      defense: 60,
      armor: 150,
      damageTaken: 1
    }
  }
}
