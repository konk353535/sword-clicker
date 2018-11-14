import { BATTLES } from '../../constants/battles/index.js'; // List of available combat stats
import { BUFFS } from '../../../imports/constants/buffs/index.js';

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
    // true damage penetrates armor and all abilities that allow damage reduction (or fake-dodging like evasive manuevers)
    if (!isTrueDamage) {
      let dmgReduction = isMagic ? defender.stats.magicDamageReduction : defender.stats.damageReduction;
      
      damage = (rawDamage * (1 - dmgReduction)) * defender.stats.damageTaken;
    }

    defender.stats.health -= damage;

    this.checkDeath(defender);
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
