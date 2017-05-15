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
    }
  }
}
