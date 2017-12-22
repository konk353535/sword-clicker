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
    magicXp: 500,
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
  }
};
