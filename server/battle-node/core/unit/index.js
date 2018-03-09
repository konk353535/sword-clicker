import Stats from './stats';

export default class Unit {

  get name() { return this._name; }
  set name(value) { this._name = value; }

  get abilities() { return this._abilities; }
  set abilities(value) { this._abilities = value; }

  get buffs() { return this._buffs; }
  set buffs(value) { this._buffs = value; }

  get icon() { return this._icon; }
  set icon(value) { this._icon = value; }

  get target() { return this._target; }
  set target(value) { this._target = value; }

  get isEnemy() { return this._isEnemy; }
  set isEnemy(value) { this._isEnemy = value; }

  constructor(unit, battleRef) {
    this.id = unit.id;

    this._name = unit.name;
    this.battleRef = battleRef;

    if (unit.abilities) {
      // TODO: Make this a class
      this._abilities = unit.abilities;
    }

    // TODO: Make this a class
    this._buffs = unit.buffs;

    // TODO: Make this a class?
    this.stats = new Stats(unit.stats, unit.id, battleRef);
    this.xpDistribution = unit.xpDistribution;
    this.towerContributionsToday = unit.towerContributionsToday;
    this.isTowerContribution = unit.isTowerContribution;

    this._icon = unit.icon;
    this.tickOffset = unit.tickOffset;
    this._target = unit.target;

    this.attackIn = this.tickOffset || 1; 

    if (unit.owner) {
      this.owner = unit.owner;
    } else {
      this._isEnemy = true;
    }
  }

  tick() {
    this.attackIn--;
  }

  raw() {
    return {
      id: this.id,
      name: this.name,
      abilities: this.abilities,
      owner: this.owner,
      buffs: this.buffs,
      stats: this.stats.raw(),
      icon: this.icon,
      xpDistribution: this.xpDistribution,
      isTowerContribution: this.isTowerContribution,
      towerContributionsToday: this.towerContributionsToday,
      tickOffset: this.tickOffset,
      target: this.target,
      owner: this.owner,
      isEnemy: this.isEnemy
    }
  }

}
