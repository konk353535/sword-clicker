import _ from 'underscore';
import { BUFFS } from '/server/constants/combat/index.js';

export const removeBuff = function removeBuff({ target, buff, caster, actualBattle }) {
  const buffConstants = BUFFS[buff.id];

  target.buffs = target.buffs.filter((ownerBuff) => {
    if (ownerBuff.id === buff.id) {
      buffConstants.events.onRemove({ buff, target, caster, actualBattle });
      return false;
    }
    return true;
  });
}

export const addBuff = function addBuff({ buff, target, caster, actualBattle }) {
  // Make sure there is no existing buff like this
  removeBuff({ target, buff, caster });

  const buffConstants = BUFFS[buff.id];
  buffConstants.events.onApply({ buff, target, caster, actualBattle });
  target.buffs.push(buff);
}
