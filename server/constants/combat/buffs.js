export const BUFFS = {

  // Id of the buff
  food_lettice: {
    duplicateTag: 'eatingFood', // Used to stop duplicate buffs
    icon: 'lettice',
    name: 'eating lettice',
    description(buff) {
      const totalHeal = buff.data.totalDuration * buff.data.healthPerSecond;
      return `Heals for ${totalHeal} over ${buff.data.totalDuration}s`;
    },
    data: { // Data we require to persist
      duration: 60, // How long the buff will last
      totalDuration: 60,
      healthPerSecond: 0.33 // Healing it will do per second
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

      tick({ secondsElapsed, buff }) {
        // Set variables
        buff.data.duration -= secondsElapsed;

        // Return modifiers
        return [{
          target: 'self',
          event: 'healing',
          amount: secondsElapsed * buff.data.healthPerSecond
        }];
      },

      onRemove() {
        return [{
          target: 'self',
          event: 'healing',
          amount: 1
        }];
      }
    }
  }
}
