import { TICK_DURATION } from '../autoAttack';

const ticksPerSecond = 1000 / TICK_DURATION;

export default class Stats {

  getAttackSpeedTicks(attackSpeed) {
    // Convert attack speed seconds to attack speed ticks
    if (attackSpeed !== undefined) {
      // Fixes a bug where attack speeds beyond 8 yield an attack speed of 0
      if (attackSpeed >= 8) {
        return 1;
      }
      return Math.round(ticksPerSecond / attackSpeed);
    } else {
      return 0;
    }
  }

  get attackSpeed() {
    return this._attackSpeed;
  }
  set attackSpeed(value) {
    this._attackSpeed = value;
    this.attackSpeedTicks = this.getAttackSpeedTicks(value);
  }

  constructor(stats, unitId, battleRef) {
    this.attack = stats.attack;
    this.attackMax = stats.attackMax;
    this.attackSpeed = stats.attackSpeed
    this.criticalChance = stats.criticalChance
    this.healingPower = stats.healingPower;
    this.criticalDamage = stats.criticalDamage;
    this.accuracy = stats.accuracy;
    this.defense = stats.defense;
    this.health = stats.health;
    this.healthMax = stats.healthMax
    this.damageTaken = stats.damageTaken
    this.magicPower = stats.magicPower
    this.armor = stats.armor;
    this.magicArmor = stats.magicArmor
  }

  raw() {
    return {
      attack: this.attack,
      attackMax: this.attackMax,
      attackSpeed: this.attackSpeed,
      criticalChance: this.criticalChance,
      healingPower: this.healingPower,
      criticalDamage: this.criticalDamage,
      accuracy: this.accuracy,
      defense: this.defense,
      health: this.health,
      healthMax: this.healthMax,
      damageTaken: this.damageTaken,
      magicPower: this.magicPower,
      armor: this.armor,
      magicArmor: this.magicArmor,
      attackSpeedTicks: this.attackSpeedTicks,
    }
  }
}
