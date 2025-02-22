console.log('importing enemies/index.js BOSS_ENEMIES');
import { BOSS_ENEMIES } from '/server/constants/enemies/bosses/index.js'

console.log('exporting enemies/index.js ENEMIES');
export const ENEMIES = Object.assign({

  grasshopper: {
    id: 'grasshopper',
    icon: 'grasshopper.svg',
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
    icon: 'fly.svg',
    name: 'fly',
    statBuffs: [{
      type: 'plus',
      key: 'defense',
      amount: 15
    }, {
      type: 'times',
      key: 'health',
      amount: 0.5
    }, {
      type: 'times',
      key: 'healthMax',
      amount: 0.5
    }],
    swarmRange: [3, 6]
  },

  // Steals ur stats
  goblin: {
    id: 'goblin',
    icon: 'goblin.svg',
    name: 'goblin',
    buffs: [{
      id: 'goblin_stat_stealer',
      data: {
        duration: Infinity,
        totalDuration: Infinity,
        icon: 'goblin.svg',
        name: 'stat stealer'
      }
    }]
  },

  vampire: {
    id: 'vampire',
    icon: 'vampire.svg',
    name: 'vampire',
    buffs: [{
      id: 'thirsty_fangs',
      data: {
        duration: 1,
        totalDuration: 1,
        icon: 'thirstyFangs.svg',
        name: 'thirsty fangs'
      }
    }, {
      id: 'vampire_monster',
      data: {
        hideBuff: true
      }
    }],
    statBuffs: [{
      type: 'times',
      key: 'attack',
      amount: 0.7
    }, {
      type: 'plus',
      key: 'accuracy',
      amount: 25
    }]
  },

  // Chance to activate dodging
  young_ninja: {
    id: 'young_ninja',
    icon: 'youngNinja.svg',
    name: 'young ninja',
    buffs: [{
      id: 'ninja_reflexes',
      data: {
        duration: Infinity,
        totalDuration: Infinity,
        icon: 'youngNinja.svg',
        name: 'Ninja Reflexes'
      }
    }]
  },

  // Gains attack, each time he is attacked
  monk: {
    id: 'monk',
    icon: 'monk.svg',
    name: 'monk ninja',
    buffs: [{
      id: 'monk',
      data: {
        duration: Infinity,
        totalDuration: Infinity,
        stacks: 0,
        icon: 'monk.svg',
        name: 'monk'
      }
    }],
    statBuffs: [{
      type: 'times',
      key: 'attack',
      amount: 0.5
    }, {
      type: 'times',
      key: 'attackMax',
      amount: 0.5
    }, {
      type: 'times',
      key: 'attackSpeed',
      amount: 2
    }]
  },

  unicorn: {
    id: 'unicorn',
    icon: 'unicorn.svg',
    name: 'unicorn',
    buffs: [{
      id: 'ninja_reflexes',
      data: {
        duration: Infinity,
        totalDuration: Infinity,
        icon: 'youngNinja.svg',
        name: 'Ninja Reflexes'
      }
    }]
  },

  // When below 50% hp, goes berserk
  dwarf: {
    id: 'dwarf',
    icon: 'dwarf.svg',
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
    icon: 'demon.svg',
    name: 'demon',
    buffs: [{
      id: 'demon_monster',
      data: {
        hideBuff: true
      }
    }]
  },

  angel: {
    id: 'angel',
    icon: 'angel.svg',
    name: 'angel'
  },

  // Block ability, reduces damage of all attacks after armor by X
  spartan: {
    id: 'spartan',
    icon: 'spartan.svg',
    name: 'spartan',
    statBuffs: [{
      type: 'plus',
      key: 'armor',
      amount: 500
    }, {
      type: 'times',
      key: 'magicArmor',
      amount: 0.2
    }]
  },

  octopus: {
    id: 'octopus',
    icon: 'octopus.svg',
    name: 'octopus',
    statBuffs: [{
      type: 'times',
      key: 'attackSpeed',
      amount: 4
    }, {
      type: 'times',
      key: 'attack',
      amount: 0.25
    }, {
      type: 'times',
      key: 'attackMax',
      amount: 0.25
    }]
  },

  // Block ability, reduces damage of all attacks after armor by X
  cut_purse: {
    id: 'cut_purse',
    icon: 'cutPurse.svg',
    name: 'cut purse',
    statBuffs: [{
      type: 'times',
      key: 'armor',
      amount: 0.8
    }, {
      type: 'times',
      key: 'attackSpeed',
      amount: 1.6
    }, {
      type: 'times',
      key: 'accuracy',
      amount: 0.8
    }, {
      type: 'times',
      key: 'attack',
      amount: 0.8
    }]
  },

  // Frost armor buff
  ice_giant: {
    id: 'ice_giant',
    icon: 'iceGiant.svg',
    name: 'ice giant',
    buffs: [{
      id: 'frost_armor',
      data: {
        level: 10,
        name: 'Frost Armor',
        icon: 'frostArmor.svg'
      }
    }]
  },

  // Spirits will randomly 'Blink', turning invulnrable for 10s
  cursed_spirit: {
    id: 'cursed_spirit',
    icon: 'cursedSpirit.svg',
    name: 'cursed spirit',
    buffs: [{
      id: 'spirit_blink',
      data: {
        icon: 'spiritBlink.svg',
        name: 'Spirit Blink',
        description: 'Will randomly fade into the ether, becoming invulnerable'
      }
    }]
  },

  meteorite_spirit: {
    id: 'meteorite_spirit',
    icon: 'meteoriteSpirit.svg',
    name: 'meteorite spirit',
    buffs: [{
      id: 'spirit_blink',
      data: {
        icon: 'spiritBlink.svg',
        name: 'Spirit Blink',
        description: 'Will randomly fade into the ether, becoming invulnerable'
      }
    }]
  },

  elven_steel_spirit: {
    id: 'elven_steel_spirit',
    icon: 'elvenSteelSpirit.svg',
    name: 'elven steel spirit',
    buffs: [{
      id: 'spirit_blink',
      data: {
        icon: 'spiritBlink.svg',
        name: 'Spirit Blink',
        description: 'Will randomly fade into the ether, becoming invulnerable'
      }
    }]
  },

  fairy_steel_spirit: {
    id: 'fairy_steel_spirit',
    icon: 'fairySteelSpirit.svg',
    name: 'fairy steel spirit',
    buffs: [{
      id: 'spirit_blink',
      data: {
        icon: 'spiritBlink.svg',
        name: 'Spirit Blink',
        description: 'Will randomly fade into the ether, becoming invulnerable'
      }
    }]
  },

  cobalt_spirit: {
    id: 'cobalt_spirit',
    icon: 'cobaltSpirit.svg',
    name: 'cobalt spirit',
    buffs: [{
      id: 'spirit_blink',
      data: {
        icon: 'spiritBlink.svg',
        name: 'Spirit Blink',
        description: 'Will randomly fade into the ether, becoming invulnerable'
      }
    }]
  },

  orichalcum_spirit: {
    id: 'orichalcum_spirit',
    icon: 'orichalcumSpirit.svg',
    name: 'orichalcum spirit',
    buffs: [{
      id: 'spirit_blink',
      data: {
        icon: 'spiritBlink.svg',
        name: 'Spirit Blink',
        description: 'Will randomly fade into the ether, becoming invulnerable'
      }
    }]
  },

  adamantium_spirit: {
    id: 'adamantium_spirit',
    icon: 'adamantiumSpirit.svg',
    name: 'adamantium spirit',
    buffs: [{
      id: 'spirit_blink',
      data: {
        icon: 'spiritBlink.svg',
        name: 'Spirit Blink',
        description: 'Will randomly fade into the ether, becoming invulnerable'
      }
    }]
  },

  mithril_spirit: {
    id: 'mithril_spirit',
    icon: 'mithrilSpirit.svg',
    name: 'mithril spirit',
    buffs: [{
      id: 'spirit_blink',
      data: {
        icon: 'spiritBlink.svg',
        name: 'Spirit Blink',
        description: 'Will randomly fade into the ether, becoming invulnerable'
      }
    }]
  },

  obsidian_spirit: {
    id: 'obsidian_spirit',
    icon: 'obsidianSpirit.svg',
    name: 'obsidian spirit',
    buffs: [{
      id: 'spirit_blink',
      data: {
        icon: 'spiritBlink.svg',
        name: 'Spirit Blink',
        description: 'Will randomly fade into the ether, becoming invulnerable'
      }
    }]
  },

  tungsten_spirit: {
    id: 'tungsten_spirit',
    icon: 'tungstenSpirit.svg',
    name: 'tungsten spirit',
    buffs: [{
      id: 'spirit_blink',
      data: {
        icon: 'spiritBlink.svg',
        name: 'Spirit Blink',
        description: 'Will randomly fade into the ether, becoming invulnerable'
      }
    }]
  },

  titanium_spirit: {
    id: 'titanium_spirit',
    icon: 'titaniumSpirit.svg',
    name: 'titanium spirit',
    buffs: [{
      id: 'spirit_blink',
      data: {
        icon: 'spiritBlink.svg',
        name: 'Spirit Blink',
        description: 'Will randomly fade into the ether, becoming invulnerable'
      }
    }]
  },

  platinum_spirit: {
    id: 'platinum_spirit',
    icon: 'platinumSpirit.svg',
    name: 'platinum spirit',
    buffs: [{
      id: 'spirit_blink',
      data: {
        icon: 'spiritBlink.svg',
        name: 'Spirit Blink',
        description: 'Will randomly fade into the ether, becoming invulnerable'
      }
    }]
  },

  steel_spirit: {
    id: 'steel_spirit',
    icon: 'steelSpirit.svg',
    name: 'steel spirit',
    buffs: [{
      id: 'spirit_blink',
      data: {
        icon: 'spiritBlink.svg',
        name: 'Spirit Blink',
        description: 'Will randomly fade into the ether, becoming invulnerable'
      }
    }]
  },

  carbon_spirit: {
    id: 'carbon_spirit',
    icon: 'carbonSpirit.svg',
    name: 'carbon spirit',
    buffs: [{
      id: 'spirit_blink',
      data: {
        icon: 'spiritBlink.svg',
        name: 'Spirit Blink',
        description: 'Will randomly fade into the ether, becoming invulnerable'
      }
    }]
  },

  gold_spirit: {
    id: 'gold_spirit',
    icon: 'goldSpirit.svg',
    name: 'gold spirit',
    buffs: [{
      id: 'spirit_blink',
      data: {
        icon: 'spiritBlink.svg',
        name: 'Spirit Blink',
        description: 'Will randomly fade into the ether, becoming invulnerable'
      }
    }]
  },

  silver_spirit: {
    id: 'silver_spirit',
    icon: 'silverSpirit.svg',
    name: 'silver spirit',
    buffs: [{
      id: 'spirit_blink',
      data: {
        icon: 'spiritBlink.svg',
        name: 'Spirit Blink',
        description: 'Will randomly fade into the ether, becoming invulnerable'
      }
    }]
  },

  // Can spawn multiple farmers
  farmer: {
    id: 'farmer',
    icon: 'farmer.svg',
    name: 'farmer',
    swarmRange: [2, 4]
  },

  // Cuts through armor
  beaver: {
    id: 'beaver',
    icon: 'beaver.svg',
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
    icon: 'snake.svg',
    name: 'snake',
    buffs: [{
      id: 'poisoned_blade',
      data: {
        level: 1,
        icon: 'poisonedBlade.svg'
      }
    }]
  },

  // Can spawn multiple worms
  worm: {
    id: 'worm',
    icon: 'worm.svg',
    name: 'worm',
    swarmRange: [3, 5]
  },

  butterfly: {
    id: 'butterfly',
    icon: 'butterfly.svg',
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
    icon: 'dragonfly.svg',
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
    icon: 'bee.svg',
    name: 'bee',
    swarmRange: [1, 7],
    statBuffs: [{
      type: 'plus',
      key: 'criticalChance',
      amount: 10
    }]
  },

  // Crit chance
  wasp: {
    id: 'wasp',
    icon: 'wasp.svg',
    name: 'wasp',
    statBuffs: [{
      type: 'plus',
      key: 'criticalChance',
      amount: 10
    }]
  },

  // Gains attack speed, the more damage taken
  angry_miner: {
    id: 'angry_miner',
    icon: 'angryMiner.svg',
    name: 'angry miner',
    buffs: [{
      id: 'angry_miner_monster',
      data: {
        icon: 'angryMiner.svg',
        name: 'angry miner'
      }
    }]
  },

  // Low Crit chance, high crit damage
  bird: {
    id: 'bird',
    icon: 'bird.svg',
    name: 'bird',
    statBuffs: [{
      type: 'plus',
      key: 'criticalChance',
      amount: 5
    }, {
      type: 'plus',
      key: 'criticalDamage',
      amount: 2
    }]
  },

  // Chance to bleed
  rat: {
    id: 'rat',
    icon: 'rat.svg',
    name: 'rat',
    swarmRange: [1, 3],
    buffs: [{
      id: 'rat_monster',
      data: {
        hideBuff: true
      }
    }]
  },

  fish: {
    id: 'fish',
    icon: 'fish.svg',
    name: 'fish',
    swarmRange: [4, 5],
    statBuffs: [{
      type: 'times',
      key: 'health',
      amount: 0.8
    }, {
      type: 'times',
      key: 'healthMax',
      amount: 0.8
    }]
  },

  // Heals from poison
  lizard: {
    id: 'lizard',
    icon: 'lizard.svg',
    name: 'lizard',
    buffs: [{
      id: 'lizard_monster',
      data: {
        icon: 'lizard.svg',
        name: 'thirst for poison'
      }
    }]
  },

  // Lots of health
  elephant: {
    id: 'elephant',
    icon: 'elephant.svg',
    name: 'elephant',
    statBuffs: [{
      type: 'times',
      key: 'health',
      amount: 1.3
    }, {
      type: 'times',
      key: 'healthMax',
      amount: 1.3
    }, {
      type: 'times',
      key: 'attackMax',
      amount: 3
    }, {
      type: 'times',
      key: 'attackSpeed',
      amount: 0.3
    }]
  },

  // Gains shit tons of armor, each attack reduces it by one
  crab: {
    id: 'crab',
    icon: 'crab.svg',
    name: 'crab',
    buffs: [{
      id: 'crab_monster',
      data: {
        icon: 'armor.svg',
        name: 'Crab Armor'
      }
    }]
  },

  // Spiked armor ability
  echidna: {
    id: 'echidna',
    icon: 'echidna.svg',
    name: 'echidna',
    buffs: [{
      id: 'spiked_armor',
      data: {
        level: 3,
        icon: 'spikedArmor.svg'
      }
    }]
  },

  // Lots of armor
  snail: {
    id: 'snail',
    icon: 'snail.svg',
    name: 'snail',
    statBuffs: [{
      type: 'times',
      key: 'armor',
      amount: 2
    }, {
      type: 'times',
      key: 'health',
      amount: 0.75
    }, {
      type: 'times',
      key: 'healthMax',
      amount: 0.75
    }]
  },

  // Randomly burrows, healing for X health
  wombat: {
    id: 'wombat',
    icon: 'wombat.svg',
    name: 'wombat',
    statBuffs: [{
      type: 'times',
      key: 'health',
      amount: 1.3
    }, {
      type: 'times',
      key: 'healthMax',
      amount: 1.3
    }]
  },

  // Resistance to magic
  brown_mage: {
    id: 'brown_mage',
    icon: 'brown_mage.svg',
    name: 'brown mage',
    statBuffs: [{
      type: 'times',
      key: 'magicArmor',
      amount: 100
    }, {
      type: 'times',
      key: 'armor',
      amount: 0.3
    }]
  },

  // Casts earthen armor abilities
  earth_mage: {
    id: 'earth_mage',
    icon: 'earthMage.svg',
    name: 'earth mage',
    buffs: [{
      id: 'earth_mage_monster',
      data: {
        hideBuff: true
      }
    }],
    statBuffs: [{
      type: 'times',
      key: 'attack',
      amount: 0.01
    }, {
      type: 'times',
      key: 'attackMax',
      amount: 0.01
    }]
  },

  // Casts fire abilities
  fire_mage: {
    id: 'fire_mage',
    icon: 'fireMage.svg',
    name: 'fire mage',
    buffs: [{
      id: 'fire_mage_monster',
      data: {
        hideBuff: true
      }
    }],
    statBuffs: [{
      type: 'times',
      key: 'attack',
      amount: 0.01
    }, {
      type: 'times',
      key: 'attackMax',
      amount: 0.01
    }]
  },

  // Casts fire abilities
  water_mage: {
    id: 'water_mage',
    icon: 'waterMage.svg',
    name: 'water mage',
    buffs: [{
      id: 'water_mage_monster',
      data: {
        hideBuff: true
      }
    }],
    statBuffs: [{
      type: 'times',
      key: 'attack',
      amount: 0.01
    }, {
      type: 'times',
      key: 'attackMax',
      amount: 0.01
    }]
  },

  blue_mage: {
    id: 'blue_mage',
    icon: 'blue_mage.svg',
    name: 'blue mage',
    statBuffs: [{
      type: 'times',
      key: 'magicArmor',
      amount: 100
    }, {
      type: 'times',
      key: 'armor',
      amount: 0.3
    }]
  },

  // Breeds, has a chance each second to spawn another rabbit
  rabbit: {
    id: 'rabbit',
    icon: 'rabbit.svg',
    name: 'rabbit',
    buffs: [{
      id: 'rabbit_monster',
      data: {
        hideBuff: false,
        icon: 'rabbit.svg'
      }
    }],
    statBuffs: [{
      type: 'plus',
      key: 'magicArmor',
      amount: 20
    }, {
      type: 'times',
      key: 'attack',
      amount: 0.25
    }, {
      type: 'times',
      key: 'attackMax',
      amount: 0.25
    }, {
      type: 'times',
      key: 'armor',
      amount: 0.35
    }, {
      type: 'times',
      key: 'defense',
      amount: 0.35
    }]
  },

  // Venom + Swarm
  spider: {
    id: 'spider',
    icon: 'spider.svg',
    name: 'spider',
    swarmRange: [1, 3],
    buffs: [{
      id: 'poisoned_blade',
      data: {
        level: 1,
        icon: 'poisonedBlade.svg'
      }
    }]
  },

  // Stronger venom, lower chance
  jellyFish: {
    id: 'jellyFish',
    icon: 'jellyFish.svg',
    name: 'jellyFish',
    buffs: [{
      id: 'poisoned_blade',
      data: {
        level: 10,
        icon: 'poisonedBlade.svg'
      }
    }],
    statBuffs: [{
      type: 'times',
      key: 'attackSpeed',
      amount: 0.3
    }]
  },

  gorilla: {
    id: 'gorilla',
    icon: 'gorilla.svg',
    name: 'gorilla',
    buffs: [{
      id: 'boss_gorilla',
      data: {
        duration: Infinity,
        totalDuration: Infinity,
        icon: 'gorilla.svg',        
        name: 'gorilla',
        timeTillLearn: 7
      }
    }],
    statBuffs: [{
      type: 'times',
      key: 'attack',
      amount: 0.66
    }, {
      type: 'times',
      key: 'health',
      amount: 1.0
    }, {
      type: 'times',
      key: 'healthMax',
      amount: 1.0
    }]
  },

  gelatinous_cube: {
    id: 'gelatinous_cube',
    icon: 'gelatinous_cube.svg',
    name: 'gelatinous cube',
    buffs: [{
      id: 'gelatinous_cube_monster',
      data: {
        duration: Infinity,
        totalDuration: Infinity,
        stacks: 2,
        icon: 'cubeSplit.svg',
        name: 'gelatinous cube',
        splitHealthPercentage: 15,
        splitAmount: 3,
        hasSplit: false
      }
    }],
    statBuffs: [{
      type: 'times',
      key: 'attack',
      amount: 0.35
    }, {
      type: 'times',
      key: 'attackMax',
      amount: 0.35
    }, {
      type: 'times',
      key: 'health',
      amount: 1.5
    }, {
      type: 'times',
      key: 'healthMax',
      amount: 1.5
    }]
  },

  warden: {
    id: 'warden',
    icon: 'warden.svg',
    name: 'warden',
    buffs: [{
      id: 'warden_shield',
      data: {
        duration: Infinity,
        totalDuration: Infinity,
        level: 10, // 80% damage redirection
        icon: 'warden_shield.svg',
        name: 'warden shield',
        allies: 'enemies',
        applyToAllies: true,
        appliedToAllies: false,
        sourceAlly: null
      }
    }],
    statBuffs: [{
      type: 'times',
      key: 'attack',
      amount: 0.35
    }, {
      type: 'times',
      key: 'attackMax',
      amount: 0.35
    }, {
      type: 'times',
      key: 'armor',
      amount: 2
    }, {
      type: 'times',
      key: 'health',
      amount: 2
    }, {
      type: 'times',
      key: 'healthMax',
      amount: 2
    }]
  }

}, BOSS_ENEMIES);
