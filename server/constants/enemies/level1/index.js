import { VERY_FAST_SPEED, FAST_SPEED, MEDIUM_SPEED, SLOW_SPEED } from '../../combat/attackSpeeds.js';  
import { LOOT_TABLE } from './lootTable';
import { enemyStatSetter } from '/server/utils';

const baseStats = {
  healthMax: 10,
  health: 10,
  attack: 2,
  attackMax: 4,
  accuracy: 5,
  defense: 5,
  armor: 5,
  attackSpeed: 1,
  damageTaken: 1
};

const enhancedStats = {
  healthMax: 75,
  health: 75,
  attack: 5,
  attackMax: 10,
  accuracy: 15,
  defense: 10,
  armor: 10,
  attackSpeed: 1,
  damageTaken: 1
};

export const LEVEL_ONE_ENEMIES = {

  fly: {
    id: 'fly',
    icon: 'fly.svg',
    name: 'fly',
    stats: {
      attack: 0.5,
      attackMax: 0.5,
      attackSpeed: FAST_SPEED,
      accuracy: 0.5,
      health: 0.5,
      healthMax: 0.5,
      defense: 0.5,
      armor: 0.5,
      damageTaken: 1
    },
    rewards: LOOT_TABLE
  },

  grasshopper: {
    id: 'grasshopper',
    icon: 'grasshopper.svg',
    name: 'grasshopper',
    stats: {
      attack: 0.6,
      attackMax: 0.6,
      attackSpeed: VERY_FAST_SPEED,
      accuracy: 1,
      health: 0.6,
      healthMax: 0.6,
      defense: 0.5,
      armor: 1,
      damageTaken: 1
    },
    rewards: LOOT_TABLE
  },

  mouse: {
    id: 'mouse',
    icon: 'mouse.svg',
    name: 'mouse',
    stats: {
      attack: 1,
      attackMax: 1,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 1,
      health: 1,
      healthMax: 1,
      defense: 1,
      armor: 1,
      damageTaken: 1
    },
    rewards: LOOT_TABLE
  },

  bee: {
    id: 'bee',
    icon: 'bee.svg',
    name: 'bee',
    stats: {
      attack: 1,
      attackMax: 3,
      attackSpeed: SLOW_SPEED,
      accuracy: 0.3,
      health: 1,
      healthMax: 1,
      defense: 1.3,
      armor: 1,
      damageTaken: 1
    },
    rewards: LOOT_TABLE
  },

  bird: {
    id: 'bird',
    icon: 'bird.svg',
    name: 'bird',
    stats: {
      attack: 1,
      attackMax: 2,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 1,
      health: 1,
      healthMax: 1,
      defense: 0.5,
      armor: 0.2,
      damageTaken: 1
    },
    rewards: LOOT_TABLE
  }
};

enemyStatSetter(LEVEL_ONE_ENEMIES, baseStats, enhancedStats);
