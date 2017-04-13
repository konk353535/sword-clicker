import { VERY_FAST_SPEED, FAST_SPEED, MEDIUM_SPEED, SLOW_SPEED } from '/server/constants/combat/attackSpeeds.js';  
import { baseLootTable } from '/server/constants/enemies/lootTables/index.js';
import { enemyStatSetter } from '/server/utils';

const baseStats = {
  healthMax: 100,
  health: 100,
  attack: 10,
  attackMax: 18,
  accuracy: 30,
  defense: 30,
  armor: 25,
  attackSpeed: 1,
  damageTaken: 1
}

const enhancedStats = {
  healthMax: 300,
  health: 300,
  attack: 15,
  attackMax: 22,
  accuracy: 35,
  defense: 35,
  armor: 30,
  attackSpeed: 1,
  damageTaken: 1
}

export const LEVEL_FOUR_ENEMIES = {

  cat: {
    id: 'cat',
    icon: 'cat',
    name: 'cat',
    stats: {
      attack: 1,
      attackMax: 1,
      attackSpeed: VERY_FAST_SPEED,
      accuracy: 3,
      health: 0.7,
      healthMax: 0.7,
      defense: 1.5,
      armor: 0.1,
      damageTaken: 1
    },
    rewards: []
  },

  turtle: {
    id: 'turtle',
    icon: 'turtle',
    name: 'turtle',
    stats: {
      attack: 0.5,
      attackMax: 2,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 1,
      health: 1,
      healthMax: 1,
      defense: 1,
      armor: 10,
      damageTaken: 1
    },
    rewards: []
  },

  boar: {
    id: 'boar',
    icon: 'boar',
    name: 'boar',
    stats: {
      attack: 1,
      attackMax: 1,
      attackSpeed: FAST_SPEED,
      accuracy: 0.6,
      health: 2,
      healthMax: 2,
      defense: 1,
      armor: 0.3,
      damageTaken: 1
    },
    rewards: []
  },

  goat: {
    id: 'goat',
    icon: 'goat',
    name: 'goat',
    stats: {
      attack: 1,
      attackMax: 1,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 1,
      health: 1,
      healthMax: 1,
      defense: 1.3,
      armor: 1,
      damageTaken: 1
    },
    rewards: []
  },

  fox: {
    id: 'fox',
    icon: 'fox',
    name: 'fox',
    stats: {
      attack: 1,
      attackMax: 2,
      attackSpeed: FAST_SPEED,
      accuracy: 1,
      health: 0.6,
      healthMax: 0.6,
      defense: 1,
      armor: 1,
      damageTaken: 1
    },
    rewards: []
  }
}

enemyStatSetter(LEVEL_FOUR_ENEMIES, baseStats, enhancedStats);

