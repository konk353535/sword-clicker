import { VERY_FAST_SPEED, FAST_SPEED, MEDIUM_SPEED, SLOW_SPEED } from '/server/constants/combat/attackSpeeds.js';

import { LEVEL_ONE_ENEMIES } from '/server/constants/enemies/level1/index.js'
import { LEVEL_TWO_ENEMIES } from '/server/constants/enemies/level2/index.js'
import { LEVEL_THREE_ENEMIES } from '/server/constants/enemies/level3/index.js'
import { LEVEL_FOUR_ENEMIES } from '/server/constants/enemies/level4/index.js'
import { LEVEL_FIVE_ENEMIES } from '/server/constants/enemies/level5/index.js'
import { BOSS_ENEMIES } from '/server/constants/enemies/bosses/index.js'

export const ENEMIES = Object.assign({

  grasshopper: {
    id: 'grasshopper',
    icon: 'grasshopper',
    name: 'grasshopper'
  },

  fly: {
    id: 'fly',
    icon: 'fly',
    name: 'fly'
  },

  farmer: {
    id: 'farmer',
    icon: 'farmer',
    name: 'farmer'
  },

  beaver: {
    id: 'beaver',
    icon: 'beaver',
    name: 'beaver'
  },

  snake: {
    id: 'snake',
    icon: 'snake',
    name: 'snake'
  },

  worm: {
    id: 'worm',
    icon: 'worm',
    name: 'worm'
  },

  butterfly: {
    id: 'butterfly',
    icon: 'butterfly',
    name: 'butterfly'
  },

  dragonfly: {
    id: 'dragonfly',
    icon: 'dragonfly',
    name: 'dragonfly'
  },

  bee: {
    id: 'bee',
    icon: 'bee',
    name: 'bee'
  },

  wasp: {
    id: 'wasp',
    icon: 'wasp',
    name: 'wasp'
  },

  angry_miner: {
    id: 'angry_miner',
    icon: 'angry_miner',
    name: 'angry miner'
  },

  bird: {
    id: 'bird',
    icon: 'bird',
    name: 'bird'
  },

  rat: {
    id: 'rat',
    icon: 'rat',
    name: 'rat'
  },

  crab: {
    id: 'crab',
    icon: 'crab',
    name: 'crab'
  },

  echidna: {
    id: 'echidna',
    icon: 'echidna',
    name: 'echidna'
  },

  snail: {
    id: 'snail',
    icon: 'snail',
    name: 'snail'
  },

  wombat: {
    id: 'wombat',
    icon: 'wombat',
    name: 'wombat'
  },

  brown_mage: {
    id: 'brown_mage',
    icon: 'brown_mage',
    name: 'brown_mage'
  },

  earth_mage: {
    id: 'earth_mage',
    icon: 'earth_mage',
    name: 'earth_mage'
  },

  blue_mage: {
    id: 'blue_mage',
    icon: 'blue_mage',
    name: 'blue_mage'
  },

  rabbit: {
    id: 'rabbit',
    icon: 'rabbit',
    name: 'rabbit'
  },

  spider: {
    id: 'spider',
    icon: 'spider',
    name: 'spider'
  },

  jellyFish: {
    id: 'jellyFish',
    icon: 'jellyFish',
    name: 'jellyFish'
  }

}, BOSS_ENEMIES);
