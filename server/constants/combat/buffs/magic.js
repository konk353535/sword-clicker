import moment from 'moment';
import { attackSpeedTicks } from '/server/utils';
import { addBuff, removeBuff } from '/server/battleUtils';

export const MAGIC_BUFFS = {
  earth_dart: {
    duplicateTag: 'earth_dart', // Used to stop duplicate buffs
    icon: 'earthDart',
    name: 'earth dart',
    description({ buff, level }) {
      const c = buff.constants;
      return `
        Deals ${c.damageBase} + (${Math.round(c.damageMPRatio * 100)}% of MP) as physical damage. <br />
        At a cost of ${c.healthCost} + (${Math.round(c.healthCostMPRatio * 100)}% of MP) health`;
    },
    constants: {
      damageBase: 10,
      damageMPRatio: 1,
      healthCost: 3,
      healthCostMPRatio: 0.20
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
      healthCost: 3,
      healthCostMPRatio: 0.2
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

  angels_touch: {
    duplicateTag: 'angels_touch', // Used to stop duplicate buffs
    icon: 'angelsTouch',
    name: 'angels touch',
    description({ buff, level }) {
      const c = buff.constants;
      return `
        Heals target for ${c.healBase} + (${Math.round(c.healMPRatio * 100)}% of MP). <br />
        At a cost of ${c.healthCost} + (${Math.round(c.healthCostMPRatio * 100)}% of MP) health`;
    },
    constants: {
      healBase: 1000,
      healMPRatio: 4,
      healthCost: 50,
      healthCostMPRatio: 1
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


  mending_water: {
    duplicateTag: 'mending_water', // Used to stop duplicate buffs
    icon: 'mendingWater',
    name: 'mending water',
    description({ buff, level }) {
      const c = buff.constants;
      return `
        Heals target for ${c.healBase} + (${Math.round(c.healMPRatio * 100)}% of MP) every 4 seconds. <br />
        At a cost of ${c.healthCost} + (${Math.round(c.healthCostMPRatio * 100)}% of MP) health. <br />
        Lasts for ${buff.data.totalDuration}s`;
    },
    constants: {
      healBase: 5,
      healMPRatio: 0.5,
      healthCost: 8,
      healthCostMPRatio: 0.9
    },
    data: {
      duration: 20,
      totalDuration: 20,
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
        
          buff.data.totalHeal = totalHeal;
          actualBattle.utils.healTarget(buff.data.totalHeal, {
            caster,
            target,
            tickEvents: actualBattle.tickEvents
          });
          buff.data.timeTillHeal = 4;
        }
      },

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
        buff.data.duration -= secondsElapsed;
        buff.data.timeTillHeal -= secondsElapsed;

        if (buff.data.timeTillHeal <= 0) {
          actualBattle.utils.healTarget(buff.data.totalHeal, {
            caster,
            target,
            tickEvents: actualBattle.tickEvents
          });
          buff.data.timeTillHeal = 4;
        }

        if (buff.data.duration < 0) {
          removeBuff({ buff, target, caster });
        }
      },

      onRemove() {}
    }
  },

  ignite: {
    duplicateTag: 'ignite', // Used to stop duplicate buffs
    icon: 'ignite',
    name: 'ignite',
    description({ buff, level }) {
      const c = buff.constants;
      return `
        Damages target for ${c.damageBase} + (${Math.round(c.damageMPRatio * 100)}% of MP) every second. <br />
        At a cost of ${c.healthCost} + (${Math.round(c.healthCostMPRatio * 100)}% of MP) health. <br />
        Lasts for ${buff.data.totalDuration}s`;
    },
    constants: {
      damageBase: 2,
      damageMPRatio: 0.2,
      healthCost: 8,
      healthCostMPRatio: 1
    },
    data: {
      duration: 25,
      totalDuration: 25,
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
        
          buff.data.totalDamage = totalDamage;
          actualBattle.utils.dealDamage(buff.data.totalDamage, {
            attacker: caster,
            defender: target,
            isMagic: true,
            tickEvents: actualBattle.tickEvents
          });
          buff.data.timeTillDamage = 1;
        }
      },

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
        buff.data.duration -= secondsElapsed;
        buff.data.timeTillDamage -= secondsElapsed;

        if (buff.data.timeTillDamage <= 0) {
          actualBattle.utils.dealDamage(buff.data.totalDamage, {
            attacker: caster,
            defender: target,
            isMagic: true,
            tickEvents: actualBattle.tickEvents
          });
          buff.data.timeTillDamage = 1;
        }

        if (buff.data.duration < 0) {
          removeBuff({ buff, target, caster });
        }
      },

      onRemove() {}
    }
  },

  inferno: {
    duplicateTag: 'inferno', // Used to stop duplicate buffs
    icon: 'inferno',
    name: 'inferno',
    description({ buff, level }) {
      const c = buff.constants;
      return `
        Damages all enemies for ${c.damageBase} + (${Math.round(c.damageMPRatio * 100)}% of MP) twice a second. <br />
        At a cost of ${c.healthCost} + (${Math.round(c.healthCostMPRatio * 100)}% of MP) health. <br />
        Lasts for ${buff.data.totalDuration}s`;
    },
    constants: {
      damageBase: 7,
      damageMPRatio: 0.1,
      healthCost: 500,
      healthCostMPRatio: 1
    },
    data: {
      duration: 60,
      totalDuration: 60,
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
        
          buff.data.totalDamage = totalDamage;
          actualBattle.utils.dealDamage(buff.data.totalDamage, {
            attacker: caster,
            defender: target,
            isMagic: true,
            tickEvents: actualBattle.tickEvents
          });
          buff.data.timeTillDamage = 0.5;
        }
      },

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
        buff.data.duration -= secondsElapsed;
        buff.data.timeTillDamage -= secondsElapsed;

        if (buff.data.timeTillDamage <= 0) {
          actualBattle.utils.dealDamage(buff.data.totalDamage, {
            attacker: caster,
            defender: target,
            isMagic: true,
            tickEvents: actualBattle.tickEvents
          });
          buff.data.timeTillDamage = 0.5;
        }

        if (buff.data.duration < 0) {
          removeBuff({ buff, target, caster });
        }
      },

      onRemove() {}
    }
  },

  frenzied_winds: {
    duplicateTag: 'frenzied_winds', // Used to stop duplicate buffs
    icon: 'frenziedWinds',
    name: 'frenzied winds',
    description({ buff, level }) {
      const c = buff.constants;
      return `
        Increases targets attack speed by ${c.attackSpeedBase}% + (${Math.round(c.attackSpeedMPRatio * 100)}% of MP). <br />
        Decrease your attack speed by the same amount <br />
        At a cost of ${c.healthCost} + (${Math.round(c.healthCostMPRatio * 100)}% of MP) health. <br />
        Lasts for ${buff.data.totalDuration}s`;
    },
    constants: {
      attackSpeedBase: 25,
      attackSpeedMPRatio: 0.2,
      healthCost: 5,
      healthCostMPRatio: 0.5
    },
    data: {
      duration: 15,
      totalDuration: 15,
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {
        const constants = buff.constants.constants;
        const attackSpeedBase = constants.attackSpeedBase;
        const attackSpeedMP = constants.attackSpeedMPRatio * caster.stats.magicPower;
        const totalAttackSpeed = attackSpeedBase + attackSpeedMP;
        const healthBase = constants.healthCost;
        const healthMP = constants.healthCostMPRatio * caster.stats.magicPower;
        const totalHealth = healthBase + healthMP;

        // Make sure we have target health
        if (caster.stats.health >= totalHealth) {
          caster.stats.health -= totalHealth;
          caster.stats.healthMax -= totalHealth;

          buff.data.totalAttackSpeedDecimal = 1 + (totalAttackSpeed / 100);
          buff.data.originalCaster = caster.id;

          target.stats.attackSpeed *= buff.data.totalAttackSpeedDecimal;
          target.stats.attackSpeedTicks = attackSpeedTicks(target.stats.attackSpeed);
          caster.stats.attackSpeed /= buff.data.totalAttackSpeedDecimal;
          caster.stats.attackSpeedTicks = attackSpeedTicks(caster.stats.attackSpeed);
        }
      },

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
        buff.data.duration -= secondsElapsed;

        if (buff.data.duration < 0) {
          removeBuff({ buff, target, caster, actualBattle });
        }
      },

      onRemove({ buff, target, caster, actualBattle }) {
        if (buff.data.totalAttackSpeedDecimal) {
          target.stats.attackSpeed /= buff.data.totalAttackSpeedDecimal;
          target.stats.attackSpeedTicks = attackSpeedTicks(target.stats.attackSpeed);
        }

        // Find original caster
        let originalCaster = _.findWhere(actualBattle.units, { id: buff.data.originalCaster });
        if (!originalCaster) {
          originalCaster = _.findWhere(actualBattle.deadUnits, { id: buff.data.originalCaster });
        }

        if (originalCaster) {
          originalCaster.stats.attackSpeed *= buff.data.totalAttackSpeedDecimal;
          originalCaster.stats.attackSpeedTicks = attackSpeedTicks(originalCaster.stats.attackSpeed);
        }
      }
    }
  },

  lightning_speed: {
    duplicateTag: 'lightning_speed', // Used to stop duplicate buffs
    icon: 'lightningSpeed',
    name: 'lightning speed',
    description({ buff, level }) {
      const c = buff.constants;
      return `
        Increases all allies attack speed by ${c.attackSpeedBase}% + (${Math.round(c.attackSpeedMPRatio * 100)}% of MP). <br />
        At a cost of ${c.healthCost} + (${Math.round(c.healthCostMPRatio * 100)}% of MP) health per target. <br />
        Lasts for ${buff.data.totalDuration}s`;
    },
    constants: {
      attackSpeedBase: 200,
      attackSpeedMPRatio: 0.1,
      healthCost: 150,
      healthCostMPRatio: 0.2
    },
    data: {
      duration: 30,
      totalDuration: 30,
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {
        const constants = buff.constants.constants;
        const attackSpeedBase = constants.attackSpeedBase;
        const attackSpeedMP = constants.attackSpeedMPRatio * caster.stats.magicPower;
        const totalAttackSpeed = attackSpeedBase + attackSpeedMP;
        const healthBase = constants.healthCost;
        const healthMP = constants.healthCostMPRatio * caster.stats.magicPower;
        const totalHealth = healthBase + healthMP;

        // Make sure we have target health
        if (caster.stats.health >= totalHealth) {
          caster.stats.health -= totalHealth;
          caster.stats.healthMax -= totalHealth;

          buff.data.totalAttackSpeedDecimal = 1 + (totalAttackSpeed / 100);

          target.stats.attackSpeed *= buff.data.totalAttackSpeedDecimal;
          target.stats.attackSpeedTicks = attackSpeedTicks(target.stats.attackSpeed);
        }
      },

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
        buff.data.duration -= secondsElapsed;

        if (buff.data.duration < 0) {
          removeBuff({ buff, target, caster, actualBattle });
        }
      },

      onRemove({ buff, target, caster, actualBattle }) {
        if (buff.data.totalAttackSpeedDecimal) {
          target.stats.attackSpeed /= buff.data.totalAttackSpeedDecimal;
          target.stats.attackSpeedTicks = attackSpeedTicks(target.stats.attackSpeed);
        }
      }
    }
  },

  mud_armor: {
    duplicateTag: 'mud_armor', // Used to stop duplicate buffs
    icon: 'mudArmor',
    name: 'mud armor',
    description({ buff, level }) {
      const c = buff.constants;
      return `
        Increases targets armor by ${c.armorBase} + (${Math.round(c.armorMPRatio * 100)}% of MP). <br />
        At a cost of ${c.healthCost} + (${Math.round(c.healthCostMPRatio * 100)}% of MP) health. <br />
        Lasts for ${buff.data.totalDuration}s`;
    },
    constants: {
      armorBase: 25,
      armorMPRatio: 2,
      healthCost: 5,
      healthCostMPRatio: 0.5
    },
    data: {
      duration: 15,
      totalDuration: 15,
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {
        const constants = buff.constants.constants;
        const armorBase = constants.armorBase;
        const armorMP = constants.armorMPRatio * caster.stats.magicPower;
        const totalArmor = armorBase + armorMP;
        const healthBase = constants.healthCost;
        const healthMP = constants.healthCostMPRatio * caster.stats.magicPower;
        const totalHealth = healthBase + healthMP;

        // Make sure we have target health
        if (caster.stats.health >= totalHealth) {
          caster.stats.health -= totalHealth;
          caster.stats.healthMax -= totalHealth;

          buff.data.totalArmor = totalArmor;
          target.stats.armor += totalArmor;
        }
      },

      onTick({ buff, target, caster, secondsElapsed }) {
        buff.data.duration -= secondsElapsed;

        if (buff.data.duration < 0) {
          removeBuff({ buff, target, caster });
        }
      },

      onRemove({ buff, target, caster }) {
        if (buff.data.totalArmor) {
          target.stats.armor -= buff.data.totalArmor;
        }
      }
    }
  },

  elemental_shield: {
    duplicateTag: 'elemental_shield', // Used to stop duplicate buffs
    icon: 'elementalShield',
    name: 'elemental shield',
    description({ buff, level }) {
      const c = buff.constants;
      return `
        Apply a (${c.baseShield} + ${Math.round(c.shieldMPRatio * 100)}%MP) health shield to the target. <br />
        Target gains ${c.damageBase}% damage while the shield is active. <br />
        At a cost of ${c.healthCost} + (${Math.round(c.healthCostMPRatio * 100)}% of MP) health. <br />`;
    },
    constants: {
      damageBase: 25,
      baseShield: 50,
      shieldMPRatio: 0.7,
      healthCost: 25,
      healthCostMPRatio: 1
    },
    data: {
      duration: Infinity,
      totalDuration: Infinity,
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {
        const constants = buff.constants.constants;
        const baseShield = constants.baseShield;
        const shieldMP = constants.shieldMPRatio * caster.stats.magicPower;
        const totalShield = baseShield + shieldMP;
        const damageDecimal = 1 + (constants.damageBase / 100);
        const healthBase = constants.healthCost;
        const healthMP = constants.healthCostMPRatio * caster.stats.magicPower;
        const totalHealth = healthBase + healthMP;

        // Make sure we have target health
        if (caster.stats.health >= totalHealth) {
          caster.stats.health -= totalHealth;
          caster.stats.healthMax -= totalHealth;

          buff.data.damageDecimal = damageDecimal;
          buff.data.shieldHp = totalShield;
          target.stats.attack *= buff.data.damageDecimal;
          target.stats.attackMax *= buff.data.damageDecimal;
        } else {
          buff.data.shieldHp = 0;
        }
      },

      onTookDamage({ buff, defender, attacker, secondsElapsed, damageDealt }) {
        if (buff.data.shieldHp >= damageDealt) {
          buff.data.shieldHp -= damageDealt;
          defender.stats.health += damageDealt;
        } else {
          defender.stats.health += buff.data.shieldHp;
          buff.data.shieldHp = 0;
        }

        if (buff.data.shieldHp <= 0) {
          removeBuff({ buff, target: defender, caster: defender });
        }
      },

      onRemove({ buff, target, caster }) {
        if (buff.data.damageDecimal) {
          target.stats.attack /= buff.data.damageDecimal;
          target.stats.attackMax /= buff.data.damageDecimal;
        }
      }
    }
  },

  diamond_skin: {
    duplicateTag: 'diamond_skin', // Used to stop duplicate buffs
    icon: 'diamondSkin',
    name: 'diamond skin',
    description({ buff, level }) {
      const c = buff.constants;
      return `
        Apply a (${c.baseShield} + ${Math.round(c.shieldMPRatio * 100)}%MP) health shield to the target. <br />
        Target gains ${c.damageBase}% damage while the shield is active. <br />
        At a cost of ${c.healthCost} + (${Math.round(c.healthCostMPRatio * 100)}% of MP) health per target. <br />`;
    },
    constants: {
      damageBase: 25,
      baseShield: 500,
      shieldMPRatio: 2,
      healthCost: 150,
      healthCostMPRatio: 0.25
    },
    data: {
      duration: Infinity,
      totalDuration: Infinity,
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {
        const constants = buff.constants.constants;
        const baseShield = constants.baseShield;
        const shieldMP = constants.shieldMPRatio * caster.stats.magicPower;
        const totalShield = baseShield + shieldMP;
        const damageDecimal = 1 + (constants.damageBase / 100);
        const healthBase = constants.healthCost;
        const healthMP = constants.healthCostMPRatio * caster.stats.magicPower;
        const totalHealth = healthBase + healthMP;

        // Make sure we have target health
        if (caster.stats.health >= totalHealth) {
          caster.stats.health -= totalHealth;
          caster.stats.healthMax -= totalHealth;

          buff.data.damageDecimal = damageDecimal;
          buff.data.shieldHp = totalShield;
          target.stats.attack *= buff.data.damageDecimal;
          target.stats.attackMax *= buff.data.damageDecimal;
        } else {
          buff.data.shieldHp = 0;
        }
      },

      onTookDamage({ buff, defender, attacker, secondsElapsed, damageDealt, actualBattle }) {
        if (buff.data.shieldHp >= damageDealt) {
          buff.data.shieldHp -= damageDealt;
          defender.stats.health += damageDealt;
        } else {
          defender.stats.health += buff.data.shieldHp;
          buff.data.shieldHp = 0;
        }

        if (buff.data.shieldHp <= 0) {
          removeBuff({ buff, target: defender, caster: defender });
        }
      },

      onRemove({ buff, target, caster }) {
        if (buff.data.damageDecimal) {
          target.stats.attack /= buff.data.damageDecimal;
          target.stats.attackMax /= buff.data.damageDecimal;
        }
      }
    }
  },

  feeding_frenzy: {
    duplicateTag: 'feeding_frenzy', // Used to stop duplicate buffs
    icon: 'feedingFrenzy',
    name: 'feeding frenzy',
    description({ buff, level }) {
      const c = buff.constants;
      return `
        Increases all allies attack damage and attack speed by ${c.increaseBase}% + (${Math.round(c.increaseMPRatio * 100)}% of MP). <br />
        At a cost of ${c.healthCost} + (${Math.round(c.healthCostMPRatio * 100)}% of MP) health per target. <br />
        Lasts for ${buff.data.totalDuration}s`;
    },
    constants: {
      increaseBase: 20,
      increaseMPRatio: 0.2,
      healthCost: 15,
      healthCostMPRatio: 0.1
    },
    data: {
      duration: 20,
      totalDuration: 20,
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {
        const constants = buff.constants.constants;
        const increaseBase = constants.increaseBase;
        const increaseMP = constants.increaseMPRatio * caster.stats.magicPower;
        const totalIncrease = increaseBase + increaseMP;
        const healthBase = constants.healthCost;
        const healthMP = constants.healthCostMPRatio * caster.stats.magicPower;
        const totalHealth = healthBase + healthMP;

        // Make sure we have target health
        if (caster.stats.health >= totalHealth) {
          caster.stats.health -= totalHealth;
          caster.stats.healthMax -= totalHealth;

          buff.data.increaseDecimal = 1 + (totalIncrease / 100);
          target.stats.attackSpeed *= buff.data.increaseDecimal;
          target.stats.attackSpeedTicks = attackSpeedTicks(target.stats.attackSpeed);
          target.stats.attack *= buff.data.increaseDecimal;
          target.stats.attackMax *= buff.data.increaseDecimal;
        }
      },

      onTick({ buff, target, caster, secondsElapsed }) {
        buff.data.duration -= secondsElapsed;

        if (buff.data.duration < 0) {
          removeBuff({ buff, target, caster });
        }
      },

      onRemove({ buff, target, caster }) {
        if (buff.data.increaseDecimal) {
          target.stats.attackSpeed /= buff.data.increaseDecimal;
          target.stats.attackSpeedTicks = attackSpeedTicks(target.stats.attackSpeed);
          target.stats.attack /= buff.data.increaseDecimal;
          target.stats.attackMax /= buff.data.increaseDecimal;
        }
      }
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
      healthCost: 3,
      healthCostMPRatio: 0.2,
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
        } else {
          buff.data.totalArmorReduction = 0;
          buff.data.duration = -1;
        }
      },

      onTick({ buff, target, caster, secondsElapsed }) {
        buff.data.duration -= secondsElapsed;

        if (buff.data.duration < 0) {
          removeBuff({ buff, target, caster });
        }
      },

      onRemove({ buff, target, caster }) {
        if (buff.data.totalArmorReduction) {
          target.stats.armor += buff.data.totalArmorReduction;
        }
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
      healthCost: 3,
      healthCostMPRatio: 0.3
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

  heavens_descent: {
    duplicateTag: 'heavens_descent', // Used to stop duplicate buffs
    icon: 'heavensDescent',
    name: 'heavens descent',
    description({ buff, level }) {
      const c = buff.constants;
      return `
        Resurrects all fallen allies. Heals all allies to full hp<br />
        At a cost of ${c.healthCost} health`;
    },
    constants: {
      healthCost: 1000
    },
    data: {
      duration: 0,
      totalDuration: 0,
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {
        const constants = buff.constants.constants;
        const healthBase = constants.healthCost;
        const totalHealth = healthBase;

        // Make sure we have target health
        if (caster.stats.health >= totalHealth) {
          caster.stats.health -= totalHealth;
          caster.stats.healthMax -= totalHealth;
        
          // Interface with actual battle, mutate all deadUnits into units
          actualBattle.units = actualBattle.deadUnits.concat(actualBattle.units);
          actualBattle.deadUnits = [];
          actualBattle.units.forEach((unit) => {
            unit.stats.health = unit.stats.healthMax;
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
