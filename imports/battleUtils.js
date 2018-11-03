import _ from 'underscore';
import { BUFFS } from './constants/buffs/index';

export const removeBuff = function removeBuff({ target, buff, caster, actualBattle }) {
  const buffConstants = BUFFS[buff.id];
  // Quick sort of buffs to ascending by duration
  // target.buffs = _.sortBy(target.buffs, 'duration');
  if (buffConstants.events.onRemove) {
    buffConstants.events.onRemove({ buff, target, caster, actualBattle });
  }
  target.removeBuff(buff);
}

export const addBuff = function addBuff({ buff, target, caster, actualBattle }) {
  let existingBuff;
  if (!buff.data.allowDuplicates) {
    // Make sure there is no existing buff like this
    // Check if buff already exists
    existingBuff = target.buffs.find((b) => b.id === buff.id)
    if (existingBuff) {
      removeBuff({ target, buff: existingBuff, caster });
    }
  } else if (buff.data.duplicateCap && buff.data.duplicateCap > 0) {
    // Some buffs can only be applied X number of times
    // Check if buff already exists
    let iCountHowMany = 0;
    target.buffs.forEach((b) => {
      if (b.id === buff.id) {
        iCountHowMany++
      }
    });    
    if (iCountHowMany > buff.data.duplicateCap) {
      while (iCountHowMany > buff.data.duplicateCap) {
        iCountHowMany--;
        existingBuff = target.buffs.find((b) => b.id === buff.id)
        if (existingBuff) {
          removeBuff({ target, buff: existingBuff, caster });
        }
      }
    }
  }

  const newBuff = target.addBuff(buff);
  newBuff.onApply({ buff: newBuff, target, caster, actualBattle });
}
