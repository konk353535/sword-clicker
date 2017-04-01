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
      onApply({ buff }) {
        buff.data.endDate = moment().add(buff.data.duration, 'seconds').toDate();

        return [{
          target: 'self',
          type: 'instantStatModifier',
          stats: {
            health: 1
          }
        }]
      },

      onTick({ secondsElapsed, buff }) {
        let localSecondsElapsed = JSON.parse(JSON.stringify(secondsElapsed));
        buff.data.duration -= localSecondsElapsed;

        if (buff.data.duration < 0) {
          localSecondsElapsed += buff.data.duration;
          if (localSecondsElapsed < 0) {
            localSecondsElapsed = 0;
          }
        }

        // Return modifiers
        const allModifiers = [{
          target: 'self',
          type: 'instantStatModifier',
          stats: {
            health: (localSecondsElapsed * buff.data.healthPerSecond)
          }
        }];

        if (buff.data.duration < 0) {
          // Call the onremove event
          allModifiers.push(...buff.constants.events.onRemove());
          // Add the delete modifier
          allModifiers.push({
            target: buff.id,
            type: 'removeBuff'
          });
        }
        return allModifiers
      },

      onRemove() {
        return [{
          target: 'self',
          type: 'instantStatModifier',
          stats: {
            health: 1
          }
        }];
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
      onApply({ buff }) {
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

        return [{
          target: 'self',
          type: 'instantPercentStatModifier',
          stats: {
            attackMax: buff.data.damageIncrease
          }
        },{
          target: 'self',
          type: 'instantPercentStatModifier',
          stats: {
            attack: buff.data.damageIncrease,
            attackSpeed: buff.data.damageIncrease,
            damageTaken: buff.data.damageTakenIncrease
          }
        }]
      },

      onTick({ secondsElapsed, buff }) {
        let localSecondsElapsed = JSON.parse(JSON.stringify(secondsElapsed));
        buff.data.duration -= localSecondsElapsed;

        if (buff.data.duration < 0) {
          localSecondsElapsed += buff.data.duration;
          if (localSecondsElapsed < 0) {
            localSecondsElapsed = 0;
          }
        }

        // Return modifiers
        const allModifiers = [{
          target: 'self',
          type: 'instantStatModifier',
          stats: {
            health: (localSecondsElapsed * buff.data.healthLost)
          }
        }];

        if (buff.data.duration < 0) {
          // Call the onremove event
          allModifiers.push(...buff.constants.events.onRemove({ buff }));
          // Add the delete modifier
          allModifiers.push({
            target: buff.id,
            type: 'removeBuff'
          });
        }
        return allModifiers
      },

      onRemove({ buff }) {
        return [{
          target: 'self',
          type: 'instantPercentStatModifier',
          stats: {
            attackMax: buff.data.damageIncrease * -1
          }
        }, {
          target: 'self',
          type: 'instantPercentStatModifier',
          stats: {
            attack: buff.data.damageIncrease * -1,
            attackSpeed: buff.data.damageIncrease * -1,
            damageTaken: buff.data.damageTakenIncrease * -1
          }
        }];
      }
    }
  }
}
