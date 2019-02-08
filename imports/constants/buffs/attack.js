import moment from 'moment';
import { addBuff, removeBuff } from '../../battleUtils';
import { CInt } from '../../utils';

export const ATTACK_BUFFS = {

  furied_defense: {
    duplicateTag: 'furied_defense', // Used to stop duplicate buffs
    icon: 'furiedDefense.svg',
    name: 'furied defense',
    description({ buff, level }) {
      const c = buff.constants;
      return `Counter attack for 100% attack damage. <br />
        Lasts for 25 seconds.`;
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
        const constants = (buff.constants && buff.constants.constants) ? buff.constants.constants : BUFFS[buff.id].constants;
      },

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
        buff.duration -= secondsElapsed;
        if (buff.duration <= 0) {
          removeBuff({ target, buff, caster: target })
        }
      },

      onTookDamage({ buff, defender, attacker, actualBattle }) {
        const constants = (buff.constants && buff.constants.constants) ? buff.constants.constants : BUFFS[buff.id].constants;
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
        const constants = (buff.constants && buff.constants.constants) ? buff.constants.constants : BUFFS[buff.id].constants;
        buff.duration -= secondsElapsed;

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

        if (buff.duration <= 0) {
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
        (+${Math.round(buff.constants.attackPerLevel * 100)}% per lvl)`;
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
        const constants = (buff.constants && buff.constants.constants) ? buff.constants.constants : BUFFS[buff.id].constants;
  
        const attackBase = constants.attackBase;
        const attackPerLevel = constants.attackPerLevel * buff.data.level;
        const attackIncrease = attackBase + attackPerLevel;

        buff.data.attackIncrease = attackIncrease;
        caster.stats.attack *= (1 + buff.data.attackIncrease);
        caster.stats.attackMax *= (1 + buff.data.attackIncrease);
      },

      onTick({ secondsElapsed, buff, target, caster }) {
        if (buff.duration !== Infinity) {
          buff.duration -= secondsElapsed;
          if (buff.duration <= 0) {
            removeBuff({ buff, target, caster, actualBattle });
          }
        }
      },

      onRemove({ buff, target, caster }) {
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
        (+${buff.constants.accuracyPerLevel} accuracy per lvl)`;
    },
    constants: {
      accuracyBase: 4,
      accuracyPerLevel: 8
    },
    data: {
      duration: Infinity,
      totalDuration: Infinity
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
        const constants = (buff.constants && buff.constants.constants) ? buff.constants.constants : BUFFS[buff.id].constants;
        const accuracyBase = constants.accuracyBase;
        const accuracyPerLevel = constants.accuracyPerLevel * buff.data.level;
        const accuracyIncrease = accuracyBase + accuracyPerLevel;
        buff.data.accuracyIncrease = accuracyIncrease;
        caster.stats.accuracy += buff.data.accuracyIncrease;
      },

      onTick({ secondsElapsed, buff, target, caster }) {
        if (buff.duration !== Infinity) {
          buff.duration -= secondsElapsed;
          if (buff.duration <= 0) {
            removeBuff({ buff, target, caster, actualBattle });
          }
        }
      },

      onRemove({ buff, target, caster }) {
        //console.log(`${caster.stats.accuracy} -= ${buff.data.accuracyIncrease}`);
        if (buff.data.accuracyIncrease) {
          caster.stats.accuracy -= buff.data.accuracyIncrease;
        }
      }
    }
  },

  critical_up: {
    duplicateTag: 'critical_up', // Used to stop duplicate buffs
    icon: 'criticalChance2.svg',
    name: 'critical up',
    description({ buff, level }) {
      const criticalBase = buff.constants.criticalBase;
      const criticalPerLevel = buff.constants.criticalPerLevel * level;
      const criticalIncrease = criticalBase + criticalPerLevel;
      return `
        Increases critical chance by ${criticalIncrease}%. <br />
        (+${buff.constants.criticalPerLevel}% critical chance per lvl)`;
    },
    constants: {
      criticalBase: 4,
      criticalPerLevel: 3
    },
    data: {
      duration: Infinity,
      totalDuration: Infinity
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
      },

      onTick({ secondsElapsed, buff, target, caster }) {
        if (!buff.data.criticalIncrease) {
          const constants = (buff.constants && buff.constants.constants) ? buff.constants.constants : BUFFS[buff.id].constants;
          const criticalBase = constants.criticalBase;
          const criticalPerLevel = constants.criticalPerLevel * buff.data.level;
          const criticalIncrease = criticalBase + criticalPerLevel;
          buff.data.criticalIncrease = criticalIncrease;
          target.stats.criticalChance += buff.data.criticalIncrease;
        }

        if (buff.duration !== Infinity) {
          buff.duration -= secondsElapsed;
          if (buff.duration <= 0) {
            removeBuff({ buff, target, caster, actualBattle });
          }
        }
      },

      onRemove({ buff, target, caster }) {
        if (buff.data.criticalIncrease) {
          target.stats.criticalChance -= buff.data.criticalIncrease;
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
        const constants = (buff.constants && buff.constants.constants) ? buff.constants.constants : BUFFS[buff.id].constants;

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
        buff.duration -= secondsElapsed;
        if (buff.duration <= 0) {
          removeBuff({ target, buff, caster })
        }
      },

      onRemove({ buff, target, caster }) {
      }
    }
  },

  poisoned_blade: {
    duplicateTag: 'poisoned_blade', // Used to stop duplicate buffs
    icon: 'poisonedBlade.svg',
    name: 'poisoned blade',
    description({ buff, level }) {
      let localLevel = CInt(level);
      if (localLevel <= 0) {
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
      poisonDamageBase: 0.20,
      poisonDamagePerLevel: 0.05
    },
    data: {
      duration: Infinity,
      totalDuration: Infinity
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
      },

      onDidDamage({ buff, defender, attacker, actualBattle }) {
        const constants = (buff.constants && buff.constants.constants) ? buff.constants.constants : BUFFS[buff.id].constants;
        if (Math.random() <= constants.poisonChance) {
          const baseDamage = attacker.stats.attack;
          const extraDamage = Math.round(Math.random() * (attacker.stats.attackMax - attacker.stats.attack));
          const abilityDamagePercentage = constants.poisonDamageBase + (constants.poisonDamagePerLevel * buff.data.level);

          const totalDamage = (baseDamage + extraDamage) * abilityDamagePercentage;

          // Add poisoned debuff to enemy
          const newBuff = defender.addBuff({
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
          });
          
          newBuff.data.casterUnit = attacker.id;
        }
      },

      onTick({ secondsElapsed, buff, target, caster }) {
        if (buff.duration <= 0) {
          removeBuff({ target, buff, caster })
        }
      },

      onRemove({ buff, target, caster }) {
      }
    }
  },

  phantom_strikes: {
    duplicateTag: 'phantom_strikes', // Used to stop duplicate buffs
    icon: 'phantomStrikes.svg',
    name: 'phantom strikes',
    description({ buff, level }) {
      let localLevel = CInt(level);
      if (localLevel <= 0) {
        localLevel = 1;
      }

      const chance = buff.constants.extraAttackChance * 100;
      const damagePerLevel = buff.constants.extraAttackDamagePerLevel * 100;
      const damage = (buff.constants.extraAttackDamageBase + buff.constants.extraAttackDamagePerLevel * localLevel) * 100;

      return `${chance}% chance to attack twice.<br />
        Extra attack deals ${damage.toFixed(0)}% damage (+${damagePerLevel}% per lvl) `;
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
      },

      onDidDamage({ originalAutoAttack, buff, defender, attacker, actualBattle }) {
        const constants = (buff.constants && buff.constants.constants) ? buff.constants.constants : BUFFS[buff.id].constants;
        if (originalAutoAttack && Math.random() <= constants.extraAttackChance) {
          // 2018-11-10 psouza4:  updated phantom strikes to actually call auto-attack routine and prevent it from recursively
          //                      calling itself (in case the phantom strikes chance tries to proc itself), allowing phantom
          //                      strikes to apply on-hit effects as it should
        
          actualBattle.autoAttack({
                attacker,
                defender,
                tickEvents: actualBattle.tickEvents,
                historyStats: actualBattle.historyStats,
                originalAutoAttack: false,
                damageModifier: 0.20 * buff.data.level // 20% bonus damage x level
              });
              
          /*        
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
          */
        }
      },

      onTick({ secondsElapsed, buff, target, caster }) {
        if (buff.duration <= 0) {
          removeBuff({ target, buff, caster })
        }
      },

      onRemove({ buff, target, caster }) {
      }
    }
  },

  twin_blades: {
    duplicateTag: 'twin_blades',
    icon: 'twinBlades.svg',
    name: 'twin blades',
    description({ buff, level }) {
      let localLevel = CInt(level);
      if (localLevel <= 0) {
        localLevel = 1;
      }

      const chance = buff.constants.extraAttackChance * 100;
      const damagePerLevel = buff.constants.extraAttackDamagePerLevel * 100;
      const damage = (buff.constants.extraAttackDamageBase + buff.constants.extraAttackDamagePerLevel * localLevel) * 100;

      return `
        Auto attacks hit enemies adjacent to your target (applies <br />
        on-hit effects). Consumes one stack when triggered. Stacks <br />
        generate every 3 seconds, maximum of 20. `;
    },
    constants: {
    },
    data: {
      duration: Infinity,
      totalDuration: Infinity
    },
    events: {
      onApply({ buff, target, caster }) {
        buff.stacks = 1;
        buff.data.timeTillStack = 3;
      },

      onDidDamage({ buff, defender, attacker, actualBattle, originalAutoAttack }) {
        if (buff.stacks <= 0 || !originalAutoAttack) {
          return;
        }

        const baseDamage = attacker.stats.attack;
        const extraDamage = Math.round(Math.random() * (attacker.stats.attackMax - attacker.stats.attack));
        const damage = baseDamage + extraDamage;

        if (attacker) {
          // Get the defender
          const ourTargetUnit = attacker.targetUnit;
          if (ourTargetUnit) {
            // Get enemies both side of him
            const ourTargetsAllies = ourTargetUnit.adjacentAllies;
            if (ourTargetsAllies && ourTargetsAllies.length > 0) {
              buff.stacks -= 1;
              ourTargetUnit.adjacentAllies.forEach((newTarget) => {
                // Call auto attack on them as well
                actualBattle.autoAttack({
                  attacker,
                  defender: newTarget,
                  tickEvents: actualBattle.tickEvents,
                  historyStats: actualBattle.historyStats,
                  originalAutoAttack: false
                });

                // Apply a cooldown to our ability
              });
            }
          }
        }
      },

      onTick({ secondsElapsed, buff, target, caster }) {
        buff.data.timeTillStack -= secondsElapsed;
        if (buff.data.timeTillStack <= 0) {
          buff.data.timeTillStack = 3;
          buff.stacks++;
          if (buff.stacks > 20) {
            buff.stacks = 20;
          }
        }
      },

      onRemove({ buff, target, caster }) {
      }
    }
  },

  thirsty_fangs: {
    duplicateTag: 'thirsty_fangs', // Used to stop duplicate buffs
    icon: 'thirstyFangs.svg',
    name: 'thirsty fangs',
    description({ buff, level }) {
      let localLevel = CInt(level);
      if (localLevel <= 0) {
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
      },

      onDidDamage({ buff, defender, attacker, actualBattle }) {

        const constants = (buff.constants && buff.constants.constants) ? buff.constants.constants : BUFFS[buff.id].constants;
        const baseDamage = attacker.stats.attack;
        const extraDamage = Math.round(Math.random() * (attacker.stats.attackMax - attacker.stats.attack));
        const damageBoost = (constants.damageDecimal + (constants.extraAttackDamagePerLevel * buff.data.level));
        const totalHealing = (baseDamage + extraDamage) * constants.healingDecimal;
        const totalDamage = (baseDamage + extraDamage) * damageBoost;

        const hasBleed = defender.buffs.find((buff) => buff.id === 'bleed' || buff.id === 'bleed_proper');

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
        if (buff.duration <= 0) {
          removeBuff({ target, buff, caster })
        }
      },

      onRemove({ buff, target, caster }) {
      }
    }
  },

  war_cry: {
    duplicateTag: 'war_cry', // Used to stop duplicate buffs
    icon: 'warCry.svg',
    name: 'war cry',
    description({ buff, level }) {
      let localLevel = CInt(level);
      if (localLevel <= 0) {
        localLevel = 1;
      }

      return `
      Increases your party's maximum damage range <br />
      by 50% for 10 seconds.`;
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
        buff.duration -= secondsElapsed;

        if (buff.duration < 0) {
          localSecondsElapsed += buff.duration;
          if (localSecondsElapsed < 0) {
            localSecondsElapsed = 0;
          }
        }

        if (buff.duration < 0) {
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
      let localLevel = CInt(level);
      if (localLevel <= 0) {
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
        You can\'t change your active target while berserking<br />
        Duration <b>${duration}s</b>`;
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
        const constants = (buff.constants && buff.constants.constants) ? buff.constants.constants : BUFFS[buff.id].constants;
        
        buff.data.endDate = moment().add(buff.duration, 'seconds').toDate();
        // Increases damage and attack speed
        const damageIncrease = constants.damagePercentageIncreaseBase + (constants.damagePercentageIncreasePerLevel * buff.data.level);
        // Damage taken 
        const damageTaken = constants.damageTakenPercentageIncreaseBase + (constants.damageTakenPercentageIncreasePerLevel * buff.data.level);
        // Health lost
        const healthLost = constants.healthLostPerSecondBase + (constants.healthLostPerSecondPerLevel * buff.data.level);

        buff.data.damageIncrease = damageIncrease;
        buff.data.damageTakenIncrease = damageTaken;
        buff.data.healthLost = (-1 * healthLost);

        buff.data.extraAttackMax =  target.stats.attackMax * (buff.data.damageIncrease / 100);
        buff.data.extraAttack =  target.stats.attack * (buff.data.damageIncrease / 100);

        target.stats.attack += buff.data.extraAttack;
        target.stats.attackMax += buff.data.extraAttackMax;
        target.stats.attackSpeed *= (1 + (buff.data.damageIncrease / 100));
        target.stats.damageTaken *= (1 + (buff.data.damageTakenIncrease / 100));
        
        target.isAbleToChangeTargets = false;
      },

      onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
        let localSecondsElapsed = secondsElapsed;
        buff.duration -= secondsElapsed;

        if (buff.duration < 0) {
          localSecondsElapsed += buff.duration;
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

        if (buff.duration < 0) {
          removeBuff({ target, buff, caster })
        }
      },

      onRemove({ buff, target, caster }) {
        target.stats.attack -= buff.data.extraAttack;
        target.stats.attackMax -= buff.data.extraAttackMax;
        target.stats.attackSpeed /= (1 + (buff.data.damageIncrease / 100));
        target.stats.damageTaken /= (1 + (buff.data.damageTakenIncrease / 100));
        
        target.isAbleToChangeTargets = true;
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
        Deal 10% of this damage to yourself as true damage.`;
    },
    constants: {
      damageBase: 1.25, // 200, 275, 350, 425, 500
      damagePerLevel: .75
    },
    duration: 0,
    data: {
      totalDuration: 0,
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {
        const constants = (buff.constants && buff.constants.constants) ? buff.constants.constants : BUFFS[buff.id].constants;
        const damageIncreasePerPercentage = constants.damageBase + (constants.damagePerLevel * buff.data.level);
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

        actualBattle.dealDamage(totalDamage / 10, {
          attacker: caster,
          defender: caster,
          tickEvents: actualBattle.tickEvents,
          historyStats: actualBattle.historyStats,
          isTrueDamage: true
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
    duration: 0,
    data: {
      totalDuration: 0,
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {

        // Target HP
        const targetHp = (target.stats.health / target.stats.healthMax) * 100;
        if (targetHp > 30) {
          return;
        }

        const constants = (buff.constants && buff.constants.constants) ? buff.constants.constants : BUFFS[buff.id].constants;        
        const damageIncreasePerPercentage = constants.damageBase + (constants.damagePerLevel * buff.data.level);
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
    duration: 0,
    data: {
      totalDuration: 0,
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {
        const constants = (buff.constants && buff.constants.constants) ? buff.constants.constants : BUFFS[buff.id].constants;
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
        const constants = (buff.constants && buff.constants.constants) ? buff.constants.constants : BUFFS[buff.id].constants;
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
        const constants = (buff.constants && buff.constants.constants) ? buff.constants.constants : BUFFS[buff.id].constants;
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
        const constants = (buff.constants && buff.constants.constants) ? buff.constants.constants : BUFFS[buff.id].constants;
        const baseDamage = caster.stats.attack;
        const extraDamage = Math.round(Math.random() * (caster.stats.attackMax - caster.stats.attack));
        const percentDamage = constants.damagePercentage + (buff.data.level * constants.damagePerLevel);
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
          };
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
        buff.data.endDate = moment().add(buff.duration, 'seconds').toDate();
        const constants = (buff.constants && buff.constants.constants) ? buff.constants.constants : BUFFS[buff.id].constants;
        const attackSpeedGain = constants.attackSpeedBase + (constants.attackSpeedPerLevel * buff.data.level);

        buff.data.attackSpeedGain = attackSpeedGain;

        target.stats.attackSpeed *= (1 + (buff.data.attackSpeedGain / 100));
      },

      onTick({ secondsElapsed, buff, target, caster }) {
        let localSecondsElapsed = secondsElapsed;
        buff.duration -= localSecondsElapsed;

        if (buff.duration < 0) {
          localSecondsElapsed += buff.duration;
          if (localSecondsElapsed < 0) {
            localSecondsElapsed = 0;
          }
        }

        if (buff.duration < 0) {
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
        buff.data.endDate = moment().toDate();

        const constants = (buff.constants && buff.constants.constants) ? buff.constants.constants : BUFFS[buff.id].constants;
        
        if (constants && !buff.data.dps) {
          buff.data.dps = constants.damagePerSecondBase + (constants.damagePerSecondPerLevel * buff.data.level);
          buff.data.dps *= caster.stats.accuracy;
        }

        buff.data.timeTillDamage = 1;
        buff.data.caster = caster.id;        
        
        const newBuff = {
          id: 'bleed_proper',
          data: {
            duration: 12,
            totalDuration: 12,
            dps: buff.data.dps,
            caster: caster.id,
            timeTillDamage: 1,
            allowDuplicates: true,
            icon: 'bleeding.svg',
            name: 'bleed',
            duplicateTag: 'bleed_proper',
            description: `Bleed every second for ${buff.data.dps.toFixed(0)} damage`
          }
        };
        
        // Add bleed debuff
        addBuff({ buff: newBuff, target: target, caster: caster });
        
        // remove stub debuff
        removeBuff({ target, buff, caster })
      },

      onTick({ secondsElapsed, buff, target, actualBattle }) {
        // remove stub debuff
        const caster = actualBattle.allUnitsMap[buff.data.caster];

        removeBuff({ target, buff, caster })
      },

      onRemove() {
      }
    }
  },
  
  bleed_proper: {
    duplicateTag: 'bleed_proper', // Used to stop duplicate buffs
    icon: 'bleeding.svg',
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
        buff.data.endDate = moment().add(buff.duration, 'seconds').toDate();

        const constants = (buff.constants && buff.constants.constants) ? buff.constants.constants : BUFFS[buff.id].constants;
        
        if (constants && !buff.data.dps) {
          buff.data.dps = constants.damagePerSecondBase + (constants.damagePerSecondPerLevel * buff.data.level);
          buff.data.dps *= caster.stats.accuracy;
        }

        buff.data.timeTillDamage = 1;
        buff.data.caster = caster.id;
      },

      onTick({ secondsElapsed, buff, target, actualBattle }) {
        let localSecondsElapsed = secondsElapsed;
        buff.duration -= localSecondsElapsed;
        buff.data.timeTillDamage -= localSecondsElapsed;

        if (buff.duration < 0) {
          localSecondsElapsed += buff.duration;
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

        if (buff.duration < 0) {
          removeBuff({ target, buff, caster })
        }
      },

      onRemove() {

      }
    }
  },
};
