import Stats from './stats';
import Buff from './buff';
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
    this.mainHandType = unit.mainHandType;
    this.offHandType = unit.offHandType;
    this.towerContributions = unit.towerContributions;
    this.monsterType = unit.monsterType;
    this.isLamp = unit.isLamp;

    if (unit.abilities) {
      this.abilitiesMap = {};
      this.abilities = unit.abilities.map((rawAbility) => {
        const ability = new Ability(rawAbility, this, battleRef);
        this.abilitiesMap[rawAbility.id] = ability;
        return ability;
      });
    }

    this.buffs = unit.buffs.map(buff => new Buff(buff, this, this.battleRef));

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

  onDeath() {
    // Get who was targetting this unit, give them a new target
    this.battleRef.allAliveUnits.forEach((unit) => {
      if (unit.target === this.id) {
        if (unit.isEnemy) {
          if (this.battleRef.units.length > 0) {
            unit.target = this.battleRef.units[0].id;
          }
        } else {
          if (this.battleRef.enemies.length > 0) {
            unit.target = this.battleRef.enemies[0].id;
          }
        }
      }
    });
  }

  addBuffs(buffs) {
    buffs.forEach(buff => this.addBuff(buff));
  }

  addBuff(buff) {
    const newBuff = new Buff(buff, this, this.battleRef);
    this.buffs.push(newBuff);
    this.battleRef.deltaEvents.push({
      type: 'push',
      path: `unitsMap.${this.id}.buffs`,
      value: newBuff.raw()
    });
    return newBuff;
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
      monsterType: this.monsterType,
      abilities: this.abilities ? this.abilities.map(ability => ability.raw()) : [],
      owner: this.owner,
      buffs: this.buffs && this.buffs.length > 0 ? this.buffs.map(buff => buff.raw()) : [],
      stats: this.stats.raw(),
      amulet: this.amulet,
      icon: this.icon,
      xpDistribution: this.xpDistribution,
      isTowerContribution: this.isTowerContribution,
      towerContributions: this.towerContributions,
      tickOffset: this.tickOffset,
      target: this.target,
      owner: this.owner,
      isEnemy: this.isEnemy
    }
  }

}
