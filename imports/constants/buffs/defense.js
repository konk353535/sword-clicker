import moment from 'moment';
import { addBuff, removeBuff } from '../../battleUtils';

export const DEFENSE_BUFFS = {

  volcanic_shield: {
    duplicateTag: 'volcanic_shield', // Used to stop duplicate buffs
    icon: 'volcanicShield.svg',
    name: 'volcanic shield',
    description({ buff, level }) {

      let localLevel = JSON.parse(JSON.stringify(level));
      if (!localLevel) {
        localLevel = 1;
      }

      const constants = buff.constants;

      let armorBuff  = constants.armorBase  + (constants.armorPerLevel  * localLevel);
      let damageBuff = (constants.damageBase + (constants.damagePerLevel * localLevel)) * 100;
      
      return `Increase armor & magic armor by ${armorBuff}. (+${constants.armorPerLevel } per lvl)<br />
        After 10 seconds, erupts dealing ${damageBuff}% (+${constants.damagePerLevel * 100}% per lvl) <br />
        weapon damage to all enemies`;
    },
    constants: {
      armorBase: 75,
      armorPerLevel: 25,
      damageBase: 2,
      damagePerLevel: .5
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {

        const constants = buff.constants.constants;
        let armorBuff = constants.armorBase + (constants.armorPerLevel * buff.data.level);

        // Increase armor & magic armor by 100
        target.stats.armor += armorBuff;
        target.stats.magicArmor += armorBuff;
        buff.duration = 10;
      },

      onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
        buff.duration -= secondsElapsed;

        if (buff.duration < 0) {
          removeBuff({ buff, target, caster, actualBattle });
        }
      },

      onRemove({ buff, target, caster, actualBattle }) {
        // Mutate targets attack speed

        const constants = buff.constants.constants;
        let armorBuff = constants.armorBase + (constants.armorPerLevel * buff.data.level);
        let damageBuff = constants.damageBase + (constants.damagePerLevel * buff.data.level);

        target.stats.armor -= armorBuff;
        target.stats.magicArmor -= armorBuff;

        const attack = target.stats.attack;
        const attackMax = target.stats.attackMax;
        const actualDamage = (attack + ((attackMax - attack) * Math.random())) * damageBuff;

        actualBattle.enemies.forEach((enemy) => {
          actualBattle.dealDamage(actualDamage, {
            attacker: target,
            defender: enemy,
            tickEvents: actualBattle.tickEvents,
            historyStats: actualBattle.historyStats
          });
        });
      }
    }
  },

  frosted_attacks: {
    duplicateTag: 'frosted_attacks', // Used to stop duplicate buffs
    icon: 'frostedAttacks.svg',
    name: 'frosted attacks',
    description({ buff, level }) {
      return `Lowers units attack speed by ${buff.data.attackSpeedDecrease}%`;
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
        // Mutate targets attack speed
        target.stats.attackSpeed *= (1 - (buff.data.attackSpeedDecrease / 100));
      },

      onTick({ secondsElapsed, buff, target, caster }) {
        buff.duration -= secondsElapsed;

        if (buff.duration < 0) {
          removeBuff({ buff, target, caster });
        }
      },

      onRemove({ buff, target, caster }) {
        // Mutate targets attack speed
        target.stats.attackSpeed /= (1 - (buff.data.attackSpeedDecrease / 100));
      }
    }
  },

  phalanx: {
    duplicateTag: 'phalanx', // Used to stop duplicate buffs
    icon: 'phalanx.svg',
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
              return enemy.buffs.find(buff => buff.id === 'phalanx');
            }).length;
          } else {
            // Check for other allies with buff
            phalanxCount = actualBattle.enemies.filter((enemy) => {
              return enemy.buffs.find(buff => buff.id === 'phalanx');
            }).length;
          }

          if (buff.data.extraArmor) {
            target.stats.armor -= buff.data.extraArmor;
          }

          if (phalanxCount > 1) {
            buff.data.hideBuff = false;
            buff.stacks = phalanxCount;
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
    icon: 'frostArmor.svg',
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
        Lowers enemy attack speed by ${attackSpeedDecrease}% for ${durationTotal}s. (+${durationPerLevel}s per lvl).`;
    },
    constants: {
      frostChance: 0.2,
      attackSpeedDecrease: 0.35,
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
              icon: 'frostedAttacks.svg',
              description: `Reduces your attack speed by ${attackSpeedDecrease}%`,
              name: 'Frosted Attacks'
            }
          };

          addBuff({ buff: newBuff, target: attacker, caster: defender });
        }
      },

      onTick({ secondsElapsed, buff, target, caster }) {
        // Blank
        if (buff.duration <= 0) {
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
    icon: 'health.svg',
    name: 'health up',
    description({ buff, level }) {

      const healthBase = buff.constants.healthBase;
      const healthPerLevel = buff.constants.healthPerLevel * level;
      const healthIncrease = healthBase + healthPerLevel;

      return `
        Increase health by ${Math.round(healthIncrease * 100)}%. <br />
        (+${Math.round(buff.constants.healthPerLevel * 100)}% per lvl)`;
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
        if (buff.duration <= 0) {
          removeBuff({ target, buff, caster: target })
        }
      },

      onRemove({ buff, target, caster, actualBattle }) {
        caster.stats.health /= (1 + buff.data.healthIncrease);
        caster.stats.healthMax /= (1 + buff.data.healthIncrease);
        actualBattle.checkDeath(caster);
      }
    }
  },

  sixth_sense: { // watchful_aura
    duplicateTag: 'sixth_sense', // Used to stop duplicate buffs
    icon: 'sixthSense.svg',
    name: 'watchful aura',
    description({ buff, level }) {
      return `Dodge rate from defense skill won't fall below 35%. <br />
        Whenever you dodge, you are healed for 1% of your maximum health. <br />
        This heal can occur only every 5 seconds.`;
    },
    constants: {
    },
    data: {
      duration: Infinity,
      totalDuration: Infinity
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
        target.stats.minimumHitChance = 0.35;
        buff.stats = 0;
      },

      onTick({ secondsElapsed, buff, target, caster }) {
        if (buff.stacksTimer > 0) {
          buff.stacksTimer -= secondsElapsed;
        }
        if (buff.stacksTimer <= 0) {
          buff.stacksTimer = undefined;
          buff.stacks = undefined;
        } else {
          buff.stacks = Math.ceil(buff.stacksTimer);
        }
      },

      onRemove({ buff, target, caster }) {
      },
      
      onDodgedDamage({ buff, defender, attacker, actualBattle }) {
        if ((!buff.stacksTimer) || (buff.stacksTimer === 0)) {
          let hpMaxHealth = defender.stats.healthMax;
          if (defender.stats.healthMaxOrig) {
            //todo: test
            hpMaxHealth = defender.stats.healthMaxOrig;
          }
          let hpHealAmount = hpMaxHealth / 100;
          if (hpHealAmount + defender.stats.health > defender.stats.healthMax) {
            hpHealAmount = defender.stats.healthMax - defender.stats.health;
          }
          
          if (hpHealAmount > 0) {
            actualBattle.healTarget(hpHealAmount, {
              caster: defender,
              target: defender,
              tickEvents: actualBattle.tickEvents,
              historyStats: actualBattle.historyStats
            });
            
            buff.stacksTimer = 5.0;
            buff.stacks = Math.ceil(buff.stacksTimer);
          }
        }
      }
    }
  },

  defense_up: {
    duplicateTag: 'defense_up', // Used to stop duplicate buffs
    icon: 'defense.svg',
    name: 'defense up',
    description({ buff, level }) {

      const defenseBase = buff.constants.defenseBase;
      const defensePerLevel = buff.constants.defensePerLevel * level;
      const defenseIncrease = defenseBase + defensePerLevel;

      return `
        Increase defense by ${defenseIncrease}. <br />
        (+${buff.constants.defensePerLevel} defense per lvl)`;
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
        if (buff.duration <= 0) {
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
    icon: 'spikedArmor.svg',
    name: 'spiked armor',
    description({ buff, level }) {

      const damageReflectionBase = buff.constants.damageReflectionBase;
      const damageReflectionPerLevel = buff.constants.damageReflectionPerLevel * level;
      const damageReflection = damageReflectionBase + damageReflectionPerLevel;

      return `
        Reflect (${Math.round(damageReflection * 100)}% of attack damage taken) + 10 as magic damage. <br />
        (+${Math.round(damageReflectionPerLevel * 100)}% per lvl)`;
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

        actualBattle.dealDamage((totalDamage * damageReflection) + 10, {
          attacker: defender,
          defender: attacker,
          isMagic: true,
          tickEvents: actualBattle.tickEvents,
          historyStats: actualBattle.historyStats
        });
      },

      onTick({ secondsElapsed, buff, target, caster }) {
        buff.duration -= secondsElapsed;
        // Blank
        if (buff.duration <= 0) {
          removeBuff({ target, buff, caster })
        }
      },

      onRemove({ buff, target, caster }) {
        // Blank
      }
    }
  },

  eel_taunt: {
    duplicateTag: 'eel_taunt', // Used to stop duplicate buffs
    icon: 'eelTaunt.svg',
    name: 'eel taunt',
    description({ buff, level }) {
      return 'Taunts the target, and ignites the target for (200% MP) after 3 seconds.';
    },
    constants: {
    },
    data: {
      duration: 3,
      totalDuration: 3,
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {
        target.target = caster.id;
        buff.data.damage = caster.stats.magicPower * 2;

        const hasIntimidate = caster.buffs.find(buff => buff.id === 'enchantment_intimidate');

        if (hasIntimidate) {
          actualBattle.dealDamage(caster.stats.attack * 2, {
            defender: caster,
            attacker: target,
            tickEvents: actualBattle.tickEvents,
            historyStats: actualBattle.historyStats
          });
        }
      },

      onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
        buff.duration -= secondsElapsed;

        if (buff.duration < 0) {
          removeBuff({ buff, target, caster, actualBattle });
        }
      },

      onRemove({ buff, target, actualBattle }) {
        actualBattle.dealDamage(buff.data.damage, {
          defender: target,
          attacker: target,
          isMagic: true,
          tickEvents: actualBattle.tickEvents,
          historyStats: actualBattle.historyStats
        });
      }
    }
  },

  lion_taunt: {
    duplicateTag: 'lion_taunt', // Used to stop duplicate buffs
    icon: 'lionTaunt.svg',
    name: 'lion taunt',
    description({ buff, level }) {
      return 'Taunts the target, and deals 75% max attack damage after 3 seconds.';
    },
    constants: {
    },
    data: {
      duration: 3,
      totalDuration: 3,
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {
        target.target = caster.id;
        buff.data.damage = caster.stats.attackMax * 0.75;

        const hasIntimidate = caster.buffs.find(buff => buff.id === 'enchantment_intimidate');

        if (hasIntimidate) {
          actualBattle.dealDamage(caster.stats.attack * 2, {
            defender: caster,
            attacker: target,
            tickEvents: actualBattle.tickEvents,
            historyStats: actualBattle.historyStats
          });
        }
      },

      onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
        buff.duration -= secondsElapsed;

        if (buff.duration < 0) {
          removeBuff({ buff, target, caster, actualBattle });
        }
      },

      onRemove({ buff, target, actualBattle }) {
        actualBattle.dealDamage(buff.data.damage, {
          defender: target,
          attacker: target,
          tickEvents: actualBattle.tickEvents,
          historyStats: actualBattle.historyStats
        });
      }
    }
  },

  bear_taunt: {
    duplicateTag: 'bear_taunt', // Used to stop duplicate buffs
    icon: 'bearTaunt.svg',
    name: 'bear taunt',
    description({ buff, level }) {
      return 'Taunts the target, and reduces it\'s attack by 10% for 5 seconds';
    },
    constants: {
    },
    data: {
      duration: 5,
      totalDuration: 5,
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {
        target.target = caster.id;
        buff.data.attack = target.stats.attackMax * 0.1;
        target.stats.attack -= buff.data.attack;
        target.stats.attackMax -= buff.data.attack;

        const hasIntimidate = caster.buffs.find(buff => buff.id === 'enchantment_intimidate');

        if (hasIntimidate) {
          actualBattle.dealDamage(caster.stats.attack * 2, {
            defender: caster,
            attacker: target,
            tickEvents: actualBattle.tickEvents,
            historyStats: actualBattle.historyStats
          });
        }
      },

      onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
        buff.duration -= secondsElapsed;

        if (buff.duration < 0) {
          removeBuff({ buff, target, caster, actualBattle });
        }
      },

      onRemove({ buff, target }) {
        target.stats.attack += buff.data.attack;
        target.stats.attackMax += buff.data.attack;
      }
    }
  },

  taunt: {
    duplicateTag: 'taunt', // Used to stop duplicate buffs
    icon: 'taunt.svg',
    name: 'taunt',
    description({ buff, level }) {
      return `Forces the enemy to target you. <br />
        Cooldown is reduced by 1.5 seconds per ability level.`;
    },
    scaledCooldown: function(ability) {
      if (ability) {
        if ((ability.level >= 1) && (ability.level <= 5)) {
          return 10 - ((ability.level - 1) * 1.5)
        }
      }
      return 10; // failsafe
    },
    constants: {
    },
    data: {
      duration: 0,
      totalDuration: 0,
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {
        if (target.target === caster.id) { // already being targeted)
          if (caster) {
            const targetAbility = caster.abilitiesMap['taunt'];
            if (targetAbility) {
              targetAbility.cdAdjust = function(abil) {
                return 2;
              };
            }
          }
        } else {
          target.target = caster.id;

          buff.data.endDate = moment().add(0, 'seconds').toDate();

          const hasIntimidate = caster.buffs.find(buff => buff.id === 'enchantment_intimidate');

          if (hasIntimidate) {
            actualBattle.dealDamage(caster.stats.attack * 2, {
              defender: caster,
              attacker: target,
              tickEvents: actualBattle.tickEvents,
              historyStats: actualBattle.historyStats
            });
          }
        }
      },

      onTick({ secondsElapsed, buff, target, caster }) {
        removeBuff({ target, buff, caster })
      }
    }
  },

  scream: {
    duplicateTag: 'scream', // Used to stop duplicate buffs
    icon: 'scream.svg',
    name: 'scream',
    description({ buff, level }) {
      return `Forces all enemies to target you. <br />
        Cooldown increases by 10 seconds for each taunted enemy.`;
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

        const hasIntimidate = caster.buffs.find(buff => buff.id === 'enchantment_intimidate');

        if (hasIntimidate) {
          actualBattle.dealDamage(caster.stats.attack * 2, {
            defender: caster,
            attacker: target,
            tickEvents: actualBattle.tickEvents,
            historyStats: actualBattle.historyStats
          });
        }
      },

      onTick({ secondsElapsed, buff, target, caster }) {
        removeBuff({ target, buff, caster })
      }
    }
  },

  defensive_stance: {
    duplicateTag: 'defensiveStance', // Used to stop duplicate buffs
    icon: 'defensiveStance.svg',
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
        buff.data.endDate = moment().add(buff.duration, 'seconds').toDate();
        // Reduce damage dealt
        const damageDecrease = buff.constants.constants.damageDealtPercentageBase + (buff.constants.constants.damageDealtPercentagePerLevel * buff.data.level);
        // Reduce damage taken 
        const damageReduction = buff.constants.constants.damageTakenPercentageBase + (buff.constants.constants.damageTakenPercentagePerLevel * buff.data.level);

        buff.data.damageDecrease = damageDecrease;
        buff.data.damageReduction = damageReduction;

        buff.data.attackMax = target.stats.attackMax * (buff.data.damageDecrease / 100);
        buff.data.attack = target.stats.attack * (buff.data.damageDecrease / 100);
        target.stats.attackMax -= buff.data.attackMax;
        target.stats.attack -= buff.data.attack;
        target.stats.damageTaken *= (1 - (buff.data.damageReduction / 100));
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
          removeBuff({ target, buff, caster })
        }
      },

      onRemove({ buff, target, caster }) {
        target.stats.attackMax += buff.data.attackMax;
        target.stats.attack += buff.data.attack;
        target.stats.damageTaken /= (1 - (buff.data.damageReduction / 100));
      }
    }
  },

  evasive_maneuvers: {
    duplicateTag: 'evasiveManeuvers', // Used to stop duplicate buffs
    icon: 'evasiveManeuvers.svg',
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
        if (buff.constants && buff.constants.constants) {
          const constants = buff.constants.constants ? buff.constants.constants : buff.constants;
          buff.duration += (buff.data.level * constants.durationPerLevel)
        }
        buff.data.endDate = moment().add(buff.duration, 'seconds').toDate();
        buff.data.damageReduction = target.stats.damageTaken * (99.9 / 100);
        target.stats.damageTaken -= buff.data.damageReduction;
      },

      onTick({ secondsElapsed, buff, target, caster }) {
        let localSecondsElapsed = secondsElapsed;
        buff.duration -= localSecondsElapsed;

        if (buff.duration <= 0) {
          removeBuff({ target, buff, caster })
        }
      },

      onRemove({ buff, target, caster }) {
        if (buff.data.damageReduction) {
          target.stats.damageTaken += buff.data.damageReduction;
        }
      }
    }
  },

  armor_up: {
    duplicateTag: 'armorUp',
    icon: 'armorUp.svg',
    name: 'armor up',
    description({ buff, level }) {
      const armorPerLevel = buff.constants.armorPerLevel;
      const totalArmor = buff.constants.baseArmor + (armorPerLevel * level);
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
        buff.data.endDate = moment().add(buff.duration, 'seconds').toDate();

        const totalArmor = buff.constants.constants.baseArmor + (buff.constants.constants.armorPerLevel * buff.data.level);

        buff.data.totalArmor = totalArmor;
        target.stats.armor += totalArmor;
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
          removeBuff({ target, buff, caster })
        }
      },

      onRemove({ buff, target, caster }) {
        target.stats.armor -= buff.data.totalArmor;
      }
    }
  },

  iron_will: {
    duplicateTag: 'ironWill',
    icon: 'ironWill.svg',
    name: 'iron will',
    description({ buff, level }) {
      const defensePerLevel = buff.constants.defensePerLevel;
      const maxDefense = buff.constants.baseDefense + (defensePerLevel * level);
      return `
        Increase defense by 10 - ${maxDefense}. (+${defensePerLevel} per lvl)<br />
        Based on your missing health. Lasts for ${buff.data.totalDuration}s. `;
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
        buff.data.endDate = moment().add(buff.duration, 'seconds').toDate();

        const maxDefense = buff.constants.constants.baseDefense + (buff.constants.constants.defensePerLevel * buff.data.level);

        buff.data.extraDefense = maxDefense * (1 - (target.stats.health / target.stats.healthMax));
        if (buff.data.extraDefense < 10) {
          buff.data.extraDefense = 10;
        }
        target.stats.defense += buff.data.extraDefense;
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
          removeBuff({ target, buff, caster });
        }
      },

      onRemove({ buff, target, caster }) {
        target.stats.defense -= buff.data.extraDefense;
      }
    }
  },
};
