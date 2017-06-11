const fs = require('fs');

const options = {
  stone: {
    prefix: 'stone',
    color: '#5d5b5b'
  },
  copper: {
    prefix: 'copper',
    color: '#BE5B0C'
  },
  iron: {
    prefix: 'iron',
    color: '#5d5b5b'
  },
  steel: {
    prefix: 'steel',
    color: '#9ea4a6'
  },
  carbon: {
    prefix: 'carbon',
    color: '#040305'
  },
  mithril: {
    prefix: 'mithril',
    color: '#4682B4'
  },
  adamantium: {
    prefix: 'adamantium',
    color: '#20903e'
  },
  orichalcum: {
    prefix: 'orichalcum',
    color: '#FFD700'
  },
  cobalt: {
    prefix: 'cobalt',
    color: '#0047AB'
  },
  fairy_steel: {
    prefix: 'fairySteel',
    color: '#663399'
  },
  cursed: {
    prefix: 'cursed',
    color: '#b61f15'
  }
}

const stencilImage = "polishedStone.svg";
const stencilColor = "#5d5b5b";

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

fs.readFile(`../public/icons/${stencilImage}`, 'utf8', (err, data) => {
  if (err) throw err;
  Object.keys(options).forEach((tierName) => {
    const newData = data.replace(new RegExp(stencilColor, 'gi'), options[tierName].color);
    const fileName = `polished${titleCase(options[tierName].prefix)}.svg`;
    fs.writeFile(`../public/icons/${fileName}`, newData, (err) => {
      console.log(err);
      console.log('complete');
    });
  });
});
