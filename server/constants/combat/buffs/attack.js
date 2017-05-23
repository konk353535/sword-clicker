import moment from 'moment';
import { attackSpeedTicks } from '/server/utils';

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
        <b>+${damageIncrease}%</b> damage and attack speed. (+${damagePerLevel}% per lvl)<br />
        <b>+${damageTakenIncrease}%</b> damage taken. (+${damageTakenPerLevel}% per lvl)<br />
        You lose <b>${healthLostPerSecond}hp</b> per second. (+${healthLostPerLevel} per lvl)<br />
        Duration <b>${duration}s</b><br />`;
    },
    constants: {
      damagePercentageIncreaseBase: 45,
      damagePercentageIncreasePerLevel: 5,
      damageTakenPercentageIncreaseBase: 20,
      damageTakenPercentageIncreasePerLevel: 5,
      healthLostPerSecondBase: 0.5,
      healthLostPerSecondPerLevel: 0.5
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

  execute: {
    duplicateTag: 'execute', // Used to stop duplicate buffs
    icon: 'execute',
    name: 'execute',
    description({ buff, level }) {
      const damagePerLevel = buff.constants.damagePerLevel;
      const damageIncreasePerPercentage = buff.constants.damageBase + (damagePerLevel * level);
      return `
        Auto attack for 0 - <b>${damageIncreasePerPercentage * 100}%</b> damage. (+${damagePerLevel * 100}% per lvl)<br />
        Based on your targets missing health.`;
    },
    constants: {
      damageBase: 1, // % Increase of damage for each % of health enemy is missing
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
      duration: 10,
      totalDuration: 10,
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
        buff.data.endDate = moment().add(buff.data.duration, 'seconds').toDate();

        if (buff.constants && buff.constants.constants) {
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
