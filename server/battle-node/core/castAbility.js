import { ABILITIES } from '../../constants/combat/index.js';
import { BUFFS } from '../../constants/buffs/index.js';

import _ from 'underscore';

export default function({ ability, caster, targets }) {
  // Does user have appropriate gear to cast this ability?
  let canCast = true;
  if (ability.requires) {
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
        canCast = false;
      }
    });
  }

  if (!canCast) {
    return false;
  }

  if (ability.target === 'currentEnemy') {
    // Is current target alive
    const currentEnemy = this.allUnitsMap[caster.target];
    targets = currentEnemy ? [currentEnemy] : [this.enemies[0]];
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

  // Apply ability buffs to targets
  targets.forEach((target) => {
    const newBuffs = ability.buffs.map((buffId) => {
      const buffObj = {};
      // Store constants
      buffObj.constants = BUFFS[buffId];

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
          if (existingBuff) {
            existingBuff.data.duration = -1;
            buff.constants.events.onTick({ secondsElapsed: 0, buff: existingBuff, target, actualBattle: this });
          }
        }

        buff.constants.events.onApply({ buff, target, caster, actualBattle: this });
      }
    });


    // Add buffs to target ( Need to unique this ?)
    target.addBuffs(newBuffs);
  });

  return true;
}
