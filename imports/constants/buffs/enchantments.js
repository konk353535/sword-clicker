import moment from 'moment';
import { addBuff, removeBuff } from '../../battleUtils';
import { BUFFS } from './index.js';
import _ from 'lodash';
import uuid from 'node-uuid';

export const ENCHANTMENT_BUFFS = {

  baby_earth_fox: {
    duplicateTag: 'baby_earth_fox', // Used to stop duplicate buffs
    icon: 'babyEarthFox.svg',
    name: 'earth fox',
    description() {
      return `Taunts every 15 seconds`;
    },
    constants: {
    },
    data: {
      duration: Infinity,
      totalDuration: Infinity
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
      },

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
        if (buff.data.timeTillCharge > 0) {
          buff.data.timeTillCharge -= secondsElapsed;
        } else {
          buff.data.timeTillCharge = 15;
          const targetsToTaunt = actualBattle.enemies.filter((enemy) => {
            return enemy.target !== target.id;
          });

          if (targetsToTaunt.length > 0) {
            const targetToTaunt = _.sample(targetsToTaunt);
            targetToTaunt.target = target.id;
          }
        }

        buff.stacks = Math.round(buff.data.timeTillCharge);
      },

      onRemove({ buff, target, caster }) {
        // Blank
      }
    }
  },

  baby_water_fox: {
    duplicateTag: 'baby_water_fox', // Used to stop duplicate buffs
    icon: 'babyWaterFox.svg',
    name: 'water fox',
    description() {
      return `Heals for 50% of magic power every 5 seconds`;
    },
    constants: {
    },
    data: {
      duration: Infinity,
      totalDuration: Infinity
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
      },

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
        if (buff.data.timeTillCharge > 0) {
          buff.data.timeTillCharge -= secondsElapsed;
        } else {
          buff.data.timeTillCharge = 5;
          const targetToHeal = _.sample(actualBattle.units);
          actualBattle.healTarget(target.stats.magicPower * 0.5, {
            caster: target,
            target: targetToHeal,
            tickEvents: actualBattle.tickEvents,
            historyStats: actualBattle.historyStats,
          });
        }

        buff.stacks = Math.round(buff.data.timeTillCharge);
      },

      onRemove({ buff, target, caster }) {
        // Blank
      }
    }
  },

  baby_fire_fox: {
    duplicateTag: 'baby_fire_fox', // Used to stop duplicate buffs
    icon: 'babyFireFox.svg',
    name: 'fire fox',
    description() {
      return `Deals 50% of magic power every 5 seconds`;
    },
    constants: {
    },
    data: {
      duration: Infinity,
      totalDuration: Infinity
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
      },

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
        if (buff.data.timeTillCharge > 0) {
          buff.data.timeTillCharge -= secondsElapsed;
        } else {
          buff.data.timeTillCharge = 5;
          const targetToAttack = _.sample(actualBattle.enemies);
          actualBattle.dealDamage(target.stats.magicPower * 0.5, {
            attacker: target,
            defender: targetToAttack,
            isMagic: true,
            tickEvents: actualBattle.tickEvents,
            historyStats: actualBattle.historyStats,
          });
        }

        buff.stacks = Math.round(buff.data.timeTillCharge);
      },

      onRemove({ buff, target, caster }) {
        // Blank
      }
    }
  },

  baby_fox: {
    duplicateTag: 'baby_fox', // Used to stop duplicate buffs
    icon: 'babyFox.svg',
    name: 'babyFox',
    description() {
      return `Summons a baby fox`;
    },
    constants: {
    },
    data: {
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster, actualBattle }) {
      },

      onTick({ buff, target, caster, secondsElapsed, actualBattle }) {
        if (!buff.data.isSpawned) {
          buff.data.isSpawned = true;
          buff.data.hideBuff = true;
          // Spawn our fox
          const foxToSpawn = _.sample(['fire', 'water', 'air', 'earth']);
          let fox = {
            id: uuid.v4(),
            tickOffset: 0,
          };

          if (foxToSpawn === 'fire') {
            fox.icon = 'babyFireFox.svg';
            fox.name = 'Fire fox';
            fox.stats = {
              attack: 1,
              attackMax: 1,
              attackSpeed: 1,
              accuracy: 1,
              health: target.stats.healthMax * 0.1,
              healthMax: target.stats.healthMax * 0.1,
              defense: target.stats.defense * 0.5,
              armor: target.stats.armor * 0.5,
              magicArmor: target.stats.magicArmor * 0.5,
              magicPower: target.stats.magicPower,
              damageTaken: 1
            };
            fox.buffs = [{
              id: 'baby_fire_fox',
              data: {
                duration: Infinity,
                totalDuration: Infinity,
                name: 'baby fire fox',
                timeTillCharge: 5,
                icon: 'babyFireFox.svg'
              }
            }]
          } else if (foxToSpawn === 'earth') {
            fox.icon = 'babyEarthFox.svg';
            fox.name = 'Earth fox';
            fox.stats = {
              attack: target.stats.attackMax * 0.05,
              attackMax: target.stats.attackMax * 0.05,
              attackSpeed: 0.5,
              accuracy: target.stats.accuracy * 0.5,
              health: target.stats.healthMax * 0.25,
              healthMax: target.stats.healthMax * 0.25,
              defense: target.stats.defense,
              armor: target.stats.armor,
              magicArmor: target.stats.magicArmor,
              magicPower: target.stats.magicPower * 0.5,
              damageTaken: 1
            };
            fox.buffs = [{
              id: 'baby_earth_fox',
              data: {
                duration: Infinity,
                totalDuration: Infinity,
                name: 'baby earth fox',
                timeTillCharge: 2,
                icon: 'babyEarthFox.svg'
              }
            }]
          } else if (foxToSpawn === 'air') {
            fox.icon = 'babyAirFox.svg';
            fox.name = 'Air fox';
            fox.stats = {
              attack: target.stats.attackMax * 0.1,
              attackMax: target.stats.attackMax * 0.1,
              attackSpeed: 1,
              accuracy: target.stats.accuracy,
              health: target.stats.healthMax * 0.15,
              healthMax: target.stats.healthMax * 0.15,
              defense: target.stats.defense * 0.6,
              armor: target.stats.armor * 0.6,
              magicArmor: target.stats.magicArmor * 0.6,
              magicPower: target.stats.magicPower * 0.6,
              damageTaken: 1
            };
            fox.buffs = [];
          } else if (foxToSpawn === 'water') {
            fox.icon = 'babyWaterFox.svg';
            fox.name = 'Water fox';
            fox.stats = {
              attack: 1,
              attackMax: 1,
              attackSpeed: 0.001,
              accuracy: 1,
              health: target.stats.healthMax * 0.1,
              healthMax: target.stats.healthMax * 0.1,
              defense: target.stats.defense * 0.5,
              armor: target.stats.armor * 0.5,
              magicArmor: target.stats.magicArmor * 0.5,
              magicPower: target.stats.magicPower,
              healingPower: target.stats.healingPower,
              damageTaken: 1
            };
            fox.buffs = [{
              id: 'baby_water_fox',
              data: {
                duration: Infinity,
                totalDuration: Infinity,
                name: 'baby water fox',
                icon: 'babyWaterFox.svg',
                timeTillCharge: 5                
              }
            }]
          }

          actualBattle.units.push(fox);
        }
      },

      onRemove({ buff, target }) {
      }
    }
  },

  bison_axe: {
    duplicateTag: 'bison_axe', // Used to stop duplicate buffs
    icon: 'bisonAxe.svg',
    name: 'bison axe',
    description() {
      return `Every 5 seconds an auto attacks becomes charged. Dealing its damage to all enemies.`;
    },
    constants: {
    },
    data: {
      duration: Infinity,
      totalDuration: Infinity
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
        buff.data.timeTillCharge = 5;
        buff.stacks = Math.round(buff.data.timeTillCharge);
      },

      onTick({ secondsElapsed, buff }) {
        if (buff.data.timeTillCharge > 0) {
          buff.data.timeTillCharge -= secondsElapsed;
          buff.stacks = Math.round(buff.data.timeTillCharge);
        }
      },

      onDidDamage({ buff, defender, attacker, actualBattle, damageDealt }) {
        if (buff.data.timeTillCharge <= 0) {
          buff.data.timeTillCharge = 5;
          actualBattle.enemies.forEach((enemy) => {
            if (enemy.id !== defender.id) {
              actualBattle.dealDamage(damageDealt, {
                attacker: attacker,
                defender: enemy,
                // Need to make sure this is required
                isTrueDamage: true,
                tickEvents: actualBattle.tickEvents,
                historyStats: actualBattle.historyStats,
              });
            }
          });
        }
      },

      onRemove({ buff, target, caster }) {
        // Blank
      }
    }
  },

  krakens_tentacle: {
    duplicateTag: 'krakens_tentacle', // Used to stop duplicate buffs
    icon: 'tentacle.svg',
    name: 'krakens tentacle',
    description() {
      return `Each auto attack gives 1 charge. <br />At 20 charges increases attack speed by 50% for 3 seconds.`;
    },
    constants: {
    },
    data: {
      duration: Infinity,
      totalDuration: Infinity
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
        buff.data.charges = 0;
      },

      onDidDamage({ buff, attacker }) {
        if (!buff.data.isActive) {
          buff.data.charges += 1;
          buff.stacks = buff.data.charges;
        }

        if (buff.data.charges >= 20 && !buff.data.isActive) {
          attacker.stats.attackSpeed *= 1.5;
          buff.data.timeTillEnd = 3;
          buff.data.isActive = true;
          buff.stacks = undefined;
          buff.data.icon = 'tentacleRed.svg';
        }
      },

      onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
        if (buff.data.isActive) {
          buff.data.timeTillEnd -= secondsElapsed;
          if (buff.data.timeTillEnd <= 0) {
            buff.data.isActive = false;
            buff.data.charges = 0;
            target.stats.attackSpeed /= 1.5;
            buff.data.icon = 'tentacle.svg';
          }
        }
      },

      onRemove({ buff, target, caster }) {
        // Blank
      }
    }
  },

  rich_snake_skin: {
    duplicateTag: 'rich_snake_skin', // Used to stop duplicate buffs
    icon: 'richSnakeSkin.svg',
    name: 'rich snake skin',
    description() {
      return `Converts 10% of armor into defense.`;
    },
    constants: {
    },
    data: {
      duration: Infinity,
      totalDuration: Infinity
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
        const amountToAdd = target.stats.armor * 0.1;
        buff.data.defense = amountToAdd;
        target.stats.defense += buff.data.defense;
        buff.stacks = Math.round(buff.data.defense);
      },

      onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
      },

      onRemove({ buff, target, caster }) {
        // Blank
        target.stats.defense -= buff.data.defense;
      }
    }
  },

  frankensteins_heart: {
    duplicateTag: 'frankensteins_heart', // Used to stop duplicate buffs
    icon: 'frankensteinsHeart.svg',
    name: 'frankensteins heart',
    description() {
      return `Increases attack by 1% (of max attack) every 7 seconds. <br />Caps at +35% damage.`;
    },
    constants: {
    },
    data: {
      duration: Infinity,
      totalDuration: Infinity
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
        buff.data.totalTime = 0;
        buff.data.totalDamage = 0;
      },

      onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
        buff.data.totalTime += secondsElapsed;
        if (actualBattle.tick % 4 === 0) {
          target.stats.attack -= buff.data.totalDamage;
          target.stats.attackMax -= buff.data.totalDamage;
          // Extra damage
          const roundedTime = Math.ceil(buff.data.totalTime / 7);
          const extraDamagePercentage = roundedTime < 35 ? roundedTime : 35;
          buff.data.totalDamage = target.stats.attackMax * (extraDamagePercentage / 100);
          target.stats.attackMax += buff.data.totalDamage;
          target.stats.attack += buff.data.totalDamage;
          buff.stacks = Math.round(buff.data.totalDamage);
        }
      },

      onRemove({ buff, target, caster }) {
        // Blank
      }
    }
  },

  bloody_plate_legs: {
    duplicateTag: 'bloody_plate_legs', // Used to stop duplicate buffs
    icon: 'bloodyPlatelegs.png',
    name: 'bloody plate legs',
    description() {
      return `10% chance on hit to inflict 3s bleed.<br />(10% of max damage / second)`;
    },
    constants: {
    },
    data: {
      duration: Infinity,
      totalDuration: Infinity
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
      },

      onDidDamage({ buff, defender, attacker, actualBattle }) {
        const constants = buff.constants.constants;
        const bleedChance = 0.1;

        if (Math.random() <= bleedChance) {
          const newBuff = {
            id: 'bleed_proper',
            data: {
              duration: 3,
              totalDuration: 3,
              dps: JSON.parse(JSON.stringify(attacker.stats.attackMax / 10)),
              caster: attacker.id,
              timeTillDamage: 1,
              allowDuplicates: true,
              icon: 'bleed.svg',
              name: 'bleed',
              description: `Bleed every second for ${(attacker.stats.attackMax / 10).toFixed(2)} damage`
            }
          };

          // Add bleed debuff
          addBuff({ buff: newBuff, target: defender, caster: attacker });
        }
      },

      onTick({ secondsElapsed, buff, target, caster }) {
      },

      onRemove({ buff, target, caster }) {
        // Blank
      }
    }
  },

  living_helmet: {
    duplicateTag: 'living_helmet', // Used to stop duplicate buffs
    icon: 'livingHelmet.png',
    name: 'living helmet',
    description() {
      return `When above 75% hp living helmet takes over. <br />
        Granting +10 defense, and healing allies for 5hp when you take damage`;
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
        buff.data.isActive = false;
        buff.data.hideBuff = true;
      },

      onTookDamage({ buff, defender, attacker, actualBattle }) {
        if (buff.data.isActive) {
          actualBattle.units.forEach((unit) => {
            if (unit.id !== defender.id) {
              actualBattle.healTarget(5, {
                caster: defender,
                target: unit,
                tickEvents: actualBattle.tickEvents,
                historyStats: actualBattle.historyStats
              });              
            }
          })
        }
      },

      onTick({ secondsElapsed, buff, target, caster }) {
        // Blank
        const decimal = target.stats.health / target.stats.healthMax;
        if (decimal >= 0.75 && !buff.data.isActive) {
          buff.data.isActive = true;
          buff.data.hideBuff = false;
          target.stats.defense += 10;
        } else if (decimal < 0.75 && buff.data.isActive) {
          buff.data.isActive = false;
          buff.data.hideBuff = true;
          target.stats.defense -= 10;
        }
      },

      onRemove({ buff, target, caster }) {
        // Blank
      }
    }
  },

  shadow_knife: {
    duplicateTag: 'shadow_knife', // Used to stop duplicate buffs
    icon: 'shadowKnife.svg',
    name: 'shadow knife',
    description() {
      return `Reduce cooldown of blade spin by 0.5s for each successful auto attack.`;
    },
    constants: {
      accuracyDecimal: 0.85,
    },
    data: {
      duration: Infinity,
      totalDuration: Infinity
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
        // Blank
      },

      onDidDamage({ buff, defender, attacker, actualBattle, rawDamage }) {
        const bladeSpin = _.findWhere(attacker.abilities, { id: 'blade_spin' });
        if (bladeSpin && bladeSpin.currentCooldown > 0) {
          bladeSpin.currentCooldown -= 0.5;
        }
      },

      onTick({ secondsElapsed, buff, target, caster }) {
        // Blank
      },

      onRemove({ buff, target, caster }) {
        // Blank
      }
    }
  },

  smoke_dagger: {
    duplicateTag: 'smoke_dagger', // Used to stop duplicate buffs
    icon: 'smokeDagger.svg',
    name: 'smoke dagger',
    description() {
      return `Apply 25% accuracy debuff to enemies damaged by bladespin.`;
    },
    constants: {
      accuracyDecimal: 0.75,
    },
    data: {
      duration: Infinity,
      totalDuration: Infinity
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
        // Blank
      },

      onDidDamage({ buff, defender, attacker, actualBattle, rawDamage }) {
      },

      onTick({ secondsElapsed, buff, target, caster }) {
        // Blank
      },

      onRemove({ buff, target, caster }) {
        // Blank
      }
    }
  },

  smoke_dagger_debuff: {
    duplicateTag: 'smoke', // Used to stop duplicate buffs
    icon: 'smoke.svg',
    name: 'smoke',
    description() {
      return `Reduce accuracy`;
    },
    constants: {
      accuracyDecimal: 0.75,
    },
    data: {
      duration: 7,
      totalDuration: 7
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
        // Blank
        target.stats.accuracy -= buff.data.accuracyReduction;
      },

      onTick({ secondsElapsed, buff, target, caster }) {
        buff.duration -= secondsElapsed;
        if (buff.duration <= 0) {
          removeBuff({ target, buff, caster: target })
        }
      },

      onRemove({ buff, target, caster }) {
        // Blank
        target.stats.accuracy += buff.data.accuracyReduction;
      }
    }
  },

  axe_cleave: {
    duplicateTag: 'axe_cleave', // Used to stop duplicate buffs
    icon: 'boneKingsAxe.svg',
    name: 'axe cleave',
    description() {
      return `Deal 40% weapon damage to another enemy.`;
    },
    constants: {
      damageDecimal: 0.40,
    },
    data: {
      duration: Infinity,
      totalDuration: Infinity
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
        // Blank
      },

      onDidDamage({ buff, defender, attacker, actualBattle, rawDamage }) {
        const constants = buff.constants.constants;
        const baseDamage = attacker.stats.attack;
        const totalDamage = rawDamage * constants.damageDecimal;

        let target;
        actualBattle.enemies.forEach((enemy) => {
          if (!target && enemy.id !== defender.id) {
            target = enemy;
          }
        });

        if (target) {
         actualBattle.dealDamage(totalDamage, {
            attacker,
            defender: target,
            tickEvents: actualBattle.tickEvents,
            historyStats: actualBattle.historyStats
          });
        }
      },

      onTick({ secondsElapsed, buff, target, caster }) {
        // Blank
      },

      onRemove({ buff, target, caster }) {
        // Blank
      }
    }
  },

  magic_blade: {
    duplicateTag: 'magic_blade', // Used to stop duplicate buffs
    icon: 'magicBlade.svg',
    name: 'magic blade',
    description() {
      return `Deals 25% magic damage on hit`;
    },
    constants: {
      damageDecimal: 0.25,
    },
    data: {
      duration: Infinity,
      totalDuration: Infinity
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
        // Blank
      },

      onDidDamage({ buff, defender, attacker, actualBattle, damageDealt, rawDamage }) {
        const constants = buff.constants.constants;
        const baseDamage = attacker.stats.attack;
        const totalDamage = rawDamage * constants.damageDecimal;

        actualBattle.dealDamage(totalDamage, {
          attacker,
          defender,
          isMagic: true,
          tickEvents: actualBattle.tickEvents,
          historyStats: actualBattle.historyStats
        });
      },

      onTick({ secondsElapsed, buff, target, caster }) {
        // Blank
        if (buff.duration <= 0) {
          target.buffs = target.buffs.filter((targetBuff) => {
            return targetBuff.id !== buff.id
          });
        }
      },

      onRemove({ buff, target, caster }) {
        // Blank
      }
    }
  },

  druidic_hat: {
    duplicateTag: 'druidic_hat', // Used to stop duplicate buffs
    icon: 'druidsHat.svg',
    name: 'druids blessing',
    description() {
      return `Emergency heal an ally below 30% hp for 250% MP`;
    },
    constants: {
      healMagicPower: 2.5
    },
    data: {
      duration: Infinity,
      totalDuration: Infinity
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
        // Blank
      },

      onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
        if (buff.data.timeTillHeal == null) {
          buff.data.timeTillHeal = 1.5;
        } else {
          buff.data.timeTillHeal -= secondsElapsed;
        }

        if (buff.data.timeTillHeal <= 0) {
          // Heal a random ally
          let lowestHp = Infinity;
          let targetUnit;
          actualBattle.units.forEach((unit) => {
            const hpPercentage = unit.stats.health / unit.stats.healthMax;
            if (hpPercentage < lowestHp) {
              lowestHp = hpPercentage;
              targetUnit = unit;
            }
          });

          if (targetUnit && lowestHp <= 0.3 && targetUnit !== target) {
            const totalHeal = target.stats.magicPower * 2.5;
            actualBattle.healTarget(totalHeal, {
              caster: target,
              target: targetUnit,
              tickEvents: actualBattle.tickEvents,
              historyStats: actualBattle.historyStats
            });

            removeBuff({ buff, target, caster: target });
          }

          buff.data.timeTillHeal = 1.5;
        }
      },

      onRemove({ buff, target, caster }) {
        // Blank
      }
    }
  },

  oversized_club: {
    duplicateTag: 'oversized_club', // Used to stop duplicate buffs
    icon: 'oversizedClub.svg',
    name: 'over side club',
    description() {
      return `35% chance to shred targets magic armor by 60`;
    },
    constants: {
      chance: 0.35,
      shred: 60
    },
    data: {
      duration: Infinity,
      totalDuration: Infinity
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
        // Blank
      },

      onDidDamage({ buff, defender, attacker, actualBattle, damageDealt, rawDamage }) {
        const constants = buff.constants.constants;

        if (Math.random() <= constants.chance) {
          const armorReduction = constants.shred;
          const newBuff = {
            id: 'magic_armor_reduction',
            data: {
              duration: 5,
              allowDuplicates: true,
              totalDuration: 5,
              armorReduction,
              icon: 'magicArmorReduction.svg',
              description: `Reduces your magic armor by ${armorReduction}%`
            }
          };

          // Add magic armor debuff
          addBuff({ buff: newBuff, target: defender, caster: attacker });
        }
      },

      onTick({ secondsElapsed, buff, target, caster }) {
        // Blank
      },

      onRemove({ buff, target, caster }) {
        // Blank
      }
    }
  },

  phoenix_hat: {
    duplicateTag: 'phoenix_hat', // Used to stop duplicate buffs
    icon: 'babyPhoenix.svg',
    name: 'phoenix hat',
    description() {
      return `Randomly ignites enemies. Fades away after 5 ignites.`;
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
      },

      onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
        if (!buff.stacks) {
          buff.stacks = 5;
        }

        if (Math.random() <= 0.02) {
          const targetEnemy = _.sample(actualBattle.enemies);
          const newBuff = {
            id: 'ignite_proper_phoenix_hat',
            data: {
              allowDuplicates: true,
              duration: 15,
              totalDuration: 15,
              icon: 'ignite.svg',
              description: ''
            },
            constants: BUFFS['ignite_proper_phoenix_hat']
          };

          // cast ignite
          addBuff({ buff: newBuff, target: targetEnemy, caster: target, actualBattle });
          buff.stacks -= 1;

          if (buff.stacks <= 0) {
            removeBuff({ buff, target, caster: target });
          }
        }
      },

      onRemove({ buff, target, caster }) {
        // Blank
      }
    }
  },

  demons_heart: {
    duplicateTag: 'demons_heart', // Used to stop duplicate buffs
    icon: 'demonsHeart.svg',
    name: 'demons heart',
    description() {
      return `
        When you die, temporarily heal to full hp and become cursed.<br />
        Cursed: +50% damage, +50% attack speed, +50 hybrid armor<br />
        Take increasing damage each second. You cannot cast abilities while cursed`;
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
      },

      onBeforeDeath({ buff, target, actualBattle }) {
        if (!buff.data.active) {
          target.silenced = true;
          target.stats.health = target.stats.healthMax;
          target.stats.attackMax *= 1.5;
          target.stats.attack *= 1.5;
          target.stats.armor += 50;
          target.stats.magicArmor += 50;
          target.stats.attackSpeed *= 1.5;
          target.icon = 'demon.svg';
          buff.data.active = true;
          buff.data.secondsElapsed = 0; 
        }
      },

      onTick({ secondsElapsed, buff, target, caster, actualBattle }) {
        if (buff.data.active) {
          buff.data.secondsElapsed += secondsElapsed;
          const percentDamage = (buff.data.secondsElapsed / 12) * 100;
          target.stats.health -= ((target.stats.healthMax / 100) * percentDamage) * secondsElapsed;
          actualBattle.checkDeath(target)
        }
      },

      onRemove({ buff, target, caster }) {
        target.stats.attackMax /= 1.5;
        target.stats.attack /= 1.5;
        target.stats.armor -= 50;
        target.stats.magicArmor -= 50;
        target.stats.attackSpeed /= 1.5;
      }
    }
  },

  winged_shield: {
    duplicateTag: 'winged_shield', // Used to stop duplicate buffs
    icon: 'winged_shield.svg',
    name: 'winged shield',
    description() {
      return `Every 15 seconds, blocks the damage from the next attack.`;
    },
    constants: {
    },
    data: {
      duration: Infinity,
      totalDuration: Infinity
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
        buff.data.timeTillDodge = 15;
        buff.stacks = Math.round(buff.data.timeTillDodge);
        buff.data.dodge = false;
      },

      onTick({ buff, target, secondsElapsed }) {
        if (buff.data.timeTillDodge > 0) {
          buff.data.timeTillDodge -= secondsElapsed;
        } else if (!buff.data.dodge) {
          buff.data.damageReduction = target.stats.damageTaken * (99.9 / 100);
          target.stats.damageTaken -= buff.data.damageReduction;
          buff.data.dodge = true;
        }
        if (buff.data.timeTillDodge < 0) {
          buff.data.timeTillDodge = 0;
        }
        buff.stacks = Math.round(buff.data.timeTillDodge);
      },

      onTookDamage({ buff, defender, attacker, actualBattle }) {
        // re-add DR once a hit has been tanked
        if (buff.data.dodge) {
          defender.stats.damageTaken += buff.data.damageReduction;
          buff.data.timeTillDodge = 15;
          buff.data.dodge = false;
        }
      },

      onRemove({ buff, target, caster }) {
        // Blank
      }
    }
  },

  warden_shield: {
    duplicateTag: 'warden_shield',
    icon: 'warden_shield.svg',
    name: 'warden shield',
    description({ buff, level }) {
      const defensePerLevel = Math.round(buff.constants.defensePerLevel * 100);
      const maxDefense = Math.round((buff.constants.baseDefense + (defensePerLevel * level)) * 100);
      return `
        Redirects ${maxDefense}% (+${defensePerLevel}% per lvl) damage from allies onto yourself.`;
    },
    constants: {
      baseDefense: 0.3,
      defensePerLevel: 0.05,
    },
    data: {
      duration: Infinity,
      totalDuration: Infinity,
      allies: 'units',
      applyToAllies: true,
      appliedToAllies: false,
      sourceAlly: null
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
        // Blank
      },

      onTick({ buff, target, caster, actualBattle }) {
        // apply buff to 'allies' if required
        if (buff.data.applyToAllies && !buff.data.appliedToAllies) {
          const newBuff = {
            id: 'warden_shield',
            data: {
              duration: Infinity,
              totalDuration: Infinity,
              caster: target.id,
              icon: 'warden_shield.svg',
              name: 'warden shield',
              allies: buff.data.allies,
              applyToAllies: false,
              appliedToAllies: false,
              sourceAlly: target.id,
              hideBuff: false,
              level: buff.data.level
            },
            constants: BUFFS['warden_shield']
          };
          // apply to all but self
          actualBattle[buff.data.allies].filter((ally) => { return ally.id !== target.id }).forEach((ally) => {
            addBuff({ buff: newBuff, target: ally, caster: caster });
          });
          buff.data.appliedToAllies = true;
        }
      },

      onTookDamage({ buff, defender, attacker, actualBattle, damageDealt }) {
        if (buff.data.sourceAlly !== null) {
          // try fo find ally
          const sourceAlly = actualBattle[buff.data.allies].find((ally) => { return ally.id === buff.data.sourceAlly });
          if(!_.isUndefined(sourceAlly)) {
            // redirect damage from self to sourceAlly
            const redirectDamage = damageDealt * (buff.constants.constants.baseDefense + (buff.constants.constants.defensePerLevel * buff.data.level));
            actualBattle.healTarget(redirectDamage, {
              caster: sourceAlly,
              target: defender,
            });
            actualBattle.dealDamage(redirectDamage, {
              attacker: defender,
              defender: sourceAlly,
              tickEvents: actualBattle.tickEvents
            });
          }
        }
      },

      onRemove({ buff, target, caster }) {
        // Blank
      }
    }
  },

  angels_heart: {
    duplicateTag: 'angels_heart',
    icon: 'angels_heart.svg',
    name: 'angels heart',
    description({ buff, level }) {
      const healthTransferCost = buff.constants.baseTransferRate * level;
      const healthTransfer = healthTransferCost * buff.constants.baseTransferEfficiency;
      return `Heals allies for ${healthTransfer * 4} per second at the cost of ${healthTransferCost * 4} health.`;
    },
    constants: {
      baseTransferRate: 5,
      baseTransferEfficiency: 1
    },
    data: {
      duration: Infinity,
      totalDuration: Infinity,
      allies: 'units',
    },
    events: { // This can be rebuilt from the buff id
      onApply({ buff, target, caster }) {
        // Blank
      },

      onTick({ buff, target, caster, actualBattle }) {
        const constants = buff.constants.constants;
        let healthTransferred = false;
        const healthToTransfer = buff.data.level * constants.baseTransferRate;
        const actualHealthTransferred = healthToTransfer * constants.baseTransferEfficiency;
        actualBattle[buff.data.allies].forEach((ally) => {
          if (ally.id === target.id) return;
          // transfer HP from self to allies
          if ((ally.stats.health + actualHealthTransferred) < ally.stats.healthMax) {
            healthTransferred = true;
            actualBattle.healTarget(actualHealthTransferred, {
              caster: target,
              target: ally,
              tickEvents: actualBattle.tickEvents
            });
          }
        });
        if (healthTransferred) {
          target.stats.health -= healthToTransfer;
        }
      },

      onRemove({ buff, target, caster }) {
        // Blank
      }
    }
  },
};
