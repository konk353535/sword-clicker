console.log('importing floors/index.js TOWER_FLOORS');
import { TOWER_FLOORS } from './tower/index';
console.log('importing floors/index.js GENERATORS');
import { GENERATORS } from '/server/constants/floors/generators';

console.log('exporting floors/index.js FLOORS');
export const FLOORS = Object.assign({

  getNewPointCount(floor, activeTowerUsers) {
    const floorDays = {
      1: 1, // Copper
      2: 1, // Iron
      3: 1, // Steel
      4: 2, // Carbon
      5: 2, // Mithril
      6: 3, // Adamantium
      7: 4, // Orichalcum
      8: 5, // Cobalt
      9: 6, // Fairy Steel
      10: 7, // Cursed
      11: 7,
      12: 7,
      13: 7,
      14: 7,
      15: 7,
      16: 7,
      17: 7,
      18: 7,
      19: 7,
      20: 7,
      21: 8,
      22: 8,
      23: 9,
      24: 9,
      25: 10
    }

    // Max points per player, per day
    let maxPoints = 0;
    for (let i = 0; i <= 7; i++) {
      maxPoints += Math.pow(1.7, i);
    }

    return Math.round(activeTowerUsers * maxPoints * floorDays[floor] * 1);
  },

}, TOWER_FLOORS, GENERATORS);
