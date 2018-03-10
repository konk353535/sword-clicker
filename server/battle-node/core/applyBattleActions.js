import { ABILITIES } from '../../constants/combat/index.js';
import _ from 'underscore';

export default function applyBattleActions() {
  this.battleActions.forEach((action) => {
    const casterId = action.caster;
    const casterUnit = this.allUnitsMap[casterId];
    const abilityId = action.abilityId;

    if (!casterUnit || casterUnit.battleSecret !== action.battleSecret) {
      return;
    }

    if (abilityId === 'changeTarget') {
      // Modify casters preferred target
      casterUnit.target = action.targets[0];
    } else if (abilityId === 'clickAttack') {
      const targetId = action.targets[0];
      const targetUnit = this.enemiesMap[targetId];

      // Ensure caster unit has sufficient energy
      if (targetUnit && casterUnit && casterUnit.amulet && casterUnit.amulet.energy >= 1) {
        casterUnit.amulet.energy -= 1;
        this.deltaEvents.push({
          type: 'abs',
          path: `unitsMap.${casterUnit.id}.amulet.energy`,
          value: casterUnit.amulet.energy
        });
        this.dealDamage(casterUnit.amulet.damage, {
          attacker: casterUnit,
          defender: targetUnit,
          actualBattle: this,
          tickEvents: this.tickEvents,
          historyStats: this.historyStats
        });
      }
    } else {
      if (!casterUnit.abilitiesMap || !casterUnit.abilitiesMap[abilityId]) {
        return;
      }

      const targetAbility = casterUnit.abilitiesMap[abilityId];

      this.allAliveUnits.forEach((unit) => {
      });
      Object.keys(this.allUnitsMap).forEach((key) => {
      });

      const actionTargets = action.targets.map((rawTarget) => {
        return this.allUnitsMap[rawTarget];
      });


      const refundCast = targetAbility.cast(actionTargets);

      if (!refundCast) {
        targetAbility.casts -= 1;
        targetAbility.totalCasts += 1;
        targetAbility.currentCooldown = targetAbility.cooldown;
      }
    }
  });
}
