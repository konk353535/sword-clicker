console.log('importing inscription/index.js INSCRIPTION_ITEMS');
import { INSCRIPTION_ITEMS as inscriptionItems } from './items';

console.log('exporting inscription/index.js INSCRIPTION_ITEMS');
export const INSCRIPTION_ITEMS = inscriptionItems;

console.log('exporting inscription/index.js INSCRIPTION');
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

};
