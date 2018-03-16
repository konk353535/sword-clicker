import Stats from './stats';
import Ability from './ability';

export default class Unit {

  get name() { return this._name; }
  set name(value) { this._name = value; }

  get icon() { return this._icon; }
  set icon(value) { this._icon = value; }

  get target() { return this._target; }
  set target(value) {
    this._target = value;
    this.delta('target');
  }

  get isEnemy() { return this._isEnemy; }
  set isEnemy(value) { this._isEnemy = value; }

  delta(stat) {
    const event = {
      type: 'abs',
      path: `unitsMap.${this.id}.${stat}`,
      value: this[stat]
    };

    this.battleRef.deltaEvents.push(event);
  }

  constructor(unit, battleRef) {
    this.id = unit.id;
    this.isUnitClass = true;

    this._name = unit.name;
    this.battleRef = battleRef;
    this.battleSecret = unit.battleSecret;
    this.amulet = unit.amulet;

    if (unit.abilities) {
      this.abilitiesMap = {};
      this.abilities = unit.abilities.map((rawAbility) => {
        const ability = new Ability(rawAbility, this, battleRef);
        this.abilitiesMap[rawAbility.id] = ability;
        return ability;
      });
    }

    // TODO: Make this a class
    if (unit.buffs && unit.buffs.length > 0) {
      this.buffs = JSON.parse(JSON.stringify(unit.buffs));
    } else {
      this.buffs = unit.buffs.concat([]);
    }

    // TODO: Make this a class?
    this.stats = new Stats(unit.stats, unit.id, battleRef);
    this.xpDistribution = unit.xpDistribution;
    this.towerContributionsToday = unit.towerContributionsToday;
    this.isTowerContribution = unit.isTowerContribution;

    this._icon = unit.icon;
    this.tickOffset = unit.tickOffset || 0;
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

  addBuffs(buffs) {
    buffs.forEach(buff => this.addBuff(buff));
  }

  addBuff(buff) {
    this.buffs.push(buff);
    this.battleRef.deltaEvents.push({
      type: 'push',
      path: `unitsMap.${this.id}.buffs`,
      value: buff
    });
  }

  removeBuff(buffToRemove) {
    this.battleRef.deltaEvents.push({
      type: 'pop',
      path: `unitsMap.${this.id}.buffs`,
      value: buffToRemove.id
    });
    this.buffs = this.buffs.filter(buff => buff.id !== buffToRemove.id);
  }

  raw() {
    return {
      id: this.id,
      name: this.name,
      abilities: this.abilities ? this.abilities.map(ability => ability.raw()) : [],
      owner: this.owner,
      buffs: this.buffs,
      stats: this.stats.raw(),
      amulet: this.amulet,
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
