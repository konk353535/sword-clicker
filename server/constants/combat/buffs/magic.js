import moment from 'moment';
import { attackSpeedTicks } from '/server/utils';
import { addBuff, removeBuff } from '/server/battleUtils';

export const MAGIC_BUFFS = {
  rock_dart: {
    duplicateTag: 'rock_dart', // Used to stop duplicate buffs
    icon: 'rockDart',
    name: 'rock dart',
    description({ buff, level }) {
      const c = buff.constants;
      return `
        Deals ${c.damageBase} + (${Math.round(c.damageMPRatio * 100)}% of MP) as physical damage. <br />
        At a cost of ${c.healthCost} + (${Math.round(c.healthCostMPRatio * 100)}% of MP) health`;
    },
    constants: {
      damageBase: 10,
      damageMPRatio: 1,
      healthCost: 5,
      healthCostMPRatio: 0.5
    },
    data: {
      duration: 0,
      totalDuration: 0,
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {
        const constants = buff.constants.constants;
        const damageBase = constants.damageBase;
        const damageMP = constants.damageMPRatio * caster.stats.magicPower;
        const totalDamage = damageBase + damageMP;
        const healthBase = constants.healthCost;
        const healthMP = constants.healthCostMPRatio * caster.stats.magicPower;
        const totalHealth = healthBase + healthMP;

        // Make sure we have target health
        if (caster.stats.health >= totalHealth) {
          caster.stats.health -= totalHealth;
          caster.stats.healthMax -= totalHealth;
        
          actualBattle.utils.dealDamage(totalDamage, {
            attacker: caster,
            defender: target,
            tickEvents: actualBattle.tickEvents
          });
        }
      },

      onTick({ buff, target, caster }) {
        removeBuff({ buff, target, caster });
      },

      onRemove() {}
    }
  },
}
