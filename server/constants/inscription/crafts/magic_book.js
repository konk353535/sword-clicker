import { ITEMS } from '/server/constants/items/index.js'; 

export const MAGIC_BOOK_CRAFTS = {

  pine_magic_book: {
    recipeFor: 'inscription',
    produces: 'pine_magic_book',
    name: 'codex of tutoring',
    id: 'pine_magic_book',
    category: 'magic_book',
    timeToCraft: 300,
    xp: 100,
    maxToCraft: 5,
    requiredInscriptionLevel: 3,
    required: [{
      type: 'item',
      itemId: 'pine_book',
      icon: ITEMS['pine_book'].icon,
      name: ITEMS['pine_book'].name,
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
    timeToCraft: 300,
    xp: 100,
    maxToCraft: 5,
    requiredInscriptionLevel: 7,
    required: [{
      type: 'item',
      itemId: 'beech_book',
      icon: ITEMS['beech_book'].icon,
      name: ITEMS['beech_book'].name,
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
    id: 'ash_magic_book',
    category: 'magic_book',
    timeToCraft: 300,
    xp: 100,
    maxToCraft: 5,
    requiredInscriptionLevel: 10,
    required: [{
      type: 'item',
      itemId: 'ash_book',
      icon: ITEMS['ash_book'].icon,
      name: ITEMS['ash_book'].name,
      amount: 1,
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
      name: 'inscription',
      level: 10
    }, {
      type: 'skill',
      name: 'astronomy',
      level: 10
    }]
  },

 oak_magic_book: {
    recipeFor: 'inscription',
    produces: 'oak_magic_book',
    name: 'codex of magic',
    id: 'oak_magic_book',
    category: 'magic_book',
    timeToCraft: 300,
    xp: 100,
    maxToCraft: 5,
    requiredInscriptionLevel: 15,
    required: [{
      type: 'item',
      itemId: 'oak_book',
      icon: ITEMS['oak_book'].icon,
      name: ITEMS['oak_book'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'item',
      itemId: 'complete_air_shard',
      icon: ITEMS['complete_air_shard'].icon,
      name: ITEMS['complete_air_shard'].name,
      amount: 1,
      consumes: true
    }, {
      type: 'skill',
      name: 'inscription',
      level: 15
    }, {
      type: 'skill',
      name: 'astronomy',
      level: 15
    }]
  }
};
