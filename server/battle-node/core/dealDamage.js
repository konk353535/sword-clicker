import { BATTLES } from '../../constants/battles/index.js'; // List of available combat stats
import { BUFFS } from '../../../imports/constants/buffs/index.js';

if (!String.prototype.endsWith) {
  String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
  };
}

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
  if (damage && damage > 0) {
    // true damage penetrates armor and all abilities that allow damage reduction (or fake-dodging like evasive manuevers)
    if (!isTrueDamage) {
      let dmgReduction = isMagic ? ((defender.stats.magicDamageReduction) ? defender.stats.magicDamageReduction : 0) : ((defender.stats.damageReduction) ? defender.stats.damageReduction : 0);
      
      damage = (rawDamage * (1 - dmgReduction)) * ((defender.stats.damageTaken) ? defender.stats.damageTaken : 1.0);
    }

    // damage weakening effects
    if (attacker && attacker.stats && attacker.stats.damageOutput) {
      damage *= attacker.stats.damageOutput;
    }
    
    defender.stats.health -= damage;

    this.checkDeath(defender);
  }

  let attacker__id_to_use = attacker.id;
    if (attacker.isCompanion) {
    try {
      if (attacker.owner.endsWith("_companion")) {
        attacker__id_to_use = attacker.owner.substring(0, attacker.owner.length - 10);
      }
    } catch (err) {
    }
  }
  
  let defender__id_to_use = defender.id;
    if (defender.isCompanion) {
    try {
      if (defender.owner.endsWith("_companion")) {
        defender__id_to_use = defender.owner.substring(0, defender.owner.length - 10);
      }
    } catch (err) {
    }
  }
  
  if (historyStats && historyStats[attacker__id_to_use]) {
    if (!attacker.isCompanion) {
      historyStats[attacker__id_to_use].damageDone += damage;
    } else {
      historyStats[attacker__id_to_use].companionName = attacker.name;
      historyStats[attacker__id_to_use].damageDoneCompanion += damage;
    }    
  }

  if (historyStats && historyStats[defender__id_to_use]) {
    if (!defender.isCompanion) {
      historyStats[defender__id_to_use].damageTaken += damage;
    } else {
      historyStats[defender__id_to_use].companionName = defender.name;
      historyStats[defender__id_to_use].damageTakenCompanion += damage;
    }
  }
  
  if(tickEvents) {
    tickEvents.push({
      from: attacker ? attacker.id : '',
      to: defender ? defender.id : '',
      eventType: 'damage',
      label: damage.toFixed(1),
      customColor: isMagic ? 'blue' : customColor,
      customIcon: isMagic ? 'magic' : customIcon
    });
  }

  return damage;
}
