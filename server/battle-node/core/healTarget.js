import _ from 'underscore';

import { BUFFS } from '../../../imports/constants/buffs/index.js';

export default function(healAmount, {
  target,
  caster,
  tickEvents,
  customColor,
  customIcon,
  historyStats,
  healSource
}) {
  if ((!caster) || (!caster.stats)) {
    return; // error
  }
  
  if ((!target) || (!target.stats)) {
    return; // error
  }
  
  if (caster.stats && caster.stats.healingPower && _.isFinite(caster.stats.healingPower)) {
    healAmount *= (1 + (caster.stats.healingPower / 100));
  }

  if (target.stats.healingReduction && target.stats.healingReduction != null) {
    healAmount *= target.stats.healingReduction;
  }

  // Tick didHealing event on caster
  if (caster.buffs) {
    caster.buffs.forEach((buff) => {
      buff.constants = BUFFS[buff.id];
      if (buff.constants.events.onDidHealing) {
        // Did Healing
        try {
          buff.constants.events.onDidHealing({ buff, target, caster, actualBattle: this, healAmount, healSource })
        } catch (err) {
          console.log(err);
        }
      }
    });
  }
  
  // Tick tookHealing event on target
  if (target.buffs) {
    target.buffs.forEach((buff) => {
      buff.constants = BUFFS[buff.id];
      if (buff.constants.events.onTookHealing) {
        // Took Healing
        try {
          buff.constants.events.onTookHealing({ buff, target, caster, actualBattle: this, healAmount, healSource })
        } catch (err) {
          console.log(err);
        }
      }
    });
  }
  
  target.stats.health += healAmount;
  if (target.stats.health > target.stats.healthMax) {
    target.stats.health = target.stats.healthMax;
  }

  let caster__id_to_use = caster.id;
    if (caster.isCompanion) {
    try {
      if (caster.owner.endsWith("_companion")) {
        caster__id_to_use = caster.owner.substring(0, caster.owner.length - 10);
      }
    } catch (err) {
    }
  }
 
  if (historyStats && historyStats[caster__id_to_use]) {
    if (!caster.isCompanion) {
      historyStats[caster__id_to_use].healingDone += healAmount;
    } else {
      historyStats[caster__id_to_use].companionName = caster.name;
      historyStats[caster__id_to_use].healingDoneCompanion += healAmount;
    }    
  }

  if (tickEvents) {
    tickEvents.push({
      from: caster ? caster.id : '',
      to: target ? target.id : '',
      eventType: 'heal',
      label: (healAmount).toFixed(1),
      customColor: customColor || '#f5528b',
      customIcon: customIcon || 'health'
    });
  }
}
