import _ from 'underscore';
import { BUFFS } from '/server/constants/combat/index.js';

export const removeBuff = function removeBuff({ target, buff, caster, actualBattle }) {
  const buffConstants = BUFFS[buff.id];
  let hasRemoved = false;

  if (!_.isArray(target.buffs)) {
    target.buffs = [];
  }

  target.buffs = target.buffs.filter((ownerBuff) => {
    if (ownerBuff.id === buff.id && !hasRemoved) {
      buffConstants.events.onRemove({ buff, target, caster, actualBattle });
      hasRemoved = true;
      return false;
    }
    return true;
  });
}

export const addBuff = function addBuff({ buff, target, caster, actualBattle }) {
  if (!buff.data.allowDuplicates) {
    // Make sure there is no existing buff like this
    removeBuff({ target, buff, caster });
  }

  const buffConstants = BUFFS[buff.id];
  buff.constants = buffConstants;
  buffConstants.events.onApply({ buff, target, caster, actualBattle });
  if (!target.buffs) {
    target.buffs = [buff];
  } else {
    target.buffs.push(buff);
  }
}
