import { VERY_FAST_SPEED, FAST_SPEED, MEDIUM_SPEED, SLOW_SPEED } from '/server/constants/combat/attackSpeeds.js';  

export const BOSS_ENEMIES = {
  lionBoss: {
    id: 'lionBoss',
    icon: 'lionBoss',
    name: 'Jungle King',
    stats: {
      attack: 30,
      attackMax: 50,
      attackSpeed: MEDIUM_SPEED,
      accuracy: 35,
      health: 3000,
      healthMax: 3000,
      defense: 60,
      armor: 150,
      damageTaken: 1
    }
  }
}
