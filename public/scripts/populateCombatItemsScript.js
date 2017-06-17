var jsonic = require('jsonic')
const fs = require('fs');
const async = require('async');
var math = require('mathjs');

function titleCase(str) {
  var splitStr = str.toLowerCase().split(' ');
  for (var i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
  }
  // Directly return the joined string
  return splitStr.join(' '); 
}

const options = {
  stone: {
    prefix: 'stone',
    color: '#5d5b5b',
    tier: 0,
    increase: 1.4
  },
  copper: {
    prefix: 'copper',
    color: '#BE5B0C',
    tier: 1,
    increase: 1.5
  },
  tin: {
    prefix: 'tin',
    color: '#869eac',
    tier: 2,
    increase: 1.4
  },
  bronze: {
    prefix: 'bronze',
    color: '#db5625',
    tier: 3,
    increase: 1.3
  },
  iron: {
    prefix: 'iron',
    color: '#535252',
    tier: 4,
    increase: 1.25
  },
  silver: {
    prefix: 'silver',
    color: '#c8e0d5',
    tier: 5,
    increase: 1.2
  },
  gold: {
    prefix: 'gold',
    color: '#ffd635',
    tier: 6,
    increase: 1.2
  },
  carbon: {
    prefix: 'carbon',
    color: '#283359',
    tier: 7,
    increase: 1.17
  },
  steel: {
    prefix: 'steel',
    color: '#9ea4a6',
    tier: 8,
    increase: 1.13
  },
  platinum: {
    prefix: 'platinum',
    color: '#E5E4E2',
    tier: 9,
    increase: 1.19
  },
  titanium: {
    prefix: 'titanium',
    color: '#747c83',
    tier: 10,
    increase: 1.15
  },
  tungsten: {
    prefix: 'tungsten',
    color: '#b9bed0',
    tier: 11,
    increase: 1.13
  },
  obsidian: {
    prefix: 'obsidian',
    color: '#1f1e1d',
    tier: 12,
    increase: 1.12
  },
  cobalt: {
    prefix: 'cobalt',
    color: '#0047AB',
    tier: 13,
    increase: 1.12
  },
  mithril: {
    prefix: 'mithril',
    color: '#4682B4',
    tier: 14,
    increase: 1.11
  },
  adamantium: {
    prefix: 'adamantium',
    color: '#20903e',
    tier: 15,
    increase: 1.10
  },
  orichalcum: {
    prefix: 'orichalcum',
    color: '#FFD700',
    tier: 16,
    increase: 1.09
  },
  meteorite: {
    prefix: 'meteorite',
    color: '#da5824',
    tier: 17,
    increase: 1.11
  },
  fairy_steel: {
    prefix: 'fairySteel',
    color: '#663399',
    tier: 18,
    increase: 1.10
  },
  elven_steel: {
    prefix: 'elvenSteel',
    color: '#54b54e',
    tier: 19,
    increase: 1.12
  },
  cursed: {
    prefix: 'cursed',
    color: '#b61f15',
    tier: 20,
    increase: 1.09
  }
}

async.forEachOfSeries(Object.keys(options), (tierName, index, callback) => {
  if (tierName === 'stone' || tierName === 'copper') {
    return callback();
  }

  const optionData = options[tierName];

  // Read previous tiers file
  const previousTierName = Object.keys(options)[index - 1];

  console.log(`Previous tier name = ${previousTierName}`);

  fs.readFile(`../../server/constants/combat/items/${previousTierName}.js`, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
    }

    let newData = data.replace(new RegExp(previousTierName, 'g'), tierName);
    newData = newData.replace(new RegExp(previousTierName.toUpperCase(), 'g'), tierName.toUpperCase());

    // Remove start of file before JSON
    newData = newData.replace(`import { VERY_FAST_SPEED, FAST_SPEED, MEDIUM_SPEED, SLOW_SPEED } from '/server/constants/combat/attackSpeeds';`, '');
    newData = newData.replace(`export const ${tierName.toUpperCase()}_ITEMS = `, '');

    // Parse the JSON
    const parsedData = jsonic(newData);

    // Increase values by 10%
    Object.keys(parsedData).forEach((combatItemKey) => {
      const item = parsedData[combatItemKey];
      item.name = item.name.replace('_', ' ');
      Object.keys(item.stats).forEach((statKey) => {
        if (statKey !== 'attackSpeed') {
          item.stats[statKey] = math.round(item.stats[statKey] * optionData.increase, 1);
        }
      });

      if (item.extraStats) {
        Object.keys(item.extraStats).forEach((statKey) => {
          if (statKey !== 'attackSpeed') {
            item.extraStats[statKey] = math.round(item.stats[statKey] * 0.3, 1);
          }
        });
      }
    });

    let finalData = `export const ${tierName.toUpperCase()}_ITEMS = `;
    finalData += JSON.stringify(parsedData, null, 2);

    fs.writeFile(`../../server/constants/combat/items/${tierName}.js`, finalData, (err) => {
      console.log(`New tier name = ${tierName}`);
      callback();
    });
  });

});
