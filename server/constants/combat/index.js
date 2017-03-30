import { COMBAT_ITEMS as combatItems} from './items';
import { BUFFS as buffs } from './buffs';

import { ITEMS } from './items';

export const BUFFS = buffs;
export const COMBAT_ITEMS = combatItems;
export const COMBAT = {

  baseenergyMax: 25,

  baseEnergyRegenPerMinute: 0.2, // 1 every 5 minutes

  baseHealthRegenPerMinute: 0,

  energyConsumption: {
    easy: 1,
    hard: 2,
    veryHard: 3,
    boss: 10
  },

  statsArr: [
    'attack',
    'attackMax',
    'attackSpeed',
    'accuracy',
    'defense',
    'health',
    'healthMax',
    'armor'
  ]
}
