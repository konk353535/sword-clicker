import moment from 'moment';

export const BUFFS = {

  food_lettice: {
    duplicateTag: 'eatingFood', // Used to stop duplicate buffs
    icon: 'lettice',
    name: 'eating lettice',
    description({ buff, level }) {
      const totalHeal = Math.round(buff.data.totalDuration * buff.data.healthPerSecond);
      return `Heals for ${totalHeal}hp over ${buff.data.totalDuration}s`;
    },
    data: { // Data we require to persist
      duration: 60, // How long the buff will last
      totalDuration: 60,
      healthPerSecond: 0.333 // Healing it will do per second
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
        buff.data.endDate = moment().add(buff.data.duration, 'seconds').toDate();

        target.stats.health += 1;
        if (target.stats.health > target.stats.healthMax) {
          target.stats.health = target.stats.healthMax;
        }
      },

      onTick({ secondsElapsed, buff, target, caster }) {
        let localSecondsElapsed = JSON.parse(JSON.stringify(secondsElapsed));
        buff.data.duration -= localSecondsElapsed;

        if (buff.data.duration < 0) {
          localSecondsElapsed += buff.data.duration;
          if (localSecondsElapsed < 0) {
            localSecondsElapsed = 0;
          }
        }

        target.stats.health += (localSecondsElapsed * buff.data.healthPerSecond)

        if (buff.data.duration < 0) {
          buff.constants.events.onRemove({ buff, target, caster });
          // Remove buff from the target
          target.buffs = target.buffs.filter((targetBuff) => {
            return targetBuff.id !== buff.id;
          });
        }

        if (target.stats.health > target.stats.healthMax) {
          target.stats.health = target.stats.healthMax;
        }
      },

      onRemove({ buff, target, caster }) {
        target.stats.health += 1;
      }
    }
  },

  food_grape_fruit: {
    duplicateTag: 'eatingFood', // Used to stop duplicate buffs
    icon: 'grapeFruit',
    name: 'eating grapefruit',
    description({ buff, level }) {
      const totalHeal = Math.round(buff.data.totalDuration * buff.data.healthPerSecond);
      return `Heals for ${totalHeal}hp over ${buff.data.totalDuration}s`;
    },
    data: { // Data we require to persist
      duration: 120, // How long the buff will last
      totalDuration: 120,
      healthPerSecond: 0.5 // Healing it will do per second
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
        buff.data.endDate = moment().add(buff.data.duration, 'seconds').toDate();

        target.stats.health += 1;
        if (target.stats.health > target.stats.healthMax) {
          target.stats.health = target.stats.healthMax;
        }
      },

      onTick({ secondsElapsed, buff, target, caster }) {
        let localSecondsElapsed = JSON.parse(JSON.stringify(secondsElapsed));
        buff.data.duration -= localSecondsElapsed;

        if (buff.data.duration < 0) {
          localSecondsElapsed += buff.data.duration;
          if (localSecondsElapsed < 0) {
            localSecondsElapsed = 0;
          }
        }

        target.stats.health += (localSecondsElapsed * buff.data.healthPerSecond)

        if (buff.data.duration < 0) {
          buff.constants.events.onRemove({ buff, target, caster });
          // Remove buff from the target
          target.buffs = target.buffs.filter((targetBuff) => {
            return targetBuff.id !== buff.id;
          });
        }

        if (target.stats.health > target.stats.healthMax) {
          target.stats.health = target.stats.healthMax;
        }
      },

      onRemove({ buff, target, caster }) {
        target.stats.health += 1;
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
      const damageIncrease = buff.constants.damagePercentageIncreaseBase + (buff.constants.damagePercentageIncreasePerLevel * localLevel);
      const damageTakenIncrease = buff.constants.damageTakenPercentageIncreaseBase + (buff.constants.damageTakenPercentageIncreasePerLevel * localLevel);
      const healthLostPerSecond = buff.constants.healthLostPerSecondBase + (buff.constants.healthLostPerSecondPerLevel * localLevel);
      const duration = buff.data.totalDuration;

      return `
        <b>+${damageIncrease}%</b> damage and attack speed.<br />
        <b>+${damageTakenIncrease}%</b> damage taken.<br />
        You lose <b>${healthLostPerSecond}hp</b> per second.<br />
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
      },

      onTick({ secondsElapsed, buff, target, caster }) {
        let localSecondsElapsed = JSON.parse(JSON.stringify(secondsElapsed));
        buff.data.duration -= localSecondsElapsed;

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
            targetBuff.id !== buff.id
          });
        }
      },

      onRemove({ buff, target, caster }) {
        target.stats.attackMax /= (1 + (buff.data.damageIncrease / 100));
        target.stats.attack /= (1 + (buff.data.damageIncrease / 100));
        target.stats.attackSpeed /= (1 + (buff.data.damageIncrease / 100));
        target.stats.damageTaken /= (1 + (buff.data.damageTakenIncrease / 100));
      }
    }
  },

  execute: {
    duplicateTag: 'execute', // Used to stop duplicate buffs
    icon: 'execute',
    name: 'execute',
    description({ buff, level }) {
      const damageIncreasePerPercentage = buff.constants.damageBase + (buff.constants.damagePerLevel * level);
      return `Auto attack for up to <b>${damageIncreasePerPercentage * 100}%</b> bonus damage.<br />Based on your targets missing health`;
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
          targetBuff.id !== buff.id
        });
      }
    }
  },

  bleed: {
    duplicateTag: 'bleed', // Used to stop duplicate buffs
    icon: 'bleed',
    name: 'bleed',
    description({ buff, level }) {
      return 'todo';
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
        let localSecondsElapsed = JSON.parse(JSON.stringify(secondsElapsed));
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
            targetBuff.id !== buff.id
          });
        }
      }
    }
  },
}
