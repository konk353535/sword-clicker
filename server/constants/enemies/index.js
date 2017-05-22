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
    name: 'grasshopper',
    statBuffs: [{
      type: 'plus',
      key: 'defense',
      amount: 10
    }, {
      type: 'times',
      key: 'armor',
      amount: 0.5
    }],
    swarmRange: [1, 2]
  },

  fly: {
    id: 'fly',
    icon: 'fly',
    name: 'fly',
    statBuffs: [{
      type: 'plus',
      key: 'defense',
      amount: 15
    }, {
      type: 'times',
      key: 'health',
      amount: 0.5
    }],
    swarmRange: [3, 6]
  },

  // Steals ur stats
  goblin: {
    id: 'goblin',
    icon: 'goblin',
    name: 'goblin'
  },

  // Chance to activate evasive maneuvers
  young_ninja: {
    id: 'young_ninja',
    icon: 'youngNinja',
    name: 'young ninja'
  },

  // When below 50% hp, goes berserk
  dwarf: {
    id: 'dwarf',
    icon: 'dwarf',
    name: 'dwarf'
  },

  // Randomly casts spell, which reduces healing
  demon: {
    id: 'demon',
    icon: 'demon',
    name: 'demon'
  },

  // Shield ability of kinda, every 30 seconds block 70% of damage for 25 seconds
  spartan: {
    id: 'spartan',
    icon: 'spartan',
    name: 'spartan'
  },

  // Frost armor buff
  ice_giant: {
    id: 'ice_giant',
    icon: 'iceGiant',
    name: 'ice giant'
  },

  // All spirits will be weak to magic, strong against armor
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

  // Can spawn multiple farmers
  farmer: {
    id: 'farmer',
    icon: 'farmer',
    name: 'farmer',
    swarmRange: [2, 4]
  },

  // Cuts through armor
  beaver: {
    id: 'beaver',
    icon: 'beaver',
    name: 'beaver'
  },

  // Has poisoned blades ability
  snake: {
    id: 'snake',
    icon: 'snake',
    name: 'snake'
  },

  // Can spawn multiple worms
  worm: {
    id: 'worm',
    icon: 'worm',
    name: 'worm',
    swarmRange: [3, 5]
  },

  butterfly: {
    id: 'butterfly',
    icon: 'butterfly',
    name: 'butterfly',
    statBuffs: [{
      type: 'plus',
      key: 'defense',
      amount: 5
    }, {
      type: 'times',
      key: 'armor',
      amount: 0.75
    }, {
      type: 'times',
      key: 'magicArmor',
      amount: 2
    }]
  },

  // Swarm
  dragonfly: {
    id: 'dragonfly',
    icon: 'dragonfly',
    name: 'dragonfly',
    statBuffs: [{
      type: 'times',
      key: 'attackSpeed',
      times: 3
    }, {
      type: 'times',
      key: 'damageMax',
      times: 0.4
    }, {
      type: 'times',
      key: 'damage',
      times: 0.4
    }]
  },

  // Crit Chance
  bee: {
    id: 'bee',
    icon: 'bee',
    name: 'bee',
    swarmRange: [1, 10]
  },

  // Stun chance
  wasp: {
    id: 'wasp',
    icon: 'wasp',
    name: 'wasp'
  },

  // Gains attack speed, the more damage taken
  angry_miner: {
    id: 'angry_miner',
    icon: 'angry_miner',
    name: 'angry miner'
  },

  // Crit chance
  bird: {
    id: 'bird',
    icon: 'bird',
    name: 'bird'
  },

  // Chance to bleed
  rat: {
    id: 'rat',
    icon: 'rat',
    name: 'rat'
  },

  // Resistance to poison
  lizard: {
    id: 'lizard',
    icon: 'lizard',
    name: 'lizard'
  },

  // Lots of health
  elephant: {
    id: 'elephant',
    icon: 'elephant',
    name: 'elephant',
    statBuffs: [{
      type: 'times',
      key: 'health',
      amount: 2
    }, {
      type: 'times',
      key: 'damageMax',
      amount: 3
    }, {
      type: 'times',
      key: 'attackSpeed',
      amount: 0.4
    }]
  },

  // Gains shit tons of armor, each attack reduces it by one
  crab: {
    id: 'crab',
    icon: 'crab',
    name: 'crab'
  },

  // Spiked armor ability
  echidna: {
    id: 'echidna',
    icon: 'echidna',
    name: 'echidna'
  },

  // Lots of warmor
  snail: {
    id: 'snail',
    icon: 'snail',
    name: 'snail',
    statBuffs: [{
      type: 'times',
      key: 'armor',
      amount: 2
    }, {
      type: 'times',
      key: 'health',
      amount: 0.75
    }]
  },

  // Randomly burrows, healing for X health
  wombat: {
    id: 'wombat',
    icon: 'wombat',
    name: 'wombat'
  },

  // Resistance to magic
  brown_mage: {
    id: 'brown_mage',
    icon: 'brown_mage',
    name: 'brown mage',
    statBuffs: [{
      type: 'times',
      key: 'magicArmor',
      amount: 100
    }, {
      type: 'times',
      key: 'armor',
      amount: 0.2
    }]
  },

  // Casts earthen armor abilities
  earth_mage: {
    id: 'earth_mage',
    icon: 'earthMage',
    name: 'earth mage'
  },

  // Casts fire abilities
  fire_mage: {
    id: 'fire_mage',
    icon: 'fireMage',
    name: 'fire mage'
  },

  blue_mage: {
    id: 'blue_mage',
    icon: 'blue_mage',
    name: 'blue mage',
    statBuffs: [{
      type: 'times',
      key: 'magicArmor',
      amount: 100
    }, {
      type: 'times',
      key: 'armor',
      amount: 0.2
    }]
  },

  // Breeds, has a chance each second to spawn another rabbit
  rabbit: {
    id: 'rabbit',
    icon: 'rabbit',
    name: 'rabbit'
  },

  // Venom + Swarm
  spider: {
    id: 'spider',
    icon: 'spider',
    name: 'spider',
    swarmRange: [1, 3]
  },

  // Stronger venom, lower chance
  jellyFish: {
    id: 'jellyFish',
    icon: 'jellyFish',
    name: 'jellyFish'
  }

}, BOSS_ENEMIES);
