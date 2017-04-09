import { VERY_FAST_SPEED, FAST_SPEED, MEDIUM_SPEED, SLOW_SPEED } from '/server/constants/combat/attackSpeeds.js';

import { LEVEL_ONE_ENEMIES } from '/server/constants/enemies/level1/index.js'
import { LEVEL_TWO_ENEMIES } from '/server/constants/enemies/level2/index.js'
import { LEVEL_THREE_ENEMIES } from '/server/constants/enemies/level3/index.js'
import { LEVEL_FOUR_ENEMIES } from '/server/constants/enemies/level4/index.js'
import { LEVEL_FIVE_ENEMIES } from '/server/constants/enemies/level5/index.js'
import { BOSS_ENEMIES } from '/server/constants/enemies/bosses/index.js'

export const ENEMIES = Object.assign({
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
    rewards: []
  }
}, LEVEL_ONE_ENEMIES, LEVEL_TWO_ENEMIES, LEVEL_THREE_ENEMIES, LEVEL_FOUR_ENEMIES, LEVEL_FIVE_ENEMIES, BOSS_ENEMIES);
