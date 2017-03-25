import { COMBAT_ITEMS as combatItems} from './items';
import { ITEMS } from './items';

export const COMBAT_ITEMS = combatItems;
export const COMBAT = {

  baseMaxEnergy: 25,

  baseEnergyRegenPerMinute: 0.2, // 1 every 5 minutes

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
    'maxHealth',
    'armor'
  ]
}
