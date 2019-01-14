import { ABILITIES } from '../../constants/combat/index.js';
import { BUFFS } from '../../../imports/constants/buffs/index.js';

import _ from 'underscore';

export default function({ ability, caster, targets }) {

  let canUseAbilityOrSpell = true;
  
  if (canUseAbilityOrSpell) {
    if (caster.stats.health <= 0) {
      if (!ability.allowedWhileDead) {
        canUseAbilityOrSpell = false;
      }
    }
  }
  
  // Does user have appropriate gear to cast this ability?
  if (canUseAbilityOrSpell && ability.requires) {
    ability.requires.forEach((required) => {
      let meetsRequirement = false;
      if (required.type === 'weaponType') {
        required.weaponTypes.forEach((weaponType) => {
          if (caster.mainHandType === weaponType || caster.offHandType === weaponType) {
            meetsRequirement = true;
          }
        })
      }

      if (!meetsRequirement) {
        canUseAbilityOrSpell = false;
      }
    });
  }

  // Is the user silenced (can't use any abilities or spells)
  if (caster.silenced) {
    canUseAbilityOrSpell = false;
  }

  // Cancel the ability use attempt if they're not elligible to use the ability right now (no CD, no effect) 
  if (!canUseAbilityOrSpell) {
    return false;
  }

  // Modify and assign targets as necessary
  if (ability.target === 'currentEnemy') {
    // Is current target alive
    let currentEnemy = this.allUnitsMap[caster.target];
    if (!currentEnemy || !currentEnemy.stats || !currentEnemy.stats.health || (currentEnemy.stats.health <= 0)) {
      if (this.enemies.length > 0) {
        currentEnemy = this.enemies[0];
      }
    }
    if (!currentEnemy || !currentEnemy.stats || !currentEnemy.stats.health || (currentEnemy.stats.health <= 0)) {
      return false; // can't cast on a target enemy without a valid target enemy unit (returning false will prevent cooldown, resource expenditure, etc.)
    }
    targets = [currentEnemy];
  } else if (ability.target === 'allEnemies') {
    targets = this.enemies;
  } else if (ability.target === 'allAllies') {
    targets = this.units;
  } else if (ability.target === 'self') {
    targets = [caster];
  } else if (ability.target === 'singleEnemy') {
    const singleTarget = targets[0];
    if (singleTarget && this.enemiesMap[singleTarget.id]) {
      targets = [singleTarget]
    } else {
      targets = [];
    }
  } else if (ability.target === 'singleFriendly') {
    const singleTarget = targets[0];
    if (singleTarget && this.unitsMap[singleTarget.id]) {
      targets = [singleTarget]
    } else {
      targets = [];
    }
  }
  
  // Sanity checking on targets
  if ((ability.target === 'currentEnemy') || (ability.target === 'singleEnemy')) {
    if (!targets || (targets.length === 0)) {
      return false; // can't cast on a target enemy without a valid target enemy unit (returning false will prevent cooldown, resource expenditure, etc.)
    }
    
    if (!targets[0].stats || !targets[0].stats.health || (targets[0].stats.health <= 0)) {
      return false; // can't cast on a target enemy without a valid target enemy unit (returning false will prevent cooldown, resource expenditure, etc.)    
    }
  }
  
  // hack -- should bridge a way to add this to the buff proper
  if ((ability.id === 'scream') && (targets.length > 0)) {
    let needToTarget = 0;
    targets.forEach((targ) => {
      if (targ.target !== caster.id) {
        needToTarget++;
      }
    });
    ability.cdAdjust = function(abil) {
      return ((needToTarget + 1) * 10) - 5;
    };
  }

  // Apply ability buffs to targets
  targets.forEach((target) => {
    const newBuffs = ability.buffs.map((buffId) => {
      const buffObj = {};
      // Store constants
      buffObj.constants = BUFFS[buffId];

      if (!buffObj.constants.data) {
        buffObj.constants.data =  {
          duration: Infinity,
          totalDuration: Infinity
        };
      }

      buffObj.duration = buffObj.constants.data.duration;

      // Save things we actually want to store in the data property
      buffObj.data = Object.assign({
        description: buffObj.constants.description({ buff: buffObj.constants, level: ability.level }),
        name: buffObj.constants.name,
        icon: buffObj.constants.icon,
        duplicateTag: buffObj.constants.duplicateTag,
        level: ability.level
      }, buffObj.constants.data);

      buffObj.id = buffId;


      return buffObj;
    });

    // Buffs can do things when applied, will collect them in the form of combatEvents
    newBuffs.forEach((buff) => {
      if (buff.constants.events.onApply) {
        // Remove existing buffs that match
        if (target.buffs && target.buffs.length > 0) {
          let existingBuff = _.findWhere(target.buffs, { id: buff.id });
          if (existingBuff && !existingBuff.allowDuplicates && !buff.data.allowDuplicates) {
            existingBuff.duration = -1;
            buff.constants.events.onTick({ secondsElapsed: 0, buff: existingBuff, target, actualBattle: this });
          }
        }

        if (!buff.data.didApply) {
          buff.constants.events.onApply({ buff, target, caster, actualBattle: this });
          buff.data.didApply = true;
        }
      }
    });

    // Add buffs to target ( Need to unique this ?)
    target.addBuffs(newBuffs);
  });

  return true;
}
