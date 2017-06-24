import { BATTLES } from '/server/constants/battles/index.js'; // List of encounters
import { ABILITIES, BUFFS } from '/server/constants/combat/index.js'; // List of available combat stats
import { FLOORS } from '/server/constants/floors/index.js'; // List of floor details

import moment from 'moment';
import _ from 'underscore';
import { Random } from 'meteor/random'

import { attackSpeedTicks } from '/server/utils';
import { castAbility } from './castAbility.js';
import { completeBattle } from './completeBattle.js';

import { Battles, BattlesList } from '/imports/api/battles/battles';
import { BattleActions } from '/imports/api/battles/battleActions';

const redis = new Meteor.RedisCollection('redis');

const tickTracker = {};

export const progressBattle = function (actualBattle, battleIntervalId) {

  if (tickTracker[actualBattle._id]) {
    tickTracker[actualBattle._id] += 1;
  } else {
    tickTracker[actualBattle._id] = 1;
  }

  if (!actualBattle || tickTracker[actualBattle._id] > 6000) {
    console.log('I activate my trap card, tick tracker!');
    Meteor.clearInterval(battleIntervalId);
    if (actualBattle) {
      delete tickTracker[actualBattle._id];
      // Remove from battle list
      BattlesList.remove(actualBattle._id);
      // Remove from redis
      redis.del(`battles-${actualBattle._id}`);
    }
    return;
  }

  actualBattle.tickEvents = [];
  actualBattle.allAliveUnits = actualBattle.units.concat(actualBattle.enemies);

  // If this is the first tick apply all passives to appropriate units
  if (actualBattle.tick === 0) {
    actualBattle.allAliveUnits.forEach((unit) => {
      if (unit.abilities) {
        unit.abilities.forEach((ability) => {
          if (ABILITIES[ability.id].isPassive) {
            const targets = [unit.id];
            // Cast it! and put it on cooldown
            const abilityToCast = JSON.parse(JSON.stringify(ABILITIES[ability.id]));
            abilityToCast.level = ability.level;

            // Fetch who we are are targetting with this ability
            castAbility({
              ability: abilityToCast,
              caster: unit,
              targets: [unit],
              actualBattle
            });
          }
        })
      }
    })
  }

  // Fetch actions related to this battle
  const rawBattleActions = redis.get(`battleActions-${actualBattle._id}`);
  const battleActions = rawBattleActions ? JSON.parse(rawBattleActions) : [];

  // Remove all battle actions as we've got them for this tick
  if (rawBattleActions) {
    redis.del(`battleActions-${actualBattle._id}`);
  }

  const dealDamage = function(rawDamage, { attacker, defender, tickEvents, customColor, customIcon, isMagic, isTrueDamage }) {

    let damage = rawDamage;
    if (damage > 0 && damage) {
      let dmgReduction = BATTLES.dmgReduction(isMagic ? defender.stats.magicArmor : defender.stats.armor);

      if (dmgReduction < 0) {
        dmgReduction = 0;
      } else if (isTrueDamage) {
        dmgReduction = 0;
      } else if (dmgReduction > 1) {
        dmgReduction = 1;
      } else if (dmgReduction == null) {
        dmgReduction = 0;
      }
      damage = (rawDamage * (1 - dmgReduction)) * defender.stats.damageTaken;
      defender.stats.health -= damage;
    }

    tickEvents.push({
      from: attacker ? attacker.id : '',
      to: defender.id,
      eventType: 'damage',
      label: damage.toFixed(1),
      customColor: isMagic ? 'blue' : customColor,
      customIcon: isMagic ? 'magic' : customIcon
    });

    return damage;
  }

  const healTarget = function(healAmount, { target, caster, tickEvents, customColor, customIcon }) {

    if (target.stats.healingReduction != null) {
      healAmount *= target.stats.healingReduction;
    }

    target.stats.health += healAmount;
    if (target.stats.health > target.stats.healthMax) {
      target.stats.health = target.stats.healthMax;
    }

    tickEvents.push({
      from: caster ? caster.id : '',
      to: target.id,
      eventType: 'heal',
      label: (healAmount).toFixed(1),
      customColor: '#d9534f',
      customIcon: 'health'
    });
  }

  const autoAttack = function({ attacker, defender, tickEvents }) {
    // Do we hit?
    let hitGap = attacker.stats.accuracy - defender.stats.defense;
    let hitChance = 0.5;

    if (hitGap > 0) {
      // Favours attacker
      const extraChance = (Math.abs(hitGap) / (Math.abs(hitGap) + 25)) / 2;
      hitChance += extraChance;
    } else {
      // Favours defender
      const extraChance = (Math.abs(hitGap) / (Math.abs(hitGap) + 25)) / 2;
      hitChance -= extraChance;
    }
    if (hitChance >= Math.random()) {
      // How much do we hit for
      const extraRawDamage = Math.round(Math.random() * (attacker.stats.attackMax - attacker.stats.attack));
      let rawDamage = attacker.stats.attack + extraRawDamage;

      // Is this a crit?
      let customIcon;
      if (attacker.stats.criticalChance && Math.random() <= attacker.stats.criticalChance) {
        rawDamage *= attacker.stats.criticalDamage;
        customIcon = 'criticalStrike';
      }

      const damageDealt = dealDamage(rawDamage, { attacker, defender, tickEvents, customIcon });

      // Tick didDamage event on attacker
      if (attacker.buffs) {
        attacker.buffs.forEach((buff) => {
          buff.constants = BUFFS[buff.id];
          if (buff.constants.events.onDidDamage) {
            // Did Damage
            buff.constants.events.onDidDamage({ secondsElapsed, buff, defender, attacker, actualBattle, damageDealt })
          }
        });
      }

      // Tick tookDamage event on defender
      if (defender.buffs) {
        defender.buffs.forEach((buff) => {
          buff.constants = BUFFS[buff.id];
          if (buff.constants.events.onTookDamage) {
            // Took Damage
            buff.constants.events.onTookDamage({ secondsElapsed, buff, defender, attacker, actualBattle, damageDealt })
          }
        });
      }

    } else {
      dealDamage(0, { attacker, defender, tickEvents });
    }
  }

  actualBattle.utils = {
    autoAttack,
    dealDamage,
    healTarget
  }

  const secondsElapsed = (BATTLES.tickDuration / 1000);

  // Tick buffs on all units
  actualBattle.enemies.concat(actualBattle.units).forEach((aliveUnit) => {
    if (aliveUnit.buffs) {
      // Buffs can do things on tick, will collect them in the form of combatEvents
      aliveUnit.buffs.forEach((buff) => {
        buff.constants = BUFFS[buff.id];
        if (buff.constants.events.onTick) {
          buff.constants.events.onTick({ secondsElapsed, buff, target: aliveUnit, actualBattle });
        }
      });
    }
  });

  // Apply enemy attacks
  actualBattle.enemies.forEach((enemy) => {
    if ((actualBattle.tick - enemy.tickOffset) % enemy.stats.attackSpeedTicks === 0) {
      let defender = actualBattle.units[0];
      if (enemy.target) {
        const targetUnit = _.findWhere(actualBattle.units, { id: enemy.target });
        if (targetUnit) {
          defender = targetUnit;
        } else {
          enemy.target = defender.id;
        }
      } else {
        enemy.target = defender.id;
      }
      autoAttack({ attacker: enemy, defender, tickEvents: actualBattle.tickEvents });
    }
  });

  // Remove any dead units
  for (let i = actualBattle.units.length - 1; i >= 0; i--) {
    const unit = actualBattle.units[i];
    if (unit.stats.health <= 0 || !unit.stats.health) {
      unit.stats.health = 0;

      // Call death event for this unit
      if (unit.buffs) {
        // Buffs can do things on tick, will collect them in the form of combatEvents
        unit.buffs.forEach((buff) => {
          buff.constants = BUFFS[buff.id];
          if (buff.constants.events.onBeforeDeath) {
            buff.constants.events.onBeforeDeath({ buff, target: unit, actualBattle });
          }
        });
      }

      // Only kill unit if it is still dead
      if (unit.stats.health <= 0) {
        actualBattle.deadUnits.push(unit);
        actualBattle.units.splice(i, 1);
      }
    }
  }

  // Apply player attacks
  actualBattle.units.forEach((unit) => {
    if (unit && (actualBattle.tick - unit.tickOffset) % unit.stats.attackSpeedTicks === 0) {
      let defender = actualBattle.enemies[0];
      // Do we have a preferred target
      if (unit.target) {
        const targetEnemy = _.findWhere(actualBattle.enemies, { id: unit.target });
        if (targetEnemy) {
          defender = targetEnemy;
        } else {
          delete unit.target;
        }
      }
      if (defender) {
        autoAttack({ attacker: unit, defender, tickEvents: actualBattle.tickEvents });
      }
    }
  });

  actualBattle.tick += 1;

  // Remove any dead enemies
  for (let i = actualBattle.enemies.length - 1; i >= 0; i--) {
    const enemy = actualBattle.enemies[i];
    if (enemy.stats.health <= 0 || !enemy.stats.health) {
      enemy.stats.health = 0;

      // Call death event for this enemy
      if (enemy.buffs) {
        // Buffs can do things on tick, will collect them in the form of combatEvents
        enemy.buffs.forEach((buff) => {
          buff.constants = BUFFS[buff.id];
          if (buff.constants.events.onBeforeDeath) {
            buff.constants.events.onBeforeDeath({ secondsElapsed, buff, target: enemy, actualBattle });
          }
        });
      }

      // Unit may not be dead if beforeDeath event does something
      if (enemy.stats.health <= 0) {
        actualBattle.deadEnemies.push(enemy);
        actualBattle.enemies.splice(i, 1);
      }
    }
  }

  // Apply actions
  battleActions.forEach((action) => {
    if (action.abilityId === 'changeTarget') {
      // Modify casters preferred target
      const targetUnit = _.findWhere(actualBattle.units, { id: action.caster });
      if (targetUnit) {
        targetUnit.target = action.targets[0];
      }
    } else if (action.abilityId === 'clickAttack') {
      // Deal x damage to target
      const targetUnit = _.findWhere(actualBattle.enemies, { id: action.targets[0] });
      const casterUnit = _.findWhere(actualBattle.units, { id: action.caster });
      // Ensure caster unit has sufficient energy
      if (targetUnit && casterUnit && casterUnit.amulet && casterUnit.amulet.energy >= 1) {
        casterUnit.amulet.energy -= 1;
        dealDamage(casterUnit.amulet.damage, {
          attacker: casterUnit,
          defender: targetUnit,
          tickEvents: actualBattle.tickEvents
        });
      }
    } else {
      // Ensure the specified ability is able to be casted for the specified caster
      const castersUnits = actualBattle.units.filter((unit) => {
        return unit.owner === action.caster;
      });

      // Check if the ability exists
      let unitAbility;
      let actionCaster;
      for (let i = 0; i < castersUnits.length; i++) {
        unitAbility = _.findWhere(castersUnits[i].abilities, { id: action.abilityId });
        if (unitAbility && unitAbility.currentCooldown <= 0) {
          actionCaster = castersUnits[i];
          break;
        } else {
          unitAbility = undefined;
        }
      }

      if (unitAbility && (!unitAbility.isSpell || unitAbility.casts > 0)) {
        // Cast it! and put it on cooldown
        const abilityToCast = JSON.parse(JSON.stringify(ABILITIES[action.abilityId]));
        const unitsAndEnemies = actualBattle.units.concat(actualBattle.enemies);
        const actionTargets = unitsAndEnemies.filter((unit) => {
          return _.contains(action.targets, unit.id);
        });
        abilityToCast.level = unitAbility.level;

        // Fetch who we are are targetting with this ability
        const refundCast = castAbility({
          ability: abilityToCast,
          caster: actionCaster,
          targets: actionTargets,
          actualBattle
        });

        if (refundCast) {

        } else {
          unitAbility.casts -= 1;
          unitAbility.totalCasts += 1;
          unitAbility.currentCooldown = abilityToCast.cooldown;
        }
      }
    }
  });

  // Remove any dead enemies
  for (let i = actualBattle.enemies.length - 1; i >= 0; i--) {
    const enemy = actualBattle.enemies[i];
    if (enemy.stats.health <= 0 || !enemy.stats.health) {
      enemy.stats.health = 0;

      // Call death event for this enemy
      if (enemy.buffs) {
        // Buffs can do things on tick, will collect them in the form of combatEvents
        enemy.buffs.forEach((buff) => {
          buff.constants = BUFFS[buff.id];
          if (buff.constants.events.onBeforeDeath) {
            buff.constants.events.onBeforeDeath({ secondsElapsed, buff, target: enemy, actualBattle });
          }
        });
      }

      // They may not be dead, as of onBeforeDeath
      if (enemy.stats.health <= 0) {
        actualBattle.deadEnemies.push(enemy);
        actualBattle.enemies.splice(i, 1);
      }
    }
  }

  // Remove any dead units
  for (let i = actualBattle.units.length - 1; i >= 0; i--) {
    const unit = actualBattle.units[i];
    if (unit.stats.health <= 0 || !unit.stats.health) {
      unit.stats.health = 0;

      // Call death event for this unit
      if (unit.buffs) {
        // Buffs can do things on tick, will collect them in the form of combatEvents
        unit.buffs.forEach((buff) => {
          buff.constants = BUFFS[buff.id];
          if (buff.constants.events.onBeforeDeath) {
            buff.constants.events.onBeforeDeath({ secondsElapsed, buff, target: unit, actualBattle });
          }
        });
      }

      if (unit.stats.health <= 0) {
        actualBattle.deadUnits.push(unit);
        actualBattle.units.splice(i, 1);
      }
    }
  }

  // Update ability cooldowns
  actualBattle.enemies.concat(actualBattle.units).forEach((aliveUnit) => {
    if (aliveUnit.abilities) {
      aliveUnit.abilities.forEach((ability) => {
        if (ability.currentCooldown > 0) {
          ability.currentCooldown -= secondsElapsed;
        }
      });
    }
  });

  actualBattle.updatedAt = new Date();
  // Strip util &  all alive
  delete actualBattle.utils;
  delete actualBattle.allAliveUnits;
  redis.set(`battles-${actualBattle._id}`, JSON.stringify(actualBattle));

  actualBattle.updatedAt = new Date();

  if (actualBattle.enemies.length === 0 || actualBattle.units.length === 0) {
    // Before we end the battle, make sure it shouldn't continue
    if (actualBattle.isExplorationRun && actualBattle.units.length > 0) {
      if (actualBattle.room !== 'boss' && actualBattle.room < 7) {
        actualBattle.room += 1;
        // Strip out old dead enemies
        actualBattle.deadEnemies = [];
        // Populate battle with next room
        const newMonsters = FLOORS.genericTowerMonsterGenerator(actualBattle.floor, actualBattle.room);
        // Inject into battle
        newMonsters.forEach((monster) => {
          const randomUnitTarget = _.sample(actualBattle.units);
          actualBattle.totalXpGain += BATTLES.xpGain(monster.stats, monster.buffs);
          actualBattle.enemies.push({
            id: Random.id(),
            stats: monster.stats,
            icon: monster.icon,
            buffs: monster.buffs || [],
            target: randomUnitTarget.id,
            enemyId: monster.id,
            name: monster.name,
            tickOffset: _.random(0, 5)
          });
        });

        return;
      }
    }

    Meteor.clearInterval(battleIntervalId);
    delete tickTracker[actualBattle._id];
    Meteor.setTimeout(() => {
      completeBattle(actualBattle);
    }, 1000);
  }
}
