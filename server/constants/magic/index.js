import { ITEMS } from '/server/constants/items/index';

export const MAGIC = {
  spells: {
    rock_dart: {
      id: 'rock_dart',
      abilityId: 'rock_dart',
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
    }
  }
}
