import { UTIL } from './util';

export const LEVEL_TWO_CRAFTS = {
  berserk_level_2_tome: {
    recipeFor: 'inscription',
    produces: 'berserk_level_2_tome',
    name: 'Berserk Lv 2.',
    id: 'berserk_level_2_tome',
    category: 'tome',
    timeToCraft: 180,
    xp: 30,
    maxToCraft: 4,
    requiredInscriptionLevel: 4,
    required: [UTIL.MANY_RED_255, UTIL.GREEN_200, UTIL.BEECH_PAPER, UTIL.LEVEL_4]
  }
}
