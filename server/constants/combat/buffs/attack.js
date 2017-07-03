import moment from 'moment';
import { attackSpeedTicks } from '/server/utils';
import { addBuff, removeBuff } from '/server/battleUtils';

export const ATTACK_BUFFS = {

  basic_poison: {
    duplicateTag: 'basic_poison', // Used to stop duplicate buffs
    icon: 'poison',
    name: 'basic poison',
    description({ buff, level }) {
      return 'Deals poison damage over time';
    },
    constants: {
      timeTillDamage: 5,
    },
    events: {
      onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
        const constants = buff.constants.constants;
        buff.data.duration -= secondsElapsed;

        if (buff.data.timeTillDamage !== undefined) {
          buff.data.timeTillDamage -= secondsElapsed;
        } else {
          buff.data.timeTillDamage = 0;
        }

        if (buff.data.timeTillDamage <= 0) {
          buff.data.timeTillDamage = constants.timeTillDamage;
          const poisonDamage = buff.data.damage;
          actualBattle.utils.dealDamage(poisonDamage, {
            defender: target,
            tickEvents: actualBattle.tickEvents,
            customIcon: 'poison',
            customColor: '#229b00'
          });
        }

        // Blank
        if (buff.data.duration <= 0) {
          target.buffs = target.buffs.filter((targetBuff) => {
            if (targetBuff === buff) {
              return false;
            }
            return true;
          });
        }
      },

      onRemove() {

      }
    }
  },

  attack_up: {
    duplicateTag: 'attack_up', // Used to stop duplicate buffs
    icon: 'attack',
    name: 'attack up',
    description({ buff, level }) {

      const attackBase = buff.constants.attackBase;
      const attackPerLevel = buff.constants.attackPerLevel * level;
      const attackIncrease = attackBase + attackPerLevel;

      return `
        Increases attack by ${Math.round(attackIncrease * 100)}%. <br />
        (+${Math.round(buff.constants.attackPerLevel * 100)}% per lvl)<br />`;
    },
    constants: {
      attackBase: 0.05,
      attackPerLevel: 0.05
    },
    data: {
      duration: Infinity,
      totalDuration: Infinity
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
        // Blank
        const constants = buff.constants.constants;
  
        const attackBase = constants.attackBase;
        const attackPerLevel = constants.attackPerLevel * buff.data.level;
        const attackIncrease = attackBase + attackPerLevel;

        buff.data.attackIncrease = attackIncrease;
        caster.stats.attack *= (1 + buff.data.attackIncrease);
        caster.stats.attackMax *= (1 + buff.data.attackIncrease);
      },

      onTick({ secondsElapsed, buff, target, caster }) {
        // Blank
        if (buff.data.duration <= 0) {
          removeBuff({ target, buff, caster: target })
        }
      },

      onRemove({ buff, target, caster }) {
        // Blank
        caster.stats.attack /= (1 + buff.data.attackIncrease);
        caster.stats.attackMax /= (1 + buff.data.attackIncrease);
      }
    }
  },

  accuracy_up: {
    duplicateTag: 'accuracy_up', // Used to stop duplicate buffs
    icon: 'accuracy',
    name: 'accuracy up',
    description({ buff, level }) {

      const accuracyBase = buff.constants.accuracyBase;
      const accuracyPerLevel = buff.constants.accuracyPerLevel * level;
      const accuracyIncrease = accuracyBase + accuracyPerLevel;

      return `
        Increases accuracy by ${accuracyIncrease}. <br />
        (+${buff.constants.accuracyPerLevel} accuracy per lvl)<br />`;
    },
    constants: {
      accuracyBase: 2,
      accuracyPerLevel: 6
    },
    data: {
      duration: Infinity,
      totalDuration: Infinity
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
        // Blank
        const constants = buff.constants.constants;
  
        const accuracyBase = constants.accuracyBase;
        const accuracyPerLevel = constants.accuracyPerLevel * buff.data.level;
        const accuracyIncrease = accuracyBase + accuracyPerLevel;

        buff.data.accuracyIncrease = accuracyIncrease;
        caster.stats.accuracy += buff.data.accuracyIncrease;
      },

      onTick({ secondsElapsed, buff, target, caster }) {
        // Blank
        if (buff.data.duration <= 0) {
          removeBuff({ target, buff, caster: target })
        }
      },

      onRemove({ buff, target, caster }) {
        // Blank
        caster.stats.accuracy -= buff.data.accuracyIncrease;
      }
    }
  },

  vampirism: {
    duplicateTag: 'vampirism', // Used to stop duplicate buffs
    icon: 'vampirism',
    name: 'vampirism',
    description({ buff, level }) {
      const lifestealBase = buff.constants.lifestealBase;
      const lifestealPerLevel = buff.constants.lifestealPerLevel;

      const lifestealTotal = lifestealBase + (lifestealPerLevel * level);
      return `Heal for ${Math.round(lifestealTotal * 100)}% of auto attack damage.<br />
        Lasts 2 minutes.`;
    },
    constants: {
      lifestealBase: 0.04,
      lifestealPerLevel: 0.03,
    },
    data: {
      duration: 120,
      totalDuration: 120
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
        const constants = buff.constants.constants;

        const lifestealBase = constants.lifestealBase;
        const lifestealPerLevel = constants.lifestealPerLevel;
        buff.data.lifestealTotal = lifestealBase + (lifestealPerLevel * buff.data.level);
      },

      onDidDamage({ buff, defender, attacker, actualBattle, damageDealt }) {
        const totalHeal = (damageDealt * buff.data.lifestealTotal);

        actualBattle.utils.healTarget(totalHeal, {
          caster: attacker,
          target: attacker,
          tickEvents: actualBattle.tickEvents
        });
      },

      onTick({ secondsElapsed, buff, target, caster }) {
        buff.data.duration -= secondsElapsed;
        // Blank
        if (buff.data.duration <= 0) {
          target.buffs = target.buffs.filter((targetBuff) => {
            return targetBuff.id !== buff.id
          });
        }
      },

      onRemove({ buff, target, caster }) {
        // Blank
      }
    }
  },

  poisoned_blade: {
    duplicateTag: 'poisoned_blade', // Used to stop duplicate buffs
    icon: 'poisonedBlade',
    name: 'poisoned blade',
    description({ buff, level }) {
      let localLevel = JSON.parse(JSON.stringify(level));
      if (!localLevel) {
        localLevel = 1;
      }

      const chance = buff.constants.poisonChance * 100;
      const damagePerLevel = buff.constants.poisonDamagePerLevel * 100;
      const damage = (buff.constants.poisonDamageBase + buff.constants.poisonDamagePerLevel * localLevel) * 100;

      return `${chance}% chance to poison the enemy.<br />
        Deals ${damage.toFixed(1)}% damage every 5 seconds. (+${damagePerLevel}% per lvl).<br />
        Lasts 3 minutes.`;
    },
    constants: {
      poisonChance: 0.05,
      poisonDamageBase: 0.17,
      poisonDamagePerLevel: 0.03
    },
    data: {
      duration: Infinity,
      totalDuration: Infinity
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
        // Blank
      },

      onDidDamage({ buff, defender, attacker, actualBattle }) {
        const constants = buff.constants.constants;
        if (Math.random() <= constants.poisonChance) {
          const baseDamage = attacker.stats.attack;
          const extraDamage = Math.round(Math.random() * (attacker.stats.attackMax - attacker.stats.attack));
          const abilityDamagePercentage = constants.poisonDamageBase + (constants.poisonDamagePerLevel * buff.data.level);

          const totalDamage = (baseDamage + extraDamage) * abilityDamagePercentage;

          // Add poisoned debuff to enemy
          defender.buffs.push({
            id: 'basic_poison',
            data: {
              duration: 180,
              totalDuration: 180,
              damage: Math.ceil(totalDamage),
              icon: 'poison',
              sourceId: attacker.id
            }
          })
        }
      },

      onTick({ secondsElapsed, buff, target, caster }) {
        // Blank
        if (buff.data.duration <= 0) {
          target.buffs = target.buffs.filter((targetBuff) => {
            return targetBuff.id !== buff.id
          });
        }
      },

      onRemove({ buff, target, caster }) {
        // Blank
      }
    }
  },

  phantom_strikes: {
    duplicateTag: 'phantom_strikes', // Used to stop duplicate buffs
    icon: 'phantomStrikes',
    name: 'phantom strikes',
    description({ buff, level }) {
      let localLevel = JSON.parse(JSON.stringify(level));
      if (!localLevel) {
        localLevel = 1;
      }

      const chance = buff.constants.extraAttackChance * 100;
      const damagePerLevel = buff.constants.extraAttackDamagePerLevel * 100;
      const damage = (buff.constants.extraAttackDamageBase + buff.constants.extraAttackDamagePerLevel * localLevel) * 100;

      return `${chance}% chance to attack twice.<br />
        Extra attack deals ${damage}% damage (+${damagePerLevel}% per lvl) <br />`;
    },
    constants: {
      extraAttackChance: 0.1,
      extraAttackDamageBase: 0.6,
      extraAttackDamagePerLevel: 0.1
    },
    data: {
      duration: Infinity,
      totalDuration: Infinity
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
        // Blank
      },

      onDidDamage({ buff, defender, attacker, actualBattle }) {
        const constants = buff.constants.constants;
        if (Math.random() <= constants.extraAttackChance) {
          const baseDamage = attacker.stats.attack;
          const extraDamage = Math.round(Math.random() * (attacker.stats.attackMax - attacker.stats.attack));
          const abilityDamagePercentage = constants.extraAttackDamageBase + constants.extraAttackDamagePerLevel * buff.data.level;

          const totalDamage = (baseDamage + extraDamage) * abilityDamagePercentage;

          actualBattle.utils.dealDamage(totalDamage, {
            attacker,
            defender,
            tickEvents: actualBattle.tickEvents
          });
        }
      },

      onTick({ secondsElapsed, buff, target, caster }) {
        // Blank
        if (buff.data.duration <= 0) {
          target.buffs = target.buffs.filter((targetBuff) => {
            return targetBuff.id !== buff.id
          });
        }
      },

      onRemove({ buff, target, caster }) {
        // Blank
      }
    }
  },

  berserk: {
    duplicateTag: 'berserk', // Used to stop duplicate buffs
    icon: 'berserk',
    name: 'berserk',
    description({ buff, level }) {
      let localLevel = JSON.parse(JSON.stringify(level));
      if (!localLevel) {
        localLevel = 1;
      }

      const damagePerLevel = buff.constants.damagePercentageIncreasePerLevel;
      const damageTakenPerLevel = buff.constants.damageTakenPercentageIncreasePerLevel;
      const healthLostPerLevel = buff.constants.healthLostPerSecondPerLevel;

      const damageIncrease = buff.constants.damagePercentageIncreaseBase + (damagePerLevel * localLevel);
      const damageTakenIncrease = buff.constants.damageTakenPercentageIncreaseBase + (damageTakenPerLevel * localLevel);
      const healthLostPerSecond = buff.constants.healthLostPerSecondBase + (healthLostPerLevel * localLevel);
      const duration = buff.data.totalDuration;

      return `
        <b>+${damageIncrease.toFixed(0)}%</b> damage and attack speed. (+${damagePerLevel}% per lvl)<br />
        <b>+${damageTakenIncrease.toFixed(0)}%</b> damage taken. (+${damageTakenPerLevel}% per lvl)<br />
        You lose <b>${healthLostPerSecond.toFixed(1)}hp</b> per second. (+${healthLostPerLevel} per lvl)<br />
        Duration <b>${duration}s</b><br />`;
    },
    constants: {
      damagePercentageIncreaseBase: 45,
      damagePercentageIncreasePerLevel: 5,
      damageTakenPercentageIncreaseBase: 20,
      damageTakenPercentageIncreasePerLevel: 4,
      healthLostPerSecondBase: 0.8,
      healthLostPerSecondPerLevel: 0.2
    },
    data: {
      duration: 10,
      totalDuration: 10,
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
        buff.data.endDate = moment().add(buff.data.duration, 'seconds').toDate();
        // Increases damage and attack speed
        const damageIncrease = buff.constants.constants.damagePercentageIncreaseBase + (buff.constants.constants.damagePercentageIncreasePerLevel * buff.data.level);
        // Damage taken 
        const damageTaken = buff.constants.constants.damageTakenPercentageIncreaseBase + (buff.constants.constants.damageTakenPercentageIncreasePerLevel * buff.data.level);
        // Health lost
        const healthLost = buff.constants.constants.healthLostPerSecondBase + (buff.constants.constants.healthLostPerSecondPerLevel * buff.data.level);

        buff.data.damageIncrease = damageIncrease;
        buff.data.damageTakenIncrease = damageTaken;
        buff.data.healthLost = (-1 * healthLost);

        target.stats.attackMax *= (1 + (buff.data.damageIncrease / 100));
        target.stats.attack *= (1 + (buff.data.damageIncrease / 100));
        target.stats.attackSpeed *= (1 + (buff.data.damageIncrease / 100));
        target.stats.damageTaken *= (1 + (buff.data.damageTakenIncrease / 100));
        target.stats.attackSpeedTicks = attackSpeedTicks(target.stats.attackSpeed);
      },

      onTick({ secondsElapsed, buff, target, caster }) {
        let localSecondsElapsed = secondsElapsed;
        buff.data.duration -= secondsElapsed;

        if (buff.data.duration < 0) {
          localSecondsElapsed += buff.data.duration;
          if (localSecondsElapsed < 0) {
            localSecondsElapsed = 0;
          }
        }

        target.stats.health += (localSecondsElapsed * buff.data.healthLost);

        if (buff.data.duration < 0) {
          // Call the onremove event
          buff.constants.events.onRemove({ buff, target, caster });
          target.buffs = target.buffs.filter((targetBuff) => {
            return targetBuff.id !== buff.id
          });
        }
      },

      onRemove({ buff, target, caster }) {
        target.stats.attackMax /= (1 + (buff.data.damageIncrease / 100));
        target.stats.attack /= (1 + (buff.data.damageIncrease / 100));
        target.stats.attackSpeed /= (1 + (buff.data.damageIncrease / 100));
        target.stats.damageTaken /= (1 + (buff.data.damageTakenIncrease / 100));
        target.stats.attackSpeedTicks = attackSpeedTicks(target.stats.attackSpeed);
      }
    }
  },

  double_edged_sword: {
    duplicateTag: 'double_edged_sword', // Used to stop duplicate buffs
    icon: 'doubleEdgedSword',
    name: 'double edged sword',
    description({ buff, level }) {
      const damagePerLevel = buff.constants.damagePerLevel;
      const damageIncreasePerPercentage = buff.constants.damageBase + (damagePerLevel * level);
      return `
        Attack for <b>${damageIncreasePerPercentage * 100}%</b> of your max damage. (+${damagePerLevel * 100}% per lvl)<br />
        Deal half of this damage to yourself.`;
    },
    constants: {
      damageBase: 4.5, // 7.5x damage
      damagePerLevel: 0.5
    },
    data: {
      duration: 0,
      totalDuration: 0,
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {
        const damageIncreasePerPercentage = buff.constants.constants.damageBase + (buff.constants.constants.damagePerLevel * buff.data.level);
        // Targets missing health %
        const baseDamage = caster.stats.attackMax;
        const totalDamage = baseDamage * damageIncreasePerPercentage;

        buff.data.endDate = moment().add(0, 'seconds').toDate();
        actualBattle.utils.dealDamage(totalDamage, {
          attacker: caster,
          defender: target,
          tickEvents: actualBattle.tickEvents
        });

        actualBattle.utils.dealDamage(totalDamage / 2, {
          attacker: caster,
          defender: caster,
          tickEvents: actualBattle.tickEvents
        });
      },

      onTick({ secondsElapsed, buff, target, caster }) {
        target.buffs = target.buffs.filter((targetBuff) => {
          return targetBuff.id !== buff.id
        });
      }
    }
  },

  execute: {
    duplicateTag: 'execute', // Used to stop duplicate buffs
    icon: 'execute',
    name: 'execute',
    description({ buff, level }) {
      const damagePerLevel = buff.constants.damagePerLevel;
      const damageIncreasePerPercentage = buff.constants.damageBase + (damagePerLevel * level);
      return `
        Execute enemies below 30% hp for up to <b>${damageIncreasePerPercentage * 100}%</b> damage. (+${damagePerLevel * 100}% per lvl)<br />
        Based on your targets missing health.`;
    },
    constants: {
      damageBase: 2, // % Increase of damage for each % of health enemy is missing
      damagePerLevel: 0.5
    },
    data: {
      duration: 0,
      totalDuration: 0,
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {

        // Target HP
        const targetHp = (target.stats.health / target.stats.healthMax) * 100;
        if (targetHp > 30) {
          return;
        }

        const damageIncreasePerPercentage = buff.constants.constants.damageBase + (buff.constants.constants.damagePerLevel * buff.data.level);
        // Targets missing health %
        const missingHealthPercentage = 100 - (target.stats.health / target.stats.healthMax * 100);
        const baseDamage = caster.stats.attack;
        const extraDamage = Math.round(Math.random() * (caster.stats.attackMax - caster.stats.attack));
        const totalDamage = (baseDamage + extraDamage) * (missingHealthPercentage / 100) * damageIncreasePerPercentage;

        buff.data.endDate = moment().add(0, 'seconds').toDate();
        actualBattle.utils.dealDamage(totalDamage, {
          attacker: caster,
          defender: target,
          tickEvents: actualBattle.tickEvents
        });
      },

      onTick({ secondsElapsed, buff, target, caster }) {
        target.buffs = target.buffs.filter((targetBuff) => {
          return targetBuff.id !== buff.id
        });
      }
    }
  },

  penetrating_slash: {
    duplicateTag: 'penetrating_slash', // Used to stop duplicate buffs
    icon: 'penetratingSlash',
    name: 'penetrating slash',
    description({ buff, level }) {
      const damagePerLevel = buff.constants.damagePerLevel;
      const damageBase = buff.constants.damageBase;
      const damageTotal = Math.round((damageBase + (damagePerLevel * level)) * 100);
      return `
        Slash for ${damageTotal}% damage. Ignores ${Math.round(buff.constants.armorPenetration * 100)}% of targets armor. <br />
        (+${damagePerLevel * 100}% damage per lvl)`;
    },
    constants: {
      damageBase: 0.8,
      damagePerLevel: 0.2,
      armorPenetration: 0.8,
    },
    data: {
      duration: 0,
      totalDuration: 0,
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {
        const constants = buff.constants.constants;
        const damagePerLevel = constants.damagePerLevel;
        const damageBase = constants.damageBase;
        const damageTotalDecimal = (damageBase + (damagePerLevel * buff.data.level));
  
        const casterAttack = caster.stats.attack;
        const casterAttackMax = caster.stats.attackMax;
        const actualDamage = (casterAttack + ((casterAttackMax - casterAttack) / 2)) * damageTotalDecimal;

        // Reduce armor by X% before hit
        target.stats.armor *= (1 - constants.armorPenetration);
        actualBattle.utils.dealDamage(actualDamage, {
          attacker: caster,
          defender: target,
          tickEvents: actualBattle.tickEvents
        });
        target.stats.armor /= (1 - constants.armorPenetration);
      },

      onTick({ secondsElapsed, buff, target, caster }) {
        target.buffs = target.buffs.filter((targetBuff) => {
          return targetBuff.id !== buff.id
        });
      }
    }
  },

  shield_bash: {
    duplicateTag: 'shield_bash', // Used to stop duplicate buffs
    icon: 'shieldBash',
    name: 'shield bash',
    description({ buff, level }) {
      const damagePerLevel = buff.constants.damagePerLevel;
      const damageBase = buff.constants.damageBase;
      const damageTotal = Math.round((damageBase + (damagePerLevel * level)) * 100);
      return `Deal ${damageTotal}% of your defense as damage. (+${damagePerLevel * 100}% per lvl)`;
    },
    constants: {
      damageBase: 0.9,
      damagePerLevel: 0.1
    },
    data: {
      duration: 0,
      totalDuration: 0,
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {
        const constants = buff.constants.constants;
        const damagePerLevel = constants.damagePerLevel;
        const damageBase = constants.damageBase;
        const damageTotalDecimal = (damageBase + (damagePerLevel * buff.data.level));
        // Targets missing health %
        const actualDamage = caster.stats.defense * damageTotalDecimal;

        actualBattle.utils.dealDamage(actualDamage, {
          attacker: caster,
          defender: target,
          tickEvents: actualBattle.tickEvents
        });
      },

      onTick({ secondsElapsed, buff, target, caster }) {
        target.buffs = target.buffs.filter((targetBuff) => {
          return targetBuff.id !== buff.id
        });
      }
    }
  },

  blade_spin: {
    duplicateTag: 'blade_spin', // Used to stop duplicate buffs
    icon: 'bladeSpin',
    name: 'blade spin',
    description({ buff, level }) {
      const damagePerLevel = buff.constants.damagePerLevel;
      const damagePercentage = buff.constants.damagePercentage + (damagePerLevel * level);
      return `Deals ${damagePercentage}% weapon damage to all enemies. (+${damagePerLevel}% per lvl)`;
    },
    constants: {
      damagePercentage: 35,
      damagePerLevel: 5
    },
    data: {
      duration: 0,
      totalDuration: 0,
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {
        const baseDamage = caster.stats.attack;
        const extraDamage = Math.round(Math.random() * (caster.stats.attackMax - caster.stats.attack));
        const percentDamage = buff.constants.constants.damagePercentage + (buff.data.level * buff.constants.constants.damagePerLevel);
        const totalDamage = (baseDamage + extraDamage) * (percentDamage / 100);

        buff.data.endDate = moment().add(0, 'seconds').toDate();
        actualBattle.utils.dealDamage(totalDamage, {
          attacker: caster,
          defender: target,
          tickEvents: actualBattle.tickEvents
        });
      },

      onTick({ secondsElapsed, buff, target, caster }) {
        target.buffs = target.buffs.filter((targetBuff) => {
          return targetBuff.id !== buff.id
        });
      }
    }
  },

  blade_frenzy: {
    duplicateTag: 'blade_frenzy', // Used to stop duplicate buffs
    icon: 'bladeFrenzy',
    name: 'blade frenzy',
    description({ buff, level }) {
      const duration = buff.data.totalDuration;
      const attackSpeedPerLevel = buff.constants.attackSpeedPerLevel;
      const attackSpeedGain = buff.constants.attackSpeedBase + (attackSpeedPerLevel * level);
      return `
        Increases attack speed by ${attackSpeedGain}% for ${buff.data.totalDuration}s.
         (+${attackSpeedPerLevel}% per lvl)`;
    },
    constants: {
      attackSpeedBase: 75,
      attackSpeedPerLevel: 25,
    },
    data: {
      duration: 3,
      totalDuration: 3,
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
        buff.data.endDate = moment().add(buff.data.duration, 'seconds').toDate();
        const attackSpeedGain = buff.constants.constants.attackSpeedBase + (buff.constants.constants.attackSpeedPerLevel * buff.data.level);

        buff.data.attackSpeedGain = attackSpeedGain;

        target.stats.attackSpeed *= (1 + (buff.data.attackSpeedGain / 100));
        target.stats.attackSpeedTicks = attackSpeedTicks(target.stats.attackSpeed);
      },

      onTick({ secondsElapsed, buff, target, caster }) {
        let localSecondsElapsed = secondsElapsed;
        buff.data.duration -= localSecondsElapsed;

        if (buff.data.duration < 0) {
          localSecondsElapsed += buff.data.duration;
          if (localSecondsElapsed < 0) {
            localSecondsElapsed = 0;
          }
        }

        if (buff.data.duration < 0) {
          // Call the onremove event
          buff.constants.events.onRemove({ buff, target, caster });
          target.buffs = target.buffs.filter((targetBuff) => {
            return targetBuff.id !== buff.id
          });
        }
      },

      onRemove({ buff, target, caster }) {
        target.stats.attackSpeed /= (1 + (buff.data.attackSpeedGain / 100));
        target.stats.attackSpeedTicks = attackSpeedTicks(target.stats.attackSpeed);
      }
    }
  },

  bleed: {
    duplicateTag: 'bleed', // Used to stop duplicate buffs
    icon: 'bleed',
    name: 'bleed',
    description({ buff, level }) {
      const damagePerSecondPerLevel = buff.constants.damagePerSecondPerLevel;
      const dps = buff.constants.damagePerSecondBase + (damagePerSecondPerLevel * level);
      return `Deals ${dps * 100}% of your accuracy as damage every second. (+3% per lvl) <br />
      For ${buff.data.totalDuration}s.`;
    },
    constants: {
      damagePerSecondBase: 0.07,
      damagePerSecondPerLevel: 0.03
    },
    data: {
      duration: 12,
      totalDuration: 12,
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
        buff.data.endDate = moment().add(buff.data.duration, 'seconds').toDate();

        if (buff.constants && buff.constants.constants && !buff.data.dps) {
          buff.data.dps = buff.constants.constants.damagePerSecondBase + (buff.constants.constants.damagePerSecondPerLevel * buff.data.level);
          buff.data.dps *= caster.stats.accuracy;
        }

        buff.data.timeTillDamage = 1;
        buff.data.caster = caster.id;
      },

      onTick({ secondsElapsed, buff, target, actualBattle }) {
        let localSecondsElapsed = secondsElapsed;
        buff.data.duration -= localSecondsElapsed;
        buff.data.timeTillDamage -= localSecondsElapsed;

        if (buff.data.duration < 0) {
          localSecondsElapsed += buff.data.duration;
          if (localSecondsElapsed < 0) {
            localSecondsElapsed = 0;
          }
        }

        if (buff.data.timeTillDamage < 0) {
          const allUnits = actualBattle.units.concat(actualBattle.enemies, actualBattle.deadEnemies, actualBattle.deadUnits);
          const caster = _.findWhere(allUnits, { id: buff.data.caster });
          buff.data.timeTillDamage = 1;

          actualBattle.utils.dealDamage(buff.data.dps, { 
            attacker: caster,
            defender: target,
            tickEvents: actualBattle.tickEvents
          });
        }

        if (buff.data.duration < 0) {
          target.buffs = target.buffs.filter((targetBuff) => {
            return targetBuff.id !== buff.id
          });
        }
      },

      onRemove() {

      }
    }
  },
}
