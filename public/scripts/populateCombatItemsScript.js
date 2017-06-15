const parser = require('json-parser');
const fs = require('fs');

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
    tier: 0
  },
  copper: {
    prefix: 'copper',
    color: '#BE5B0C',
    tier: 1
  },
  tin: {
    prefix: 'tin',
    color: '#869eac',
    tier: 2
  },
  bronze: {
    prefix: 'bronze',
    color: '#db5625',
    tier: 3
  },
  iron: {
    prefix: 'iron',
    color: '#535252',
    tier: 4
  },
  silver: {
    prefix: 'silver',
    color: '#c8e0d5',
    tier: 5
  },
  gold: {
    prefix: 'gold',
    color: '#ffd635',
    tier: 6
  },
  carbon: {
    prefix: 'carbon',
    color: '#283359',
    tier: 7
  },
  steel: {
    prefix: 'steel',
    color: '#9ea4a6',
    tier: 8
  },
  platinum: {
    prefix: 'platinum',
    color: '#E5E4E2',
    tier: 9
  },
  titanium: {
    prefix: 'titanium',
    color: '#747c83',
    tier: 10
  },
  tungsten: {
    prefix: 'tungsten',
    color: '#b9bed0',
    tier: 11
  },
  obsidian: {
    prefix: 'obsidian',
    color: '#1f1e1d',
    tier: 12
  },
  cobalt: {
    prefix: 'cobalt',
    color: '#0047AB',
    tier: 13
  },
  mithril: {
    prefix: 'mithril',
    color: '#4682B4',
    tier: 14
  },
  adamantium: {
    prefix: 'adamantium',
    color: '#20903e',
    tier: 15
  },
  orichalcum: {
    prefix: 'orichalcum',
    color: '#FFD700',
    tier: 16
  },
  meteorite: {
    prefix: 'meteorite',
    color: '#da5824',
    tier: 17
  },
  fairy_steel: {
    prefix: 'fairySteel',
    color: '#663399',
    tier: 18
  },
  elven_steel: {
    prefix: 'elvenSteel',
    color: '#54b54e',
    tier: 19
  },
  cursed: {
    prefix: 'cursed',
    color: '#b61f15',
    tier: 20
  }
}


Object.keys(options).forEach((tierName, index) => {
  if (tierName === 'stone' || tierName === 'copper') {
    return;
  }

  if (tierName !== 'tin') {
    return;
  }

  // Read previous tiers file
  const previousTierName = Object.keys(options)[index - 1];

  fs.readFile(`../../server/constants/combat/items/${previousTierName}.js`, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
    }

    let newData = data.replace(new RegExp(previousTierName, 'g'), tierName);
    newData = newData.replace(new RegExp(previousTierName.toUpperCase(), 'g'), tierName.toUpperCase());

    // Remove start of file before JSON
    newData = newData.replace(`import { VERY_FAST_SPEED, FAST_SPEED, MEDIUM_SPEED, SLOW_SPEED } from '/server/constants/combat/attackSpeeds';`, '');
    newData = newData.replace('export const TIN_ITEMS = ', '');

    // Parse the JSON
    const parsedData = parser.parse(newData);

    fs.writeFile(`../../server/constants/combat/items/${tierName}.js`, newData, (err) => {});
  });

});
