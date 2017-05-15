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

  water_dart: {
    duplicateTag: 'water_dart', // Used to stop duplicate buffs
    icon: 'waterDart',
    name: 'water dart',
    description({ buff, level }) {
      const c = buff.constants;
      return `
        Heals target for ${c.healBase} + (${Math.round(c.healMPRatio * 100)}% of MP). <br />
        At a cost of ${c.healthCost} + (${Math.round(c.healthCostMPRatio * 100)}% of MP) health`;
    },
    constants: {
      healBase: 10,
      healMPRatio: 1,
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
        const healBase = constants.healBase;
        const healMP = constants.healMPRatio * caster.stats.magicPower;
        const totalHeal = healBase + healMP;
        const healthBase = constants.healthCost;
        const healthMP = constants.healthCostMPRatio * caster.stats.magicPower;
        const totalHealth = healthBase + healthMP;

        // Make sure we have target health
        if (caster.stats.health >= totalHealth) {
          caster.stats.health -= totalHealth;
          caster.stats.healthMax -= totalHealth;
        
          actualBattle.utils.healTarget(totalHeal, {
            caster,
            target,
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

  air_dart: {
    duplicateTag: 'air_dart', // Used to stop duplicate buffs
    icon: 'airDart',
    name: 'air dart',
    description({ buff, level }) {
      const c = buff.constants;

      return `
        Reduces enemy armor by (${c.armorReductionBase} + ${Math.round(c.armorReductionMPRatio * 100)}% of MP) for ${c.totalDuration}s<br />
        At a cost of ${c.healthCost} + (${Math.round(c.healthCostMPRatio * 100)}% of MP) health`;
    },
    constants: {
      armorReductionBase: 10,
      armorReductionMPRatio: 1,
      healthCost: 5,
      healthCostMPRatio: 0.5,
      totalDuration: 5
    },
    data: {
      duration: 5,
      totalDuration: 5,
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {
        const constants = buff.constants.constants;
        const armorReductionBase = constants.armorReductionBase;
        const armorReductionMP = constants.armorReductionMPRatio * caster.stats.magicPower;
        const totalArmorReduction = armorReductionBase + armorReductionMP;

        const healthBase = constants.healthCost;
        const healthMP = constants.healthCostMPRatio * caster.stats.magicPower;
        const totalHealth = healthBase + healthMP;

        // Make sure we have target health
        if (caster.stats.health >= totalHealth) {
          caster.stats.health -= totalHealth;
          caster.stats.healthMax -= totalHealth;
        
          buff.data.totalArmorReduction = totalArmorReduction;
          target.stats.armor -= totalArmorReduction;
        }
      },

      onTick({ buff, target, caster, secondsElapsed }) {
        buff.data.duration -= secondsElapsed;

        if (buff.data.duration < 0) {
          removeBuff({ buff, target, caster });
        }
      },

      onRemove({ buff, target, caster }) {
        target.stats.armor += buff.data.totalArmorReduction;
      }
    }
  },

  fire_dart: {
    duplicateTag: 'fire_dart', // Used to stop duplicate buffs
    icon: 'fireDart',
    name: 'fire dart',
    description({ buff, level }) {
      const c = buff.constants;
      return `
        Deals ${c.damageBase} + (${Math.round(c.damageMPRatio * 100)}% of MP) as magic damage. <br />
        At a cost of ${c.healthCost} + (${Math.round(c.healthCostMPRatio * 100)}% of MP) health`;
    },
    constants: {
      damageBase: 10,
      damageMPRatio: 1,
      healthCost: 6,
      healthCostMPRatio: 0.6
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
            isMagic: true,
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
