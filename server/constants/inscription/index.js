import { INSCRIPTION_ITEMS as inscriptionItems } from './items';

export const INSCRIPTION_ITEMS = inscriptionItems;

export const INSCRIPTION = {

  getMaxCrafts(inscriptionLevel) {
    let maxCrafts = 2;

    if (inscriptionLevel >= 5) {
      maxCrafts = 3;
    }

    if (inscriptionLevel >= 15) {
      maxCrafts = 4;
    }

    if (inscriptionLevel >= 35) {
      maxCrafts = 5;
    }

    if (inscriptionLevel >= 60) {
      maxCrafts = 6;
    }

    return maxCrafts;
  }

}
