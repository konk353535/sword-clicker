const options = {
  stone: {
    prefix: 'stone',
    color: '#5d5b5b',
    tier: 0,
    wood: '',
    level: 1
  },
  copper: {
    prefix: 'copper',
    color: '#BE5B0C',
    tier: 1,
    wood: 'pine_log',
    level: 1
  },
  tin: {
    prefix: 'tin',
    color: '#869eac',
    tier: 2,
    wood: 'beech_log',
    level: 5
  },
  bronze: {
    prefix: 'bronze',
    color: '#db5625',
    tier: 3,
    wood: 'ash_log',
    level: 10
  },
  iron: {
    prefix: 'iron',
    color: '#535252',
    tier: 4,
    wood: 'oak_log',
    level: 15
  },
  silver: {
    prefix: 'silver',
    color: '#c8e0d5',
    tier: 5,
    wood: 'maple_log',
    level: 20
  },
  gold: {
    prefix: 'gold',
    color: '#ffd635',
    tier: 6,
    wood: 'walnut_log',
    level: 25
  },
  carbon: {
    prefix: 'carbon',
    color: '#283359',
    tier: 7,
    wood: 'cherry_log',
    level: 30
  },
  steel: {
    prefix: 'steel',
    color: '#9ea4a6',
    tier: 8,
    wood: 'mahogany_log',
    level: 35
  },
  platinum: {
    prefix: 'platinum',
    color: '#E5E4E2',
    tier: 9,
    wood: 'elk_log',
    level: 40
  },
  titanium: {
    prefix: 'titanium',
    color: '#747c83',
    tier: 10,
    wood: 'black_log',
    level: 45
  },
  tungsten: {
    prefix: 'tungsten',
    color: '#b9bed0',
    tier: 11,
    wood: 'black_gum_log',
    level: 50
  },
  obsidian: {
    prefix: 'obsidian',
    color: '#1f1e1d',
    tier: 12,
    wood: 'cedar_log',
    level: 55
  },
  cobalt: {
    prefix: 'cobalt',
    color: '#0047AB',
    tier: 13,
    wood: 'denya_log',
    level: 60
  },
  mithril: {
    prefix: 'mithril',
    color: '#4682B4',
    tier: 14,
    wood: 'gombe_log',
    level: 65
  },
  adamantium: {
    prefix: 'adamantium',
    color: '#20903e',
    tier: 15,
    wood: 'hickory_log',
    level: 70
  },
  orichalcum: {
    prefix: 'orichalcum',
    color: '#FFD700',
    tier: 16,
    wood: 'larch_log',
    level: 75
  },
  meteorite: {
    prefix: 'meteorite',
    color: '#da5824',
    tier: 17,
    wood: 'poplar_log',
    level: 80
  },
  fairy_steel: {
    prefix: 'fairySteel',
    color: '#663399',
    tier: 18,
    wood: 'tali_log',
    level: 85
  },
  elven_steel: {
    prefix: 'elvenSteel',
    color: '#54b54e',
    tier: 19,
    wood: 'willow_log',
    level: 90
  },
  cursed: {
    prefix: 'cursed',
    color: '#b61f15',
    tier: 20,
    wood: 'teak_log',
    level: 95
  }
}


const totalObject = {};
const baseData = {
  produces: 'copper_bar',
  recipeFor: 'crafting',
  name: 'copper bar',
  category: 'crafting',
  id: 'copper_bar',
  timeToCraft: 3,
  xp: 2,
  maxToCraft: 100,
  requiredCraftingLevel: 2,
  required: [{
    type: 'item',
    itemId: 'stone_furnace',
    icon: ITEMS['stone_furnace'].icon,
    name: ITEMS['stone_furnace'].name,
    amount: 1,
    consumes: false
  }, {
    type: 'item',
    itemId: 'ore_coal',
    icon: ITEMS['ore_coal'].icon,
    name: ITEMS['ore_coal'].name,
    amount: 1,
    consumes: true
  }, {
    type: 'item',
    itemId: 'ore_copper',
    icon: ITEMS['ore_copper'].icon,
    name: ITEMS['ore_copper'].name,
    amount: 1,
    consumes: true
  }, {
    type: 'skill',
    name: 'crafting',
    level: 2
  }]
}
totalObject.copper_bar = baseData;
Object.keys(options).forEach((optionKey, optionIndex) => {
  if (optionKey !== 'stone' && optionKey !== 'copper') {
    // Clone baseData
    const newObject = JSON.parse(JSON.stringify(baseData));

    

  }
})
