import _ from 'underscore';
import { BATTLES } from '/server/constants/battles/index.js'; // List of encounters

export const flattenObjectForMongo = function(ob) {
  var toReturn = {};
  
  for (var i in ob) {
    if (!ob.hasOwnProperty(i)) continue;
    
    if ((typeof ob[i]) == 'object') {
      if (_.isDate(ob[i]) || _.isArray(ob[i])) {
        toReturn[i] = ob[i];
      } else {
        var flatObject = flattenObjectForMongo(ob[i]);
        for (var x in flatObject) {
          if (!flatObject.hasOwnProperty(x)) continue;
          
          toReturn[i + '.' + x] = flatObject[x];
        }
      }
    } else {
      toReturn[i] = ob[i];
    }
  }
  return toReturn;
};

export const attackSpeedTicks = function(attackSpeed) {
  const ticksPerSecond = 1000 / BATTLES.tickDuration;

  // Convert attack speed seconds to attack speed ticks
  if (attackSpeed !== undefined) {
    return Math.round(ticksPerSecond / attackSpeed);
  } else {
    return 0;
  }
}
