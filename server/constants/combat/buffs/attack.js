import moment from 'moment';
import { attackSpeedTicks } from '/server/utils';

export const ATTACK_BUFFS = {

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
        Auto attack for up to <b>${damageIncreasePerPercentage * 100}%</b> bonus damage. (+${damagePerLevel * 100}% per lvl)<br />
        Based on your targets missing health.`;
    },
    constants: {
      damageBase: 1, // % Increase of damage for each % of health enemy is missing
      damagePerLevel: 1
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
        const totalDamage = (baseDamage + extraDamage) * (1 + (missingHealthPercentage / 100));

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
      damagePercentage: 15,
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
        const totalDamage = (baseDamage + extraDamage) * (buff.constants.constants.damagePercentage / 100);

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
      return `Deals ${dps.toFixed(1)} damage every second. (+${damagePerSecondPerLevel} per lvl) <br />
      For ${buff.data.totalDuration}s.`;
    },
    constants: {
      damagePerSecondBase: 0.5,
      damagePerSecondPerLevel : 0.5
    },
    data: {
      duration: 10,
      totalDuration: 10,
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
        buff.data.endDate = moment().add(buff.data.duration, 'seconds').toDate();
        buff.data.dps = buff.constants.constants.damagePerSecondBase + (buff.constants.constants.damagePerSecondPerLevel * buff.data.level);
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
      }
    }
  },
}
