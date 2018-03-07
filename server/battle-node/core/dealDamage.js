import { BATTLES } from '../../constants/battles/index.js'; // List of available combat stats

export default function(rawDamage, {
  attacker,
  defender,
  tickEvents,
  customColor,
  customIcon,
  isMagic,
  isTrueDamage,
  historyStats 
}) {
  if (!attacker) {
    return 0;
  }

  let damage = rawDamage;
  if (damage > 0 && damage) {
    let dmgReduction = BATTLES.dmgReduction(isMagic ? defender.stats.magicArmor : defender.stats.armor);

    if (dmgReduction < 0) {
      dmgReduction = 0;
    } else if (isTrueDamage) {
      dmgReduction = 0;
    } else if (dmgReduction > 1) {
      dmgReduction = 1;
    } else if (dmgReduction == null) {
      dmgReduction = 0;
    }
    damage = (rawDamage * (1 - dmgReduction)) * defender.stats.damageTaken;

    if (defender.isBoss && damage > 10000) {
      damage = 10000;
    }
    defender.stats.health -= damage;

    // Check if this unit is dead
    if (defender.stats.health <= 0 || !defender.stats.health) {
      defender.stats.health = 0;

      // Call death event for this defender
      if (defender.buffs) {
        // Buffs can do things on tick, will collect them in the form of combatEvents
        defender.buffs.forEach((buff) => {
          buff.constants = BUFFS[buff.id];
          if (buff.constants.events.onBeforeDeath) {
            buff.constants.events.onBeforeDeath({ buff, target: defender, actualBattle: this });
          }
        });
      }

      // Only kill defender if it is still dead
      if (defender.stats.health <= 0) {
        this.removeUnit(defender);
      }
    }
  }

  if (historyStats && historyStats[attacker.id]) {
    historyStats[attacker.id].damageDone += damage;
  }

  if (historyStats && historyStats[defender.id]) {
    historyStats[defender.id].damageTaken += damage;
  }

  if(tickEvents) {
    tickEvents.push({
      from: attacker ? attacker.id : '',
      to: defender.id,
      eventType: 'damage',
      label: damage.toFixed(1),
      customColor: isMagic ? 'blue' : customColor,
      customIcon: isMagic ? 'magic' : customIcon
    });
  }

  return damage;
}
