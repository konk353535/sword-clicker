import _ from 'underscore';
import { BUFFS } from '/server/constants/buffs/index';

export const removeBuff = function removeBuff({ target, buff, caster, actualBattle }) {
  const buffConstants = BUFFS[buff.id];
  let hasRemoved = false;

  if (!_.isArray(target.buffs)) {
    target.buffs = [];
  }

  // Quick sort of buffs to ascending by duration
  target.buffs = _.sortBy(target.buffs, 'data.duration');

  target.buffs = target.buffs.filter((ownerBuff) => {
    if (ownerBuff.id === buff.id && !hasRemoved) {
      buffConstants.events.onRemove({ buff, target, caster, actualBattle });
      hasRemoved = true;
      return false;
    }
    return true;
  });
};

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
};

export const finishAllBattles = function() {
  import { BattlesList } from "/imports/api/battles/battles";
  const redis = new Meteor.RedisCollection('redis');
  BattlesList.find({}).fetch().forEach((battleList) => {
    BattlesList.remove(battleList._id);
    redis.del(`battles-${battleList._id}`);
    redis.del(`battleActions-${battleList._id}`);
  });
};