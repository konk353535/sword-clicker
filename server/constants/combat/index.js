import { COMBAT_ITEMS as combatItems} from './items';
import { BUFFS as buffs } from './buffs';
import { ABILITIES as abilities, ABILITY as ability } from './abilities';

import { ITEMS } from './items';

export const ABILITIES = abilities;
export const ABILITY = ability;
export const BUFFS = buffs;
export const COMBAT_ITEMS = combatItems;
export const COMBAT = {

  baseEnergyMax: 20,

  baseEnergyRegenPerMinute: 0.15, // 1 every 7 minutes

  baseHealthRegenPerMinute: 1,

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
    'damageTaken',
    'armor'
  ]
}
