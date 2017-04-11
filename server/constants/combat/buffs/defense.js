import moment from 'moment';
import { attackSpeedTicks } from '/server/utils';

export const DEFENSE_BUFFS = {

  taunt: {
    duplicateTag: 'taunt', // Used to stop duplicate buffs
    icon: 'taunt',
    name: 'taunt',
    description({ buff, level }) {
      return 'Force the target to attack you';
    },
    constants: {
    },
    data: {
      duration: 0,
      totalDuration: 0,
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {
        target.target = caster.id;

        buff.data.endDate = moment().add(0, 'seconds').toDate();
      },

      onTick({ secondsElapsed, buff, target, caster }) {
        target.buffs = target.buffs.filter((targetBuff) => {
          return targetBuff.id !== buff.id;
        });
      }
    }
  },

  defensive_stance: {
    duplicateTag: 'defensiveStance', // Used to stop duplicate buffs
    icon: 'defensiveStance',
    name: 'defensive stance',
    description({ buff, level }) {
      const damageDecreasePerLevel = buff.constants.damageDealtPercentagePerLevel;
      const damageTakenPerLevel = buff.constants.damageTakenPercentagePerLevel;

      const damageDecrease = buff.constants.damageDealtPercentageBase + (damageDecreasePerLevel * level);
      const damageTakenDecrease = buff.constants.damageTakenPercentageBase + (damageTakenPerLevel * level);

      return `
        Reduce damage taken by ${damageTakenDecrease}%, damage dealt by ${damageDecrease}%.<br />
        Last for ${buff.data.totalDuration}s. (+${damageDecreasePerLevel}% per lvl), (+${damageTakenPerLevel}% per lvl)`;
    },
    constants: {
      damageDealtPercentageBase: 37,
      damageDealtPercentagePerLevel: 3,
      damageTakenPercentageBase: 47,
      damageTakenPercentagePerLevel: 3,
    },
    data: {
      duration: 10,
      totalDuration: 10,
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
        buff.data.endDate = moment().add(buff.data.duration, 'seconds').toDate();
        // Reduce damage dealt
        const damageDecrease = buff.constants.constants.damageDealtPercentageBase + (buff.constants.constants.damageDealtPercentagePerLevel * buff.data.level);
        // Reduce damage taken 
        const damageReduction = buff.constants.constants.damageTakenPercentageBase + (buff.constants.constants.damageTakenPercentagePerLevel * buff.data.level);

        buff.data.damageDecrease = damageDecrease;
        buff.data.damageReduction = damageReduction;

        target.stats.attackMax *= (1 - (buff.data.damageDecrease / 100));
        target.stats.attack *= (1 - (buff.data.damageDecrease / 100));
        target.stats.damageTaken *= (1 - (buff.data.damageReduction / 100));
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

        if (buff.data.duration < 0) {
          // Call the onremove event
          buff.constants.events.onRemove({ buff, target, caster });
          target.buffs = target.buffs.filter((targetBuff) => {
            return targetBuff.id !== buff.id;
          });
        }
      },

      onRemove({ buff, target, caster }) {
        target.stats.attackMax /= (1 - (buff.data.damageDecrease / 100));
        target.stats.attack /= (1 - (buff.data.damageDecrease / 100));
        target.stats.damageTaken /= (1 - (buff.data.damageReduction / 100));
      }
    }
  },

  evasive_maneuvers: {
    duplicateTag: 'evasiveManeuvers', // Used to stop duplicate buffs
    icon: 'evasiveManeuvers',
    name: 'evasive maneuvers',
    description({ buff, level }) {
      const durationPerLevel = buff.constants.durationPerLevel;
      return `
        Dodges all attacks for ${buff.constants.durationBase + (durationPerLevel * level)}s.
         (+${durationPerLevel}s per lvl)`;
    },
    constants: {
      durationBase: 1,
      durationPerLevel: 0.5
    },
    data: {
      duration: 1,
      totalDuration: 1,
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
        buff.data.endDate = moment().add(buff.data.duration, 'seconds').toDate();

        target.stats.damageTaken *= (1 - (99.9 / 100));
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

        if (buff.data.duration < 0) {
          // Call the onremove event
          buff.constants.events.onRemove({ buff, target, caster });
          target.buffs = target.buffs.filter((targetBuff) => {
            return targetBuff.id !== buff.id;
          });
        }
      },

      onRemove({ buff, target, caster }) {
        target.stats.damageTaken /= (1 - (99.9 / 100));
      }
    }
  },

  armor_up: {
    duplicateTag: 'armorUp',
    icon: 'armorUp',
    name: 'armor up',
    description({ buff, level }) {
      const armorPerLevel = buff.constants.armorPerLevel;
      const totalArmor = buff.constants.baseArmor + (armorPerLevel * level)
      return `Increase armor by ${totalArmor} for ${buff.data.totalDuration}s.
       (+${armorPerLevel} per lvl)`;
    },
    constants: {
      baseArmor: 100,
      armorPerLevel: 50,
    },
    data: {
      duration: 10,
      totalDuration: 10,
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
        buff.data.endDate = moment().add(buff.data.duration, 'seconds').toDate();

        const totalArmor = buff.constants.constants.baseArmor + (buff.constants.constants.armorPerLevel * buff.data.level)

        buff.data.totalArmor = totalArmor;
        target.stats.armor += totalArmor;
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

        if (buff.data.duration < 0) {
          // Call the onremove event
          buff.constants.events.onRemove({ buff, target, caster });
          target.buffs = target.buffs.filter((targetBuff) => {
            return targetBuff.id !== buff.id;
          });
        }
      },

      onRemove({ buff, target, caster }) {
        target.stats.armor -= buff.data.totalArmor;
      }
    }
  },

  iron_will: {
    duplicateTag: 'ironWill',
    icon: 'ironWill',
    name: 'iron will',
    description({ buff, level }) {
      const defensePerLevel = buff.constants.defensePerLevel;
      const maxDefense = buff.constants.baseDefense + (defensePerLevel * level);
      return `
        Increase defense by up to ${maxDefense}. (+${defensePerLevel} per lvl)<br />
        Based on your missing health. Lasts for ${buff.data.totalDuration}s. <br />`;
    },
    constants: {
      baseDefense: 35,
      defensePerLevel: 5,
    },
    data: {
      duration: 15,
      totalDuration: 15,
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
        buff.data.endDate = moment().add(buff.data.duration, 'seconds').toDate();

        const maxDefense = buff.constants.constants.baseDefense + (buff.constants.constants.defensePerLevel * buff.data.level);

        buff.data.extraDefense = maxDefense * (1 - (target.stats.health / target.stats.healthMax));
        target.stats.defense += buff.data.extraDefense;
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

        if (buff.data.duration < 0) {
          // Call the onremove event
          buff.constants.events.onRemove({ buff, target, caster });
          target.buffs = target.buffs.filter((targetBuff) => {
            return targetBuff.id !== buff.id;
          });
        }
      },

      onRemove({ buff, target, caster }) {
        target.stats.defense -= buff.data.extraDefense;
      }
    }
  },

}
