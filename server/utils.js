import _ from 'underscore';
import { BATTLES } from '/server/constants/battles/index.js'; // List of encounters

export const flattenObjectForMongo = function(ob) {
  const toReturn = {};

  for (let i in ob) {
    if (!ob.hasOwnProperty(i)) continue;
    
    if ((typeof ob[i]) === 'object') {
      if (_.isDate(ob[i]) || _.isArray(ob[i])) {
        toReturn[i] = ob[i];
      } else {
        const flatObject = flattenObjectForMongo(ob[i]);
        for (let x in flatObject) {
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
};

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
};

export const cleanRewards = function(rewards) {
  const r = JSON.parse(JSON.stringify(rewards));
  let items = r.reduce((acc, cur) => {
    let exists = false;
    acc.forEach((item) => {
      if(item.type === 'item' && cur.type === 'item') {
        if(item.itemId === cur.itemId) {
          item.amount += cur.amount;
          exists = true;
        }
      } else if(item.type === 'gold' && cur.type === 'gold') {
        item.amount += cur.amount;
        exists = true;
      }
    });

    if (!exists) {
      acc.push(cur);
    }
    return acc;
  }, []);
  return _.sortBy(items, 'type');
};
