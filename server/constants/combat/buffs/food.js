export const FOOD_BUFFS = {
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

  food_dragonfruit: {
    duplicateTag: 'eatingFood', // Used to stop duplicate buffs
    icon: 'dragonfruit',
    name: 'eating dragonfruit',
    description({ buff, level }) {
      const totalEnergy = Math.round(buff.data.totalDuration * buff.data.energyPerSecond);
      const totalHeal = Math.round(buff.data.totalDuration * buff.data.healthPerSecond);
      return `Regenerates ${totalEnergy} energy and ${totalHeal} health over ${buff.data.totalDuration}s`;
    },
    data: { // Data we require to persist
      duration: 300, // How long the buff will last
      totalDuration: 300,
      energyPerSecond: 0.03, // energy it will do per second
      healthPerSecond: 2
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
        buff.data.endDate = moment().add(buff.data.duration, 'seconds').toDate();
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

        target.stats.energy += (localSecondsElapsed * buff.data.energyPerSecond)
        target.stats.health += (localSecondsElapsed * buff.data.healthPerSecond)

        if (buff.data.duration < 0) {
          buff.constants.events.onRemove({ buff, target, caster });
          // Remove buff from the target
          target.buffs = target.buffs.filter((targetBuff) => {
            return targetBuff.id !== buff.id;
          });
        }

        if (target.stats.energy > target.stats.energyMax) {
          target.stats.energy = target.stats.energyMax;
        }
        if (target.stats.health > target.stats.healthMax) {
          target.stats.health = target.stats.healthMax;
        }        
      },

      onRemove({ buff, target, caster }) {
        target.stats.energy += 0.5;
      }
    }
  },

  food_lemon: {
    duplicateTag: 'eatingFood', // Used to stop duplicate buffs
    icon: 'lemon',
    name: 'eating lemon',
    description({ buff, level }) {
      const totalEnergy = Math.round(buff.data.totalDuration * buff.data.energyPerSecond);
      return `Regenerates ${totalEnergy} energy over ${buff.data.totalDuration}s`;
    },
    data: { // Data we require to persist
      duration: 300, // How long the buff will last
      totalDuration: 300,
      energyPerSecond: 0.05 // energy it will do per second
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
        buff.data.endDate = moment().add(buff.data.duration, 'seconds').toDate();
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

        target.stats.energy += (localSecondsElapsed * buff.data.energyPerSecond)

        if (buff.data.duration < 0) {
          buff.constants.events.onRemove({ buff, target, caster });
          // Remove buff from the target
          target.buffs = target.buffs.filter((targetBuff) => {
            return targetBuff.id !== buff.id;
          });
        }

        if (target.stats.energy > target.stats.energyMax) {
          target.stats.energy = target.stats.energyMax;
        }
      },

      onRemove({ buff, target, caster }) {
        target.stats.energy += 0.5;
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

  food_red_apple: {
    duplicateTag: 'eatingFood', // Used to stop duplicate buffs
    icon: 'redApple',
    name: 'eating red apple',
    description({ buff, level }) {
      const totalHeal = Math.round(buff.data.totalDuration * buff.data.healthPerSecond);
      return `Heals for ${totalHeal}hp over ${buff.data.totalDuration}s`;
    },
    data: { // Data we require to persist
      duration: 60, // How long the buff will last
      totalDuration: 60,
      healthPerSecond: 2 // Healing it will do per second
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

  food_pineapple: {
    duplicateTag: 'eatingFood', // Used to stop duplicate buffs
    icon: 'pineapple',
    name: 'eating pineapple',
    description({ buff, level }) {
      const totalHeal = Math.round(buff.data.totalDuration * buff.data.healthPerSecond);
      return `Heals for ${totalHeal}hp over ${buff.data.totalDuration}s`;
    },
    data: { // Data we require to persist
      duration: 300, // How long the buff will last
      totalDuration: 300,
      healthPerSecond: 1.5 // Healing it will do per second
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

  food_watermelon: {
    duplicateTag: 'eatingFood', // Used to stop duplicate buffs
    icon: 'watermelon',
    name: 'eating watermelon',
    description({ buff, level }) {
      const totalHeal = Math.round(buff.data.totalDuration * buff.data.healthPerSecond);
      return `Heals for ${totalHeal}hp over ${buff.data.totalDuration}s`;
    },
    data: { // Data we require to persist
      duration: 10, // How long the buff will last
      totalDuration: 10,
      healthPerSecond: 18 // Healing it will do per second
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


  food_carrot: {
    duplicateTag: 'eatingFood', // Used to stop duplicate buffs
    icon: 'carrot',
    name: 'eating carrot',
    description({ buff, level }) {
      const totalHeal = Math.round(buff.data.totalDuration * buff.data.healthPerSecond);
      return `Heals for ${totalHeal}hp over ${buff.data.totalDuration}s`;
    },
    data: { // Data we require to persist
      duration: 10, // How long the buff will last
      totalDuration: 10,
      healthPerSecond: 22 // Healing it will do per second
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

  food_potato: {
    duplicateTag: 'eatingFood', // Used to stop duplicate buffs
    icon: 'potato',
    name: 'eating potato',
    description({ buff, level }) {
      const totalHeal = Math.round(buff.data.totalDuration * buff.data.healthPerSecond);
      return `Heals for ${totalHeal}hp over ${buff.data.totalDuration}s`;
    },
    data: { // Data we require to persist
      duration: 180, // How long the buff will last
      totalDuration: 180,
      healthPerSecond: 3 // Healing it will do per second
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
  }
}
