import { VERY_FAST_SPEED, FAST_SPEED, MEDIUM_SPEED, SLOW_SPEED } from '/server/constants/combat/attackSpeeds.js';  
import { baseLootTable, floorOneHardLootTable } from '/server/constants/enemies/lootTables/index.js';
import { enemyStatSetter } from '/server/utils';

const baseStats = {
  healthMax: 50,
  health: 50,
  attack: 5,
  attackMax: 10,
  accuracy: 15,
  defense: 10,
  armor: 20,
  attackSpeed: 1,
  damageTaken: 1
}

const enhancedStats = {
  healthMax: 150,
  health: 150,
  attack: 10,
  attackMax: 20,
  accuracy: 30,
  defense: 20,
  armor: 40,
  attackSpeed: 1,
  damageTaken: 1
}

export const LEVEL_TWO_ENEMIES = {

  // Floor 1 - Hard - 1
  rat: {
    id: 'rat',
    icon: 'rat',
    name: 'rat',
    stats: {
      attack: 0.5,
      attackMax: 0.5,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 1,
      health: 0.8,
      healthMax: 0.8,
      defense: 0.5,
      armor: 0.5,
      damageTaken: 1
    },
    rewards: baseLootTable.concat(floorOneHardLootTable)
  },
  // Floor 1 - Hard - 2
  rabbit: {
    id: 'rabbit',
    icon: 'rabbit',
    name: 'rabbit',
    stats: {
      attack: 1,
      attackMax: 1,
      attackSpeed: VERY_FAST_SPEED,
      accuracy: 4,
      health: 1,
      healthMax: 1,
      defense: 0.1,
      armor: 0.1,
      damageTaken: 1
    },
    rewards: baseLootTable.concat(floorOneHardLootTable)
  },
  // Floor 1 - Hard - 3
  crab: {
    id: 'crab',
    icon: 'crab',
    name: 'crab',
    stats: {
      attack: 0.5,
      attackMax: 3,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 0,
      health: 0.5,
      healthMax: 0.5,
      defense: 1,
      armor: 15,
      damageTaken: 1
    },
    rewards: baseLootTable.concat(floorOneHardLootTable)
  },
  // Floor 1 - Hard - 4
  snail: {
    id: 'snail',
    icon: 'snail',
    name: 'snail',
    stats: {
      attack: 0.3,
      attackMax: 5,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 0.1,
      health: 0.5,
      healthMax: 0.5,
      defense: 2,
      armor: 5,
      damageTaken: 1
    },
    rewards: baseLootTable.concat(floorOneHardLootTable)
  },
  // Floor 1 - Hard - 5
  wasp: {
    id: 'wasp',
    icon: 'wasp',
    name: 'wasp',
    stats: {
      attack: 0.4,
      attackMax: 0.6,
      attackSpeed: VERY_FAST_SPEED,
      accuracy: 1,
      health: 0.5,
      healthMax: 0.5,
      defense: 0.1,
      armor: 0.1,
      damageTaken: 1
    },
    rewards: baseLootTable.concat(floorOneHardLootTable)
  }
}

enemyStatSetter(LEVEL_TWO_ENEMIES, baseStats, enhancedStats);

