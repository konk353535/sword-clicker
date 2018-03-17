import moment from 'moment';
import { addBuff, removeBuff } from '../../battleUtils';

export const ATTACK_BUFFS = {

  furied_defense: {
    duplicateTag: 'furied_defense', // Used to stop duplicate buffs
    icon: 'furiedDefense.svg',
    name: 'furied defense',
    description({ buff, level }) {
      const c = buff.constants;
      return `Counter attack for 100% attack damage. <br />
        Lasts for 25 seconds. <br />`;
    },
    constants: {
      damageDecimal: 1
    },
    data: {
      duration: 25,
      totalDuration: 25,
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {
        const constants = buff.constants.constants;
      },

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
        buff.data.duration -= secondsElapsed;
        if (buff.data.duration <= 0) {
          removeBuff({ target, buff, caster: target })
        }
      },

      onTookDamage({ buff, defender, attacker, actualBattle }) {
        const constants = buff.constants.constants;
        const defenderAttack = defender.stats.attack;
        const defenderAttackMax = defender.stats.attackMax;
        const actualDamage = (defenderAttack + ((defenderAttackMax - defenderAttack) * Math.random())) * constants.damageDecimal;

        actualBattle.dealDamage(actualDamage, {
          defender: attacker,
          attacker: defender,
          tickEvents: actualBattle.tickEvents,
          historyStats: actualBattle.historyStats,
          customIcon: 'counterAttack.svg',
          customColor: '#f7750f'
        });
      },

      onRemove({ buff, target, caster, actualBattle }) {
      }
    }
  },

  basic_poison: {
    duplicateTag: 'basic_poison', // Used to stop duplicate buffs
    icon: 'poison.svg',
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
          actualBattle.dealDamage(poisonDamage, {
            defender: target,
            attacker: actualBattle.allUnitsMap[buff.data.sourceId],
            tickEvents: actualBattle.tickEvents,
            historyStats: actualBattle.historyStats,
            customIcon: 'poison.svg',
            customColor: '#229b00'
          });
        }

        // Blank
        if (buff.data.duration <= 0) {
          removeBuff({ target, buff, caster })
        }
      },

      onRemove() {

      }
    }
  },

  attack_up: {
    duplicateTag: 'attack_up', // Used to stop duplicate buffs
    icon: 'attack.svg',
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
    icon: 'accuracy.svg',
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
        buff.data.duration -= secondsElapsed;

        // Blank
        if (buff.data.duration <= 0) {
          removeBuff({ target, buff, caster: target })
        }
      },

      onRemove({ buff, target, caster }) {
        // Blank
        console.log(`${caster.stats.accuracy} -= ${buff.data.accuracyIncrease}`);
        if (buff.data.accuracyIncrease) {
          caster.stats.accuracy -= buff.data.accuracyIncrease;
        }
      }
    }
  },

  vampirism: {
    duplicateTag: 'vampirism', // Used to stop duplicate buffs
    icon: 'vampirism.svg',
    name: 'vampirism',
    description({ buff, level }) {
      const lifestealBase = buff.constants.lifestealBase * 100;
      const lifestealPerLevel = buff.constants.lifestealPerLevel * 100;

      const lifestealTotal = lifestealBase + (lifestealPerLevel * level);
      return `Heal for ${lifestealTotal.toFixed(0)}% of auto attack damage. (+${lifestealPerLevel.toFixed(0)}% damage per lvl)<br />
        Lasts 2 minutes.`;
    },
    constants: {
      lifestealBase: 0.16,
      lifestealPerLevel: 0.04,
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

        actualBattle.healTarget(totalHeal, {
          caster: attacker,
          target: attacker,
          tickEvents: actualBattle.tickEvents,
          historyStats: actualBattle.historyStats,
        });
      },

      onTick({ secondsElapsed, buff, target, caster }) {
        buff.data.duration -= secondsElapsed;
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

  poisoned_blade: {
    duplicateTag: 'poisoned_blade', // Used to stop duplicate buffs
    icon: 'poisonedBlade.svg',
    name: 'poisoned blade',
    description({ buff, level }) {
      let localLevel = JSON.parse(JSON.stringify(level));
      if (!localLevel) {
        localLevel = 1;
      }

      const chance = buff.constants.poisonChance * 100;
      const damagePerLevel = buff.constants.poisonDamagePerLevel * 100;
      const damage = (buff.constants.poisonDamageBase + buff.constants.poisonDamagePerLevel * localLevel) * 100;

      return `${chance.toFixed(0)}% chance to poison the enemy.<br />
        Deals ${damage.toFixed(0)}% physical damage every 5 seconds. (+${damagePerLevel}% per lvl).<br />
        Lasts 5 minutes.`;
    },
    constants: {
      poisonChance: 0.07,
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
              duration: 300,
              totalDuration: 300,
              damage: Math.ceil(totalDamage),
              icon: 'poison.svg',
              name: 'Poison',
              description: `Take ${Math.ceil(totalDamage)} damage every 5 seconds.`,
              sourceId: attacker.id
            }
          })
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

  phantom_strikes: {
    duplicateTag: 'phantom_strikes', // Used to stop duplicate buffs
    icon: 'phantomStrikes.svg',
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
        Extra attack deals ${damage.toFixed(0)}% damage (+${damagePerLevel}% per lvl) <br />`;
    },
    constants: {
      extraAttackChance: 0.2,
      extraAttackDamageBase: 0.8,
      extraAttackDamagePerLevel: 0.2
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

          actualBattle.dealDamage(totalDamage, {
            attacker,
            defender,
            tickEvents: actualBattle.tickEvents,
            historyStats: actualBattle.historyStats,
          });
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

  twin_blades: {
    duplicateTag: 'twin_blades', // Used to stop duplicate buffs
    icon: 'twinBlades.svg',
    name: 'twin blades',
    description({ buff, level }) {
      let localLevel = JSON.parse(JSON.stringify(level));
      if (!localLevel) {
        localLevel = 1;
      }

      const chance = buff.constants.extraAttackChance * 100;
      const damagePerLevel = buff.constants.extraAttackDamagePerLevel * 100;
      const damage = (buff.constants.extraAttackDamageBase + buff.constants.extraAttackDamagePerLevel * localLevel) * 100;

      return `
        Auto attacks hit enemies adjacent to your target (applies on hit effects).<br />
        Consumes one stack when triggered. Stacks generate every 3 seconds, maximum of 20. <br />`;
    },
    constants: {
    },
    data: {
      duration: Infinity,
      totalDuration: Infinity
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
        // Blank
        buff.data.stacks = 1;
        buff.data.timeTillStack = 3;
      },

      onDidDamage({ buff, defender, attacker, actualBattle, originalAutoAttack }) {
        if (buff.data.stacks <= 0 || !originalAutoAttack) {
          return;
        }

        const baseDamage = attacker.stats.attack;
        const extraDamage = Math.round(Math.random() * (attacker.stats.attackMax - attacker.stats.attack));
        const damage = baseDamage + extraDamage;

        // Get the defender, get enemies both side of him
        const targetIndex = actualBattle.enemies.indexOf(defender);

        if (targetIndex >= 0) {
          const adjacentTargets = []
          
          const leftTarget = actualBattle.enemies[targetIndex - 1];
          const rightTarget = actualBattle.enemies[targetIndex + 1];
          if (leftTarget) { adjacentTargets.push(leftTarget); }
          if (rightTarget) { adjacentTargets.push(rightTarget); }

          if (adjacentTargets.length > 0) {
            adjacentTargets.forEach((newTarget) => {
              // Call auto attack on them as well
              actualBattle.autoAttack({
                attacker,
                defender: newTarget,
                tickEvents: actualBattle.tickEvents,
                historyStats: actualBattle.historyStats,
                originalAutoAttack: false
              });
            });

            // Apply a cooldown to our ability
            buff.data.stacks -= 1;
          }
        }
      },

      onTick({ secondsElapsed, buff, target, caster }) {
        // Blank
        buff.data.timeTillStack -= secondsElapsed;
        if (buff.data.timeTillStack <= 0) {
          buff.data.timeTillStack = 3;
          buff.data.stacks++;
          if (buff.data.stacks >= 20) {
            buff.data.stacks = 20;
          }
        }
      },

      onRemove({ buff, target, caster }) {
        // Blank
      }
    }
  },

  thirsty_fangs: {
    duplicateTag: 'thirsty_fangs', // Used to stop duplicate buffs
    icon: 'thirstyFangs.svg',
    name: 'thirsty fangs',
    description({ buff, level }) {
      let localLevel = JSON.parse(JSON.stringify(level));
      if (!localLevel) {
        localLevel = 1;
      }

      const damagePerLevel = buff.constants.extraAttackDamagePerLevel * 100;
      const damage = (buff.constants.damageDecimal + (buff.constants.extraAttackDamagePerLevel * localLevel)) * 100;
      const healing = buff.constants.healingDecimal * 100;

      return `When the target is bleeding<br />
        Deal ${damage.toFixed(0)}% extra damage (+${damagePerLevel}% per lvl).<br />
        While below 60% hp, heal for ${healing.toFixed(0)}% of damage dealt.`;
    },
    constants: {
      damageDecimal: 0.15,
      extraAttackDamagePerLevel: 0.05,
      healingDecimal: 0.20
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
        const baseDamage = attacker.stats.attack;
        const extraDamage = Math.round(Math.random() * (attacker.stats.attackMax - attacker.stats.attack));
        const damageBoost = (constants.damageDecimal + (constants.extraAttackDamagePerLevel * buff.data.level))
        const totalHealing = (baseDamage + extraDamage) * constants.healingDecimal;
        const totalDamage = (baseDamage + extraDamage) * damageBoost;

        const hasBleed = defender.buffs.find((buff) => buff.id === 'bleed');

        if (hasBleed) {
          // My current hp
          const hpDecimal = attacker.stats.health / attacker.stats.healthMax;

          if (hpDecimal <= 0.60) {
            actualBattle.healTarget(totalHealing, {
              caster: attacker,
              target: attacker,
              tickEvents: actualBattle.tickEvents,
              historyStats: actualBattle.historyStats,
            }); 
          }

          actualBattle.dealDamage(totalDamage, {
            attacker,
            defender,
            tickEvents: actualBattle.tickEvents,
            historyStats: actualBattle.historyStats,
          });
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

  war_cry: {
    duplicateTag: 'war_cry', // Used to stop duplicate buffs
    icon: 'warCry.svg',
    name: 'war cry',
    description({ buff, level }) {
      let localLevel = JSON.parse(JSON.stringify(level));
      if (!localLevel) {
        localLevel = 1;
      }

      return `Increases max attack by 150% for 10 seconds<br />`;
    },
    constants: {
    },
    data: {
      duration: 10,
      totalDuration: 10,
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
        const extraAttack = target.stats.attackMax * 1.5;
        buff.data.extraAttack = extraAttack;
        target.stats.attackMax += extraAttack;
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

        if (buff.data.duration < 0) {
          removeBuff({ target, buff, caster })
        }
      },

      onRemove({ buff, target, caster }) {
        target.stats.attackMax -= buff.data.extraAttack;
      }
    }
  },

  berserk: {
    duplicateTag: 'berserk', // Used to stop duplicate buffs
    icon: 'berserk.svg',
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
      damageTakenPercentageIncreasePerLevel: 3,
      healthLostPerSecondBase: 0.9,
      healthLostPerSecondPerLevel: 0.1
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

        buff.data.extraAttackMax =  target.stats.attackMax * (buff.data.damageIncrease / 100);
        buff.data.extraAttack =  target.stats.attack * (buff.data.damageIncrease / 100);

        target.stats.attack += buff.data.extraAttack;
        target.stats.attackMax += buff.data.extraAttackMax;
        target.stats.attackSpeed *= (1 + (buff.data.damageIncrease / 100));
        target.stats.damageTaken *= (1 + (buff.data.damageTakenIncrease / 100));
      },

      onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
        let localSecondsElapsed = secondsElapsed;
        buff.data.duration -= secondsElapsed;

        if (buff.data.duration < 0) {
          localSecondsElapsed += buff.data.duration;
          if (localSecondsElapsed < 0) {
            localSecondsElapsed = 0;
          }
        }

        const damageToTake = (localSecondsElapsed * buff.data.healthLost);
        actualBattle.dealDamage(damageToTake, {
          attacker: caster,
          defender: caster,
          tickEvents: actualBattle.tickEvents,
          historyStats: actualBattle.historyStats,
          isTrueDamage: true
        });

        if (buff.data.duration < 0) {
          removeBuff({ target, buff, caster })
        }
      },

      onRemove({ buff, target, caster }) {
        target.stats.attack -= buff.data.extraAttack;
        target.stats.attackMax -= buff.data.extraAttackMax;
        target.stats.attackSpeed /= (1 + (buff.data.damageIncrease / 100));
        target.stats.damageTaken /= (1 + (buff.data.damageTakenIncrease / 100));
      }
    }
  },

  double_edged_sword: {
    duplicateTag: 'double_edged_sword', // Used to stop duplicate buffs
    icon: 'doubleEdgedSword.svg',
    name: 'double edged sword',
    description({ buff, level }) {
      const damagePerLevel = buff.constants.damagePerLevel;
      const damageIncreasePerPercentage = buff.constants.damageBase + (damagePerLevel * level);
      return `
        Attack for <b>${damageIncreasePerPercentage * 100}%</b> of your max damage. (+${damagePerLevel * 100}% per lvl)<br />
        Deal half of this damage to yourself.`;
    },
    constants: {
      damageBase: 1.25, // 200, 275, 350, 425, 500
      damagePerLevel: .75
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
        actualBattle.dealDamage(totalDamage, {
          attacker: caster,
          defender: target,
          tickEvents: actualBattle.tickEvents,
          historyStats: actualBattle.historyStats,
        });

        actualBattle.dealDamage(totalDamage / 2, {
          attacker: caster,
          defender: caster,
          tickEvents: actualBattle.tickEvents,
          historyStats: actualBattle.historyStats,
        });
      },

      onTick({ secondsElapsed, buff, target, caster }) {
        removeBuff({ target, buff, caster })
      }
    }
  },

  execute: {
    duplicateTag: 'execute', // Used to stop duplicate buffs
    icon: 'execute.svg',
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
        actualBattle.dealDamage(totalDamage, {
          attacker: caster,
          defender: target,
          tickEvents: actualBattle.tickEvents,
          historyStats: actualBattle.historyStats,
        });
      },

      onTick({ secondsElapsed, buff, target, caster }) {
        removeBuff({ target, buff, caster })
      }
    }
  },

  slash: {
    duplicateTag: 'slash', // Used to stop duplicate buffs
    icon: 'slash.svg',
    name: 'slash',
    description({ buff, level }) {
      const damagePerLevel = buff.constants.damagePerLevel;
      const damageBase = buff.constants.damageBase;
      const damageTotal = Math.round((damageBase + (damagePerLevel * level)) * 100);
      return `
        Slash for ${damageTotal}% damage. <br />
        (+${damagePerLevel * 100}% damage per lvl)`;
    },
    constants: {
      damageBase: 0.8,
      damagePerLevel: 0.2
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
        const actualDamage = (casterAttack + ((casterAttackMax - casterAttack) * Math.random())) * damageTotalDecimal;

        actualBattle.dealDamage(actualDamage, {
          attacker: caster,
          defender: target,
          tickEvents: actualBattle.tickEvents,
          historyStats: actualBattle.historyStats,
        });
      },

      onTick({ secondsElapsed, buff, target, caster }) {
        removeBuff({ target, buff, caster })
      }
    }
  },

  penetrating_slash: {
    duplicateTag: 'penetrating_slash', // Used to stop duplicate buffs
    icon: 'penetratingSlash.svg',
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
        const actualDamage = (casterAttack + ((casterAttackMax - casterAttack) * Math.random())) * damageTotalDecimal;

        // Reduce armor by X% before hit
        target.stats.armor *= (1 - constants.armorPenetration);
        actualBattle.dealDamage(actualDamage, {
          attacker: caster,
          defender: target,
          tickEvents: actualBattle.tickEvents,
          historyStats: actualBattle.historyStats,
        });
        target.stats.armor /= (1 - constants.armorPenetration);
      },

      onTick({ secondsElapsed, buff, target, caster }) {
        removeBuff({ target, buff, caster })
      }
    }
  },

  shield_bash: {
    duplicateTag: 'shield_bash', // Used to stop duplicate buffs
    icon: 'shieldBash.svg',
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

        actualBattle.dealDamage(actualDamage, {
          attacker: caster,
          defender: target,
          tickEvents: actualBattle.tickEvents,
          historyStats: actualBattle.historyStats,
          actualBattle
        });
      },

      onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
        removeBuff({ target, buff, caster, actualBattle })
      }
    }
  },

  blade_spin: {
    duplicateTag: 'blade_spin', // Used to stop duplicate buffs
    icon: 'bladeSpin.svg',
    name: 'blade spin',
    description({ buff, level }) {
      const damagePerLevel = buff.constants.damagePerLevel;
      const damagePercentage = buff.constants.damagePercentage + (damagePerLevel * level);
      return `Deals ${damagePercentage}% weapon damage to all enemies. (+${damagePerLevel}% per lvl)`;
    },
    constants: {
      damagePercentage: 55,
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

        // Do we have smoke_dagger buff?
        if (caster.buffs.find((buff) => buff.id === 'smoke_dagger')) {
          // Apply smoke_debuff to target
          const newBuff = {
            id: 'smoke_dagger_debuff',
            data: {
              duration: 7,
              totalDuration: 7,
              icon: 'smoke.svg',
              description: 'reduces accuracy',
              accuracyReduction: target.stats.accuracy * 0.25
            }
          }
          addBuff({ buff: newBuff, target, caster, actualBattle });
        }

        buff.data.endDate = moment().add(0, 'seconds').toDate();
        actualBattle.dealDamage(totalDamage, {
          attacker: caster,
          defender: target,
          tickEvents: actualBattle.tickEvents,
          historyStats: actualBattle.historyStats,
          isMagic: buff.data.hasOwnProperty('isMagic') ? buff.data.isMagic : false
        });
      },

      onTick({ secondsElapsed, buff, target, caster }) {
        removeBuff({ target, buff, caster })
      },

      onRemove() {
        
      }
    }
  },

  blade_frenzy: {
    duplicateTag: 'blade_frenzy', // Used to stop duplicate buffs
    icon: 'bladeFrenzy.svg',
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
          removeBuff({ target, buff, caster })
        }
      },

      onRemove({ buff, target, caster }) {
        target.stats.attackSpeed /= (1 + (buff.data.attackSpeedGain / 100));
      }
    }
  },

  bleed: {
    duplicateTag: 'bleed', // Used to stop duplicate buffs
    icon: 'bleed.svg',
    name: 'bleed',
    description({ buff, level }) {
      const damagePerSecondPerLevel = buff.constants.damagePerSecondPerLevel;
      const dps = buff.constants.damagePerSecondBase + (damagePerSecondPerLevel * level);
      return `Deals ${dps * 100}% of your accuracy as physical damage every second. (+3% per lvl) <br />
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

        const caster = actualBattle.allUnitsMap[buff.data.caster];

        if (buff.data.timeTillDamage < 0) {
          buff.data.timeTillDamage = 1;

          actualBattle.dealDamage(buff.data.dps, { 
            attacker: caster,
            defender: target,
            tickEvents: actualBattle.tickEvents,
            historyStats: actualBattle.historyStats,
          });
        }

        if (buff.data.duration < 0) {
          removeBuff({ target, buff, caster })
        }
      },

      onRemove() {

      }
    }
  },
}
