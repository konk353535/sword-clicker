import _ from 'underscore';
import { BATTLES } from './constants/battles/index.js'; // List of encounters

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

export const enemyStatSetter = function(constants, baseStats, enhancedStats) {
  Object.keys(constants).forEach((enemyKey) => {

    const enhancedEnemy = JSON.parse(JSON.stringify(constants[enemyKey]));
    enhancedEnemy.id = `e_${enemyKey}`;
    enhancedEnemy.name = `En. ${enhancedEnemy.name}`;
    // Store enhanced enemy
    constants[`e_${enemyKey}`] = enhancedEnemy;

    // Mutate enchancedEnemies stats
    Object.keys(enhancedEnemy.stats).forEach((statKey) => {
      const currentStatValue = enhancedEnemy.stats[statKey];
      enhancedEnemy.stats[statKey] = currentStatValue * enhancedStats[statKey];
    });

    const currentEnemy = constants[enemyKey];

    // Mutate stats accordingly
    Object.keys(currentEnemy.stats).forEach((statKey) => {
      const currentStatValue = currentEnemy.stats[statKey];
      currentEnemy.stats[statKey] = currentStatValue * baseStats[statKey];
    });
  });
}

export const attackSpeedTicks = function(attackSpeed) {
  const ticksPerSecond = 1000 / BATTLES.tickDuration;

  // Convert attack speed seconds to attack speed ticks
  if (attackSpeed !== undefined) {
    // Fixes a bug where attack speeds beyond 8 yield an attack speed of 0
    if (attackSpeed >= 8) {
      return 1;
    }
    return Math.round(ticksPerSecond / attackSpeed);
  } else {
    return 0;
  }
}
