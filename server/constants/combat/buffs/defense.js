import moment from 'moment';
import { attackSpeedTicks } from '/server/utils';
import { addBuff, removeBuff } from '/server/battleUtils';
import { BATTLES } from '/server/constants/battles/index.js'; // List of encounters

export const DEFENSE_BUFFS = {

  frosted_attacks: {
    duplicateTag: 'frosted_attacks', // Used to stop duplicate buffs
    icon: 'frostedAttacks',
    name: 'forsted attacks',
    description({ buff, level }) {
      return `Lowers units attack speed by ${buff.data.attackSpeedDecrease}%`;
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
        // Mutate targets attack speed
        target.stats.attackSpeed *= (1 - (buff.data.attackSpeedDecrease / 100));
        target.stats.attackSpeedTicks = attackSpeedTicks(target.stats.attackSpeed);
      },

      onTick({ secondsElapsed, buff, target, caster }) {
        buff.data.duration -= secondsElapsed;

        if (buff.data.duration < 0) {
          removeBuff({ buff, target, caster });
        }
      },

      onRemove({ buff, target, caster }) {
        // Mutate targets attack speed
        target.stats.attackSpeed /= (1 - (buff.data.attackSpeedDecrease / 100));
        target.stats.attackSpeedTicks = attackSpeedTicks(target.stats.attackSpeed);
      }
    }
  },

  phalanx: {
    duplicateTag: 'phalanx', // Used to stop duplicate buffs
    icon: 'phalanx',
    name: 'phalanx',
    description({ buff, level }) {
    },
    constants: {
      armorPerAlly: 200
    },
    data: {
      duration: Infinity,
      totalDuration: Infinity
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
        // Blank
        buff.data.extraArmor = 0;
      },

      onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
        const constants = buff.constants.constants;

        if (!buff.data.timeTillUpdate || buff.data.timeTillUpdate <= 0) {
          let phalanxCount = 0;
          if (buff.data.isEnemy) {
            // Check for other enemies with buff
            phalanxCount = actualBattle.enemies.filter((enemy) => {
              return _.findWhere(enemy.buffs, { id: 'phalanx' });
            }).length;
          } else {
            // Check for other allies with buff
            phalanxCount = actualBattle.enemies.filter((enemy) => {
              return _.findWhere(enemy.buffs, { id: 'phalanx' });
            }).length;
          }

          if (buff.data.extraArmor) {
            target.stats.armor -= buff.data.extraArmor;
          }

          if (phalanxCount > 1) {
            buff.data.hideBuff = false;
            buff.data.stacks = phalanxCount;
            buff.data.extraArmor = phalanxCount * constants.armorPerAlly;
            target.stats.armor += buff.data.extraArmor;
          } else {
            buff.data.hideBuff = true;
            // Remove armor buff
            buff.data.extraArmor = 0;
          }

          buff.data.timeTillUpdate = 10;
        }

        buff.data.timeTillUpdate -= secondsElapsed;
      },

      onRemove({ buff, target, caster }) {
        // Blank
      }
    }
  },

  frost_armor: {
    duplicateTag: 'frost_armor', // Used to stop duplicate buffs
    icon: 'frostArmor',
    name: 'frost armor',
    description({ buff, level }) {
      let localLevel = JSON.parse(JSON.stringify(level));
      if (!localLevel) {
        localLevel = 1;
      }

      const chance = buff.constants.frostChance * 100;
      const attackSpeedDecrease = buff.constants.attackSpeedDecrease * 100;
      const durationPerLevel = buff.constants.durationPerLevel;
      const durationTotal = buff.constants.durationBase + (durationPerLevel * localLevel);

      return `${chance}% chance to freeze your attacker.<br />
        Lowers enemy attack speed by ${attackSpeedDecrease}% for ${durationTotal}s. (+${durationPerLevel}s per lvl).<br />`;
    },
    constants: {
      frostChance: 0.15,
      attackSpeedDecrease: 0.25,
      durationBase: 9,
      durationPerLevel: 1
    },
    data: {
      duration: Infinity,
      totalDuration: Infinity
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
        // Blank
      },

      onTookDamage({ buff, defender, attacker, actualBattle }) {
        const constants = buff.constants.constants;
        if (Math.random() <= constants.frostChance) {
          const attackSpeedDecrease = constants.attackSpeedDecrease * 100;
          const durationPerLevel = constants.durationPerLevel;
          const durationTotal = constants.durationBase + (durationPerLevel * buff.data.level);

          const newBuff = {
            id: 'frosted_attacks',
            data: {
              duration: durationTotal,
              totalDuration: durationTotal,
              attackSpeedDecrease,
              icon: 'frostedAttacks',
              description: `Reduces your attack speed by ${attackSpeedDecrease}%`,
              name: 'Frosted Attacks'
            }
          }

          addBuff({ buff: newBuff, target: attacker, caster: defender });
        }
      },

      onTick({ secondsElapsed, buff, target, caster }) {
        // Blank
        if (buff.data.duration <= 0) {
          removeBuff({ target, buff, caster })
        }
      },

      onRemove({ buff, target, caster }) {
        // Blank
      }
    }
  },

  health_up: {
    duplicateTag: 'health_up', // Used to stop duplicate buffs
    icon: 'health',
    name: 'health up',
    description({ buff, level }) {

      const healthBase = buff.constants.healthBase;
      const healthPerLevel = buff.constants.healthPerLevel * level;
      const healthIncrease = healthBase + healthPerLevel;

      return `
        Increases health by ${Math.round(healthIncrease * 100)}%. <br />
        (+${Math.round(buff.constants.healthPerLevel * 100)}% per lvl)<br />`;
    },
    constants: {
      healthBase: 0.04,
      healthPerLevel: 0.02
    },
    data: {
      duration: Infinity,
      totalDuration: Infinity
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
        // Blank
        const constants = buff.constants.constants;
  
        const healthBase = constants.healthBase;
        const healthPerLevel = constants.healthPerLevel * buff.data.level;
        const healthIncrease = healthBase + healthPerLevel;

        buff.data.healthIncrease = healthIncrease;
        // Only mutate health if it's full
        if (caster.stats.health === caster.stats.healthMax) {
          caster.stats.health *= (1 + buff.data.healthIncrease);
        }
        caster.stats.healthMax *= (1 + buff.data.healthIncrease);
      },

      onTick({ secondsElapsed, buff, target, caster }) {
        // Blank
        if (buff.data.duration <= 0) {
          removeBuff({ target, buff, caster: target })
        }
      },

      onRemove({ buff, target, caster }) {
        // Blank
        caster.stats.health /= (1 + buff.data.healthIncrease);
        caster.stats.healthMax /= (1 + buff.data.healthIncrease);
      }
    }
  },

  defense_up: {
    duplicateTag: 'defense_up', // Used to stop duplicate buffs
    icon: 'defense',
    name: 'defense up',
    description({ buff, level }) {

      const defenseBase = buff.constants.defenseBase;
      const defensePerLevel = buff.constants.defensePerLevel * level;
      const defenseIncrease = defenseBase + defensePerLevel;

      return `
        Increases defense by ${defenseIncrease}. <br />
        (+${buff.constants.defensePerLevel} defense per lvl)<br />`;
    },
    constants: {
      defenseBase: 2,
      defensePerLevel: 4
    },
    data: {
      duration: Infinity,
      totalDuration: Infinity
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
        // Blank
        const constants = buff.constants.constants;
  
        const defenseBase = constants.defenseBase;
        const defensePerLevel = constants.defensePerLevel * buff.data.level;
        const defenseIncrease = defenseBase + defensePerLevel;

        buff.data.defenseIncrease = defenseIncrease;
        caster.stats.defense += buff.data.defenseIncrease;
      },

      onTick({ secondsElapsed, buff, target, caster }) {
        // Blank
        if (buff.data.duration <= 0) {
          removeBuff({ target, buff, caster: target })
        }
      },

      onRemove({ buff, target, caster }) {
        // Blank
        caster.stats.defense -= buff.data.defenseIncrease;
      }
    }
  },

  spiked_armor: {
    duplicateTag: 'spiked_armor', // Used to stop duplicate buffs
    icon: 'spikedArmor',
    name: 'spiked armor',
    description({ buff, level }) {

      const damageReflectionBase = buff.constants.damageReflectionBase;
      const damageReflectionPerLevel = buff.constants.damageReflectionPerLevel * level;
      const damageReflection = damageReflectionBase + damageReflectionPerLevel;

      return `
        Reflect ${Math.round(damageReflection * 100)}% of attack damage taken as magic damage. <br />
        (+${Math.round(damageReflectionPerLevel * 100)}% per lvl)<br />`;
    },
    constants: {
      damageReflectionBase: 0.30,
      damageReflectionPerLevel: 0.05
    },
    data: {
      duration: Infinity,
      totalDuration: Infinity
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
        // Blank
      },

      onTookDamage({ buff, defender, attacker, actualBattle, damageDealt }) {
        const constants = buff.constants.constants;

        const damageReflectionBase = constants.damageReflectionBase;
        const damageReflectionPerLevel = constants.damageReflectionPerLevel * buff.data.level;
        const damageReflection = damageReflectionBase + damageReflectionPerLevel;

        const totalDamage = damageDealt;

        actualBattle.utils.dealDamage(totalDamage * damageReflection, {
          attacker: defender,
          defender: attacker,
          isMagic: true,
          tickEvents: actualBattle.tickEvents
        });
      },

      onTick({ secondsElapsed, buff, target, caster }) {
        // Blank
        if (buff.data.duration <= 0) {
          removeBuff({ target, buff, caster })
        }
      },

      onRemove({ buff, target, caster }) {
        // Blank
      }
    }
  },

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
        if (buff.constants && buff.constants.constants) {
          buff.data.duration += (buff.data.level * buff.constants.constants.durationPerLevel)
        }
        target.stats.damageTaken *= (1 - (99.9 / 100));
        target.stats.defense *= 100;
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
            return targetBuff.id !== buff.id;
          });
        }
      },

      onRemove({ buff, target, caster }) {
        target.stats.damageTaken /= (1 - (99.9 / 100));
        target.stats.defense /= 100;
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
