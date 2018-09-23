import { VERY_FAST_SPEED, FAST_SPEED, MEDIUM_SPEED} from '/server/constants/combat/attackSpeeds.js';  
import { baseLootTable } from '/server/constants/enemies/lootTables/index.js';
import { enemyStatSetter } from '/server/utils';

const baseStats = {
  healthMax: 130,
  health: 130,
  attack: 12,
  attackMax: 20,
  accuracy: 35,
  defense: 35,
  armor: 30,
  attackSpeed: 1,
  damageTaken: 1
};

const enhancedStats = {
  healthMax: 390,
  health: 390,
  attack: 16,
  attackMax: 24,
  accuracy: 40,
  defense: 40,
  armor: 37,
  attackSpeed: 1,
  damageTaken: 1
};

export const LEVEL_FIVE_ENEMIES = {

  wolf: {
    id: 'wolf',
    icon: 'wolf.svg',
    name: 'wolf',
    stats: {
      attack: 1,
      attackMax: 1,
      attackSpeed: FAST_SPEED,
      accuracy: 1,
      health: 1.2,
      healthMax: 1.2,
      defense: 1,
      armor: 0.1,
      damageTaken: 1
    },
    rewards: []
  },

  beaver: {
    id: 'beaver',
    icon: 'beaver.svg',
    name: 'beaver',
    stats: {
      attack: 0.5,
      attackMax: 1.5,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 1,
      health: 0.8,
      healthMax: 0.8,
      defense: 1,
      armor: 0.5,
      damageTaken: 1
    },
    rewards: []
  },

  eagle: {
    id: 'eagle',
    icon: 'eagle.svg',
    name: 'eagle',
    stats: {
      attack: 1,
      attackMax: 2,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 3,
      health: 1,
      healthMax: 1,
      defense: 0.7,
      armor: 0.1,
      damageTaken: 1
    },
    rewards: []
  },

  kangaroo: {
    id: 'kangaroo',
    icon: 'kangaroo.svg',
    name: 'kangaroo',
    stats: {
      attack: 1,
      attackMax: 1,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 1,
      health: 1.5,
      healthMax: 1.5,
      defense: 1.5,
      armor: 0.3,
      damageTaken: 1
    },
    rewards: []
  },

  jellyFish: {
    id: 'jellyFish',
    icon: 'jellyFish.svg',
    name: 'jellyFish',
    stats: {
      attack: 0.3,
      attackMax: 0.3,
      attackSpeed: VERY_FAST_SPEED,
      accuracy: 10,
      health: 0.6,
      healthMax: 0.6,
      defense: 0.8,
      armor: 0.1,
      damageTaken: 1
    },
    rewards: []
  }
};

enemyStatSetter(LEVEL_FIVE_ENEMIES, baseStats, enhancedStats);

