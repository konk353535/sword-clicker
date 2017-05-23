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
    name: 'goblin',
    buffs: [{
      id: 'goblin_stat_stealer',
      data: {
        duration: Infinity,
        totalDuration: Infinity,
        icon: 'goblin',
        name: 'stat stealer'
      }
    }]
  },

  // Chance to activate dodging
  young_ninja: {
    id: 'young_ninja',
    icon: 'youngNinja',
    name: 'young ninja',
    buffs: [{
      id: 'ninja_reflexes',
      data: {
        duration: Infinity,
        totalDuration: Infinity,
        icon: 'youngNinja',
        name: 'Ninja Reflexes'
      }
    }]
  },

  // When below 50% hp, goes berserk
  dwarf: {
    id: 'dwarf',
    icon: 'dwarf',
    name: 'dwarf',
    buffs: [{
      id: 'dwarfs_pre_rage',
      data: {
        duration: Infinity,
        totalDuration: Infinity,
        hideBuff: true
      }
    }]
  },

  // Randomly casts spell, which reduces healing
  demon: {
    id: 'demon',
    icon: 'demon',
    name: 'demon',
    buffs: [{
      id: 'demon_monster',
      data: {
        hideBuff: true
      }
    }]
  },

  // Block ability, reduces damage of all attacks after armor by X
  spartan: {
    id: 'spartan',
    icon: 'spartan',
    name: 'spartan',
    statBuffs: [{
      type: 'plus',
      key: 'armor',
      amount: 5000
    }]
  },

  // Frost armor buff
  ice_giant: {
    id: 'ice_giant',
    icon: 'iceGiant',
    name: 'ice giant',
    buffs: [{
      id: 'frost_armor',
      data: {
        level: 10,
        name: 'Frost Armor',
        icon: 'frostArmor'
      }
    }]
  },

  // Spirits will randomly 'Blink', turning invulnrable for 10s
  cursed_spirit: {
    id: 'cursed_spirit',
    icon: 'cursedSpirit',
    name: 'cursed spirit',
    buffs: [{
      id: 'spirit_blink',
      data: {
        icon: 'spiritBlink',
        name: 'Spirit Blink',
        description: 'Will randomly fade into the ether, becoming invulnerable'
      }
    }]
  },

  fairy_steel_spirit: {
    id: 'fairy_steel_spirit',
    icon: 'fairySteelSpirit',
    name: 'fairy steel spirit',
    buffs: [{
      id: 'spirit_blink',
      data: {
        icon: 'spiritBlink',
        name: 'Spirit Blink',
        description: 'Will randomly fade into the ether, becoming invulnerable'
      }
    }]
  },

  cobalt_spirit: {
    id: 'cobalt_spirit',
    icon: 'cobaltSpirit',
    name: 'cobalt spirit',
    buffs: [{
      id: 'spirit_blink',
      data: {
        icon: 'spiritBlink',
        name: 'Spirit Blink',
        description: 'Will randomly fade into the ether, becoming invulnerable'
      }
    }]
  },

  orichalcum_spirit: {
    id: 'orichalcum_spirit',
    icon: 'orichalcumSpirit',
    name: 'orichalcum spirit',
    buffs: [{
      id: 'spirit_blink',
      data: {
        icon: 'spiritBlink',
        name: 'Spirit Blink',
        description: 'Will randomly fade into the ether, becoming invulnerable'
      }
    }]
  },

  adamantium_spirit: {
    id: 'adamantium_spirit',
    icon: 'adamantiumSpirit',
    name: 'adamantium spirit',
    buffs: [{
      id: 'spirit_blink',
      data: {
        icon: 'spiritBlink',
        name: 'Spirit Blink',
        description: 'Will randomly fade into the ether, becoming invulnerable'
      }
    }]
  },

  mithril_spirit: {
    id: 'mithril_spirit',
    icon: 'mithrilSpirit',
    name: 'mithril spirit',
    buffs: [{
      id: 'spirit_blink',
      data: {
        icon: 'spiritBlink',
        name: 'Spirit Blink',
        description: 'Will randomly fade into the ether, becoming invulnerable'
      }
    }]
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
    name: 'beaver',
    buffs: [{
      id: 'beaver_teeth',
      data: {
        hideBuff: true
      }
    }]
  },

  // Has poisoned blades ability
  snake: {
    id: 'snake',
    icon: 'snake',
    name: 'snake',
    buffs: [{
      id: 'poisoned_blade',
      data: {
        level: 1,
        icon: 'poisonedBlade'
      }
    }]
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
      amount: 3
    }, {
      type: 'times',
      key: 'attackMax',
      amount: 0.4
    }, {
      type: 'times',
      key: 'attack',
      amount: 0.4
    }]
  },

  // Crit Chance
  bee: {
    id: 'bee',
    icon: 'bee',
    name: 'bee',
    swarmRange: [1, 10],
    statBuffs: [{
      type: 'plus',
      key: 'criticalChance',
      amount: 0.1
    }]
  },

  // Crit chance
  wasp: {
    id: 'wasp',
    icon: 'wasp',
    name: 'wasp',
    statBuffs: [{
      type: 'plus',
      key: 'criticalChance',
      amount: 0.1
    }]
  },

  // Gains attack speed, the more damage taken
  angry_miner: {
    id: 'angry_miner',
    icon: 'angryMiner',
    name: 'angry miner',
    buffs: [{
      id: 'angry_miner_monster',
      data: {
        icon: 'angryMiner',
        name: 'angry miner'
      }
    }]
  },

  // Low Crit chance, high crit damage
  bird: {
    id: 'bird',
    icon: 'bird',
    name: 'bird',
    statBuffs: [{
      type: 'plus',
      key: 'criticalChance',
      amount: 0.05
    }, {
      type: 'plus',
      key: 'criticalDamage',
      amount: 2
    }]
  },

  // Chance to bleed
  rat: {
    id: 'rat',
    icon: 'rat',
    name: 'rat',
    swarmRange: [1, 3],
    buffs: [{
      id: 'rat_monster',
      data: {
        hideBuff: true
      }
    }]
  },

  // Heals from poison
  lizard: {
    id: 'lizard',
    icon: 'lizard',
    name: 'lizard',
    buffs: [{
      id: 'lizard_monster',
      data: {
        icon: 'lizard',
        name: 'thirst for poison'
      }
    }]
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
      key: 'attackMax',
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
    name: 'crab',
    buffs: [{
      id: 'crab_monster',
      data: {
        icon: 'armor',
        name: 'Crab Armor'
      }
    }]
  },

  // Spiked armor ability
  echidna: {
    id: 'echidna',
    icon: 'echidna',
    name: 'echidna',
    buffs: [{
      id: 'spiked_armor',
      data: {
        level: 3,
        icon: 'spikedArmor'
      }
    }]
  },

  // Lots of armor
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
    name: 'wombat',
    statBuffs: [{
      type: 'times',
      key: 'health',
      amount: 1.3
    }]
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
    name: 'earth mage',
    buffs: [{
      id: 'earth_mage_monster',
      data: {
        hideBuff: true
      }
    }]
  },

  // Casts fire abilities
  fire_mage: {
    id: 'fire_mage',
    icon: 'fireMage',
    name: 'fire mage',
    buffs: [{
      id: 'fire_mage_monster',
      data: {
        hideBuff: true
      }
    }]
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
    name: 'rabbit',
    buffs: [{
      id: 'rabbit_monster',
      data: {
        hideBuff: true
      }
    }]
  },

  // Venom + Swarm
  spider: {
    id: 'spider',
    icon: 'spider',
    name: 'spider',
    swarmRange: [1, 3],
    buffs: [{
      id: 'poisoned_blade',
      data: {
        level: 1,
        icon: 'poisonedBlade'
      }
    }]
  },

  // Stronger venom, lower chance
  jellyFish: {
    id: 'jellyFish',
    icon: 'jellyFish',
    name: 'jellyFish',
    buffs: [{
      id: 'poisoned_blade',
      data: {
        level: 10,
        icon: 'poisonedBlade'
      }
    }],
    statBuffs: [{
      type: 'times',
      key: 'attackSpeed',
      amount: 0.3
    }]
  }

}, BOSS_ENEMIES);
