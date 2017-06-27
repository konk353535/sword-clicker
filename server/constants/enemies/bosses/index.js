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
      health: 100,
      healthMax: 100,
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
      accuracy: 100,
      health: 160,
      healthMax: 160,
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
      accuracy: 150,
      health: 200,
      healthMax: 200,
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
      accuracy: 170,
      health: 250,
      healthMax: 250,
      defense: 140,
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
      accuracy: 170,
      health: 300,
      healthMax: 300,
      defense: 165,
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
        timeTillSpawn: 15
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
      accuracy: 250,
      health: 350,
      healthMax: 350,
      defense: 200,
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
        timeTillSpawn: 30
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
      accuracy: 300,
      health: 400,
      healthMax: 400,
      defense: 240,
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
      accuracy: 350,
      health: 450,
      healthMax: 450,
      defense: 280,
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
      accuracy: 400,
      health: 500,
      healthMax: 500,
      defense: 240,
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
      accuracy: 420,
      health: 550,
      healthMax: 550,
      defense: 270,
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

  // Demon
  boss_genie_lamp: {
    id: 'boss_genie_lamp',
    icon: 'bossGenieLamp',
    name: 'Genies Lamp',
    isBoss: true,
    stats: {
      attack: 250,
      attackMax: 350,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 420,
      health: 550,
      healthMax: 550,
      defense: 270,
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
  }
}
