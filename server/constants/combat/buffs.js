export const BUFFS = {

  // Id of the buff
  food_lettice: {
    duplicateTag: 'eatingFood', // Used to stop duplicate buffs
    icon: 'lettice',
    name: 'eating lettice',
    description(buff) {
      const totalHeal = Math.round(buff.data.totalDuration * buff.data.healthPerSecond);
      return `Heals for ${totalHeal}hp over ${buff.data.totalDuration}s`;
    },
    data: { // Data we require to persist
      duration: 60, // How long the buff will last
      totalDuration: 60,
      healthPerSecond: 0.333 // Healing it will do per second
    },
    events: { // This can be rebuilt from the buff id
      onApply() {
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
  }
}
