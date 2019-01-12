import _ from 'underscore';

export default function(healAmount, {
  target,
  caster,
  tickEvents,
  customColor,
  customIcon,
  historyStats
}) {
  if (caster && caster.stats && caster.stats.healingPower && _.isFinite(caster.stats.healingPower)) {
    healAmount *= (1 + (caster.stats.healingPower / 100));
  }

  if (target.stats.healingReduction != null) {
    healAmount *= target.stats.healingReduction;
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
 
  if (caster && historyStats && historyStats[caster__id_to_use]) {
    if (!caster.isCompanion) {
      historyStats[caster__id_to_use].healingDone += healAmount;
    } else {
      historyStats[caster__id_to_use].companionName = caster.name;
      historyStats[caster__id_to_use].healingDoneCompanion += healAmount;
    }    
  }

  if(tickEvents) {
    tickEvents.push({
      from: caster ? caster.id : '',
      to: target ? target.id : '',
      eventType: 'heal',
      label: (healAmount).toFixed(1),
      customColor: '#f5528b',
      customIcon: 'health'
    });
  }
}
