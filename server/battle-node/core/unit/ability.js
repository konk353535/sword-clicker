import { ABILITIES } from '../../../constants/combat/index.js';

export default class Ability {

  get isPassive() { return this.constants.isPassive; }
  get requires() { return this.constants.requires; }
  get target() { return this.constants.target; }
  get buffs() { return this.constants.buffs; }
  get cooldown() { return this.constants.cooldown; }

  get currentCooldown() { return this._currentCooldown; }
  set currentCooldown(value) {
    this._currentCooldown = value;
    this.delta('currentCooldown');
  }
  
  get casts() { return this._casts; }
  set casts(value) {
    this._casts = value;
    this.delta('casts');
  }

  delta(key) {
    const event = {
      type: 'abs',
      path: `unitsMap.${this.unit.id}.abilitiesMap.${this.id}.${key}`,
      value: this[key]
    };

    this.battleRef.deltaEvents.push(event);
  }

  constructor(ability, unit, battleRef) {
    this.unit = unit;
    this.battleRef = battleRef;

    this.id = ability.id;
    this.constants = Object.assign({}, ABILITIES[ability.id]);
    this.level = ability.level;
    this.totalCasts = ability.totalCasts;
    this._currentCooldown = ability.currentCooldown;
    this._casts = ability.casts;
    this.isSpell = ability.isSpell;
  }

  cast(targets) {
    if (this.currentCooldown > 0) {
      return;
    } else if (this.isSpell && this.casts <= 0) {
      return;
    } else if (this.isPassive) {
      return;
    }

    return this.battleRef.castAbility({
      ability: this,
      caster: this.unit,
      targets
    });
  }

  raw() {
    return {
      id: this.id,
      level: this.level,
      currentCooldown: this.currentCooldown,
      casts: this.casts,
      totalCasts: this.totalCasts,
      isSpell: this.isSpell
    }
  }
}
