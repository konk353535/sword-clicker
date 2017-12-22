import { ITEMS } from '/server/constants/items/index.js'; 

export const MAGIC_BOOK_CRAFTS = {

  pine_magic_book: {
    recipeFor: 'inscription',
    produces: 'pine_magic_book',
    name: 'codex of tutoring',
    id: 'pine_magic_book',
    category: 'magic_book',
    timeToCraft: 1,
    xp: 100,
    maxToCraft: 5,
    requiredInscriptionLevel: 3,
    required: [{
      type: 'item',
      itemId: 'pine_book',
      icon: ITEMS['pine_book'].icon,
      name: ITEMS['pine_book'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'fire_shard_fragment',
      icon: ITEMS['fire_shard_fragment'].icon,
      name: ITEMS['fire_shard_fragment'].name,
      amount: 100,
      consumes: false
    }, {
      type: 'skill',
      name: 'inscription',
      level: 3
    }, {
      type: 'skill',
      name: 'astronomy',
      level: 3
    }]
  },

  beech_magic_book: {
    recipeFor: 'inscription',
    produces: 'beech_magic_book',
    name: 'codex of learning',
    id: 'beech_magic_book',
    category: 'magic_book',
    timeToCraft: 1,
    xp: 100,
    maxToCraft: 5,
    requiredInscriptionLevel: 7,
    required: [{
      type: 'item',
      itemId: 'beech_book',
      icon: ITEMS['beech_book'].icon,
      name: ITEMS['beech_book'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'earth_shard_fragment',
      icon: ITEMS['earth_shard_fragment'].icon,
      name: ITEMS['earth_shard_fragment'].name,
      amount: 100,
      consumes: false
    }, {
      type: 'skill',
      name: 'inscription',
      level: 7
    }, {
      type: 'skill',
      name: 'astronomy',
      level: 7
    }]
  },

  ash_magic_book: {
    recipeFor: 'inscription',
    produces: 'ash_magic_book',
    name: 'codex of knowledge',
    id: 'beech_magic_book',
    category: 'magic_book',
    timeToCraft: 1,
    xp: 100,
    maxToCraft: 5,
    requiredInscriptionLevel: 10,
    required: [{
      type: 'item',
      itemId: 'ash_book',
      icon: ITEMS['ash_book'].icon,
      name: ITEMS['ash_book'].name,
      amount: 1,
      consumes: false
    }, {
      type: 'item',
      itemId: 'water_shard_fragment',
      icon: ITEMS['water_shard_fragment'].icon,
      name: ITEMS['water_shard_fragment'].name,
      amount: 100,
      consumes: false
    }, {
      type: 'skill',
      name: 'inscription',
      level: 10
    }, {
      type: 'skill',
      name: 'astronomy',
      level: 10
    }]
  }
};
