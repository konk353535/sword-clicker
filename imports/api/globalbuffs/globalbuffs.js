import _ from 'underscore';

import { State } from '/imports/api/state/state';

import { GLOBALBUFFS } from '/imports/constants/globalbuffs';

export const translateGlobalBuffId = function translateGlobalBuffId(buffType) {
  let realBuffId = buffType;
  if (!realBuffId) {
    return false;
  }
  
  const globalBuffConstants = GLOBALBUFFS[realBuffId];
  if (!globalBuffConstants) {
    return false;
  }
  
  return (globalBuffConstants.dataBuffId) ? globalBuffConstants.dataBuffId : buffType;
};

export const getGlobalBuffs = function getGlobalBuffs(buffType) {
  const gbCursor = State.find({'value.activeTo': {$gte: moment().toDate()}});
  if (gbCursor) {
    return gbCursor.fetch();
  }
  return [];
};

export const getActiveGlobalBuff = function getActiveGlobalBuff(buffType) {
  buffType = translateGlobalBuffId(buffType);
  if (!buffType) {
    return false;
  }

  const buffState = State.findOne({name: buffType, 'value.activeTo': { $gte: moment().toDate() }});
  const hasBuff = !_.isUndefined(buffState);
  
  if (!hasBuff) {
    return false;
  }
  
  return buffState;
};

export const getGlobalBuff = function getGlobalBuff(buffType) {
  buffType = translateGlobalBuffId(buffType);
  if (!buffType) {
    return false;
  }

  const buffState = State.findOne({name: buffType});
  const hasBuff = !_.isUndefined(buffState);
  
  if (!hasBuff) {
    return false;
  }
  
  return buffState;
};

export const activateGlobalBuff = function activateGlobalBuff({buffType, timeAmt = 1, time = 'hour', level = -1}) {
  buffType = translateGlobalBuffId(buffType);
  if (!buffType) {
    return false;
  }
  
  const curBuff = getGlobalBuff(buffType);
  
  if (curBuff) {
    // update existing buff

    if (moment().isAfter(curBuff.value.activeTo)) {
      // if the buff is expired
      
      curBuff.value.activeTo = moment().add(timeAmt, time).toDate();
    } else {
      // if the buff isn't over yet...
      
      curBuff.value.activeTo = moment(curBuff.value.activeTo).add(timeAmt, time).toDate();
    }

    // if no level is specified, default it to the current buff level (or to 1 if none exists)
    if (level === -1) {
      if (curBuff.value.level) {
        level = curBuff.value.level;
      } else {
        level = 1;
      }
    }
    
    // update existing doc in mongo
    State.update({
      name: buffType
    }, {
      $set: {
        value: curBuff.value,
        level
      }
    });
    return true;
  } 
  
  // create new buff

  // if no level is specified, default it to 1
  if (level === -1) {
    level = 1;
  }
  
  // insert new doc into mongo
  State.insert({
    name: buffType,
    value: {
      activeTo: moment().add(timeAmt, time).toDate(),
      level
    }
  });
  
  return true;
};
