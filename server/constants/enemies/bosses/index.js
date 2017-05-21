import { VERY_FAST_SPEED, FAST_SPEED, MEDIUM_SPEED, SLOW_SPEED } from '/server/constants/combat/attackSpeeds.js';  

export const BOSS_ENEMIES = {
  boss_cougar: {
    id: 'boss_cougar',
    icon: 'puma',
    name: 'Boss Cougar',
    isBoss: true,
    stats: {
      attack: 20,
      attackMax: 50,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 40,
      health: 5000,
      healthMax: 5000,
      defense: 30,
      armor: 120,
      magicArmor: 60,
      damageTaken: 1
    },
    rewards: []
  },

  boss_cobra: {
    id: 'boss_cobra',
    icon: 'cobra',
    name: 'Boss cobra',
    isBoss: true,
    stats: {
      attack: 20,
      attackMax: 40,
      attackSpeed: VERY_FAST_SPEED,
      accuracy: 100,
      health: 7500,
      healthMax: 7500,
      defense: 70,
      armor: 100,
      magicArmor: 500,
      damageTaken: 1
    },
    rewards: []
  },

  boss_bone_warrior: {
    id: 'boss_bone_warrior',
    icon: 'boneWarrior',
    name: 'Boss Bone Warrior',
    isBoss: true,
    stats: {
      attack: 75,
      attackMax: 125,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 150,
      health: 12500,
      healthMax: 12500,
      defense: 100,
      armor: 260,
      magicArmor: 130,
      damageTaken: 1
    },
    rewards: []
  },

  boss_spartan: {
    id: 'boss_spartan',
    icon: 'spartan',
    name: 'Boss Spartan',
    isBoss: true,
    stats: {
      attack: 100,
      attackMax: 200,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 170,
      health: 20000,
      healthMax: 20000,
      defense: 140,
      armor: 180,
      magicArmor: 180,
      damageTaken: 1
    },
    rewards: []
  },

  boss_mage: {
    id: 'boss_mage',
    icon: 'bossMage',
    name: 'Boss mage',
    isBoss: true,
    stats: {
      attack: 100,
      attackMax: 200,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 170,
      health: 35000,
      healthMax: 35000,
      defense: 140,
      armor: 250,
      magicArmor: 1000,
      damageTaken: 1
    },
    rewards: []
  },

  boss_goblin: {
    id: 'boss_goblin',
    icon: 'bossGoblin',
    name: 'Boss goblin',
    isBoss: true,
    stats: {
      attack: 120,
      attackMax: 240,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 250,
      health: 45000,
      healthMax: 45000,
      defense: 180,
      armor: 180,
      magicArmor: 180,
      damageTaken: 1
    },
    rewards: []
  },

  boss_ogre: {
    id: 'boss_ogre',
    icon: 'bossOgre',
    name: 'Boss ogre',
    isBoss: true,
    stats: {
      attack: 140,
      attackMax: 260,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 270,
      health: 55000,
      healthMax: 55000,
      defense: 220,
      armor: 250,
      magicArmor: 250,
      damageTaken: 1
    },
    rewards: []
  },

  boss_phenoix: {
    id: 'boss_phenoix',
    icon: 'bossPhenoix',
    name: 'Boss phenoix',
    isBoss: true,
    stats: {
      attack: 140,
      attackMax: 260,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 270,
      health: 75000,
      healthMax: 75000,
      defense: 220,
      armor: 300,
      magicArmor: 400,
      damageTaken: 1
    },
    rewards: []
  },

  boss_gorilla: {
    id: 'boss_gorilla',
    icon: 'gorilla',
    name: 'Boss Gorilla',
    isBoss: true,
    stats: {
      attack: 180,
      attackMax: 300,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 350,
      health: 120000,
      healthMax: 120000,
      defense: 240,
      armor: 200,
      magicArmor: 200,
      damageTaken: 1
    },
    rewards: []
  }
}
