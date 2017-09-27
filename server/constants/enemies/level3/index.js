import { VERY_FAST_SPEED, FAST_SPEED, MEDIUM_SPEED, SLOW_SPEED } from '/server/constants/combat/attackSpeeds.js';  
import { LOOT_TABLE } from './lootTable';
import { enemyStatSetter } from '/server/utils';

const baseStats = {
  healthMax: 60,
  health: 60,
  attack: 7,
  attackMax: 15,
  accuracy: 25,
  defense: 20,
  armor: 20,
  attackSpeed: 1,
  damageTaken: 1
}

const enhancedStats = {
  healthMax: 180,
  health: 180,
  attack: 10,
  attackMax: 20,
  accuracy: 35,
  defense: 30,
  armor: 30,
  attackSpeed: 1,
  damageTaken: 1
}

export const LEVEL_THREE_ENEMIES = {

  spider: {
    id: 'spider',
    icon: 'spider.svg',
    name: 'spider',
    stats: {
      attack: 1,
      attackMax: 1,
      attackSpeed: FAST_SPEED,
      accuracy: 1,
      health: 1,
      healthMax: 1,
      defense: 1,
      armor: 0.1,
      damageTaken: 1
    },
    rewards: LOOT_TABLE
  },

  snake: {
    id: 'snake',
    icon: 'snake.svg',
    name: 'snake',
    stats: {
      attack: 1,
      attackMax: 1,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 10,
      health: 1,
      healthMax: 1,
      defense: 2,
      armor: 0.05,
      damageTaken: 1
    },
    rewards: LOOT_TABLE
  },

  falcon: {
    id: 'falcon',
    icon: 'falcon.svg',
    name: 'falcon',
    stats: {
      attack: 2,
      attackMax: 4,
      attackSpeed: SLOW_SPEED,
      accuracy: 10,
      health: 1,
      healthMax: 1,
      defense: 0.1,
      armor: 0.1,
      damageTaken: 1
    },
    rewards: LOOT_TABLE
  },

  skunk: {
    id: 'skunk',
    icon: 'skunk.svg',
    name: 'skunk',
    stats: {
      attack: 1,
      attackMax: 1,
      attackSpeed: FAST_SPEED,
      accuracy: 1,
      health: 1,
      healthMax: 1,
      defense: 1,
      armor: 1,
      damageTaken: 1
    },
    rewards: LOOT_TABLE
  },

  lizard: {
    id: 'lizard',
    icon: 'lizard.svg',
    name: 'lizard',
    stats: {
      attack: 1,
      attackMax: 1,
      attackSpeed: SLOW_SPEED,
      accuracy: 1,
      health: 1.5,
      healthMax: 1.5,
      defense: 3,
      armor: 1,
      damageTaken: 1
    },
    rewards: LOOT_TABLE
  }
}

enemyStatSetter(LEVEL_THREE_ENEMIES, baseStats, enhancedStats);

