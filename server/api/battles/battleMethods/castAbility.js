import { ABILITIES, BUFFS } from '/server/constants/combat/index.js';

import _ from 'underscore';

export const castAbility = function({ ability, caster, targets, actualBattle }) {

  // Does user have appropriate gear to cast this ability?
  let canCast = true;
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

  if (!canCast) {
    return false;
  }

  if (ability.target === 'currentEnemy') {
    // Is current target alive
    const currentEnemy = _.findWhere(actualBattle.allAliveUnits, { id: caster.target });
    if (currentEnemy) {
      targets = [currentEnemy];
    } else {
      const firstEnemy = actualBattle.enemies[0];
      if (firstEnemy) {
        targets = [firstEnemy];
      }
    }
  } else if (ability.target === 'allEnemies') {
    targets = actualBattle.enemies;
  } else if (ability.target === 'allAllies') {
    targets = actualBattle.units;
  } else if (ability.target === 'self') {
    targets = [caster];
  } else if (ability.target === 'singleEnemy') {
    // Make sure specified target is an enemy
    if (targets[0] && targets.length === 1) {
      if (!_.findWhere(actualBattle.enemies, { id: targets[0].id })) {
        targets = [];
      }
    } else {
      targets = [];
    }
  } else if (ability.target === 'singleFriendly') {
    // Make sure specified target is an ally
    if (targets[0] && targets.length === 1) {
      if (!_.findWhere(actualBattle.units, { id: targets[0].id })) {
        targets = [];
      }
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
        buff.constants.events.onApply({ buff, target, caster, actualBattle });

        // Remove existing buffs that match
        if (target.buffs && target.buffs.length > 0) {
          let existingBuff = _.findWhere(target.buffs, { id: buff.id });
          if (existingBuff) {
            existingBuff.data.duration = -1;
            buff.constants.events.onTick({ secondsElapsed: 0, buff: existingBuff, target, actualBattle });
          }
        }
      }
    });

    // Add buffs to target ( Need to unique this ? )
    if (target.buffs) {
      target.buffs.push(...newBuffs);
    } else {
      target.buffs = newBuffs;
    }

    return true;
  });
}
