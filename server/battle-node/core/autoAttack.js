import { BUFFS } from '../../../imports/constants/buffs/index.js';

export const TICK_DURATION = 200;
export const secondsElapsed = TICK_DURATION / 1000;

export default function({ attacker, defender, originalAutoAttack = true, damageModifier = 0, source }) {
  // Do we hit?
  let hitGap = attacker.stats.accuracy - defender.stats.defense;
  let hitChance = 0.5;

  if (hitGap > 0) {
    // Favours attacker
    const extraChance = (Math.abs(hitGap) / (Math.abs(hitGap) + 50)) / 2;
    hitChance += extraChance;
  } else {
    // Favours defender
    const extraChance = (Math.abs(hitGap) / (Math.abs(hitGap) + 50)) / 2;
    hitChance -= extraChance;
  }

  if (defender.stats.minimumHitChance && hitChance > (1 - defender.stats.minimumHitChance)) {
    hitChance = 1 - defender.stats.minimumHitChance;
  }

  if ((attacker.cantMiss || hitChance >= Math.random()) && (!defender.cantBeHit)) {
    // How much do we hit for
    const extraRawDamage = Math.round(Math.random() * (attacker.stats.attackMax - attacker.stats.attack));
    let rawDamage = attacker.stats.attack + extraRawDamage;
    
    if (damageModifier !== 0) {
      rawDamage *= 1.0 + damageModifier;
    }

    // Custom icon undefined by default
    let customIcon;
    // Adjust icon per source
    if (source === 'phantom_strikes') {
      customIcon = 'phantomStrikes';
    }
    // Is this a crit?
    if (attacker.stats.criticalChance && Math.random() <= (attacker.stats.criticalChance / 100)) {
      rawDamage *= attacker.stats.criticalDamage;
      customIcon = 'criticalStrike';
    }

    const damageDealt = this.dealDamage(rawDamage, {
      attacker,
      defender,
      tickEvents: this.tickEvents,
      customIcon,
      historyStats: this.historyStats,
      source: 'autoattack'
    });

    // Tick didDamage event on attacker
    if (attacker.buffs) {
      attacker.buffs.forEach((buff) => {
        buff.constants = BUFFS[buff.id];
        if (buff.constants.events.onDidDamage) {
          // Did Damage
          buff.constants.events.onDidDamage({
            originalAutoAttack,
            buff,
            defender,
            attacker,
            actualBattle: this,
            damageDealt,
            rawDamage,
            source: 'autoattack'
          })
        }
      });
    }

    // Tick tookDamage event on defender
    if (defender.buffs) {
      defender.buffs.forEach((buff) => {
        buff.constants = BUFFS[buff.id];
        if (buff.constants.events.onTookDamage) {
          // Took Damage
          buff.constants.events.onTookDamage({ buff, defender, attacker, actualBattle: this, damageDealt, source: 'autoattack' })
        }
      });
    }

  } else {
    this.dealDamage(0, { attacker, defender, tickEvents: this.tickEvents, customIcon: 'dodge', customColor: '#888888', historyStats: this.historyStats, actualBattle: this, source: 'autoattack' });
    
    // Tick dodgedDamage event on defender
    if (defender.buffs) {
      defender.buffs.forEach((buff) => {
        buff.constants = BUFFS[buff.id];
        if (buff.constants.events.onDodgedDamage) {
          // Dodged Damage
          buff.constants.events.onDodgedDamage({ buff, defender, attacker, actualBattle: this, source: 'autoattack' })
        }
      });
    }
  }
}
