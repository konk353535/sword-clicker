import { ASTRONOMY_ITEMS as astronomyItems } from './items';

export const ASTRONOMY_ITEMS = astronomyItems;

export const ASTRONOMY = {
  baseMaxMages: 5,

  mageHireCost: [{
    type: 'gold',
    amount: 500,
    consumes: true
  }],

  upgradeCosts: {
    attackSpeed(current) {
      const goldAmount = (current - 74) * 1000;
      return [{
        type: 'gold',
        amount: goldAmount,
        consumes: true
      }]
    },

    criticalChance(current) {
      const goldAmount = (current - 4) * (current / 20) * 1000;
      return [{
        type: 'gold',
        amount: goldAmount,
        consumes: true
      }]
    }
  }
}
