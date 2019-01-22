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

    // todo: update user activity here, if possible from battle node
    
    if (abilityId === 'changeTarget') {
      const targetId = action.targets[0];
      if (this.enemiesMap[targetId]) {
        // Modify casters preferred target
        casterUnit.target = action.targets[0];
        
        // if this unit is actively targeting another unit, then they're clearly not inactive
        casterUnit.inactiveMinutes = 0;
      }
    } else if (abilityId === 'forfeit') {
      this.forfitters[casterId] = true;
      if (Object.keys(this.forfitters).length >= (Object.keys(this.owners).length / 2)) {
        this.totalXpGain = 0;
        this.units.forEach((unit) => {
          // Remove all buffs to avoid on death mechanics triggering
          unit.buffs = [];
          // Set health to -1
          unit.stats.health = -1;
          // Ensure the unit is picked up as dead
          this.checkDeath(unit);
        });
        this.end();
      }
    } else if (abilityId === 'clickAttack') {
      // sorry, but dead players can't use their amulets
      if (!casterUnit.stats.health || casterUnit.stats.health <= 0)
        return;
      
      const targetId = action.targets[0];
      if (!this.enemiesMap[targetId]) {
        return;
      }

      if (targetId !== casterUnit.target) {
        casterUnit.target = targetId;
      } else {
        const targetUnit = this.enemiesMap[targetId];

        // Ensure caster unit has sufficient energy
        if (targetUnit && casterUnit && casterUnit.amulet && casterUnit.amulet.energy >= 1) {
          // if this unit is actively using their amulet click charges versus another unit, then they're clearly not inactive
          casterUnit.inactiveMinutes = 0;
          
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
      }).filter((targetUnit) => {
        return !!targetUnit;
      })

      const castSuccess = targetAbility.cast(actionTargets);
      if (castSuccess) {
        targetAbility.casts -= 1;
        targetAbility.totalCasts += 1;
        if (targetAbility.constants && targetAbility.constants.scaledCooldown) {
          targetAbility.currentCooldown = targetAbility.constants.scaledCooldown(targetAbility);
        } else {
          targetAbility.currentCooldown = targetAbility.cooldown;
        }
        
        if (targetAbility.cdAdjust) {
          if (_.isFunction(targetAbility.cdAdjust)) {
            targetAbility.currentCooldown = targetAbility.cdAdjust(targetAbility);
          } else {
            targetAbility.currentCooldown += targetAbility.cdAdjust;
          }
          targetAbility.cdAdjust = undefined;
        }
      }
    }
  });
}
