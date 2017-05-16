import { ITEMS } from '/server/constants/items/index';

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

    mud_armor: {
      id: 'mud_armor',
      abilityId: 'mud_armor',
      xp: 5,
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
      xp: 5,
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
      xp: 10,
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
      xp: 10,
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
      xp: 50,
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
      xp: 50,
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
      xp: 50,
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
      xp: 500,
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
      xp: 500,
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
      xp: 500,
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
      xp: 500,
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
}
