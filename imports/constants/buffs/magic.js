import moment from 'moment';
import { addBuff, removeBuff } from '../../battleUtils';

export const MAGIC_BUFFS = {

  /* BUFFS */

  summon_skeleton: {
    duplicateTag: 'summon_skeleton', // Used to stop duplicate buffs
    icon: 'summonSkeleton.svg',
    name: 'summon skeleton',
    description({ buff, level }) {
      const c = buff.constants;
      return `Summons a skeleton`;
    },
    constants: {
      magicPowerBase: 50,
      healthCost: 0,
      healthCostMPRatio: 0
    },
    data: {
      duration: 600,
      totalDuration: 600,
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {
        const constants = buff.constants.constants;
        const magicPowerBase = constants.magicPowerBase;
        const healthBase = constants.healthCost;
        const healthMP = constants.healthCostMPRatio * caster.stats.magicPower;
        const totalHealth = healthBase + healthMP;

        // Make sure we have target health
        if (caster.stats.health >= totalHealth) {
          caster.stats.health -= totalHealth;
          caster.stats.healthMax -= totalHealth;

          buff.data.magicPowerBase = 1 + (magicPowerBase / 100);
          target.stats.magicPower *= buff.data.magicPowerBase;
        }
      },

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
        removeBuff({ buff, target, caster, actualBattle });
      },

      onRemove({ buff, target, caster, actualBattle }) {
      }
    }
  },

  magic_wisdom: {
    duplicateTag: 'magic_wisdom', // Used to stop duplicate buffs
    icon: 'magicWisdom.svg',
    name: 'magic wisdom',
    description({ buff, level }) {
      const c = buff.constants;
      return `
        Increases your magic power by ${c.magicPowerBase}% <br />
        Lasts for ${buff.data.totalDuration}s`;
    },
    constants: {
      magicPowerBase: 50,
      healthCost: 0,
      healthCostMPRatio: 0
    },
    data: {
      duration: 600,
      totalDuration: 600,
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {
        const constants = buff.constants.constants;
        const magicPowerBase = constants.magicPowerBase;
        const healthBase = constants.healthCost;
        const healthMP = constants.healthCostMPRatio * caster.stats.magicPower;
        const totalHealth = healthBase + healthMP;

        // Make sure we have target health
        if (caster.stats.health >= totalHealth) {
          caster.stats.health -= totalHealth;
          caster.stats.healthMax -= totalHealth;

          buff.data.magicPowerBase = 1 + (magicPowerBase / 100);
          target.stats.magicPower *= buff.data.magicPowerBase;
        }
      },

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
        buff.duration -= secondsElapsed;

        if (buff.duration < 0) {
          removeBuff({ buff, target, caster, actualBattle });
        }
      },

      onRemove({ buff, target, caster, actualBattle }) {
        target.stats.magicPower /= buff.data.magicPowerBase;
      }
    }
  },

  furied_winds: {
    duplicateTag: 'furied_winds', // Used to stop duplicate buffs
    icon: 'furiedWinds.svg',
    name: 'furied winds',
    description({ buff, level }) {
      const c = buff.constants;
      return `
        Increases targets attack speed by ${c.attackSpeedBase}% + (${Math.round(c.attackSpeedMPRatio * 100)}% of MP). <br />
        For ${c.attacksCount} auto attacks. <br />
        At a cost of ${c.healthCost} + (${Math.round(c.healthCostMPRatio * 100)}% of MP) health. `;
    },
    constants: {
      attacksCount: 10,
      attackSpeedBase: 25,
      attackSpeedMPRatio: 0.6,
      healthCost: 10,
      healthCostMPRatio: 0.1
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

          target.stats.attackSpeed *= buff.data.totalAttackSpeedDecimal;
          buff.stacks = constants.attacksCount + 0;
        } else {
          buff.stacks = 0;
        }
      },

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
      },

      onDidDamage({ buff, defender, attacker, actualBattle }) {
        buff.stacks -= 1;

        if (buff.stacks <= 0) {
          removeBuff({ buff, target: attacker, caster: attacker, actualBattle });
        }
      },

      onRemove({ buff, target, caster, actualBattle }) {
        if (buff.data.totalAttackSpeedDecimal) {
          target.stats.attackSpeed /= buff.data.totalAttackSpeedDecimal;
        }
      }
    }
  },

  frenzied_winds: {
    duplicateTag: 'frenzied_winds', // Used to stop duplicate buffs
    icon: 'frenziedWinds.svg',
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
      healthCost: 15,
      healthCostMPRatio: 0.2
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
          caster.stats.attackSpeed /= buff.data.totalAttackSpeedDecimal;
        }
      },

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
        buff.duration -= secondsElapsed;

        if (buff.duration < 0) {
          removeBuff({ buff, target, caster, actualBattle });
        }
      },

      onRemove({ buff, target, caster, actualBattle }) {
        if (buff.data.totalAttackSpeedDecimal) {
          target.stats.attackSpeed /= buff.data.totalAttackSpeedDecimal;
        }

        // Find original caster
        let originalCaster = actualBattle.allUnitsMap[buff.data.originalCaster];

        if (originalCaster) {
          originalCaster.stats.attackSpeed *= buff.data.totalAttackSpeedDecimal;
        }
      }
    }
  },

  lightning_speed: {
    duplicateTag: 'lightning_speed', // Used to stop duplicate buffs
    icon: 'lightningSpeed.svg',
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
        }
      },

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
        buff.duration -= secondsElapsed;

        if (buff.duration < 0) {
          removeBuff({ buff, target, caster, actualBattle });
        }
      },

      onRemove({ buff, target, caster, actualBattle }) {
        if (buff.data.totalAttackSpeedDecimal) {
          target.stats.attackSpeed /= buff.data.totalAttackSpeedDecimal;
        }
      }
    }
  },

  mud_armor: {
    duplicateTag: 'mud_armor', // Used to stop duplicate buffs
    icon: 'mudArmor.svg',
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
      healthCost: 15,
      healthCostMPRatio: 0.25
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
        buff.duration -= secondsElapsed;

        if (buff.duration < 0) {
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
    icon: 'elementalShield.svg',
    name: 'elemental shield',
    description({ buff, level }) {
      const c = buff.constants;
      return `
        Apply a (${c.baseShield} + ${Math.round(c.shieldMPRatio * 100)}%MP) health shield to the target. <br />
        Target gains ${c.damageBase}% damage while the shield is active. <br />
        At a cost of ${c.healthCost} + (${Math.round(c.healthCostMPRatio * 100)}% of MP) health. `;
    },
    constants: {
      damageBase: 25,
      baseShield: 50,
      shieldMPRatio: 0.7,
      healthCost: 50,
      healthCostMPRatio: 0.3
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
        const damageDecimal = (constants.damageBase / 100);
        const healthBase = constants.healthCost;
        const healthMP = constants.healthCostMPRatio * caster.stats.magicPower;
        const totalHealth = healthBase + healthMP;

        // Make sure we have target health
        if (caster.stats.health >= totalHealth) {
          caster.stats.health -= totalHealth;
          caster.stats.healthMax -= totalHealth;

          buff.data.damageDecimal = damageDecimal;
          buff.data.shieldHp = totalShield;
          buff.data.attack = target.stats.attack * buff.data.damageDecimal;
          buff.data.attackMax = target.stats.attackMax * buff.data.damageDecimal;
          target.stats.attack += buff.data.attack;
          target.stats.attackMax += buff.data.attackMax;
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
          target.stats.attack -= buff.data.attack;
          target.stats.attackMax -= buff.data.attackMax;
        }
      }
    }
  },

  diamond_skin: {
    duplicateTag: 'diamond_skin', // Used to stop duplicate buffs
    icon: 'diamondSkin.svg',
    name: 'diamond skin',
    description({ buff, level }) {
      const c = buff.constants;
      return `
        Apply a (${c.baseShield} + ${Math.round(c.shieldMPRatio * 100)}%MP) health shield to the target. <br />
        Target gains ${c.damageBase}% damage while the shield is active. <br />
        At a cost of ${c.healthCost} + (${Math.round(c.healthCostMPRatio * 100)}% of MP) health per target. `;
    },
    constants: {
      damageBase: 25,
      baseShield: 500,
      shieldMPRatio: 2,
      healthCost: 150,
      healthCostMPRatio: 0.15
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
        const damageDecimal = (constants.damageBase / 100);
        const healthBase = constants.healthCost;
        const healthMP = constants.healthCostMPRatio * caster.stats.magicPower;
        const totalHealth = healthBase + healthMP;

        // Make sure we have target health
        if (caster.stats.health >= totalHealth) {
          caster.stats.health -= totalHealth;
          caster.stats.healthMax -= totalHealth;

          buff.data.damageDecimal = damageDecimal;
          buff.data.shieldHp = totalShield;
          buff.data.attack = target.stats.attack * buff.data.damageDecimal;
          buff.data.attackMax = target.stats.attackMax * buff.data.damageDecimal;
          target.stats.attack += buff.data.attack;
          target.stats.attackMax += buff.data.attackMax;
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
          target.stats.attack -= buff.data.attack;
          target.stats.attackMax -= buff.data.attackMax;
        }
      }
    }
  },

  feeding_frenzy: {
    duplicateTag: 'feeding_frenzy', // Used to stop duplicate buffs
    icon: 'feedingFrenzy.svg',
    name: 'feeding frenzy',
    description({ buff, level }) {
      const c = buff.constants;
      return `
        Increases all ally attack damage and attack speed by ${c.increaseBase}% + (${Math.round(c.increaseMPRatio * 100)}% of MP). <br />
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

          buff.data.increaseDecimal = (totalIncrease / 100);
          target.stats.attackSpeed *= (1 + buff.data.increaseDecimal);
          buff.data.attack = target.stats.attack * buff.data.increaseDecimal;
          buff.data.attackMax = target.stats.attack * buff.data.increaseDecimal;
          target.stats.attack += buff.data.attack;
          target.stats.attackMax += buff.data.attackMax;
        }
      },

      onTick({ buff, target, caster, secondsElapsed }) {
        buff.duration -= secondsElapsed;

        if (buff.duration < 0) {
          removeBuff({ buff, target, caster });
        }
      },

      onRemove({ buff, target, caster }) {
        if (buff.data.increaseDecimal) {
          target.stats.attackSpeed /= (1 + buff.data.increaseDecimal);
          target.stats.attack -= buff.data.attack;
          target.stats.attackMax -= buff.data.attackMax;
        }
      }
    }
  },

  /* HEALING */

  water_wave: {
    duplicateTag: 'water_wave', // Used to stop duplicate buffs
    icon: 'waterWave.svg',
    name: 'water wave',
    description({ buff, level }) {
      const c = buff.constants;
      return `
        Heals all allies for ${c.healBase} + (${Math.round(c.healMPRatio * 100)}% of MP). <br />
        At a cost of ${c.healthCost} + (${Math.round(c.healthCostMPRatio * 100)}% of MP) health per ally`;
    },
    constants: {
      healBase: 15,
      healMPRatio: 1.1,
      healthCost: 2,
      healthCostMPRatio: 0.1
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
        
          actualBattle.healTarget(totalHeal, {
            caster,
            target,
            tickEvents: actualBattle.tickEvents,
            historyStats: actualBattle.historyStats
          });
        }
      },

      onTick({ buff, target, caster }) {
        removeBuff({ buff, target, caster });
      },

      onRemove() {}
    }
  },

  healing_shield: {
    duplicateTag: 'healing_shield', // Used to stop duplicate buffs
    icon: 'healingShield.svg',
    name: 'healing shield',
    description({ buff, level }) {
      const c = buff.constants;
      return `
        Heals target for ${c.healBase} + (${Math.round(c.healMPRatio * 100)}% of MP). <br />
        Increases targets armor by 20 + (${Math.round(c.armorMPRatio * 100)}% of MP) for ${c.duration}s. <br />
        At a cost of ${c.healthCost} + (${Math.round(c.healthCostMPRatio * 100)}% of MP) health`;
    },
    constants: {
      healBase: 3,
      healMPRatio: 1.2,
      duration: 15,
      armorBase: 20,
      armorMPRatio: 0.7,
      healthCost: 5,
      healthCostMPRatio: 0.15
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
        
          actualBattle.healTarget(totalHeal, {
            caster,
            target,
            tickEvents: actualBattle.tickEvents,
            historyStats: actualBattle.historyStats
          });

          // Total Armor
          const totalArmor = constants.armorBase + (constants.armorMPRatio * caster.stats.magicPower);
          target.stats.armor += totalArmor;
          buff.data.totalArmor = totalArmor;
          buff.duration = constants.duration + 0;
          buff.data.totalDuration = constants.duration + 0;
        }
      },

      onTick({ buff, target, caster, secondsElapsed }) {
        buff.duration -= secondsElapsed;

        if (buff.duration < 0) {
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

  water_dart: {
    duplicateTag: 'water_dart', // Used to stop duplicate buffs
    icon: 'waterDart.svg',
    name: 'water dart',
    description({ buff, level }) {
      const c = buff.constants;
      return `
        Heals target for ${c.healBase} + (${Math.round(c.healMPRatio * 100)}% of MP). <br />
        At a cost of ${c.healthCost} + (${Math.round(c.healthCostMPRatio * 100)}% of MP) health`;
    },
    constants: {
      healBase: 3,
      healMPRatio: 1,
      healthCost: 5,
      healthCostMPRatio: 0.15
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
        
          actualBattle.healTarget(totalHeal, {
            caster,
            target,
            tickEvents: actualBattle.tickEvents,
            historyStats: actualBattle.historyStats
          });
        }
      },

      onTick({ buff, target, caster }) {
        removeBuff({ buff, target, caster });
      },

      onRemove() {}
    }
  },

  water_ball: {
    duplicateTag: 'water_ball', // Used to stop duplicate buffs
    icon: 'waterBall.svg',
    name: 'water ball',
    description({ buff, level }) {
      const c = buff.constants;
      return `
        Heals target for ${c.healBase} + (${Math.round(c.healMPRatio * 100)}% of MP). <br />
        At a cost of ${c.healthCost} + (${Math.round(c.healthCostMPRatio * 100)}% of MP) health`;
    },
    constants: {
      healBase: 10,
      healMPRatio: 1.25,
      healthCost: 10,
      healthCostMPRatio: 0.13
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
        
          actualBattle.healTarget(totalHeal, {
            caster,
            target,
            tickEvents: actualBattle.tickEvents,
            historyStats: actualBattle.historyStats
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
    icon: 'angelsTouch.svg',
    name: 'angels touch',
    description({ buff, level }) {
      const c = buff.constants;
      return `
        Heals target for ${c.healBase} + (${Math.round(c.healMPRatio * 100)}% of MP). <br />
        At a cost of ${c.healthCost} + (${Math.round(c.healthCostMPRatio * 100)}% of MP) health`;
    },
    constants: {
      healBase: 50,
      healMPRatio: 4,
      healthCost: 50,
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
        
          actualBattle.healTarget(totalHeal, {
            caster,
            target,
            tickEvents: actualBattle.tickEvents,
            historyStats: actualBattle.historyStats
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
    icon: 'mendingWater.svg',
    name: 'mending water',
    description({ buff, level }) {
      const c = buff.constants;
      return `
        Heals target for ${c.healBase} + (${Math.round(c.healMPRatio * 100)}% of MP) every 4 seconds. <br />
        At a cost of ${c.healthCost} + (${Math.round(c.healthCostMPRatio * 100)}% of MP) health. <br />
        Lasts for ${buff.data.totalDuration}s`;
    },
    constants: {
      healBase: 2,
      healMPRatio: 0.5,
      healthCost: 25,
      healthCostMPRatio: 0.3
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
          buff.data.healingPower = caster.stats.healingPower;
          buff.data.sourceId = caster.id;
          actualBattle.healTarget(buff.data.totalHeal, {
            caster,
            target,
            tickEvents: actualBattle.tickEvents,
            historyStats: actualBattle.historyStats
          });
          buff.data.timeTillHeal = 4;
        }
      },

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
        buff.duration -= secondsElapsed;
        buff.data.timeTillHeal -= secondsElapsed;

        if (buff.data.timeTillHeal <= 0) {
          actualBattle.healTarget(buff.data.totalHeal * (1 + (buff.data.healingPower / 100)), {
            caster: actualBattle.allUnitsMap[buff.data.sourceId],
            target,
            tickEvents: actualBattle.tickEvents,
            historyStats: actualBattle.historyStats
          });
          buff.data.timeTillHeal = 4;
        }

        if (buff.duration < 0) {
          removeBuff({ buff, target, caster });
        }
      },

      onRemove() {}
    }
  },

  mending_spring: {
    duplicateTag: 'mending_spring', // Used to stop duplicate buffs
    icon: 'mendingSpring.svg',
    name: 'mending spring',
    description({ buff, level }) {
      const c = buff.constants;
      return `
        Heals all allies for ${c.healBase} + (${Math.round(c.healMPRatio * 100)}% of MP) every 4 seconds. <br />
        At a cost of ${c.healthCost} + (${Math.round(c.healthCostMPRatio * 100)}% of MP) health per ally. <br />
        Lasts for ${buff.data.totalDuration}s`;
    },
    constants: {
      healBase: 2,
      healMPRatio: 0.25,
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
          buff.data.healingPower = caster.stats.healingPower;
          buff.data.sourceId = caster.id;
          actualBattle.healTarget(buff.data.totalHeal, {
            caster,
            target,
            tickEvents: actualBattle.tickEvents,
            historyStats: actualBattle.historyStats
          });
          buff.data.timeTillHeal = 4;
        }
      },

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
        buff.duration -= secondsElapsed;
        buff.data.timeTillHeal -= secondsElapsed;

        if (buff.data.timeTillHeal <= 0) {
          actualBattle.healTarget(buff.data.totalHeal * (1 + (buff.data.healingPower / 100)), {
            caster: actualBattle.allUnitsMap[buff.data.sourceId],
            target,
            tickEvents: actualBattle.tickEvents,
            historyStats: actualBattle.historyStats
          });
          buff.data.timeTillHeal = 4;
        }

        if (buff.duration < 0) {
          removeBuff({ buff, target, caster });
        }
      },

      onRemove() {}
    }
  },

  heavens_descent: {
    duplicateTag: 'heavens_descent', // Used to stop duplicate buffs
    icon: 'heavensDescent.svg',
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


  /* DEBUFFS */

  poison_dart: {
    duplicateTag: 'poison_dart', // Used to stop duplicate buffs
    icon: 'poisonDart.svg',
    name: 'poison dart',
    description({ buff, level }) {
      const c = buff.constants;

      return `
        Poisons the enemy dealing (${Math.round(c.damageMPRatio * 100)}% MP) damage every 5 seconds.<br />
        Lasts for ${c.totalDuration}s. <br />
        At a cost of ${c.healthCost} + (${Math.round(c.healthCostMPRatio * 100)}% of MP) health`;
    },
    constants: {
      damageMPRatio: 0.4,
      healthCost: 10,
      healthCostMPRatio: 0.5,
      totalDuration: 3 * 60
    },
    data: {
      duration: 3 * 60,
      totalDuration: 3 * 60,
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {
        const constants = buff.constants.constants;
        const magicDamageTotal = constants.damageMPRatio * caster.stats.magicPower;

        const healthBase = constants.healthCost;
        const healthMP = constants.healthCostMPRatio * caster.stats.magicPower;
        const totalHealth = healthBase + healthMP;

        // Make sure we have target health
        if (caster.stats.health >= totalHealth) {
          caster.stats.health -= totalHealth;
          caster.stats.healthMax -= totalHealth;
  
          // Add poisoned debuff to enemy
          target.addBuff({
            id: 'basic_poison',
            data: {
              duration: 180,
              totalDuration: 180,
              damage: Math.ceil(magicDamageTotal),
              icon: 'poison.svg',
              sourceId: caster.id
            }
          });
        }
        buff.duration = 0;
      },

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
        buff.duration -= secondsElapsed;

        if (buff.duration < 0) {
          removeBuff({ buff, target, caster, actualBattle });
        }
      },

      onRemove({ buff, target, caster, actualBattle }) {
        if (buff.data.totalMagicArmorReduction) {
          target.stats.magicArmor += buff.data.totalMagicArmorReduction;
          actualBattle.dealDamage(buff.data.magicDamageTotal, {
            attacker: target,
            defender: target,
            isMagic: true,
            tickEvents: actualBattle.tickEvents,
            historyStats: actualBattle.historyStats
          });
        }
      }
    }
  },

  affliction: {
    duplicateTag: 'affliction', // Used to stop duplicate buffs
    icon: 'affliction.svg',
    name: 'affliction',
    description({ buff, level }) {
      const c = buff.constants;

      return `
        Deals (${Math.round(c.damageMPRatio * 100)}% of MP) damage at the start and end of affliction. <br />
        Reduces enemy magic armor by (${c.magicArmorReductionBase} + ${Math.round(c.magicArmorReductionMPRatio * 100)}% of MP) for ${c.totalDuration}s<br />
        At a cost of ${c.healthCost} + (${Math.round(c.healthCostMPRatio * 100)}% of MP) health`;
    },
    constants: {
      magicArmorReductionBase: 35,
      magicArmorReductionMPRatio: 1.1,
      damageMPRatio: 1.5,
      healthCost: 10,
      healthCostMPRatio: 0.1,
      totalDuration: 3
    },
    data: {
      duration: 3,
      totalDuration: 3,
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {
        const constants = buff.constants.constants;
        const magicArmorReductionBase = constants.magicArmorReductionBase;
        const magicArmorReductionMP = constants.magicArmorReductionMPRatio * caster.stats.magicPower;
        const magicDamageTotal = constants.damageMPRatio * caster.stats.magicPower;
        const totalMagicArmorReduction = magicArmorReductionBase + magicArmorReductionMP;

        const healthBase = constants.healthCost;
        const healthMP = constants.healthCostMPRatio * caster.stats.magicPower;
        const totalHealth = healthBase + healthMP;

        // Make sure we have target health
        if (caster.stats.health >= totalHealth) {
          caster.stats.health -= totalHealth;
          caster.stats.healthMax -= totalHealth;
        
          buff.data.magicDamageTotal = magicDamageTotal;
          buff.data.totalMagicArmorReduction = totalMagicArmorReduction;
          buff.data.sourceId = caster.id;
          target.stats.magicArmor -= totalMagicArmorReduction;

          actualBattle.dealDamage(magicDamageTotal, {
            attacker: caster,
            defender: target,
            isMagic: true,
            tickEvents: actualBattle.tickEvents,
            historyStats: actualBattle.historyStats
          });
        } else {
          buff.data.totalMagicArmorReduction = 0;
          buff.duration = -1;
        }
      },

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
        buff.duration -= secondsElapsed;

        if (buff.duration < 0) {
          removeBuff({ buff, target, caster, actualBattle });
        }
      },

      onRemove({ buff, target, caster, actualBattle }) {
        if (buff.data.totalMagicArmorReduction) {
          target.stats.magicArmor += buff.data.totalMagicArmorReduction;
          actualBattle.dealDamage(buff.data.magicDamageTotal, {
            attacker: actualBattle.allUnitsMap[buff.data.sourceId],
            defender: target,
            isMagic: true,
            tickEvents: actualBattle.tickEvents,
            historyStats: actualBattle.historyStats
          });
        }
      }
    }
  },

  air_dart: {
    duplicateTag: 'air_dart', // Used to stop duplicate buffs
    icon: 'airDart.svg',
    name: 'air dart',
    description({ buff, level }) {
      const c = buff.constants;

      return `
        Reduces enemy armor by (${c.armorReductionBase} + ${Math.round(c.armorReductionMPRatio * 100)}% of MP) for ${c.totalDuration}s<br />
        At a cost of ${c.healthCost} + (${Math.round(c.healthCostMPRatio * 100)}% of MP) health`;
    },
    constants: {
      armorReductionBase: 2,
      armorReductionMPRatio: 1.1,
      healthCost: 3,
      healthCostMPRatio: 0.1,
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
          buff.duration = -1;
        }
      },

      onTick({ buff, target, caster, secondsElapsed }) {
        buff.duration -= secondsElapsed;

        if (buff.duration < 0) {
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

  lightning_dart: {
    duplicateTag: 'lightning_dart', // Used to stop duplicate buffs
    icon: 'lightningDart.svg',
    name: 'lightning dart',
    description({ buff, level }) {
      const c = buff.constants;

      return `
        Strikes the target with lightning, dealing (${Math.round(c.damageMPRatio * 100)}% MP) magic damage. <br />
        And reducing their armor by (${c.armorReductionBase} + ${Math.round(c.armorReductionMPRatio * 100)}% of MP) for ${c.totalDuration}s<br />
        At a cost of ${c.healthCost} + (${Math.round(c.healthCostMPRatio * 100)}% of MP) health`;
    },
    constants: {
      armorReductionBase: 2,
      armorReductionMPRatio: 0.9,
      damageMPRatio: 1.0,
      healthCost: 3,
      healthCostMPRatio: 0.1,
      totalDuration: 3
    },
    data: {
      duration: 3,
      totalDuration: 3,
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {
        const constants = buff.constants.constants;
        const armorReductionBase = constants.armorReductionBase;
        const armorReductionMP = constants.armorReductionMPRatio * caster.stats.magicPower;
        const totalArmorReduction = armorReductionBase + armorReductionMP;
        const damage = constants.damageMPRatio * caster.stats.magicPower;

        const healthBase = constants.healthCost;
        const healthMP = constants.healthCostMPRatio * caster.stats.magicPower;
        const totalHealth = healthBase + healthMP;

        // Make sure we have target health
        if (caster.stats.health >= totalHealth) {
          caster.stats.health -= totalHealth;
          caster.stats.healthMax -= totalHealth;

          actualBattle.dealDamage(damage, {
            attacker: caster,
            defender: target,
            isMagic: true,
            tickEvents: actualBattle.tickEvents,
            historyStats: actualBattle.historyStats
          });

          buff.data.totalArmorReduction = totalArmorReduction;
          target.stats.armor -= totalArmorReduction;
        } else {
          buff.data.totalArmorReduction = 0;
          buff.duration = -1;
        }
      },

      onTick({ buff, target, caster, secondsElapsed }) {
        buff.duration -= secondsElapsed;

        if (buff.duration < 0) {
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

  lightning_storm: {
    duplicateTag: 'lightning_storm', // Used to stop duplicate buffs
    icon: 'lightningStorm.svg',
    name: 'lightning storm',
    description({ buff, level }) {
      const c = buff.constants;

      return `
        Strikes all enemies with lightning, dealing (${Math.round(c.damageMPRatio * 100)}% MP) damage. <br />
        And reducing their armor by (${c.armorReductionBase} + ${Math.round(c.armorReductionMPRatio * 100)}% of MP) for ${c.totalDuration}s<br />
        At a cost of ${c.healthCost} + (${Math.round(c.healthCostMPRatio * 100)}% of MP) health per target`;
    },
    constants: {
      armorReductionBase: 2,
      armorReductionMPRatio: 0.8,
      damageMPRatio: 0.2,
      healthCost: 10,
      healthCostMPRatio: 0.15,
      totalDuration: 9
    },
    data: {
      duration: 9,
      totalDuration: 9,
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {
        const constants = buff.constants.constants;
        const armorReductionBase = constants.armorReductionBase;
        const armorReductionMP = constants.armorReductionMPRatio * caster.stats.magicPower;
        const totalArmorReduction = armorReductionBase + armorReductionMP;
        const damage = constants.damageMPRatio * caster.stats.magicPower;

        const healthBase = constants.healthCost;
        const healthMP = constants.healthCostMPRatio * caster.stats.magicPower;
        const totalHealth = healthBase + healthMP;

        // Make sure we have target health
        if (caster.stats.health >= totalHealth) {
          caster.stats.health -= totalHealth;
          caster.stats.healthMax -= totalHealth;

          actualBattle.dealDamage(damage, {
            attacker: caster,
            defender: target,
            isMagic: true,
            tickEvents: actualBattle.tickEvents,
            historyStats: actualBattle.historyStats
          });

          buff.data.totalArmorReduction = totalArmorReduction;
          target.stats.armor -= totalArmorReduction;
        } else {
          buff.data.totalArmorReduction = 0;
          buff.duration = -1;
        }
      },

      onTick({ buff, target, caster, secondsElapsed }) {
        buff.duration -= secondsElapsed;

        if (buff.duration < 0) {
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

  air_ball: {
    duplicateTag: 'air_ball', // Used to stop duplicate buffs
    icon: 'airBall.svg',
    name: 'air ball',
    description({ buff, level }) {
      const c = buff.constants;

      return `
        Reduces enemy armor by (${c.armorReductionBase} + ${Math.round(c.armorReductionMPRatio * 100)}% of MP) for ${c.totalDuration}s<br />
        At a cost of ${c.healthCost} + (${Math.round(c.healthCostMPRatio * 100)}% of MP) health`;
    },
    constants: {
      armorReductionBase: 10,
      armorReductionMPRatio: 1.6,
      healthCost: 10,
      healthCostMPRatio: 0.1,
      totalDuration: 7
    },
    data: {
      duration: 7,
      totalDuration: 7,
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
          buff.duration = -1;
        }
      },

      onTick({ buff, target, caster, secondsElapsed }) {
        buff.duration -= secondsElapsed;

        if (buff.duration < 0) {
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

  blizzard: {
    duplicateTag: 'blizzard', // Used to stop duplicate buffs
    icon: 'blizzard.svg',
    name: 'blizzard',
    description({ buff, level }) {
      const c = buff.constants;

      return `
        Freezes all enemies, dealing (${Math.round(c.damageMPRatio * 100)}% MP) damage <br />
        And slowing attack speed by ${Math.round(c.attackSpeedDecrease * 100)}%. <br />
        Lasts for ${c.totalDuration}s. <br />
        At a cost of ${c.healthCost} + (${Math.round(c.healthCostMPRatio * 100)}% of MP) health`;
    },
    constants: {
      damageMPRatio: 0.2,
      attackSpeedDecrease: 0.25,
      healthCost: 5,
      healthCostMPRatio: 0.1,
      totalDuration: 10
    },
    data: {
      duration: 10,
      totalDuration: 10,
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {
        const constants = buff.constants.constants;
        const damage = constants.damageMPRatio * caster.stats.magicPower;

        const healthBase = constants.healthCost;
        const healthMP = constants.healthCostMPRatio * caster.stats.magicPower;
        const totalHealth = healthBase + healthMP;

        // Make sure we have target health
        if (caster.stats.health >= totalHealth) {
          caster.stats.health -= totalHealth;
          caster.stats.healthMax -= totalHealth;
        
          actualBattle.dealDamage(damage, {
            attacker: caster,
            defender: target,
            isMagic: true,
            tickEvents: actualBattle.tickEvents,
            historyStats: actualBattle.historyStats
          });
  
          const attackSpeedDecrease = constants.attackSpeedDecrease * 100;
          const durationTotal = constants.totalDuration;

          const newBuff = {
            id: 'frosted_attacks',
            data: {
              duration: durationTotal,
              totalDuration: durationTotal,
              attackSpeedDecrease,
              icon: 'frostedAttacks.svg',
              description: `Reduces your attack speed by ${attackSpeedDecrease}%`,
              name: 'Frosted Attacks'
            }
          };

          addBuff({ buff: newBuff, target, caster });

        }

        buff.duration = -1;
      },

      onTick({ buff, target, caster, secondsElapsed }) {
        buff.duration -= secondsElapsed;

        if (buff.duration < 0) {
          removeBuff({ buff, target, caster });
        }
      },

      onRemove({ buff, target, caster }) {
      }
    }
  },

  ice_dart: {
    duplicateTag: 'ice_dart', // Used to stop duplicate buffs
    icon: 'iceDart.svg',
    name: 'ice dart',
    description({ buff, level }) {
      const c = buff.constants;

      return `
        Freezes current target, dealing (${Math.round(c.damageMPRatio * 100)}% MP) magic damage <br />
        And slowing attack speed by ${Math.round(c.attackSpeedDecrease * 100)}%. <br />
        Lasts for ${c.totalDuration}s. <br />
        At a cost of ${c.healthCost} + (${Math.round(c.healthCostMPRatio * 100)}% of MP) health`;
    },
    constants: {
      damageMPRatio: 1.0,
      attackSpeedDecrease: 0.15,
      healthCost: 5,
      healthCostMPRatio: 0.2,
      totalDuration: 3
    },
    data: {
      duration: 3,
      totalDuration: 3,
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {
        const constants = buff.constants.constants;
        const damage = constants.damageMPRatio * caster.stats.magicPower;

        const healthBase = constants.healthCost;
        const healthMP = constants.healthCostMPRatio * caster.stats.magicPower;
        const totalHealth = healthBase + healthMP;

        // Make sure we have target health
        if (caster.stats.health >= totalHealth) {
          caster.stats.health -= totalHealth;
          caster.stats.healthMax -= totalHealth;
        
          actualBattle.dealDamage(damage, {
            attacker: caster,
            defender: target,
            isMagic: true,
            tickEvents: actualBattle.tickEvents,
            historyStats: actualBattle.historyStats
          });
  
          const attackSpeedDecrease = constants.attackSpeedDecrease * 100;
          const durationTotal = constants.totalDuration;

          const newBuff = {
            id: 'frosted_attacks',
            data: {
              duration: durationTotal,
              totalDuration: durationTotal,
              attackSpeedDecrease,
              icon: 'frostedAttacks.svg',
              description: `Reduces your attack speed by ${attackSpeedDecrease}%`,
              name: 'Frosted Attacks'
            }
          };

          addBuff({ buff: newBuff, target, caster });

        }

        buff.duration = -1;
      },

      onTick({ buff, target, caster, secondsElapsed }) {
        buff.duration -= secondsElapsed;

        if (buff.duration < 0) {
          removeBuff({ buff, target, caster });
        }
      },

      onRemove({ buff, target, caster }) {
      }
    }
  },


  /* OFFENSIVE BUFFS */

  earth_dart: {
    duplicateTag: 'earth_dart', // Used to stop duplicate buffs
    icon: 'earthDart.svg',
    name: 'earth dart',
    description({ buff, level }) {
      const c = buff.constants;
      return `
        Deals ${c.damageBase} + (${Math.round(c.damageMPRatio * 100)}% of MP) as physical damage. <br />
        At a cost of ${c.healthCost} + (${Math.round(c.healthCostMPRatio * 100)}% of MP) health`;
    },
    constants: {
      damageBase: 2,
      damageMPRatio: 1.1,
      healthCost: 2,
      healthCostMPRatio: 0.2
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
        
          actualBattle.dealDamage(totalDamage, {
            attacker: caster,
            defender: target,
            tickEvents: actualBattle.tickEvents,
            historyStats: actualBattle.historyStats
          });
        }
      },

      onTick({ buff, target, caster }) {
        removeBuff({ buff, target, caster });
      },

      onRemove() {}
    }
  },

  earth_ball: {
    duplicateTag: 'earth_ball', // Used to stop duplicate buffs
    icon: 'earthBall.svg',
    name: 'earth ball',
    description({ buff, level }) {
      const c = buff.constants;
      return `
        Deals ${c.damageBase} + (${Math.round(c.damageMPRatio * 100)}% of MP) as physical damage. <br />
        At a cost of ${c.healthCost} + (${Math.round(c.healthCostMPRatio * 100)}% of MP) health`;
    },
    constants: {
      damageBase: 10,
      damageMPRatio: 2.0,
      healthCost: 2,
      healthCostMPRatio: 0.15
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
        
          actualBattle.dealDamage(totalDamage, {
            attacker: caster,
            defender: target,
            tickEvents: actualBattle.tickEvents,
            historyStats: actualBattle.historyStats
          });
        }
      },

      onTick({ buff, target, caster }) {
        removeBuff({ buff, target, caster });
      },

      onRemove() {}
    }
  },

  earthen_fist: {
    duplicateTag: 'earthen_fist', // Used to stop duplicate buffs
    icon: 'earthenFist.svg',
    name: 'earthen fist',
    description({ buff, level }) {
      const c = buff.constants;

      return `
        Strikes the target with earth, dealing (${Math.round(c.damageMPRatio * 100)}% MP) damage. <br />
        And stunning them for ${c.totalDuration}s. <br />
        At a cost of ${c.healthCost} + (${Math.round(c.healthCostMPRatio * 100)}% of MP) health`;
    },
    constants: {
      damageMPRatio: 1,
      healthCost: 3,
      healthCostMPRatio: 0.1,
      totalDuration: 3
    },
    data: {
      duration: 3,
      totalDuration: 3,
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {
        const constants = buff.constants.constants;
        const damage = constants.damageMPRatio * caster.stats.magicPower;

        const healthBase = constants.healthCost;
        const healthMP = constants.healthCostMPRatio * caster.stats.magicPower;
        const totalHealth = healthBase + healthMP;

        // Make sure we have target health
        if (caster.stats.health >= totalHealth) {
          caster.stats.health -= totalHealth;
          caster.stats.healthMax -= totalHealth;

          actualBattle.dealDamage(damage, {
            attacker: caster,
            defender: target,
            isMagic: true,
            tickEvents: actualBattle.tickEvents,
            historyStats: actualBattle.historyStats
          });

          buff.data.attackSpeedDecrease = 99;
          target.stats.attackSpeed *= (1 - (buff.data.attackSpeedDecrease / 100));
        } else {
          buff.data.attackSpeedDecrease = 0;
          buff.duration = -1;
        }
      },

      onTick({ buff, target, caster, secondsElapsed }) {
        buff.duration -= secondsElapsed;

        if (buff.duration < 0) {
          removeBuff({ buff, target, caster });
        }
      },

      onRemove({ buff, target, caster }) {
        if (buff.data.attackSpeedDecrease) {
          // Mutate targets attack speed
          target.stats.attackSpeed /= (1 - (buff.data.attackSpeedDecrease / 100));
        }
      }
    }
  },

  // for reference, old ignite
  /*
  ignite__old: {
    duplicateTag: 'ignite', // Used to stop duplicate buffs
    icon: 'ignite.svg',
    name: 'ignite',
    description({ buff, level }) {
      const c = buff.constants;
      return `
        Damages target for ${c.damageBase} + (${Math.round(c.damageMPRatio * 100)}% of MP) every second. <br />
        At a cost of ${c.healthCost} + (${Math.round(c.healthCostMPRatio * 100)}% of MP) health. <br />
        Lasts for ${buff.data.totalDuration}s`;
    },
    constants: {
      damageBase: 1,
      damageMPRatio: 0.4,
      healthCost: 5,
      healthCostMPRatio: 0.1
    },
    data: {
      allowDuplicates: true,
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
        
          buff.data.sourceId = caster.id;
          buff.data.totalDamage = totalDamage;
          actualBattle.dealDamage(buff.data.totalDamage, {
            attacker: caster,
            defender: target,
            isMagic: true,
            tickEvents: actualBattle.tickEvents,
            historyStats: actualBattle.historyStats
          });
          buff.data.timeTillDamage = 1;
        }
      },

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
        buff.duration -= secondsElapsed;
        buff.data.timeTillDamage -= secondsElapsed;

        if (buff.data.timeTillDamage <= 0) {
          actualBattle.dealDamage(buff.data.totalDamage, {
            attacker: actualBattle.allUnitsMap[buff.data.sourceId],
            defender: target,
            isMagic: true,
            tickEvents: actualBattle.tickEvents,
            historyStats: actualBattle.historyStats
          });
          buff.data.timeTillDamage = 1;
        }

        if (buff.duration < 0) {
          removeBuff({ buff, target, caster });
        }
      },

      onRemove() {}
    }
  },
  */
  
  ignite: {
    duplicateTag: 'ignite', // Used to stop duplicate buffs
    icon: 'ignite.svg',
    name: 'ignite',
    description({ buff, level }) {
      const c = buff.constants;
      return `
        Damages target for ${c.damageBase} + (${Math.round(c.damageMPRatio * 100)}% of MP) every second. <br />
        At a cost of ${c.healthCost} + (${Math.round(c.healthCostMPRatio * 100)}% of MP) health. <br />
        Lasts for ${buff.data.totalDuration}s`;
    },
    constants: {
      damageBase: 1,
      damageMPRatio: 0.4,
      healthCost: 5,
      healthCostMPRatio: 0.1
    },
    data: {
      allowDuplicates: true,
      duration: 25,
      totalDuration: 25,
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {
        buff.data.endDate = moment().toDate();
        buff.data.timeTillDamage = 0;
        buff.data.caster = caster.id;
        buff.data.totalDuration = 0;
        buff.data.duration = -1;

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
        
          const newBuff = {
            id: 'ignite_proper',
            data: {
              duration: 25,
              totalDuration: 25,
              totalDamage: totalDamage,
              sourceId: caster.id,
              caster: caster.id,
              timeTillDamage: 0,
              allowDuplicates: true,
              icon: 'ignite.svg',
              name: 'ignite',
              duplicateTag: 'ignite_proper'
            }
          };
          
          // Add ignite debuff
          addBuff({ buff: newBuff, target: target, caster: caster });
        }
        
        // remove stub debuff
        removeBuff({ target, buff, caster })
      },

      onTick({ secondsElapsed, buff, target, actualBattle }) {
        // remove stub debuff
        const caster = actualBattle.allUnitsMap[buff.data.caster];

        removeBuff({ target, buff, caster })
      },

      onRemove() {
      }
    }
  },
  
  ignite_proper: {
    duplicateTag: 'ignite_proper', // Used to stop duplicate buffs
    icon: 'ignite.svg',
    name: 'ignite',
    description({ buff, level }) {
      return ``;
    },
    constants: {
    },
    data: {
      duration: 25,
      totalDuration: 25
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {
        //todo: fix 'actualBattle' isn't being passed in for onApply
      },

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
        buff.duration -= secondsElapsed;
        buff.data.timeTillDamage -= secondsElapsed;

        if (buff.data.timeTillDamage <= 0) {
          actualBattle.dealDamage(buff.data.totalDamage, {
            attacker: actualBattle.allUnitsMap[buff.data.sourceId],
            defender: target,
            isMagic: true,
            tickEvents: actualBattle.tickEvents,
            historyStats: actualBattle.historyStats
          });
          buff.data.timeTillDamage = 1;
        }

        if (buff.duration < 0) {
          removeBuff({ buff, target, caster });
        }
      },

      onRemove() {}
    }
  },
  
  // phoenix hat gets its own version so it doesn't conflict with the different duration of ignite_proper
  // this seems peculiar as they can have their own durations individually and dynamically set, but when a new
  // effect is applied, the combat node is resetting the duration to the max duration of the new buff if it's
  // exceeded... I don't see where this is happening, so I'm creating a separate buff for phoenix hat ignite... for now
  ignite_phoenix_hat: {
    duplicateTag: 'ignite_phoenix_hat', // Used to stop duplicate buffs
    icon: 'ignite.svg',
    name: 'ignite',
    description({ buff, level }) {
      const c = buff.constants;
      return `
        Damages target for ${c.damageBase} + (${Math.round(c.damageMPRatio * 100)}% of MP) every second. <br />
        At a cost of ${c.healthCost} + (${Math.round(c.healthCostMPRatio * 100)}% of MP) health. <br />
        Lasts for ${buff.data.totalDuration}s`;
    },
    constants: {
      damageBase: 1,
      damageMPRatio: 0.4,
      healthCost: 5,
      healthCostMPRatio: 0.1
    },
    data: {
      allowDuplicates: true,
      duration: 25,
      totalDuration: 25,
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {
        buff.data.endDate = moment().toDate();
        buff.data.timeTillDamage = 0;
        buff.data.caster = caster.id;
        buff.data.totalDuration = 0;
        buff.data.duration = -1;

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
        
          const newBuff = {
            id: 'ignite_proper_phoenix_hat',
            data: {
              duration: 15,
              totalDuration: 15,
              totalDamage: totalDamage,
              sourceId: caster.id,
              caster: caster.id,
              timeTillDamage: 0,
              allowDuplicates: true,
              icon: 'ignite.svg',
              name: 'ignite',
              duplicateTag: 'ignite_proper_phoenix_hat'
            }
          };
          
          // Add ignite debuff
          addBuff({ buff: newBuff, target: target, caster: caster });
        }
        
        // remove stub debuff
        removeBuff({ target, buff, caster })
      },

      onTick({ secondsElapsed, buff, target, actualBattle }) {
        // remove stub debuff
        const caster = actualBattle.allUnitsMap[buff.data.caster];

        removeBuff({ target, buff, caster })
      },

      onRemove() {
      }
    }
  },
  

  ignite_proper_phoenix_hat: {
    duplicateTag: 'ignite_proper_phoenix_hat', // Used to stop duplicate buffs
    icon: 'ignite.svg',
    name: 'ignite',
    description({ buff, level }) {
      return ``;
    },
    constants: {
    },
    data: {
      duration: 15,
      totalDuration: 15,
      allowDuplicates: true,
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {
        //todo: fix 'actualBattle' isn't being passed in for onApply
      },

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
        buff.duration -= secondsElapsed;
        buff.data.timeTillDamage -= secondsElapsed;

        if (buff.data.timeTillDamage <= 0) {
          actualBattle.dealDamage(buff.data.totalDamage, {
            attacker: actualBattle.allUnitsMap[buff.data.sourceId],
            defender: target,
            isMagic: true,
            tickEvents: actualBattle.tickEvents,
            historyStats: actualBattle.historyStats
          });
          buff.data.timeTillDamage = 1;
        }

        if (buff.duration < 0) {
          removeBuff({ buff, target, caster });
        }
      },

      onRemove() {}
    }
  },
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  inferno: {
    duplicateTag: 'inferno', // Used to stop duplicate buffs
    icon: 'inferno.svg',
    name: 'inferno',
    description({ buff, level }) {
      const c = buff.constants;
      return `
        Damages all enemies for ${c.damageBase} + (${Math.round(c.damageMPRatio * 100)}% of MP) twice a second. <br />
        At a cost of ${c.healthCost} + (${Math.round(c.healthCostMPRatio * 100)}% of MP) health per target. <br />
        Lasts for ${buff.data.totalDuration}s`;
    },
    constants: {
      damageBase: 7,
      damageMPRatio: 0.1,
      healthCost: 20,
      healthCostMPRatio: 0.1
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
          buff.data.sourceId = caster.id;
          actualBattle.dealDamage(buff.data.totalDamage, {
            attacker: caster,
            defender: target,
            isMagic: true,
            tickEvents: actualBattle.tickEvents,
            historyStats: actualBattle.historyStats
          });
          buff.data.timeTillDamage = 0.5;
        }
      },

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
        buff.duration -= secondsElapsed;
        buff.data.timeTillDamage -= secondsElapsed;

        if (buff.data.timeTillDamage <= 0) {
          actualBattle.dealDamage(buff.data.totalDamage, {
            attacker: actualBattle.allUnitsMap[buff.data.sourceId],
            defender: target,
            isMagic: true,
            tickEvents: actualBattle.tickEvents,
            historyStats: actualBattle.historyStats
          });
          buff.data.timeTillDamage = 0.5;
        }

        if (buff.duration < 0) {
          removeBuff({ buff, target, caster });
        }
      },

      onRemove() {}
    }
  },

  fire_wave: {
    duplicateTag: 'fire_wave', // Used to stop duplicate buffs
    icon: 'fireWave.svg',
    name: 'fire wave',
    description({ buff, level }) {
      const c = buff.constants;
      return `
        Deals ${c.damageBase} + (${Math.round(c.damageMPRatio * 100)}% of MP) as magic damage to all enemies. <br />
        At a cost of ${c.healthCost} + (${Math.round(c.healthCostMPRatio * 100)}% of MP) health per enemy.`;
    },
    constants: {
      damageBase: 2,
      damageMPRatio: 1.5,
      healthCost: 3,
      healthCostMPRatio: 0.1
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
        
          actualBattle.dealDamage(totalDamage, {
            attacker: caster,
            defender: target,
            isMagic: true,
            tickEvents: actualBattle.tickEvents,
            historyStats: actualBattle.historyStats
          });
        }
      },

      onTick({ buff, target, caster }) {
        removeBuff({ buff, target, caster });
      },

      onRemove() {}
    }
  },

  fire_dart: {
    duplicateTag: 'fire_dart', // Used to stop duplicate buffs
    icon: 'fireDart.svg',
    name: 'fire dart',
    description({ buff, level }) {
      const c = buff.constants;
      return `
        Deals ${c.damageBase} + (${Math.round(c.damageMPRatio * 100)}% of MP) as magic damage. <br />
        At a cost of ${c.healthCost} + (${Math.round(c.healthCostMPRatio * 100)}% of MP) health`;
    },
    constants: {
      damageBase: 2,
      damageMPRatio: 2.0,
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
        
          actualBattle.dealDamage(totalDamage, {
            attacker: caster,
            defender: target,
            isMagic: true,
            tickEvents: actualBattle.tickEvents,
            historyStats: actualBattle.historyStats
          });
        }
      },

      onTick({ buff, target, caster }) {
        removeBuff({ buff, target, caster });
      },

      onRemove() {}
    }
  },

  fire_ball: {
    duplicateTag: 'fire_ball', // Used to stop duplicate buffs
    icon: 'fireBall.svg',
    name: 'fire ball',
    description({ buff, level }) {
      const c = buff.constants;
      return `
        Deals ${c.damageBase} + (${Math.round(c.damageMPRatio * 100)}% of MP) as magic damage. <br />
        At a cost of ${c.healthCost} + (${Math.round(c.healthCostMPRatio * 100)}% of MP) health`;
    },
    constants: {
      damageBase: 20,
      damageMPRatio: 2.5,
      healthCost: 2,
      healthCostMPRatio: 0.15
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
        
          actualBattle.dealDamage(totalDamage, {
            attacker: caster,
            defender: target,
            isMagic: true,
            tickEvents: actualBattle.tickEvents,
            historyStats: actualBattle.historyStats
          });
        }
      },

      onTick({ buff, target, caster }) {
        removeBuff({ buff, target, caster });
      },

      onRemove() {}
    }
  },

  meteor_strike: {
    duplicateTag: 'meteor_strike', // Used to stop duplicate buffs
    icon: 'meteorStrike.svg',
    name: 'meteor strike',
    description({ buff, level }) {
      const c = buff.constants;
      return `
        Deals ${c.damageBase} + (${Math.round(c.damageMPRatio * 100)}% of MP) as magic damage. <br />
        At a cost of ${c.healthCost} + (${Math.round(c.healthCostMPRatio * 100)}% of MP) health`;
    },
    constants: {
      damageBase: 20,
      damageMPRatio: 8,
      healthCost: 20,
      healthCostMPRatio: 0.8
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
        
          actualBattle.dealDamage(totalDamage, {
            attacker: caster,
            defender: target,
            isMagic: true,
            tickEvents: actualBattle.tickEvents,
            historyStats: actualBattle.historyStats
          });
        }
      },

      onTick({ buff, target, caster }) {
        removeBuff({ buff, target, caster });
      },

      onRemove() {}
    }
  },

  magic_power_up: {
    duplicateTag: 'magic_power_up', // Used to stop duplicate buffs
    icon: 'magicPowerUp.svg',
    name: 'magic power up',
    description({ buff, level }) {
      const powerBase = buff.constants.powerBase;
      const powerPerLevel = buff.constants.powerPerLevel * level;
      const powerIncrease = powerBase + powerPerLevel;
      return `
        Increases magic power by ${powerIncrease}. <br />
        (+${buff.constants.powerPerLevel} magic power per lvl)`;
    },
    constants: {
      powerBase: 8,
      powerPerLevel: 6
    },
    data: {
      duration: Infinity,
      totalDuration: Infinity
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
      },

      onTick({ secondsElapsed, buff, target, caster }) {
        if (!buff.data.powerIncrease) {
          const constants = buff.constants.constants;
          const powerBase = constants.powerBase;
          const powerPerLevel = constants.powerPerLevel * buff.data.level;
          const powerIncrease = powerBase + powerPerLevel;
          buff.data.powerIncrease = powerIncrease;
          target.stats.magicPower += buff.data.powerIncrease;
        }
      },

      onRemove({ buff, target, caster }) {
        if (buff.data.powerIncrease) {
          target.stats.magicPower -= buff.data.powerIncrease;
        }
      }
    }
  },

  healing_power_up: {
    duplicateTag: 'healing_power_up', // Used to stop duplicate buffs
    icon: 'healingPowerUp.svg',
    name: 'healing power up',
    description({ buff, level }) {
      const powerBase = buff.constants.powerBase;
      const powerPerLevel = buff.constants.powerPerLevel * level;
      const powerIncrease = powerBase + powerPerLevel;
      return `
        Increases healing power by ${powerIncrease}%. <br />
        (+${buff.constants.powerPerLevel}% healing power per lvl)`;
    },
    constants: {
      powerBase: 5,
      powerPerLevel: 4
    },
    data: {
      duration: Infinity,
      totalDuration: Infinity
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
      },

      onTick({ secondsElapsed, buff, target, caster }) {
        if (!buff.data.powerIncrease) {
          const constants = buff.constants.constants;
          const powerBase = constants.powerBase;
          const powerPerLevel = constants.powerPerLevel * buff.data.level;
          const powerIncrease = powerBase + powerPerLevel;
          buff.data.powerIncrease = powerIncrease;
          target.stats.healingPower += buff.data.powerIncrease;
        }
      },

      onRemove({ buff, target, caster }) {
        if (buff.data.powerIncrease) {
          target.stats.healingPower -= buff.data.powerIncrease;
        }
      }
    }
  },
};
