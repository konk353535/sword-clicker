console.log('importing combat/index.js COMBAT_ITEMS');
import { COMBAT_ITEMS as combatItems} from './items';
console.log('importing combat/index.js ABILITIES, ABILITY');
import { ABILITIES as abilities, ABILITY as ability } from './abilities';

console.log('exporting combat/index.js ABILITIES');
export const ABILITIES = abilities;
console.log('exporting combat/index.js ABILITY');
export const ABILITY = ability;
console.log('exporting combat/index.js COMBAT_ITEMS');
export const COMBAT_ITEMS = combatItems;
console.log('exporting combat/index.js COMBAT');
export const COMBAT = {

  baseEnergyMax: 40,

  baseEnergyRegenPerMinute: 40, // 1 every 3 minutes

  baseHealthRegenPerMinute: 300000,

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
    'criticalChance',
    'healingPower',
    'criticalDamage',
    'accuracy',
    'defense',
    'health',
    'healthMax',
    'damageTaken',
    'magicPower',
    'armor',
    'magicArmor'
  ]
}
