import _ from 'underscore';
import { BUFFS } from './constants/buffs/index';

export const removeBuff = function removeBuff({ target, buff, caster, actualBattle }) {
  const buffConstants = BUFFS[buff.id];

  // Quick sort of buffs to ascending by duration
  // target.buffs = _.sortBy(target.buffs, 'data.duration');
  if (buffConstants.events.onRemove) {
    buffConstants.events.onRemove({ buff, target, caster, actualBattle });
  }
  target.removeBuff(buff);
}

export const addBuff = function addBuff({ buff, target, caster, actualBattle }) {
  if (!buff.data.allowDuplicates) {
    // Make sure there is no existing buff like this
    removeBuff({ target, buff, caster });
  }

  const buffConstants = BUFFS[buff.id];
  buff.constants = buffConstants;
  if (buffConstants.events.onApply) {
    buffConstants.events.onApply({ buff, target, caster, actualBattle });
  }
  target.addBuff(buff);
}

export const finishAllBattles = function() {
  const { BattlesList } = require('../imports/api/battles/battles')
  const redis = new Meteor.RedisCollection('redis');
  BattlesList.find({}).fetch().forEach((battleList) => {
    BattlesList.remove(battleList._id);
    redis.del(`battles-${battleList._id}`);
    redis.del(`battleActions-${battleList._id}`);
  });
};
