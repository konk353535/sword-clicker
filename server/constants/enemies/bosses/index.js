import { VERY_FAST_SPEED, FAST_SPEED, MEDIUM_SPEED, SLOW_SPEED } from '/server/constants/combat/attackSpeeds.js';  

export const BOSS_ENEMIES = {

  // High accuracy
  // Each consecutive attack on the same target increases damage (forced taunt offs)
  // This is shown with a number of stacks on the target
  // Drops off pretty quick (5-10s)

  boss_cougar: {
    id: 'boss_cougar',
    icon: 'puma',
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
    icon: 'cobra',
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
        icon: 'cobra',        
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
    icon: 'boneWarrior',
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
        icon: 'boneWarrior',        
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
    icon: 'spartan',
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
        icon: 'bossSpartan',        
        name: 'boss spartan',
        hideBuff: true
      }
    }, {
      id: 'phalanx',
      data: {
        duration: Infinity,
        totalDuration: Infinity,
        icon: 'phalanx',  
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
    icon: 'bossMage',
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
        icon: 'bossMage',        
        name: 'boss mage',
        timeTillSpawn: 10
      }
    }],
    rewards: []
  },

  // Summons goblins incrementally which steal yo stats (low hp, spawn quickly)
  boss_goblin: {
    id: 'boss_goblin',
    icon: 'goblin',
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
        icon: 'goblin',        
        name: 'boss goblin',
        timeTillSpawn: 10
      }
    }],
    rewards: []
  },

  // Changes target every attack
  boss_ogre: {
    id: 'boss_ogre',
    icon: 'iceGiant',
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
        icon: 'ogre',        
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
    icon: 'phoenix',
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
        icon: 'phenoix',        
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
    icon: 'gorilla',
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
        icon: 'gorilla',        
        name: 'boss gorilla',
        timeTillLearn: 15
      }
    }],
    rewards: []
  },

  // Demon
  boss_demon: {
    id: 'boss_demon',
    icon: 'bossDemon',
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
        icon: 'demon',        
        name: 'demon',
        hideBuff: true
      }
    }],
    rewards: []
  },

  boss_genie_lamp: {
    id: 'boss_genie_lamp',
    icon: 'bossGenieLamp',
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
        icon: 'bossGenieLamp',        
        name: 'genies lamp',
        hideBuff: true
      }
    }],
    rewards: []
  },

  boss_living_tree: {
    id: 'boss_living_tree',
    icon: 'livingTree',
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
        icon: 'livingTree',
        damageTillSpawn: 100,
        name: 'genies lamp'
      }
    }],
    rewards: []
  },

  boss_vampire: {
    id: 'boss_vampire',
    icon: 'vampire',
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
        icon: 'vampire',        
        name: 'vampire',
        timeTillBlood: 15
      }
    }],
    rewards: []
  },

  boss_frankenstein: {
    id: 'boss_frankenstein',
    icon: 'frankenstein',
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
    icon: 'cassiopeia',
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
        icon: 'ogre',        
        name: 'boss ogre',
        hideBuff: true
      }
    }, {
      id: 'poisoned_blade',
      data: {
        duration: 10000,
        totalDuration: 10000,
        icon: 'poisonedBlade',
        name: 'poisoned blade',
        level: 1
      }
    }],
    rewards: []
  },

  boss_old_tortoise: {
    id: 'boss_old_tortoise',
    icon: 'oldTortoise',
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
      armor: 300,
      magicArmor: 100,
      damageTaken: 1
    },
    buffs: [{
      id: 'boss_old_tortoise',
      data: {
        duration: Infinity,
        totalDuration: Infinity,
        icon: 'oldTortoise',        
        name: 'boss old tortoise'
      }
    }],
    rewards: []
  },
}
