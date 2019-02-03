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
      if (attackSpeed <= 0) {
        attackSpeed = 0.001;
      }
      // Fixes a bug where attack speeds beyond 8 yield an attack speed of 0
      if (attackSpeed >= 8) {
        return 7;
      }
      return Math.round(ticksPerSecond / attackSpeed);
    }
    return 0.001;
  }
  
  revertToOriginal() {
    this.attack = this.origStats.attack;
    this.attackMax = this.origStats.attackMax;
    this.attackSpeed = this.origStats.attackSpeed;
    this.criticalChance = this.origStats.criticalChance;
    this.healingPower = this.origStats.healingPower;
    this.criticalDamage = this.origStats.criticalDamage;
    this.accuracy = this.origStats.accuracy;
    this.defense = this.origStats.defense;
    this.health = this.origStats.health;
    this.healthMax = this.origStats.healthMax;
    this.healthMaxOrig = this.origStats.healthMax;
    this.magicPower = this.origStats.magicPower;
    this.armor = this.origStats.armor;
    this.magicArmor = this.origStats.magicArmor;
    this.healingReduction = this.origStats.healingReduction || 1;
  };

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

  get healthMax() { return this._healthMax; }
  set healthMax(value) {
    this._healthMax = value;
    this.delta('healthMax');
  }

  get healthMaxOrig() { return this._healthMaxOrig; }
  set healthMaxOrig(value) {
    this._healthMaxOrig = value;
    this.delta('healthMaxOrig');
  }

  get health() { return this._health; }
  set health(value) {
    this._health = value;
    this.delta('health');
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
    this.attackSpeed = stats.attackSpeed;
    this.criticalChance = stats.criticalChance;
    this.healingPower = stats.healingPower;
    this.criticalDamage = stats.criticalDamage;
    this.accuracy = stats.accuracy;
    this.defense = stats.defense;
    this.health = stats.health;
    this.healthMax = stats.healthMax;
    this.healthMaxOrig = stats.healthMax;
    this.damageTaken = stats.damageTaken;
    this.magicPower = stats.magicPower;
    this.armor = stats.armor;
    this.magicArmor = stats.magicArmor;
    this.healingReduction = stats.healingReduction || 1;
    this.damageOutput = 1.0;
    
    this.origStats = stats;
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
      healthMaxOrig: this.healthMaxOrig,
      damageTaken: this.damageTaken,
      magicPower: this.magicPower,
      armor: this.armor,
      magicArmor: this.magicArmor,
      attackSpeedTicks: this.attackSpeedTicks,
    }
  }
}
