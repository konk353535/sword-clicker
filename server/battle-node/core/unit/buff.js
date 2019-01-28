import { BUFFS } from '../../../../imports/constants/buffs/index.js';

export default class Buff {

  get events() {
    try {
      return BUFFS[this.id].events;
    } catch (err) {
      console.log("No buff (.events)!", this.id);
      console.log(err);
    }
  }

  get constants() {
    try {
      return BUFFS[this.id];
    } catch (err) {
      console.log("No buff (constants)!", this.id);
      console.log(err);
    }
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

  get icon() { return this._icon; }
  set icon(value) {
    this._icon = value;
    this.delta('icon');
  }

  get customText() { return this._customText; }
  set customText(value) {
    this._customText = value;
    this.delta('customText');
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
    this._icon = buff.icon;
    if (!buff.icon && buff.data && buff.data.icon) {
      this._icon = buff.data.icon;
    }
    this._customText = buff.customText;
    if (!buff.customText && buff.data && buff.data.customText) {
      this._customText = buff.data.customText;
    }
    this.data = buff.data;
    this.data.didApply = (buff.data.didApply) ? true: false;
  }

  onApply(options) {
    if (!this.data.didApply) {
      if (this.events.onApply) {
        this.events.onApply(options);
        this.data.didApply = true;
      }
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
      icon: this.icon,
      customText: this.customText,
      data: this.data
    }
  }
}
