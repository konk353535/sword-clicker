import { State } from '/imports/api/state/state';

import { GLOBALBUFFS } from '/imports/constants/globalbuffs';

import { IsValid, CInt } from '/imports/utils.js';
import { serverFromUser } from '/imports/api/users/users';

// translate old buff IDs to new buff IDs
export const translateGlobalBuffId = function translateGlobalBuffId(buffType) {
  if (!IsValid(buffType)) {
    return buffType;
  }  
  if (!IsValid(GLOBALBUFFS[buffType])) {
    return buffType;
  }  
  return ((IsValid(GLOBALBUFFS[buffType].dataBuffId)) ? GLOBALBUFFS[buffType].dataBuffId : buffType);
};

// get an array of all active global buffs relative to the current user's server (assuming there is one)
export const getGlobalBuffs = function getGlobalBuffs() {
  const gbCursor = State.find({'value.activeTo': {$gte: moment().toDate()}});
  if (gbCursor) {
    let buffs = gbCursor.fetch();
    
    buffs = buffs.filter((buff) => {
      if (IsValid(GLOBALBUFFS[buff.name]) && GLOBALBUFFS[buff.name].isServerBuff) {
        if (buff.server != serverFromUser()) {
          return false;
        }
      }
      
      return true;
    });
    
    return buffs;
  }
  return [];
};

// look up an existing global buff by name (type ID) only if it's active
export const getActiveGlobalBuff = function getActiveGlobalBuff(buffType, serverId) {
  const realBuffId = translateGlobalBuffId(buffType);
  if (!IsValid(realBuffId)) {
    return false;
  }

  serverId = (IsValid(serverId)) ? serverId : serverFromUser();
  const buffState = (serverId) ? State.findOne({name: realBuffId, server: serverId, 'value.activeTo': { $gte: moment().toDate() }}) : State.findOne({name: realBuffId, 'value.activeTo': { $gte: moment().toDate() }});
  
  if (!IsValid(buffState)) {
    return false;
  }
  
  if (IsValid(GLOBALBUFFS[realBuffId]) && GLOBALBUFFS[realBuffId].isServerBuff) {
    if (buffState.server != serverId) {
      return false;
    }
  }
  
  return buffState;
};

// look up an existing global buff by name (type ID), whether it's active or not
export const getGlobalBuff = function getGlobalBuff(buffType, serverId) {
  const realBuffId = translateGlobalBuffId(buffType);
  if (!IsValid(realBuffId)) {
    return false;
  }

  serverId = (IsValid(serverId)) ? serverId : serverFromUser();
  const buffState = (serverId) ? State.findOne({name: realBuffId, server: serverId}) : State.findOne({name: realBuffId});
  
  if (!IsValid(buffState)) {
    return false;
  }
  
  if (IsValid(GLOBALBUFFS[realBuffId]) && GLOBALBUFFS[realBuffId].isServerBuff) {
    if (buffState.server != serverId) {
      return false;
    }
  }
  
  return buffState;
};

// add or insert a global buff as necessary, extending or setting time as necessary
export const activateGlobalBuff = function activateGlobalBuff({buffType, server = undefined, timeAmt = 1, time = 'hour', level = -1}) {
  const realBuffId = translateGlobalBuffId(buffType);
  if (!IsValid(realBuffId)) {
    return false;
  }
  
  const curBuff = getGlobalBuff(realBuffId);
  
  if (IsValid(curBuff)) {
    // update existing buff

    if (moment().isAfter(curBuff.value.activeTo)) {
      // if the buff is expired (current time is after buff's activeTo time)
      
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
    
    curBuff.value.level = level;
    
    // update existing doc in mongo
    State.update({
      name: realBuffId
    }, {
      $set: {
        server,
        value: curBuff.value
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
    name: realBuffId,
    server,
    value: {
      activeTo: moment().add(timeAmt, time).toDate(),
      level
    }
  });
  
  return true;
};

// locate a buff and return its level, 0 if the buff is not active or has no level
export const getBuffLevel = function getBuffLevel(buffId, serverId) {
  serverId = (IsValid(serverId)) ? serverId : serverFromUser();
  
  const buffByName = getActiveGlobalBuff(buffId, serverId);  
  
  if (IsValid(buffByName) && IsValid(buffByName.value)) {
    return CInt(buffByName.value.level);
  }
  
  return 0;
};
