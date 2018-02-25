import { VERY_FAST_SPEED, FAST_SPEED, MEDIUM_SPEED, SLOW_SPEED } from '/server/constants/combat/attackSpeeds.js';  

export const BOSS_ENEMIES = {

  // High accuracy
  // Each consecutive attack on the same target increases damage (forced taunt offs)
  // This is shown with a number of stacks on the target
  // Drops off pretty quick (5-10s)

  boss_cougar: {
    id: 'boss_cougar',
    icon: 'puma.svg',
    name: 'Boss Cougar',
    isBoss: true,
    stats: {
      attack: 20,
      attackMax: 40,
      attackSpeed: VERY_FAST_SPEED,
      accuracy: 60,
      health: 105,
      healthMax: 105,
      defense: 30,
      armor: 120,
      magicArmor: 60,
      damageTaken: 1
    },
    buffs: [{
      id: 'boss_cougar',
      data: {
        duration: Infinity,
        totalDuration: Infinity,
        hideBuff: true,
        name: 'boss cougar'
      }
    }],
    rewards: []
  },


  // Every 60s the cobra will spawn 2 adds (seperated by 5s)
  // The adds are easy to kill, but can poison people so must be killed quickly
  boss_cobra: {
    id: 'boss_cobra',
    icon: 'cobra.svg',
    name: 'Boss cobra',
    isBoss: true,
    stats: {
      attack: 15,
      attackMax: 30,
      attackSpeed: VERY_FAST_SPEED,
      accuracy: 75,
      health: 190,
      healthMax: 190,
      defense: 75,
      armor: 110,
      magicArmor: 500,
      damageTaken: 1
    },
    buffs: [{
      id: 'boss_cobra',
      data: {
        duration: Infinity,
        totalDuration: Infinity,
        icon: 'cobra.svg',        
        name: 'boss cobra',
        timeTillSpawn: 45,
        phase: 1
      }
    }],
    rewards: []
  },

  // Cleave
  boss_bone_warrior: {
    id: 'boss_bone_warrior',
    icon: 'boneWarrior.svg',
    name: 'Boss Bone Warrior',
    isBoss: true,
    stats: {
      attack: 30,
      attackMax: 55,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 100,
      health: 235,
      healthMax: 235,
      defense: 100,
      armor: 260,
      magicArmor: 110,
      damageTaken: 1
    },
    buffs: [{
      id: 'boss_bone_warrior',
      data: {
        duration: Infinity,
        totalDuration: Infinity,
        icon: 'boneWarrior.svg',        
        name: 'bone warrior'
      }
    }],
    rewards: []
  },

  // phalanx
  // Boss spawns with 3 additional spartans with lowish hp
  // Each spartan gains 250 armor for each other spartan on the field
  // Once the boss is alone, this buff is lost
  boss_spartan: {
    id: 'boss_spartan',
    icon: 'spartan.svg',
    name: 'Spartan',
    isBoss: true,
    stats: {
      attack: 40,
      attackMax: 80,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 110,
      health: 300,
      healthMax: 300,
      defense: 110,
      armor: 180,
      magicArmor: 90,
      damageTaken: 1
    },
    buffs: [{
      id: 'boss_spartan',
      data: {
        duration: Infinity,
        totalDuration: Infinity,
        icon: 'bossSpartan.svg',        
        name: 'boss spartan',
        hideBuff: true
      }
    }, {
      id: 'phalanx',
      data: {
        duration: Infinity,
        totalDuration: Infinity,
        icon: 'phalanx.svg',  
        isEnemy: true,
        extraArmor: 0,
        name: 'phalanx'
      }
    }],
    rewards: []
  },

  // Summons enemies to fight for him (little worms)
  // Casts fire ball at current enemy, 20% chance on attack
  // Casts aoe ignite on all enemies, every 60 seconds.
  boss_mage: {
    id: 'boss_mage',
    icon: 'bossMage.svg',
    name: 'mage',
    isBoss: true,
    stats: {
      attack: 60,
      attackMax: 120,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 120,
      health: 360,
      healthMax: 360,
      defense: 120,
      armor: 180,
      magicArmor: 1000,
      damageTaken: 1
    },
    buffs: [{
      id: 'boss_mage',
      data: {
        duration: Infinity,
        totalDuration: Infinity,
        icon: 'bossMage.svg',        
        name: 'boss mage',
        timeTillSpawn: 10
      }
    }],
    rewards: []
  },

  // Summons goblins incrementally which steal yo stats (low hp, spawn quickly)
  boss_goblin: {
    id: 'boss_goblin',
    icon: 'goblin.svg',
    name: 'goblin',
    isBoss: true,
    stats: {
      attack: 80,
      attackMax: 200,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 130,
      health: 420,
      healthMax: 420,
      defense: 130,
      armor: 180,
      magicArmor: 180,
      damageTaken: 1
    },
    buffs: [{
      id: 'boss_goblin',
      data: {
        duration: Infinity,
        totalDuration: Infinity,
        icon: 'goblin.svg',        
        name: 'boss goblin',
        timeTillSpawn: 10
      }
    }],
    rewards: []
  },

  // Changes target every attack
  boss_ogre: {
    id: 'boss_ogre',
    icon: 'iceGiant.svg',
    name: 'ogre',
    isBoss: true,
    stats: {
      attack: 120,
      attackMax: 200,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 145,
      health: 650,
      healthMax: 650,
      defense: 145,
      armor: 250,
      magicArmor: 250,
      damageTaken: 1
    },
    buffs: [{
      id: 'boss_ogre',
      data: {
        duration: Infinity,
        totalDuration: Infinity,
        icon: 'ogre.svg',        
        name: 'boss ogre',
        hideBuff: true
      }
    }],
    rewards: []
  },

  // Spawns with two eggs. Eggs have decent hp.
  // Choose between killing eggs then fighting boss. Or ignoring eggs
  // Once eggs timer hits 0, two phenoixes spawn
  // Killing the eggs spawns the phenoixes at 10% hp
  // Killing these little phenoixes spawns eggs with a longer cooldown then initially
  boss_phoenix: {
    id: 'boss_phoenix',
    icon: 'phoenix.svg',
    name: 'phoenix',
    isBoss: true,
    stats: {
      attack: 140,
      attackMax: 260,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 155,
      health: 800,
      healthMax: 800,
      defense: 155,
      armor: 300,
      magicArmor: 400,
      damageTaken: 1
    },
    buffs: [{
      id: 'boss_phoenix',
      data: {
        duration: Infinity,
        totalDuration: Infinity,
        icon: 'phenoix.svg',        
        name: 'boss phenoix',
        hideBuff: true
      }
    }],
    rewards: []
  },

  // Intelligence, analyzes enemies weaknesses and gains stats the longer the fight goes
  // Stat gain is based on who they are fighting
  boss_gorilla: {
    id: 'boss_gorilla',
    icon: 'gorilla.svg',
    name: 'gorilla',
    isBoss: true,
    stats: {
      attack: 180,
      attackMax: 300,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 165,
      health: 950,
      healthMax: 950,
      defense: 165,
      armor: 200,
      magicArmor: 200,
      damageTaken: 1
    },
    buffs: [{
      id: 'boss_gorilla',
      data: {
        duration: Infinity,
        totalDuration: Infinity,
        icon: 'gorilla.svg',        
        name: 'boss gorilla',
        timeTillLearn: 15
      }
    }],
    rewards: []
  },

  // Demon
  boss_demon: {
    id: 'boss_demon',
    icon: 'bossDemon.svg',
    name: 'demon',
    isBoss: true,
    stats: {
      attack: 200,
      attackMax: 250,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 180,
      health: 1100,
      healthMax: 1100,
      defense: 180,
      armor: 250,
      magicArmor: 150,
      damageTaken: 1
    },
    buffs: [{
      id: 'demon_monster',
      data: {
        duration: Infinity,
        totalDuration: Infinity,
        icon: 'demon.svg',        
        name: 'demon',
        hideBuff: true
      }
    }],
    rewards: []
  },

  boss_genie_lamp: {
    id: 'boss_genie_lamp',
    icon: 'bossGenieLamp.svg',
    name: 'Genies Lamp',
    isBoss: true,
    stats: {
      attack: 250,
      attackMax: 350,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 190,
      health: 1250,
      healthMax: 1250,
      defense: 190,
      armor: 250,
      magicArmor: 150,
      damageTaken: 1
    },
    buffs: [{
      id: 'boss_genie_lamp',
      data: {
        duration: Infinity,
        totalDuration: Infinity,
        icon: 'bossGenieLamp.svg',        
        name: 'genies lamp',
        hideBuff: true
      }
    }],
    rewards: []
  },

  boss_living_tree: {
    id: 'boss_living_tree',
    icon: 'livingTree.svg',
    name: 'Living Tree',
    isBoss: true,
    stats: {
      attack: 1,
      attackMax: 1,
      attackSpeed: SLOW_SPEED,
      accuracy: 205,
      health: 1700,
      healthMax: 1700,
      defense: 205,
      armor: 250,
      magicArmor: 250,
      damageTaken: 1
    },
    buffs: [{
      id: 'boss_living_tree',
      data: {
        duration: Infinity,
        totalDuration: Infinity,
        icon: 'livingTree.svg',
        damageTillSpawn: 100,
        name: 'genies lamp'
      }
    }],
    rewards: []
  },

  boss_vampire: {
    id: 'boss_vampire',
    icon: 'vampire.svg',
    name: 'vampire',
    isBoss: true,
    stats: {
      attack: 275,
      attackMax: 350,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 220,
      health: 1550,
      healthMax: 1550,
      defense: 220,
      armor: 250,
      magicArmor: 150,
      damageTaken: 1
    },
    buffs: [{
      id: 'boss_vampire',
      data: {
        duration: Infinity,
        totalDuration: Infinity,
        icon: 'vampire.svg',        
        name: 'vampire',
        timeTillBlood: 15
      }
    }],
    rewards: []
  },

  boss_frankenstein: {
    id: 'boss_frankenstein',
    icon: 'frankenstein.svg',
    name: 'frankenstein',
    isBoss: true,
    stats: {
      attack: 275,
      attackMax: 350,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 230,
      health: 1700,
      healthMax: 1700,
      defense: 230,
      armor: 300,
      magicArmor: 100,
      damageTaken: 1
    },
    rewards: []
  },

  boss_cassiopeia: {
    id: 'boss_cassiopeia',
    icon: 'cassiopeia.svg',
    name: 'cassiopeia',
    isBoss: true,
    stats: {
      attack: 150,
      attackMax: 200,
      attackSpeed: VERY_FAST_SPEED,
      accuracy: 240,
      health: 1950,
      healthMax: 1950,
      defense: 240,
      armor: 300,
      magicArmor: 100,
      damageTaken: 1
    },
    buffs: [{
      id: 'boss_ogre',
      data: {
        duration: Infinity,
        totalDuration: Infinity,
        icon: 'ogre.svg',        
        name: 'boss ogre',
        hideBuff: true
      }
    }, {
      id: 'poisoned_blade',
      data: {
        duration: 10000,
        totalDuration: 10000,
        icon: 'poisonedBlade.svg',
        name: 'poisoned blade',
        level: 1
      }
    }],
    rewards: []
  },

  boss_old_tortoise: {
    id: 'boss_old_tortoise',
    icon: 'oldTortoise.svg',
    name: 'old tortoise',
    isBoss: true,
    stats: {
      attack: 250,
      attackMax: 300,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 250,
      health: 2050,
      healthMax: 2050,
      defense: 250,
      armor: 330,
      magicArmor: 100,
      damageTaken: 1
    },
    buffs: [{
      id: 'boss_old_tortoise',
      data: {
        duration: Infinity,
        totalDuration: Infinity,
        icon: 'oldTortoise.svg',        
        name: 'boss old tortoise'
      }
    }],
    rewards: []
  },

  boss_kraken: {
    id: 'boss_kraken',
    icon: 'kraken.svg',
    name: 'kraken',
    isBoss: true,
    stats: {
      attack: 300,
      attackMax: 350,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 275,
      health: 3000,
      healthMax: 3000,
      defense: 255,
      armor: 370,
      magicArmor: 100,
      damageTaken: 1
    },
    buffs: [{
      id: 'boss_kraken',
      data: {
        duration: Infinity,
        totalDuration: Infinity,
        icon: 'kraken.svg',        
        name: 'boss kraken',
        timeTillSpawn: 15
      }
    }],
    rewards: []
  },

  boss_bison: {
    id: 'boss_bison',
    icon: 'bison.svg',
    name: 'bison',
    isBoss: true,
    stats: {
      attack: 325,
      attackMax: 400,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 360,
      health: 3500,
      healthMax: 3500,
      defense: 360,
      armor: 600,
      magicArmor: 225,
      damageTaken: 1
    },
    buffs: [{
      id: 'boss_bison',
      data: {
        duration: Infinity,
        totalDuration: Infinity,
        icon: 'bisonRed.svg',        
        name: 'boss bison',
        timeTillCharge: 20
      }
    }],
    rewards: []
  },

  boss_wolf: {
    id: 'boss_wolf',
    icon: 'bossWolf.svg',
    name: 'wolf',
    isBoss: true,
    stats: {
      attack: 375,
      attackMax: 425,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 380,
      health: 4000,
      healthMax: 4000,
      defense: 380,
      armor: 1000,
      magicArmor: 400,
      damageTaken: 1
    },
    buffs: [{
      id: 'boss_wolf',
      data: {
        duration: Infinity,
        totalDuration: Infinity,
        icon: 'bossPoodle.svg',
        name: 'poodle defense',
        timeTillDefensive: 5
      }
    }],
    rewards: []
  },

  boss_fox: {
    id: 'boss_fox',
    icon: 'fireFox.svg',
    name: 'fox',
    isBoss: true,
    stats: {
      attack: 350,
      attackMax: 425,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 400,
      health: 6000,
      healthMax: 6000,
      defense: 400,
      armor: 1250,
      magicArmor: 450,
      damageTaken: 1
    },
    buffs: [{
      id: 'boss_fox',
      data: {
        duration: Infinity,
        totalDuration: Infinity,
        icon: 'fireFox.svg',
        name: 'fire',
        phase: 2 // starts on air phase
      }
    }],
    rewards: []
  },

  boss_dragon: {
    id: 'boss_dragon',
    icon: 'dragon.svg',
    name: 'Boss Dragon',
    isBoss: true,
    stats: {
      attack: 250,
      attackMax: 300,
      attackSpeed: SLOW_SPEED,
      accuracy: 400,
      health: 6500,
      healthMax: 6500,
      defense: 450,
      armor: 1650,
      magicArmor: 500,
      damageTaken: 1
    },
    buffs: [{
      id: 'boss_dragon',
      data: {
        duration: Infinity,
        totalDuration: Infinity,
        name: 'boss dragon',
        icon: 'dragon.svg',
        stackTimer: 0,
        stacks: 0,
        lastAttack: 0,
        attackChance: 1 / 50
      }
    }],
    rewards: []
  },

  boss_high_angel: {
    id: 'boss_high_angel',
    icon: 'high_angel.svg',
    name: 'Boss High Angel',
    isBoss: true,
    stats: {
      attack: 150,
      attackMax: 250,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 600,
      health: 12500,
      healthMax: 12500,
      defense: 225,
      armor: 650,
      magicArmor: 150,
      damageTaken: 1
    },
    buffs: [{
      id: 'boss_high_angel',
      data: {
        duration: Infinity,
        totalDuration: Infinity,
        name: 'boss high angel',
        icon: 'resurrection.svg',
        stacks: 0,
        timeTillResurrection: 5,
      }
    }, {
      id: 'angels_heart',
      data: {
        duration: Infinity,
        totalDuration: Infinity,
        name: 'angels heart',
        icon: 'angels_heart.svg',
        level: 5,
        allies: 'enemies',
      }
    }],
    rewards: []
  },

  boss_hive: {
    id: 'boss_hive',
    icon: 'hive.svg',
    name: 'Boss Hive',
    isBoss: true,
    stats: {
      attack: 1,
      attackMax: 1,
      attackSpeed: SLOW_SPEED,
      accuracy: 600,
      health: 12500,
      healthMax: 12500,
      defense: 110,
      armor: 850,
      magicArmor: 150,
      damageTaken: 1
    },
    buffs: [{
      id: 'boss_hive',
      data: {
        duration: Infinity,
        totalDuration: Infinity,
        name: 'boss hive',
        icon: 'honeycomb.svg',
        stacks: 0,
        damageLimit: 100
      }
    }],
    rewards: []
  }
};