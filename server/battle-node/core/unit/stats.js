import { TICK_DURATION } from '../autoAttack';
import { BATTLES } from '../../../constants/battles';

const ticksPerSecond = 1000 / TICK_DURATION;

export default class Stats {

  getDamageReduction (armor) {
    let damageReduction = BATTLES.dmgReduction(armor);

    if (damageReduction < 0) {
      damageReduction = 0;
    } else if (damageReduction > 1) {
      damageReduction = 1;
    } else if (damageReduction == null) {
      damageReduction = 0;
    }

    return damageReduction;
  }

  getAttackSpeedTicks(attackSpeed) {
    // Convert attack speed seconds to attack speed ticks
    if (attackSpeed !== undefined) {
      // Fixes a bug where attack speeds beyond 8 yield an attack speed of 0
      if (attackSpeed >= 8) {
        return 1;
      }
      return Math.round(ticksPerSecond / attackSpeed);
    }
    return 0;
  }

  get attackSpeed() {
    return this._attackSpeed;
  }
  set attackSpeed(value) {
    this._attackSpeed = value;
    this.attackSpeedTicks = this.getAttackSpeedTicks(value);
  }

  get armor() { return this._armor; }
  set armor(value) {
    this._armor = value;
    this.damageReduction = this.getDamageReduction(value);
  }

  get magicArmor() { return this._magicArmor; }
  set magicArmor(value) {
    this._magicArmor = value;
    this.magicDamageReduction = this.getDamageReduction(value);
  }

  get health() { return this._health; }
  set health(value) {
    this._health = value;
    this.delta('health');
  }

  get healthMax() { return this._healthMax; }
  set healthMax(value) {
    this._healthMax = value;
    this.delta('healthMax');
  }

  delta(stat) {
    const event = {
      type: 'abs',
      path: `unitsMap.${this.unitId}.stats.${stat}`,
      value: this[stat]
    };

    this.battleRef.deltaEvents.push(event);
  }

  constructor(stats, unitId, battleRef) {
    this.unitId = unitId;
    this.battleRef = battleRef;

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
