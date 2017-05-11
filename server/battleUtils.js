import _ from 'underscore';
import { BUFFS } from '/server/constants/combat/index.js';

export const removeBuff = function removeBuff({ target, buff, caster }) {
  const buffConstants = BUFFS[buff.id];

  target.buffs = target.buffs.filter((ownerBuff) => {
    if (ownerBuff.id === buff.id) {
      buffConstants.events.onRemove({ buff, target, caster });
      return false;
    }
    return true;
  });
}

export const addBuff = function addBuff({ buff, target, caster }) {
  // Make sure there is no existing buff like this
  removeBuff({ target, buff, caster });

  const buffConstants = BUFFS[buff.id];
  buffConstants.events.onApply({ buff, target, caster });
  target.buffs.push(buff);
}
