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
      health: 60000,
      healthMax: 60000,
      defense: 100,
      armor: 140,
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
      health: 100000,
      healthMax: 100000,
      defense: 140,
      armor: 180,
      damageTaken: 1
    },
    rewards: []
  }
}
