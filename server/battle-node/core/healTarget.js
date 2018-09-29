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

  if (caster && historyStats && historyStats[caster.id]) {
    historyStats[caster.id].healingDone += healAmount;
  }

  if(tickEvents) {
    tickEvents.push({
      from: caster ? caster.id : '',
      to: target.id,
      eventType: 'heal',
      label: (healAmount).toFixed(1),
      customColor: '#f5528b',
      customIcon: 'health'
    });
  }
}
