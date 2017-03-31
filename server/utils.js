import _ from 'underscore';

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
