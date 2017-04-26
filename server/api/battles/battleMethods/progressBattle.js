import { BATTLES } from '/server/constants/battles/index.js'; // List of encounters
import { ABILITIES, BUFFS } from '/server/constants/combat/index.js'; // List of available combat stats

import moment from 'moment';
import _ from 'underscore';
import { attackSpeedTicks } from '/server/utils';

import { castAbility } from './castAbility.js';
import { completeBattle } from './completeBattle.js';

import { Battles } from '/imports/api/battles/battles';
import { BattleActions } from '/imports/api/battles/battleActions';


export const progressBattle = function (actualBattle, battleIntervalId) {
  actualBattle.tickEvents = [];
  actualBattle.allAliveUnits = actualBattle.units.concat(actualBattle.enemies);

  let isUpdatedStale = moment().isAfter(moment(actualBattle.updatedAt).add(30, 'seconds'));
  let isCreatedStale = moment().isAfter(moment(actualBattle.createdAt).add(15, 'minutes'));

  // If an unknown error occurs and this battle isn't updated for 30 seconds, end it!
  if (isUpdatedStale || isCreatedStale) {
    console.log('--------- Ending Battle Early!!! -------------');
    if (isUpdatedStale) {
      console.log('Reason: Is updated stale');
      console.log(`Now = ${moment().toDate()}`);
      console.log(`Last updated = ${moment(actualBattle.updatedAt).toDate()}`);
    } else {
      console.log('Reason: Is created stale');
      console.log(`Now = ${moment().toDate()}`);
      console.log(`Created at = ${moment(actualBattle.createdAt).toDate()}`);
    }
    Battles.update(actualBattle._id, {
      $set: {
        finished: true,
        win: false
      }
    });
    Meteor.clearInterval(battleIntervalId);
    return;
  }

  // Fetch actions related to this battle
  const battleActions = BattleActions.find({
    battleId: actualBattle._id
  }).fetch();

  const dealDamage = function(rawDamage, { attacker, defender, tickEvents }) {
    let damage = rawDamage;
    if (damage > 0) {
      const dmgReduction = BATTLES.dmgReduction(defender.stats.armor);
      damage = (rawDamage * (1 - dmgReduction)) * defender.stats.damageTaken;
      defender.stats.health -= damage;
    }

    tickEvents.push({
      from: attacker.id,
      to: defender.id,
      eventType: 'damage',
      label: Math.round(damage)
    });
  }

  const autoAttack = function({ attacker, defender, tickEvents }) {
    // Do we hit?
    const hitChance = 0.4 + ((attacker.stats.accuracy - defender.stats.defense) / 200);
    if (hitChance >= Math.random()) {
      // How much do we hit for
      const extraRawDamage = Math.round(Math.random() * (attacker.stats.attackMax - attacker.stats.attack));
      const rawDamage = attacker.stats.attack + extraRawDamage;

      dealDamage(rawDamage, { attacker, defender, tickEvents });
    } else {
      dealDamage(0, { attacker, defender, tickEvents });
    }
  }

  actualBattle.utils = {
    autoAttack,
    dealDamage
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
          delete enemy.target;
        }
      }
      autoAttack({ attacker: enemy, defender, tickEvents: actualBattle.tickEvents });
    }
  });

  // Remove any dead units
  for (let i = actualBattle.units.length - 1; i >= 0; i--) {
    const unit = actualBattle.units[i];
    if (unit.stats.health <= 0 || !unit.stats.health) {
      unit.stats.health = 0;
      actualBattle.deadUnits.push(unit);
      actualBattle.units.splice(i, 1);
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
      actualBattle.deadEnemies.push(enemy);
      actualBattle.enemies.splice(i, 1);
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
      if (targetUnit && casterUnit) {
        dealDamage(1, { attacker: casterUnit, defender: targetUnit, tickEvents: actualBattle.tickEvents });
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

      if (unitAbility) {
        // Cast it! and put it on cooldown
        const abilityToCast = JSON.parse(JSON.stringify(ABILITIES[action.abilityId]));
        const unitsAndEnemies = actualBattle.units.concat(actualBattle.enemies);
        const actionTargets = unitsAndEnemies.filter((unit) => {
          return _.contains(action.targets, unit.id);
        });
        abilityToCast.level = unitAbility.level;
        // Fetch who we are are targetting with this ability

        castAbility({
          ability: abilityToCast,
          caster: actionCaster,
          targets: actionTargets,
          actualBattle
        });

        unitAbility.currentCooldown = abilityToCast.cooldown;
      }
    }
  });

  // Remove any dead enemies
  for (let i = actualBattle.enemies.length - 1; i >= 0; i--) {
    const enemy = actualBattle.enemies[i];
    if (enemy.stats.health <= 0 || !enemy.stats.health) {
      enemy.stats.health = 0;
      actualBattle.deadEnemies.push(enemy);
      actualBattle.enemies.splice(i, 1);
    }
  }

  // Remove any dead units
  for (let i = actualBattle.units.length - 1; i >= 0; i--) {
    const unit = actualBattle.units[i];
    if (unit.stats.health <= 0 || !unit.stats.health) {
      unit.stats.health = 0;
      actualBattle.deadUnits.push(unit);
      actualBattle.units.splice(i, 1);
    }
  }

  // Remove all battle actions as we've got them for this tick
  BattleActions.remove({
    _id: {
      $in: battleActions.map((item) => item._id)
    }
  });

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

  Battles.update(actualBattle._id, {
    $set: {
      tick: actualBattle.tick,
      units: actualBattle.units,
      deadUnits: actualBattle.deadUnits,
      deadEnemies: actualBattle.deadEnemies,
      enemies: actualBattle.enemies,
      tickEvents: actualBattle.tickEvents,
      updatedAt: new Date()
    }
  });

  actualBattle.updatedAt = new Date();

  if (actualBattle.enemies.length === 0 || actualBattle.units.length === 0) {
    Meteor.clearInterval(battleIntervalId);
    Meteor.setTimeout(() => {
      completeBattle(actualBattle);
    }, 2000);
  }
}
