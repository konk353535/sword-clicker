import _ from 'underscore';

import { BUFFS } from './constants/buffs/index';

// why is this a duplicate of /server/battleUtils.js ?

export const removeBuff = function removeBuff({ target, buff, caster, actualBattle }) {
  if (target && buff && buff.id) {
    if (target.removeBuff) {
      actualBattle = actualBattle || target.battleRef;
      
      const buffConstants = BUFFS[buff.id];
      // Quick sort of buffs to ascending by duration
      // target.buffs = _.sortBy(target.buffs, 'duration');
      if (buffConstants.events.onRemove) {
        buffConstants.events.onRemove({ buff, target, caster, actualBattle });
      }
      target.removeBuff(buff);
    }
  }
};

export const addBuff = function addBuff({ buff, target, caster, actualBattle }) {
  if (!target || !target.addBuff || !buff || !buff.data) {
    return;
  }
  //console.log(`applying ${BUFFS[buff.id].name} from ${caster.name} to ${target.name}`);

  actualBattle = actualBattle || target.battleRef;
  
  let existingBuff;
  if (!buff.data.allowDuplicates) {
    // Make sure there is no existing buff like this
    // Check if buff already exists
    while (true) {
      existingBuff = target.buffs.find((b) => b.id === buff.id)
      if (existingBuff) {
        removeBuff({ target, buff: existingBuff, caster, actualBattle });
      } else {
        break;
      }
    }
  } else if (buff.data.duplicateCap && buff.data.duplicateCap > 0) {
    // Some buffs can only be applied X number of times
    // Check if buff already exists X number of times (or more, somehow)
    let iCountHowMany = 0;
    target.buffs.forEach((b) => {
      if (b.id === buff.id) {
        iCountHowMany++
      }
    });    
    if (iCountHowMany >= buff.data.duplicateCap) {
      while (iCountHowMany >= buff.data.duplicateCap) {
        iCountHowMany--;
        existingBuff = target.buffs.find((b) => b.id === buff.id)
        if (existingBuff) {
          removeBuff({ target, buff: existingBuff, caster, actualBattle });
        }
      }
    }
  }

  const newBuff = target.addBuff(buff);

  newBuff.data.casterUnit = caster.id;
  
  if (newBuff.onApply && !newBuff.data.didApply) {
    newBuff.onApply({ buff: newBuff, target, caster, actualBattle });
    newBuff.data.didApply = true;
  }
  
  return newBuff;
};

export const removeBuffById = function removeBuffById({target, caster, buffId, actualBattle}) {
  try {
    actualBattle = actualBattle || target.battleRef;
    
    let buffToRemove = target.findBuff(buffId);
    if (buffToRemove) {
      removeBuff({ buff: buffToRemove, target, caster, actualBattle });
      return true;
    }
  } catch (err) {
  }
  return false;
};

export const removeBuffWithMessage = function removeBuffWithMessage({target, caster, buff, buffId, actualBattle, messageOptions}) {
  try {
    actualBattle = actualBattle || target.battleRef;
    
    if (buff) {
      removeBuff({target, buff, caster, actualBattle});
      if (messageOptions) {
        target.tickMessage(messageOptions.label, messageOptions.color);
      }
      return true;
    } else if (removeBuffById({target, caster, buffId, actualBattle})) {
      if (messageOptions) {
        target.tickMessage(messageOptions.label, messageOptions.color);
      }
      return true;
    }
  } catch (err) {
  }
  return false;
};
