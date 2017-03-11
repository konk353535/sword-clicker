import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random'

import { Battles } from '/imports/api/battles/battles';
import { Combat } from '/imports/api/combat/combat';
import { updateCombatStats } from '/server/api/combat/combat';

import { BATTLES } from '/server/constants/battles'; // List of encounters
import { ENEMIES } from '/server/constants/enemies'; // List of enemies
import { COMBAT } from '/server/constants/combat'; // List of available combat stats

const completeBattle = function (actualBattle) {
  // Delete battle as it is over
  Battles.remove(actualBattle._id);
}

const progressBattle = function (actualBattle, battleIntervalId) {
  const currentTick = actualBattle.tick;
  const tickEvents = [];

  const dealDamage = function(attackerStats, defenderStats) {
    const hitChance = (50 + (defenderStats.defense - attackerStats.attack)) / 100;

    if (hitChance >= Math.random()) {
      // Determine how much damage we will deal
      const extraRawDamage = Math.round(Math.random() * (attackerStats.attackMax - attackerStats.attack));
      const rawDamage = attackerStats.attack + extraRawDamage;

      // Determine damage reduction from armor
      const dmgReduction = defenderStats.armor / (defenderStats.armor + 100);

      return rawDamage * (1 - dmgReduction);
    } else {
      return 0;
    }
  }

  // Apply enemy attacks
  actualBattle.enemies.forEach((enemy) => {
    if (currentTick % enemy.stats.attackSpeedTicks === 0) {
      const defender = actualBattle.units[0];
      // Attack
      const damageToDeal = dealDamage(enemy.stats, defender.stats);
      tickEvents.push({
        from: enemy.id,
        to: defender.id,
        eventType: 'damage',
        label: Math.round(damageToDeal)
      });
      defender.stats.health -= damageToDeal;
    }
  });

  // Apply player attacks
  actualBattle.units.forEach((unit) => {
    if (currentTick % unit.stats.attackSpeedTicks === 0) {
      const defender = actualBattle.enemies[0];
      // Attack
      const damageToDeal = dealDamage(unit.stats, defender.stats);
      tickEvents.push({
        from: unit.id,
        to: defender.id,
        eventType: 'damage',
        label: Math.round(damageToDeal)
      });
      defender.stats.health -= damageToDeal;
    }
  });

  actualBattle.tick += 1;

  Battles.update(actualBattle._id, {
    $set: {
      tick: actualBattle.tick,
      units: actualBattle.units,
      enemies: actualBattle.enemies,
      tickEvents
    }
  });

  if (actualBattle.enemies[0].stats.health <= 0) {
    Meteor.clearInterval(battleIntervalId);
    completeBattle(actualBattle);
  }
}

const startBattle = function (battleId) {
  const ticksPerSecond = 1000 / BATTLES.tickDuration;

  // Ensure user isn't already in a battle
  const currentBattle = Battles.findOne({ owners: Meteor.userId() });
  if (currentBattle) {
    return;
  }

  // Find specified battleId
  const battleConstants = BATTLES[battleId];

  // Ensure valid battle id
  if (!battleConstants) {
    return;
  }

  updateCombatStats();

  const newBattle = {
    createdAt: new Date(),
    updatedAt: new Date(),
    owners: [Meteor.userId()],
    tickEvents: [],
    units: [],
    enemies: []
  }

  // Current users combat stats
  const userCombat = Combat.findOne({ owner: Meteor.userId() });
  
  // Inject user into fights units
  const userCombatStats = {};
  COMBAT.statsArr.forEach((statName) => {
    if (userCombat[statName]) {
      userCombatStats[statName] = userCombat[statName];
    }
  });
  // Convert attack speed seconds to attack speed ticks
  if (userCombatStats.attackSpeed !== undefined) {
    userCombatStats.attackSpeedTicks = Math.round(ticksPerSecond / userCombatStats.attackSpeed);
  }
  newBattle.units.push({
    id: Meteor.userId(),
    owner: Meteor.userId(),
    stats: userCombatStats,
    icon: 'character'
  });

  // Inject enemies into the fight
  battleConstants.enemies.forEach((enemy) => {
    const enemyConstants = ENEMIES[enemy.id];
    const enemyStats = enemyConstants.stats;
    enemyStats.attackSpeedTicks = Math.round(ticksPerSecond / enemyStats.attackSpeed);
    for (let i = 0; i < enemy.amount; i++) {
      newBattle.enemies.push({
        id: Random.id(),
        stats: enemyStats,
        icon: enemyConstants.icon,
        enemyId: enemyConstants.id,
        name: enemyConstants.name
      });
    }
  });

  // Save battle
  const actualBattleId = Battles.insert(newBattle);
  const actualBattle = Battles.findOne(actualBattleId);

  // Progress battle
  const battleIntervalId = Meteor.setInterval(() => {
    progressBattle(actualBattle, battleIntervalId);
  }, BATTLES.tickDuration); // Tick Duration ( Should be 250 by default )
}


Meteor.methods({
  'battles.randomBattle'() {
    // Eventually select a random battle appropriate to users level
    startBattle('rat');
  }
});

Meteor.publish('battles', function() {
  return Battles.find({
    owners: this.userId
  });
});
