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

  dwarf: {
    id: 'dwarf',
    icon: 'dwarf',
    name: 'dwarf'
  },

  demon: {
    id: 'demon',
    icon: 'demon',
    name: 'demon'
  },

  spartan: {
    id: 'spartan',
    icon: 'spartan',
    name: 'spartan'
  },

  ice_giant: {
    id: 'ice_giant',
    icon: 'iceGiant',
    name: 'ice giant'
  },

  cursed_spirit: {
    id: 'cursed_spirit',
    icon: 'cursedSpirit',
    name: 'cursed spirit'
  },

  fairy_steel_spirit: {
    id: 'fairy_steel_spirit',
    icon: 'fairySteelSpirit',
    name: 'fairy steel spirit'
  },

  cobalt_spirit: {
    id: 'cobalt_spirit',
    icon: 'cobaltSpirit',
    name: 'cobalt spirit'
  },

  orichalcum_spirit: {
    id: 'orichalcum_spirit',
    icon: 'orichalcumSpirit',
    name: 'orichalcum spirit'
  },

  adamantium_spirit: {
    id: 'adamantium_spirit',
    icon: 'adamantiumSpirit',
    name: 'adamantium spirit'
  },

  mithril_spirit: {
    id: 'mithril_spirit',
    icon: 'mithrilSpirit',
    name: 'mithril spirit'
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

  lizard: {
    id: 'lizard',
    icon: 'lizard',
    name: 'lizard'
  },

  elephant: {
    id: 'elephant',
    icon: 'elephant',
    name: 'elephant'
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
    name: 'brown mage'
  },

  earth_mage: {
    id: 'earth_mage',
    icon: 'earthMage',
    name: 'earth mage'
  },

  fire_mage: {
    id: 'fire_mage',
    icon: 'fireMage',
    name: 'fire mage'
  },

  blue_mage: {
    id: 'blue_mage',
    icon: 'blue_mage',
    name: 'blue mage'
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
