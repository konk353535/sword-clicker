console.log('importing magic/index.js ITEMS');
import { ITEMS } from '/imports/constants/items/index';

console.log('exporting magic/index.js MAGIC');
export const MAGIC = {
  spells: {
    earth_dart: {
      id: 'earth_dart',
      abilityId: 'earth_dart',
      xp: 1,
      maxToCraft: 10000,
      required: [{
        type: 'item',
        itemId: 'earth_shard_fragment',
        icon: ITEMS['earth_shard_fragment'].icon,
        name: ITEMS['earth_shard_fragment'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'skill',
        name: 'astronomy',
        level: 1
      }]
    },

    earthen_fist: {
      id: 'earthen_fist',
      abilityId: 'earthen_fist',
      xp: 107,
      maxToCraft: 10000,
      required: [{
        type: 'item',
        itemId: 'water_shard_fragment',
        icon: ITEMS['water_shard_fragment'].icon,
        name: ITEMS['water_shard_fragment'].name,
        amount: 2,
        consumes: true
      }, {
        type: 'item',
        itemId: 'complete_earth_shard',
        icon: ITEMS['complete_earth_shard'].icon,
        name: ITEMS['complete_earth_shard'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'item',
        itemId: 'earth_shard_fragment',
        icon: ITEMS['earth_shard_fragment'].icon,
        name: ITEMS['earth_shard_fragment'].name,
        amount: 5,
        consumes: true
      }, {
        type: 'skill',
        name: 'astronomy',
        level: 33
      }, {
        type: 'skill',
        name: 'magic',
        level: 33
      }]
    },

    lightning_storm: {
      id: 'lightning_storm',
      abilityId: 'lightning_storm',
      xp: 200,
      maxToCraft: 10000,
      required: [{
        type: 'item',
        itemId: 'complete_air_shard',
        icon: ITEMS['complete_air_shard'].icon,
        name: ITEMS['complete_air_shard'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'item',
        itemId: 'complete_fire_shard',
        icon: ITEMS['complete_fire_shard'].icon,
        name: ITEMS['complete_fire_shard'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'skill',
        name: 'astronomy',
        level: 15
      }, {
        type: 'skill',
        name: 'magic',
        level: 15
      }]
    },

    lightning_dart: {
      id: 'lightning_dart',
      abilityId: 'lightning_dart',
      xp: 3,
      maxToCraft: 10000,
      required: [{
        type: 'item',
        itemId: 'air_shard_fragment',
        icon: ITEMS['air_shard_fragment'].icon,
        name: ITEMS['air_shard_fragment'].name,
        amount: 2,
        consumes: true
      }, {
        type: 'item',
        itemId: 'fire_shard_fragment',
        icon: ITEMS['fire_shard_fragment'].icon,
        name: ITEMS['fire_shard_fragment'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'skill',
        name: 'astronomy',
        level: 5
      }, {
        type: 'skill',
        name: 'magic',
        level: 5
      }]
    },

    ice_dart: {
      id: 'ice_dart',
      abilityId: 'ice_dart',
      xp: 2,
      maxToCraft: 10000,
      required: [{
        type: 'item',
        itemId: 'air_shard_fragment',
        icon: ITEMS['air_shard_fragment'].icon,
        name: ITEMS['air_shard_fragment'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'item',
        itemId: 'water_shard_fragment',
        icon: ITEMS['water_shard_fragment'].icon,
        name: ITEMS['water_shard_fragment'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'skill',
        name: 'astronomy',
        level: 3
      }, {
        type: 'skill',
        name: 'magic',
        level: 3
      }]
    },
  
    earth_ball: {
      id: 'earth_ball',
      abilityId: 'earth_ball',
      xp: 10,
      maxToCraft: 10000,
      required: [{
        type: 'item',
        itemId: 'earth_shard_fragment',
        icon: ITEMS['earth_shard_fragment'].icon,
        name: ITEMS['earth_shard_fragment'].name,
        amount: 10,
        consumes: true
      }, {
        type: 'skill',
        name: 'astronomy',
        level: 14
      }, {
        type: 'skill',
        name: 'magic',
        level: 14
      }]
    },

    water_dart: {
      id: 'water_dart',
      abilityId: 'water_dart',
      xp: 1,
      maxToCraft: 10000,
      required: [{
        type: 'item',
        itemId: 'water_shard_fragment',
        icon: ITEMS['water_shard_fragment'].icon,
        name: ITEMS['water_shard_fragment'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'skill',
        name: 'astronomy',
        level: 1
      }]
    },

    furied_winds: {
      id: 'furied_winds',
      abilityId: 'furied_winds',
      xp: 107,
      maxToCraft: 10000,
      required: [{
        type: 'item',
        itemId: 'complete_air_shard',
        icon: ITEMS['complete_air_shard'].icon,
        name: ITEMS['complete_air_shard'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'item',
        itemId: 'fire_shard_fragment',
        icon: ITEMS['fire_shard_fragment'].icon,
        name: ITEMS['fire_shard_fragment'].name,
        amount: 7,
        consumes: true
      }, {
        type: 'skill',
        name: 'astronomy',
        level: 31
      }, {
        type: 'skill',
        name: 'magic',
        level: 31
      }]
    },

    fire_wave: {
      id: 'fire_wave',
      abilityId: 'fire_wave',
      xp: 120,
      maxToCraft: 10000,
      required: [{
        type: 'item',
        itemId: 'complete_fire_shard',
        icon: ITEMS['complete_fire_shard'].icon,
        name: ITEMS['complete_fire_shard'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'item',
        itemId: 'fire_shard_fragment',
        icon: ITEMS['fire_shard_fragment'].icon,
        name: ITEMS['fire_shard_fragment'].name,
        amount: 20,
        consumes: true
      }, {
        type: 'skill',
        name: 'astronomy',
        level: 29
      }, {
        type: 'skill',
        name: 'magic',
        level: 29
      }]
    },

    healing_shield: {
      id: 'healing_shield',
      abilityId: 'healing_shield',
      xp: 120,
      maxToCraft: 10000,
      required: [{
        type: 'item',
        itemId: 'complete_water_shard',
        icon: ITEMS['complete_water_shard'].icon,
        name: ITEMS['complete_water_shard'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'item',
        itemId: 'water_shard_fragment',
        icon: ITEMS['water_shard_fragment'].icon,
        name: ITEMS['water_shard_fragment'].name,
        amount: 20,
        consumes: true
      }, {
        type: 'skill',
        name: 'astronomy',
        level: 27
      }, {
        type: 'skill',
        name: 'magic',
        level: 27
      }]
    },

    water_ball: {
      id: 'water_ball',
      abilityId: 'water_ball',
      xp: 10,
      maxToCraft: 10000,
      required: [{
        type: 'item',
        itemId: 'water_shard_fragment',
        icon: ITEMS['water_shard_fragment'].icon,
        name: ITEMS['water_shard_fragment'].name,
        amount: 10,
        consumes: true
      }, {
        type: 'skill',
        name: 'astronomy',
        level: 19
      }, {
        type: 'skill',
        name: 'magic',
        level: 19
      }]
    },

    water_wave: {
      id: 'water_wave',
      abilityId: 'water_wave',
      xp: 105,
      maxToCraft: 10000,
      required: [{
        type: 'item',
        itemId: 'water_shard_fragment',
        icon: ITEMS['water_shard_fragment'].icon,
        name: ITEMS['water_shard_fragment'].name,
        amount: 5,
        consumes: true
      }, {
        type: 'item',
        itemId: 'complete_water_shard',
        icon: ITEMS['complete_water_shard'].icon,
        name: ITEMS['complete_water_shard'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'skill',
        name: 'astronomy',
        level: 10
      }, {
        type: 'skill',
        name: 'magic',
        level: 10
      }]
    },

    mending_spring: {
      id: 'mending_spring',
      abilityId: 'mending_spring',
      xp: 105,
      maxToCraft: 10000,
      required: [{
        type: 'item',
        itemId: 'water_shard_fragment',
        icon: ITEMS['water_shard_fragment'].icon,
        name: ITEMS['water_shard_fragment'].name,
        amount: 5,
        consumes: true
      }, {
        type: 'item',
        itemId: 'complete_water_shard',
        icon: ITEMS['complete_water_shard'].icon,
        name: ITEMS['complete_water_shard'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'skill',
        name: 'astronomy',
        level: 10
      }, {
        type: 'skill',
        name: 'magic',
        level: 10
      }]
    },

    affliction: {
      id: 'affliction',
      abilityId: 'affliction',
      xp: 105,
      maxToCraft: 10000,
      required: [{
        type: 'item',
        itemId: 'poison_shard_fragment',
        icon: ITEMS['poison_shard_fragment'].icon,
        name: ITEMS['poison_shard_fragment'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'item',
        itemId: 'complete_water_shard',
        icon: ITEMS['water_shard_fragment'].icon,
        name: ITEMS['water_shard_fragment'].name,
        amount: 25,
        consumes: true
      }, {
        type: 'skill',
        name: 'astronomy',
        level: 10
      }, {
        type: 'skill',
        name: 'magic',
        level: 10
      }]
    },
  
  magic_wisdom: {
      id: 'magic_wisdom',
      abilityId: 'magic_wisdom',
      xp: 400,
      maxToCraft: 10000,
      required: [{
        type: 'item',
        itemId: 'complete_air_shard',
        icon: ITEMS['complete_air_shard'].icon,
        name: ITEMS['complete_air_shard'].name,
        amount: 2,
        consumes: true
      }, {
        type: 'item',
        itemId: 'complete_water_shard',
        icon: ITEMS['complete_water_shard'].icon,
        name: ITEMS['complete_water_shard'].name,
        amount: 2,
        consumes: true
      }, {
        type: 'skill',
        name: 'astronomy',
        level: 15
      }, {
        type: 'skill',
        name: 'magic',
        level: 15
      }]
    },

    blizzard: {
      id: 'blizzard',
      abilityId: 'blizzard',
      xp: 110,
      maxToCraft: 10000,
      required: [{
        type: 'item',
        itemId: 'complete_water_shard',
        icon: ITEMS['complete_water_shard'].icon,
        name: ITEMS['complete_water_shard'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'item',
        itemId: 'air_shard_fragment',
        icon: ITEMS['air_shard_fragment'].icon,
        name: ITEMS['air_shard_fragment'].name,
        amount: 10,
        consumes: true
      }, {
        type: 'skill',
        name: 'astronomy',
        level: 17
      }, {
        type: 'skill',
        name: 'magic',
        level: 17
      }]
    },

    poison_dart: {
      id: 'poison_dart',
      abilityId: 'poison_dart',
      xp: 5,
      maxToCraft: 10000,
      required: [{
        type: 'item',
        itemId: 'poison_shard_fragment',
        icon: ITEMS['poison_shard_fragment'].icon,
        name: ITEMS['poison_shard_fragment'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'skill',
        name: 'astronomy',
        level: 5
      }, {
        type: 'skill',
        name: 'magic',
        level: 5
      }]
    },

    air_dart: {
      id: 'air_dart',
      abilityId: 'air_dart',
      xp: 1,
      maxToCraft: 10000,
      required: [{
        type: 'item',
        itemId: 'air_shard_fragment',
        icon: ITEMS['air_shard_fragment'].icon,
        name: ITEMS['air_shard_fragment'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'skill',
        name: 'astronomy',
        level: 1
      }]
    },

    air_ball: {
      id: 'air_ball',
      abilityId: 'air_ball',
      xp: 10,
      maxToCraft: 10000,
      required: [{
        type: 'item',
        itemId: 'air_shard_fragment',
        icon: ITEMS['air_shard_fragment'].icon,
        name: ITEMS['air_shard_fragment'].name,
        amount: 10,
        consumes: true
      }, {
        type: 'skill',
        name: 'astronomy',
        level: 20
      },  {
        type: 'skill',
        name: 'magic',
        level: 20
      }]
    },

    fire_dart: {
      id: 'fire_dart',
      abilityId: 'fire_dart',
      xp: 1,
      maxToCraft: 10000,
      required: [{
        type: 'item',
        itemId: 'fire_shard_fragment',
        icon: ITEMS['fire_shard_fragment'].icon,
        name: ITEMS['fire_shard_fragment'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'skill',
        name: 'astronomy',
        level: 1
      }]
    },
  
    meteor_strike: {
      id: 'meteor_strike',
      abilityId: 'meteor_strike',
      xp: 105,
      maxToCraft: 10000,
      required: [{
        type: 'item',
        itemId: 'complete_fire_shard',
        icon: ITEMS['complete_fire_shard'].icon,
        name: ITEMS['complete_fire_shard'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'item',
        itemId: 'earth_shard_fragment',
        icon: ITEMS['earth_shard_fragment'].icon,
        name: ITEMS['earth_shard_fragment'].name,
        amount: 5,
        consumes: true
      }, {
        type: 'skill',
        name: 'astronomy',
        level: 25
      },  {
        type: 'skill',
        name: 'magic',
        level: 25
      }]
    },

    fire_ball: {
      id: 'fire_ball',
      abilityId: 'fire_ball',
      xp: 10,
      maxToCraft: 10000,
      required: [{
        type: 'item',
        itemId: 'fire_shard_fragment',
        icon: ITEMS['fire_shard_fragment'].icon,
        name: ITEMS['fire_shard_fragment'].name,
        amount: 10,
        consumes: true
      }, {
        type: 'skill',
        name: 'astronomy',
        level: 17
      }, {
        type: 'skill',
        name: 'magic',
        level: 17
      }]
    },

    mud_armor: {
      id: 'mud_armor',
      abilityId: 'mud_armor',
      xp: 4,
      maxToCraft: 10000,
      required: [{
        type: 'item',
        itemId: 'water_shard_fragment',
        icon: ITEMS['water_shard_fragment'].icon,
        name: ITEMS['water_shard_fragment'].name,
        amount: 2,
        consumes: true
      }, {
        type: 'item',
        itemId: 'earth_shard_fragment',
        icon: ITEMS['earth_shard_fragment'].icon,
        name: ITEMS['earth_shard_fragment'].name,
        amount: 2,
        consumes: true
      }, {
        type: 'skill',
        name: 'astronomy',
        level: 5
      }, {
        type: 'skill',
        name: 'magic',
        level: 5
      }]
    },

    mending_water: {
      id: 'mending_water',
      abilityId: 'mending_water',
      xp: 4,
      maxToCraft: 10000,
      required: [{
        type: 'item',
        itemId: 'water_shard_fragment',
        icon: ITEMS['water_shard_fragment'].icon,
        name: ITEMS['water_shard_fragment'].name,
        amount: 3,
        consumes: true
      }, {
        type: 'item',
        itemId: 'air_shard_fragment',
        icon: ITEMS['air_shard_fragment'].icon,
        name: ITEMS['air_shard_fragment'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'skill',
        name: 'astronomy',
        level: 10
      }, {
        type: 'skill',
        name: 'magic',
        level: 5
      }]
    },

    ignite: {
      id: 'ignite',
      abilityId: 'ignite',
      xp: 7,
      maxToCraft: 10000,
      required: [{
        type: 'item',
        itemId: 'fire_shard_fragment',
        icon: ITEMS['fire_shard_fragment'].icon,
        name: ITEMS['fire_shard_fragment'].name,
        amount: 5,
        consumes: true
      }, {
        type: 'item',
        itemId: 'air_shard_fragment',
        icon: ITEMS['air_shard_fragment'].icon,
        name: ITEMS['air_shard_fragment'].name,
        amount: 2,
        consumes: true
      }, {
        type: 'skill',
        name: 'astronomy',
        level: 15
      }, {
        type: 'skill',
        name: 'magic',
        level: 5
      }]
    },

    frenzied_winds: {
      id: 'frenzied_winds',
      abilityId: 'frenzied_winds',
      xp: 6,
      maxToCraft: 10000,
      required: [{
        type: 'item',
        itemId: 'water_shard_fragment',
        icon: ITEMS['water_shard_fragment'].icon,
        name: ITEMS['water_shard_fragment'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'item',
        itemId: 'air_shard_fragment',
        icon: ITEMS['air_shard_fragment'].icon,
        name: ITEMS['air_shard_fragment'].name,
        amount: 5,
        consumes: true
      }, {
        type: 'skill',
        name: 'astronomy',
        level: 15
      }, {
        type: 'skill',
        name: 'magic',
        level: 5
      }]
    },

    angels_touch: {
      id: 'angels_touch',
      abilityId: 'angels_touch',
      xp: 103,
      maxToCraft: 10000,
      required: [{
        type: 'item',
        itemId: 'complete_water_shard',
        icon: ITEMS['complete_water_shard'].icon,
        name: ITEMS['complete_water_shard'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'item',
        itemId: 'water_shard_fragment',
        icon: ITEMS['water_shard_fragment'].icon,
        name: ITEMS['water_shard_fragment'].name,
        amount: 3,
        consumes: true
      }, {
        type: 'skill',
        name: 'astronomy',
        level: 20
      }, {
        type: 'skill',
        name: 'magic',
        level: 10
      }]
    },

    feeding_frenzy: {
      id: 'feeding_frenzy',
      abilityId: 'feeding_frenzy',
      xp: 200,
      maxToCraft: 10000,
      required: [{
        type: 'item',
        itemId: 'complete_water_shard',
        icon: ITEMS['complete_water_shard'].icon,
        name: ITEMS['complete_water_shard'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'item',
        itemId: 'complete_fire_shard',
        icon: ITEMS['complete_fire_shard'].icon,
        name: ITEMS['complete_fire_shard'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'skill',
        name: 'astronomy',
        level: 20
      }, {
        type: 'skill',
        name: 'magic',
        level: 15
      }]
    },

    elemental_shield: {
      id: 'elemental_shield',
      abilityId: 'elemental_shield',
      xp: 103,
      maxToCraft: 10000,
      required: [{
        type: 'item',
        itemId: 'air_shard_fragment',
        icon: ITEMS['air_shard_fragment'].icon,
        name: ITEMS['air_shard_fragment'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'item',
        itemId: 'fire_shard_fragment',
        icon: ITEMS['fire_shard_fragment'].icon,
        name: ITEMS['fire_shard_fragment'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'item',
        itemId: 'water_shard_fragment',
        icon: ITEMS['water_shard_fragment'].icon,
        name: ITEMS['water_shard_fragment'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'item',
        itemId: 'complete_earth_shard',
        icon: ITEMS['complete_earth_shard'].icon,
        name: ITEMS['complete_earth_shard'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'skill',
        name: 'astronomy',
        level: 20
      }, {
        type: 'skill',
        name: 'magic',
        level: 15
      }]
    },


    // Tier 3 Spell
    heavens_descent: {
      id: 'heavens_descent',
      abilityId: 'heavens_descent',
      xp: 1000,
      maxToCraft: 2,
      required: [{
        type: 'item',
        itemId: 'ancient_water_shard',
        icon: ITEMS['ancient_water_shard'].icon,
        name: ITEMS['ancient_water_shard'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'skill',
        name: 'astronomy',
        level: 30
      }, {
        type: 'skill',
        name: 'magic',
        level: 25
      }]
    },

    // Tier 3 Spell
    lightning_speed: {
      id: 'lightning_speed',
      abilityId: 'lightning_speed',
      xp: 1000,
      maxToCraft: 2,
      required: [{
        type: 'item',
        itemId: 'ancient_air_shard',
        icon: ITEMS['ancient_air_shard'].icon,
        name: ITEMS['ancient_air_shard'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'skill',
        name: 'astronomy',
        level: 30
      }, {
        type: 'skill',
        name: 'magic',
        level: 25
      }]
    },

    // Tier 3 Spell
    diamond_skin: {
      id: 'diamond_skin',
      abilityId: 'diamond_skin',
      xp: 1000,
      maxToCraft: 2,
      required: [{
        type: 'item',
        itemId: 'ancient_earth_shard',
        icon: ITEMS['ancient_earth_shard'].icon,
        name: ITEMS['ancient_earth_shard'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'skill',
        name: 'astronomy',
        level: 30
      }, {
        type: 'skill',
        name: 'magic',
        level: 25
      }]
    },

    // Tier 3 Spell
    inferno: {
      id: 'inferno',
      abilityId: 'inferno',
      xp: 1000,
      maxToCraft: 2,
      required: [{
        type: 'item',
        itemId: 'ancient_fire_shard',
        icon: ITEMS['ancient_fire_shard'].icon,
        name: ITEMS['ancient_fire_shard'].name,
        amount: 1,
        consumes: true
      }, {
        type: 'skill',
        name: 'astronomy',
        level: 30
      }, {
        type: 'skill',
        name: 'magic',
        level: 25
      }]
    }
  }
};
