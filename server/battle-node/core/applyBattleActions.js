import { ABILITIES } from '../../constants/combat/index.js';
import _ from 'underscore';

export default function applyBattleActions() {
  this.battleActions.forEach((action) => {
    const casterId = action.caster;
    const casterUnit = this.allUnitsMap[casterId];

    if (!casterUnit || casterUnit.battleSecret !== action.battleSecret) {
      return;
    }

    if (action.abilityId === 'changeTarget') {
      // Modify casters preferred target
      casterUnit.target = action.targets[0];
    } else if (action.abilityId === 'clickAttack') {
      const targetId = action.targets[0];
      const targetUnit = this.enemiesMap[targetId];

      // Ensure caster unit has sufficient energy
      if (targetUnit && casterUnit && casterUnit.amulet && casterUnit.amulet.energy >= 1) {
        casterUnit.amulet.energy -= 1;
        dealDamage(casterUnit.amulet.damage, {
          attacker: casterUnit,
          defender: targetUnit,
          actualBattle: this,
          tickEvents: this.tickEvents,
          historyStats: this.historyStats
        });
      }
    } else {
      if (!casterUnit.abilities) {
        return;
      }

      // Check if the ability exists
      let unitAbility = casterUnit.abilities.find((ability) => {
        return ability.id === action.abilityId;
      });

      if (!unitAbility || unitAbility.currentCooldown > 0) {
        return;
      }

      if (unitAbility.isSpell && unitAbility.casts <= 0) {
        return;
      }

      // Cast it! and put it on cooldown
      const abilityToCast = Object.assign({}, ABILITIES[action.abilityId]);

      if (abilityToCast.isPassive) {
        return;
      }

      const unitsAndEnemies = this.units.concat(this.enemies);
      const actionTargets = unitsAndEnemies.filter((unit) => {
        return _.contains(action.targets, unit.id);
      });
      abilityToCast.level = unitAbility.level;

      // Fetch who we are are targetting with this ability
      const refundCast = this.castAbility({
        ability: abilityToCast,
        caster: casterUnit,
        targets: actionTargets,
        actualBattle: this
      });

      if (!refundCast) {
        unitAbility.casts -= 1;
        unitAbility.totalCasts += 1;
        unitAbility.currentCooldown = abilityToCast.cooldown;
      }
    }
  });
}
