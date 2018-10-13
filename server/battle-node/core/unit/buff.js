import { BUFFS } from '../.././imports/constants/buffs/index.js';

export default class Buff {

  get events() {
    return BUFFS[this.id].events;
  }

  get constants() {
    return BUFFS[this.id]
  }
  set constants(value) {
    return;
  }

  get stacks() { return this._stacks; }
  set stacks(value) {
    this._stacks = value;
    this.delta('stacks');
  }

  get duration() { return this._duration; }
  set duration(value) {
    this._duration = value;
    if (value !== Infinity) {
      this.delta('duration');
    }
  }

  delta(key) {
    const event = {
      type: 'abs',
      path: `unitsMap.${this.unit.id}.buffsMap.${this.id}.${key}`,
      value: this[key]
    };

    this.battleRef.deltaEvents.push(event);
  }

  constructor(buff, unit, battleRef) {
    this.id = buff.id;
    this.unit = unit;
    this._isBuffClass = true;
    this.battleRef = battleRef;
    if (buff.duration == undefined) {
      this._duration = buff.data.duration;
    } else {
      this._duration = buff.duration;
    }
    this._stacks = buff.stacks;
    if (!buff.stacks && buff.data && buff.data.stacks) {
      this._stacks = buff.data.stacks;
    }
    this.data = buff.data;
  }

  onApply(options) {
    if (this.events.onApply) {
      this.events.onApply(options);
    }
  }

  onDidDamage(options) {
    if (this.events.onDidDamage) {
      this.events.onDidDamage(options);
    }
  }

  onTookDamage(options) {
    if (this.events.onTookDamage) {
      this.events.onTookDamage(options);
    }
  }

  onTick(options) {
    if (this.events.onTick) {
      this.events.onTick(options);
    }
  }

  onRemove(options) {
    if (this.events.onRemove) {
      this.events.onRemove(options);
    }
  }

  onBeforeDeath(options) {
    if (this.events.onBeforeDeath) {
      this.events.onBeforeDeath(options);
    }
  }

  raw() {
    return {
      id: this.id,
      duration: this.duration,
      stacks: this.stacks,
      data: this.data
    }
  }
}
